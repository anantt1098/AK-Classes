import { useNavigate } from "react-router-dom";

import {
    FaArrowRight,
    FaUserGraduate,
} from "react-icons/fa";



function RecentStudents({
    students = [],
}) {


    const navigate = useNavigate();



    const recentStudents =
        Array.isArray(students)
        ?
        students.slice(0,5)
        :
        [];





    return (

        <div
            className="
                flex
                min-h-[420px]
                flex-col

                rounded-2xl

                border
                border-slate-200

                bg-white

                p-4
                sm:p-6

                shadow-sm

                transition

                hover:shadow-md

                dark:border-slate-700
                dark:bg-slate-900
            "
        >





            {/* Header */}

            <div
                className="
                    mb-6

                    flex
                    items-center
                    justify-between
                "
            >


                <div>

                    <h2
                        className="
                            text-xl
                            font-bold

                            text-slate-900

                            dark:text-white
                        "
                    >

                        Recent Students

                    </h2>


                    <p
                        className="
                            mt-1

                            text-sm

                            text-slate-500
                        "
                    >

                        Recently added students

                    </p>


                </div>





                <button

                    onClick={()=>navigate(
                        "/teacher/students"
                    )}

                    className="
                        rounded-full

                        p-2

                        text-blue-600

                        transition

                        hover:translate-x-1

                        hover:bg-blue-50

                        dark:hover:bg-blue-900/20
                    "

                >

                    <FaArrowRight/>

                </button>


            </div>









            {/* Content */}


            {
            recentStudents.length === 0


            ?


            (

                <div
                    className="
                        flex

                        min-h-[260px]

                        items-center

                        justify-center

                        rounded-xl

                        bg-slate-50

                        text-sm

                        text-slate-500

                        dark:bg-slate-800
                    "
                >

                    No students found.

                </div>


            )


            :


            (

                <div
                    className="
                        space-y-4
                    "
                >


                {
                recentStudents.map(student=>(


                    <div

                        key={student._id}

                        className="
                            flex

                            items-center

                            justify-between

                            gap-4

                            rounded-xl

                            border

                            border-slate-200

                            p-4

                            transition

                            hover:border-blue-400

                            hover:shadow-sm

                            dark:border-slate-700
                        "

                    >









                        <div

                            className="
                                flex

                                min-w-0

                                items-center

                                gap-4
                            "

                        >



                            <div

                                className="
                                    flex

                                    h-11

                                    w-11

                                    shrink-0

                                    items-center

                                    justify-center

                                    rounded-full

                                    bg-blue-100

                                    text-blue-600

                                    dark:bg-blue-900/30
                                "

                            >

                                <FaUserGraduate/>

                            </div>









                            <div className="min-w-0">


                                <h3

                                    className="
                                        truncate

                                        font-semibold

                                        text-slate-900

                                        dark:text-white
                                    "

                                >

                                    {
                                    student.fullName ||
                                    "Student"
                                    }

                                </h3>









                                <p
    className="
        text-sm
        text-slate-500
    "
>

    Class {student.studentClass}

</p>


                            </div>



                        </div>













                        <button

                            onClick={()=>navigate(
                                `/teacher/students/${student._id}`
                            )}

                            className="
                                shrink-0

                                rounded-lg

                                bg-blue-600

                                px-3

                                py-2

                                text-xs

                                font-medium

                                text-white

                                transition

                                hover:bg-blue-700

                                sm:px-4

                                sm:text-sm
                            "

                        >

                            View

                        </button>



                    </div>


                ))

                }


                </div>


            )

            }




        </div>

    );

}


export default RecentStudents;