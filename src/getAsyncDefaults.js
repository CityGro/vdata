import defaults from 'lodash/defaults'

const defaultOpts = {
  lazy: false,
  sync: true,
  id: false,
  force: false
}

/**
 * `options === true` creates a configuration with the following options:
 *
 * ```
 * {
 *  lazy: false,
 *  sync: true,
 *  id: false,
 *  force: false
 * }
 * ```
 *
 * which is also used as the defaults object if options is an object
 *
 * @param {object|boolean} options
 @ @returns object
 */
export default (options) => (options === true) ? defaultOpts : defaults({}, options, defaultOpts)
