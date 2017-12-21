import assign from 'lodash/assign'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

/**
 * @param {Object[]} mixins
 */
const flattenMixinTree = (mixins) => {
  let map = []
  mixins.forEach((mixin) => {
    if (mixin.mixins && mixin.mixins.length) {
      map = [...map, ...flattenMixinTree(mixin.mixins)]
    }
    map.push(mixin)
  })
  return map
}

/**
 * @param {Vue} vm - vue instance
 * @param {string} prop - option name
 */
export default (vm, prop) => {
  let options = get(vm, `$options.${prop}`, {})
  const mixins = get(vm, '$options.mixins', [])
  flattenMixinTree(mixins).filter((mixin) => mixin[prop]).forEach((mixin) => {
    options = assign(options, mixin[prop])
  })
  return (isEmpty(options))
    ? null
    : options
}
