function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    rows = 4,
    error = "",
    required = false,
    disabled = false,
    className = "",
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition

                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200

                    disabled:cursor-not-allowed
                    disabled:bg-slate-100
                    dark:disabled:bg-slate-800
                    dark:disabled:text-slate-500
                    dark:disabled:border-slate-800

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    dark:focus:ring-blue-900
                "
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Textarea;