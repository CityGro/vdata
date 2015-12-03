export default function (Vue, options) {
  // const _ = Vue.util
  const store = options.store
  const re = /([a-zA-Z0-9_-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9_-]+)/i
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
          let realProp = prop, storeProp = prop
          if (re.test(prop)) {
            const match = prop.match(re)
            realProp = match[2]
            storeProp = match[1]
          }
          let currentValue
          const handleChange = () => {
            let previousValue = currentValue
            currentValue = store.getState()[storeProp]
            if (previousValue !== currentValue) {
              this._data[realProp] = currentValue
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
