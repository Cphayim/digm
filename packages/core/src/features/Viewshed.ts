import { BaseFeature } from './BaseFeature'
import { promiseWrapper } from './utils'
import type { FeatureResult } from './BaseFeature'
import type { CoordType, CoordZType } from './MigrationMap'

export type ShowHideAllViewshedOptions = {
  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}

export type UpdateViewshedCoordOptions = {
  id: string
  coord_type: CoordType
  cad_mapkey: string
  coord: string
  coord_z: number
  coord_z_type: CoordZType
}

export type UpdateViewshedStyleOptions = {
  id: string
  /**
   * 可视域水平视角范围(0~150)
   */
  xFOV: number
  /**
   * 可视域垂直视角范围(0~150)
   */
  yFOV: number
  /**
   * 半径(单位:米)
   */
  radius: number
  /**
   * 可视域俯仰角(-90~90)
   */
  pitch: number
  /**
   * 可视域偏航角(0正东, 0~360)
   */
  yaw: number
  /**
   * 可视区域颜色(HEXA颜色值)
   */
  visible_color: string
  /**
   * 遮挡区域颜色(HEXA颜色值)
   */
  invisible_color: string
}

export type AddViewshedOptions = UpdateViewshedCoordOptions & Omit<UpdateViewshedStyleOptions, 'id'>

export class Viewshed extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加可视域
   *
   * 向3D世界中添加可视域; 注: 创建多个可视域时, 创建需要花费一定的时间, 在创建完成时, 即未收到success前不要执行删除等操作
   */
  addViewshed(options: AddViewshedOptions) {
    return promiseWrapper(this._superAPI, 'AddViewshed', options) as Promise<FeatureResult>
  }

  /**
   * 更新可视域数据点
   *
   * 更新3D世界中可视域数据点; 注: 更新多个可视域时, 更新需要花费一定的时间, 在更新完成时, 即未收到success前不要执行删除等操作
   */
  updateViewshedCoord(options: UpdateViewshedCoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdateViewshedCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新可视域样式
   */
  updateViewshedStyle(options: UpdateViewshedStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateViewshedStyle', options) as Promise<FeatureResult>
  }

  /**
   * 显示/隐藏全部可视域
   */
  showHideAllViewshed(options: ShowHideAllViewshedOptions) {
    return promiseWrapper(this._superAPI, 'ShowHideAllViewshed', options) as Promise<FeatureResult>
  }

  /**
   * 移除指定viewshed
   *
   * @enhance
   */
  removeViewshedById(id: string) {
    return this._covering.removeCovering({ id, covering_type: 'viewshed' })
  }

  /**
   * 移除所有viewshed
   *
   * @enhance
   */
  removeAllViewshed() {
    return this._covering.removeAllCovering({ covering_type: 'viewshed' })
  }
}
