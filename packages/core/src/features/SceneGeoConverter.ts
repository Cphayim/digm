import { BaseFeature } from './BaseFeature'
import { promiseWrapper } from './utils'
import type { FeatureResult } from './BaseFeature'
import type { CoordType, CoordZType } from './MigrationMap'

export type RemoveGeoCoordToScreenPostionOptions = {
  id: string[]
}

export type GeoCoord = {
  id: string
  coord: string
  coord_z: number
}

export type AddGeoCoordToScreenPostionOptions = {
  coord_type: CoordType
  cad_mapkey: string
  coord_z_type: CoordZType
  geo_coords: GeoCoord[]
}

export type AddGeoCoordToScreenPostionResult = {
  id: string
  coord: string
  screen_percent: string
}

export class SceneGeoConverter extends BaseFeature {
  private get _covering() {
    return this._superAPI.covering
  }

  /**
   * 场景坐标转换至屏幕位置信息
   */
  addGeoCoordToScreenPostion(options: AddGeoCoordToScreenPostionOptions) {
    return promiseWrapper(this._superAPI, 'AddGeoCoordToScreenPostion', options) as Promise<
      FeatureResult<AddGeoCoordToScreenPostionResult>
    >
  }

  /**
   * 删除场景坐标
   */
  removeGeoCoordToScreenPostion(options: RemoveGeoCoordToScreenPostionOptions) {
    this._superAPI('RemoveGeoCoordToScreenPostion', options)
  }

  /**
   * 删除全部场景坐标
   */
  removeAllGeoCoordToScreenPostion() {
    this._superAPI('RemoveAllGeoCoordToScreenPostion')
  }
}
