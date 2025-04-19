<template>
  <nav class="bg-primary text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <router-link :to="{ name: isAuthenticated ? 'dashboard' : 'home' }" class="text-xl font-bold">
        Period Tracker
      </router-link>
      <div>
        <template v-if="isAuthenticated">
          <router-link :to="{ name: 'dashboard' }" class="mr-4 hover:underline">Dashboard</router-link>
          <button @click="handleLogout" class="hover:underline">Logout</button>
        </template>
        <template v-else>
          <router-link :to="{ name: 'login' }" class="mr-4 hover:underline">Login</router-link>
          <router-link :to="{ name: 'register' }" class="hover:underline">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleLogout = () => {
  authStore.logout();
}
</script>

<style scoped>
/* Navbar specific styles */
</style>