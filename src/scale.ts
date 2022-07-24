import { StepWidthMap, Steps } from './config'
import type { Scale } from './type'

export function getScaleStep(t: number): Scale['step'] {
  let stepIndex = Steps.length - 1
  while (stepIndex >= 0) {
    if (t >= Steps[stepIndex])
      return Steps[stepIndex]

    stepIndex--
  }

  return Steps[0]
}

export function getScales(duration: number) {
  const scales: Scale[] = []
  const [hour, minute, second] = getTime(duration)
  if (hour > 0)
    scales.push({ step: 1, width: 30, second: 60 * 60, text: `${1}时` })
  if (hour > 0 || minute > 0) {
    const value = getScaleStep(hour > 0 ? 59 : minute)
    for (let index = Steps.length - 1; index >= 0; index--) {
      const step = Steps[index]
      if (value >= step)
        scales.push(...StepWidthMap[step].map(width => ({ step, width, second: step * 60, text: `${step}分` })).reverse())
    }
  }

  const value = getScaleStep(minute > 0 ? 59 : second)
  for (let index = Steps.length - 1; index >= 0; index--) {
    const step = Steps[index]
    if (value >= step)
      scales.push(...StepWidthMap[step].map(width => ({ step, width, second: step, text: `${step}秒` })).reverse())
  }

  return scales
}
function getTime(duration: number): [number, number, number] {
  const date = new Date('2022-01-01 00:00:00')
  date.setTime(date.getTime() + duration * 1000)
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
}
