'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var includes = _interopDefault(require('lodash/includes'));
var isArray = _interopDefault(require('lodash/isArray'));
var isBoolean = _interopDefault(require('lodash/isBoolean'));
var isNumber = _interopDefault(require('lodash/isNumber'));
var isString = _interopDefault(require('lodash/isString'));
var uniq = _interopDefault(require('lodash/uniq'));
var camelCase = _interopDefault(require('lodash/camelCase'));
var concat = _interopDefault(require('lodash/concat'));
var join = _interopDefault(require('lodash/join'));
var tail = _interopDefault(require('lodash/tail'));
var whatwgFetch = require('whatwg-fetch');
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var defaults = _interopDefault(require('lodash/defaultsDeep'));
var fork = _interopDefault(require('@r14c/async-utils/fork'));
var isFunction = _interopDefault(require('lodash/isFunction'));
var pick = _interopDefault(require('lodash/pick'));
var map = _interopDefault(require('lodash/map'));
var sum = _interopDefault(require('lodash/sum'));
var microTask = _interopDefault(require('@r14c/async-utils/microTask'));
var filter = _interopDefault(require('lodash/fp/filter'));
var flow = _interopDefault(require('lodash/fp/flow'));
var isNil = _interopDefault(require('lodash/fp/isNil'));
var omitBy = _interopDefault(require('lodash/fp/omitBy'));
var stringify = _interopDefault(require('json-stable-stringify'));
var sort = _interopDefault(require('lodash/sortBy'));
var get$1 = _interopDefault(require('lodash/get'));
var merge = _interopDefault(require('lodash/merge'));
var to = _interopDefault(require('@r14c/async-utils/to'));
var _r14c_asyncUtils_map = _interopDefault(require('@r14c/async-utils/map'));
var Any = _interopDefault(require('p-any'));
var fromPairs = _interopDefault(require('lodash/fp/fromPairs'));
var isEmpty = _interopDefault(require('lodash/isEmpty'));
var keys = _interopDefault(require('lodash/keys'));
var zip = _interopDefault(require('lodash/fp/zip'));
var Queue = _interopDefault(require('@r14c/async-utils/Queue'));
var EventEmitter = _interopDefault(require('events'));
var toString = _interopDefault(require('lodash/toString'));
var immutable = require('immutable');
var isEqual = _interopDefault(require('lodash/isEqual'));
var isNil$1 = _interopDefault(require('lodash/isNil'));
var isObject = _interopDefault(require('lodash/isObject'));
var mergeWith = _interopDefault(require('lodash/mergeWith'));
var transform = _interopDefault(require('lodash/transform'));
var toNumber = _interopDefault(require('lodash/toNumber'));

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

var get$2 = function get$2(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$2(parent, property, receiver);
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

var isPrimitive = function isPrimitive(val) {
  return isNumber(val) || isString(val) || isBoolean(val);
};

var cleanRecord = function cleanRecord(_ref) {
  var store = _ref.store,
      _ref$record = _ref.record,
      record = _ref$record === undefined ? {} : _ref$record,
      _ref$omitKeys = _ref.omitKeys,
      omitKeys = _ref$omitKeys === undefined ? [] : _ref$omitKeys;

  if (isPrimitive(record)) {
    return record;
  } else if (isArray(record)) {
    return record.map(function (item) {
      return cleanRecord({ store: store, record: item, omitKeys: omitKeys });
    });
  } else {
    var o = {};
    Object.entries(record).filter(function (_ref2) {
      var _ref3 = slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      return !includes(omitKeys, key) && value;
    }).forEach(function (_ref4) {
      var _ref5 = slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

      if (isArray(value)) {
        o[key] = value.map(function (item) {
          return cleanRecord({ store: store, record: item, omitKeys: omitKeys });
        });
      } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        o[key] = cleanRecord({ store: store, record: value, omitKeys: omitKeys });
      } else {
        o[key] = value;
      }
    });
    return o;
  }
};

