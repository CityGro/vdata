import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import transform from 'lodash/transform'

/**
 * @param {object} base
 * @param {object} object
 * @return {object} diff
 */
export default function difference (base, object) {
  function changes (object, base) {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key]))
          ? changes(value, base[key])
          : value
      }
    })
  }
  return (isNil(base))
    ? object
    : changes(object, base)
}
