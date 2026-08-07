const bcrypt = require("bcrypt");

const Student = require("../models/student.model");
const User = require("../models/user.model");

const Attendance = require("../models/attendance.model");
const Fee = require("../models/fee.model");

const Course = require("../models/course.model");
const Video = require("../models/video.model");
const Note = require("../models/notes.model");



// ==========================================
// Create Student (Teacher)
// ==========================================
const createStudent = async (req,res)=>{

    try{


        const {

            username,

            email,

            password,

            fullName,

            studentClass,

            phone,

            parentPhone,

            address,

            joiningDate,

        } = req.body;



        if(!username || !email || !password){

            return res.status(400).json({

                success:false,

                message:
                "Username, Email and Password are required."

            });

        }




        const existingUser =
        await User.findOne({

            $or:[

                {username},

                {email}

            ]

        });




        if(existingUser){

            return res.status(409).json({

                success:false,

                message:
                "Username or Email already exists."

            });

        }




        const hashedPassword =
        await bcrypt.hash(

            password,

            10

        );




        const user =
        await User.create({

            username,

            email,

            password:hashedPassword,

            role:"student"

        });






        const student =
        await Student.create({

            user:user._id,

            fullName:
            fullName || username,

            studentClass,

            phone,

            parentPhone,

            address,

            joiningDate,

            isProfileCompleted:true

        });






        await student.populate(

            "user",

            "username email role createdAt"

        );






        return res.status(201).json({

            success:true,

            message:
            "Student created successfully.",

            student

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
// Get All Students
// ==========================================
const getAllStudents = async(req,res)=>{

    try{


        const students =
        await Student.find({

            isActive:true

        })

        .populate(

            "user",

            "username email role createdAt"

        )

        .sort({

            createdAt:-1

        });




        return res.status(200).json({

            success:true,

            students

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
// Get Student By ID
// ==========================================
const getStudentById = async(req,res)=>{

    try{


        const student =
        await Student.findById(

            req.params.id

        )

        .populate(

            "user",

            "username email role createdAt"

        );




        if(!student){

            return res.status(404).json({

                success:false,

                message:
                "Student not found."

            });

        }




        return res.json({

            success:true,

            student

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
// Get My Profile
// ==========================================
const getMyProfile = async(req,res)=>{

    try{


        const student =
        await Student.findOne({

            user:req.user.id,

            isActive:true

        })

        .populate(

            "user",

            "username email role createdAt"

        );




        if(!student){

            return res.status(404).json({

                success:false,

                message:
                "Profile not found."

            });

        }




        return res.json({

            success:true,

            student

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
// Update Student
// ==========================================
const updateStudent = async(req,res)=>{

    try{


        const student =
        await Student.findById(

            req.params.id

        );




        if(!student){

            return res.status(404).json({

                success:false,

                message:
                "Student not found."

            });

        }




        Object.assign(

            student,

            req.body

        );



        await student.save();




        return res.json({

            success:true,

            message:
            "Student updated successfully.",

            student

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
// Update My Profile
// ==========================================
const updateMyProfile = async(req,res)=>{

    try{


        const student =
        await Student.findOne({

            user:req.user.id

        });




        Object.assign(

            student,

            req.body

        );




        student.isProfileCompleted=true;




        await student.save();




        return res.json({

            success:true,

            message:
            "Profile updated successfully.",

            student

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
// Delete Student
// ==========================================
const deleteStudent = async(req,res)=>{

    try{


        const student =
        await Student.findById(

            req.params.id

        );




        if(!student){

            return res.status(404).json({

                success:false,

                message:
                "Student not found."

            });

        }




        student.isActive=false;



        await student.save();




        return res.json({

            success:true,

            message:
            "Student deleted successfully."

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
// Get Teachers
// ==========================================
const getAllTeachers = async(req,res)=>{

    try{


        const teachers =
        await User.find({

            role:"teacher"

        })

        .select(

            "username email role"

        );




        return res.json({

            success:true,

            teachers

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
// Student Dashboard
// ==========================================
const getStudentDashboard = async(req,res)=>{


    try{


        const student =
        await Student.findOne({

            user:req.user.id,

            isActive:true

        });




        if(!student){

            return res.status(404).json({

                success:false,

                message:
                "Student not found."

            });

        }






        // ==========================
        // Attendance
        // ==========================


        const attendanceDocs =
        await Attendance.find({

            "records.student":

            student._id

        });




        let total=0;

        let present=0;




        attendanceDocs.forEach(item=>{


            const record =
            item.records.find(

                r =>

                r.student.toString()

                ===

                student._id.toString()

            );



            if(record){

                total++;


                if(record.status==="Present"){

                    present++;

                }

            }


        });




        const attendance =

        total

        ?

        Math.round(

            (present/total)*100

        )

        :

        0;








        // ==========================
        // Fees
        // ==========================


        const fee =
        await Fee.findOne({

            student:student._id

        });




        const pendingFees =

        fee?.dueFee || 0;









        // ==========================
        // Student Filter
        // ==========================


        const filter = {


            studentClass:

            student.studentClass,


            subject:

            {

                $in:

                student.subjects

            }


        };





        if(student.stream){

            filter.stream =

            student.stream;

        }








        // ==========================
        // Content
        // ==========================


        const courses =

        await Course.countDocuments({

            ...filter,

            isActive:true

        });




        const videos =

        await Video.countDocuments({

            ...filter,

            isActive:true

        });




        const notes =

        await Note.countDocuments({

            ...filter,

            isActive:true

        });









        return res.status(200).json({

            success:true,


            data:{


                student:{


                    class:

                    student.studentClass,


                    stream:

                    student.stream,


                    subjects:

                    student.subjects


                },



                attendance,


                pendingFees,


                courses,


                videos,


                notes


            }


        });



    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









module.exports = {


    createStudent,

    getAllStudents,

    getAllTeachers,

    getStudentById,

    getMyProfile,

    updateStudent,

    updateMyProfile,

    deleteStudent,

    getStudentDashboard


};