import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type HeatMapPoint = {
  /**
   * 热力数据点的坐标 lng,lat
   */
  coord: string
  /**
   * 热力数据点的热力值, heatpoint_minvalue 和 heatpoint_maxvalue 之间的一个值
   */
  value: number
}

export type HeatMapIDOptions = {
  /**
   * 热力图 id
   */
  id: string
}

export type HeatMapDataOptions = {
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
   * 热力区域坐标(左上坐标 lng,lat)
   */
  leftupper_coord: string
  /**
   * 热力区域坐标(左下坐标 lng,lat)
   */
  leftlower_coord: string
  /**
   * 热力区域坐标(右下坐标 lng,lat)
   */
  rightlower_coord: string
  /**
   * 热力区域坐标(右上坐标 lng,lat)
   */
  rightupper_coord: string
  /**
   * 热力数据点
   */
  data: HeatMapPoint[]
}

export type HeatMapStyleOptions = {
  /**
   * 样式类型(1: 投影型, 贴合地面;  2:平面型)
   */
  heatmap_type: 1 | 2

  /**
   * 热力点笔刷直径(单位:米, 单个热力点覆盖直径)
   */
  brush_diameter: number
  /**
   * 热力点热力值范围最小值(1:绿色接近透明, 100:最红, 线性计算)
   */
  heatpoint_minvalue: number
  /**
   * 热力点热力值范围最大值
   */
  heatpoint_maxvalue: number
  /**
   * 热力点热力值范围最大值
   */
  gradient_setting: {
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
  }
}

export type AddHeatMapOptions = HeatMapIDOptions & HeatMapDataOptions & HeatMapStyleOptions

export type UpdateHeatMapCoordOptions = HeatMapIDOptions &
  HeatMapDataOptions & {
    /**
     * true: 追加热力图数据; false: 重建整个热力图数据
     */
    is_append: boolean
  }

export type UpdateHeatMapStyleOptions = HeatMapIDOptions & HeatMapStyleOptions

export type ColumnHeatMapStyleOptions = HeatMapStyleOptions & {
  /**
   * (单位:米), 柱状热力图单体宽度(此宽度同时受整个热力图范围大小影响;
   * 柱状热力图最多500x500个柱子,如果热力图整体范围长度,宽度/单体柱子宽度 <= 500,则采用单体柱子宽度;
   * 否则单体柱子宽度会自动反算一个合适的值)
   */
  columnar_width: number
  /**
   * 单体柱表达最小值的实际高度(单位:米)
   */
  columnar_min_height: number
  /**
   * 单体柱表达最大值的实际高度(单位:米)
   */
  columnar_max_height: number
}

export type AddColumnHeatMapOptions = HeatMapIDOptions &
  HeatMapDataOptions &
  ColumnHeatMapStyleOptions

export type UpdateColumnHeatMapCoordOptions = HeatMapIDOptions &
  HeatMapDataOptions & {
    /**
     * true: 追加热力图数据; false: 重建整个热力图数据
     */
    is_append: boolean
  }

export type UpdateColumnHeatMapStyleOptions = HeatMapIDOptions & ColumnHeatMapStyleOptions

export type SpaceHeatMapPoint = HeatMapPoint & {
  /**
   * 高度
   */
  coord_z: number
}

export type SpaceHeatMapDataOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定，坐标类型为 0 时传 ''
   */
  cad_mapkey: string
} & (
  | {
      /**
       * 点云热力图外观类型 box(方体)
       */
      shape_type: 'box'
      box_args: {
        /**
         * box(方体) 坐标(左上坐标 lng,lat)
         */
        leftupper_coord: string
        /**
         * box(方体) 坐标(左下坐标 lng,lat)
         */
        leftlower_coord: string
        /**
         * box(方体) 坐标(右下坐标 lng,lat)
         */
        rightlower_coord: string
        /**
         * box(方体) 坐标(右上坐标 lng,lat)
         */
        rightupper_coord: string
      }
    }
  | {
      /**
       * 点云热力图外观类型 cylinder(圆柱)
       */
      shape_type: 'cylinder'
      cylinder_args: {
        /**
         * cylinder(圆柱) 中心点坐标lng,lat
         */
        center_coord: string
      }
    }
  | {
      /**
       * 点云热力图外观类型 sphere(球)
       */
      shape_type: 'sphere'
      sphere_args: {
        /**
         * sphere(球) 中心点坐标lng,lat
         */
        center_coord: string
      }
    }
)

export type SpaceHeatMapStyleOptions = Pick<HeatMapStyleOptions, 'gradient_setting'> & {
  /**
   * 热力点热力值范围最小值(1:绿色接近透明, 100:最红, 线性计算)
   */
  point_minvalue: number
  /**
   * 热力点热力值范围最大值
   */
  point_maxvalue: number
  /**
   * box(方体), cylinder(圆柱) 高度(单位:米); sphere(球) 无效
   */
  height?: number
  /**
   * cylinder(圆柱), sphere(球) 直径(单位:米); box(方体) 无效
   */
  diameter?: number
}

export type AddSpaceHeatMapOptions = HeatMapIDOptions &
  SpaceHeatMapDataOptions &
  SpaceHeatMapStyleOptions

