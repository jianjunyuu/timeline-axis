import { describe, expect, it, vi } from 'vitest'
import { TimelineAxis } from '../src/timeline'

describe('test TimelineAxis without init dutation', () => {
  const change = vi.fn()
  const axis = new TimelineAxis({
    onScaleChange: change,
  })
  it('zoom to', () => {
    const spy = vi.spyOn(axis, 'setOptions')
    axis.zoomTo(1)
    expect(spy).toBeCalled()
    expect(change).not.toBeCalled()

    axis.zoomTo(1)

    expect(spy).toBeCalledTimes(2)
    expect(change).not.toBeCalled()

    vi.resetAllMocks()
  })

  it('zoom in', () => {
    const spy = vi.spyOn(axis, 'setOptions')
    axis.zoomIn()
    expect(spy).toBeCalled()
    expect(change).not.toBeCalled()

    axis.zoomIn()

    expect(spy).toBeCalledTimes(2)
    vi.resetAllMocks()
  })

  it('zoom out', () => {
    const spy = vi.spyOn(axis, 'setOptions')
    axis.zoomOut()
    expect(spy).toBeCalled()
    expect(change).not.toBeCalled()

    vi.resetAllMocks()
  })

  it('set duration can\'t call the change function.', () => {
    axis.setOptions({
      duration: 1000,
    })
    expect(change).not.toBeCalled()
  })
})

describe('test TimelineAxis with init dutation', () => {
  const change = vi.fn()
  const axis = new TimelineAxis({
    duration: 10,
    onScaleChange: change,
  })

  it('easy', () => {
    axis.zoomOut()
    axis.zoomOut()
    expect(change).toBeCalledTimes(0)

    axis.zoomIn()
    expect(change).toBeCalledTimes(1)

    axis.zoomOut()
    expect(change).toBeCalledTimes(2)
  })
})
