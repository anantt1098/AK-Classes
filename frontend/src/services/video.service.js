import api from "./api";


// ==========================================
// Upload Video (Teacher)
// ==========================================
export const uploadVideo = async (video) => {

    const { data } = await api.post(
        "/videos",
        video
    );

    return data;

};



// ==========================================
// Get Student Videos
// ==========================================
export const getStudentVideos = async () => {

    const { data } = await api.get(
        "/videos/student"
    );

    return data;

};



// ==========================================
// Get All Videos
// ==========================================
export const getAllVideos = async (
    params = {}
) => {

    const { data } = await api.get(
        "/videos",
        {
            params,
        }
    );

    return data;

};



// ==========================================
// Get Video By ID
// ==========================================
export const getVideoById = async (id) => {

    const { data } = await api.get(
        `/videos/${id}`
    );

    return data;

};



// ==========================================
// Update Video (Teacher)
// ==========================================
export const updateVideo = async (
    id,
    video
) => {

    const { data } = await api.put(
        `/videos/${id}`,
        video
    );

    return data;

};



// ==========================================
// Delete Video (Teacher)
// ==========================================
export const deleteVideo = async (id) => {

    const { data } = await api.delete(
        `/videos/${id}`
    );

    return data;

};