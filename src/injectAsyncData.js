import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'

/**
 * creates an asyncData object using a vdata config object
 *
 * @param {Vue} thisArg
 * @param {JSData.DataStore} store
 * @param {array[]} q
 */
export default (vm, store, q) => {
  let asyncData = (isEmpty(vm.$options.asyncData)) ? {} : vm.$options.asyncData
  q.forEach(([prop, options]) => {
    const model = options.model || prop
    asyncData[`${model}Lazy`] = options.lazy
    asyncData[`${model}Default`] = (isFunction(options.default)) ? options.default.call(vm) : options.default
    asyncData[model] = (options.id)
      ? () => store.find(model, options.id, {force: options.force})
      : () => store.findAll(model, {force: options.force})
  })
  vm.$options.asyncData = asyncData
}
