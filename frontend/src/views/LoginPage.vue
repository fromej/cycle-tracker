<template>
  <Navbar />
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-primary mb-6 text-center">{{ $t('login.title') }}</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="login" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('login.usernameOrEmail') }}:
          </label>
          <input
              type="text"
              id="login"
              v-model="credentials.login"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
            {{ $t('login.password') }}:
          </label>
          <input
              type="password"
              id="password"
              v-model="credentials.password"
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
            {{ authStore.loading ? $t('login.loggingIn') : $t('common.login') }}
          </button>
          <router-link :to="{ name: 'register' }" class="inline-block align-baseline font-bold text-sm text-primary hover:text-secondary">
            {{ $t('login.needAccount') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
    <Footer/>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const authStore = useAuthStore()

const credentials = ref<Login>({
  login: '',
  password: ''
})

const handleLogin = async () => {
  console.log(credentials.value)
  await authStore.login(credentials.value)
}
</script>

<style scoped>
/* Login specific styles */
</style>
