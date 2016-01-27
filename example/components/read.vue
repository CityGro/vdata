<template>
  <div class="read">
    <h2>Read only todos</h2>
    <button @click="handleSubscribe">subscribe</button>
    <button @click="handleUnsubscribe">unsubscribe</button>
    <ul class="todos" v-if="todos.items && todos.items.length > 0">
      <li class="todo" :class="{del: todo.done}" v-for="todo in todos.items" track-by="$index" v-text="todo.text"></li>
    </ul>
  </div>
</template>

<script>
  import {getState} from '../../src/revue'

  export default {
    data () {
      return {
        todos: getState('todos')
      }
    },
    created () {
      this.handleSubscribe()
    },
    methods: {
      // this is just for test, no need in production
      handleUnsubscribe () {
        this.$unsubscribe()
      },
      handleSubscribe () {
        this.$subscribe('todos')
      },
      /*
      handleDestroy () {
        this.lifesong = 'I\'m dead'
        setTimeout(() => {
          this.$destroy()
        }, 200)
      }
      */
    }
  }
</script>
