<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { TimelineAxis } from 'timeline-axis'

const timelineRef = ref<HTMLElement>()
// 初始化刻度
const initalValue = ref(2)
// 新增刻度值
const additionalValue = ref(0)

const axis = new TimelineAxis({
  width: window.innerWidth,
  height: 18,
})
onMounted(() => {
  timelineRef.value?.appendChild(axis.dom)

  watchEffect(() => {
    axis.setOptions({
      duration: Number(initalValue.value),
    })
  })
})

function handleScale(value: number) {
  if (value > 0)
    axis.zoomIn()
  else
    axis.zoomOut()
}

function addTo() {
  initalValue.value += Number(additionalValue.value)
  additionalValue.value = 0
}
</script>

<template>
  <div ref="timelineRef" class="timeline" />

  <input v-model="initalValue" aria-controls="">

  <div>
    <button @click="handleScale(-1)">
      click -
    </button>
    Scale {{ 0 }}
    <button @click="handleScale(1)">
      click +
    </button>
  </div>
  <input v-model="additionalValue">

  <button @click="addTo">
    add
  </button>
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
