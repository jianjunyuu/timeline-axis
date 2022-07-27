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
  private nextScaleIndex = -1
  constructor(options: Options) {
    this.setOptions(options)
  }

  get scale(): Scale | null {
    return this.scales[this.scaleIndex]
  }

  setOptions(options: Options) {
    this.options = merge({}, this.options, options)

    const oldScale = this.scale
    if (typeof options.duration !== 'undefined') {
      // 根据新的scales计算新的索引值
      this.scales = getScales(this.options.duration)
    }
    if (this.nextScaleIndex >= 0) {
      this.scaleIndex = this.nextScaleIndex
      this.nextScaleIndex = -1
    }
    else {
      const index = this.scales.findIndex((obj) => {
        return isSome(obj, oldScale)
      })
      this.scaleIndex = index < 0
        ? 0
        : index
    }

    const newScale = this.scale!
    if (!isSome(newScale, oldScale))
      this.options.onScaleChange(newScale, oldScale)

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
    if (value === this.scaleIndex)
      return
    if (value < 0)
      value = 0

    else if (value > this.scales.length - 1)
      value = this.scales.length - 1

    this.nextScaleIndex = value

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

function isSome(scale1: Scale | null, scale2: Scale | null) {
  return scale1?.step === scale2?.step && scale1?.second === scale2?.second && scale1?.width === scale2?.width
}
