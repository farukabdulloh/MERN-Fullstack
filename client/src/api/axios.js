import axios from "axios";

const api = axios.create({
    baseURL: (import.meta.env.VITE_BASE_URL || "https://mern-fullstack-jbbs-dc9arnz1j-faruk-abdulloh.vercel.app") + "/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;