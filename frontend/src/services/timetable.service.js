import api from "./api";

// ==========================================
// Get Student Timetables
// ==========================================
export const getStudentTimetables = async () => {
    const { data } = await api.get("/timetables/student");
    return data;
};

// ==========================================
// Get All Timetables
// ==========================================
export const getAllTimetables = async (
    page = 1,
    filters = {},
    limit = 10
) => {
    const { data } = await api.get(
        "/timetables",
        {
            params: {
                page,
                limit,
                ...filters,
            },
        }
    );

    return data;
};

// ==========================================
// Get Timetable By ID
// ==========================================
export const getTimetableById = async (
    id
) => {
    const { data } = await api.get(
        `/timetables/${id}`
    );

    return data;
};

// ==========================================
// Create Timetable
// ==========================================
export const createTimetable = async (
    timetableData
) => {
    const { data } = await api.post(
        "/timetables",
        timetableData
    );

    return data;
};

// ==========================================
// Update Timetable
// ==========================================
export const updateTimetable = async (
    id,
    timetableData
) => {
    const { data } = await api.put(
        `/timetables/${id}`,
        timetableData
    );

    return data;
};

// ==========================================
// Delete Timetable
// ==========================================
export const deleteTimetable = async (
    id
) => {
    const { data } = await api.delete(
        `/timetables/${id}`
    );

    return data;
};