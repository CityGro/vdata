import defaults from 'lodash/defaultsDeep'
import fetchWrapper from './fetchWrapper'
import includes from 'lodash/includes'
import makeRequestKey from './makeRequestKey'
import microTask from '@r14c/async-utils/microTask'
import omitNil from './omitNil'
import pick from 'lodash/pick'
import stringify from 'json-stable-stringify'
import toQueryString from './toQueryString'

const normalizeHeaders = (options) => {
  let headers = {...options.headers}
  if (includes(['PUT', 'POST'], options.method)) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

const getUrl = (options) => {
  let url = options.url
  const params = omitNil(options.params || {})
  const qs = toQueryString(params)
  if (qs) {
    url += `?${qs}`
  }
  return url
}

const withDefaults = (options) => pick(defaults({}, options, {
  credentials: 'same-origin'
}), ['headers', 'body', 'method', 'credentials', 'signal'])

const createHttpAdapter = (options = {}) => {
  let promiseCache = {}
  const adapter = options.adapter || fetchWrapper
  const deserialize = options.deserialize || ((response, data) => data)
  const cacheTimeout = 1000 * 10 // evict promise cache keys after 10s
  const createRequest = (url, request) => {
    return adapter(url, request)
      .then((response) => {
        return response.json()
          .then((data) => microTask(() => deserialize(response, data)))
      })
  }
  return (options = {}) => {
    let promise
    const force = options.force || false
    const url = getUrl(options)
    options.headers = normalizeHeaders(options)
    options.body = (options.body) ? stringify(options.body) : undefined
    const request = withDefaults(options)
    if (options.method === 'GET') {
      const key = makeRequestKey(url, request)
      promise = promiseCache[key]
      if (!promise || force === true) {
        promise = promiseCache[key] = createRequest(url, request)
      }
      setTimeout(() => {
        delete promiseCache[key]
      }, cacheTimeout)
    } else {
      promise = createRequest(url, request)
    }
    return promise
  }
}

export default createHttpAdapter
