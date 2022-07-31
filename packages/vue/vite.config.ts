import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index${format === 'es' ? '.mjs' : '.cjs'}`,
    },
    rollupOptions: {
      external: ['@cphayim/digm-core'],
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'index.css' : (assetInfo.name as string),
      },
    },
  },
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      beforeWriteFile: (filePath, content) => {
        return { filePath, content }
      },
    }),
  ],
  resolve: {
    dedupe: ['@cphayim/digm-core'],
  },
  optimizeDeps: {
    exclude: ['@cphayim/digm-core'],
  },
})
