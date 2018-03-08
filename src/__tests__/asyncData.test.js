/* global jest, describe, test, beforeEach, expect */
/** !
 * vue-async-data
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 kamijin-fanta
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import Vue from 'vue/dist/vue.js'
import AsyncDataMixin from '../AsyncDataMixin'

Vue.config.productionTip = false

describe('AsyncData', () => {
  let resolve = (done) => {
    return new Vue({
      template: `<div></div>`,
      mixins: [AsyncDataMixin],
      asyncData: {
        sandbox () {
          return new Promise((resolve, reject) => {
            this.counter++
            resolve('OK!' + this.counter)
            setTimeout(() => {
              if (done) done()
            }, 10)
          })
        },
        sandboxDefault: 'Default!'
      },
      data () {
        return {
          counter: 0
        }
      }
    }).$mount()
  }
  let reject = (done) => {
    return new Vue({
      template: `<div></div>`,
      mixins: [ AsyncDataMixin ],
      asyncData: {
        sandbox () {
          return new Promise((resolve, reject) => {
            this.counter++
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('NG!' + this.counter) // FIXME
            setTimeout(() => {
              if (done) done()
            }, 50)
          })
        }
      },
      data () {
        return {
          counter: 0
        }
      }
    }).$mount()
  }

  beforeEach(() => {
    jest.resetModules()
    Vue.config.productionTip = false
  })

  test('If "asyncData" property is not found, mixin does not work.', () => {
    let emptyVm = new Vue({
      template: `<div></div>`,
      mixins: [ AsyncDataMixin ]
    }).$mount()
    expect(emptyVm.asyncLoading).toEqual(undefined)
  })

  test('Default property is set.', () => {
    let resolveVm = resolve()
    expect(resolveVm.asyncLoading).toEqual(true)
    expect(resolveVm.asyncError).toEqual(false)
    expect(resolveVm.sandbox).toEqual('Default!')
  })

  test('Resolve promise.', (done) => {
    let resolveVm = resolve(() => {
      expect(resolveVm.sandbox).toEqual('OK!1')
      expect(resolveVm.sandboxLoading).toEqual(false)
      expect(resolveVm.asyncLoading).toEqual(false)
      expect(resolveVm.asyncError).toEqual(false)
      done()
    })
    expect(resolveVm.asyncError).toEqual(false)
  })

  test('Reject promise.', (done) => {
    let rejectVm = reject(() => {
      expect(rejectVm.sandboxError).toEqual('NG!1')
      expect(rejectVm.sandboxLoading).toEqual(false)
      expect(rejectVm.asyncError).toEqual(true)
      done()
    })
    expect(rejectVm.asyncError).toEqual(false)
  })

  test('lazy reload.', () => {
    jest.useFakeTimers()
    const spy = jest.fn()
    const lazyVm = new Vue({
      template: `<div></div>`,
      mixins: [ AsyncDataMixin ],
      asyncData: {
        sandbox () {
          spy()
          return new Promise((resolve) => {
            spy()
            resolve('OK!')
          })
        },
        sandboxDefault: 'Default!',
        sandboxLazy: true
      }
    }).$mount()
    expect(lazyVm.sandboxLoading).toEqual(false)
    expect(spy).not.toHaveBeenCalled()
    const promise = lazyVm.$asyncReload('sandbox')
    expect(promise).toBeDefined()
    expect(promise).toBeInstanceOf(Promise)
    jest.runAllTimers()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('merge options', () => {
    Vue.mixin(AsyncDataMixin)
    const AsyncNeg = {
      asyncData: {
        neg () {
          return Promise.resolve(false)
        }
      }
    }
    const AsyncZero = {
      asyncData: {
        zero () {
          return Promise.resolve(false)
        }
      }
    }
    const AsyncOne = {
      mixins: [
        AsyncNeg,
        AsyncZero
      ],
      asyncData: {
        one () {
          return Promise.resolve(false)
        }
      }
    }
    const AsyncTwo = {
      asyncData: {
        two () {
          return Promise.resolve(false)
        }
      }
    }
    const AsyncThree = {
      mixins: [
        AsyncTwo
      ],
      asyncData: {
        three () {
          return Promise.resolve(false)
        }
      }
    }
    const vm = new Vue({
      template: `<div></div>`,
      mixins: [
        AsyncOne,
        AsyncThree
      ],
      asyncData: {
        four () {
          return Promise.resolve(false)
        }
      }
    }).$mount()
    expect(vm.negPromise).toBeDefined()
    expect(vm.zeroPromise).toBeDefined()
    expect(vm.onePromise).toBeDefined()
    expect(vm.twoPromise).toBeDefined()
    expect(vm.threePromise).toBeDefined()
    expect(vm.fourPromise).toBeDefined()
  })
})
