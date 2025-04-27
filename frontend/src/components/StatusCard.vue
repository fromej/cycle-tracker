<template>
  <div
      class="dashboard-card p-6 bg-gradient-to-r from-primary to-secondary text-white flex flex-col justify-between"
  >
    <div class="text-4xl font-bold">
      <template v-if="activePeriod?.end_date === null">
        {{ reportStore.cycleContext?.days_running }} day<span v-if="reportStore.cycleContext?.days_running > 1">s</span> ongoing
      </template>
      <template v-else-if="reportStore.cycleContext?.days_until_next_period !== null">
        <div>
          <div class="main-status-text">
            <template v-if="reportStore.cycleContext?.days_until_next_period > 0">
              {{ reportStore.cycleContext?.days_until_next_period }} day<span v-if="reportStore.cycleContext?.days_until_next_period > 1">s</span>
            </template>
            <template v-else>
              Period expected
            </template>
          </div>

          <div class="subtitle-text text-sm mt-1">
            <template v-if="reportStore.cycleContext?.days_until_next_period > 0">
              until next period
            </template>
            <template v-else-if="reportStore.cycleContext?.days_until_next_period === 0">
              Due today
            </template>
            <template v-else>
              <span class="text-orange-600 font-medium">
                {{ Math.abs(reportStore.cycleContext?.days_until_next_period) }}
                day<span v-if="Math.abs(reportStore.cycleContext?.days_until_next_period) > 1">s</span> overdue
              </span>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        No prediction available
      </template>
    </div>
    <p class="mt-2 text-lg opacity-90 flex align-items-center flex-col gap-2">
      <template v-if="reportStore.cycleContext?.status ==='period'">
        Period started on {{ activePeriod?.start_date }}
      </template>
        <!-- Start Period Button -->
        <button @click="handlePeriodCardClick" class="btn btn-white">
          {{buttonText}}
        </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { usePeriodsStore } from '@/stores/periods';
import { useReportsStore } from '@/stores/reports';
import { formatISO } from 'date-fns';
import { Period } from "@/types.ts";
import PeriodApi from "@/api/periods.ts";

const periodsStore = usePeriodsStore();
const reportStore = useReportsStore();

const activePeriod = ref<Period>(null)
const loading = ref<boolean>(false);

const today = formatISO(new Date(), { representation: 'date' });

const buttonText = computed(() => {
  return activePeriod.value?.end_date === null ? "End Period Today" : "Start Period Today";
})

const handlePeriodCardClick = async () => {
  if (!activePeriod.value?.start_date) {
    activePeriod.value = await periodsStore.createPeriod(today);
  } else {
    activePeriod.value = await periodsStore.updatePeriod(activePeriod.value.id, today);
  }
};

onMounted(async () =>{
  try{
    const response = await PeriodApi.getActivePeriod()
    activePeriod.value = response.data
  } catch (error) {
    console.log(error);
    activePeriod.value = null
  }
})

</script>
