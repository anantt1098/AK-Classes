import {
    FaUserGraduate,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaUsers,
} from "react-icons/fa";

import StatusBadge from "../common/StatusBadge";

function StudentProfileHeader({ student }) {
    return (
        <div
            className="
                rounded-3xl
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                p-6
                shadow-sm
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                {/* Left */}

                <div className="flex items-center gap-5">

                    <div
                        className="
                            h-24
                            w-24
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-blue-600
                        "
                    >
                        <FaUserGraduate size={42} />
                    </div>

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                            "
                        >
                            {student.fullName}
                        </h1>

                        <p className="mt-2 text-slate-500">

    Class {student.studentClass}

</p>

                        <div className="mt-4">

                            <StatusBadge
                                status={
                                    student.isActive
                                        ? "Active"
                                        : "Inactive"
                                }
                            />

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                    "
                >
                    <div className="flex items-center gap-3">

                        <FaPhone />

                        {student.phone || "-"}

                    </div>

                    <div className="flex items-center gap-3">

                        <FaEnvelope />

                        {student.user?.email}

                    </div>

                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt />
                        {student.address || "No address"}
                    </div>

                    <div className="flex items-center gap-3">

                        <FaUsers />

                        {student.parentPhone || "-"}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default StudentProfileHeader;