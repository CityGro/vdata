import camelCase from 'lodash/camelCase'
import clone from 'lodash/cloneDeep'
import fastDiff from './fastDiff'
import get from 'lodash/get'
import merge from 'lodash/merge'
import pop from './pop'
import rebase from './rebase'
import to from './to'

/**
 * create a mixin that configures a vm to manipulate a single record. you can
 * use a prop to ask for a record by id or specify a template to create a new
 * record that is pre-populated with some initial state.
 *
 * ```javascript
 * // @/queries/UserById.js
 * import {createMixinForItemById} from '@citygro/vdata'
 *
 * export default {
 *   mixins: [
 *     createMixinForItemById({
 *       idPropertyName: 'userId',
 *       collectionName: 'users',
 *       localPropertyName: 'user',
 *       requestOptions: {
 *         capture: false
 *       }
 *    })
 *   ]
 * }
 * ```
 *
 * a vm which consumes this mixin will have the following props, methods, data,
 * &c. it will also be configured to react to changes to data in the store and
 * update itself accordingly.
 *
 * ```javascript
 * {
 *   props: {
 *     userid: String,
 *     userRequestOptionsOverride: Object
 *   },
 *   data: {
 *     user: Object,
 *   },
 *   methods: {
 *     userSave: Function,
 *   },
 *   computed: {
 *     asyncLoading: Boolean,
 *     userLoading: Boolean,
 *     userHasChanges: Boolean
 *   }
 * }
 * ```
 *
 * `@/queries/UserById` defines a query that fetches and captures the initial state
 * for a user record. lets say we have a particular editor that provides read-only
 * access to a particular resource for some users and read/write access for
 * others.
 *
 * for the case where the editor should be read/write we can default some props
 * in the vm to change its behavior depending on the permissions of the current
 * user.
 *
 * ```javascript
 * // UserEditor.js
 * import UserById from '@/queries/UserById'
 *
 * export default {
 *   mixins: [
 *     UserById
 *   ],
 *   props: {
 *     userRequestOptionsOverride: {
 *       default () {
 *         return {
 *           capture: this.$session.hasPermissionToEditUsers()
 *         }
 *       }
 *     }
 *   } // ...
 * }
 * ```
 *
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.localPropertyName - the vm data where the result of the query will be stored
 * @param {string} [options.idPropertyName=id] - the name of the prop you will use to specify the id of the requested record
 * @param {object} [options.requestOptions] - control some of the behavior of the query
 * @param {boolean} [options.requestOptions.force=false] - always fetch the latest record
 * @param {boolean} [options.requestOptions.capture=false] - capture the initial state of the record, implies `force = true`
 * @param {object} [options.template={}] - the default template for this query
 * @return {object} item-by-id query mixin
 */
const createMixinForItemById = function (options) {
  const collectionName = options.collectionName
  const localPropertyName = options.localPropertyName || camelCase(collectionName).slice(0, -1)
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
  const capture = pop(requestOptions, 'capture', false)
  const requestOptionsOverrideName = `${localPropertyName}RequestOptionsOverride`

  if (!collectionName) {
    throw new Error('[@citygro/vdata#createMixinForItemById] options.collectionName is required')
  }

  if (!options.idPropertyName) {
    console.warn(
      '[@citygro/vdata#createMixinForItemById]',
      'options.idPropertyName will default to `${localPropertyName}Id` in future versions of vdata' // eslint-disable-line no-template-curly-in-string
    )
  }

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
      if (capture || this[requestOptionsOverrideName].capture) {
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
        if (capture || this[requestOptionsOverrideName].capture) {
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
        const forceOption = requestOptions.force || this[requestOptionsOverrideName].force
        const captureOption = capture || this[requestOptionsOverrideName].capture
        if (forceOption && captureOption) {
          console.warn(
            '[@citygro/vdata#createMixinForItemById]',
            '`requestOptions.capture = true` implies `requestOptions.force = true`, setting both options is not necessary'
          )
        }
        const force = forceOption || captureOption
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
        if (captureOption && !this[captureName]) {
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
        const value = (capture || this[requestOptionsOverrideName].capture)
          ? rebase(
            this[captureName],
            (recordId) ? this.$store.get(collectionName, recordId) : {},
            this[localPropertyName]
          )
          : this[localPropertyName]
        const [err, response] = await to(
          this.$store.save(
            collectionName,
            value,
            this[requestOptionsName]
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

/**
 * @module createMixinForItemById
 */
export default createMixinForItemById
