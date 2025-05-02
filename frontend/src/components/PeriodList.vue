<template>
  <div>
    <ul class="space-y-4">
      <li
          v-for="period in periodsStore.periods"
          :key="period.id"
          class="bg-background p-4 rounded-lg shadow-sm border border-accent flex justify-between items-center"
      >
        <div>
          <p class="font-semibold text-text">
            {{ period.start_date }} - {{ period.end_date || $t('periodList.ongoing') }}
          </p>
          <p v-if="period.duration !== null" class="text-sm text-gray-600">
            {{ $t('periodList.duration') }} {{ $t('common.dayN', period.duration) }}
          </p>
        </div>
        <div>
          <button
              @click="handleDelete(period.id)"
              class="text-red-500 hover:text-red-700 text-sm"
          >
            {{ $t('periodList.delete') }}
          </button>
        </div>
      </li>
    </ul>
    <div v-if="!periodsStore.periods.length && !periodsStore.loading" class="text-center text-gray-500">{{ $t('periodList.noPeriods') }}</div>
  </div>
</template>

<script setup>
import { onMounted} from 'vue';
import { usePeriodsStore } from '@/stores/periods';
import {useReportsStore} from "@/stores/reports";

const periodsStore  = usePeriodsStore();
const reportStore = useReportsStore();

const handleDelete = async (periodId) => {
  await periodsStore.deletePeriod(periodId);
  await reportStore.fetchCycleContext();
};

onMounted(async () => {
  await periodsStore.fetchPeriods()
})
</script>

<style scoped>
/* PeriodList specific styles */
</style>
