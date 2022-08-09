import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type LightIDOptions = {
  /**
   * 场景特效 id
   */
  id: string
}

export type LightDataOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定，坐标类型为 0 时传 ''
   */
  cad_mapkey: string
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标 lng,lat
   */
  coord: string
}

export type LightStyleOptions = {
  /**
   * 俯仰角(-90~90)
   */
  pitch: number
  /**
   * 偏航角(0正北, 0~360)
   */
  yaw: number
  /**
   * 灯光强度(0~100)
   */
  intensity: number
  /**
   * 灯光颜色(HEX颜色值)
   */
  color: number
  /**
   * 灯光张角(0~50)
   */
  angle: number
  /**
   * 灯光衰减长度(单位:米)
   */
  attenuation: number
  /**
   * 是否开启阴影(true/false)
   */
  shadows: boolean
  /**
   * 是否开启烟雾(true/false)
   */
  haze: boolean
  /**
   * 烟雾强度(0~100)
   */
  haze_Intensity: number
}

export type AddLightOptions = LightDataOptions & LightDataOptions & LightStyleOptions

export type UpdateLightCoordOptions = LightDataOptions & LightDataOptions

export type UpdateLightStyleOptions = LightDataOptions & LightStyleOptions

/**
 * 灯光行为
 */
export class Light extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加灯光
   */
  addLight(options: AddLightOptions) {
    return promiseWrapper(this._superAPI, 'AddLight', options) as Promise<FeatureResult>
  }

  /**
   * 删除灯光
   *
   * @enhance
   */
  removeLight(options: LightIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'scene_effect' })
  }

  /**
   * 删除所有灯光
   *
   * @enhance
   */
  removeAllLight() {
    return this._covering.removeAllCovering({ covering_type: 'scene_effect' })
  }

  /**
   * 更新灯光数据点
   */
  updateLightCoord(options: UpdateLightCoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdateLightCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新灯光样式
   */
  updateLightStyle(options: UpdateLightStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateLightStyle', options) as Promise<FeatureResult>
  }
}
