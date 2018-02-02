const includes = (collection = [], item) => {
  return collection.indexOf(item) >= 0
}

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
export default (vm, label, events, fn) => {
  vm[`_${label}Handler`] = (message) => {
    if (includes(events, message.event) || message.event === '$vdata-call') {
      setTimeout(() => fn.apply(vm, [message]), 0)
    }
  }
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[@citygro/vdata#${label}<${vm._uid}>] ready. listening on`, events)
  }
}
