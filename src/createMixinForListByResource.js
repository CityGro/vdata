import camelCase from 'lodash/camelCase'
import to from '@r14c/async-utils/to'

/**
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.localPropertyName
 * @param {object} options.queryOptions
 * @param {object} options.requestOptions
 * @return {object}
 */
export default function (options) {
  const collectionName = options.collectionName
  const localPropertyName = options.localPropertyName || camelCase(collectionName)
  const localPropertyForceName = `${localPropertyName}Force`
  const queryOptions = options.queryOptions || {}
  const requestOptions = options.requestOptions

  return {
    data () {
      return {
        [localPropertyName]: [],
        [localPropertyForceName]: false
      }
    },
    vdata (event) {
      if (!this.asyncLoading && event.collectionName === collectionName) {
        this[localPropertyName] = this.$store.getAll(collectionName) || []
      }
    },
    asyncData: {
      async [localPropertyName] () {
        let [err, result] = await to(this.$store.findAll(
          collectionName,
          queryOptions,
          {
            ...requestOptions,
            force: this[localPropertyForceName]
          }
        ))
        if (err) {
          console.error(err)
          result = []
        }
        return result
      }
    }
  }
}
