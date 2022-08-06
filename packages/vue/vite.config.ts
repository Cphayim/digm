import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({ mode }) => ({
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
      external: ['vue', '@vueuse/core', '@cphayim/digm-core'],
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'index.css' : (assetInfo.name as string),
      },
    },
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    dts({
      rollupTypes: mode === 'production',
      copyDtsFiles: false,
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
}))
