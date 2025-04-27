<template>
  <div class="dashboard container mx-auto space-y-8">

    <div v-if="reportsStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Loading your dashboard...</p>
    </div>

    <div v-else-if="reportsStore.error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-sm" role="alert">
      <p class="font-bold">Oops!</p>
      <p>{{ reportsStore.error }} Please try refreshing.</p>
    </div>

    <div v-else class="px-4 py-8 flex flex-col gap-4">

      <div v-if="reportsStore.periodStats?.count === 0" class="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-xl shadow-lg text-center">
        <h2 class="text-3xl font-semibold mb-3 font-serif">Welcome! Let's Get Started</h2>
        <p class="text-lg text-indigo-50 mb-6 max-w-xl mx-auto">Start your first period to unlock personalized cycle insights, predictions, and more.</p>
        <svg class="h-10 w-10 mx-auto text-white opacity-80 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <button @click="periodStore.startPeriodToday" class="btn btn-white">
          Start First Period
        </button>
      </div>

      <section v-if="reportsStore.periodStats?.count > 0" aria-labelledby="current-cycle-heading">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatusCard/>
          <FertileWindowCard
              :fertile-start="reportsStore.cycleContext?.fertile_window?.start"
              :fertile-end="reportsStore.cycleContext?.fertile_window?.end"
              :ovulation-date="reportsStore.cycleContext?.ovulation_date"
              :is-today-ovulation="reportsStore.cycleContext?.is_today_ovulation"
              :is-in-fertile-window="reportsStore.cycleContext?.is_in_fertile_window"/>
        </div>
          <CycleProgressBar />
      </section>

      <section v-if="reportsStore.periodStats?.count > 0" aria-labelledby="insights-heading">
        <h2 id="insights-heading" class="text-2xl font-semibold text-gray-800 mb-5 font-serif">Your Insights</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatsCard
              class="dashboard-card stats-card"
              title="Average Period Duration"
              :value="reportsStore.periodStats?.average_duration"
              decimals="1" unit="days"
              description="Based on completed periods" />
          <StatsCard
              class="dashboard-card stats-card"
              title="Average Cycle Length"
              :value="reportsStore.cycleContext?.cycle_length"
              unit="days"
              description="Start date to next start date" />
          <StatsCard
              class="dashboard-card stats-card"
              title="Total Periods Logged"
              :value="reportsStore.periodStats?.count"
              unit=""
              description="Recorded periods" />
          <StatsCard
              class="dashboard-card stats-card"
              title="Longest Period"
              :value="reportsStore.periodStats?.max_duration"
              unit="days"
          description="Longest recorded period" />
          <StatsCard
              class="dashboard-card stats-card"
              title="Shortest Period"
              :value="reportsStore.periodStats?.min_duration"
              unit="days"
          description="Shortest recorded period" />
        </div>
      </section>

      <section id="record-period-section" class="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-labelledby="log-history-heading">
        <div>
          <h2 id="log-history-heading" class="text-2xl font-semibold text-gray-800 mb-5 font-serif">Record Periods</h2>
          <div class="dashboard-card bg-white p-6">
            <PeriodForm />
          </div>
        </div>
        <div v-if="reportsStore.periodStats?.count > 0">
          <h2 class="text-2xl font-semibold text-gray-800 mb-5 font-serif">Your Period History</h2>
          <div class="dashboard-card bg-white p-6">
            <PeriodList/>
          </div>
        </div>
      </section>

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
import {usePeriodsStore} from "@/stores/periods";

const reportsStore = useReportsStore();
const periodStore = usePeriodsStore();

onMounted(async () => {
  // Fetch data - assuming fetch handles setting loading/error states
  reportsStore.fetchPeriodStats();
  reportsStore.fetchCycleContext();
})
</script>

<style scoped>
</style>