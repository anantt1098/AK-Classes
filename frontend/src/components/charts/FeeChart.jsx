import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";


function FeeChart({
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

                    Fee Collection

                </h2>



                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >

                    Monthly fee collection overview

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

                    No fee data available.

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

                        <BarChart

                            data={data}

                            margin={{
                                top:10,
                                right:10,
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

                                tickFormatter={(value)=>
                                    `₹${value / 1000}k`
                                }

                                tick={{
                                    fontSize:12
                                }}

                            />










                            <Tooltip

                                formatter={(value)=>[

                                    `₹${value}`,

                                    "Collected"

                                ]}


                                contentStyle={{
                                    borderRadius:"12px",
                                    border:"none",
                                }}

                            />













                            <Bar

                                dataKey="amount"

                                fill="#16a34a"

                                radius={[
                                    6,
                                    6,
                                    0,
                                    0
                                ]}

                            />




                        </BarChart>


                    </ResponsiveContainer>

                </div>


            )

            }







        </div>

    );

}


export default FeeChart;