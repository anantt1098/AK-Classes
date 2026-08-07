import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";


function AttendanceChart({
    data = [],
}) {


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

                dark:border-slate-700
                dark:bg-slate-900
            "
        >


            {/* Header */}

            <div
                className="
                    mb-6
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

                    Attendance Trend

                </h2>


                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >

                    Monthly attendance percentage

                </p>


            </div>








            {
            data.length === 0 ?


            (

                <div
                    className="
                        flex
                        h-[320px]
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

                    No attendance data available.

                </div>

            )


            :


            (

                <div
                    className="
                        w-full
                        overflow-hidden
                    "
                >

                    <ResponsiveContainer

                        width="100%"

                        height={320}

                    >

                        <LineChart

                            data={data}

                            margin={{
                                top:10,
                                right:15,
                                left:-10,
                                bottom:5,
                            }}

                        >


                            <CartesianGrid

                                strokeDasharray="3 3"

                                opacity={0.25}

                            />



                            <XAxis

                                dataKey="month"

                                tick={{
                                    fontSize:12
                                }}

                            />



                            <YAxis

                                domain={[
                                    0,
                                    100
                                ]}

                                tick={{
                                    fontSize:12
                                }}

                            />



                            <Tooltip

                                contentStyle={{
                                    borderRadius:"12px",
                                    border:"none",
                                }}

                            />



                            <Line

                                type="monotone"

                                dataKey="attendance"

                                stroke="#2563eb"

                                strokeWidth={3}

                                dot={{
                                    r:4
                                }}

                                activeDot={{
                                    r:6
                                }}

                            />



                        </LineChart>


                    </ResponsiveContainer>

                </div>


            )

            }






        </div>

    );

}


export default AttendanceChart;