import each from 'lodash/fp/each'
import equals from 'lodash/fp/equals'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'

export default function (store) {
  return {
    install (Vue) {
      Vue.prototype.$store = store
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
          if (this.$options.query) {
            this.$qs = {}
            const handler = () => {
              const q = this.$options.query(store)
              Promise.all(
                flow(entries, map(([k, v]) => (v) ? v : Promise.resolve(v)), (o) => {
                  console.log(o)
                  return o
                })(q)
              ).then(flow(
                  entries,
                  map(([i, value]) => [q[i], value]),
                  fromPairs,
                  (qs) => {
                    console.log(qs)
                    if (!equals(qs)(this.$qs)) {
                      this.$qs = qs
                      this.$forceUpdate()
                      each((child) => setTimeout(() => child.$forceUpdate(), 0))(this.$children)
                    }
                  }
              )).catch(console.error)
            }
            store.on('change', handler)
            this._unsubscribe = () => {store.off('change', handler)}
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
