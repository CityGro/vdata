<template>
  <div class="write">
    <input type="text" class="input-todo" v-model="todo"><button class="add" @click="addTodo">add todo</button>
    <h2>Writable todos</h2>
    <button @click="reset">reset data</button> {{ todos.isPosting ? 'Posting...' : '' }}
    <ul class="todos" v-if="todos.items && todos.items.length > 0">
      <li class="todo" :class="{del: todo.done}" v-for="todo in todos.items" track-by="$index" v-text="todo.text" @click="toggleTodo($index)"></li>
    </ul>
  </div>
</template>

<script>
  import { addTodo, toggleTodo } from '../actions/todos'
  export default {
    props: ['todos'],
    data () {
      return {
        todo: ''
      }
    },
    ready () {
      this.$subscribe('todos')
    },
    methods: {
      reset () {
        this.$revue.dispatch({type: 'RESET'})
      },
      toggleTodo (index) {
        this.$revue.dispatch(toggleTodo(index))
      },
      addTodo () {
        if (!this.todo)
          return
        this.$revue.dispatch(addTodo(this.todo))
        this.todo = ''
      },
    }
  }
</script>
