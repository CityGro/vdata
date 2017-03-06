import each from 'lodash/fp/each'
import map from 'lodash/fp/map'
import property from 'lodash/property'
import concat from 'lodash/fp/concat'

import {AsyncDataMixin} from '../lib/vue-async-data/src/main'

const forceUpdate = each((child) => setTimeout(() => {
  child.$forceUpdate()
  forceUpdate(child.$children)
}, 0))

const changeEvents = ['add', 'change', 'remove']

/**
 * create VData plugin
 * @param store - js-data store
 * @returns {{install: (function(*, options: object))}}
 */
export default function (store) {
  return {
    install (Vue, options) {
      if (options === undefined) {
        options = {
          events: changeEvents
        }
      }

      if (property('events')(options) === undefined) {
        options.events = concat(options.events)(changeEvents)
      }

      Vue.prototype.$store = store

      Vue.mixin(AsyncDataMixin)

      Vue.mixin({
        beforeCreate () {
          if (property('$options.vdata')(this)) {
            this.$options.vdata.bind(this)
            this._vdata_handler = (collection) => {
              this.$options.vdata(store, collection)
            }
            map((event) => store.on(event, this._vdata_handler))(options.events)
            console.log(`vdata[${this._uid}]: ready. listening.`, options.events)
          }
        },
        beforeDestroy () {
          map((event) => store.off(event, this._vdata_handler))(options.events)
        }
      })
    }
  }
}
