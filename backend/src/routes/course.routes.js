const express = require("express");

const router = express.Router();

const courseController = require("../controllers/course.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");


// ==========================================
// Teacher Routes
// ==========================================

// Upload Course
router.post(
    "/",
    verifyToken,
    isTeacher,
    courseController.uploadCourse
);


// Update Course
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    courseController.updateCourse
);


// Delete Course
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    courseController.deleteCourse
);



// ==========================================
// Student Routes
// ==========================================

// Get Student Courses
router.get(
    "/student",
    verifyToken,
    isStudent,
    courseController.getStudentCourses
);



// ==========================================
// Common Routes
// ==========================================

// Teacher + Student
router.get(
    "/",
    verifyToken,
    courseController.getAllCourses
);


// Get Course By ID
router.get(
    "/:id",
    verifyToken,
    courseController.getCourseById
);



module.exports = router;