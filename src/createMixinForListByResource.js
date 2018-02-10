import to from './to'

/**
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.localPropertyName
 * @param {object} options.queryOptions
 * @return {object}
 */
export default function (options) {
  const collectionName = options.collectionName
  const localPropertyName = options.localPropertyName || collectionName
  const localPropertyForceName = `${localPropertyName}Force`
  const queryOptions = options.queryOptions || {}

  return {
    data () {
      return {
        [localPropertyName]: [],
        [localPropertyForceName]: false
      }
    },
    vdata (event) {
      if (event.collectionName === collectionName) {
        this[localPropertyName] = this.$store.getAll(collectionName) || []
      }
    },
    asyncData: {
      async [localPropertyName] () {
        let [err, result] = await to(this.$store.findAll(
          collectionName,
          queryOptions,
          {
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
