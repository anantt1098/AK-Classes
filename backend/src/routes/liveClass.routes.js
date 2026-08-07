const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");

const {
    createLiveClass,
    getAllLiveClasses,
    getStudentLiveClasses,
    deleteLiveClass,
} = require("../controllers/liveClass.controller");

router.post("/", verifyToken, isTeacher, createLiveClass);
router.get("/", verifyToken, isTeacher, getAllLiveClasses);
router.get("/student", verifyToken, isStudent, getStudentLiveClasses);
router.delete("/:id", verifyToken, isTeacher, deleteLiveClass);

module.exports = router;
