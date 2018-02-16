'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Any = _interopDefault(require('p-any'));
var isFunction = _interopDefault(require('lodash/isFunction'));
var keys = _interopDefault(require('lodash/keys'));
var assign = _interopDefault(require('lodash/assign'));
var get = _interopDefault(require('lodash/get'));
var isEmpty = _interopDefault(require('lodash/isEmpty'));
var defaults = _interopDefault(require('lodash/defaults'));
var entries = _interopDefault(require('lodash/entries'));
var stringify = _interopDefault(require('json-stable-stringify'));
var jsData = require('js-data');
var camelCase = _interopDefault(require('lodash/camelCase'));
var concat = _interopDefault(require('lodash/concat'));
var join = _interopDefault(require('lodash/join'));
var tail = _interopDefault(require('lodash/tail'));

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
 * @param {object} options
 * @param {string} options.collectionName
 * @param {string} options.idPropertyName
 * @param {string} options.localPropertyName
 * @param {object} options.requestOptions
 */
var createMixinForItemByResourceAndId = function (options) {
  var collectionName = options.collectionName;
  var idPropertyName = options.idPropertyName || 'id';
  var localPropertyName = options.localPropertyName || collectionName.slice(0, -1);
  var localPropertyForceName = localPropertyName + 'Force';
  var idType = options.idType || String;
  var requestOptions = options.requestOptions || {};

  return {
    props: defineProperty({}, idPropertyName, {
      type: idType,
      default: null
    }),
    data: function data() {
      var _ref;

      return _ref = {}, defineProperty(_ref, localPropertyName, null), defineProperty(_ref, localPropertyForceName, false), _ref;
    },
    vdata: function vdata(event) {
      if (!this.asyncLoading && this[idPropertyName] && event.collectionName === collectionName) {
        this[localPropertyName] = this.$store.get(collectionName, this[idPropertyName]) || null;
      }
    },

    asyncData: defineProperty({}, localPropertyName, function () {
      var _this = this;

      return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var force, err, result, _ref2, _ref3;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                force = _this[localPropertyForceName];
                err = void 0, result = void 0;

                if (!_this[idPropertyName]) {
                  _context.next = 13;
                  break;
                }

                if (!force) {
                  result = _this.$store.get(collectionName, _this[idPropertyName]);
                }

                if (result) {
                  _context.next = 11;
                  break;
                }

                _context.next = 7;
                return to(_this.$store.find(collectionName, _this[idPropertyName], _extends({}, requestOptions, {
                  force: force
                })));

              case 7:
                _ref2 = _context.sent;
                _ref3 = slicedToArray(_ref2, 2);
                err = _ref3[0];
                result = _ref3[1];

              case 11:
                _context.next = 14;
                break;

              case 13:
                result = _this.$store.createRecord(collectionName);

              case 14:
                if (err) {
                  console.error(err);
                  result = null;
                }
                return _context.abrupt('return', result);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }),
    watch: defineProperty({}, idPropertyName, function () {
      this.$asyncReload(localPropertyName);
    })
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
  var localPropertyName = options.localPropertyName || collectionName;
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
  var options = get(vm, '$options.' + prop, {});
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
  }.bind(thisArg);
};

