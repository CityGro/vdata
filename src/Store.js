import Record from './Record'
import registerAdapters from './registerAdapters'
import registerSchemas from './registerSchemas'
import stringify from 'json-stable-stringify'
import updateRecord from './updateRecord'
import {DataStore} from 'js-data'

const toPlainObject = (o) => JSON.parse(JSON.stringify(o))

export default {
  create (options) {
    let store = new DataStore()
    /**
     *
     */
    let Store = function (store) {
      registerSchemas(store, options.models)
      registerAdapters(store, options.adapters)
    }
    /**
     *
     */
    Store.prototype.hasChanges = function (collection, id, data) {
      if (id) {
        const record = this.get(collection, id)
        const a = stringify(record)
        const b = stringify(data)
        return a !== b
      } else {
        return true
      }
    }
    /**
     *
     */
    Store.prototype.commit = function (collection, data, opts) {
      const record = store.createRecord(collection, data)
      return record.commit(opts)
    }
    /**
     *
     */
    Store.prototype.destroy = function (collection, data, opts) {
      const record = store.createRecord(collection, data)
      return record.destroy(opts)
    }
    /**
     *
     */
    Store.prototype.revert = function (collection, data, opts) {
      const record = store.createRecord(collection, data)
      return record.revert(opts)
    }
    /**
     *
     */
    Store.prototype.save = function (collection, data, opts) {
      const record = store.createRecord(collection, data)
      return updateRecord(record, toPlainObject(record))
        .save(opts)
        .then(Record.create)
    }
    /**
     *
     */
    Store.prototype.add = function (collection, data, opts) {
      store.add(collection, data, opts)
    }
    /**
     *
     */
    Store.prototype.create = function (collection, object) {
      return store.create(collection, object)
        .then(Record.create)
    }
    /**
     *
     */
    Store.prototype.find = function (collection, queryOptions, options = {}) {
      const result = store.find(collection, queryOptions, options)
      return (options.raw === true)
        ? result
        : result.then(Record.create)
    }
    /**
     *
     */
    Store.prototype.findAll = function (collection, queryOptions, options = {}) {
      const result = store.findAll(collection, queryOptions, options)
      return (options.raw === true)
        ? result
        : result.then((records) => records.map(Record.create))
    }
    /**
     *
     */
    Store.prototype.createRecord = function (collection, object) {
      const record = store.createRecord(collection, object)
      return Record.create(record)
    }
    /**
     *
     */
    Store.prototype.get = function (collection, id) {
      const record = store.get(collection, id)
      if (record) {
        return Record.create(record)
      }
    }
    /**
     *
     */
    Store.prototype.getAll = function (collection, keys) {
      return (keys)
        ? keys.map((key) => this.get(collection, key))
        : store.getAll(collection)
    }
    /**
     *
     */
    Store.prototype.clear = function () {
      store.clear()
    }
    /**
     *
     */
    Store.prototype.on = function (event, handler) {
      store.on(event, handler)
    }
    /**
     *
     */
    Store.prototype.off = function (event, handler) {
      store.off(event, handler)
    }
    return new Store(store)
  }
}
