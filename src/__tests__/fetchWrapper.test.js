/* global jest, test, expect, describe, test, beforeAll, afterAll, beforeEach */

import fetchMock from 'fetch-mock'

describe('fetchWrapper', () => {
  let fetchWrapper

  beforeAll(() => {
    fetchMock.get('/some/path', (url, options) => {
      return options.headers
    })

    fetchMock.get('/some/error/path', () => {
      return {
        status: 500,
        body: {
          error: 'you done did it now!'
        }
      }
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

  test('throws for HTTP error responses', () => {
    return expect(new Promise(async (resolve, reject) => {
      try {
        const result = await fetchWrapper('/some/error/path', {method: 'GET'})
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })).rejects.toThrow()
  })

  test('calls onError handler if defined', async () => {
    const onError = jest.fn()
    fetchWrapper.onError(onError)
    await fetchWrapper('/some/error/path', {method: 'GET'})
    expect(onError).toHaveBeenCalled()
  })
})
