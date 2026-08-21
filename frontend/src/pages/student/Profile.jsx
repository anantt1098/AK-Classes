import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaUser,
    FaEnvelope,
    FaSchool,
    FaBook,
    FaIdCard,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaShieldAlt,
} from "react-icons/fa";

import { getMyProfile } from "../../services/student.service";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/dashboard/PageHeader";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await getMyProfile();
            setProfile(res.student || null);
        } catch (_error) {
            toast.error("Unable to load student profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!profile) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <FaUser className="mx-auto text-4xl text-slate-400" />
                <h2 className="mt-4 text-xl font-semibold">Profile Not Found</h2>
                <p className="mt-2 text-sm text-slate-500">Could not find student profile details.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="My Profile"
                subtitle="View your student profile and academic details."
            />

            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-4xl font-bold uppercase backdrop-blur-md">
                        {profile.fullName ? profile.fullName.charAt(0) : "S"}
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold">{profile.fullName || profile.user?.username}</h1>
                        <p className="text-blue-100">{profile.user?.email}</p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 sm:justify-start">
                            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                                Class {profile.studentClass}
                            </span>
                            {profile.stream && (
                                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                                    {profile.stream} Stream
                                </span>
                            )}
                            <span className="inline-flex items-center rounded-full bg-emerald-400/30 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                                Active Student
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Academic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200">
                    <FaSchool className="text-blue-500" /> Academic Setup
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500">Assigned Class</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">Class {profile.studentClass}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500">Stream</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{profile.stream || "General"}</p>
                    </div>
                </div>

                {profile.subjects && profile.subjects.length > 0 && (
                    <div className="mt-6">
                        <p className="mb-2 text-xs font-semibold text-slate-500">Enrolled Subjects</p>
                        <div className="flex flex-wrap gap-2">
                            {profile.subjects.map((sub, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300"
                                >
                                    <FaBook className="text-blue-500" /> {sub}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Personal Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200">
                    <FaIdCard className="text-indigo-500" /> Personal Details
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <FaPhone className="text-slate-400" />
                        <div>
                            <p className="text-xs text-slate-500">Student Phone</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.phone || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <FaPhone className="text-slate-400" />
                        <div>
                            <p className="text-xs text-slate-500">Parent Phone</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.parentPhone || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <FaMapMarkerAlt className="text-slate-400" />
                        <div>
                            <p className="text-xs text-slate-500">Address</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.address || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <FaCalendarAlt className="text-slate-400" />
                        <div>
                            <p className="text-xs text-slate-500">Joining Date</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">
                                {profile.joiningDate ? new Date(profile.joiningDate).toLocaleDateString() : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;