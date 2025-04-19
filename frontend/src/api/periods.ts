// frontend/src/api/periods.ts
import apiClient from './index';
import { AxiosResponse } from 'axios';
import { Period, PeriodCreate, PeriodUpdate, PeriodStats, CycleStats } from '@/types'; // Import types

export const fetchPeriods = (page: number = 1, per_page: number = 10): Promise<AxiosResponse<Period[]>> => {
    return apiClient.get('/periods', {
        params: { page, per_page }
    });
};

export const createPeriod = (periodData: PeriodCreate): Promise<AxiosResponse<Period>> => {
    return apiClient.post('/periods', periodData);
};

export const updatePeriod = (periodId: number, periodData: PeriodUpdate): Promise<AxiosResponse<Period>> => {
    return apiClient.put(`/periods/${periodId}`, periodData);
};

export const deletePeriod = (periodId: number): Promise<AxiosResponse<void>> => {
    return apiClient.delete(`/periods/${periodId}`);
};

export const fetchPeriodStats = (): Promise<AxiosResponse<PeriodStats>> => {
    return apiClient.get('/reports/period-stats');
};

export const fetchCycleStats = (): Promise<AxiosResponse<CycleStats>> => {
    return apiClient.get('/reports/cycle-stats');
};