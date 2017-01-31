import property from 'lodash/fp/property'
import Q from 'q'

/**
 * @param {string} prop - dotted path to prop
 * @param {object} on - the object we are polling
 */
export const waitFor = (prop, o) => {
  return Q.Promise((resolve, reject, notify) => {
    (function poll () {
      if (o) {
        const value = property(prop)(o)
        if (value) {
          resolve(value)
        } else {
          notify(value)
          setTimeout(poll, 30)
        }
      } else {
        reject(new Error(`target object is '${o}'`))
      }
    }())
  })
}

