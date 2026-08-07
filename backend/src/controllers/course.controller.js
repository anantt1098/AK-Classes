const Course = require("../models/course.model");
const Student = require("../models/student.model");



// ==========================================
// Upload Course (Teacher)
// ==========================================
const uploadCourse = async(req,res)=>{

    try{


        const {

            title,

            description,

            studentClass,

            stream,

            subject,

            driveLink,


        } = req.body;




        if(
            !title ||
            !studentClass ||
            !subject ||
            !driveLink
        ){

            return res.status(400).json({

                success:false,

                message:
                "Title, Class, Subject and Drive Link are required."

            });

        }





        const course =
        await Course.create({

            title,

            description,

            studentClass,

            stream:
            stream || "",


            subject,

            driveLink,

            uploadedBy:req.user.id,


        });






        return res.status(201).json({

            success:true,

            message:
            "Course uploaded successfully.",

            course,


        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,


        });

    }

};





// ==========================================
// Get All Courses (Teacher)
// ==========================================
const getAllCourses = async(req,res)=>{

    try{


        const {

            studentClass,

            stream,

            subject,

            search,

            page=1,

            limit=10,


        } = req.query;





        const query = {};





        if(studentClass){

            query.studentClass =
            studentClass;

        }




        if(stream){

            query.stream =
            stream;

        }




        if(subject){

            query.subject =
            subject;

        }




        if(search){

            query.title={

                $regex:search,

                $options:"i"

            };

        }








        const courses =
        await Course.find(query)

        .populate(
            "uploadedBy",
            "username"
        )

        .sort({

            createdAt:-1

        })

        .skip(
            (page-1)*limit
        )

        .limit(
            Number(limit)
        );








        const total =
        await Course.countDocuments(query);






        return res.status(200).json({

            success:true,

            total,

            page:Number(page),

            totalPages:
            Math.ceil(
                total/Number(limit)
            ),


            courses,


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
// Get Courses For Logged In Student
// ==========================================
const getStudentCourses = async(req,res)=>{

    try{


        const student =
        await Student.findOne({

            user:req.user.id,

            isActive:true,

        });





        if(!student){

            return res.status(404).json({

                success:false,

                message:
                "Student not found."

            });

        }








        const query = {
            studentClass: { $in: [student.studentClass, "All"] },
            isActive: true,
        };

        if (student.subjects && student.subjects.length > 0) {
            query.subject = {
                $in: student.subjects,
            };
        }

        if (student.stream) {
            query.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }







        const courses =
        await Course.find(query)

        .populate(

            "uploadedBy",

            "username"

        )

        .sort({

            createdAt:-1

        });









        return res.status(200).json({

            success:true,

            courses,

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
// Get Course By ID
// ==========================================
const getCourseById = async(req,res)=>{

    try{


        const course =
        await Course.findById(
            req.params.id
        )

        .populate(

            "uploadedBy",

            "username email"

        );






        if(!course){

            return res.status(404).json({

                success:false,

                message:
                "Course not found."

            });

        }






        return res.json({

            success:true,

            course

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
// Update Course
// ==========================================
const updateCourse = async(req,res)=>{

    try{


        const course =
        await Course.findById(
            req.params.id
        );




        if(!course){

            return res.status(404).json({

                success:false,

                message:
                "Course not found."

            });

        }








        const {

            title,

            description,

            studentClass,

            stream,

            subject,

            driveLink,


        } = req.body;









        if(title!==undefined)

            course.title=title;




        if(description!==undefined)

            course.description=description;




        if(studentClass!==undefined)

            course.studentClass=studentClass;




        if(stream!==undefined)

            course.stream=stream;




        if(subject!==undefined)

            course.subject=subject;




        if(driveLink!==undefined)

            course.driveLink=driveLink;








        await course.save();






        return res.json({

            success:true,

            message:
            "Course updated successfully.",

            course

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
// Delete Course
// ==========================================
const deleteCourse = async(req,res)=>{

    try{


        const course =
        await Course.findById(
            req.params.id
        );




        if(!course){

            return res.status(404).json({

                success:false,

                message:
                "Course not found."

            });

        }




        await course.deleteOne();






        return res.json({

            success:true,

            message:
            "Course deleted successfully."

        });



    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





module.exports={

    uploadCourse,

    getAllCourses,

    getStudentCourses,

    getCourseById,

    updateCourse,

    deleteCourse,

};