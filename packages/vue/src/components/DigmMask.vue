<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { sleep } from '@cphayim/digm-shared'
import { useDigm } from '../hooks/digm'

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
  <div v-show="showMask" class="digm-mask">
    <div class="digm-mask-center">
      <img class="digm-mask-loading" src="../assets/loading.svg" />
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
}
.digm-mask-center {
  position: absolute;
  top: 50%;
  left: 50%;
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
