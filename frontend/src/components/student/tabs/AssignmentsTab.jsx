import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import Table from "../../common/Table";

import Loader from "../../common/Loader";

import {
    getStudentAssignments,
} from "../../../services/assignment.service";



function AssignmentsTab(){


    const [assignments,setAssignments] =
    useState([]);



    const [loading,setLoading] =
    useState(true);




    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const res = await getStudentAssignments();
            setAssignments(res.assignments || []);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load assignments.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Fetch Student Assignments
    // ==========================================
    useEffect(() => {
        fetchAssignments();
    }, []);








    const columns = [



        {
            title:"Assignment",

            key:"title",

        },




        {
            title:"Subject",

            key:"subject",

        },




        {
            title:"Due Date",

            key:"dueDate",

            render:(row)=>

                new Date(
                    row.dueDate
                )
                .toLocaleDateString(),

        },




        {
            title:"Teacher",

            key:"teacher",

            render:(row)=>

                row.uploadedBy?.username
                ||
                "N/A",

        },




        {
            title:"Attachment",

            key:"attachment",

            render:(row)=>(


                row.attachment

                ?

                <a

                    href={row.attachment}

                    target="_blank"

                    rel="noreferrer"

                    className="
                    rounded-lg
                    bg-blue-600
                    px-3
                    py-2
                    text-sm
                    text-white
                    "

                >

                    View File

                </a>


                :

                "No File"


            ),

        },



    ];







    if(loading){

        return <Loader />;

    }







    return (

        <div className="space-y-6">


            <h2 className="text-2xl font-bold">

                Assignments

            </h2>





            <Table

                columns={columns}

                data={assignments}

                emptyMessage="No assignments available."

            />



        </div>

    );

}



export default AssignmentsTab;