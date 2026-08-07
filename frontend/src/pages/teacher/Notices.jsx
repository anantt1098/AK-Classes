import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";

import {
    getAllNotices,
    deleteNotice,
} from "../../services/notice.service";


function Notices() {

    const navigate = useNavigate();


    const [notices, setNotices] =
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


    const [selectedNotice,
        setSelectedNotice] =
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


        return () =>
            clearTimeout(timer);


    }, [searchInput]);



    const fetchNotices = async () => {
        try {
            setLoading(true);
            const res = await getAllNotices(page, search);
            setNotices(res.notices || []);
            setTotalPages(res.totalPages || 1);
        } catch (_error) {
            toast.error("Unable to load notices.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, [page, search]);
        // ==========================================
    // Delete Notice
    // ==========================================

    const handleDelete = async () => {

        if (!selectedNotice) return;


        try {

            setDeleteLoading(true);


            await deleteNotice(
                selectedNotice._id
            );


            toast.success(
                "Notice deleted successfully."
            );


            setSelectedNotice(null);


            setShowDeleteDialog(false);


            fetchNotices();


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to delete notice."
            );


        } finally {

            setDeleteLoading(false);

        }

    };



    return (

        <div className="space-y-8">


            <PageHeader
                title="Notices"
                subtitle="Manage announcements"
                action={

                    <Button

                        onClick={() =>
                            navigate(
                                "/teacher/notices/new"
                            )
                        }

                    >

                        Create Notice

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

                placeholder="Search notices..."

            />



            {loading ? (

                <Loader />

            ) : (

                <>

                    {/* Desktop Table */}

                    <div className="
                        hidden
                        overflow-x-auto
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-sm
                        lg:block
                        dark:border-slate-700
                        dark:bg-slate-900
                    ">

                        <table className="min-w-full">

                            <thead className="
                                border-b
                                bg-slate-50
                                dark:bg-slate-800
                            ">

                                <tr>

                                    <th className="px-5 py-4 text-left">
                                        Title
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Class
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Published By
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Date
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {notices.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="py-10 text-center text-slate-500"
                                        >

                                            No notices found.

                                        </td>

                                    </tr>

                                ) : (

                                    notices.map((notice) => (

                                        <tr
                                            key={notice._id}
                                            className="
                                                border-b
                                                last:border-b-0
                                            "
                                        >

                                            <td className="px-5 py-4">

                                                <p className="font-semibold">
                                                    {notice.title}
                                                </p>

                                                <p className="
                                                    mt-1
                                                    text-sm
                                                    text-slate-500
                                                    line-clamp-2
                                                ">
                                                    {notice.description}
                                                </p>

                                            </td>

                                            <td className="px-5 py-4">
                                                {notice.studentClass}
                                            </td>

                                            <td className="px-5 py-4">
                                                {notice.publishedBy?.username}
                                            </td>

                                            <td className="px-5 py-4">
                                                {new Date(
                                                    notice.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                                                                        <td className="px-5 py-4">

                                                <div className="flex justify-center gap-2">


                                                    <Button

                                                        onClick={() =>
                                                            navigate(
                                                                `/teacher/notices/${notice._id}/edit`
                                                            )
                                                        }

                                                    >

                                                        Edit

                                                    </Button>



                                                    <Button

                                                        variant="danger"

                                                        onClick={() => {

                                                            setSelectedNotice(
                                                                notice
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


                        {notices.length === 0 ? (

                            <div className="
                                rounded-2xl
                                border
                                bg-white
                                p-8
                                text-center
                                shadow-sm
                                dark:border-slate-700
                                dark:bg-slate-900
                            ">

                                <p className="text-slate-500">

                                    No notices found.

                                </p>


                            </div>


                        ) : (


                            notices.map((notice) => (


                                <div

                                    key={notice._id}

                                    className="
                                        rounded-2xl
                                        border
                                        bg-white
                                        p-5
                                        shadow-sm
                                        dark:border-slate-700
                                        dark:bg-slate-900
                                    "

                                >


                                    <h3 className="text-lg font-semibold">

                                        {notice.title}

                                    </h3>



                                    <p className="
                                        mt-2
                                        text-sm
                                        text-slate-500
                                    ">

                                        {notice.description}

                                    </p>



                                    <div className="
                                        mt-4
                                        space-y-2
                                        text-sm
                                    ">


                                        <p>

                                            <strong>
                                                Class:
                                            </strong>{" "}

                                            {notice.studentClass}

                                        </p>



                                        <p>

                                            <strong>
                                                Published By:
                                            </strong>{" "}

                                            {notice.publishedBy?.username}

                                        </p>



                                        <p>

                                            <strong>
                                                Date:
                                            </strong>{" "}

                                            {new Date(
                                                notice.createdAt
                                            ).toLocaleDateString()}

                                        </p>


                                    </div>
                                                                        <div className="mt-5 flex gap-3">


                                        <Button

                                            onClick={() =>
                                                navigate(
                                                    `/teacher/notices/${notice._id}/edit`
                                                )
                                            }

                                        >

                                            Edit

                                        </Button>



                                        <Button

                                            variant="danger"

                                            onClick={() => {

                                                setSelectedNotice(
                                                    notice
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


                    <div className="
                        mt-6
                        flex
                        items-center
                        justify-between
                    ">


                        <Button

                            variant="secondary"

                            disabled={
                                page === 1
                            }

                            onClick={() =>
                                setPage(
                                    (prev) => prev - 1
                                )
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
                                setPage(
                                    (prev) => prev + 1
                                )
                            }

                        >

                            Next

                        </Button>


                    </div>


                </>

            )}






            {/* Delete Confirmation */}


            {showDeleteDialog && (


                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/40
                ">


                    <div className="
                        w-full
                        max-w-md
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-xl
                        dark:bg-slate-900
                    ">


                        <h2 className="text-xl font-semibold">

                            Delete Notice

                        </h2>



                        <p className="mt-3 text-slate-500">

                            Are you sure you want to delete this notice?

                        </p>



                        <div className="
                            mt-6
                            flex
                            justify-end
                            gap-3
                        ">


                            <Button

                                variant="secondary"

                                onClick={() => {

                                    setShowDeleteDialog(
                                        false
                                    );


                                    setSelectedNotice(
                                        null
                                    );

                                }}

                            >

                                Cancel

                            </Button>



                            <Button

                                variant="danger"

                                loading={
                                    deleteLoading
                                }

                                onClick={
                                    handleDelete
                                }

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


export default Notices;