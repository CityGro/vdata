import stringify from 'json-stable-stringify'

/**
 * quickly determine if two objects differ
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Boolean}
 */
export default (a, b) => stringify(a) !== stringify(b)
