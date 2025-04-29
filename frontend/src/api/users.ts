import {AxiosResponse} from "axios";
import {PasswordChange, User} from "@/types.ts";
import apiClient from "@/api/index.ts";

const BASE_URL = '/users';

class UsersApi {
    static getOwnUser(): Promise<AxiosResponse<User>> {
        return apiClient.get(`${BASE_URL}/me`);
    }

    static changeOwnPassword(data: PasswordChange): Promise<AxiosResponse> {
        return apiClient.post(`${BASE_URL}/me/change-password`, data);
    }

    static deleteOwnUser(): Promise<AxiosResponse> {
        return apiClient.delete(`${BASE_URL}/me`);
    }
}
export default UsersApi;