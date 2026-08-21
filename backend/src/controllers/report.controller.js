const Report = require("../models/report.model");
const Student = require("../models/student.model");
const Test = require("../models/test.model");

// ==========================================
// Upload Report (Teacher)
// ==========================================
const createReport = async (req, res) => {
    try {
        const {
            student,
            test,
            obtainedMarks,
            totalMarks,
            remarks,
        } = req.body;

        if (
            !student ||
            !test ||
            obtainedMarks === undefined ||
            totalMarks === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required.",
            });
        }

        const studentExists = await Student.findById(student);

        if (!studentExists) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }

        const testExists = await Test.findById(test);

        if (!testExists) {
            return res.status(404).json({
                success: false,
                message: "Test not found.",
            });
        }

        const existingReport = await Report.findOne({
            student,
            test,
        });

        if (existingReport) {
            return res.status(409).json({
                success: false,
                message: "Report already exists for this test.",
            });
        }

        const report = await Report.create({
            student,
            test,
            obtainedMarks,
            totalMarks,
            remarks,
            uploadedBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Report uploaded successfully.",
            report,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get All Reports (Teacher)
// ==========================================
const getAllReports = async (req, res) => {
    try {

        const reports = await Report.find()
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "username email",
                },
            })
            .populate("test", "title subject studentClass stream")
            .populate("uploadedBy", "username")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Reports By Student (Teacher)
// ==========================================
const getStudentReports = async (req, res) => {
    try {

        const reports = await Report.find({
            student: req.params.studentId,
        })
            .populate("test", "title subject")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Report By ID (Teacher)
// ==========================================
const getReportById = async (req, res) => {
    try {

        const report = await Report.findById(
            req.params.id
        )
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "username email",
                },
            })
            .populate(
                "test",
                "title subject"
            )
            .populate(
                "uploadedBy",
                "username email"
            );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found.",
            });
        }

        return res.status(200).json({
            success: true,
            report,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// ==========================================
// Get My Reports (Student)
// ==========================================
const getMyReports = async (req, res) => {
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

        const reports = await Report.find({
            student: student._id,
        })
            .populate("test", "title subject totalMarks")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Update Report (Teacher)
// ==========================================
const updateReport = async (req, res) => {
    try {

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found.",
            });
        }

        const {
            obtainedMarks,
            totalMarks,
            remarks,
        } = req.body;

        if (obtainedMarks !== undefined)
            report.obtainedMarks = obtainedMarks;

        if (totalMarks !== undefined)
            report.totalMarks = totalMarks;

        if (remarks !== undefined)
            report.remarks = remarks;

        report.uploadedBy = req.user.id;

        await report.save();

        return res.status(200).json({
            success: true,
            message: "Report updated successfully.",
            report,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Delete Report (Teacher)
// ==========================================
const deleteReport = async (req, res) => {
    try {

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found.",
            });
        }

        await report.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    getStudentReports,
    getMyReports,
    updateReport,
    deleteReport,
};