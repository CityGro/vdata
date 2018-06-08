let stores = {}

const register = (store) => {
  stores[store.storeId] = store
  return store
}

const getStoreById = (storeId) => {
  return stores[storeId] || null
}

export {
  register,
  getStoreById
}
