import includes from 'lodash/includes'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import uniq from 'lodash/uniq'

const isPrimitive = (val) => isNumber(val) || isString(val) || isBoolean(val)

const cleanRecord = ({store, record = {}, omitKeys = []}) => {
  if (isPrimitive(record)) {
    return record
  } else if (isArray(record)) {
    return record.map((item) => cleanRecord({store, record: item, omitKeys}))
  } else {
    let o = {}
    Object.entries(record)
      .filter(([key, value]) => !includes(omitKeys, key) && value)
      .forEach(([key, value]) => {
        if (isArray(value)) {
          o[key] = value.map((item) => cleanRecord({store, record: item, omitKeys}))
        } else if (typeof value === 'object') {
          o[key] = cleanRecord({store, record: value, omitKeys})
        } else {
          o[key] = value
        }
      })
    return o
  }
}

/**
 * @param {object} options
 * @param {vdata.Store} options.store
 * @param {object} options.record
 * @param {string[]} options.omitKeys
 * @param {string} options.collectionName
 */
export default (options) => {
  const record = options.record
  const store = options.store
  const omitKeys = uniq([...options.omitKeys || [], '_id'])
  const cleanedRecord = cleanRecord({store, record, omitKeys})
  return store.createRecord(record._collection || options.collectionName, cleanedRecord)
}
