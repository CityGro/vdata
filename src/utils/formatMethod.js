import camelCase from 'lodash/camelCase'
import capWords from './capWords'

export default (name, prefix = '') => {
  if (prefix === '') {
    return camelCase(name)
  } else {
    return `${camelCase(prefix)}${capWords(name)}`
  }
}
