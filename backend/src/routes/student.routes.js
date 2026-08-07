const express = require("express");

const router = express.Router();

const studentController = require("../controllers/student.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");


// ==========================================
// Student Routes
// ==========================================


// Get Student Dashboard Data
router.get(
    "/dashboard",
    verifyToken,
    isStudent,
    studentController.getStudentDashboard
);


// Get My Profile
router.get(
    "/profile/me",
    verifyToken,
    isStudent,
    studentController.getMyProfile
);


// Update My Profile
router.put(
    "/profile/me",
    verifyToken,
    isStudent,
    studentController.updateMyProfile
);



// ==========================================
// Teacher Routes
// ==========================================


// Create Student
router.post(
    "/",
    verifyToken,
    isTeacher,
    studentController.createStudent
);


// Get All Students
router.get(
    "/",
    verifyToken,
    isTeacher,
    studentController.getAllStudents
);


// Get Teachers For Timetable
router.get(
    "/teachers",
    verifyToken,
    isTeacher,
    studentController.getAllTeachers
);


// Get Student By ID
router.get(
    "/:id",
    verifyToken,
    isTeacher,
    studentController.getStudentById
);


// Update Student
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    studentController.updateStudent
);


// Delete Student
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    studentController.deleteStudent
);


module.exports = router;