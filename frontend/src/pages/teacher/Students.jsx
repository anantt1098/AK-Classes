import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

import PageHeader from "../../components/dashboard/PageHeader";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import StudentCard from "../../components/student/StudentCard";

import {
    getAllStudents,
    deleteStudent,
} from "../../services/student.service";


function Students() {

    const navigate = useNavigate();


    const [students, setStudents] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);


    const [search, setSearch] =
        useState("");

    const [searchInput, setSearchInput] =
        useState("");


    const [selectedStudent, setSelectedStudent] =
        useState(null);

    const [showDeleteDialog, setShowDeleteDialog] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);



    // Search debounce

    useEffect(() => {

        const timer = setTimeout(() => {

            setSearch(searchInput);
            setPage(1);

        }, 500);


        return () =>
            clearTimeout(timer);

    }, [searchInput]);



    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getAllStudents(page, search);
            setStudents(res.students || []);
            setTotalPages(res.totalPages || 1);
        } catch (_error) {
            toast.error("Unable to fetch students.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page, search]);



    const handleDelete = async () => {

        if (!selectedStudent)
            return;


        try {

            setDeleteLoading(true);


            await deleteStudent(
                selectedStudent._id
            );


            toast.success(
                "Student deleted successfully."
            );


            setShowDeleteDialog(false);

            setSelectedStudent(null);


            fetchStudents();


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to delete student."
            );


        } finally {

            setDeleteLoading(false);

        }

    };



    const columns = [

        {
            title: "Name",
            key: "fullName",
        },


        {
            title: "Class",
            key: "studentClass",
        },


        {
            title: "Phone",
            key: "phone",
        },


        {
            title: "Status",

            key: "status",

            render: (row) => (

                <StatusBadge
                    status={
                        row.isActive
                            ? "Active"
                            : "Inactive"
                    }
                />

            ),
        },


        {
            title: "Actions",

            key: "actions",

            render: (row) => (

                <div className="flex items-center gap-2">


                    <button
                        onClick={() =>
                            navigate(
                                `/teacher/students/${row._id}`
                            )
                        }
                        title="View Student Profile & Contact Details"
                        className="
                            flex
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-emerald-100
                            px-2.5
                            py-1.5
                            text-xs
                            font-semibold
                            text-emerald-700
                            hover:bg-emerald-200
                            dark:bg-emerald-950
                            dark:text-emerald-300
                        "
                    >
                        <FaEye />
                        <span>Profile</span>
                    </button>



                    <button
                        onClick={() =>
                            navigate(
                                `/teacher/students/${row._id}/edit`
                            )
                        }
                        className="
                            rounded-lg
                            bg-blue-100
                            p-2
                            text-blue-600
                            hover:bg-blue-200
                        "
                    >

                        <FaEdit />

                    </button>



                    <button
                        onClick={() => {

                            setSelectedStudent(row);

                            setShowDeleteDialog(true);

                        }}
                        className="
                            rounded-lg
                            bg-red-100
                            p-2
                            text-red-600
                            hover:bg-red-200
                        "
                    >

                        <FaTrash />

                    </button>


                </div>

            ),
        },

    ];



    return (

        <>

            <div className="space-y-6">


                <PageHeader

                    title="Students"

                    subtitle="Manage all enrolled students"

                    action={

                        <Button

                            onClick={() =>
                                navigate(
                                    "/teacher/students/new"
                                )
                            }

                        >

                            Add Student

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


                    placeholder="Search students..."

                />



                <div className="hidden lg:block">

                    <Table

                        columns={columns}

                        data={students}

                        loading={loading}

                        emptyMessage="No students found."

                    />

                </div>




                <div className="grid gap-4 lg:hidden">


                    {loading ? (

                        <div className="py-10 text-center">

                            Loading...

                        </div>


                    ) : students.length === 0 ? (

                        <div className="rounded-xl border bg-white p-8 text-center dark:bg-slate-900">

                            <h3 className="text-lg font-semibold">

                                No Students Found

                            </h3>


                            <p className="mt-2 text-sm text-slate-500">

                                Click "Add Student" to create your first student.

                            </p>


                        </div>


                    ) : (

                        students.map((student) => (

                            <StudentCard

                                key={student._id}

                                student={student}


                                onView={() =>
                                    navigate(
                                        `/teacher/students/${student._id}`
                                    )
                                }


                                onEdit={() =>
                                    navigate(
                                        `/teacher/students/${student._id}/edit`
                                    )
                                }


                                onDelete={() => {

                                    setSelectedStudent(
                                        student
                                    );

                                    setShowDeleteDialog(
                                        true
                                    );

                                }}

                            />

                        ))

                    )}


                </div>




                <Pagination

                    currentPage={page}

                    totalPages={totalPages}

                    onPageChange={setPage}

                />


            </div>




            <ConfirmDialog

                open={showDeleteDialog}

                title="Delete Student"

                message={
                    `Are you sure you want to delete "${selectedStudent?.fullName}"?`
                }

                loading={deleteLoading}

                onConfirm={handleDelete}

                onCancel={() => {

                    setShowDeleteDialog(false);

                    setSelectedStudent(null);

                }}

            />


        </>

    );

}


export default Students;