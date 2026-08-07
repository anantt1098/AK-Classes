import api from "./api";

// ==========================================
// Get All Reports
// ==========================================
export const getAllReports = async (
    page = 1,
    search = "",
    limit = 10
) => {
    const { data } = await api.get(
        "/reports",
        {
            params: {
                page,
                search,
                limit,
            },
        }
    );

    return data;
};

// ==========================================
// Get Report By ID
// ==========================================
export const getReportById = async (id) => {
    const { data } = await api.get(
        `/reports/${id}`
    );

    return data;
};

// ==========================================
// Get Reports By Student
// ==========================================
export const getStudentReports = async (
    studentId
) => {
    const { data } = await api.get(
        `/reports/student/${studentId}`
    );

    return data;
};

// ==========================================
// Create Report
// ==========================================
export const createReport = async (
    reportData
) => {
    const { data } = await api.post(
        "/reports",
        reportData
    );

    return data;
};

// ==========================================
// Update Report
// ==========================================
export const updateReport = async (
    id,
    reportData
) => {
    const { data } = await api.put(
        `/reports/${id}`,
        reportData
    );

    return data;
};

// ==========================================
// Delete Report
// ==========================================
export const deleteReport = async (
    id
) => {
    const { data } = await api.delete(
        `/reports/${id}`
    );

    return data;
};

// ==========================================
// Get Logged-in Student Reports
// ==========================================
export const getMyReports = async () => {
    const { data } = await api.get(
        "/reports/me"
    );

    return data;
};