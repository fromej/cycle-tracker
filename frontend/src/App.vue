<template>
  <pwa-install
      ref="pwa-install"
      manifest-url="/manifest.json"
      name="Period Tracker"
      description="Track your cycle and gain insights into your health."
      icon="src/assets/icons/512.png"/>

  <div id="app" class="h-screen flex overflow-hidden">

    <Navigation
        :is-mobile="isMobile"
        :is-authenticated="authStore.isAuthenticated"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main
          class="flex-1 overflow-y-auto bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100"
          :class="{ 'pb-16': isMobile && authStore.isAuthenticated }"
      >
      <RouterView />
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Navigation from '@/components/Navigation.vue';
import "@khmyznikov/pwa-install";
import { useTemplateRef } from "vue";
import { useDevice } from '@/composables/useDevice.js';
import { useAuthStore } from "@/stores/auth.ts";

const authStore = useAuthStore();
const { isMobile } = useDevice();
const pwaInstall = useTemplateRef('pwa-install');
</script>

<style scoped>
.pb-16 {
  padding-bottom: 4rem;
}
</style>