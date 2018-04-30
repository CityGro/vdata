import AsyncDataMixin from './AsyncDataMixin'
import createHandler from './createHandler'
import createStore from './createStore'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'

const hasVdata = (o) => !!get(o, '$options.vdata')

/**
 * vdata plugin
 */
export default {
  createConfig (fn) {
    return (V) => fn(V)
  },
  install (Vue, options) {
    options = (isFunction(options)) ? options(Vue) : options
    const store = createStore(options)
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
    const vmHandler = createHandler(Vue, store)
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
          this._vdataHandler = vmHandler.add(this)
        }
      },
      beforeDestroy () {
        if (hasVdata(this)) {
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
