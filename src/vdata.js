import each from 'lodash/fp/each'
import equals from 'lodash/fp/equals'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import keys from 'lodash/fp/keys'
import Q from 'q'

const forceUpdate = each((child) => setTimeout(() => {
  child.$forceUpdate()
  forceUpdate(child.$children)
}, 0))

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
            this.$vdata = () => {
              console.log('$vdata: handler running')
              Vue.util.defineReactive(this, '$q', {})
              Vue.util.defineReactive(this, '$qLoading', true)
              Vue.util.defineReactive(this, '$qs', {})
              const createQuery = flow(
                this.$options.query,
                /**
                 * create placeholder fields for queries
                 */
                (q) => {
                  this.$q = q
                  this.$qs = flow(keys, map((field) => [field, {}]), fromPairs)(q)
                  return q
                },
                entries,
                /**
                 * map values to promises
                 */
                map(([k, v]) => Q(v)),
                Q.all
              )
              createQuery(store).then(flow(
                /**
                 * remap resolved values to keys
                 */
                (q) => {
                  const fields = keys(this.$qs)
                  return flow(entries, map(([i, value]) => [fields[i], value]))(q)
                },
                fromPairs,
                /**
                 * inject resolved query data into component, update component subtree
                 */
                (qs) => {
                  if (!equals(qs)(this.$qs)) {
                    this.$qs = qs
                    this.$qLoading = false
                    this.$forceUpdate()
                    forceUpdate(this.$children)
                    console.log('$vdata: updated properties')
                  } else {
                    console.log('$vdata: no change')
                  }
                })).catch(console.log)
            }
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
