const LCG = (seed) => {
  const lcg = (a) => a * 48271 % 2147483647
  seed = seed ? lcg(seed) : lcg(Math.random())
  return () => {
    seed = lcg(seed)
    return seed / 2147483648
  }
}

/**
 * uniqueId
 *
 * @param {string} [prefix] - optional prefix
 * @return {string}
 */
export default (prefix, ex = 9e15) => {
  const random = LCG()
  const id = parseInt((random() * ex).toFixed(0), 10).toString(36)
  return (prefix) ? `${prefix}-${id}` : id
}
