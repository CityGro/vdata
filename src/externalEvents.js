import capitalize from 'lodash/capitalize'
import entries from 'lodash/entries'
import isEmpty from 'lodash/isEmpty'

const format = (event) => `on${capitalize(event)}`

const formatArgs = (event) => `${format(event)}Args`

const registerEvents = (thisArg, events = {}) => {
  if (isEmpty(events)) {
    return
  }
  entries(events).forEach(([event, config]) => {
    const fn = thisArg.$options[format(event)]
    const args = thisArg.$options[formatArgs(event)]
    if (!fn) {
      console.errlr('[@citygro/vdata] no setup method!', thisArg.$options)
      return
    }
    config.created.call(thisArg, fn.bind(thisArg), args, config.options)
  })
}

const unbindEvents = (thisArg, events = {}) => {
  if (isEmpty(events)) {
    return
  }
  entries(events).forEach(([event, config]) => {
    const fn = thisArg.$options[format(event)].bind(thisArg)
    const args = thisArg.$options[formatArgs(event)]
    if (!fn) {
      console.errlr('[@citygro/vdata] no destroy method!', thisArg.$options)
      return
    }
    config.beforeDestroy.call(thisArg, fn, args, config.options)
  })
}

export {
  registerEvents,
  unbindEvents
}
