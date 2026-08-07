const express = require("express");

const router = express.Router();


const {
    getTeacherDashboard,
    getStudentDashboard,
} = require("../controllers/dashboard.controller");


const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");




// ===============================
// Teacher Dashboard
// ===============================

router.get(
    "/teacher",
    verifyToken,
    isTeacher,
    getTeacherDashboard
);





// ===============================
// Student Dashboard
// ===============================

router.get(
    "/student",
    verifyToken,
    getStudentDashboard
);





module.exports = router;