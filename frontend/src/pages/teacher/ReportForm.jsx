import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { getAllStudents } from "../../services/student.service";
import { getAllTests } from "../../services/test.service";

const subjectData = {
    "6": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "7": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "8": ["Science", "Maths", "SST", "Hindi", "English", "Other"],
    "9": ["Maths", "Science", "SST"],
    "10": ["Maths", "Science", "SST"],
    "11": {
        Science: ["Physics", "Chemistry", "Maths", "Biology", "Other"],
        Humanities: ["History", "Political Science", "Geography", "Other"],
    },
    "12": {
        Science: ["Physics", "Chemistry", "Maths", "Biology", "Other"],
        Humanities: ["History", "Political Science", "Geography", "Other"],
    },
};

function ReportForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [tests, setTests] = useState([]);
    const [errors, setErrors] = useState({});

    // Filter selectors
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStream, setSelectedStream] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const [formData, setFormData] = useState({
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

            const repClass = report.test?.studentClass || report.student?.studentClass || "";
            const repStream = report.test?.stream || report.student?.stream || "";
            const repSub = report.test?.subject || "";

            setSelectedClass(repClass);
            setSelectedStream(repStream);
            setSelectedSubject(repSub);

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

    const getSubjects = () => {
        if (!selectedClass) return [];
        if (selectedClass === "11" || selectedClass === "12") {
            if (!selectedStream) return [];
            return subjectData[selectedClass]?.[selectedStream] || [];
        }
        return subjectData[selectedClass] || [];
    };

    // Filtered lists
    const filteredStudents = students.filter((st) => {
        if (selectedClass && st.studentClass !== selectedClass) return false;
        if (
            (selectedClass === "11" || selectedClass === "12") &&
            selectedStream &&
            st.stream !== selectedStream
        ) {
            return false;
        }
        return true;
    });

    const filteredTests = tests.filter((t) => {
        if (selectedClass && t.studentClass !== selectedClass) return false;
        if (
            (selectedClass === "11" || selectedClass === "12") &&
            selectedStream &&
            t.stream &&
            t.stream !== selectedStream
        ) {
            return false;
        }
        if (selectedSubject && t.subject !== selectedSubject) return false;
        return true;
    });

    const handleClassChange = (e) => {
        const val = e.target.value;
        setSelectedClass(val);
        setSelectedStream("");
        setSelectedSubject("");
        setFormData((prev) => ({ ...prev, student: "", test: "" }));
    };

    const handleStreamChange = (e) => {
        const val = e.target.value;
        setSelectedStream(val);
        setSelectedSubject("");
        setFormData((prev) => ({ ...prev, student: "", test: "" }));
    };

    const handleSubjectChange = (e) => {
        const val = e.target.value;
        setSelectedSubject(val);
        setFormData((prev) => ({ ...prev, test: "" }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "test" && value) {
            const selectedTestObj = tests.find((t) => t._id === value);
            if (selectedTestObj && selectedTestObj.totalMarks) {
                setFormData((prev) => ({
                    ...prev,
                    totalMarks: selectedTestObj.totalMarks,
                }));
            }
        }

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.student) {
            newErrors.student = "Please select a student.";
        }

        if (!formData.test) {
            newErrors.test = "Please select a test.";
        }

        if (formData.obtainedMarks === "") {
            newErrors.obtainedMarks = "Obtained marks are required.";
        }

        if (formData.totalMarks === "") {
            newErrors.totalMarks = "Total marks are required.";
        }

        if (Number(formData.obtainedMarks) > Number(formData.totalMarks)) {
            newErrors.obtainedMarks = "Obtained marks cannot exceed total marks.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);

            if (isEdit) {
                await updateReport(id, formData);
                toast.success("Report updated successfully.");
            } else {
                await createReport(formData);
                toast.success("Report created successfully.");
            }

            navigate("/teacher/reports");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <PageHeader
                title={isEdit ? "Edit Report" : "Add Report"}
                subtitle="Manage student reports with class and subject filters"
            />

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Academic Filters Section */}
                <FormCard
                    title="Filter Criteria"
                    subtitle="Select Class, Stream, and Subject to filter Students and Tests"
                >
                    <div className="grid gap-5 md:grid-cols-3">
                        <Select
                            label="Class Filter"
                            name="selectedClass"
                            value={selectedClass}
                            onChange={handleClassChange}
                            options={[
                                { value: "", label: "All Classes" },
                                { value: "6", label: "Class 6" },
                                { value: "7", label: "Class 7" },
                                { value: "8", label: "Class 8" },
                                { value: "9", label: "Class 9" },
                                { value: "10", label: "Class 10" },
                                { value: "11", label: "Class 11" },
                                { value: "12", label: "Class 12" },
                            ]}
                        />

                        {(selectedClass === "11" || selectedClass === "12") && (
                            <Select
                                label="Stream Filter"
                                name="selectedStream"
                                value={selectedStream}
                                onChange={handleStreamChange}
                                options={[
                                    { value: "", label: "Select Stream" },
                                    { value: "Science", label: "Science" },
                                    { value: "Humanities", label: "Humanities" },
                                ]}
                            />
                        )}

                        <Select
                            label="Subject Filter"
                            name="selectedSubject"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            disabled={!selectedClass}
                            options={[
                                { value: "", label: "All Subjects" },
                                ...getSubjects().map((sub) => ({
                                    value: sub,
                                    label: sub,
                                })),
                            ]}
                        />
                    </div>
                </FormCard>

                {/* Report Information */}
                <FormCard
                    title="Report Information"
                    subtitle="Select student and test details"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <Select
                            label={`Student (${filteredStudents.length} available)`}
                            name="student"
                            value={formData.student}
                            onChange={handleChange}
                            error={errors.student}
                            required
                            disabled={isEdit}
                            options={[
                                {
                                    value: "",
                                    label:
                                        filteredStudents.length === 0
                                            ? "No students match filter"
                                            : "Select Student",
                                },
                                ...filteredStudents.map((st) => ({
                                    value: st._id,
                                    label: `${st.fullName} (Class ${st.studentClass}${st.stream ? ` - ${st.stream}` : ""})`,
                                })),
                            ]}
                        />

                        <Select
                            label={`Test (${filteredTests.length} available)`}
                            name="test"
                            value={formData.test}
                            onChange={handleChange}
                            error={errors.test}
                            required
                            disabled={isEdit}
                            options={[
                                {
                                    value: "",
                                    label:
                                        filteredTests.length === 0
                                            ? "No tests match filter"
                                            : "Select Test",
                                },
                                ...filteredTests.map((t) => ({
                                    value: t._id,
                                    label: `${t.title} (${t.subject} - Class ${t.studentClass})`,
                                })),
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
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate("/teacher/reports")}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" loading={loading}>
                        {isEdit ? "Update Report" : "Create Report"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ReportForm;