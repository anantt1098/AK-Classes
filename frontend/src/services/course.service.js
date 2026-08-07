import api from "./api";


// ==========================================
// Upload Course (Teacher)
// ==========================================
export const uploadCourse = async (course) => {

    const { data } = await api.post(
        "/courses",
        course
    );

    return data;

};



// ==========================================
// Get Student Courses
// ==========================================
export const getStudentCourses = async () => {

    const { data } = await api.get(
        "/courses/student"
    );

    return data;

};



// ==========================================
// Get All Courses (Teacher)
// ==========================================
export const getAllCourses = async (
    params = {}
) => {

    const { data } = await api.get(
        "/courses",
        {
            params,
        }
    );

    return data;

};



// ==========================================
// Get Course By ID
// ==========================================
export const getCourseById = async (id) => {

    const { data } = await api.get(
        `/courses/${id}`
    );

    return data;

};



// ==========================================
// Update Course (Teacher)
// ==========================================
export const updateCourse = async (
    id,
    course
) => {

    const { data } = await api.put(
        `/courses/${id}`,
        course
    );

    return data;

};



// ==========================================
// Delete Course (Teacher)
// ==========================================
export const deleteCourse = async (id) => {

    const { data } = await api.delete(
        `/courses/${id}`
    );

    return data;

};