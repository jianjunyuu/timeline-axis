import { merge } from 'lodash-es'
import { draw } from './canvas'
import { config } from './config'
import { getScales } from './scale'
import type { Options, RequiredOptions, Scale } from './type'

export class TimelineAxis {
  dom = document.createElement('canvas')
  private options: RequiredOptions = config
  private scales: Scale[] = []
  private scaleIndex = 0
  constructor(options: Options) {
    this.setOptions(options)
  }

  get zoomable() {
    return true
  }

  get scale(): Scale | undefined {
    return this.scales[this.scaleIndex]
  }

  setOptions(options: Options) {
    this.options = merge({}, this.options, options)

    // 根据新的scales计算新的索引值
    const oldScale = this.scale
    this.scales = getScales(this.options.duration)
    const index = this.scales.findIndex((obj) => {
      return isSome(obj, oldScale)
    })
    this.scaleIndex = index < 0
      ? 0
      : index

    update(this, this.options)
  }

  // 放大
  zoomIn() {
    this.zoomTo(this.scaleIndex + 1)
  }

  // 缩小
  zoomOut() {
    this.zoomTo(this.scaleIndex - 1)
  }

  zoomTo(value: number) {
    const oldScale = this.scale
    if (value === this.scaleIndex)
      return
    if (value < 0)
      value = 0

    else if (value > this.scales.length - 1)
      value = this.scales.length - 1

    this.scaleIndex = value
    const newScale = this.scale
    if (!isSome(newScale, oldScale)) {
      // Tips: 受DeepRequired的影响，onScaleChange的类型由 () => {} -> {}
      // 故在此断言
      const onScaleChange = this.options.onScaleChange as Options['onScaleChange']
      onScaleChange?.(this.scale!, oldScale)
    }
    this.setOptions({})
  }
}

function update(instance: TimelineAxis, options: RequiredOptions) {
  const { width, height, tick, smallTick, label, offset } = options
  const canvas = instance.dom
  const scale = instance.scale

  // 设置画布的大小
  canvas.width = width
  canvas.height = height
  if (scale) {
    draw(canvas, scale.width, scale.second, {
      tick, smallTick, label, offset,
    })
  }
}

function isSome(scale1: Scale | undefined, scale2: Scale | undefined) {
  return scale1?.step === scale2?.step && scale1?.second === scale2?.second && scale1?.width === scale2?.width
}
