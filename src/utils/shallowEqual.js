// credit: @gaearon
// borrowed from https://github.com/rackt/react-redux/blob/master/src%2Futils%2FshallowEqual.js
// with some modifications.

export default function shallowEqual(objA, objB) {
  // objA and objB is the same type
  if (typeof objA === 'object') {
    if (objA === objB) {
      return true
    }

    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) {
      return false
    }

    // Test for A's keys different from B.
    const hasOwn = Object.prototype.hasOwnProperty
    for (let i = 0; i < keysA.length; i++) {
      if (!hasOwn.call(objB, keysA[i]) ||
          objA[keysA[i]] !== objB[keysA[i]]) {
        return false
      }
    }

    return true
  } else {
    return objA === objB
  }
}
