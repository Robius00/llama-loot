import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/', // এটি নিশ্চিত করে যে ফাইলগুলো রুট পাথ থেকে লোড হবে
})
