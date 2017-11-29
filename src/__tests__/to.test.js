/* global describe, test, expect */
import to from '../to'

describe('utils/to', () => {
  test('return a value when resolved', async () => {
    const i = 42
    const promise = Promise.resolve(i)
    const [err, data] = await to(promise)
    expect(err).toBeNull()
    expect(data).toBe(i)
  })
  test('return an error when promise is rejected', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    const promise = Promise.reject('Error')
    const [err, data] = await to(promise)
    expect(err).toEqual('Error')
    expect(data).toBeUndefined()
  })
})
