import { BaseFeature } from './BaseFeature'
import { promiseWrapper } from './utils'
import type { FeatureResult } from './BaseFeature'
import type { CoordType, CoordZType, StyleType } from './MigrationMap'

/**
 * 动画类型
 * 1：全部出现
 * 2：逐个出现
 */
export type AnimationType = 0 | 1

export type AddStrategyMapTargetData = {
  target_coord: string
  target_coord_z: number
  color: string
}

export type AddStrategyMapOptions = {
  id: string
  coordType: CoordType
  cad_mapkey: string
  coord_z_type: CoordZType
  type: StyleType
  is_gather: boolean
  animation_type: AnimationType
  start_coord: string
  start_coord_z: number
  target_data: AddStrategyMapTargetData[]
}

export type UpdateStrategyMapCoordTargetData = Omit<AddStrategyMapTargetData, 'color'>

export type UpdateStrategyMapCoordOptions = {
  id: string
  coord_type: CoordType
  cad_mapkey: string
  coord_z_type: CoordZType
  start_coord: string
  start_coord_z: number
  target_data: UpdateStrategyMapCoordTargetData[]
}

export type UpdateStrategyMapStyleTargetData = Pick<AddStrategyMapTargetData, 'color'>

export type UpdateStrategyMapStyleOptions = {
  id: string
  type: StyleType
  is_gather: boolean
  animation_type: AnimationType
  target_data: UpdateStrategyMapStyleTargetData[]
}

export type PlayStrategyMapOptions = {
  id: string
  index: number
  /**
   * true：正向播放
   * false: 逆向播放
   */
  forward: boolean
}

export class StrategyMap extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加战略图
   *
   * 向3D世界中添加战略图;
   * 注: 创建多个战略图或数据点过多时, 创建需要花费一定的时间, 在创建完成时, 即未收到success前不要执行删除等操作
   */
  addStrategyMap(options: AddStrategyMapOptions) {
    return promiseWrapper(this._superAPI, 'AddStrategyMap', options) as Promise<FeatureResult>
  }

  /**
   * 更新战略图数据点
   *
   * 更新3D世界中一个战略图数据点; 注: 更新战略图数据点过多时, 创建更新3需要花费一定的时间, 在更新3完成时, 即未收到success前不要执行删除等操作
   */
  updateStrategyMapCoord(options: UpdateStrategyMapCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateStrategyMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新战略图样式
   *
   * 更新3D世界中一个战略图样式
   */
  updateStrategyMapStyle(options: UpdateStrategyMapStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateStrategyMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 战略图播放动画
   *
   * 播放3D世界中战略图动画
   */
  playStrategyMap(options: PlayStrategyMapOptions) {
    return promiseWrapper(this._superAPI, 'PlayStrategyMap', options) as Promise<FeatureResult>
  }

  /**
   * 移除指定战略图
   *
   * @enhance
   */
  removeStrategyMapById(id: string) {
    return this._covering.removeCovering({ id, covering_type: 'strategy_map' })
  }

  /**
   * 移除所有战略图
   *
   * @enhance
   */
  removeAllStrategyMap() {
    return this._covering.removeAllCovering({ covering_type: 'strategy_map' })
  }
}
