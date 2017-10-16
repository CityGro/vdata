/** !
 * vue-async-data
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

import Q from 'q'
import throttle from 'lodash/throttle'

let optionNames = [
  'Default',
  'Lazy',
];

let isOptionName = (key, names = optionNames) => names.find(n => key.endsWith(n))

// name args optional
const createAsyncReload = (thisArg) => throttle(function (propertyName, skipLazy = false) {
  let asyncData = this.$options.asyncData;
  if (asyncData) {
    let names = Object.keys(asyncData)
      .filter((s) => !isOptionName(s))
      .filter((s) => propertyName === undefined || s === propertyName)
      .filter((s) => skipLazy === false || !asyncData[`${s}Lazy`]);
    if (propertyName !== undefined && names.length === 0) {
      console.error(`asyncData.${propertyName} cannot find.`, this);
      return;
    }
    for (let prop of names) {
      // helper
      let setData = (data) => {
        this[prop] = data
        this[`${prop}Promise`] = asyncData[prop].bind(this)
      }
      let setError = (err) => {
        this[`${prop}Error`] = err;
        if (err) {
          this.asyncError = true;
        } else {
          this.asyncError = !!names.find((n) => this[`${n}Error`]);
        }
      }
      let setLoading = (flag) => {
        this[`${prop}Loading`] = flag
          if (flag) {
            this.asyncLoading = true;
          } else {
            this.asyncLoading = !!names.find((n) => this[`${n}Loading`]);
        }
      }
      let setTimer = () => {
        const timeout = asyncData[`${prop}Timeout`] || -1
        if (timeout > 0) {
          cancelTimeout(this[`_${prop}Timer`])
          this[`_${prop}Timer`] = setTimeout(() => {
            this._asyncReload.cancel()
          }, timeout)
        }
      }
      let cancelTimer = () => {
        if (this[`_${prop}Timer`]) {
          cancelTimeout(this[`_${prop}Timer`])
        }
      }
      setLoading(true);
      setError(undefined);
      setTimer();
      if (typeof asyncData[prop] !== 'function') {
        console.error(`asyncData.${prop} must be funtion. actual: ${asyncData[prop]}`, this);
        continue;
      }
      asyncData[prop].apply(this).then((res) => {
        setData(res);
        setLoading(false);
        cancelTimer();
      }).catch((err) => {
        setError(err);
        setLoading(false);
        cancelTimer();
      })
    }
  }
}, 50).bind(thisArg)

export default {
  created () {
    this._asyncReload = createAsyncReload(this)
  },
  mounted () {
    this.asyncReload(undefined, true);
  },
  methods: {
    asyncReload () {
      this._asyncReload.apply(this, arguments)
    }
  },
  data () {
    let asyncData = this.$options.asyncData;
    if (asyncData) {
      let names = Object.keys(asyncData).filter((s) => !isOptionName(s));
      let dataObj = {
        asyncloading: true,
        asyncerror: false,
        asyncall: Q.all(names.map((name) => asyncData[name])),
        asyncany: Q.any(names.map((name) => asyncData[name]))
      }
      names.forEach((name) => {
        dataObj[name] = asyncData[`${name}Default`];
        dataObj[`${name}Promise`] = asyncData[name]
        dataObj[`${name}Loading`] = !asyncData[`${name}Lazy`];
      })
      let errorNames = names.map((s) => `${s}Error`);
      errorNames.forEach((name) => {
        dataObj[name] = undefined;
      });
      return dataObj;
    }
    return {}
  }
}
