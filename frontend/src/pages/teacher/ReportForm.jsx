import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";
import FormCard from "../../components/common/FormCard";

import {
    createReport,
    getReportById,
    updateReport,
} from "../../services/report.service";

import {
    getAllStudents,
} from "../../services/student.service";

import {
    getAllTests,
} from "../../services/test.service";

function ReportForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [loading, setLoading] =
        useState(false);

    const [students, setStudents] =
        useState([]);

    const [tests, setTests] =
        useState([]);

    const [errors, setErrors] =
        useState({});

    const [formData, setFormData] =
        useState({
            student: "",
            test: "",
            obtainedMarks: "",
            totalMarks: "",
            remarks: "",
        });

    const fetchStudents = async () => {
        try {
            const res = await getAllStudents(1, "", 1000);
            setStudents(res.students || []);
        } catch (_error) {
            toast.error("Unable to load students.");
        }
    };

    const fetchTests = async () => {
        try {
            const res = await getAllTests(1, "", {});
            setTests(res.tests || []);
        } catch (_error) {
            toast.error("Unable to load tests.");
        }
    };

    const fetchReport = async () => {
        try {
            setLoading(true);
            const res = await getReportById(id);
            const report = res.report;

            setFormData({
                student: report.student?._id || "",
                test: report.test?._id || "",
                obtainedMarks: report.obtainedMarks || "",
                totalMarks: report.totalMarks || "",
                remarks: report.remarks || "",
            });
        } catch (_error) {
            toast.error("Unable to load report.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchTests();
        if (isEdit) {
            fetchReport();
        }
    }, [id, isEdit]);

    // ==========================================
    // Validation
    // ==========================================

    const validateForm = () => {

        const newErrors = {};

        if (!formData.student) {
            newErrors.student =
                "Please select a student.";
        }

        if (!formData.test) {
            newErrors.test =
                "Please select a test.";
        }

        if (
            formData.obtainedMarks === ""
        ) {
            newErrors.obtainedMarks =
                "Obtained marks are required.";
        }

        if (
            formData.totalMarks === ""
        ) {
            newErrors.totalMarks =
                "Total marks are required.";
        }

        if (
            Number(formData.obtainedMarks) >
            Number(formData.totalMarks)
        ) {
            newErrors.obtainedMarks =
                "Obtained marks cannot exceed total marks.";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );

    };

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {

            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));

        }

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) return;

        try {

            setLoading(true);

            if (isEdit) {

                await updateReport(
                    id,
                    formData
                );

                toast.success(
                    "Report updated successfully."
                );

            } else {

                await createReport(
                    formData
                );

                toast.success(
                    "Report created successfully."
                );

            }

            navigate("/teacher/reports");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            <PageHeader
                title={
                    isEdit
                        ? "Edit Report"
                        : "Add Report"
                }
                subtitle="Manage student reports"
            />

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >                 {/* Report Information */}

                <FormCard
                    title="Report Information"
                    subtitle="Enter report details"
                >

                    <div className="grid gap-5 md:grid-cols-2">

                        <Select
                            label="Student"
                            name="student"
                            value={formData.student}
                            onChange={handleChange}
                            error={errors.student}
                            required
                            disabled={isEdit}
                            options={[
                                {
                                    value: "",
                                    label: "Select Student",
                                },
                                ...students.map(
                                    (student) => ({
                                        value: student._id,
                                        label: `${student.fullName} (${student.admissionNo})`,
                                    })
                                ),
                            ]}
                        />

                        <Select
                            label="Test"
                            name="test"
                            value={formData.test}
                            onChange={handleChange}
                            error={errors.test}
                            required
                            disabled={isEdit}
                            options={[
                                {
                                    value: "",
                                    label: "Select Test",
                                },
                                ...tests.map(
                                    (test) => ({
                                        value: test._id,
                                        label: `${test.title} (${test.subject})`,
                                    })
                                ),
                            ]}
                        />

                        <Input
                            type="number"
                            label="Obtained Marks"
                            name="obtainedMarks"
                            value={formData.obtainedMarks}
                            onChange={handleChange}
                            error={errors.obtainedMarks}
                            placeholder="85"
                            required
                        />

                        <Input
                            type="number"
                            label="Total Marks"
                            name="totalMarks"
                            value={formData.totalMarks}
                            onChange={handleChange}
                            error={errors.totalMarks}
                            placeholder="100"
                            required
                        />

                        <div className="md:col-span-2">

                            <Textarea
                                label="Remarks"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                placeholder="Excellent performance..."
                                rows={4}
                            />

                        </div>

                    </div>

                </FormCard>
                                {/* Action Buttons */}

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:justify-end
                    "
                >

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate("/teacher/reports")
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        {isEdit
                            ? "Update Report"
                            : "Create Report"}
                    </Button>

                </div>

            </form>

        </div>

    );

}

export default ReportForm;