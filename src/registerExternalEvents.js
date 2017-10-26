import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'

export default (Vue, options = {}) => {
  const handlers = options.handlers || {}
  const eventEmitter = options.emitter
  if (!eventEmitter && isEmpty(handlers)) {
    return
  } else if (!eventEmitter) {
    console.error('[@citygro/vdata] missing event source!')
  } else {
    entries(handlers).forEach(([event, handler]) => {
      eventEmitter.on(event, handler.bind(Vue))
    })
  }
}