/**
 * @param {object} options
 * @param {vdata.Store} options.store
 * @param {object} options.record
 * @param {string[]} options.omitKeys
 * @param {string} options.collectionName
 */
var cleanRecord$1 = (function (options) {
  var record = options.record;
  var store = options.store;
  var omitKeys = uniq([].concat(toConsumableArray(options.omitKeys || []), ['_id']));
  var cleanedRecord = cleanRecord({ store: store, record: record, omitKeys: omitKeys });
  return store.createRecord(record._collection || options.collectionName, cleanedRecord);
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

/* global fetch */
var withDefaults = function withDefaults(options) {
  return pick(defaults({}, options, {
    credentials: 'same-origin'
  }), ['headers', 'body', 'method', 'credentials', 'signal']);
};

var interceptors = [];
var onError = void 0;

var fetchWrapper = function fetchWrapper(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return fork(cloneDeep(options), interceptors).then(function (request) {
    return fetch(url, withDefaults(request)).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        return response;
      } else if (isFunction(onError)) {
        onError(response, request);
      } else {
        throw new Error(response.statusText, { response: response, request: request });
      }
    });
  });
};

fetchWrapper.addInterceptor = function (fn) {
  interceptors.push(fn);
};

fetchWrapper.onError = function (fn) {
  onError = fn;
};

var makeRequestKey = function makeRequestKey(url, options) {
  var headers = Object.entries(options.headers || {}).map(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return key + ':' + val;
  });
  var values = map('' + headers + url, function (c) {
    return c.codePointAt(0);
  });
  return options.method + '-' + sum(values);
};

// @flow

var filterArray = flow(filter(function (v) {
  return !isNil(v);
}));
var filterObject = flow(omitBy(isNil));

/**
 * removes nil values from arrays and nil `{key: value}` pairs from objects
 *
 * @function
 * @param {Object|Array} value - the source object
 * @return {Object|Array}
 */
var omitNil = (function (value) {
  return isArray(value) ? filterArray(value) : filterObject(value);
});

/**
 * @param {object} o
 * @param {string} prefix
 */
var toQueryString = function toQueryString() {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments[1];

  return sort(Object.entries(o), function (e) {
    return e[0];
  }).map(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        prop = _ref2[0],
        value = _ref2[1];

    var key = prefix ? prefix + '[' + prop + ']' : prop;
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toQueryString(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
};

var normalizeHeaders = function normalizeHeaders(options) {
  var headers = _extends({}, options.headers);
  if (!options.method) {
    throw new Error('options.method must be defined');
  }
  if (includes(['PUT', 'POST'], options.method.toUpperCase())) {
    headers['Content-Type'] = 'application/json';
  }
  headers['Accept'] = 'application/json';
  return headers;
};

var getUrl = function getUrl(options) {
  var url = options.url;
  var params = omitNil(options.params || {});
  var qs = toQueryString(params);
  if (qs) {
    url += '?' + qs;
  }
  return url;
};

var createHttpAdapter = function createHttpAdapter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var promiseCache = {};
  var adapter = options.adapter || fetchWrapper;
  var deserialize = options.deserialize || function (response, data) {
    return data;
  };
  var cacheTimeout = options.cacheTimeout || 500; // evict promise cache keys after 500ms by default
  var createRequest = function createRequest(url, request) {
    return adapter(url, request).then(function (response) {
      return response.json().then(function (data) {
        return microTask(function () {
          return deserialize(response, data);
        });
      });
    });
  };
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var promise = void 0;
    var force = options.force || false;
    var url = getUrl(options);
    var request = _extends({}, options, {
      headers: normalizeHeaders(options),
      body: options.body ? stringify(options.body) : undefined
    });
    if (options.method === 'GET') {
      var key = makeRequestKey(url, request);
      promise = promiseCache[key];
      if (!promise || force === true) {
        promise = promiseCache[key] = createRequest(url, request);
      }
      setTimeout(function () {
        delete promiseCache[key];
      }, cacheTimeout);
    } else {
      promise = createRequest(url, request);
    }
    return promise;
  };
};

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

