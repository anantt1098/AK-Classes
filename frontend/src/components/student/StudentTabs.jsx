import { useState } from "react";

import {
    FaUser,
    FaClipboardCheck,
    FaMoneyBillWave,
    FaChartBar,
    FaClipboardList,
    FaBookOpen,
} from "react-icons/fa";



function StudentTabs({

    overview,

    attendance,

    fees,

    reports,

    tests,

    assignments,

}) {



    const tabs = [


        {
            key:"overview",

            label:"Overview",

            icon:FaUser,

            component:overview,

        },



        {
            key:"attendance",

            label:"Attendance",

            icon:FaClipboardCheck,

            component:attendance,

        },



        {
            key:"fees",

            label:"Fees",

            icon:FaMoneyBillWave,

            component:fees,

        },



        {
            key:"reports",

            label:"Reports",

            icon:FaChartBar,

            component:reports,

        },



        {
            key:"tests",

            label:"Tests",

            icon:FaClipboardList,

            component:tests,

        },



        {
            key:"assignments",

            label:"Assignments",

            icon:FaBookOpen,

            component:assignments,

        },


    ];




    const [activeTab,setActiveTab] =
    useState("overview");




    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-900
            "
        >



            {/* Tabs */}

            <div
                className="
                    flex
                    overflow-x-auto
                    border-b
                    border-slate-200
                    dark:border-slate-700
                "
            >


                {
                    tabs.map((tab)=>{


                        const Icon = tab.icon;



                        return (

                            <button

                                key={tab.key}

                                onClick={()=>
                                    setActiveTab(tab.key)
                                }

                                className={`
                                    flex
                                    min-w-max
                                    items-center
                                    gap-2
                                    border-b-2
                                    px-6
                                    py-4
                                    text-sm
                                    font-medium
                                    transition

                                    ${
                                        activeTab === tab.key

                                        ?

                                        "border-blue-600 text-blue-600"

                                        :

                                        "border-transparent text-slate-500 hover:text-blue-600"
                                    }
                                `}

                            >

                                <Icon />

                                {tab.label}


                            </button>

                        );


                    })
                }


            </div>





            {/* Content */}

            <div className="p-6">


                {
                    tabs.find(
                        (tab)=>
                        tab.key === activeTab
                    )?.component
                }


            </div>



        </div>

    );

}



export default StudentTabs;