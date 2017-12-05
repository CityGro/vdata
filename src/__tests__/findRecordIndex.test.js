/* global describe, it, expect */

import findRecordIndex from '../findRecordIndex'

describe('utils/findRecordIndex', () => {
  it('should find records by _id and __tmp_id', () => {
    const collection = [
      {_id: 1},
      {__tmp_id: 2}
    ]
    return Promise.all([
      expect(findRecordIndex(collection, 1)).toEqual(0),
      expect(findRecordIndex(collection, 2)).toEqual(1),
      expect(findRecordIndex(collection, undefined)).toEqual(null)
    ])
  })
})
