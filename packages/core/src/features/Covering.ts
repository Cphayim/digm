import { promiseWrapper } from './utils'
import type { FeatureResult } from './BaseFeature'
import { BaseFeature } from './BaseFeature'

export type CoveringType =
  | 'poi'
  | 'path'
  | 'raster'
  | 'heatmap'
  | 'columnar_heatmap'
  | 'pointcloud_heatmap'
  | 'road_heatmap'
  | 'migration_map'
  | 'strategy_map'
  | 'range'
  | 'circular_range'
  | 'highlight_area'
  | 'viewshed'
  | 'scene_effect'
  | 'sectioning'
  | 'light'
  | '3d_text'

export type ShowHideCoveringOptions = {
  /**
   * 覆盖物id
   */
  id: string | string[]
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType

  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}

export type ShowHideAllCoveringOptions = {
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType[] | CoveringType
  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}

export type ShowHideCoveringResult = FeatureResult<{
  /**
   * 覆盖物id
   */
  id: string
}>

export type FocusCoveringOptions = {
  /**
   * 覆盖物id
   */
  id: string | string[]
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType

  /**
   * 距离(单位:米), 默认20米
   */
  distance: number
}

export type FocusCoveringResult = {
  /**
   * 覆盖物id
   */
  id: string

  cost_time: string
}

export type RemoveCoveringOptions = {
  /**
   * 覆盖物id
   */
  id: string | string[]
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType
}

export type FocusAllCoveringOptions = {
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType
}

export type SimClickCoveringOptions = {
  /**
   * 覆盖物id
   */
  id: string
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType
  /**
   * 覆盖物是否被选中
   */
  selected_state: boolean
}

export type SetCoveringClickStyleOptions = {
  /**
   * 沟边颜色(HEX颜色, 空值即透明)
   */
  outline_color: string
  /**
   * 填充颜色(HEX颜色, 空值即透明)
   */
  fill_color: string
  /**
   * 呼吸强度(0~1; 0:不呼吸, 1:呼吸强度最高)
   */
  breathing: number
}

export type CoordPoint = {
  /**
   * 坐标 lng,lat
   */
  coord: string
}

export type clipCoveringOptions = {
  /**
   * 覆盖物id
   */
  id: string | string[]
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType
  /**
   * false: 保留裁剪区域; true: 不保留裁剪区域
   */
  invert: boolean
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 坐标点 lng,lat; 注:相邻点坐标不能重复
   */
  points: CoordPoint[]
}

export type clipCoveringByShpOptions = {
  /**
   * 覆盖物id
   */
  id: string | string[]
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType
  /**
   * false: 保留裁剪区域; true: 不保留裁剪区域
   */
  invert: boolean
  /**
   * 本地地址一: "file:///D:/xxx/shapData.shp", D: 云渲染所在盘符
    本地地址二: "path:/UserData/shapData.shp", 资源由云渲染后台管理, 云渲染4.3.1以上版本
   */
  shp_path: string
}

export type geojsonOptions = {
  type: string
  name: string
  crs: {
    type: string
    properties: {
      name: string
    }
  }
  features: {
    type: string
    properties: {
      id: string
    }
    geometry: {
      type: string
      coordinates: [string, string][][]
    }
  }[]
}

export type clipCoveringByGeoOptions = {
  /**
   * 被裁剪覆盖物id
   */
  id: string
  /**
   * 覆盖物类型
   */
  covering_type: CoveringType
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * false: 保留裁剪区域; true: 不保留裁剪区域
   */
  invert: boolean
  /**
   * 指定geojson中的id字段
   */
  id_field_name?: number
  /**
   * 支持json或文件形式、二选一
支持本地地址一: "file:///D:/xxx/shapData.shp", D: 云渲染所在盘符
支持本地地址二: "path:/UserData/shapData.shp", 资源由云渲染后台管理, 云渲染4.3.1以上版
   */
  geojson: geojsonOptions | string
}

export type activeSuperApiGizmoOptions = {
  /**
   * 覆盖物id (sectioning: 剖切体, id选填)
   */
  id: string
  /**
   * 覆盖物类型(poi, viewshed, scene_effect, sectioning, aes_object)
   */
  covering_type: 'poi' | 'viewshed' | 'scene_effect' | 'sectioning' | 'aes_object'
  /**
   * Translation:移动; Rotation:旋转; Scale:缩放(注意gizmo_type异同)
   */
  gizmo_type: 'Translation' | 'Rotation' | ' Scale'
}

