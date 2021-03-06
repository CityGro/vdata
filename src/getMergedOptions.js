import cloneDeep from 'lodash/cloneDeep'
import flattenMixinTree from './flattenMixinTree'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

/**
 * @param {Vue} vm - vue instance
 * @param {string} prop - option name
 */
export default (vm, prop) => {
  let options = cloneDeep(get(vm, `$options.${prop}`, {}))
  const mixins = get(vm, '$options.mixins', [])
  flattenMixinTree(mixins)
    .filter((mixin) => mixin[prop])
    .forEach((mixin) => {
      options = Object.assign(options, mixin[prop])
    })
  return (isEmpty(options))
    ? null
    : options
}
