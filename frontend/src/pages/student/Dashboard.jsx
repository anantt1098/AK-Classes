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









            <div
                className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-5
                "
            >





                <StatCard

                    title="Courses"

                    value={
                        loading
                        ?
                        "..."
                        :
                        dashboard?.courses?.length || 0
                    }

                    icon={FaBook}

                    color="bg-blue-500"

                />







                <StatCard

                    title="Attendance"

                    value={
                        loading
                        ?
                        "..."
                        :
                        `${attendancePercentage}%`
                    }

                    icon={FaClipboardCheck}

                    color="bg-green-500"

                />







                <StatCard

                    title="Pending Fees"

                    value={
                        loading
                        ?
                        "..."
                        :
                        `₹${dashboard?.fees?.dueFee || 0}`
                    }

                    icon={FaMoneyBillWave}

                    color="bg-red-500"

                />







                <StatCard

                    title="Videos"

                    value={
                        loading
                        ?
                        "..."
                        :
                        dashboard?.videos?.length || 0
                    }

                    icon={FaPlayCircle}

                    color="bg-purple-500"

                />







                <StatCard

                    title="Tests"

                    value={
                        loading
                        ?
                        "..."
                        :
                        dashboard?.tests?.length || 0
                    }

                    icon={FaClipboardList}

                    color="bg-orange-500"

                />





            </div>










            <AttendanceChart

                data={attendanceData}

            />









            <TestsTab

                tests={
                    dashboard?.tests || []
                }

            />







        </div>

    );

}



export default Dashboard;