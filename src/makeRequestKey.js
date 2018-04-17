import map from 'lodash/map'
import sum from 'lodash/sum'

const makeRequestKey = (url, options) => {
  const headers = Object.entries(options.headers || {}).map(([key, val]) => `${key}:${val}`)
  const values = map(`${headers}${url}`, (c) => c.codePointAt(0))
  return `${options.method}-${sum(values)}`
}

export default makeRequestKey
