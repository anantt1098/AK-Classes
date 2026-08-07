import api from "./api";


// ==========================================
// Get All Students
// ==========================================
export const getAllStudents = async (
    page = 1,
    search = "",
    limit = 10
) => {

    const { data } = await api.get(
        "/students",
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
// Get Student By ID
// ==========================================
export const getStudentById = async (id) => {

    const { data } = await api.get(
        `/students/${id}`
    );

    return data;

};


// ==========================================
// Create Student
// ==========================================
export const createStudent = async (student) => {

    const { data } = await api.post(
        "/students",
        student
    );

    return data;

};


// ==========================================
// Update Student
// ==========================================
export const updateStudent = async (
    id,
    student
) => {

    const { data } = await api.put(
        `/students/${id}`,
        student
    );

    return data;

};


// ==========================================
// Delete Student
// ==========================================
export const deleteStudent = async (id) => {

    const { data } = await api.delete(
        `/students/${id}`
    );

    return data;

};


// ==========================================
// Get Logged-in Student Profile
// ==========================================
export const getMyProfile = async () => {

    const { data } = await api.get(
        "/students/profile/me"
    );

    return data;

};


// ==========================================
// Update Logged-in Student Profile
// ==========================================
export const updateMyProfile = async (
    student
) => {

    const { data } = await api.put(
        "/students/profile/me",
        student
    );

    return data;

};


// ==========================================
// Toggle Student Status
// ==========================================
// Since backend doesn't have PATCH route,
// this updates student using PUT.
export const toggleStudentStatus = async (
    id,
    isActive
) => {

    const { data } = await api.put(
        `/students/${id}`,
        {
            isActive,
        }
    );

    return data;

};


// ==========================================
// Get Student Dashboard Data
// ==========================================
export const getStudentDashboard = async () => {

    const { data } = await api.get(
        "/students/dashboard"
    );

    return data;

};
// ==========================================
// Get Student Courses
// ==========================================
export const getStudentCourses = async () => {

    const { data } = await api.get(
        "/courses"
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