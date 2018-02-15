const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

export default {
  create (jsDataRecord) {
    let Record = function (record) {
      Object.assign(this, deepClone({
        // get the data
        ...record.toJSON(),
        // get the pk
        ...{...record}
      }))
    }
    Record.prototype._collection = jsDataRecord._mapper().name
    return new Record(jsDataRecord)
  }
}
