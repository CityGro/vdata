import property from 'lodash/fp/property'
import Q from 'q'

/**
 * @param {string} prop - dotted path to prop
 * @param {object} on - the object we are polling
 */
export const waitFor = (prop, on) => {
  return Q.Promise((resolve, reject, notify) => {
    (function poll () {
      const value = property(prop)(on)
      if (value) {
        resolve(value)
      } else {
        notify(value)
        setTimeout(poll, 30)
      }
    }())
  })
}

