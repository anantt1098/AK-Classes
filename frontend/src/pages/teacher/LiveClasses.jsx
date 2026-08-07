import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPodcast, FaPlus, FaTrash, FaSearch, FaExternalLinkAlt, FaVideo } from "react-icons/fa";

import { createLiveClass, getAllLiveClasses, deleteLiveClass } from "../../services/liveClass.service";
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

function getEmbedUrl(url) {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0];
    } else if (url.includes("live/")) {
        videoId = url.split("live/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function TeacherLiveClasses() {
    const [liveClasses, setLiveClasses] = useState([]);
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
        youtubeLink: "",
        status: "Live",
    });

    const fetchLiveClassesList = async () => {
        try {
            setFetching(true);
            const params = {};
            if (selectedClass) params.studentClass = selectedClass;
            if (selectedSubject) params.subject = selectedSubject;
            if (search) params.search = search;

            const res = await getAllLiveClasses(params);
            setLiveClasses(res.liveClasses || []);
        } catch (_error) {
            toast.error("Failed to fetch live classes.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchLiveClassesList();
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
        if (!formData.title || !formData.studentClass || !formData.subject || !formData.youtubeLink) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setUploading(true);
            await createLiveClass(formData);
            toast.success("Live class created successfully!");
            setFormData({
                title: "",
                description: "",
                studentClass: "",
                stream: "",
                subject: "",
                youtubeLink: "",
                status: "Live",
            });
            setShowUploadForm(false);
            fetchLiveClassesList();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create live class.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this live class?")) return;
        try {
            await deleteLiveClass(id);
            toast.success("Live class deleted successfully.");
            fetchLiveClassesList();
        } catch (_error) {
            toast.error("Failed to delete live class.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header with Upload Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <FaPodcast className="text-red-600 animate-pulse" /> Live Classes
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Host real-time YouTube live lectures. Active Streams: <span className="font-semibold text-slate-800 dark:text-slate-200">{liveClasses.length}</span>
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
                >
                    <FaPlus /> {showUploadForm ? "Hide Form" : "Host Live Class"}
                </button>
            </div>

            {/* Upload Form Card */}
            {showUploadForm && (
                <FormCard>
                    <div className="mb-4 border-b border-slate-200 pb-3 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-600 animate-ping"></span> Host New Live Class
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Paste your YouTube Live stream link to invite students.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Live Class Title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Live Physics Chapter 3 Problem Solving Session"
                            required
                        />

                        <div>
                            <label className={labelClass}>Live Stream Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Details about topic or agenda..."
                                rows="3"
                                className={fieldClass}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className={labelClass}>
                                    Class <span className="text-red-500">*</span>
                                </label>
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

                            {(formData.studentClass === "11" || formData.studentClass === "12") && (
                                <div>
                                    <label className={labelClass}>
                                        Stream <span className="text-red-500">*</span>
                                    </label>
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

                            <div>
                                <label className={labelClass}>
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={!formData.studentClass}
                                    className={fieldClass}
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

                            <div>
                                <label className={labelClass}>Stream Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={fieldClass}
                                >
                                    <option value="Live">🔴 Live Now</option>
                                    <option value="Scheduled">📅 Scheduled</option>
                                </select>
                            </div>
                        </div>

                        <Input
                            label="YouTube Live Link / Video URL"
                            type="url"
                            name="youtubeLink"
                            value={formData.youtubeLink}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                            required
                        />

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 disabled:opacity-50"
                            >
                                {uploading ? "Launching..." : "Start Live Session"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowUploadForm(false)}
                                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </FormCard>
            )}

            {/* Filter Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search live classes by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-red-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                        />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                            <option value="">All Subjects</option>
                            <option value="Maths">Maths</option>
                            <option value="Science">Science</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="SST">SST</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="History">History</option>
                            <option value="Political Science">Political Science</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Live Classes Grid */}
            {fetching ? (
                <div className="flex min-h-[250px] items-center justify-center">
                    <Loader />
                </div>
            ) : liveClasses.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaPodcast className="mx-auto text-4xl text-slate-300 dark:text-slate-600" />
                    <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">No Live Classes Active</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Click "Host Live Class" above to start streaming for your students.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {liveClasses.map((item) => {
                        const embedUrl = getEmbedUrl(item.youtubeLink);
                        return (
                            <div
                                key={item._id}
                                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div>
                                    {embedUrl ? (
                                        <div className="relative aspect-video w-full bg-slate-900">
                                            <iframe
                                                src={embedUrl}
                                                title={item.title}
                                                className="h-full w-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                                                <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
                                                LIVE NOW
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex aspect-video w-full items-center justify-center bg-slate-800 text-slate-400">
                                            <FaVideo size={36} />
                                        </div>
                                    )}

                                    <div className="p-5 space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                title="Delete Class"
                                                className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                            {item.description || "No live class description."}
                                        </p>

                                        <div className="flex flex-wrap gap-2 text-xs font-medium pt-1">
                                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                Class: {item.studentClass}
                                            </span>
                                            {item.stream && (
                                                <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                                    {item.stream}
                                                </span>
                                            )}
                                            <span className="rounded-md bg-red-50 px-2.5 py-1 text-red-700 dark:bg-red-950/50 dark:text-red-300">
                                                {item.subject}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                                    <a
                                        href={item.youtubeLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-red-700 shadow-md"
                                    >
                                        Join YouTube Live <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default TeacherLiveClasses;
