import each from 'lodash/fp/each'
import map from 'lodash/fp/map'
import property from 'lodash/property'
import throttle from 'lodash/throttle'
import defaults from 'lodash/defaults'

import {AsyncDataMixin} from '../lib/vue-async-data/src/main'

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
            this._vdataHandler = (collection) => {
              console.log(`vdata[${self._uid}] running for`, collection)
              self.$options.vdata.call(self, store, collection)
            }
            map((event) => store.on(event, self._vdataHandler))(options.events)
            console.log(`vdata[${self._uid}]: ready. listening.`, options.events)
          }
        },
        beforeUpdate () {
          if (hasVdata(this)) {
            this._vdataHandler('vue')
          }
        },
        beforeDestroy () {
          if (hasVdata(this)) {
            map((event) => store.off(event, this._vdataHandler))(options.events)
          }
        }
      })
    }
  }
}
