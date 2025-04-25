<template>
  <div v-if="ovulation" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
    <h3 class="text-2xl font-semibold text-primary mb-6">Your Ovulation & Fertility Window</h3>

    <!-- Linear Bar for Fertility Window -->
    <div class="relative mb-6 w-full h-12">
      <!-- Fertility Window (gradient bar) -->
      <div class="absolute inset-0 bg-gradient-to-r from-pink-300 via-pink-500 to-transparent rounded-lg">
      </div>

      <!-- Markers for Start, Ovulation, and End -->
      <div class="absolute inset-0 flex justify-between items-center px-3">
        <div class="w-6 h-6 rounded-full bg-primary flex justify-center items-center text-white text-xs font-bold">
          S
        </div> <!-- Start Marker -->

        <div class="w-6 h-6 rounded-full bg-secondary flex justify-center items-center text-white text-xs font-bold">
          O
        </div> <!-- Ovulation Marker -->

        <div class="w-6 h-6 rounded-full bg-primary flex justify-center items-center text-white text-xs font-bold">
          E
        </div> <!-- End Marker -->
      </div>
    </div>

    <!-- Cycle and Ovulation Date Information -->
    <div class="text-center mb-4">
      <p class="text-lg text-text-primary">
        <strong>Ovulation Date:</strong> {{ formatDate(ovulation.ovulation_date) }}
      </p>
      <p class="text-lg text-text-primary">
        <strong>Fertile Window:</strong> {{ formatDate(ovulation.fertile_window_start) }} -
        {{ formatDate(ovulation.fertile_window_end) }}
      </p>
    </div>

    <!-- Start Period Button -->
    <button @click="startPeriodToday" class="bg-primary text-white p-2 rounded-lg w-full mt-4 hover:bg-pink-700 transition-all">
      Start Period Today
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useReportsStore } from '@/stores/reports';
import { format } from 'date-fns';

const reportsStore = useReportsStore();
const ovulation = computed(() => reportsStore.ovulationWindow);

// Format the date to a human-readable string
const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return 'Unknown';
  return format(new Date(dateStr), 'PPP');
};

// Start the period by calling the API to record it on the current day
const startPeriodToday = () => {
  const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  reportsStore.createPeriod(today); // Call the action to create the period
};
</script>

<style scoped>
/* Custom Styles for Ovulation Card */
@import "tailwindcss";

.bg-primary {
  background-color: var(--color-primary); /* Use primary color */
}

.bg-secondary {
  background-color: var(--color-secondary); /* Use secondary color */
}

.text-primary {
  color: var(--color-primary); /* Primary text color */
}

.text-text-primary {
  color: var(--color-text-primary); /* Regular text color */
}

.bg-primary {
  background-color: var(--color-primary);
}

button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: var(--color-secondary);
}
</style>
