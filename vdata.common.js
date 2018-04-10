'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var camelCase = _interopDefault(require('lodash/camelCase'));
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var stringify = _interopDefault(require('json-stable-stringify'));
var get = _interopDefault(require('lodash/get'));
var merge = _interopDefault(require('lodash/merge'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var isNil = _interopDefault(require('lodash/isNil'));
var isObject = _interopDefault(require('lodash/isObject'));
var transform = _interopDefault(require('lodash/transform'));
var flow = _interopDefault(require('lodash/fp/flow'));
var tail = _interopDefault(require('lodash/tail'));
var whatwgFetch = require('whatwg-fetch');
var Any = _interopDefault(require('p-any'));
var fromPairs = _interopDefault(require('lodash/fp/fromPairs'));
var assign = _interopDefault(require('lodash/assign'));
var isEmpty = _interopDefault(require('lodash/isEmpty'));
var isFunction = _interopDefault(require('lodash/isFunction'));
var keys = _interopDefault(require('lodash/keys'));
var zip = _interopDefault(require('lodash/fp/zip'));
var defaults = _interopDefault(require('lodash/defaults'));
var forEach = _interopDefault(require('@r14c/async-utils/forEach'));
var EventEmitter = _interopDefault(require('events'));
var immutable = require('immutable');
var map = _interopDefault(require('lodash/map'));
var pick = _interopDefault(require('lodash/pick'));
var sum = _interopDefault(require('lodash/sum'));
var entries = _interopDefault(require('lodash/entries'));
var sort = _interopDefault(require('lodash/sortBy'));
var isArray = _interopDefault(require('lodash/isArray'));
var microTask = _interopDefault(require('@r14c/async-utils/microTask'));
var toNumber = _interopDefault(require('lodash/toNumber'));
var concat = _interopDefault(require('lodash/concat'));
var join = _interopDefault(require('lodash/join'));

/**
 * @param {object[]} collection
 * @param {string} key
 */
var createIndex = (function (collection, key) {
  var index = {};
  collection.forEach(function (item) {
    index[item[key]] = item;
  });
  return index;
});

/**
 * quickly determine if two objects differ
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Boolean}
 */
var fastDiff = (function (a, b) {
  return stringify(a) !== stringify(b);
});

var pop = (function (o, key, fallback) {
  var value = o[key];
  delete o[key];
  return value === undefined ? fallback : value;
});

/**
 * @param {object} base
 * @param {object} object
 * @return {object} diff
 */
function difference(base, object) {
  function changes(object, base) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return isNil(base) ? object : changes(object, base);
}

var jsonClone = flow(JSON.stringify, JSON.parse);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
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

/**
 * @param {Object} base
 * @param {...Object} checkpoints
 * @returns {Object}
 */
var rebase = function () {
  var base = arguments[0];
  var diffs = tail(arguments).map(function (checkpoint) {
    return difference(base, checkpoint);
  });
  return merge.apply(undefined, [jsonClone(base)].concat(toConsumableArray(diffs)));
};

/**
 * @param {Promise} promise
 * @return {Promise}
 * @alias module:to
 * @async
 */
var to = function to(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err, undefined];
  });
};

/**
 * create a mixin that configures a vm to manipulate a single record. you can
 * use a prop to ask for a record by id or specify a template to create a new
 * record that is pre-populated with some initial state.
 *
 * ```javascript
 * // @/queries/UserById.js
 * import {createMixinForItemById} from '@citygro/vdata'
 *
 * export default {
 *   mixins: [
 *     createMixinForItemById({
 *       idPropertyName: 'userId',
 *       collectionName: 'users',
 *       localPropertyName: 'user',
 *       requestOptions: {
 *         capture: false
 *       }
 *    })
 *   ]
 * }
 * ```
 *
 * a vm which consumes this mixin will have the following props, methods, data,
 * &c. it will also be configured to react to changes to data in the store and
 * update itself accordingly.
 *
 * ```javascript
 * {
 *   props: {
 *     userid: String,
 *     userRequestOptionsOverride: Object
 *   },
 *   data: {
 *     user: Object,
 *   },
 *   methods: {
 *     userSave: Function,
 *   },
 *   computed: {
 *     asyncLoading: Boolean,
 *     userLoading: Boolean,
 *     userHasChanges: Boolean
 *   }
 * }
 * ```
 *
 * `@/queries/UserById` defines a query that fetches and captures the initial state
 * for a user record. lets say we have a particular editor that provides read-only
 * access to a particular resource for some users and read/write access for
 * others.
 *
 * for the case where the editor should be read/write we can default some props
 * in the vm to change its behavior depending on the permissions of the current
 * user.
 *
 * ```javascript
 * // UserEditor.js
 * import UserById from '@/queries/UserById'
 *
 * export default {
 *   mixins: [
 *     UserById
 *   ],
 *   props: {
 *     userRequestOptionsOverride: {
 *       default () {
 *         return {
 *           capture: this.$session.hasPermissionToEditUsers()
 *         }
 *       }
 *     }
 *   } // ...
 * }
 * ```
 *
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.localPropertyName - the vm data where the result of the query will be stored
 * @param {string} [options.idPropertyName=id] - the name of the prop you will use to specify the id of the requested record
 * @param {object} [options.requestOptions] - control some of the behavior of the query
 * @param {boolean} [options.requestOptions.force=false] - always fetch the latest record
 * @param {boolean} [options.requestOptions.capture=false] - capture the initial state of the record, implies `force = true`
 * @param {object} [options.template={}] - the default template for this query
 * @return {object} item-by-id query mixin
 */
