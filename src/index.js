import updateRecord from './utils/updateRecord'
import vdata from './vdata'
import {createSyncMixin} from './dataFlow'

const DataFlowMixin = createSyncMixin('value')

export {
  DataFlowMixin,
  createSyncMixin,
  updateRecord,
  vdata
}
