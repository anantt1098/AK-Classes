const express = require("express");

const router = express.Router();


const attendanceController =
    require("../controllers/attendance.controller");


const verifyToken =
    require("../middleware/verifyToken");


const isTeacher =
    require("../middleware/isTeacher");


const isStudent =
    require("../middleware/isStudent");




// ==========================================
// Student Routes
// ==========================================


// Get My Attendance

router.get(

    "/me",

    verifyToken,

    isStudent,

    attendanceController.getMyAttendance

);








// ==========================================
// Teacher Routes
// ==========================================


// Get Students For Attendance

router.get(

    "/students",

    verifyToken,

    isTeacher,

    attendanceController.getStudentsForAttendance

);








// Attendance Analytics

router.get(

    "/analytics",

    verifyToken,

    isTeacher,

    attendanceController.getAttendanceAnalytics

);








// Mark Class Attendance

router.post(

    "/",

    verifyToken,

    isTeacher,

    attendanceController.markAttendance

);








// Get All Attendance
// Filters: studentClass, stream, date

router.get(

    "/",

    verifyToken,

    isTeacher,

    attendanceController.getAllAttendance

);








// Get Attendance By ID

router.get(

    "/:id",

    verifyToken,

    isTeacher,

    attendanceController.getAttendanceById

);








// Update Attendance

router.put(

    "/:id",

    verifyToken,

    isTeacher,

    attendanceController.updateAttendance

);








// Delete Attendance

router.delete(

    "/:id",

    verifyToken,

    isTeacher,

    attendanceController.deleteAttendance

);







module.exports = router;