const Attendance = require("../models/attendance.model");
const Student = require("../models/student.model");


// ==========================================
// Get Students By Class (Teacher)
// ==========================================
const getStudentsForAttendance = async (req, res) => {

    try {

        const {
            studentClass,
            stream,
        } = req.query;


        if (!studentClass) {

            return res.status(400).json({

                success:false,

                message:"Class is required."

            });

        }


        const query = {

            studentClass,

            isActive:true,

        };


        if(stream){

            query.stream = stream;

        }



        const students =
            await Student.find(query)

            .populate(
                "user",
                "username email"
            )

            .sort({
                fullName:1
            });



        return res.status(200).json({

            success:true,

            students,

        });



    } catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





// ==========================================
// Mark Attendance
// ==========================================
const markAttendance = async(req,res)=>{

    try{


        const {

            studentClass,

            stream,

            date,

            records,

        } = req.body;



        if(
            !studentClass ||
            !date ||
            !records ||
            records.length===0
        ){

            return res.status(400).json({

                success:false,

                message:"Class, date and students are required."

            });

        }




        const alreadyMarked =
            await Attendance.findOne({

                teacher:req.user.id,

                studentClass,

                stream:stream || "",

                date,

            });



        if(alreadyMarked){

            return res.status(409).json({

                success:false,

                message:"Attendance already marked for this class."

            });

        }




        const attendance =
            await Attendance.create({

                teacher:req.user.id,

                studentClass,

                stream:stream || "",

                date,

                records,

            });




        return res.status(201).json({

            success:true,

            message:"Attendance marked successfully.",

            attendance,

        });



    }catch(error){

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Attendance has already been marked for this class on this date.",
            });
        }

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};







// ==========================================
// Get All Attendance (Teacher)
// ==========================================
const getAllAttendance = async(req,res)=>{

    try{


        const {

            studentClass,

            stream,

            date,

        } = req.query;



        const filter = {

            teacher:req.user.id

        };



        if(studentClass)

            filter.studentClass = studentClass;



        if(stream)

            filter.stream = stream;



        if(date)

            filter.date = date;





        const attendance =
            await Attendance.find(filter)

            .populate(
                "teacher",
                "username email"
            )

            .populate(
                "records.student"
            )

            .sort({

                date:-1

            });




        return res.status(200).json({

            success:true,

            attendance,

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};







// ==========================================
// Get Attendance By ID
// ==========================================
const getAttendanceById = async(req,res)=>{

    try{


        const attendance =
            await Attendance.findOne({

                _id:req.params.id,

                teacher:req.user.id

            })

            .populate(
                "teacher",
                "username email"
            )

            .populate(
                "records.student",
                "fullName admissionNo"
            );



        if(!attendance){

            return res.status(404).json({

                success:false,

                message:"Attendance not found."

            });

        }




        return res.status(200).json({

            success:true,

            attendance,

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};







// ==========================================
// Get My Attendance (Student)
// ==========================================
const getMyAttendance = async(req,res)=>{

    try{


        const student =
            await Student.findOne({

                user:req.user.id

            });



        if(!student){

            return res.status(404).json({

                success:false,

                message:"Student not found."

            });

        }




        const attendance =
            await Attendance.find({

                studentClass:
                    student.studentClass,

                stream:
                    student.stream || "",

                "records.student":
                    student._id

            })

            .populate(
                "records.student"
            )

            .sort({

                date:-1

            });





        let present = 0;

        let absent = 0;



        attendance.forEach(item=>{


            const record =
                item.records.find(r=>{


                    return (

                        r.student._id.toString()

                        ===

                        student._id.toString()

                    );


                });



            if(record){

                if(record.status==="Present")

                    present++;

                else

                    absent++;

            }


        });




        const total =
            present + absent;




        return res.status(200).json({

            success:true,

            summary:{


                total,

                present,

                absent,


                percentage:

                total===0

                ?

                0

                :

                Number(

                    (

                        present /

                        total *

                        100

                    )

                    .toFixed(2)

                )


            },


            attendance,

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};







// ==========================================
// Attendance Analytics (Teacher)
// ==========================================
const getAttendanceAnalytics = async(req,res)=>{

    try{


        const attendance =
            await Attendance.find({

                teacher:req.user.id

            });



        let total = 0;

        let present = 0;

        let absent = 0;



        attendance.forEach(item=>{


            item.records.forEach(record=>{


                total++;



                if(record.status==="Present")

                    present++;


                else if(record.status==="Absent")

                    absent++;


            });


        });




        return res.status(200).json({

            success:true,


            summary:{


                total,

                present,

                absent,


                percentage:

                total===0

                ?

                0

                :

                Number(

                    (

                        present /

                        total *

                        100

                    )

                    .toFixed(2)

                )


            }


        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

};








// ==========================================
// Update Attendance
// ==========================================
const updateAttendance = async(req,res)=>{

    try{


        const attendance =
            await Attendance.findOne({

                _id:req.params.id,

                teacher:req.user.id

            });



        if(!attendance){

            return res.status(404).json({

                success:false,

                message:"Attendance not found."

            });

        }



        if(

            req.body.records &&

            req.body.records.length

        ){

            attendance.records =
                req.body.records;

        }



        await attendance.save();



        return res.status(200).json({

            success:true,

            message:"Attendance updated successfully.",

            attendance,

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};







// ==========================================
// Delete Attendance
// ==========================================
const deleteAttendance = async(req,res)=>{

    try{


        const attendance =
            await Attendance.findOne({

                _id:req.params.id,

                teacher:req.user.id

            });



        if(!attendance){

            return res.status(404).json({

                success:false,

                message:"Attendance not found."

            });

        }



        await attendance.deleteOne();



        return res.status(200).json({

            success:true,

            message:"Attendance deleted successfully."

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





module.exports = {

    getStudentsForAttendance,

    markAttendance,

    getAllAttendance,

    getAttendanceById,

    getMyAttendance,

    getAttendanceAnalytics,

    updateAttendance,

    deleteAttendance,

};