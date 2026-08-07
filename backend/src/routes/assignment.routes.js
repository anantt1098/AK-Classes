const express = require("express");


const router = express.Router();


const assignmentController = require("../controllers/assignment.controller");


const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");



// ==========================================
// Student Routes
// ==========================================


// Get Student Assignments
router.get(

    "/student",

    verifyToken,

    isStudent,

    assignmentController.getStudentAssignments

);




// ==========================================
// Student & Teacher Routes
// ==========================================


// Get All Assignments
router.get(

    "/",

    verifyToken,

    assignmentController.getAllAssignments

);



// Get Assignment By ID
router.get(

    "/:id",

    verifyToken,

    assignmentController.getAssignmentById

);





// ==========================================
// Teacher Routes
// ==========================================


// Create Assignment
router.post(

    "/",

    verifyToken,

    isTeacher,

    assignmentController.createAssignment

);




// Update Assignment
router.put(

    "/:id",

    verifyToken,

    isTeacher,

    assignmentController.updateAssignment

);




// Delete Assignment
router.delete(

    "/:id",

    verifyToken,

    isTeacher,

    assignmentController.deleteAssignment

);



module.exports = router;