/* global describe, expect, test */

import toQueryString from '../toQueryString'

describe('toQueryString', () => {
  test('supports nested objects', () => {
    const o = {
      name: 'chef',
      i: {
        have: {
          value: true
        }
      }
    }
    expect(toQueryString(o)).toEqual('i%5Bhave%5D%5Bvalue%5D=true&name=chef')
  })
  test('deterministic encoding', () => {
    const o1 = {
      x: 1,
      y: 1,
      z: 1
    }
    const o2 = {
      y: 1,
      x: 1,
      z: 1
    }
    expect(toQueryString(o1)).toEqual(toQueryString(o2))
  })
})
