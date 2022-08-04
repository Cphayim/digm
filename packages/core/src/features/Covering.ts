import { Digm } from '../Digm'

import { promiseWrapper } from './utils'
import { FeatureResult } from '.'

export type ShowHideCoveringOptions = {
  /**
   * 覆盖物id
   */
  id: string | string[]
  /**
   * 覆盖物类型
   */
  covering_type:
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
  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}
export type ShowHideAllCoveringOptions = {
  /**
   * 覆盖物类型
   */
  covering_type:
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
  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}

export class Covering {
  constructor(private _digm: Digm) {}

  private get _superAPI() {
    return this._digm.renderer.SuperAPI
  }

  /**
   * 显示/隐藏指定类型的覆盖物
   */
  showHideCovering(options: ShowHideCoveringOptions) {
    return promiseWrapper(this._superAPI, 'ShowHideCovering', options) as Promise<FeatureResult>
  }

  /**
   * 显示/隐藏指定类型的全部覆盖物
   */
  showHideAllCovering(options: ShowHideAllCoveringOptions) {
    return promiseWrapper(this._superAPI, 'ShowHideAllCovering', options) as Promise<FeatureResult>
  }
}
