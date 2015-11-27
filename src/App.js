import Vue from 'vue'
import revue from './revue'
import store from './store'
Vue.use(revue, {
  store
})
new Vue({
  el: '#app',
  data () {
    return {
      counter: this.$revue.getState().counter,
      todos: this.$revue.getState().todos,
      todo: ''
    }
  },
  ready () {
    this.$subscribe('counter', 'todos')
  },
  methods: {
    handleClick () {
      this.$revue.dispatch({type: 'INCREMENT'})
    },
    addTodo () {
      if (!this.todo)
        return
      this.$revue.dispatch({type: 'ADD_TODO', text: this.todo})
      this.todo = ''
    },
    handleDestroy () {
      this.$destroy()
    },

  }
})
