import {
    FaAngleLeft,
    FaAngleRight,
} from "react-icons/fa";

function Pagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) {
    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div
            className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
            "
        >
            {/* Previous */}

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    transition
                    hover:bg-slate-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:hover:bg-slate-800
                "
            >
                <FaAngleLeft />
            </button>

            {/* Page Numbers */}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() =>
                        onPageChange(page)
                    }
                    className={`
                        h-10
                        min-w-[40px]
                        rounded-xl
                        px-3
                        font-medium
                        transition
                        ${
                            currentPage === page
                                ? "bg-blue-600 text-white"
                                : "border border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                        }
                    `}
                >
                    {page}
                </button>
            ))}

            {/* Next */}

            <button
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    transition
                    hover:bg-slate-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:hover:bg-slate-800
                "
            >
                <FaAngleRight />
            </button>
        </div>
    );
}

export default Pagination;