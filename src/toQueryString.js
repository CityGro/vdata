import entries from 'lodash/entries'
import sort from 'lodash/sortBy'

/**
 * @param {object} o
 * @param {string} prefix
 */
const toQueryString = (o, prefix) => {
  return sort(entries(o), (e) => e[0]).map(([prop, value]) => {
    const key = (prefix) ? `${prefix}[${prop}]` : prop
    return (typeof value === 'object')
      ? toQueryString(value, key)
      : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }).join('&')
}

export default toQueryString
