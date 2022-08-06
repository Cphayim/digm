import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type RasterIDOptions = {
  /**
   * 栅格图id
   */
  id: string
}

export type AddRasterOptions = RasterIDOptions &
  UpdateRasterStyleOptions & {
    /**
     * 坐标类型(0:经纬度坐标, 1:cad坐标)
     */
    coord_type: 0 | 1
    /**
     * 坐标高度类型(0:相对3D世界表面；1:相对3D世界地面；2:相对3D世界海拔; 注:cad坐标无效)
     */
    coord_z_type: 0 | 1 | 2
    /**
     * CAD基准点Key值, 项目中约定，坐标类型为 0 时传 ''
     */
    cad_mapkey: string
    /**
     * 高度(单位:米)
     */
    coord_z: number
    /**
     * 归一化对应最高值, "high_value"和"low_value"置空时, 默认以上传数据的数据范围做归一化
     */
    high_value: number
    /**
     * 归一化对应最低值, "high_value"和"low_value"置空时, 默认以上传数据的数据范围做归一化
     */
    low_value: number
    /**
     * tif数据中nodata值的指定默认值
     */
    nodata_setting: -2000

    /**
     * 栅格图路径
     */
    raster_path: string
  }

export type UpdateRasterStyleOptions = RasterIDOptions & {
  /**
   * 样式类型(1: 投影型, 贴合地面;  2:平面型)
   */
  style_type: 1 | 2
  /**
   * 着色类型(1: 拉伸型)
   */
  color_type: 1
  /**
   * 自定义栅格渲染渐变颜色(HEX颜色值,共5个色值)
   */
  gradient_setting: {
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
  }
}

/**
 * 栅格图
 */
export class Section extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加栅格图
   */
  addRaster(options: AddRasterOptions) {
    return promiseWrapper(this._superAPI, 'AddRaster', options) as Promise<FeatureResult>
  }

  /**
   * 删除栅格图
   *
   * @enhance
   */
  removeRaster(options: RasterIDOptions) {
    return this._covering.removeCovering({ id: options.id, covering_type: 'raster' })
  }

  /**
   * 删除所有栅格图
   *
   * @enhance
   */
  removeAllRaster() {
    return this._covering.removeAllCovering({ covering_type: 'raster' })
  }

  /**
   * 更新栅格图样式
   */
  updateRasterStyle(options: UpdateRasterStyleOptions) {
    return promiseWrapper(this._superAPI, 'UpdateRasterStyle', options) as Promise<FeatureResult>
  }
}
