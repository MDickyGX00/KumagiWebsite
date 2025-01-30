import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/admin': {
        target: 'http://10.20.20.118:8080',
        changeOrigin: true,
      },
    },
    host: '0.0.0.0', // Mengizinkan akses dari jaringan lokal
    port: 5173,
  },
})
