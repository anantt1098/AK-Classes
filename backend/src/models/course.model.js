const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            trim: true,
        },


        description: {
            type: String,
            trim: true,
            default: "",
        },



        // ==============================
        // Academic Details
        // ==============================


        studentClass: {
            type: String,
            required: true,
            trim: true,
        },


        // Only required for Class 11-12
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


        subject: {
            type: String,
            required: true,
            trim: true,
        },



        // Google Drive Link
        driveLink: {
            type: String,
            required: true,
            trim: true,
        },



        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
    "Course",
    courseSchema
);