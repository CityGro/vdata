import flattenMixinTree from './flattenMixinTree'

const includes = (collection = [], item) => {
  return collection.indexOf(item) >= 0
}

let handlers = {}

/**
 * inject handler that will run on datastore events
 *
 * DANGER: mutates vm
 *
 * @param {Vue} vm
 * @param {string} label
 * @param {string[]} events
 * @param {function} fn
 */
export default (vm, events) => {
  handlers[vm._uid] = flattenMixinTree(vm.$options.mixins)
    .filter((mixin) => !!mixin.vdata)
    .map((mixin) => mixin.vdata)
  if (vm.$options.vdata) {
    handlers[vm._uid].push(vm.$options.vdata)
  }
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[@citygro/vdata<${vm._uid}>] ready. listening on`, events)
  }
  return {
    run (message) {
      if (includes(events, message.event) || message.event === '$vdata-call') {
        handlers[vm._uid].forEach((fn) => {
          setTimeout(() => fn.apply(vm, [message]), 0)
        })
      }
    },
    destroy () {
      delete handlers[vm._uid]
    }
  }
}
