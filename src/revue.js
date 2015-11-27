export default function (Vue, options) {
  const _ = Vue.util
  const store = options.store
  // bring redux to revue
  _.defineReactive(Vue.prototype, '$revue', store)
  // listen for state changes
  _.defineReactive(Vue.prototype, '$subscribe', function (...args) {
    this.unsubscriber = []
    args.forEach(prop => {
      let currentValue
      const handleChange = () => {
        let previousValue = currentValue
        currentValue = store.getState()[prop]
        if (previousValue !== currentValue) {
          this.$set(prop, currentValue)
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
