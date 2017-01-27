/* global describe, it */

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
    DSHttpAdapter = require('js-data-http')
    store = new JSData.DS()
    store.registerAdapter('http', new DSHttpAdapter(), { default: true })
    User = store.defineResource('user')
    Comment = store.defineResource('comment')
    User.inject({id: 1, name: 'omanizer'})
    Comment.inject({id: 1, userId: 1})
    Vue.use(vdata(store))
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
      props: {
        user: {type: Object}
      }
    })
    const vm = new Vue({
      render (createElement) {
        return createElement(Babby, {
          props: {
            user: this.$qs.user
          }
        })
      },
      query (store) {
        return {
          user: store.find('user', 1),
          comment: store.filter('comment', {userId: 1})
        }
      },
      methods: {
        rename (to) {
          this.$qs.user.name = to
          return this.$qs.user.save()
        }
      }
    }).$mount('#root')
    expect(vm.$children).toHaveLength(1)
    expect(vm.$options.query).toBeDefined()
    expect(vm.$qs).toBeDefined()
    return vm.$nextTick().then(() => {
      expect(vm.$qs.user).toBeDefined()
      expect(vm.$qs.user.name).toBe('omanizer')
      expect(vm.$qs.user.DSSave).toBeDefined()
      return vm.rename('xj9').then((user) => {
        return Promise.all([
          expect(vm.$qs.user.name).toBe('xj9'),
          expect(vm.$el.textContent).toBe('xj9')
        ])
      })
    })
  })
})
