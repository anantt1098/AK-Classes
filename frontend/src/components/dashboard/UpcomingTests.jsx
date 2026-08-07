import {
    FaCalendarAlt,
    FaClipboardList,
} from "react-icons/fa";



function UpcomingTests({
    tests = [],
}) {



    const upcomingTests =
        Array.isArray(tests)
        ?
        tests.slice(0,5)
        :
        [];







    return (


        <div

            className="
                rounded-2xl
                border
                border-slate-200
                bg-white

                p-4
                sm:p-6

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

                    Upcoming Tests

                </h2>





                <p

                    className="
                        mt-1
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                    "

                >

                    Upcoming examinations and assessments

                </p>



            </div>









            {
            upcomingTests.length === 0


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

                    No upcoming tests.

                </div>


            )


            :


            (


                <div

                    className="
                        space-y-3
                    "

                >




                {
                upcomingTests.map((test,index)=>{


                    const testDate =
                        test.date
                        ?
                        new Date(
                            test.date
                        )
                        .toLocaleDateString(
                            "en-IN",
                            {
                                day:"2-digit",
                                month:"short",
                                year:"numeric",
                            }
                        )
                        :
                        "Date not available";





                    return (


                        <div

                            key={
                                test._id || index
                            }

                            className="
                                rounded-xl
                                border
                                border-slate-200

                                p-3
                                sm:p-4

                                transition-all

                                hover:border-blue-400
                                hover:shadow-sm

                                dark:border-slate-700
                            "

                        >










                            <div

                                className="
                                    flex
                                    items-start
                                    gap-3
                                    sm:items-center
                                    sm:gap-4
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

                                        rounded-xl

                                        bg-blue-100

                                        text-blue-600

                                        dark:bg-blue-900/30
                                        dark:text-blue-400
                                    "

                                >

                                    <FaClipboardList/>

                                </div>









                                <div

                                    className="
                                        min-w-0
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
                                        test.subject ||
                                        test.title ||
                                        "Test"
                                        }


                                    </h3>





                                    <p

                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-500
                                        "

                                    >

                                        Class{" "}


                                        {
                                        test.class ||
                                        test.studentClass ||
                                        "-"
                                        }


                                        {
                                        test.type &&
                                        (
                                            <>
                                                {" • "}
                                                {test.type}
                                            </>
                                        )
                                        }


                                    </p>


                                </div>




                            </div>









                            <div

                                className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-2

                                    text-sm
                                    text-slate-500
                                "

                            >


                                <FaCalendarAlt/>


                                <span>

                                    {testDate}

                                </span>



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


export default UpcomingTests;