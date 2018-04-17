import defaults from 'lodash/defaults'
import fetchWrapper from './fetchWrapper'
import microTask from '@r14c/async-utils/microTask'
import pick from 'lodash/pick'
import stringify from 'json-stable-stringify'
import toQueryString from './toQueryString'
import makeRequestKey from './makeRequestKey'

const withDefaults = (options) => pick(defaults({}, options, {
  credentials: 'same-origin'
}), ['headers', 'body', 'method', 'credentials'])

const createHttpAdapter = (options = {}) => {
  let promiseCache = {}
  const adapter = options.adapter || fetchWrapper
  const deserialize = options.deserialize || ((response, data) => data)
  const createRequest = (url, options) => {
    const request = withDefaults(options)
    return adapter(url, {...request, body: (request.body) ? stringify(request.body) : undefined})
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => microTask(() => deserialize(res, data)))
        } else {
          throw new Error(res.statusText, res)
        }
      })
  }
  return (options = {}) => {
    let promise
    let url = options.url
    const force = options.force || false
    const qs = toQueryString(options.params || {})
    if (qs) {
      url += `?${qs}`
    }
    if (options.method === 'GET') {
      const key = makeRequestKey(url, options)
      promise = promiseCache[key]
      if (!promise || force === true) {
        promise = promiseCache[key] = createRequest(url, options)
      }
    } else {
      promise = createRequest(url, options)
    }
    return promise
  }
}

export default createHttpAdapter
