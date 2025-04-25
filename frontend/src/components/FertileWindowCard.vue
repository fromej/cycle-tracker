<template>
  <div
      class="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-rose-400 to-pink-500 text-white transition hover:shadow-xl"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold">Fertility Insights</h2>
      <div
          class="text-xs font-semibold px-3 py-1 rounded-full"
          :class="{
          'bg-white text-rose-500': isTodayOvulation,
          'bg-white/20': !isTodayOvulation
        }"
      >
        {{ statusLabel }}
      </div>
    </div>

    <div class="text-lg">
      <p v-if="isTodayOvulation">
        <span class="text-white font-semibold">Today</span> is your predicted
        <span class="underline font-semibold">ovulation day</span>.
      </p>
      <p v-else-if="isInFertileWindow">
        You are currently in your <span class="font-semibold underline">fertile window</span>.
      </p>
      <p v-else>
        You are <span class="font-semibold">outside</span> your fertile window.
      </p>
    </div>

    <div class="mt-4 space-y-2 text-sm opacity-90">
      <p>
        <span class="font-medium">Fertile window:</span>
        {{ formatDate(fertileStart) }} to {{ formatDate(fertileEnd) }}
      </p>
      <p>
        <span class="font-medium">Ovulation date:</span> {{ formatDate(ovulationDate) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { format, parseISO } from 'date-fns';

const props = defineProps<{
  fertileStart: string | null;
  fertileEnd: string | null;
  ovulationDate: string | null;
  isTodayOvulation: boolean;
  isInFertileWindow: boolean;
}>();

const formatDate = (dateStr: string | null) => {
  return dateStr ? format(parseISO(dateStr), 'MMM d, yyyy') : '–';
};

const statusLabel = computed(() => {
  if (props.isTodayOvulation) return 'Ovulation Day';
  if (props.isInFertileWindow) return 'Fertile Window';
  return 'Not Fertile';
});
</script>
