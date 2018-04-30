/* global test, expect, describe, test, beforeAll, afterAll, beforeEach */

import fetchMock from 'fetch-mock'

describe('fetchWrapper', () => {
  let fetchWrapper

  beforeAll(() => {
    fetchMock.get('/some/path', (url, options) => {
      return options.headers
    })
  })

  afterAll(() => {
    fetchMock.restore()
  })

  beforeEach(() => {
    fetchWrapper = require('../fetchWrapper').default
  })

  test('async request interceptors', async () => {
    fetchWrapper.addInterceptor(async (request) => {
      request.headers = {
        'X-My-Header': 'correct'
      }
      return request
    })
    const response = await fetchWrapper('/some/path', {
      method: 'GET'
    })
    const data = await response.json()
    expect(data['X-My-Header']).toBe('correct')
  })
})
