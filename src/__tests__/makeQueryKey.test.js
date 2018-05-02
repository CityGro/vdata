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
    expect(key).toBe('myCollection-163088')
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

  test('no hash collision when swapping property names', () => {
    const collectionName = 'myCollection'
    const queryA = {
      a: true,
      b: {
        c: true
      },
      d: 'asdf'
    }
    const queryB = {
      c: true,
      b: {
        a: true
      },
      d: 'fdsa'
    }
    const keyA = makeQueryKey(collectionName, queryA)
    const keyB = makeQueryKey(collectionName, queryB)
    expect(keyA).not.toBe(keyB)
  })
})
