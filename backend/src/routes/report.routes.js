const express = require("express");

const router = express.Router();

const reportController = require("../controllers/report.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");

// ==========================================
// Student Routes
// ==========================================

// Get My Reports
router.get(
    "/me",
    verifyToken,
    reportController.getMyReports
);

// ==========================================
// Teacher Routes
// ==========================================

// Create Report
router.post(
    "/",
    verifyToken,
    isTeacher,
    reportController.createReport
);

// Get All Reports
router.get(
    "/",
    verifyToken,
    isTeacher,
    reportController.getAllReports
);

// Get Reports By Student
router.get(
    "/student/:studentId",
    verifyToken,
    isTeacher,
    reportController.getStudentReports
);

// Get Report By ID
router.get(
    "/:id",
    verifyToken,
    isTeacher,
    reportController.getReportById
);

// Update Report
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    reportController.updateReport
);

// Delete Report
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    reportController.deleteReport
);

module.exports = router;