import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFileAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";

import { getMyReports } from "../../services/report.service";
import StatCard from "../../components/dashboard/StatCard";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";

function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await getMyReports();
            setReports(res.reports || []);
        } catch (_error) {
            toast.error("Unable to load reports.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const totalTests = reports.length;
    const avgPercentage =
        totalTests > 0
            ? Math.round(
                  reports.reduce((acc, curr) => acc + (curr.percentage || 0), 0) /
                      totalTests
              )
            : 0;

    const columns = [
        {
            title: "Test Title",
            key: "test",
            render: (row) => row.test?.title || "Test",
        },
        {
            title: "Subject",
            key: "subject",
            render: (row) => row.test?.subject || "General",
        },
        {
            title: "Score",
            key: "score",
            render: (row) => `${row.obtainedMarks} / ${row.totalMarks}`,
        },
        {
            title: "Percentage",
            key: "percentage",
            render: (row) => (
                <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        row.percentage >= 75
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : row.percentage >= 40
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                >
                    {row.percentage}%
                </span>
            ),
        },
        {
            title: "Remarks",
            key: "remarks",
            render: (row) => row.remarks || "-",
        },
        {
            title: "Date",
            key: "createdAt",
            render: (row) =>
                row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : "-",
        },
    ];

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Academic Reports</h1>
                <p className="mt-2 text-slate-500">
                    Track your test performance and report cards uploaded by your teachers.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <StatCard
                    title="Total Tests Evaluated"
                    value={totalTests}
                    icon={FaFileAlt}
                    color="blue"
                />

                <StatCard
                    title="Average Percentage"
                    value={`${avgPercentage}%`}
                    icon={FaChartLine}
                    color="emerald"
                />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 font-semibold text-slate-800 dark:text-slate-200">
                    Test Report Cards
                </h3>
                <Table
                    columns={columns}
                    data={reports}
                    emptyMessage="No test reports uploaded by teacher yet."
                />
            </div>
        </div>
    );
}

export default Reports;