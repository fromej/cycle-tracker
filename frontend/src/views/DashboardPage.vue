<template>
  <div class="dashboard container mx-auto px-4 py-8">
    <div v-if="reportsStore.loading" class="text-center text-gray-600">
      Loading data...
    </div>
    <div v-else-if="reportsStore.error" class="text-red-500 text-center">
      {{ reportsStore.error }}
    </div>
    <div v-else class="flex flex-col gap-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatusCard />
      <FertileWindowCard
          :fertile-start="reportsStore.cycleContext?.fertile_window?.start"
          :fertile-end="reportsStore.cycleContext?.fertile_window?.end"
          :ovulation-date="reportsStore.cycleContext?.ovulation_date"
          :is-today-ovulation="reportsStore.cycleContext?.is_today_ovulation"
          :is-in-fertile-window="reportsStore.cycleContext?.is_in_fertile_window"/>
      </div>
      <CycleProgressBar />
      <h2 class="text-2xl font-semibold text-text">Your Insights</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <StatsCard
            title="Average Period Duration"
            :value="reportsStore.periodStats?.average_duration"
            decimals="1"
            unit="days"
            description="Based on completed periods"
        />
        <StatsCard
            title="Average Cycle Length"
            :value="reportsStore.cycleContext?.cycle_length"
            unit="days"
            description="Start date to next start date"
        />
        <StatsCard
            title="Total Periods Logged"
            :value="reportsStore.periodStats?.count"
            unit=""
            description="Recorded periods"
        />
        <StatsCard
            title="Longest Period"
            :value="reportsStore.periodStats?.max_duration"
            unit=""
            description="Amount of days of the longest period"
        />
        <StatsCard
            title="Shortest Period"
            :value="reportsStore.periodStats?.min_duration"
            unit=""
            description="Amount of days of the shortest period"
        />
      </div>

      <h2 class="text-2xl font-semibold text-text">Record Periods</h2>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <PeriodForm />
      </div>


      <h2 class="text-2xl font-semibold text-text">Your Period History</h2>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <PeriodList/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReportsStore } from '@/stores/reports';
import StatsCard from '@/components/StatsCard.vue';
import PeriodForm from '@/components/PeriodForm.vue';
import PeriodList from '@/components/PeriodList.vue';
import StatusCard from "@/components/StatusCard.vue";
import CycleProgressBar from "@/components/CycleProgressBar.vue";
import {onMounted} from "vue";
import FertileWindowCard from "@/components/FertileWindowCard.vue";

const reportsStore = useReportsStore();

onMounted(async () => {
  reportsStore.fetchPeriodStats();
  reportsStore.fetchCycleContext();
})
</script>

<style scoped>
/* Dashboard specific styles */
</style>