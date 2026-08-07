import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";


import PageHeader from "../../components/dashboard/PageHeader";

import StatCard from "../../components/dashboard/StatCard";
import QuickAction from "../../components/dashboard/QuickAction";
import RecentActivity from "../../components/dashboard/RecentActivity";
import RecentStudents from "../../components/dashboard/RecentStudents";
import UpcomingTests from "../../components/dashboard/UpcomingTests";


import AttendanceChart from "../../components/charts/AttendanceChart";
import FeeChart from "../../components/charts/FeeChart";
import StudentGrowthChart from "../../components/charts/StudentGrowthChart";


import Loader from "../../components/common/Loader";


import {
    teacherDashboardCards,
} from "../../data/dashboardCards";


import {
    getTeacherDashboard,
} from "../../services/dashboard.service";





function Dashboard(){


    const [dashboard,setDashboard] =
        useState({});


    const [loading,setLoading] =
        useState(true);


    const [error,setError] =
        useState(false);





    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError(false);
            const res = await getTeacherDashboard();
            setDashboard(res || {});
        } catch (_error) {
            setError(true);
            toast.error("Unable to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);









    if(loading){

        return (

            <div
                className="
                    flex
                    min-h-[400px]
                    items-center
                    justify-center
                "
            >

                <Loader/>

            </div>

        );

    }







    if(error){

        return (

            <div
                className="
                    mx-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-10
                    text-center
                    shadow-sm

                    dark:border-slate-700
                    dark:bg-slate-900
                "
            >


                <h2
                    className="
                        text-xl
                        font-bold
                        dark:text-white
                    "
                >

                    Dashboard unavailable

                </h2>



                <p className="mt-2 text-slate-500">

                    Unable to fetch dashboard data.

                </p>





                <button

                    onClick={fetchDashboard}

                    className="
                        mt-5
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-2
                        text-white
                        hover:bg-blue-700
                    "

                >

                    Retry

                </button>


            </div>

        );

    }









    const statistics =
        dashboard.statistics || {};



    const attendanceData =
        dashboard.attendanceChart || [];



    const feeData =
        dashboard.feeChart || [];



    const growthData =
        dashboard.studentGrowth || [];









    return (

        <div

            className="
                w-full

                px-6
                sm:px-10
                lg:px-14
                xl:px-20

                flex
                flex-col

                gap-10

                pb-12
            "

        >





            <PageHeader

                title="Teacher Dashboard"

                subtitle="Overview of students, attendance, fees and activities"

            />











            <section>
                <div
                    className="
                        grid
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        2xl:grid-cols-7
                    "
                >
                    {teacherDashboardCards.map((card) => (
                        <StatCard
                            key={card.key}
                            title={card.title}
                            value={statistics[card.key] ?? 0}
                            icon={card.icon}
                            color={card.color}
                            path={card.path}
                            isLive={card.isLive}
                        />
                    ))}
                </div>
            </section>












            <section>


                <div
                    className="
                        grid
                        gap-10
                        lg:grid-cols-2
                    "
                >


                    <AttendanceChart

                        data={attendanceData}

                    />



                    <FeeChart

                        data={feeData}

                    />


                </div>


            </section>












            <section>


                <StudentGrowthChart

                    data={growthData}

                />


            </section>












            <section>


                <div
                    className="
                        grid
                        gap-10
                        lg:grid-cols-2
                    "
                >


                    <RecentStudents

                        students={
                            dashboard.recentStudents || []
                        }

                    />



                    <UpcomingTests

                        tests={
                            dashboard.upcomingTests || []
                        }

                    />


                </div>


            </section>












            <section>


                <div
                    className="
                        grid
                        gap-10
                        lg:grid-cols-2
                    "
                >


                    <RecentActivity

                        activities={
                            dashboard.recentActivity || []
                        }

                    />



                    <QuickAction/>


                </div>


            </section>






        </div>

    );

}



export default Dashboard;