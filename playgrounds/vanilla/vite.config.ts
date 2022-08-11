import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  envDir: resolve(__dirname, '..'),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
