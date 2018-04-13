/* global fetch */
import 'whatwg-fetch'
import cloneDeep from 'lodash/cloneDeep'
import isFunction from 'lodash/isFunction'

let interceptors = []

let fetchWrapper = (url, options) => {
  let request = cloneDeep(options)
  interceptors.forEach((fn) => {
    request = fn(request)
  })
  return fetch(url, request).catch((err) => {
    if (isFunction(fetchWrapper.onError)) {
      fetchWrapper.onError(err)
    } else {
      throw err
    }
  })
}

fetchWrapper.addInterceptor = (fn) => {
  interceptors.push(fn)
}

export default fetchWrapper
