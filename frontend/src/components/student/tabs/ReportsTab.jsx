import { FaChartBar } from "react-icons/fa";

function ReportsTab({ reports = [] }) {
    return (
        <div className="rounded-2xl border bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 flex items-center gap-3">
                <FaChartBar className="text-2xl text-blue-600" />

                <h2 className="text-2xl font-bold">
                    Academic Reports
                </h2>
            </div>

            {reports.length > 0 ? (
                reports.map((report, index) => (
                    <div
                        key={report._id || index}
                        className="mb-4 rounded-xl border p-4 dark:border-slate-700"
                    >
                        <h3 className="font-semibold">
                            {report.title}
                        </h3>

                        <p className="mt-2 text-slate-500">
                            {report.description}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-slate-500">
                    No reports available.
                </p>
            )}
        </div>
    );
}

export default ReportsTab;