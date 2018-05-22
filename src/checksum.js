import map from 'lodash/map'
import stringify from 'json-stable-stringify'
import sum from 'lodash/sum'

const checksum = function () {
  const s = map(arguments, stringify)
  const values = map(stringify(s), (c, i) => c.codePointAt(0) * i)
  return `${sum(values)}`
}

export default checksum
