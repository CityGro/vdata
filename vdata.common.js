'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Any = _interopDefault(require('p-any'));
var debounce = _interopDefault(require('lodash/debounce'));
var isFunction = _interopDefault(require('lodash/isFunction'));
var keys = _interopDefault(require('lodash/keys'));
var each = _interopDefault(require('lodash/fp/each'));
var entries = _interopDefault(require('lodash/fp/entries'));
var flow = _interopDefault(require('lodash/fp/flow'));
var defaults = _interopDefault(require('lodash/defaults'));
var get = _interopDefault(require('lodash/get'));
var includes = _interopDefault(require('lodash/includes'));
var entries$1 = _interopDefault(require('lodash/entries'));
var isEmpty = _interopDefault(require('lodash/isEmpty'));
var jsData = require('js-data');
var camelCase = _interopDefault(require('lodash/camelCase'));
var concat = _interopDefault(require('lodash/concat'));
var join = _interopDefault(require('lodash/join'));
var tail = _interopDefault(require('lodash/tail'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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

var optionNames = ['Default', 'Lazy'];

var isOptionName = function isOptionName(key) {
  var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : optionNames;
  return names.find(function (n) {
    return key.endsWith(n);
  });
};

// name args optional
var createAsyncReload = function createAsyncReload(thisArg) {
  return debounce(function (propertyName) {
    var _this = this;

    var skipLazy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var asyncData = this.$options.asyncData;
    if (asyncData) {
      var _ret = function () {
        var names = keys(asyncData).filter(function (s) {
          return !isOptionName(s);
        }).filter(function (s) {
          return propertyName === undefined || s === propertyName;
        }).filter(function (s) {
          return skipLazy === false || !asyncData[s + 'Lazy'];
        });
        if (propertyName !== undefined && names.length === 0) {
          console.error('asyncData.' + propertyName + ' cannot find.', _this);
          return {
            v: void 0
          };
        }

        var _loop = function _loop(prop) {
          // helper
          var setData = function setData(data) {
            _this[prop] = data;
            _this[prop + 'Promise'] = asyncData[prop].bind(_this);
          };
          var setError = function setError(err) {
            _this[prop + 'Error'] = err;
            if (err) {
              console.error('[@citygro/vdata<' + _this._uid + '>]', err);
              _this.asyncError = true;
            } else {
              _this.asyncError = !!names.find(function (n) {
                return _this[n + 'Error'];
              });
            }
          };
          var setLoading = function setLoading(flag) {
            _this[prop + 'Loading'] = flag;
            if (flag) {
              _this.asyncLoading = true;
            } else {
              _this.asyncLoading = !!names.find(function (n) {
                return _this[n + 'Loading'];
              });
            }
          };
          var setTimer = function setTimer() {
            var timeout = asyncData[prop + 'Timeout'] || -1;
            if (timeout > 0) {
              clearTimeout(_this['_' + prop + 'Timer']);
              _this['_' + prop + 'Timer'] = setTimeout(function () {
                _this._asyncReload.cancel();
              }, timeout);
            }
          };
          var cancelTimer = function cancelTimer() {
            if (_this['_' + prop + 'Timer']) {
              clearTimeout(_this['_' + prop + 'Timer']);
            }
          };
          setLoading(true);
          setError(undefined);
          setTimer();
          if (typeof asyncData[prop] !== 'function') {
            console.error('asyncData.' + prop + ' must be funtion. actual: ' + asyncData[prop], _this);
            return 'continue';
          }
          asyncData[prop].apply(_this).then(function (res) {
            setData(res);
            setLoading(false);
            cancelTimer();
          }).catch(function (err) {
            setError(err);
            setLoading(false);
            cancelTimer();
          });
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            var _ret2 = _loop(prop);

            if (_ret2 === 'continue') continue;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }, 50).bind(thisArg);
};

var AsyncDataMixin = {
  created: function created() {
    this._asyncReload = createAsyncReload(this);
    this.asyncReload(undefined, true);
  },

  methods: {
    asyncReload: function asyncReload() {
      this._asyncReload.apply(this, arguments);
    }
  },
  data: function data() {
    var asyncData = this.$options.asyncData;
    if (asyncData) {
      var names = keys(asyncData).filter(function (s) {
        return !isOptionName(s);
      });
      var errorNames = names.map(function (s) {
        return s + 'Error';
      });
      var dataObj = {
        asyncLoading: true,
        asyncError: false,
        asyncAll: Promise.all(names.map(function (name) {
          return asyncData[name];
        })),
        asyncAny: Any(names.map(function (name) {
          return asyncData[name];
        }))
      };
      names.forEach(function (name) {
        var asyncDefault = asyncData[name + 'Default'];
        dataObj[name] = isFunction(asyncDefault) ? asyncDefault() : asyncDefault;
        dataObj[name + 'Promise'] = asyncData[name];
        dataObj[name + 'Loading'] = !asyncData[name + 'Lazy'];
      });
      errorNames.forEach(function (name) {
        dataObj[name] = undefined;
      });
      return dataObj;
    }
    return {};
  }
};

/**
 * @param {Promise} promise
 * @return {Promise}
 */
var to = (function (promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err, undefined];
  });
});

var applyDiff = function applyDiff(record, diff) {
  var set$$1 = flow(entries, each(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    record[key] = value;
  }));
  set$$1(diff);
  return record;
};

/**
 * update record
 *
 * @param {object} record
 * @param {object} diff
 */
var updateRecord = (function (record, diff) {
  if (isFunction(record._mapper)) {
    return applyDiff(record, diff);
  } else {
    throw new TypeError('utils/updateRecord can only operate over a js-data/Record object');
  }
});

/**
 * inject handler that will run on datastore events
 *
 * DANGER: mutates thisArg
 *
 * @param {Vue} thisArg
 * @param {string} label
 * @param {JSData.DataStore} store
 * @param {string[]} events
 * @param {function} fn
 */
var injectHandler = (function (vm, label, store, events, fn) {
  vm['_' + label + 'Handler'] = debounce(function () {
    var event = arguments[1];
    if (includes(events, event)) {
      if (process.env.NODE_ENV !== 'test') {
        console.log('[@citygro/vdata<' + vm._uid + '>] running for ' + event);
      }
      fn.apply(vm, [].concat(Array.prototype.slice.call(arguments)));
    }
  }, 25, { leading: true });
  if (process.env.NODE_ENV !== 'test') {
    console.log('[@citygro/vdata#' + label + '<' + vm._uid + '>] ready. listening on', events);
  }
});

/**
 * creates an asyncData object using a vdata config object
 *
 * @param {Vue} thisArg
 * @param {JSData.DataStore} store
 * @param {array[]} q
 */
var injectAsyncData = (function (vm, store, q) {
  var asyncData = isEmpty(vm.$options.asyncData) ? {} : vm.$options.asyncData;
  q.forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        prop = _ref2[0],
        options = _ref2[1];

    var model = options.model || prop;
    asyncData[prop + 'Lazy'] = options.lazy;
    asyncData[prop + 'Default'] = isFunction(options.default) ? options.default.call(vm) : options.default;
    asyncData[prop] = options.id ? function () {
      return store.find(model, options.id, { force: options.force });
    } : function () {
      return store.findAll(model, { force: options.force });
    };
  });
  vm.$options.asyncData = asyncData;
});

