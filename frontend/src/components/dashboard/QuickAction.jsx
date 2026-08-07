import { useNavigate } from "react-router-dom";

import {
    FaUserPlus,
    FaClipboardCheck,
    FaMoneyBillWave,
    FaFileAlt,
} from "react-icons/fa";



function QuickAction(){


    const navigate = useNavigate();



    const actions = [

        {
            title:"Add Student",
            subtitle:"Register a new student",
            icon:FaUserPlus,
            color:"bg-blue-500",
            path:"/teacher/students/new",
        },

        {
            title:"Attendance",
            subtitle:"Mark today's attendance",
            icon:FaClipboardCheck,
            color:"bg-green-500",
            path:"/teacher/attendance",
        },

        {
            title:"Collect Fees",
            subtitle:"Manage fee payments",
            icon:FaMoneyBillWave,
            color:"bg-yellow-500",
            path:"/teacher/fees",
        },

        {
            title:"Reports",
            subtitle:"View academic reports",
            icon:FaFileAlt,
            color:"bg-purple-500",
            path:"/teacher/reports",
        },

    ];





    return (

        <div

            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md

                dark:border-slate-700
                dark:bg-slate-900
            "

        >








            {/* Header */}


            <div

                className="
                    mb-5
                "

            >


                <h2

                    className="
                        text-xl
                        font-bold
                        text-slate-900

                        dark:text-white
                    "

                >

                    Quick Actions

                </h2>





                <p

                    className="
                        mt-1
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                    "

                >

                    Frequently used teacher tools

                </p>


            </div>









            <div

                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                "

            >






            {
            actions.map((action)=>{


                const Icon = action.icon;



                return (


                    <button


                        key={action.title}


                        onClick={()=>navigate(action.path)}


                        className="
                            group
                            flex
                            items-center
                            gap-4

                            rounded-xl

                            border
                            border-slate-200

                            bg-white

                            p-4

                            text-left

                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:border-blue-400
                            hover:shadow-lg

                            dark:border-slate-700
                            dark:bg-slate-900
                        "


                    >







                        <div


                            className={`

                                ${action.color}

                                flex
                                h-12
                                w-12

                                shrink-0

                                items-center
                                justify-center

                                rounded-xl

                                text-xl
                                text-white

                                shadow-md

                                transition-transform

                                duration-300

                                group-hover:scale-110

                            `}


                        >

                            <Icon/>


                        </div>










                        <div className="min-w-0">


                            <h3

                                className="
                                    truncate
                                    font-semibold

                                    text-slate-900

                                    transition

                                    group-hover:text-blue-600

                                    dark:text-white
                                "

                            >

                                {action.title}


                            </h3>






                            <p

                                className="
                                    mt-1
                                    text-sm

                                    text-slate-500

                                    dark:text-slate-400
                                "

                            >

                                {action.subtitle}


                            </p>


                        </div>




                    </button>


                );


            })

            }





            </div>





        </div>

    );

}


export default QuickAction;