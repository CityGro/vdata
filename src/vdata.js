import each from 'lodash/fp/each'
import equals from 'lodash/fp/equals'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import keys from 'lodash/fp/keys'
import throttle from 'lodash/throttle'
import isPlainObject from 'lodash/isPlainObject'
import Q from 'q'

const forceUpdate = each((child) => setTimeout(() => {
  child.$forceUpdate()
  forceUpdate(child.$children)
}, 0))

const changeEvents = ['add', 'change', 'remove']

export default function (store) {
  return {
    install (Vue, options) {
      Vue.prototype.$store = store
      if (!options || options.wait === undefined) {
        options = {wait: 150}
      }
      const wait = options.wait
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
            const self = this
            let force = true
            Vue.util.defineReactive(this, '$q', {})
            Vue.util.defineReactive(this, '$qLoading', false)
            Vue.util.defineReactive(this, '$qActivity', false)
            Vue.util.defineReactive(this, '$qs', {})
            const createQuery = flow(
              /**
               * create a new query object
               */
              ({store, force}) => {
                const query = this.$options.query.bind(self)
                return query(store, force)
              },
              /**
               * create placeholder fields for queries
               */
              (q) => {
                this.$q = q
                if (!keys(this.$qs).length) {
                  this.$qs = flow(
                    entries,
                    map(([field, query]) => (isPlainObject(query) && query.type) ? [field, query.default] : [field, []]),
                    fromPairs
                  )(q)
                }
                return q
              },
              entries,
              /**
               * ensure that all queries are promises
               */
               map(([field, query]) => (isPlainObject(query) && query.value) ? Q(query.value) : Q(query)),
               Q.all
            )
            this.$vdata = throttle(() => {
              this.$qLoading = force
              this.$qActivity = true
              createQuery({store, force}).then(flow(
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
                  if (!equals(qs)(this.$qs)) {
                    console.log('$vdata: (previous)', this.$qs)
                    console.log('$vdata: (next)', qs)
                    this.$qs = qs
                    this.$forceUpdate()
                    forceUpdate(this.$children)
                  }
                  this.$qLoading = force = false
                  this.$qActivity = false
                })).catch(console.log)
            }, wait, {leading: true})
            map((event) => store.on(event, this.$vdata))(changeEvents)
            console.log(`$vdata: ready. updates are throttled to one every ${wait}ms`)
          }
        },
        created () {
          if (this.$vdata) {
            this.$vdata()
          }
        },
        beforeUpdate () {
          if (this.$vdata) {
            this.$vdata()
          }
        },
        beforeDestroy () {
          if (this.$vdata) {
            map((event) => store.off(event, this.$vdata))(changeEvents)
            setTimeout(() => {
              delete this.$q
              delete this.$qs
              delete this.$qLoading
              delete this.$vdata
            }, 0)
          }
        }
      })
    }
  }
}
