import api from "./api";


// Get all teachers

export const getAllTeachers = async (
    page = 1,
    search = "",
    limit = 1000
) => {

    const res = await api.get(
        "/students/teachers",
        {
            params: {
                page,
                search,
                limit,
            },
        }
    );

    return res.data;

};