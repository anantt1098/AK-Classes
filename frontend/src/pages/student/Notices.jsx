import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaBullhorn,
    FaExternalLinkAlt,
    FaPaperclip,
    FaUser,
    FaCalendarAlt,
    FaSearch,
} from "react-icons/fa";

import { getStudentNotices } from "../../services/notice.service";

function StudentNotices() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchNotices = async () => {
        try {
            setLoading(true);
            const res = await getStudentNotices();
            setNotices(res.notices || []);
        } catch (_error) {
            toast.error("Unable to load notices.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const filteredNotices = notices.filter((notice) => {
        const query = searchTerm.toLowerCase();
        const titleMatch = notice.title?.toLowerCase().includes(query);
        const descMatch = notice.description?.toLowerCase().includes(query);
        const publisherMatch = notice.publishedBy?.username
            ?.toLowerCase()
            .includes(query);
        return titleMatch || descMatch || publisherMatch;
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Notices & Announcements
                    </h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        View class-wise announcements and circulars published by your teachers.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[240px] sm:w-72">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search notices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-sm font-medium">Loading notices...</p>
                </div>
            ) : filteredNotices.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20">
                        <FaBullhorn className="text-2xl" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                        {searchTerm ? "No Matching Notices" : "No Notices Available"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {searchTerm
                            ? "Try adjusting your search criteria."
                            : "There are no notices published for your class at this time."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredNotices.map((notice) => (
                        <div
                            key={notice._id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="space-y-4">
                                {/* Top Header */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                                        <FaBullhorn size={20} />
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
                                        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                                            {notice.studentClass === "All"
                                                ? "All Classes"
                                                : `Class ${notice.studentClass}`}
                                        </span>
                                        {notice.stream && (
                                            <span className="rounded-lg bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                                {notice.stream}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {notice.title}
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        {notice.description}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Information */}
                            <div className="mt-6 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span className="inline-flex items-center gap-1.5 font-medium">
                                        <FaUser className="text-blue-500" />
                                        {notice.publishedBy?.username || "Teacher"}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <FaCalendarAlt />
                                        {new Date(notice.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>

                                {notice.attachment && (
                                    <a
                                        href={notice.attachment}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-xs font-bold text-amber-700 transition-all hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950"
                                    >
                                        <FaPaperclip className="text-xs" /> View Attachment{" "}
                                        <FaExternalLinkAlt className="text-[10px]" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentNotices;
