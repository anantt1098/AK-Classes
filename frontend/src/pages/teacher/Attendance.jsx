import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";


import PageHeader from "../../components/dashboard/PageHeader";

import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";
import Table from "../../components/common/Table";


import {
    getAllAttendance,
    deleteAttendance,
    getAttendanceAnalytics,
} from "../../services/attendance.service";



function Attendance() {


    const navigate = useNavigate();



    const [attendance,setAttendance] =
        useState([]);



    const [analytics,setAnalytics] =
        useState({

            total:0,

            present:0,

            absent:0,

            percentage:0,

        });



    const [loading,setLoading] =
        useState(true);



    const [searchInput,setSearchInput] =
        useState("");



    const [search,setSearch] =
        useState("");



    const [filters,setFilters] =
        useState({

            studentClass:"",

            stream:"",

            date:"",

        });



    const [selectedAttendance,
        setSelectedAttendance] =
        useState(null);



    const [showDeleteDialog,
        setShowDeleteDialog] =
        useState(false);



    const [deleteLoading,
        setDeleteLoading] =
        useState(false);






    // ==============================
    // Debounced Search
    // ==============================

    useEffect(()=>{


        const timer =
            setTimeout(()=>{

                setSearch(searchInput);

            },500);



        return ()=>clearTimeout(timer);


    },[searchInput]);







    const fetchAttendance = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllAttendance({
                studentClass: filters.studentClass,
                stream: filters.stream,
                date: filters.date,
            });

            let data = res.attendance || [];

            if (search.trim()) {
                const value = search.toLowerCase();
                data = data.filter((item) => {
                    const className = item.studentClass
                        ?.toString()
                        .toLowerCase();
                    const stream = item.stream?.toLowerCase();
                    const teacher = item.teacher?.username?.toLowerCase();

                    return (
                        className?.includes(value) ||
                        stream?.includes(value) ||
                        teacher?.includes(value)
                    );
                });
            }

            setAttendance(data);
        } catch (_error) {
            toast.error("Unable to load attendance.");
        } finally {
            setLoading(false);
        }
    }, [filters, search]);

    const fetchAnalytics = useCallback(async () => {
        try {
            const res = await getAttendanceAnalytics();
            setAnalytics(
                res.summary || {
                    total: 0,
                    present: 0,
                    absent: 0,
                    percentage: 0,
                }
            );
        } catch (error) {
            console.log(error);
        }
    }, []);

    // ==============================
    // Fetch Data
    // ==============================

    useEffect(() => {
        fetchAttendance();
        fetchAnalytics();
    }, [fetchAttendance, fetchAnalytics]);








    // ==============================
    // Delete Attendance
    // ==============================

    const handleDelete = async()=>{


        if(!selectedAttendance)
            return;




        try{


            setDeleteLoading(true);



            await deleteAttendance(

                selectedAttendance._id

            );



            toast.success(
                "Attendance deleted successfully."
            );



            setShowDeleteDialog(false);



            setSelectedAttendance(null);



            await fetchAttendance();

            await fetchAnalytics();



        }
        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Unable to delete attendance."

            );


        }
        finally{


            setDeleteLoading(false);


        }


    };


    const getPresentCount = (records)=>{


        return (

            records?.filter(

                item =>
                item.status==="Present"

            ).length || 0

        );


    };





    const getAbsentCount = (records)=>{


        return (

            records?.filter(

                item =>
                item.status==="Absent"

            ).length || 0

        );


    };






    // ==============================
    // Table Columns
    // ==============================

    const columns = [

        {
            key:"studentClass",
            title:"Class",
            render:(row)=>(
                <span className="font-semibold">
                    Class {row.studentClass}
                </span>
            ),
        },

        {
            key:"stream",
            title:"Stream",
            render:(row)=>row.stream || "-",
        },

        {
            key:"date",
            title:"Date",
            render:(row)=>
                new Date(row.date)
                .toLocaleDateString(),
        },

        {
            key:"students",
            title:"Students",
            render:(row)=>row.records?.length || 0,
        },

        {
            key:"present",
            title:"Present",
            render:(row)=>(
                <span className="text-green-600 dark:text-green-400">
                    {getPresentCount(row.records)}
                </span>
            ),
        },

        {
            key:"absent",
            title:"Absent",
            render:(row)=>(
                <span className="text-red-600 dark:text-red-400">
                    {getAbsentCount(row.records)}
                </span>
            ),
        },

        {
            key:"teacher",
            title:"Teacher",
            render:(row)=>row.teacher?.username || "-",
        },

        {
            key:"actions",
            title:"Actions",
            render:(row)=>(

                <div className="flex justify-center gap-2">


                    <Button

                        onClick={()=>navigate(
                            `/teacher/attendance/${row._id}/edit`
                        )}

                    >

                        Edit

                    </Button>




                    <Button

                        variant="danger"

                        onClick={()=>{

                            setSelectedAttendance(row);

                            setShowDeleteDialog(true);

                        }}

                    >

                        Delete

                    </Button>


                </div>

            ),
        },

    ];






    return (

        <div className="space-y-8">


            <PageHeader

                title="Attendance Management"

                subtitle="Manage class wise attendance"

                action={

                    <Button

                        onClick={()=>navigate(
                            "/teacher/attendance/new"
                        )}

                    >

                        Mark Attendance

                    </Button>

                }

            />






            {/* Statistics */}

            <div className="
                grid
                gap-5
                sm:grid-cols-3
            ">


                <div className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    dark:border-slate-700
                    dark:bg-slate-900
                ">

                    <p className="text-slate-500 dark:text-slate-400">
                        Total Records
                    </p>


                    <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">

                        {analytics.total}

                    </h2>


                </div>





                <div className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    dark:border-slate-700
                    dark:bg-slate-900
                ">

                    <p className="text-slate-500 dark:text-slate-400">
                        Present
                    </p>


                    <h2 className="
                        mt-3
                        text-3xl
                        font-bold
                        text-green-600
                        dark:text-green-400
                    ">

                        {analytics.present}

                    </h2>


                </div>





                <div className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    dark:border-slate-700
                    dark:bg-slate-900
                ">

                    <p className="text-slate-500 dark:text-slate-400">
                        Absent
                    </p>


                    <h2 className="
                        mt-3
                        text-3xl
                        font-bold
                        text-red-600
                        dark:text-red-400
                    ">

                        {analytics.absent}

                    </h2>


                </div>


            </div>







            <SearchBar

                value={searchInput}

                onChange={(e)=>
                    setSearchInput(
                        e.target.value
                    )
                }


                onClear={()=>{

                    setSearchInput("");

                    setSearch("");

                }}


                placeholder="Search class, stream or teacher..."

            />









            {/* Filters */}

            <div className="
                grid
                gap-4
                md:grid-cols-3
            ">


                <input

                    type="date"

                    value={filters.date}

                    onChange={(e)=>

                        setFilters(prev=>({

                            ...prev,

                            date:e.target.value

                        }))

                    }

                    className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-3
                        text-slate-900

                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                    "

                />





                <select

                    value={filters.studentClass}

                    onChange={(e)=>

                        setFilters(prev=>({

                            ...prev,

                            studentClass:e.target.value

                        }))

                    }

                    className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-3
                        text-slate-900

                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                    "

                >

                    <option value="">
                        All Classes
                    </option>


                    {
                    [6,7,8,9,10,11,12]
                    .map(cls=>(

                        <option
                            key={cls}
                            value={cls}
                        >

                            Class {cls}

                        </option>

                    ))
                    }

                </select>






                <select

                    value={filters.stream}

                    onChange={(e)=>

                        setFilters(prev=>({

                            ...prev,

                            stream:e.target.value

                        }))

                    }

                    className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-3
                        text-slate-900

                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                    "

                >

                    <option value="">
                        All Streams
                    </option>

                    <option value="Science">
                        Science
                    </option>

                    <option value="Humanities">
                        Humanities
                    </option>


                </select>


            </div>









            {
            loading

            ?

            <Loader/>

            :

            <Table

                columns={columns}

                data={attendance}

                emptyMessage="No attendance found."

            />

            }









            {
            showDeleteDialog &&

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

                    dark:bg-slate-900
                ">


                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">

                        Delete Attendance

                    </h2>


                    <p className="mt-3 text-slate-500 dark:text-slate-400">

                        Delete this class attendance record?

                    </p>




                    <div className="mt-6 flex justify-end gap-3">


                        <Button

                            variant="secondary"

                            onClick={()=>{

                                setShowDeleteDialog(false);

                                setSelectedAttendance(null);

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

            }



        </div>

    );


}


export default Attendance;