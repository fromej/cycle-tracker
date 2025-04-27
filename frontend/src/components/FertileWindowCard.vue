<template>
  <div class="dashboard-card bg-white p-6 flex flex-col justify-between">
    <div>
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-2">
          <component :is="statusIcon.icon" :class="['h-6 w-6', statusIcon.colorClass]" aria-hidden="true" />
          <h2 class="text-xl font-semibold text-gray-800" id="fertility-card-title">
            Fertile Window
          </h2>
        </div>
        <span
            class="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
            :class="statusBadgeClass"
        >
          {{ statusLabel }}
        </span>
      </div>
      <div class="mt-1 mb-4 text-gray-700 leading-relaxed">
        <p v-if="isTodayOvulation">
          Based on your data, today looks like your predicted <strong class="font-semibold text-primary">ovulation day</strong>.
        </p>
        <p v-else-if="isInFertileWindow">
          You're likely in your <strong class="font-semibold text-primary">fertile window</strong> right now.
        </p>
        <p v-else>
          Currently predicted to be <strong class="font-semibold text-gray-600">outside</strong> your fertile window.
        </p>
      </div>
    </div>

    <div class="mt-4 space-y-1 text-sm text-gray-500 border-t border-gray-100 pt-4">
      <p>
        <span class="font-medium text-gray-600">Predicted Fertile Days:</span>
        <span class="block sm:inline ml-1">{{ formatDate(fertileStart) }} - {{ formatDate(fertileEnd) }}</span>
      </p>
      <p>
        <span class="font-medium text-gray-600">Predicted Ovulation:</span>
        <span class="ml-1">{{ formatDate(ovulationDate) }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { format, parseISO, isValid } from 'date-fns';
import { SparklesIcon, SunIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  fertileStart: string | null;
  fertileEnd: string | null;
  ovulationDate: string | null;
  isTodayOvulation: boolean;
  isInFertileWindow: boolean;
}>();

// Improved Date Formatting with Validation
const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return 'N/A'; // Handle null/undefined
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) { // Check if parsing was successful
      console.warn(`Invalid date string received: ${dateStr}`);
      return 'Invalid Date';
    }
    // Format Example: Apr 27, 2025 (Adjust format string as needed)
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error(`Error parsing date: ${dateStr}`, error);
    return 'Error';
  }
};

// Status Logic for Labels, Icons, and Badges
const statusInfo = computed(() => {
  if (props.isTodayOvulation) {
    return {
      label: 'Ovulation Day',
      icon: SparklesIcon, // Or FireIcon, StarIcon
      iconColorClass: 'text-purple-600', // Use a distinct color for ovulation
      badgeClass: 'bg-purple-100 text-purple-700 ring-1 ring-inset ring-purple-200',
    };
  }
  if (props.isInFertileWindow) {
    return {
      label: 'Fertile Window',
      icon: SunIcon, // Or CalendarDaysIcon
      iconColorClass: 'text-primary', // Use primary theme color
      badgeClass: 'bg-primary-100 text-primary-700 ring-1 ring-inset ring-primary-200', // Assumes primary-100, primary-700, primary-200 exist
    };
  }
  return {
    label: 'Low Fertility', // Changed from "Not Fertile" for softer language
    icon: CheckCircleIcon, // Or ShieldCheckIcon
    iconColorClass: 'text-gray-500',
    badgeClass: 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200',
  };
});

const statusLabel = computed(() => statusInfo.value.label);
const statusIcon = computed(() => ({ icon: statusInfo.value.icon, colorClass: statusInfo.value.iconColorClass }));
const statusBadgeClass = computed(() => statusInfo.value.badgeClass);

</script>

<style scoped>
/* Ensure dashboard-card provides base styling */

/* Ensure your tailwind.config.js has primary-100, primary-700, primary-200 variants */
/* Example using custom properties if needed: */
/* .bg-primary-100 { background-color: color-mix(in srgb, var(--color-primary) 10%, white); } */
/* .text-primary-700 { color: color-mix(in srgb, var(--color-primary) 80%, black); } */
</style>