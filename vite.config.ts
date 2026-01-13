import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    cssCodeSplit: false,
  },
  server: {
    fs: {
      strict: false
    }
  },
  css: {
    postcss: './postcss.config.js',
  }
})
