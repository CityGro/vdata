import { jsdom } from 'jsdom'
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
import Vue from 'vue'
import revue from './lib/revue'
import store from './lib/store'
Vue.use(revue, {
  store
})

describe('main', () => {
  it('should dispatch ADD_TODO', done => {
    const vm = new Vue({
      data () {
        return {
          todos: this.$revue.getState().todos
        }
      },
      created () {
        this.$subscribe('todos')
        this.$revue.dispatch({type: 'ADD_TODO', text: 'hi'})
      }
    })
    vm.$data.todos.reverse()[0].text.should.equal('hi')
    done()
  })
})
