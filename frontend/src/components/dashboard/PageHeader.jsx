import { motion } from "framer-motion";


function PageHeader({
    title,
    subtitle,
    action,
}) {


    return (

        <motion.div

            initial={{
                opacity:0,
                y:10,
            }}

            animate={{
                opacity:1,
                y:0,
            }}

            transition={{
                duration:0.25,
            }}


            className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                sm:p-6
                shadow-sm
                transition
                hover:shadow-md
                dark:border-slate-800
                dark:bg-slate-900
                mb-6
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            "

        >







            {/* Title Section */}


            <div className="min-w-0 w-full">


                <h1

                    className="
                        break-words

                        text-2xl

                        sm:text-3xl

                        font-bold

                        leading-tight

                        text-slate-900

                        dark:text-white
                    "

                >

                    {title}


                </h1>








                {
                subtitle &&

                (

                    <p

                        className="
                            mt-3

                            max-w-2xl

                            text-sm

                            sm:text-base

                            text-slate-500

                            dark:text-slate-400
                        "

                    >

                        {subtitle}


                    </p>

                )

                }


            </div>









            {/* Action Button */}


            {
            action &&

            (

                <div

                    className="
                        flex
                        shrink-0
                    "

                >

                    {action}

                </div>

            )

            }



        </motion.div>

    );

}


export default PageHeader;