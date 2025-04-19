// frontend/src/stores/periods.ts
import { defineStore } from 'pinia';
import { fetchPeriods, createPeriod, updatePeriod, deletePeriod, fetchPeriodStats, fetchCycleStats } from '@/api/periods';
import { PeriodsState, PeriodsGetters, PeriodsActions, Period, PeriodCreate, PeriodUpdate, PeriodStats, CycleStats } from '@/types'; // Import types

// Use generics to type the store
export const usePeriodsStore = defineStore<'periods', PeriodsState, PeriodsGetters, PeriodsActions>('periods', {
    state: (): PeriodsState => ({ // Type the state function return
        periods: [],
        periodStats: null,
        cycleStats: null,
        loading: false,
        error: null,
        pagination: {
            page: 1,
            per_page: 10,
            total: 0
        }
    }),
    getters: {
        // Add getters here if needed, type them
    } as PeriodsGetters, // Cast to PeriodsGetters

    actions: {
        async fetchPeriods(page: number = this.pagination.page, per_page: number = this.pagination.per_page): Promise<void> { // Type parameters and return
            this.loading = true;
            this.error = null;
            try {
                const response = await fetchPeriods(page, per_page);
                this.periods = response.data; // Assuming response.data is Period[]
                // Update pagination if API provides total count
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Failed to fetch periods';
                console.error('Fetch periods error:', error);
            } finally {
                this.loading = false;
            }
        },
        async createPeriod(startDate: string): Promise<void> { // Type parameter and return
            this.loading = true;
            this.error = null;
            try {
                const periodData: PeriodCreate = { start_date: startDate }; // Ensure data matches type
                const response = await createPeriod(periodData);
                this.periods.unshift(response.data);
                // Refetch stats
                await Promise.all([this.fetchPeriodStats(), this.fetchCycleStats()]);
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Failed to record period start';
                console.error('Create period error:', error);
            } finally {
                this.loading = false;
            }
        },
        async updatePeriod(periodId: number, endDate: string): Promise<void> { // Type parameters and return
            this.loading = true;
            this.error = null;
            try {
                const periodData: PeriodUpdate = { end_date: endDate }; // Ensure data matches type
                const response = await updatePeriod(periodId, periodData);
                const index = this.periods.findIndex(p => p.id === periodId);
                if (index !== -1) {
                    this.periods[index] = response.data;
                }
                // Refetch stats
                await Promise.all([this.fetchPeriodStats(), this.fetchCycleStats()]);
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Failed to record period end';
                console.error('Update period error:', error);
            } finally {
                this.loading = false;
            }
        },
        async deletePeriod(periodId: number): Promise<void> { // Type parameter and return
            this.loading = true;
            this.error = null;
            try {
                await deletePeriod(periodId);
                this.periods = this.periods.filter(p => p.id !== periodId);
                // Refetch stats
                await Promise.all([this.fetchPeriodStats(), this.fetchCycleStats()]);
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Failed to delete period';
                console.error('Delete period error:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchPeriodStats(): Promise<void> { // Type return
            this.loading = true; // Or a specific stats loading state
            this.error = null;
            try {
                const response = await fetchPeriodStats();
                this.periodStats = response.data; // Assuming response.data is PeriodStats
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Failed to fetch period stats';
                console.error('Fetch period stats error:', error);
            } finally {
                this.loading = false; // Or specific stats loading state
            }
        },
        async fetchCycleStats(): Promise<void> { // Type return
            this.loading = true; // Or a specific stats loading state
            this.error = null;
            try {
                const response = await fetchCycleStats();
                this.cycleStats = response.data; // Assuming response.data is CycleStats
            } catch (error: any) { // Type error
                this.error = error.response?.data?.message || 'Failed to fetch cycle stats';
                console.error('Fetch cycle stats error:', error);
            } finally {
                this.loading = false; // Or specific stats loading state
            }
        }
    } as PeriodsActions // Cast to PeriodsActions
});