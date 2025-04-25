import apiClient from './index';
import { AxiosResponse } from 'axios';
import { Period, PeriodCreate, PeriodUpdate } from '@/types';

const BASE_URL = '/periods';

class PeriodApi {
    static fetchPeriods(page = 1, per_page = 10): Promise<AxiosResponse<Period[]>> {
        return apiClient.get(BASE_URL, { params: { page, per_page } });
    }

    static createPeriod(periodData: PeriodCreate): Promise<AxiosResponse<Period>> {
        return apiClient.post(BASE_URL, periodData);
    }

    static getPeriod(periodId: number): Promise<AxiosResponse<Period>> {
        return apiClient.get(`${BASE_URL}/${periodId}`);
    }

    static getActivePeriod(): Promise<AxiosResponse<Period>> {
        return apiClient.get(`${BASE_URL}/active`)
    }

    static updatePeriod(periodId: number, periodData: PeriodUpdate): Promise<AxiosResponse<Period>> {
        return apiClient.put(`${BASE_URL}/${periodId}`, periodData);
    }

    static deletePeriod(periodId: number): Promise<AxiosResponse<void>> {
        return apiClient.delete(`${BASE_URL}/${periodId}`);
    }
}

export default PeriodApi;
