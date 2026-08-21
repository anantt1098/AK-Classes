import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";

import { getAllReports, deleteReport } from "../../services/report.service";

const subjectData = {
    "6": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "7": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "8": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "9": ["Maths", "Science", "SST"],
    "10": ["Maths", "Science", "SST"],
    "11": {
        Science: ["Physics", "Chemistry", "Maths", "Biology", "Other"],
        Humanities: ["History", "Political Science", "Geography", "Other"],
    },
    "12": {
        Science: ["Physics", "Chemistry", "Maths", "Biology", "Other"],
        Humanities: ["History", "Political Science", "Geography", "Other"],
    },
};

function Reports() {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    // Academic Filters
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStream, setSelectedStream] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const [selectedReport, setSelectedReport] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await getAllReports(page, search);
            setReports(res.reports || []);
            setTotalPages(res.totalPages || 1);
        } catch (_error) {
            toast.error("Unable to load reports.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [page, search]);

    const getSubjects = () => {
        if (!selectedClass) return [];
        if (selectedClass === "11" || selectedClass === "12") {
            if (!selectedStream) return [];
            return subjectData[selectedClass]?.[selectedStream] || [];
        }
        return subjectData[selectedClass] || [];
    };

    // Client-side filtering by Class, Stream, Subject
    const filteredReports = reports.filter((report) => {
        const studentClass = report.student?.studentClass || report.test?.studentClass;
        const studentStream = report.student?.stream || report.test?.stream;
        const testSubject = report.test?.subject;

        if (selectedClass && studentClass !== selectedClass) return false;
        if (
            (selectedClass === "11" || selectedClass === "12") &&
            selectedStream &&
            studentStream !== selectedStream
        ) {
            return false;
        }
        if (selectedSubject && testSubject !== selectedSubject) return false;
        return true;
    });

    const handleDelete = async () => {
        if (!selectedReport) return;

        try {
            setDeleteLoading(true);
            await deleteReport(selectedReport._id);
            toast.success("Report deleted successfully.");
            setSelectedReport(null);
            setShowDeleteDialog(false);
            fetchReports();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to delete report."
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <PageHeader
                title="Reports"
                subtitle="Manage and view student performance reports"
                action={
                    <Button onClick={() => navigate("/teacher/reports/new")}>
                        Add Report
                    </Button>
                }
            />

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
                <div className="flex-1">
                    <SearchBar
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onClear={() => {
                            setSearchInput("");
                            setSearch("");
                        }}
                        placeholder="Search student or test..."
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedStream("");
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

                    {(selectedClass === "11" || selectedClass === "12") && (
                        <select
                            value={selectedStream}
                            onChange={(e) => {
                                setSelectedStream(e.target.value);
                                setSelectedSubject("");
                            }}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                        >
                            <option value="">All Streams</option>
                            <option value="Science">Science</option>
                            <option value="Humanities">Humanities</option>
                        </select>
                    )}

                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        disabled={!selectedClass}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                    >
                        <option value="">All Subjects</option>
                        {getSubjects().map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:block dark:border-slate-700 dark:bg-slate-900">
                        <table className="min-w-full">
                            <thead className="border-b bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-5 py-4 text-left">Student</th>
                                    <th className="px-5 py-4 text-left">Class & Stream</th>
                                    <th className="px-5 py-4 text-left">Test & Subject</th>
                                    <th className="px-5 py-4 text-left">Marks</th>
                                    <th className="px-5 py-4 text-left">Percentage</th>
                                    <th className="px-5 py-4 text-left">Remarks</th>
                                    <th className="px-5 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-10 text-center text-slate-500"
                                        >
                                            No reports found for selected filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredReports.map((report) => (
                                        <tr
                                            key={report._id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-5 py-4 font-medium">
                                                {report.student?.fullName || "Student"}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                Class {report.student?.studentClass || report.test?.studentClass}
                                                {report.student?.stream ? ` (${report.student.stream})` : ""}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-slate-900 dark:text-white">
                                                    {report.test?.title}
                                                </div>
                                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                                    {report.test?.subject}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 font-medium">
                                                {report.obtainedMarks} / {report.totalMarks}
                                            </td>
                                            <td className="px-5 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                                                {report.percentage?.toFixed(2)}%
                                            </td>
                                            <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                                                {report.remarks || "-"}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        onClick={() =>
                                                            navigate(
                                                                `/teacher/reports/${report._id}/edit`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            setSelectedReport(report);
                                                            setShowDeleteDialog(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid gap-4 lg:hidden">
                        {filteredReports.length === 0 ? (
                            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <p className="text-slate-500">No reports found for selected filters.</p>
                            </div>
                        ) : (
                            filteredReports.map((report) => (
                                <div
                                    key={report._id}
                                    className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {report.student?.fullName}
                                        </h3>
                                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                                            Class {report.student?.studentClass || report.test?.studentClass}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <p>
                                            <strong>Test:</strong> {report.test?.title} ({report.test?.subject})
                                        </p>
                                        <p>
                                            <strong>Marks:</strong> {report.obtainedMarks} / {report.totalMarks}
                                        </p>
                                        <p>
                                            <strong>Percentage:</strong>{" "}
                                            <span className="font-bold text-emerald-600">
                                                {report.percentage?.toFixed(2)}%
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Remarks:</strong> {report.remarks || "-"}
                                        </p>
                                    </div>

                                    <div className="mt-5 flex gap-3">
                                        <Button
                                            onClick={() =>
                                                navigate(`/teacher/reports/${report._id}/edit`)
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setSelectedReport(report);
                                                setShowDeleteDialog(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <Button
                            variant="secondary"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Previous
                        </Button>

                        <span className="text-sm text-slate-500">
                            Page {page} of {totalPages}
                        </span>

                        <Button
                            variant="secondary"
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}

            {/* Delete Confirmation */}
            {showDeleteDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
                        <h2 className="text-xl font-semibold">Delete Report</h2>
                        <p className="mt-3 text-slate-500">
                            Are you sure you want to delete this report?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setShowDeleteDialog(false);
                                    setSelectedReport(null);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="danger"
                                loading={deleteLoading}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;