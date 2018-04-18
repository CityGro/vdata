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

export default {
  /**
   * @param {object} options
   * @param {object} options.models
   * @param {string} [options.basePath=''] - default prefix for http requests
   * @param {function} [options.adapter] - a custom fetch
   * @param {function} [options.deserialize] - request post-processing
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
     */
    const resolveId = (collectionName, id) => {
      const isTmp = idRegex.test(id)
      return (isTmp) ? id : keyMap.get(collectionName, id)
    }
    /**
     * @param {string} id
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
     * @param {string} message
     * @param {object} options
     * @param {boolean} options.quiet
     */
    const emit = (message, options = {}) => {
      const quiet = options.quiet || false
      if (quiet === false) {
        evt.emit('all', message)
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
     * @param {string} collection
     * @param {string} id
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
     * @param {string} collection
     * @param {string[]} [keys]
     */
    Store.prototype.getAll = function (collectionName, keys) {
      if (isArray(keys)) {
        return (keys.length)
          ? keys.map((key) => this.get(collectionName, key))
          : []
      } else {
        return store
          .get(collectionName)
          .keySeq()
          .map((key) => this.get(collectionName, key))
          .toJS()
      }
    }
    /**
     * @param {string} collectionName
     * @param {string} id
     * @param {object} options
     * @param {boolean} options.quiet
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
     * @param {string} collection
     * @param {string[]} keys
     */
    Store.prototype.removeAll = function (collectionName, keys) {
      this.getAll(collectionName, keys).forEach((record) => {
        const {id} = getMeta(collectionName, record)
        this.remove(collectionName, id)
      })
    }
    /**
     * remove all records from all collections
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
     * @param {string} collection
     * @param {object} data
     * @param {object} options
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
     * @async
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
     * @async
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.save = function (collectionName, data, options = {}) {
      const {id, pk, basePath} = getMeta(collectionName, data)
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
          ...options
        })
      }
      return promise.then((data) => {
        const object = (id) ? {...data, __tmp_id: id} : data
        return microTask(() => this.add(collectionName, object))
      })
    }
    /**
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
              const record = this.add(collectionName, data)
              const {id} = getMeta(collectionName, record)
              resultKeys.push(id)
              return record
            })
            queryCache[key] = resultKeys
            setTimeout(() => {
              delete queryCache[key]
            }, this.queryCacheTimeout)
            return records
          }))
      } else {
        promise = Promise.resolve(data)
      }
      return promise
    }
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.on = function (event, handler) {
      evt.addListener(event, handler)
    }
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.off = function (event, handler) {
      evt.removeListener(event, handler)
    }
    Store.prototype.emit = function (event, payload) {
      microTask(() => evt.emit(event, payload))
    }
    Store.prototype.isValidId = isValidId
    Store.prototype.getBasePath = getBasePath
    return new Store()
  }
}
