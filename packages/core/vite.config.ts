import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { createBaseConfig } from '../vite.base.config'

export default defineConfig(({ mode }) => {
  return {
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
        external: ['51superapi', '@cphayim/digm-shared'],
      },
    },
    plugins: [
      dts({
        rollupTypes: mode === 'production',
        copyDtsFiles: false,
        beforeWriteFile: (filePath, content) => {
          return { filePath, content }
        },
      }),
    ],
    resolve: {
      dedupe: ['@cphayim/digm-shared'],
    },
    optimizeDeps: {
      exclude: ['@cphayim/digm-shared'],
    },
  }
})
