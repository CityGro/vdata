import shallowEqual from './utils/shallowEqual'
import {
  set as setProp,
  get as getProp
} from 'object-path'

export default function(Vue, {
  store = null,
  actions = null
} = {}) {
  if (process.env.NODE_ENV !== 'production' && typeof store !== 'object') {
    throw new TypeError('[Revue] Expected store to be an object')
  }
  const re = /^([a-zA-Z0-9\._-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)$/i
  // you can bind your actions to vue instance
  // so you can call them via this.$actions.yourAction in vue instance
  if (actions) {
    Object.defineProperty(Vue.prototype, '$actions', {
      value: actions
    })
  }
  Vue.prototype.$store = {
    get state() {
      return store.getState()
    },
    dispatch: store.dispatch
  }
  Vue.prototype.$subscribe = function (...args) {
    if (this._calledOnce) {
      if (process.env.NODE_ENV === 'production') {
        return false
      }
      throw new Error('[Revue] You can only subscribe once, pass multi args to subscribe more than one state.')
    }
    this._calledOnce = true
    this._unsubscribers = []
    args.forEach(prop => {
      // realProp: property name/path in your instance
      // storeProp: property name/path in Redux store
      let realProp = prop,
        storeProp = prop
      if (re.test(prop)) {
        [, storeProp, realProp] = prop.match(re)
      }
      let currentValue = getProp(store.getState(), storeProp)
      const handleChange = () => {
        let previousValue = currentValue
        currentValue = getProp(store.getState(), storeProp)
        if (!shallowEqual(previousValue, currentValue)) {
          setProp(this._data, realProp, currentValue)
        }
      }
      this._unsubscribers.push(store.subscribe(handleChange))
    })
  }
  Vue.prototype.$unsubscribe = function () {
    if (this._unsubscribers && this._unsubscribers.length > 0) {
      this._calledOnce = false
      this._unsubscribers.forEach(un => un())
    }
  }
  // global mixin
  Vue.mixin({
    beforeDestroy() {
      this.$unsubscribe()
    }
  })
}
