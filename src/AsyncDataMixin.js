/** !
 * vue-async-data
 *
 * includes modifications which are subject to the terms outlined in LICENSE
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 kamijin-fanta
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import Any from 'p-any'
import flow from 'lodash/fp/flow'
import fromPairs from 'lodash/fp/fromPairs'
import getMergedOptions from './getMergedOptions'
import isFunction from 'lodash/isFunction'
import keys from 'lodash/keys'
import zip from 'lodash/fp/zip'

let optionNames = [
  'Default',
  'Lazy'
]

const isOptionName = (key, names = optionNames) => names.find((n) => key.endsWith(n))

// name args optional
const createAsyncReload = (thisArg) => function (propertyName, skipLazy = false) {
  const asyncData = getMergedOptions(this, 'asyncData')
  if (asyncData) {
    let promises = []
    let names = keys(asyncData)
      .filter((s) => !isOptionName(s))
      .filter((s) => propertyName === undefined || s === propertyName)
      .filter((s) => skipLazy === false || !asyncData[`${s}Lazy`])
    if (propertyName !== undefined && names.length === 0) {
      throw new Error(`asyncData cannot find "${propertyName}`, this)
    }
    names.forEach((prop) => {
      // helpers
      const setError = (err) => {
        this[`${prop}Error`] = err
        if (err) {
          console.error(`[@citygro/vdata<${this._uid}>]`, err)
          this.asyncError = true
        } else {
          this.asyncError = !!names.find((n) => this[`${n}Error`])
        }
      }
      const setLoading = (flag) => {
        this[`${prop}Loading`] = flag
        if (flag) {
          this.asyncLoading = true
        } else {
          this.asyncLoading = !!names.find((n) => this[`${n}Loading`])
        }
      }
      const cancelTimer = () => {
        if (this[`_${prop}Timer`]) {
          clearTimeout(this[`_${prop}Timer`])
        }
      }
      setLoading(true)
      setError(undefined)
      const timeout = asyncData[`${prop}Timeout`] || -1
      if (timeout > 0) {
        clearTimeout(this[`_${prop}Timer`])
        this[`_${prop}Timer`] = setTimeout(() => {
          this._asyncReload.cancel()
        }, timeout)
      }
      if (typeof asyncData[prop] !== 'function') {
        console.error(`asyncData.${prop} must be funtion. actual: ${asyncData[prop]}`, this)
      } else {
        const promise = asyncData[prop]
          .apply(this)
          .then((data) => {
            this[prop] = data
            this[`${prop}Promise`] = promise
            setLoading(false)
            cancelTimer()
            return data
          })
          .catch((err) => {
            setError(err)
            setLoading(false)
            cancelTimer()
          })
        promises.push(promise)
      }
    })
    return Promise.all(promises).then(flow(zip(names), fromPairs))
  } else {
    return Promise.resolve({})
  }
}.bind(thisArg)

export default {
  beforeCreate () {
    this._asyncReload = createAsyncReload(this)
  },
  created () {
    this.$asyncReload(undefined, true)
  },
  methods: {
    $asyncReload (propertyName) {
      if (isFunction(this._asyncReload)) {
        return this._asyncReload
          .apply(this, arguments)
          .then((result) => (propertyName) ? result[propertyName] : result)
      } else {
        console.info(`[@citygro/vdata<${this._uid}>] vm.asyncReload is not available until the component is created!`)
        return Promise.resolve(null)
      }
    }
  },
  data () {
    const asyncData = getMergedOptions(this, 'asyncData')
    if (asyncData) {
      const names = keys(asyncData).filter((s) => !isOptionName(s))
      const errorNames = names.map((s) => `${s}Error`)
      let dataObj = {
        asyncLoading: true,
        asyncError: false,
        asyncAll: Promise.all(names.map((name) => asyncData[name])),
        asyncAny: Any(names.map((name) => asyncData[name]))
      }
      names.forEach((name) => {
        const asyncDefault = asyncData[`${name}Default`]
        dataObj[name] = (isFunction(asyncDefault)) ? asyncDefault.apply(this) : asyncDefault
        dataObj[`${name}Promise`] = null
        dataObj[`${name}Loading`] = !asyncData[`${name}Lazy`]
      })
      errorNames.forEach((name) => {
        dataObj[name] = undefined
      })
      return dataObj
    }
    return {}
  }
}
