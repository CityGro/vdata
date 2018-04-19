/* global describe, test, expect */

import omitNil from '../omitNil'

describe('omitNil', () => {
  test('omit nil values in an array', () => {
    const arr = [1, 'a', null, undefined]
    return expect(omitNil(arr)).toEqual([1, 'a'])
  })

  test('omit key, value pairs wtesth a nil value', () => {
    const obj = {
      key: 'value',
      otherKey: null,
      anotherKey: undefined
    }
    return expect(omitNil(obj)).toEqual({key: 'value'})
  })
})
