/* global describe, it */

import vdeux from './vdeux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

describe('Vdeux', () => {
  let Vue
  let store
  const INCREMENT = 'counter/INCREMENT'
  const increment = () => {
    return {type: INCREMENT}
  }

  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    Vue = require('vue')
    store = createStore(function (state = 0, action) {
      switch (action.type) {
        case INCREMENT:
          return state + 1
        default:
          return state
      }
    })
    Vue.use(vdeux(store))
  })
  it('makes the store directly accessible', () => {
    const vm = new Vue()
    expect(vm._store).toBeDefined()
  })
  it('can pass data via props', () => {
    Vue.config.isUnknownElement = function () { return false }
    const Babby = Vue.component('babby', {
      render (createElement) {
        return createElement('p', this.n)
      },
      props: {
        n: {type: String}
      }
    })
    const vm = new Vue({
      render (createElement) {
        return createElement(Babby, {
          props: {
            n: this.$state.count
          }
        })
      },
      map (state) {
        return {
          count: String(state)
        }
      },
      actions: {increment}
    }).$mount('#root')
    expect(vm.$children).toHaveLength(1)
    expect(vm.$options.map).toBeDefined()
    expect(vm.$options.actions).toBeDefined()
    expect(vm.$state).toBeDefined()
    expect(vm.$actions).toBeDefined()
    vm.$actions.increment()
    vm.$actions.increment()
    vm.$actions.increment()
    return vm.$nextTick().then(() => {
      return Promise.all([
        expect(vm.$state.count).toBe('3'),
        expect(vm.$el.textContent).toBe('3')
      ])
    })
  })
  it('can handle asynchronous actions', () => {
    const Vue = require('vue')
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
    Vue.use(vdeux(store))
    const vm = new Vue({
      map (state) {
        return {
          todos: state.items
        }
      },
      actions: {addTodo}
    })
    vm.$actions.addTodo('meet a girl')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(expect(vm.$state.todos[vm.$state.todos.length - 1].text).toBe('meet a girl'))
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })
  it('can access nested properties', () => {
    const Vue = require('vue')
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
    Vue.use(vdeux(store))
    const vm = new Vue({
      map (state) {
        return {name: state.name}
      },
      actions: {changeName}
    })
    vm.$actions.changeName('omanizer')
    expect(vm.$state.name).toBe('omanizer')
  })
})
