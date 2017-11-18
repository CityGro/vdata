import entries from 'lodash/entries'
import getAsyncDefaults from './getAsyncDefaults'
import isEmpty from 'lodash/isEmpty'

/**
 * creates an asyncData object using a vdata config object
 *
 * @param {Vue} thisArg
 * @param {JSData.DataStore} store
 * @param {object|boolean} options
 */
export default (thisArg, store, options) => {
  let asyncData = (isEmpty(this.$options.asyncData)) ? {} : this.$options.asyncData
  entries(options).each(([model, options]) => {
    options = getAsyncDefaults(options)
    asyncData[`${model}Lazy`] = options.lazy
    if (options.id) {
      asyncData[model] = () => store.find(model, options.id, {force: options.force})
    } else {
      asyncData[model] = () => store.findAll(model, {force: options.force})
    }
  })
  this.$options.asyncData = asyncData
}
