import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";



function StudentGrowthChart({
    data = [],
}) {


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

                    Student Growth

                </h2>



                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >

                    Student enrollment growth over time

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

                    No student growth data available.

                </div>


            )


            :


            (

                <ResponsiveContainer

                    width="100%"

                    height={320}

                >


                    <AreaChart

                        data={data}

                        margin={{
                            top:10,
                            right:15,
                            left:-10,
                            bottom:5,
                        }}

                    >





                        <defs>


                            <linearGradient

                                id="studentGrowthGradient"

                                x1="0"

                                y1="0"

                                x2="0"

                                y2="1"

                            >


                                <stop

                                    offset="0%"

                                    stopColor="#3b82f6"

                                    stopOpacity={0.45}

                                />



                                <stop

                                    offset="100%"

                                    stopColor="#3b82f6"

                                    stopOpacity={0}

                                />


                            </linearGradient>


                        </defs>









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

                            allowDecimals={false}

                            tick={{
                                fontSize:12
                            }}

                        />









                        <Tooltip

                            formatter={(value)=>[

                                value,

                                "Students"

                            ]}

                            contentStyle={{

                                borderRadius:"12px",

                                border:"none",

                            }}

                        />









                        <Area

                            type="monotone"

                            dataKey="students"

                            stroke="#3b82f6"

                            fill="url(#studentGrowthGradient)"

                            strokeWidth={3}

                            activeDot={{
                                r:6
                            }}

                        />





                    </AreaChart>


                </ResponsiveContainer>


            )

            }





        </div>

    );

}


export default StudentGrowthChart;