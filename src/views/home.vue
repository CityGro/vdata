<template>
  <write :todos="todos"></write>
  <read :todos="todos"></read>
</template>

<script>
  import write from '../components/write'
  import read from '../components/read'
  export default {
    data () {
      return {
        todos: this.$revue.getState().todos
      }
    },
    components: {
      write,
      read
    }
  }
</script>
