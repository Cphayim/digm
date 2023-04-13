<script setup lang="ts">
export type DigmBarrierProps = {
  /**
   * 是否启用屏障
   * @default false
   */
  enabled?: boolean
  /**
   * 屏障的 z-index
   * @default 5
   */
  zIndex?: number
  /**
   * 点击屏障时的回调
   */
  onBarrierClick?: (...args: any[]) => void | Promise<void>
}

const props = withDefaults(defineProps<DigmBarrierProps>(), {
  enabled: false,
  zIndex: 5,
})

const handleBarrierClick = () => {
  props.onBarrierClick?.()
}
</script>

<template>
  <div
    v-if="props.enabled"
    class="digm-barrier"
    :style="{ zIndex: props.zIndex }"
    @click="handleBarrierClick"
  />
</template>

<style>
.digm-barrier {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
