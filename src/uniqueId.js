/**
 * uniqueId
 *
 * @param {string} [prefix] - optional prefix
 * @return {string}
 */
export default (prefix, ex = 9e15) => {
  const id = parseInt((Math.random() * ex).toFixed(0), 10).toString(36)
  return (prefix) ? `${prefix}-${id}` : id
}
