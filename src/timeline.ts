import { merge } from 'lodash-es'
import { render } from './canvas'
import { timelineOptions } from './config'
import type { RequiredTimelineOptions, TimelineOptions } from './type'

export class Timeline {
  #dom = document.createElement('canvas')
  #container: HTMLElement
  private options: RequiredTimelineOptions = timelineOptions
  constructor(container: HTMLElement, options: TimelineOptions) {
    this.options = merge({}, this.options, options)

    this.#dom.style.position = 'absolute'
    this.#container = container
    setPosition(this.#container)
    this.#container.appendChild(this.#dom)

    // TODO 监听容器的宽度变化，并更新画布的宽度

    this.#update()
  }

  setFrameWidth(width: number) {
    this.options.frameWidth = width
    this.#update()
  }

  setOffset(x: number) {
    this.options.offset.x = x
    this.#update()
  }

  setHeight(height: number) {
    this.options.height = height
    this.#update()
  }

  #update() {
    const { height } = this.options
    this.#container.style.height = `${height}px`
    const rect = this.#container.getBoundingClientRect()
    this.#dom.width = rect.width
    this.#dom.height = rect.height

    render(this.#dom, this.options)
  }
}

function setPosition(el: HTMLElement) {
  const style = window.getComputedStyle(el)
  if (style.position === 'static')
    el.style.position = 'relative'
}
