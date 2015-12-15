import objectPath from 'object-path'
import shallowEqual from './utils/shallowEqual'

export default function (Vue, options) {
  // const _ = Vue.util
  const store = options.store
  const re = /([a-zA-Z0-9\._-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)/i
  // bring redux to revue
  Object.defineProperties(Vue.prototype, {
    '$revue': {
      value: store
    },
    '$subscribe': {
      value (...args) {
        // unsubscribe old listeners if ever subscribed
        this.$unsubscribe()
        this.unsubscriber = []
        args.forEach(prop => {
          // realProp: property name/path in your instance
          // storeProp: property name/path in Redux store
          let realProp = prop, storeProp = prop
          if (re.test(prop)) {
            [, storeProp, realProp] = prop.match(re)
          }
          let currentValue = store.getState()[storeProp]
          const handleChange = () => {
            let previousValue = currentValue
            currentValue = objectPath.get(store.getState(), storeProp)
            if (!shallowEqual(previousValue, currentValue)) {
              objectPath.set(this._data, realProp, currentValue)
            }
          }
          this.unsubscriber.push(store.subscribe(handleChange))
        })
      }
    },
    '$unsubscribe': {
      value () {
        if (this.unsubscriber && this.unsubscriber.length > 0) {
          this.unsubscriber.forEach(un => un())
        }
      }
    }
  })
  // global mixin
  Vue.mixin({
    beforeDestroy () {
      this.$unsubscribe()
    }
  })
}
