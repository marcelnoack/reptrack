import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig( {
    plugins: [ react() ],
    test: {
        environment: 'jsdom',
        setupFiles: [ './__tests__/setup.ts' ],
        include: [ '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$' ],
        globals: true
    }
} )
