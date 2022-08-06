import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type PathPoint = {
  /**
   * 坐标 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
}

export type PathType =
  | 'none'
  | 'fit_solid'
  | 'solid'
  | 'arrow'
  | 'arrow_dot'
  | 'dashed_dot'
  | 'arrow_dashed'
  | 'flash'
  | 'scan_line'
  | 'brimless_arrow'
  | 'railway'
  | 'round_pipe'
  | 'square_pipe'
  | 'dashed_line'

export type PathAdvancedSetting = {
  /**
   * 设置路径边角的平滑度(extremelyHigh:极高; high:高; middle:中; low:低;)
   */
  smoothnessOfCorners: 'extremelyHigh' | 'high' | 'middle' | 'low'
}

export type PathIDOptions = {
  /**
   * 路径 id
   */
  id: string
}

export type AddPathOptions = PathIDOptions &
  Omit<UpdatePathCoordOptions, 'is_append'> &
  UpdatePathStyleOptions & {
    /**
     * 高级设置
     */
    advancedSetting: PathAdvancedSetting
  }

export type UpdatePathCoordOptions = PathIDOptions & {
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
   * 路径点位
   */
  points: PathPoint[]
  /**
   * true: 追加路径数据(注意顺序); false: 重建路径数据
   */
  is_append: boolean
}

export type UpdatePathStyleOptions = PathIDOptions & {
  /**
   * 样式类型
   */
  type: PathType
  /**
   * 颜色(HEX颜色值, 空值即透明; railway类型无效, 默认黑白色)
   */
  color: string
  /**
   * 覆盖物移动经过路径颜色(HEX颜色值)
   */
  pass_color: string
  /**
   * 宽度(单位:米, 圆柱直径或方柱边长)
   */
  width: number
}

export type ModifyPathCoordOptions = PathIDOptions & {
  /**
   * 坐标点索引
   */
  index: number
  /**
   * 操作类型: insert 添加; modify 修改; delete 删除[coord_z_type, points字段可省略]
   */
  operation: 'insert' | 'modify' | 'delete'
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type?: 0 | 1 | 2
  /**
   * 路径点位
   */
  points?: PathPoint[]
}

export class Path extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加路径
   *
   * 创建多条路径或坐标点过多时, 创建需要花费一定的时间, 在创建完成时, 即未收到success前不要执行删除等操作
   */
  addPath(options: AddPathOptions) {
    return promiseWrapper(this._superAPI, 'AddPath', options) as Promise<FeatureResult>
  }

  /**
   * 删除路径
   *
   * @enhance
   */
  removePath(options: PathIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'path' })
  }

  /**
   * 删除所有路径
   *
   * @enhance
   */
  removeAllPath() {
    return this._covering.removeAllCovering({ covering_type: 'path' })
  }

  /**
   * 更新路径数据点
   */
  updatePathCoord(options: UpdatePathCoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdatePathCoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新路径样式
   */
  updatePathStyle(options: UpdatePathStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdatePathStyle', options) as Promise<FeatureResult>
  }

  /**
   * 修改路径数据点
   */
  modifyPathCoord(options: ModifyPathCoordOptions) {
    return promiseWrapper(this._superAPI, 'ModifyPathCoord', options) as Promise<FeatureResult>
  }
}
