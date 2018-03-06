/* global describe, test, expect */

import jsonClone from '../jsonClone'

describe('jsonClone', () => {
  test('clone an object', () => {
    const o = {
      foo: 'bar',
      baz: null
    }
    expect(jsonClone(o)).toEqual(o)
  })
})
