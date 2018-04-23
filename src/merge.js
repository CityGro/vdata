import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'
import tail from 'lodash/tail'

export default function () {
  const object = arguments[0]
  const sources = tail(arguments)
  return mergeWith(object, ...sources, (objValue, srcValue, key, object, source) => {
    if (isArray(objValue)) {
      return srcValue
    }
  })
}
