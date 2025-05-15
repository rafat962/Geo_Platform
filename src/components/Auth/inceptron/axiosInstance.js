// src/api/axiosInstance.js
import axios from "axios";
import { backendUrl } from "../../../environment/devolpmentApi";

const axiosInstance = axios.create({
    baseURL: backendUrl, // change to your backend URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
