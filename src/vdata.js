import each from 'lodash/fp/each'
import isEqual from 'lodash/isEqual'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import keys from 'lodash/fp/keys'
import throttle from 'lodash/throttle'
import isObject from 'lodash/isObject'

import Q from 'q'
import validate from 'validate.js'

const forceUpdate = each((child) => setTimeout(() => {
  child.$forceUpdate()
  forceUpdate(child.$children)
}, 0))

const changeEvents = ['add', 'change', 'remove']

export default function (store) {
  return {
    install (Vue, options) {
      Vue.prototype.$store = store
      if (options === undefined) {
        options = {}
      }
      if (options.wait === undefined) {
        options.wait = 150
      }
      if (options.validators === undefined) {
        options.validators = {}
      }
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
            let self = this
            let force = true
            Vue.util.defineReactive(this, '$q', {})
            Vue.util.defineReactive(this, '$qLoading', false)
            Vue.util.defineReactive(this, '$qActivity', false)
            Vue.util.defineReactive(this, '$qs', {})
            const bindMeth = flow(
              entries,
              map(([field, query]) => {
                if (query.constraints === undefined) {
                  return [field, query]
                } else {
                  query.validate = () => {
                    return validate(self.$qs[field], query.constraints)
                  }
                  query.isValid = () => query.validate() === undefined
                  return [field, query]
                }
              }),
              fromPairs
            )
            const createQuery = flow(
              /**
               * create a new query object
               */
              ({store, force}) => {
                const query = self.$options.query.bind(self)
                return query(store, force)
              },
              /**
               * create placeholder fields for queries
               */
              (q) => {
                if (!keys(self.$qs).length) {
                  self.$qs = flow(
                    entries,
                    map(([field, query]) => (isObject(query) && query.default !== undefined) ? [field, query.default] : [field, []]),
                    fromPairs
                  )(q)
                }
                self.$q = bindMeth(q)
                return self.$q
              },
              entries,
              /**
               * ensure that all queries are promises
               */
              map(([field, query]) => {
                if (isObject(query) && query.value !== undefined) {
                  return Q(query.value)
                } else {
                  return Q(query)
                }
              }),
              Q.all
            )
            const handler = () => {
              self.$qLoading = force
              self.$qActivity = true
              createQuery({store, force}).then(flow(
                /**
                 * remap resolved values to keys
                 */
                (q) => {
                  const fields = keys(self.$q)
                  return flow(
                    entries, // enables us to use `[i, value]` in the following `map()`
                    map(([i, value]) => [
                      // key
                      fields[i],
                      // value
                      (value === undefined) ? self.$q[fields[i]].default : value
                    ])
                  )(q)
                },
                fromPairs,
                /**
                 * inject resolved query data into component, update component subtree
                 */
                (qs) => {
                  if (!isEqual(qs, self.$qs)) {
                    console.log(`$vdata[${self._uid}]: (previous)`, self.$qs)
                    console.log(`$vdata[${self._uid}]: (next)`, qs)
                    self.$qs = qs
                    self.$forceUpdate()
                    forceUpdate(self.$children)
                  }
                  self.$qLoading = force = false
                  self.$qActivity = false
                })).catch((err) => console.error(`$vdata[${self._uid}]:`, err))
            }
            handler.commit = (record) => {
              record.commit()
              return record
            }
            handler()
            this.$vdata = throttle(handler, options.wait, {leading: true})
            map((event) => store.on(event, this.$vdata))(changeEvents)
            console.log(`$vdata[${self._uid}]: ready. updates are throttled to one every ${options.wait}ms`)
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
