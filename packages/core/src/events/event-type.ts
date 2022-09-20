import type { FeatureResult } from '../features/BaseFeature'

/**
 * 渲染器事件
 */
type RenderEvent = 'beginPlay' | 'APIAlready' | 'OnSuperAPI_Error_Catch'

/**
 * 场景镜头事件
 */
type SceneCameraEvent =
  | 'OnCameraRoamingProStart'
  | 'OnCameraRoamingProEnd'
  | 'OnCameraToMoveStart'
  | 'OnCameraToMoveEnd'

/**
 * POI 事件
 */
type POIEvent =
  | 'OnAddPOISuccess'
  | 'OnUpdatePOICoordSuccess'
  | 'OnUpdatePOIStyleSuccess'
  | 'OnAddPOIFailed'
  | 'OnUpdatePOICoordFailed'
  | 'OnUpdatePOIStyleFailed'
  | 'OnFocusPOIStart'
  | 'OnFocusPOIEnd'
  | 'OnFocusAllPOIStart'
  | 'OnFocusAllPOIEnd'
  | 'OnPOIHover'
  | 'OnPOIUnHover'
  | 'OnPOIClick'
  | 'OnPOILabelClick'

/**
 * 自定义 POI 事件
 */
type CustomPOIEvent =
  | 'OnAddCustomPOISuccess'
  | 'OnUpdateCustomPOICoordSuccess'
  | 'OnUpdateCustomPOIStyleSuccess'
  | 'OnUpdateCustomPOIMarkerSuccess'
  | 'OnUpdateCustomPOILabelSuccess'
  | 'OnUpdateCustomPOIWindowSuccess'
  | 'OnAddCustomPOIFailed'
  | 'OnUpdateCustomPOICoordFailed'
  | 'OnUpdateCustomPOIStyleFailed'
  | 'OnUpdateCustomPOIMarkerFailed'
  | 'OnUpdateCustomPOILabelFailed'
  | 'OnUpdateCustomPOIWindowFailed'

/**
 * 迁徙图事件
 */
type MigrationMapEvent =
  | 'OnAddMigrationMapSuccess'
  | 'OnUpdateMigrationMapCoordSuccess'
  | 'OnUpdateMigrationMapStyleSuccess'
  | 'OnAddMigrationMapFailed'
  | 'OnUpdateMigrationMapCoordFailed'
  | 'OnUpdateMigrationMapStyleFailed'
  | 'OnFocusMigrationMapStart'
  | 'OnFocusMigrationMapEnd'
  | 'OnFocusAllMigrationMapStart'
  | 'OnFocusAllMigrationMapEnd'
  | 'OnMigrationMapHover'
  | 'OnMigrationMapUnHover'
  | 'OnMigrationMapClick'

/**
 * 战略图事件
 */
type StrategyMapEvent =
  | 'OnAddStrategyMapSuccess'
  | 'OnUpdateStrategyMapCoordSuccess'
  | 'OnUpdateStrategyMapStyleSuccess'
  | 'OnAddStrategyMapFailed'
  | 'OnUpdateStrategyMapCoordFailed'
  | 'OnUpdateStrategyMapStyleFailed'
  | 'OnFocusStrategyMapStart'
  | 'OnFocusStrategyMapEnd'
  | 'OnFocusAllStrategyMapStart'
  | 'OnFocusAllStrategyMapEnd'

/**
 * 热力图事件
 */
