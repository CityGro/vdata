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
  it('should dispatch INCREMENT', done => {
    const vm = new Vue({
      data () {
        return {
          counter: this.$revue.getState().counter
        }
      },
      created () {
        this.$subscribe('counter')
        this.$revue.dispatch({type: 'INCREMENT'})
      }
    })
    vm.$data.counter.should.equal(1)
    done()
  })
})
