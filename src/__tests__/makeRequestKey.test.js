/* global test, describe, expect */

import makeRequestKey from '../makeRequestKey'

describe('makeRequestKey', () => {
  test('generate a numeric key', () => {
    const key = makeRequestKey('https://citygro.com', {
      method: 'GET',
      headers: {
        'X-CLACKS-OVERHEAD': 'GNU Terry Pratchett'
      }
    })
    expect(key).toBe('GET-223285')
  })

  test('deterministic, unique keys', () => {
    const url = 'https://app.citygro.com'
    const optionsA = {
      method: 'GET',
      headers: {
        'X-CLACKS-OVERHEAD': 'GNU Terry Pratchett'
      }
    }
    const optionsB = {
      method: 'GET'
    }
    expect(makeRequestKey(url, optionsA)).toBe(makeRequestKey(url, optionsA))
    expect(makeRequestKey(url, optionsB)).toBe(makeRequestKey(url, optionsB))
    expect(makeRequestKey(url, optionsA)).not.toBe(makeRequestKey(url, optionsB))
  })
})
