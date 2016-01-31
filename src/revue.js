import shallowEqual from './utils/shallowEqual'
import {set as setProp, get as getProp} from 'object-path'

const re = /^([a-zA-Z0-9\._-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)$/i

export default class Revue {
  constructor(Vue, reduxStore) {
    this.store = reduxStore
    this.bindVue(Vue)
  }
  get state() {
    return this.store.getState()
  }
  dispatch(...args) {
    this.store.dispatch.apply(this, args)
  }
  wrap(actions) {
    // a single action
    if (typeof actions === 'function') {
      return (...args) => {
        this.store.dispatch(actions.apply(this, args))
      }
    }
    // an action tree
    for (let name in actions) {
      let action = actions[name]
      actions[name] = (...args) => {
        this.store.dispatch(action.apply(this, args))
      }
    }
    return actions
  }
  bindVue(Vue) {
    const store = this.store
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
  }
}
