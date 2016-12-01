export default function (store) {
  return {
    install (Vue) {
      Object.defineProperty(Vue.prototype, '$state', {
        get () {
          return store.getState()
        }
      })
      Object.defineProperty(Vue.prototype, '$dispatch', {
        get () {
          return store.dispatch
        }
      })
    }

  }
}
