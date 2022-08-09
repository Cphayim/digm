import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type AddPOIOptions = {
  /**
   * poi_id
   */
  id: string
  /**
   * POI title文本
   */
  label: string
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * 聚合服务筛选类型(部署点聚合数据时自定义, 如 building, alarm ...); 非点聚合时可选
   */
  type?: string
  /**
   * 聚合服务筛选类型(部署点聚合数据时自定义, true/false 作用于POI点聚合外观 alarm_image_url); 非点聚合时可选
   */
  alert_poi?: boolean
  /**
   * POI点的坐标 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 是否永远显示title, true:显示title(默认), false:不显示title\
   */
  always_show_label: boolean
  /**
   * POI点显示label的范围(单位:米, 范围最小、最大距离; 在此范围内显示, 超出范围隐藏; 注意:always_show_label属性优先于此属性)
   */
  show_label_range: string
  /**
   * 此POI所使用的UI模板类型(default: 带线的默认POI UI样式, default_noline:不带线的POI UI样式, 项目中约定)
   */
  umg_type: 'default' | 'default_noline'
  /**
   * 是否自动遮挡排序
   */
  sort_order: boolean
  /**
   * 动画类型(bounce:弹出式; stretch:伸缩式; wipe:展开式)
   */
  animation_type?: 'bounce' | 'stretch' | 'wipe'
  /**
   * 规定完成动画所花费的时间(单位:秒)
   */
  duration_time?: number
}

export type UpdatePOICoordOptions = {
  /**
   * poi_id
   */
  id: string
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * POI数据点 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
}

export type UpdatePOIStyleOptions = {
  id: string
  /**
   * POI title文本
   */
  label: string
  /**
   * 图标类型, 项目中约定
   */
  type?: string
  /**
   * true 显示title(默认), false 不显示title
   */
  always_show_label: boolean
  /**
   * 此POI点显示title的范围(单位:米, 范围最小、最大距离; 在此范围内显示, 超出范围隐藏, 注: always_show_label属性为true时生效)
   */
  show_label_range: string
  /**
   * 此POI所使用的UI模板类型(项目中约定, 默认有两种: default为带线的默认POI UI样式, default_noline为不带线的POI UI样式)
   */
  umg_type: 'default' | 'default_noline'
  /**
   * 是否自动遮挡排序
   */
  sort_order: boolean
  /**
   * 动画类型(bounce:弹出式; stretch:伸缩式; wipe:展开式)
   */
  animation_type?: 'bounce' | 'stretch' | 'wipe'
  /**
   * 规定完成动画所花费的时间(单位:秒)
   */
  duration_time?: number
}

export type setPOISelectOptions = {
  id: string
  /**
   * true:选中; false:未选中
   */
  select: boolean
}

export type GetPOIScreenRangeResult = FeatureResult<{
  /**
   * poi_id
   */
  id: string
  /**
   * 基于3D世界渲染窗口左上角比值
   */
  LeftUp: string
  /**
   * 基于3D世界渲染窗口右下角比值
   */
  RightDown: string
}>

export type AddCustomPOIOptions = {
  /**
   * customPOI_id
   */
  id: string
  /**
   * 坐标类型(0:经纬度坐标, 1:cad坐标)
   */
  coord_type: 0 | 1
  /**
   * CAD基准点Key值, 项目中约定
   */
  cad_mapkey: string
  /**
   * POI点的坐标 lng,lat
   */
  coord: string
  /**
   * 高度(单位:米)
   */
  coord_z: number
  /**
   * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
   */
  coord_z_type: 0 | 1 | 2
  /**
   * 是否永远显示title, true:显示title(默认), false:不显示title\
   */
  always_show_label: boolean
  /**
   * POI点显示label的范围(单位:米, 范围最小、最大距离; 在此范围内显示, 超出范围隐藏; 注意:always_show_label属性优先于此属性)
   */
  show_label_range: string
  /**
   * 是否自动遮挡排序
   */
  sort_order: boolean
  /**
   * 与marker之中images中的define_state对应
   */
  state: string
  /**
   * 动画类型(bounce:弹出式; stretch:伸缩式; wipe:展开式)
   */
  animation_type?: 'bounce' | 'stretch' | 'wipe'
  /**
   * 规定完成动画所花费的时间(单位:秒)
   */
  duration_time?: number

  marker: MarkerItem

  label?: LableItem

  window?: WindowItem
}

export type MarkerItem = {
  /**
   * marker大小(宽,高 单位:像素)
   */
  size: string
  images: ImagesItem[]
}

export type ImagesItem = {
  /**
   * marker图片组
   */
  define_state: string
  /**
   * normal 图片url地址
   */
  normal_url: string
  /**
   * hover, active 图片url地址
   */
  activate_url: string
}

