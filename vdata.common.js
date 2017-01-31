'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var each = _interopDefault(require('lodash/fp/each'));
var equals = _interopDefault(require('lodash/fp/equals'));
var flow = _interopDefault(require('lodash/fp/flow'));
var entries = _interopDefault(require('lodash/fp/entries'));
var map = _interopDefault(require('lodash/fp/map'));
var fromPairs = _interopDefault(require('lodash/fp/fromPairs'));
var keys = _interopDefault(require('lodash/fp/keys'));
var property = _interopDefault(require('lodash/fp/property'));
var Q = _interopDefault(require('q'));

var get = function get(object, property$$1, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property$$1);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property$$1, receiver);
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

















var set = function set(object, property$$1, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property$$1);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property$$1, value, receiver);
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

var mapToPromises = flow(entries, map(function (_ref) {
  var _ref2 = slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  return Q.resolve(v);
}));
var fakeValues = flow(map(function (field) {
  return [field, {}];
}), fromPairs);

var vdata = function (store) {
  return {
    install: function install(Vue) {
      Vue.prototype.$store = store;
      Vue.mixin({
        /**
         * bind the store to your vue container.
         *
         * if `$options.query()` is defined, initialize the components `$q` and `$q` properties.
         * listen for changes on the store and trigger an update if a change occurred.
         *
         * `$q` is the return value of `$options.query()`
         * `$qs` is automatically populated with the resolved values of `$q`
         *
         */
        beforeCreate: function beforeCreate() {
          var _this = this;

          if (this.$options.query) {
            this.$q = {};
            this.$qs = {};
            this.$qLoading = false;
            this.$vdata = function () {
              _this.$q = _this.$options.query(store);
              _this.$qLoading = true;
              var fields = keys(_this.$q);
              _this.$qs = fakeValues(fields);
              Q.all(mapToPromises(_this.$q)).then(flow(entries, map(function (_ref3) {
                var _ref4 = slicedToArray(_ref3, 2),
                    i = _ref4[0],
                    value = _ref4[1];

                return [fields[i], value];
              }), fromPairs, function (qs) {
                if (!equals(qs)(_this.$qs)) {
                  _this.$qs = qs;
                  _this.$forceUpdate();
                  _this.$qLoading = false;
                  each(function (child) {
                    return setTimeout(function () {
                      return child.$forceUpdate();
                    }, 0);
                  })(_this.$children);
                }
              })).catch(console.log);
            };
          }
        },
        beforeMount: function beforeMount() {
          if (this.$vdata) {
            this.$vdata();
            store.on('change', this.$vdata);
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (this.$vdata) {
            store.off('change', this.$vdata);
          }
        }
      });
    }
  };
};

/**
 * @param {string} prop - dotted path to prop
 * @param {object} on - the object we are polling
 */
var waitFor = function waitFor(prop, o) {
  return Q.Promise(function (resolve, reject, notify) {
    (function poll() {
      if (o) {
        var value = property(prop)(o);
        if (value) {
          resolve(value);
        } else {
          notify(value);
          setTimeout(poll, 30);
        }
      } else {
        reject(new Error('target object is \'' + o + '\''));
      }
    })();
  });
};

exports.vdata = vdata;
exports.waitFor = waitFor;
