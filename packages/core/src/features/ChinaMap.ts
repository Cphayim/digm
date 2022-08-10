import { BaseFeature } from './BaseFeature'
import { promiseWrapper } from './utils'

import type { FeatureResult } from './BaseFeature'

export type SwitchChinaMapOptions = {
  show: boolean
}

export type VisibleProvinceNameOptions = {
  /**
   * 省份编号 (不区分大小写)
   *
   * BJ — 北京市 SH — 上海市 TJ — 天津市 CQ — 重庆市 HE — 河北省 SX — 山西省 LN — 辽宁省 JL — 吉林省 JS — 江苏省 ZJ — 浙江省 AH — 安徽省 FJ — 福建省 JX — 江西省 SD — 山东省 HA — 河南省 HB — 湖北省 HN — 湖南省 GD — 广东省 HI — 海南省 SC — 四川省 GZ — 贵州省 YN — 云南省 SN — 陕西省 GS — 甘肃省 QH — 青海省 TW — 台湾省 HL — 黑龙江省 XZ — 西藏自治区 NM — 内蒙古自治区 NX — 宁夏回族自治区 GX — 广西壮族自治区 XJ — 新疆维吾尔族自治区
   */
  province_id: string | string[]
  show: boolean
  all: boolean
}

export type HighlightProvinceOptions = VisibleProvinceNameOptions & {
  color: string
}

export type ProvinceMigrationMapTargetData = {
  /**
   * 迁徙图目标点
   */
  target_coord: string
  /**
   * 目标点标志直径(单位:米)
   */
  mark_size: number
  /**
   * 目标点颜色(HEX颜色值)
   */
  mark_color: string
  /**
   * 连线宽度(单位:米)(注:样式类型 type:3时, line_width参数为连线数量, 范围 5 ~ 100)
   */
  line_width: number
  /**
   * 连线颜色(HEX颜色值)
   */
  line_color: string
  /**
   * 连线曲度调节(取值范围 -1 ~ 1, 0为默认曲度, 此值越小曲线越平, 反之曲线越陡峭)
   */
  curvature: number
}

export type ProvinceMigrationMapOptions = {
  id: string
  /**
   * 样式类型
   *
   * 1:波浪线型, 2:箭头型, 3:射线, 4:烟花, 5:流光
   */
  type: number
  /**
   * 迁徙图起点, 省份编号
   */
  start_coord: string
  targetdata: ProvinceMigrationMapTargetData[]
}

export type UpdateProvMigrationMapCoordOptions = {
  id: string
  start_coord: string
  targetdata: Array<{ target_coord: string }>
}

export type UpdateProvMigrationMapStyleTargetData = Omit<
  ProvinceMigrationMapTargetData,
  'target_coord'
>

export type UpdateProvMigrationMapStyleOptions = {
  id: string
  type: number
  targetdata: UpdateProvMigrationMapStyleTargetData[]
}

export class ChinaMap extends BaseFeature {
  /**
   * 开启中国地图
   */
  switchChinaMap(options: SwitchChinaMapOptions) {
    return promiseWrapper(this._superAPI, 'SwitchChinaMap', options) as Promise<FeatureResult>
  }

  /**
   * 高亮中国地图省份
   */
  highlightProvince(options: HighlightProvinceOptions) {
    return promiseWrapper(this._superAPI, 'HighlightProvince', options) as Promise<FeatureResult>
  }

  /**
   * 显示省市名称
   */
  visibleProvinceName(options: VisibleProvinceNameOptions) {
    return promiseWrapper(this._superAPI, 'VisibleProvinceName', options) as Promise<FeatureResult>
  }

  /**
   * 省份迁徙图
   */
  provinceMigrationMap(options: ProvinceMigrationMapOptions) {
    return promiseWrapper(this._superAPI, 'ProvinceMigrationMap', options) as Promise<FeatureResult>
  }

  /**
   * 更新省份迁徙图数据点
   */
  updateProvMigrateMapCoord(options: UpdateProvMigrationMapCoordOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateProvMigrateMapCoord',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 更新省份迁徙图样式
   */
  updateMigrationMapStyle(options: UpdateProvMigrationMapStyleOptions) {
    return promiseWrapper(
      this._superAPI,
      'UpdateMigrationMapStyle',
      options,
    ) as Promise<FeatureResult>
  }
}
