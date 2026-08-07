import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";


import PageHeader from "../../components/dashboard/PageHeader";
import Loader from "../../components/common/Loader";


import {
    getMyAttendance,
} from "../../services/attendance.service";





function Attendance(){


    const [loading,setLoading] =
        useState(true);



    const [attendance,setAttendance] =
        useState([]);



    const [summary,setSummary] =
        useState({

            total:0,

            present:0,

            absent:0,

            percentage:0,

        });







    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const res = await getMyAttendance();
            setAttendance(res.attendance || []);
            setSummary(
                res.summary || {
                    total: 0,
                    present: 0,
                    absent: 0,
                    percentage: 0,
                }
            );
        } catch (_error) {
            toast.error("Unable to load attendance.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);








    const getStatus=(item)=>{


        const record =
            item.records?.[0];



        return record?.status || "Absent";


    };







    return (

        <div className="space-y-8">


            <PageHeader

                title="My Attendance"

                subtitle="View your attendance history"

            />





            {
            loading ?


            <Loader/>


            :


            <>





            {/* Summary Cards */}
            <div className="grid gap-5 sm:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Classes</p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{summary.total}</h2>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Present</p>
                    <h2 className="mt-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">{summary.present}</h2>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Absent</p>
                    <h2 className="mt-3 text-3xl font-bold text-rose-600 dark:text-rose-400">{summary.absent}</h2>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Percentage</p>
                    <h2 className="mt-3 text-3xl font-bold text-blue-600 dark:text-blue-400">{summary.percentage}%</h2>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="min-w-full text-left">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Class</th>
                            <th className="p-4">Stream</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
                        {attendance.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-10 text-center text-slate-400">
                                    No attendance record found.
                                </td>
                            </tr>
                        ) : (
                            attendance.map((item) => (
                                <tr key={item._id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="p-4 font-medium text-slate-900 dark:text-slate-200">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300">
                                        Class {item.studentClass}
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300">
                                        {item.stream || "-"}
                                    </td>
                                    <td className="p-4">
                                        {getStatus(item) === "Present" ? (
                                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                Present
                                            </span>
                                        ) : (
                                            <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                                Absent
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            </>

            }



        </div>

    );


}


export default Attendance;