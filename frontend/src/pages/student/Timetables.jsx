import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaClock, FaUser, FaDoorOpen } from "react-icons/fa";
import { getStudentTimetables } from "../../services/timetable.service";

const days = ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Timetables() {
    const [timetables, setTimetables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState("All Days");

    const fetchTimetables = async () => {
        try {
            setLoading(true);
            const res = await getStudentTimetables();
            setTimetables(res.timetables || []);
        } catch (_error) {
            toast.error("Unable to load timetable.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetables();
    }, []);

    const filteredTimetables = timetables.filter((item) => {
        if (activeDay === "All Days") return true;
        return item.day?.toLowerCase() === activeDay.toLowerCase();
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Class Timetable</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    View your weekly class schedule and lecture timings.
                </p>
            </div>

            {/* Day Tabs */}
            <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-3 dark:border-slate-800 scrollbar-none">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                            activeDay === day
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="py-12 text-center text-slate-500">Loading timetable...</div>
            ) : filteredTimetables.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaCalendarAlt className="mx-auto text-4xl text-slate-400" />
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No Timetable Found</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {activeDay === "All Days"
                            ? "No timetable scheduled for your class yet."
                            : `No timetable scheduled for ${activeDay}.`}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTimetables.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                        {item.day}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        <FaClock className="text-blue-500" />
                                        <span>
                                            {item.startTime} - {item.endTime}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-bold text-xl text-slate-900 dark:text-white">
                                        {item.subject}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 text-xs font-medium mt-2">
                                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                            Class: {item.studentClass}
                                        </span>
                                        {item.stream && (
                                            <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                                Stream: {item.stream}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <FaUser className="text-slate-400 text-xs" />
                                        <span>Teacher: <strong className="text-slate-800 dark:text-slate-200">{item.teacher?.username || "N/A"}</strong></span>
                                    </div>
                                    {item.room && (
                                        <div className="flex items-center gap-2">
                                            <FaDoorOpen className="text-slate-400 text-xs" />
                                            <span>Room: <strong className="text-slate-800 dark:text-slate-200">{item.room}</strong></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Timetables;
