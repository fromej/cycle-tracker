import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Period Tracker',
                short_name: 'Tracker',
                description: 'Track your menstrual cycle',
                start_url: "/",
                theme_color: '#fbcfe8', // Light Pink
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: 'assets/icons/pwa-192x192.png', // You'll need to generate these
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'assets/icons/pwa-512x512.png', // You'll need to generate these
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'assets/icons/pwa-512x512.maskable.png', // Maskable icon
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // Ensure the base path is '/' for serving from the Flask backend
    base: '/',
    server: { // Ensure 'server' is a top-level property under defineConfig's object
        port: 5173, // Optional: explicitly set port
        proxy: { // Ensure 'proxy' is a property under 'server'
            '/auth': { // Key should be the path prefix you want to proxy
                target: 'http://127.0.0.1:5000', // The target backend server URL
                changeOrigin: true, // Needed for some APIs, often good practice
                // rewrite: (path) => path.replace(/^\/auth/, '/auth'), // Usually not needed if backend path is the same
            },
            '/periods': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
            },
            '/reports': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
            },
            '/health': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
            },
            // Add any other API path prefixes as needed
        }
    }
})