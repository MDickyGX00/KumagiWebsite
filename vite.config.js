import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // Bisa diakses dari jaringan lokal tanpa perlu '0.0.0.0'
    port: 5173,
    strictPort: true, // Pastikan port tetap 5173 (tidak berubah otomatis jika sudah digunakan)
    cors: true, // Mengaktifkan CORS agar frontend bisa berkomunikasi dengan backend

    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend API
        changeOrigin: true,
        secure: false,
        ws: true, // Jika backend menggunakan WebSocket, ini perlu
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
