import { describe, expect, it } from 'vitest'
import { getScaleStep, getScales } from '../src/scale'

describe('get step', () => {
  it.each([
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 3],
    [5, 5],
    [6, 5],
    [10, 10],
    [11, 10],
    [20, 20],
    [21, 20],
    [30, 30],
    [99, 30],
  ])('getScaleStep(%i) -> %i', (value, expected) => {
    expect(getScaleStep(value)).toBe(expected)
  })
})

describe('get scales by duration(second)', () => {
  it.each([
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [9],
    [10],
    [19],
    [20],
    [30],
    [59],
    [60],
    [61],
    [90],
    [91],
    [120],
    [121],
    [30 * 60 + 10],
    [60 * 60],
    [60 * 60 + 1],
  ])('getScales(%i) -> %j', (value) => {
    expect(getScales(value)).toMatchSnapshot()
  })
})
