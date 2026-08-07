import api from "./api";

// ==========================================
// Get All Fee Records (Teacher)
// ==========================================
export const getAllFees = async (
    page = 1,
    search = "",
    limit = 10
) => {
    const { data } = await api.get(
        "/fees",
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
// Get Fee By ID (Teacher)
// ==========================================
export const getFeeById = async (id) => {
    const { data } = await api.get(
        `/fees/${id}`
    );

    return data;
};

// ==========================================
// Get Fee By Student (Teacher)
// ==========================================
export const getStudentFee = async (
    studentId
) => {
    const { data } = await api.get(
        `/fees/student/${studentId}`
    );

    return data;
};

// ==========================================
// Create Fee Record (Teacher)
// ==========================================
export const createFee = async (
    feeData
) => {
    const { data } = await api.post(
        "/fees",
        feeData
    );

    return data;
};

// ==========================================
// Update Fee Record (Teacher)
// ==========================================
export const updateFee = async (
    id,
    feeData
) => {
    const { data } = await api.put(
        `/fees/${id}`,
        feeData
    );

    return data;
};

// ==========================================
// Delete Fee Record (Teacher)
// ==========================================
export const deleteFee = async (id) => {
    const { data } = await api.delete(
        `/fees/${id}`
    );

    return data;
};

// ==========================================
// Get Logged-in Student Fee
// ==========================================
export const getMyFee = async () => {
    const { data } = await api.get(
        "/fees/me"
    );

    return data;
};