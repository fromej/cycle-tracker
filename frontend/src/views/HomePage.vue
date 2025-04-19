<template>
  <div class="text-center py-16">
    <h1 class="text-4xl font-bold text-primary mb-4">Welcome to Period Tracker</h1>
    <p class="text-xl text-gray-700 mb-8">Track your cycle and gain insights into your health.</p>
    <div v-if="!isAuthenticated">
      <router-link
          :to="{ name: 'login' }"
          class="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-full text-lg mr-4"
      >
        Login
      </router-link>
      <router-link
          :to="{ name: 'register' }"
          class="bg-gray-200 hover:bg-gray-300 text-text font-bold py-2 px-6 rounded-full text-lg"
      >
        Register
      </router-link>
    </div>
    <div v-else>
      <router-link
          :to="{ name: 'dashboard' }"
          class="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-full text-lg"
      >
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const isAuthenticated = computed<Boolean>(() => authStore.isAuthenticated);
</script>

<style scoped>
/* Homepage specific styles */
</style>