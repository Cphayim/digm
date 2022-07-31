import { ensureObject } from '@cphayim/digm-shared'

/**
 * 适用于仅调用一次回调函数的 superAPI，返回 promise
 */
export function promiseWrapper(superAPI: any, name: string, params?: unknown) {
  return new Promise((resolve) => {
    if (params) {
      superAPI(name, params, safeWrapCallback(resolve))
    } else {
      superAPI(name, safeWrapCallback(resolve))
    }
  })
}

/**
 * 适用于调用多次回调函数的 superAPI，例如：取点工具
 */
export function callbackWrapper(
  superAPI: any,
  name: string,
  callback: (...args: unknown[]) => unknown,
  params?: unknown,
) {
  if (params) {
    superAPI(name, params, safeWrapCallback(callback))
  } else {
    superAPI(name, safeWrapCallback(callback))
  }
}

export function safeWrapCallback(fn: (...args: unknown[]) => unknown) {
  return (jsonData: unknown) => fn(ensureObject(jsonData))
}
