/* global describe, it, beforeEach, jest, expect, fit */

import {waitFor} from '../utils'

describe('Vdata', () => {
  let vdata
  let Vue
  let JSData
  let DSHttpAdapter
  let store
  let User
  let Comment

  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    vdata = require('../vdata').default
    Vue = require('vue')
    JSData = require('js-data')
    store = new JSData.DS()
    User = store.defineResource('user')
    Comment = store.defineResource('comment')
    User.inject({id: 1, name: 'omanizer'})
    Comment.inject({id: 1, userId: 1})
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
        return createElement('p', this.user.name || '')
      },
      props: ['user']
    })
    const Child = Vue.component('child', {
      render (createElement) {
        return createElement(Babby, {
          props: {
            user: this.user
          }
        })
      },
      props: ['user']
    })
    const Parent = Vue.component('parent', {
      render (createElement) {
        return createElement(Child, {
          props: {
            user: this.user
          }
        })
      },
      props: ['user']
    })
    const vm = new Vue({
      render (createElement) {
        return createElement(Parent, {
          props: {
            user: this.$qs.user
          }
        })
      },
      query (store) {
        return {
          user: {
            default: {name: 'anon'},
            value: store.find('user', 1)
          },
          comment: store.filter('comment', {userId: 1})
        }
      },
      methods: {
        rename (to) {
          return this.$q.user.value.then((user) => {
            user.name = to
            return Promise.resolve(user)
          })
        }
      }
    }).$mount('#root')
    expect(vm.$children).toHaveLength(1)
    expect(vm.$options.query).toBeDefined()
    expect(vm.$qs).toBeDefined()
    return vm.$nextTick().then(() => {
      expect(vm.$qs.user).toEqual({name: 'anon'})
      return Promise.all([
        vm.$q.user.value.then((user) => {
          return Promise.all([
            expect(user).toBeDefined(),
            expect(user.name).toBe('omanizer')
          ])
        }),
        vm.rename('xj9').then((user) => {
          return Promise.all([
            expect(user.name).toBe('xj9')
          ])
        })
      ])
    })
  })
})
