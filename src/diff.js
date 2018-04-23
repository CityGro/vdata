import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import merge from './merge'
import transform from 'lodash/transform'

/**
 * replace all values in an object with `null`. used to generate the ORSet for
 * diffing operations.
 *
 * @param {Object} object
 * @return {Object}
 */
const nullify = (object) => transform(object, (result, value, key) => {
  result[key] = (isObject(value) && !isArray(value))
    ? nullify(value)
    : null
})

/**
 * @param {object} base
 * @param {object} object
 * @return {object}
 */
const difference = (base, object) => {
  const changes = (object, base) => {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key]) && !isArray(value))
          ? changes(value, base[key])
          : value
      }
    })
  }
  return (isNil(base))
    ? object
    : changes(object, base)
}

const observedRemoveDiff = (base, object) => {
  const diff = difference(base, object)
  const inverseDiff = difference(object, base)
  const nullDiff = nullify(inverseDiff)
  const orDiff = merge({}, nullDiff, diff)
  return orDiff
}

export default observedRemoveDiff
