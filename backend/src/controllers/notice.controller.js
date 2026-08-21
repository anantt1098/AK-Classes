const Notice = require("../models/notice.model");
const Student = require("../models/student.model");

// ==========================================
// Create Notice (Teacher)
// ==========================================
const createNotice = async (req, res) => {
    try {

        const {
            title,
            description,
            studentClass,
            attachment,
        } = req.body;

        if (
            !title ||
            !description
        ) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required.",
            });
        }

        const notice = await Notice.create({

            title,

            description,

            studentClass:
                studentClass || "All",

            attachment:
                attachment || "",

            publishedBy:
                req.user.id,

        });

        return res.status(201).json({

            success: true,

            message:
                "Notice created successfully.",

            notice,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};
// ==========================================
// Get All Notices
// ==========================================
const getAllNotices = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 10,
            search = "",
        } = req.query;

        const filter = {};

        if (search) {

            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];

        }

        const notices = await Notice.find(filter)
            .populate(
                "publishedBy",
                "username email"
            )
            .sort({
                createdAt: -1,
            })
            .skip(
                (Number(page) - 1) *
                    Number(limit)
            )
            .limit(Number(limit));

        const total =
            await Notice.countDocuments(
                filter
            );

        return res.status(200).json({

            success: true,

            page: Number(page),

            totalPages: Math.ceil(
                total / Number(limit)
            ),

            totalRecords: total,

            notices,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// ==========================================
// Get Notice By ID
// ==========================================
const getNoticeById = async (req, res) => {
    try {

        const notice =
            await Notice.findById(
                req.params.id
            ).populate(
                "publishedBy",
                "username email"
            );

        if (!notice) {

            return res.status(404).json({

                success: false,

                message:
                    "Notice not found.",

            });

        }

        return res.status(200).json({

            success: true,

            notice,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};
// ==========================================
// Update Notice
// ==========================================
const updateNotice = async (req, res) => {
    try {

        const notice = await Notice.findById(
            req.params.id
        );

        if (!notice) {

            return res.status(404).json({

                success: false,

                message: "Notice not found.",

            });

        }

        const {
            title,
            description,
            studentClass,
            attachment,
            isActive,
        } = req.body;

        if (title !== undefined) {
            notice.title = title;
        }

        if (description !== undefined) {
            notice.description =
                description;
        }

        if (studentClass !== undefined) {
            notice.studentClass =
                studentClass;
        }

        if (attachment !== undefined) {
            notice.attachment =
                attachment;
        }

        if (isActive !== undefined) {
            notice.isActive =
                isActive;
        }

        await notice.save();

        await notice.populate(
            "publishedBy",
            "username email"
        );

        return res.status(200).json({

            success: true,

            message:
                "Notice updated successfully.",

            notice,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// ==========================================
// Delete Notice
// ==========================================
const deleteNotice = async (req, res) => {
    try {

        const notice = await Notice.findById(
            req.params.id
        );

        if (!notice) {

            return res.status(404).json({

                success: false,

                message: "Notice not found.",

            });

        }

        await notice.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Notice deleted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get Student Notices
// ==========================================
const getStudentNotices = async (req, res) => {
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

        const filter = {
            isActive: true,
            $or: [
                { studentClass: "All" },
                { studentClass: student.studentClass },
            ],
        };

        if (student.stream && (student.studentClass === "11" || student.studentClass === "12")) {
            filter.$and = [
                {
                    $or: [
                        { stream: student.stream },
                        { stream: "" },
                        { stream: "All" },
                        { stream: { $exists: false } },
                    ],
                },
            ];
        }

        const notices = await Notice.find(filter)
            .populate("publishedBy", "username email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notices,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createNotice,
    getAllNotices,
    getStudentNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
};