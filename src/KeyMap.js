import toString from 'lodash/toString'

export default {
  create () {
    let map = {}
    return {
      get (collectionName, key) {
        key = `${collectionName}-${toString(key)}`
        return map[key]
      },
      link (collectionName, a, b) {
        a = toString(a)
        b = toString(b)
        map[`${collectionName}-${a}`] = b
        map[`${collectionName}-${b}`] = a
      },
      unlink (collectionName, a, b) {
        a = `${collectionName}-${toString(a)}`
        b = `${collectionName}-${toString(b)}`
        delete map[a]
        delete map[b]
      }
    }
  }
}