var defaultOpts = {
  lazy: false,
  sync: true,
  id: false,
  force: false
};

/**
 * `options === true` creates a configuration with the following options:
 *
 * ```
 * {
 *  lazy: false,
 *  sync: true,
 *  id: false,
 *  force: false
 * }
 * ```
 *
 * which is also used as the defaults object if options is an object
 *
 * @param {object|boolean} options
 @ @returns object
 */
var vQueryDefaults = (function (vm, options) {
  if (options === true) {
    return defaultOpts;
  } else if (isFunction(options)) {
    return defaults(options.call(vm), defaultOpts);
  } else {
    return defaults({}, options, defaultOpts);
  }
});

/**
 * @param {object} vm
 * @param {object} store
 * @param {string[]} events
 * @param {object} vQuery
 */
var processVQuery = (function (vm, store, events, vQuery) {
  var q = entries$1(vQuery).map(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        prop = _ref2[0],
        opts = _ref2[1];

    return [prop, vQueryDefaults(vm, opts)];
  });
  injectAsyncData(vm, store, q);
  injectHandler(vm, 'vQuery', events, function () {
    q.forEach(function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          prop = _ref4[0],
          options = _ref4[1];

      var model = options.model || prop;
      if (options.sync === true) {
        vm[prop] = options.id ? store.get(model, options.id) : store.getAll(model);
      }
    });
  });
});

