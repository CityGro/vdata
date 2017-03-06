import each from 'lodash/fp/each'
import map from 'lodash/fp/map'
import property from 'lodash/property'
import throttle from 'lodash/throttle'
import defaults from 'lodash/defaults'

import {AsyncDataMixin} from '../lib/vue-async-data/src/main'

const forceUpdate = each((child) => setTimeout(() => {
  child.$forceUpdate()
  forceUpdate(child.$children)
}, 0))

const getVdata = property('$options.vdata')

const hasVdata = (o) => getVdata(o) !== undefined

/**
 * create VData plugin
 * @param store - js-data store
 * @returns {{install: (function(*, options: object))}}
 */
export default function (store) {
  return {
    install (Vue, options) {
      options = defaults(options || {}, {
        events: ['add', 'change', 'remove'],
        throttle: 150
      })

      Vue.prototype.$store = store

      Vue.mixin(AsyncDataMixin)

      Vue.mixin({
        beforeCreate () {
          if (hasVdata(this)) {
            const self = this
            this._vdata_handler = throttle((collection) => {
              console.log('vdata running for', collection)
              self.$options.vdata.call(self, [store, collection])
            }, options.throttle, {leading: true})
            map((event) => store.on(event, this._vdata_handler))(options.events)
            console.log(`vdata[${this._uid}]: ready. listening.`, options.events)
          }
        },
        beforeUpdate () {
          if (hasVdata(this)) {
            this.$options.vdata.call(this, [store, 'vue'])
          }
        },
        beforeDestroy () {
          map((event) => store.off(event, this._vdata_handler))(options.events)
        }
      })
    }
  }
}
