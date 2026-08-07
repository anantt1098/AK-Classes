const express = require("express");

const router = express.Router();

const timetableController = require("../controllers/timetable.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");

// ==========================================
// Student & Teacher Routes
// ==========================================

// Get Student Timetables
router.get(
    "/student",
    verifyToken,
    timetableController.getStudentTimetables
);

// Get All Timetables
router.get(
    "/",
    verifyToken,
    timetableController.getAllTimetables
);

// Get Timetable By ID
router.get(
    "/:id",
    verifyToken,
    timetableController.getTimetableById
);

// ==========================================
// Teacher Routes
// ==========================================

// Create Timetable
router.post(
    "/",
    verifyToken,
    isTeacher,
    timetableController.createTimetable
);

// Update Timetable
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    timetableController.updateTimetable
);

// Delete Timetable
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    timetableController.deleteTimetable
);

module.exports = router;