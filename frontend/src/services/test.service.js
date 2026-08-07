import api from "./api";


// ==========================================
// Get All Tests (Teacher)
// ==========================================
export const getAllTests = async (
    page = 1,
    search = "",
    filters = {}
) => {

    const { data } = await api.get(
        "/tests",
        {
            params: {
                page,
                limit: 10,
                search,
                ...filters,
            },
        }
    );


    return data;

};





// ==========================================
// Get Student Tests
// Based On Class + Stream + Subjects
// ==========================================
export const getStudentTests = async () => {

    const { data } = await api.get(
        "/tests/student/my-tests"
    );


    return data;

};





// ==========================================
// Get Test By ID
// ==========================================
export const getTestById = async (id) => {

    const { data } = await api.get(
        `/tests/${id}`
    );


    return data;

};





// ==========================================
// Upload Test
// ==========================================
export const uploadTest = async (
    testData
) => {

    const { data } = await api.post(
        "/tests",
        testData
    );


    return data;

};





// ==========================================
// Update Test
// ==========================================
export const updateTest = async (
    id,
    testData
) => {

    const { data } = await api.put(
        `/tests/${id}`,
        testData
    );


    return data;

};





// ==========================================
// Delete Test
// ==========================================
export const deleteTest = async (
    id
) => {

    const { data } = await api.delete(
        `/tests/${id}`
    );


    return data;

};