import CloudRenderer from '51superapi'
import { sleep } from '@cphayim/digm-shared'

import { CloudEvent, CloudEventHandler, RenderEvent } from './events'
import { Scene } from './features'

export enum RenderStatus {
  /**
   * 未初始化
   */
  UN_INIT = 0,

  /**
   * 初始化渲染器
   */
  INIT_RENDER = 11,

  /**
   * 初始化渲染器失败
   */
  INIT_RENDER_FAILED = 12,

  /**
   * 请求渲染地址
   */
  REQUEST_RENDER_URL = 21,

  /**
   * 请求渲染地址失败
   */
  REQUEST_RENDER_URL_FAILED = 22,

  /**
   * 加载模型
   */
  LOAD_MODEL = 31,

  /**
   * 加载模型失败
   */
  LOAD_MODEL_FAILED = 32,

  /**
   * 渲染模型
   */
  RENDER_MODEL = 41,

  /**
   * 渲染模型失败
   */
  RENDER_MODEL_FAILED = 42,

  /**
   * 渲染完成
   */
  RENDER_MODEL_FINISHED = 43,

  /**
   * 停止渲染
   */
  STOP = -1,
}

export interface FetchRenderUrlOptions {
  url: string
  order: string
  width: number
  height: number
}

export interface RenderPrepareOptions {
  enableLog?: boolean
  sleepTime?: number
}

export type StartEngineOptions = FetchRenderUrlOptions & RenderPrepareOptions

export type StatusSubscriber = (status: RenderStatus) => void | Promise<void>

export default class Digm {
  private _cloudRenderer: any
  private _event = new RenderEvent()

  private _status = RenderStatus.UN_INIT
  private _statusSubscribers: StatusSubscriber[] = []

  // features...
  public scene!: Scene

  get status() {
    return this._status
  }

  set status(status: RenderStatus) {
    this._status = status
    // trigger all subscriber
  }

  /**
   * Initial renderer
   */
  init(idOrElement: string | Element) {
    this.status = RenderStatus.INIT_RENDER
    let id: string
    if (idOrElement instanceof Element) {
      const existId = !!idOrElement.id
      id = existId ? idOrElement.id : (idOrElement.id = Math.random().toString().slice(2))
    } else {
      if (!document.querySelector(`#${idOrElement}`))
        throw new Error(`[Error] Element #${idOrElement}} is not exists.`)
      id = idOrElement
    }

    try {
      this._cloudRenderer = new CloudRenderer(id, 0)
      this._initFeatures()
    } catch (e) {
      if (__DEV__) console.error(e)
      this.status = RenderStatus.INIT_RENDER_FAILED
      throw e
    }
  }

  /**
   * Start render engine
   */
  async startEngine(options: StartEngineOptions) {
    this.verifyStatus()
    /**
     * - fetch renderUrl
     * - set renderer log, bind global event handler
     * - start render
     */
    const url = await this._fetchRenderUrl(options)
    this._renderPrepare(options)
    this._render(url)
  }

  /**
   * Stop render engine
   */
  stopEngine() {
    this.verifyStatus()
    try {
      this._cloudRenderer.SuperAPI('StopRenderCloud')
    } catch (e) {
      if (__DEV__) console.warn(e)
      this._status = RenderStatus.STOP
      throw e
    }
  }

  private _initFeatures() {
    this.scene = new Scene(this._cloudRenderer)
  }

  private async _fetchRenderUrl(options: FetchRenderUrlOptions) {
    this.status = RenderStatus.REQUEST_RENDER_URL
    try {
      const { url, ...rest } = options
      const res = await fetch(`${url}/Renderers/Any/order`, {
        method: 'POST',
        body: JSON.stringify(rest),
      })
      const data = await res.json()
      if (!data.success) throw new Error('[Error] request renderer url failed')
      return data.url as string
    } catch (e) {
      this.status = RenderStatus.REQUEST_RENDER_URL_FAILED
      throw e
    }
  }

  private _renderPrepare({ enableLog = false, sleepTime = 5000 }: RenderPrepareOptions) {
    // 设置渲染器日志开关
    this._cloudRenderer.SuperAPI('SetLogMode', enableLog)
    // 绑定全局事件代理器
    this._cloudRenderer.SuperAPI(
      'RegisterCloudResponse',
      this._event.globalEventHandler.bind(this._event),
    )
    // 监听模型加载完成的事件用于更新状态
    this.addEventListener('APIAlready', async () => {
      this.status = RenderStatus.RENDER_MODEL
      // 这里其实主要模型已经加载完成，但是可能会有闪屏现象
      // 延迟几秒再修改状态（让订阅 status 的视图延迟关闭遮罩层，规避闪屏）
      await sleep(sleepTime)
      this.status = RenderStatus.RENDER_MODEL_FINISHED
    })
  }

  private _render(url: string) {
    this.status = RenderStatus.LOAD_MODEL
    try {
      this._cloudRenderer.SuperAPI('StartRenderCloud', url)
    } catch (e) {
      this.status = RenderStatus.LOAD_MODEL_FAILED
      throw e
    }
  }

  private verifyStatus(
    status = RenderStatus.INIT_RENDER,
    message = 'Please call method named digm.init first',
  ) {
    if (this._status < status) throw new Error(`[Error] ${message}`)
  }

  addEventListener(name: CloudEvent, handler: CloudEventHandler) {
    this._event.add(name, handler)
  }

  removeEventListener(name: CloudEvent, handler: CloudEventHandler) {
    this._event.remove(name, handler)
  }
}
