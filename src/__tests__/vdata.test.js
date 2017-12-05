/* global describe, test, beforeEach, jest, expect */

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

  describe('plugin', () => {
    test('makes the store directly accessible', () => {
      const vm = new Vue()
      return Promise.all([
        expect(vm.$store.vdataOptions.models).toEqual({
          users: {
            idAttribute: 'id',
            name: 'users',
            relations: {}
          },
          comments: {
            idAttribute: 'id',
            name: 'comments',
            relations: {}
          }
        }),
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
})
