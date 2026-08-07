const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");

// ==============================
// Student Routes
// ==============================
router.post("/student/register", authController.studentRegister);

router.post("/student/login", authController.studentLogin);

// ==============================
// Teacher Routes
// ==============================
router.post("/teacher/register", authController.teacherRegister);

router.post("/teacher/login", authController.teacherLogin);

// ==============================
// Common Routes
// ==============================
router.post("/logout", authController.logoutUser);

router.get("/me", authController.getCurrentUser);

module.exports = router;