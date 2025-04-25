import apiClient from './index';
import { AxiosResponse } from 'axios';
import { Login, User, Token, UserRegistration } from '@/types';

const BASE_URL = '/auth';

class AuthApi {
    static loginUser(credentials: Login): Promise<AxiosResponse<Token>> {
        return apiClient.post(`${BASE_URL}/login`, credentials);
    }

    static registerUser(userData: UserRegistration): Promise<AxiosResponse<User>> {
        return apiClient.post(`${BASE_URL}/register`, userData);
    }
}

export default AuthApi;
