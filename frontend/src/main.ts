import './assets/css/main.css' // Import Tailwind CSS

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import i18n from '@/i18n'

// Initialize Axios with configuration
import '@/api/index.ts' // This runs the code in api/index.js

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// Initialize auth state from local storage
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.initializeAuth() // Call this action

app.mount('#app')