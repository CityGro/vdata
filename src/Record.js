import jsonClone from './jsonClone'

export default {
  create (jsDataRecord) {
    let Record = function (record) {
      Object.assign(this, jsonClone({
        // get the data
        ...record.toJSON(),
        // get the pk
        ...{...record}
      }))
    }
    return new Record(jsDataRecord)
  }
}
