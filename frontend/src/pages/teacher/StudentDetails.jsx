import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import StudentProfileHeader from "../../components/student/StudentProfileHeader";
import StudentSummaryCards from "../../components/student/StudentSummaryCards";
import StudentTabs from "../../components/student/StudentTabs";
import StudentActivity from "../../components/student/StudentActivity";

import OverviewTab from "../../components/student/tabs/OverviewTab";
import AttendanceTab from "../../components/student/tabs/AttendanceTab";
import FeesTab from "../../components/student/tabs/FeesTab";
import ReportsTab from "../../components/student/tabs/ReportsTab";
import TestsTab from "../../components/student/tabs/TestsTab";

import {
    getStudentById,
} from "../../services/student.service";


function StudentDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);



    const fetchStudent = async () => {
        try {
            setLoading(true);
            const res = await getStudentById(id);
            setStudent(res.student);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to load student."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchStudent();
        }
    }, [id]);





    if (loading) {

        return <Loader />;

    }





    if (!student) {

        return (

            <div className="space-y-6">

                <div
                    className="
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        p-8
                        text-center
                        dark:border-red-800
                        dark:bg-red-950
                    "
                >

                    <h2 className="text-xl font-semibold">
                        Student Not Found
                    </h2>


                    <p className="mt-2 text-slate-500">
                        The requested student
                        does not exist or may
                        have been deleted.
                    </p>



                    <Button
                        className="mt-6"
                        onClick={() =>
                            navigate("/students")
                        }
                    >

                        Back to Students

                    </Button>


                </div>

            </div>

        );

    }






    return (

        <div className="space-y-8">


            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


                <Button

                    variant="secondary"

                    onClick={() =>
                        navigate("/teacher/students")
                    }

                >

                    ← Back

                </Button>




                <div className="flex gap-3">


                    <Button

                        variant="secondary"

                        onClick={fetchStudent}

                    >

                        Refresh

                    </Button>




                    <Button

                        onClick={() =>
                            navigate(
                                `/teacher/students/${student._id}/edit`
                            )
                        }

                    >

                        Edit Student

                    </Button>


                </div>


            </div>






            <StudentProfileHeader
                student={student}
            />






            <StudentSummaryCards

                attendance={
                    student.attendancePercentage ??
                    0
                }

                pendingFees={
                    student.pendingFees ?? 0
                }

                averageMarks={
                    student.averageMarks ?? 0
                }

                tests={
                    student.totalTests ?? 0
                }

            />








            <StudentTabs


                overview={

                    <OverviewTab
                        student={student}
                    />

                }




                attendance={

                    <AttendanceTab

                        attendance={
                            student.attendance ||
                            []
                        }


                        summary={{

                            present:
                                student.presentDays ??
                                0,


                            absent:
                                student.absentDays ??
                                0,


                            percentage:
                                student.attendancePercentage ??
                                0,

                        }}

                    />

                }





                fees={

                    <FeesTab

                        summary={{

                            total:
                                student.totalFees ??
                                0,


                            paid:
                                student.paidFees ??
                                0,


                            remaining:
                                student.pendingFees ??
                                0,

                        }}



                        payments={
                            student.payments ||
                            []
                        }

                    />

                }





                reports={

                    <ReportsTab

                        reports={
                            student.reports ||
                            []
                        }

                    />

                }





                tests={

                    <TestsTab

                        tests={
                            student.tests || []
                        }

                    />

                }


            />









            <div className="grid gap-8 xl:grid-cols-3">



                <div className="xl:col-span-2">


                    <StudentActivity

                        activities={
                            student.activities ||
                            []
                        }

                    />


                </div>






                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        dark:border-slate-700
                        dark:bg-slate-900
                    "
                >

                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                        Student Information
                    </h2>

                    <div className="space-y-1">
                        <InfoRow
                            label="Full Name"
                            value={student.fullName || "-"}
                        />

                        <InfoRow
                            label="Username"
                            value={student.user?.username || "-"}
                        />

                        <InfoRow
                            label="Email"
                            value={student.user?.email || "-"}
                        />

                        <InfoRow
                            label="Class"
                            value={`Class ${student.studentClass || "-"}`}
                        />

                        {student.stream && (
                            <InfoRow
                                label="Stream"
                                value={student.stream}
                            />
                        )}

                        <InfoRow
                            label="Student Phone"
                            value={student.phone || "-"}
                        />

                        <InfoRow
                            label="Parent Phone"
                            value={student.parentPhone || "-"}
                        />

                        <InfoRow
                            label="Address"
                            value={student.address || "-"}
                        />

                        <InfoRow
                            label="Joining Date"
                            value={
                                student.joiningDate
                                    ? new Date(student.joiningDate).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <InfoRow
                            label="Status"
                            value={
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    student.isActive
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                        : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                                }`}>
                                    {student.isActive ? "Active" : "Inactive"}
                                </span>
                            }
                        />

                        <InfoRow
                            label="Account Created"
                            value={
                                student.user?.createdAt
                                    ? new Date(student.user.createdAt).toLocaleDateString()
                                    : "-"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-2.5 dark:border-slate-800/80">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {label}
            </span>
            <span className="text-right text-xs font-semibold text-slate-800 dark:text-slate-200 break-all">
                {value}
            </span>
        </div>
    );
}










export default StudentDetails;