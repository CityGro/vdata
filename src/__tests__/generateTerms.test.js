/* global test, describe, expect */

import generateTerms from '../generateTerms'

describe('vQuery/generateTerms', () => {
  test('transform default options expression', () => {
    const q = generateTerms({}, {
      myProp: true
    })
    expect(q).toEqual([
      ['myProp', {
        force: false,
        id: false,
        lazy: false,
        sync: true
      }]
    ])
  })
  test('evaluate function options', () => {
    const vm = {id: 13}
    const q = generateTerms(vm, {
      myModel () {
        return {
          force: true,
          id: this.id,
          lazy: true,
          sync: false
        }
      }
    })
    expect(q).toEqual([
      ['myModel', {
        force: true,
        id: 13,
        lazy: true,
        sync: false
      }]
    ])
  })
  test('apply defaults to objects', () => {
    const q = generateTerms({}, {
      myUsers: {
        force: true
      }
    })
    expect(q).toEqual([
      ['myUsers', {
        force: true,
        id: false,
        lazy: false,
        sync: true
      }]
    ])
  })
})
