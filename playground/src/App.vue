<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { Timeline } from 'timeline-axis'

let timeline: Timeline | null = null
const timelineRef = ref<HTMLElement>()
const frameWidth = ref(300)
const scrollLeft = ref(0)
onMounted(() => {
  timeline = new Timeline(timelineRef.value!, {
    height: 18,
    offset: {
      x: 0,
    },
  })

  watchEffect(() => {
    timeline?.setFrameWidth(frameWidth.value)
  })

  watchEffect(() => {
    timeline?.setOffset(scrollLeft.value)
  })

  document.body.addEventListener('wheel', onWheel, { passive: false })
})

function onWheel(e: WheelEvent) {
  e.preventDefault()
  if (e.ctrlKey) {
    if (timeline && e.deltaY > 0)
      frameWidth.value = frameWidth.value - 2

    if (timeline && e.deltaY < 0)
      frameWidth.value = frameWidth.value + 2
  }
}
</script>

<template>
  <div ref="timelineRef" class="timeline" />
  <br>
  <div>frameWidth: {{ frameWidth }}</div>
  <input v-model="frameWidth" style="width: 100%" type="range" :min="0.1" :max="300" :step="0.01">

  <div>scrollLeft: {{ scrollLeft }}</div>
  <input v-model="scrollLeft" style="width: 100%" type="range" :min="0" :max="3000" :step="1">
</template>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;

  color-scheme: light dark;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
* {
  padding: 0;
  margin: 0;
}
</style>
