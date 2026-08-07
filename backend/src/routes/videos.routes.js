const express = require("express");

const router = express.Router();

const videosController = require("../controllers/videos.controller");

const verifyToken = require("../middleware/verifyToken");
const isTeacher = require("../middleware/isTeacher");
const isStudent = require("../middleware/isStudent");


// ==========================================
// Teacher Routes
// ==========================================


// Upload Video
router.post(
    "/",
    verifyToken,
    isTeacher,
    videosController.uploadVideo
);


// Update Video
router.put(
    "/:id",
    verifyToken,
    isTeacher,
    videosController.updateVideo
);


// Delete Video
router.delete(
    "/:id",
    verifyToken,
    isTeacher,
    videosController.deleteVideo
);



// ==========================================
// Student Routes
// ==========================================


// Get Student Videos
router.get(
    "/student",
    verifyToken,
    isStudent,
    videosController.getStudentVideos
);



// ==========================================
// Common Routes
// ==========================================


// Get All Videos
router.get(
    "/",
    verifyToken,
    videosController.getAllVideos
);


// Get Video By ID
router.get(
    "/:id",
    verifyToken,
    videosController.getVideoById
);



module.exports = router;