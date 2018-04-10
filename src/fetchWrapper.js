/* global fetch */
import 'whatwg-fetch'
import cloneDeep from 'lodash/cloneDeep'

let interceptors = []

let fetchWrapper = (url, options) => {
  let request = cloneDeep(options)
  interceptors.forEach((fn) => {
    request = fn(request)
  })
  return fetch(url, request)
}

fetchWrapper.addInterceptor = (fn) => {
  interceptors.push(fn)
}

export default fetchWrapper
