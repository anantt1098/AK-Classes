import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTasks, FaExternalLinkAlt, FaCalendarAlt, FaUser, FaSearch } from "react-icons/fa";
import { getStudentAssignments } from "../../services/assignment.service";

function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const res = await getStudentAssignments();
            setAssignments(res.assignments || []);
        } catch (_error) {
            toast.error("Unable to load assignments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    // Get unique subjects for filtering
    const subjects = Array.from(new Set(assignments.map((item) => item.subject).filter(Boolean)));

    // Filter assignments
    const filteredAssignments = assignments.filter((item) => {
        const matchesSearch =
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase()) ||
            item.subject?.toLowerCase().includes(search.toLowerCase());
        const matchesSubject = !selectedSubject || item.subject === selectedSubject;
        return matchesSearch && matchesSubject;
    });

    const isDueDateUpcoming = (dueDate) => {
        if (!dueDate) return false;
        const due = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return due >= today;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Assignments</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    View and access all assignments for your class and subjects.
                </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search assignments by title or description..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                </div>

                {subjects.length > 0 && (
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    >
                        <option value="">All Subjects</option>
                        {subjects.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {loading ? (
                <div className="py-12 text-center text-slate-500">Loading assignments...</div>
            ) : filteredAssignments.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaTasks className="mx-auto text-4xl text-slate-400" />
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No Assignments Found</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {assignments.length === 0
                            ? "No assignments uploaded for your class yet."
                            : "No assignments match your search or filter."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAssignments.map((assignment) => {
                        const upcoming = isDueDateUpcoming(assignment.dueDate);
                        return (
                            <div
                                key={assignment._id}
                                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                                <FaTasks size={18} />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                                                    {assignment.title}
                                                </h2>
                                                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                                                    {assignment.subject}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                                        {assignment.description || "No description provided."}
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-xs font-medium pt-1">
                                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                            Class: {assignment.studentClass}
                                        </span>
                                        {assignment.stream && (
                                            <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                                Stream: {assignment.stream}
                                            </span>
                                        )}
                                        <span
                                            className={`rounded-md px-2.5 py-1 font-semibold ${
                                                upcoming
                                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                                                    : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                                            }`}
                                        >
                                            {upcoming ? "Upcoming" : "Past Due"}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-slate-400" />
                                            <span>
                                                Due:{" "}
                                                <strong className="text-slate-700 dark:text-slate-200">
                                                    {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </strong>
                                            </span>
                                        </div>
                                        {assignment.uploadedBy?.username && (
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-slate-400" />
                                                <span>Assigned by {assignment.uploadedBy.username}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {assignment.attachment && (
                                    <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                                        <a
                                            href={assignment.attachment}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950"
                                        >
                                            View Attachment <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Assignments;
