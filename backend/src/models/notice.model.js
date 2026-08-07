const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
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
            trim: true,
            default: "All",
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


subject:{
    type:String,
    trim:true,
    default:"All",
},

        attachment: {
            type: String,
            default: "",
            trim: true,
        },

        publishedBy: {
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
    "Notice",
    noticeSchema
);