export type LableItem = {
  /**
     * 本地图片地址一: file:///D:/xxx/LabelBg.png, D: 云渲染所在盘符
        本地图片地址二: path:/UserData/LabelBg.png, 图片资源由云渲染后台管理, 云渲染4.3.1以上版本
     */
  bg_image_url?: string
  /**
   * label大小(宽, 高 单位:像素)
   */
  bg_size?: string
  /**
   * 整个label左上角相对于marker的中心点(coord坐标中心点)的偏移(x,y 单位:像素), 注: x为正向右, y为正向上
   */
  bg_offset?: string

  content?: ContentItem[]
}

export type ContentItem = {
  /**
   * 富文本; 格式: [text, color ,size] color: HEXA格式
   */
  text: string | string[]
  /**
   * 文本框左上角相对于label中bg_offset左上角的margin偏移(x,y 单位:像素), 注: x为正向右, y为正向下
   */
  text_offset: string
  /**
   * 文本框宽度(类型:Integer; 注: 文本滚动速度scroll_speed: 0 时显示全文本, 此时文本不受文本框宽度限制)
   */
  text_boxwidth: number
  /**
   * 文本滚动速度(0:不滚动; 类型:number)
   */
  scroll_speed: number
}

export type WindowItem = {
  /**
   * 本地地址一: file:///D:/xxx/echarts.html, D: 云渲染所在盘符
   */
  url: string
  /**
   * window大小(宽,高 单位:像素)
   */
  size: string
  /**
   * window左上角相对于marker的中心点(coord坐标中心点)的偏移(x,y 单位:像素), 注: x为正向右, y为正向上
   */
  offset: string
}

export type UpdateCustomPOIStyleOptions = {
  id: string
  /**
   * true 显示title(默认), false 不显示title
   */
  always_show_label: boolean
  /**
   * 此POI点显示title的范围(单位:米, 范围最小、最大距离; 在此范围内显示, 超出范围隐藏, 注: always_show_label属性为true时生效)
   */
  show_label_range: string
  /**
   * 是否自动遮挡排序
   */
  sort_order: boolean
  /**
   * 与marker之中images中的define_state对应
   */
  state: string
  /**
   * 动画类型(bounce:弹出式; stretch:伸缩式; wipe:展开式)
   */
  animation_type?: 'bounce' | 'stretch' | 'wipe'
  /**
   * 规定完成动画所花费的时间(单位:秒)
   */
  duration_time?: number
}

export type UpdateCustomPOIMarkerOptions = {
  /**
   * customPOI_id
   */
  id: string
  marker: MarkerItem
}

export type UpdateCustomPOILabelOptions = {
  /**
   * customPOI_id
   */
  id: string
  label: LableItem
}

export type UpdateCustomPOIWindowOptions = {
  /**
   * customPOI_id
   */
  id: string
  window: WindowItem
}

export type POIClusterOptions = {
  /**
   * 聚合服务地址(云渲染服务IP或域名, 7009: 云渲染后端配置)
   */
  data_url: string
  /**
   * 聚合数据筛选POI点类型(部署点聚合服务时自定义, 如 building, alarm ...);type:all 聚合所有类型的POI点
   */
  type: string
  /**
   * true:开启点聚合, false:关闭点聚合
   */
  open: boolean
  /**
   * 聚和区块级别(最小2X2最大10X10, 默认2 ~ 10);
   */
  split_num: number
  /**
   * 使用POI点聚合外观(true 使用; false 不使用); 注: 使用之前必须定义过POI点聚合外观;
   */
  use_custom_appearance: boolean
}

export type POIClusterFacadeOptions = {
  data: DataItem[]
}

export type DataItem = {
  /**
   * 区域被聚合数范围最小值
   */
  value_range_min: number
  /**
   * 区域被聚合数范围最大值
   */
  value_range_max: number
  /**
   * 图标大小(宽,高 单位:像素)
   */
  size: string
  /**
   * 聚合数字文字大小(宽,高 单位:像素)
   */
  num_text_size: string
  /**
   * 标准外观图标
   */
  standard_image_url: string
  /**
   * alert_poi外观图标
   */
  alarm_image_url: string
}

export type clusterProOptions = {
  /**
   * 是否开启点聚合服务；true:开启; false:关闭
   */
  open: boolean
  /**
   * 开启点聚合服务的：①地址；②端口
   */
  data_url: string
  /**
   * 自定义筛选数据条件集合
   */
  filters: FiltersItem &
    {
      /**
       * 聚和区块的数量，取值区间:[2,10]
       */
      split_num: number
    }[]
}
export type FiltersItem = {
  /**
   * 待筛选“数据”及“条件”的索引值，可定义多组筛选
   */
  queryId: string
  /**
   * 待筛选的数据集合，需同调用点聚合接口“set-poi”时定义gather值相同
   */
  gather: string
  /**
   * 待筛选的条件集合，需同调用点聚合接口“set-poi”时设定的自定义属性“attr”相同
   */
  condition: ConditionItem
}