type HeatMapEvent =
  | 'OnAddHeatMapSuccess'
  | 'OnUpdateHeatMapCoordSuccess'
  | 'OnUpdateHeatMapStyleSuccess'
  | 'OnAddHeatMapFailed'
  | 'OnUpdateHeatMapCoordFailed'
  | 'OnUpdateHeatMapStyleFailed'
  | 'OnAddColumnHeatMapSuccess'
  | 'OnUpdateColumnHeatMapCoordSuccess'
  | 'OnUpdateColumnHeatMapStyleSuccess'
  | 'OnAddColumnHeatMapFailed'
  | 'OnUpdateColumnHeatMapCoordFailed'
  | 'OnUpdateColumnHeatMapStyleFailed'
  | 'OnAddSpaceHeatMapSuccess'
  | 'OnUpdateSpaceHeatMapCoordSuccess'
  | 'OnUpdateSpaceHeatMapStyleSuccess'
  | 'OnAddSpaceHeatMapFailed'
  | 'OnUpdateSpaceHeatMapCoordFailed'
  | 'OnUpdateSpaceHeatMapStyleFailed'
  | 'OnAddRoadHeatMapSuccess'
  | 'OnUpdateRoadHeatMapCoordSuccess'
  | 'OnUpdateRoadHeatMapStyleSuccess'
  | 'OnAddRoadHeatMapFailed'
  | 'OnUpdateRoadHeatMapCoordFailed'
  | 'OnUpdateRoadHeatMapStyleFailed'

/**
 * 栅格图事件
 */
type RasterEvent =
  | 'OnAddRasterSuccess'
  | 'OnUpdateRasterStyleSuccess'
  | 'OnAddRasterFailed'
  | 'OnUpdateRasterStyleFailed'
  | 'OnFocusRasterStart'
  | 'OnFocusRasterEnd'
  | 'OnFocusAllRasterStart'
  | 'OnFocusAllRasterEnd'
  | 'OnRasterHover'
  | 'OnRasterUnHover'
  | 'OnRasterClick'

/**
 * 路径事件
 */
type PathEvent =
  | 'OnAddPathSuccess'
  | 'OnUpdatePathCoordSuccess'
  | 'OnUpdatePathStyleSuccess'
  | 'OnAddPOIFailed'
  | 'OnUpdatePathCoordFailed'
  | 'OnUpdatePathStyleFailed'
  | 'OnFocusPathStart'
  | 'OnFocusPathEnd'
  | 'OnFocusAllPathStart'
  | 'OnFocusAllPathEnd'
  | 'OnPathHover'
  | 'OnPathUnHover'
  | 'OnPathClick'

/**
 * 轮廓图事件
 */
type RangeEvent =
  | 'OnAddRangeSuccess'
  | 'OnUpdateRangeCoordSuccess'
  | 'OnUpdateRangeStyleSuccess'
  | 'OnAddRangeFailed'
  | 'OnUpdateRangeCoordFailed'
  | 'OnUpdateRangeStyleFailed'
  | 'OnFocusRangeStart'
  | 'OnFocusRangeEnd'
  | 'OnFocusAllRangeStart'
  | 'OnFocusAllRangeEnd'
  | 'OnRangeHover'
  | 'OnRangeUnHover'
  | 'OnRangeClick'

/**
 * 可视域事件
 */
type ViewshedEvent =
  | 'OnAddViewshedSuccess'
  | 'OnUpdateViewshedCoordSuccess'
  | 'OnUpdateViewshedStyleSuccess'
  | 'OnAddViewshedFailed'
  | 'OnUpdateViewshedCoordFailed'
  | 'OnUpdateViewshedStyleFailed'
  | 'OnFocusViewshedStart'
  | 'OnFocusViewshedEnd'
  | 'OnFocusAllViewshedStart'
  | 'OnFocusAllViewshedEnd'
  | 'OnViewshedHover'
  | 'OnViewshedUnHover'
  | 'OnViewshedClick'

/**
 * 高亮区域事件
 */
type HighlightAreaEvent =
  | 'OnAddHighlightAreaSuccess'
  | 'OnUpdateHighlightAreaCoordSuccess'
  | 'OnUpdateHighlightAreaStyleSuccess'
  | 'OnAddHighlightAreaFailed'
  | 'OnFocusHighLightAreaStart'
  | 'OnFocusHighLightAreaEnd'

/**
 * 场景坐标转换事件
 */
