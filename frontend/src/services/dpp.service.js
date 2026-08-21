import api from "./api";

// ==========================================
// Upload DPP (Teacher)
// ==========================================
export const uploadDPP = async (dpp) => {
    const { data } = await api.post("/dpp", dpp);
    return data;
};

// ==========================================
// Get Student DPPs
// ==========================================
export const getStudentDPPs = async () => {
    const { data } = await api.get("/dpp/student");
    return data;
};

// ==========================================
// Get All DPPs (Teacher)
// ==========================================
export const getAllDPPs = async (params = {}) => {
    const { data } = await api.get("/dpp", {
        params,
    });
    return data;
};

// ==========================================
// Get DPP By ID
// ==========================================
export const getDPPById = async (id) => {
    const { data } = await api.get(`/dpp/${id}`);
    return data;
};

// ==========================================
// Update DPP (Teacher)
// ==========================================
export const updateDPP = async (id, dpp) => {
    const { data } = await api.put(`/dpp/${id}`, dpp);
    return data;
};

// ==========================================
// Delete DPP (Teacher)
// ==========================================
export const deleteDPP = async (id) => {
    const { data } = await api.delete(`/dpp/${id}`);
    return data;
};
