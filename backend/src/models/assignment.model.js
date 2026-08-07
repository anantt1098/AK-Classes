const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        studentClass: {
            type: String,
            required: true,
            trim: true,
        },

        stream:{
    type:String,
    enum:[
        "Science",
        "Humanities",
        "",
    ],
    default:"",
},

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        attachment: {
            type: String,
            default: "",
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
    "Assignment",
    assignmentSchema
);