import * as DataFlow from './DataFlow'
import format from './formatMethod'

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
const createDataFlowMixin = (valueProp) => {
  const event = (valueProp === 'value') ? 'input' : `update:${valueProp}`
  const prefix = (valueProp === 'value') ? '' : valueProp
  return {
    methods: {
      [format('forwardInput', prefix)] (e) {
        this.$emit(event, e)
      },
      [format('handleChange', prefix)] (diff) {
        this.$emit(event, DataFlow.handleChange({value: this[valueProp], diff}))
      },
      [format('handleKeyChange', prefix)] (key, diff) {
        this.$emit(event, DataFlow.handleKeyChange({value: this[valueProp], key, diff}))
      },
      [format('handleArrayKeyChange', prefix)] (index, key, diff) {
        this.$emit(event, DataFlow.handleArrayKeyChange({value: this[valueProp], index, key, diff}))
      },
      [format('handleArrayChange', prefix)] (index, diff) {
        this.$emit(event, DataFlow.handleArrayChange({value: this[valueProp], index, diff}))
      },
      [format('pushToArray', prefix)] (diff) {
        this.$emit(event, DataFlow.pushToArray({value: this[valueProp], diff}))
      },
      [format('pushToArrayKey', prefix)] (key, diff) {
        this.$emit(event, DataFlow.pushToArrayKey({value: this[valueProp], key, diff}))
      },
      [format('removeFromArray', prefix)] (index) {
        this.$emit(event, DataFlow.removeFromArray({value: this[valueProp], index}))
      },
      [format('removeFromArrayKey', prefix)] (index, key) {
        this.$emit(event, DataFlow.removeFromArrayKey({value: this[valueProp], index, key}))
      }
    }
  }
}

export default createDataFlowMixin
