<template>
  <div class="read">
    <h2>Read only todos</h2>
    <button @click="handleSubcribe">subscribe</button>
    <button @click="handleUnsubcribe">unsubscribe</button>
    <ul class="todos" v-if="todos.items && todos.items.length > 0">
      <li class="todo" :class="{del: todo.done}" v-for="todo in todos.items" track-by="$index" v-text="todo.text"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['todos'],
    ready () {
      this.handleSubcribe()
    },
    methods: {
      // this is just for test, no need in production
      handleUnsubcribe () {
        this.$unsubscribe()
      },
      handleSubcribe () {
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
