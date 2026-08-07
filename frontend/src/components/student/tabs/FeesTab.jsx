import {
    FaMoneyBillWave,
    FaCheckCircle,
    FaExclamationCircle,
} from "react-icons/fa";

import StatCard from "../../dashboard/StatCard";
import Table from "../../common/Table";
import StatusBadge from "../../common/StatusBadge";

function FeesTab({
    summary = {},
    payments = [],
}) {
    const columns = [
        {
            title: "Receipt No",
            key: "receiptNo",
        },
        {
            title: "Date",
            key: "date",
            render: (row) =>
                new Date(row.date).toLocaleDateString(),
        },
        {
            title: "Amount",
            key: "amount",
            render: (row) => `₹${row.amount}`,
        },
        {
            title: "Mode",
            key: "paymentMethod",
        },
        {
            title: "Status",
            key: "status",
            render: (row) => (
                <StatusBadge status={row.status} />
            ),
        },
    ];

    return (
        <div className="space-y-8">

            <div className="grid gap-5 md:grid-cols-3">

                <StatCard
                    title="Total Fees"
                    value={`₹${summary.total || 0}`}
                    icon={FaMoneyBillWave}
                    color="blue"
                />

                <StatCard
                    title="Paid"
                    value={`₹${summary.paid || 0}`}
                    icon={FaCheckCircle}
                    color="green"
                />

                <StatCard
                    title="Remaining"
                    value={`₹${summary.remaining || 0}`}
                    icon={FaExclamationCircle}
                    color="red"
                />

            </div>

            <Table
                columns={columns}
                data={payments}
                emptyMessage="No payment history."
            />

        </div>
    );
}

export default FeesTab;