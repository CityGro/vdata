import camelCase from 'lodash/camelCase'
import tail from 'lodash/tail'

/**
 * convert snake_case or camelCase strings to CapCase
 *
 * @param {String} s
 */
export default (s) => {
  const camel = camelCase(s)
  return [camel.charAt(0).toUpperCase()].contact(tail(camel)).join('')
}
