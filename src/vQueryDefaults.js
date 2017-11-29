import defaults from 'lodash/defaults'
import isFunction from 'lodash/isFunction'

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
export default (vm, options) => {
  if (options === true) {
    return defaultOpts
  } else if (isFunction(options)) {
    return defaults(options.call(vm), defaultOpts)
  } else {
    return defaults({}, options, defaultOpts)
  }
}
