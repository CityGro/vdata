/* global test, describe, expect */

import rebase from '../rebase'

describe('rebase', () => {
  test('added properties are not lost', () => {
    const base = {
      a: 'bar'
    }
    const a = {
      b: 'nani?'
    }
    const b = {
      c: 'test'
    }
    const result = rebase(base, a, b)
    expect(result).toEqual({
      a: 'bar',
      b: 'nani?',
      c: 'test'
    })
  })

  test('last write wins', () => {
    const base = {
      type: 'MEME',
      props: {
        dank: false
      }
    }
    const a = {
      type: 'MEME',
      props: {
        fresh: true
      }
    }
    const b = {
      type: 'MEME',
      props: {
        fresh: false,
        dank: true
      }
    }
    const result = rebase(base, a, b)
    expect(result).toEqual({
      type: 'MEME',
      props: {
        fresh: false,
        dank: true
      }
    })
  })
})
