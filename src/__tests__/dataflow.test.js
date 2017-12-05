/* global describe, test, beforeEach, jest, expect */

import * as dataFlow from '../dataFlow'
import formatMethod from '../formatMethod'
import updateVm from '../updateVm'

describe('vdata/dataflow', () => {
  let Adapter
  let Vue
  let vdata

  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    require('localstorage-polyfill')
    vdata = require('../vdata').default
    Vue = require('vue/dist/vue.js')
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

  describe('createDataFlowMixin', () => {
    test('creates methods for v-model', () => {
      const mixin = dataFlow.createDataFlowMixin('value')
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
      const mixin = dataFlow.createDataFlowMixin('myProp')
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

  describe('handleChange', () => {
    test('update Record', () => {
      const record = Vue.$store.createRecord('users', {name: 'foo'})
      return expect(dataFlow.handleChange(record, {name: 'bar'}).name).toEqual('bar')
    })
    test('update Object', () => {
      const o = {foo: 'bar'}
      return expect(dataFlow.handleChange(o, {foo: 'baz'}).foo).toEqual('baz')
    })
  })

  describe('handleKeyChange', () => {
    test('update Record key', () => {
      const record = Vue.$store.createRecord('users', {name: {first: 'foo'}})
      expect(dataFlow.handleKeyChange(record, 'name', {first: 'bar'}).name).toEqual({first: 'bar'})
    })
    test('update Object key', () => {
      const o = {key: {prop: true}}
      return expect(dataFlow.handleKeyChange(o, 'key', {prop: false}).key).toEqual({prop: false})
    })
  })

  describe('handleArrayChange', () => {
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

  describe('handleArrayKeyChange', () => {
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

  describe('pushToArray', () => {
    test('update Array', () => {
      return expect(dataFlow.pushToArray([], {key: 'value'})).toEqual([{key: 'value'}])
    })
  })

  describe('pushToArrayKey', () => {
    test('update Array Object key', () => {
      return expect(dataFlow.pushToArrayKey({key: []}, 'key', {key: 'value'})).toEqual({key: [{key: 'value'}]})
    })
  })

  describe('removeFromArray', () => {
    test('remove from Array', () => {
      return expect(dataFlow.removeFromArray([{key: 'value'}], 0)).toEqual([])
    })
  })

  describe('removeFromArrayKey', () => {
    test('remove from Array key', () => {
      return expect(dataFlow.removeFromArrayKey({key: [{key: 'value'}]}, 0, 'key')).toEqual({key: []})
    })
  })
})
