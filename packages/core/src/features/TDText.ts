import { BaseFeature } from './BaseFeature'
import { promiseWrapper } from './utils'
import type { FeatureResult } from './BaseFeature'
import type { CoordType, CoordZType, StyleType } from './MigrationMap'

export type Add3DTextOptions = Update3DTextCoordOptions & StyleOptions

export type Update3DTextCoordOptions = {
  id: string
  coord_type: CoordType
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  coord_z_type: CoordZType
  /**
   * 坐标 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
}

export type Update3DTextStyleOptions = StyleOptions & { id: string }

export type StyleOptions = {
  /**
   * 文字内容
   */
  text: string
  /**
   * 颜色(HEX颜色值)
   */
  color: string
  /**
   * 字体大小(单位:米)
   */
  size: number
  /**
   * 厚度(单位:米)
   */
  thickness: number
  /**
   * 样式(plain; reflection; metal)
   */
  type: 'plain' | 'reflection' | 'metal'
  /**
   * 轮廓(单位:百分比), 取值范围[0~1]
   */
  outline: number
  /**
   * 纵向(true/false)
   */
  portrait: boolean
  /**
   * 间距(单位:米)
   */
  space: number
  /**
   * 闪烁动效(单位:秒)
   */
  flash: number
  /**
   * 反弹动效(单位:米/秒)
   */
  bounce: number
  /**
   * 俯仰角(-90~90)
   */
  pitch: string
  /**
   * 偏航角(0正北, 0~360)
   */
  yaw: string
  /**
   * 文字是否跟踪朝向摄像机(注:true优先, pitch, yaw 无效)
   */
  face_to_camera: boolean
}

export class TDText extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加3D文字
   *
   * 向3D世界中添加3D文字; 注: 创建多个3D文字时, 创建需要花费一定的时间, 在创建完成时, 即未收到success前不要执行删除等操作
   */
  add3DText(options: Add3DTextOptions) {
    return promiseWrapper(this._superAPI, 'Add3DText', options) as Promise<FeatureResult>
  }

  /**
   * 更新3D文字数据点
   *
   * 更新3D世界中一个3D文字数据点; 注: 更新多个3D文字时, 更新需要花费一定的时间, 在更新完成时, 即未收到success前不要执行删除等操作
   */
  update3DTextCoord(options: Update3DTextCoordOptions) {
    return promiseWrapper(this._superAPI, 'Update3DTextCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新3D文字样式
   *
   */
  update3DTextStyle(options: Update3DTextStyleOptions) {
    return promiseWrapper(this._superAPI, 'Update3DTextStyle', options) as Promise<FeatureResult>
  }

  /**
   * 移除指定3D文字样式
   *
   * @enhance
   */
  remove3DTextById(id: string) {
    return this._covering.removeCovering({ id, covering_type: '3d_text' })
  }

  /**
   * 移除所有3D文字样式
   *
   * @enhance
   */
  removeAll3DText() {
    return this._covering.removeAllCovering({ covering_type: '3d_text' })
  }
}
