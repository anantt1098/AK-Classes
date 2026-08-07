function StatusBadge({
    status,
    size = "md",
}) {
    const styles = {
        Present: {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-700 dark:text-green-400",
        },

        Absent: {
            bg: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-700 dark:text-red-400",
        },

        Late: {
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            text: "text-yellow-700 dark:text-yellow-400",
        },

        Paid: {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-700 dark:text-green-400",
        },

        Pending: {
            bg: "bg-orange-100 dark:bg-orange-900/30",
            text: "text-orange-700 dark:text-orange-400",
        },

        Active: {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-700 dark:text-blue-400",
        },

        Inactive: {
            bg: "bg-slate-200 dark:bg-slate-700",
            text: "text-slate-700 dark:text-slate-300",
        },
    };

    const current =
        styles[status] || {
            bg: "bg-slate-100 dark:bg-slate-800",
            text: "text-slate-700 dark:text-slate-300",
        };

    const sizes = {
        sm: "px-2 py-1 text-xs",

        md: "px-3 py-1 text-sm",

        lg: "px-4 py-2 text-base",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                font-medium
                ${current.bg}
                ${current.text}
                ${sizes[size]}
            `}
        >
            {status}
        </span>
    );
}

export default StatusBadge;