import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'

export default (Vue, options = {}) => {
  const handlers = options.handlers || {}
  const eventEmmitter = options.eventEmmitter
  if (!eventEmmitter && isEmpty(handlers)) {
    return
  } else if (!eventEmmitter) {
    console.error('[@citygro/vdata] missing event source!')
  } else {
    entries(handlers).forEach(([event, handler]) => {
      eventEmmitter.on(event, handler.bind(Vue))
    })
  }
}
