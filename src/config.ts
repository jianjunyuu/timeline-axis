import type { RequiredTimelineOptions, Step } from './type'

const steps: Step[] = [
  {
    type: 'frame',
    frameWidth: 300,
    frames: 1,
    ticks: 0,
  },
  {
    type: 'frame',
    frameWidth: 200,
    frames: 2,
    ticks: 1,
  },
  {
    type: 'frame',
    frameWidth: 100,
    frames: 4,
    ticks: 1,
  },
  {
    type: 'frame',
    frameWidth: 50,
    frames: 10,
    ticks: 9,
  },
  {
    type: 's',
    frameWidth: 20,
    frames: 30, // 1s
    ticks: 9,
  },
  {
    type: 's',
    frameWidth: 10,
    frames: 60, // 2s
    ticks: 9,
  },
  {
    type: 's',
    frameWidth: 5,
    frames: 90, // 3s
    ticks: 9,
  },
  {
    type: 's',
    frameWidth: 1.5,
    frames: 300, // 10
    ticks: 9,
  },
  {
    type: 's',
    frameWidth: 0.5,
    frames: 600, // 10
    ticks: 9,
  },
  {
    type: 's',
    frameWidth: 0.2,
    frames: 900, // 10
    ticks: 9,
  },
  {
    type: 'm',
    frameWidth: 0.1,
    frames: 30 * 60, // 10
    ticks: 9,
  },
]

export const timelineOptions: RequiredTimelineOptions = {
  fps: 30,
  frameWidth: 1,
  height: 18,
  offset: {
    x: 0,
    y: 0,
  },
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
  steps,
}
