/* global describe, it */
import { jsdom } from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

import Vue from 'vue'
import Vdeux from './vdeux'

import store from '../example/store'
import { addTodo } from '../example/dux/todos'
import { increment } from '../example/dux/counter'
import { changeName } from '../example/dux/admin'

Vue.use(Vdeux)

describe('Vdeux', () => {
  it('can increment a counter', (done) => {
    var computed = 0
    const vm = new Vue({
      store,
      computed: {
        count () {
          computed += 1
          return this.$state.counter
        }
      },
      methods: {
        increment () {
          this.$dispatch(increment())
        }
      }
    })
    vm.$nextTick(() => {
      computed.should.equal(0)
      vm.increment()
      vm.increment()
      computed.should.equal(0)
      vm.count.should.equal(2)
      computed.should.equal(1)
      vm.$nextTick(() => {
        vm.count.should.equal(2)
        computed.should.equal(1)
        done()
      })
    })
  })
  it('can handle asynchronous actions', (done) => {
    const vm = new Vue({
      store,
      computed: {
        todos () {
          return this.$state.todos
        }
      },
      created () {
        this.$dispatch(addTodo('meet a girl'))
      }
    })
    setTimeout(() => {
      let todos = vm.todos.items
      todos[todos.length - 1].text.should.equal('meet a girl')
      done()
    }, 10)
  })
  it('can access nested properties', () => {
    const vm = new Vue({
      store,
      computed: {
        name () {
          return this.$state.admin.name
        }
      },
      created () {
        this.$dispatch(changeName('omanizer'))
      }
    })
    vm.name.should.equal('omanizer')
  })
})
