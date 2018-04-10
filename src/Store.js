import EventEmitter from 'events'
import mget from './mget'
import cloneDeep from 'lodash/cloneDeep'
import fastDiff from './fastDiff'
import createHttpAdapter from './createHttpAdapter'
import isArray from 'lodash/isArray'
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
   * @param {function} [options.adapter] - a custom fetch
   * @param {function} [options.deserialize] - request post-processing
   */
  create (options) {
    const evt = new EventEmitter()
    const http = createHttpAdapter(options)
    const models = cloneDeep(options.models)
    const storeId = uniqueId(null, 1e5)
    let keyMap = {}
    let store = registerSchemas(Map(), options.models)
    /**
     * @param {string} id
     */
    const resolveId = (id) => {
      const isTmp = /^[0-9a-z]+-[0-9a-z]+$/i.test(id)
      return (isTmp) ? id : keyMap[id]
    }
    /**
     * @param {string} id
     */
    const resolvePk = (id) => {
      const isTmp = /^[0-9a-z]+-[0-9a-z]+$/i.test(id)
      return (isTmp) ? keyMap[id] : id
    }
    /**
     * @param {string} collectionName
     * @param {object} data
     */
    const getMeta = (collectionName, data) => {
      const model = models[collectionName]
      const idAttribute = model.idAttribute
      const pk = mget(data, idAttribute)
      const id = mget(data, '__tmp_id')
      const symId = mget(data, '__sym_id')
      keyMap[pk] = id
      keyMap[id] = pk
      return {
        id,
        pk,
        symId,
        basePath: model.basePath || '',
        idAttribute
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
        microTask(() => evt.emit(message.event, message))
      }
    }
    /**
     * @constructor
     */
    let Store = function () {
      this.models = cloneDeep(options.models)
      this.storeId = storeId
    }
    /**
     * @param {string} collection
     * @param {object} [data={}]
     */
    Store.prototype.createRecord = function (collectionName, data = {}) {
      const {id} = getMeta(collectionName, data)
      return (isValidId(id))
        ? data
        : {__tmp_id: uniqueId(storeId), ...data}
    }
    /**
     * @param {string} collection
     * @param {string} id
     */
    Store.prototype.get = function (collectionName, id) {
      const versions = store.getIn([collectionName, resolveId(id)], Stack())
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
    Store.prototype.remove = function (collectionName, id, options = {}) {
      const object = this.get(collectionName, id)
      const meta = getMeta(collectionName, object)
      store = store.removeIn([collectionName, resolveId(id)])
      delete keyMap[meta.pk]
      delete keyMap[meta.id]
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
        const id = getMeta(collectionName, record)
        this.remove(collectionName, id)
      })
    }
    /**
     *
     */
    Store.prototype.clear = function () {
      store.keySeq().forEach((collectionName) => {
        this.removeAll(collectionName)
      })
    }
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
     */
    Store.prototype.add = function (collectionName, data, options = {}) {
      const record = this.createRecord(collectionName, data)
      const based = convert(this.rebase(collectionName, record))
      const {id} = getMeta(collectionName, based)
      const versions = store.getIn([collectionName, id], Stack())
      store = store.setIn([collectionName, id], versions.unshift(based))
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
     */
    Store.prototype.hasChanges = function (collectionName, data) {
      const {id} = getMeta(collectionName, data)
      if (this.isValidId(id)) {
        const record = this.get(collectionName, id)
        return (record.__sym_id === data.__sym_id)
          ? fastDiff(record, data)
          : false
      } else {
        return true
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
        .then(() => this.remove(collectionName, id))
        .catch((err) => {
          throw err
        })
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
    Store.prototype.save = function (collectionName, data, options = {}) {
      const {pk, basePath} = getMeta(collectionName, data)
      let promise
      if (isValidId(pk)) {
        promise = http({
          url: `${basePath}/${collectionName}/${pk}`,
          method: 'PUT',
          body: this.rebase(collectionName, data),
          ...options
        })
      } else {
        promise = http({
          url: `${basePath}/${collectionName}`,
          method: 'POST',
          body: data,
          ...options
        })
      }
      return promise
        .then((data) => this.add(collectionName, data))
        .catch((err) => {
          throw err
        })
    }
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @param {boolean} [options.force=false]
     * @async
     */
    Store.prototype.find = function (collectionName, id, options = {}) {
      const force = options.force || false
      const basePath = models[collectionName].basePath || ''
      const pk = resolvePk(id)
      let promise
      if (isValidId(pk)) {
        const data = this.get(collectionName, id)
        if (!data || force === true) {
          const request = {
            url: `${basePath}/${collectionName}/${pk}`,
            method: 'GET',
            ...options
          }
          promise = http(request)
            .then((data) => {
              this.add(collectionName, data)
              return data
            })
            .catch((err) => {
              throw err
            })
        } else {
          promise = Promise.resolve(data)
        }
      } else {
        promise = Promise.resolve()
      }
      return promise
    }
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
    Store.prototype.findAll = function (collectionName, query, options = {}) {
      const basePath = models[collectionName].basePath || ''
      const request = {
        url: `${basePath}/${collectionName}`,
        method: 'GET',
        params: query,
        ...options
      }
      return http(request)
        .then((result) => result.map((data) => this.add(collectionName, data)))
        .catch((err) => {
          throw err
        })
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
      evt.emit(event, payload)
    }
    Store.prototype.isValidId = isValidId
    return new Store()
  }
}