export type ConditionItem = {
  year: [number]
  open: [string]
}

export type clusterProResult = FeatureResult<{
  data: ClusterProResultDataItem[]
}>

export type ClusterProResultDataItem = {
  queryId: string
  result: ResultItem & { aggregate_coord: string }[]
}

export type ResultItem = {
  aggregate_count: string
  aggregation: string[]
}

export type DBSearchByPointOptions = DBSearchOptions<string>

export type DBSearchOptions<T = string | string[]> = {
  /**
   * 开启点聚合服务的：①地址；②端口
   */
  data_url: string
  /**
   * 坐标
   */
  coord: T
  /**
   * 坐标点范围半径(米)
   */
  radius: number
  filters: FiltersItem[]
}

export type DBSearchByLineOptions = DBSearchOptions<string[]>

export type DBSearchByLineResult = FeatureResult<{
  data: {
    queryId: string
    result: ResultItem[]
  }[]
}>

export class POI extends BaseFeature {
  /**
   * 添加POI点
   */
  addPOI(options: AddPOIOptions | AddPOIOptions[]) {
    return promiseWrapper(this._superAPI, 'AddPOI', options) as Promise<FeatureResult>
  }

  /**
   * 更新POI数据点
   */
  updatePOICoord(options: UpdatePOICoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdatePOICoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新POI点样式
   */
  updatePOIStyle(options: UpdatePOIStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdatePOIStyle', options) as Promise<FeatureResult>
  }

  /**
   * 设置POI点状态
   */
  setPOISelect(options: setPOISelectOptions) {
    return promiseWrapper(this._superAPI, 'SetPOISelect', options) as Promise<FeatureResult>
  }

  /**
   * 查询一个POI点位置信息
   */
  getPOIScreenRange(options: { id: string }) {
    return promiseWrapper(
      this._superAPI,
      'GetPOIScreenRange',
      options,
    ) as Promise<GetPOIScreenRangeResult>
  }

  /**
   * 添加自定义POI点
   */
  addCustomPOI(options: AddCustomPOIOptions) {
    return promiseWrapper(this._superAPI, 'AddCustomPOI', options) as Promise<FeatureResult>
  }

  /**
   * 更新自定义POI点数据点
   */
  updateCustomPOICoord(options: UpdatePOICoordOptions) {
    return promiseWrapper(this._superAPI, 'UpdateCustomPOICoord', options) as Promise<FeatureResult>
  }

  /**
   * 更新自定义POI点的样式
   */
  updateCustomPOIStyle(options: UpdateCustomPOIStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateCustomPOIStyle', options) as Promise<FeatureResult>
  }

  /**
   * 更新自定义POI点Marker
   */
  updateCustomPOIMarker(options: UpdateCustomPOIMarkerOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateCustomPOIMarker',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新自定义POI点Label
   */
  updateCustomPOILabel(options: UpdateCustomPOILabelOptions) {
    return promiseWrapper(this._superAPI, 'UpdateCustomPOILabel', options) as Promise<FeatureResult>
  }

  /**
   * 更新自定义POI点Window
   */
  updateCustomPOIWindow(options: UpdateCustomPOIWindowOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateCustomPOIWindow',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 开启3D世界POI点聚合功能
   */
  POICluster(options: POIClusterOptions) {
    return promiseWrapper(this._superAPI, 'POICluster', options) as Promise<FeatureResult>
  }

  /**
   * POI点聚合外观
   */
  POIClusterFacade(options: POIClusterFacadeOptions) {
    return promiseWrapper(this._superAPI, 'POIClusterFacade', options) as Promise<FeatureResult>
  }

  /**
   * 点聚合pro
   */
  clusterPro(options: clusterProOptions) {
    return promiseWrapper(this._superAPI, 'ClusterPro', options) as Promise<clusterProResult>
  }

  /**
   * 坐标点的周边搜索
   */
  DBSearchByPoint(options: DBSearchByPointOptions) {
    return promiseWrapper(
      this._superAPI,
      'DBSearchByPoint',
      options,
    ) as Promise<DBSearchByLineResult>
  }

  /**
   * 路径的周边搜索
   */
  DBSearchByLine(options: DBSearchByLineOptions) {
    return promiseWrapper(
      this._superAPI,
      'DBSearchByLine',
      options,
    ) as Promise<DBSearchByLineResult>
  }
}
