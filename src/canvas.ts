import type { DrawOptions, Position, TickLabel, TickStyle } from './type'

export function draw(canvas: HTMLCanvasElement, stepWidth: number, stepSecond: number, options: DrawOptions) {
  clear(canvas)
  const tickCount = Math.floor(canvas.width / (stepWidth * 10))

  for (let index = 0; index <= tickCount; index++) {
    const x = index * stepWidth * 10
    if (index > 0) {
      drawLine(
        canvas,
        x,
        0,
        x,
        options.tick.height,
        options.tick.color,
        options.tick.width,
      )
      drawTimeLabel(canvas, index * stepSecond, {
        x: x + options.label.offset.x,
        y: options.label.offset.y,
      },
      options.label.style)
    }

    for (let k = 1; k < 10; k++) {
      const sX = x + k * stepWidth
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
function drawTimeLabel(canvas: HTMLCanvasElement, time: number, position: Position, style: Required<TickLabel>['style']) {
  const date = new Date('2022-01-01 00:00:00')
  date.setTime(date.getTime() + time * 1000)

  const hour = date.getHours()
  const label = `${hour > 0 ? `${fill(hour)}:` : ''}${fill(date.getMinutes())}:${fill(date.getSeconds())}`
  const context = canvas.getContext('2d')
  if (context) {
    context.fillStyle = style
    context.fillText(label, position.x, position.y)
  }
}
