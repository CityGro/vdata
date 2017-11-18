import debounce from 'lodash/debounce'
import includes from 'lodash/includes'

/**
 * setup vdata handler to run on datastore events
 *
 * DANGER: mutates thisArg
 *
 * @param {Vue} thisArg
 * @param {JSData.DataStore} store
 * @param {object} options
 * @param {function} fn
 */
export default (thisArg, store, options, fn) => {
  thisArg._vdataHandler = debounce(function () {
    const event = arguments[0]
    if (includes(options.events, event)) {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`[@citygro/vdata<${thisArg._uid}>] running for ${event}`)
      }
      fn.apply(thisArg, [store, ...arguments])
    }
  }.bind(thisArg), 25, {leading: true})
  store.on('all', thisArg._vdataHandler)
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[@citygro/vdata<${thisArg._uid}>] ready. listening on`, options.events)
  }
}

