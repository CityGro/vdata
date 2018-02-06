/**
 * @param {Object[]} mixins
 */
const flattenMixinTree = (mixins = []) => {
  let arr = []
  mixins.forEach((mixin) => {
    if (mixin.mixins && mixin.mixins.length) {
      arr = [...arr, ...flattenMixinTree(mixin.mixins)]
    }
    arr.push(mixin)
  })
  return arr
}

export default flattenMixinTree
