import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig( {
    server: {
        port: 3000
    },
    plugins: [ react() ],
    test: {
        environment: 'jsdom',
        setupFiles: [ './__tests__/setup.ts' ],
        globals: true
    }
} )
