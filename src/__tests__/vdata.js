/* global describe, it, beforeEach, jest, expect, fit */

import {waitFor} from '../utils'

describe('Vdata', () => {
  let vdata
  let Vue
  let JSData
  let Adapter
  let store

  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    require('localstorage-polyfill')
    vdata = require('../vdata').default
    Vue = require('vue')
    JSData = require('js-data')
    Adapter = require('js-data-localstorage').LocalStorageAdapter
    store = new JSData.DataStore()
    store.registerAdapter('ls', new Adapter(), {default: true})
    store.defineMapper('users')
    store.defineMapper('comments')
    store.create('users', {id: 1, name: 'omanizer'})
    store.create('comments', {id: 1, userId: 1})
    Vue.use(vdata(store))
  })
  describe('utils/waitFor', () => {
    it('resolves when the value becomes truthy', () => {
      const o = {value: false}
      setTimeout(() => {
        o.value = true
      }, 50)
      return waitFor('value', o).then((value) => {
        return expect(value).toBe(true)
      })
    })
  })
  it('makes the store directly accessible', () => {
    const vm = new Vue()
    expect(vm.$store).toBeDefined()
  })
  it('can pass data via props', () => {
    Vue.config.isUnknownElement = () => false
    const Babby = Vue.component('babby', {
      render (createElement) {
        return createElement('p', this.user.name)
      },
      props: ['user']
    })
    const Child = Vue.component('child', {
      render (createElement) {
        const self = this
        return createElement(Babby, {
          props: {
            user: self.user
          }
        })
      },
      props: ['user']
    })
    const Parent = Vue.component('parent', {
      render (createElement) {
        const self = this
        return createElement(Child, {
          props: {
            user: self.user
          }
        })
      },
      props: ['user']
    })
    const vm = new Vue({
      render (createElement) {
        const self = this
        return createElement(Parent, {
          props: {
            user: self.$qs.user
          }
        })
      },
      query (store) {
        return {
          user: {
            default: {name: 'anon'},
            value: store.find('users', 1),
            constraints: {
              name: {
                presence: true
              }
            }
          },
          comment: store.filter('comments', {userId: 1})
        }
      },
      methods: {
        rename (to) {
          return new Promise((resolve) => {
            this.$qs.user.name = to
            resolve(this.$qs.user)
          })
        }
      }
    }).$mount('#root')
    return Promise.all([
      expect(vm.$children).toHaveLength(1),
      expect(vm.$options.query).toBeDefined(),
      expect(vm.$qs).toBeDefined(),
      expect(vm.$q.user.default).toEqual({name: 'anon'}),
      expect(vm.$q.user.isValid).toBeDefined(),
      vm.$nextTick().then(() => {
        return Promise.all([
          Promise.all([
            expect(vm.$qs.user).toBeDefined(),
            expect(vm.$qs.user.name).toBe('anon')
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
