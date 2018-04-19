// @flow

import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import isArray from 'lodash/isArray'
import isNil from 'lodash/fp/isNil'
import omitBy from 'lodash/fp/omitBy'

const filterArray = flow(filter((v) => !isNil(v)))
const filterObject = flow(omitBy(isNil))

/**
 * removes nil values from arrays and nil `{key: value}` pairs from objects
 *
 * @function
 * @param {Object|Array} value - the source object
 * @return {Object|Array}
 */
export default (value) => (isArray(value))
  ? filterArray(value)
  : filterObject(value)
