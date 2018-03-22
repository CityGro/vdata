import Record from './Record'
import fastDiff from './fastDiff'
import isArray from 'lodash/isArray'
import registerAdapters from './registerAdapters'
import registerSchemas from './registerSchemas'
import {DataStore} from 'js-data'

export default {
  /**
   * @param {object} options
   * @param {object} options.models
   * @param {object} options.adapters
   */
  create (options) {
    let store = new DataStore()
    /**
     * @param {DataStore} store
     * @constructor
     */
    let Store = function (store, options) {
      registerSchemas(store, options.models)
      registerAdapters(store, options.adapters)
      this.models = options.models
    }
    /**
     * @param {string} id
     */
    Store.prototype.isValidId = function (id) {
      return id !== null && id !== undefined && id !== ''
    }
    /**
     * @param {string} collection
     * @param {string} id
     * @param {object} data
     */
    Store.prototype.hasChanges = function (collection, id, data) {
      if (this.isValidId(id)) {
        const record = this.get(collection, id)
        return fastDiff(record, data)
      } else {
        return true
      }
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.commit = function (collection, data, options) {
      const record = store.createRecord(collection, data)
      return record.commit(options)
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
    Store.prototype.destroy = function (collection, data, options) {
      const record = store.createRecord(collection, data)
      return record.destroy(options)
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.revert = function (collection, data, options) {
      const record = store.createRecord(collection, data)
      return record.revert(options)
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
    Store.prototype.save = function (collection, data, options) {
      const idAttribute = this.models[collection].idAttribute
      if (this.isValidId(data[idAttribute])) {
        const record = store.createRecord(collection, data)
        return record
          .save(options)
          .then(Record.create)
          .catch((err) => {
            throw err
          })
      } else {
        return store.create(collection, data, options)
          .then(Record.create)
          .catch((err) => {
            throw err
          })
      }
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.add = function (collection, data, options) {
      store.add(collection, data, options)
    }
    /**
     * @param {string} collection
     * @param {string} id
     * @param {object} options
     */
    Store.prototype.remove = function (collection, id, options) {
      store.remove(collection, id, options)
    }
    /**
     * @param {string} collection
     * @param {object} query
     * @param {object} options
     */
    Store.prototype.removeAll = function (collection, query, options) {
      store.removeAll(collection, query, options)
    }
    /**
     * @param {string} collection
     * @param {object} data
     * @deprecated
     * @async
     */
    Store.prototype.create = function (collection, data, options) {
      return store.create(collection, data, options).then(Record.create)
    }
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
    Store.prototype.find = function (collection, id, options = {}) {
      if (this.isValidId(id)) {
        return store.find(collection, id, options)
          .then((result) => (result === undefined || options.raw === true)
            ? result
            : Record.create(result))
      } else {
        return Promise.resolve()
      }
    }
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
    Store.prototype.findAll = function (collection, query, options = {}) {
      const result = store.findAll(collection, query, options)
      return (options.raw === true)
        ? result
        : result.then((records) => records.map(Record.create))
    }
    /**
     * @param {string} collection
     * @param {object} data
     */
    Store.prototype.createRecord = function (collection, data) {
      const record = store.createRecord(collection, data)
      return Record.create(record)
    }
    /**
     * @param {string} collection
     * @param {string} id
     */
    Store.prototype.get = function (collection, id) {
      const record = store.get(collection, id)
      if (record) {
        return Record.create(record)
      }
    }
    /**
     * @param {string} collection
     * @param {string[]} [keys]
     */
    Store.prototype.getAll = function (collection, keys) {
      if (isArray(keys)) {
        return (keys.length)
          ? keys.map((key) => this.get(collection, key))
          : []
      } else {
        return store.getAll(collection).map(Record.create)
      }
    }
    /**
     *
     */
    Store.prototype.clear = function () {
      store.clear()
    }
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.on = function (event, handler) {
      store.on(event, handler)
    }
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.off = function (event, handler) {
      store.off(event, handler)
    }
    return new Store(store, options)
  }
}
