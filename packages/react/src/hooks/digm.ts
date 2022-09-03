import { MutableRefObject, useEffect, useMemo, useState } from 'react'
import {
  CloudEvent,
  CloudEventHandler,
  createDigm,
  Digm,
  getStatusLabel,
  RenderStatus,
  StartEngineOptions,
} from '@cphayim/digm-core'

type CloudEventTuple = [CloudEvent, CloudEventHandler]

export type UseDigmOptions = CommonOptions & AutoStartOptions

type CommonOptions = {
  /**
   * 实例标记 key
   *
   * 通常整个项目中只会存在一个 Digm 实例（即只存在一个模型渲染器），你不需要传递它
   *
   * 默认值: 'DEFAULT'
   */
  key?: string
}

// 根据 autoStart 的不同值的两组配置项
type AutoStartOptions =
  | {
      /**
       * 是否自动启动
       *
       * 默认值: `false`
       */
      autoStart?: false
    }
  | ({
      /**
       * 是否自动启动
       *
       * - 仅在包含模型渲染层挂载点的组件中使用 `true`
       * - 其它作为模型控制层的组件中使用 `false`
       *
       * 当设置为 `true` 时，将立即调用 `digm.init()` 和 `digm.startEngine()` 方法，
       * 因此你必须传入这两个方法所需的参数
       *
       * 默认值: `false`
       */
      autoStart: true

      /**
       * 挂载点
       *
       * 对应 `digm.init()` 方法的参数 `idOrElement`，额外支持了 `Ref<Element>` 类型
       */
      target: string | Element | MutableRefObject<Element>
    } /* `digm.startEngine() 方法所需要的所有字段` */ & StartEngineOptions)

const DEFAULT_KEY = 'DEFAULT'
const instanceMap: Record<string, Digm> = {}

export function useDigm(options: UseDigmOptions = {}) {
  const key = options.key ?? DEFAULT_KEY

  /**
   * 优先使用存在的实例
   */
  const digm = (instanceMap[key] ??= createDigm())

  const [status, setStatus] = useState(digm.status)

  // 是否已初始化
  const isInit = useMemo(() => status >= RenderStatus.INIT_RENDER, [status])
  // 是否准备就绪
  const isReady = useMemo(() => status === RenderStatus.RENDER_MODEL_FINISHED, [status])
  // 是否出现错误
  const isStop = useMemo(() => status === RenderStatus.STOP, [status])
  // 是否出现错误
  const isError = useMemo(() => status % 2 === 0, [status])
  // status 对应文本
  const statusLabel = useMemo(() => getStatusLabel(status), [status])

  // 状态订阅
  useEffect(() => {
    digm.addStatusSubscriber(setStatus)
    return () => {
      digm.removeStatusSubscriber(setStatus)
    }
  }, [digm])

  /**
   * 自动启动
   * 作为挂载点组件使用时自动执行 `digm.init()` 和 `digm.startEngine()`
   * 组件卸载时执行 `digm.stopEngine()`
   */
  useEffect(() => {
    if (options.autoStart) {
      if (!options.target) {
        return
      }
      const idOrElement = unref(options.target)
      digm.init(idOrElement)
      digm.startEngine(options)
    }
    return () => {
      if (options.autoStart) {
        digm.stopEngine()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 收集当前组件范围内添加过的事件处理器的元组数组
  const [tuples, setTuples] = useState<CloudEventTuple[]>([])

  // 添加事件的包装函数，用于收集组件范围内添加的事件处理器，移除事件不需要额外处理
  const addEventListener = (name: CloudEvent, handler: CloudEventHandler) => {
    digm.addEventListener(name, handler)
    setTuples((prev) => [...prev, [name, handler]])
  }

  useEffect(() => {
    return () => {
      tuples.forEach(([event, handler]) => digm.removeEventListener(event, handler))
    }
  }, [tuples, digm])

  const proxyDigm = new Proxy(digm, {
    get(target, key, receiver) {
      if (key === 'addEventListener') return addEventListener
      return Reflect.get(target, key, receiver)
    },
  })

  return {
    digm: proxyDigm,
    status,
    isInit,
    isReady,
    isStop,
    isError,
    statusLabel,
  }
}

export type UseReadyCallback = (digm: Digm) => any | Promise<any>

export function useDigmReady(cb: UseReadyCallback, options?: Pick<UseDigmOptions, 'key'>) {
  if (typeof cb !== 'function') {
    throw new Error('useDigmReady: cb must be a function')
  }

  const { digm, isReady } = useDigm(options)

  useEffect(() => {
    if (isReady) cb(digm)
  }, [isReady, digm, cb])
}

function unref(target: any): string | Element {
  return target.current ?? target
}
