import { computed, onMounted, onUnmounted, Ref, ref, unref, watch } from 'vue'

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
      target: string | Element | Ref<Element>
    } /* `digm.startEngine() 方法所需要的所有字段` */ & StartEngineOptions)

type ReadyCallback = (...args: []) => any

const DEFAULT_KEY = 'DEFAULT'
const instanceMap: Record<string, Digm> = {}

/**
 * 通常情况下，整个项目中只会存在一个 Digm 实例（即只存在一个模型渲染器）
 */
export const useDigm = (options: UseDigmOptions = {}) => {
  const key = options.key ?? DEFAULT_KEY
  /**
   * 优先使用存在的实例
   */
  const digm = (instanceMap[key] ??= createDigm())

  /**
   * 响应式 digm.status
   */
  const status = ref(digm.status)
  const updateStatus = (s: RenderStatus) => {
    status.value = s
  }
  // 订阅状态更新响应值
  digm.addStatusSubscriber(updateStatus)
  // 卸载时移除订阅
  onUnmounted(() => digm.removeStatusSubscriber(updateStatus))

  // 是否已初始化
  const isInit = computed(() => status.value >= RenderStatus.INIT_RENDER)
  // 是否准备就绪（模型完成渲染）
  const isReady = computed(() => status.value === RenderStatus.RENDER_MODEL_FINISHED)
  // 是否已停止渲染
  const isStop = computed(() => status.value === RenderStatus.STOP)
  // 是否出现错误
  const isError = computed(() => status.value % 2 === 0)
  // status 对应文本
  const statusLabel = computed(() => getStatusLabel(status.value))

  /**
   * 自动启动
   * 作为挂载点组件使用时自动执行 `digm.init()` 和 `digm.startEngine()`
   * 组件卸载时执行 `digm.stopEngine()`
   */
  if (options.autoStart) {
    onMounted(() => {
      const idOrElement = unref(options.target)
      digm.init(idOrElement)
      digm.startEngine(options)
    })
    onUnmounted(() => digm.stopEngine())
  }

  // 收集当前组件范围内添加过的事件处理器的元组数组
  const tuples: CloudEventTuple[] = []
  // 添加事件的包装函数，用于收集组件范围内添加的事件处理器，移除事件不需要额外处理
  const addEventListener = (name: CloudEvent, handler: CloudEventHandler) => {
    digm.addEventListener(name, handler)
    tuples.push([name, handler])
  }
  // 当组件卸载时，移除组件范围内添加的事件处理器
  onUnmounted(() => {
    tuples.forEach(([event, handler]) => digm.removeEventListener(event, handler))
  })

  const proxyDigm = new Proxy(digm, {
    get(target, key, receiver) {
      if (key === 'addEventListener') return addEventListener
      return Reflect.get(target, key, receiver)
    },
  })

  const readyCallbacks: ReadyCallback[] = []
  const onDigmReady = (cb: ReadyCallback) => {
    if (typeof cb !== 'function') {
      throw new Error('onDigmReady: cb must be a function')
    }

    if (isReady.value) {
      executeReadyCallback(cb)
    }
    readyCallbacks.push(cb)
  }

  watch(isReady, (ready) => {
    if (ready) {
      executeReadyCallbacks(readyCallbacks)
    }
  })

  return {
    digm: proxyDigm,
    status,
    isInit,
    isReady,
    isStop,
    isError,
    statusLabel,
    onDigmReady,
  }
}

function executeReadyCallbacks(cbs: ReadyCallback[]) {
  cbs.forEach(executeReadyCallback)
}

async function executeReadyCallback(cb: ReadyCallback) {
  try {
    await cb()
  } catch (error) {
    console.error(error)
  }
}

export type UseReadyCallback = (digm: Digm) => any | Promise<any>

export function useDigmReady(cb: UseReadyCallback, options?: Pick<UseDigmOptions, 'key'>) {
  if (typeof cb !== 'function') {
    throw new Error('useDigmReady: cb must be a function')
  }

  const { digm, isReady } = useDigm(options)

  // 使用 watch 而不是 watchEffect，防止用户传入的回调中包含其它 get 被依赖收集导致重复触发
  watch(
    isReady,
    (ready) => {
      if (ready) cb(digm)
    },
    { immediate: true },
  )
}
