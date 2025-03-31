import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { fileURLToPath } from 'url'
import svgr from "vite-plugin-svgr"

// Получаем __dirname аналог для ES-модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@public': path.resolve(__dirname, './public'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
      },
      include: '**/*.svg',
    })
  ],
})