var createMixinForItemById = function createMixinForItemById(options) {
  var _props, _methods;

  var collectionName = options.collectionName;
  var localPropertyName = options.localPropertyName || camelCase(collectionName).slice(0, -1);
  var idPropertyName = options.idPropertyName || 'id'; // FIXME `${localPropertyName}Id`
  var templateName = options.templateName || localPropertyName + 'Template';
  var template = options.template || {};
  var recordPrimaryKey = options.recordPrimaryKey || '_id';
  var getIdMethodName = localPropertyName + 'RecordId';
  var hasChangesComputedName = localPropertyName + 'HasChanges';
  var saveMethodName = localPropertyName + 'Save';
  var asyncLoadingName = localPropertyName + 'Loading';
  var idType = options.idType || String;
  var requestOptions = options.requestOptions || {};
  var requestOptionsName = localPropertyName + 'RequestOptions';
  var captureName = localPropertyName + 'Capture';
  var capture = pop(requestOptions, 'capture', false);
  var requestOptionsOverrideName = localPropertyName + 'RequestOptionsOverride';
  var changeCollectionMethodName = localPropertyName + 'ChangeCollection';

  if (!collectionName) {
    throw new Error('[@citygro/vdata#createMixinForItemById] options.collectionName is required');
  }

  if (!options.idPropertyName) {
    console.warn('[@citygro/vdata#createMixinForItemById]', 'options.idPropertyName will default to `${localPropertyName}Id` in future versions of vdata' // eslint-disable-line no-template-curly-in-string
    );
  }

  return {
    props: (_props = {}, defineProperty(_props, idPropertyName, {
      type: idType,
      default: null
    }), defineProperty(_props, templateName, {
      type: Object,
      default: function _default() {
        return cloneDeep(template);
      }
    }), defineProperty(_props, requestOptionsOverrideName, {
      type: Object,
      default: function _default() {
        return {};
      }
    }), _props),
    data: function data() {
      var _data;

      var data = (_data = {}, defineProperty(_data, localPropertyName, null), defineProperty(_data, requestOptionsName, merge({}, cloneDeep(requestOptions), this[requestOptionsOverrideName])), _data);
      if (capture || this[requestOptionsOverrideName].capture) {
        data[captureName] = null;
      }
      return data;
    },
    vdata: function vdata(event) {
      var recordId = this[getIdMethodName]();
      if (!this[asyncLoadingName] && recordId !== null && event.collectionName === collectionName) {
        if (capture || this[requestOptionsOverrideName].capture) {
          this[localPropertyName] = rebase(this[captureName], this.$store.get(collectionName, recordId) || {}, this[localPropertyName]);
        } else {
          this[localPropertyName] = this.$store.get(collectionName, recordId) || null;
        }
      }
    },

    asyncData: defineProperty({}, localPropertyName, function () {
      var _this = this;

      return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var forceOption, captureOption, force, recordId, err, result, _ref, _ref2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                forceOption = requestOptions.force || _this[requestOptionsOverrideName].force;
                captureOption = capture || _this[requestOptionsOverrideName].capture;

                if (forceOption && captureOption) {
                  console.warn('[@citygro/vdata#createMixinForItemById]', '`requestOptions.capture = true` implies `requestOptions.force = true`, setting both options is not necessary');
                }
                force = forceOption || captureOption;
                recordId = _this[getIdMethodName]();
                err = void 0, result = void 0;

                if (!(recordId !== null)) {
                  _context.next = 17;
                  break;
                }

                if (!force) {
                  result = _this.$store.get(collectionName, recordId);
                }

                if (result) {
                  _context.next = 15;
                  break;
                }

                _context.next = 11;
                return to(_this.$store.find(collectionName, recordId, _this[requestOptionsName]));

              case 11:
                _ref = _context.sent;
                _ref2 = slicedToArray(_ref, 2);
                err = _ref2[0];
                result = _ref2[1];

              case 15:
                _context.next = 18;
                break;

              case 17:
                result = _this.$store.createRecord(collectionName, _this[templateName]);

              case 18:
                if (err) {
                  console.error(err);
                  result = null;
                }
                if (captureOption && !_this[captureName]) {
                  _this[captureName] = cloneDeep(result);
                }
                return _context.abrupt('return', result);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }),
    watch: defineProperty({}, idPropertyName, function () {
      if (!capture) {
        this.$asyncReload(localPropertyName);
      }
    }),
    computed: defineProperty({}, hasChangesComputedName, function () {
      var localState = this[localPropertyName];
      if (this[capture]) {
        return fastDiff(this[captureName], localState);
      } else {
        return this.$store.hasChanges(collectionName, this[getIdMethodName](), localState);
      }
    }),
    methods: (_methods = {}, defineProperty(_methods, changeCollectionMethodName, function (name) {
      collectionName = name;
      this.$asyncReload(localPropertyName);
    }), defineProperty(_methods, getIdMethodName, function () {
      var id = this[idPropertyName] || get(this, localPropertyName + '.' + recordPrimaryKey, null);
      return this.$store.isValidId(id) ? id : null;
    }), defineProperty(_methods, saveMethodName, function () {
      var _this2 = this;

      return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var recordId, value, _ref3, _ref4, err, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                recordId = _this2[getIdMethodName]();
                value = capture || _this2[requestOptionsOverrideName].capture ? rebase(_this2[captureName], recordId ? _this2.$store.get(collectionName, recordId) : {}, _this2[localPropertyName]) : _this2[localPropertyName];
                _context2.next = 4;
                return to(_this2.$store.save(collectionName, value, _this2[requestOptionsName]));

              case 4:
                _ref3 = _context2.sent;
                _ref4 = slicedToArray(_ref3, 2);
                err = _ref4[0];
                response = _ref4[1];

                if (!err) {
                  _context2.next = 10;
                  break;
                }

                throw err;

              case 10:
                if (response) {
                  _this2[localPropertyName] = response;
                  _this2.$emit('update:' + idPropertyName, response[recordPrimaryKey]);
                }
                return _context2.abrupt('return', _this2[localPropertyName]);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }), _methods)
  };
};

