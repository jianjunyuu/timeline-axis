export function timeline() {

}
export type ScaleStepsValues = typeof ScaleSteps[number]
export const ScaleSteps = [1, 2, 3, 5, 10, 20, 30] as const
export function getScaleStep(t: number): ScaleStepsValues {
  let stepIndex = ScaleSteps.length - 1
  while (stepIndex >= 0) {
    if (t >= ScaleSteps[stepIndex])
      return ScaleSteps[stepIndex]

    stepIndex--
  }

  return ScaleSteps[0]
}

/**
 * min 1(40,25,15) 2(20) 3(23) 5(30,20) 10(30,20,15,12) max
 * 1s 2s 3s 5s 10s 20s 30s
 * 1m 2m 3m 5m 10m 20m 30m
 * 1h 2h 3h 6h 12h 24h
 */
export const StepWidthMap: Record<typeof ScaleSteps[number], number[]> = {
  1: [40, 25, 15],
  2: [20],
  3: [23],
  5: [30, 20],
  10: [30, 20, 15, 12],
  20: [20],
  30: [23],
}
