import type { Position, RequiredTimelineOptions, Step, TickLabel, TickStyle } from './type'

export function render(canvas: HTMLCanvasElement, options: RequiredTimelineOptions) {
  clear(canvas)
  const { frameWidth, steps, offset, label, fps } = options

  const step = getStep(steps, frameWidth)

  const stepWidth = step.frames * frameWidth
  const tickWidth = stepWidth / (step.ticks + 1)

  const startStep = Math.floor(offset.x / stepWidth) - 1
  let stepCount = Math.floor(canvas.width / stepWidth)

  let index = startStep
  while (index <= stepCount + startStep) {
    const x = index * stepWidth - offset.x
    if (x < 0)
      stepCount += 1

    const time = index * (step.frames / fps)

    drawLine(
      canvas,
      x,
      0,
      x,
      options.tick.height,
      options.tick.color,
      options.tick.width,
    )

    const frames = index * step.frames
    const labelText = step.type === 'frame' && frames % fps !== 0 ? `${frames % fps}F` : getTimeLabel(time)

    drawTimeLabel(
      canvas,
      labelText,
      {
        x: x + label.offset.x,
        y: label.offset.y,
      },
      options.label,
    )

    if (step.ticks > 0) {
      for (let k = 1; k <= step.ticks; k++) {
        const sX = x + k * tickWidth
        if (sX >= 0) {
          drawLine(
            canvas,
            sX,
            0,
            sX,
            options.smallTick.height,
            options.smallTick.color,
            options.smallTick.width,
          )
        }
      }
    }

    index++
  }
}

function clear(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  context?.clearRect(0, 0, canvas.width, canvas.height)
}

function drawLine(canvas: HTMLCanvasElement, beginX: number, beginY: number, endX: number, endY: number, color: Required<TickStyle>['color'], lineWidth: number) {
  const context = canvas.getContext('2d')
  if (context) {
    context.beginPath()
    context.moveTo(beginX, beginY)
    context.lineTo(endX, endY)
    context.strokeStyle = color
    context.lineWidth = lineWidth
    context.stroke()
  }
}

function fill(value: number) {
  return value < 10 ? `0${value}` : `${value}`
}

function drawTimeLabel(canvas: HTMLCanvasElement, text: string, position: Position, labelStyle: Required<TickLabel>) {
  const context = canvas.getContext('2d')
  if (context) {
    context.fillStyle = labelStyle.style
    context.font = labelStyle.font

    context.fillText(text, position.x, position.y)
  }
}

function getTimeLabel(second: number) {
  const date = new Date('2022-01-01 00:00:00')
  date.setTime(date.getTime() + second * 1000)

  const hour = date.getHours()
  const label = `${hour > 0 ? `${fill(hour)}:` : ''}${fill(date.getMinutes())}:${fill(date.getSeconds())}`

  return label
}

function getStep(steps: Step[], frameWidth: number): Step {
  let sp: Step = steps[0]
  let si = 0
  while (si < steps.length) {
    const s = steps[si]
    if (frameWidth > s.frameWidth)
      return sp

    else
      sp = s

    si++
  }
  return sp
}
