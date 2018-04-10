import flattenMixinTree from './flattenMixinTree'
import forEach from '@r14c/async-utils/forEach'

let handlers = {}

/**
 * inject handler that will run on datastore events
 *
 * @param {Vue} vm
 * @param {string} label
 * @param {string[]} events
 * @param {function} fn
 */
export default (vm) => {
  handlers[vm._uid] = flattenMixinTree(vm.$options.mixins)
    .filter((mixin) => !!mixin.vdata)
    .map((mixin) => mixin.vdata)
  if (vm.$options.vdata) {
    handlers[vm._uid].push(vm.$options.vdata)
  }
  return {
    run (message) {
      forEach(handlers[vm._uid], (fn) => {
        fn.apply(vm, [message])
      })
    },
    destroy () {
      delete handlers[vm._uid]
    }
  }
}
