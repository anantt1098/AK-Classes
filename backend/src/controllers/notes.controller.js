const Note = require("../models/notes.model");
const Student = require("../models/student.model");



// ==========================================
// Upload Note (Teacher)
// ==========================================
const uploadNote = async(req,res)=>{

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








        const note =
        await Note.create({

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
            "Note uploaded successfully.",

            note

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
// Get All Notes (Teacher)
// ==========================================
const getAllNotes = async(req,res)=>{

    try{


        const {

            studentClass,

            stream,

            subject,

            search,

            page=1,

            limit=10


        } = req.query;






        const query={};







        if(studentClass)

            query.studentClass =
            studentClass;






        if(stream)

            query.stream =
            stream;






        if(subject)

            query.subject =
            subject;






        if(search){

            query.title={

                $regex:search,

                $options:"i"

            };

        }









        const notes =
        await Note.find(query)

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
        await Note.countDocuments(query);










        return res.status(200).json({

            success:true,

            total,

            page:Number(page),

            totalPages:
            Math.ceil(
                total/Number(limit)
            ),

            notes

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
// Get Notes For Logged-in Student
// ==========================================
const getStudentNotes = async(req,res)=>{

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









        const query={

            studentClass:
            student.studentClass,

            isActive:true,

        };

        if (student.subjects && student.subjects.length > 0) {
            query.subject = {
                $in: student.subjects,
            };
        }









        // ==============================
        // Stream Filter
        // ==============================


        if(
            student.studentClass==="11"
            ||
            student.studentClass==="12"
        ){

            query.stream =
            student.stream;

        }
        else{

            query.stream="";

        }









        const notes =
        await Note.find(query)

        .populate(

            "uploadedBy",

            "username"

        )

        .sort({

            createdAt:-1

        });










        return res.status(200).json({

            success:true,

            notes

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
// Get Note By ID
// ==========================================
const getNoteById = async(req,res)=>{

    try{


        const note =
        await Note.findById(
            req.params.id
        )

        .populate(

            "uploadedBy",

            "username email"

        );





        if(!note){

            return res.status(404).json({

                success:false,

                message:
                "Note not found."

            });

        }







        return res.json({

            success:true,

            note

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
// Update Note
// ==========================================
const updateNote = async(req,res)=>{

    try{


        const note =
        await Note.findById(
            req.params.id
        );






        if(!note){

            return res.status(404).json({

                success:false,

                message:
                "Note not found."

            });

        }









        const {

            title,

            description,

            studentClass,

            stream,

            subject,

            driveLink


        } = req.body;










        if(title!==undefined)

            note.title=title;





        if(description!==undefined)

            note.description=description;





        if(studentClass!==undefined)

            note.studentClass=studentClass;





        if(stream!==undefined)

            note.stream=stream;





        if(subject!==undefined)

            note.subject=subject;





        if(driveLink!==undefined)

            note.driveLink=driveLink;









        await note.save();










        return res.status(200).json({

            success:true,

            message:
            "Note updated successfully.",

            note

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
// Delete Note
// ==========================================
const deleteNote = async(req,res)=>{

    try{


        const note =
        await Note.findById(
            req.params.id
        );






        if(!note){

            return res.status(404).json({

                success:false,

                message:
                "Note not found."

            });

        }







        await note.deleteOne();








        return res.json({

            success:true,

            message:
            "Note deleted successfully."

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


    uploadNote,

    getAllNotes,

    getStudentNotes,

    getNoteById,

    updateNote,

    deleteNote

};