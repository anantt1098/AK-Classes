import api from "./api";



// ==========================================
// Get Students For Attendance (Teacher)
// ==========================================
export const getStudentsForAttendance = async (
    studentClass,
    stream = ""
) => {

    const { data } = await api.get(
        "/attendance/students",
        {
            params:{
                studentClass,
                stream,
            },
        }
    );

    return data;

};






// ==========================================
// Create Attendance (Teacher)
// ==========================================
export const createAttendance = async (
    attendanceData
) => {

    const { data } = await api.post(
        "/attendance",
        attendanceData
    );

    return data;

};


// Alias
export const markAttendance =
    createAttendance;







// ==========================================
// Get All Attendance (Teacher)
// ==========================================
export const getAllAttendance = async (
    filters = {}
) => {

    const { data } = await api.get(
        "/attendance",
        {
            params:filters,
        }
    );

    return data;

};







// ==========================================
// Get Attendance By ID
// ==========================================
export const getAttendanceById = async (
    id
) => {

    const { data } = await api.get(
        `/attendance/${id}`
    );

    return data;

};








// ==========================================
// Update Attendance
// ==========================================
export const updateAttendance = async (
    id,
    attendanceData
) => {

    const { data } = await api.put(
        `/attendance/${id}`,
        attendanceData
    );

    return data;

};








// ==========================================
// Delete Attendance
// ==========================================
export const deleteAttendance = async (
    id
) => {

    const { data } = await api.delete(
        `/attendance/${id}`
    );

    return data;

};








// ==========================================
// Student My Attendance
// ==========================================
export const getMyAttendance = async () => {

    const { data } = await api.get(
        "/attendance/me"
    );

    return data;

};








// ==========================================
// Teacher Attendance Analytics
// ==========================================
export const getAttendanceAnalytics = async () => {

    const { data } = await api.get(
        "/attendance/analytics"
    );

    return data;

};








// ==========================================
// Attendance By Date
// ==========================================
export const getAttendanceByDate = async (
    date
) => {

    const { data } = await api.get(
        "/attendance",
        {
            params:{
                date,
            },
        }
    );

    return data;

};








// ==========================================
// Attendance By Class
// ==========================================
export const getAttendanceByClass = async (
    studentClass,
    stream = ""
) => {

    const { data } = await api.get(
        "/attendance",
        {
            params:{
                studentClass,
                stream,
            },
        }
    );

    return data;

};