const express = require("express");

const router = express.Router();

const dppController = require("../controllers/dpp.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");

// ==========================================
// Teacher Routes
// ==========================================

// Upload DPP
router.post(
    "/",
    verifyToken,
    isTeacher,
    dppController.uploadDPP
);

// Update DPP
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    dppController.updateDPP
);

// Delete DPP
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    dppController.deleteDPP
);

// ==========================================
// Student Routes
// ==========================================

// Get DPPs For Logged-in Student
router.get(
    "/student",
    verifyToken,
    isStudent,
    dppController.getStudentDPPs
);

// ==========================================
// Common Routes
// ==========================================

// Get All DPPs
router.get(
    "/",
    verifyToken,
    dppController.getAllDPPs
);

// Get DPP By ID
router.get(
    "/:id",
    verifyToken,
    dppController.getDPPById
);

module.exports = router;
