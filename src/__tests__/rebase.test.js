/* global test, describe, expect */

import rebase from '../rebase'

describe('rebase', () => {
  test('added properties are not lost', () => {
    const base = {
      a: 'bar'
    }
    const a = {
      ...base,
      b: 'nani?'
    }
    const b = {
      ...base,
      c: 'test'
    }
    expect(a).toEqual({
      a: 'bar',
      b: 'nani?'
    })
    expect(b).toEqual({
      a: 'bar',
      c: 'test'
    })
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

  test('sane handling of empty checkpoints', () => {
    const base = {
      key: 'value'
    }
    const a = {}
    const b = {
      key: 'balue'
    }
    const result = rebase(base, a, b)
    expect(result).toEqual({
      key: 'balue'
    })
  })

  test('arrays of objects, last write wins', () => {
    const base = {
      refs: [
        {
          id: 1
        },
        {
          id: 2,
          key: 'foo'
        }
      ]
    }
    const a = {
      refs: [
        {
          id: 1
        },
        {
          id: 2,
          key: 'bar'
        },
        {
          id: 3
        }
      ]
    }
    const b = {
      refs: [
        {
          id: 1
        },
        {
          id: 2,
          key: 'foo'
        },
        {
          id: 3
        }
      ]
    }
    const result = rebase(base, a, b)
    expect(result).toEqual({
      refs: [
        {
          id: 1
        },
        {
          id: 2,
          key: 'foo'
        },
        {
          id: 3
        }
      ]
    })
  })

  test('deeply nested objects', () => {
    const base = {
      props: {
        options: {
          a: 'foo',
          subOption: {
            baz: true,
            filter: ['condition1', 'condition2']
          }
        },
        tags: ['one', 'two']
      }
    }
    const a = {
      props: {
        options: {
          a: 'bar',
          subOption: {
            baz: true,
            filter: ['condition1', 'condition2']
          }
        }
      }
    }
    const b = {
      props: {
        options: {
          a: 'foo',
          subOption: {
            baz: true
          }
        },
        tags: ['one', 'two']
      }
    }
    const result = rebase(base, a, b)
    expect(result).toEqual({
      props: {
        options: {
          a: 'bar',
          subOption: {
            baz: true,
            filter: null
          }
        },
        tags: null
      }
    })
  })

  test('objects with array keys', () => {
    const base = {
      name: 'jeff',
      tags: ['one', 'two', 'three']
    }
    const a = {
      ...base,
      tags: ['one', 'two']
    }
    expect(a).toEqual({
      name: 'jeff',
      tags: ['one', 'two']
    })
    const result = rebase(base, a)
    expect(result).toEqual({
      name: 'jeff',
      tags: ['one', 'two']
    })
  })
})
