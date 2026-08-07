import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookOpen, FaPlus, FaTrash, FaSearch, FaExternalLinkAlt } from "react-icons/fa";

import { uploadCourse, getAllCourses, deleteCourse } from "../../services/course.service";
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

function Courses() {
    const [courses, setCourses] = useState([]);
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

    const fetchCoursesList = async () => {
        try {
            setFetching(true);
            const params = {};
            if (selectedClass) params.studentClass = selectedClass;
            if (selectedSubject) params.subject = selectedSubject;
            if (search) params.search = search;

            const res = await getAllCourses(params);
            setCourses(res.courses || []);
        } catch (_error) {
            toast.error("Failed to fetch uploaded courses.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchCoursesList();
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
        if (!formData.title || !formData.studentClass || !formData.subject || !formData.driveLink) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setUploading(true);
            await uploadCourse(formData);
            toast.success("Course uploaded successfully!");
            setFormData({
                title: "",
                description: "",
                studentClass: "",
                stream: "",
                subject: "",
                driveLink: "",
            });
            setShowUploadForm(false);
            fetchCoursesList();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload course.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteCourse(id);
            toast.success("Course deleted successfully.");
            fetchCoursesList();
        } catch (_error) {
            toast.error("Failed to delete course.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header with Upload Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <FaBookOpen className="text-blue-600" /> Course Management
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Upload & manage courses class-wise and subject-wise. Total Uploaded: <span className="font-semibold text-slate-800 dark:text-slate-200">{courses.length}</span>
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
                >
                    <FaPlus /> {showUploadForm ? "Hide Upload Form" : "Upload New Course"}
                </button>
            </div>

            {/* Upload Form Card */}
            {showUploadForm && (
                <FormCard>
                    <div className="mb-4 border-b border-slate-200 pb-3 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upload New Course</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Provide course details and Google Drive link.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Course Title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Complete Class 10 Physics Mechanics"
                            required
                        />

                        <div>
                            <label className={labelClass}>Course Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe what this course covers..."
                                rows="3"
                                className={fieldClass}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
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
                        </div>

                        <Input
                            label="Google Drive / Course Link"
                            type="url"
                            name="driveLink"
                            value={formData.driveLink}
                            onChange={handleChange}
                            placeholder="https://drive.google.com/..."
                            required
                        />

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50"
                            >
                                {uploading ? "Uploading..." : "Publish Course"}
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
                            placeholder="Search courses by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
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

            {/* Uploaded Courses Grid */}
            {fetching ? (
                <div className="flex min-h-[250px] items-center justify-center">
                    <Loader />
                </div>
            ) : courses.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaBookOpen className="mx-auto text-4xl text-slate-300 dark:text-slate-600" />
                    <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">No Courses Uploaded Yet</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Click "Upload New Course" above to add courses for your students.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                            <FaBookOpen size={18} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                            {course.title}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        title="Delete Course"
                                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                    {course.description || "No description provided."}
                                </p>

                                <div className="flex flex-wrap gap-2 text-xs font-medium pt-1">
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        Class: {course.studentClass}
                                    </span>
                                    {course.stream && (
                                        <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                            {course.stream}
                                        </span>
                                    )}
                                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                                        {course.subject}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <a
                                    href={course.driveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950"
                                >
                                    Open Link <FaExternalLinkAlt className="text-xs" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Courses;