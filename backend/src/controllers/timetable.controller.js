const Timetable = require("../models/timetable.model");
const Student = require("../models/student.model");



// ==========================================
// Create Timetable (Teacher)
// ==========================================
const createTimetable = async(req,res)=>{

    try{


        const {

            studentClass,

            stream,

            day,

            subject,

            teacher,

            startTime,

            endTime,

            room,


        } = req.body;





        if(
            !studentClass ||
            !day ||
            !subject ||
            !teacher ||
            !startTime ||
            !endTime
        ){

            return res.status(400).json({

                success:false,

                message:
                "All required fields are required."

            });

        }





        const existing =
        await Timetable.findOne({

            studentClass,

            stream:stream || "",

            day,

            startTime,

        });





        if(existing){

            return res.status(409).json({

                success:false,

                message:
                "A timetable already exists for this slot."

            });

        }





        const timetable =
        await Timetable.create({

            studentClass,


            stream:
            stream || "",


            day,


            subject,


            teacher,


            startTime,


            endTime,


            room:
            room || "",


        });






        await timetable.populate(

            "teacher",

            "username email"

        );





        return res.status(201).json({

            success:true,

            message:
            "Timetable created successfully.",

            timetable

        });




    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// ==========================================
// Get All Timetables
// ==========================================
const getAllTimetables = async(req,res)=>{

    try{


        const {

            page=1,

            limit=10,

            studentClass,

            stream,

            day,


        } = req.query;





        const filter={};





        if(studentClass){

            filter.studentClass =
            studentClass;

        }





        if(stream){

            filter.stream =
            stream;

        }





        if(day){

            filter.day =
            day;

        }






        const timetables =
        await Timetable.find(filter)

        .populate(

            "teacher",

            "username email"

        )

        .sort({

            day:1,

            startTime:1,

        })

        .skip(

            (Number(page)-1)
            *
            Number(limit)

        )

        .limit(

            Number(limit)

        );







        const total =
        await Timetable.countDocuments(
            filter
        );






        return res.status(200).json({

            success:true,


            page:Number(page),


            totalPages:
            Math.ceil(
                total/Number(limit)
            ),


            totalRecords:total,


            timetables,


        });




    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// ==========================================
// Get Timetable By ID
// ==========================================
const getTimetableById = async(req,res)=>{

    try{


        const timetable =
        await Timetable.findById(

            req.params.id

        )

        .populate(

            "teacher",

            "username email"

        );





        if(!timetable){

            return res.status(404).json({

                success:false,

                message:
                "Timetable not found."

            });

        }





        return res.status(200).json({

            success:true,

            timetable

        });




    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// ==========================================
// Update Timetable
// ==========================================
const updateTimetable = async(req,res)=>{

    try{


        const timetable =
        await Timetable.findById(

            req.params.id

        );





        if(!timetable){

            return res.status(404).json({

                success:false,

                message:
                "Timetable not found."

            });

        }





        const {

            studentClass,

            stream,

            day,

            subject,

            teacher,

            startTime,

            endTime,

            room,


        } = req.body;








        if(studentClass !== undefined)

            timetable.studentClass =
            studentClass;





        if(stream !== undefined)

            timetable.stream =
            stream;





        if(day !== undefined)

            timetable.day =
            day;





        if(subject !== undefined)

            timetable.subject =
            subject;





        if(teacher !== undefined)

            timetable.teacher =
            teacher;





        if(startTime !== undefined)

            timetable.startTime =
            startTime;





        if(endTime !== undefined)

            timetable.endTime =
            endTime;





        if(room !== undefined)

            timetable.room =
            room;






        await timetable.save();





        await timetable.populate(

            "teacher",

            "username email"

        );






        return res.status(200).json({

            success:true,

            message:
            "Timetable updated successfully.",

            timetable

        });




    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// ==========================================
// Delete Timetable
// ==========================================
const deleteTimetable = async(req,res)=>{

    try{


        const timetable =
        await Timetable.findById(

            req.params.id

        );





        if(!timetable){

            return res.status(404).json({

                success:false,

                message:
                "Timetable not found."

            });

        }





        await timetable.deleteOne();






        return res.status(200).json({

            success:true,

            message:
            "Timetable deleted successfully."

        });




    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







// ==========================================
// Get Student Timetable
// ==========================================
const getStudentTimetables = async (req, res) => {
    try {
        const student = await Student.findOne({
            user: req.user.id,
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found.",
            });
        }

        const filter = {
            studentClass: { $in: [student.studentClass, "All"] },
        };

        if (student.subjects && student.subjects.length > 0) {
            filter.subject = {
                $in: student.subjects,
            };
        }

        if (student.stream) {
            filter.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }

        const timetables = await Timetable.find(filter)
            .populate("teacher", "username email")
            .sort({ day: 1, startTime: 1 });

        return res.status(200).json({
            success: true,
            timetables,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createTimetable,
    getAllTimetables,
    getStudentTimetables,
    getTimetableById,
    updateTimetable,
    deleteTimetable,
};