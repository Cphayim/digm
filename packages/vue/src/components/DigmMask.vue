<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import { sleep } from '@cphayim-digm/shared'
import { useDigm } from '../hooks/digm'

export type DigmMaskProps = {
  /**
   * 是否显示加载中的图标
   * @default true
   */
  loading?: boolean
  /**
   * 背景图片
   */
  backgroundImage?: string
}

const props = withDefaults(defineProps<DigmMaskProps>(), { loading: true })
const backgroundImage = computed(() => props.backgroundImage && `url(${props.backgroundImage})`)

const { isReady, isError, statusLabel } = useDigm()
const showMask = ref(true)

watchEffect(async () => {
  if (isReady.value) {
    await sleep(2000)
    showMask.value = false
  }
})
</script>

<template>
  <div v-show="showMask" class="digm-mask" :style="{ backgroundImage }">
    <div class="digm-mask-center">
      <img v-if="props.loading" class="digm-mask-loading" src="../assets/loading.svg" />
      <div class="digm-mask-status-label" :class="{ ['digm-mask-status-label__error']: isError }">
        {{ statusLabel }}
      </div>
      <div class="digm-mask-status-tip">
        （根据服务器及本地性能，载入可能需要数分钟，请您耐心等待）
      </div>
    </div>
  </div>
</template>

<style>
.digm-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(55, 65, 81);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.digm-mask::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 65, 81, 0.5);
}
.digm-mask-center {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}
.digm-mask-loading {
  margin: auto;
}
.digm-mask-status-label {
  margin-bottom: 20px;
  font-size: 24px;
  color: white;
}
.digm-mask-status-label__error {
  color: rgb(248, 113, 113);
}
.digm-mask-status-tip {
  font-size: 14px;
  color: rgb(209, 213, 219);
}
</style>
