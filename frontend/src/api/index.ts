// frontend/src/api/index.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios'; // Import types
import { useAuthStore } from '@/stores/auth';

// Create an Axios instance and type it
const apiClient: AxiosInstance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
            config.headers['Authorization'] = `Bearer ${authStore.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.logout();
        }
        return Promise.reject(error);
    }
);

export default apiClient;