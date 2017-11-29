import isFunction from 'lodash/isFunction'

/**
 * needs more accurate heuristics, but this is a decent (naive) test
 *
 * @param {object} o - suspected Record
 */
export default (o = {}) => {
  return isFunction(o.hasChanges) && isFunction(o._mapper)
}
