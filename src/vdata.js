import each from 'lodash/fp/each'
import property from 'lodash/property'
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
        events: ['add', 'change', 'remove']
      })

      Vue.prototype.$store = store

      Vue.mixin(AsyncDataMixin)

      Vue.mixin({
        methods: {
          $vdata () {
            this._vdataHandler('force')
          }
        },
        beforeCreate () {
          if (hasVdata(this)) {
            const self = this
            this._vdataHandler = (event) => {
              console.log(`vdata[${self._uid}] running for`, event)
              self.$options.vdata.call(self, store, event)
            }
            each((event) => store.on(event, self._vdataHandler))(options.events)
            console.log(`vdata[${self._uid}]: ready. listening.`, options.events)
          }
        },
        beforeDestroy () {
          if (hasVdata(this)) {
            each((event) => store.off(event, this._vdataHandler))(options.events)
          }
        }
      })
    }
  }
}
