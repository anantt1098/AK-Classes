import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import toast from "react-hot-toast";


import PageHeader from "../../components/dashboard/PageHeader";

import Button from "../../components/common/Button";
import FormCard from "../../components/common/FormCard";
import Select from "../../components/common/Select";


import {
    getStudentsForAttendance,
    createAttendance,
    getAttendanceById,
    updateAttendance,
} from "../../services/attendance.service";




function AttendanceForm(){


    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);




    const [loading,setLoading] =
        useState(false);



    const [studentLoading,setStudentLoading] =
        useState(false);



    const [students,setStudents] =
        useState([]);




    const [formData,setFormData] =
        useState({

            studentClass:"",

            stream:"",

            date:
            new Date()
            .toISOString()
            .split("T")[0],

            records:[]

        });





    const classes=[

        {
            value:"6",
            label:"Class 6"
        },

        {
            value:"7",
            label:"Class 7"
        },

        {
            value:"8",
            label:"Class 8"
        },

        {
            value:"9",
            label:"Class 9"
        },

        {
            value:"10",
            label:"Class 10"
        },

        {
            value:"11",
            label:"Class 11"
        },

        {
            value:"12",
            label:"Class 12"
        },

    ];





    // ==========================================
    // Load Attendance For Edit
    // ==========================================





    const fetchAttendance = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAttendanceById(id);
            const data = res.attendance;

            setFormData({
                studentClass: data.studentClass,
                stream: data.stream || "",
                date: data.date
                    ? new Date(data.date).toISOString().split("T")[0]
                    : "",
                records:
                    data.records?.map((record) => ({
                        student: record.student._id || record.student,
                        status: record.status,
                    })) || [],
            });
        } catch (_error) {
            toast.error("Unable to load attendance.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (isEdit) {
            fetchAttendance();
        }
    }, [isEdit, fetchAttendance]);

    // ==========================================
    // Fetch Students For New Attendance
    // ==========================================

    const fetchStudents = useCallback(async () => {
        try {
            setStudentLoading(true);
            const res = await getStudentsForAttendance(
                formData.studentClass,
                formData.stream
            );
            const list = res.students || [];

            setStudents(list);
            setFormData((prev) => ({
                ...prev,
                records: list.map((student) => ({
                    student: student._id,
                    status: "Present",
                })),
            }));
        } catch (_error) {
            toast.error("Unable to load students.");
        } finally {
            setStudentLoading(false);
        }
    }, [formData.studentClass, formData.stream]);

    useEffect(() => {
        if (isEdit) return;

        if (!formData.studentClass) {
            setStudents([]);
            return;
        }

        if (
            (formData.studentClass === "11" || formData.studentClass === "12") &&
            !formData.stream
        ) {
            setStudents([]);
            return;
        }

        fetchStudents();
    }, [isEdit, formData.studentClass, formData.stream, fetchStudents]);








    // ==========================================
    // Update Status
    // ==========================================


    const changeStatus=(studentId,status)=>{


        setFormData(prev=>({


            ...prev,


            records:

                prev.records.map(record=>


                    (
                        record.student?._id ||
                        record.student
                    )
                    ===
                    studentId


                    ?

                    {
                        ...record,
                        status
                    }


                    :

                    record


                )


        }));


    };








    const markAllPresent=()=>{


        setFormData(prev=>({


            ...prev,


            records:

                prev.records.map(record=>({

                    ...record,

                    status:"Present"

                }))


        }));


    };
        // ==========================================
    // Submit
    // ==========================================


    const handleSubmit = async(e)=>{


        e.preventDefault();



        if(!formData.studentClass){

            return toast.error(
                "Please select class."
            );

        }



        if(formData.records.length===0){

            return toast.error(
                "No students found."
            );

        }




        try{


            setLoading(true);



            if(isEdit){


                await updateAttendance(

                    id,

                    {
                        records:
                        formData.records
                    }

                );



                toast.success(
                    "Attendance updated successfully."
                );


            }
            else{


                await createAttendance(
                    formData
                );


                toast.success(
                    "Attendance marked successfully."
                );


            }



            navigate(
                "/teacher/attendance"
            );



        }
        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Unable to save attendance."

            );


        }
        finally{


            setLoading(false);


        }


    };








    return (

    <div className="space-y-8">



        <PageHeader

            title={
                isEdit
                ?
                "Edit Attendance"
                :
                "Mark Attendance"
            }

            subtitle="Select class and mark attendance"

        />







        <FormCard

            title="Class Selection"

            subtitle="Choose class, stream and date"

        >


            <div className="
                grid
                gap-5
                md:grid-cols-3
            ">



                <Select

                    label="Class"

                    value={
                        formData.studentClass
                    }

                    disabled={isEdit}


                    onChange={(e)=>


                        setFormData(prev=>({

                            ...prev,

                            studentClass:
                                e.target.value,

                            stream:"",

                            records:[]

                        }))

                    }


                    options={[

                        {
                            value:"",
                            label:"Select Class"
                        },

                        ...classes

                    ]}


                />








                {
                (

                    formData.studentClass==="11"

                    ||

                    formData.studentClass==="12"

                )

                &&


                <Select

                    label="Stream"

                    value={
                        formData.stream
                    }

                    disabled={isEdit}


                    onChange={(e)=>


                        setFormData(prev=>({

                            ...prev,

                            stream:
                                e.target.value

                        }))

                    }


                    options={[

                        {
                            value:"",
                            label:"Select Stream"
                        },

                        {
                            value:"Science",
                            label:"Science"
                        },

                        {
                            value:"Humanities",
                            label:"Humanities"
                        }

                    ]}


                />

                }







                <input

                    type="date"

                    value={
                        formData.date
                    }


                    onChange={(e)=>

                        setFormData(prev=>({

                            ...prev,

                            date:
                                e.target.value

                        }))

                    }


                    className="
                        rounded-xl
                        border
                        border-slate-300
                        p-3
                        text-slate-900
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                        [color-scheme:light]
                        dark:[color-scheme:dark]
                    "

                />


            </div>


        </FormCard>








        <FormCard

            title="Students"

            subtitle="Mark Present or Absent"

        >



            <Button

                type="button"

                onClick={markAllPresent}

            >

                Mark All Present

            </Button>







            <div className="mt-5">


            {
            studentLoading

            ?

            (

                <p>
                    Loading students...
                </p>

            )


            :


            students.length===0


            ?

            (

                <p className="text-slate-500">

                    No students found.

                </p>

            )


            :


            (

            <div className="
                overflow-x-auto
                rounded-xl
                border
                border-slate-200
                dark:border-slate-800
            ">


                <table className="w-full">


                    <thead className="border-b border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200">


                        <tr>


                            <th className="p-4 text-left font-semibold">

                                Student

                            </th>


                            <th className="p-4 text-center font-semibold">

                                Status

                            </th>


                        </tr>


                    </thead>





                    <tbody>


                    {

                    students.map(student=>{


                        const record =

                        formData.records.find(

                            item =>

                            (
                                item.student?._id ||
                                item.student
                            )

                            ===

                            student._id

                        );




                        return (

                        <tr

                            key={student._id}

                            className="border-t border-slate-200 dark:border-slate-800/80"

                        >


                            <td className="p-4 font-medium text-slate-900 dark:text-white">

                                {student.fullName}

                            </td>





                            <td className="p-4">


                                <div className="flex justify-center gap-3">


                                    <button

                                        type="button"

                                        onClick={()=>changeStatus(

                                            student._id,

                                            "Present"

                                        )}


                                        className={

                                            record?.status==="Present"

                                            ?

                                            "rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"

                                            :

                                            "rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"

                                        }

                                    >

                                        Present

                                    </button>







                                    <button

                                        type="button"

                                        onClick={()=>changeStatus(

                                            student._id,

                                            "Absent"

                                        )}


                                        className={

                                            record?.status==="Absent"

                                            ?

                                            "rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"

                                            :

                                            "rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-all"

                                        }

                                    >

                                        Absent

                                    </button>



                                </div>


                            </td>


                        </tr>

                        );


                    })

                    }


                    </tbody>


                </table>


            </div>

            )


            }


            </div>


        </FormCard>








        <div className="flex justify-end gap-3">


            <Button

                type="button"

                variant="secondary"

                onClick={()=>navigate(
                    "/teacher/attendance"
                )}

            >

                Cancel

            </Button>





            <Button

                type="button"

                loading={loading}

                onClick={handleSubmit}

            >

                {
                    isEdit
                    ?
                    "Update Attendance"
                    :
                    "Save Attendance"
                }


            </Button>


        </div>





    </div>

    );


}


export default AttendanceForm;