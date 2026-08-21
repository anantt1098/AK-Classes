import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaEdit,
    FaPlus,
    FaTrash,
    FaSearch,
    FaExternalLinkAlt,
    FaClipboardList,
} from "react-icons/fa";

import { uploadDPP, getAllDPPs, deleteDPP } from "../../services/dpp.service";
import FormCard from "../../components/common/FormCard";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";

const subjectData = {
    "6": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "7": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "8": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "9": ["Maths", "Science", "SST"],
    "10": ["Maths", "Science", "SST"],
};

const fieldClass = `
    w-full
    rounded-xl
    border
    border-slate-300
    dark:border-slate-700
    bg-white
    dark:bg-slate-800
    p-3
    text-slate-900
    dark:text-white
    placeholder:text-slate-400
    disabled:bg-slate-100
    dark:disabled:bg-slate-800
    dark:disabled:text-slate-500
    focus:border-blue-600
    focus:ring-2
    focus:ring-blue-200
    dark:focus:ring-blue-900
    outline-none
    transition-all
    duration-200
`;

const labelClass = `
    mb-2
    block
    text-sm
    font-medium
    text-slate-700
    dark:text-slate-200
`;

function TeacherDPP() {
    const [dpps, setDpps] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        studentClass: "",
        stream: "",
        subject: "",
        driveLink: "",
    });

    const fetchDPPList = async () => {
        try {
            setFetching(true);
            const params = {};
            if (selectedClass) params.studentClass = selectedClass;
            if (selectedSubject) params.subject = selectedSubject;
            if (search) params.search = search;

            const res = await getAllDPPs(params);
            setDpps(res.dpps || []);
        } catch (_error) {
            toast.error("Failed to fetch uploaded DPPs.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchDPPList();
    }, [selectedClass, selectedSubject, search]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClassChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            studentClass: e.target.value,
            stream: "",
            subject: "",
        }));
    };

    const getSubjects = () => {
        if (!formData.studentClass) return [];
        if (formData.studentClass === "11" || formData.studentClass === "12") {
            if (formData.stream === "Science") {
                return ["Physics", "Chemistry", "Maths", "Biology", "Other"];
            }
            if (formData.stream === "Humanities") {
                return ["History", "Political Science", "Geography", "Other"];
            }
            return [];
        }
        return subjectData[formData.studentClass] || [];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.title ||
            !formData.studentClass ||
            !formData.subject ||
            !formData.driveLink
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setUploading(true);
            await uploadDPP(formData);
            toast.success("DPP uploaded successfully!");
            setFormData({
                title: "",
                description: "",
                studentClass: "",
                stream: "",
                subject: "",
                driveLink: "",
            });
            setShowUploadForm(false);
            fetchDPPList();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to upload DPP."
            );
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this DPP?")) return;
        try {
            await deleteDPP(id);
            toast.success("DPP deleted successfully.");
            fetchDPPList();
        } catch (_error) {
            toast.error("Failed to delete DPP.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header with Upload Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-white">
                        <FaClipboardList className="text-emerald-600" /> DPP Management
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Upload & manage Daily Practice Problems class-wise and subject-wise. Total Uploaded:{" "}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {dpps.length}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-95"
                >
                    <FaPlus /> {showUploadForm ? "Hide Form" : "Upload New DPP"}
                </button>
            </div>

            {/* Upload Form Card */}
            {showUploadForm && (
                <FormCard>
                    <div className="mb-4 border-b border-slate-200 pb-3 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Upload New DPP
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Provide DPP details and Google Drive / PDF link.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="DPP Title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Physics Chapter 2 Kinematics DPP #1"
                            required
                        />

                        <div>
                            <label className={labelClass}>DPP Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief overview of problems included in this DPP..."
                                rows={3}
                                className={fieldClass}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Class Selection */}
                            <div>
                                <label className={labelClass}>Target Class *</label>
                                <select
                                    name="studentClass"
                                    value={formData.studentClass}
                                    onChange={handleClassChange}
                                    className={fieldClass}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="6">Class 6</option>
                                    <option value="7">Class 7</option>
                                    <option value="8">Class 8</option>
                                    <option value="9">Class 9</option>
                                    <option value="10">Class 10</option>
                                    <option value="11">Class 11</option>
                                    <option value="12">Class 12</option>
                                </select>
                            </div>

                            {/* Stream Selection (only 11 & 12) */}
                            {(formData.studentClass === "11" ||
                                formData.studentClass === "12") && (
                                <div>
                                    <label className={labelClass}>Stream *</label>
                                    <select
                                        name="stream"
                                        value={formData.stream}
                                        onChange={handleChange}
                                        className={fieldClass}
                                        required
                                    >
                                        <option value="">Select Stream</option>
                                        <option value="Science">Science</option>
                                        <option value="Humanities">Humanities</option>
                                    </select>
                                </div>
                            )}

                            {/* Subject Selection */}
                            <div>
                                <label className={labelClass}>Subject *</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={fieldClass}
                                    disabled={
                                        !formData.studentClass ||
                                        ((formData.studentClass === "11" ||
                                            formData.studentClass === "12") &&
                                            !formData.stream)
                                    }
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {getSubjects().map((sub) => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Input
                            label="DPP Drive / Material URL Link *"
                            type="url"
                            name="driveLink"
                            value={formData.driveLink}
                            onChange={handleChange}
                            placeholder="https://drive.google.com/file/d/..."
                            required
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowUploadForm(false)}
                                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {uploading ? "Uploading..." : "Publish DPP"}
                            </button>
                        </div>
                    </form>
                </FormCard>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search DPP by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedSubject("");
                        }}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                    >
                        <option value="">All Classes</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                    </select>

                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                    >
                        <option value="">All Subjects</option>
                        {["Maths", "Science", "Physics", "Chemistry", "Biology", "SST", "English", "Hindi"].map(
                            (sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            {/* Uploaded DPP Grid */}
            {fetching ? (
                <div className="py-12">
                    <Loader />
                </div>
            ) : dpps.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                        <FaClipboardList className="text-2xl" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">
                        No DPPs Uploaded Yet
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Click "Upload New DPP" above to publish daily practice problems for your students.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {dpps.map((dpp) => (
                        <div
                            key={dpp._id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                                        <FaClipboardList size={18} />
                                    </div>
                                    <button
                                        onClick={() => handleDelete(dpp._id)}
                                        title="Delete DPP"
                                        className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {dpp.title}
                                    </h3>
                                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                        {dpp.description || "No description provided."}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
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

                            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <a
                                    href={dpp.driveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950"
                                >
                                    Open DPP <FaExternalLinkAlt className="text-[10px]" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TeacherDPP;
