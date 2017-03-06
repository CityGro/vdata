import property from 'lodash/property'
import defaults from 'lodash/defaults'
import includes from 'lodash/includes'

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
            this._vdataHandler('change')
          }
        },
        beforeCreate () {
          if (hasVdata(this)) {
            const self = this
            this._vdataHandler = (event) => {
              if (includes(options.events, event)) {
                console.log(`vdata[${self._uid}] running for`, event)
                self.$options.vdata.call(self, store, event)
              }
            }
            store.on('all', self._vdataHandler)
            console.log(`vdata[${self._uid}]: ready. listening.`, options.events)
          }
        },
        beforeDestroy () {
          if (hasVdata(this)) {
            store.off('all', this._vdataHandler)
          }
        }
      })
    }
  }
}
