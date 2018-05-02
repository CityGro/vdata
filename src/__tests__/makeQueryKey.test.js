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
    expect(key).toBe('myCollection-4274')
  })

  test('factor in request options that may alter the response', () => {
    const collectionName = 'myCollection'
    const query = {
      q: 'my search term'
    }
    const options = {
      headers: {
        'X-My-Header-Is': 'the best'
      }
    }
    const keyA = makeQueryKey(collectionName, query)
    const keyB = makeQueryKey(collectionName, query, options)
    expect(keyA).not.toBe(keyB)
  })
})
