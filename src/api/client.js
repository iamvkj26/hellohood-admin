import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

client.interceptors.request.use((config) => {
    const token = secureLocalStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default client;