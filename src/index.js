import createIndex from './createIndex'
import createMixinForItemById from './createMixinForItemById.js'
import createMixinForListByResource from './createMixinForListByResource'
import fetchWrapper from './fetchWrapper'
import to from './to'
import vdata from './vdata'
import {createDataFlowMixin} from './DataFlow'

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
  createIndex,
  createMixinForItemById,
  createMixinForItemByResourceAndId,
  createMixinForListByResource,
  fetchWrapper,
  to,
  vdata
}
