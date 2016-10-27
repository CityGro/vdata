export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$state', {
      get () {
        return this.$root._store.getState()
      }
    })
    Object.defineProperty(Vue.prototype, '$dispatch', {
      get () {
        return this.$root._store.dispatch
      }
    })
    Vue.mixin({
      beforeCreate () {
        const options = this.$options
        if (options.store) {
          this._store = options.store
        } else if (options.parent && options.parent._store) {
          this._store = options.parent._store
        }
      }
    })
  }
}
