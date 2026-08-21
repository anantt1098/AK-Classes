const Student = require("../models/student.model");

const Test = require("../models/test.model");
const Report = require("../models/report.model");
const Fee = require("../models/fee.model");

const Course = require("../models/course.model");
const Note = require("../models/notes.model");
const Video = require("../models/video.model");
const Assignment = require("../models/assignment.model");
const Notice = require("../models/notice.model");
const Timetable = require("../models/timetable.model");
const Attendance = require("../models/attendance.model");
const LiveClass = require("../models/liveClass.model");
const DPP = require("../models/dpp.model");



// ======================================
// Teacher Dashboard
// ======================================

async function getTeacherDashboard(req, res) {
    try {
        const students = await Student.countDocuments({
            isActive: true,
        });

        const reports = await Report.countDocuments();

        const pendingFees = await Fee.countDocuments({
            $or: [
                { status: { $in: ["Pending", "Partial"] } },
                { dueFee: { $gt: 0 } },
            ],
        });

        const totalVideos = await Video.countDocuments();
        const totalNotes = await Note.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalAssignments = await Assignment.countDocuments();
        const totalLiveClasses = await LiveClass.countDocuments();
        const liveNowClasses = await LiveClass.countDocuments({ status: "Live" });

        const recentStudents = await Student.find()
            .populate("user", "username email")
            .sort({ createdAt: -1 })
            .limit(5);

        const upcomingTests = await Test.find()
            .sort({ dueDate: 1 })
            .limit(5);

        // Calculate overall attendance percentage
        const allAttendance = await Attendance.find();
        let totalPresent = 0;
        let totalRecords = 0;
        allAttendance.forEach((att) => {
            if (Array.isArray(att.records)) {
                att.records.forEach((rec) => {
                    totalRecords++;
                    if (rec.status === "Present") totalPresent++;
                });
            }
        });
        const overallAttendancePercent = totalRecords > 0 ? Math.round((totalPresent / totalRecords) * 100) : 0;

        // Calculate 6-month historical data dynamically
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const now = new Date();

        const studentGrowth = [];
        const attendanceChart = [];
        const feeChart = [];

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthLabel = monthNames[d.getMonth()];
            const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
            const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

            // 1. Cumulative Student Growth
            const totalStudentsTillMonth = await Student.countDocuments({
                createdAt: { $lte: endOfMonth }
            });
            studentGrowth.push({
                month: monthLabel,
                students: totalStudentsTillMonth
            });

            // 2. Monthly Attendance Percentage
            const monthAttendanceRecords = await Attendance.find({
                date: { $gte: startOfMonth, $lte: endOfMonth }
            });
            let monthPresent = 0;
            let monthTotal = 0;
            monthAttendanceRecords.forEach((att) => {
                if (Array.isArray(att.records)) {
                    att.records.forEach((rec) => {
                        monthTotal++;
                        if (rec.status === "Present") monthPresent++;
                    });
                }
            });
            const monthAttendancePercent = monthTotal > 0 ? Math.round((monthPresent / monthTotal) * 100) : 0;
            attendanceChart.push({
                month: monthLabel,
                attendance: monthAttendancePercent
            });

            // 3. Monthly Fee Collection Amount
            const monthFees = await Fee.find({
                updatedAt: { $gte: startOfMonth, $lte: endOfMonth }
            });
            const totalFeeAmount = monthFees.reduce((sum, f) => sum + (f.paidFee || 0), 0);
            feeChart.push({
                month: monthLabel,
                amount: totalFeeAmount
            });
        }

        return res.json({
            statistics: {
                students,
                attendance: overallAttendancePercent,
                pendingFees,
                reports,
                totalVideos,
                totalNotes,
                totalCourses,
                totalAssignments,
                totalLiveClasses,
                liveNowClasses,
            },

            attendanceChart,
            feeChart,
            studentGrowth,

            recentStudents,
            upcomingTests,
            recentActivity: [],
        });



    }
    catch(err){


        res.status(500).json({

            success:false,

            message:err.message,

        });


    }

}





// ======================================
// Student Dashboard
// ======================================

async function getStudentDashboard(req,res){


    try{


        const student =
        await Student.findOne({

            user:req.user.id

        });




        if(!student){


            return res.status(404).json({

                message:
                "Student profile not found."

            });


        }






        const academicFilter = {
            studentClass: { $in: [student.studentClass, "All"] },
            isActive: true,
        };

        if (student.subjects && student.subjects.length > 0) {
            academicFilter.subject = {
                $in: student.subjects,
            };
        }

        if (student.stream) {
            academicFilter.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }

        const liveClassFilter = {
            studentClass: { $in: [student.studentClass, "All"] },
        };

        if (student.subjects && student.subjects.length > 0) {
            liveClassFilter.subject = {
                $in: student.subjects,
            };
        }

        if (student.stream) {
            liveClassFilter.$or = [
                { stream: student.stream },
                { stream: "" },
                { stream: { $exists: false } },
            ];
        }

        const [
            courses,
            notes,
            videos,
            assignments,
            tests,
            liveClasses,
            dpps,
        ] = await Promise.all([
            Course.find(academicFilter),
            Note.find(academicFilter),
            Video.find(academicFilter),
            Assignment.find(academicFilter),
            Test.find(academicFilter),
            LiveClass.find(liveClassFilter),
            DPP.find(academicFilter),
        ]);

        const noticeOrConditions = [
            {
                studentClass: "All",
            },
            {
                studentClass: student.studentClass,
            },
        ];

        const notices = await Notice.find({
            isActive: true,
            $or: noticeOrConditions,
        });

        const timetableFilter = {
            studentClass: student.studentClass,
        };

        if (student.subjects && student.subjects.length > 0) {
            timetableFilter.subject = {
                $in: student.subjects,
            };
        }

        if (student.stream) {
            timetableFilter.stream = student.stream;
        }

        const timetable = await Timetable.find(timetableFilter);






        const attendance =
        await Attendance.find({

            "records.student":
            student._id

        });






        const fees =
        await Fee.findOne({

            student:
            student._id

        });






        const reports =
        await Report.find({

            student:
            student._id

        })

        .populate(

            "test",

            "title subject"

        );






        return res.json({


            student,



            statistics:{



                courses:
                courses.length,



                notes:
                notes.length,



                videos:
                videos.length,



                assignments:
                assignments.length,



                tests:
                tests.length,

                liveClasses:
                liveClasses.length,
            },

            courses,
            notes,
            videos,
            assignments,
            tests,
            liveClasses,
            dpps,
            notices,
            timetable,
            attendance,
            fees,
            reports,


        });





    }
    catch(err){


        res.status(500).json({

            success:false,

            message:err.message,

        });


    }


}





module.exports = {


    getTeacherDashboard,


    getStudentDashboard,


};