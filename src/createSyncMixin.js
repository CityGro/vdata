import camelCase from 'lodash/camelCase'
import capWords from './utils/capWords'
import isRecord from './utils/isRecord'
import updateVm from './utils/updateVm'

const format = (name, prefix = '') => {
  if (prefix === '') {
    return camelCase(name)
  } else {
    return `${camelCase(prefix)}${capWords(name)}`
  }
}

const forceUpdate = (vm) => {
  vm.$nextTick(() => {
    vm.$forceUpdate()
    vm.$children.forEach((child) => setTimeout(() => child.$forceUpdate(), 0))
  })
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
export default (valueProp) => {
  const event = (valueProp === 'value') ? 'input' : `update:${valueProp}`
  const prefix = (valueProp === 'value') ? '' : valueProp
  return {
    methods: {
      [format('forwardInput', prefix)] (e) {
        if (isRecord(this[valueProp])) {
          throw new TypeError('[@citygro/vdata] cannot forward Record objects')
        } else {
          this.$emit(event, e)
        }
      },
      [format('handleChange', prefix)] (value) {
        if (isRecord(this[valueProp])) {
          const updated = updateVm(this, valueProp, value)
          this.$emit(event, updated)
          forceUpdate(this)
        } else {
          this.$emit(event, {...this[valueProp], ...value})
        }
      },
      [format('handleKeyChange', prefix)] (key, value) {
        this.handleChange({[key]: {...this[valueProp][key], ...value}})
      },
      [format('handleArrayKeyChange', prefix)] (i, key, value) {
        let arr = [...this[valueProp][key] || []]
        arr[i] = {...arr[i], ...value}
        this.handleChange({[key]: arr})
      },
      [format('handleArrayChange', prefix)] (i, value) {
        let arr = [...this[valueProp]]
        arr[i] = {...arr[i], ...value}
        this.$emit(event, arr)
      },
      [format('pushToArray', prefix)] (value) {
        let arr = [...(this[valueProp] || [])]
        arr.push(value)
        this.$emit(event, arr)
      },
      [format('pushToArrayKey', prefix)] (key, value) {
        let arr = [...(this[valueProp][key] || [])]
        arr.push(value)
        this.handleChange({[key]: arr})
      },
      [format('removeFromArray', prefix)] (i) {
        let value = [...this[valueProp]]
        value.splice(i, 1)
        this.$emit(event, value)
      },
      [format('removeFromArrayKey', prefix)] (i, key) {
        let arr = [...this[valueProp][key]]
        arr.splice(i, 1)
        this.handleChange({[key]: arr})
      }
    }
  }
}
