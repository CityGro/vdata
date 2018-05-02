import map from 'lodash/map'
import stringify from 'json-stable-stringify'
import sum from 'lodash/sum'

const makeQueryKey = (collectionName, query = {}, options = {}) => {
  const values = map(stringify(query) + stringify(options), (c) => c.codePointAt(0))
  return `${collectionName}-${sum(values)}`
}

export default makeQueryKey
