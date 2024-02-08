import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        return window.location.href = "/login";
    } else {
        return Promise.reject(error);
    }
})

export default api;
