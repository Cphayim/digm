import { UserConfig } from 'vite'

export function createBaseConfig(mode: string): UserConfig {
  return {
    define: {
      __DEV__: mode === 'development',
    },
  }
}
