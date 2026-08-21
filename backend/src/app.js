const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const notesRoutes = require("./routes/notes.routes");
const videosRoutes = require("./routes/videos.routes");
const courseRoutes = require("./routes/course.routes");
const feeRoutes = require("./routes/fee.routes");
const testRoutes = require("./routes/test.routes");
const reportRoutes = require("./routes/report.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const noticeRoutes = require("./routes/notice.routes");
const timetableRoutes = require("./routes/timetable.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const liveClassRoutes = require("./routes/liveClass.routes");
const dppRoutes = require("./routes/dpp.routes");

const app = express();

// ==========================================
// Middleware
// ==========================================
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost",
    "https://localhost",
    "capacitor://localhost",
].filter(Boolean);


app.use(
    cors({
        origin: function (origin, callback) {

            if (!origin) {
                return callback(null, true);
            }

            if (
                allowedOrigins.includes(origin) ||
                origin.startsWith("http://localhost") ||
                origin.startsWith("https://localhost") ||
                origin.startsWith("capacitor://")
            ) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================================
// API Routes
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/dpp", dppRoutes);
app.use("/api/dpps", dppRoutes);

const fs = require("fs");
const path = require("path");

// ==========================================
// Health Check
// ==========================================
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Coaching Management API Running 🚀",
    });
});

const distPath = path.join(__dirname, "../../frontend/dist");
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("/{*splat}", (req, res, next) => {
        if (req.path.startsWith("/api")) return next();
        res.sendFile(path.join(distPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Coaching Management API Running 🚀",
        });
    });
}

// ==========================================
// 404 Handler for API
// ==========================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

module.exports = app;