const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
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
        studentClass: {
            type: String,
            required: true,
            enum: ["6", "7", "8", "9", "10", "11", "12", "All"],
            trim: true,
        },
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
        youtubeLink: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Live", "Scheduled", "Ended"],
            default: "Live",
        },
        scheduledAt: {
            type: Date,
            default: Date.now,
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

module.exports = mongoose.model("LiveClass", liveClassSchema);
