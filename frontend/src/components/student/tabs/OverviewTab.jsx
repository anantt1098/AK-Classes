import {
    FaUserGraduate,
    FaSchool,
    FaPhone,
    FaPhoneAlt,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBookOpen,
    FaLayerGroup,
} from "react-icons/fa";

function OverviewTab({ student = {} }) {
    const subjects = Array.isArray(student.subjects) ? student.subjects : [];

    return (
        <div className="space-y-6">
            {/* Academic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                    <FaSchool className="text-blue-600 dark:text-blue-400" />
                    Academic Setup
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                            <FaSchool size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Assigned Class</p>
                            <p className="text-base font-bold text-slate-900 dark:text-white">Class {student.studentClass || "N/A"}</p>
                        </div>
                    </div>

                    {student.stream && (
                        <div className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                                <FaLayerGroup size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Stream</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">{student.stream}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enrolled Subjects */}
                <div className="mt-4">
                    <p className="mb-2.5 text-xs font-medium text-slate-500 dark:text-slate-400">Enrolled Subjects</p>
                    {subjects.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {subjects.map((sub, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 dark:border dark:border-blue-800/50"
                                >
                                    <FaBookOpen className="text-[10px]" />
                                    {sub}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm italic text-slate-400">No subjects assigned</p>
                    )}
                </div>
            </div>

            {/* Personal & Contact Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                    <FaUserGraduate className="text-blue-600 dark:text-blue-400" />
                    Personal & Contact Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                            <FaPhone size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Student Phone</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{student.phone || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                            <FaPhoneAlt size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Parent Phone</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{student.parentPhone || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                            <FaMapMarkerAlt size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Residential Address</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{student.address || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
                            <FaCalendarAlt size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Joining Date</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {student.joiningDate
                                    ? new Date(student.joiningDate).toLocaleDateString()
                                    : "Not set"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewTab;