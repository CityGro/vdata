import clone from 'lodash/cloneDeep'
import get from 'lodash/get'
import pop from './pop'
import rebase from './rebase'
import to from '@r14c/async-utils/to'

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
  const captureName = `${localPropertyName}Capture`
  const capture = pop(options.requestOptions, 'capture', false)

  return {
    props: {
      [idPropertyName]: {
        type: idType,
        default: null
      },
      [templateName]: {
        type: Object,
        default: () => clone(template)
      }
    },
    data () {
      let data = {
        [localPropertyName]: null,
        [requestOptionsName]: clone(requestOptions)
      }
      if (capture) {
        data[captureName] = null
      }
      return data
    },
    vdata (event) {
      const recordId = this[getIdMethodName]()
      if (
        !this[asyncLoadingName] &&
        recordId !== null &&
        event.collectionName === collectionName
      ) {
        if (capture) {
          this[localPropertyName] = rebase(
            this[captureName],
            this.$store.get(collectionName, recordId) || {},
            this[localPropertyName]
          )
        } else {
          this[localPropertyName] = this.$store.get(
            collectionName,
            recordId
          ) || null
        }
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
        if (capture) {
          this[captureName] = clone(result)
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
        const recordId = this[getIdMethodName]()
        const value = (capture)
          ? rebase(
            this[captureName],
            this.$store.get(collectionName, recordId) || {},
            this[localPropertyName]
          )
          : this[localPropertyName]
        const [err, response] = await to(
          this.$store.save(
            collectionName,
            value
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
