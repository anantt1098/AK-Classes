const express = require("express");

const router = express.Router();

const feeController = require("../controllers/fee.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");

// ==========================================
// Student Routes
// ==========================================

// Get My Fee
router.get(
    "/me",
    verifyToken,
    feeController.getMyFee
);

// ==========================================
// Teacher Routes
// ==========================================

// Create Fee Record
router.post(
    "/",
    verifyToken,
    isTeacher,
    feeController.createFee
);

// Get All Fee Records
router.get(
    "/",
    verifyToken,
    isTeacher,
    feeController.getAllFees
);

// Get Fee By Student
router.get(
    "/student/:studentId",
    verifyToken,
    isTeacher,
    feeController.getStudentFee
);

// Get Fee By ID
router.get(
    "/:id",
    verifyToken,
    isTeacher,
    feeController.getFeeById
);

// Update Fee
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    feeController.updateFee
);

// Delete Fee
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    feeController.deleteFee
);

module.exports = router;