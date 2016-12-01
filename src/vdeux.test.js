/* global describe, it */
import {jsdom} from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

import Vue from 'vue'
import Vdeux from './vdeux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

Vue.use(Vdeux)

describe('Vdeux', () => {
  it('can increment a counter', (done) => {
    const INCREMENT = 'counter/INCREMENT'
    const increment = () => {
      return {type: INCREMENT}
    }
    const store = createStore(function (state = 0, action) {
      switch (action.type) {
        case INCREMENT:
          return state + 1
        default:
          return state
      }
    })
    let computed = 0
    const vm = new Vue({
      store,
      computed: {
        count () {
          computed += 1
          return this.$state
        }
      },
      methods: {
        increment () {
          this.$dispatch(increment())
        }
      }
    })
    vm.$nextTick(() => {
      expect(computed).toBe(0)
      vm.increment()
      vm.increment()
      expect(computed).toBe(0)
      expect(vm.count).toBe(2)
      expect(computed).toBe(1)
      vm.$nextTick(() => {
        expect(vm.count).toBe(2)
        expect(computed).toBe(1)
        done()
      })
    })
  })
  it('can handle asynchronous actions', (done) => {
    const ADD_TODO = 'example/todo/ADD_TODO'
    const ADDING_TODO = 'example/todo/ADDING_TODO'

    function addingTodo () {
      return {
        type: ADDING_TODO
      }
    }
    function addTodo (text) {
      return (dispatch) => {
        dispatch(addingTodo())
        setTimeout(() => {
          dispatch({
            type: ADD_TODO,
            text
          })
        }, 0)
      }
    }
    const defaultTodos = [
      {
        text: 'Rule the web',
        done: true
      },
      {
        text: 'Conquer the world',
        done: false
      },
      {
        text: 'Meet a girl',
        done: false
      }
    ]
    const store = createStore(function reducer (state = {isPosting: false, items: defaultTodos}, action) {
      switch (action.type) {
        case ADD_TODO:
          return Object.assign({}, state, {
            isPosting: false,
            items: state.items.concat([{text: action.text, done: false}])
          })
        case ADDING_TODO:
          return Object.assign({}, state, {
            isPosting: true
          })
        default:
          return state
      }
    }, applyMiddleware(thunk))
    const vm = new Vue({
      store,
      computed: {
        todos () {
          return this.$state.items
        }
      },
      methods: {
        addTodo (text) {
          this.$dispatch(addTodo(text))
        }
      }
    })
    vm.addTodo('meet a girl')
    setTimeout(() => {
      expect(vm.todos[vm.todos.length - 1].text).toBe('meet a girl')
      done()
    }, 10)
  })
  it('can access nested properties', () => {
    const CHANGE_NAME = 'example/admin/CHANGE_NAME'
    const changeName = (name) => {
      return {
        type: CHANGE_NAME,
        name
      }
    }
    const store = createStore(function reducer (admin = {name: 'xj9'}, action) {
      switch (action.type) {
        case CHANGE_NAME:
          return Object.assign({}, admin, {name: action.name})
        default:
          return admin
      }
    })
    const vm = new Vue({
      store,
      computed: {
        name () {
          return this.$state.name
        }
      },
      created () {
        this.$dispatch(changeName('omanizer'))
      }
    })
    expect(vm.name).toBe('omanizer')
  })
})
