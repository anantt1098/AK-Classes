const mongoose = require("mongoose");

const dppSchema = new mongoose.Schema(
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

        // Academic Details
        studentClass: {
            type: String,
            required: true,
            trim: true,
        },

        // Only for Class 11-12: Science / Humanities
        stream: {
            type: String,
            enum: ["Science", "Humanities", ""],
            default: "",
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        // Google Drive / PDF Link for DPP
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

module.exports = mongoose.model("DPP", dppSchema);
