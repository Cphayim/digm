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
 * 迁徙图事件
 */
type MigrationMapEvent =
  | 'OnAddMigrationMapSuccess'
  | 'OnUpdateMigrationMapCoordSuccess'
  | 'OnUpdateMigrationMapStyleSuccess'
  | 'OnAddMigrationMapFailed'
  | 'OnUpdateMigrationMapCoordFailed'
  | 'OnUpdateMigrationMapStyleFailed'

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

type RangeType =
  | 'OnAddRangeSuccess'
  | 'OnUpdateRangeCoordSuccess'
  | 'OnUpdateRangeStyleSuccess'
  | 'OnAddRangeFailed'
  | 'OnUpdateRangeCoordFailed'
  | 'OnUpdateRangeStyleFailed'

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

type HighlightAreaEvent =
  | 'OnAddHighlightAreaSuccess'
  | 'OnUpdateHighlightAreaCoordSuccess'
  | 'OnUpdateHighlightAreaStyleSuccess'
  | 'OnAddHighlightAreaFailed'
type SceneGeoConverterEvent =
  | 'OnAddGeoCoordToScreenPostionSuccess'
  | 'OnAddGeoCoordToScreenPostionFailed'

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

type CoverWindowEvent =
  | 'OnAddCoverWindowSuccess'
  | 'OnAddCoverWindowFailded'
  | 'OnUpdateCoverWindowSuccess'
  | 'OnUpdateCoverWindowFailded'
  | 'OnRemoveCoverWindowSuccess'
  | 'OnRemoveCoverWindowFailed'

type CoverToMoveEvent =
  | 'OnCoverToMoveSuccess'
  | 'OnCoverToMoveFailed'
  | 'OnCoverToMoveEnd'
  | 'OnPlayCoverMoveStateSuccess'
  | 'OnPlayCoverMoveStateFailed'

type CoverSelectionEvent =
  | 'OnCoverSelectionSuccess'
  | 'OnCoverSelectionFailed'
  | 'OnCoversSelectionResult'
  | 'OnPolygonCoversSelectionResult'

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
  | RangeType
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
