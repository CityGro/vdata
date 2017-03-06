/* global describe, it, beforeEach, jest, expect, fit */

describe('VData', () => {
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

  describe('vdata', () => {
    it('makes the store directly accessible', () => {
      const vm = new Vue()
      return Promise.all([
        expect(vm.$store).toBeDefined(),
        expect(vm.$store.get).toBeDefined()
      ])
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
        vdata () {
          this.user = this.$store.get('users', 1)
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
    it('attaches the appropriate methods', () => {
      const vm = new Vue()
      return expect(vm.asyncReload).toBeDefined()
    })

    it('indicates loading state for async data resources', () => {
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
})
