import {
    FaPhone,
    FaUserGraduate,
    FaEdit,
    FaTrash,
    FaEye,
    FaMapMarkerAlt,
} from "react-icons/fa";

import StatusBadge from "../common/StatusBadge";

function StudentCard({
    student,
    onViewProfile,
    onView,
    onEdit,
    onDelete,
}) {
    const handleView = () => {
        if (onViewProfile) return onViewProfile(student);
        if (onView) return onView(student);
    };
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-900
            "
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            text-blue-600
                        "
                    >
                        <FaUserGraduate size={22} />
                    </div>


                    <div>

                        <h2 className="font-semibold text-lg">
                            {student.fullName}
                        </h2>


                        <p className="text-sm text-slate-500">
                            Class {student.studentClass}
                        </p>


                    </div>


                </div>



                <StatusBadge
                    status={
                        student.isActive
                            ? "Active"
                            : "Inactive"
                    }
                />


            </div>





            {/* Details */}

            <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500">Student Phone</span>
                    <span className="flex items-center gap-1.5 font-medium">
                        <FaPhone className="text-xs text-slate-400" />
                        {student.phone || "Not provided"}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-500">Parent Phone</span>
                    <span className="flex items-center gap-1.5 font-medium">
                        <FaPhone className="text-xs text-slate-400" />
                        {student.parentPhone || "Not provided"}
                    </span>
                </div>

                {student.address && (
                    <div className="flex justify-between">
                        <span className="text-slate-500">Address</span>
                        <span className="flex items-center gap-1.5 font-medium truncate max-w-[160px]">
                            <FaMapMarkerAlt className="text-xs text-slate-400" />
                            {student.address}
                        </span>
                    </div>
                )}
            </div>





            {/* Actions */}

            <div className="mt-6 flex gap-2">
                <button
                    onClick={handleView}
                    className="
                        flex-1
                        rounded-xl
                        bg-emerald-600
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        hover:bg-emerald-700
                        transition-all
                    "
                >
                    <FaEye className="inline mr-1.5" />
                    Profile
                </button>

                <button
                    onClick={() => onEdit(student)}
                    className="
                        flex-1
                        rounded-xl
                        bg-blue-600
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        hover:bg-blue-700
                        transition-all
                    "
                >
                    <FaEdit className="inline mr-1.5" />
                    Edit
                </button>

                <button
                    onClick={() => onDelete(student)}
                    className="
                        rounded-xl
                        bg-red-600
                        px-3.5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        hover:bg-red-700
                        transition-all
                    "
                >
                    <FaTrash />
                </button>
            </div>


        </div>
    );
}

export default StudentCard;