import checksum from './checksum'

const makeQueryKey = (collectionName, query = {}, options = {}) => {
  return `${collectionName}-${checksum(query, options)}`
}

export default makeQueryKey
