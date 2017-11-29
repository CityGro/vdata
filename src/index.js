import AsyncDataMixin from './AsyncDataMixin'
import to from './to'
import updateRecord from './updateRecord'
import vdata from './vdata'
import {createSyncMixin} from './dataFlow'

const DataFlowMixin = createSyncMixin('value')

export {
  AsyncDataMixin,
  DataFlowMixin,
  createSyncMixin,
  to,
  updateRecord,
  vdata
}
