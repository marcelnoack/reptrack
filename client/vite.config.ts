import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig( {
    server: {
        port: 3000
    },
    plugins: [
        react(),
        VitePWA( {
            registerType: 'autoUpdate',
            includeAssets: [ 'favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon.png' ],
            manifest: {
                name: 'reptrack',
                short_name: 'reptrack',
                description: 'Gym tracking app',
                theme_color: '#ffffff',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: '/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '/apple-touch-icon-180x180.png',
                        sizes: '180x180',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '/maskable-icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            },
            devOptions: { enabled: true }
        } ) ],
    test: {
        environment: 'jsdom',
        setupFiles: [ './__tests__/setup.ts' ],
        globals: true
    }
} )
