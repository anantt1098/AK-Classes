import { motion } from "framer-motion";

function Loader({
    type = "page",
    text = "Loading...",
}) {
    // ==========================================
    // Button Loader
    // ==========================================
    if (type === "button") {
        return (
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                }}
                className="
                    h-5
                    w-5
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                "
            />
        );
    }

    // ==========================================
    // Card Loader
    // ==========================================
    if (type === "card") {
        return (
            <div
                className="
                    animate-pulse
                    rounded-2xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-800
                    p-5
                "
            >
                <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700"></div>

                <div className="mt-6 h-10 rounded bg-slate-200 dark:bg-slate-700"></div>

                <div className="mt-4 h-10 rounded bg-slate-200 dark:bg-slate-700"></div>

                <div className="mt-4 h-10 rounded bg-slate-200 dark:bg-slate-700"></div>
            </div>
        );
    }

    // ==========================================
    // Table Loader
    // ==========================================
    if (type === "table") {
        return (
            <div className="space-y-3 animate-pulse">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="
                            h-12
                            rounded-xl
                            bg-slate-200
                            dark:bg-slate-700
                        "
                    />
                ))}
            </div>
        );
    }

    // ==========================================
    // Full Page Loader
    // ==========================================
    return (
        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-50
                dark:bg-slate-900
            "
        >
            <div className="flex flex-col items-center gap-5">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                    }}
                    className="
                        h-14
                        w-14
                        rounded-full
                        border-4
                        border-blue-600
                        border-t-transparent
                    "
                />

                <p
                    className="
                        text-slate-600
                        dark:text-slate-300
                        font-medium
                    "
                >
                    {text}
                </p>
            </div>
        </div>
    );
}

export default Loader;