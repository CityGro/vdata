import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'

export default function ($store, modelMap = {}) {
  if (isEmpty(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!')
  }
  entries(modelMap).forEach(([modelName, schema]) => $store.defineMapper(modelName, schema))
}
