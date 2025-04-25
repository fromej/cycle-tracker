import { defineStore } from 'pinia';
import ReportApi from '@/api/reports';
import {ReportsState, ReportsActions} from '@/types';

export const useReportsStore = defineStore<'reports', ReportsState, {}, ReportsActions>('reports', {
    state: () => ({
        periodStats: {},
        cycleStats: null,
        cycleContext: {},
        predictedNextPeriod: null,
        ovulationWindow: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchPeriodStats() {
            this.loading = true;
            this.error = null;
            try {
                const response = await ReportApi.fetchPeriodStats();
                Object.assign(this.periodStats,response.data)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to fetch period stats';
                console.error('Fetch period stats error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchCycleStats() {
            this.loading = true;
            this.error = null;
            try {
                const response = await ReportApi.fetchCycleStats();
                this.cycleStats = response.data;
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to fetch cycle stats';
                console.error('Fetch cycle stats error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchPredictedNextPeriod() {
            this.loading = true;
            this.error = null;
            try {
                const response = await ReportApi.fetchPredictedNextPeriod();
                this.predictedNextPeriod = response.data;
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to predict next period';
                console.error('Fetch predicted period error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchOvulationWindow() {
            this.loading = true;
            this.error = null;
            try {
                const response = await ReportApi.fetchOvulationWindow();
                this.ovulationWindow = response.data;
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to calculate ovulation window';
                console.error('Fetch ovulation window error:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchCycleContext() {
            this.error = null;
            try {
                const response = await ReportApi.fetchCycleContext();
                Object.assign(this.cycleContext, response.data)
                return this.cycleContext
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to fetch cycle context';
                console.error('Fetch cycle context error:', error);
            }
        }
    },
});
