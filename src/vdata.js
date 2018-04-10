import AsyncDataMixin from './AsyncDataMixin'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import createHandler from './createHandler'
import isFunction from 'lodash/isFunction'
import Store from './Store'

const hasVdata = (o) => !!get(o, '$options.vdata')

/**
 * vdata plugin
 */
export default {
  createConfig (fn) {
    return (V) => fn(V)
  },
  install (Vue, options) {
    options = defaults({}, (isFunction(options)) ? options(Vue) : options, {
      events: ['add', 'remove']
    })
    const store = Store.create(options)
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
    Vue.mixin({
      methods: {
        $vdata (message) {
          if (hasVdata(this)) {
            this._vdataHandler.run(message)
          }
        }
      },
      beforeCreate () {
        if (hasVdata(this)) {
          this._vdataHandler = createHandler(this, options)
        }
      },
      created () {
        options.events.forEach((event) => {
          this.$store.on(event, this.$vdata)
        })
      },
      beforeDestroy () {
        if (hasVdata(this)) {
          options.events.forEach((event) => {
            this.$store.off(event, this.$vdata)
          })
          this._vdataHandler.destroy()
        }
      }
    })
    Vue.mixin(AsyncDataMixin)
    if (process.env.NODE_ENV !== 'test') {
      console.log('[@citygro/vdata] $store ready!', store, options)
    }
  }
}
