import {
    FaUserCheck,
    FaUserTimes,
    FaPercentage,
    FaUsers,
} from "react-icons/fa";

import StatCard from "../dashboard/StatCard";

function AttendanceStats({
    total = 0,
    present = 0,
    absent = 0,
    percentage = 0,
}) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
                title="Total Students"
                value={total}
                icon={FaUsers}
                color="blue"
            />

            <StatCard
                title="Present"
                value={present}
                icon={FaUserCheck}
                color="green"
            />

            <StatCard
                title="Absent"
                value={absent}
                icon={FaUserTimes}
                color="red"
            />

            <StatCard
                title="Attendance"
                value={`${percentage}%`}
                icon={FaPercentage}
                color="purple"
            />

        </div>
    );
}

export default AttendanceStats;