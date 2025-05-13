import apiClient from './index';
import { AxiosResponse } from 'axios';
import { Login, User, TokenPair, AccessToken, UserRegistration } from '@/types';

const BASE_URL = '/auth';

class AuthApi {
    static loginUser(credentials: Login): Promise<AxiosResponse<TokenPair>> {
        return apiClient.post(`${BASE_URL}/login`, credentials);
    }

    static registerUser(userData: UserRegistration): Promise<AxiosResponse<User>> {
        return apiClient.post(`${BASE_URL}/register`, userData);
    }

    static refreshToken(): Promise<AxiosResponse<AccessToken>> {
        return apiClient.post(`${BASE_URL}/refresh`);
    }
}

export default AuthApi;
