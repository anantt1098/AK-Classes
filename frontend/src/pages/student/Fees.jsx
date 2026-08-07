import { useEffect, useState } from "react";
import {
    FaMoneyBillWave,
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle,
} from "react-icons/fa";

import { getMyFee } from "../../services/fee.service";
import StatCard from "../../components/dashboard/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import Loader from "../../components/common/Loader";

function Fees() {
    const [feeData, setFeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchFee = async () => {
        try {
            setLoading(true);
            const res = await getMyFee();
            setFeeData(res.fee || null);
        } catch (_error) {
            // Fee might not be created by teacher yet
            setFeeData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFee();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!feeData) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Fee Status</h1>
                    <p className="mt-2 text-slate-500">View your fee breakdown and payment details.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaInfoCircle className="mx-auto text-4xl text-blue-500" />
                    <h2 className="mt-4 text-xl font-semibold">No Fee Record Found</h2>
                    <p className="mt-2 text-sm text-slate-500">Your teacher has not uploaded fee information for your account yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Fee Status</h1>
                <p className="mt-2 text-slate-500">View your fee breakdown and payment details.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <StatCard
                    title="Total Fees"
                    value={`₹${feeData.totalFee || 0}`}
                    icon={FaMoneyBillWave}
                    color="blue"
                />

                <StatCard
                    title="Paid Fee"
                    value={`₹${feeData.paidFee || 0}`}
                    icon={FaCheckCircle}
                    color="green"
                />

                <StatCard
                    title="Due Fee"
                    value={`₹${feeData.dueFee || 0}`}
                    icon={FaExclamationCircle}
                    color="red"
                />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Payment Summary</h3>
                    <StatusBadge status={feeData.status || "Pending"} />
                </div>
                <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Status:</span>
                        <span className="font-medium text-slate-900 dark:text-white">{feeData.status}</span>
                    </div>
                    {feeData.remarks && (
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Remarks:</span>
                            <span className="font-medium text-slate-900 dark:text-white">{feeData.remarks}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Last Updated:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                            {feeData.updatedAt ? new Date(feeData.updatedAt).toLocaleDateString() : "N/A"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fees;