import * as JSData from 'js-data'
import AsyncDataMixin from './asyncData'
import Q from 'q'
import debounce from 'lodash/debounce'
import defaults from 'lodash/defaults'
import includes from 'lodash/includes'
import property from 'lodash/property'
import registerAdapters from './registerAdapters'
import registerExternalEvents from './registerExternalEvents'
import registerSchemas from './registerSchemas'
import {DataStore} from 'js-data'

const getVdata = property('$options.vdata')

const hasVdata = (o) => getVdata(o) !== undefined

// late binding
var _Vue

/**
 * VData plugin
 */
export default {
  createConfig (fn) {
    return (V) => {
      const options = fn(V)
      return defaults(options || {}, {
        events: ['add', 'change', 'remove']
      })
    }
  },
  install (Vue, optionsCreator) {
    _Vue = Vue
    JSData.utils.Promise = Q
    const store = new DataStore()
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
    const options = optionsCreator(Vue)
    Object.defineProperty(store, 'vdataOptions', {
      get () {
        return options
      }
    })
    registerSchemas(store, options.models)
    registerAdapters(store, options.adapters)
    registerExternalEvents(Vue, options.externalEvents)
    if (process.env.NODE_ENV !== 'test') {
      console.log('[@citygro/vdata] store ready!', store)
    }
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
          this._vdataHandler = debounce(function () {
            const event = arguments[0]
            if (includes(options.events, event)) {
              if (process.env.NODE_ENV !== 'test') {
                console.log(`[@citygro/vdata<${self._uid}>] running for ${event}`)
              }
              self.$options.vdata.apply(self, [store, ...arguments])
            }
          }.bind(self), 25, {leading: true})
          store.on('all', self._vdataHandler)
          if (process.env.NODE_ENV !== 'test') {
            console.log(`[@citygro/vdata<${self._uid}>] ready. listening on`, options.events)
          }
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
