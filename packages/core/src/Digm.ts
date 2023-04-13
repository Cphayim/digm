import CloudRenderer from '51superapi'
import { sleep } from '@cphayim-digm/shared'

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
  Widget,
  POI,
  StrategyMap,
  Viewshed,
  CoordCalc,
  HighlightArea,
  SceneGeoConverter,
  ChinaMap,
  SceneEffect,
  TDText,
} from './features'

// 渲染地址转换器
export type RenderUrlTransformer = (renderUrl: string, baseUrl: string) => string

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

  /**
   * 转换渲染地址
   *
   * 如果传入 `true` 或 `RenderUrlTransformer`，将会对渲染服务器返回的渲染地址进行转换
   *
   * 例如前端通过请求网关进行转发的场景 10.1.1.1 (nginx) -> 192.168.0.100 (渲染服务器)，
   * 此时渲染服务器将返回例如 http://192.168.0.100:8891/{render-token} 的渲染地址，这会导致后续的渲染流程失败
   *
   * 当传入 `true` 时：
   * 该选项解析 `url` 并使用其 `protocol` 和 `hostname` 将渲染地址转换为 `http://10.1.1.1:8891/{render-token}`
   *
   * 也可以传入 `RenderUrlTransformer` 来自定义转换逻辑
   */
  transformer?: boolean | RenderUrlTransformer
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
  private _el!: Element

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
  /**
   * 场景镜头
   */
  public readonly sceneCamera: SceneCamera = new SceneCamera(this)
  /**
   * 场景编辑
   */
  public readonly sceneEdit: SceneEdit = new SceneEdit(this)
  /**
   * 剖切体
   */
  public readonly section: Section = new Section(this)
  /**
   * 覆盖物
   */
  public readonly covering: Covering = new Covering(this)
  /**
   * 迁徙图
   */
  public readonly migrationMap: MigrationMap = new MigrationMap(this)
  /**
   * 热力图
   */
  public readonly heatMap: HeatMap = new HeatMap(this)
  /**
   * 栅格图
   */
  public readonly raster: Raster = new Raster(this)
  /**
   * 路径
   */
  public readonly path: Path = new Path(this)
  /**
   * 粒子效果
   */
  public readonly particleEffect: ParticleEffect = new ParticleEffect(this)
  /**
   * 灯光行为
   */
  public readonly light: Light = new Light(this)
  /**
   * 区域轮廓
   */
  public readonly range: Range = new Range(this)
  /**
   * 工具控件
   */
  public readonly widget: Widget = new Widget(this)
  /**
   * POI 点
   */
  public readonly POI: POI = new POI(this)
  /**
   * 战略图
   */
  public readonly strategyMap: StrategyMap = new StrategyMap(this)
  /**
   * 可视域
   */
  public readonly viewshed: Viewshed = new Viewshed(this)
  /**
   * 二维坐标计算
   */
  public readonly coordCalc: CoordCalc = new CoordCalc(this)
  /**
   * 高亮区域
   */
  public readonly highlightArea: HighlightArea = new HighlightArea(this)
  /**
   * 场景坐标转换
   */
  public readonly sceneGeoConverter: SceneGeoConverter = new SceneGeoConverter(this)
  /**
   * 中国地图
   */
  public readonly chinaMap: ChinaMap = new ChinaMap(this)
  /**
   * 场景特效
   */
  public readonly sceneEffect: SceneEffect = new SceneEffect(this)
  /**
   * 3D 文字
   */
  public readonly TDText: TDText = new TDText(this)

  // enhance features...
  /**
   * 建筑物编辑
   * @enhance
   */
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

      return options.transformer
        ? transformRenderUrl(data.url, options.url, options.transformer)
        : data.url
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

/**
 * Transform render url
 */
export function transformRenderUrl(
  resRenderUrl: string,
  reqUrl: string,
  transformer: boolean | RenderUrlTransformer,
) {
  if (typeof transformer !== 'function') {
    transformer = defaultTransformer
  }
  return transformer(resRenderUrl, reqUrl)
}

export function defaultTransformer(renderUrl: string, baseUrl: string) {
  const { protocol, hostname } = new URL(baseUrl)
  const { port, pathname } = new URL(renderUrl)
  return `${protocol}//${hostname}:${port}${pathname}`
}
