<script setup lang="ts">

</script>

<template>
  <footer class="footer-section py-8">
    <div class="container mx-auto px-6 text-center">
      <p class="text-gray-600">
        © {{ new Date().getFullYear() }} <a href="https://fromej.nl" class="text-primary hover:text-primary-dark transition-colors duration-300">FromEJ.</a> {{ $t('common.allRightsReserved') }}
      </p>
      <p class="text-gray-500 text-sm mt-2">
        {{ $t('common.openSource') }} -
        <a href="https://github.com/fromej/cycle-tracker"
           class="text-primary hover:text-primary-dark transition-colors duration-300">
          Github
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>

</style>