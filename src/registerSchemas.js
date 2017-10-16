import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

export default function ($store, modelMap = {}) {
  if (isEmpty(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!')
  }
  entries(modelMap).forEach(([modelName, schema]) => {
    let model = {...schema}
    if (!get(model, 'options.idAttribute')) {
      model.options = {...(model.options || {}), idAttribute: '_id'}
    }
    $store.defineMapper(model.name || modelName, model.options)
  })
}
