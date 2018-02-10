/**
 * @param {object[]} collection
 * @param {string} key
 */
export default (collection, key) => {
  let index = {}
  collection.forEach((item) => {
    index[item[key]] = item
  })
  return index
}
