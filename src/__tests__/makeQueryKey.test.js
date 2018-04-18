/* global expect, test, describe */

import makeQueryKey from '../makeQueryKey'

describe('makeQueryKey', () => {
  test('compress a query into a small, deterministic key', () => {
    const collectionName = 'myCollection'
    const query = {
      key: 'value',
      'some:special:request': 'data'
    }
    const key = makeQueryKey(collectionName, query)
    expect(key).toBe(makeQueryKey(collectionName, query))
    expect(key).toBe('myCollection-4026')
  })
})
