import AsyncDataMixin from './asyncData'
import defaults from 'lodash/defaults'
import entries from 'lodash/entries'
import getAsyncDefaults from './getAsyncDefaults'
import injectAsyncData from './injectAsyncData'
import injectVdataHandler from './injectVdataHandler'
import isFunction from 'lodash/isFunction'
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
          if (isFunction(this.$options.vdata)) {
            injectVdataHandler(this, store, options, this.$options.vdata)
          } else {
            injectAsyncData(this, store, this.$options.vdata)
            injectVdataHandler(this, store, options, () => {
              entries(this.$options.vdata).forEach(([model, options]) => {
                options = getAsyncDefaults(options)
                if (options.sync === true) {
                  this[model] = store.getAll(model)
                }
              })
            })
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
