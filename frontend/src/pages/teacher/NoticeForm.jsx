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
    createNotice,
    getNoticeById,
    updateNotice,
} from "../../services/notice.service";

function NoticeForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] =
        useState({});

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            studentClass: "All",
            attachment: "",
            isActive: true,
        });

    const fetchNotice = async () => {
        try {
            setLoading(true);
            const res = await getNoticeById(id);
            const notice = res.notice;

            setFormData({
                title: notice.title || "",
                description: notice.description || "",
                studentClass: notice.studentClass || "All",
                attachment: notice.attachment || "",
                isActive: notice.isActive,
            });
        } catch (_error) {
            toast.error("Unable to load notice.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isEdit) {
            fetchNotice();
        }
    }, [id, isEdit]);

    // ==========================================
    // Validation
    // ==========================================

    const validateForm = () => {

        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title =
                "Title is required.";
        }

        if (!formData.description.trim()) {
            newErrors.description =
                "Description is required.";
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

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
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

                await updateNotice(
                    id,
                    formData
                );

                toast.success(
                    "Notice updated successfully."
                );

            } else {

                await createNotice(
                    formData
                );

                toast.success(
                    "Notice created successfully."
                );

            }

            navigate("/teacher/notices");

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
                        ? "Edit Notice"
                        : "Create Notice"
                }
                subtitle="Manage school notices"
            />

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >                 {/* Notice Information */}

                <FormCard
                    title="Notice Information"
                    subtitle="Enter notice details"
                >

                    <div className="grid gap-5 md:grid-cols-2">

                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={errors.title}
                            required
                        />

                        <Select
                            label="Class"
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleChange}
                            options={[
                                {
                                    value: "All",
                                    label: "All Classes",
                                },
                                {
                                    value: "6",
                                    label: "Class 6",
                                },
                                {
                                    value: "7",
                                    label: "Class 7",
                                },
                                {
                                    value: "8",
                                    label: "Class 8",
                                },
                                {
                                    value: "9",
                                    label: "Class 9",
                                },
                                {
                                    value: "10",
                                    label: "Class 10",
                                },
                                {
                                    value: "11",
                                    label: "Class 11",
                                },
                                {
                                    value: "12",
                                    label: "Class 12",
                                },
                            ]}
                        />

                        <div className="md:col-span-2">

                            <Textarea
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                error={errors.description}
                                rows={6}
                                placeholder="Enter notice description..."
                                required
                            />

                        </div>

                        <div className="md:col-span-2">

                            <Input
                                label="Attachment URL"
                                name="attachment"
                                value={formData.attachment}
                                onChange={handleChange}
                                placeholder="https://example.com/file.pdf"
                            />

                        </div>

                        {isEdit && (

                            <div className="md:col-span-2">

                                <label className="flex items-center gap-3">

                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={
                                            formData.isActive
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <span>
                                        Active Notice
                                    </span>

                                </label>

                            </div>

                        )}

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
                            navigate("/teacher/notices")
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        {isEdit
                            ? "Update Notice"
                            : "Create Notice"}
                    </Button>

                </div>

            </form>

        </div>

    );

}

export default NoticeForm;