var registerAdapters = function ($store, adapters) {
  var adaptersMap = entries$1(adapters);
  adaptersMap.forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        adapterDef = _ref2[1];

    if (adaptersMap.length === 1) {
      $store.registerAdapter(key, adapterDef.adapter, adapterDef.options || { default: true });
    } else {
      $store.registerAdapter(key, adapterDef.adapter, adapterDef.options || {});
    }
  });
};

var registerExternalEvents = (function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var handlers = options.handlers || {};
  var eventEmitter = options.emitter;
  if (!eventEmitter && isEmpty(handlers)) {
    return;
  }
  if (!eventEmitter) {
    console.error('[@citygro/vdata] missing event source!');
  } else {
    entries$1(handlers).forEach(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          event = _ref2[0],
          handler = _ref2[1];

      eventEmitter.on(event, handler.bind(Vue));
    });
  }
});

var registerSchemas = function ($store) {
  var modelMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isEmpty(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!');
  }
  entries$1(modelMap).forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        modelName = _ref2[0],
        schema = _ref2[1];

    return $store.defineMapper(modelName, schema);
  });
};

var hasVQuery = function hasVQuery(o) {
  return !!get(o, '$options.vQuery');
};
var hasVdata = function hasVdata(o) {
  return !!get(o, 'options.vdata');
};

/**
 * vdata plugin
 */
var vdata = {
  createConfig: function createConfig(fn) {
    return function (V) {
      var options = fn(V);
      return defaults(options || {}, {
        events: ['add', 'change', 'remove', 'manual']
      });
    };
  },
  install: function install(Vue, options) {
    var store = new jsData.DataStore();
    Object.defineProperty(Vue, '$store', {
      get: function get() {
        return store;
      }
    });
    Object.defineProperty(Vue.prototype, '$store', {
      get: function get() {
        return store;
      }
    });
    options = isFunction(options) ? options(Vue) : options;
    Object.defineProperty(store, 'vdataOptions', {
      get: function get() {
        return options;
      }
    });
    registerSchemas(store, options.models);
    registerAdapters(store, options.adapters);
    registerExternalEvents(Vue, options.externalEvents);
    if (process.env.NODE_ENV !== 'test') {
      console.log('[@citygro/vdata] store ready!', store);
    }
    Vue.mixin(AsyncDataMixin);
    Vue.mixin({
      methods: {
        $vdata: function $vdata() {
          if (hasVdata(this)) {
            this._vdataHandler.apply(this, [store].concat(Array.prototype.slice.call(arguments)));
          }
          if (hasVQuery(this)) {
            this._vQueryHandler.apply(this, [store].concat(Array.prototype.slice.call(arguments)));
          }
        }
      },
      beforeCreate: function beforeCreate() {
        if (hasVdata(this)) {
          injectHandler(this, 'vdata', options.events, this.$options.vdata);
        }
        if (hasVQuery(this)) {
          processVQuery(this, store, options.events, this.$options.vQuery);
        }
      },
      created: function created() {
        this.$vdata('manual');
      },
      beforeDestroy: function beforeDestroy() {
        if (hasVdata(this)) {
          store.off('all', this.$vdata);
        }
      }
    });
  }
};

/**
 * convert snake_case or camelCase strings to CapCase
 *
 * @param {String} s
 */
var capWords = (function (s) {
  var camel = camelCase(s);
  var arr = concat([], camel.charAt(0).toUpperCase(), tail(camel));
  return join(arr, '');
});

var format = (function (name) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (prefix === '') {
    return camelCase(name);
  } else {
    return '' + camelCase(prefix) + capWords(name);
  }
});

/**
 * needs more accurate heuristics, but this is a decent (naive) test
 *
 * @param {object} o - suspected Record
 */
var isRecord = (function () {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return isFunction(o.hasChanges) && isFunction(o._mapper);
});

/**
 * @param {Vue} vm - Vue instance that needs to be force updated
 */
var forceUpdate = function forceUpdate(vm) {
  vm.$nextTick(function () {
    vm.$forceUpdate();
    vm.$children.forEach(function (child) {
      return setTimeout(function () {
        return child.$forceUpdate();
      }, 0);
    });
  });
};

/**
 * @param {object} value
 * @param {object} diff
 */
var handleChange = function handleChange(value, diff) {
  if (isRecord(value)) {
    return updateRecord(value, diff);
  } else {
    return _extends({}, value, diff);
  }
};

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
var handleKeyChange = function handleKeyChange(value, key, diff) {
  var updated = handleChange(value[key], diff);
  return handleChange(value, defineProperty({}, key, updated));
};

