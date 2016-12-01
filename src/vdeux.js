export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$state', {
      get () {
        return this.$options.store.getState()
      }
    })
    Object.defineProperty(Vue.prototype, '$dispatch', {
      get () {
        return this.$options.store.dispatch
      }
    })
  }
}
