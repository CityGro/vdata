import AsyncDataMixin from './AsyncDataMixin'
import createObjectFromEventData from './createObjectFromEventData'
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
    return (V) => {
      const options = fn(V)
      return defaults(options || {}, {
        events: ['add', 'change', 'remove', 'afterDestroy', 'vm-created']
      })
    }
  },
  install (Vue, options) {
    options = (isFunction(options)) ? options(Vue) : options
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
    if (process.env.NODE_ENV !== 'test') {
      console.log('[@citygro/vdata] $store ready!', store)
    }
    Vue.mixin({
      methods: {
        $vdata () {
          if (hasVdata(this)) {
            this._vdataHandler.run(createObjectFromEventData(...arguments))
          }
        }
      },
      beforeCreate () {
        if (hasVdata(this)) {
          this._vdataHandler = createHandler(this, options.events)
        }
      },
      created () {
        this.$vdata('vm-created')
        this.$store.on('all', this.$vdata)
      },
      beforeDestroy () {
        if (hasVdata(this)) {
          store.off('all', this.$vdata)
          this._vdataHandler.destroy()
        }
      }
    })
    Vue.mixin(AsyncDataMixin)
  }
}
