import { BaseFeature } from './BaseFeature'

import type { FeatureResult } from './BaseFeature'
import type { CoordType } from './MigrationMap'
import { promiseWrapper } from './utils'

export type BaseInfoOptions = {
  coordType: CoordType
  cad_mapkey: string
  points: string[]
}

export type BaseInfoResult = {
  length: string
  center: string
  cost_time: string
  /**
   * 多边形计算所用属性
   */
  area?: string
}

export type TranslationPointOptions = Omit<BaseInfoOptions, 'points'> & {
  point: string
  /**
   * x:东西平移(东为正); y:南北平移(北为正); 单位(米)
   */
  horizontalTranslate: string
}

export type TranslationLineOptions = BaseInfoOptions & {
  /**
   * x:东西平移(东为正); y:南北平移(北为正); 单位(米)
   */
  horizontalTranslate: string
}

export type TranslationPolygonOptions = TranslationLineOptions

export type TranslationBaseResult = {
  cost_time: string
}

export type TranslationPointResult = TranslationBaseResult & {
  point: string
}

export type TranslationLineResult = TranslationBaseResult & {
  points: string[]
}

export type TranslationPolygonResult = TranslationLineResult

export type RateOptions = BaseInfoOptions & {
  rate: number
}

export type RateResult = TranslationLineResult

export type RelationshipResult = {
  /**
   * 位置关系：①DISJOINT:相离；②COINCIDENCE：重合
   */
  relationship: 'DISJOINT' | 'COINCIDENCE'
  distance: string
  cost_time: string
}

export type PointsRelationshipOptions = Omit<BaseInfoOptions, 'points'> & {
  point1: string
  point2: string
}

export type PointAndLineRelationshipOptions = Omit<BaseInfoOptions, 'points'> & {
  point: string
  lines: string[]
}

export type PointAndLineRelationshipResult = RelationshipResult & {
  nearestPoints: string[]
}

export type PointAndAreaRelationshipOptions = PointAndLineRelationshipResult

export type PointAndAreaRelationshipResult = PointAndLineRelationshipResult

export type LinesRelationshipOptions = Omit<BaseInfoOptions, 'points'> & {
  lines1: string[]
  lines2: string[]
}

export type LinesRelationshipResult = RelationshipResult & {
  /**
   * 交点数组
   */
  intersectionPoints: string[]
  /**
   * 重合区间数据
   */
  coincidenceSections: Array<{ point1: string; point2: string }>

  /**
   * 最短距离点数组
   */
  nearestPoints: Array<{ point1: string; point2: string }>

  /**
   * 预测相交的点是否存在，值为true或false
   */
  forecastFlag: string
  /**
   * 若存在，此坐标为预测点
   */
  forecastPoints: string
}

export class CoordCalc extends BaseFeature {
  /**
   * 线的计算
   *
   * @Beta
   */
  gEOMLineBaseInfo(options: BaseInfoOptions) {
    return promiseWrapper(this._superAPI, 'GEOMLineBaseInfo', options) as Promise<
      FeatureResult<BaseInfoResult>
    >
  }

  /**
   * 多边形的计算
   *
   * @Beta
   */
  gEOMPolygonBaseInfo(options: BaseInfoOptions) {
    return promiseWrapper(this._superAPI, 'GEOMPolygonBaseInfo', options) as Promise<
      FeatureResult<BaseInfoResult>
    >
  }

  /**
   * 点的平移
   *
   * @Beta
   */
  gEOMTranslationPoint(options: TranslationPointOptions) {
    return promiseWrapper(this._superAPI, 'GEOMTranslationPoint', options) as Promise<
      FeatureResult<TranslationPointResult>
    >
  }

  /**
   * 线的平移
   *
   * @Beta
   */
  gEOMTranslationLine(options: TranslationLineOptions) {
    return promiseWrapper(this._superAPI, 'GEOMTranslationLine', options) as Promise<
      FeatureResult<TranslationLineResult>
    >
  }

  /**
   * 多边形的平移
   *
   * @Beta
   */
  gEOMTranslationPolygon(options: TranslationPolygonOptions) {
    return promiseWrapper(this._superAPI, 'GEOMTranslationPolygon', options) as Promise<
      FeatureResult<TranslationPolygonResult>
    >
  }

  /**
   * 伸缩多边形
   *
   * @Beta
   */
  gEOMTelescopicPolygon(options: RateOptions) {
    return promiseWrapper(this._superAPI, 'GEOMTelescopicPolygon', options) as Promise<
      FeatureResult<RateResult>
    >
  }

  /**
   * 点和点的计算
   *
   * @Beta
   */
  gEOMPointsRelationship(options: PointsRelationshipOptions) {
    return promiseWrapper(this._superAPI, 'GEOMPointsRelationship', options) as Promise<
      FeatureResult<RelationshipResult>
    >
  }

  /**
   * 点和线的计算
   *
   * @Beta
   */
  gEOMPointAndLineRelationship(options: PointAndLineRelationshipOptions) {
    return promiseWrapper(this._superAPI, 'GEOMPointAndLineRelationship', options) as Promise<
      FeatureResult<PointAndLineRelationshipResult>
    >
  }

  /**
   * 点和面的计算
   *
   * @Beta
   */
  gEOMPointAndAreaRelationship(options: PointAndAreaRelationshipOptions) {
    return promiseWrapper(this._superAPI, 'GEOMPointAndAreaRelationship', options) as Promise<
      FeatureResult<PointAndAreaRelationshipResult>
    >
  }

  /**
   * 线和线的计算
   *
   * @Beta
   */
  gEOMLinesRelationship(options: LinesRelationshipOptions) {
    return promiseWrapper(this._superAPI, 'GEOMLinesRelationship', options) as Promise<
      FeatureResult<LinesRelationshipResult>
    >
  }
}
