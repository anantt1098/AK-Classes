import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";

import {
    getAllReports,
    deleteReport,
} from "../../services/report.service";

function Reports() {

    const navigate = useNavigate();

    const [reports, setReports] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [searchInput, setSearchInput] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [selectedReport,
        setSelectedReport] =
        useState(null);

    const [showDeleteDialog,
        setShowDeleteDialog] =
        useState(false);

    const [deleteLoading,
        setDeleteLoading] =
        useState(false);

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

    const handleDelete = async () => {

        if (!selectedReport) return;

        try {

            setDeleteLoading(true);

            await deleteReport(
                selectedReport._id
            );

            toast.success(
                "Report deleted successfully."
            );

            setSelectedReport(null);

            setShowDeleteDialog(false);

            fetchReports();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to delete report."
            );

        } finally {

            setDeleteLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            <PageHeader
                title="Reports"
                subtitle="Manage student reports"
                action={
                    <Button
                        onClick={() =>
                            navigate("/teacher/reports/new")
                        }
                    >
                        Add Report
                    </Button>
                }
            />

            <SearchBar
                value={searchInput}
                onChange={(e) =>
                    setSearchInput(
                        e.target.value
                    )
                }
                onClear={() => {

                    setSearchInput("");

                    setSearch("");

                }}
                placeholder="Search reports..."
            />
                        {loading ? (

                <Loader />

            ) : (

                <>

                    {/* Desktop Table */}

                    <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:block dark:border-slate-700 dark:bg-slate-900">

                        <table className="min-w-full">

                            <thead className="border-b bg-slate-50 dark:bg-slate-800">

                                <tr>

                                    <th className="px-5 py-4 text-left">
                                        Student
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Test
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Marks
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Percentage
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Remarks
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {reports.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="py-10 text-center text-slate-500"
                                        >
                                            No reports found.
                                        </td>

                                    </tr>

                                ) : (

                                    reports.map((report) => (

                                        <tr
                                            key={report._id}
                                            className="border-b last:border-b-0"
                                        >

                                            <td className="px-5 py-4 font-medium">
                                                {report.student?.fullName}
                                            </td>

                                            <td className="px-5 py-4">
                                                {report.test?.title}
                                            </td>

                                            <td className="px-5 py-4">
                                                {report.obtainedMarks} / {report.totalMarks}
                                            </td>

                                            <td className="px-5 py-4">
                                                {report.percentage.toFixed(2)}%
                                            </td>

                                            <td className="px-5 py-4">
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

                                                            setSelectedReport(
                                                                report
                                                            );

                                                            setShowDeleteDialog(
                                                                true
                                                            );

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

                        {reports.length === 0 ? (

                            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

                                <p className="text-slate-500">
                                    No reports found.
                                </p>

                            </div>

                        ) : (

                            reports.map((report) => (

                                <div
                                    key={report._id}
                                    className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                                >

                                    <h3 className="text-lg font-semibold">
                                        {report.student?.fullName}
                                    </h3>

                                    <div className="mt-4 space-y-2 text-sm">

                                        <p>
                                            <strong>Test:</strong>{" "}
                                            {report.test?.title}
                                        </p>

                                        <p>
                                            <strong>Marks:</strong>{" "}
                                            {report.obtainedMarks} / {report.totalMarks}
                                        </p>

                                        <p>
                                            <strong>Percentage:</strong>{" "}
                                            {report.percentage.toFixed(2)}%
                                        </p>

                                        <p>
                                            <strong>Remarks:</strong>{" "}
                                            {report.remarks || "-"}
                                        </p>

                                    </div>

                                    <div className="mt-5 flex gap-3">

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

                                                setSelectedReport(
                                                    report
                                                );

                                                setShowDeleteDialog(
                                                    true
                                                );

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
                            onClick={() =>
                                setPage((prev) => prev - 1)
                            }
                        >
                            Previous
                        </Button>

                        <span className="text-sm text-slate-500">
                            Page {page} of {totalPages}
                        </span>

                        <Button
                            variant="secondary"
                            disabled={
                                page === totalPages
                            }
                            onClick={() =>
                                setPage((prev) => prev + 1)
                            }
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

                        <h2 className="text-xl font-semibold">
                            Delete Report
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Are you sure you want to delete this report?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <Button
                                variant="secondary"
                                onClick={() => {

                                    setShowDeleteDialog(
                                        false
                                    );

                                    setSelectedReport(
                                        null
                                    );

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