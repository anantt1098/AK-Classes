import api from "./api";



// ==========================================
// Teacher Dashboard
// ==========================================

export const getTeacherDashboard =
async () => {

    const { data } = await api.get(
        "/dashboard/teacher"
    );


    return data;

};








// ==========================================
// Student Dashboard
// ==========================================

export const getStudentDashboard =
async () => {

    const { data } = await api.get(
        "/dashboard/student"
    );


    return data;

};