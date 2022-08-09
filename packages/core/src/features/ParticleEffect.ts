import { BaseFeature } from './BaseFeature'
import type { FeatureResult } from './BaseFeature'
import { promiseWrapper } from './utils'

export type ParticleEffectAttachIDOptions = {
  /**
   * 依附的覆盖物id
   */
  attach_id: string
}

export type ParticleEffectAttachTypeOptions = {
  /**
   * 依附的覆盖物类型
   *
   * (path:路径; range:区域轮廓; circular_range:圆形区域轮廓)
   */
  attach_type: 'path' | 'range' | 'circular_range'
}

export type AddParticleEffectOptions = {
  /**
   * 粒子类型(类型:1)
   */
  type: number
  /**
   * 粒子密度(1~10)
   */
  density: number
  /**
   * 粒子的大小
   */
  size: number
  /**
   * 粒子生命周期(单位:秒)
   */
  life_time: number
  /**
   * 粒子颜色颜色(HEX颜色值)
   */
  color: string
  /**
   * 粒子移动速度(单位:米/秒)
   */
  speed: number
  /**
   * 粒子的自身速度
   */
  particles_velocity: number
  /**
   * 是否循环
   */
  loop: boolean
  /**
   * 是否反序
   */
  reverse: boolean
}

export type RemoveParticleEffectOptions = ParticleEffectAttachIDOptions &
  ParticleEffectAttachTypeOptions

export class ParticleEffect extends BaseFeature {
  private get _covering() {
    return this._digm.covering
  }

  /**
   * 添加粒子特效
   *
   * 向 3D世界中的路径、区域轮廓、圆形区域轮廓添加粒子特效
   */
  addParticleEffect(options: AddParticleEffectOptions) {
    return promiseWrapper(this._superAPI, 'AddParticleEffect', options) as Promise<FeatureResult>
  }

  /**
   * 删除粒子特效
   */
  removeParticleEffect(options: RemoveParticleEffectOptions) {
    return promiseWrapper(this._superAPI, 'RemoveParticleEffect', options) as Promise<FeatureResult>
  }

  /**
   * 删除全部粒子特效
   */
  removeAllParticleEffect(options: ParticleEffectAttachTypeOptions) {
    return promiseWrapper(
      this._superAPI,
      'RemoveAllParticleEffect',
      options,
    ) as Promise<FeatureResult>
  }

  /**
   * 添加漂浮粒子
   */
  addFloatingParticles(options: { type: 1 | 2 }) {
    return promiseWrapper(this._superAPI, 'AddFloatingParticles', options) as Promise<FeatureResult>
  }

  /**
   * 删除所有漂浮粒子
   */
  removeAllFloatingParticles() {
    return this._covering.removeAllCovering({ covering_type: 'floating_particles' })
  }
}
