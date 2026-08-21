import { motion } from "framer-motion";

function PageHeader({
    title,
    subtitle,
    action,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 10,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.25,
            }}
            className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900"
        >
            {/* Title Section */}
            <div className="w-full min-w-0">
                <h1 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl dark:text-white">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base dark:text-slate-400">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Action Button */}
            {action && <div className="flex shrink-0">{action}</div>}
        </motion.div>
    );
}

export default PageHeader;