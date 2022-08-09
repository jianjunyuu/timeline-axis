import type { RequiredOptions } from './type'

export const Steps = [1, 2, 3, 5, 10, 20, 30] as const
/**
 * min 1(40,25,15) 2(20) 3(23) 5(30,20) 10(30,20,15,12) max
 * 1s 2s 3s 5s 10s 20s 30s
 * 1m 2m 3m 5m 10m 20m 30m
 * 1h 2h 3h 6h 12h 24h
 */
export const StepWidthMap: Record<typeof Steps[number], number[]> = {
  1: [40, 25, 15],
  2: [20],
  3: [23],
  5: [30, 20],
  10: [30, 20, 15, 12],
  20: [20],
  30: [23],
}

export const config: RequiredOptions = {
  offset: {
    x: 0,
    y: 0,
  },
  width: 500,
  height: 18,
  duration: 10,
  tick: {
    width: 1,
    height: 18,
    color: 'rgba(151,158,167,1)',
  },
  smallTick: {
    width: 1,
    height: 5,
    color: 'rgba(151,158,167,1)',
  },
  label: {
    offset: {
      x: 8,
      y: 17,
    },
    style: 'rgba(151,158,167,1)',
    font: '',
  },
  onScaleChange() {},
}
