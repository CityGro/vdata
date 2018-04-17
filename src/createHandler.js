import Queue from '@r14c/async-utils/Queue'
import flattenMixinTree from './flattenMixinTree'

export default (Vue, store) => {
  const queue = Queue.create({
    next: () => new Promise((resolve) => Vue.nextTick(() => resolve()))
  })
  let handlers = {}
  store.on('all', (message) => {
    Object.values(handlers).forEach((vmHandler) => {
      // enqueue a task to handle the vdata listeners for a particular vm
      queue.push(() => vmHandler.run(message))
    })
  })
  return {
    /**
     * register handlers that will run on datastore events
     *
     * @param {Vue.Component} vm
     */
    add (vm) {
      const listeners = flattenMixinTree(vm.$options.mixins)
        .filter((mixin) => !!mixin.vdata)
        .map((mixin) => mixin.vdata)
      if (vm.$options.vdata) {
        listeners.push(vm.$options.vdata)
      }
      const handler = {
        run (message) {
          listeners.forEach((fn) => {
            fn.call(vm, message)
          })
        },
        destroy () {
          delete handlers[vm._uid]
        }
      }
      handlers[vm._uid] = handler
      return handler
    }
  }
}
