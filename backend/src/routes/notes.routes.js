const express = require("express");

const router = express.Router();

const notesController = require("../controllers/notes.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");



// ==========================================
// Teacher Routes
// ==========================================


// Upload Note
router.post(
    "/",
    verifyToken,
    isTeacher,
    notesController.uploadNote
);



// Update Note
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    notesController.updateNote
);



// Delete Note
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    notesController.deleteNote
);





// ==========================================
// Student Routes
// ==========================================


// Get Notes For Logged-in Student
router.get(
    "/student",
    verifyToken,
    isStudent,
    notesController.getStudentNotes
);





// ==========================================
// Common Routes
// ==========================================


// Get All Notes
router.get(
    "/",
    verifyToken,
    notesController.getAllNotes
);



// Get Note By ID
router.get(
    "/:id",
    verifyToken,
    notesController.getNoteById
);




module.exports = router;