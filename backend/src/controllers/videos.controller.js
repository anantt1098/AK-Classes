const Video = require("../models/video.model");
const Student = require("../models/student.model");


// ==========================================
// Upload Video (Teacher)
// ==========================================
const uploadVideo = async (req, res) => {

    try {

        const {
            title,
            description,
            studentClass,
            stream,
            subject,
            youtubeLink,
        } = req.body;



        if (
            !title ||
            !studentClass ||
            !subject ||
            !youtubeLink
        ) {

            return res.status(400).json({

                success:false,

                message:"All required fields are required.",

            });

        }



        const video = await Video.create({

            title,

            description,

            studentClass,

            stream: stream || "",

            subject,

            youtubeLink,

            uploadedBy:req.user.id,

        });



        return res.status(201).json({

            success:true,

            message:"Video uploaded successfully.",

            video,

        });



    } catch(error) {


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





// ==========================================
// Get All Videos (Teacher)
// ==========================================
const getAllVideos = async (req,res)=>{

    try{


        const {
            studentClass,
            stream,
            subject,
            search,
            page = 1,
            limit = 10,
        } = req.query;



        const query = {};



        if(studentClass)
            query.studentClass = studentClass;



        if(stream)
            query.stream = stream;



        if(subject)
            query.subject = subject;



        if(search){

            query.title = {

                $regex:search,

                $options:"i",

            };

        }



        const videos =
            await Video.find(query)

            .populate(
                "uploadedBy",
                "username"
            )

            .sort({

                createdAt:-1,

            })

            .skip(
                (page-1)*limit
            )

            .limit(
                Number(limit)
            );



        const total =
            await Video.countDocuments(query);



        return res.status(200).json({

            success:true,

            total,

            page:Number(page),

            totalPages:
                Math.ceil(
                    total / Number(limit)
                ),

            videos,

        });



    }catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





// ==========================================
// Get Videos For Student
// ==========================================
const getStudentVideos = async(req,res)=>{

    try{


        const student =
            await Student.findOne({

                user:req.user.id,

                isActive:true,

            });



        if(!student){

            return res.status(404).json({

                success:false,

                message:"Student not found.",

            });

        }



        const query = {
            studentClass: { $in: [student.studentClass, "All"] },
            isActive: true,
        };

        // Class 11-12 Stream Filter
        if (student.stream) {
            query.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }

        // Subject Filter
        if (student.subjects && student.subjects.length > 0) {
            query.subject = {
                $in: student.subjects,
            };
        }



        const videos =
            await Video.find(query)

            .populate(
                "uploadedBy",
                "username"
            )

            .sort({

                createdAt:-1,

            });



        return res.status(200).json({

            success:true,

            videos,

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





// ==========================================
// Get Video By ID
// ==========================================
const getVideoById = async(req,res)=>{

    try{


        const video =
            await Video.findById(
                req.params.id
            )

            .populate(
                "uploadedBy",
                "username email"
            );



        if(!video){

            return res.status(404).json({

                success:false,

                message:"Video not found.",

            });

        }



        return res.status(200).json({

            success:true,

            video,

        });



    }catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





// ==========================================
// Update Video
// ==========================================
const updateVideo = async(req,res)=>{

    try{


        const video =
            await Video.findById(
                req.params.id
            );



        if(!video){

            return res.status(404).json({

                success:false,

                message:"Video not found.",

            });

        }



        const {

            title,

            description,

            studentClass,

            stream,

            subject,

            youtubeLink,

        } = req.body;



        if(title !== undefined)
            video.title = title;


        if(description !== undefined)
            video.description = description;


        if(studentClass !== undefined)
            video.studentClass = studentClass;


        if(stream !== undefined)
            video.stream = stream;


        if(subject !== undefined)
            video.subject = subject;


        if(youtubeLink !== undefined)
            video.youtubeLink = youtubeLink;



        await video.save();



        return res.status(200).json({

            success:true,

            message:"Video updated successfully.",

            video,

        });



    }catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





// ==========================================
// Delete Video
// ==========================================
const deleteVideo = async(req,res)=>{

    try{


        const video =
            await Video.findById(
                req.params.id
            );



        if(!video){

            return res.status(404).json({

                success:false,

                message:"Video not found.",

            });

        }



        await video.deleteOne();



        return res.status(200).json({

            success:true,

            message:"Video deleted successfully.",

        });



    }catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};





module.exports = {

    uploadVideo,

    getAllVideos,

    getStudentVideos,

    getVideoById,

    updateVideo,

    deleteVideo,

};