/**
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.localPropertyName
 * @param {object} options.queryOptions
 * @param {object} options.requestOptions
 * @return {object}
 */
var createMixinForListByResource = function (options) {
  var collectionName = options.collectionName;
  var localPropertyName = options.localPropertyName || camelCase(collectionName);
  var localPropertyForceName = localPropertyName + 'Force';
  var queryOptions = options.queryOptions || {};
  var requestOptions = options.requestOptions;

  return {
    data: function data() {
      var _ref;

      return _ref = {}, defineProperty(_ref, localPropertyName, []), defineProperty(_ref, localPropertyForceName, false), _ref;
    },
    vdata: function vdata(event) {
      if (!this.asyncLoading && event.collectionName === collectionName) {
        this[localPropertyName] = this.$store.getAll(collectionName) || [];
      }
    },

    asyncData: defineProperty({}, localPropertyName, function () {
      var _this = this;

      return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref2, _ref3, err, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return to(_this.$store.findAll(collectionName, queryOptions, _extends({}, requestOptions, {
                  force: _this[localPropertyForceName]
                })));

              case 2:
                _ref2 = _context.sent;
                _ref3 = slicedToArray(_ref2, 2);
                err = _ref3[0];
                result = _ref3[1];

                if (err) {
                  console.error(err);
                  result = [];
                }
                return _context.abrupt('return', result);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    })
  };
};

/* global fetch */
var interceptors = [];

var fetchWrapper = function fetchWrapper(url, options) {
  var request = cloneDeep(options);
  interceptors.forEach(function (fn) {
    request = fn(request);
  });
  return fetch(url, request);
};

fetchWrapper.addInterceptor = function (fn) {
  interceptors.push(fn);
};

/**
 * @param {Object[]} mixins
 */
var flattenMixinTree = function flattenMixinTree() {
  var mixins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var arr = [];
  mixins.forEach(function (mixin) {
    if (mixin.mixins && mixin.mixins.length) {
      arr = [].concat(toConsumableArray(arr), toConsumableArray(flattenMixinTree(mixin.mixins)));
    }
    arr.push(mixin);
  });
  return arr;
};

/**
 * @param {Vue} vm - vue instance
 * @param {string} prop - option name
 */
