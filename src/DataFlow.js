import format from './formatMethod'

/**
 * @param {object} value
 * @param {object} diff
 */
export const handleChange = ({value, diff}) => {
  return {...value, ...diff}
}

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
export const handleKeyChange = ({value, key, diff}) => {
  const updated = handleChange({value: value[key], diff})
  return handleChange({value, diff: {[key]: updated}})
}

/**
 * @param {object} value
 * @param {number} i
 * @param {object} diff
 */
export const handleArrayChange = ({value = [], index, diff}) => {
  let arr = [...value]
  arr[index] = {...arr[index] || {}, ...diff}
  return arr
}

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 * @param {object} diff
 */
export const handleArrayKeyChange = ({value = {}, index, key, diff}) => {
  const updated = handleArrayChange({value: value[key] || [], index, diff})
  return handleChange({value, diff: {[key]: updated}})
}

/**
 * @param {array} value
 * @param {object} diff
 */
export const pushToArray = ({value = [], diff}) => {
  let arr = [...value]
  arr.push(diff)
  return arr
}

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
export const pushToArrayKey = ({value = {}, key, diff}) => {
  let arr = [...value[key] || []]
  arr.push(diff)
  return handleChange({value, diff: {[key]: arr}})
}

/**
 * @param {array} value
 * @param {number} i
 */
export const removeFromArray = ({value = [], index}) => {
  let arr = [...value]
  arr.splice(index, 1)
  return arr
}

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 */
export const removeFromArrayKey = ({value = {}, index, key}) => {
  const updated = removeFromArray({value: value[key], index})
  return handleChange({value, diff: {[key]: updated}})
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
        this.$emit(event, handleChange({value: this[valueProp], diff}))
      },
      [format('handleKeyChange', prefix)] (key, diff) {
        this.$emit(event, handleKeyChange({value: this[valueProp], key, diff}))
      },
      [format('handleArrayKeyChange', prefix)] (index, key, diff) {
        this.$emit(event, handleArrayKeyChange({value: this[valueProp], index, key, diff}))
      },
      [format('handleArrayChange', prefix)] (index, diff) {
        this.$emit(event, handleArrayChange({value: this[valueProp], index, diff}))
      },
      [format('pushToArray', prefix)] (diff) {
        this.$emit(event, pushToArray({value: this[valueProp], diff}))
      },
      [format('pushToArrayKey', prefix)] (key, diff) {
        this.$emit(event, pushToArrayKey({value: this[valueProp], key, diff}))
      },
      [format('removeFromArray', prefix)] (index) {
        this.$emit(event, removeFromArray({value: this[valueProp], index}))
      },
      [format('removeFromArrayKey', prefix)] (index, key) {
        this.$emit(event, removeFromArrayKey({value: this[valueProp], index, key}))
      }
    }
  }
}
