const mongoose = require("mongoose");


const timetableSchema = new mongoose.Schema(
{

    studentClass: {

        type:String,

        required:true,

        trim:true,

    },



    // Only for Class 11-12
    // Science / Humanities

    stream: {

        type:String,

        enum:[

            "Science",

            "Humanities",

            "",

        ],

        default:"",

        trim:true,

    },



    day: {

        type:String,

        required:true,

        enum:[

            "Monday",

            "Tuesday",

            "Wednesday",

            "Thursday",

            "Friday",

            "Saturday",

        ],

    },



    subject: {

        type:String,

        required:true,

        trim:true,

    },



    teacher: {

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true,

    },



    startTime: {

        type:String,

        required:true,

    },



    endTime: {

        type:String,

        required:true,

    },



    room: {

        type:String,

        trim:true,

        default:"",

    },


},

{

    timestamps:true,

}

);




// Prevent duplicate timetable slot

timetableSchema.index(

{

    studentClass:1,

    stream:1,

    day:1,

    startTime:1,

},

{

    unique:true,

}

);



module.exports = mongoose.model(
    "Timetable",
    timetableSchema
);