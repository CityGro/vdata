export default function (Vue, options) {
  const _ = Vue.util
  _.defineReactive(Vue.prototype, '$revue', options.store)
  _.defineReactive(Vue.prototype, '$subscribe', function () {
    const self = this
    const unsubscriber = []
    const props = [].slice.call(arguments)
    props.forEach(prop => {
      let currentValue
      function handleChange() {
        let previousValue = currentValue;
        currentValue = options.store.getState()[prop]

        if (previousValue !== currentValue) {
          self.$set(prop, currentValue)
        }
      }
      unsubscriber.push(options.store.subscribe(handleChange))
    })
  })
}
