import api from "./api";



// ==========================================
// Get All Assignments (Teacher)
// ==========================================
export const getAllAssignments = async (
    page = 1,
    filters = {},
    limit = 10
) => {

    const { data } =
        await api.get(
            "/assignments",
            {
                params:{
                    page,
                    limit,
                    ...filters,
                },
            }
        );


    return data;

};




// ==========================================
// Get Student Assignments
// ==========================================
export const getStudentAssignments = async () => {

    const { data } =
        await api.get(
            "/assignments/student"
        );


    return data;

};




// ==========================================
// Get Assignment By ID
// ==========================================
export const getAssignmentById = async (
    id
) => {

    const { data } =
        await api.get(
            `/assignments/${id}`
        );


    return data;

};




// ==========================================
// Create Assignment
// ==========================================
export const createAssignment = async (
    assignmentData
) => {

    const { data } =
        await api.post(
            "/assignments",
            assignmentData
        );


    return data;

};




// ==========================================
// Update Assignment
// ==========================================
export const updateAssignment = async (
    id,
    assignmentData
) => {

    const { data } =
        await api.put(
            `/assignments/${id}`,
            assignmentData
        );


    return data;

};




// ==========================================
// Delete Assignment
// ==========================================
export const deleteAssignment = async (
    id
) => {

    const { data } =
        await api.delete(
            `/assignments/${id}`
        );


    return data;

};