var AsyncDataMixin = {
  created: function created() {
    this._asyncReload = createAsyncReload(this);
    this.$asyncReload(undefined, true);
  },

  methods: {
    $asyncReload: function $asyncReload() {
      if (isFunction(this._asyncReload)) {
        this._asyncReload.apply(this, arguments);
      } else {
        console.info('[@citygro/vdata<' + this._uid + '>] vm.asyncReload is not available until the component is created!');
      }
    }
  },
  data: function data() {
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
 * takes variable arguments depending on the event type that is emmitted by js-data.
 *
 * @see {@link http://api.js-data.io/js-data/3.0.1/SimpleStore.html#toc85__anchor}
 */
var createObjectFromEventData = function () {
  var data = {
    event: arguments[0],
    collectionName: arguments[1]
  };
  switch (data.event) {
    case 'add':
      // name, data, opts
      data.data = arguments[2];
      data.opts = arguments[3];
      break;
    case 'change':
      data.record = arguments[2];
      data.changes = arguments[3];
      break;
    case 'remove':
      data.record = arguments[2];
      break;
    case 'afterCreate':
      // props, opts, result
      data.props = arguments[2];
      data.opts = arguments[3];
      data.result = arguments[4];
      break;
    case 'beforeDestroy':
      // id, opts
      data.id = arguments[2];
      data.opts = arguments[3];
      break;
    case 'beforeFind':
      // id, opts
      data.id = arguments[2];
      data.opts = arguments[3];
      break;
    case 'afterDestroy':
      // id, opts, result
      data.id = arguments[2];
      data.opts = arguments[3];
      data.result = arguments[4];
      break;
    case 'afterFind':
      // id, opts, result
      data.id = arguments[2];
      data.opts = arguments[3];
      data.result = arguments[4];
      break;
    case 'afterDestroyAll':
      // data, query, opts, result
      data.data = arguments[2];
      data.query = arguments[3];
      data.opts = arguments[4];
      data.result = arguments[5];
      break;
    case 'afterFindAll':
      // query, opts, result
      data.query = arguments[2];
      data.opts = arguments[3];
      data.result = arguments[4];
      break;
    case 'afterUpdate':
      // id, props, opts, result
      data.id = arguments[2];
      data.props = arguments[3];
      data.opts = arguments[4];
      data.result = arguments[5];
      break;
    case 'beforeUpdate':
      // id, props, opts
      data.id = arguments[2];
      data.props = arguments[3];
      data.opts = arguments[4];
      break;
    case 'beforeUpdateAll':
      // props, query, opts
      data.props = arguments[2];
      data.query = arguments[3];
      data.opts = arguments[4];
      break;
    case 'afterUpdateAll':
      // props, query, opts, result
      data.props = arguments[2];
      data.query = arguments[3];
      data.opts = arguments[4];
      data.result = arguments[5];
      break;
    case 'afterUpdateMany':
      // records, opts, result
      data.records = arguments[2];
      data.opts = arguments[3];
      data.result = arguments[4];
      break;
    case 'afterCreateMany':
      // records, opts, result
      data.records = arguments[2];
      data.opts = arguments[3];
      data.result = arguments[4];
      break;
    case 'beforeCreateMany':
      // records, opts
      data.records = arguments[2];
      data.opts = arguments[3];
      break;
    case 'beforeUpdateMany':
      // records, opts
      data.records = arguments[2];
      data.opts = arguments[3];
      break;
    case 'beforeCreate':
      // query, opts
      data.query = arguments[2];
      data.opts = arguments[3];
      break;
    case 'beforeDestroyAll':
      // query, opts
      data.query = arguments[2];
      data.opts = arguments[3];
      break;
    case 'beforeFindAll':
      // query, opts
      data.query = arguments[2];
      data.opts = arguments[3];
      break;
  }
  return data;
};

var includes = function includes() {
  var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var item = arguments[1];

  return collection.indexOf(item) >= 0;
};

var handlers = {};

/**
 * inject handler that will run on datastore events
 *
 * DANGER: mutates vm
 *
 * @param {Vue} vm
 * @param {string} label
 * @param {string[]} events
 * @param {function} fn
 */
var createHandler = (function (vm, events) {
  handlers[vm._uid] = flattenMixinTree(vm.$options.mixins).filter(function (mixin) {
    return !!mixin.vdata;
  }).map(function (mixin) {
    return mixin.vdata;
  });
  if (vm.$options.vdata) {
    handlers[vm._uid].push(vm.$options.vdata);
  }
  if (process.env.NODE_ENV !== 'test') {
    console.log('[@citygro/vdata<' + vm._uid + '>] ready. listening on', events);
  }
  return {
    run: function run(message) {
      if (includes(events, message.event) || message.event === '$vdata-call') {
        handlers[vm._uid].forEach(function (fn) {
          setTimeout(function () {
            return fn.apply(vm, [message]);
          }, 0);
        });
      }
    },
    destroy: function destroy() {
      delete handlers[vm._uid];
    }
  };
});

var deepClone = function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};

var Record = {
  create: function create(jsDataRecord) {
    var Record = function Record(record) {
      Object.assign(this, deepClone(_extends({}, record.toJSON(), _extends({}, record))));
    };
    Record.prototype._collection = jsDataRecord._mapper().name;
    return new Record(jsDataRecord);
  }
};

var registerAdapters = function ($store, adapters) {
  var adaptersMap = entries(adapters);
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

var registerSchemas = function ($store) {
  var modelMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isEmpty(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!');
  }
  entries(modelMap).forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        modelName = _ref2[0],
        schema = _ref2[1];

    return $store.defineMapper(modelName, schema);
  });
};

var Store = {
  /**
   * @param {object} options
   * @param {object} options.models
   * @param {object} options.adapters
   */
  create: function create(options) {
    var store = new jsData.DataStore();
    /**
     * @param {DataStore} store
     * @constructor
     */
    var Store = function Store(store, options) {
      registerSchemas(store, options.models);
      registerAdapters(store, options.adapters);
      this.models = options.models;
    };
    /**
     * @param {string} collection
     * @param {string} id
     * @param {object} data
     */
    Store.prototype.hasChanges = function (collection, id, data) {
      if (id) {
        var record = this.get(collection, id);
        var a = stringify(record);
        var b = stringify(data);
        return a !== b;
      } else {
        return true;
      }
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.commit = function (collection, data, options) {
      var record = store.createRecord(collection, data);
      return record.commit(options);
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
    Store.prototype.destroy = function (collection, data, options) {
      var record = store.createRecord(collection, data);
      return record.destroy(options);
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.revert = function (collection, data, options) {
      var record = store.createRecord(collection, data);
      return record.revert(options);
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
    Store.prototype.save = function (collection, data, options) {
      var record = store.createRecord(collection, data);
      return record.save(options).then(Record.create);
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
    Store.prototype.add = function (collection, data, options) {
      store.add(collection, data, options);
    };
    /**
     * @param {string} collection
     * @param {string} id
     * @param {object} options
     */
    Store.prototype.remove = function (collection, id, options) {
      store.remove(collection, id, options);
    };
    /**
     * @param {string} collection
     * @param {object} query
     * @param {object} options
     */
    Store.prototype.removeAll = function (collection, query, options) {
      store.removeAll(collection, query, options);
    };
    /**
     * @param {string} collection
     * @param {object} data
     * @async
     */
    Store.prototype.create = function (collection, data) {
      return store.create(collection, data).then(Record.create);
    };
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
    Store.prototype.find = function (collection, id) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (id) {
        return store.find(collection, id, options).then(function (result) {
          return result === undefined || options.raw === true ? result : Record.create(result);
        });
      } else {
        return Promise.resolve();
      }
    };
    /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
    Store.prototype.findAll = function (collection, query) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var result = store.findAll(collection, query, options);
      return options.raw === true ? result : result.then(function (records) {
        return records.map(Record.create);
      });
    };
    /**
     * @param {string} collection
     * @param {object} data
     */
    Store.prototype.createRecord = function (collection, data) {
      var record = store.createRecord(collection, data);
      return Record.create(record);
    };
    /**
     * @param {string} collection
     * @param {string} id
     */
    Store.prototype.get = function (collection, id) {
      var record = store.get(collection, id);
      if (record) {
        return Record.create(record);
      }
    };
    /**
     * @param {string} collection
     * @param {string[]} [keys]
     */
    Store.prototype.getAll = function (collection, keys$$1) {
      var _this = this;

      return keys$$1 ? keys$$1.map(function (key) {
        return _this.get(collection, key);
      }) : store.getAll(collection);
    };
    /**
     *
     */
    Store.prototype.clear = function () {
      store.clear();
    };
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.on = function (event, handler) {
      store.on(event, handler);
    };
    /**
     * @param {string} event
     * @param {function} handler
     */
    Store.prototype.off = function (event, handler) {
      store.off(event, handler);
    };
    return new Store(store, options);
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
      var options = fn(V);
      return defaults(options || {}, {
        events: ['add', 'change', 'remove', 'afterDestroy', 'vm-created']
      });
    };
  },
  install: function install(Vue, options) {
    options = isFunction(options) ? options(Vue) : options;
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
    if (process.env.NODE_ENV !== 'test') {
      console.log('[@citygro/vdata] $store ready!', store);
    }
    Vue.mixin({
      methods: {
        $vdata: function $vdata() {
          if (hasVdata(this)) {
            this._vdataHandler.run(createObjectFromEventData.apply(undefined, arguments));
          }
        }
      },
      beforeCreate: function beforeCreate() {
        if (hasVdata(this)) {
          this._vdataHandler = createHandler(this, options.events);
        }
      },
      created: function created() {
        this.$vdata('vm-created');
        this.$store.on('all', this.$vdata);
      },
      beforeDestroy: function beforeDestroy() {
        if (hasVdata(this)) {
          store.off('all', this.$vdata);
          this._vdataHandler.destroy();
        }
      }
    });
    Vue.mixin(AsyncDataMixin);
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

exports.DataFlowMixin = DataFlowMixin;
exports.Record = Record;
exports.createIndex = createIndex;
exports.createMixinForItemByResourceAndId = createMixinForItemByResourceAndId;
exports.createMixinForListByResource = createMixinForListByResource;
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
