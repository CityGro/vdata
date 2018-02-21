/* global describe, test, beforeEach, jest, expect */

import * as DataFlow from '../DataFlow'
import formatMethod from '../formatMethod'

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
    Vue.$store.create('users', {name: 'omanizer'})
    Vue.$store.create('comments', {userId: 1})
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
      const mixin = DataFlow.createDataFlowMixin('value')
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
      const mixin = DataFlow.createDataFlowMixin('myProp')
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
    test('update Object', () => {
      return expect(DataFlow.handleChange({
        value: {foo: 'bar'},
        diff: {foo: 'baz'}
      }).foo).toEqual('baz')
    })
  })

  describe('handleKeyChange', () => {
    test('update Object key', () => {
      return expect(DataFlow.handleKeyChange({
        value: {key: {prop: true}},
        key: 'key',
        diff: {prop: false}
      }).key).toEqual({prop: false})
    })
  })

  describe('handleArrayChange', () => {
    test('update Array<Object>', () => {
      return expect(DataFlow.handleArrayChange({
        value: [{key: 'value'}],
        index: 0,
        diff: {key: false}
      })[0]).toEqual({key: false})
    })
  })

  describe('handleArrayKeyChange', () => {
    test('update Array<Object> key', () => {
      return expect(DataFlow.handleArrayKeyChange({
        value: {key: [{key: 'value'}]},
        index: 0,
        key: 'key',
        diff: {key: false}
      }).key[0]).toEqual({key: false})
    })
  })

  describe('pushToArray', () => {
    test('update Array', () => {
      return expect(DataFlow.pushToArray({
        value: [],
        diff: {key: 'value'}
      })).toEqual([{key: 'value'}])
    })
  })

  describe('pushToArrayKey', () => {
    test('update Array Object key', () => {
      return expect(DataFlow.pushToArrayKey({
        value: {key: []},
        key: 'key',
        diff: {key: 'value'}
      })).toEqual({key: [{key: 'value'}]})
    })
  })

  describe('removeFromArray', () => {
    test('remove from Array', () => {
      return expect(DataFlow.removeFromArray({
        value: [{key: 'value'}],
        index: 0
      })).toEqual([])
    })
  })

  describe('removeFromArrayKey', () => {
    test('remove from Array key', () => {
      return expect(DataFlow.removeFromArrayKey({
        value: {key: [{key: 'value'}]},
        index: 0,
        key: 'key'
      })).toEqual({key: []})
    })
  })
})