type SceneGeoConverterEvent =
  | 'OnAddGeoCoordToScreenPostionSuccess'
  | 'OnAddGeoCoordToScreenPostionFailed'

/**
 * 中国地图事件
 */
type ChinaMapEvent =
  | 'OnSwitchChinaMapSuccess'
  | 'OnSwitchChinaMapFailed'
  | 'OnHighlightProvinceSuccess'
  | 'OnHighlightProvinceFailed'
  | 'OnVisibleProvinceNameSuccess'
  | 'OnVisibleProvinceNameFailed'
  | 'OnFocusMigrationMapStart'
  | 'OnFocusMigrationMapEnd'
  | 'OnFocusAllMigrationMapStart'
  | 'OnFocusAllMigrationMapEnd'
  | 'OnMigrationMapHover'
  | 'OnMigrationMapUnHover'
  | 'OnMigrationMapClick'

/**
 * 场景特效事件
 */
type SceneEffectEvent =
  | 'OnAddEffectSuccess'
  | 'OnUpdateEffectCoordSuccess'
  | 'OnUpdateEffectStyleSuccess'
  | 'OnAddEffectFailed'
  | 'OnUpdateEffectCoordFailed'
  | 'OnUpdateEffectStyleFailed'
  | 'OnFocusEffectStart'
  | 'OnFocusEffectEnd'
  | 'OnFocusAllEffectStart'
  | 'OnFocusAllEffectEnd'
  | 'OnSceneEffectHover'
  | 'OnSceneEffectUnHover'
  | 'OnSceneEffectClick'

/**
 * 覆盖物关联 Window 事件
 */
type CoverWindowEvent =
  | 'OnAddCoverWindowSuccess'
  | 'OnAddCoverWindowFailded'
  | 'OnUpdateCoverWindowSuccess'
  | 'OnUpdateCoverWindowFailded'
  | 'OnRemoveCoverWindowSuccess'
  | 'OnRemoveCoverWindowFailed'

/**
 * 覆盖物移动事件
 */
type CoverToMoveEvent =
  | 'OnCoverToMoveSuccess'
  | 'OnCoverToMoveFailed'
  | 'OnCoverToMoveEnd'
  | 'OnPlayCoverMoveStateSuccess'
  | 'OnPlayCoverMoveStateFailed'

/**
 * 覆盖物框选事件
 */
type CoverSelectionEvent =
  | 'OnCoverSelectionSuccess'
  | 'OnCoverSelectionFailed'
  | 'OnCoversSelectionResult'
  | 'OnPolygonCoversSelectionResult'

/**
 * 3D 文字事件
 */
type TDTextEvent =
  | 'OnAdd3DtextSuccess'
  | 'OnUpdate3DtextCoordSuccess'
  | 'OnUpdate3DtextStyleSuccess'
  | 'OnAdd3DtextFailed'
  | 'OnUpdate3DtextCoordFailed'
  | 'OnUpdate3DtextStyleFailed'
  | 'OnFocus3DtextStart'
  | 'OnFocus3DtextEnd'
  | 'OnFocusAll3DtextStart'
  | 'OnFocusAll3DtextEnd'
  | 'On3DTextHover'
  | 'On3DTextUnHover'
  | 'On3DTextClick'

export type CloudEvent =
  | RenderEvent
  | SceneCameraEvent
  | POIEvent
  | CustomPOIEvent
  | RasterEvent
  | PathEvent
  | HeatMapEvent
  | MigrationMapEvent
  | StrategyMapEvent
  | RangeEvent
  | ViewshedEvent
  | HighlightAreaEvent
  | SceneGeoConverterEvent
  | ChinaMapEvent
  | SceneEffectEvent
  | CoverWindowEvent
  | CoverToMoveEvent
  | CoverSelectionEvent
  | TDTextEvent

export type CloudEventHandler = (res: FeatureResult) => void | Promise<void>
