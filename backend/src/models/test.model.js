const mongoose = require("mongoose");


const testSchema = new mongoose.Schema(
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

            trim: true,

        },


        stream: {

            type: String,

            enum: [
                "Science",
                "Humanities",
                "",
            ],

            default: "",

            trim: true,

        },


        subject: {

            type: String,

            required: true,

            trim: true,

        },


        testLink: {

            type: String,

            required: true,

            trim: true,

        },


        dueDate: {

            type: Date,

            required: true,

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
    "Test",
    testSchema
);