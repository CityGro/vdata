import isEmpty from 'lodash/isEmpty'
import {Map} from 'immutable'

export default function (store, modelMap = {}) {
  if (isEmpty(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!')
  }
  Object.keys(modelMap).forEach((modelName) => {
    store = store.set(modelName, Map())
  })
  return store
}
