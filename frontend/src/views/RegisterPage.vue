<template>
  <div class="container mx-auto px-4 py-8">
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-primary mb-6 text-center">Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
            type="text"
            id="username"
            v-model="userData.username"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
            type="email"
            id="email"
            v-model="userData.email"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
            type="password"
            id="password"
            v-model="userData.password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div class="mb-6">
        <label for="confirm_password" class="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password:
        </label>
        <input
            type="password"
            id="confirm_password"
            v-model="userData.confirm_password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div v-if="authStore.error" class="text-red-500 text-sm mb-4">{{ authStore.error }}</div>
      <div class="flex items-center justify-between gap-2">
        <button
            type="submit"
            :disabled="authStore.loading"
            class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {{ authStore.loading ? 'Registering...' : 'Register' }}
        </button>
        <router-link :to="{ name: 'login' }" class="inline-block align-baseline font-bold text-sm text-primary hover:text-secondary">
          Already have an account? Login
        </router-link>
      </div>
    </form>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const userData = ref<UserRegistration>({
  username: '',
  email: '',
  password: '',
  confirm_password: ''
})

const handleRegister = async () => {
  await authStore.register(userData.value)
}
</script>

<style scoped>
/* Register specific styles */
</style>