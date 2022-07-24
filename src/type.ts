import type { Steps } from './config'

/** Like Required but recursive */
export declare type DeepRequired<T> = T extends Map<infer K, infer V>
  ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlyMap<infer K, infer V>
    ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
    : T extends WeakMap<infer K, infer V>
      ? WeakMap<DeepRequired<K>, DeepRequired<V>>
      : T extends Set<infer U>
        ? Set<DeepRequired<U>>
        : T extends ReadonlySet<infer U>
          ? ReadonlySet<DeepRequired<U>>
          : T extends WeakSet<infer U>
            ? WeakSet<DeepRequired<U>>
            : T extends Promise<infer U>
              ? Promise<DeepRequired<U>>
              : T extends {}
                ? {
                    [K in keyof T]-?: DeepRequired<T[K]>;
                  }
                : Required<T>
export interface Position {
  x: number
  y: number
}
export interface TickStyle {
  // 刻度线高
  height?: number
  // 刻度线颜色
  color?: string // CanvasFillStrokeStyles['strokeStyle']
  // 刻度线宽度
  width?: number
}

export interface TickLabel {
  // 时间文字的偏移量
  offset?: Partial<Position>
  style?: string // CanvasFillStrokeStyles['fillStyle']
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
  // 画布偏移
  offset?: Partial<Position>
}

export type RequiredOptions = DeepRequired<Options>
export type DrawOptions = Pick<RequiredOptions, 'tick' | 'smallTick' | 'label' | 'offset'>
export interface Scale {
  step: typeof Steps[number]
  // 刻度的宽度（px）
  width: number
  second: number
  text: string
}
