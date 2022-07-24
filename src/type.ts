import type { DeepRequired } from 'ts-essentials'
import type { Steps } from './config'
export interface Position {
  x: number
  y: number
}
export interface TickStyle {
  // 刻度线高
  height?: number
  // 刻度线颜色
  color?: CanvasFillStrokeStyles['strokeStyle']
  // 刻度线宽度
  width?: number
}

export interface TickLabel {
  // 时间文字的偏移量
  offset?: Partial<Position>
  style?: CanvasFillStrokeStyles['fillStyle']
}
export interface Options {
  // 画布宽度
  width?: number
  // 画布宽度
  height?: number
  // 时长(秒)
  duration?: number
  // 刻度样式
  tick?: TickStyle
  // 细刻度样式
  smallTick?: TickStyle
  // 刻度文案
  label?: TickLabel
}

export type RequiredOptions = DeepRequired<Options>
export type DrawOptions = Pick<RequiredOptions, 'tick' | 'smallTick' | 'label'>
export interface Scale {
  step: typeof Steps[number]
  // 刻度的宽度（px）
  width: number
  second: number
  text: string
}
