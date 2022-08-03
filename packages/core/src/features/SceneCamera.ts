import { Digm } from '../Digm'

import { promiseWrapper } from './utils'
import { FeatureResult } from '.'

export type GetCameraInfoOptions = {
  /**
   * 场景镜头id(由AddCamera添加); 置空时获取镜头当前信息
   */
  camera_id?: string
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定, 坐标类型 为 0 时传 ''
   */
  cad_mapkey: string
}

export type GetCameraInfoResult = FeatureResult<{
  /**
   * 位置的坐标类型 (0:经纬度坐标, 1:cad坐标)
   */
  coord_type: '0' | '1' //
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 海拔高度(单位:米)
   */
  coord_z: string
  /**
   * 中心点的坐标 lng, lat
   */
  center_coord: string
  /**
   * 镜头离中心点的距离(单位:米)
   */
  arm_distance: string
  /**
   * 镜头离中心点的最远距离(单位:米), 依项目而定
   */
  arm_distance_max: string
  /**
   * 镜头离中心点的最近距离(单位:米), 依项目而定
   */
  arm_distance_min: string
  /**
   * 镜头俯仰角(0~89)
   */
  pitch: string
  /**
   * 镜头俯仰角最大值, 依项目而定
   */
  pitch_max: string
  /**
   * 镜头俯仰角最小值, 依项目而定
   */
  pitch_min: string
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: string
}>

export type SetCameraInfoOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定，坐标类型为 0 是填 ''
   */
  cad_mapkey: string
  /**
   * 海拔高度(单位:米)
   */
  coord_z: string
  /**
   * 中心点的坐标 lng,lat
   */
  center_coord: string
  /**
   * 镜头距中心点距离(单位:米)
   */
  arm_distance: number
  /**
   * 镜头俯仰角(5~89)
   */
  pitch: number
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: number
  /**
   * 使用飞行动画
   * - true: 飞行动画(有一个短暂飞行动画,并按照arm_distance,pitch,yaw设置镜头);
   * - false: 立刻跳转过去(瞬移)
   */
  fly: boolean
}

export type CameraCoordPoint = {
  /**
   * 坐标 lng,lat
   */
  coord: string
}

export type SetCameraSpaceOptions = {
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定, 坐标类型为 0 是填 ''
   */
  cad_mapkey: string
  /**
   * 坐标高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: number
  /**
   * 镜头距离范围
   */
  arm_distance_limit: string
  /**
   * 镜头俯仰角(5~89)
   */
  pitch_limit: string
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw_limit: string
  /**
   * 镜头坐标限制范围
   *
   * 第一个coord是西北方向，第二个coord为东南方向，以两点坐标之间的连线做外接矩形，该矩形即为镜头的限制范围。
   */
  points: [CameraCoordPoint, CameraCoordPoint]
}

export type ResetCameraSpaceOptions = {
  /**
   * default: 边界限制; free: 开放边界限制
   */
  state: 'default' | 'free'
}

export type ResetCameraInfoOptions = {
  /**
   * default: 场景初始状态; last: 场景镜头返回至最后一次执行"SetCameraInfo"时刻的窗口视界状态
   */
  state: 'default' | 'last'
}

export type AddCameraOptions = {
  /**
   * 场景镜头 id
   */
  camera_id: string
  /**
   * 位置的坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定, 坐标类型 为 0 时传 ''
   */
  cad_mapkey: string
  /**
   * 相机位置坐标 lng, lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 镜头俯仰角(-90~90)
   */
  pitch: number
  /**
   * 镜头俯仰角范围(-90~90)
   */
  pitch_limit: string
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: number
  /**
   * 镜头偏航角范围(0正北, 0~359)
   */
  yaw_limit: string
  /**
   * 镜头距坐标点距离(单位:米)
   */
  arm_distance: number
  /**
   * 镜头距坐标点距离范围(单位:米)
   */
  arm_distance_limit: string
}

export type SetCameraActiveOptions = {
  /**
   * 场景镜头 id
   */
  camera_id: string
}

export type SetCameraRotateOptions = {
  /**
   * 相机旋转一周所需要的时间, (单位:秒)
   */
  time: number
  /**
   * clockwise:顺时针; anticlockwise:逆时针; stop:停止旋转
   */
  direction: 'clockwise' | 'anticlockwise' | 'stop'
}

export type SetCameraStepMoveOptions = {
  /**
   * 视口移动方向(front: 前; back: 后; left: 左; right:右)
   */
  state: 'front' | 'back' | 'left' | 'right'
  /**
   * 步长
   */
  step: number
}

export type ResetCameraOptions = {
  /**
   * default: 场景初始状态; free: 开放场景边界限制
   */
  state: 'default' | 'free'
}

