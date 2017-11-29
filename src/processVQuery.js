import entries from 'lodash/entries'
import injectAsyncData from './injectAsyncData'
import injectHandler from './injectHandler'
import vQueryDefaults from './vQueryDefaults'

/**
 * @param {object} vm
 * @param {object} store
 * @param {string[]} events
 * @param {object} vQuery
 */
export default (vm, store, events, vQuery) => {
  const q = entries(vQuery).map(([prop, opts]) => [prop, vQueryDefaults(vm, opts)])
  injectAsyncData(vm, store, q)
  injectHandler(vm, 'vQuery', events, () => {
    q.forEach(([prop, options]) => {
      const model = options.model || prop
      if (options.sync === true) {
        vm[prop] = (options.id) ? store.get(model, options.id) : store.getAll(model)
      }
    })
  })
}
