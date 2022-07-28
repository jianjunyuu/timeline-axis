import { afterAll, vi } from 'vitest'
// @ts-expect-error: Global type missing
global.jest = vi
// @ts-expect-error: Global type missing
// eslint-disable-next-line import/first
import getCanvasWindow from 'jest-canvas-mock/lib/window'

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
] as const

const canvasWindow = getCanvasWindow({ document: window.document })

apis.forEach((api) => {
  global[api] = canvasWindow[api]
  global.window[api] = canvasWindow[api]
})

afterAll(() => {
  // @ts-expect-error: type
  delete global.jest
  // @ts-expect-error: type
  delete global.window.jest
})
