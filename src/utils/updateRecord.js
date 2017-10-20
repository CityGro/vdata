import each from 'lodash/fp/each'
import entries from 'lodash/fp/entries'
import flow from 'lodash/fp/flow'
import isFunction from 'lodash/isFunction'

const applyDiff = (record, diff) => {
  const set = flow(entries, each(([key, value]) => {
    record[key] = value
  }))
  set(diff)
  return record
}

/**
 * update record
 *
 * @param {Vue} vm
 * @param {string} prop
 * @param {object} diff
 */
export default (vm, prop, diff) => {
  const record = vm[prop]
  if (isFunction(record._mapper)) {
    const recordName = record._mapper().name
    return applyDiff(vm.$store.createRecord(recordName, record), diff)
  } else {
    throw new TypeError('utils/updateRecord can only operate over a js-data/Record object')
  }
}
