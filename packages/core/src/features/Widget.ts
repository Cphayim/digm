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

export type StartShowCoordOptions = {
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
  points: GetCoordPoint[]
}

export type StartShowCoordResult = FeatureResult<{
  coord_result: GetCoordPoint[]
}>

export type UEGeoInfoOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定, 坐标类型为 0 时填 ''
   */
  cad_mapkey: string
  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}

export type SetEnvTimeOptions = {
  /**
   * 时间格式 '12:00' 或 实时光照 'auto'
   */
  env_time: string
}

export type SetEnvWeatherOptions = {
  env_weather:
    | 'Sunny'
    | 'Cloudy'
    | 'PartlyCloudy'
    | 'Overcast'
    | 'LightRain'
    | 'ModerateRain'
    | 'HeavyRain'
    | 'LightSnow'
    | 'ModerateSnow'
    | 'HeavySnow'
    | 'Foggy'
    | 'Sand'
    | 'Haze'
    | 'auto'
}

export type GetAPIResolutionResult = FeatureResult<{
  ApiResolution: string
}>

export type SetResolutionOptions = {
  width: number
  height: number
}

export type SetCompassOptions = {
  /**
   * 位置 'x,y' (单位:像素)
   */
  position: string
  /**
   * 半径(单位:像素)
   */
  radius: number
  /**
   * true:显示; false:隐藏
   */
  bshow: boolean
}

export type SetRenderQualityOptions = {
  quality: 'low' | 'medium' | 'high' | 'epic'
}

export type SetMultiRenderingOptions = {
  /**
   * 云渲染倍率范围
   */
  screenpercentage: number
}

export type SetSceneStyleOptions = {
  style: false | 'comic' | 'sketch' | 'dark' | 'ashy'
}

export type ColorAdjustmentOptions = {
  /**
   * 色相(-180, 180, 默认: 0)
   */
  hue: number
  /**
   * 饱和度(-100, 100, 默认: 0)
   */
  saturation: number
  /**
   * 亮度(-100, 100, 默认: 0)
   */
  brightness: number
  /**
   * 对比度(-100, 100, 默认: 0)
   */
  contrast: number
  /**
   * 色彩平衡(HEX颜色, 默认: ffffff)
   */
  color_balance: string
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
    return promiseWrapper(this._superAPI, 'EndMeasureTool') as Promise<FeatureResult>
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
    return promiseWrapper(this._superAPI, 'RemoveGetCoord', options) as Promise<FeatureResult>
  }

  /**
   * 关闭取点工具
   */
  endGetCoord() {
    return promiseWrapper(this._superAPI, 'EndGetCoord')
  }

  /**
   * 开启坐标点辅助
   */
  startShowCoord(options: StartShowCoordOptions, cb: (res: StartShowCoordResult) => void) {
    return callbackWrapper(this._superAPI, 'StartShowCoord', cb, options)
  }

  /**
   * 关闭坐标点辅助
   */
  endShowCoord() {
    return promiseWrapper(this._superAPI, 'EndShowCoord') as Promise<FeatureResult>
  }

  /**
   * 显示/隐藏UE鼠标位置地理信息
   */
  ueGeoInfo(options: UEGeoInfoOptions) {
    return promiseWrapper(this._superAPI, 'UEgeoInfo', options) as Promise<FeatureResult>
  }

  /**
   * 24小时光照
   *
   * 设置3D世界中对应时间光照效果
   */
  setEnvTime(options: SetEnvTimeOptions) {
    return promiseWrapper(this._superAPI, 'SetEnvTime', options) as Promise<FeatureResult>
  }

  /**
   * 天气
   *
   * 设置3D世界中天气状态
   */
  setEnvWeather(options: SetEnvWeatherOptions) {
    return promiseWrapper(this._superAPI, 'SetEnvWeather', options) as Promise<FeatureResult>
  }

  /**
   * 获取场景分辨率
   */
  getResolution() {
    return promiseWrapper(this._superAPI, 'GetAPIResolution') as Promise<GetAPIResolutionResult>
  }

  /**
   * 设置场景分辨率
   */
  setResolution(options: SetResolutionOptions) {
    return promiseWrapper(this._superAPI, 'SetResolution', options) as Promise<FeatureResult>
  }

  /**
   * 开启或关闭3D世界指南针
   */
  setCompass(options: SetCompassOptions) {
    return promiseWrapper(this._superAPI, 'SetCompass', options) as Promise<FeatureResult>
  }

  /**
   * 开启或关闭3D世界场景帧率, 再次执行, 关闭场景帧率
   */
  showHideUEFrameRate() {
    return promiseWrapper(this._superAPI, 'ShowHideUEFrameRate') as Promise<FeatureResult>
  }

  /**
   * 设置场景渲染质量
   */
  setRenderQuality(options: SetRenderQualityOptions) {
    return promiseWrapper(this._superAPI, 'SetRenderQuality', options) as Promise<FeatureResult>
  }

  /**
   * 设置云渲染倍率
   */
  setMultiRendering(options: SetMultiRenderingOptions) {
    return promiseWrapper(this._superAPI, 'SetMultiRendering', options) as Promise<FeatureResult>
  }

  /**
   * 设置场景样式
   */
  setSceneStyle(options: SetSceneStyleOptions) {
    return promiseWrapper(this._superAPI, 'SetSceneStyle', options) as Promise<FeatureResult>
  }

  /**
   * 场景色彩调节
   */
  colorAdjustment(options: ColorAdjustmentOptions) {
    return promiseWrapper(this._superAPI, 'ColorAdjustment', options) as Promise<FeatureResult>
  }
}
