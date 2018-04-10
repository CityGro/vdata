/* global describe, test, expect */

import map from 'lodash/map'
import range from 'lodash/range'
import uniq from 'lodash/uniq'
import uniqueId from '../uniqueId'

describe('utils/uniqueId', () => {
  test('emits a random numeric identifier', () => {
    const vs = map(range(500), () => uniqueId())
    expect(vs.length === uniq(vs).length).toBe(true)
  })
  test('supports prefixing', () => {
    const v = uniqueId('prefix')
    expect(v).toMatch(/^prefix-.+$/)
  })
})
