import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function StatCard({
    title,
    value = 0,
    icon: Icon,
    color = "bg-blue-500",
    trend,
    path,
    isLive = false,
}) {
    const cardContent = (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                dark:border-slate-800
                dark:bg-slate-900
                ${path ? "cursor-pointer" : ""}
            `}
        >
            {/* Background decoration */}
            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    bg-slate-100
                    opacity-50
                    dark:bg-slate-800
                "
            />

            <div className="relative flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {title}
                        </p>
                        {isLive && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                                LIVE
                            </span>
                        )}
                    </div>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                        {value}
                    </h2>

                    {trend && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <FaArrowTrendUp />
                                {trend}
                            </span>
                            <span className="text-xs text-slate-500">This month</span>
                        </div>
                    )}
                </div>

                <div
                    className={`
                        ${color}
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        text-2xl
                        text-white
                        shadow-md
                        transition
                        duration-300
                        group-hover:scale-110
                    `}
                >
                    {Icon && <Icon />}
                </div>
            </div>
        </div>
    );

    if (path) {
        return <Link to={path}>{cardContent}</Link>;
    }

    return cardContent;
}

export default StatCard;