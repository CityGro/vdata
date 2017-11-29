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
 * @param {object} record
 * @param {object} diff
 */
export default (record, diff) => {
  if (isFunction(record._mapper)) {
    return applyDiff(record, diff)
  } else {
    throw new TypeError('utils/updateRecord can only operate over a js-data/Record object')
  }
}
