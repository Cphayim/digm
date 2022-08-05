import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type Cube = {
  /**
   * 南北宽度(单位:米)
   */
  size_ns: string
  /**
   * 东西宽度(单位:米)
   */
  size_we: string
  /**
   * 高度(单位:米)
   */
  size_ud: string
}

export type AddSectionOptions = {
  /**
   * 剖切矩体类型(cube:六面体剖切)
   */
  type: 'cube'
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定，坐标类型为 0 时填 ''
   */
  cad_mapkey: string
  /**
   * 坐标 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米, cad坐标无效)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  cube: Cube
  /**
   * 俯仰角
   */
  pitch: 0 //
  /**
   * 偏航角
   */
  yaw: 0
  /**
   * 翻滚角
   */
  roll: 0
  /**
   * 内外剖切;true:剖切内部; false:剖切外部
   */
  invert: boolean
  /**
   * 被切物体描边颜色(HEX颜色值)
   */
  color: string
  /**
   * 被切物体描边宽度(0~1)
   */
  weight: number
}

export type SetSectionStatusOptions = {
  /**
   * 'push-pull' 单面推拉, 'off' 退出全部状态,剖切体不可操作
   */
  status: 'push-pull' | 'off'
}

export type SetSectionStepSizeOptions = {
  /**
   * 推拉步长(单位:米)
   */
  stepSize: string
}

/**
 * 剖切体功能
 */
export class Section extends BaseFeature {
  /**
   * 添加剖切体
   */
  addSection(options: AddSectionOptions) {
    return promiseWrapper(this._superAPI, 'AddSection', options) as Promise<FeatureResult>
  }

  /**
   * 重置剖切体
   */
  resetSection() {
    return promiseWrapper(this._superAPI, 'ResetSection') as Promise<FeatureResult>
  }

  /**
   * 设置剖切体gizmo状态
   */
  setSectionStatus(options: SetSectionStatusOptions) {
    return promiseWrapper(this._superAPI, 'SetSectionStatus', options) as Promise<FeatureResult>
  }

  /**
   * 设置剖切体推拉步长
   */
  setSectionStepSize(options: SetSectionStepSizeOptions) {
    return promiseWrapper(this._superAPI, 'SetSectionStepSize', options) as Promise<FeatureResult>
  }
}
