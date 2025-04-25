<template>
  <pwa-install
      ref="pwa-install"
      manifest-url="/manifest.json"
      name="Period Tracker"
      description="Track your cycle and gain insights into your health."
      icon="src/assets/icons/512.png"/>
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
import "@khmyznikov/pwa-install";
import {useTemplateRef} from "vue";

const pwaInstall = useTemplateRef('pwa-install')
</script>

<style scoped>
/* Add any root-level styles here */
</style>