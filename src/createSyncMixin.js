import camelCase from 'lodash/camelCase'
import capWords from './capWords'
import each from 'lodash/fp/each'
import entries from 'lodash/fp/entries'
import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import isRecord from './isRecord'

const applyKV = (record, values) => {
  const set = flow(entries, each(([key, value]) => {
    record[key] = value
  }))
  set(values)
  return record
}

const format = (name, prefix = '') => {
  if (prefix === '') {
    return camelCase(name)
  } else {
    return `${camelCase(prefix)}${capWords(name)}`
  }
}

/**
 * create a dataflow mixin for a given value prop.
 *
 * a 'value' dataflow implements the `v-model` interface.
 *
 * custom dataflows follow a pattern: methods are prefixed with the `valueProp`
 * name and `update:${valueProp}` is emitted.
 *
 * TODO syntax sugar <https://github.com/vuejs/vue/issues/4946>
 * TODO ensure that all of these methods correctly trigger change tracking in js-data
 *
 * @param {string} valueProp - bind dataflow to this prop
 */
export default (valueProp) => {
  const event = (valueProp === 'value') ? 'input' : `update:${valueProp}`
  const prefix = (valueProp === 'value') ? '' : valueProp
  return {
    methods: {
      [format('forwardInput', prefix)] (e) {
        this.$emit(event, e)
      },
      [format('handleChange', prefix)] (value) {
        if (isRecord(this[valueProp])) {
          const record = this.$store.createRecord('flow_pages', this[valueProp])
          this.$emit(event, applyKV(record, value))
        } else {
          this.$emit(event, {...this[valueProp], ...value})
        }
      },
      [format('handleKeyChange', prefix)] (key, value) {
        this.handleChange({[key]: {...this[valueProp][key], ...value}})
      },
      [format('handleArrayKeyChange', prefix)] (i, key, value) {
        let arr = [...this[valueProp][key]]
        arr[i] = {...arr[i], ...value}
        this.handleChange({[key]: arr})
      },
      [format('handleArrayChange', prefix)] (i, value) {
        let arr = [...this[valueProp]]
        arr[i] = {...arr[i], ...value}
        this.$emit(event, arr)
      },
      [format('pushToArray', prefix)] (value) {
        let arr = [...this[valueProp]]
        arr.push(value)
        this.$emit(event, arr)
      },
      [format('pushToArrayKey', prefix)] (key, value) {
        let arr = [...this[valueProp][key]]
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
