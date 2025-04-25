<template>
  <div
      class="p-6 rounded-2xl shadow-lg transition hover:shadow-xl bg-gradient-to-br from-pink-500 to-rose-400 text-white"
  >
    <div class="text-4xl font-bold">
      <template v-if="activePeriod?.end_date === null">
        {{ reportStore.cycleContext?.days_running }} day<span v-if="reportStore.cycleContext?.days_running > 1">s</span> ongoing
      </template>
      <template v-else-if="reportStore.cycleContext?.days_until_next_period !== null">
        {{ reportStore.cycleContext?.days_until_next_period }} day<span v-if="reportStore.cycleContext?.days_until_next_period > 1">s</span> until next period
      </template>
      <template v-else>
        No prediction available
      </template>
    </div>
    <p class="mt-2 text-lg opacity-90">
      <template v-if="reportStore.cycleContext?.status ==='period'">
        Period started on {{ activePeriod?.start_date }}
      </template>
        <!-- Start Period Button -->
        <button @click="handlePeriodCardClick" class="bg-white text-primary p-2 rounded-lg w-full mt-4 hover:border-pink-700 hover:border-3 transition-all cursor-pointer">
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
