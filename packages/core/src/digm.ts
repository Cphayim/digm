import CloudRenderer from '51superapi'

export enum RenderStatus {
  InitRenderer = 11, // 初始化渲染器
  InitRendererFailed = 12, // 初始化渲染器失败
  RequestRenderUrl = 21, // 请求渲染地址
  RequestRenderUrlFailed = 22, // 请求渲染地址失败
  LoadModel = 31, // 加载模型
  LoadModelFailed = 32, // 加载模型失败
  RenderModel = 41, // 渲染模型
  RenderModelFailed = 42, // 渲染模型失败
  Rendered = 43, // 渲染完成
  Stop = 50, // 停止渲染
}

export default class Digm {
  private _cloudRenderer: any
  private _status = RenderStatus.InitRenderer

  constructor(idOrElement: string | Element) {
    let id: string
    if (idOrElement instanceof Element) {
      id = idOrElement.id = Math.random().toString(2)
    } else {
      if (!document.querySelector(`#${idOrElement}`))
        throw new Error(`[Error] Element #${idOrElement}} is not exists.`)
    }
    this._cloudRenderer = new CloudRenderer(id, 0)
  }

  get status() {
    return this._status
  }

  async startEngine() {
    //
  }

  async stopEngine() {
    //
  }
}
