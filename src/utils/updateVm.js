import updateRecord from './updateRecord'

/**
 * update vm
 *
 * @param {Vue} vm
 * @param {string} prop
 * @param {object} diff
 */
export default (vm, prop, diff) => {
  const record = vm[prop]
  const mapper = record._mapper().name
  return updateRecord(vm.$store.createRecord(mapper, record), diff)
}
