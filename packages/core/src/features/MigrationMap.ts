import { BaseFeature } from './BaseFeature'
import { promiseWrapper } from './utils'

import type { FeatureResult } from './BaseFeature'

/**
 * 坐标类型
 * 0：经纬度坐标
 * 1：cad坐标
 */
export type CoordType = 0 | 1

/**
 * 坐标高度类型
 * 0： 相对于3D世界表面
 * 1： 相对于3D世界地面
 * 2： 相对于3D世界海拔
 */
export type CoordZType = 0 | 1 | 2

/**
 * 样式类型
 * 1：波浪线型
 * 2：箭头型
 * 3：射线
 * 4：烟花
 * 5：流光
 */
export type StyleType = 1 | 2 | 3 | 4 | 5

export type UpdateCoordTargetData = {
  /**
   * 目标点坐标 lng,lat
   */
  target_coord: string
  /**
   * 目标点高度(单位:米)
   */
  target_coord_z: number
}

export type UpdateStyleTargetData = {
  /**
   * 目标点标志直径(单位:米)
   */
  mark_size: number
  /**
   * 目标点颜色(HEX颜色值)
   */
  mark_color: string
  /**
   * 连线宽度(单位:米)(注:样式类型 type:3时, line_width参数为连线数量, 范围 5 ~ 100)
   */
  line_width: number
  /**
   * 连线颜色(HEX颜色值)
   */
  line_color: string
  /**
   * 连线曲度调节(取值范围 -1 ~ 1, 0为默认曲度, 此值越小曲线越平, 反之曲线越陡峭)
   */
  curvature: number
}

export type TargetData = UpdateCoordTargetData & UpdateStyleTargetData

export type AddMigrateMapOptions<T = TargetData> = {
  id: string
  coord_type: CoordType
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  type: StyleType
  /**
   * true:迁徙图向内聚集, false:迁徙图向外扩展
   */
  gather: boolean
  /**
   * 起点坐标 lng,lat
   */
  start_coord: string
  /**
   * 起点高度(单位:米)
   */
  start_coord_z: number
  coord_z_type: CoordZType
  targetdata: T[]
}

export type UpdateMigrationMapCoordOptions = Omit<
  AddMigrateMapOptions<UpdateCoordTargetData>,
  'type'
>

export type UpdateMigrationMapStyleOptions = Omit<
  AddMigrateMapOptions<UpdateStyleTargetData>,
  'coord_type' | 'cad_mapkey' | 'start_coord' | 'start_coord_z' | 'coord_z_type'
>

export class MigrationMap extends BaseFeature {
  /**
   * 添加迁徙图
   *
   * 向3D世界中添加迁徙图;
   * 注: 创建多个迁徙图或数据点过多时, 创建需要花费一定的时间, 在创建完成时, 即未收到success前不要执行删除等操作
   */
  addMigrationMap(options: AddMigrateMapOptions) {
    return promiseWrapper(this._superAPI, 'AddMigrationMap', options) as Promise<FeatureResult>
  }

  /**
   * 更新迁徙图数据点
   * .
   * 更新3D世界中一个迁徙图数据点; 注: 更新迁徙图数据点过多时, 更新需要花费一定的时间, 在更新完成时, 即未收到success前不要执行删除等操作
   */
  updateMigrationMapCoord(options: UpdateMigrationMapCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateMigrationMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新迁徙图样式
   */
  updateMigrationMapStyle(options: UpdateMigrationMapStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateMigrationMapStyle',
      options,
    ) as Promise<FeatureResult>
  }
}
