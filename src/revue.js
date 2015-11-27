export default function (Vue, options) {
  const _ = Vue.util
  const store = options.store
  // bring redux to revue
  _.defineReactive(Vue.prototype, '$revue', store)
  // listen for state changes
  _.defineReactive(Vue.prototype, '$subscribe', function (...args) {
    const self = this
    self.unsubscriber = []
    args.forEach(prop => {
      let currentValue
      function handleChange() {
        let previousValue = currentValue
        currentValue = store.getState()[prop]

        if (previousValue !== currentValue) {
          self.$set(prop, currentValue)
        }
      }
      self.unsubscriber.push(store.subscribe(handleChange))
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
