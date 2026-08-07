import { motion } from "framer-motion";

function Button({
    children,
    type = "button",
    variant = "primary",
    fullWidth = false,
    loading = false,
    disabled = false,
    onClick,
    className = "",
}) {
    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        outline:
            "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                h-12
                rounded-xl
                px-5
                font-medium
                transition-all
                duration-200
                shadow-sm
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
        >
            {loading ? "Please wait..." : children}
        </motion.button>
    );
}

export default Button;