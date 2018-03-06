import Record from './Record'
import createIndex from './createIndex'
import createMixinForItemByResourceAndId from './createMixinForItemByResourceAndId.js'
import createMixinForListByResource from './createMixinForListByResource'
import to from '@r14c/async-utils/to'
import vdata from './vdata'
import {createDataFlowMixin} from './DataFlow'

const DataFlowMixin = createDataFlowMixin('value')

export * from './DataFlow'

export {
  DataFlowMixin,
  Record,
  createIndex,
  createMixinForItemByResourceAndId,
  createMixinForListByResource,
  to,
  vdata
}
