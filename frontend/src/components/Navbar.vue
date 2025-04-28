<template>
  <nav class="bg-primary text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <router-link :to="{ name: isAuthenticated ? 'dashboard' : 'home' }" class="text-xl flex gap-2 items-center font-bold">
        <img src="@/assets/icons/180.png" alt="Period Tracker" class="nav-image">
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
.nav-image {
  height: 27px;
  width: 27px;
  background: var(--color-background);
  border-radius: 25%;
  padding: 3px;
}
</style>