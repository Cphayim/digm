<script setup lang="ts">
import { DigmV } from '@cphayim/digm-vue'
const url = import.meta.env.VITE_APP_RENDER_SERVER
const order = import.meta.env.VITE_APP_RENDER_ORDER
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
