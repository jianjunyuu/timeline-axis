import type { Steps } from './config'

export interface Options {
  // 画布宽度
  width?: number
  // 画布宽度
  height?: number
  // 时长(秒)
  duration?: number
}

export type RequiredOptions = Required<Options>

export interface Scale {
  step: typeof Steps[number]
  // 刻度的宽度（px）
  width: number
  second: number
  text: string
}
