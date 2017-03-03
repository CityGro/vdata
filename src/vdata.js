import each from 'lodash/fp/each'
import isEqual from 'lodash/isEqual'
import flow from 'lodash/fp/flow'
import entries from 'lodash/fp/entries'
import map from 'lodash/fp/map'
import fromPairs from 'lodash/fp/fromPairs'
import keys from 'lodash/fp/keys'
import throttle from 'lodash/throttle'
import isObject from 'lodash/isObject'

import Q from 'q'
import validate from 'validate.js'

const forceUpdate = each((child) => setTimeout(() => {
  child.$forceUpdate()
  forceUpdate(child.$children)
}, 0))

const changeEvents = ['add', 'change', 'remove']

export default function (store) {
  return {
    install (Vue, options) {
      Vue.prototype.$store = store
      Vue.mixin({
      })
    }
  }
}
