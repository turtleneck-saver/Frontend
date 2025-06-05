import axios from 'axios';
const apiUrl="http://localhost:8000/";

const api=axios.create({baseURL: apiUrl });

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;