import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type RangePoint = {
  /**
   * 坐标点 lng,lat; 注:相邻点坐标不能重复
   */
  coord: string
}

export type RangeIDOptions = {
  /**
   * 区域轮廓 id
   */
  id: string
}

export type RangeDataOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * CAD基准点Key值, 项目中约定，坐标类型为 0 时传 ''
   */
  cad_mapkey: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标点 lng,lat; 注:相邻点坐标不能重复
   */
  points: RangePoint[]
  /**
   * 内环轮廓数据点,可选; 注①: 区域中含有内环"inner_points"时"stroke_weight"无效; 注②:相邻点坐标不能重复
   */
  inner_points?: {
    points: RangePoint[]
  }[]
}

export type RangeStyleOptions = {
  /**
   * 样式类型
   */
  type:
    | 'none'
    | 'wave'
    | 'loop_line'
    | 'grid'
    | 'stripe'
    | 'bias'
    | 'box_wave_line'
    | 'box_wave'
    | 'box_solid_line'
    | 'box_solid'
  /**
   * 轮廓颜色(HEX颜色值)
   */
  color: string
  /**
   * 围栏高度(单位:米)
   */
  range_height: number
  /**
   * 底部轮廓线宽度(单位:米; 注: 区域中含有内环"inner_points"时无效)
   */
  stroke_weight: number
  /**
   * 底部区域填充类型
   */
  fill_area: 'none' | 'solid' | 'solid2' | 'block' | 'dot' | 'dot2' | 'dot3' | 'dash_line' | 'radar'
}

export type AddRangeOptions = RangeIDOptions & RangeDataOptions & RangeStyleOptions

export type UpdateRangeCoordOptions = RangeIDOptions & RangeDataOptions

export type UpdateRangeStyleOptions = RangeIDOptions & RangeStyleOptions

export type AddShpRangeOptions = RangeIDOptions &
  Omit<RangeDataOptions, 'points' | 'inner_points'> &
  RangeStyleOptions & {
    /**
     * shp 文件路径
     */
    shp_path: string
  }

export type AddGeoRangeOptions = RangeIDOptions &
  Omit<RangeDataOptions, 'points' | 'inner_points'> &
  RangeStyleOptions & {
    /**
     * 指定geojson中的id字段
     */
    id_field_name: string
    /**
     * 支持json或文件形式、二选一
     */
    geojson: any
  }

/**
 * 区域轮廓
 */
export class Range extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加区域轮廓
   */
  addRange(options: AddRangeOptions) {
    return promiseWrapper(this._superAPI, 'AddRange', options) as Promise<FeatureResult>
  }

  /**
   * 删除区域轮廓
   *
   * @enhance
   */
  removeRange(options: RangeIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'range' })
  }

  /**
   * 删除所有区域轮廓
   *
   * @enhance
   */
  removeAllRange() {
    return this._covering.removeAllCovering({ covering_type: 'range' })
  }

  /**
   * 更新区域轮廓数据点
   */
  updateRangeCoord(options: UpdateRangeCoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdateRangeCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新区域轮廓样式
   */
  updateRangeStyle(options: UpdateRangeStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateRangeStyle', options) as Promise<FeatureResult>
  }

  /**
   * Shp高亮区域
   */
  addShpRange(options: AddShpRangeOptions) {
    return promiseWrapper(this._superAPI, 'AddShpRange', options) as Promise<FeatureResult>
  }

  /**
   * 添加GeoJSON区域轮廓
   */
  addGeoRange(options: AddGeoRangeOptions) {
    return promiseWrapper(this._superAPI, 'AddGeoRange', options) as Promise<FeatureResult>
  }
}
