const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Student = require("../models/student.model");

const generateToken = require("../utils/generateToken");



// ==========================================
// Send JWT Cookie
// ==========================================
const sendToken = (res, user) => {
    const token = generateToken(user);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};







// ==========================================
// Student Register
// ==========================================
async function studentRegister(req,res){

    let user=null;


    try{


        const {
            username,
            email,
            password,
            fullName,
            studentClass,
            stream,
            subjects,
            phone,
            parentPhone,
            address,
        } = req.body;



        if(
            !username ||
            !email ||
            !password ||
            !studentClass
        ){

            return res.status(400).json({

                success:false,

                message:
                "Username, Email, Password and Class are required"

            });

        }



        const isSeniorClass =
            studentClass==="11" ||
            studentClass==="12";



        if(
            isSeniorClass &&
            !stream
        ){

            return res.status(400).json({

                success:false,

                message:
                "Stream is required for class 11 and 12"

            });

        }



        if(
            !isSeniorClass &&
            (
                !subjects ||
                subjects.length===0
            )
        ){

            return res.status(400).json({

                success:false,

                message:
                "Subjects are required"

            });

        }





        const existingUser =
        await User.findOne({

            $or:[

                {
                    username
                },

                {
                    email
                }

            ]

        });



        if(existingUser){

            return res.status(409).json({

                success:false,

                message:
                "Username or Email already exists"

            });

        }





        const hashedPassword =
        await bcrypt.hash(

            password,

            10

        );





        user =
        await User.create({

            username,

            email,

            password:hashedPassword,

            role:"student"

        });






        const student =
        await Student.create({

            user:user._id,

            fullName: fullName || username,

            studentClass,

            stream:
            isSeniorClass
            ?
            stream
            :
            "",

            subjects: Array.isArray(subjects) ? subjects : [],

            phone: phone || "",

            parentPhone: parentPhone || "",

            address: address || "",

        });





        const tokenUser = {

            id:user._id,

            username:user.username,

            email:user.email,

            role:user.role,


            studentClass:
            student.studentClass,


            stream:
            student.stream,


            subjects:
            student.subjects,

        };





        const token = sendToken(
            res,
            tokenUser
        );

        return res.status(201).json({
            success: true,
            message: "Student registered successfully",
            user: tokenUser,
            token,
        });






    }
    catch(error){


        console.error(error);



        if(user){

            await User.findByIdAndDelete(
                user._id
            );

        }



        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


}









// ==========================================
// Teacher Register
// ==========================================
async function teacherRegister(req,res){

    try{


        const {

            username,

            email,

            password,

            verificationKey,


        }=req.body;




        if(
            !username ||
            !email ||
            !password ||
            !verificationKey
        ){

            return res.status(400).json({

                success:false,

                message:"All fields are required"

            });

        }





        if(
            verificationKey !==
            process.env.TEACHER_VERIFICATION_KEY
        ){

            return res.status(401).json({

                success:false,

                message:"Invalid Verification Key"

            });

        }





        const existingUser =
        await User.findOne({

            $or:[

                {
                    username
                },

                {
                    email
                }

            ]

        });





        if(existingUser){

            return res.status(409).json({

                success:false,

                message:
                "Username or Email already exists"

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

            role:"teacher"

        });






        const token = sendToken(
            res,
            user
        );

        return res.status(201).json({
            success: true,
            message: "Teacher registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}









// ==========================================
// Student Login
// ==========================================
async function studentLogin(req,res){

    try{


        const {
            email,
            password
        }=req.body;





        if(
            !email ||
            !password
        ){

            return res.status(400).json({

                success:false,

                message:
                "Email and Password are required"

            });

        }






        const user =
        await User.findOne({

            email

        })
        .select("+password");






        if(
            !user ||
            user.role!=="student"
        ){

            return res.status(401).json({

                success:false,

                message:"Invalid Credentials"

            });

        }





        const match =
        await bcrypt.compare(

            password,

            user.password

        );





        if(!match){

            return res.status(401).json({

                success:false,

                message:"Invalid Credentials"

            });

        }





        const student =
        await Student.findOne({

            user:user._id

        });






        const tokenUser = {


            id:user._id,

            username:user.username,

            email:user.email,

            role:user.role,


            studentClass:
            student?.studentClass || "",


            stream:
            student?.stream || "",


            subjects:
            student?.subjects || [],


        };






        const token = sendToken(
            res,
            tokenUser
        );

        return res.status(200).json({
            success: true,
            message: "Student login successful",
            user: tokenUser,
            token,
        });



    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}









// ==========================================
// Teacher Login
// ==========================================
async function teacherLogin(req,res){

    try{


        const {
            email,
            password
        }=req.body;





        const user =
        await User.findOne({

            email

        })
        .select("+password");





        if(
            !user ||
            user.role!=="teacher"
        ){

            return res.status(401).json({

                success:false,

                message:"Invalid Credentials"

            });

        }





        const match =
        await bcrypt.compare(

            password,

            user.password

        );





        if(!match){

            return res.status(401).json({

                success:false,

                message:"Invalid Credentials"

            });

        }





        const token = sendToken(
            res,
            user
        );

        return res.status(200).json({
            success: true,
            message: "Teacher login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        });



    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}









// ==========================================
// Logout
// ==========================================
function logoutUser(req,res){


    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });



    return res.status(200).json({

        success:true,

        message:"Logout successful"

    });


}









// ==========================================
// Current User
// ==========================================
async function getCurrentUser(req, res) {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token && req.headers["x-access-token"]) {
            token = req.headers["x-access-token"];
        }

        if (!token) {
            return res.status(200).json({
                success: false,
                user: null,
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (_err) {
            return res.status(200).json({
                success: false,
                user: null,
            });
        }

        const userId = decoded.id || decoded._id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(200).json({
                success: false,
                user: null,
            });
        }

        let responseUser = user.toObject();

        if (user.role === "student") {
            const student = await Student.findOne({
                user: user._id,
            });

            responseUser = {
                ...responseUser,
                studentClass: student?.studentClass || "",
                stream: student?.stream || "",
                subjects: student?.subjects || [],
            };
        }

        return res.status(200).json({
            success: true,
            user: responseUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}









module.exports={

    studentRegister,

    teacherRegister,

    studentLogin,

    teacherLogin,

    logoutUser,

    getCurrentUser

};