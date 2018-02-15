/* global describe, test, beforeEach, jest, expect */

import stringify from 'json-stable-stringify'

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
              name: {type: 'string'},
              tags: {type: 'array'},
              achievements: {type: 'array'}
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
    test('always returns new objects', () => {
      return Vue.$store.create('users', {
        name: 'r14c',
        tags: ['cool'],
        achievements: [
          {name: 'jeff'}
        ]
      }).then(({id}) => {
        const user0 = Vue.$store.get('users', id)
        const user0String = stringify(user0)
        let user1 = Vue.$store.get('users', id)
        user1.name = 'r14d'
        let user2 = Vue.$store.get('users', id)
        user2.achievements[0].name = 'bob'
        user2.achievements[0].found = true
        const user3 = Vue.$store.get('users', id)
        user3.tags.push('lame')
        let user4 = Vue.$store.get('users', id)
        user4.achievements.push({goatHerder: 'alpha'})
        let user5 = Vue.$store.get('users', id)
        user5.accessControl = {godMode: true}
        const user5String = stringify(user5)
        let user6 = Vue.$store.get('users', id)
        return Promise.all([
          expect(id).toBeDefined(),
          expect(id).toEqual(user0.id),
          expect(Vue.$store.hasChanges('users', id, user0)).toBe(false),
          expect(Vue.$store.hasChanges('users', id, user1)).toBe(true),
          expect(Vue.$store.hasChanges('users', id, user2)).toBe(true),
          expect(Vue.$store.hasChanges('users', id, user3)).toBe(true),
          expect(Vue.$store.hasChanges('users', id, user4)).toBe(true),
          expect(Vue.$store.hasChanges('users', id, user5)).toBe(true),
          expect(user0String === stringify(user1)).toBe(false),
          expect(user0String === stringify(user2)).toBe(false),
          expect(user0String === stringify(user3)).toBe(false),
          expect(user0String === stringify(user4)).toBe(false),
          expect(user0String === stringify(user5)).toBe(false),
          expect(user5String === stringify(user6)).toBe(false)
        ])
      })
    })
  })
})
