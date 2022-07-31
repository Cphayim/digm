import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
  },
  plugins: [
    dts({
      rollupTypes: true,
      beforeWriteFile: (filePath, content) => {
        return { filePath, content }
      },
    }),
  ],
})