export type resultItem = {
  id: string
  apiName: string
  name: string
  outlineI: string
}

export type GetCustomizeApiResult = FeatureResult & {
  result: resultItem[]
  [key: string]: any
}

export type runCustomizeApiArgstem = {
  status: string
  funcName: string
  func_name: string
  guid: string
  success: boolean
  args: {
    id: string
    cost_time: string
  }
}

export type RunCustomizeApiResult = FeatureResult & {
  runCustomizeApiArgs: runCustomizeApiArgstem
}

export class Covering extends BaseFeature {
  /**
   * 显示/隐藏指定类型的覆盖物
   */
  showHideCovering(options: ShowHideCoveringOptions) {
    return promiseWrapper(
      this._superAPI,
      'ShowHideCovering',
      options,
    ) as Promise<ShowHideCoveringResult>
  }

  /**
   * 显示/隐藏指定类型的全部覆盖物
   */
  showHideAllCovering(options: ShowHideAllCoveringOptions) {
    return promiseWrapper(this._superAPI, 'ShowHideAllCovering', options) as Promise<FeatureResult>
  }

  /**
   * 镜头FOCUS至指定类型的覆盖物
   */
  focusCovering(options: FocusCoveringOptions) {
    return promiseWrapper(this._superAPI, 'FocusCovering', options) as Promise<FocusCoveringResult>
  }

  /**
   * 镜头FOCUS至全部指定类型的覆盖物
   */
  focusAllCovering(options: FocusAllCoveringOptions) {
    return promiseWrapper(this._superAPI, 'FocusAllCovering', options) as Promise<FeatureResult>
  }

  /**
   * 删除指定类型的覆盖物
   */
  removeCovering(options: RemoveCoveringOptions) {
    return promiseWrapper(this._superAPI, 'RemoveCovering', options) as Promise<FocusCoveringResult>
  }

  /**
   * 删除全部指定类型覆盖物
   */
  removeAllCovering(
    options: FocusAllCoveringOptions & { covering_type: CoveringType | CoveringType[] },
  ) {
    return promiseWrapper(
      this._superAPI,
      'RemoveAllCovering',
      options,
    ) as Promise<FocusCoveringResult>
  }

  /**
   * 模拟指定类型的覆盖物点击
   */
  simClickCovering(options: SimClickCoveringOptions) {
    return promiseWrapper(
      this._superAPI,
      'SimClickCovering',
      options,
    ) as Promise<ShowHideCoveringResult>
  }

  /**
   * 设置覆盖物点击样式
   */
  setCoveringClickStyle(options: SetCoveringClickStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'SetCoveringClickStyle',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 裁剪覆盖物
   */
  clipCovering(options: clipCoveringOptions) {
    return promiseWrapper(
      this._superAPI,
      'ClipCovering',
      options,
    ) as Promise<ShowHideCoveringResult>
  }

  /**
   * Shp裁剪覆盖物
   */
  clipCoveringByShp(options: clipCoveringByShpOptions) {
    return promiseWrapper(
      this._superAPI,
      'ClipCoveringByShp',
      options,
    ) as Promise<ShowHideCoveringResult>
  }

  /**
   * GeoJson裁剪覆盖物
   */
  clipCoveringByGeo(options: clipCoveringByGeoOptions) {
    return promiseWrapper(
      this._superAPI,
      'ClipCoveringByGeo',
      options,
    ) as Promise<ShowHideCoveringResult>
  }

  /**
   * 获取自定义事件ID列表
   */
  getCustomizeApi() {
    return promiseWrapper(this._superAPI, 'GetCustomizeApi') as Promise<GetCustomizeApiResult>
  }

  /**
   * 运行自定义事件
   */
  runCustomizeApi(options: string[]) {
    return promiseWrapper(
      this._superAPI,
      'RunCustomizeApi',
      options,
    ) as Promise<RunCustomizeApiResult>
  }

  /**
   * 激活覆盖物Gizmo模式
   */
  activeSuperApiGizmo(options: activeSuperApiGizmoOptions) {
    return promiseWrapper(this._superAPI, 'ActiveSuperApiGizmo', options) as Promise<FeatureResult>
  }

  /**
   *退出覆盖物Gizmo模式
   */
  deactiveSuperApiGizmo() {
    return promiseWrapper(this._superAPI, 'DeactiveSuperApiGizmo') as Promise<FeatureResult>
  }
}
