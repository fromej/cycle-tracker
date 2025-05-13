import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const apiClient: AxiosInstance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json'
    }
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void; config: InternalAxiosRequestConfig }> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.config.headers['Authorization'] = `Bearer ${token}`;
            apiClient(prom.config).then(prom.resolve).catch(prom.reject);
        }
    });
    failedQueue = [];
};

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();

        if (config.url?.endsWith('/auth/refresh')) {
            if (authStore.refreshToken) {
                config.headers['Authorization'] = `Bearer ${authStore.refreshToken}`;
            } else {
                // This should ideally not happen if logout is handled correctly
                console.error('Refresh token is missing for /auth/refresh call');
                // Cancel the request or let it proceed and fail
                return Promise.reject(new Error('Refresh token missing'));
            }
        } else if (authStore.token) { // For all other requests, use the access token
            config.headers['Authorization'] = `Bearer ${authStore.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const authStore = useAuthStore();

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.endsWith('/auth/refresh')) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await authStore.refreshTokenAction();
                if (newAccessToken) {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }
                    processQueue(null, newAccessToken);
                    return apiClient(originalRequest);
                } else {
                    processQueue(error, null);
                    router.push({ name: 'login' });
                    return Promise.reject(error);
                }
            } catch (refreshError: any) {
                processQueue(refreshError as AxiosError, null);
                authStore.logout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        } else if (error.response?.status === 401 && (originalRequest._retry || originalRequest.url?.endsWith('/auth/refresh'))) {
            console.error("Refresh token failed or already retried with 401. Logging out.");
            authStore.logout();
        }

        return Promise.reject(error);
    }
);

export default apiClient;