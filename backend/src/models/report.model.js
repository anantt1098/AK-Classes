const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        test: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required: true,
        },

        obtainedMarks: {
            type: Number,
            required: true,
            min: 0,
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 1,
        },

        percentage: {
            type: Number,
            default: 0,
        },

        remarks: {
            type: String,
            trim: true,
            default: "",
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


// One report per student per test
reportSchema.index(
    {
        student: 1,
        test: 1,
    },
    {
        unique: true,
    }
);


// Auto calculate percentage
reportSchema.pre("save", function () {

    this.percentage =
        (this.obtainedMarks / this.totalMarks) * 100;

});


module.exports = mongoose.model(
    "Report",
    reportSchema
);