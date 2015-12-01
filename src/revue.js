export default function (Vue, options) {
  const _ = Vue.util
  const store = options.store
  const re = /([a-zA-Z0-9_-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9_-]+)/i
  // bring redux to revue
  _.defineReactive(Vue.prototype, '$revue', store)
  // listen for state changes
  _.defineReactive(Vue.prototype, '$subscribe', function (...args) {
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
  })
  _.defineReactive(Vue.prototype, '$unsubscribe', function () {
    this.unsubscriber.forEach(un => un())
  })
  // global mixin
  Vue.mixin({
    beforeDestroy () {
      if (this.unsubscriber && this.unsubscriber.length > 0) {
        this.$unsubscribe()
      }
    }
  })
}
