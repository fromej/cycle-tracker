import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag === 'pwa-install'
                }
            }
        }),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Period Tracker',
                short_name: 'Period Tracker',
                description: 'Track your menstrual cycle',
                start_url: "/",
                theme_color: '#fbcfe8', // Light Pink
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: 'assets/icons/192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'assets/icons/512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'assets/icons/192.png', // Maskable icon
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable'
                    },
                    {
                        src: 'assets/icons/512.png', // Maskable icon
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    },

                ],
                screenshots: [
                    {
                        src: "assets/screenshots/desktop.png",
                        sizes: "1440x900",
                        type: "image/png",
                        form_factor: "wide",
                        label: "Desktop"
                    },
                    // {
                    //     "src": "mobile_screenshot.png",
                    //     "sizes": "375x667",
                    //     "type": "image/png",
                    //     "form_factor": "narrow",
                    //     "label": "Mobile"
                    // }
                ],
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