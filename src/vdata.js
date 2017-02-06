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
         * if `$options.query()` is defined, initialize the components `$q` and `$qs` properties.
         * listen for changes on the store and trigger an update if a change occurred.
         *
         * `$q` is the return value of `$options.query()`
         * `$qs` is automatically populated with the resolved values of `$q`
         * `$qLoading` is true whenever queries are being resolved
         *
         */
        beforeCreate () {
          if (this.$options.query) {
            Vue.util.defineReactive(this, '$q', {})
            Vue.util.defineReactive(this, '$qLoading', false)
            Vue.util.defineReactive(this, '$qs', {})
            const createQuery = flow(
              /**
               * create a new query object
               */
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
               * ensure that all queries are promises
               */
               map(([field, query]) => Q(query)),
               Q.all
            )
            this.$vdata = () => {
              console.log('$vdata: handler running')
              this.$qLoading = true
              createQuery(store).then(flow(
                /**
                 * remap resolved values to keys
                 */
                (q) => {
                  const fields = keys(this.$qs)
                  const remap = flow(entries, map(([i, value]) => [fields[i], value]))
                  return remap(q)
                },
                fromPairs,
                /**
                 * inject resolved query data into component, update component subtree
                 */
                (qs) => {
                  console.log('$vdata: (previous)', this.$qs)
                  console.log('$vdata: (next)', qs)
                  if (!equals(qs)(this.$qs)) {
                    this.$qs = qs
                    this.$qLoading = false
                    this.$forceUpdate()
                    forceUpdate(this.$children)
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
