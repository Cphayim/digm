<script setup lang="ts">
import { DigmV } from '@cphayim/digm-vue'

const url = 'https://vizservice-paas.51aes.com'
const order = 'bB9e028b'
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
