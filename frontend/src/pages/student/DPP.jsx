import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaClipboardList,
    FaExternalLinkAlt,
    FaSearch,
    FaCalendarAlt,
    FaUser,
} from "react-icons/fa";

import { getStudentDPPs } from "../../services/dpp.service";

function StudentDPP() {
    const [dpps, setDpps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDPPs = async () => {
        try {
            setLoading(true);
            const res = await getStudentDPPs();
            setDpps(res.dpps || []);
        } catch (_error) {
            toast.error("Unable to load DPPs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDPPs();
    }, []);

    const filteredDPPs = dpps.filter((dpp) => {
        const query = searchTerm.toLowerCase();
        const titleMatch = dpp.title?.toLowerCase().includes(query);
        const descMatch = dpp.description?.toLowerCase().includes(query);
        const subjectMatch = dpp.subject?.toLowerCase().includes(query);
        return titleMatch || descMatch || subjectMatch;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Daily Practice Problems (DPP)
                    </h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        Access your class and subject wise daily practice sheets.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[240px] sm:w-72">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search DPP or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                    <p className="mt-4 text-sm font-medium">Loading DPPs...</p>
                </div>
            ) : filteredDPPs.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                        <FaClipboardList className="text-2xl" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                        {searchTerm ? "No Matching DPPs Found" : "No DPPs Available"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {searchTerm
                            ? "Try searching for a different subject or title."
                            : "No practice problems uploaded for your class yet."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDPPs.map((dpp) => (
                        <div
                            key={dpp._id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                                        <FaClipboardList size={18} />
                                    </div>
                                    <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                                        {dpp.title}
                                    </h2>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {dpp.description || "No description provided."}
                                </p>

                                <div className="flex flex-wrap gap-2 text-xs font-medium">
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        Class: {dpp.studentClass}
                                    </span>
                                    {dpp.stream && (
                                        <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                            Stream: {dpp.stream}
                                        </span>
                                    )}
                                    <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                                        Subject: {dpp.subject}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span className="inline-flex items-center gap-1.5 font-medium">
                                        <FaUser className="text-emerald-500" />
                                        {dpp.uploadedBy?.username || "Teacher"}
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <FaCalendarAlt />
                                        {new Date(dpp.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <a
                                    href={dpp.driveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950"
                                >
                                    Open DPP Material <FaExternalLinkAlt className="text-xs" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentDPP;
