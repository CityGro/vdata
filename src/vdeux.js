import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import each from 'lodash/fp/each'
import equals from 'lodash/fp/equals'

export default function (store) {
  return {
    install (Vue) {
      Vue.prototype._store = store
      Vue.mixin({
        /**
         * bind the store to your vue container.
         *
         * if `$options.map(state)` is defined, initialize the components `$state` property. listen for changes on the
         * store and trigger an update if a change occurred.
         *
         * if `$options.actions` is defined, take the map of action creators and bind them to dispatch. the bound
         * actions are attached to `$actions`.
         */
        beforeCreate () {
          if (this.$options.map) {
            this.$state = this.$options.map(store.getState())
            this._unsubscribe = store.subscribe(() => {
              const newState = this.$options.map(store.getState())
              if (!equals(newState)(this.$state)) {
                this.$state = this.$options.map(store.getState())
                this.$forceUpdate()
                each((child) => setTimeout(() => child.$forceUpdate(), 0))(this.$children)
              }
            })
          }
          if (this.$options.actions) {
            this.$actions = {}
            flow(
              entries,
              each(([key, action]) => Vue.set(this.$actions, key, (...args) => store.dispatch(action(...args)))
            ))(this.$options.actions)
          }
        },
        beforeDestroy () {
          if (this._unsubscribe) {
            this._unsubscribe()
          }
        }
      })
    }
  }
}
