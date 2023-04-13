/**
 * 当前渲染器状态
 *
 * 注意：除“未初始化”和“停止”外，所有状态的“进行中”及“成功”状态使用奇数表示，“失败”状态使用偶数表示
 */
export enum RenderStatus {
  /**
   * 未初始化
   */
  UN_INIT = 0,

  /**
   * 初始化渲染器
   */
  INIT_RENDER = 11,
  /**
   * 初始化渲染器失败
   */
  INIT_RENDER_FAILED = 12,

  /**
   * 请求渲染地址
   */
  REQUEST_RENDER_URL = 21,
  /**
   * 请求渲染地址失败
   */
  REQUEST_RENDER_URL_FAILED = 22,
  /**
   * 请求渲染地址失败，已达最大连接路数
   */
  REQUEST_RENDER_URL_FAILED_MAX_CONNECTION = 24,

  /**
   * 加载模型
   */
  LOAD_MODEL = 31,
  /**
   * 加载模型失败
   */
  LOAD_MODEL_FAILED = 32,

  /**
   * 渲染模型
   */
  RENDER_MODEL = 41,
  /**
   * 渲染模型失败
   */
  RENDER_MODEL_FAILED = 42,
  /**
   * 渲染完成
   */
  RENDER_MODEL_FINISHED = 43,

  /**
   * 停止渲染
   */
  STOP = -1,
}

/**
 * 获取状态对应的显示文本
 */
export function getStatusLabel(status: RenderStatus) {
  const statusLabels: Record<RenderStatus, string> = {
    [RenderStatus.UN_INIT]: '未初始化渲染器...',
    [RenderStatus.INIT_RENDER]: '正在初始化渲染器...',
    [RenderStatus.INIT_RENDER_FAILED]: '初始化渲染器失败',
    [RenderStatus.REQUEST_RENDER_URL]: '正在获取渲染地址...',
    [RenderStatus.REQUEST_RENDER_URL_FAILED]: '获取渲染地址失败',
    [RenderStatus.REQUEST_RENDER_URL_FAILED_MAX_CONNECTION]:
      '获取渲染地址失败，服务器连接路数已达上限',
    [RenderStatus.LOAD_MODEL]: '正在载入场景与模型资源...',
    [RenderStatus.LOAD_MODEL_FAILED]: '载入场景与模型失败',
    [RenderStatus.RENDER_MODEL]: '正在渲染场景与模型...',
    [RenderStatus.RENDER_MODEL_FAILED]: '渲染场景与模型失败',
    [RenderStatus.RENDER_MODEL_FINISHED]: '场景与模型渲染完成，即将进入...',
    [RenderStatus.STOP]: '渲染器已停止',
  }
  return statusLabels[status] ?? `无效的状态 ${status}`
}
