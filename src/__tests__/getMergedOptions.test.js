/* global describe, test, expect, beforeEach */
import getMergedOptions from '../getMergedOptions'

describe('getMergedOptions', () => {
  let FakeVm

  beforeEach(() => {
    FakeVm = {
      $options: {
        asyncData: {
          async myProp () {
            return {}
          }
        },
        mixins: [
          {
            asyncData: {
              myPropLazy: true
            }
          }
        ]
      }
    }
  })

  test('get and merge all mixin options', () => {
    const result = getMergedOptions(FakeVm, 'asyncData')
    expect(result).toMatchObject({
      myProp: FakeVm.$options.asyncData.myProp,
      myPropLazy: true
    })
  })

  test('retrun null if empty', () => {
    const result = getMergedOptions(FakeVm, 'myOption')
    expect(result).toBe(null)
  })
})
