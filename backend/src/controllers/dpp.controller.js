const DPP = require("../models/dpp.model");
const Student = require("../models/student.model");

// ==========================================
// Upload DPP (Teacher)
// ==========================================
const uploadDPP = async (req, res) => {
    try {
        const {
            title,
            description,
            studentClass,
            stream,
            subject,
            driveLink,
        } = req.body;

        if (!title || !studentClass || !subject || !driveLink) {
            return res.status(400).json({
                success: false,
                message: "Title, Class, Subject, and Link are required.",
            });
        }

        const dpp = await DPP.create({
            title,
            description: description || "",
            studentClass,
            stream: stream || "",
            subject,
            driveLink,
            uploadedBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "DPP uploaded successfully.",
            dpp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get All DPPs (Teacher)
// ==========================================
const getAllDPPs = async (req, res) => {
    try {
        const {
            studentClass,
            stream,
            subject,
            search,
            page = 1,
            limit = 10,
        } = req.query;

        const query = {};

        if (studentClass) query.studentClass = studentClass;
        if (stream) query.stream = stream;
        if (subject) query.subject = subject;

        if (search) {
            query.title = {
                $regex: search,
                $options: "i",
            };
        }

        const dpps = await DPP.find(query)
            .populate("uploadedBy", "username email")
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const total = await DPP.countDocuments(query);

        return res.status(200).json({
            success: true,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            dpps,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get DPPs For Logged-in Student
// ==========================================
const getStudentDPPs = async (req, res) => {
    try {
        const student = await Student.findOne({
            user: req.user.id,
            isActive: true,
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }

        const query = {
            studentClass: student.studentClass,
            isActive: true,
        };

        if (student.subjects && student.subjects.length > 0) {
            query.subject = {
                $in: student.subjects,
            };
        }

        if (student.studentClass === "11" || student.studentClass === "12") {
            if (student.stream) {
                query.$or = [
                    { stream: student.stream },
                    { stream: "" },
                    { stream: { $exists: false } },
                ];
            }
        }

        const dpps = await DPP.find(query)
            .populate("uploadedBy", "username email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            dpps,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get DPP By ID
// ==========================================
const getDPPById = async (req, res) => {
    try {
        const dpp = await DPP.findById(req.params.id).populate(
            "uploadedBy",
            "username email"
        );

        if (!dpp) {
            return res.status(404).json({
                success: false,
                message: "DPP not found.",
            });
        }

        return res.json({
            success: true,
            dpp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Update DPP (Teacher)
// ==========================================
const updateDPP = async (req, res) => {
    try {
        const dpp = await DPP.findById(req.params.id);

        if (!dpp) {
            return res.status(404).json({
                success: false,
                message: "DPP not found.",
            });
        }

        const {
            title,
            description,
            studentClass,
            stream,
            subject,
            driveLink,
            isActive,
        } = req.body;

        if (title !== undefined) dpp.title = title;
        if (description !== undefined) dpp.description = description;
        if (studentClass !== undefined) dpp.studentClass = studentClass;
        if (stream !== undefined) dpp.stream = stream;
        if (subject !== undefined) dpp.subject = subject;
        if (driveLink !== undefined) dpp.driveLink = driveLink;
        if (isActive !== undefined) dpp.isActive = isActive;

        await dpp.save();

        return res.status(200).json({
            success: true,
            message: "DPP updated successfully.",
            dpp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Delete DPP (Teacher)
// ==========================================
const deleteDPP = async (req, res) => {
    try {
        const dpp = await DPP.findById(req.params.id);

        if (!dpp) {
            return res.status(404).json({
                success: false,
                message: "DPP not found.",
            });
        }

        await dpp.deleteOne();

        return res.json({
            success: true,
            message: "DPP deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadDPP,
    getAllDPPs,
    getStudentDPPs,
    getDPPById,
    updateDPP,
    deleteDPP,
};
