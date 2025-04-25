<script setup lang="ts">
import { useReportsStore } from '@/stores/reports';

const store = useReportsStore();
</script>

<template>
  <div v-if="!store.cycleContext">
    <div class="w-full p-4 rounded-2xl bg-surface shadow-md space-y-2 animate-pulse">
      <div class="text-sm text-text-secondary">Cycle Progress</div>

      <div class="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
        <div class="h-full bg-gray-400 rounded-full w-1/3"></div>
        <div
            class="absolute top-0 h-4 w-[2px] bg-gray-400 left-1/2 transform -translate-x-1/2"
            title="Ovulation placeholder"
        />
      </div>

      <div class="flex justify-between text-xs text-text-secondary">
        <div class="h-3 bg-gray-300 rounded w-1/6"></div>
        <div class="h-3 bg-gray-300 rounded w-1/4"></div>
        <div class="h-3 bg-gray-300 rounded w-1/6"></div>
      </div>
    </div>
  </div>
  <div v-else class="w-full p-4 rounded-2xl bg-surface shadow-md space-y-2">
    <div class="text-sm text-text-secondary">Current cycle: day {{store.cycleContext?.cycle_day}}</div>
    <div class="relative w-full h-4 bg-border rounded-full overflow-hidden">
      <div
          class="h-full bg-primary transition-all"
          :style="{ width: `${store.cycleContext?.progress_percent}%` }"
      />
<!--      &lt;!&ndash; Ovulation marker &ndash;&gt;-->
<!--      <div-->
<!--          v-if="store.cycleContext?.ovulation_date"-->
<!--          class="absolute top-0 h-4 w-[2px] bg-pink-700 left-1/2 transform -translate-x-1/2"-->
<!--          title="Ovulation"-->
<!--      />-->
    </div>
    <div class="flex justify-between text-xs text-text-secondary">
      <span>Day 1</span>
<!--      <span class="text-primary font-semibold">Ovulation Day</span>-->
      <span>Day {{ store.cycleContext?.cycle_length ?? '-' }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>
