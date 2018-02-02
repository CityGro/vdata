import AsyncDataMixin from './AsyncDataMixin'
import createObjectFromEventData from './createObjectFromEventData'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import injectHandler from './injectHandler'
import isFunction from 'lodash/isFunction'
import registerAdapters from './registerAdapters'
import registerExternalEvents from './registerExternalEvents'
import registerSchemas from './registerSchemas'
import {DataStore} from 'js-data'

const hasVdata = (o) => !!get(o, '$options.vdata')

/**
 * vdata plugin
 */
export default {
  createConfig (fn) {
    return (V) => {
      const options = fn(V)
      return defaults(options || {}, {
        events: ['add', 'change', 'remove', 'manual', 'afterDestroy', 'vm-created']
      })
    }
  },
  install (Vue, options) {
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
    options = (isFunction(options)) ? options(Vue) : options
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
    Vue.mixin({
      methods: {
        $vdata () {
          if (hasVdata(this)) {
            this._vdataHandler(createObjectFromEventData(...arguments))
          }
        }
      },
      beforeCreate () {
        if (hasVdata(this)) {
          injectHandler(this, 'vdata', options.events, this.$options.vdata)
        }
      },
      created () {
        this.$vdata()
        this.$store.on('all', this.$vdata)
      },
      beforeDestroy () {
        if (hasVdata(this)) {
          store.off('all', this.$vdata)
        }
      }
    })
    Vue.mixin(AsyncDataMixin)
  }
}
