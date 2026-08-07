const Fee = require("../models/fee.model");
const Student = require("../models/student.model");

// ==========================================
// Create Fee Record (Teacher)
// ==========================================
const createFee = async (req, res) => {
    try {
        const {
            student,
            totalFee,
            paidFee = 0,
            remarks,
        } = req.body;

        if (!student || totalFee === undefined) {
            return res.status(400).json({
                success: false,
                message: "Student and Total Fee are required.",
            });
        }

        const studentExists = await Student.findById(student);

        if (!studentExists) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }

        const existingFee = await Fee.findOne({ student });

        if (existingFee) {
            return res.status(409).json({
                success: false,
                message: "Fee record already exists.",
            });
        }

        const fee = await Fee.create({
            student,
            totalFee,
            paidFee,
            remarks,
            updatedBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Fee record created successfully.",
            fee,
        });

    } catch (error) {
        console.log("CREATE FEE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get All Fee Records (Teacher)
// ==========================================
const getAllFees = async (req, res) => {
    try {

        const fees = await Fee.find()
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "username email",
                },
            })
            .populate("updatedBy", "username")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: fees.length,
            fees,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Fee By Student (Teacher)
// ==========================================
const getStudentFee = async (req, res) => {
    try {

        const fee = await Fee.findOne({
            student: req.params.studentId,
        })
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "username email",
                },
            });

        if (!fee) {
            return res.status(404).json({
                success: false,
                message: "Fee record not found.",
            });
        }

        return res.status(200).json({
            success: true,
            fee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Fee By ID (Teacher)
// ==========================================
const getFeeById = async (req, res) => {
    try {

        const fee = await Fee.findById(req.params.id)
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "username email",
                },
            })
            .populate(
                "updatedBy",
                "username email"
            );

        if (!fee) {
            return res.status(404).json({
                success: false,
                message: "Fee record not found.",
            });
        }

        return res.status(200).json({
            success: true,
            fee,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==========================================
// Get My Fee (Student)
// ==========================================
const getMyFee = async (req, res) => {
    try {

        const student = await Student.findOne({
            user: req.user.id,
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found.",
            });
        }

        const fee = await Fee.findOne({
            student: student._id,
        });

        if (!fee) {
            return res.status(404).json({
                success: false,
                message: "Fee record not found.",
            });
        }

        return res.status(200).json({
            success: true,
            fee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Update Fee (Teacher)
// ==========================================
const updateFee = async (req, res) => {
    try {

        const fee = await Fee.findById(req.params.id);

        if (!fee) {
            return res.status(404).json({
                success: false,
                message: "Fee record not found.",
            });
        }

        const {
            totalFee,
            paidFee,
            remarks,
        } = req.body;

        if (totalFee !== undefined)
            fee.totalFee = totalFee;

        if (paidFee !== undefined)
            fee.paidFee = paidFee;

        if (remarks !== undefined)
            fee.remarks = remarks;

        fee.updatedBy = req.user.id;

        await fee.save();

        return res.status(200).json({
            success: true,
            message: "Fee updated successfully.",
            fee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Delete Fee (Teacher)
// ==========================================
const deleteFee = async (req, res) => {
    try {

        const fee = await Fee.findById(req.params.id);

        if (!fee) {
            return res.status(404).json({
                success: false,
                message: "Fee record not found.",
            });
        }

        await fee.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Fee record deleted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createFee,
    getAllFees,
    getFeeById,
    getStudentFee,
    getMyFee,
    updateFee,
    deleteFee,
};