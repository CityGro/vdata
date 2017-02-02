import each from 'lodash/fp/each'
import equals from 'lodash/fp/equals'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import keys from 'lodash/fp/keys'
import property from 'lodash/fp/property'
import Q from 'q'

const mapToPromises = flow(entries, map(([k, v]) => Q.resolve(v)))
const fakeValues = flow(map((field) => [field, {}]), fromPairs)

export default function (store) {
  return {
    install (Vue) {
      Vue.prototype.$store = store
      Vue.mixin({
        /**
         * bind the store to your vue container.
         *
         * if `$options.query()` is defined, initialize the components `$q` and `$q` properties.
         * listen for changes on the store and trigger an update if a change occurred.
         *
         * `$q` is the return value of `$options.query()`
         * `$qs` is automatically populated with the resolved values of `$q`
         *
         */
        beforeCreate () {
          if (this.$options.query) {
            Vue.util.defineReactive(this, '$q', {})
            Vue.util.defineReactive(this, '$qs', {})
            Vue.util.defineReactive(this, '$qLoading', false)
            this.$vdata = () => {
              this.$q = this.$options.query(store)
              this.$qLoading = true
              const fields = keys(this.$q)
              this.$qs = fakeValues(fields)
              Q.all(mapToPromises(this.$q)).then(flow(
                entries,
                map(([i, value]) => [fields[i], value]),
                fromPairs,
                (qs) => {
                  if (!equals(qs)(this.$qs)) {
                    this.$qs = qs
                    this.$forceUpdate()
                    this.$qLoading = false
                    each((child) => setTimeout(() => child.$forceUpdate(), 0))(this.$children)
                  }
                })).catch(console.log)
            }
          }
        },
        created () {
          if (this.$vdata) {
            this.$vdata()
            store.on('change', this.$vdata)
          }
        },
        beforeDestroy () {
          if (this.$vdata) {
            store.off('change', this.$vdata)
          }
        }
      })
    }
  }
}
