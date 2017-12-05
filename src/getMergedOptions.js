import assign from 'lodash/assign'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

/**
 * @param {Vue} vm - vue instance
 * @param {string} prop - option name
 */
export default (vm, prop) => {
  let options = get(vm, `$options.${prop}`, {})
  get(vm, '$options.mixins', []).filter((mixin) => mixin[prop]).forEach((mixin) => {
    options = assign(options, mixin[prop])
  })
  return (isEmpty(options))
    ? null
    : options
}
