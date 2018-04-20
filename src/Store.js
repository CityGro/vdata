import EventEmitter from 'events'
import KeyMap from './KeyMap'
import cloneDeep from 'lodash/cloneDeep'
import createHttpAdapter from './createHttpAdapter'
import fastDiff from './fastDiff'
import isArray from 'lodash/isArray'
import makeQueryKey from './makeQueryKey'
import mget from './mget'
import microTask from '@r14c/async-utils/microTask'
import rebase from './rebase'
import registerSchemas from './registerSchemas'
import toNumber from 'lodash/toNumber'
import uniqueId from './uniqueId'
import {
  Map,
  Stack,
  fromJS,
  isImmutable,
  isKeyed
} from 'immutable'

/**
 * @param {object} data
 * @private
 */
const convert = (data) => fromJS(data, (key, value) => {
  return isKeyed(value)
    ? value.toMap()
    : value.toList()
})

/**
 * @param {*} id
 */
const isValidId = (id) => {
  return id !== null && id !== undefined && id !== ''
}

/**
 * vdata store constructor
 */
const Store = {
  /**
   * @param {object} options
   * @param {object} options.models
   * @param {string} [options.basePath=''] - default prefix for http requests
   * @param {function} [options.adapter] - a custom fetch
   * @param {function} [options.deserialize] - request post-processing
   * @return {Store} a vdata store instance
   */
  create (options) {
    const evt = new EventEmitter()
    const http = createHttpAdapter(options)
    const models = cloneDeep(options.models)
    const storeId = uniqueId(null, 1e5)
    const idRegex = /^[0-9a-z]+?-[0-9a-z]+$/i
    const keyMap = KeyMap.create()
    let queryCache = {}
    let store = registerSchemas(Map(), options.models)
    /**
     * @param {string} id
     * @private
     */
    const resolveId = (collectionName, id) => {
      const isTmp = idRegex.test(id)
      return (isTmp) ? id : keyMap.get(collectionName, id)
    }
    /**
     * @param {string} id
     * @private
     */
    const resolvePk = (collectionName, id) => {
      const isTmp = idRegex.test(id)
      return (isTmp) ? keyMap.get(collectionName, id) : id
    }
    /**
     * @param {string} collectionName
     */
    const getBasePath = (collectionName) => {
      const model = models[collectionName]
      return model.basePath || options.basePath || ''
    }
    /**
     * @param {string} collectionName
     * @param {object} data
     * @private
     */
    const getMeta = (collectionName, data) => {
      const model = models[collectionName]
      const idAttribute = model.idAttribute
      return {
        basePath: getBasePath(collectionName),
        id: mget(data, '__tmp_id'),
        idAttribute,
        pk: mget(data, idAttribute),
        symId: mget(data, '__sym_id')
      }
    }
    /**
     * queue a micro-task to broadcast the given message object
     *
     * @param {string} message
     * @param {object} options
     * @param {boolean} [options.quiet=false]
     * @private
     */
    const emit = (message, options = {}) => {
      const quiet = options.quiet || false
      if (quiet === false) {
        microTask(() => evt.emit('all', message))
      }
    }
    /**
     * @constructor
     */
    let Store = function () {
      evt.setMaxListeners(0) // no limit
      this.models = options.models
      this.storeId = storeId
      this.queryCacheTimeout = options.queryCacheTimeout || 1000 * 60 * 5 // evict query cache after 5min
    }
    /**
     * tag a javascript object with metadata that allows it to be tracked by the vdata store.
     * `__tmp_id` and the `idAttribute` configured for the given collection are both used to
     * identify the object. editing either of these will cause vdata to see the resulting
     * object as something new that needs to be tracked separately from the original object.
     *
     * @param {string} collection
     * @param {object} [data={}]
     */
    Store.prototype.createRecord = function (collectionName, data = {}) {
      const model = models[collectionName]
      const idAttribute = model.idAttribute
      let pk = mget(data, idAttribute)
      let id = mget(data, '__tmp_id')
      if (pk && !id) {
        id = keyMap.get(collectionName, pk) || uniqueId(storeId) // get or gen id
        keyMap.link(collectionName, pk, id) // 2x link
      } else if (!pk && id) {
        // noop
      } else if (pk && id) {
        keyMap.link(collectionName, pk, id) // 2x link
      } else if (!pk && !id) {
        id = uniqueId(storeId) // gen id
      }
      return {...data, __tmp_id: id}
    }
    /**
     * get a particular object from the store using the primary key provided by
     * your api server, or the temporary local id that vdata uses internally to
     * track records.
     *
     * @param {string} collectionName
     * @param {string} pkOrId
     */
    Store.prototype.get = function (collectionName, pkOrId) {
      const id = resolveId(collectionName, pkOrId)
      const versions = store.getIn([collectionName, id], Stack())
      const record = versions.first()
      if (record) {
        const size = versions.size
        const index = 0
        return this.createRecord(collectionName, {
          ...record.toJS(),
          __sym_id: `${index}-${size}`
        })
      } else {
        return null
      }
    }
    /**
     * get all of the records in `collectionName`. if you include a `keys`
     * parameter, this method returns all of the records that match the ids
     * listed.
     *
     * @param {string} collectionName
     * @param {string[]} [keys]
     * @return {object[]}
     */
    Store.prototype.getList = function (collectionName, keys) {
      let result
      if (isArray(keys)) {
        result = (keys.length)
          ? keys.map((key) => this.get(collectionName, key))
          : []
      } else {
        result = store
          .get(collectionName)
          .keySeq()
          .map((key) => this.get(collectionName, key))
          .toJS()
      }
      return result
    }
    /**
     * @ignore
     */
    Store.prototype.getAll = function () {
      return this.getList.apply(this, arguments)
    }
    /**
     * remove a record from the store, identified by public key or temporary id.
     *
     * @emits Store#remove
     * @param {string} collectionName
     * @param {string} pkOrId
     * @param {object} options
     * @param {boolean} options.quiet
     * @return {object}
     */
    Store.prototype.remove = function (collectionName, pkOrId, options = {}) {
      const id = resolveId(collectionName, pkOrId)
      const object = this.get(collectionName, id)
      const meta = getMeta(collectionName, object)
      store = store.removeIn([collectionName, id])
      keyMap.unlink(collectionName, meta.pk, meta.id)
      delete object.__tmp_id
      delete object.__sym_id
      emit({
        collectionName,
        event: 'remove',
        record: object
      }, {
        quiet: options.quiet
      })
      return object
    }
    /**
     * remove all of the records in `collectionName` or all of the records that match the ids passed into `keys`.
     *
     * @emits Store#remove-list
     * @param {string} collectionName
     * @param {string[]} keys
     * @return {object[]}
     */
    Store.prototype.removeList = function (collectionName, keys, options = {}) {
      const records = this.getAll(collectionName, keys).map((record) => {
        const {id} = getMeta(collectionName, record)
        return this.remove(collectionName, id, {quiet: true})
      })
      emit({
        collectionName,
        event: 'remove-list',
        records
      }, {
        quiet: options.quiet
      })
      return records
    }
    /**
     * @ignore
     */
    Store.prototype.removeAll = function () {
      return this.removeList.apply(this, arguments)
    }
    /**
     * remove all records from all collections
     * @emits Store#remove-list
     */
    Store.prototype.clear = function () {
      store.keySeq().forEach((collectionName) => {
        this.removeAll(collectionName)
      })
    }
    /**
     * given `data` with a particular `__sym_id` and the current version of the
     * same record at `data[idAttribute]`, return a merged record containing all
     * changes, applied to the base record at `__sym_id` in the following order,
     * diff'd against `base`:
     *
     * 1. current
     * 2. data
     *
     * @param {string} collection
     * @param {object} data
     * @return {object}
     */
    Store.prototype.rebase = function (collectionName, data) {
      const record = (isImmutable(data)) ? data.toJS() : data
      const {id} = getMeta(collectionName, record)
      let base = null
      if (record.__sym_id) {
        const [index, size] = record.__sym_id.split('-').map(toNumber)
        const offset = (index - size)
        const versions = store.getIn([collectionName, id])
        if (versions) {
          base = versions.get(offset).toJS()
        }
      }
      const current = this.get(collectionName, id)
      return (base || current)
        ? rebase(base, current, record)
        : record
    }
    /**
     * add a record to the store. you *do not* need to pass your data to
     * `Store.createRecord` before adding it.
     *
     * vdata automatically tracks all of the versions that are created for every
     * record that it tracks. this version tracking is how `store.rebase` is able
     * to implement a simple `ORSet` that enables vdata to deterministically merge
     * all of the changes to a particular record.
     *
     * @emits Store#add
     * @see {Store.rebase}
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @param {boolean} [options.quiet=false] silence store events for this invocation
     * @return {object}
     */
    Store.prototype.add = function (collectionName, data, options = {}) {
      const record = this.createRecord(collectionName, data)
      const latest = convert(record)
      const {id} = getMeta(collectionName, latest)
      const versions = store.getIn([collectionName, id], Stack())
      store = store.setIn([collectionName, id], versions.unshift(latest))
      const object = this.get(collectionName, id)
      emit({
        collectionName,
        event: 'add',
        record: object
      }, {
        quiet: options.quiet
      })
      return object
    }
    /**
     * add all of the records in `data` to `colectionName` in a single operation.
     *
     * @emits Store#add-list
     * @param {string} collectionName
     * @param {object[]} data
     * @return {object[]}
     */
    Store.prototype.addList = function (collectionName, data, options = {}) {
      const records = data.map((item) => this.add(collectionName, item, {quiet: true}))
      emit({
        collectionName,
        event: 'add-list',
        records
      }, {
        quiet: options.quiet
      })
      return records
    }
    /**
     * check if `data` differs from the current version of the corresponding
     * record in the store.
     *
     * @param {string} collectionName
     * @param {object} data
     * @return {boolean}
     */
    Store.prototype.hasChanges = function (collectionName, data) {
      if (!data) {
        return false
      } else {
        const {id} = getMeta(collectionName, data)
        const record = this.get(collectionName, id) || {}
        return (record.__sym_id === data.__sym_id)
          ? fastDiff(record, data)
          : false
      }
    }
    /**
     * send a `DELETE` request to the endpoint configured for `collectionName`
     * and remove the corresponding record from the store.
     *
     * @async
     * @emits Store#remove
     * @param {string} collectionName
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.destroy = function (collectionName, data, options = {}) {
      const {id, pk, basePath} = getMeta(collectionName, data)
      return http({
        url: `${basePath}/${collectionName}/${pk}`,
        method: 'DELETE',
        ...options
      })
        .then(() => microTask(() => this.remove(collectionName, id)))
    }
    /**
     * persist `data` using the endpoint configured for `collectonName`. if
     * `data` is *only* identified by a local temporary id send a `POST` request to
     * `/:basePath/:collectionName`. if `data` has a primary key send a `PUT`
     * request to `/:basePath/:collectionName/:primaryKey`
     *
     * @async
     * @emits Store#add
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.save = function (collectionName, data, options = {}) {
      const {id, pk, basePath} = getMeta(collectionName, data)
      const headers = {
        'Content-Type': 'application/json'
      }
      let promise
      if (isValidId(pk)) {
        promise = http({
          url: `${basePath}/${collectionName}/${pk}`,
          method: 'PUT',
          body: {
            ...this.rebase(collectionName, data),
            __tmp_id: undefined,
            __sym_id: undefined
          },
          headers,
          ...options
        })
      } else {
        promise = http({
          url: `${basePath}/${collectionName}`,
          method: 'POST',
          body: {
            ...data,
            __tmp_id: undefined,
            __sym_id: undefined
          },
          headers,
          ...options
        })
      }
      return promise.then((data) => {
        const object = (id) ? {...data, __tmp_id: id} : data
        return microTask(() => this.add(collectionName, object))
      })
    }
    /**
     * fetch a particular record from `/:basePath/:collectionName/:primaryKey`.
     * if `force === false` immediately return the cached record if present.
     *
     * @async
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @param {boolean} [options.force=false]
     */
    Store.prototype.find = function (collectionName, id, options = {}) {
      let promise
      const force = options.force || false
      const data = this.get(collectionName, id)
      if (!isValidId(id)) {
        promise = Promise.resolve(null)
      } else if (!data || force === true) {
        const pk = resolvePk(collectionName, id)
        const basePath = getBasePath(collectionName)
        const request = {
          url: `${basePath}/${collectionName}/${pk}`,
          method: 'GET',
          ...options
        }
        promise = http(request)
          .then((data) => microTask(() => this.add(collectionName, data)))
      } else {
        promise = Promise.resolve(data)
      }
      return promise
    }
    /**
     * fetch all of the records from the api that match the parameters specified
     * in `query`. these are sent along with the request as query parameters.
     * if `force === false` immediately return a cached response if one exists.
     *
     * @async
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     */
    Store.prototype.findAll = function (collectionName, query, options = {}) {
      let promise
      const force = options.force || false
      const basePath = getBasePath(collectionName)
      const key = makeQueryKey(collectionName, query)
      const cachedKeys = queryCache[key]
      const data = this.getAll(collectionName, cachedKeys)
      if (!data.length || force === true) {
        const request = {
          url: `${basePath}/${collectionName}`,
          method: 'GET',
          params: query,
          ...options
        }
        promise = http(request)
          .then((result) => microTask(() => {
            let resultKeys = []
            const records = result.map((data) => {
              const record = this.createRecord(collectionName, data)
              const {id} = getMeta(collectionName, record)
              resultKeys.push(id)
              return record
            })
            queryCache[key] = resultKeys
            setTimeout(() => {
              delete queryCache[key]
            }, this.queryCacheTimeout)
            return this.addList(collectionName, records)
          }))
      } else {
        promise = Promise.resolve(data)
      }
      return promise
    }
    /**
     * bind an event listener to the store
     *
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.on = function (event, handler) {
      evt.addListener(event, handler)
    }
    /**
     * unbind an event listener to the store
     *
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.off = function (event, handler) {
      evt.removeListener(event, handler)
    }
    /**
     * manually emit a message using the store's event bus
     *
     * @param {string} event
     * @param {*} payload
     */
    Store.prototype.emit = function (event, payload) {
      microTask(() => evt.emit(event, payload))
    }
    Store.prototype.isValidId = isValidId
    Store.prototype.getBasePath = getBasePath
    return new Store()
  }
}

/**
 * @module Store
 */
export default Store
