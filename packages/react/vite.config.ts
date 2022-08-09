import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { createBaseConfig } from '../vite.base.config'

export default defineConfig(({ mode }) => ({
  ...createBaseConfig(mode),

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
      external: ['react', 'react-dom', '@cphayim/digm-core'],
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'index.css' : (assetInfo.name as string),
      },
    },
  },
  plugins: [
    react(),
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
