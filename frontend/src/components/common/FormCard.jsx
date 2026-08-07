function FormCard({
    title,
    subtitle = "",
    children,
    className = "",
}) {
    return (
        <div
            className={`
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-900
                ${className}
            `}
        >
            {(title || subtitle) && (
                <div className="mb-6">

                    {title && (
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {subtitle}
                        </p>
                    )}

                </div>
            )}

            {children}
        </div>
    );
}

export default FormCard;