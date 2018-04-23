import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'
import tail from 'lodash/tail'

const merge = function () {
  const object = arguments[0]
  const sources = tail(arguments)
  return mergeWith(object, ...sources, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue
    }
  })
}

export default merge
