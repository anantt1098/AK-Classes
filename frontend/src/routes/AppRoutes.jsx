import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";



// ============================
// Auth Pages
// ============================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";



// ============================
// Teacher Pages
// ============================

import TeacherDashboard from "../pages/teacher/Dashboard";

import Students from "../pages/teacher/Students";
import StudentForm from "../pages/teacher/StudentForm";
import StudentDetails from "../pages/teacher/StudentDetails";


import Tests from "../pages/teacher/Tests";
import TestForm from "../pages/teacher/TestForm";


import AttendanceManagement from "../pages/teacher/Attendance";
import AttendanceForm from "../pages/teacher/AttendanceForm";


import TeacherFees from "../pages/teacher/Fees";
import FeeForm from "../pages/teacher/FeeForm";


import TeacherReports from "../pages/teacher/Reports";
import ReportForm from "../pages/teacher/ReportForm";


import Notices from "../pages/teacher/Notices";
import NoticeForm from "../pages/teacher/NoticeForm";


import Timetables from "../pages/teacher/Timetables";
import TimetableForm from "../pages/teacher/TimetableForm";


import Assignments from "../pages/teacher/Assignments";
import AssignmentForm from "../pages/teacher/AssignmentForm";


// Academic Content

import TeacherCourses from "../pages/teacher/Courses";
import TeacherVideos from "../pages/teacher/Videos";
import TeacherNotes from "../pages/teacher/Notes";





// ============================
// Student Pages
// ============================

import StudentDashboard from "../pages/student/Dashboard";

import Profile from "../pages/student/Profile";

import Attendance from "../pages/student/Attendance";

import Fees from "../pages/student/Fees";

import Reports from "../pages/student/Reports";

import Notes from "../pages/student/Notes";

import Videos from "../pages/student/Videos";

import Courses from "../pages/student/Courses";





function AppRoutes() {


    return (

        <Routes>



            {/* ============================
                Public Routes
            ============================ */}


            <Route
                path="/login"
                element={<Login />}
            />


            <Route
                path="/register"
                element={<Register />}
            />








            {/* ============================
                Teacher Routes
            ============================ */}


            <Route

                element={

                    <ProtectedRoute

                        allowedRoles={[
                            "teacher",
                        ]}

                    >

                        <MainLayout />

                    </ProtectedRoute>

                }

            >



                <Route
                    path="/teacher/dashboard"
                    element={<TeacherDashboard />}
                />





                {/* Students */}


                <Route
                    path="/teacher/students"
                    element={<Students />}
                />


                <Route
                    path="/teacher/students/new"
                    element={<StudentForm />}
                />


                <Route
                    path="/teacher/students/:id/edit"
                    element={<StudentForm />}
                />


                <Route
                    path="/teacher/students/:id"
                    element={<StudentDetails />}
                />






                {/* Attendance */}


                <Route
                    path="/teacher/attendance"
                    element={<AttendanceManagement />}
                />


                <Route
                    path="/teacher/attendance/new"
                    element={<AttendanceForm />}
                />


                <Route
                    path="/teacher/attendance/:id/edit"
                    element={<AttendanceForm />}
                />







                {/* Fees */}


                <Route
                    path="/teacher/fees"
                    element={<TeacherFees />}
                />


                <Route
                    path="/teacher/fees/new"
                    element={<FeeForm />}
                />


                <Route
                    path="/teacher/fees/:id/edit"
                    element={<FeeForm />}
                />








                {/* Tests */}


                <Route
                    path="/teacher/tests"
                    element={<Tests />}
                />


                <Route
                    path="/teacher/tests/new"
                    element={<TestForm />}
                />


                <Route
                    path="/teacher/tests/:id/edit"
                    element={<TestForm />}
                />








                {/* Reports */}


                <Route
                    path="/teacher/reports"
                    element={<TeacherReports />}
                />


                <Route
                    path="/teacher/reports/new"
                    element={<ReportForm />}
                />


                <Route
                    path="/teacher/reports/:id/edit"
                    element={<ReportForm />}
                />








                {/* Notices */}


                <Route
                    path="/teacher/notices"
                    element={<Notices />}
                />


                <Route
                    path="/teacher/notices/new"
                    element={<NoticeForm />}
                />


                <Route
                    path="/teacher/notices/:id/edit"
                    element={<NoticeForm />}
                />








                {/* Timetable */}


                <Route
                    path="/teacher/timetables"
                    element={<Timetables />}
                />


                <Route
                    path="/teacher/timetables/new"
                    element={<TimetableForm />}
                />


                <Route
                    path="/teacher/timetables/:id/edit"
                    element={<TimetableForm />}
                />








                {/* Assignments */}


                <Route
                    path="/teacher/assignments"
                    element={<Assignments />}
                />


                <Route
                    path="/teacher/assignments/new"
                    element={<AssignmentForm />}
                />


                <Route
                    path="/teacher/assignments/:id/edit"
                    element={<AssignmentForm />}
                />








                {/* Courses */}


                <Route
                    path="/teacher/courses"
                    element={<TeacherCourses />}
                />





                {/* Videos */}


                <Route
                    path="/teacher/videos"
                    element={<TeacherVideos />}
                />





                {/* Notes */}


                <Route
                    path="/teacher/notes"
                    element={<TeacherNotes />}
                />




            </Route>









            {/* ============================
                Student Routes
            ============================ */}



            <Route

                element={

                    <ProtectedRoute

                        allowedRoles={[
                            "student",
                        ]}

                    >

                        <MainLayout />

                    </ProtectedRoute>

                }

            >




                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />



                <Route
                    path="/student/profile"
                    element={<Profile />}
                />



                <Route
                    path="/student/attendance"
                    element={<Attendance />}
                />



                <Route
                    path="/student/fees"
                    element={<Fees />}
                />



                <Route
                    path="/student/reports"
                    element={<Reports />}
                />



                <Route
                    path="/student/notes"
                    element={<Notes />}
                />



                <Route
                    path="/student/videos"
                    element={<Videos />}
                />



                <Route
                    path="/student/courses"
                    element={<Courses />}
                />



            </Route>









            {/* ============================
                Default Redirect
            ============================ */}


            <Route

                path="/"

                element={

                    <Navigate
                        to="/login"
                        replace
                    />

                }

            />






            {/* ============================
                404
            ============================ */}


            <Route

                path="*"

                element={

                    <Navigate
                        to="/login"
                        replace
                    />

                }

            />



        </Routes>

    );

}



export default AppRoutes;