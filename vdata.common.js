'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var each = _interopDefault(require('lodash/fp/each'));
var equals = _interopDefault(require('lodash/fp/equals'));
var flow = _interopDefault(require('lodash/fp/flow'));
var entries = _interopDefault(require('lodash/fp/entries'));
var map = _interopDefault(require('lodash/fp/map'));
var fromPairs = _interopDefault(require('lodash/fp/fromPairs'));

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
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

var vdata = function (store) {
  return {
    install: function install(Vue) {
      Vue.prototype.$store = store;
      Vue.mixin({
        /**
         * bind the store to your vue container.
         *
         * if `$options.map(state)` is defined, initialize the components `$state` property. listen for changes on the
         * store and trigger an update if a change occurred.
         *
         * if `$options.actions` is defined, take the map of action creators and bind them to dispatch. the bound
         * actions are attached to `$actions`.
         */
        beforeCreate: function beforeCreate() {
          var _this = this;

          if (this.$options.query) {
            (function () {
              _this.$qs = _this.$options.query(store);
              var handler = function handler() {
                var q = _this.$options.query(store);
                Promise.all(flow(entries, map(function (_ref) {
                  var _ref2 = slicedToArray(_ref, 2),
                      k = _ref2[0],
                      v = _ref2[1];

                  return v ? v : new Promise.resolve(v);
                }))(q)).then(flow(entries, map(function (_ref3) {
                  var _ref4 = slicedToArray(_ref3, 2),
                      i = _ref4[0],
                      value = _ref4[1];

                  return [q[i], value];
                }), fromPairs, function (qs) {
                  if (!equals(qs)(_this.$qs)) {
                    _this.$qs = qs;
                    _this.$forceUpdate();
                    each(function (child) {
                      return setTimeout(function () {
                        return child.$forceUpdate();
                      }, 0);
                    })(_this.$children);
                  }
                }));
              };
              store.on('change', handler);
              _this._unsubscribe = function () {
                store.off('change', handler);
              };
            })();
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (this._unsubscribe) {
            this._unsubscribe();
          }
        }
      });
    }
  };
};

module.exports = vdata;
