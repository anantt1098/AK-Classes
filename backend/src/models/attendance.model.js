const mongoose = require("mongoose");



const attendanceSchema = new mongoose.Schema(

    {

        // Teacher who marked attendance
        teacher: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },



        // Class 6-12
        studentClass: {

            type: String,

            required: true,

            enum: [

                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",

            ],

            trim:true,

        },



        // Required only for class 11-12
        stream: {

            type:String,

            enum:[

                "Science",

                "Humanities",

                ""

            ],

            default:"",

            trim:true,

        },



        date: {

            type:Date,

            required:true,

        },



        records:[

            {

                student:{

                    type:mongoose.Schema.Types.ObjectId,

                    ref:"Student",

                    required:true,

                },



                status:{

                    type:String,

                    enum:[

                        "Present",

                        "Absent",

                    ],

                    default:"Present",

                },


            }

        ],


    },

    {

        timestamps:true,

    }

);







// ==========================================
// Validate Stream
// ==========================================

attendanceSchema.pre("save", function () {
    if (
        (this.studentClass === "11" || this.studentClass === "12") &&
        !this.stream
    ) {
        throw new Error("Stream is required for class 11 and 12.");
    }

    if (this.studentClass !== "11" && this.studentClass !== "12") {
        this.stream = "";
    }
});







// ==========================================
// Prevent Duplicate Attendance
// Same Teacher + Class + Stream + Date
// ==========================================

attendanceSchema.index(

    {

        teacher:1,

        studentClass:1,

        stream:1,

        date:1,

    },

    {

        unique:true,

    }

);







module.exports = mongoose.model(

    "Attendance",

    attendanceSchema

);