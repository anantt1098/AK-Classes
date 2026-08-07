const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
            unique: true,
        },

        totalFee: {
            type: Number,
            required: true,
            min: 0,
        },

        paidFee: {
            type: Number,
            default: 0,
            min: 0,
        },

        dueFee: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Partial",
                "Paid",
            ],
            default: "Pending",
        },

        remarks: {
            type: String,
            trim: true,
            default: "",
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


// Automatically calculate due fee and status
feeSchema.pre("save", function () {

    this.dueFee =
        this.totalFee - this.paidFee;


    if (this.paidFee === 0) {

        this.status = "Pending";

    } 
    else if (this.paidFee >= this.totalFee) {

        this.status = "Paid";
        this.dueFee = 0;

    } 
    else {

        this.status = "Partial";

    }

});


module.exports = mongoose.model(
    "Fee",
    feeSchema
);