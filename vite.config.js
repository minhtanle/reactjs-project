import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/reactjs-project/' // for github pages
  resolve: {
    alias: {
      '@': '/src', // Replace '/src' with your actual source folder path
    },
  },
})
