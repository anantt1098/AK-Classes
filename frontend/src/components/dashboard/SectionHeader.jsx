import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function SectionHeader({
    title,
    subtitle,
    actionText,
    onAction,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-5 flex items-center justify-between"
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
                    {title}
                </h2>

                {subtitle && (
                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-500
                            dark:text-slate-400
                        "
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            {actionText && (
                <button
                    onClick={onAction}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-blue-600
                        transition
                        hover:bg-blue-50
                        dark:hover:bg-slate-800
                    "
                >
                    {actionText}

                    <FaArrowRight size={12} />
                </button>
            )}
        </motion.div>
    );
}

export default SectionHeader;