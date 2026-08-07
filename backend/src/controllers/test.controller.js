const Test = require("../models/test.model");

const Student = require("../models/student.model");
// ==========================================
// Upload Test
// ==========================================
const uploadTest = async (req, res) => {

    try {

        const {
            title,
            description,
            studentClass,
            stream,
            subject,
            testLink,
            dueDate,
        } = req.body;



        if (
            !title ||
            !studentClass ||
            !subject ||
            !testLink ||
            !dueDate
        ) {

            return res.status(400).json({

                success:false,

                message:
                "All required fields are required.",

            });

        }



        if(
            (
                studentClass === "11" ||
                studentClass === "12"
            )
            &&
            !stream
        ){

            return res.status(400).json({

                success:false,

                message:
                "Stream is required for class 11 and 12.",

            });

        }




        const test =
        await Test.create({

            title,

            description,

            studentClass,


            stream:
            stream || "",


            subject,

            testLink,

            dueDate,

            uploadedBy:req.user.id,

        });





        return res.status(201).json({

            success:true,

            message:
            "Test uploaded successfully.",

            test,

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
// Get All Tests
// ==========================================
const getAllTests = async(req,res)=>{


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

            query.title = {

                $regex:search,

                $options:"i",

            };

        }





        const tests =
        await Test.find(query)

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
        await Test.countDocuments(query);





        return res.status(200).json({

            success:true,

            total,

            page:Number(page),

            totalPages:
            Math.ceil(
                total/Number(limit)
            ),

            tests,

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
// Get Test By ID
// ==========================================
const getTestById = async(req,res)=>{


    try{


        const test =
        await Test.findById(
            req.params.id
        )

        .populate(
            "uploadedBy",
            "username email"
        );





        if(!test){


            return res.status(404).json({

                success:false,

                message:
                "Test not found.",

            });


        }





        return res.status(200).json({

            success:true,

            test,

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
// Update Test
// ==========================================
const updateTest = async(req,res)=>{


    try{


        const test =
        await Test.findById(
            req.params.id
        );




        if(!test){


            return res.status(404).json({

                success:false,

                message:
                "Test not found.",

            });


        }





        const {

            title,

            description,

            studentClass,

            stream,

            subject,

            testLink,

            dueDate,


        } = req.body;





        if(title!==undefined)

            test.title =
            title;




        if(description!==undefined)

            test.description =
            description;




        if(studentClass!==undefined)

            test.studentClass =
            studentClass;




        if(stream!==undefined)

            test.stream =
            stream;




        if(subject!==undefined)

            test.subject =
            subject;




        if(testLink!==undefined)

            test.testLink =
            testLink;




        if(dueDate!==undefined)

            test.dueDate =
            dueDate;





        await test.save();






        return res.status(200).json({

            success:true,

            message:
            "Test updated successfully.",

            test,

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
// Delete Test
// ==========================================
const deleteTest = async(req,res)=>{


    try{


        const test =
        await Test.findById(
            req.params.id
        );




        if(!test){


            return res.status(404).json({

                success:false,

                message:
                "Test not found.",

            });


        }




        await test.deleteOne();





        return res.status(200).json({

            success:true,

            message:
            "Test deleted successfully.",

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
// Get Student Tests
// ==========================================
const getStudentTests = async (req, res) => {

    try {

        const student =
            await Student.findOne({
                user: req.user.id
            });


        if (!student) {

            return res.status(404).json({

                success:false,

                message:"Student profile not found."

            });

        }



        const query = {

            studentClass:
                student.studentClass,

            isActive:true,

        };

        if (student.subjects && student.subjects.length > 0) {
            query.subject = {
                $in: student.subjects,
            };
        }



        // Class 11-12 stream matching

        if(
            student.studentClass === "11" ||
            student.studentClass === "12"
        ){

            query.stream =
                student.stream;

        }
        else{

            query.stream = "";

        }




        const tests =
            await Test.find(query)

            .populate(
                "uploadedBy",
                "username"
            )

            .sort({

                dueDate:1

            });



        return res.status(200).json({

            success:true,

            tests,

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

    uploadTest,

    getAllTests,

    getStudentTests,

    getTestById,

    updateTest,

    deleteTest,

};