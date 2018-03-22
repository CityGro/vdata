/* global describe, test, expect */

import fastDiff from '../fastDiff'

describe('fastDiff', () => {
  test('returns true different objects', () => {
    const a = {
      bar: false
    }
    const b = {
      bar: true
    }
    expect(fastDiff(a, b)).toBe(true)
  })

  test('returns false for identical objects', () => {
    const a = {
      bar: true
    }
    const b = {
      bar: true
    }
    expect(fastDiff(a, b)).toBe(false)
  })
})
