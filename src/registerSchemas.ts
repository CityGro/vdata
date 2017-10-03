import entries from 'lodash-es/entries'

export default function($store, modelMap) {
    entries(modelMap).forEach(([modelName, model]) => {
        if (!options.idAttribute) {
            options.idAttribute = '_id'
        }
        $store.defineMapper(model.name || modelName, options)
    })
}
