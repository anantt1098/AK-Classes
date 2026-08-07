import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    disabled = false,
    icon: Icon,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <Icon
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            text-lg
                        "
                    />
                )}

                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        w-full
                        h-12
                        rounded-xl
                        border
                        bg-white
                        dark:bg-slate-800
                        dark:border-slate-700
                        border-slate-300
                        px-4
                        ${Icon ? "pl-12" : ""}
                        ${
                            type === "password"
                                ? "pr-12"
                                : ""
                        }
                        text-slate-900
                        dark:text-white
                        placeholder:text-slate-400
                        focus:border-blue-600
                        focus:ring-2
                        focus:ring-blue-200
                        dark:focus:ring-blue-900
                        outline-none
                        transition-all
                        duration-200
                        disabled:opacity-60
                        ${error ? "border-red-500" : ""}
                        ${className}
                    `}
                    {...props}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                            hover:text-blue-600
                        "
                    >
                        {showPassword ? (
                            <FaEyeSlash />
                        ) : (
                            <FaEye />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;