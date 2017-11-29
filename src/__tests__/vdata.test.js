/* global describe, test, beforeEach, jest, expect */

import * as dataFlow from '../dataFlow'
import formatMethod from '../formatMethod'
import updateVm from '../updateVm'

describe('vdata', () => {
  let Adapter
  let Vue
  let vdata

  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    require('localstorage-polyfill')
    vdata = require('../vdata').default
    Vue = require('vue')
    Vue.config.productionTip = false
    Adapter = require('js-data-localstorage').LocalStorageAdapter
    Vue.use(vdata, {
      models: {
        users: {
          idAttribute: 'id'
        },
        comments: {
          idAttribute: 'id'
        }
      },
      adapters: {
        ls: {
          adapter: new Adapter()
        }
      }
    })
    Vue.$store.create('users', {id: 1, name: 'omanizer'})
    Vue.$store.create('comments', {id: 1, userId: 1})
  })

  describe('plugin', () => {
    test('makes the store directly accessible', () => {
      const vm = new Vue()
      return Promise.all([
        expect(vm.$store).toBeDefined(),
        expect(vm.$store.get).toBeDefined()
      ])
    })

    test('can pass data via props', () => {
      Vue.config.isUnknownElement = () => false
      const Babby = Vue.component('babby', {
        render (createElement) {
          return createElement('p', (this.user) ? this.user.name : '')
        },
        props: ['user']
      })
      const Child = Vue.component('child', {
        render (h) {
          const self = this
          return h(Babby, {
            props: {
              user: self.user
            }
          })
        },
        props: ['user']
      })
      const Parent = Vue.component('parent', {
        render (h) {
          const self = this
          return h(Child, {
            props: {
              user: self.user
            }
          })
        },
        props: ['user']
      })
      const vm = new Vue({
        render (h) {
          const self = this
          return h(Parent, {
            props: {
              user: self.user
            }
          })
        },
        data () {
          return {
            user: {name: 'anon'}
          }
        },
        vdata (store) {
          const user = store.get('users', 1)
          if (user) {
            this.user = user
          }
        },
        methods: {
          rename (to) {
            return new Promise((resolve) => {
              this.user.name = to
              resolve(this.user)
            })
          }
        }
      }).$mount('#root')
      return Promise.all([
        expect(vm.$children).toHaveLength(1),
        expect(vm.$options.vdata).toBeDefined(),
        vm.$nextTick().then(() => {
          return Promise.all([
            Promise.all([
              expect(vm.user).toBeDefined(),
              expect(vm.user.name).toBe('anon')
            ]),
            vm.rename('xj9').then((user) => {
              return Promise.all([
                expect(user.name).toBe('xj9')
              ])
            })
          ])
        })
      ])
    })
  })

  describe('asyncData', () => {
    test('attaches the appropriate methods', () => {
      const vm = new Vue()
      return expect(vm.asyncReload).toBeDefined()
    })

    test('indicates loading state for async data resources', () => {
      const vm = new Vue({
        render (h) {
          const self = this
          return h('p', null, [(self.asyncLoading) ? 'loading' : 'done'])
        },
        data () {
          return {
            user: {name: 'anon'}
          }
        },
        asyncData: {
          user () {
            return this.$store.find('users', 1)
          }
        }
      }).$mount('#root')
      return vm.$nextTick().then(() => {
        return Promise.all([
          expect(vm.asyncLoading).toBeDefined(),
          expect(vm.user).toBeDefined()
        ])
      })
    })
  })

  describe('utils/updateVm', () => {
    test('applies diffs in a way that triggers js-data change detection', () => {
      const vm = new Vue({
        data () {
          return {user: {}}
        }
      })
      vm.user = vm.$store.createRecord('users', {id: 13, name: 'foo'})
      const updated = updateVm(vm, 'user', {name: 'bar'})
      return Promise.all([
        expect(updated.name).toEqual('bar'),
        expect(updated.hasChanges()).toBe(true)
      ])
    })
  })

  describe('utils/formatMethod', () => {
    test('formats value methods', () => {
      return expect(formatMethod('handleChange')).toEqual('handleChange')
    })
    test('formats sync methods', () => {
      return expect(formatMethod('handleChange', 'myProp')).toEqual('myPropHandleChange')
    })
  })

  describe('createSyncMixin', () => {
    test('creates methods for v-model', () => {
      const mixin = dataFlow.createSyncMixin('value')
      return Promise.all([
        expect(mixin.methods.forwardInput).toBeDefined(),
        expect(mixin.methods.handleArrayChange).toBeDefined(),
        expect(mixin.methods.handleArrayKeyChange).toBeDefined(),
        expect(mixin.methods.handleChange).toBeDefined(),
        expect(mixin.methods.handleKeyChange).toBeDefined(),
        expect(mixin.methods.pushToArray).toBeDefined(),
        expect(mixin.methods.removeFromArray).toBeDefined(),
        expect(mixin.methods.removeFromArrayKey).toBeDefined()
      ])
    })
    test('creates methods for sync', () => {
      const mixin = dataFlow.createSyncMixin('myProp')
      return Promise.all([
        expect(mixin.methods.myPropForwardInput).toBeDefined(),
        expect(mixin.methods.myPropHandleArrayChange).toBeDefined(),
        expect(mixin.methods.myPropHandleArrayKeyChange).toBeDefined(),
        expect(mixin.methods.myPropHandleChange).toBeDefined(),
        expect(mixin.methods.myPropHandleKeyChange).toBeDefined(),
        expect(mixin.methods.myPropPushToArray).toBeDefined(),
        expect(mixin.methods.myPropRemoveFromArray).toBeDefined(),
        expect(mixin.methods.myPropRemoveFromArrayKey).toBeDefined()
      ])
    })
  })

  describe('dataFlow/handleChange', () => {
    test('update Record', () => {
      const record = Vue.$store.createRecord('users', {name: 'foo'})
      return expect(dataFlow.handleChange(record, {name: 'bar'}).name).toEqual('bar')
    })
    test('update Object', () => {
      const o = {foo: 'bar'}
      return expect(dataFlow.handleChange(o, {foo: 'baz'}).foo).toEqual('baz')
    })
  })

  describe('dataFlow/handleKeyChange', () => {
    test('update Record key', () => {
      const record = Vue.$store.createRecord('users', {name: {first: 'foo'}})
      expect(dataFlow.handleKeyChange(record, 'name', {first: 'bar'}).name).toEqual({first: 'bar'})
    })
    test('update Object key', () => {
      const o = {key: {prop: true}}
      return expect(dataFlow.handleKeyChange(o, 'key', {prop: false}).key).toEqual({prop: false})
    })
  })

  describe('dataFlow/handleArrayChange', () => {
    test('update Array<Record>', () => {
      const record = Vue.$store.createRecord('users', {name: 'foo'})
      const arr = [record]
      return expect(dataFlow.handleArrayChange(arr, 0, {name: 'bar'})[0]).toEqual({name: 'bar'})
    })
    test('update Array<Object>', () => {
      const arr = [{key: 'value'}]
      return expect(dataFlow.handleArrayChange(arr, 0, {key: false})[0]).toEqual({key: false})
    })
  })

  describe('dataFlow/handleArrayKeyChange', () => {
    test('update Array<Record> key', () => {
      const bar = Vue.$store.createRecord('users', {name: 'bar'})
      const record = Vue.$store.createRecord('users', {name: [bar]})
      return expect(dataFlow.handleArrayKeyChange(record, 0, 'name', {name: 'baz'}).name[0].name).toEqual('baz')
    })
    test('update Array<Object> key', () => {
      const o = {key: [{key: 'value'}]}
      return expect(dataFlow.handleArrayKeyChange(o, 0, 'key', {key: false}).key[0]).toEqual({key: false})
    })
  })

  describe('dataFlow/pushToArray', () => {
    test('update Array', () => {
      return expect(dataFlow.pushToArray([], {key: 'value'})).toEqual([{key: 'value'}])
    })
  })

  describe('dataFlow/pushToArrayKey', () => {
    test('update Array Object key', () => {
      return expect(dataFlow.pushToArrayKey({key: []}, 'key', {key: 'value'})).toEqual({key: [{key: 'value'}]})
    })
  })

  describe('dataFlow/removeFromArray', () => {
    test('remove from Array', () => {
      return expect(dataFlow.removeFromArray([{key: 'value'}], 0)).toEqual([])
    })
  })

  describe('dataFlow/removeFromArrayKey', () => {
    test('remove from Array key', () => {
      return expect(dataFlow.removeFromArrayKey({key: [{key: 'value'}]}, 0, 'key')).toEqual({key: []})
    })
  })
})
