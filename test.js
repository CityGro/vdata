import { jsdom } from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
import Vue from 'vue'
import revue from './revue.common'
import store from './example/store'
import { addTodo } from './example/actions/todos'
Vue.use(revue, {
  store
})

describe('main', () => {
  it('dispatch ADDED_TODO', done => {
    const vm = new Vue({
      data () {
        return {
          todos: this.$revue.getState().todos
        }
      },
      created () {
        this.$subscribe('todos')
        this.$revue.dispatch({type: 'ADDED_TODO', text: 'hi'})
      }
    })
    vm.$data.todos.items[vm.$data.todos.items.length - 1].text.should.equal('hi')
    done()
  })
  it('test native value', done => {
    const vm = new Vue({
      data () {
        return {
          count: this.$revue.getState().counter
        }
      },
      created () {
        this.$subscribe('counter as count')
        this.$revue.dispatch({type: 'INCREMENT'})
      }
    })
    vm.$data.count.should.equal(1)
    done()
  })
  it('test thunk', done => {
    const vm = new Vue({
      data () {
        return {
          todos: this.$revue.getState().todos
        }
      },
      created () {
        this.$subscribe('todos')
        this.$revue.dispatch(addTodo('meet a girl'))
      }
    })
    setTimeout(() => {
      vm.$data.todos.items[vm.$data.todos.items.length - 1].text.should.equal('meet a girl')
      done()
    }, 1000)
  })
  it('test deep property', done => {
    const vm = new Vue({
      data () {
        return {
          fakeAdmin: this.$revue.getState().admin
        }
      },
      created () {
        this.$subscribe('admin.info.name as fakeAdmin.info.name')
        this.$revue.dispatch({type: 'CHANGE_NAME', name: 'sox'})
      }
    })
    vm.$data.fakeAdmin.info.name.should.equal('sox')
    done()
  })
})
