import camelCase from 'lodash/camelCase'
import clone from 'lodash/cloneDeep'
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
  const requestOptionsName = `${localPropertyName}RequestOptions`
  const requestOptionsOverrideName = `${localPropertyName}RequestOptionsOverride`

  return {
    props: {
      [requestOptionsOverrideName]: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        [localPropertyName]: [],
        [localPropertyForceName]: false,
        [requestOptionsName]: {
          ...clone(requestOptions),
          ...this[requestOptionsOverrideName]
        }
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
            ...this[requestOptionsOverrideName],
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
