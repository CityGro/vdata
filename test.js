import { jsdom } from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
import Vue from 'vue'
import revue from './lib/revue'
import store from './lib/store'
import { addTodo } from './lib/actions/todos'
Vue.use(revue, {
  store
})

describe('main', () => {
  it('should dispatch ADDED_TODO', done => {
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
})
