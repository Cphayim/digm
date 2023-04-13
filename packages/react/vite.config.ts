import { UserConfigExport, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

import { createBuild, addDTSPlugin } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({ mode, root: __dirname, external: ['react', 'react-dom'] }),
    plugins: [react(), cssInjectedByJsPlugin()],
  }

  // generate dts file
  addDTSPlugin(config, { mode, root: __dirname })

  return config
})
