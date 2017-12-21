/* global describe, test, beforeEach, jest, expect */

describe('vQuery', () => {
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

  describe('generate', () => {
    test('default query + handler', () => {
      jest.useFakeTimers()
      const vm = new Vue({
        data () {
          return {
            myId: 1
          }
        },
        vQuery: {
          comments: true
        }
      }).$mount('#root')
      expect(vm.$options.asyncData.comments).toBeDefined()
      expect(vm.$options.asyncData.commentsDefault).toBe(undefined)
      expect(vm.$options.asyncData.commentsLazy).toBe(false)
      expect(vm._vQueryHandler).toBeDefined()
      /*
      vm.$store.findAll = jest.fn(function () {
        return Promise.resolve([])
      })
      vm.$store.getAll = jest.fn()
      vm.$vdata()
      vm.asyncReload()
      jest.runAllTimers()
      expect(vm.$store.findAll).toHaveBeenCalled()
      expect(vm.$store.getAll).toHaveBeenCalled()
      */
    })
    test('custom query + handler', () => {
      jest.useFakeTimers()
      const vm = new Vue({
        data () {
          return {
            myId: 1
          }
        },
        vQuery: {
          comments: true,
          user () {
            const id = this.myId
            return {
              model: 'users',
              lazy: true,
              default: () => ({}),
              id
            }
          }
        }
      }).$mount('#root')
      expect(vm.$options.asyncData.user).toBeDefined()
      expect(vm.$options.asyncData.userDefault).toEqual({})
      expect(vm.$options.asyncData.userLazy).toBe(true)
      expect(vm._vQueryHandler).toBeDefined()
      /*
      vm.$store.find = jest.fn(function () {
        return Promise.resolve({})
      })
      vm.$store.get = jest.fn()
      vm.$vdata()
      vm.asyncReload()
      jest.runAllTimers()
      expect(vm.$store.find).toHaveBeenCalled()
      expect(vm.$store.get).toHaveBeenCalled()
      */
    })
  })

  describe('options', () => {
    test('merge options', () => {
      const myQueryA = {
        vQuery: {
          users: true
        }
      }
      const vm = new Vue({
        mixins: [myQueryA],
        vQuery: {
          comments: true
        }
      }).$mount('#root')
      expect(vm.$options.asyncData.users).toBeDefined()
      expect(vm.$options.asyncData.comments).toBeDefined()
      expect(vm.$options.vQuery).toEqual({
        users: true,
        comments: true
      })
    })
  })
})
