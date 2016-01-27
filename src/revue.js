import shallowEqual from './utils/shallowEqual'
import {
  set as setProp,
  get as getProp
} from 'object-path'

let revueStore

export default function(Vue, {
  store = null,
  actions = null
} = {}) {
  if (process.env.NODE_ENV !== 'production' && typeof store !== 'object') {
    throw new TypeError('[Revue] Expected store to be an object')
  }
  const re = /^([a-zA-Z0-9\._-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)$/i
  revueStore = store
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
      let currentValue = getProp(revueStore.getState(), storeProp)
      const handleChange = () => {
        let previousValue = currentValue
        currentValue = getProp(revueStore.getState(), storeProp)
        if (!shallowEqual(previousValue, currentValue)) {
          setProp(this._data, realProp, currentValue)
        }
      }
      this._unsubscribers.push(revueStore.subscribe(handleChange))
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

export function wrap(actions) {
  // a single action
  if (typeof actions === 'function') {
    return function (...args) {
      revueStore.dispatch(actions.apply(this, args))
    }
  }
  // an action tree
  for (let name in actions) {
    let action = actions[name]
    actions[name] = function (...args) {
      revueStore.dispatch(action.apply(this, args))
    }
  }
  return actions
}

export function dispatch(args) {
  revueStore.dispatch.call(this, args)
}

export function getState(state) {
  return getProp(revueStore.getState(), state)
}
