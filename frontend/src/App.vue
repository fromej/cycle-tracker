<template>
  <pwa-install />
  <div id="app" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
/* Add any root-level styles here */
</style>