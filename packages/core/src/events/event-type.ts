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

export type CloudEvent = RenderEvent | SceneCameraEvent | POIEvent | CustomPOIEvent

export type CloudEventHandler = (...args: any[]) => void | Promise<void>
