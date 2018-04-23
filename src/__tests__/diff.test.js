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

  test('diff when base = null without exploding', () => {
    const a = null
    const b = {
      key: 'value'
    }
    const result = diff(a, b)
    expect(result).toEqual({key: 'value'})
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

  test('enforce/detect property removal', () => {
    const a = {
      name: 'satori',
      role: 'something'
    }
    const b = {
      name: 'satori'
    }
    const result1 = diff(a, b)
    expect(result1).toEqual({
      role: null
    })
    const withTags = {
      tags: ['one', 'two', 'three']
    }
    const lessTags = {
      tags: ['one', 'two']
    }
    const result2 = diff(withTags, lessTags)
    expect(result2).toEqual({
      tags: ['one', 'two']
    })
  })
})
