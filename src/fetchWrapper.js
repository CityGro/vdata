/* global fetch */
import 'whatwg-fetch'
import cloneDeep from 'lodash/cloneDeep'
import fork from '@r14c/async-utils/fork'
import isFunction from 'lodash/isFunction'

const capitalize = (s) => `${s[0].toUpperCase()}${s.slice(1)}`

let interceptors = []
let onError

let fetchWrapper = (url, options) => {
  return fork(
    cloneDeep(options),
    [
      ...interceptors,
      /**
       * normalize headers
       */
      (options) => {
        let headers = {}
        Object.entries(options.headers).forEach(([header, value]) => {
          header = header.split('-').map(capitalize).join('-')
          headers[header] = value
        })
        return Promise.resolve({...options, headers})
      }
    ]
  ).then((request) => {
    return fetch(url, request).catch((err) => {
      if (isFunction(onError)) {
        onError(err)
      } else {
        throw err
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
