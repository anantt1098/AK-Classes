import api from "./api";

// ==========================================
// Get Student Notices
// ==========================================
export const getStudentNotices = async () => {
    const { data } = await api.get("/notices/student");
    return data;
};

// ==========================================
// Get All Notices
// ==========================================
export const getAllNotices = async (
    page = 1,
    search = "",
    limit = 10
) => {
    const { data } = await api.get(
        "/notices",
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
// Get Notice By ID
// ==========================================
export const getNoticeById = async (
    id
) => {
    const { data } = await api.get(
        `/notices/${id}`
    );

    return data;
};

// ==========================================
// Create Notice
// ==========================================
export const createNotice = async (
    noticeData
) => {
    const { data } = await api.post(
        "/notices",
        noticeData
    );

    return data;
};

// ==========================================
// Update Notice
// ==========================================
export const updateNotice = async (
    id,
    noticeData
) => {
    const { data } = await api.put(
        `/notices/${id}`,
        noticeData
    );

    return data;
};

// ==========================================
// Delete Notice
// ==========================================
export const deleteNotice = async (
    id
) => {
    const { data } = await api.delete(
        `/notices/${id}`
    );

    return data;
};