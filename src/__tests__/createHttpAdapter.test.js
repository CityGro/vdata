/* global describe, test, expect, beforeEach, beforeAll, afterAll */

import fetchMock from 'fetch-mock'
import createHttpAdapter from '../createHttpAdapter'

describe('createHttpAdapter', () => {
  test('returns an adapter function', () => {
    const http = createHttpAdapter()
    expect(http).toBeDefined()
    expect(http.apply).toBeDefined()
    expect(http.call).toBeDefined()
  })
})

describe('httpAdapter', () => {
  let http
  beforeAll(() => {
    fetchMock.get('*', {name: 'jeff'})
  })
  beforeEach(() => {
    http = createHttpAdapter()
  })
  afterAll(() => {
    fetchMock.restore()
  })

  test('identical requests return the same promise', () => {
    const request = {
      method: 'GET',
      url: '/foo/bar'
    }
    const promiseA = http(request)
    const promiseB = http(request)
    expect(promiseA).toBe(promiseB)
    const requestWithHeaders = {
      method: 'GET',
      url: '/foo/bar?name=something',
      headers: {
        'X-My-Header': 'FOOBAR'
      }
    }
    const promiseAWithHeaders = http(requestWithHeaders)
    const promiseBWithHeaders = http(requestWithHeaders)
    expect(promiseAWithHeaders).toBe(promiseBWithHeaders)
    expect(promiseAWithHeaders).not.toBe(promiseA)
    expect(promiseBWithHeaders).not.toBe(promiseB)
  })

  test('force = true bypasses promise cache', () => {
    const request = {
      force: true,
      method: 'GET',
      url: '/foo/bar'
    }
    const promiseA = http(request)
    const promiseB = http(request)
    expect(promiseA).not.toBe(promiseB)
  })
})
