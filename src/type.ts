/** Like Required but recursive */
export declare type DeepRequired<T> =
T extends (...args: any[]) => any
  ? T :
  T extends Map<infer K, infer V>
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
  font?: CanvasTextDrawingStyles['font']
}

export interface Step {
  // 类型
  type: 'frame' | 's' | 'm'
  // 帧宽
  frameWidth: number
  // 帧数：最小1
  frames: number
  // 刻度数
  ticks: number
}

export interface TimelineOptions {
  // 帧率
  fps?: number
  // 帧宽
  frameWidth?: number
  // 刻度样式
  tick?: TickStyle
  // 细刻度样式
  smallTick?: TickStyle
  // 刻度文案
  label?: TickLabel
  // 画布偏移
  offset?: Partial<Position>
  // 刻度配置
  steps?: Step[]
  // 画布高度
  height?: number
}

export type RequiredTimelineOptions = DeepRequired<TimelineOptions>
