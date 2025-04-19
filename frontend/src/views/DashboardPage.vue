<template>
  <div class="dashboard">
    <h1 class="text-3xl font-bold text-primary mb-6">Your Dashboard</h1>

    <div v-if="periodsStore.loading" class="text-center text-gray-600">Loading data...</div>
    <div v-else-if="periodsStore.error" class="text-red-500 text-center">{{ periodsStore.error }}</div>
    <div v-else>
      <h2 class="text-2xl font-semibold text-text mb-4">Your Insights</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
            title="Average Period Duration"
            :value="periodsStore.periodStats?.average_duration"
            unit="days"
            description="Based on completed periods"
        />
        <StatsCard
            title="Average Cycle Length"
            :value="periodsStore.cycleStats?.average_length"
            unit="days"
            description="Start date to next start date"
        />
        <StatsCard
            title="Total Periods Logged"
            :value="periodsStore.periodStats?.count"
            unit=""
            description="Recorded periods"
        />
      </div>

      <h2 class="text-2xl font-semibold text-text mb-4">Record Periods</h2>
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <PeriodForm />
      </div>


      <h2 class="text-2xl font-semibold text-text mb-4">Your Period History</h2>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <PeriodList :periods="periodsStore.periods" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePeriodsStore } from '@/stores/periods';
import StatsCard from '@/components/StatsCard.vue';
import PeriodForm from '@/components/PeriodForm.vue';
import PeriodList from '@/components/PeriodList.vue';
// Import chart components if using them, e.g.:
// import CycleChart from '@/components/CycleChart.vue';

const periodsStore = usePeriodsStore();

onMounted(() => {
  // Fetch data when the component is mounted
  periodsStore.fetchPeriods();
  periodsStore.fetchPeriodStats();
  periodsStore.fetchCycleStats();
});
</script>

<style scoped>
/* Dashboard specific styles */
</style>