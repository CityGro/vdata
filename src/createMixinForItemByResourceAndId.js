import get from 'lodash/get'
import to from './to'

const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

/**
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.idPropertyName
 * @param {string} options.localPropertyName
 * @param {object} options.requestOptions
 */
export default function (options) {
  const collectionName = options.collectionName
  const localPropertyName = options.localPropertyName || collectionName.slice(0, -1)
  const idPropertyName = options.idPropertyName || 'id' // FIXME `${localPropertyName}Id`
  const templateName = options.templateName || `${localPropertyName}Template`
  const template = options.template || {}
  const recordPrimaryKey = options.recordPrimaryKey || '_id'
  const getIdMethodName = `${localPropertyName}RecordId`
  const hasChangesComputedName = `${localPropertyName}HasChanges`
  const saveMethodName = `${localPropertyName}Save`
  const asyncLoadingName = `${localPropertyName}Loading`
  const idType = options.idType || String
  const requestOptions = options.requestOptions || {}
  const requestOptionsName = `${localPropertyName}RequestOptions`

  return {
    props: {
      [idPropertyName]: {
        type: idType,
        default: null
      },
      [templateName]: {
        type: Object,
        default: () => deepClone(template)
      }
    },
    data () {
      return {
        [localPropertyName]: null,
        [requestOptionsName]: deepClone(requestOptions)
      }
    },
    vdata (event) {
      const recordId = this[getIdMethodName]()
      if (
        !this[asyncLoadingName] &&
        recordId !== null &&
        event.collectionName === collectionName
      ) {
        this[localPropertyName] = this.$store.get(
          collectionName,
          recordId
        ) || null
      }
    },
    asyncData: {
      async [localPropertyName] () {
        const force = this[requestOptionsName].force
        const recordId = this[getIdMethodName]()
        let err, result
        if (recordId !== null) {
          if (!force) {
            result = this.$store.get(collectionName, recordId)
          }
          if (!result) {
            [err, result] = await to(this.$store.find(
              collectionName,
              recordId,
              this[requestOptionsName]
            ))
          }
        } else {
          result = this.$store.createRecord(
            collectionName,
            this[templateName]
          )
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
    },
    computed: {
      [hasChangesComputedName] () {
        return this.$store.hasChanges(
          collectionName,
          this[getIdMethodName](),
          this[localPropertyName]
        )
      }
    },
    methods: {
      [getIdMethodName] () {
        const id = (
          this[idPropertyName] ||
          get(this, `${localPropertyName}.${recordPrimaryKey}`, null)
        )
        return this.$store.isValidId(id) ? id : null
      },
      async [saveMethodName] () {
        const [err, response] = await to(
          this.$store.save(
            collectionName,
            this[localPropertyName]
          )
        )
        if (err) { throw err }
        if (response) {
          this[localPropertyName] = response
          this.$emit(`update:${idPropertyName}`, response[recordPrimaryKey])
        }
        return this[localPropertyName]
      }
    }
  }
}
