import {
    FaCalendarCheck,
    FaCalendarTimes,
    FaPercentage,
} from "react-icons/fa";

import StatCard from "../../dashboard/StatCard";
import Table from "../../common/Table";

function AttendanceTab({
    attendance = [],
    summary = {},
}) {
    const columns = [
        {
            title: "Date",
            key: "date",
            render: (row) =>
                new Date(row.date).toLocaleDateString(),
        },
        {
            title: "Status",
            key: "status",
        },
        {
            title: "Marked By",
            key: "teacher",
            render: (row) =>
                row.teacher?.username || "-",
        },
    ];

    return (
        <div className="space-y-8">

            {/* Statistics */}

            <div className="grid gap-5 md:grid-cols-3">

                <StatCard
                    title="Present"
                    value={summary.present || 0}
                    icon={FaCalendarCheck}
                    color="green"
                />

                <StatCard
                    title="Absent"
                    value={summary.absent || 0}
                    icon={FaCalendarTimes}
                    color="red"
                />

                <StatCard
                    title="Attendance"
                    value={`${summary.percentage || 0}%`}
                    icon={FaPercentage}
                    color="blue"
                />

            </div>

            {/* Attendance History */}

            <Table
                columns={columns}
                data={attendance}
                emptyMessage="No attendance records."
            />

        </div>
    );
}

export default AttendanceTab;