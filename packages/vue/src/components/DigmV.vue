<script setup lang="ts">
import { Ref, ref, watchEffect } from 'vue'

import type { RenderStatus, RenderUrlTransformer } from '@cphayim-digm/core'
import { useDigm } from '../hooks/digm.js'
import DigmMask, { DigmMaskProps } from './DigmMask.vue'
import DigmBarrier, { DigmBarrierProps } from './DigmBarrier.vue'

type Props = {
  /**
   * 渲染服务器 baseUrl
   */
  url: string
  /**
   * 渲染口令
   */
  order: string
  /**
   * 转换渲染地址
   *
   * 如果传入 `true` 或 `RenderUrlTransformer`，将会对渲染服务器返回的渲染地址进行转换
   *
   * 例如前端通过请求网关进行转发的场景 10.1.1.1 (nginx) -> 192.168.0.100 (渲染服务器)，
   * 此时渲染服务器将返回例如 http://192.168.0.100:8891/{render-token} 的渲染地址，这会导致后续的渲染流程失败
   *
   * 当传入 `true` 时：
   * 该选项解析 `url` 并使用其 `protocol` 和 `hostname` 将渲染地址转换为 `http://10.1.1.1:8891/{render-token}`
   *
   * 也可以传入 `RenderUrlTransformer` 来自定义转换逻辑
   */
  transformer?: boolean | RenderUrlTransformer
  /**
   * 是否启用渲染器日志
   *
   * 默认值: `false`
   */
  enableLog?: boolean
  /**
   * 渲染器完成延迟（防止闪屏）
   *
   * 默认值: `5000`
   */
  sleepTime?: number
  /**
   * 是否显示调试面板
   *
   * 默认值: `false`
   */
  debugPanel?: boolean
  /**
   * 组件显示大小
   *
   * - `viewport`: 撑满视口，即 100vw,100vh
   * - `container`: 撑满父容器，即 100%,100%
   *
   * 默认值: `viewport`
   */
  size?: 'viewport' | 'container'
  /**
   * 是否使用默认的等待遮罩层
   *
   * 默认值: true
   */
  mask?: boolean
  /**
   * 传递给 `DigmMask` 的 props
   */
  maskProps?: DigmMaskProps

  /**
   * 传递给 `DigmBarrier` 的 props
   */
  barrierProps?: DigmBarrierProps
}
const props = withDefaults(defineProps<Props>(), {
  enableLog: false,
  sleepTime: 5000,
  size: 'viewport',
  mask: true,
})

const emit = defineEmits<{
  (event: 'change:status', status: RenderStatus): void
  (event: 'ready'): void
}>()

const digmRef = ref<Element>()

// Renderer width and height are auto calc based on the container size
const { status, isReady } = useDigm({
  autoStart: true,
  target: digmRef as Ref<Element>,
  url: props.url,
  order: props.order,
  transformer: props.transformer,
  enableLog: props.enableLog,
  sleepTime: props.sleepTime,
})

watchEffect(() => emit('change:status', status.value))
watchEffect(() => isReady.value && emit('ready'))
</script>

<template>
  <div :class="['digm-v', `digm-v__${props.size}`]" ref="digmRef"></div>

  <DigmMask v-if="props.mask" v-bind="props.maskProps" />
  <DigmBarrier v-bind="props.barrierProps" />
</template>

<style>
.digm-v {
  position: relative;
}

.digm-v__viewport {
  width: 100vw;
  height: 100vh;
}

.digm-v__container {
  width: 100%;
  height: 100%;
}
</style>
