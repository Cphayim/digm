import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { callbackWrapper, promiseWrapper } from './utils'

export type ActLayer =
  | 'building'
  | 'road'
  | 'buildinginstance'
  | 'default'
  | 'district'
  | 'districtinstance'
  | 'road'
  | 'roadinstance'
  | 'terrain'
  | 'tree'
  | 'water'

export type EidObject = {
  eid: string[]
}

export type Coord = {
  latitude: string
  longitude: string
}

export type Location = {
  x: number
  y: number
  z: number
}

export type Scale = Location

export type Rotation = {
  /**
   * 俯仰角
   */
  pitch: number
  /**
   * 偏航角
   */
  yaw: number
  /**
   * 翻滚角
   */
  roll: number
}

export type StartGetEIDOptions = {
  /**
   * true:开启获取EID; false:关闭获取EID
   */
  start: boolean
  /**
   * true:点击实体高亮; false:点击实体不高亮
   */
  highlight: boolean
  /**
   * 可被选中元素所在图层，删除该字段，全部元素可被选中
   */
  act_layers: Array<ActLayer>
}

export type StartGetEIDResult = FeatureResult<{
  eid: string
}>

export type FocusAESObjectOptions = EidObject & {
  /**
   * 距离(单位:米; 多个EID自动计算)
   */
  distance: number
}

export type FocusAESObjectResult = Array<FeatureResult<EidObject>>

export type GetAESObjectDataWithEidsResultItem = {
  eid: string
  customerid: string
  coord: Coord
  altitude: number
  location: Location
  rotation: Rotation
  scale: Scale
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type GetAESObjectDataWithEidsResult = FeatureResult<{
  data: GetAESObjectDataWithEidsResultItem[]
}>

export type GetSceneAESObjectEidsResult = FeatureResult<EidObject>

export type ShowHideAESObjectOptions = EidObject & {
  bshow: boolean
}

export type FlattenAESObjectOptions = EidObject & {
  bflatten: boolean
}

export type OutlineAESObjectOptions = EidObject & {
  boutline: boolean
  color: string
}

export type HighLightAESObjectOptions = EidObject & {
  bhighlight: boolean
  color: string
}

export type CrystalAESObjectOptions = EidObject & {
  bcrystal: boolean
  color: string
}

export type SetAESCrystalHotrangeOptions = {
  coord_type: number
  cad_mapkey: string
  coord: string
  coord_z: number
  coord_z_type: number
  color: string
  radius: number
  show: boolean
}

export class SceneEdit extends BaseFeature {
  /**
   * 获取AES实体EID
   *
   * 鼠标点击3D世界中场景元素, 返回该点击后AES的EID值; 可通过事件注册函数返回信息
   */
  startGetEID(options: StartGetEIDOptions, cb: (res: StartGetEIDResult) => void) {
    callbackWrapper(this._superAPI, 'StartGetEID', cb, options)
  }

  /**
   * 结束获取AES实体EID
   *
   * 结束获取全要素场景实体EID
   */
  endGetEID() {
    this._superAPI('EndGetEID')
  }

  /**
   * 获取所有AES实体的EID
   */
  getSceneAESObjectEids() {
    return promiseWrapper(
      this._superAPI,
      'GetSceneAESObjectEids',
    ) as Promise<GetSceneAESObjectEidsResult>
  }

  /**
   * 镜头聚焦至AES实体
   *
   * 将3D世界的镜头FOCUS至指定EID的场景实体
   */
  focusAESObject(options: FocusAESObjectOptions) {
    return promiseWrapper(
      this._superAPI,
      'FocusAESObject',
      options,
    ) as Promise<FocusAESObjectResult>
  }

  /**
   * 获取AES实体属性
   *
   * 获取当前场景中指定EID实体属性信息, 可通过事件注册函数返回信息
   */
  getAESObjectDataWithEids(options: EidObject) {
    return promiseWrapper(
      this._superAPI,
      'GetAESObjectDataWithEids',
      options,
    ) as Promise<GetAESObjectDataWithEidsResult>
  }

  /**
   * 显示/隐藏AES实体
   *
   * 显示/隐藏当前3D世界中指定EID的实体
   */
  showHideAESObject(options: ShowHideAESObjectOptions) {
    return promiseWrapper(this._superAPI, 'ShowHideAESObject', options) as Promise<FeatureResult>
  }

  /**
   * 拍平AES实体
   *
   * 拍平3D世界中指定EID的元素实体
   */
  flattenAESObject(options: FlattenAESObjectOptions) {
    return promiseWrapper(this._superAPI, 'FlattenAESObject', options) as Promise<FeatureResult>
  }

  /**
   * 设置AES实体描边
   *
   * 为3D世界中指定EID的实体描边
   */
  outLineAESObject(options: OutlineAESObjectOptions) {
    return promiseWrapper(this._superAPI, 'OutlineAESObject', options) as Promise<FeatureResult>
  }

  /**
   * 高亮AES实体
   *
   * 为AES实体设置高亮状态
   */
  highlightAESObject(options: HighLightAESObjectOptions) {
    return promiseWrapper(this._superAPI, 'HighLightAESObject', options) as Promise<FeatureResult>
  }

  /**
   * 切换AES实体水晶体模式
   *
   * 将3D世界中指定EID实体切为换水晶体模式
   */
  crystalAESObject(options: CrystalAESObjectOptions) {
    return promiseWrapper(this._superAPI, 'CrystalAESObject', options) as Promise<FeatureResult>
  }

  /**
   * 水晶体热区
   *
   * 设置水晶体热区，适用于AES水晶体以及图层水晶体。
   */
  setAESCrystalHotrange(options: SetAESCrystalHotrangeOptions) {
    return promiseWrapper(
      this._superAPI,
      'SetAESCrystalHotrange',
      options,
    ) as Promise<FeatureResult>
  }
}
