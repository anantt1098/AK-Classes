import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";

import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";

import {
    getAllFees,
    deleteFee,
} from "../../services/fee.service";

function Fees() {

    const navigate = useNavigate();

    const [fees, setFees] =
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

    const [selectedFee, setSelectedFee] =
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

    const fetchFees = async () => {
        try {
            setLoading(true);
            const res = await getAllFees(page, search);
            setFees(res.fees || []);
            setTotalPages(res.totalPages || 1);
        } catch (_error) {
            toast.error("Unable to load fee records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFees();
    }, [page, search]);

    const handleDelete = async () => {

        if (!selectedFee) return;

        try {

            setDeleteLoading(true);

            await deleteFee(
                selectedFee._id
            );

            toast.success(
                "Fee record deleted successfully."
            );

            setSelectedFee(null);

            setShowDeleteDialog(false);

            fetchFees();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to delete fee."
            );

        } finally {

            setDeleteLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            <PageHeader
                title="Fee Management"
                subtitle="Manage student fee records"
                action={
                    <Button
                        onClick={() =>
                            navigate("/teacher/fees/new")
                        }
                    >
                        Add Fee
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
                placeholder="Search student..."
            />
                        {/* Loading */}

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
                                        Total Fee
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Paid
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Due
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {fees.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="py-10 text-center text-slate-500"
                                        >
                                            No fee records found.
                                        </td>

                                    </tr>

                                ) : (

                                    fees.map((fee) => (

                                        <tr
                                            key={fee._id}
                                            className="border-b last:border-b-0"
                                        >

                                            <td className="px-5 py-4 font-medium">
                                                {fee.student?.fullName}
                                            </td>

                                            <td className="px-5 py-4">
                                                ₹ {fee.totalFee}
                                            </td>

                                            <td className="px-5 py-4 text-green-600">
                                                ₹ {fee.paidFee}
                                            </td>

                                            <td className="px-5 py-4 text-red-600">
                                                ₹ {fee.dueFee}
                                            </td>

                                            <td className="px-5 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        fee.status === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : fee.status === "Partial"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {fee.status}
                                                </span>

                                            </td>

                                            <td className="px-5 py-4">

                                                <div className="flex justify-center gap-2">

                                                    <Button
                                                        onClick={() =>
                                                            navigate(
                                                                 `/teacher/fees/${fee._id}/edit`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {

                                                            setSelectedFee(
                                                                fee
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

                        {fees.length === 0 ? (

                            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

                                <p className="text-slate-500">
                                    No fee records found.
                                </p>

                            </div>

                        ) : (

                            fees.map((fee) => (

                                <div
                                    key={fee._id}
                                    className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                                >

                                    <h3 className="text-lg font-semibold">
                                        {fee.student?.fullName}
                                    </h3>

                                    <div className="mt-4 space-y-2 text-sm">

                                        <p>
                                            <strong>Total Fee:</strong>{" "}
                                            ₹ {fee.totalFee}
                                        </p>

                                        <p>
                                            <strong>Paid Fee:</strong>{" "}
                                            ₹ {fee.paidFee}
                                        </p>

                                        <p>
                                            <strong>Due Fee:</strong>{" "}
                                            ₹ {fee.dueFee}
                                        </p>

                                        <p>
                                            <strong>Status:</strong>{" "}

                                            <span
                                                className={`font-semibold ${
                                                    fee.status === "Paid"
                                                        ? "text-green-600"
                                                        : fee.status === "Partial"
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {fee.status}
                                            </span>

                                        </p>

                                    </div>

                                    <div className="mt-5 flex gap-3">

                                        <Button
                                            onClick={() =>
                                                navigate(
                                                    `/teacher/fees/${fee._id}/edit`
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => {

                                                setSelectedFee(
                                                    fee
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

            {/* Delete Dialog */}

            {showDeleteDialog && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">

                        <h2 className="text-xl font-semibold">
                            Delete Fee Record
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Are you sure you want to delete this fee record?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <Button
                                variant="secondary"
                                onClick={() => {

                                    setShowDeleteDialog(
                                        false
                                    );

                                    setSelectedFee(
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

export default Fees;