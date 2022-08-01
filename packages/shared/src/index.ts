export const noop = () => void 0

/**
 * 确保得到一个对象，如果传入的类型是 json 字符串则进行 parse
 */
export function ensureObject<T = any>(obj: unknown): T {
  return typeof obj === 'string' ? JSON.parse(obj) : obj
}

export function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