export type CameraRoamingPathPoint = {
  /**
   * 路径坐标点 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米, cad坐标无效)
   */
  coord_z: number
  /**
   * 镜头漫游至下一坐标点缓动类型(linear:线型, curve:曲线型)
   */
  coord_easetype: 'linear' | 'curve'
  /**
   * 镜头与坐标点距离(单位:米)
   */
  arm_distance: number
  /**
   * 镜头俯仰角(0~89)
   */
  pitch: number
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: number
  /**
   * 镜头漫游至下一坐标点缓动姿态类型
   */
  attitude_easetype:
    | 'Linear'
    | 'SinusoidalIn'
    | 'SinusoidalOut'
    | 'SinusoidalInOut'
    | 'EaseIn'
    | 'EaseOut'
    | 'EaseInOut'
    | 'ExpoIn'
    | 'ExpoOut'
    | 'ExpoInOut'
    | 'CircularIn'
    | 'CircularOut'
    | 'CircularInOut'
  /**
   * 镜头漫游至下一坐标点所花费的时间(单位:秒)
   */
  time: number
  /**
   * 镜头漫游速度类型
   */
  speed_easetype: 'linear' | 'acceleration'
}

export type SetCameraRoamingProOptions = {
  coord_type: 0 | 1 //坐标类型(0:经纬度坐标, 1:cad坐标)
  cad_mapkey: string //CAD基准点Key值, 项目中约定, 坐标类型为 1 填 ''
  /**
   * 坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 是否显示辅助线(true:显示; false:不显示)
   */
  subsidiary_show: boolean
  /**
   * 漫游路径点
   */
  points: CameraRoamingPathPoint[]
}

export type SetCameraRoamingProStateOptions = {
  /**
   * pause:暂停移动; continue:继续移动; stop:停止移动, 释放焦点
   */
  state: 'pause' | 'continue' | 'stop'
}

export type SetCameraToMoveOptions = {
  /**
   * 镜头id(由AddCamera添加),可删除该字段，删除该字段则由默认镜头沿覆盖物移动，不必添加镜头
   */
  camera_id?: string
  /**
   * 依附的覆盖物id (仅支持: 路径, 区域, 圆形区域; 需提前创建完毕)
   */
  be_attach_id: string
  /**
   * 依附的覆盖物类型
   * - path 依附的覆盖物类型(路径)
   * - range 依附的覆盖物类型(区域轮廓)
   * - circular_range 依附的覆盖物类型(圆形区域轮廓)
   */
  be_attach_type: 'path' | 'range' | 'circular_range'
  /**
   * 移动速度 (单位:米/秒)
   */
  speed: number
  /**
   * 是否循环
   */
  loop: boolean
  /**
   * 是否反向移动
   */
  reverse: boolean
  /**
   * 镜头距覆盖物距离(单位:米)
   */
  arm_distance: number
  /**
   * 镜头俯仰角(0~89)
   */
  pitch: number
}

export type SetCameraToMoveStateOptions = {
  /**
   * 镜头id(由AddCamera添加)
   */
  camera_id: string
  /**
   * pause:暂停移动; continue:继续移动; stop:停止移动, 释放焦点
   */
  state: 'pause' | 'continue' | 'stop'
}

export type GetCurrentCameraIDResult = FeatureResult<{
  /**
   * 镜头 ID
   */
  camera_id: string
}>

export type SetFlyModeOptions = {
  /**
   * true: 使用当前自定义字段限制; false: 使用当前相机的默认参数以及限制
   */
  reset_attitude: boolean
  /**
   * 坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 镜头俯仰角(-89~89)
   */
  pitch: number
  /**
   * 镜头俯仰角范围(-89~89)
   */
  pitch_limit: string
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: number
  /**
   * 镜头偏航角范围(0正北, 0~359)
   */
  yaw_limit: string
  /**
   * 飞行速度, 取值范围(1~8)
   */
  speed: number
  /**
   * 飞行倍率, 取值范围(1~5)
   */
  speed_ratio: number
}

export type SetWalkModeOptions = {
  /**
   * true: 使用当前自定义字段限制; false: 使用当前相机的默认参数以及限制
   */
  reset_attitude: boolean
  /**
   * 镜头俯仰角(-89~89)
   */
  pitch: number
  /**
   * 镜头俯仰角范围(-89~89)
   */
  pitch_limit: string
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: number
  /**
   * 镜头偏航角范围(0正北, 0~359)
   */
  yaw_limit: number
  /**
   * 行走速度(单位:米), 取值范围(1~50)
   */
  speed: number
  /**
   * 行走倍率, 取值范围(1~5)
   */
  speed_ratio: number
  /**
   * 视眼高度(单位:米), 取值范围在(0.2~3)
   */
  eye_height: number
  /**
   * 下落方式; true:瞬间下落; false:自由落体
   */
  teleport: boolean
}

