/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'path'

export default defineConfig({
    plugins: [react(), checker({ typescript: true }), tsconfigPaths()],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
    },
})
