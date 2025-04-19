<template>
  <div class="bg-white p-6 rounded-lg shadow-md text-center">
    <div class="text-xl font-bold text-primary mb-2">{{ title }}</div>
    <div class="text-3xl font-semibold text-text">{{ value !== null ? value.toFixed(1) : '-' }} {{ unit }}</div>
    <div class="text-gray-500 text-sm mt-2">{{ description }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, null],
    default: null
  },
  unit: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
/* StatsCard specific styles */
</style>