export type SetSandtablesModeOptions = {
  /**
   * true: 使用当前自定义字段限制; false: 使用当前相机的默认参数以及限制
   */
  reset_attitude: boolean
  /**
   * 坐标高度类型(0:相对3D世界表面; 1:相对3D世界地面; 2:相对3D世界海拔)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 镜头俯仰角(-89~89)
   */
  pitch: number
  /**
   * 镜头俯仰角范围(-89~89)
   */
  pitch_limit: string
  /**
   * 镜头偏航角(0正北, 0~359)
   */
  yaw: number
  /**
   * 镜头偏航角范围(0正北, 0~359)
   */
  yaw_limit: string
  /**
   * 镜头距(地面、表面、海拔)距离(单位:米)
   */
  arm_distance: number
  /**
   * 镜头距(地面、表面、海拔)距离范围(单位:米)
   */
  arm_distance_limit: string
  /**
   * 倍率, 取值范围(1~5)
   */
  speed_ratio: number
}

export type SetModeResult = FeatureResult<{
  camera_type: 'Fly' | 'Walk' | 'Sandtable'
}>

/**
 * 场景镜头功能
 */
export class SceneCamera {
  constructor(private _digm: Digm) {}

  private get _superAPI() {
    return this._digm.renderer.SuperAPI
  }

  /**
   * 获取当前的场景镜头信息
   */
  getCameraInfo(options: GetCameraInfoOptions) {
    return promiseWrapper(this._superAPI, 'GetCameraInfo', options) as Promise<GetCameraInfoResult>
  }

  /**
   * 设置当前的场景镜头视界
   */
  setCameraInfo(options: SetCameraInfoOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraInfo', options) as Promise<FeatureResult>
  }

  /**
   * 重置场景镜头视界
   */
  resetCameraInfo(options: ResetCameraInfoOptions) {
    return promiseWrapper(this._superAPI, 'ResetCameraInfo', options) as Promise<FeatureResult>
  }

  /**
   * 限制场景镜头视界
   */
  setCameraSpace(options: SetCameraSpaceOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraSpace', options) as Promise<FeatureResult>
  }

  /**
   * 解除限制场景镜头视界
   */
  resetCameraSpace(options: ResetCameraSpaceOptions) {
    return promiseWrapper(this._superAPI, 'ResetCameraSpace', options) as Promise<FeatureResult>
  }

  /**
   * 添加场景镜头
   */
  addCamera(options: AddCameraOptions) {
    return promiseWrapper(this._superAPI, 'AddCamera', options) as Promise<FeatureResult>
  }

  /**
   * 切换并激活已添加的场景镜头
   */
  setCameraActive(options: SetCameraActiveOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraActive', options) as Promise<FeatureResult>
  }

  // TODO 调用覆盖物 Feature 来删除场景镜头的方法

  /**
   * 设置镜头绕场景中心点旋转
   */
  setCameraRotate(options: SetCameraRotateOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraRotate', options) as Promise<FeatureResult>
  }

  /**
   * 场景镜头移动
   */
  setCameraStepMove(options: SetCameraStepMoveOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraStepMove', options) as Promise<FeatureResult>
  }

  /**
   * 重置场景初始镜头
   */
  resetCamera(options: ResetCameraOptions) {
    return promiseWrapper(this._superAPI, 'ResetCamera', options) as Promise<FeatureResult>
  }

  /**
   * 设置场景镜头漫游Pro
   */
  setCameraRoamingPro(options: SetCameraRoamingProOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraRoamingPro', options) as Promise<FeatureResult>
  }

  /**
   * 设置场景镜头漫游状态Pro
   */
  setCameraRoamingProState(options: SetCameraRoamingProStateOptions) {
    return promiseWrapper(
      this._superAPI,
      'SetCameraRoamingProState',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 设置镜头沿覆盖物移动
   */
  setCameraToMove(options: SetCameraToMoveOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraToMove', options) as Promise<FeatureResult>
  }

  /**
   * 设置镜头沿覆盖物移动状态
   */
  setCameraToMoveState(options: SetCameraToMoveStateOptions) {
    return promiseWrapper(this._superAPI, 'SetCameraToMoveState', options) as Promise<FeatureResult>
  }

  /**
   * 获取当前镜头 ID
   */
  getCurrentCameraID() {
    return promiseWrapper(this._superAPI, 'GetCurrentCameraID') as Promise<GetCurrentCameraIDResult>
  }

  /**
   * 设置镜头飞行模式
   */
  setFlyMode(options: SetFlyModeOptions) {
    return promiseWrapper(this._superAPI, 'SetFlyMode', options) as Promise<SetModeResult>
  }

  /**
   * 设置镜头行走模式
   */
  setWalkMode(options: SetWalkModeOptions) {
    return promiseWrapper(this._superAPI, 'SetWalkMode', options) as Promise<SetModeResult>
  }

  /**
   * 设置镜头沙盘模式
   */
  setSandtablesMode(options: SetSandtablesModeOptions) {
    return promiseWrapper(this._superAPI, 'SetSandtablesMode', options) as Promise<SetModeResult>
  }
}
