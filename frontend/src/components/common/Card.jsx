import { motion } from "framer-motion";

function Card({
    children,
    title,
    subtitle,
    icon: Icon,
    action,
    className = "",
    onClick,
    hover = true,
}) {
    return (
        <motion.div
            whileHover={
                hover
                    ? {
                          y: -4,
                          transition: {
                              duration: 0.2,
                          },
                      }
                    : {}
            }
            onClick={onClick}
            className={`
                bg-white
                dark:bg-slate-800
                rounded-2xl
                shadow-sm
                border
                border-slate-200
                dark:border-slate-700
                p-5
                transition-all
                duration-200
                ${onClick ? "cursor-pointer" : ""}
                ${className}
            `}
        >
            {(title || Icon || action) && (
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div
                                className="
                                    h-11
                                    w-11
                                    rounded-xl
                                    bg-blue-100
                                    dark:bg-slate-700
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <Icon
                                    className="
                                        text-blue-600
                                        text-xl
                                    "
                                />
                            </div>
                        )}

                        <div>
                            {title && (
                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    {title}
                                </h3>
                            )}

                            {subtitle && (
                                <p
                                    className="
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {action}
                </div>
            )}

            {children}
        </motion.div>
    );
}

export default Card;