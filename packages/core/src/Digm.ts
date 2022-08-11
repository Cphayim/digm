import CloudRenderer from '51superapi'
import { sleep } from '@cphayim/digm-shared'

import { RenderStatus } from './status'
import { CloudEvent, CloudEventHandler, RenderEvent } from './events'
import {
  SceneCamera,
  SceneEdit,
  Section,
  Building,
  Covering,
  MigrationMap,
  HeatMap,
  Raster,
  Path,
  ParticleEffect,
  Light,
  Range,
  POI,
  StrategyMap,
  Viewshed,
  SceneGeoConverter,
  ChinaMap,
} from './features'

export interface FetchRenderUrlOptions {
  /**
   * 渲染服务器 baseUrl
   */
  url: string

  /**
   * 渲染口令
   */
  order: string

  /**
   * 输出像素宽度
   *
   * 可选，默认为容器宽度
   */
  width?: number

  /**
   * 输出像素高度
   *
   * 可选，默认为容器高度
   */
  height?: number
}

export interface RenderPrepareOptions {
  /**
   * 是否启用渲染器日志
   *
   * 默认值: `false`
   */
  enableLog?: boolean
  /**
   * 渲染器完成延迟（防止闪屏）
   *
   * 默认值: `5000`
   */
  sleepTime?: number
}

export type StartEngineOptions = FetchRenderUrlOptions & RenderPrepareOptions

export type StatusSubscriber = (status: RenderStatus) => void | Promise<void>

export type CloudRendererType = typeof CloudRenderer

export class Digm {
  private _el: Element

  private _renderer: CloudRendererType

  get renderer(): CloudRendererType {
    this._verifyStatus()
    return this._renderer
  }

  private _event = new RenderEvent()

  private _status = RenderStatus.UN_INIT

  get status() {
    return this._status
  }

  private set status(status: RenderStatus) {
    this._status = status
    // trigger all subscriber when status change
    this._triggerStatusSubScribers()
  }

  private _statusSubscribers: Set<StatusSubscriber> = new Set()

  // features...
  public readonly sceneCamera: SceneCamera = new SceneCamera(this)
  public readonly sceneEdit: SceneEdit = new SceneEdit(this)
  public readonly section: Section = new Section(this)
  public readonly covering: Covering = new Covering(this)
  public readonly migrationMap: MigrationMap = new MigrationMap(this)
  public readonly heatMap: HeatMap = new HeatMap(this)
  public readonly raster: Raster = new Raster(this)
  public readonly path: Path = new Path(this)
  public readonly particleEffect: ParticleEffect = new ParticleEffect(this)
  public readonly light: Light = new Light(this)
  public readonly range: Range = new Range(this)
  public readonly POI: POI = new POI(this)
  public readonly strategyMap: StrategyMap = new StrategyMap(this)
  public readonly viewshed: Viewshed = new Viewshed(this)
  public readonly sceneGeoConverter: SceneGeoConverter = new SceneGeoConverter(this)
  public readonly chinaMap: ChinaMap = new ChinaMap(this)

  public readonly building: Building = new Building(this)

  addStatusSubscriber(statusSubscriber: StatusSubscriber) {
    this._statusSubscribers.add(statusSubscriber)
  }
  removeStatusSubscriber(statusSubscriber: StatusSubscriber) {
    this._statusSubscribers.delete(statusSubscriber)
  }

  private _triggerStatusSubScribers() {
    this._statusSubscribers.forEach(async (statusSubscriber) => {
      try {
        await statusSubscriber(this._status)
      } catch (error) {
        console.error(error)
      }
    })
  }

  /**
   * Initial renderer
   */
  init(idOrElement: string | Element) {
    this.status = RenderStatus.INIT_RENDER

    // init render required a string id
    // we also need to record the element
    let id: string
    if (idOrElement instanceof Element) {
      const existId = !!idOrElement.id
      id = existId ? idOrElement.id : (idOrElement.id = `digm-${Math.random().toString().slice(2)}`)
      this._el = idOrElement
    } else {
      const el = document.getElementById(idOrElement)
      if (!el) throw new Error(`[Error] Element #${idOrElement}} is not exists.`)
      id = idOrElement
      this._el = el
    }

    try {
      this._renderer = new CloudRenderer(id, 0)
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
    if (!options.url) throw new Error(`[Error] options.url is required`)
    if (!options.order) throw new Error(`[Error] options.order is required`)

    this._verifyStatus()

    // If the user does not specify a width and height,
    // use the width and height of the container element
    options = Object.assign(getElementWidthAndHeight(this._el), options)

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
    this._verifyStatus()
    try {
      this._renderer.SuperAPI('StopRenderCloud')
    } catch (e) {
      if (__DEV__) console.warn(e)
      this._status = RenderStatus.STOP
      throw e
    }
  }

  private async _fetchRenderUrl(options: FetchRenderUrlOptions) {
    this.status = RenderStatus.REQUEST_RENDER_URL
    try {
      const { url, order, width, height } = options
      const res = await fetch(`${url}/Renderers/Any/order`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ order, width, height }),
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
    this._renderer.SuperAPI('SetLogMode', enableLog)
    // 绑定全局事件代理器
    this._renderer.SuperAPI(
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
      this._renderer.SuperAPI('StartRenderCloud', url, 'keyboardnofn')
    } catch (e) {
      this.status = RenderStatus.LOAD_MODEL_FAILED
      throw e
    }
  }

  private _verifyStatus(
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

export function createDigm(...args: ConstructorParameters<typeof Digm>) {
  return new Digm(...args)
}

function getElementWidthAndHeight(el: Element) {
  return { width: el.clientWidth, height: el.clientHeight }
}
