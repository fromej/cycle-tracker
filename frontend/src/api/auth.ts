// frontend/src/api/auth.ts
import apiClient from './index';
import { AxiosResponse } from 'axios';
import { Login, User, Token } from '@/types'; // Import types

export const loginUser = (credentials: Login): Promise<AxiosResponse<Token>> => {
    return apiClient.post('/auth/login', credentials);
};

export const registerUser = (userData: UserRegistration): Promise<AxiosResponse<User>> => {
    return apiClient.post('/auth/register', userData);
};