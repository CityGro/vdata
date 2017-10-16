import entries from 'lodash/entries'

export default function($store, adapters) {
  const adaptersMap = entries(adapters)
  adaptersMap.forEach(([key, adapterDef]) => {
    if (adaptersMap.length === 1) {
      $store.registerAdapter(key, adapterDef.instance, adapterDef.options || {default: true})
    } else {
      $store.registerAdapter(key, adapterDef.instance, adapterDef.options || {})
      }
  })
}
