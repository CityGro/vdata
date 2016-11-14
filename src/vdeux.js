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
        if (this._store) {
          let state
          this._remove_store_change_listener = this._store.subscribe(() => {
            let previousState = state
            state = this._store.getState()
            if (previousState !== state) {
              this.$forceUpdate()
            }
          })
        }
      },
      beforeDestroy () {
        this._remove_store_change_listener()
      }
    })
  }
}
