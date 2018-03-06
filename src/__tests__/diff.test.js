/* global test, describe, expect */

import diff from '../diff'

describe('diff', () => {
  test('no diff between identical objects', () => {
    const result = diff({foo: true}, {foo: true})
    expect(result).toEqual({})
  })

  test('diff A against B', () => {
    const a = {foo: true}
    const b = {foo: false}
    const result = diff(a, b)
    expect(result).toEqual({foo: false})
  })

  test('diff B against A', () => {
    const a = {foo: true}
    const b = {foo: false}
    const result = diff(b, a)
    expect(result).toEqual({foo: true})
  })

  test('diff nested objects', () => {
    const a = {
      name: 'jeff',
      labels: {
        theStrongest: true,
        tags: ['rich']
      },
      props: {
        dank: false
      }
    }
    const b = {
      name: 'cirno',
      labels: {
        theStrongest: true,
        tags: [9]
      },
      props: {
        fresh: false,
        dank: true
      }
    }
    const result = diff(a, b)
    expect(result).toEqual({
      name: 'cirno',
      labels: {
        tags: [9]
      },
      props: {
        fresh: false,
        dank: true
      }
    })
  })
})
