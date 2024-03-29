import { UserConfigExport, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import defineOptions from 'unplugin-vue-define-options/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

import { createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({ mode, root: __dirname, external: ['vue', '@vueuse/core'] }),
    plugins: [vue(), vueJsx(), defineOptions(), cssInjectedByJsPlugin()],
  }

  // after the build, use vue-tsc to generate the type declaration file

  return config
})
