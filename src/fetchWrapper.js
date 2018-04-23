/* global fetch */
import 'whatwg-fetch'
import cloneDeep from 'lodash/cloneDeep'
import defaults from 'lodash/defaultsDeep'
import fork from '@r14c/async-utils/fork'
import isFunction from 'lodash/isFunction'
import pick from 'lodash/pick'

const withDefaults = (options) => pick(defaults({}, options, {
  credentials: 'same-origin'
}), ['headers', 'body', 'method', 'credentials', 'signal'])

let interceptors = []
let onError

let fetchWrapper = (url, options) => {
  return fork(cloneDeep(options), interceptors).then((request) => {
    return fetch(url, withDefaults(request))
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response
        } else if (isFunction(onError)) {
          onError(response, request)
        } else {
          throw new Error(response.statusText, {response, request})
        }
      })
  })
}

fetchWrapper.addInterceptor = (fn) => {
  interceptors.push(fn)
}

fetchWrapper.onError = (fn) => {
  onError = fn
}

export default fetchWrapper
