import to from './to'

/**
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.idPropertyName
 * @param {string} options.localPropertyName
 */
export default function (options) {
  const collectionName = options.collectionName
  const idPropertyName = options.idPropertyName || 'id'
  const localPropertyName = options.localPropertyName || collectionName.slice(0, -1)
  const localPropertyForceName = `${localPropertyName}Force`
  const idType = options.idType || String

  return {
    props: {
      [idPropertyName]: {
        type: idType,
        default: null
      }
    },
    data () {
      return {
        [localPropertyName]: null,
        [localPropertyForceName]: false
      }
    },
    vdata (event) {
      if (this[idPropertyName] && event.collectionName === collectionName) {
        this[localPropertyName] = this.$store.get(
          collectionName,
          this[idPropertyName]
        ) || null
      }
    },
    asyncData: {
      async [localPropertyName] () {
        const force = this[localPropertyForceName]
        let err, result
        if (this[idPropertyName]) {
          if (!force) {
            result = this.$store.get(collectionName, this[idPropertyName])
          }
          if (!result) {
            [err, result] = await to(this.$store.find(
              collectionName,
              this[idPropertyName],
              {force}
            ))
          }
        } else {
          result = this.$store.createRecord(collectionName)
        }
        if (err) {
          console.error(err)
          result = null
        }
        return result
      }
    },
    watch: {
      [idPropertyName] () {
        this.$asyncReload(localPropertyName)
      }
    }
  }
}
