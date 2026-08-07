function Table({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = "No data found.",
}) {
    if (loading) {
        return (
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="h-14 animate-pulse border-b border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                    />
                ))}
            </div>
        );
    }

    if (!loading && data.length === 0) {
        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    bg-white
                    dark:bg-slate-900
                    py-16
                    text-center
                "
            >
                <p className="text-slate-500">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                overflow-x-auto
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-900
            "
        >
            <table className="min-w-full">
                <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="
                                    px-5
                                    py-4
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    dark:text-white
                                "
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="
                                border-t
                                border-slate-200
                                transition
                                hover:bg-slate-50
                                dark:border-slate-700
                                dark:hover:bg-slate-800
                            "
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="
                                        whitespace-nowrap
                                        px-5
                                        py-4
                                        text-sm
                                        text-slate-700
                                        dark:text-slate-200
                                    "
                                >
                                    {column.render
                                        ? column.render(row)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;