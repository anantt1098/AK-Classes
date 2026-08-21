import axios from "axios";

const getBaseURL = () => {
    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
    ) {
        return import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000/api";
    }
    return (
        import.meta.env.VITE_API_URL || "http://localhost:3000/api"
    );
};

const api = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;