var getMergedOptions = (function (vm, prop) {
  var options = cloneDeep(get(vm, '$options.' + prop, {}));
  var mixins = get(vm, '$options.mixins', []);
  flattenMixinTree(mixins).filter(function (mixin) {
    return mixin[prop];
  }).forEach(function (mixin) {
    options = assign(options, mixin[prop]);
  });
  return isEmpty(options) ? null : options;
});

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

var optionNames = ['Default', 'Lazy'];

var isOptionName = function isOptionName(key) {
  var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : optionNames;
  return names.find(function (n) {
    return key.endsWith(n);
  });
};

// name args optional
var createAsyncReload = function createAsyncReload(thisArg) {
  return function (propertyName) {
    var _this = this;

    var skipLazy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var asyncData = getMergedOptions(this, 'asyncData');
    if (asyncData) {
      var promises = [];
      var names = keys(asyncData).filter(function (s) {
        return !isOptionName(s);
      }).filter(function (s) {
        return propertyName === undefined || s === propertyName;
      }).filter(function (s) {
        return skipLazy === false || !asyncData[s + 'Lazy'];
      });
      if (propertyName !== undefined && names.length === 0) {
        throw new Error('asyncData cannot find "' + propertyName, this);
      }
      names.forEach(function (prop) {
        // helpers
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
        var cancelTimer = function cancelTimer() {
          if (_this['_' + prop + 'Timer']) {
            clearTimeout(_this['_' + prop + 'Timer']);
          }
        };
        setLoading(true);
        setError(undefined);
        var timeout = asyncData[prop + 'Timeout'] || -1;
        if (timeout > 0) {
          clearTimeout(_this['_' + prop + 'Timer']);
          _this['_' + prop + 'Timer'] = setTimeout(function () {
            _this._asyncReload.cancel();
          }, timeout);
        }
        if (typeof asyncData[prop] !== 'function') {
          console.error('asyncData.' + prop + ' must be funtion. actual: ' + asyncData[prop], _this);
        } else {
          var promise = asyncData[prop].apply(_this).then(function (data) {
            _this[prop] = data;
            _this[prop + 'Promise'] = promise;
            setLoading(false);
            cancelTimer();
            return data;
          }).catch(function (err) {
            setError(err);
            setLoading(false);
            cancelTimer();
          });
          promises.push(promise);
        }
      });
      return Promise.all(promises).then(flow(zip(names), fromPairs));
    } else {
      return Promise.resolve({});
    }
  }.bind(thisArg);
};

var AsyncDataMixin = {
  beforeCreate: function beforeCreate() {
    this._asyncReload = createAsyncReload(this);
  },
  created: function created() {
    this.$asyncReload(undefined, true);
  },

  methods: {
    $asyncReload: function $asyncReload(propertyName) {
      if (isFunction(this._asyncReload)) {
        return this._asyncReload.apply(this, arguments).then(function (result) {
          return propertyName ? result[propertyName] : result;
        });
      } else {
        console.info('[@citygro/vdata<' + this._uid + '>] vm.asyncReload is not available until the component is created!');
        return Promise.resolve(null);
      }
    }
  },
  data: function data() {
    var _this2 = this;

    var asyncData = getMergedOptions(this, 'asyncData');
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
        dataObj[name] = isFunction(asyncDefault) ? asyncDefault.apply(_this2) : asyncDefault;
        dataObj[name + 'Promise'] = null;
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

var handlers = {};

/**
 * inject handler that will run on datastore events
 *
 * @param {Vue} vm
 * @param {string} label
 * @param {string[]} events
 * @param {function} fn
 */
var createHandler = (function (vm) {
  handlers[vm._uid] = flattenMixinTree(vm.$options.mixins).filter(function (mixin) {
    return !!mixin.vdata;
  }).map(function (mixin) {
    return mixin.vdata;
  });
  if (vm.$options.vdata) {
    handlers[vm._uid].push(vm.$options.vdata);
  }
  return {
    run: function run(message) {
      forEach(handlers[vm._uid], function (fn) {
        fn.apply(vm, [message]);
      });
    },
    destroy: function destroy() {
      delete handlers[vm._uid];
    }
  };
});

var mget = (function (value, path) {
  if (immutable.isImmutable(value)) {
    return value.getIn(path.split('.'));
  } else {
    return get(value, path);
  }
});

/**
 * @param {object} o
 * @param {string} prefix
 */
var toQueryString = function toQueryString(o, prefix) {
  return sort(entries(o), function (e) {
    return e[0];
  }).map(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        prop = _ref2[0],
        value = _ref2[1];

    var key = prefix ? prefix + '[' + prop + ']' : prop;
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toQueryString(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
};

var withDefaults = function withDefaults(options) {
  return pick(defaults({}, options, {
    credentials: 'same-origin'
  }), ['headers', 'body', 'method', 'credentials']);
};

var makeKey = function makeKey(url, request) {
  var headers = Object.entries(request.headers || {}).map(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return key + ':' + val;
  });
  var values = map('' + headers + request.url, function (c) {
    return c.codePointAt(0);
  });
  return '' + sum(values);
};

var createHttpAdapter = function createHttpAdapter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var promiseCache = {};
  var adapter = options.adapter || fetchWrapper;
  var deserialize = options.deserialize || function (data) {
    return data;
  };
  var createRequest = function createRequest(url, options) {
    var request = withDefaults(options);
    return adapter(url, _extends({}, request, { body: request.body ? stringify(request.body) : undefined })).then(function (res) {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(res);
      }
    }).then(deserialize).catch(function (err) {
      throw err;
    });
  };
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = options.url;
    var force = options.force || false;
    if (options.params) {
      var qs = toQueryString(options.params);
      url += '?' + qs;
    }
    if (options.method === 'GET') {
      var key = makeKey(url, options);
      var promise = promiseCache[key];
      if (!promise || force === true) {
        promise = promiseCache[key] = createRequest(url, options);
      }
      return promise;
    } else {
      return createRequest(url, options);
    }
  };
};

