import {jsdom} from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
import Vue from 'vue'
import store from './example/store'
import {addTodo} from './example/actions/todos'

describe('main', () => {
  it('dispatch ADDED_TODO', done => {
    const vm = new Vue({
      data() {
          return {
            todos: this.$select('todos'),
            count: this.$select('counter as count')
          }
        },
        // do not use ready() here because the test now is not in dom environment
        created() {
          const {addedTodo} = store.actions
          store.dispatch(addedTodo('hi'))
          store.dispatch({
            type: 'INCREMENT'
          })
        }
    })
    vm.$data.todos.items[vm.$data.todos.items.length - 1].text.should.equal('hi')
    vm.$data.count.should.equal(1)
    done()
  })
  it('test native value', done => {
    const vm = new Vue({
      data() {
          return {
            count: this.$select('counter as count')
          }
        },
        created() {
          store.dispatch({
            type: 'INCREMENT'
          })
        }
    })
    vm.$data.count.should.equal(2)
    done()
  })
  it('test thunk', done => {
    const vm = new Vue({
      data() {
          return {
            todos: this.$select('todos')
          }
        },
        created() {
          const {addTodo} = store.actions
          store.dispatch(addTodo('meet a girl'))
        }
    })
    setTimeout(() => {
      vm.$data.todos.items[vm.$data.todos.items.length - 1].text.should.equal('meet a girl')
      done()
    }, 1000)
  })
  it('test deep vm property', done => {
    const vm = new Vue({
      data() {
          return {
            foo: {
            	fakeAdmin: this.$select('admin as foo.fakeAdmin')
            }
          }
        },
        created() {
          store.dispatch({
            type: 'CHANGE_NAME',
            name: 'sox'
          })
        }
    })
    vm.$data.foo.fakeAdmin.info.name.should.equal('sox')
    done()
  })
  it('test deep state property', done => {
    const vm = new Vue({
      data() {
          return {
            name: this.$select('admin.info.name as name')
          }
        },
        created() {
          store.dispatch({
            type: 'CHANGE_NAME',
            name: 'sox'
          })
        }
    })
    vm.$data.name.should.equal('sox')
    done()
  })
})
