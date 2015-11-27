import Vue from 'vue'
import Revue from './revue'
import store from './store'
Vue.use(Revue, {
  store
})
new Vue({
  el: '#app',
  data () {
    return {
      todos: this.$revue.getState().todos,
      todo: ''
    }
  },
  ready () {
    this.$subscribe('todos')
  },
  methods: {
    toggleTodo (index) {
      this.$revue.dispatch({type: 'TOGGLE_TODO', index})
    },
    addTodo () {
      if (!this.todo)
        return
      this.$revue.dispatch({type: 'ADD_TODO', text: this.todo})
      this.todo = ''
    },
  }
})
