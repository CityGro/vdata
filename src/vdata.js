import AsyncDataMixin from './AsyncDataMixin'
import createHandler from './createHandler'
import createStore from './createStore'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'

const hasVdata = (vm) => !!get(vm, '$options.vdata')

/**
 * vdata plugin
 */
export default {
  createConfig (fn) {
    return (V) => fn(V)
  },
  /**
   * @param {object} Vue
   * @param {object} options - options are passed into `createStore`
   * @param {number} [options.queueConcurrency=2]
   */
  install (Vue, options) {
    const vdataOptions = (isFunction(options)) ? options(Vue) : options
    const store = createStore(vdataOptions)
    const concurrency = vdataOptions.queueConcurrency || 2
    Object.defineProperty(Vue, '$store', {
      get () {
        const parentStore = get(this, '$parent.$store')
        if (parentStore) {
          return parentStore
        } else {
          return store
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$store', {
      get () {
        const parentStore = get(this, '$parent.$store')
        if (parentStore) {
          return parentStore
        } else {
          return store
        }
      }
    })
    const vmHandler = createHandler(Vue, {concurrency})
    Vue.mixin({
      methods: {
        $vdata (message) {
          if (hasVdata(this)) {
            this._vdataHandler.run(message)
          }
        }
      },
      created () {
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
  }
}
