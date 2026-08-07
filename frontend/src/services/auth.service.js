import api from "./api";


// ==========================================
// Login
// ==========================================

export const loginUser = async ({
    role,
    ...data
}) => {

    const endpoint =
        role === "teacher"
            ? "/auth/teacher/login"
            : "/auth/student/login";


    const response =
        await api.post(
            endpoint,
            data
        );


    return response.data;

};




// ==========================================
// Register
// ==========================================

export const registerUser = async ({
    role,
    ...data
}) => {


    const endpoint =
        role === "teacher"
            ? "/auth/teacher/register"
            : "/auth/student/register";



    const response =
        await api.post(
            endpoint,
            data
        );


    return response.data;

};




// ==========================================
// Logout
// ==========================================

export const logoutUser = async () => {


    const response =
        await api.post(
            "/auth/logout"
        );


    return response.data;

};




// ==========================================
// Get Current User
// ==========================================

export const getCurrentUser = async () => {


    const response =
        await api.get(
            "/auth/me"
        );


    return response.data;

};