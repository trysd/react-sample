import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/'),
    },
  },
})
