import format from './formatMethod'
import isRecord from './isRecord'
import updateRecord from './updateRecord'

/**
 * @param {Vue} vm - Vue instance that needs to be force updated
 */
const forceUpdate = (vm) => {
  vm.$nextTick(() => {
    vm.$forceUpdate()
    vm.$children.forEach((child) => setTimeout(() => child.$forceUpdate(), 0))
  })
}

/**
 * @param {object} value
 * @param {object} diff
 */
export const handleChange = (value, diff) => {
  if (isRecord(value)) {
    return updateRecord(value, diff)
  } else {
    return {...value, ...diff}
  }
}

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
export const handleKeyChange = (value, key, diff) => {
  const updated = handleChange(value[key], diff)
  return handleChange(value, {[key]: updated})
}

/**
 * @param {object} value
 * @param {number} i
 * @param {object} diff
 */
export const handleArrayChange = (value = [], i, diff) => {
  let arr = [...value]
  if (isRecord(arr[i])) {
    arr[i] = updateRecord(arr[i], diff)
  } else if (isRecord(diff)) {
    arr[i] = diff
  } else {
    arr[i] = {...arr[i] || {}, ...diff}
  }
  return arr
}

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 * @param {object} diff
 */
export const handleArrayKeyChange = (value = {}, i, key, diff) => {
  const updated = handleArrayChange(value[key] || [], i, diff)
  return handleChange(value, {[key]: updated})
}

/**
 * @param {array} value
 * @param {object} diff
 */
export const pushToArray = (value = [], diff) => {
  let arr = [...value]
  arr.push(diff)
  return arr
}

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
export const pushToArrayKey = (value = {}, key, diff) => {
  let arr = [...value[key] || []]
  arr.push(diff)
  return handleChange(value, {[key]: arr})
}

/**
 * @param {array} value
 * @param {number} i
 */
export const removeFromArray = (value = [], i) => {
  let arr = [...value]
  arr.splice(i, 1)
  return arr
}

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 */
export const removeFromArrayKey = (value = {}, i, key) => {
  const updated = removeFromArray(value[key], i)
  return handleChange(value, {[key]: updated})
}

/**
 * create a dataflow mixin for a given value prop.
 *
 * a 'value' dataflow implements the `v-model` interface.
 *
 * custom dataflows follow a pattern: methods are prefixed with the `valueProp`
 * name and `update:${valueProp}` is emitted.
 *
 * @param {string} valueProp - bind dataflow to this prop
 */
export const createDataFlowMixin = (valueProp) => {
  const event = (valueProp === 'value') ? 'input' : `update:${valueProp}`
  const prefix = (valueProp === 'value') ? '' : valueProp
  return {
    methods: {
      [format('forwardInput', prefix)] (e) {
        this.$emit(event, e)
      },
      [format('handleChange', prefix)] (diff) {
        this.$emit(event, handleChange(this[valueProp], diff))
        forceUpdate(this)
      },
      [format('handleKeyChange', prefix)] (key, diff) {
        this.$emit(event, handleKeyChange(this[valueProp], key, diff))
        forceUpdate(this)
      },
      [format('handleArrayKeyChange', prefix)] (i, key, diff) {
        this.$emit(event, handleArrayKeyChange(this[valueProp], i, key, diff))
        forceUpdate(this)
      },
      [format('handleArrayChange', prefix)] (i, diff) {
        this.$emit(event, handleArrayChange(this[valueProp], i, diff))
        forceUpdate(this)
      },
      [format('pushToArray', prefix)] (diff) {
        this.$emit(event, pushToArray(this[valueProp], diff))
        forceUpdate(this)
      },
      [format('pushToArrayKey', prefix)] (key, diff) {
        this.$emit(event, pushToArrayKey(this[valueProp], key, diff))
        forceUpdate(this)
      },
      [format('removeFromArray', prefix)] (i) {
        this.$emit(event, removeFromArray(this[valueProp], i))
        forceUpdate(this)
      },
      [format('removeFromArrayKey', prefix)] (i, key) {
        this.$emit(event, removeFromArrayKey(this[valueProp], i, key))
        forceUpdate(this)
      }
    }
  }
}
