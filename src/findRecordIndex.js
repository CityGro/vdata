import findIndex from 'lodash/findIndex'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import get from 'lodash/get'

/**
 * find the index of a record id in a collection
 *
 * @param {Array} collection
 * @param {String|Number|Object} id
 */
export default (collection, q) => {
  const id = (isNumber(q) || isString(q)) ? q : (get(q, '_id') || get(q, '__tmp_id'))
  if (id) {
    const i = findIndex(collection, (record) => {
      if (record._id === undefined && record.__tmp_id === undefined) {
        return false
      } else if (record._id === id) {
        return true
      } else if (record.__tmp_id === id) {
        return true
      } else if (record._id === undefined || record.__tmp_id === undefined) {
        return false
      } else {
        return false
      }
    })
    return (i > -1) ? i : null
  } else {
    return null
  }
}
