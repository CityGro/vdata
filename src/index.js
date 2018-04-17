import cleanRecord from './cleanRecord'
import createDataFlowMixin from './createDataFlowMixin'
import createHttpAdapter from './createHttpAdapter'
import createIndex from './createIndex'
import createMixinForItemById from './createMixinForItemById.js'
import createMixinForListByResource from './createMixinForListByResource'
import fetchWrapper from './fetchWrapper'
import asyncMap from '@r14c/async-utils/map'
import to from '@r14c/async-utils/to'
import vdata from './vdata'

const DataFlowMixin = createDataFlowMixin('value')

const createMixinForItemByResourceAndId = (options) => {
  console.warn(
    '[@citygro/vdata] rename createMixinForItemByResourceAndId -> createMixinForItemById',
    '"createMixinForItemByResourceAndId" is DEPRECATED and will be removed in a future release'
  )
  return createMixinForItemById(options)
}

export * from './DataFlow'

export {
  DataFlowMixin,
  asyncMap,
  cleanRecord,
  createDataFlowMixin,
  createHttpAdapter,
  createIndex,
  createMixinForItemById,
  createMixinForItemByResourceAndId,
  createMixinForListByResource,
  fetchWrapper,
  to,
  vdata
}
