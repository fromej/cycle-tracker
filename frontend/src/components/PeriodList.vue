<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Recorded Periods</h3>
    <ul class="space-y-4">
      <li
          v-for="period in periods"
          :key="period.id"
          class="bg-background p-4 rounded-lg shadow-sm border border-accent flex justify-between items-center"
      >
        <div>
          <p class="font-semibold text-text">
            {{ period.start_date }} - {{ period.end_date || 'Ongoing' }}
          </p>
          <p v-if="period.duration !== null" class="text-sm text-gray-600">
            Duration: {{ period.duration }} days
          </p>
        </div>
        <div>
          <button
              @click="handleDelete(period.id)"
              class="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <div v-if="!periods.length && !periodsStore.loading" class="text-center text-gray-500">No periods recorded yet.</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { usePeriodsStore } from '@/stores/periods';

const periodsStore = usePeriodsStore();

const props = defineProps({
  periods: {
    type: Array,
    required: true
  }
});

const handleDelete = async (periodId) => {
  if (confirm('Are you sure you want to delete this period?')) {
    await periodsStore.deletePeriod(periodId);
  }
};
</script>

<style scoped>
/* PeriodList specific styles */
</style>