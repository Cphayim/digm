import CloudRenderer from '51superapi'

import { CloudEvent, CloudEventHandler, RenderEvent } from './events'
import { Scene } from './features'

export interface FetchRenderUrlOptions {
  url: string
  order: string
  width: number
  height: number
}

export interface RenderPrepareOptions {
  enableLog?: boolean
}

export type StartEngineOptions = FetchRenderUrlOptions & RenderPrepareOptions

export enum RenderStatus {
  UNINIT = 0,
  INIT_RENDER = 11, // 初始化渲染器
  INIT_RENDER_FAILED = 12, // 初始化渲染器失败
  REQUEST_RENDER_URL = 21, // 请求渲染地址
  REQUEST_RENDER_URL_FAILED = 22, // 请求渲染地址失败
  LOAD_MODEL = 31, // 加载模型
  LOAD_MODEL_FAILED = 32, // 加载模型失败
  RENDER_MODEL = 41, //41, // 渲染模型
  RENDER_MODEL_FAILED = 42, // 渲染模型失败
  RENDER_MODEL_FINISHED = 43, // 渲染完成
  STOP = -1, // 停止渲染
}

export default class Digm {
  private _cloudRenderer: any
  private _status = RenderStatus.UNINIT
  private _event = new RenderEvent()

  public scene!: Scene

  get status() {
    return this._status
  }

  set status(status: RenderStatus) {
    // TODO：加入订阅
    this._status = status
  }

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
      if (__DEV__) {
        console.log(e)
      }
      this.status = RenderStatus.INIT_RENDER_FAILED
      throw e
    }
  }

  async startEngine(options: StartEngineOptions) {
    this.verifyStatus()
    const url = await this._fetchRenderUrl(options)
    this._renderPrepare(options)
    this._render(url)
  }

  stopEngine() {
    try {
      this._cloudRenderer.SuperAPI('StopRenderCloud')
    } catch (e) {
      if (__DEV__) {
        console.log(e)
        // 设置状态
        this._status = RenderStatus.STOP
      }
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

  private _renderPrepare({ enableLog = false }: RenderPrepareOptions) {
    // set render log
    this._cloudRenderer.SuperAPI('SetLogMode', enableLog)
    // bind global event
    this._cloudRenderer.SuperAPI('RegisterCloudResponse', this._event.globalEventHandler)
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
