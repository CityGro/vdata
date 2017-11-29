import camelCase from 'lodash/camelCase'
import concat from 'lodash/concat'
import join from 'lodash/join'
import tail from 'lodash/tail'

/**
 * convert snake_case or camelCase strings to CapCase
 *
 * @param {String} s
 */
export default (s) => {
  const camel = camelCase(s)
  const arr = concat([], camel.charAt(0).toUpperCase(), tail(camel))
  return join(arr, '')
}
