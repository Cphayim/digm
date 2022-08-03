<script setup lang="ts">
import { Ref, ref, watchEffect } from 'vue'

import { RenderStatus } from '@cphayim/digm-core'
import { useDigm } from '../hooks/digm.js'
import DigmMask from './DigmMask.vue'

type Props = {
  /**
   * 填充大小
   *
   * - `viewport`: 撑满视口，即 100vw,100vh
   * - `container`: 撑满父容器，即 100%,100%
   *
   * 默认值: `viewport`
   */
  fill?: 'viewport' | 'container'
  /**
   * 渲染服务器 baseUrl
   */
  url: string
  /**
   * 渲染口令
   */
  order: string
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
}
const props = withDefaults(defineProps<Props>(), {
  size: 'viewport',
  enableLog: false,
  sleepTime: 5000,
})

const emit = defineEmits<{
  (event: 'change:status', status: RenderStatus): void
  (event: 'ready'): void
}>()

const digmRef = ref<Element>()

const { status, isReady } = useDigm({
  autoStart: true,
  target: digmRef as Ref<Element>,
  url: props.url,
  order: props.order,
  width: window.innerWidth,
  height: window.innerHeight,
  enableLog: props.enableLog,
  sleepTime: props.sleepTime,
})

watchEffect(() => emit('change:status', status.value))
watchEffect(() => isReady.value && emit('ready'))
</script>

<template>
  <div :class="['digm-v', `digm-v__${props.size}`]" ref="digmRef"></div>
  <DigmMask></DigmMask>
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
