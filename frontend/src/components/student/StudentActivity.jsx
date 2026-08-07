import {
    FaBook,
    FaClipboardCheck,
    FaMoneyBillWave,
    FaFileAlt,
    FaUserGraduate,
} from "react-icons/fa";

function StudentActivity({
    activities = [],
}) {
    const icons = {
        attendance: FaClipboardCheck,
        fee: FaMoneyBillWave,
        report: FaFileAlt,
        note: FaBook,
        student: FaUserGraduate,
    };

    return (
        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-900
            "
        >
            <h2 className="mb-6 text-xl font-bold">
                Recent Activity
            </h2>

            <div className="space-y-6">

                {activities.length === 0 ? (
                    <p className="text-slate-500">
                        No recent activity.
                    </p>
                ) : (
                    activities.map((activity) => {
                        const Icon =
                            icons[activity.type] ||
                            FaUserGraduate;

                        return (
                            <div
                                key={activity._id}
                                className="flex gap-4"
                            >
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-blue-100
                                        text-blue-600
                                    "
                                >
                                    <Icon />
                                </div>

                                <div className="flex-1">

                                    <h3 className="font-semibold">
                                        {activity.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        {activity.description}
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            text-slate-400
                                        "
                                    >
                                        {activity.time}
                                    </p>

                                </div>

                            </div>
                        );
                    })
                )}

            </div>
        </div>
    );
}

export default StudentActivity;