var pop = (function (o, key, fallback) {
  var value = o[key];
  delete o[key];
  return value === undefined ? fallback : value;
});

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
      return data;
    },
    vdata: function vdata(event) {
      var recordId = this[getIdMethodName]();
      if (!this[asyncLoadingName] && recordId !== null && event.collectionName === collectionName) {
        if (capture || this[requestOptionsOverrideName].capture) {
          this[localPropertyName] = this.$store.rebase(collectionName, this[localPropertyName]);
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
                return _context.abrupt('return', result);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }),
    watch: defineProperty({}, idPropertyName, function () {
      var captureOption = capture || this[requestOptionsOverrideName].capture;
      if (!captureOption) {
        this.$asyncReload(localPropertyName);
      }
    }),
    computed: defineProperty({}, hasChangesComputedName, function () {
      return this.$store.hasChanges(collectionName, this[localPropertyName]);
    }),
    methods: (_methods = {}, defineProperty(_methods, changeCollectionMethodName, function (name) {
      collectionName = name;
      this.$asyncReload(localPropertyName);
    }), defineProperty(_methods, getIdMethodName, function () {
      var id = this[idPropertyName] || get$1(this, localPropertyName + '.' + recordPrimaryKey, null);
      return this.$store.isValidId(id) ? id : null;
    }), defineProperty(_methods, saveMethodName, function () {
      var _this2 = this;

      return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref3, _ref4, err, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return to(_this2.$store.save(collectionName, _this2[localPropertyName], _this2[requestOptionsName]));

              case 2:
                _ref3 = _context2.sent;
                _ref4 = slicedToArray(_ref3, 2);
                err = _ref4[0];
                response = _ref4[1];

                if (!err) {
                  _context2.next = 8;
                  break;
                }

                throw err;

              case 8:
                if (response) {
                  _this2[localPropertyName] = response;
                  _this2.$emit('update:' + idPropertyName, response[recordPrimaryKey]);
                }
                return _context2.abrupt('return', _this2[localPropertyName]);

              case 10:
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
  var options = cloneDeep(get$1(vm, '$options.' + prop, {}));
  var mixins = get$1(vm, '$options.mixins', []);
  flattenMixinTree(mixins).filter(function (mixin) {
    return mixin[prop];
  }).forEach(function (mixin) {
    options = Object.assign(options, mixin[prop]);
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

var createHandler = (function (Vue, store) {
  var queue = Queue.create({
    concurrency: 2,
    next: function next() {
      return new Promise(function (resolve) {
        return Vue.nextTick(function () {
          return resolve();
        });
      });
    }
  });
  var handlers = {};
  store.on('all', function (message) {
    // enqueue a task to handle the vdata listeners for a particular vm
    queue.push(function () {
      Object.values(handlers).forEach(function (vmHandler) {
        vmHandler.run(message);
      });
    });
  });
  return {
    /**
     * register handlers that will run on datastore events
     *
     * @param {Vue.Component} vm
     */
    add: function add(vm) {
      var listeners = flattenMixinTree(vm.$options.mixins).filter(function (mixin) {
        return !!mixin.vdata;
      }).map(function (mixin) {
        return mixin.vdata;
      });
      if (vm.$options.vdata) {
        listeners.push(vm.$options.vdata);
      }
      var handler = {
        run: function run(message) {
          listeners.forEach(function (fn) {
            fn.call(vm, message);
          });
        },
        destroy: function destroy() {
          delete handlers[vm._uid];
        }
      };
      handlers[vm._uid] = handler;
      return handler;
    }
  };
});

var KeyMap = {
  create: function create() {
    var map$$1 = {};
    return {
      get: function get(collectionName, key) {
        key = collectionName + '-' + toString(key);
        return map$$1[key];
      },
      link: function link(collectionName, a, b) {
        a = toString(a);
        b = toString(b);
        map$$1[collectionName + '-' + a] = b;
        map$$1[collectionName + '-' + b] = a;
      },
      unlink: function unlink(collectionName, a, b) {
        a = collectionName + '-' + toString(a);
        b = collectionName + '-' + toString(b);
        delete map$$1[a];
        delete map$$1[b];
      }
    };
  }
};

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

var makeQueryKey = function makeQueryKey(collectionName, query) {
  var values = map(stringify(query), function (c) {
    return c.codePointAt(0);
  });
  return collectionName + '-' + sum(values);
};

var mget = (function (value, path) {
  if (immutable.isImmutable(value)) {
    return value.getIn(path.split('.'));
  } else {
    return get$1(value, path);
  }
});

var merge$1 = function merge$1() {
  var object = arguments[0];
  var sources = tail(arguments);
  return mergeWith.apply(undefined, [object].concat(toConsumableArray(sources), [function (objValue, srcValue) {
    if (isArray(objValue)) {
      return srcValue;
    }
  }]));
};

/**
 * replace all values in an object with `null`. used to generate the ORSet for
 * diffing operations.
 *
 * @param {Object} object
 * @return {Object}
 */
var nullify = function nullify(object) {
  return transform(object, function (result, value, key) {
    result[key] = isObject(value) && !isArray(value) ? nullify(value) : null;
  });
};

/**
 * @param {object} base
 * @param {object} object
 * @return {object}
 */
var difference = function difference(base, object) {
  var changes = function changes(object, base) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) && !isArray(value) ? changes(value, base[key]) : value;
      }
    });
  };
  return isNil$1(base) ? object : changes(object, base);
};

var observedRemoveDiff = function observedRemoveDiff(base, object) {
  var diff = difference(base, object);
  var inverseDiff = difference(object, base);
  var nullDiff = nullify(inverseDiff);
  var orDiff = merge$1({}, nullDiff, diff);
  return orDiff;
};

var jsonClone = flow(JSON.stringify, JSON.parse);

/**
 * @param {Object} base
 * @param {...Object} checkpoints
 * @returns {Object}
 */
var rebase = function () {
  var base = arguments[0];
  var diffs = tail(arguments).map(function (checkpoint) {
    return observedRemoveDiff(base, checkpoint);
  });
  var patch = merge$1.apply(undefined, [{}].concat(toConsumableArray(diffs)));
  return merge$1(jsonClone(base), patch);
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

var idRegex = /^[0-9a-z]+?-[0-9a-z]+$/i;

/**
 * @param {Object} data
 * @private
 */
var convert = function convert(data) {
  return immutable.fromJS(data, function (key, value) {
    return immutable.isKeyed(value) ? value.toMap() : value.toList();
  });
};

/**
 * @param {Object} options
 * @param {Object} options.models
 * @param {String} [options.basePath=''] - default prefix for http requests
 * @param {function} [options.adapter] - a custom fetch
 * @param {function} [options.deserialize] - request post-processing
 * @return {Store} a vdata store instance
 */
var createStore = function createStore() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var evt = new EventEmitter();
  var http = createHttpAdapter(options);
  var models = cloneDeep(options.models);
  var storeId = uniqueId(null, 1e5);
  var queryCacheTimeout = options.cacheTimeout || 500; // evict query cache after 500ms by default
  var keyMap = KeyMap.create();
  var queryCache = {};
  var store = registerSchemas(immutable.Map(), options.models);
  var getBasePath = function getBasePath(collectionName) {
    var model = models[collectionName];
    return model.basePath || options.basePath || '';
  };
  /**
    * @param {String} id
    * @private
    */
  var resolveId = function resolveId(collectionName, id) {
    var isTmp = idRegex.test(id);
    return isTmp ? id : keyMap.get(collectionName, id);
  };
  /**
    * @param {String} id
    * @private
    */
  var resolvePk = function resolvePk(collectionName, id) {
    var isTmp = idRegex.test(id);
    return isTmp ? keyMap.get(collectionName, id) : id;
  };
  /**
    * @param {String} collectionName
    * @param {Object} data
    * @private
    */
  var getMeta = function getMeta(collectionName, data) {
    try {
      var model = models[collectionName];
      var idAttribute = model.idAttribute;
      return {
        basePath: getBasePath(collectionName),
        id: mget(data, '__tmp_id'),
        idAttribute: idAttribute,
        pk: mget(data, idAttribute),
        symId: mget(data, '__sym_id')
      };
    } catch (e) {
      throw new Error('missing collection: ' + collectionName);
    }
  };
  /**
    * queue a micro-task to broadcast the given message object
    *
    * @param {String} message
    * @param {Object} options
    * @param {Boolean} [options.quiet=false]
    * @private
    */
  var emit = function emit(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var quiet = options.quiet || false;
    if (quiet === false) {
      microTask(function () {
        return evt.emit('all', message);
      });
    }
  };
  /**
    * @constructor
    */
  var Store = function Store() {
    evt.setMaxListeners(0); // no limit
    this.models = options.models;
    this.storeId = storeId;
  };
  /**
    * tag a javascript object with metadata that allows it to be tracked by the vdata store.
    * `__tmp_id` and the `idAttribute` configured for the given collection are both used to
    * identify the object. editing either of these will cause vdata to see the resulting
    * object as something new that needs to be tracked separately from the original object.
    *
    * @param {String} collection
    * @param {Object} [data={}]
    * @return {Object}
    */
  Store.prototype.createRecord = function (collectionName) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var model = models[collectionName];
    var idAttribute = model.idAttribute;
    var pk = mget(data, idAttribute);
    var id = mget(data, '__tmp_id');
    if (pk && !id) {
      id = keyMap.get(collectionName, pk) || uniqueId(storeId); // get or gen id
      keyMap.link(collectionName, pk, id); // 2x link
    } else if (!pk && id) {
      // noop
    } else if (pk && id) {
      keyMap.link(collectionName, pk, id); // 2x link
    } else if (!pk && !id) {
      id = uniqueId(storeId); // gen id
    }
    return _extends({}, data, { __tmp_id: id });
  };
  /**
    * get a particular object from the store using the primary key provided by
    * your api server, or the temporary local id that vdata uses internally to
    * track records.
    *
    * @param {String} collectionName
    * @param {String} pkOrId
    * @return {Object}
    */
  Store.prototype.get = function (collectionName, pkOrId) {
    var id = resolveId(collectionName, pkOrId);
    var versions = store.getIn([collectionName, id], immutable.Stack());
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
    * get all of the records in `collectionName`. if you include a `keys`
    * parameter, this method returns all of the records that match the ids
    * listed.
    *
    * @param {String} collectionName
    * @param {string[]} [keys]
    * @return {object[]}
    */
  Store.prototype.getList = function (collectionName, keys$$1) {
    var _this = this;

    var result = void 0;
    if (isArray(keys$$1)) {
      result = keys$$1.length ? keys$$1.map(function (key) {
        return _this.get(collectionName, key);
      }) : [];
    } else {
      result = store.get(collectionName).keySeq().map(function (key) {
        return _this.get(collectionName, key);
      }).toJS();
    }
    return result;
  };
  /**
    * @ignore
    */
  Store.prototype.getAll = function () {
    return this.getList.apply(this, arguments);
  };
  /**
    * remove a record from the store, identified by public key or temporary id.
    *
    * @emits Store#remove
    * @param {String} collectionName
    * @param {String} pkOrId
    * @param {Object} options
    * @param {Boolean} options.quiet
    * @return {Object}
    */
  Store.prototype.remove = function (collectionName, pkOrId) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var id = resolveId(collectionName, pkOrId);
    var object = this.get(collectionName, id);
    var meta = getMeta(collectionName, object);
    store = store.removeIn([collectionName, id]);
    keyMap.unlink(collectionName, meta.pk, meta.id);
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
    * remove all of the records in `collectionName` or all of the records that match the ids passed into `keys`.
    *
    * @emits Store#remove-list
    * @param {String} collectionName
    * @param {string[]} keys
    * @return {object[]}
    */
  Store.prototype.removeList = function (collectionName, keys$$1) {
    var _this2 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var records = this.getAll(collectionName, keys$$1).map(function (record) {
      var _getMeta = getMeta(collectionName, record),
          id = _getMeta.id;

      return _this2.remove(collectionName, id, { quiet: true });
    });
    emit({
      collectionName: collectionName,
      event: 'remove-list',
      records: records
    }, {
      quiet: options.quiet
    });
    return records;
  };
  /**
    * @ignore
    */
  Store.prototype.removeAll = function () {
    return this.removeList.apply(this, arguments);
  };
  /**
    * remove all records from all collections
    * @emits Store#remove-list
    */
  Store.prototype.clear = function () {
    var _this3 = this;

    store.keySeq().forEach(function (collectionName) {
      _this3.removeAll(collectionName);
    });
  };
  /**
    * vdata automatically tracks all of the versions that are created for every
    * record that it tracks. this version tracking is how `Store#rebase` is able
    * to implement a simple Observed-Remove Set (ORSet) that enables vdata to
    * deterministically merge all of the changes to a particular record.
    *
    * given `data` with a particular `__sym_id` and the current version of the
    * same record at `data[idAttribute]`, return a merged record containing all
    * changes, applied to the base record at `__sym_id` in the following order,
    * diff'd against `base`:
    *
    * 1. current
    * 2. data
    *
    * at CityGro we use the ORSet implementation in vdata to power the real-time
    * features of our customer portal application. in most cases, the core
    * diffing algorithm is able to generate merged outputs with intuitive
    * results. however, it is important to note the rules that we use to
    * resolve certain edge cases.
    *
    * 1. Last-write (from the perspective of the writer) wins. in our
    *    experience, this produces the least surprising results for our users.
    * 2. Array mutations are all-or-nothing. we currently don't have an
    *    acceptable solution to merging arrays with arbitrary mutations.
    *    following rule #1, we opt to *replace* any previous values with the
    *    latest version of the array. if you have thoughts on this, please open
    *    a ticket on [GitLab](https://gitlab.com/citygro/vdata/issues).
    *
    * @param {String} collection
    * @param {Object} data
    * @return {Object}
    */
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
    var object = base || current ? rebase(base, current, record) : record;
    return object;
  };
  /**
    * add a record to the store. you *do not* need to pass your data to
    * `Store#createRecord` before adding it.
    *
    * @emits Store#add
    * @see {Store.rebase}
    * @param {String} collection
    * @param {Object} data
    * @param {Object} options
    * @param {Boolean} [options.quiet=false] silence store events for this invocation
    * @return {Object}
    */
  Store.prototype.add = function (collectionName, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var record = this.createRecord(collectionName, data);
    var latest = convert(record);

    var _getMeta3 = getMeta(collectionName, latest),
        id = _getMeta3.id;

    var versions = store.getIn([collectionName, id], immutable.Stack());
    store = store.setIn([collectionName, id], versions.unshift(latest));
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
    * add all of the records in `data` to `colectionName` in a single operation.
    *
    * @emits Store#add-list
    * @param {String} collectionName
    * @param {Array<Object>} data
    * @return {Array<Object>}
    */
  Store.prototype.addList = function (collectionName, data) {
    var _this4 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var records = data.map(function (item) {
      return _this4.add(collectionName, item, { quiet: true });
    });
    emit({
      collectionName: collectionName,
      event: 'add-list',
      records: records
    }, {
      quiet: options.quiet
    });
    return records;
  };
  /**
    * check if `data` differs from the current version of the corresponding
    * record in the store.
    *
    * @param {String} collectionName
    * @param {Object} data
    * @return {Boolean}
    */
  Store.prototype.hasChanges = function (collectionName, data) {
    if (!data) {
      return false;
    } else {
      var _getMeta4 = getMeta(collectionName, data),
          id = _getMeta4.id;

      var record = this.get(collectionName, id) || {};
      return record.__sym_id === data.__sym_id ? fastDiff(record, data) : false;
    }
  };
  /**
    * send a `DELETE` request to the endpoint configured for `collectionName`
    * and remove the corresponding record from the store.
    *
    * @async
    * @emits Store#remove
    * @param {String} collectionName
    * @param {Object} data
    * @param {Object} options
    * @return {Promise<Object>}
    */
  Store.prototype.destroy = function (collectionName, data) {
    var _this5 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _getMeta5 = getMeta(collectionName, data),
        id = _getMeta5.id,
        pk = _getMeta5.pk,
        basePath = _getMeta5.basePath;

    return http(_extends({
      url: basePath + '/' + collectionName + '/' + pk,
      method: 'DELETE'
    }, options)).then(function () {
      return microTask(function () {
        return _this5.remove(collectionName, id);
      });
    });
  };
  /**
    * persist `data` using the endpoint configured for `collectonName`. if
    * `data` is *only* identified by a local temporary id send a `POST` request to
    * `/:basePath/:collectionName`. if `data` has a primary key send a `PUT`
    * request to `/:basePath/:collectionName/:primaryKey`
    *
    * when updating an existing record, this methods calls Store#rebase.
    * this gives vdata some important super-powers that you can use to build
    * real-time applications. check the method's docs for details.
    *
    * @async
    * @emits Store#add
    * @param {String} collection
    * @param {Object} data
    * @param {Object} options
    * @return {Promise<Object>}
    */
  Store.prototype.save = function (collectionName, data) {
    var _this6 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _getMeta6 = getMeta(collectionName, data),
        id = _getMeta6.id,
        pk = _getMeta6.pk,
        basePath = _getMeta6.basePath;

    var promise = void 0;
    var request = _extends({}, options);
    if (this.isValidId(pk)) {
      request.method = 'PUT';
      promise = http(_extends({}, request, {
        url: basePath + '/' + collectionName + '/' + pk,
        method: 'PUT',
        body: _extends({}, this.rebase(collectionName, data), {
          __tmp_id: undefined,
          __sym_id: undefined
        })
      }));
    } else {
      promise = http(_extends({}, request, {
        url: basePath + '/' + collectionName,
        method: 'POST',
        body: _extends({}, data, {
          __tmp_id: undefined,
          __sym_id: undefined
        })
      }));
    }
    return promise.then(function (data) {
      var object = id ? _extends({}, data, { __tmp_id: id }) : data;
      return microTask(function () {
        return _this6.add(collectionName, object);
      });
    });
  };
  /**
    * fetch a particular record from `/:basePath/:collectionName/:primaryKey`.
    * if `force === false` immediately return the cached record if present.
    *
    * @async
    * @param {String} collection
    * @param {Object} [query]
    * @param {Object} [options]
    * @param {Boolean} [options.force=false]
    * @return {Promise<Object>}
    */
  Store.prototype.find = function (collectionName, id) {
    var _this7 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var promise = void 0;
    var force = options.force || false;
    var data = this.get(collectionName, id);
    if (!this.isValidId(id)) {
      promise = Promise.resolve(null);
    } else if (!data || force === true) {
      var pk = resolvePk(collectionName, id);
      var basePath = this.getBasePath(collectionName);
      var request = _extends({
        url: basePath + '/' + collectionName + '/' + pk,
        method: 'GET'
      }, options);
      promise = http(request).then(function (data) {
        return microTask(function () {
          return _this7.add(collectionName, data);
        });
      });
    } else {
      promise = Promise.resolve(data);
    }
    return promise;
  };
  /**
    * fetch all of the records from the api that match the parameters specified
    * in `query`. these are sent along with the request as query parameters.
    * if `force === false` immediately return a cached response if one exists.
    *
    * @async
    * @param {String} collection
    * @param {Object} [query]
    * @param {Object} [options]
    * @return {Promise<Array<Object>>}
    */
  Store.prototype.findAll = function (collectionName, query) {
    var _this8 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var promise = void 0;
    var force = options.force || false;
    var basePath = this.getBasePath(collectionName);
    var key = makeQueryKey(collectionName, query);
    var cachedKeys = queryCache[key];
    var data = this.getAll(collectionName, cachedKeys);
    if (!data.length || force === true) {
      var request = _extends({
        url: basePath + '/' + collectionName,
        method: 'GET',
        params: query
      }, options);
      promise = http(request).then(function (result) {
        return microTask(function () {
          var resultKeys = [];
          var records = result.map(function (data) {
            var record = _this8.createRecord(collectionName, data);

            var _getMeta7 = getMeta(collectionName, record),
                id = _getMeta7.id;

            resultKeys.push(id);
            return record;
          });
          queryCache[key] = resultKeys;
          setTimeout(function () {
            delete queryCache[key];
          }, queryCacheTimeout);
          return _this8.addList(collectionName, records);
        });
      });
    } else {
      promise = Promise.resolve(data);
    }
    return promise;
  };
  /**
    * bind an event listener to the store
    *
    * @param {String} event
    * @param {function} handler
    */
  Store.prototype.on = function (event, handler) {
    evt.addListener(event, handler);
  };
  /**
    * unbind an event listener to the store
    *
    * @param {String} event
    * @param {function} handler
    */
  Store.prototype.off = function (event, handler) {
    evt.removeListener(event, handler);
  };
  /**
    * manually emit a message using the store's event bus
    *
    * @param {String} event
    * @param {*} payload
    */
  Store.prototype.emit = function (event, payload) {
    microTask(function () {
      return evt.emit(event, payload);
    });
  };
  /**
    * get the base path for `collectionName`
    *
    * @param {String} collectionName
    * @return {String}
    */
  Store.prototype.getBasePath = function (collectionName) {
    return getBasePath(collectionName);
  };
  /**
    * check if the given value is a valid id
    *
    * @param {*} id
    * @return {Boolean}
    */
  Store.prototype.isValidId = function (id) {
    return id !== null && id !== undefined && id !== '';
  };
  return new Store();
};

var hasVdata = function hasVdata(o) {
  return !!get$1(o, '$options.vdata');
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
    options = isFunction(options) ? options(Vue) : options;
    var store = createStore(options);
    Object.defineProperty(Vue, '$store', {
      get: function get$1() {
        return store;
      }
    });
    Object.defineProperty(Vue.prototype, '$store', {
      get: function get$1() {
        return store;
      }
    });
    var vmHandler = createHandler(Vue, store);
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
          this._vdataHandler = vmHandler.add(this);
        }
      },
      beforeDestroy: function beforeDestroy() {
        if (hasVdata(this)) {
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

var DataFlowMixin = createDataFlowMixin('value');

var createMixinForItemByResourceAndId = function createMixinForItemByResourceAndId(options) {
  console.warn('[@citygro/vdata] rename createMixinForItemByResourceAndId -> createMixinForItemById', '"createMixinForItemByResourceAndId" is DEPRECATED and will be removed in a future release');
  return createMixinForItemById(options);
};

exports.DataFlowMixin = DataFlowMixin;
exports.asyncMap = _r14c_asyncUtils_map;
exports.cleanRecord = cleanRecord$1;
exports.createDataFlowMixin = createDataFlowMixin;
exports.createHttpAdapter = createHttpAdapter;
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
