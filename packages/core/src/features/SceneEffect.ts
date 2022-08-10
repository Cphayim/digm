import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type AddEffectOptions = AddEffectItem | AddEffectItem

export type AddEffectItem = UpdateEffectCoordOptions &
  UpdateEffectStyleItem & {
    type: EffectType
  }

export type UpdateEffectCoordOptions = {
  /**
   * effect_id
   */
  id: string
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 坐标点 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
}

export type UpdateEffectStyleOptions = {
  /**
   * effect_id
   */
  id: string
  /**
   * 样式类型
   */
  type?: EffectType
} & UpdateEffectStyleItem

export type UpdateEffectStyleItem = {
  /**
   * 直径(单位:米)
   */
  scale: 35
  /**
   * 俯仰角, 参考(-90~90)
   */
  pitch: string
  /**
   * 翻滚角, 参考(0~360)
   */
  roll: string
  /**
   * 偏航角, 参考(0正北, 0~360)
   */
  yaw: string
  /**
   * 文本内容, 富文本内容
   */
  title_text: string | string[]
  /**
   * 文本偏移(单位:米; 东西向为x轴进行偏移)
   */
  title_offset: string
  /**
   * 顶部文字是否跟踪朝向摄像机(注: true优先, pitch, roll, yaw 无效)
   */
  title_face_to_camera: boolean
  /**
   * 顶部文字排列方向(true: 纵向, false: 横向)
   */
  title_text_portrait: boolean
}

export type EffectType =
  | 'flame'
  | '3dmark_build_loop'
  | ' 3dmark_build'
  | ' 3dmark_camera_loop'
  | ' 3dmark_camera'
  | '3dmark_sign'
  | ' 3dmark_warning'
  | 'title_only'
  | 'vehicle_car'
  | 'vehicle_car_black'
  | 'vehicle_car_white'
  | 'vehicle_car_taxi'
  | 'shield'
  | 'fire'
  | 'arrow'
  | 'alarm'
  | 'circle'
  | ' pyramid'
  | ' marker_cube'
  | ' marker_pyramid'
  | ' marker_site'
  | ' marker_cone'
  | ' tool_wrench'
  | ' weather_tornado'
  | ' circle_glass'
  | ' circle_compass'
  | ' circle_outside'
  | ' circle_inside'
  | ' circle_scan'
  | ' circle_diffuse'
  | ' circle_area'
  | ' circle_area2'
  | ' circle_flash'

/**
 * 场景特效
 */
export class SceneEffect extends BaseFeature {
  /**
   * 添加场景特效
   */
  addEffect(options: AddEffectOptions) {
    return promiseWrapper(this._superAPI, 'AddEffect', options) as Promise<FeatureResult>
  }

  /**
   * 更新场景特效数据点
   */
  updateEffectCoord(options: UpdateEffectCoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdateEffectCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新场景特效样式
   */
  updateEffectStyle(options: UpdateEffectStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateEffectStyle', options) as Promise<FeatureResult>
  }
}
