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
