import createIndex from './createIndex'
import createMixinForItemByResourceAndId from './createMixinForItemByResourceAndId.js'
import createMixinForListByResource from './createMixinForListByResource'
import to from './to'
import vdata from './vdata'
import {createDataFlowMixin} from './DataFlow'
import Record from './Record'

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
