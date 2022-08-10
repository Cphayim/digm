import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type addHighlightAreaOptions = updateHighlightAreaCoordOptions &
  updateHighlightAreaStyleOptions

export type pointsItem = {
  /**
   * 坐标点 lng,lat; 注:相邻点坐标不能重复
   */
  coord: string
}

export type updateHighlightAreaCoordOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 坐标
   */
  points: pointsItem[]
}

export type updateHighlightAreaStyleOptions = {
  /**
   * 高亮区域颜色(HEX颜色, 默认为原色高亮)
   */
  color: string
  /**
   * 外部颜色(HEX颜色)
   */
  exterior_color: string
  /**
   * 外部勾边颜色(HEX颜色)
   */
  exterior_outline_color: string
  /**
   * 透明度(0, 100)
   */
  exterior_transparency: number
  /**
   * 饱和度(-100, 100)
   */
  exterior_saturation: number
  /**
   * 亮度(-100, 100)
   */
  exterior_brightness: string
  /**
   * 对比度(-100, 100)
   */
  exterior_contrast: string
}

/**
 * 高亮区域
 */
export class HighlightArea extends BaseFeature {
  /**
   * 添加高亮区域
   */
  addHighlightArea(options: addHighlightAreaOptions) {
    return promiseWrapper(this._superAPI, 'AddHighlightArea', options) as Promise<FeatureResult>
  }

  /**
   * 更新高亮区域数据点
   */
  updateHighlightAreaCoord(options: updateHighlightAreaCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateHighlightAreaCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新高亮区域样式
   */
  updateHighlightAreaStyle(options: updateHighlightAreaStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateHighlightAreaStyle',
      options,
    ) as Promise<FeatureResult>
  }
}
