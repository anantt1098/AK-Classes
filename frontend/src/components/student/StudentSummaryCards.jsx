import {
    FaClipboardCheck,
    FaMoneyBillWave,
    FaChartLine,
    FaClipboardList,
} from "react-icons/fa";

import StatCard from "../dashboard/StatCard";

function StudentSummaryCards({
    attendance = 0,
    pendingFees = 0,
    averageMarks = 0,
    tests = 0,
}) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
                title="Attendance"
                value={`${attendance}%`}
                subtitle="Overall"
                icon={FaClipboardCheck}
                color="green"
            />

            <StatCard
                title="Pending Fees"
                value={`₹${pendingFees}`}
                subtitle="Remaining"
                icon={FaMoneyBillWave}
                color="red"
            />

            <StatCard
                title="Average Marks"
                value={`${averageMarks}%`}
                subtitle="Overall"
                icon={FaChartLine}
                color="blue"
            />

            <StatCard
                title="Tests"
                value={tests}
                subtitle="Completed"
                icon={FaClipboardList}
                color="purple"
            />

        </div>
    );
}

export default StudentSummaryCards;