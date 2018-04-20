/* global fetch */
import 'whatwg-fetch'
import cloneDeep from 'lodash/cloneDeep'
import fork from '@r14c/async-utils/fork'
import isFunction from 'lodash/isFunction'

let interceptors = []
let onError

let fetchWrapper = (url, options) => {
  return fork(cloneDeep(options), interceptors).then((request) => {
    return fetch(url, request)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response
        } else if (isFunction(onError)) {
          onError(response)
        } else {
          throw new Error(response.statusText, response)
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
