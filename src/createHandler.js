import Queue from '@r14c/async-utils/Queue'
import flattenMixinTree from './flattenMixinTree'
import includes from 'lodash/includes'

let storeSubs = []

export default (Vue, options = {}) => {
  const concurrency = options.concurrency
  const queue = Queue.create({
    concurrency,
    next: () => new Promise((resolve) => Vue.nextTick(() => resolve()))
  })
  let handlers = {}
  return {
    /**
     * register handlers that will run on datastore events
     *
     * @param {Vue.Component} vm
     */
    add (vm) {
      const storeId = vm.$store.storeId
      if (!includes(storeSubs, storeId)) {
        // only sub to `Store#all` once
        vm.$store.on('all', (message) => {
          // enqueue a task to handle the vdata listeners for a particular vm
          queue.push(() => {
            Object.values(handlers).forEach((vmHandler) => {
              vmHandler.run(message)
            })
          })
        })
        storeSubs.push(storeId)
      }
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
