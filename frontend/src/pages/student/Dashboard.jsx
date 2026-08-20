import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    FaBook,
    FaClipboardCheck,
    FaMoneyBillWave,
    FaPlayCircle,
    FaClipboardList,
    FaBroadcastTower,
    FaFileAlt,
    FaTasks,
    FaCalendarAlt,
} from "react-icons/fa";


import StatCard from "../../components/dashboard/StatCard";

import AttendanceChart from "../../components/charts/AttendanceChart";

import TestsTab from "../../components/student/tabs/TestsTab";

import AssignmentsTab from "../../components/student/tabs/AssignmentsTab";

import {
    getStudentDashboard,
} from "../../services/dashboard.service";



function Dashboard(){


    const [dashboard,setDashboard] =
    useState(null);



    const [loading,setLoading] =
    useState(true);





    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const data = await getStudentDashboard();
            setDashboard(data);
        } catch (error) {
            console.error(
                "Student Dashboard Error:",
                error
            );
            toast.error(
                "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);









    const calculateAttendance = ()=>{


        if(
            !dashboard?.attendance ||
            dashboard.attendance.length===0
        ){

            return 0;

        }



        let total = 0;

        let present = 0;




        dashboard.attendance.forEach(item=>{


            const record =
            item.records?.find(
                r =>
                r.student === dashboard.student._id ||
                r.student?._id === dashboard.student._id
            );



            if(record){


                total++;


                if(record.status==="Present"){

                    present++;

                }


            }



        });





        if(total===0)

            return 0;



        return Math.round(
            (present/total)*100
        );


    };






    const attendancePercentage =
    calculateAttendance();





    const attendanceData = [


        {

            month:"Current",

            attendance:
            attendancePercentage,

        }


    ];









    return (

        <div className="space-y-8">





            <div>


                <h1
                    className="
                    text-4xl
                    font-bold
                    text-slate-900
                    dark:text-white
                    "
                >

                    Student Dashboard

                </h1>



                <p
                    className="
                    mt-2
                    text-slate-500
                    dark:text-slate-400
                    "
                >

                    Welcome back 👋

                </p>




                {
                dashboard?.student &&
                (

                    <p
                        className="
                        mt-2
                        text-sm
                        text-blue-600
                        "
                    >

                        Class {dashboard.student.studentClass}


                        {
                        dashboard.student.stream &&
                        (
                            <>
                                {" • "}
                                {dashboard.student.stream}
                            </>
                        )
                        }


                    </p>

                )
                }



            </div>









            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
                <StatCard
                    title="Live Classes"
                    value={loading ? "..." : dashboard?.liveClasses?.length || 0}
                    icon={FaBroadcastTower}
                    color="bg-red-600"
                    path="/student/live-classes"
                    isLive={true}
                />

                <StatCard
                    title="Courses"
                    value={loading ? "..." : dashboard?.courses?.length || 0}
                    icon={FaBook}
                    color="bg-blue-500"
                    path="/student/courses"
                />

                <StatCard
                    title="Assignments"
                    value={loading ? "..." : dashboard?.assignments?.length || "View"}
                    icon={FaTasks}
                    color="bg-emerald-500"
                    path="/student/assignments"
                />

                <StatCard
                    title="Timetable"
                    value="View"
                    icon={FaCalendarAlt}
                    color="bg-indigo-500"
                    path="/student/timetables"
                />

                <StatCard
                    title="Videos"
                    value={loading ? "..." : dashboard?.videos?.length || 0}
                    icon={FaPlayCircle}
                    color="bg-purple-500"
                    path="/student/videos"
                />

                <StatCard
                    title="Notes"
                    value={loading ? "..." : dashboard?.notes?.length || 0}
                    icon={FaFileAlt}
                    color="bg-sky-500"
                    path="/student/notes"
                />

                <StatCard
                    title="Attendance"
                    value={loading ? "..." : `${attendancePercentage}%`}
                    icon={FaClipboardCheck}
                    color="bg-green-500"
                    path="/student/attendance"
                />

                <StatCard
                    title="Pending Fees"
                    value={loading ? "..." : `₹${dashboard?.fees?.dueFee || 0}`}
                    icon={FaMoneyBillWave}
                    color="bg-red-500"
                    path="/student/fees"
                />
            </div>










            <AttendanceChart

                data={attendanceData}

            />


            <AssignmentsTab />


            <TestsTab

                tests={
                    dashboard?.tests || []
                }

            />







        </div>

    );

}



export default Dashboard;