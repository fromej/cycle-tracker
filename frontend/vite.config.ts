import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

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
        VueI18nPlugin({
            /* options */
            // locale messages resource pre-compile option
            include: [path.resolve(__dirname, './src/locales/**')]
        }),
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
                        src: "/assets/icons/windows11/SmallTile.scale-100.png",
                        sizes: "/assets/icons/71x71"
                    },
                    {
                        src: "/assets/icons/windows11/SmallTile.scale-125.png",
                        sizes: "/assets/icons/89x89"
                    },
                    {
                        src: "/assets/icons/windows11/SmallTile.scale-150.png",
                        sizes: "/assets/icons/107x107"
                    },
                    {
                        src: "/assets/icons/windows11/SmallTile.scale-200.png",
                        sizes: "/assets/icons/142x142"
                    },
                    {
                        src: "/assets/icons/windows11/SmallTile.scale-400.png",
                        sizes: "/assets/icons/284x284"
                    },
                    {
                        src: "/assets/icons/windows11/Square150x150Logo.scale-100.png",
                        sizes: "/assets/icons/150x150"
                    },
                    {
                        src: "/assets/icons/windows11/Square150x150Logo.scale-125.png",
                        sizes: "/assets/icons/188x188"
                    },
                    {
                        src: "/assets/icons/windows11/Square150x150Logo.scale-150.png",
                        sizes: "/assets/icons/225x225"
                    },
                    {
                        src: "/assets/icons/windows11/Square150x150Logo.scale-200.png",
                        sizes: "/assets/icons/300x300"
                    },
                    {
                        src: "/assets/icons/windows11/Square150x150Logo.scale-400.png",
                        sizes: "/assets/icons/600x600"
                    },
                    {
                        src: "/assets/icons/windows11/Wide310x150Logo.scale-100.png",
                        sizes: "/assets/icons/310x150"
                    },
                    {
                        src: "/assets/icons/windows11/Wide310x150Logo.scale-125.png",
                        sizes: "/assets/icons/388x188"
                    },
                    {
                        src: "/assets/icons/windows11/Wide310x150Logo.scale-150.png",
                        sizes: "/assets/icons/465x225"
                    },
                    {
                        src: "/assets/icons/windows11/Wide310x150Logo.scale-200.png",
                        sizes: "/assets/icons/620x300"
                    },
                    {
                        src: "/assets/icons/windows11/Wide310x150Logo.scale-400.png",
                        sizes: "/assets/icons/1240x600"
                    },
                    {
                        src: "/assets/icons/windows11/LargeTile.scale-100.png",
                        sizes: "/assets/icons/310x310"
                    },
                    {
                        src: "/assets/icons/windows11/LargeTile.scale-125.png",
                        sizes: "/assets/icons/388x388"
                    },
                    {
                        src: "/assets/icons/windows11/LargeTile.scale-150.png",
                        sizes: "/assets/icons/465x465"
                    },
                    {
                        src: "/assets/icons/windows11/LargeTile.scale-200.png",
                        sizes: "/assets/icons/620x620"
                    },
                    {
                        src: "/assets/icons/windows11/LargeTile.scale-400.png",
                        sizes: "/assets/icons/1240x1240"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.scale-100.png",
                        sizes: "/assets/icons/44x44"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.scale-125.png",
                        sizes: "/assets/icons/55x55"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.scale-150.png",
                        sizes: "/assets/icons/66x66"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.scale-200.png",
                        sizes: "/assets/icons/88x88"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.scale-400.png",
                        sizes: "/assets/icons/176x176"
                    },
                    {
                        src: "/assets/icons/windows11/StoreLogo.scale-100.png",
                        sizes: "/assets/icons/50x50"
                    },
                    {
                        src: "/assets/icons/windows11/StoreLogo.scale-125.png",
                        sizes: "/assets/icons/63x63"
                    },
                    {
                        src: "/assets/icons/windows11/StoreLogo.scale-150.png",
                        sizes: "/assets/icons/75x75"
                    },
                    {
                        src: "/assets/icons/windows11/StoreLogo.scale-200.png",
                        sizes: "/assets/icons/100x100"
                    },
                    {
                        src: "/assets/icons/windows11/StoreLogo.scale-400.png",
                        sizes: "/assets/icons/200x200"
                    },
                    {
                        src: "/assets/icons/windows11/SplashScreen.scale-100.png",
                        sizes: "/assets/icons/620x300"
                    },
                    {
                        src: "/assets/icons/windows11/SplashScreen.scale-125.png",
                        sizes: "/assets/icons/775x375"
                    },
                    {
                        src: "/assets/icons/windows11/SplashScreen.scale-150.png",
                        sizes: "/assets/icons/930x450"
                    },
                    {
                        src: "/assets/icons/windows11/SplashScreen.scale-200.png",
                        sizes: "/assets/icons/1240x600"
                    },
                    {
                        src: "/assets/icons/windows11/SplashScreen.scale-400.png",
                        sizes: "/assets/icons/2480x1200"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-16.png",
                        sizes: "/assets/icons/16x16"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-20.png",
                        sizes: "/assets/icons/20x20"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-24.png",
                        sizes: "/assets/icons/24x24"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-30.png",
                        sizes: "/assets/icons/30x30"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-32.png",
                        sizes: "/assets/icons/32x32"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-36.png",
                        sizes: "/assets/icons/36x36"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-40.png",
                        sizes: "/assets/icons/40x40"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-44.png",
                        sizes: "/assets/icons/44x44"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-48.png",
                        sizes: "/assets/icons/48x48"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-60.png",
                        sizes: "/assets/icons/60x60"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-64.png",
                        sizes: "/assets/icons/64x64"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-72.png",
                        sizes: "/assets/icons/72x72"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-80.png",
                        sizes: "/assets/icons/80x80"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-96.png",
                        sizes: "/assets/icons/96x96"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.targetsize-256.png",
                        sizes: "/assets/icons/256x256"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
                        sizes: "/assets/icons/16x16"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
                        sizes: "/assets/icons/20x20"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
                        sizes: "/assets/icons/24x24"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
                        sizes: "/assets/icons/30x30"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
                        sizes: "/assets/icons/32x32"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
                        sizes: "/assets/icons/36x36"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
                        sizes: "/assets/icons/40x40"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
                        sizes: "/assets/icons/44x44"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
                        sizes: "/assets/icons/48x48"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
                        sizes: "/assets/icons/60x60"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
                        sizes: "/assets/icons/64x64"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
                        sizes: "/assets/icons/72x72"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
                        sizes: "/assets/icons/80x80"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
                        sizes: "/assets/icons/96x96"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
                        sizes: "/assets/icons/256x256"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
                        sizes: "/assets/icons/16x16"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
                        sizes: "/assets/icons/20x20"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
                        sizes: "/assets/icons/24x24"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
                        sizes: "/assets/icons/30x30"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
                        sizes: "/assets/icons/32x32"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
                        sizes: "/assets/icons/36x36"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
                        sizes: "/assets/icons/40x40"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
                        sizes: "/assets/icons/44x44"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
                        sizes: "/assets/icons/48x48"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
                        sizes: "/assets/icons/60x60"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
                        sizes: "/assets/icons/64x64"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
                        sizes: "/assets/icons/72x72"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
                        sizes: "/assets/icons/80x80"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
                        sizes: "/assets/icons/96x96"
                    },
                    {
                        src: "/assets/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
                        sizes: "/assets/icons/256x256"
                    },
                    {
                        src: "/assets/icons/android/android-launchericon-512-512.png",
                        sizes: "/assets/icons/512x512"
                    },
                    {
                        src: "/assets/icons/android/android-launchericon-192-192.png",
                        sizes: "/assets/icons/192x192"
                    },
                    {
                        src: "/assets/icons/android/android-launchericon-144-144.png",
                        sizes: "/assets/icons/144x144"
                    },
                    {
                        src: "/assets/icons/android/android-launchericon-96-96.png",
                        sizes: "/assets/icons/96x96"
                    },
                    {
                        src: "/assets/icons/android/android-launchericon-72-72.png",
                        sizes: "/assets/icons/72x72"
                    },
                    {
                        src: "/assets/icons/android/android-launchericon-48-48.png",
                        sizes: "/assets/icons/48x48"
                    },
                    {
                        src: "/assets/icons/ios/16.png",
                        sizes: "/assets/icons/16x16"
                    },
                    {
                        src: "/assets/icons/ios/20.png",
                        sizes: "/assets/icons/20x20"
                    },
                    {
                        src: "/assets/icons/ios/29.png",
                        sizes: "/assets/icons/29x29"
                    },
                    {
                        src: "/assets/icons/ios/32.png",
                        sizes: "/assets/icons/32x32"
                    },
                    {
                        src: "/assets/icons/ios/40.png",
                        sizes: "/assets/icons/40x40"
                    },
                    {
                        src: "/assets/icons/ios/50.png",
                        sizes: "/assets/icons/50x50"
                    },
                    {
                        src: "/assets/icons/ios/57.png",
                        sizes: "/assets/icons/57x57"
                    },
                    {
                        src: "/assets/icons/ios/58.png",
                        sizes: "/assets/icons/58x58"
                    },
                    {
                        src: "/assets/icons/ios/60.png",
                        sizes: "/assets/icons/60x60"
                    },
                    {
                        src: "/assets/icons/ios/64.png",
                        sizes: "/assets/icons/64x64"
                    },
                    {
                        src: "/assets/icons/ios/72.png",
                        sizes: "/assets/icons/72x72"
                    },
                    {
                        src: "/assets/icons/ios/76.png",
                        sizes: "/assets/icons/76x76"
                    },
                    {
                        src: "/assets/icons/ios/80.png",
                        sizes: "/assets/icons/80x80"
                    },
                    {
                        src: "/assets/icons/ios/87.png",
                        sizes: "/assets/icons/87x87"
                    },
                    {
                        src: "/assets/icons/ios/100.png",
                        sizes: "/assets/icons/100x100"
                    },
                    {
                        src: "/assets/icons/ios/114.png",
                        sizes: "/assets/icons/114x114"
                    },
                    {
                        src: "/assets/icons/ios/120.png",
                        sizes: "/assets/icons/120x120"
                    },
                    {
                        src: "/assets/icons/ios/128.png",
                        sizes: "/assets/icons/128x128"
                    },
                    {
                        src: "/assets/icons/ios/144.png",
                        sizes: "/assets/icons/144x144"
                    },
                    {
                        src: "/assets/icons/ios/152.png",
                        sizes: "/assets/icons/152x152"
                    },
                    {
                        src: "/assets/icons/ios/167.png",
                        sizes: "/assets/icons/167x167"
                    },
                    {
                        src: "/assets/icons/ios/180.png",
                        sizes: "/assets/icons/180x180"
                    },
                    {
                        src: "/assets/icons/ios/192.png",
                        sizes: "/assets/icons/192x192"
                    },
                    {
                        src: "/assets/icons/ios/256.png",
                        sizes: "/assets/icons/256x256"
                    },
                    {
                        src: "/assets/icons/ios/512.png",
                        sizes: "/assets/icons/512x512"
                    },
                    {
                        src: "/assets/icons/ios/1024.png",
                        sizes: "/assets/icons/1024x1024"
                    }
                ],
                screenshots: [
                    {
                        src: "/assets/screenshots/mobile-dashboard.png",
                        sizes: "375x667",
                        type: "image/png",
                        form_factor: "narrow",
                        label: "Mobile"
                    },
                    {
                        src: "/assets/screenshots/dashboard.png",
                        sizes: "1440x900",
                        type: "image/png",
                        form_factor: "wide",
                        label: "Desktop"
                    }
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
            '/users': {
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