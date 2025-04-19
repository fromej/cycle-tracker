<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Record a New Period</h3>
    <div class="flex items-end gap-4 mb-6">
      <div class="flex-grow">
        <label for="start_date" class="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
        <input
            type="date"
            id="start_date"
            v-model="newPeriodStartDate"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
          @click="handleCreatePeriod"
          :disabled="periodsStore.loading || !newPeriodStartDate"
          class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        Record Start
      </button>
    </div>

    <div v-if="currentOpenPeriod" class="border-t pt-6 mt-6">
      <h3 class="text-xl font-semibold mb-4">End Current Period</h3>
      <p class="text-gray-700 mb-4">Current period started on: {{ currentOpenPeriod.start_date }}</p>
      <div class="flex items-end gap-4">
        <div class="flex-grow">
          <label for="end_date" class="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
          <input
              type="date"
              id="end_date"
              v-model="currentPeriodEndDate"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
            @click="handleUpdatePeriod"
            :disabled="periodsStore.loading || !currentOpenPeriod || !currentPeriodEndDate"
            class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Record End
        </button>
      </div>
    </div>
    <div v-if="periodsStore.error" class="text-red-500 text-sm mt-4">{{ periodsStore.error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePeriodsStore } from '@/stores/periods';

const periodsStore = usePeriodsStore();

const newPeriodStartDate = ref('');
const currentPeriodEndDate = ref('');

// Find the most recent period that doesn't have an end_date
const currentOpenPeriod = computed(() => {
  // Sort periods by start date descending
  const sortedPeriods = [...periodsStore.periods].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
  return sortedPeriods.find(period => !period.end_date);
});


const handleCreatePeriod = async () => {
  if (newPeriodStartDate.value) {
    await periodsStore.createPeriod(newPeriodStartDate.value);
    // Clear the input only if successful
    if (!periodsStore.error) {
      newPeriodStartDate.value = '';
    }
  }
};

const handleUpdatePeriod = async () => {
  if (currentOpenPeriod.value && currentPeriodEndDate.value) {
    // Basic validation: end date should not be before start date
    if (new Date(currentPeriodEndDate.value) < new Date(currentOpenPeriod.value.start_date)) {
      periodsStore.error = 'End date cannot be before the start date.';
      return;
    }
    await periodsStore.updatePeriod(currentOpenPeriod.value.id, currentPeriodEndDate.value);
    // Clear the input only if successful
    if (!periodsStore.error) {
      currentPeriodEndDate.value = '';
    }
  }
};
</script>

<style scoped>
/* PeriodForm specific styles */
</style>