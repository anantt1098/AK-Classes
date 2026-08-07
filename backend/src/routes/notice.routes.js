const express = require("express");

const router = express.Router();

const noticeController = require("../controllers/notice.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");

// ==========================================
// Student & Teacher Routes
// ==========================================

// Get Student Notices
router.get(
    "/student",
    verifyToken,
    noticeController.getStudentNotices
);

// Get All Notices
router.get(
    "/",
    verifyToken,
    noticeController.getAllNotices
);

// Get Notice By ID
router.get(
    "/:id",
    verifyToken,
    noticeController.getNoticeById
);

// ==========================================
// Teacher Routes
// ==========================================

// Create Notice
router.post(
    "/",
    verifyToken,
    isTeacher,
    noticeController.createNotice
);

// Update Notice
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    noticeController.updateNotice
);

// Delete Notice
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    noticeController.deleteNotice
);

module.exports = router;