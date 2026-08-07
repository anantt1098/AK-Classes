import api from "./api";


// ==========================================
// Upload Note (Teacher)
// ==========================================
export const uploadNote = async (note) => {

    const { data } = await api.post(
        "/notes",
        note
    );

    return data;

};



// ==========================================
// Get Student Notes
// ==========================================
export const getStudentNotes = async () => {

    const { data } = await api.get(
        "/notes/student"
    );

    return data;

};



// ==========================================
// Get All Notes (Teacher)
// ==========================================
export const getAllNotes = async (
    params = {}
) => {

    const { data } = await api.get(
        "/notes",
        {
            params,
        }
    );

    return data;

};



// ==========================================
// Get Note By ID
// ==========================================
export const getNoteById = async (id) => {

    const { data } = await api.get(
        `/notes/${id}`
    );

    return data;

};



// ==========================================
// Update Note (Teacher)
// ==========================================
export const updateNote = async (
    id,
    note
) => {

    const { data } = await api.put(
        `/notes/${id}`,
        note
    );

    return data;

};



// ==========================================
// Delete Note (Teacher)
// ==========================================
export const deleteNote = async (id) => {

    const { data } = await api.delete(
        `/notes/${id}`
    );

    return data;

};