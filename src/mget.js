import {isImmutable} from 'immutable'
import get from 'lodash/get'

export default (value, path) => {
  if (isImmutable(value)) {
    return value.getIn(path.split('.'))
  } else {
    return get(value, path)
  }
}