var registerSchemas = function (store) {
  var modelMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isEmpty(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!');
  }
  Object.keys(modelMap).forEach(function (modelName) {
    store = store.set(modelName, immutable.Map());
  });
  return store;
};

/**
 * uniqueId
 *
 * @param {string} [prefix] - optional prefix
 * @return {string}
 */
var uniqueId = (function (prefix) {
  var ex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9e15;

  var id = parseInt((Math.random() * ex).toFixed(0), 10).toString(36);
  return prefix ? prefix + "-" + id : id;
});

/**
 * @param {object} data
 */
var convert = function convert(data) {
  return immutable.fromJS(data, function (key, value) {
    return immutable.isKeyed(value) ? value.toMap() : value.toList();
  });
};

/**
 * @param {*} id
 */
var isValidId = function isValidId(id) {
  return id !== null && id !== undefined && id !== '';
};

var Store = {
  /**
   * @param {object} options
   * @param {object} options.models
   * @param {function} [options.adapter] - a custom fetch
   * @param {function} [options.deserialize] - request post-processing
   */
  create: function create(options) {
    var evt = new EventEmitter();
    var http = createHttpAdapter(options);
    var models = cloneDeep(options.models);
    var storeId = uniqueId(null, 1e5);
    var keyMap = {};
    var store = registerSchemas(immutable.Map(), options.models);
    /**
     * @param {string} id
     */
    var resolveId = function resolveId(id) {
      var isTmp = /^[0-9a-z]+-[0-9a-z]+$/i.test(id);
      return isTmp ? id : keyMap[id];
    };
    /**
     * @param {string} id
     */
    var resolvePk = function resolvePk(id) {
      var isTmp = /^[0-9a-z]+-[0-9a-z]+$/i.test(id);
      return isTmp ? keyMap[id] : id;
    };
    /**
     * @param {string} collectionName
     * @param {object} data
     */
    var getMeta = function getMeta(collectionName, data) {
      var model = models[collectionName];
      var idAttribute = model.idAttribute;
      var pk = mget(data, idAttribute);
      var id = mget(data, '__tmp_id');
      var symId = mget(data, '__sym_id');
      keyMap[pk] = id;
      keyMap[id] = pk;
      return {
        id: id,
        pk: pk,
        symId: symId,
        basePath: model.basePath || '',
        idAttribute: idAttribute
      };
    };
    /**
     * @param {string} message
     * @param {object} options
     * @param {boolean} options.quiet
     */
    var emit = function emit(message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var quiet = options.quiet || false;
      if (quiet === false) {
        microTask(function () {
          return evt.emit(message.event, message);
        });
      }
    };
    /**
     * @constructor
     */
    var Store = function Store() {
      this.models = cloneDeep(options.models);
      this.storeId = storeId;
    };
    /**
     * @param {string} collection
     * @param {object} [data={}]
     */
    Store.prototype.createRecord = function (collectionName) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _getMeta = getMeta(collectionName, data),
          id = _getMeta.id;

      return isValidId(id) ? data : _extends({ __tmp_id: uniqueId(storeId) }, data);
    };
    /**
     * @param {string} collection
     * @param {string} id
     */
    Store.prototype.get = function (collectionName, id) {
      var versions = store.getIn([collectionName, resolveId(id)], immutable.Stack());
      var record = versions.first();
      if (record) {
        var size = versions.size;
        var index = 0;
        return this.createRecord(collectionName, _extends({}, record.toJS(), {
          __sym_id: index + '-' + size
        }));
      } else {
        return null;
      }
    };
    /**
     * @param {string} collection
     * @param {string[]} [keys]
     */
    Store.prototype.getAll = function (collectionName, keys$$1) {
      var _this = this;

      if (isArray(keys$$1)) {
        return keys$$1.length ? keys$$1.map(function (key) {
          return _this.get(collectionName, key);
        }) : [];
      } else {
        return store.get(collectionName).keySeq().map(function (key) {
          return _this.get(collectionName, key);
        }).toJS();
      }
    };
    /**
     * @param {string} collectionName
     * @param {string} id
     * @param {object} options
     * @param {boolean} options.quiet
     */
    Store.prototype.remove = function (collectionName, id) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var object = this.get(collectionName, id);
      var meta = getMeta(collectionName, object);
      store = store.removeIn([collectionName, resolveId(id)]);
      delete keyMap[meta.pk];
      delete keyMap[meta.id];
      delete object.__tmp_id;
      delete object.__sym_id;
      emit({
        collectionName: collectionName,
        event: 'remove',
        record: object
      }, {
        quiet: options.quiet
      });
      return object;
    };
    /**
     * @param {string} collection
     * @param {string[]} keys
     */
    Store.prototype.removeAll = function (collectionName, keys$$1) {
      var _this2 = this;

      this.getAll(collectionName, keys$$1).forEach(function (record) {
        var id = getMeta(collectionName, record);
        _this2.remove(collectionName, id);
      });
    };
    /**
     *
     */
    Store.prototype.clear = function () {
      var _this3 = this;

      store.keySeq().forEach(function (collectionName) {
        _this3.removeAll(collectionName);
      });
    };
    Store.prototype.rebase = function (collectionName, data) {
      var record = immutable.isImmutable(data) ? data.toJS() : data;

      var _getMeta2 = getMeta(collectionName, record),
          id = _getMeta2.id;

      var base = null;
      if (record.__sym_id) {
        var _record$__sym_id$spli = record.__sym_id.split('-').map(toNumber),
            _record$__sym_id$spli2 = slicedToArray(_record$__sym_id$spli, 2),
            index = _record$__sym_id$spli2[0],
            size = _record$__sym_id$spli2[1];

        var offset = index - size;
        var versions = store.getIn([collectionName, id]);
        if (versions) {
          base = versions.get(offset).toJS();
        }
      }
      var current = this.get(collectionName, id);
      return base || current ? rebase(base, current, record) : record;
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.add = function (collectionName, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var record = this.createRecord(collectionName, data);
      var based = convert(this.rebase(collectionName, record));

      var _getMeta3 = getMeta(collectionName, based),
          id = _getMeta3.id;

      var versions = store.getIn([collectionName, id], immutable.Stack());
      store = store.setIn([collectionName, id], versions.unshift(based));
      var object = this.get(collectionName, id);
      emit({
        collectionName: collectionName,
        event: 'add',
        record: object
      }, {
        quiet: options.quiet
      });
      return object;
    };
    /**
     * @param {string} collectionName
     * @param {object} data
     */
    Store.prototype.hasChanges = function (collectionName, data) {
      var _getMeta4 = getMeta(collectionName, data),
          id = _getMeta4.id;

      if (this.isValidId(id)) {
        var record = this.get(collectionName, id);
        return record.__sym_id === data.__sym_id ? fastDiff(record, data) : false;
      } else {
        return true;
      }
    };
    /**
     * @async
     * @param {string} collectionName
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.destroy = function (collectionName, data) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _getMeta5 = getMeta(collectionName, data),
          id = _getMeta5.id,
          pk = _getMeta5.pk,
          basePath = _getMeta5.basePath;

      return http(_extends({
        url: basePath + '/' + collectionName + '/' + pk,
        method: 'DELETE'
      }, options)).then(function () {
        return _this4.remove(collectionName, id);
      }).catch(function (err) {
        throw err;
      });
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
    Store.prototype.save = function (collectionName, data) {
      var _this5 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _getMeta6 = getMeta(collectionName, data),
          pk = _getMeta6.pk,
          basePath = _getMeta6.basePath;

      var promise = void 0;
      if (isValidId(pk)) {
        promise = http(_extends({
          url: basePath + '/' + collectionName + '/' + pk,
          method: 'PUT',
          body: this.rebase(collectionName, data)
        }, options));
      } else {
        promise = http(_extends({
          url: basePath + '/' + collectionName,
          method: 'POST',
          body: data
        }, options));
      }
      return promise.then(function (data) {
        return _this5.add(collectionName, data);
      }).catch(function (err) {
        throw err;
      });
    };
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @param {boolean} [options.force=false]
     * @async
     */
    Store.prototype.find = function (collectionName, id) {
      var _this6 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var force = options.force || false;
      var basePath = models[collectionName].basePath || '';
      var pk = resolvePk(id);
      var promise = void 0;
      if (isValidId(pk)) {
        var data = this.get(collectionName, id);
        if (!data || force === true) {
          var request = _extends({
            url: basePath + '/' + collectionName + '/' + pk,
            method: 'GET'
          }, options);
          promise = http(request).then(function (data) {
            _this6.add(collectionName, data);
            return data;
          }).catch(function (err) {
            throw err;
          });
        } else {
          promise = Promise.resolve(data);
        }
      } else {
        promise = Promise.resolve();
      }
      return promise;
    };
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
    Store.prototype.findAll = function (collectionName, query) {
      var _this7 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var basePath = models[collectionName].basePath || '';
      var request = _extends({
        url: basePath + '/' + collectionName,
        method: 'GET',
        params: query
      }, options);
      return http(request).then(function (result) {
        return result.map(function (data) {
          return _this7.add(collectionName, data);
        });
      }).catch(function (err) {
        throw err;
      });
    };
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.on = function (event, handler) {
      evt.addListener(event, handler);
    };
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.off = function (event, handler) {
      evt.removeListener(event, handler);
    };
    Store.prototype.emit = function (event, payload) {
      evt.emit(event, payload);
    };
    Store.prototype.isValidId = isValidId;
    return new Store();
  }
};

