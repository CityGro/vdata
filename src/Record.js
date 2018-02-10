export default {
  create (jsDataRecord) {
    let Record = function (record) {
      Object.assign(this, {
        // get the data
        ...record.toJSON(),
        // get the pk
        ...{...record}
      })
    }
    Record.prototype._collection = jsDataRecord._mapper().name
    return new Record(jsDataRecord)
  }
}
