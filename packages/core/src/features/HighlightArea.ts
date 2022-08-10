import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'
import type { geojsonOptions } from './Covering'
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

export type AddShpHighlightAreaOptions = updateHighlightAreaStyleOptions &
  UpdateShpHighlightAreaCoordOptions

export type UpdateShpHighlightAreaCoordOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 本地地址一: "file:///D:/xxx/shapData.shp", D: 云渲染所在盘符
   * 本地地址二: "path:/UserData/shapData.shp", 资源由云渲染后台管理, 云渲染4.3.1以上版本
   */
  shp_path: string
}

export type addGeoHighlightAreaOptions = updateHighlightAreaStyleOptions &
  updateGeoHighlightAreaCoordOptions

export type updateGeoHighlightAreaCoordOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 支持json或文件形式、二选一
   */
  geojson: geojsonOptions | geojsonOptions[]
}

/**
 * 高亮区域
 */
export class HighlightArea extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }
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

  /**
   * 添加Shp高亮区域
   */
  addShpHighlightArea(options: AddShpHighlightAreaOptions) {
    return promiseWrapper(this._superAPI, 'AddShpHighlightArea', options) as Promise<FeatureResult>
  }

  /**
   * 更新Shp高亮区域数据点
   */
  updateShpHighlightAreaCoord(options: UpdateShpHighlightAreaCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateShpHighlightAreaCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 添加GeoJSON高亮区域
   */
  addGeoHighlightArea(options: addGeoHighlightAreaOptions) {
    return promiseWrapper(this._superAPI, 'AddGeoHighlightArea', options) as Promise<FeatureResult>
  }

  /**
   * 更新GeoJSON高亮区域数据点
   */
  updateGeoHighlightAreaCoord(options: updateGeoHighlightAreaCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateGeoHighlightAreaCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 删除高亮区域
   *
   * @enhance
   */
  removeHighlightArea(options: { id: string }) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'highlight_area' })
  }

  /**
   * 删除所有高亮区域
   *
   * @enhance
   */
  removeAllHighlightArea() {
    return this._covering.removeAllCovering({ covering_type: 'highlight_area' })
  }
}
