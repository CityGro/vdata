import isFunction from 'lodash/isFunction'

export default (o) => {
  // needs more accurate heuristics, but this is a decent (naive) test
  return isFunction(o.hasChanges) && isFunction(o._mapper)
}
