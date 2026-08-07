import {
    FaUserGraduate,
    FaClipboardCheck,
    FaMoneyBillWave,
    FaFileAlt,
    FaVideo,
    FaBookOpen,
} from "react-icons/fa";

export const teacherDashboardCards = [
    {
        key: "students",
        title: "Total Students",
        icon: FaUserGraduate,
        color: "bg-blue-500",
    },
    {
        key: "totalVideos",
        title: "Uploaded Videos",
        icon: FaVideo,
        color: "bg-indigo-500",
    },
    {
        key: "totalCourses",
        title: "Uploaded Courses",
        icon: FaBookOpen,
        color: "bg-amber-500",
    },
    {
        key: "totalNotes",
        title: "Uploaded Notes",
        icon: FaFileAlt,
        color: "bg-sky-500",
    },
    {
        key: "attendance",
        title: "Avg Attendance %",
        icon: FaClipboardCheck,
        color: "bg-emerald-500",
    },
    {
        key: "pendingFees",
        title: "Pending Fees",
        icon: FaMoneyBillWave,
        color: "bg-rose-500",
    },
    {
        key: "reports",
        title: "Reports",
        icon: FaFileAlt,
        color: "bg-purple-500",
    },
];