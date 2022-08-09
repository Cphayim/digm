import { Digm } from '../Digm'

export type FeatureResult<T = any> = {
  func_name: string
  success: boolean
  args: T
}

export class BaseFeature {
  constructor(protected _digm: Digm) {}

  protected get _superAPI() {
    return this._digm.renderer.SuperAPI.bind(this._digm.renderer)
  }
}

export type BaseFeatureType = typeof BaseFeature
