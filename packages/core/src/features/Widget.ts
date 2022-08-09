import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { callbackWrapper, promiseWrapper } from './utils'

export type MeasureToolPoint = {
  /**
   * 坐标 lng,lat
   */
  coord: string
}

export type MeasureToolLinesLength = {
  /**
   * 线段长度
   */
  length: string
}

export type StartMeasureToolOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定, 坐标类型为 0 时填 ''
   */
  cad_mapkey: string
}

export type StartMeasureToolResult = FeatureResult<{
  /**
   * 结果类型(0: 测量点位置; 1: 测量线长度; 2: 测量面积)
   */
  result_type: '0' | '1' | '2'
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: '0' | '1' //测量坐标类型(0:经纬度坐标, 1:cad坐标)
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: ''
  /**
   * 测量的点集合(顺序为操作时的先后顺序)
   */
  points: MeasureToolPoint[]
  /**
   * 测量的线长集合(单位:米) 注: 若是测面积操作, 则此数组第一个数据为总周长; 若是测线段操作, 则为分段长度
   */
  lineslength: MeasureToolLinesLength[]
  /**
   * 面积(单位:平方米)
   */
  area: string
}>

export type GetCoordPoint = {
  /**
   * 索引
   */
  index: string
  /**
   * 坐标 lng,lat
   */
  coord: string
  /**
   * 高度（米）
   */
  coord_z: string
}

export type StartGetCoordOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定, 坐标类型为 0 时填 ''
   */
  cad_mapkey: string
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * true:显示; false:隐藏 (显隐坐标信息,默认隐藏)
   */
  coordinate_show: boolean
  /**
   * true:显示取点标记; false:隐藏取点标记
   */
  icon_show: boolean
}

export type StartGetCoordResult = FeatureResult<{
  coord_result: GetCoordPoint[]
}>

export type RemoveGetCoordOptions = {
  /**
   * 索引
   */
  index: number | number[]
}

export class Widget extends BaseFeature {
  /**
   * 开启测量工具
   *
   * 测量3D世界中的 ①坐标; ②距离; ③面积; 可通过事件注册函数返回信息
   */
  startMeasureTool(options: StartMeasureToolOptions, cb: (res: StartMeasureToolResult) => void) {
    callbackWrapper(this._superAPI, 'StartMeasureTool', cb, options)
  }

  /**
   * 关闭测量工具
   */
  endMeasureTool() {
    return promiseWrapper(this._superAPI, 'EndMeasureTool')
  }

  /**
   * 开启取点工具
   *
   * 获取3D世界中的 ①坐标; ②高度; 可通过事件注册函数返回信息
   */
  startGetCoord(options: StartGetCoordOptions, cb: (res: StartGetCoordResult) => void) {
    callbackWrapper(this._superAPI, 'StartGetCoord', cb, options)
  }

  /**
   * 删除取点工具中的坐标点
   */
  removeGetCoord(options: RemoveGetCoordOptions) {
    return promiseWrapper(this._superAPI, 'RemoveGetCoord', options)
  }

  /**
   * 关闭取点工具
   */
  endGetCoord() {
    return promiseWrapper(this._superAPI, 'EndGetCoord')
  }
}
