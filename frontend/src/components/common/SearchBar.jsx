import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
    onClear,
}) {
    return (
        <div className="relative w-full">
            {/* Search Icon */}

            <FaSearch
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                "
            />

            {/* Input */}

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-300
                    bg-white
                    dark:bg-slate-900
                    dark:border-slate-700
                    py-3
                    pl-11
                    pr-11
                    text-slate-900
                    dark:text-white
                    placeholder:text-slate-400
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                "
            />

            {/* Clear */}

            {value && (
                <button
                    onClick={onClear}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        hover:text-red-500
                    "
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
}

export default SearchBar;