var hasVdata = function hasVdata(o) {
  return !!get(o, '$options.vdata');
};

/**
 * vdata plugin
 */
var vdata$1 = {
  createConfig: function createConfig(fn) {
    return function (V) {
      return fn(V);
    };
  },
  install: function install(Vue, options) {
    options = defaults({}, isFunction(options) ? options(Vue) : options, {
      events: ['add', 'remove']
    });
    var store = Store.create(options);
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
    Vue.mixin({
      methods: {
        $vdata: function $vdata(message) {
          if (hasVdata(this)) {
            this._vdataHandler.run(message);
          }
        }
      },
      beforeCreate: function beforeCreate() {
        if (hasVdata(this)) {
          this._vdataHandler = createHandler(this, options);
        }
      },
      created: function created() {
        var _this = this;

        options.events.forEach(function (event) {
          _this.$store.on(event, _this.$vdata);
        });
      },
      beforeDestroy: function beforeDestroy() {
        var _this2 = this;

        if (hasVdata(this)) {
          options.events.forEach(function (event) {
            _this2.$store.off(event, _this2.$vdata);
          });
          this._vdataHandler.destroy();
        }
      }
    });
    Vue.mixin(AsyncDataMixin);
    if (process.env.NODE_ENV !== 'test') {
      console.log('[@citygro/vdata] $store ready!', store, options);
    }
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
 * @param {object} value
 * @param {object} diff
 */
var handleChange = function handleChange(_ref) {
  var value = _ref.value,
      diff = _ref.diff;

  return _extends({}, value, diff);
};

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
var handleKeyChange = function handleKeyChange(_ref2) {
  var value = _ref2.value,
      key = _ref2.key,
      diff = _ref2.diff;

  var updated = handleChange({ value: value[key], diff: diff });
  return handleChange({ value: value, diff: defineProperty({}, key, updated) });
};

/**
 * @param {object} value
 * @param {number} i
 * @param {object} diff
 */
var handleArrayChange = function handleArrayChange(_ref3) {
  var _ref3$value = _ref3.value,
      value = _ref3$value === undefined ? [] : _ref3$value,
      index = _ref3.index,
      diff = _ref3.diff;

  var arr = [].concat(toConsumableArray(value));
  arr[index] = _extends({}, arr[index] || {}, diff);
  return arr;
};

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 * @param {object} diff
 */
var handleArrayKeyChange = function handleArrayKeyChange(_ref4) {
  var _ref4$value = _ref4.value,
      value = _ref4$value === undefined ? {} : _ref4$value,
      index = _ref4.index,
      key = _ref4.key,
      diff = _ref4.diff;

  var updated = handleArrayChange({ value: value[key] || [], index: index, diff: diff });
  return handleChange({ value: value, diff: defineProperty({}, key, updated) });
};

/**
 * @param {array} value
 * @param {object} diff
 */
var pushToArray = function pushToArray(_ref5) {
  var _ref5$value = _ref5.value,
      value = _ref5$value === undefined ? [] : _ref5$value,
      diff = _ref5.diff;

  var arr = [].concat(toConsumableArray(value));
  arr.push(diff);
  return arr;
};

/**
 * @param {object} value
 * @param {string} key
 * @param {object} diff
 */
var pushToArrayKey = function pushToArrayKey(_ref6) {
  var _ref6$value = _ref6.value,
      value = _ref6$value === undefined ? {} : _ref6$value,
      key = _ref6.key,
      diff = _ref6.diff;

  var arr = [].concat(toConsumableArray(value[key] || []));
  arr.push(diff);
  return handleChange({ value: value, diff: defineProperty({}, key, arr) });
};

/**
 * @param {array} value
 * @param {number} i
 */
var removeFromArray = function removeFromArray(_ref7) {
  var _ref7$value = _ref7.value,
      value = _ref7$value === undefined ? [] : _ref7$value,
      index = _ref7.index;

  var arr = [].concat(toConsumableArray(value));
  arr.splice(index, 1);
  return arr;
};

/**
 * @param {object} value
 * @param {number} i
 * @param {string} key
 */
var removeFromArrayKey = function removeFromArrayKey(_ref8) {
  var _ref8$value = _ref8.value,
      value = _ref8$value === undefined ? {} : _ref8$value,
      index = _ref8.index,
      key = _ref8.key;

  var updated = removeFromArray({ value: value[key], index: index });
  return handleChange({ value: value, diff: defineProperty({}, key, updated) });
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
var createDataFlowMixin = function createDataFlowMixin(valueProp) {
  var _methods;

  var event = valueProp === 'value' ? 'input' : 'update:' + valueProp;
  var prefix = valueProp === 'value' ? '' : valueProp;
  return {
    methods: (_methods = {}, defineProperty(_methods, format('forwardInput', prefix), function (e) {
      this.$emit(event, e);
    }), defineProperty(_methods, format('handleChange', prefix), function (diff) {
      this.$emit(event, handleChange({ value: this[valueProp], diff: diff }));
    }), defineProperty(_methods, format('handleKeyChange', prefix), function (key, diff) {
      this.$emit(event, handleKeyChange({ value: this[valueProp], key: key, diff: diff }));
    }), defineProperty(_methods, format('handleArrayKeyChange', prefix), function (index, key, diff) {
      this.$emit(event, handleArrayKeyChange({ value: this[valueProp], index: index, key: key, diff: diff }));
    }), defineProperty(_methods, format('handleArrayChange', prefix), function (index, diff) {
      this.$emit(event, handleArrayChange({ value: this[valueProp], index: index, diff: diff }));
    }), defineProperty(_methods, format('pushToArray', prefix), function (diff) {
      this.$emit(event, pushToArray({ value: this[valueProp], diff: diff }));
    }), defineProperty(_methods, format('pushToArrayKey', prefix), function (key, diff) {
      this.$emit(event, pushToArrayKey({ value: this[valueProp], key: key, diff: diff }));
    }), defineProperty(_methods, format('removeFromArray', prefix), function (index) {
      this.$emit(event, removeFromArray({ value: this[valueProp], index: index }));
    }), defineProperty(_methods, format('removeFromArrayKey', prefix), function (index, key) {
      this.$emit(event, removeFromArrayKey({ value: this[valueProp], index: index, key: key }));
    }), _methods)
  };
};

var DataFlowMixin = createDataFlowMixin('value');

var createMixinForItemByResourceAndId = function createMixinForItemByResourceAndId(options) {
  console.warn('[@citygro/vdata] rename createMixinForItemByResourceAndId -> createMixinForItemById', '"createMixinForItemByResourceAndId" is DEPRECATED and will be removed in a future release');
  return createMixinForItemById(options);
};

exports.DataFlowMixin = DataFlowMixin;
exports.createIndex = createIndex;
exports.createMixinForItemById = createMixinForItemById;
exports.createMixinForItemByResourceAndId = createMixinForItemByResourceAndId;
exports.createMixinForListByResource = createMixinForListByResource;
exports.fetchWrapper = fetchWrapper;
exports.to = to;
exports.vdata = vdata$1;
exports.handleChange = handleChange;
exports.handleKeyChange = handleKeyChange;
exports.handleArrayChange = handleArrayChange;
exports.handleArrayKeyChange = handleArrayKeyChange;
exports.pushToArray = pushToArray;
exports.pushToArrayKey = pushToArrayKey;
exports.removeFromArray = removeFromArray;
exports.removeFromArrayKey = removeFromArrayKey;
exports.createDataFlowMixin = createDataFlowMixin;
