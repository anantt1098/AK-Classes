import {
    FaUserGraduate,
    FaMoneyBillWave,
    FaClipboardCheck,
    FaFileAlt,
} from "react-icons/fa";



const icons = {

    student: FaUserGraduate,

    fee: FaMoneyBillWave,

    attendance: FaClipboardCheck,

    report: FaFileAlt,

};



const iconStyles = {

    student:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",

    fee:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",

    attendance:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",

    report:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",

};





function RecentActivity({
    activities = [],
}) {


    const recentActivities =
        Array.isArray(activities)
        ?
        activities.slice(0,5)
        :
        [];






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

                    Recent Activity

                </h2>





                <p

                    className="
                        mt-1
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                    "

                >

                    Latest classroom updates

                </p>



            </div>









            {
            recentActivities.length === 0


            ?


            (

                <div

                    className="
                        flex
                        h-52
                        items-center
                        justify-center
                        rounded-xl

                        bg-slate-50

                        text-sm
                        text-slate-500

                        dark:bg-slate-800
                        dark:text-slate-400
                    "

                >

                    No recent activity.

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
                recentActivities.map((activity,index)=>{


                    const Icon =
                        icons[activity.type]
                        ||
                        FaUserGraduate;



                    const style =
                        iconStyles[activity.type]
                        ||
                        iconStyles.student;





                    return (

                        <div

                            key={
                                activity._id ||
                                index
                            }

                            className="
                                flex
                                gap-4
                                rounded-xl
                                p-2
                                transition

                                hover:bg-slate-50

                                dark:hover:bg-slate-800
                            "

                        >








                            <div

                                className={`
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center

                                    rounded-full

                                    ${style}
                                `}

                            >

                                <Icon className="text-lg"/>


                            </div>









                            <div

                                className="
                                    min-w-0
                                    flex-1
                                "

                            >



                                <h3

                                    className="
                                        truncate
                                        font-semibold

                                        text-slate-900

                                        dark:text-white
                                    "

                                >

                                    {
                                    activity.title ||
                                    "Activity"
                                    }

                                </h3>






                                <p

                                    className="
                                        mt-1
                                        line-clamp-2
                                        text-sm

                                        text-slate-500

                                        dark:text-slate-400
                                    "

                                >

                                    {
                                    activity.description ||
                                    "-"
                                    }

                                </p>








                                <p

                                    className="
                                        mt-2
                                        text-xs
                                        text-slate-400
                                    "

                                >

                                    {
                                    activity.time ||
                                    ""
                                    }

                                </p>




                            </div>







                        </div>


                    );


                })

                }





                </div>


            )

            }





        </div>

    );

}


export default RecentActivity;