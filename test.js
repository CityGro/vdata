import {
  jsdom
}
from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
import Vue from 'vue'
import revue from './revue.common'
import store from './example/store'
import {
  addTodo
} from './example/actions/todos'
Vue.use(revue, {
  store
})

describe('main', () => {
  it('dispatch ADDED_TODO', done => {
    const vm = new Vue({
      data() {
          return {
            todos: this.$store.state.todos
          }
        },
        // do not use ready() here because the test now is not in dom environment
        created() {
          this.$subscribe('todos')
          this.$store.dispatch({
            type: 'ADDED_TODO',
            text: 'hi'
          })
        }
    })
    vm.$data.todos.items[vm.$data.todos.items.length - 1].text.should.equal('hi')
    done()
  })
  it('test native value', done => {
    const vm = new Vue({
      data() {
          return {
            count: this.$store.state.counter
          }
        },
        created() {
          this.$subscribe('counter as count')
          this.$store.dispatch({
            type: 'INCREMENT'
          })
        }
    })
    vm.$data.count.should.equal(1)
    done()
  })
  it('test thunk', done => {
    const vm = new Vue({
      data() {
          return {
            todos: this.$store.state.todos
          }
        },
        created() {
          this.$subscribe('todos')
          this.$store.dispatch(addTodo('meet a girl'))
        }
    })
    setTimeout(() => {
      vm.$data.todos.items[vm.$data.todos.items.length - 1].text.should.equal('meet a girl')
      done()
    }, 1000)
  })
  it('test deep property', done => {
    const vm = new Vue({
      data() {
          return {
            fakeAdmin: this.$store.state.admin
          }
        },
        created() {
          this.$subscribe('admin.info.name as fakeAdmin.info.name')
          this.$store.dispatch({
            type: 'CHANGE_NAME',
            name: 'sox'
          })
        }
    })
    vm.$data.fakeAdmin.info.name.should.equal('sox')
    done()
  })
})
