const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema(
{

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,

    },



    fullName: {

        type: String,

        trim: true,

        default: "",

    },







    // ==============================
    // Academic Details
    // ==============================


    studentClass: {

        type: String,

        trim: true,

        default: "",

    },



    // Only for Class 11-12
    // Science / Humanities

    stream: {

        type: String,

        enum: [

            "Science",

            "Humanities",

            "",

        ],

        default: "",

    },



    // Selected Subjects

    subjects: [

        {

            type: String,

            trim: true,

        }

    ],



    phone: {

        type: String,

        trim: true,

        default: "",

    },



    parentPhone: {

        type: String,

        trim: true,

        default: "",

    },



    address: {

        type: String,

        trim: true,

        default: "",

    },



    joiningDate: {

        type: Date,

        default: Date.now,

    },



    isProfileCompleted: {

        type: Boolean,

        default: false,

    },



    isActive: {

        type: Boolean,

        default: true,

    },


},

{

    timestamps: true,

}

);



module.exports = mongoose.model(
    "Student",
    studentSchema
);