<template>
  <div class="write">
    <input
      type="text"
      class="input-todo"
      v-model="todo">
      <button class="add" @click="addTodo()">add todo</button>
    </input>
    <h2>Writable todos</h2>
    {{ todos.isPosting ? 'Posting...' : '' }}
    <ul class="todos" v-if="todos.items && todos.items.length > 0">
      <li
        class="todo"
        :class="{del: todo.done}"
        v-for="todo in todos.items"
        track-by="$index"
        v-text="todo.text"
        @click="toggleTodo($index)">
      </li>
    </ul>
  </div>
</template>

<script>
import { addTodo, toggleTodo } from '../dux/todos'

export default {
  data () {
    return {
      todo: '',
      todos: this.$store.getState().todos
    }
  },
  ready () {
    this.$store.dispatch(addTodo('damn'))
  },
  methods: {
    toggleTodo (index) {
      this.$store.dispatch(toggleTodo(index))
    },
    addTodo (todo = this.todo) {
      if (todo) {
        this.$store.dispatch(addTodo(todo))
        this.todo = ''
      }
    }
  }
}
</script>
