import includes from 'lodash/includes'

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
  vm[`_${label}Handler`] = (store, event = '$vdata-call', collection) => {
    if (includes(events, event) || event === '$vdata-call') {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`[@citygro/vdata<${vm._uid}>] running for ${event}`)
      }
      setTimeout(() => fn.apply(vm, [store, event, collection]), 0)
    }
  }
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[@citygro/vdata#${label}<${vm._uid}>] ready. listening on`, events)
  }
}
