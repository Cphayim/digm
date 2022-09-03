<script setup lang="ts">
import { DigmV, useDigm, useDigmReady } from '@cphayim/digm-vue'
import { watchEffect } from 'vue'
const url = import.meta.env.VITE_APP_RENDER_SERVER
const order = import.meta.env.VITE_APP_RENDER_ORDER

const { isReady } = useDigm()
watchEffect(() => {
  if (isReady.value) console.log('isReady')
})

useDigmReady((digm) => {
  console.log('DIGM is ready')
})

useDigmReady((digm) => {
  console.log('DIGM is ready2')
})
</script>

<template>
  <DigmV :url="url" :order="order"></DigmV>
  <!-- <router-view /> -->
</template>

<style>
body {
  margin: 0;
}
</style>
