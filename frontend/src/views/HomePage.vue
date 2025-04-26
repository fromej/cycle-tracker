<template>
  <div class="homepage-wrapper">

    <section class="hero-section relative text-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 min-h-[calc(100vh-var(--navbar-height,64px))] flex items-center justify-center p-6">
      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-5 font-serif leading-tight animate-fade-in-up">
          Understand Your Cycle, <span class="text-primary">Empower Your Life.</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-up animation-delay-300">
          Track your period, predict fertile windows, gain insights into your unique patterns, and sync with your body's natural rhythm effortlessly.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-600">
          <div v-if="!isAuthenticated">
            <router-link :to="{ name: 'register' }" class="btn btn-primary w-full sm:w-auto">
              Start Tracking for Free
            </router-link>
            <router-link :to="{ name: 'login' }" class="btn btn-secondary mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
              Login
            </router-link>
          </div>
          <div v-else>
            <router-link :to="{ name: 'dashboard' }" class="btn btn-primary w-full sm:w-auto">
              Go to Your Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section py-16 lg:py-24 bg-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">Everything You Need</h2>
        <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">From simple logging to powerful insights, we've got you covered.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div class="feature-card bg-pink-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div class="text-primary mb-4">
              <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Effortless Tracking</h3>
            <p class="text-gray-600">Quickly log your period start and end dates. Simple and intuitive.</p>
          </div>
          <div class="feature-card bg-purple-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div class="text-primary mb-4">
              <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Smart Predictions</h3>
            <p class="text-gray-600">See your predicted fertile window, ovulation day, and next period.</p>
          </div>
          <div class="feature-card bg-indigo-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div class="text-primary mb-4">
              <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Personalized Insights</h3>
            <p class="text-gray-600">Discover your average cycle length, period duration, and unique patterns.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="benefits-section py-16 lg:py-24 bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">Connect With Your Body</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Go beyond tracking. Understand the 'why' behind your cycle.</p>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-8 lg:gap-16 mb-12 lg:mb-16">
          <div class="w-full md:w-1/2">
            <img src="https://placehold.co/500x300/E9D5FF/8B5CF6?text=Illustration+1" alt="Visual representing planning" class="rounded-lg shadow-lg mx-auto">
          </div>
          <div class="w-full md:w-1/2 text-center md:text-left">
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Plan Ahead with Confidence</h3>
            <p class="text-gray-600 leading-relaxed">Know when to expect your period and fertile days, making it easier to plan events, trips, or intimacy.</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-16">
          <div class="w-full md:w-1/2">
            <img src="https://placehold.co/500x300/FECACA/F43F5E?text=Illustration+2" alt="Visual representing wellness" class="rounded-lg shadow-lg mx-auto">
          </div>
          <div class="w-full md:w-1/2 text-center md:text-left">
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Tune Into Your Wellbeing</h3>
            <p class="text-gray-600 leading-relaxed">Notice patterns in your energy, mood, and physical symptoms throughout your cycle to better support your overall health.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="peek-section py-16 lg:py-24 bg-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">Simple, Visual, Insightful</h2>
        <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Get a clear view of your cycle at a glance with our intuitive dashboard.</p>
        <div class="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-xl">
          <img src="https://placehold.co/900x450/E0E7FF/4F46E5?text=App+Dashboard+Mockup" alt="App dashboard mockup" class="rounded-md">
        </div>
      </div>
    </section>

    <section class="cta-section py-16 lg:py-24 bg-primary text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-semibold mb-4">Ready to Discover Your Rhythm?</h2>
        <p class="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">Join thousands of women taking control of their cycle health. It's free!</p>
        <div v-if="!isAuthenticated">
          <router-link :to="{ name: 'register' }" class="btn btn-white">
            Sign Up Now
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'dashboard' }" class="btn btn-white">
            View Your Dashboard
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const isAuthenticated = computed<boolean>(() => authStore.isAuthenticated);
</script>

<style scoped>
</style>