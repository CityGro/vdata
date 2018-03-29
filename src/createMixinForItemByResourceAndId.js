import camelCase from 'lodash/camelCase'
import clone from 'lodash/cloneDeep'
import fastDiff from './fastDiff'
import get from 'lodash/get'
import merge from 'lodash/merge'
import pop from './pop'
import rebase from './rebase'
import to from './to'

/**
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.idPropertyName
 * @param {string} options.localPropertyName
 * @param {object} options.requestOptions
 */
export default function (options) {
  const collectionName = options.collectionName
  const localPropertyName = options.localPropertyName || camelCase(collectionName).slice(0, -1)
  const idPropertyName = options.idPropertyName || '_id' // FIXME `${localPropertyName}Id`
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
  const capture = pop(requestOptions, 'capture', false)
  const requestOptionsOverrideName = `${localPropertyName}RequestOptionsOverride`

  return {
    props: {
      [idPropertyName]: {
        type: idType,
        default: null
      },
      [templateName]: {
        type: Object,
        default: () => clone(template)
      },
      [requestOptionsOverrideName]: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      let data = {
        [localPropertyName]: null,
        [requestOptionsName]: merge({}, clone(requestOptions), this[requestOptionsOverrideName])
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
        if (capture && !this[captureName]) {
          this[captureName] = clone(result)
        }
        return result
      }
    },
    watch: {
      [idPropertyName] () {
        if (!capture) {
          this.$asyncReload(localPropertyName)
        }
      }
    },
    computed: {
      [hasChangesComputedName] () {
        const localState = this[localPropertyName]
        if (this[capture]) {
          return fastDiff(this[captureName], localState)
        } else {
          return this.$store.hasChanges(
            collectionName,
            this[getIdMethodName](),
            localState
          )
        }
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
      // what if this is a NEW record?
      async [saveMethodName] () {
        const recordId = this[getIdMethodName]()
        const value = (capture)
          ? rebase(
            this[captureName],
            (recordId) ? this.$store.get(collectionName, recordId) : {},
            this[localPropertyName]
          )
          : this[localPropertyName]
        const [err, response] = await to(
          this.$store.save(
            collectionName,
            value
          )
        )
        if (err) {
          throw err
        }
        if (response) {
          this[localPropertyName] = response
          this.$emit(`update:${idPropertyName}`, response[recordPrimaryKey])
        }
        return this[localPropertyName]
      }
    }
  }
}