export type UpdateSpaceHeatMapCoordOptions = HeatMapIDOptions & SpaceHeatMapDataOptions

export type UpdateSpaceHeatMapStyleOptions = HeatMapIDOptions & SpaceHeatMapStyleOptions

export type RoadHeatMapColorDefine = {
  /**
   * 颜色级别
   */
  level: number
  /**
   * 颜色
   */
  color: string
}

export type RoadHeatMapPoint = {
  /**
   * 热力数据点的坐标 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 采用哪一级颜色
   */
  level: number
}

export type RoadHeatMapDataOptions = {
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
   * 热力数据点
   */
  points: RoadHeatMapPoint[]
}

export type RoadHeatMapStyleOptions = {
  /**
   * 宽度(单位:米)
   */
  width: number
  /**
   * 定义颜色组
   */
  roadheatmap_define: RoadHeatMapColorDefine[]
}

export type AddRoadHeatMapOptions = HeatMapIDOptions &
  RoadHeatMapDataOptions &
  RoadHeatMapStyleOptions

export type UpdateRoadHeatMapCoordOptions = HeatMapIDOptions &
  RoadHeatMapDataOptions & {
    /**
     * true: 追加路径热力图数据(注意顺序); false: 重建路径热力图数据
     */
    is_append: boolean
  }

export type UpdateRoadHeatMapStyleOptions = HeatMapIDOptions & RoadHeatMapStyleOptions

/**
 * 热力图功能
 */
export class HeatMap extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加区域热力图
   */
  addHeatMap(options: AddHeatMapOptions) {
    return promiseWrapper(this._superAPI, 'AddHeatMap', options) as Promise<FeatureResult>
  }

  /**
   * 删除区域热力图
   *
   * @enhance
   */
  removeHeatMap(options: HeatMapIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'heatmap' })
  }

  /**
   * 删除所有区域热力图
   *
   * @enhance
   */
  removeAllHeatMap() {
    return this._covering.removeAllCovering({ covering_type: 'heatmap' })
  }

  /**
   * 更新区域热力图数据点
   */
  updateHeatMapCoord(options: UpdateHeatMapCoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdateHeatMapCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新区域热力图样式
   */
  updateHeatMapStyle(options: UpdateHeatMapStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateHeatMapStyle', options) as Promise<FeatureResult>
  }

  /**
   * 添加柱状区域热力图
   */
  addColumnHeatMap(options: AddColumnHeatMapOptions) {
    return promiseWrapper(this._superAPI, 'AddColumnHeatMap', options) as Promise<FeatureResult>
  }

  /**
   * 删除区域热力图
   *
   * @enhance
   */
  removeColumnHeatMap(options: HeatMapIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'columnar_heatmap' })
  }

  /**
   * 删除所有区域热力图
   *
   * @enhance
   */
  removeAllColumnHeatMap() {
    return this._covering.removeAllCovering({ covering_type: 'columnar_heatmap' })
  }

  /**
   * 更新柱状热力图数据点
   */
  updateColumnHeatMapCoord(options: UpdateColumnHeatMapCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateColumnHeatMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新区域热力图样式
   */
  updateColumnHeatMapStyle(options: UpdateColumnHeatMapStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateColumnHeatMapStyle',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 添加点云热力图
   */
  addSpaceHeatMap(options: AddSpaceHeatMapOptions) {
    return promiseWrapper(this._superAPI, 'AddSpaceHeatMap', options) as Promise<FeatureResult>
  }

  /**
   * 删除点云热力图
   *
   * @enhance
   */
  removeSpaceHeatMap(options: HeatMapIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'pointcloud_heatmap' })
  }

  /**
   * 删除所有点云热力图
   *
   * @enhance
   */
  removeAllSpaceHeatMap() {
    return this._covering.removeAllCovering({ covering_type: 'pointcloud_heatmap' })
  }

  /**
   * 更新点云热力图数据点
   */
  updateSpaceHeatMapCoord(options: UpdateSpaceHeatMapCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateSpaceHeatMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新点云热力图样式
   */
  updateSpaceHeatMapStyle(options: UpdateSpaceHeatMapStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateSpaceHeatMapStyle',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 添加路径热力图
   */
  addRoadHeatMap(options: AddRoadHeatMapOptions) {
    return promiseWrapper(this._superAPI, 'AddRoadHeatMap', options) as Promise<FeatureResult>
  }

  /**
   * 删除路径热力图
   *
   * @enhance
   */
  removeRoadHeatMap(options: HeatMapIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'road_heatmap' })
  }

  /**
   * 删除所有路径热力图
   *
   * @enhance
   */
  removeAllRoadHeatMap() {
    return this._covering.removeAllCovering({ covering_type: 'road_heatmap' })
  }

  /**
   * 更新路径热力图数据点
   */
  updateRoadHeatMapCoord(options: UpdateRoadHeatMapCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateRoadHeatMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新路径热力图样式
   */
  updateRoadHeatMapStyle(options: UpdateRoadHeatMapStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateRoadHeatMapStyle',
      options,
    ) as Promise<FeatureResult>
  }
}
