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
var throttle = _interopDefault(require('lodash/throttle'));
var isPlainObject = _interopDefault(require('lodash/isPlainObject'));
var Q = _interopDefault(require('q'));
var property = _interopDefault(require('lodash/fp/property'));

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

var forceUpdate = each(function (child) {
  return setTimeout(function () {
    child.$forceUpdate();
    forceUpdate(child.$children);
  }, 0);
});

var changeEvents = ['add', 'change', 'remove'];

var vdata = function (store) {
  return {
    install: function install(Vue, options) {
      Vue.prototype.$store = store;
      if (!options || options.wait === undefined) {
        options = { wait: 150 };
      }
      var wait = options.wait;
      Vue.mixin({
        /**
         * bind the store to your vue container.
         *
         * if `$options.query()` is defined, initialize the components `$q` and `$qs` properties.
         * listen for changes on the store and trigger an update if a change occurred.
         *
         * `$q` is the return value of `$options.query()`
         * `$qs` is automatically populated with the resolved values of `$q`
         * `$qLoading` is true whenever queries are being resolved
         *
         */
        beforeCreate: function beforeCreate() {
          var _this = this;

          if (this.$options.query) {
            (function () {
              var self = _this;
              var force = true;
              Vue.util.defineReactive(_this, '$q', {});
              Vue.util.defineReactive(_this, '$qLoading', false);
              Vue.util.defineReactive(_this, '$qActivity', false);
              Vue.util.defineReactive(_this, '$qs', {});
              var createQuery = flow(
              /**
               * create a new query object
               */
              function (_ref) {
                var store = _ref.store,
                    force = _ref.force;

                var query = _this.$options.query.bind(self);
                return query(store, force);
              },
              /**
               * create placeholder fields for queries
               */
              function (q) {
                _this.$q = q;
                if (!keys(_this.$qs).length) {
                  _this.$qs = flow(entries, map(function (_ref2) {
                    var _ref3 = slicedToArray(_ref2, 2),
                        field = _ref3[0],
                        query = _ref3[1];

                    return isPlainObject(query) && query.type ? [field, query.default] : [field, []];
                  }), fromPairs)(q);
                }
                return q;
              }, entries,
              /**
               * ensure that all queries are promises
               */
              map(function (_ref4) {
                var _ref5 = slicedToArray(_ref4, 2),
                    field = _ref5[0],
                    query = _ref5[1];

                return isPlainObject(query) && query.value ? Q(query.value) : Q(query);
              }), Q.all);
              _this.$vdata = throttle(function () {
                _this.$qLoading = force;
                _this.$qActivity = true;
                createQuery({ store: store, force: force }).then(flow(
                /**
                 * remap resolved values to keys
                 */
                function (q) {
                  var fields = keys(_this.$qs);
                  var remap = flow(entries, map(function (_ref6) {
                    var _ref7 = slicedToArray(_ref6, 2),
                        i = _ref7[0],
                        value = _ref7[1];

                    return [fields[i], value];
                  }));
                  return remap(q);
                }, fromPairs,
                /**
                 * inject resolved query data into component, update component subtree
                 */
                function (qs) {
                  if (!equals(qs)(_this.$qs)) {
                    console.log('$vdata: (previous)', _this.$qs);
                    console.log('$vdata: (next)', qs);
                    _this.$qs = qs;
                    _this.$forceUpdate();
                    forceUpdate(_this.$children);
                  }
                  _this.$qLoading = force = false;
                  _this.$qActivity = false;
                })).catch(console.log);
              }, wait, { leading: true });
              map(function (event) {
                return store.on(event, _this.$vdata);
              })(changeEvents);
              console.log('$vdata: ready. updates are throttled to one every ' + wait + 'ms');
            })();
          }
        },
        created: function created() {
          if (this.$vdata) {
            this.$vdata();
          }
        },
        beforeUpdate: function beforeUpdate() {
          if (this.$vdata) {
            this.$vdata();
          }
        },
        beforeDestroy: function beforeDestroy() {
          var _this2 = this;

          if (this.$vdata) {
            map(function (event) {
              return store.off(event, _this2.$vdata);
            })(changeEvents);
            setTimeout(function () {
              delete _this2.$q;
              delete _this2.$qs;
              delete _this2.$qLoading;
              delete _this2.$vdata;
            }, 0);
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
