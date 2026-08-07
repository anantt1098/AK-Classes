import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaVideo, FaPlus, FaTrash, FaSearch, FaPlay, FaFilter } from "react-icons/fa";

import { uploadVideo, getAllVideos, deleteVideo } from "../../services/video.service";
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
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function Videos() {
    const [videos, setVideos] = useState([]);
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
    });

    const fetchVideosList = async () => {
        try {
            setFetching(true);
            const params = {};
            if (selectedClass) params.studentClass = selectedClass;
            if (selectedSubject) params.subject = selectedSubject;
            if (search) params.search = search;

            const res = await getAllVideos(params);
            setVideos(res.videos || []);
        } catch (_error) {
            toast.error("Failed to fetch uploaded videos.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchVideosList();
    }, [selectedClass, selectedSubject, search]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const getSubjects = () => {
        if (!formData.studentClass) return [];
        if (formData.studentClass === "11" || formData.studentClass === "12") {
            if (formData.stream === "Science") {
                return ["Physics", "Chemistry", "Mathematics", "Biology", "Other"];
            }
            if (formData.stream === "Humanities") {
                return ["History", "Political Science", "Geography", "Economics", "Other"];
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
            await uploadVideo(formData);
            toast.success("Video uploaded successfully!");
            setFormData({
                title: "",
                description: "",
                studentClass: "",
                stream: "",
                subject: "",
                youtubeLink: "",
            });
            setShowUploadForm(false);
            fetchVideosList();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload video.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;
        try {
            await deleteVideo(id);
            toast.success("Video deleted successfully.");
            fetchVideosList();
        } catch (_error) {
            toast.error("Failed to delete video.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Video Lectures</h1>
                    <p className="mt-1 text-slate-500">
                        Upload video lectures for students and manage uploaded video content.
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg"
                >
                    {showUploadForm ? "Hide Upload Form" : <><FaPlus /> Upload New Video</>}
                </button>
            </div>

            {/* Upload Form Modal / Section */}
            {showUploadForm && (
                <FormCard
                    title="Upload Video Lecture"
                    subtitle="Share video links with your students"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Video Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Chapter 4 - Organic Chemistry Basics"
                            required
                        />

                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Add video overview or topics covered..."
                                className={fieldClass}
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Class <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="studentClass"
                                value={formData.studentClass}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        studentClass: e.target.value,
                                        stream: "",
                                        subject: "",
                                    }))
                                }
                                className={fieldClass}
                                required
                            >
                                <option value="">Select Class</option>
                                {["6", "7", "8", "9", "10", "11", "12", "All"].map((c) => (
                                    <option key={c} value={c}>
                                        Class {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(formData.studentClass === "11" || formData.studentClass === "12") && (
                            <div>
                                <label className={labelClass}>Stream</label>
                                <select
                                    value={formData.stream}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            stream: e.target.value,
                                            subject: "",
                                        }))
                                    }
                                    className={fieldClass}
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

                        <Input
                            label="YouTube Video Link"
                            type="url"
                            name="youtubeLink"
                            value={formData.youtubeLink}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            required
                        />

                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition-all hover:bg-red-700 disabled:opacity-60"
                            >
                                {uploading ? "Uploading..." : "Publish Video"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowUploadForm(false)}
                                className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </FormCard>
            )}

            {/* Filter Bar */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search video lectures..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                    >
                        <option value="">All Classes</option>
                        {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
                            <option key={c} value={c}>
                                Class {c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                    >
                        <option value="">All Subjects</option>
                        {["Maths", "Science", "Physics", "Chemistry", "Biology", "SST", "English", "Hindi"].map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Uploaded Video Grid */}
            {fetching ? (
                <Loader />
            ) : videos.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaVideo className="mx-auto text-4xl text-slate-400" />
                    <h3 className="mt-4 text-lg font-bold">No Videos Uploaded</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Upload your first video lecture using the button above.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((vid) => {
                        const embedUrl = getEmbedUrl(vid.youtubeLink);
                        return (
                            <div
                                key={vid._id}
                                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div>
                                    {embedUrl ? (
                                        <iframe
                                            src={embedUrl}
                                            title={vid.title}
                                            className="h-48 w-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                                            <a
                                                href={vid.youtubeLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
                                            >
                                                <FaPlay /> Watch on YouTube
                                            </a>
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                Class {vid.studentClass}
                                            </span>
                                            <span className="text-xs font-medium text-slate-500">
                                                {vid.subject}
                                            </span>
                                        </div>

                                        <h3 className="mt-3 font-bold text-slate-900 line-clamp-1 dark:text-white">
                                            {vid.title}
                                        </h3>
                                        {vid.description && (
                                            <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                                {vid.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
                                    <span className="text-xs text-slate-400">
                                        {new Date(vid.createdAt).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(vid._id)}
                                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Videos;