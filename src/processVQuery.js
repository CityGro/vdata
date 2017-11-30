import generateTerms from './generateTerms'
import injectAsyncData from './injectAsyncData'
import injectHandler from './injectHandler'

/**
 * @param {object} vm
 * @param {object} store
 * @param {string[]} events
 * @param {object} vQuery
 */
export default (vm, events, vQuery) => {
  const q = generateTerms(vm, vQuery)
  injectAsyncData(vm, q)
  injectHandler(vm, 'vQuery', events, () => {
    q.forEach(([prop, options]) => {
      const model = options.model || prop
      if (options.sync === true) {
        vm[prop] = (options.id) ? vm.$store.get(model, options.id) : vm.$store.getAll(model)
      }
    })
  })
}
