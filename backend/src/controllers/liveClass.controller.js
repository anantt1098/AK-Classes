const LiveClass = require("../models/liveClass.model");
const Student = require("../models/student.model");

// ==========================================
// Create Live Class (Teacher)
// ==========================================
const createLiveClass = async (req, res) => {
    try {
        const {
            title,
            description,
            studentClass,
            stream,
            subject,
            youtubeLink,
            status,
            scheduledAt,
        } = req.body;

        if (!title || !studentClass || !subject || !youtubeLink) {
            return res.status(400).json({
                success: false,
                message: "Title, Class, Subject, and Live YouTube Link are required.",
            });
        }

        const liveClass = await LiveClass.create({
            title,
            description,
            studentClass,
            stream: stream || "",
            subject,
            youtubeLink,
            status: status || "Live",
            scheduledAt: scheduledAt || new Date(),
            uploadedBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Live class created successfully.",
            liveClass,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get All Live Classes (Teacher)
// ==========================================
const getAllLiveClasses = async (req, res) => {
    try {
        const { studentClass, stream, subject, search } = req.query;

        const query = {};

        if (studentClass) query.studentClass = studentClass;
        if (stream) query.stream = stream;
        if (subject) query.subject = subject;
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const liveClasses = await LiveClass.find(query)
            .populate("uploadedBy", "username email")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            count: liveClasses.length,
            liveClasses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Live Classes For Logged In Student
// ==========================================
const getStudentLiveClasses = async (req, res) => {
    try {
        const student = await Student.findOne({
            user: req.user.id,
            isActive: true,
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found.",
            });
        }

        const query = {
            studentClass: { $in: [student.studentClass, "All"] },
        };

        if (student.subjects && student.subjects.length > 0) {
            query.subject = { $in: student.subjects };
        }

        if (student.stream) {
            query.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }

        const liveClasses = await LiveClass.find(query)
            .populate("uploadedBy", "username email")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            count: liveClasses.length,
            liveClasses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Delete Live Class (Teacher)
// ==========================================
const deleteLiveClass = async (req, res) => {
    try {
        const liveClass = await LiveClass.findById(req.params.id);

        if (!liveClass) {
            return res.status(404).json({
                success: false,
                message: "Live class not found.",
            });
        }

        await liveClass.deleteOne();

        return res.json({
            success: true,
            message: "Live class deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createLiveClass,
    getAllLiveClasses,
    getStudentLiveClasses,
    deleteLiveClass,
};
