<template>
  <div class="write">
    <input type="text" class="input-todo" v-model="todo"><button class="add" @click="addTodo()">add todo</button>
    <h2>Writable todos</h2>
    {{ todos.isPosting ? 'Posting...' : '' }}
    <ul class="todos" v-if="todos.items && todos.items.length > 0">
      <li class="todo" :class="{del: todo.done}" v-for="todo in todos.items" track-by="$index" v-text="todo.text" @click="toggleTodo($index)"></li>
    </ul>
  </div>
</template>

<script>
  import store from '../store'
  import {addTodo as addTodoAction} from '../actions/todos'

  export default {
    data () {
      return {
        todo: '',
        todos: this.$select('todos')
      }
    },
    ready () {
      store.actions.addTodo('damn')
    },
    methods: {
      toggleTodo (index) {
        store.dispatch(store.actions.toggleTodo(index))
      },
      addTodo (todo = this.todo) {
        if (!todo)
          return
        store.dispatch(store.actions.addTodo(todo))
        this.todo = ''
      },
    }
  }
</script>
