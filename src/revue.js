import shallowEqual from './utils/shallowEqual'
import {set as setProp, get as getProp} from 'object-path'

// to valid and match like `a.b.c as x.y.z`
const re = /^([a-zA-Z0-9\._-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)$/i

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Bind reduxStore to Vue instance
 *
 * @param {Vue} Vue
 * @param {object} store - redux store
 */
function bindVue(Vue, store) {
  Vue.prototype.$subscribe = function (...args) {
    if (this._calledOnce) {
      if (isDev) {
        throw new Error('[Revue] You can only subscribe once, pass multi args to subscribe more than one state.')
      }
      return false
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

/**
 * Wrap redux actions (both action creators and async action)
 *
 * @param {Redux Store} - store
 * @param {object} - actions
 * @returns {Object}
 */
function wrap(store, actions) {
  if (isDev && typeof actions !== 'object') {
    throw new TypeError('[Revue] Expected an Object')
  }
  // an action tree
  for (const name in actions) {
    let action = actions[name]
    actions[name] = (...args) => {
      store.dispatch(action.apply(null, args))
    }
  }
  return actions
}

export default class Revue {
  constructor(Vue, reduxStore, reduxActions) {
    this.store = reduxStore
    bindVue(Vue, this.store)
    if (reduxActions) {
      this.reduxActions = wrap(this.store, reduxActions)
    }
  }
  get state() {
    return this.store.getState()
  }
  get actions() {
    if (isDev && !this.reduxActions) {
      throw new Error('[Revue] Bind actions to Revue before calling them!')
    }
    return this.reduxActions
  }
  dispatch(...args) {
    this.store.dispatch.apply(null, args)
  }
}