/**
 * @param {object} value
 * @param {number} i
 * @param {object} diff
 */
var handleArrayChange = function handleArrayChange() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var i = arguments[1];
  var diff = arguments[2];

  var arr = [].concat(toConsumableArray(value));
  if (isRecord(arr[i])) {
    arr[i] = updateRecord(arr[i], diff);
  } else if (isRecord(diff)) {
    arr[i] = diff;
  } else {
    arr[i] = _extends({}, arr[i] || {}, diff);
  }
  return arr;
};

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 * @param {object} diff
 */
var handleArrayKeyChange = function handleArrayKeyChange() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var i = arguments[1];
  var key = arguments[2];
  var diff = arguments[3];

  var updated = handleArrayChange(value[key] || [], i, diff);
  return handleChange(value, defineProperty({}, key, updated));
};

/**
 * @param {array} value
 * @param {object} diff
 */
var pushToArray = function pushToArray() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var diff = arguments[1];

  var arr = [].concat(toConsumableArray(value));
  arr.push(diff);
  return arr;
};

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
var pushToArrayKey = function pushToArrayKey() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments[1];
  var diff = arguments[2];

  var arr = [].concat(toConsumableArray(value[key] || []));
  arr.push(diff);
  return handleChange(value, defineProperty({}, key, arr));
};

/**
 * @param {array} value
 * @param {number} i
 */
var removeFromArray = function removeFromArray() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var i = arguments[1];

  var arr = [].concat(toConsumableArray(value));
  arr.splice(i, 1);
  return arr;
};

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 */
var removeFromArrayKey = function removeFromArrayKey() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var i = arguments[1];
  var key = arguments[2];

  var updated = removeFromArray(value[key], i);
  return handleChange(value, defineProperty({}, key, updated));
};

/**
 * create a dataflow mixin for a given value prop.
 *
 * a 'value' dataflow implements the `v-model` interface.
 *
 * custom dataflows follow a pattern: methods are prefixed with the `valueProp`
 * name and `update:${valueProp}` is emitted.
 *
 * @param {string} valueProp - bind dataflow to this prop
 */
var createSyncMixin = function createSyncMixin(valueProp) {
  var _methods;

  var event = valueProp === 'value' ? 'input' : 'update:' + valueProp;
  var prefix = valueProp === 'value' ? '' : valueProp;
  return {
    methods: (_methods = {}, defineProperty(_methods, format('forwardInput', prefix), function (e) {
      this.$emit(event, e);
    }), defineProperty(_methods, format('handleChange', prefix), function (diff) {
      this.$emit(event, handleChange(this[valueProp], diff));
      forceUpdate(this);
    }), defineProperty(_methods, format('handleKeyChange', prefix), function (key, diff) {
      this.$emit(event, handleKeyChange(this[valueProp], key, diff));
      forceUpdate(this);
    }), defineProperty(_methods, format('handleArrayKeyChange', prefix), function (i, key, diff) {
      this.$emit(event, handleArrayKeyChange(this[valueProp], i, key, diff));
      forceUpdate(this);
    }), defineProperty(_methods, format('handleArrayChange', prefix), function (i, diff) {
      this.$emit(event, handleArrayChange(this[valueProp], i, diff));
      forceUpdate(this);
    }), defineProperty(_methods, format('pushToArray', prefix), function (diff) {
      this.$emit(event, pushToArray(this[valueProp], diff));
      forceUpdate(this);
    }), defineProperty(_methods, format('pushToArrayKey', prefix), function (key, diff) {
      this.$emit(event, pushToArrayKey(this[valueProp], key, diff));
      forceUpdate(this);
    }), defineProperty(_methods, format('removeFromArray', prefix), function (i) {
      this.$emit(event, removeFromArray(this[valueProp], i));
      forceUpdate(this);
    }), defineProperty(_methods, format('removeFromArrayKey', prefix), function (i, key) {
      this.$emit(event, removeFromArrayKey(this[valueProp], i, key));
      forceUpdate(this);
    }), _methods)
  };
};

var DataFlowMixin = createSyncMixin('value');

exports.AsyncDataMixin = AsyncDataMixin;
exports.DataFlowMixin = DataFlowMixin;
exports.createSyncMixin = createSyncMixin;
exports.to = to;
exports.updateRecord = updateRecord;
exports.vdata = vdata;
