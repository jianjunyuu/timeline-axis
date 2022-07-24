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
    const scale = this.scale
    this.scales = getScales(this.options.duration)
    const index = this.scales.findIndex((obj) => {
      return obj.step === scale?.step && obj.second === scale.second && obj.width === scale.width
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
    if (value < 0)
      value = 0

    else if (value > this.scales.length - 1)
      value = this.scales.length - 1

    this.scaleIndex = value

    this.setOptions({})
  }
}

function update(instance: TimelineAxis, options: RequiredOptions) {
  const { width, height } = options
  const canvas = instance.dom
  const scale = instance.scale

  // 设置画布的大小
  canvas.width = width
  canvas.height = height
  if (scale)
    draw(canvas, scale.width, scale.second)
}
