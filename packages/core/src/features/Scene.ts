import { promiseWrapper } from './utils'

interface CameraInfoOptions {
  /**
   * 场景镜头id(由AddCamera添加); 置空时获取镜头当前信息
   */
  camera_id: string
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
}

export class Scene {
  private _superAPI: any
  constructor(cloudRenderer: any) {
    this._superAPI = cloudRenderer.SuperAPI
  }

  getCameraInfo(options: CameraInfoOptions) {
    return promiseWrapper(this._superAPI, 'GetCameraInfo', options) as Promise<number>
  }
}

// 功能名称 入参? 回调函数?
