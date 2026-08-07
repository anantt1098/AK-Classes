import api from "./api";

// ==========================================
// Create Live Class (Teacher)
// ==========================================
export const createLiveClass = async (liveClassData) => {
    const { data } = await api.post("/live-classes", liveClassData);
    return data;
};

// ==========================================
// Get All Live Classes (Teacher)
// ==========================================
export const getAllLiveClasses = async (params = {}) => {
    const { data } = await api.get("/live-classes", { params });
    return data;
};

// ==========================================
// Get Student Live Classes (Student)
// ==========================================
export const getStudentLiveClasses = async () => {
    const { data } = await api.get("/live-classes/student");
    return data;
};

// ==========================================
// Delete Live Class (Teacher)
// ==========================================
export const deleteLiveClass = async (id) => {
    const { data } = await api.delete(`/live-classes/${id}`);
    return data;
};
