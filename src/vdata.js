import * as JSData from 'js-data'
import AsyncDataMixin from './asyncData'
import Q from 'q'
import defaults from 'lodash/defaults'
import includes from 'lodash/includes'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import property from 'lodash/property'
import registerAdapters from './registerAdapters'
import registerExternalEvents from './registerExternalEvents'
import registerSchemas from './registerSchemas'
import throttle from 'lodash/throttle'
import {DataStore} from 'js-data'

const getVdata = property('$options.vdata')

const hasVdata = (o) => getVdata(o) !== undefined

let _Vue = {}

/**
 * VData plugin
 */
export default {
  createConfig (fn) {
    return fn(new Proxy(_Vue, {}))
  },
  install (Vue, options) {
    _Vue = Vue
    JSData.utils.Promise = Q
    options = defaults(options || {}, {
      events: ['add', 'change', 'remove']
    })
    const store = new DataStore()
    Object.defineProperty(store, 'vdataOptions', {
      get () {
        return options
      }
    })
    Object.defineProperty(Vue, '$store', {
      get () {
        return store
      }
    })
    Object.defineProperty(Vue.prototype, '$store', {
      get () {
        return store
      }
    })
    registerSchemas(store, options.models)
    registerAdapters(store, options.adapters)
    registerExternalEvents(Vue, options.externalEvents)
    console.log('[@citygro/vdata] store ready!', store)
    Vue.mixin(AsyncDataMixin)
    Vue.mixin({
      methods: {
        $vdata () {
          if (hasVdata(this)) {
            this._vdataHandler('change')
          }
        }
      },
      beforeCreate () {
        if (hasVdata(this)) {
          const self = this
          this._vdataHandler = throttle(function () {
            const event = arguments[0]
            if (includes(options.events, event)) {
              console.log(`[@citygro/vdata<${self._uid}>] running for ${event}`)
              self.$options.vdata.apply(self, [store, ...arguments])
            }
          }.bind(self), 10)
          store.on('all', self._vdataHandler)
          console.log(`[@citygro/vdata<${self._uid}>]: ready. listening on`, options.events)
        }
      },
      created () {
        this.$vdata()
      },
      beforeDestroy () {
        if (hasVdata(this)) {
          store.off('all', this._vdataHandler)
        }
      }
    })
  }
}
