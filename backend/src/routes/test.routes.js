const express = require("express");

const router = express.Router();

const testController = require("../controllers/test.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");



// ==========================================
// Teacher Routes
// ==========================================


// Upload Test
router.post(
    "/",
    verifyToken,
    isTeacher,
    testController.uploadTest
);


// Update Test
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    testController.updateTest
);


// Delete Test
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    testController.deleteTest
);





// ==========================================
// Student Routes
// ==========================================


// Get Tests According To Student
// Class + Stream + Subjects
router.get(
    "/student/my-tests",
    verifyToken,
    isStudent,
    testController.getStudentTests
);





// ==========================================
// Common Routes
// ==========================================


// Get All Tests
router.get(
    "/",
    verifyToken,
    testController.getAllTests
);


// Get Test By ID
router.get(
    "/:id",
    verifyToken,
    testController.getTestById
);





module.exports = router;