/* global describe, test, beforeEach, jest, expect */

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
          idAttribute: 'id',
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'}
            }
          }
        }
      },
      adapters: {
        ls: {
          adapter: new Adapter()
        }
      }
    })
  })

  describe('plugin', () => {
    test('makes the store directly accessible', () => {
      const vm = new Vue()
      return Promise.all([
        expect(vm.$store).toBeDefined(),
        expect(vm.$store.find).toBeDefined(),
        expect(vm.$store.findAll).toBeDefined(),
        expect(vm.$store.get).toBeDefined(),
        expect(vm.$store.getAll).toBeDefined()
      ])
    })

    test('can pass data via props', () => {
      jest.useFakeTimers()
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
      return Vue.$store.create('users', {name: 'omanizer'}).then(({id}) => {
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
              user: this.$store.get('users', id)
            }
          },
          vdata () {
            const user = this.$store.get('users', id)
            if (user) {
              this.user = user
            }
          },
          methods: {
            rename (to) {
              this.user.name = to
              return this.$store.save('users', this.user)
            }
          }
        }).$mount('#root')
        jest.runAllTimers()
        return Promise.all([
          expect(id).toBeDefined(),
          expect(vm.$children).toHaveLength(1),
          expect(vm.$options.vdata).toBeDefined(),
          expect(vm.user).toBeDefined(),
          expect(vm.user.name).toBe('omanizer'),
          vm.rename('xj9')
            .then((user) => Promise.all([
              expect(user).toBeDefined(),
              expect(user.name).toBe('xj9')
            ]))
        ])
      })
    })
  })
})
