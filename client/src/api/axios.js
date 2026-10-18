
import axios from "axios";

const api = axios.create({
    baseURL: (
        import.meta.env.VITE_BASE_URL ||
        "https://mern-fullstack-s5hz-rombjhe6n-faruk-abdulloh.vercel.app"
    ).replace(/\/+$/, "") + "/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
