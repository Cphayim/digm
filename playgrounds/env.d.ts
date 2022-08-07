/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_RENDER_SERVER: string
  readonly VITE_APP_RENDER_ORDER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
