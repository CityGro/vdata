'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*!
* js-data
* @version 3.0.1 - Homepage <http://www.js-data.io/>
* @author js-data project authors
* @copyright (c) 2014-2016 js-data project authors
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview js-data is a framework-agnostic, datastore-agnostic ORM/ODM for Node.js and the Browser.
*/
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



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Utility methods used by JSData.
 *
 * @example
 * import {utils} from 'js-data'
 * console.log(utils.isString('foo')) // true
 *
 * @namespace utils
 * @type {Object}
 */

var DOMAIN = 'utils';

var INFINITY = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;
var BOOL_TAG = '[object Boolean]';
var DATE_TAG = '[object Date]';
var FUNC_TAG = '[object Function]';
var NUMBER_TAG = '[object Number]';
var OBJECT_TAG = '[object Object]';
var REGEXP_TAG = '[object RegExp]';
var STRING_TAG = '[object String]';
var objToString = Object.prototype.toString;
var PATH = /^(.+)\.(.+)$/;

var ERRORS = {
  '400': function _() {
    return 'expected: ' + arguments[0] + ', found: ' + (arguments[2] ? arguments[1] : _typeof(arguments[1]));
  },
  '404': function _() {
    return arguments[0] + ' not found';
  }
};

var toInteger = function toInteger(value) {
  if (!value) {
    return 0;
  }
  // Coerce to number
  value = +value;
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? remainder ? value - remainder : value : 0; // eslint-disable-line
};

var toStr = function toStr(value) {
  return objToString.call(value);
};

var isPlainObject = function isPlainObject(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object;
};

var mkdirP = function mkdirP(object, path) {
  if (!path) {
    return object;
  }
  var parts = path.split('.');
  parts.forEach(function (key) {
    if (!object[key]) {
      object[key] = {};
    }
    object = object[key];
  });
  return object;
};

var utils = {
  /**
   * Reference to the Promise constructor used by JSData. Defaults to
   * `window.Promise` or `global.Promise`.
   *
   * @example <caption>Make JSData use a different `Promise` constructor</caption>
   * import Promise from 'bluebird'
   * import {utils} from 'js-data'
   * utils.Promise = Promise
   *
   * @name utils.Promise
   * @since 3.0.0
   * @type {Function}
   */
  Promise: Promise,

  /**
   * Shallow copy properties that meet the following criteria from `src` to
   * `dest`:
   *
   * - own enumerable
   * - not a function
   * - does not start with "_"
   *
   * @method utils._
   * @param {Object} dest Destination object.
   * @param {Object} src Source object.
   * @private
   * @since 3.0.0
   */
  _: function _(dest, src) {
    utils.forOwn(src, function (value, key) {
      if (key && dest[key] === undefined && !utils.isFunction(value) && key.indexOf('_') !== 0) {
        dest[key] = value;
      }
    });
  },


  /**
   * Recursively iterates over relations found in `opts.with`.
   *
   * @method utils._forRelation
   * @param {Object} opts Configuration options.
   * @param {Relation} def Relation definition.
   * @param {Function} fn Callback function.
   * @param {*} [thisArg] Execution context for the callback function.
   * @private
   * @since 3.0.0
   */
  _forRelation: function _forRelation(opts, def, fn, thisArg) {
    var relationName = def.relation;
    var containedName = null;
    var index = void 0;
    opts || (opts = {});
    opts.with || (opts.with = []);

    if ((index = utils._getIndex(opts.with, relationName)) >= 0) {
      containedName = relationName;
    } else if ((index = utils._getIndex(opts.with, def.localField)) >= 0) {
      containedName = def.localField;
    }

    if (opts.withAll) {
      fn.call(thisArg, def, {});
      return;
    } else if (!containedName) {
      return;
    }
    var optsCopy = {};
    utils.fillIn(optsCopy, def.getRelation());
    utils.fillIn(optsCopy, opts);
    optsCopy.with = opts.with.slice();
    optsCopy._activeWith = optsCopy.with.splice(index, 1)[0];
    optsCopy.with.forEach(function (relation, i) {
      if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
        optsCopy.with[i] = relation.substr(containedName.length + 1);
      } else {
        optsCopy.with[i] = '';
      }
    });
    fn.call(thisArg, def, optsCopy);
  },


  /**
   * Find the index of a relation in the given list
   *
   * @method utils._getIndex
   * @param {string[]} list List to search.
   * @param {string} relation Relation to find.
   * @private
   * @returns {number}
   */
  _getIndex: function _getIndex(list, relation) {
    var index = -1;
    list.forEach(function (_relation, i) {
      if (_relation === relation) {
        index = i;
        return false;
      } else if (utils.isObject(_relation)) {
        if (_relation.relation === relation) {
          index = i;
          return false;
        }
      }
    });
    return index;
  },


  /**
   * Define hidden (non-enumerable), writable properties on `target` from the
   * provided `props`.
   *
   * @example
   * import {utils} from 'js-data'
   * function Cat () {}
   * utils.addHiddenPropsToTarget(Cat.prototype, {
   *   say () {
   *     console.log('meow')
   *   }
   * })
   * const cat = new Cat()
   * cat.say() // "meow"
   *
   * @method utils.addHiddenPropsToTarget
   * @param {Object} target That to which `props` should be added.
   * @param {Object} props Properties to be added to `target`.
   * @since 3.0.0
   */
  addHiddenPropsToTarget: function addHiddenPropsToTarget(target, props) {
    var map = {};
    Object.keys(props).forEach(function (propName) {
      var descriptor = Object.getOwnPropertyDescriptor(props, propName);

      descriptor.enumerable = false;
      map[propName] = descriptor;
    });
    Object.defineProperties(target, map);
  },


  /**
   * Return whether the two objects are deeply different.
   *
   * @example
   * import {utils} from 'js-data'
   * utils.areDifferent({}, {}) // false
   * utils.areDifferent({ a: 1 }, { a: 1 }) // false
   * utils.areDifferent({ foo: 'bar' }, {}) // true
   *
   * @method utils.areDifferent
   * @param {Object} a Base object.
   * @param {Object} b Comparison object.
   * @param {Object} [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {boolean} Whether the two objects are deeply different.
   * @see utils.diffObjects
   * @since 3.0.0
   */
  areDifferent: function areDifferent(newObject, oldObject, opts) {
    opts || (opts = {});
    var diff = utils.diffObjects(newObject, oldObject, opts);
    var diffCount = Object.keys(diff.added).length + Object.keys(diff.removed).length + Object.keys(diff.changed).length;
    return diffCount > 0;
  },


  /**
   * Verified that the given constructor is being invoked via `new`, as opposed
   * to just being called like a normal function.
   *
   * @example
   * import {utils} from 'js-data'
   * function Cat () {
   *   utils.classCallCheck(this, Cat)
   * }
   * const cat = new Cat() // this is ok
   * Cat() // this throws an error
   *
   * @method utils.classCallCheck
   * @param {*} instance Instance that is being constructed.
   * @param {Constructor} ctor Constructor function used to construct the
   * instance.
   * @since 3.0.0
   * @throws {Error} Throws an error if the constructor is being improperly
   * invoked.
   */
  classCallCheck: function classCallCheck$$1(instance, ctor) {
    if (!(instance instanceof ctor)) {
      throw utils.err('' + ctor.name)(500, 'Cannot call a class as a function');
    }
  },


  /**
   * Deep copy a value.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' } }
   * const b = utils.copy(a)
   * a === b // false
   * utils.areDifferent(a, b) // false
   *
   * @param {*} from Value to deep copy.
   * @param {*} [to] Destination object for the copy operation.
   * @param {*} [stackFrom] For internal use.
   * @param {*} [stackTo] For internal use.
   * @param {string[]|RegExp[]} [blacklist] List of strings or RegExp of
   * properties to skip.
   * @param {boolean} [plain] Whether to make a plain copy (don't try to use
   * original prototype).
   * @returns {*} Deep copy of `from`.
   * @since 3.0.0
   */
  copy: function copy(from, to, stackFrom, stackTo, blacklist, plain) {
    if (!to) {
      to = from;
      if (from) {
        if (utils.isArray(from)) {
          to = utils.copy(from, [], stackFrom, stackTo, blacklist, plain);
        } else if (utils.isDate(from)) {
          to = new Date(from.getTime());
        } else if (utils.isRegExp(from)) {
          to = new RegExp(from.source, from.toString().match(/[^/]*$/)[0]);
          to.lastIndex = from.lastIndex;
        } else if (utils.isObject(from)) {
          if (plain) {
            to = utils.copy(from, {}, stackFrom, stackTo, blacklist, plain);
          } else {
            to = utils.copy(from, Object.create(Object.getPrototypeOf(from)), stackFrom, stackTo, blacklist, plain);
          }
        }
      }
    } else {
      if (from === to) {
        throw utils.err(DOMAIN + '.copy')(500, 'Cannot copy! Source and destination are identical.');
      }

      stackFrom = stackFrom || [];
      stackTo = stackTo || [];

      if (utils.isObject(from)) {
        var index = stackFrom.indexOf(from);
        if (index !== -1) {
          return stackTo[index];
        }

        stackFrom.push(from);
        stackTo.push(to);
      }

      var result = void 0;
      if (utils.isArray(from)) {
        var i = void 0;
        to.length = 0;
        for (i = 0; i < from.length; i++) {
          result = utils.copy(from[i], null, stackFrom, stackTo, blacklist, plain);
          if (utils.isObject(from[i])) {
            stackFrom.push(from[i]);
            stackTo.push(result);
          }
          to.push(result);
        }
      } else {
        if (utils.isArray(to)) {
          to.length = 0;
        } else {
          utils.forOwn(to, function (value, key) {
            delete to[key];
          });
        }
        for (var key in from) {
          if (from.hasOwnProperty(key)) {
            if (utils.isBlacklisted(key, blacklist)) {
              continue;
            }
            result = utils.copy(from[key], null, stackFrom, stackTo, blacklist, plain);
            if (utils.isObject(from[key])) {
              stackFrom.push(from[key]);
              stackTo.push(result);
            }
            to[key] = result;
          }
        }
      }
    }
    return to;
  },


  /**
   * Recursively shallow fill in own enumerable properties from `source` to
   * `dest`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' }, beep: 'boop' }
   * const b = { beep: 'bip' }
   * utils.deepFillIn(b, a)
   * console.log(b) // {"foo":{"bar":"baz"},"beep":"bip"}
   *
   * @method utils.deepFillIn
   * @param {Object} dest The destination object.
   * @param {Object} source The source object.
   * @see utils.fillIn
   * @see utils.deepMixIn
   * @since 3.0.0
   */
  deepFillIn: function deepFillIn(dest, source) {
    if (source) {
      utils.forOwn(source, function (value, key) {
        var existing = dest[key];
        if (isPlainObject(value) && isPlainObject(existing)) {
          utils.deepFillIn(existing, value);
        } else if (!dest.hasOwnProperty(key) || dest[key] === undefined) {
          dest[key] = value;
        }
      });
    }
    return dest;
  },


  /**
   * Recursively shallow copy enumerable properties from `source` to `dest`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' }, beep: 'boop' }
   * const b = { beep: 'bip' }
   * utils.deepFillIn(b, a)
   * console.log(b) // {"foo":{"bar":"baz"},"beep":"boop"}
   *
   * @method utils.deepMixIn
   * @param {Object} dest The destination object.
   * @param {Object} source The source object.
   * @see utils.fillIn
   * @see utils.deepFillIn
   * @since 3.0.0
   */
  deepMixIn: function deepMixIn(dest, source) {
    if (source) {
      for (var key in source) {
        var value = source[key];
        var existing = dest[key];
        if (isPlainObject(value) && isPlainObject(existing)) {
          utils.deepMixIn(existing, value);
        } else {
          dest[key] = value;
        }
      }
    }
    return dest;
  },


  /**
   * Return a diff of the base object to the comparison object.
   *
   * @example
   * import {utils} from 'js-data'
   * const oldObject = { foo: 'bar', a: 1234 }
   * const newObject = { beep: 'boop', a: 5678 }
   * const diff = utils.diffObjects(oldObject, newObject)
   * console.log(diff.added) // {"beep":"boop"}
   * console.log(diff.changed) // {"a":5678}
   * console.log(diff.removed) // {"foo":undefined}
   *
   * @method utils.diffObjects
   * @param {Object} newObject Comparison object.
   * @param {Object} oldObject Base object.
   * @param {Object} [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {Object} The diff from the base object to the comparison object.
   * @see utils.areDifferent
   * @since 3.0.0
   */
  diffObjects: function diffObjects(newObject, oldObject, opts) {
    opts || (opts = {});
    var equalsFn = opts.equalsFn;
    var blacklist = opts.ignore;
    var diff = {
      added: {},
      changed: {},
      removed: {}
    };
    if (!utils.isFunction(equalsFn)) {
      equalsFn = utils.deepEqual;
    }

    var newKeys = Object.keys(newObject).filter(function (key) {
      return !utils.isBlacklisted(key, blacklist);
    });
    var oldKeys = Object.keys(oldObject).filter(function (key) {
      return !utils.isBlacklisted(key, blacklist);
    });

    // Check for properties that were added or changed
    newKeys.forEach(function (key) {
      var oldValue = oldObject[key];
      var newValue = newObject[key];
      if (equalsFn(oldValue, newValue)) {
        return;
      }
      if (oldValue === undefined) {
        diff.added[key] = newValue;
      } else {
        diff.changed[key] = newValue;
      }
    });

    // Check for properties that were removed
    oldKeys.forEach(function (key) {
      var oldValue = oldObject[key];
      var newValue = newObject[key];
      if (newValue === undefined && oldValue !== undefined) {
        diff.removed[key] = undefined;
      }
    });

    return diff;
  },


  /**
   * Return whether the two values are equal according to the `==` operator.
   *
   * @example
   * import {utils} from 'js-data'
   * console.log(utils.equal(1,1)) // true
   * console.log(utils.equal(1,'1')) // true
   * console.log(utils.equal(93, 66)) // false
   *
   * @method utils.equal
   * @param {*} a First value in the comparison.
   * @param {*} b Second value in the comparison.
   * @returns {boolean} Whether the two values are equal according to `==`.
   * @since 3.0.0
   */
  equal: function equal(a, b) {
    return a == b; // eslint-disable-line
  },


  /**
   * Produce a factory function for making Error objects with the provided
   * metadata. Used throughout the various js-data components.
   *
   * @example
   * import {utils} from 'js-data'
   * const errorFactory = utils.err('domain', 'target')
   * const error400 = errorFactory(400, 'expected type', 'actual type')
   * console.log(error400) // [Error: [domain:target] expected: expected type, found: string
  http://www.js-data.io/v3.0/docs/errors#400]
   * @method utils.err
   * @param {string} domain Namespace.
   * @param {string} target Target.
   * @returns {Function} Factory function.
   * @since 3.0.0
   */
  err: function err(domain, target) {
    return function (code) {
      var prefix = '[' + domain + ':' + target + '] ';
      var message = ERRORS[code].apply(null, Array.prototype.slice.call(arguments, 1));
      message = '' + prefix + message + '\nhttp://www.js-data.io/v3.0/docs/errors#' + code;
      return new Error(message);
    };
  },


  /**
   * Add eventing capabilities into the target object.
   *
   * @example
   * import {utils} from 'js-data'
   * const user = { name: 'John' }
   * utils.eventify(user)
   * user.on('foo', () => console.log(arguments))
   * user.emit('foo', 1, 'bar') // should log to console values (1, "bar")
   *
   * @method utils.eventify
   * @param {Object} target Target object.
   * @param {Function} [getter] Custom getter for retrieving the object's event
   * listeners.
   * @param {Function} [setter] Custom setter for setting the object's event
   * listeners.
   * @since 3.0.0
   */
  eventify: function eventify(target, getter, setter) {
    target = target || this;
    var _events = {};
    if (!getter && !setter) {
      getter = function getter() {
        return _events;
      };
      setter = function setter(value) {
        _events = value;
      };
    }
    Object.defineProperties(target, {
      emit: {
        value: function value() {
          var events = getter.call(this) || {};

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var type = args.shift();
          var listeners = events[type] || [];
          var i = void 0;
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
          listeners = events.all || [];
          args.unshift(type);
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
        }
      },
      off: {
        value: function value(type, func) {
          var events = getter.call(this);
          var listeners = events[type];
          if (!listeners) {
            setter.call(this, {});
          } else if (func) {
            for (var i = 0; i < listeners.length; i++) {
              if (listeners[i].f === func) {
                listeners.splice(i, 1);
                break;
              }
            }
          } else {
            listeners.splice(0, listeners.length);
          }
        }
      },
      on: {
        value: function value(type, func, thisArg) {
          if (!getter.call(this)) {
            setter.call(this, {});
          }
          var events = getter.call(this);
          events[type] = events[type] || [];
          events[type].push({
            c: thisArg,
            f: func
          });
        }
      }
    });
  },


  /**
   * Used for sublcassing. Invoke this method in the context of a superclass to
   * to produce a subclass based on `props` and `classProps`.
   *
   * @example
   * import {utils} from 'js-data'
   * function Animal () {}
   * Animal.extend = utils.extend
   * const Cat = Animal.extend({
   *   say () {
   *     console.log('meow')
   *   }
   * })
   * const cat = new Cat()
   * cat instanceof Animal // true
   * cat instanceof Cat // true
   * cat.say() // "meow"
   *
   * @method utils.extend
   * @param {Object} props Instance properties for the subclass.
   * @param {Object} [props.constructor] Provide a custom constructor function
   * to use as the subclass.
   * @param {Object} props Static properties for the subclass.
   * @returns {Constructor} A new subclass.
   * @since 3.0.0
   */
  extend: function extend(props, classProps) {
    var superClass = this;
    var _subClass = void 0;

    props || (props = {});
    classProps || (classProps = {});

    if (props.hasOwnProperty('constructor')) {
      _subClass = props.constructor;
      delete props.constructor;
    } else {
      _subClass = function subClass() {
        utils.classCallCheck(this, _subClass);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        superClass.apply(this, args);
      };
    }

    // Setup inheritance of instance members
    _subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        configurable: true,
        enumerable: false,
        value: _subClass,
        writable: true
      }
    });

    var obj = Object;
    // Setup inheritance of static members
    if (obj.setPrototypeOf) {
      obj.setPrototypeOf(_subClass, superClass);
    } else if (classProps.strictEs6Class) {
      _subClass.__proto__ = superClass; // eslint-disable-line
    } else {
      utils.forOwn(superClass, function (value, key) {
        _subClass[key] = value;
      });
    }
    if (!_subClass.hasOwnProperty('__super__')) {
      Object.defineProperty(_subClass, '__super__', {
        configurable: true,
        value: superClass
      });
    }

    utils.addHiddenPropsToTarget(_subClass.prototype, props);
    utils.fillIn(_subClass, classProps);

    return _subClass;
  },


  /**
   * Shallow copy own enumerable properties from `src` to `dest` that are on
   * `src` but are missing from `dest.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: 'bar', beep: 'boop' }
   * const b = { beep: 'bip' }
   * utils.fillIn(b, a)
   * console.log(b) // {"foo":"bar","beep":"bip"}
   *
   * @method utils.fillIn
   * @param {Object} dest The destination object.
   * @param {Object} source The source object.
   * @see utils.deepFillIn
   * @see utils.deepMixIn
   * @since 3.0.0
   */
  fillIn: function fillIn(dest, src) {
    utils.forOwn(src, function (value, key) {
      if (!dest.hasOwnProperty(key) || dest[key] === undefined) {
        dest[key] = value;
      }
    });
  },


  /**
   * Find the last index of an item in an array according to the given checker function.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const john = { name: 'John', age: 20 }
   * const sara = { name: 'Sara', age: 25 }
   * const dan = { name: 'Dan', age: 20 }
   * const users = [john, sara, dan]
   *
   * console.log(utils.findIndex(users, (user) => user.age === 25)) // 1
   * console.log(utils.findIndex(users, (user) => user.age > 19)) // 2
   * console.log(utils.findIndex(users, (user) => user.name === 'John')) // 0
   * console.log(utils.findIndex(users, (user) => user.name === 'Jimmy')) // -1
   *
   * @method utils.findIndex
   * @param {Array} array The array to search.
   * @param {Function} fn Checker function.
   * @returns {number} Index if found or -1 if not found.
   * @since 3.0.0
   */
  findIndex: function findIndex(array, fn) {
    var index = -1;
    if (!array) {
      return index;
    }
    array.forEach(function (record, i) {
      if (fn(record)) {
        index = i;
        return false;
      }
    });
    return index;
  },


  /**
   * Recursively iterate over a {@link Mapper}'s relations according to
   * `opts.with`.
   *
   * @method utils.forEachRelation
   * @param {Mapper} mapper Mapper.
   * @param {Object} opts Configuration options.
   * @param {Function} fn Callback function.
   * @param {*} thisArg Execution context for the callback function.
   * @since 3.0.0
   */
  forEachRelation: function forEachRelation(mapper, opts, fn, thisArg) {
    var relationList = mapper.relationList || [];
    if (!relationList.length) {
      return;
    }
    relationList.forEach(function (def) {
      utils._forRelation(opts, def, fn, thisArg);
    });
  },


  /**
   * Iterate over an object's own enumerable properties.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { b: 1, c: 4 }
   * let sum = 0
   * utils.forOwn(a, function (value, key) {
   *   sum += value
   * })
   * console.log(sum) // 5
   *
   * @method utils.forOwn
   * @param {Object} object The object whose properties are to be enumerated.
   * @param {Function} fn Iteration function.
   * @param {Object} [thisArg] Content to which to bind `fn`.
   * @since 3.0.0
   */
  forOwn: function forOwn(obj, fn, thisArg) {
    var keys = Object.keys(obj);
    var len = keys.length;
    var i = void 0;
    for (i = 0; i < len; i++) {
      if (fn.call(thisArg, obj[keys[i]], keys[i], obj) === false) {
        break;
      }
    }
  },


  /**
   * Proxy for `JSON.parse`.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const a = utils.fromJson('{"name" : "John"}')
   * console.log(a) // { name: 'John' }
   *
   * @method utils.fromJson
   * @param {string} json JSON to parse.
   * @returns {Object} Parsed object.
   * @see utils.toJson
   * @since 3.0.0
   */
  fromJson: function fromJson(json) {
    return utils.isString(json) ? JSON.parse(json) : json;
  },


  /**
   * Retrieve the specified property from the given object. Supports retrieving
   * nested properties.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' }, beep: 'boop' }
   * console.log(utils.get(a, 'beep')) // "boop"
   * console.log(utils.get(a, 'foo.bar')) // "baz"
   *
   * @method utils.get
   * @param {Object} object Object from which to retrieve a property's value.
   * @param {string} prop Property to retrieve.
   * @returns {*} Value of the specified property.
   * @see utils.set
   * @since 3.0.0
   */
  'get': function get$$1(object, prop) {
    if (!prop) {
      return;
    }
    var parts = prop.split('.');
    var last = parts.pop();

    while (prop = parts.shift()) {
      // eslint-disable-line
      object = object[prop];
      if (object == null) {
        // eslint-disable-line
        return;
      }
    }

    return object[last];
  },

  /**
   * Return the superclass for the given instance or subclass. If an instance is
   * provided, then finds the parent class of the instance's constructor.
   *
   * @example
   * import {utils} from 'js-data'
   * // using ES2015 classes
   * class Foo {}
   * class Bar extends Foo {}
   * const barInstance = new Bar()
   * let baseType = utils.getSuper(barInstance)
   * console.log(Foo === baseType) // true
   *
   * // using Function constructor with utils.extend
   * function Foo () {}
   * Foo.extend = utils.extend
   * const Bar = Foo.extend()
   * const barInstance = new Bar()
   * let baseType = utils.getSuper(barInstance)
   * console.log(Foo === baseType) // true
   *
   * @method utils.getSuper
   * @param {Object|Function} instance Instance or constructor.
   * @param {boolean} [isCtor=false] Whether `instance` is a constructor.
   * @returns {Constructor} The superclass (grandparent constructor).
   * @since 3.0.0
   */
  getSuper: function getSuper(instance, isCtor) {
    var ctor = isCtor ? instance : instance.constructor;
    if (ctor.hasOwnProperty('__super__')) {
      return ctor.__super__;
    }
    return Object.getPrototypeOf(ctor) || ctor.__proto__; // eslint-disable-line
  },


  /**
   * Return the intersection of two arrays.
   *
   * @example
   * import {utils} from 'js-data'
   * const arrA = ['green', 'red', 'blue', 'red']
   * const arrB = ['green', 'yellow', 'red']
   * const intersected = utils.intersection(arrA, arrB)
   *
   * console.log(intersected) // ['green', 'red'])
   *
   * @method utils.intersection
   * @param {Array} array1 First array.
   * @param {Array} array2 Second array.
   * @returns {Array} Array of elements common to both arrays.
   * @since 3.0.0
   */
  intersection: function intersection(array1, array2) {
    if (!array1 || !array2) {
      return [];
    }
    var result = [];
    var item = void 0;
    var i = void 0;
    var len = array1.length;
    for (i = 0; i < len; i++) {
      item = array1[i];
      if (result.indexOf(item) !== -1) {
        continue;
      }
      if (array2.indexOf(item) !== -1) {
        result.push(item);
      }
    }
    return result;
  },


  /**
   * Proxy for `Array.isArray`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = [1,2,3,4,5]
   * const b = { foo: "bar" }
   * console.log(utils.isArray(a)) // true
   * console.log(utils.isArray(b)) // false
   *
   * @method utils.isArray
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is an array.
   * @since 3.0.0
   */
  isArray: Array.isArray,

  /**
   * Return whether `prop` is matched by any string or regular expression in
   * `blacklist`.
   *
   * @example
   * import {utils} from 'js-data'
   * const blacklist = [/^\$hashKey/g, /^_/g, 'id']
   * console.log(utils.isBlacklisted("$hashKey", blacklist)) // true
   * console.log(utils.isBlacklisted("id", blacklist)) // true
   * console.log(utils.isBlacklisted("_myProp", blacklist)) // true
   * console.log(utils.isBlacklisted("my_id", blacklist)) // false
   *
   * @method utils.isBlacklisted
   * @param {string} prop The name of a property to check.
   * @param {Array} blacklist Array of strings and regular expressions.
   * @returns {boolean} Whether `prop` was matched.
   * @since 3.0.0
   */
  isBlacklisted: function isBlacklisted(prop, blacklist) {
    if (!blacklist || !blacklist.length) {
      return false;
    }
    var matches = void 0;
    for (var i = 0; i < blacklist.length; i++) {
      if (toStr(blacklist[i]) === REGEXP_TAG && blacklist[i].test(prop) || blacklist[i] === prop) {
        matches = prop;
        return !!matches;
      }
    }
    return !!matches;
  },


  /**
   * Return whether the provided value is a boolean.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = true
   * const b = { foo: "bar" }
   * console.log(utils.isBoolean(a)) // true
   * console.log(utils.isBoolean(b)) // false
   *
   * @method utils.isBoolean
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a boolean.
   * @since 3.0.0
   */
  isBoolean: function isBoolean(value) {
    return toStr(value) === BOOL_TAG;
  },


  /**
   * Return whether the provided value is a date.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = new Date()
   * const b = { foo: "bar" }
   * console.log(utils.isDate(a)) // true
   * console.log(utils.isDate(b)) // false
   *
   * @method utils.isDate
   * @param {*} value The value to test.
   * @returns {Date} Whether the provided value is a date.
   * @since 3.0.0
   */
  isDate: function isDate(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toStr(value) === DATE_TAG;
  },


  /**
   * Return whether the provided value is a function.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = function (){ console.log('foo bar')}
   * const b = { foo: "bar" }
   * console.log(utils.isFunction(a)) // true
   * console.log(utils.isFunction(b)) // false
   *
   * @method utils.isFunction
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a function.
   * @since 3.0.0
   */
  isFunction: function isFunction(value) {
    return typeof value === 'function' || value && toStr(value) === FUNC_TAG;
  },


  /**
   * Return whether the provided value is an integer.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = 1
   * const b = 1.25
   * const c = '1'
   * console.log(utils.isInteger(a)) // true
   * console.log(utils.isInteger(b)) // false
   * console.log(utils.isInteger(c)) // false
   *
   * @method utils.isInteger
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is an integer.
   * @since 3.0.0
   */
  isInteger: function isInteger(value) {
    return toStr(value) === NUMBER_TAG && value == toInteger(value); // eslint-disable-line
  },


  /**
   * Return whether the provided value is `null`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = null
   * const b = { foo: "bar" }
   * console.log(utils.isNull(a)) // true
   * console.log(utils.isNull(b)) // false
   *
   * @method utils.isNull
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is `null`.
   * @since 3.0.0
   */
  isNull: function isNull(value) {
    return value === null;
  },


  /**
   * Return whether the provided value is a number.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = 1
   * const b = -1.25
   * const c = '1'
   * console.log(utils.isNumber(a)) // true
   * console.log(utils.isNumber(b)) // true
   * console.log(utils.isNumber(c)) // false
   *
   * @method utils.isNumber
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a number.
   * @since 3.0.0
   */
  isNumber: function isNumber(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type === 'number' || value && type === 'object' && toStr(value) === NUMBER_TAG;
  },


  /**
   * Return whether the provided value is an object.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: "bar" }
   * const b = 'foo bar'
   * console.log(utils.isObject(a)) // true
   * console.log(utils.isObject(b)) // false
   *
   * @method utils.isObject
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is an object.
   * @since 3.0.0
   */
  isObject: function isObject(value) {
    return toStr(value) === OBJECT_TAG;
  },


  /**
   * Return whether the provided value is a regular expression.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = /^\$.+$/ig
   * const b = new RegExp('^\$.+$', 'ig')
   * const c = { foo: "bar" }
   * console.log(utils.isRegExp(a)) // true
   * console.log(utils.isRegExp(b)) // true
   * console.log(utils.isRegExp(c)) // false
   *
   * @method utils.isRegExp
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a regular expression.
   * @since 3.0.0
   */
  isRegExp: function isRegExp(value) {
    return toStr(value) === REGEXP_TAG;
  },


  /**
   * Return whether the provided value is a string or a number.
   *
   * @example
   * import {utils} from 'js-data'
   * console.log(utils.isSorN('')) // true
   * console.log(utils.isSorN(-1.65)) // true
   * console.log(utils.isSorN('my string')) // true
   * console.log(utils.isSorN({})) // false
   * console.log(utils.isSorN([1,2,4])) // false
   *
   * @method utils.isSorN
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a string or a number.
   * @since 3.0.0
   */
  isSorN: function isSorN(value) {
    return utils.isString(value) || utils.isNumber(value);
  },


  /**
   * Return whether the provided value is a string.
   *
   * @example
   * import {utils} from 'js-data'
   * console.log(utils.isString('')) // true
   * console.log(utils.isString('my string')) // true
   * console.log(utils.isString(100)) // false
   * console.log(utils.isString([1,2,4])) // false
   *
   * @method utils.isString
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a string.
   * @since 3.0.0
   */
  isString: function isString(value) {
    return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toStr(value) === STRING_TAG;
  },


  /**
   * Return whether the provided value is a `undefined`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = undefined
   * const b = { foo: "bar"}
   * console.log(utils.isUndefined(a)) // true
   * console.log(utils.isUndefined(b.baz)) // true
   * console.log(utils.isUndefined(b)) // false
   * console.log(utils.isUndefined(b.foo)) // false
   *
   * @method utils.isUndefined
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a `undefined`.
   * @since 3.0.0
   */
  isUndefined: function isUndefined(value) {
    return value === undefined;
  },


  /**
   * Mix in logging capabilities to the target.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: "bar"}
   *
   * // Add standard logging to an object
   * utils.logify(a)
   * a.log('info', 'test log info') // output 'test log info' to console.
   *
   * // Toggle debug output of an object
   * a.dbg('test debug output') // does not output because debug is off.
   * a.debug = true
   * a.dbg('test debug output') // output 'test debug output' to console.
   *
   * @method utils.logify
   * @param {*} target The target.
   * @since 3.0.0
   */
  logify: function logify(target) {
    utils.addHiddenPropsToTarget(target, {
      dbg: function dbg() {
        if (utils.isFunction(this.log)) {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          this.log.apply(this, ['debug'].concat(args));
        }
      },
      log: function log(level) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        if (level && !args.length) {
          args.push(level);
          level = 'debug';
        }
        if (level === 'debug' && !this.debug) {
          return;
        }
        var prefix = level.toUpperCase() + ': (' + (this.name || this.constructor.name) + ')';
        if (utils.isFunction(console[level])) {
          var _console;

          (_console = console)[level].apply(_console, [prefix].concat(args));
        } else {
          var _console2;

          (_console2 = console).log.apply(_console2, [prefix].concat(args));
        }
      }
    });
  },


  /**
   * Adds the given record to the provided array only if it's not already in the
   * array.
   *
   * @example
   * import {utils} from 'js-data'
   * const colors = ['red', 'green', 'yellow']
   *
   * console.log(colors.length) // 3
   * utils.noDupeAdd(colors, 'red')
   * console.log(colors.length) // 3, red already exists
   *
   * utils.noDupeAdd(colors, 'blue')
   * console.log(colors.length) // 4, blue was added
   *
   * @method utils.noDupeAdd
   * @param {Array} array The array.
   * @param {*} record The value to add.
   * @param {Function} fn Callback function passed to {@link utils.findIndex}.
   * @since 3.0.0
   */
  noDupeAdd: function noDupeAdd(array, record, fn) {
    if (!array) {
      return;
    }
    var index = this.findIndex(array, fn);
    if (index < 0) {
      array.push(record);
    }
  },


  /**
   * Return a shallow copy of the provided object, minus the properties
   * specified in `keys`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { name: 'John', $hashKey: 1214910 }
   *
   * let b = utils.omit(a, ['$hashKey'])
   * console.log(b) // { name: 'John' }
   *
   * @method utils.omit
   * @param {Object} props The object to copy.
   * @param {string[]} keys Array of strings, representing properties to skip.
   * @returns {Object} Shallow copy of `props`, minus `keys`.
   * @since 3.0.0
   */
  omit: function omit(props, keys) {
    var _props = {};
    utils.forOwn(props, function (value, key) {
      if (keys.indexOf(key) === -1) {
        _props[key] = value;
      }
    });
    return _props;
  },


  /**
   * Return a shallow copy of the provided object, but only include the
   * properties specified in `keys`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { name: 'John', $hashKey: 1214910 }
   *
   * let b = utils.pick(a, ['$hashKey'])
   * console.log(b) // { $hashKey: 1214910 }
   *
   * @method utils.pick
   * @param {Object} props The object to copy.
   * @param {string[]} keys Array of strings, representing properties to keep.
   * @returns {Object} Shallow copy of `props`, but only including `keys`.
   * @since 3.0.0
   */
  pick: function pick(props, keys) {
    return keys.reduce(function (map, key) {
      map[key] = props[key];
      return map;
    }, {});
  },


  /**
   * Return a plain copy of the given value.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { name: 'John' }
   * let b = utils.plainCopy(a)
   * console.log(a === b) // false
   *
   * @method utils.plainCopy
   * @param {*} value The value to copy.
   * @returns {*} Plain copy of `value`.
   * @see utils.copy
   * @since 3.0.0
   */
  plainCopy: function plainCopy(value) {
    return utils.copy(value, undefined, undefined, undefined, undefined, true);
  },


  /**
   * Shortcut for `utils.Promise.reject(value)`.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * utils.reject("Testing static reject").then(function(data) {
   *   // not called
   * }).catch(function(reason) {
   *   console.log(reason); // "Testing static reject"
   * })
   *
   * @method utils.reject
   * @param {*} [value] Value with which to reject the Promise.
   * @returns {Promise} Promise reject with `value`.
   * @see utils.Promise
   * @since 3.0.0
   */
  reject: function reject(value) {
    return utils.Promise.reject(value);
  },


  /**
   * Remove the last item found in array according to the given checker function.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const colors = ['red', 'green', 'yellow', 'red']
   * utils.remove(colors, (color) => color === 'red')
   * console.log(colors) // ['red', 'green', 'yellow']
   *
   * @method utils.remove
   * @param {Array} array The array to search.
   * @param {Function} fn Checker function.
   */
  remove: function remove(array, fn) {
    if (!array || !array.length) {
      return;
    }
    var index = this.findIndex(array, fn);
    if (index >= 0) {
      array.splice(index, 1); // todo should this be recursive?
    }
  },


  /**
   * Shortcut for `utils.Promise.resolve(value)`.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * utils.resolve("Testing static resolve").then(function(data) {
   *   console.log(data); // "Testing static resolve"
   * }).catch(function(reason) {
   *   // not called
   * })
   *
   * @param {*} [value] Value with which to resolve the Promise.
   * @returns {Promise} Promise resolved with `value`.
   * @see utils.Promise
   * @since 3.0.0
   */
  resolve: function resolve(value) {
    return utils.Promise.resolve(value);
  },


  /**
   * Set the value at the provided key or path.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const john = {
   *   name: 'John',
   *   age: 25,
   *   parent: {
   *     name: 'John's Mom',
   *     age: 50
   *   }
   * }
   * // set value by key
   * utils.set(john, 'id', 98)
   * console.log(john.id) // 98
   *
   * // set value by path
   * utils.set(john, 'parent.id', 20)
   * console.log(john.parent.id) // 20
   *
   * // set value by path/value map
   * utils.set(john, {
   *   'id': 1098,
   *   'parent': { id: 1020 },
   *   'parent.age': '55'
   * })
   * console.log(john.id) // 1098
   * console.log(john.parent.id) // 1020
   * console.log(john.parent.age) // 55
   *
   * @method utils.set
   * @param {Object} object The object on which to set a property.
   * @param {(string|Object)} path The key or path to the property. Can also
   * pass in an object of path/value pairs, which will all be set on the target
   * object.
   * @param {*} [value] The value to set.
   */
  set: function set$$1(object, path, value) {
    if (utils.isObject(path)) {
      utils.forOwn(path, function (value, _path) {
        utils.set(object, _path, value);
      });
    } else {
      var parts = PATH.exec(path);
      if (parts) {
        mkdirP(object, parts[1])[parts[2]] = value;
      } else {
        object[path] = value;
      }
    }
  },

  /**
   * Check whether the two provided objects are deeply equal.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const objA = {
   *   name: 'John',
   *   id: 27,
   *   nested: {
   *     item: 'item 1',
   *     colors: ['red', 'green', 'blue']
   *   }
   * }
   *
   * const objB = {
   *   name: 'John',
   *   id: 27,
   *   nested: {
   *     item: 'item 1',
   *     colors: ['red', 'green', 'blue']
   *   }
   * }
   *
   * console.log(utils.deepEqual(a,b)) // true
   * objB.nested.colors.add('yellow') // make a change to a nested object's array
   * console.log(utils.deepEqual(a,b)) // false
   *
   * @method utils.deepEqual
   * @param {Object} a First object in the comparison.
   * @param {Object} b Second object in the comparison.
   * @returns {boolean} Whether the two provided objects are deeply equal.
   * @see utils.equal
   * @since 3.0.0
   */
  deepEqual: function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    var _equal = true;
    if (utils.isArray(a) && utils.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (var i = a.length; i--;) {
        if (!utils.deepEqual(a[i], b[i])) {
          // Exit loop early
          return false;
        }
      }
    } else if (utils.isObject(a) && utils.isObject(b)) {
      utils.forOwn(a, function (value, key) {
        if (!(_equal = utils.deepEqual(value, b[key]))) {
          // Exit loop early
          return false;
        }
      });
      if (_equal) {
        utils.forOwn(b, function (value, key) {
          if (!(_equal = utils.deepEqual(value, a[key]))) {
            // Exit loop early
            return false;
          }
        });
      }
    } else {
      return false;
    }
    return _equal;
  },


  /**
   * Proxy for `JSON.stringify`.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const a = { name: 'John' }
   * let jsonVal = utils.toJson(a)
   * console.log(jsonVal) // '{"name" : "John"}'
   *
   * @method utils.toJson
   * @param {*} value Value to serialize to JSON.
   * @returns {string} JSON string.
   * @see utils.fromJson
   * @since 3.0.0
   */
  toJson: JSON.stringify,

  /**
   * Unset the value at the provided key or path.
   *
   * @example
   * import {utils} from 'js-data'
   *
   * const john = {
   *   name: 'John',
   *   age: 25,
   *   parent: {
   *     name: 'John's Mom',
   *     age: 50
   *   }
   * }
   *
   * utils.unset(john, age)
   * utils.unset(john, parent.age)
   *
   * console.log(john.age) // null
   * console.log(john.parent.age) // null
   *
   * @method utils.unset
   * @param {Object} object The object from which to delete the property.
   * @param {string} path The key or path to the property.
   * @see utils.set
   * @since 3.0.0
   */
  unset: function unset(object, path) {
    var parts = path.split('.');
    var last = parts.pop();

    while (path = parts.shift()) {
      // eslint-disable-line
      object = object[path];
      if (object == null) {
        // eslint-disable-line
        return;
      }
    }

    object[last] = undefined;
  }
};

var safeSetProp = function safeSetProp(record, field, value) {
  if (record && record._set) {
    record._set('props.' + field, value);
  } else {
    utils.set(record, field, value);
  }
};

var safeSetLink = function safeSetLink(record, field, value) {
  if (record && record._set) {
    record._set('links.' + field, value);
  } else {
    utils.set(record, field, value);
  }
};

/**
 * A base class which gives instances private properties.
 *
 * Typically you won't instantiate this class directly, but you may find it
 * useful as an abstract class for your own components.
 *
 * See {@link Settable.extend} for an example of using {@link Settable} as a
 * base class.
 *
 *```javascript
 * import {Settable} from 'js-data'
 * ```
 *
 * @class Settable
 * @returns {Settable} A new {@link Settable} instance.
 * @since 3.0.0
 */
function Settable() {
  var _props = {};
  Object.defineProperties(this, {
    /**
     * Get a private property of this instance.
     *
     * __Don't use the method unless you know what you're doing.__
     *
     * @method Settable#_get
     * @param {string} key The property to retrieve.
     * @returns {*} The value of the property.
     * @since 3.0.0
     */
    _get: {
      value: function value(key) {
        return utils.get(_props, key);
      }
    },

    /**
     * Set a private property of this instance.
     *
     * __Don't use the method unless you know what you're doing.__
     *
     * @method __Don't use the method unless you know what you're doing.__#_set
     * @param {(string|Object)} key The key or path to the property. Can also
     * pass in an object of key/value pairs, which will all be set on the instance.
     * @param {*} [value] The value to set.
     * @since 3.0.0
     */
    _set: {
      value: function value(key, _value) {
        return utils.set(_props, key, _value);
      }
    },

    /**
     * Unset a private property of this instance.
     *
     * __Don't use the method unless you know what you're doing.__
     *
     * @method __Don't use the method unless you know what you're doing.__#_unset
     * @param {string} key The property to unset.
     * @since 3.0.0
     */
    _unset: {
      value: function value(key) {
        return utils.unset(_props, key);
      }
    }
  });
}

/**
 * Create a subclass of this Settable:
 *
 * @example <caption>Settable.extend</caption>
 * // Normally you would do: import {Settable} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Settable} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomSettableClass extends Settable {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customSettable = new CustomSettableClass()
 * console.log(customSettable.foo())
 * console.log(CustomSettableClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherSettableClass = Settable.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherSettable = new OtherSettableClass()
 * console.log(otherSettable.foo())
 * console.log(OtherSettableClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherSettableClass () {
 *   Settable.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Settable.extend({
 *   constructor: AnotherSettableClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherSettable = new AnotherSettableClass()
 * console.log(anotherSettable.created_at)
 * console.log(anotherSettable.foo())
 * console.log(AnotherSettableClass.beep())
 *
 * @method Settable.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Settable class.
 * @since 3.0.0
 */
Settable.extend = utils.extend;

/**
 * The base class from which all JSData components inherit some basic
 * functionality.
 *
 * Typically you won't instantiate this class directly, but you may find it
 * useful as an abstract class for your own components.
 *
 * See {@link Component.extend} for an example of using {@link Component} as a
 * base class.
 *
 *```javascript
 * import {Component} from 'js-data'
 * ```
 *
 * @class Component
 * @param {Object} [opts] Configuration options.
 * @param {boolean} [opts.debug=false] See {@link Component#debug}.
 * @returns {Component} A new {@link Component} instance.
 * @since 3.0.0
 */
function Component(opts) {
  Settable.call(this);
  opts || (opts = {});

  /**
   * Whether to enable debug-level logs for this component. Anything that
   * extends `Component` inherits this option and the corresponding logging
   * functionality.
   *
   * @example <caption>Component#debug</caption>
   * // Normally you would do: import {Component} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Component} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const component = new Component()
   * component.log('debug', 'some message') // nothing gets logged
   * // Display debug logs:
   * component.debug = true
   * component.log('debug', 'other message') // this DOES get logged
   *
   * @default false
   * @name Component#debug
   * @since 3.0.0
   * @type {boolean}
   */
  this.debug = opts.hasOwnProperty('debug') ? !!opts.debug : false;

  /**
   * Event listeners attached to this Component. __Do not modify.__ Use
   * {@link Component#on} and {@link Component#off} instead.
   *
   * @name Component#_listeners
   * @private
   * @instance
   * @since 3.0.0
   * @type {Object}
   */
  Object.defineProperty(this, '_listeners', { value: {}, writable: true });
}

var Component$1 = Settable.extend({
  constructor: Component
});

/**
 * Create a subclass of this Component:
 *
 * @example <caption>Component.extend</caption>
 * // Normally you would do: import {Component} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Component} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomComponentClass extends Component {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customComponent = new CustomComponentClass()
 * console.log(customComponent.foo())
 * console.log(CustomComponentClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherComponentClass = Component.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherComponent = new OtherComponentClass()
 * console.log(otherComponent.foo())
 * console.log(OtherComponentClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherComponentClass () {
 *   Component.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Component.extend({
 *   constructor: AnotherComponentClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherComponent = new AnotherComponentClass()
 * console.log(anotherComponent.created_at)
 * console.log(anotherComponent.foo())
 * console.log(AnotherComponentClass.beep())
 *
 * @method Component.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Component class.
 * @since 3.0.0
 */
Component.extend = utils.extend;

/**
 * Log the provided values at the "debug" level. Debug-level logs are only
 * logged if {@link Component#debug} is `true`.
 *
 * `.dbg(...)` is shorthand for `.log('debug', ...)`.
 *
 * @method Component#dbg
 * @param {...*} [args] Values to log.
 * @since 3.0.0
 */
/**
 * Log the provided values. By default sends values to `console[level]`.
 * Debug-level logs are only logged if {@link Component#debug} is `true`.
 *
 * Will attempt to use appropriate `console` methods if they are available.
 *
 * @method Component#log
 * @param {string} level Log level.
 * @param {...*} [args] Values to log.
 * @since 3.0.0
 */
utils.logify(Component.prototype);

/**
 * Register a new event listener on this Component.
 *
 * @example
 * // Listen for all "afterCreate" events in a DataStore
 * store.on('afterCreate', (mapperName, props, opts, result) => {
 *   console.log(mapperName) // "post"
 *   console.log(props.id) // undefined
 *   console.log(result.id) // 1234
 * })
 * store.create('post', { title: 'Modeling your data' }).then((post) => {
 *   console.log(post.id) // 1234
 * })
 *
 * @example
 * // Listen for the "add" event on a collection
 * collection.on('add', (records) => {
 *   console.log(records) // [...]
 * })
 *
 * @example
 * // Listen for "change" events on a record
 * post.on('change', (record, changes) => {
 *   console.log(changes) // { changed: { title: 'Modeling your data' } }
 * })
 * post.title = 'Modeling your data'
 *
 * @method Component#on
 * @param {string} event Name of event to subsribe to.
 * @param {Function} listener Listener function to handle the event.
 * @param {*} [ctx] Optional content in which to invoke the listener.
 * @since 3.0.0
 */
/**
 * Remove an event listener from this Component. If no listener is provided,
 * then all listeners for the specified event will be removed. If no event is
 * specified then all listeners for all events will be removed.
 *
 * @example
 * // Remove a particular listener for a particular event
 * collection.off('add', handler)
 *
 * @example
 * // Remove all listeners for a particular event
 * record.off('change')
 *
 * @example
 * // Remove all listeners to all events
 * store.off()
 *
 * @method Component#off
 * @param {string} [event] Name of event to unsubsribe to.
 * @param {Function} [listener] Listener to remove.
 * @since 3.0.0
 */
/**
 * Trigger an event on this Component.
 *
 * @example <caption>Component#emit</caption>
 * // import {Collection, DataStore} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Collection, DataStore} = JSData
 *
 * const collection = new Collection()
 * collection.on('foo', function (msg) {
 *   console.log(msg)
 * })
 * collection.emit('foo', 'bar')
 *
 * const store = new DataStore()
 * store.on('beep', function (msg) {
 *   console.log(msg)
 * })
 * store.emit('beep', 'boop')
 *
 * @method Component#emit
 * @param {string} event Name of event to emit.
 * @param {...*} [args] Arguments to pass to any listeners.
 * @since 3.0.0
 */
utils.eventify(Component.prototype, function () {
  return this._listeners;
}, function (value) {
  this._listeners = value;
});

var DOMAIN$2 = 'Query';
var INDEX_ERR = 'Index inaccessible after first operation';

// Reserved words used by JSData's Query Syntax
var reserved = {
  limit: '',
  offset: '',
  orderBy: '',
  skip: '',
  sort: '',
  where: ''

  // Used by our JavaScript implementation of the LIKE operator
};var escapeRegExp = /([.*+?^=!:${}()|[\]/\\])/g;
var percentRegExp = /%/g;
var underscoreRegExp = /_/g;
var escape = function escape(pattern) {
  return pattern.replace(escapeRegExp, '\\$1');
};

/**
 * A class used by the {@link Collection} class to build queries to be executed
 * against the collection's data. An instance of `Query` is returned by
 * {@link Collection#query}. Query instances are typically short-lived, and you
 * shouldn't have to create them yourself. Just use {@link Collection#query}.
 *
 * ```javascript
 * import {Query} from 'js-data'
 * ```
 *
 * @example
 * const store = new JSData.DataStore()
 * store.defineMapper('post')
 * const posts = [
 *   { author: 'John', age: 30, status: 'published', id: 1 },
 *   { author: 'Sally', age: 31, status: 'draft', id: 2 },
 *   { author: 'Mike', age: 32, status: 'draft', id: 3 },
 *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
 *   { author: 'Adam', age: 33, status: 'draft', id: 5 }
 * ]
 * store.add('post', posts)
 * const drafts = store.query('post').filter({ status: 'draft' }).limit(2).run()
 * console.log(drafts)
 *
 * @class Query
 * @extends Component
 * @param {Collection} collection The collection on which this query operates.
 * @since 3.0.0
 */
function Query(collection) {
  utils.classCallCheck(this, Query);

  /**
   * The {@link Collection} on which this query operates.
   *
   * @name Query#collection
   * @since 3.0.0
   * @type {Collection}
   */
  this.collection = collection;

  /**
   * The current data result of this query.
   *
   * @name Query#data
   * @since 3.0.0
   * @type {Array}
   */
  this.data = null;
}

var Query$1 = Component$1.extend({
  constructor: Query,

  _applyWhereFromObject: function _applyWhereFromObject(where) {
    var fields = [];
    var ops = [];
    var predicates = [];
    utils.forOwn(where, function (clause, field) {
      if (!utils.isObject(clause)) {
        clause = {
          '==': clause
        };
      }
      utils.forOwn(clause, function (expr, op) {
        fields.push(field);
        ops.push(op);
        predicates.push(expr);
      });
    });
    return {
      fields: fields,
      ops: ops,
      predicates: predicates
    };
  },
  _applyWhereFromArray: function _applyWhereFromArray(where) {
    var _this = this;

    var groups = [];
    where.forEach(function (_where, i) {
      if (utils.isString(_where)) {
        return;
      }
      var prev = where[i - 1];
      var parser = utils.isArray(_where) ? _this._applyWhereFromArray : _this._applyWhereFromObject;
      var group = parser.call(_this, _where);
      if (prev === 'or') {
        group.isOr = true;
      }
      groups.push(group);
    });
    groups.isArray = true;
    return groups;
  },
  _testObjectGroup: function _testObjectGroup(keep, first, group, item) {
    var i = void 0;
    var fields = group.fields;
    var ops = group.ops;
    var predicates = group.predicates;
    var len = ops.length;
    for (i = 0; i < len; i++) {
      var op = ops[i];
      var isOr = op.charAt(0) === '|';
      op = isOr ? op.substr(1) : op;
      var expr = this.evaluate(utils.get(item, fields[i]), op, predicates[i]);
      if (expr !== undefined) {
        keep = first ? expr : isOr ? keep || expr : keep && expr;
      }
      first = false;
    }
    return { keep: keep, first: first };
  },
  _testArrayGroup: function _testArrayGroup(keep, first, groups, item) {
    var i = void 0;
    var len = groups.length;
    for (i = 0; i < len; i++) {
      var group = groups[i];
      var parser = group.isArray ? this._testArrayGroup : this._testObjectGroup;
      var result = parser.call(this, true, true, group, item);
      if (groups[i - 1]) {
        if (group.isOr) {
          keep = keep || result.keep;
        } else {
          keep = keep && result.keep;
        }
      } else {
        keep = result.keep;
      }
      first = result.first;
    }
    return { keep: keep, first: first };
  },


  /**
   * Find all entities between two boundaries.
   *
   * @example <caption>Get the users ages 18 to 30.</caption>
   * const store = new JSData.DataStore()
   * store.defineMapper('user')
   * const users = [
   *   { name: 'Peter', age: 25, id: 1 },
   *   { name: 'Jim', age: 19, id: 2 },
   *   { name: 'Mike', age: 17, id: 3 },
   *   { name: 'Alan', age: 29, id: 4 },
   *   { name: 'Katie', age: 33, id: 5 }
   * ]
   * store.add('post', posts)
   * const filteredUsers = store.query('user').between(18, 30, { index: 'age' }).run()
   * console.log(filteredUsers)
   *
   * @example <caption>Same as above.</caption>
   * const store = new JSData.DataStore()
   * store.defineMapper('user')
   * const users = [
   *   { name: 'Peter', age: 25, id: 1 },
   *   { name: 'Jim', age: 19, id: 2 },
   *   { name: 'Mike', age: 17, id: 3 },
   *   { name: 'Alan', age: 29, id: 4 },
   *   { name: 'Katie', age: 33, id: 5 }
   * ]
   * store.add('post', posts)
   * const filteredUsers = store.query('user').between([18], [30], { index: 'age' }).run()
   * console.log(filteredUsers)
   *
   * @method Query#between
   * @param {Array} leftKeys Keys defining the left boundary.
   * @param {Array} rightKeys Keys defining the right boundary.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @param {boolean} [opts.leftInclusive=true] Whether to include entities
   * on the left boundary.
   * @param {boolean} [opts.rightInclusive=false] Whether to include entities
   * on the left boundary.
   * @param {boolean} [opts.limit] Limit the result to a certain number.
   * @param {boolean} [opts.offset] The number of resulting entities to skip.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  between: function between(leftKeys, rightKeys, opts) {
    opts || (opts = {});
    if (this.data) {
      throw utils.err(DOMAIN$2 + '#between')(500, 'Cannot access index');
    }
    this.data = this.collection.getIndex(opts.index).between(leftKeys, rightKeys, opts);
    return this;
  },


  /**
   * The comparison function used by the {@link Query} class.
   *
   * @method Query#compare
   * @param {Array} orderBy An orderBy clause used for sorting and sub-sorting.
   * @param {number} index The index of the current orderBy clause being used.
   * @param {*} a The first item in the comparison.
   * @param {*} b The second item in the comparison.
   * @returns {number} -1 if `b` should preceed `a`. 0 if `a` and `b` are equal.
   * 1 if `a` should preceed `b`.
   * @since 3.0.0
   */
  compare: function compare(orderBy, index, a, b) {
    var def = orderBy[index];
    var cA = utils.get(a, def[0]);
    var cB = utils.get(b, def[0]);
    if (cA && utils.isString(cA)) {
      cA = cA.toUpperCase();
    }
    if (cB && utils.isString(cB)) {
      cB = cB.toUpperCase();
    }
    if (a === undefined) {
      a = null;
    }
    if (b === undefined) {
      b = null;
    }
    if (def[1].toUpperCase() === 'DESC') {
      var temp = cB;
      cB = cA;
      cA = temp;
    }
    if (cA < cB) {
      return -1;
    } else if (cA > cB) {
      return 1;
    } else {
      if (index < orderBy.length - 1) {
        return this.compare(orderBy, index + 1, a, b);
      } else {
        return 0;
      }
    }
  },


  /**
   * Predicate evaluation function used by the {@link Query} class.
   *
   * @method Query#evaluate
   * @param {*} value The value to evaluate.
   * @param {string} op The operator to use in this evaluation.
   * @param {*} predicate The predicate to use in this evaluation.
   * @returns {boolean} Whether the value passed the evaluation or not.
   * @since 3.0.0
   */
  evaluate: function evaluate(value, op, predicate) {
    var ops = this.constructor.ops;
    if (ops[op]) {
      return ops[op](value, predicate);
    }
    if (op.indexOf('like') === 0) {
      return this.like(predicate, op.substr(4)).exec(value) !== null;
    } else if (op.indexOf('notLike') === 0) {
      return this.like(predicate, op.substr(7)).exec(value) === null;
    }
  },


  /**
   * Find the record or records that match the provided query or are accepted by
   * the provided filter function.
   *
   * @example <caption>Get the draft posts by authors younger than 30</caption>
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'published', id: 2 },
   *   { author: 'Mike', age: 32, status: 'draft', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'published', id: 5 }
   *   { author: 'Peter', age: 25, status: 'deleted', id: 6 },
   *   { author: 'Sally', age: 21, status: 'draft', id: 7 },
   *   { author: 'Jim', age: 27, status: 'draft', id: 8 },
   *   { author: 'Jim', age: 27, status: 'published', id: 9 },
   *   { author: 'Jason', age: 55, status: 'published', id: 10 }
   * ]
   * store.add('post', posts)
   * let results = store.query('post').filter({
   *   where: {
   *     status: {
   *       '==': 'draft'
   *     },
   *     age: {
   *       '<': 30
   *     }
   *   }
   * }).run()
   * console.log(results)
   *
   * @example <caption>Use a custom filter function</caption>
   * const posts = query.filter(function (post) {
   *   return post.isReady()
   * }).run()
   *
   * @method Query#filter
   * @param {(Object|Function)} [queryOrFn={}] Selection query or filter
   * function.
   * @param {Function} [thisArg] Context to which to bind `queryOrFn` if
   * `queryOrFn` is a function.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  filter: function filter(query, thisArg) {
    var _this2 = this;

    /**
     * Selection query as defined by JSData's [Query Syntax][querysyntax].
     *
     * [querysyntax]: http://www.js-data.io/v3.0/docs/query-syntax
     *
     * @example <caption>Empty "findAll" query</caption>
     * const store = new JSData.DataStore()
     * store.defineMapper('post')
     * store.findAll('post').then((posts) => {
     *   console.log(posts) // [...]
     * })
     *
     * @example <caption>Empty "filter" query</caption>
     * const store = new JSData.DataStore()
     * store.defineMapper('post')
     * const posts = store.filter('post')
     * console.log(posts) // [...]
     *
     * @example <caption>Complex "filter" query</caption>
     * const PAGE_SIZE = 2
     * let currentPage = 3
     *
     * const store = new JSData.DataStore()
     * store.defineMapper('post')
     * const posts = [
     *   { author: 'John', age: 30, status: 'published', id: 1 },
     *   { author: 'Sally', age: 31, status: 'published', id: 2 },
     *   { author: 'Mike', age: 32, status: 'draft', id: 3 },
     *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
     *   { author: 'Adam', age: 33, status: 'published', id: 5 }
     *   { author: 'Peter', age: 25, status: 'deleted', id: 6 },
     *   { author: 'Sally', age: 21, status: 'draft', id: 7 },
     *   { author: 'Jim', age: 27, status: 'draft', id: 8 },
     *   { author: 'Jim', age: 27, status: 'published', id: 9 },
     *   { author: 'Jason', age: 55, status: 'published', id: 10 }
     * ]
     * store.add('post', posts)
     * // Retrieve a filtered page of blog posts
     * // Would typically replace filter with findAll
     * store.filter('post', {
     *   where: {
     *     status: {
     *       // WHERE status = 'published'
     *       '==': 'published'
     *     },
     *     author: {
     *       // AND author IN ('bob', 'alice')
     *       'in': ['bob', 'alice'],
     *       // OR author IN ('karen')
     *       '|in': ['karen']
     *     }
     *   },
     *   orderBy: [
     *     // ORDER BY date_published DESC,
     *     ['date_published', 'DESC'],
     *     // ORDER BY title ASC
     *     ['title', 'ASC']
     *   ],
     *   // LIMIT 2
     *   limit: PAGE_SIZE,
     *   // SKIP 4
     *   offset: PAGE_SIZE * (currentPage - 1)
     * })
     *
     * @namespace query
     * @property {number} [limit] See {@link query.limit}.
     * @property {number} [offset] See {@link query.offset}.
     * @property {string|Array[]} [orderBy] See {@link query.orderBy}.
     * @property {number} [skip] Alias for {@link query.offset}.
     * @property {string|Array[]} [sort] Alias for {@link query.orderBy}.
     * @property {Object} [where] See {@link query.where}.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/query-syntax","JSData's Query Syntax"]
     */
    query || (query = {});
    this.getData();
    if (utils.isObject(query)) {
      var where = {};

      /**
       * Filtering criteria. Records that do not meet this criteria will be exluded
       * from the result.
       *
       * @example <caption>Return posts where author is at least 32 years old</caption>
       * const store = new JSData.DataStore()
       * store.defineMapper('post')
       * const posts = [
       *   { author: 'John', age: 30, id: 5 },
       *   { author: 'Sally', age: 31, id: 6 },
       *   { author: 'Mike', age: 32, id: 7 },
       *   { author: 'Adam', age: 33, id: 8 },
       *   { author: 'Adam', age: 33, id: 9 }
       * ]
       * store.add('post', posts)
       * store.filter('post', {
       *   where: {
       *     age: {
       *       '>=': 30
       *     }
       *   }
       * })
       * console.log(results)
       *
       * @name query.where
       * @type {Object}
       * @see http://www.js-data.io/v3.0/docs/query-syntax
       * @since 3.0.0
       */
      if (utils.isObject(query.where) || utils.isArray(query.where)) {
        where = query.where;
      }
      utils.forOwn(query, function (value, key) {
        if (!(key in reserved) && !(key in where)) {
          where[key] = {
            '==': value
          };
        }
      });
      var groups = void 0;

      // Apply filter for each field
      if (utils.isObject(where) && Object.keys(where).length !== 0) {
        groups = this._applyWhereFromArray([where]);
      } else if (utils.isArray(where)) {
        groups = this._applyWhereFromArray(where);
      }

      if (groups) {
        this.data = this.data.filter(function (item, i) {
          return _this2._testArrayGroup(true, true, groups, item).keep;
        });
      }

      // Sort
      var orderBy = query.orderBy || query.sort;

      if (utils.isString(orderBy)) {
        orderBy = [[orderBy, 'ASC']];
      }
      if (!utils.isArray(orderBy)) {
        orderBy = null;
      }

      /**
       * Determines how records should be ordered in the result.
       *
       * @example <caption>Order posts by `author` then by `id` descending </caption>
       * const store = new JSData.DataStore()
       * store.defineMapper('post')
       * const posts = [
       *   { author: 'John', age: 30, id: 5 },
       *   { author: 'Sally', age: 31, id: 6 },
       *   { author: 'Mike', age: 32, id: 7 },
       *   { author: 'Adam', age: 33, id: 8 },
       *   { author: 'Adam', age: 33, id: 9 }
       * ]
       * store.add('post', posts)
       * store.filter('post', {
       *     orderBy:[['author','ASC'],['id','DESC']]
       * })
       * console.log(results)
       *
       * @name query.orderBy
       * @type {string|Array[]}
       * @see http://www.js-data.io/v3.0/docs/query-syntax
       * @since 3.0.0
       */
      if (orderBy) {
        var index = 0;
        orderBy.forEach(function (def, i) {
          if (utils.isString(def)) {
            orderBy[i] = [def, 'ASC'];
          }
        });
        this.data.sort(function (a, b) {
          return _this2.compare(orderBy, index, a, b);
        });
      }

      /**
       * Number of records to skip.
       *
       * @example <caption>Retrieve the first "page" of blog posts using findAll</caption>
       * const PAGE_SIZE = 10
       * let currentPage = 1
       * PostMapper.findAll({
       *   offset: PAGE_SIZE * (currentPage 1)
       *   limit: PAGE_SIZE
       * })
       *
       * @example <caption>Retrieve the last "page" of blog posts using filter</caption>
       * const PAGE_SIZE = 5
       * let currentPage = 2
       * const store = new JSData.DataStore()
       * store.defineMapper('post')
       * const posts = [
       *   { author: 'John', age: 30, id: 1 },
       *   { author: 'Sally', age: 31, id: 2 },
       *   { author: 'Mike', age: 32, id: 3 },
       *   { author: 'Adam', age: 33, id: 4 },
       *   { author: 'Adam', age: 33, id: 5 },
       *   { author: 'Peter', age: 25, id: 6 },
       *   { author: 'Sally', age: 21, id: 7 },
       *   { author: 'Jim', age: 27, id: 8 },
       *   { author: 'Jim', age: 27, id: 9 },
       *   { author: 'Jason', age: 55, id: 10 }
       * ]
       * store.add('post', posts)
       * store.filter('post', {
       *   offset: PAGE_SIZE * (currentPage 1)
       *   limit: PAGE_SIZE
       * })
       *
       * console.log(results)
       *
       * @name query.offset
       * @type {number}
       * @see http://www.js-data.io/v3.0/docs/query-syntax
       * @since 3.0.0
       */
      if (utils.isNumber(query.skip)) {
        this.skip(query.skip);
      } else if (utils.isNumber(query.offset)) {
        this.skip(query.offset);
      }

      /**
       * Maximum number of records to retrieve.
       *
       * @example <caption>Retrieve the first "page" of blog posts using findAll</caption>
       * const PAGE_SIZE = 10
       * let currentPage = 1
       * PostMapper.findAll({
       *   offset: PAGE_SIZE * (currentPage 1)
       *   limit: PAGE_SIZE
       * })
       *
       * @example <caption>Retrieve the last "page" of blog posts using filter</caption>
       * const PAGE_SIZE = 5
       * let currentPage = 2
       * const store = new JSData.DataStore()
       * store.defineMapper('post')
       * const posts = [
       *   { author: 'John', age: 30, id: 1 },
       *   { author: 'Sally', age: 31, id: 2 },
       *   { author: 'Mike', age: 32, id: 3 },
       *   { author: 'Adam', age: 33, id: 4 },
       *   { author: 'Adam', age: 33, id: 5 },
       *   { author: 'Peter', age: 25, id: 6 },
       *   { author: 'Sally', age: 21, id: 7 },
       *   { author: 'Jim', age: 27, id: 8 },
       *   { author: 'Jim', age: 27, id: 9 },
       *   { author: 'Jason', age: 55, id: 10 }
       * ]
       * store.add('post', posts)
       * store.filter('post', {
       *   offset: PAGE_SIZE * (currentPage 1)
       *   limit: PAGE_SIZE
       * })
       *
       * console.log(results)
       * @name query.limit
       * @type {number}
       * @see http://www.js-data.io/v3.0/docs/query-syntax
       * @since 3.0.0
       */
      if (utils.isNumber(query.limit)) {
        this.limit(query.limit);
      }
    } else if (utils.isFunction(query)) {
      this.data = this.data.filter(query, thisArg);
    }
    return this;
  },


  /**
   * Iterate over all entities.
   *
   * @method Query#forEach
   * @param {Function} forEachFn Iteration function.
   * @param {*} [thisArg] Context to which to bind `forEachFn`.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  forEach: function forEach(forEachFn, thisArg) {
    this.getData().forEach(forEachFn, thisArg);
    return this;
  },


  /**
   * Find the entity or entities that match the provided key.
   *
   * @example <caption>Get the entity whose primary key is 25.</caption>
   * const entities = query.get(25).run()
   *
   * @example <caption>Same as above.</caption>
   * const entities = query.get([25]).run()
   *
   * @example <caption>Get all users who are active and have the "admin" role.</caption>
   * const activeAdmins = query.get(['active', 'admin'], {
   *   index: 'activityAndRoles'
   * }).run()
   *
   * @example <caption>Get all entities that match a certain weather condition.</caption>
   * const niceDays = query.get(['sunny', 'humid', 'calm'], {
   *   index: 'weatherConditions'
   * }).run()
   *
   * @method Query#get
   * @param {Array} keyList Key(s) defining the entity to retrieve. If
   * `keyList` is not an array (i.e. for a single-value key), it will be
   * wrapped in an array.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.string] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  get: function get(keyList, opts) {
    keyList || (keyList = []);
    opts || (opts = {});
    if (this.data) {
      throw utils.err(DOMAIN$2 + '#get')(500, INDEX_ERR);
    }
    if (keyList && !utils.isArray(keyList)) {
      keyList = [keyList];
    }
    if (!keyList.length) {
      this.getData();
      return this;
    }
    this.data = this.collection.getIndex(opts.index).get(keyList);
    return this;
  },


  /**
   * Find the entity or entities that match the provided keyLists.
   *
   * @example <caption>Get the posts where "status" is "draft" or "inReview".</caption>
   * const posts = query.getAll('draft', 'inReview', { index: 'status' }).run()
   *
   * @example <caption>Same as above.</caption>
   * const posts = query.getAll(['draft'], ['inReview'], { index: 'status' }).run()
   *
   * @method Query#getAll
   * @param {...Array} [keyList] Provide one or more keyLists, and all
   * entities matching each keyList will be retrieved. If no keyLists are
   * provided, all entities will be returned.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  getAll: function getAll() {
    var _this3 = this;

    var opts = {};
    if (this.data) {
      throw utils.err(DOMAIN$2 + '#getAll')(500, INDEX_ERR);
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!args.length || args.length === 1 && utils.isObject(args[0])) {
      this.getData();
      return this;
    } else if (args.length && utils.isObject(args[args.length - 1])) {
      opts = args[args.length - 1];
      args.pop();
    }
    var collection = this.collection;
    var index = collection.getIndex(opts.index);
    this.data = [];
    args.forEach(function (keyList) {
      _this3.data = _this3.data.concat(index.get(keyList));
    });
    return this;
  },


  /**
   * Return the current data result of this query.
   *
   * @method Query#getData
   * @returns {Array} The data in this query.
   * @since 3.0.0
   */
  getData: function getData() {
    if (!this.data) {
      this.data = this.collection.index.getAll();
    }
    return this.data;
  },


  /**
   * Implementation used by the `like` operator. Takes a pattern and flags and
   * returns a `RegExp` instance that can test strings.
   *
   * @method Query#like
   * @param {string} pattern Testing pattern.
   * @param {string} flags Flags for the regular expression.
   * @returns {RegExp} Regular expression for testing strings.
   * @since 3.0.0
   */
  like: function like(pattern, flags) {
    return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
  },


  /**
   * Limit the result.
   *
   * @example <caption>Get only the first 2 posts.</caption>
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'draft', id: 2 },
   *   { author: 'Mike', age: 32, status: 'draft', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'draft', id: 5 }
   * ]
   * store.add('post', posts)
   * const results = store.query('post').limit(2).run()
   * console.log(results)
   *
   * @method Query#limit
   * @param {number} num The maximum number of entities to keep in the result.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  limit: function limit(num) {
    if (!utils.isNumber(num)) {
      throw utils.err(DOMAIN$2 + '#limit', 'num')(400, 'number', num);
    }
    var data = this.getData();
    this.data = data.slice(0, Math.min(data.length, num));
    return this;
  },


  /**
   * Apply a mapping function to the result data.
   *
   * @example
   * // Return the age of all users
   * const store = new JSData.DataStore()
   * store.defineMapper('user')
   * const users = [
   *   { name: 'Peter', age: 25, id: 1 },
   *   { name: 'Jim', age: 19, id: 2 },
   *   { name: 'Mike', age: 17, id: 3 },
   *   { name: 'Alan', age: 29, id: 4 },
   *   { name: 'Katie', age: 33, id: 5 }
   * ]
   * store.add('post', posts)
   * const ages = store.query('user').map((user) => {
   *   return user.age
   * }).run()
   * console.log(ages)
   *
   * @method Query#map
   * @param {Function} mapFn Mapping function.
   * @param {*} [thisArg] Context to which to bind `mapFn`.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  map: function map(mapFn, thisArg) {
    this.data = this.getData().map(mapFn, thisArg);
    return this;
  },


  /**
   * Return the result of calling the specified function on each item in this
   * collection's main index.
   *
   * @example
   * const stringAges = UserCollection.query().mapCall('toString').run()
   *
   * @method Query#mapCall
   * @param {string} funcName Name of function to call
   * @parama {...*} [args] Remaining arguments to be passed to the function.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  mapCall: function mapCall(funcName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    this.data = this.getData().map(function (item) {
      return item[funcName].apply(item, args);
    });
    return this;
  },


  /**
   * Complete the execution of the query and return the resulting data.
   *
   * @method Query#run
   * @returns {Array} The result of executing this query.
   * @since 3.0.0
   */
  run: function run() {
    var data = this.data;
    this.data = null;
    return data;
  },


  /**
   * Skip a number of results.
   *
   * @example <caption>Get all but the first 2 posts.</caption>
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'draft', id: 2 },
   *   { author: 'Mike', age: 32, status: 'draft', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'draft', id: 5 }
   * ]
   * store.add('post', posts)
   * const results = store.query('post').skip(2).run()
   * console.log(results)
   *
   * @method Query#skip
   * @param {number} num The number of entities to skip.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  skip: function skip(num) {
    if (!utils.isNumber(num)) {
      throw utils.err(DOMAIN$2 + '#skip', 'num')(400, 'number', num);
    }
    var data = this.getData();
    if (num < data.length) {
      this.data = data.slice(num);
    } else {
      this.data = [];
    }
    return this;
  }
}, {
  /**
   * The filtering operators supported by {@link Query#filter}, and which are
   * implemented by adapters (for the most part).
   *
   * @example <caption>Variant 1</caption>
   *
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'published', id: 2 },
   *   { author: 'Mike', age: 32, status: 'published', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'published', id: 5 }
   * ]
   * store.add('post', posts)
   *
   * const publishedPosts = store.filter('post', {
   *   status: 'published',
   *   limit: 2
   * })
   *
   * console.log(publishedPosts)
   *
   *
   * @example <caption>Variant 2</caption>
   *
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'published', id: 2 },
   *   { author: 'Mike', age: 32, status: 'published', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'published', id: 5 }
   * ]
   * store.add('post', posts)
   *
   * const publishedPosts = store.filter('post', {
   *   where: {
   *     status: {
   *       '==': 'published'
   *     }
   *   },
   *   limit: 2
   * })
   *
   * console.log(publishedPosts)
   *
   * @example <caption>Variant 3</caption>
   *
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'published', id: 2 },
   *   { author: 'Mike', age: 32, status: 'published', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'published', id: 5 }
   * ]
   * store.add('post', posts)
   *
   * const publishedPosts = store.query('post').filter({
   *   status: 'published'
   * }).limit(2).run()
   *
   * console.log(publishedPosts)
   *
   * @example <caption>Variant 4</caption>
   *
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'published', id: 2 },
   *   { author: 'Mike', age: 32, status: 'published', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'published', id: 5 }
   * ]
   * store.add('post', posts)
   *
   * const publishedPosts = store.query('post').filter({
   *   where: {
   *     status: {
   *       '==': 'published'
   *     }
   *   }
   * }).limit(2).run()
   *
   * console.log(publishedPosts)
   *
   * @example <caption>Multiple operators</caption>
   *
   * const store = new JSData.DataStore()
   * store.defineMapper('post')
   * const posts = [
   *   { author: 'John', age: 30, status: 'published', id: 1 },
   *   { author: 'Sally', age: 31, status: 'published', id: 2 },
   *   { author: 'Mike', age: 32, status: 'published', id: 3 },
   *   { author: 'Adam', age: 33, status: 'deleted', id: 4 },
   *   { author: 'Adam', age: 33, status: 'published', id: 5 }
   * ]
   * store.add('post', posts)
   *
   * const myPublishedPosts = store.filter('post', {
   *   where: {
   *     status: {
   *       '==': 'published'
   *     },
   *     user_id: {
   *       '==': currentUser.id
   *     }
   *   }
   * })
   *
   * console.log(myPublishedPosts)
   *
   * @name Query.ops
   * @property {Function} == Equality operator.
   * @property {Function} != Inequality operator.
   * @property {Function} > Greater than operator.
   * @property {Function} >= Greater than (inclusive) operator.
   * @property {Function} < Less than operator.
   * @property {Function} <= Less than (inclusive) operator.
   * @property {Function} isectEmpty Operator that asserts that the intersection
   * between two arrays is empty.
   * @property {Function} isectNotEmpty Operator that asserts that the
   * intersection between two arrays is __not__ empty.
   * @property {Function} in Operator that asserts whether a value is in an
   * array.
   * @property {Function} notIn Operator that asserts whether a value is __not__
   * in an array.
   * @property {Function} contains Operator that asserts whether an array
   * contains a value.
   * @property {Function} notContains Operator that asserts whether an array
   * does __not__ contain a value.
   * @since 3.0.0
   * @type {Object}
   */
  ops: {
    '=': function _(value, predicate) {
      return value == predicate; // eslint-disable-line
    },
    '==': function _(value, predicate) {
      return value == predicate; // eslint-disable-line
    },
    '===': function _(value, predicate) {
      return value === predicate;
    },
    '!=': function _(value, predicate) {
      return value != predicate; // eslint-disable-line
    },
    '!==': function _(value, predicate) {
      return value !== predicate;
    },
    '>': function _(value, predicate) {
      return value > predicate;
    },
    '>=': function _(value, predicate) {
      return value >= predicate;
    },
    '<': function _(value, predicate) {
      return value < predicate;
    },
    '<=': function _(value, predicate) {
      return value <= predicate;
    },
    'isectEmpty': function isectEmpty(value, predicate) {
      return !utils.intersection(value || [], predicate || []).length;
    },
    'isectNotEmpty': function isectNotEmpty(value, predicate) {
      return utils.intersection(value || [], predicate || []).length;
    },
    'in': function _in(value, predicate) {
      return predicate.indexOf(value) !== -1;
    },
    'notIn': function notIn(value, predicate) {
      return predicate.indexOf(value) === -1;
    },
    'contains': function contains(value, predicate) {
      return (value || []).indexOf(predicate) !== -1;
    },
    'notContains': function notContains(value, predicate) {
      return (value || []).indexOf(predicate) === -1;
    }
  }
});

/**
 * Create a subclass of this Query:
 * @example <caption>Query.extend</caption>
 * // Normally you would do: import {Query} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Query} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomQueryClass extends Query {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customQuery = new CustomQueryClass()
 * console.log(customQuery.foo())
 * console.log(CustomQueryClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherQueryClass = Query.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherQuery = new OtherQueryClass()
 * console.log(otherQuery.foo())
 * console.log(OtherQueryClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherQueryClass (collection) {
 *   Query.call(this, collection)
 *   this.created_at = new Date().getTime()
 * }
 * Query.extend({
 *   constructor: AnotherQueryClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherQuery = new AnotherQueryClass()
 * console.log(anotherQuery.created_at)
 * console.log(anotherQuery.foo())
 * console.log(AnotherQueryClass.beep())
 *
 * @method Query.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Query class.
 * @since 3.0.0
 */

// TODO: remove this when the rest of the project is cleaned
var belongsToType = 'belongsTo';
var hasManyType = 'hasMany';
var hasOneType = 'hasOne';

var DOMAIN$4 = 'Relation';

function Relation(relatedMapper) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  utils.classCallCheck(this, Relation);

  options.type = this.constructor.TYPE_NAME;
  this.validateOptions(relatedMapper, options);

  if ((typeof relatedMapper === 'undefined' ? 'undefined' : _typeof(relatedMapper)) === 'object') {
    Object.defineProperty(this, 'relatedMapper', { value: relatedMapper });
  }

  Object.defineProperty(this, 'inverse', { writable: true });
  utils.fillIn(this, options);
}

Relation.extend = utils.extend;

utils.addHiddenPropsToTarget(Relation.prototype, {
  get canAutoAddLinks() {
    return this.add === undefined || !!this.add;
  },

  get relatedCollection() {
    return this.mapper.datastore.getCollection(this.relation);
  },

  validateOptions: function validateOptions(related, opts) {
    var DOMAIN_ERR = 'new ' + DOMAIN$4;

    var localField = opts.localField;
    if (!localField) {
      throw utils.err(DOMAIN_ERR, 'opts.localField')(400, 'string', localField);
    }

    var foreignKey = opts.foreignKey = opts.foreignKey || opts.localKey;
    if (!foreignKey && (opts.type === belongsToType || opts.type === hasOneType)) {
      throw utils.err(DOMAIN_ERR, 'opts.foreignKey')(400, 'string', foreignKey);
    }

    if (utils.isString(related)) {
      opts.relation = related;
      if (!utils.isFunction(opts.getRelation)) {
        throw utils.err(DOMAIN_ERR, 'opts.getRelation')(400, 'function', opts.getRelation);
      }
    } else if (related) {
      opts.relation = related.name;
    } else {
      throw utils.err(DOMAIN_ERR, 'related')(400, 'Mapper or string', related);
    }
  },
  assignTo: function assignTo(mapper) {
    this.name = mapper.name;
    Object.defineProperty(this, 'mapper', { value: mapper });

    mapper.relationList || Object.defineProperty(mapper, 'relationList', { value: [] });
    mapper.relationFields || Object.defineProperty(mapper, 'relationFields', { value: [] });
    mapper.relationList.push(this);
    mapper.relationFields.push(this.localField);
  },
  canFindLinkFor: function canFindLinkFor() {
    return !!(this.foreignKey || this.localKey);
  },
  getRelation: function getRelation() {
    return this.relatedMapper;
  },
  getForeignKey: function getForeignKey(record) {
    return utils.get(record, this.mapper.idAttribute);
  },
  setForeignKey: function setForeignKey(record, relatedRecord) {
    if (!record || !relatedRecord) {
      return;
    }

    this._setForeignKey(record, relatedRecord);
  },
  _setForeignKey: function _setForeignKey(record, relatedRecords) {
    var _this = this;

    var idAttribute = this.mapper.idAttribute;

    if (!utils.isArray(relatedRecords)) {
      relatedRecords = [relatedRecords];
    }

    relatedRecords.forEach(function (relatedRecord) {
      utils.set(relatedRecord, _this.foreignKey, utils.get(record, idAttribute));
    });
  },
  getLocalField: function getLocalField(record) {
    return utils.get(record, this.localField);
  },
  setLocalField: function setLocalField(record, relatedData) {
    return utils.set(record, this.localField, relatedData);
  },
  getInverse: function getInverse(mapper) {
    if (!this.inverse) {
      this.findInverseRelation(mapper);
    }

    return this.inverse;
  },
  findInverseRelation: function findInverseRelation(mapper) {
    var _this2 = this;

    this.getRelation().relationList.forEach(function (def) {
      if (def.getRelation() === mapper && _this2.isInversedTo(def) && _this2 !== def) {
        _this2.inverse = def;
        return true;
      }
    });
  },
  isInversedTo: function isInversedTo(def) {
    return !def.foreignKey || def.foreignKey === this.foreignKey;
  },
  addLinkedRecords: function addLinkedRecords(records) {
    var _this3 = this;

    var datastore = this.mapper.datastore;

    records.forEach(function (record) {
      var relatedData = _this3.getLocalField(record);

      if (utils.isFunction(_this3.add)) {
        relatedData = _this3.add(datastore, _this3, record);
      } else if (relatedData) {
        relatedData = _this3.linkRecord(record, relatedData);
      }

      var isEmptyLinks = !relatedData || utils.isArray(relatedData) && !relatedData.length;

      if (isEmptyLinks && _this3.canFindLinkFor(record)) {
        relatedData = _this3.findExistingLinksFor(record);
      }

      if (relatedData) {
        _this3.setLocalField(record, relatedData);
      }
    });
  },
  removeLinkedRecords: function removeLinkedRecords(relatedMapper, records) {
    var localField = this.localField;
    records.forEach(function (record) {
      utils.set(record, localField, undefined);
    });
  },
  linkRecord: function linkRecord(record, relatedRecord) {
    var relatedId = utils.get(relatedRecord, this.mapper.idAttribute);

    if (relatedId === undefined) {
      var unsaved = this.relatedCollection.unsaved();
      if (unsaved.indexOf(relatedRecord) === -1) {
        if (this.canAutoAddLinks) {
          relatedRecord = this.relatedCollection.add(relatedRecord);
        }
      }
    } else {
      if (relatedRecord !== this.relatedCollection.get(relatedId)) {
        this.setForeignKey(record, relatedRecord);

        if (this.canAutoAddLinks) {
          relatedRecord = this.relatedCollection.add(relatedRecord);
        }
      }
    }

    return relatedRecord;
  },


  // e.g. user hasMany post via "foreignKey", so find all posts of user
  findExistingLinksByForeignKey: function findExistingLinksByForeignKey(id) {
    if (id === undefined || id === null) {
      return;
    }
    return this.relatedCollection.filter(defineProperty({}, this.foreignKey, id));
  },
  ensureLinkedDataHasProperType: function ensureLinkedDataHasProperType(props, opts) {
    var relatedMapper = this.getRelation();
    var relationData = this.getLocalField(props);

    if (utils.isArray(relationData) && (!relationData.length || relatedMapper.is(relationData[0]))) {
      return;
    }

    if (relationData && !relatedMapper.is(relationData)) {
      utils.set(props, this.localField, relatedMapper.createRecord(relationData, opts));
    }
  },
  isRequiresParentId: function isRequiresParentId() {
    return false;
  },
  isRequiresChildId: function isRequiresChildId() {
    return false;
  },
  createChildRecord: function createChildRecord(props, relationData, opts) {
    var _this4 = this;

    this.setForeignKey(props, relationData);

    return this.createLinked(relationData, opts).then(function (result) {
      _this4.setLocalField(props, result);
    });
  },
  createLinked: function createLinked(props, opts) {
    var create = utils.isArray(props) ? 'createMany' : 'create';

    return this.getRelation()[create](props, opts);
  }
});

var BelongsToRelation = Relation.extend({
  getForeignKey: function getForeignKey(record) {
    return utils.get(record, this.foreignKey);
  },
  _setForeignKey: function _setForeignKey(record, relatedRecord) {
    utils.set(record, this.foreignKey, utils.get(relatedRecord, this.getRelation().idAttribute));
  },
  findExistingLinksFor: function findExistingLinksFor(record) {
    // console.log('\tBelongsTo#findExistingLinksFor', record)
    if (!record) {
      return;
    }
    var relatedId = utils.get(record, this.foreignKey);
    if (relatedId !== undefined && relatedId !== null) {
      return this.relatedCollection.get(relatedId);
    }
  },
  isRequiresParentId: function isRequiresParentId() {
    return true;
  },
  createParentRecord: function createParentRecord(props, opts) {
    var _this = this;

    var relationData = this.getLocalField(props);

    return this.createLinked(relationData, opts).then(function (record) {
      _this.setForeignKey(props, record);
    });
  },
  createChildRecord: function createChildRecord() {
    throw new Error('"BelongsTo" relation does not support child creation as it cannot have children.');
  }
}, {
  TYPE_NAME: 'belongsTo'
});

var HasManyRelation = Relation.extend({
  validateOptions: function validateOptions(related, opts) {
    Relation.prototype.validateOptions.call(this, related, opts);

    var localKeys = opts.localKeys,
        foreignKeys = opts.foreignKeys,
        foreignKey = opts.foreignKey;


    if (!foreignKey && !localKeys && !foreignKeys) {
      throw utils.err('new Relation', 'opts.<foreignKey|localKeys|foreignKeys>')(400, 'string', foreignKey);
    }
  },
  canFindLinkFor: function canFindLinkFor(record) {
    var hasForeignKeys = this.foreignKey || this.foreignKeys;
    return !!(hasForeignKeys || this.localKeys && utils.get(record, this.localKeys));
  },
  linkRecord: function linkRecord(record, relatedRecords) {
    var _this = this;

    var relatedCollection = this.relatedCollection;
    var canAutoAddLinks = this.canAutoAddLinks;
    var foreignKey = this.foreignKey;
    var unsaved = this.relatedCollection.unsaved();

    return relatedRecords.map(function (relatedRecord) {
      var relatedId = relatedCollection.recordId(relatedRecord);

      if (relatedId === undefined && unsaved.indexOf(relatedRecord) === -1 || relatedRecord !== relatedCollection.get(relatedId)) {
        if (foreignKey) {
          // TODO: slow, could be optimized? But user loses hook
          _this.setForeignKey(record, relatedRecord);
        }
        if (canAutoAddLinks) {
          relatedRecord = relatedCollection.add(relatedRecord);
        }
      }

      return relatedRecord;
    });
  },
  findExistingLinksFor: function findExistingLinksFor(record) {
    var id = utils.get(record, this.mapper.idAttribute);
    var ids = this.localKeys ? utils.get(record, this.localKeys) : null;
    var records = void 0;

    if (id !== undefined && this.foreignKey) {
      records = this.findExistingLinksByForeignKey(id);
    } else if (this.localKeys && ids) {
      records = this.findExistingLinksByLocalKeys(ids);
    } else if (id !== undefined && this.foreignKeys) {
      records = this.findExistingLinksByForeignKeys(id);
    }

    if (records && records.length) {
      return records;
    }
  },


  // e.g. user hasMany group via "foreignKeys", so find all users of a group
  findExistingLinksByLocalKeys: function findExistingLinksByLocalKeys(ids) {
    return this.relatedCollection.filter({
      where: defineProperty({}, this.mapper.idAttribute, {
        'in': ids
      })
    });
  },


  // e.g. group hasMany user via "localKeys", so find all groups that own a user
  findExistingLinksByForeignKeys: function findExistingLinksByForeignKeys(id) {
    return this.relatedCollection.filter({
      where: defineProperty({}, this.foreignKeys, {
        'contains': id
      })
    });
  },
  isRequiresParentId: function isRequiresParentId() {
    return !!this.localKeys && this.localKeys.length > 0;
  },
  isRequiresChildId: function isRequiresChildId() {
    return !!this.foreignKey;
  },
  createParentRecord: function createParentRecord(props, opts) {
    var _this2 = this;

    var relationData = this.getLocalField(props);
    var foreignIdField = this.getRelation().idAttribute;

    return this.createLinked(relationData, opts).then(function (records) {
      utils.set(props, _this2.localKeys, records.map(function (record) {
        return utils.get(record, foreignIdField);
      }));
    });
  },
  createLinked: function createLinked(props, opts) {
    return this.getRelation().createMany(props, opts);
  }
}, {
  TYPE_NAME: 'hasMany'
});

var HasOneRelation = Relation.extend({
  findExistingLinksFor: function findExistingLinksFor(relatedMapper, record) {
    var recordId = utils.get(record, relatedMapper.idAttribute);
    var records = this.findExistingLinksByForeignKey(recordId);

    if (records && records.length) {
      return records[0];
    }
  },
  isRequiresChildId: function isRequiresChildId() {
    return true;
  }
}, {
  TYPE_NAME: 'hasOne'
});

[BelongsToRelation, HasManyRelation, HasOneRelation].forEach(function (RelationType) {
  Relation[RelationType.TYPE_NAME] = function (related, options) {
    return new RelationType(related, options);
  };
});

/**
 * BelongsTo relation decorator. You probably won't use this directly.
 *
 * @name module:js-data.belongsTo
 * @method
 * @param {Mapper} related The relation the target belongs to.
 * @param {Object} opts Configuration options.
 * @param {string} opts.foreignKey The field that holds the primary key of the
 * related record.
 * @param {string} opts.localField The field that holds a reference to the
 * related record object.
 * @returns {Function} Invocation function, which accepts the target as the only
 * parameter.
 */
var belongsTo = function belongsTo(related, opts) {
  return function (mapper) {
    Relation.belongsTo(related, opts).assignTo(mapper);
  };
};

/**
 * HasMany relation decorator. You probably won't use this directly.
 *
 * @name module:js-data.hasMany
 * @method
 * @param {Mapper} related The relation of which the target has many.
 * @param {Object} opts Configuration options.
 * @param {string} [opts.foreignKey] The field that holds the primary key of the
 * related record.
 * @param {string} opts.localField The field that holds a reference to the
 * related record object.
 * @returns {Function} Invocation function, which accepts the target as the only
 * parameter.
 */
var hasMany = function hasMany(related, opts) {
  return function (mapper) {
    Relation.hasMany(related, opts).assignTo(mapper);
  };
};

/**
 * HasOne relation decorator. You probably won't use this directly.
 *
 * @name module:js-data.hasOne
 * @method
 * @param {Mapper} related The relation of which the target has one.
 * @param {Object} opts Configuration options.
 * @param {string} [opts.foreignKey] The field that holds the primary key of the
 * related record.
 * @param {string} opts.localField The field that holds a reference to the
 * related record object.
 * @returns {Function} Invocation function, which accepts the target as the only
 * parameter.
 */
var hasOne = function hasOne(related, opts) {
  return function (mapper) {
    Relation.hasOne(related, opts).assignTo(mapper);
  };
};

var DOMAIN$3 = 'Record';

var superMethod = function superMethod(mapper, name) {
  var store = mapper.datastore;
  if (store && store[name]) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return store[name].apply(store, [mapper.name].concat(args));
    };
  }
  return mapper[name].bind(mapper);
};

// Cache these strings
var creatingPath = 'creating';
var noValidatePath$1 = 'noValidate';
var keepChangeHistoryPath = 'keepChangeHistory';
var previousPath = 'previous';

/**
 * js-data's Record class. An instance of `Record` corresponds to an in-memory
 * representation of a single row or document in a database, Firebase,
 * localstorage, etc. Basically, a `Record` instance represents whatever kind of
 * entity in your persistence layer that has a primary key.
 *
 * ```javascript
 * import {Record} from 'js-data'
 * ```
 *
 * @example <caption>Record#constructor</caption>
 * // Normally you would do: import {Record} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Record} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Instantiate a plain record
 * let record = new Record()
 * console.log('record: ' + JSON.stringify(record))
 *
 * // You can supply properties on instantiation
 * record = new Record({ name: 'John' })
 * console.log('record: ' + JSON.stringify(record))
 *
 * @example <caption>Record#constructor2</caption>
 * // Normally you would do: import {Mapper} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Mapper} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Instantiate a record that's associated with a Mapper:
 * const UserMapper = new Mapper({ name: 'user' })
 * const User = UserMapper.recordClass
 * const user = UserMapper.createRecord({ name: 'John' })
 * const user2 = new User({ name: 'Sally' })
 * console.log('user: ' + JSON.stringify(user))
 * console.log('user2: ' + JSON.stringify(user2))
 *
 * @example <caption>Record#constructor3</caption>
 * // Normally you would do: import {Container} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Container} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new Container()
 * store.defineMapper('user')
 *
 * // Instantiate a record that's associated with a store's Mapper
 * const user = store.createRecord('user', { name: 'John' })
 * console.log('user: ' + JSON.stringify(user))
 *
 * @example <caption>Record#constructor4</caption>
 * // Normally you would do: import {Container} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Container} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new Container()
 * store.defineMapper('user', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' }
 *     }
 *   }
 * })
 *
 * // Validate on instantiation
 * const user = store.createRecord('user', { name: 1234 })
 * console.log('user: ' + JSON.stringify(user))
 *
 * @example <caption>Record#constructor5</caption>
 * // Normally you would do: import {Container} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Container} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new Container()
 * store.defineMapper('user', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' }
 *     }
 *   }
 * })
 *
 * // Skip validation on instantiation
 * const user = store.createRecord('user', { name: 1234 }, { noValidate: true })
 * console.log('user: ' + JSON.stringify(user))
 * console.log('user.isValid(): ' + user.isValid())
 *
 * @class Record
 * @extends Component
 * @param {Object} [props] The initial properties of the new Record instance.
 * @param {Object} [opts] Configuration options.
 * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
 * initial properties.
 * @param {boolean} [opts.validateOnSet=true] Whether to enable setter
 * validation on properties after the Record has been initialized.
 * @since 3.0.0
 */
function Record(props, opts) {
  utils.classCallCheck(this, Record);
  Settable.call(this);
  props || (props = {});
  opts || (opts = {});
  var _set = this._set;
  var mapper = this.constructor.mapper;

  _set(creatingPath, true);
  _set(noValidatePath$1, !!opts.noValidate);
  _set(keepChangeHistoryPath, opts.keepChangeHistory === undefined ? mapper ? mapper.keepChangeHistory : true : opts.keepChangeHistory);

  // Set the idAttribute value first, if it exists.
  var id = mapper ? utils.get(props, mapper.idAttribute) : undefined;
  if (id !== undefined) {
    utils.set(this, mapper.idAttribute, id);
  }

  utils.fillIn(this, props);
  _set(creatingPath, false);
  if (opts.validateOnSet !== undefined) {
    _set(noValidatePath$1, !opts.validateOnSet);
  } else if (mapper && mapper.validateOnSet !== undefined) {
    _set(noValidatePath$1, !mapper.validateOnSet);
  } else {
    _set(noValidatePath$1, false);
  }
  _set(previousPath, mapper ? mapper.toJSON(props) : utils.plainCopy(props));
}

var Record$1 = Component$1.extend({
  constructor: Record,

  /**
   * Returns the {@link Mapper} paired with this record's class, if any.
   *
   * @method Record#_mapper
   * @returns {Mapper} The {@link Mapper} paired with this record's class, if any.
   * @since 3.0.0
   */
  _mapper: function _mapper() {
    var mapper = this.constructor.mapper;
    if (!mapper) {
      throw utils.err(DOMAIN$3 + '#_mapper', '')(404, 'mapper');
    }
    return mapper;
  },


  /**
   * Lifecycle hook.
   *
   * @method Record#afterLoadRelations
   * @param {string[]} relations The `relations` argument passed to {@link Record#loadRelations}.
   * @param {Object} opts The `opts` argument passed to {@link Record#loadRelations}.
   * @since 3.0.0
   */
  afterLoadRelations: function afterLoadRelations() {},


  /**
   * Lifecycle hook.
   *
   * @method Record#beforeLoadRelations
   * @param {string[]} relations The `relations` argument passed to {@link Record#loadRelations}.
   * @param {Object} opts The `opts` argument passed to {@link Record#loadRelations}.
   * @since 3.0.0
   */
  beforeLoadRelations: function beforeLoadRelations() {},


  /**
   * Return the change history of this record since it was instantiated or
   * {@link Record#commit} was called.
   *
   * @method Record#changeHistory
   * @since 3.0.0
   */
  changeHistory: function changeHistory() {
    return (this._get('history') || []).slice();
  },


  /**
   * Return changes to this record since it was instantiated or
   * {@link Record#commit} was called.
   *
   * @example <caption>Record#changes</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container()
   * store.defineMapper('user')
   * const user = store.createRecord('user')
   * console.log('user changes: ' + JSON.stringify(user.changes()))
   * user.name = 'John'
   * console.log('user changes: ' + JSON.stringify(user.changes()))
   *
   * @method Record#changes
   * @param [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {Object} Object describing the changes to this record since it was
   * instantiated or its {@link Record#commit} method was last called.
   * @since 3.0.0
   */
  changes: function changes(opts) {
    opts || (opts = {});
    return utils.diffObjects(typeof this.toJSON === 'function' ? this.toJSON(opts) : this, this._get('previous'), opts);
  },


  /**
   * Make the record's current in-memory state it's only state, with any
   * previous property values being set to current values.
   *
   * @example <caption>Record#commit</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container()
   * store.defineMapper('user')
   * const user = store.createRecord('user')
   * console.log('user hasChanges: ' + user.hasChanges())
   * user.name = 'John'
   * console.log('user hasChanges: ' + user.hasChanges())
   * user.commit()
   * console.log('user hasChanges: ' + user.hasChanges())
   *
   * @method Record#commit
   * @param {Object} [opts] Configuration options. Passed to {@link Record#toJSON}.
   * @since 3.0.0
   */
  commit: function commit(opts) {
    this._set('changed'); // unset
    this._set('history', []); // clear history
    this._set('previous', this.toJSON(opts));
  },


  /**
   * Call {@link Mapper#destroy} using this record's primary key.
   *
   * @example
   * import {Container} from 'js-data'
   * import {RethinkDBAdapter} from 'js-data-rethinkdb'
   *
   * const store = new Container()
   * store.registerAdapter('rethink', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('user')
   * store.find('user', 1234).then((user) => {
   *   console.log(user.id) // 1234
   *
   *   // Destroy this user from the database
   *   return user.destroy()
   * })
   *
   * @method Record#destroy
   * @param {Object} [opts] Configuration options passed to {@link Mapper#destroy}.
   * @returns {Promise} The result of calling {@link Mapper#destroy} with the
   * primary key of this record.
   * @since 3.0.0
   */
  destroy: function destroy(opts) {
    opts || (opts = {});
    var mapper = this._mapper();
    return superMethod(mapper, 'destroy')(utils.get(this, mapper.idAttribute), opts);
  },


  /**
   * Return the value at the given path for this instance.
   *
   * @example <caption>Record#get</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   *
   * const user = store.createRecord('user', { name: 'Bob' })
   * console.log('user.get("name"): ' + user.get('name'))
   *
   * @method Record#get
   * @param {string} key Path of value to retrieve.
   * @returns {*} Value at path.
   * @since 3.0.0
   */
  'get': function get$$1(key) {
    return utils.get(this, key);
  },


  /**
   * Return whether this record has changed since it was instantiated or
   * {@link Record#commit} was called.
   *
   * @example <caption>Record#hasChanges</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   * const user = store.createRecord('user')
   * console.log('user hasChanges: ' + user.hasChanges())
   * user.name = 'John'
   * console.log('user hasChanges: ' + user.hasChanges())
   * user.commit()
   * console.log('user hasChanges: ' + user.hasChanges())
   *
   * @method Record#hasChanges
   * @param [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {boolean} Return whether the record has changed since it was
   * instantiated or since its {@link Record#commit} method was called.
   * @since 3.0.0
   */
  hasChanges: function hasChanges(opts) {
    var quickHasChanges = !!(this._get('changed') || []).length;
    return quickHasChanges || utils.areDifferent(typeof this.toJSON === 'function' ? this.toJSON(opts) : this, this._get('previous'), opts);
  },


  /**
   * Return whether the record is unsaved. Records that have primary keys are
   * considered "saved". Records without primary keys are considered "unsaved".
   *
   * @example <caption>Record#isNew</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   * const user = store.createRecord('user', {
   *   id: 1234
   * })
   * const user2 = store.createRecord('user')
   * console.log('user isNew: ' + user.isNew()) // false
   * console.log('user2 isNew: ' + user2.isNew()) // true
   *
   * @method Record#isNew
   * @returns {boolean} Whether the record is unsaved.
   * @since 3.0.0
   */
  isNew: function isNew(opts) {
    return utils.get(this, this._mapper().idAttribute) === undefined;
  },


  /**
   * Return whether the record in its current state passes validation.
   *
   * @example <caption>Record#isValid</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user', {
   *   schema: {
   *     properties: {
   *       name: { type: 'string' }
   *     }
   *   }
   * })
   * const user = store.createRecord('user', {
   *   name: 1234
   * }, {
   *   noValidate: true // this allows us to put the record into an invalid state
   * })
   * console.log('user isValid: ' + user.isValid())
   * user.name = 'John'
   * console.log('user isValid: ' + user.isValid())
   *
   * @method Record#isValid
   * @param {Object} [opts] Configuration options. Passed to {@link Mapper#validate}.
   * @returns {boolean} Whether the record in its current state passes
   * validation.
   * @since 3.0.0
   */
  isValid: function isValid(opts) {
    return !this._mapper().validate(this, opts);
  },
  removeInverseRelation: function removeInverseRelation(currentParent, id, inverseDef, idAttribute) {
    var _this = this;

    if (inverseDef.type === hasOneType) {
      safeSetLink(currentParent, inverseDef.localField, undefined);
    } else if (inverseDef.type === hasManyType) {
      // e.g. remove comment from otherPost.comments
      var children = utils.get(currentParent, inverseDef.localField);
      if (id === undefined) {
        utils.remove(children, function (child) {
          return child === _this;
        });
      } else {
        utils.remove(children, function (child) {
          return child === _this || id === utils.get(child, idAttribute);
        });
      }
    }
  },
  setupInverseRelation: function setupInverseRelation(record, id, inverseDef, idAttribute) {
    var _this2 = this;

    // Update (set) inverse relation
    if (inverseDef.type === hasOneType) {
      // e.g. someUser.profile = profile
      safeSetLink(record, inverseDef.localField, this);
    } else if (inverseDef.type === hasManyType) {
      // e.g. add comment to somePost.comments
      var children = utils.get(record, inverseDef.localField);
      if (id === undefined) {
        utils.noDupeAdd(children, this, function (child) {
          return child === _this2;
        });
      } else {
        utils.noDupeAdd(children, this, function (child) {
          return child === _this2 || id === utils.get(child, idAttribute);
        });
      }
    }
  },


  /**
   * Lazy load relations of this record, to be attached to the record once their
   * loaded.
   *
   * @example
   * import {Container} from 'js-data'
   * import {RethinkDBAdapter} from 'js-data-rethinkdb'
   *
   * const store = new Container()
   * store.registerAdapter('rethink', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('user', {
   *   relations: {
   *     hasMany: {
   *       post: {
   *         localField: 'posts',
   *         foreignKey: 'user_id'
   *       }
   *     }
   *   }
   * })
   * store.defineMapper('post', {
   *   relations: {
   *     belongsTo: {
   *       user: {
   *         localField: 'user',
   *         foreignKey: 'user_id'
   *       }
   *     }
   *   }
   * })
   * store.find('user', 1234).then((user) => {
   *   console.log(user.id) // 1234
   *
   *   // Load the user's post relations
   *   return user.loadRelations(['post'])
   * }).then((user) => {
   *   console.log(user.posts) // [{...}, {...}, ...]
   * })
   *
   * @method Record#loadRelations
   * @param {string[]} [relations] List of relations to load. Can use localField
   * names or Mapper names to pick relations.
   * @param {Object} [opts] Configuration options.
   * @returns {Promise} Resolves with the record, with the loaded relations now
   * attached.
   * @since 3.0.0
   */
  loadRelations: function loadRelations(relations, opts) {
    var _this3 = this;

    var op = void 0;
    var mapper = this._mapper();

    // Default values for arguments
    relations || (relations = []);
    if (utils.isString(relations)) {
      relations = [relations];
    }
    opts || (opts = {});
    opts.with = relations;

    // Fill in "opts" with the Model's configuration
    utils._(opts, mapper);
    opts.adapter = mapper.getAdapterName(opts);

    // beforeLoadRelations lifecycle hook
    op = opts.op = 'beforeLoadRelations';
    return utils.resolve(this[op](relations, opts)).then(function () {
      // Now delegate to the adapter
      op = opts.op = 'loadRelations';
      mapper.dbg(op, _this3, relations, opts);
      var tasks = [];
      var task = void 0;
      utils.forEachRelation(mapper, opts, function (def, optsCopy) {
        var relatedMapper = def.getRelation();
        optsCopy.raw = false;
        if (utils.isFunction(def.load)) {
          task = def.load(mapper, def, _this3, opts);
        } else if (def.type === 'hasMany' || def.type === 'hasOne') {
          if (def.foreignKey) {
            task = superMethod(relatedMapper, 'findAll')(defineProperty({}, def.foreignKey, utils.get(_this3, mapper.idAttribute)), optsCopy).then(function (relatedData) {
              if (def.type === 'hasOne') {
                return relatedData.length ? relatedData[0] : undefined;
              }
              return relatedData;
            });
          } else if (def.localKeys) {
            task = superMethod(relatedMapper, 'findAll')({
              where: defineProperty({}, relatedMapper.idAttribute, {
                'in': utils.get(_this3, def.localKeys)
              })
            });
          } else if (def.foreignKeys) {
            task = superMethod(relatedMapper, 'findAll')({
              where: defineProperty({}, def.foreignKeys, {
                'contains': utils.get(_this3, mapper.idAttribute)
              })
            }, opts);
          }
        } else if (def.type === 'belongsTo') {
          var key = utils.get(_this3, def.foreignKey);
          if (utils.isSorN(key)) {
            task = superMethod(relatedMapper, 'find')(key, optsCopy);
          }
        }
        if (task) {
          task = task.then(function (relatedData) {
            def.setLocalField(_this3, relatedData);
          });
          tasks.push(task);
        }
      });
      return Promise.all(tasks);
    }).then(function () {
      // afterLoadRelations lifecycle hook
      op = opts.op = 'afterLoadRelations';
      return utils.resolve(_this3[op](relations, opts)).then(function () {
        return _this3;
      });
    });
  },


  /**
   * Return the properties with which this record was instantiated.
   *
   * @example <caption>Record#previous</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   * const user = store.createRecord('user', {
   *   name: 'William'
   * })
   * console.log('user previous: ' + JSON.stringify(user.previous()))
   * user.name = 'Bob'
   * console.log('user previous: ' + JSON.stringify(user.previous()))
   * user.commit()
   * console.log('user previous: ' + JSON.stringify(user.previous()))
   *
   * @method Record#previous
   * @param {string} [key] If specified, return just the initial value of the
   * given key.
   * @returns {Object} The initial properties of this record.
   * @since 3.0.0
   */
  previous: function previous(key) {
    if (key) {
      return this._get('previous.' + key);
    }
    return this._get('previous');
  },


  /**
   * Revert changes to this record back to the properties it had when it was
   * instantiated.
   *
   * @example <caption>Record#revert</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   * const user = store.createRecord('user', {
   *   name: 'William'
   * })
   * console.log('user: ' + JSON.stringify(user))
   * user.name = 'Bob'
   * console.log('user: ' + JSON.stringify(user))
   * user.revert()
   * console.log('user: ' + JSON.stringify(user))
   *
   * @method Record#revert
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.preserve] Array of strings or Regular Expressions
   * denoting properties that should not be reverted.
   * @since 3.0.0
   */
  revert: function revert(opts) {
    var _this4 = this;

    var previous = this._get('previous');
    opts || (opts = {});
    opts.preserve || (opts.preserve = []);
    utils.forOwn(this, function (value, key) {
      if (key !== _this4._mapper().idAttribute && !previous.hasOwnProperty(key) && _this4.hasOwnProperty(key) && opts.preserve.indexOf(key) === -1) {
        delete _this4[key];
      }
    });
    utils.forOwn(previous, function (value, key) {
      if (opts.preserve.indexOf(key) === -1) {
        _this4[key] = value;
      }
    });
    this.commit();
  },


  /**
   * Delegates to {@link Mapper#create} or {@link Mapper#update}.
   *
   * @example
   * import {Container} from 'js-data'
   * import {RethinkDBAdapter} from 'js-data-rethinkdb'
   *
   * const store = new Container()
   * store.registerAdapter('rethink', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('session')
   * const session = store.createRecord('session', { topic: 'Node.js' })
   *
   * // Create a new record in the database
   * session.save().then(() => {
   *   console.log(session.id) // 1234
   *
   *   session.skill_level = 'beginner'
   *
   *   // Update the record in the database
   *   return session.save()
   * })
   *
   * @method Record#save
   * @param {Object} [opts] Configuration options. See {@link Mapper#create} and
   * {@link Mapper#update}.
   * @param {boolean} [opts.changesOnly] Equality function. Default uses `===`.
   * @param {Function} [opts.equalsFn] Passed to {@link Record#changes} when
   * `opts.changesOnly` is `true`.
   * @param {Array} [opts.ignore] Passed to {@link Record#changes} when
   * `opts.changesOnly` is `true`.
   * @returns {Promise} The result of calling {@link Mapper#create} or
   * {@link Mapper#update}.
   * @since 3.0.0
   */
  save: function save(opts) {
    var _this5 = this;

    opts || (opts = {});
    var mapper = this._mapper();
    var id = utils.get(this, mapper.idAttribute);
    var props = this;

    var postProcess = function postProcess(result) {
      var record = opts.raw ? result.data : result;
      if (record) {
        utils.deepMixIn(_this5, record);
        _this5.commit();
      }
      return result;
    };

    if (id === undefined) {
      return superMethod(mapper, 'create')(props, opts).then(postProcess);
    }
    if (opts.changesOnly) {
      var changes = this.changes(opts);
      props = {};
      utils.fillIn(props, changes.added);
      utils.fillIn(props, changes.changed);
    }
    return superMethod(mapper, 'update')(id, props, opts).then(postProcess);
  },


  /**
   * Set the value for a given key, or the values for the given keys if "key" is
   * an object. Triggers change events on those properties that have `track: true`
   * in {@link Mapper#schema}.
   *
   * @example <caption>Record#set</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   *
   * const user = store.createRecord('user')
   * console.log('user: ' + JSON.stringify(user))
   *
   * user.set('name', 'Bob')
   * console.log('user: ' + JSON.stringify(user))
   *
   * user.set({ age: 30, role: 'admin' })
   * console.log('user: ' + JSON.stringify(user))
   *
   * @fires Record#change
   * @method Record#set
   * @param {(string|Object)} key Key to set or hash of key-value pairs to set.
   * @param {*} [value] Value to set for the given key.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.silent=false] Whether to trigger change events.
   * @since 3.0.0
   */
  'set': function set$$1(key, value, opts) {
    if (utils.isObject(key)) {
      opts = value;
    }
    opts || (opts = {});
    if (opts.silent) {
      this._set('silent', true);
    }
    utils.set(this, key, value);
    if (!this._get('eventId')) {
      this._set('silent'); // unset
    }
  },


  /**
   * Return a plain object representation of this record. If the class from
   * which this record was created has a Mapper, then {@link Mapper#toJSON} will
   * be called with this record instead.
   *
   * @example <caption>Record#toJSON</caption>
   * // Normally you would do: import { Container } from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.8')
   * const { Container } = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user', {
   *   schema: {
   *     properties: {
   *       name: { type: 'string' }
   *     }
   *   }
   * })
   *
   * const user = store.createRecord('user', {
   *   name: 'John',
   *   $$hashKey: '1234'
   * })
   * console.log('user: ' + JSON.stringify(user.toJSON()))
   *
   * @method Record#toJSON
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Array of relation names or relation fields
   * to include in the representation. Only available as an option if the class
   * from which this record was created has a Mapper and this record resides in
   * an instance of {@link DataStore}.
   * @returns {Object} Plain object representation of this record.
   * @since 3.0.0
   */
  toJSON: function toJSON(opts) {
    var mapper = this.constructor.mapper;
    if (mapper) {
      return mapper.toJSON(this, opts);
    } else {
      var json = {};
      utils.forOwn(this, function (prop, key) {
        json[key] = utils.plainCopy(prop);
      });
      return json;
    }
  },


  /**
   * Unset the value for a given key. Triggers change events on those properties
   * that have `track: true` in {@link Mapper#schema}.
   *
   * @example <caption>Record#unset</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user')
   *
   * const user = store.createRecord('user', {
   *   name: 'John'
   * })
   * console.log('user: ' + JSON.stringify(user))
   *
   * user.unset('name')
   * console.log('user: ' + JSON.stringify(user))
   *
   * @method Record#unset
   * @param {string} key Key to unset.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.silent=false] Whether to trigger change events.
   * @since 3.0.0
   */
  unset: function unset(key, opts) {
    this.set(key, undefined, opts);
  },


  /**
   * Validate this record based on its current properties.
   *
   * @example <caption>Record#validate</caption>
   * // Normally you would do: import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   * const store = new Container()
   * store.defineMapper('user', {
   *   schema: {
   *     properties: {
   *       name: { type: 'string' }
   *     }
   *   }
   * })
   * const user = store.createRecord('user', {
   *   name: 1234
   * }, {
   *   noValidate: true // this allows us to put the record into an invalid state
   * })
   * console.log('user validation: ' + JSON.stringify(user.validate()))
   * user.name = 'John'
   * console.log('user validation: ' + user.validate())
   *
   * @method Record#validate
   * @param {Object} [opts] Configuration options. Passed to {@link Mapper#validate}.
   * @returns {*} Array of errors or `undefined` if no errors.
   * @since 3.0.0
   */
  validate: function validate(opts) {
    return this._mapper().validate(this, opts);
  }
}, {
  creatingPath: creatingPath,
  noValidatePath: noValidatePath$1,
  keepChangeHistoryPath: keepChangeHistoryPath,
  previousPath: previousPath
});

/**
 * Allow records to emit events.
 *
 * An record's registered listeners are stored in the record's private data.
 */
utils.eventify(Record.prototype, function () {
  return this._get('events');
}, function (value) {
  this._set('events', value);
});

/**
 * Fired when a record changes. Only works for records that have tracked fields.
 * See {@link Record~changeListener} on how to listen for this event.
 *
 * @event Record#change
 * @see Record~changeListener
 */

/**
 * Callback signature for the {@link Record#event:change} event.
 *
 * @example
 * function onChange (record, changes) {
 *   // do something
 * }
 * record.on('change', onChange)
 *
 * @callback Record~changeListener
 * @param {Record} The Record that changed.
 * @param {Object} The changes.
 * @see Record#event:change
 * @since 3.0.0
 */

/**
 * Create a subclass of this Record:
 * @example <caption>Record.extend</caption>
 * // Normally you would do: import {Record} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Record} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomRecordClass extends Record {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customRecord = new CustomRecordClass()
 * console.log(customRecord.foo())
 * console.log(CustomRecordClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherRecordClass = Record.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherRecord = new OtherRecordClass()
 * console.log(otherRecord.foo())
 * console.log(OtherRecordClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherRecordClass () {
 *   Record.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Record.extend({
 *   constructor: AnotherRecordClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherRecord = new AnotherRecordClass()
 * console.log(anotherRecord.created_at)
 * console.log(anotherRecord.foo())
 * console.log(AnotherRecordClass.beep())
 *
 * @method Record.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Record class.
 * @since 3.0.0
 */

function sort(a, b, hashCode) {
  // Short-circuit comparison if a and b are strictly equal
  // This is absolutely necessary for indexed objects that
  // don't have the idAttribute field
  if (a === b) {
    return 0;
  }
  if (hashCode) {
    a = hashCode(a);
    b = hashCode(b);
  }
  if (a === null && b === null || a === undefined && b === undefined) {
    return -1;
  }

  if (a === null || a === undefined) {
    return -1;
  }

  if (b === null || b === undefined) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function insertAt(array, index, value) {
  array.splice(index, 0, value);
  return array;
}

function removeAt(array, index) {
  array.splice(index, 1);
  return array;
}

function binarySearch(array, value, field) {
  var lo = 0;
  var hi = array.length;
  var compared = void 0;
  var mid = void 0;

  while (lo < hi) {
    mid = (lo + hi) / 2 | 0;
    compared = sort(value, array[mid], field);
    if (compared === 0) {
      return {
        found: true,
        index: mid
      };
    } else if (compared < 0) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return {
    found: false,
    index: hi
  };
}

// Copyright (c) 2015, InternalFX.

// Permission to use, copy, modify, and/or distribute this software for any purpose with or
// without fee is hereby granted, provided that the above copyright notice and this permission
// notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO
// THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT
// SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
// ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
// OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE
// USE OR PERFORMANCE OF THIS SOFTWARE.

// Modifications
// Copyright 2015-2016 Jason Dobry
//
// Summary of modifications:
// Reworked dependencies so as to re-use code already in js-data
// Removed unused code
function Index(fieldList, opts) {
  utils.classCallCheck(this, Index);
  fieldList || (fieldList = []);

  if (!utils.isArray(fieldList)) {
    throw new Error('fieldList must be an array.');
  }

  opts || (opts = {});
  this.fieldList = fieldList;
  this.fieldGetter = opts.fieldGetter;
  this.hashCode = opts.hashCode;
  this.isIndex = true;
  this.keys = [];
  this.values = [];
}

utils.addHiddenPropsToTarget(Index.prototype, {
  'set': function set(keyList, value) {
    if (!utils.isArray(keyList)) {
      keyList = [keyList];
    }

    var key = keyList.shift() || undefined;
    var pos = binarySearch(this.keys, key);

    if (keyList.length === 0) {
      if (pos.found) {
        var dataLocation = binarySearch(this.values[pos.index], value, this.hashCode);
        if (!dataLocation.found) {
          insertAt(this.values[pos.index], dataLocation.index, value);
        }
      } else {
        insertAt(this.keys, pos.index, key);
        insertAt(this.values, pos.index, [value]);
      }
    } else {
      if (pos.found) {
        this.values[pos.index].set(keyList, value);
      } else {
        insertAt(this.keys, pos.index, key);
        var newIndex = new Index([], { hashCode: this.hashCode });
        newIndex.set(keyList, value);
        insertAt(this.values, pos.index, newIndex);
      }
    }
  },
  'get': function get(keyList) {
    if (!utils.isArray(keyList)) {
      keyList = [keyList];
    }

    var key = keyList.shift() || undefined;
    var pos = binarySearch(this.keys, key);

    if (keyList.length === 0) {
      if (pos.found) {
        if (this.values[pos.index].isIndex) {
          return this.values[pos.index].getAll();
        } else {
          return this.values[pos.index].slice();
        }
      } else {
        return [];
      }
    } else {
      if (pos.found) {
        return this.values[pos.index].get(keyList);
      } else {
        return [];
      }
    }
  },
  getAll: function getAll(opts) {
    opts || (opts = {});
    var results = [];
    var values = this.values;
    if (opts.order === 'desc') {
      for (var i = values.length - 1; i >= 0; i--) {
        var value = values[i];
        if (value.isIndex) {
          results = results.concat(value.getAll(opts));
        } else {
          results = results.concat(value);
        }
      }
    } else {
      for (var _i = 0; _i < values.length; _i++) {
        var _value = values[_i];
        if (_value.isIndex) {
          results = results.concat(_value.getAll(opts));
        } else {
          results = results.concat(_value);
        }
      }
    }
    return results;
  },
  visitAll: function visitAll(cb, thisArg) {
    this.values.forEach(function (value) {
      if (value.isIndex) {
        value.visitAll(cb, thisArg);
      } else {
        value.forEach(cb, thisArg);
      }
    });
  },
  between: function between(leftKeys, rightKeys, opts) {
    opts || (opts = {});
    if (!utils.isArray(leftKeys)) {
      leftKeys = [leftKeys];
    }
    if (!utils.isArray(rightKeys)) {
      rightKeys = [rightKeys];
    }
    utils.fillIn(opts, {
      leftInclusive: true,
      rightInclusive: false,
      limit: undefined,
      offset: 0
    });

    var results = this._between(leftKeys, rightKeys, opts);

    if (opts.limit) {
      return results.slice(opts.offset, opts.limit + opts.offset);
    } else {
      return results.slice(opts.offset);
    }
  },
  _between: function _between(leftKeys, rightKeys, opts) {
    var results = [];

    var leftKey = leftKeys.shift();
    var rightKey = rightKeys.shift();

    var pos = void 0;

    if (leftKey !== undefined) {
      pos = binarySearch(this.keys, leftKey);
    } else {
      pos = {
        found: false,
        index: 0
      };
    }

    if (leftKeys.length === 0) {
      if (pos.found && opts.leftInclusive === false) {
        pos.index += 1;
      }

      for (var i = pos.index; i < this.keys.length; i += 1) {
        if (rightKey !== undefined) {
          if (opts.rightInclusive) {
            if (this.keys[i] > rightKey) {
              break;
            }
          } else {
            if (this.keys[i] >= rightKey) {
              break;
            }
          }
        }

        if (this.values[i].isIndex) {
          results = results.concat(this.values[i].getAll());
        } else {
          results = results.concat(this.values[i]);
        }

        if (opts.limit) {
          if (results.length >= opts.limit + opts.offset) {
            break;
          }
        }
      }
    } else {
      for (var _i2 = pos.index; _i2 < this.keys.length; _i2 += 1) {
        var currKey = this.keys[_i2];
        if (currKey > rightKey) {
          break;
        }

        if (this.values[_i2].isIndex) {
          if (currKey === leftKey) {
            results = results.concat(this.values[_i2]._between(utils.copy(leftKeys), rightKeys.map(function () {
              return undefined;
            }), opts));
          } else if (currKey === rightKey) {
            results = results.concat(this.values[_i2]._between(leftKeys.map(function () {
              return undefined;
            }), utils.copy(rightKeys), opts));
          } else {
            results = results.concat(this.values[_i2].getAll());
          }
        } else {
          results = results.concat(this.values[_i2]);
        }

        if (opts.limit) {
          if (results.length >= opts.limit + opts.offset) {
            break;
          }
        }
      }
    }

    if (opts.limit) {
      return results.slice(0, opts.limit + opts.offset);
    } else {
      return results;
    }
  },
  peek: function peek() {
    if (this.values.length) {
      if (this.values[0].isIndex) {
        return this.values[0].peek();
      } else {
        return this.values[0];
      }
    }
    return [];
  },
  clear: function clear() {
    this.keys = [];
    this.values = [];
  },
  insertRecord: function insertRecord(data) {
    var keyList = this.fieldList.map(function (field) {
      if (utils.isFunction(field)) {
        return field(data) || undefined;
      } else {
        return data[field] || undefined;
      }
    });
    this.set(keyList, data);
  },
  removeRecord: function removeRecord(data) {
    var _this = this;

    var removed = void 0;
    var isUnique = this.hashCode(data) !== undefined;
    this.values.forEach(function (value, i) {
      if (value.isIndex) {
        if (value.removeRecord(data)) {
          if (value.keys.length === 0) {
            removeAt(_this.keys, i);
            removeAt(_this.values, i);
          }
          removed = true;
          return false;
        }
      } else {
        var dataLocation = {};
        if (_this.keys[i] === undefined || !isUnique) {
          for (var j = value.length - 1; j >= 0; j--) {
            if (value[j] === data) {
              dataLocation = {
                found: true,
                index: j
              };
              break;
            }
          }
        } else if (isUnique) {
          dataLocation = binarySearch(value, data, _this.hashCode);
        }
        if (dataLocation.found) {
          removeAt(value, dataLocation.index);
          if (value.length === 0) {
            removeAt(_this.keys, i);
            removeAt(_this.values, i);
          }
          removed = true;
          return false;
        }
      }
    });
    return removed ? data : undefined;
  },
  updateRecord: function updateRecord(data) {
    var removed = this.removeRecord(data);
    if (removed !== undefined) {
      this.insertRecord(data);
    }
  }
});

var noValidatePath = Record$1.noValidatePath;


var DOMAIN$1 = 'Collection';

var COLLECTION_DEFAULTS = {
  /**
   * Whether to call {@link Record#commit} on records that are added to the
   * collection and already exist in the collection.
   *
   * @name Collection#commitOnMerge
   * @type {boolean}
   * @default true
   */
  commitOnMerge: true,

  /**
   * Whether record events should bubble up and be emitted by the collection.
   *
   * @name Collection#emitRecordEvents
   * @type {boolean}
   * @default true
   */
  emitRecordEvents: true,

  /**
   * Field to be used as the unique identifier for records in this collection.
   * Defaults to `"id"` unless {@link Collection#mapper} is set, in which case
   * this will default to {@link Mapper#idAttribute}.
   *
   * @name Collection#idAttribute
   * @type {string}
   * @default "id"
   */
  idAttribute: 'id',

  /**
   * What to do when inserting a record into this Collection that shares a
   * primary key with a record already in this Collection.
   *
   * Possible values:
   * merge
   * replace
   * skip
   *
   * Merge:
   *
   * Recursively shallow copy properties from the new record onto the existing
   * record.
   *
   * Replace:
   *
   * Shallow copy top-level properties from the new record onto the existing
   * record. Any top-level own properties of the existing record that are _not_
   * on the new record will be removed.
   *
   * Skip:
   *
   * Ignore new record, keep existing record.
   *
   * @name Collection#onConflict
   * @type {string}
   * @default "merge"
   */
  onConflict: 'merge'

  /**
   * An ordered set of {@link Record} instances.
   *
   * @example <caption>Collection#constructor</caption>
   * // import {Collection, Record} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Collection, Record} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const user1 = new Record({ id: 1 })
   * const user2 = new Record({ id: 2 })
   * const UserCollection = new Collection([user1, user2])
   * console.log(UserCollection.get(1) === user1)
   *
   * @class Collection
   * @extends Component
   * @param {Array} [records] Initial set of records to insert into the
   * collection.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.commitOnMerge] See {@link Collection#commitOnMerge}.
   * @param {string} [opts.idAttribute] See {@link Collection#idAttribute}.
   * @param {string} [opts.onConflict="merge"] See {@link Collection#onConflict}.
   * @param {string} [opts.mapper] See {@link Collection#mapper}.
   * @since 3.0.0
   */
};function Collection(records, opts) {
  utils.classCallCheck(this, Collection);
  Component$1.call(this, opts);

  if (records && !utils.isArray(records)) {
    opts = records;
    records = [];
  }
  if (utils.isString(opts)) {
    opts = { idAttribute: opts };
  }

  // Default values for arguments
  records || (records = []);
  opts || (opts = {});

  Object.defineProperties(this, {
    /**
     * Default Mapper for this collection. Optional. If a Mapper is provided, then
     * the collection will use the {@link Mapper#idAttribute} setting, and will
     * wrap records in {@link Mapper#recordClass}.
     *
     * @example <caption>Collection#mapper</caption>
     * // Normally you would do: import {Collection, Mapper} from 'js-data'
     * const JSData = require('js-data@3.0.0-rc.4')
     * const {Collection, Mapper} = JSData
     * console.log('Using JSData v' + JSData.version.full)
     *
     * class MyMapperClass extends Mapper {
     *   foo () { return 'bar' }
     * }
     * const myMapper = new MyMapperClass({ name: 'myMapper' })
     * const collection = new Collection(null, { mapper: myMapper })
     *
     * @name Collection#mapper
     * @type {Mapper}
     * @default null
     * @since 3.0.0
     */
    mapper: {
      value: undefined,
      writable: true
    },
    // Query class used by this collection
    queryClass: {
      value: undefined,
      writable: true
    }
  });

  // Apply user-provided configuration
  utils.fillIn(this, opts);
  // Fill in any missing options with the defaults
  utils.fillIn(this, utils.copy(COLLECTION_DEFAULTS));

  if (!this.queryClass) {
    this.queryClass = Query$1;
  }

  var idAttribute = this.recordId();

  Object.defineProperties(this, {
    /**
     * The main index, which uses @{link Collection#recordId} as the key.
     *
     * @name Collection#index
     * @type {Index}
     */
    index: {
      value: new Index([idAttribute], {
        hashCode: function hashCode(obj) {
          return utils.get(obj, idAttribute);
        }
      })
    },

    /**
     * Object that holds the secondary indexes of this collection.
     *
     * @name Collection#indexes
     * @type {Object.<string, Index>}
     */
    indexes: {
      value: {}
    }
  });

  // Insert initial data into the collection
  if (utils.isObject(records) || utils.isArray(records) && records.length) {
    this.add(records);
  }
}

var Collection$1 = Component$1.extend({
  constructor: Collection,

  /**
   * Used to bind to events emitted by records in this Collection.
   *
   * @method Collection#_onRecordEvent
   * @since 3.0.0
   * @private
   * @param {...*} [arg] Args passed to {@link Collection#emit}.
   */
  _onRecordEvent: function _onRecordEvent() {
    if (this.emitRecordEvents) {
      this.emit.apply(this, arguments);
    }
  },


  /**
   * Insert the provided record or records.
   *
   * If a record is already in the collection then the provided record will
   * either merge with or replace the existing record based on the value of the
   * `onConflict` option.
   *
   * The collection's secondary indexes will be updated as each record is
   * visited.
   *
   * @method Collection#add
   * @since 3.0.0
   * @param {(Object|Object[]|Record|Record[])} data The record or records to insert.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.commitOnMerge=true] See {@link Collection#commitOnMerge}.
   * @param {boolean} [opts.noValidate] See {@link Record#noValidate}.
   * @param {string} [opts.onConflict] See {@link Collection#onConflict}.
   * @returns {(Object|Object[]|Record|Record[])} The added record or records.
   */
  add: function add(records, opts) {
    var _this = this;

    // Default values for arguments
    opts || (opts = {});

    // Fill in "opts" with the Collection's configuration
    utils._(opts, this);
    records = this.beforeAdd(records, opts) || records;

    // Track whether just one record or an array of records is being inserted
    var singular = false;
    var idAttribute = this.recordId();
    if (!utils.isArray(records)) {
      if (utils.isObject(records)) {
        records = [records];
        singular = true;
      } else {
        throw utils.err(DOMAIN$1 + '#add', 'records')(400, 'object or array', records);
      }
    }

    // Map the provided records to existing records.
    // New records will be inserted. If any records map to existing records,
    // they will be merged into the existing records according to the onConflict
    // option.
    records = records.map(function (record) {
      var id = _this.recordId(record);
      // Grab existing record if there is one
      var existing = id === undefined ? id : _this.get(id);
      // If the currently visited record is just a reference to an existing
      // record, then there is nothing to be done. Exit early.
      if (record === existing) {
        return existing;
      }

      if (existing) {
        // Here, the currently visited record corresponds to a record already
        // in the collection, so we need to merge them
        var onConflict = opts.onConflict || _this.onConflict;
        if (onConflict !== 'merge' && onConflict !== 'replace' && onConflict !== 'skip') {
          throw utils.err(DOMAIN$1 + '#add', 'opts.onConflict')(400, 'one of (merge, replace, skip)', onConflict, true);
        }
        var existingNoValidate = existing._get(noValidatePath);
        if (opts.noValidate) {
          // Disable validation
          existing._set(noValidatePath, true);
        }
        if (onConflict === 'merge') {
          utils.deepMixIn(existing, record);
        } else if (onConflict === 'replace') {
          utils.forOwn(existing, function (value, key) {
            if (key !== idAttribute && record[key] === undefined) {
              existing[key] = undefined;
            }
          });
          existing.set(record);
        } // else if(onConflict === 'skip'){ do nothing }

        if (opts.noValidate) {
          // Restore previous `noValidate` value
          existing._set(noValidatePath, existingNoValidate);
        }
        record = existing;
        if (opts.commitOnMerge && utils.isFunction(record.commit)) {
          record.commit();
        }
        // Update all indexes in the collection
        _this.updateIndexes(record);
      } else {
        // Here, the currently visted record does not correspond to any record
        // in the collection, so (optionally) instantiate this record and insert
        // it into the collection
        record = _this.mapper ? _this.mapper.createRecord(record, opts) : record;
        _this.index.insertRecord(record);
        utils.forOwn(_this.indexes, function (index, name) {
          index.insertRecord(record);
        });
        if (record && utils.isFunction(record.on)) {
          record.on('all', _this._onRecordEvent, _this);
        }
      }
      return record;
    });
    // Finally, return the inserted data
    var result = singular ? records[0] : records;
    if (!opts.silent) {
      this.emit('add', result);
    }
    return this.afterAdd(records, opts, result) || result;
  },


  /**
   * Lifecycle hook called by {@link Collection#add}. If this method returns a
   * value then {@link Collection#add} will return that same value.
   *
   * @method Collection#method
   * @since 3.0.0
   * @param {(Object|Object[]|Record|Record[])} result The record or records
   * that were added to this Collection by {@link Collection#add}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
   */
  afterAdd: function afterAdd() {},


  /**
   * Lifecycle hook called by {@link Collection#remove}. If this method returns
   * a value then {@link Collection#remove} will return that same value.
   *
   * @method Collection#afterRemove
   * @since 3.0.0
   * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
   * @param {Object} record The result that will be returned by {@link Collection#remove}.
   */
  afterRemove: function afterRemove() {},


  /**
   * Lifecycle hook called by {@link Collection#removeAll}. If this method
   * returns a value then {@link Collection#removeAll} will return that same
   * value.
   *
   * @method Collection#afterRemoveAll
   * @since 3.0.0
   * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
   * @param {Object} records The result that will be returned by {@link Collection#removeAll}.
   */
  afterRemoveAll: function afterRemoveAll() {},


  /**
   * Lifecycle hook called by {@link Collection#add}. If this method returns a
   * value then the `records` argument in {@link Collection#add} will be
   * re-assigned to the returned value.
   *
   * @method Collection#beforeAdd
   * @since 3.0.0
   * @param {(Object|Object[]|Record|Record[])} records The `records` argument passed to {@link Collection#add}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
   */
  beforeAdd: function beforeAdd() {},


  /**
   * Lifecycle hook called by {@link Collection#remove}.
   *
   * @method Collection#beforeRemove
   * @since 3.0.0
   * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
   */
  beforeRemove: function beforeRemove() {},


  /**
   * Lifecycle hook called by {@link Collection#removeAll}.
   *
   * @method Collection#beforeRemoveAll
   * @since 3.0.0
   * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
   */
  beforeRemoveAll: function beforeRemoveAll() {},


  /**
   * Find all records between two boundaries.
   *
   * Shortcut for `collection.query().between(18, 30, { index: 'age' }).run()`
   *
   * @example
   * // Get all users ages 18 to 30
   * const users = collection.between(18, 30, { index: 'age' })
   *
   * @example
   * // Same as above
   * const users = collection.between([18], [30], { index: 'age' })
   *
   * @method Collection#between
   * @since 3.0.0
   * @param {Array} leftKeys Keys defining the left boundary.
   * @param {Array} rightKeys Keys defining the right boundary.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @param {boolean} [opts.leftInclusive=true] Whether to include records
   * on the left boundary.
   * @param {boolean} [opts.rightInclusive=false] Whether to include records
   * on the left boundary.
   * @param {boolean} [opts.limit] Limit the result to a certain number.
   * @param {boolean} [opts.offset] The number of resulting records to skip.
   * @returns {Object[]|Record[]} The result.
   */
  between: function between(leftKeys, rightKeys, opts) {
    return this.query().between(leftKeys, rightKeys, opts).run();
  },


  /**
   * Create a new secondary index on the contents of the collection.
   *
   * @example
   * // Index users by age
   * collection.createIndex('age')
   *
   * @example
   * // Index users by status and role
   * collection.createIndex('statusAndRole', ['status', 'role'])
   *
   * @method Collection#createIndex
   * @since 3.0.0
   * @param {string} name The name of the new secondary index.
   * @param {string[]} [fieldList] Array of field names to use as the key or
   * compound key of the new secondary index. If no fieldList is provided, then
   * the name will also be the field that is used to index the collection.
   */
  createIndex: function createIndex(name, fieldList, opts) {
    var _this2 = this;

    if (utils.isString(name) && fieldList === undefined) {
      fieldList = [name];
    }
    opts || (opts = {});
    opts.hashCode || (opts.hashCode = function (obj) {
      return _this2.recordId(obj);
    });
    var index = this.indexes[name] = new Index(fieldList, opts);
    this.index.visitAll(index.insertRecord, index);
  },


  /**
   * Find the record or records that match the provided query or pass the
   * provided filter function.
   *
   * Shortcut for `collection.query().filter(queryOrFn[, thisArg]).run()`
   *
   * @example <caption>Collection#filter</caption>
   * // Normally you would do: import {Collection} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Collection} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const collection = new Collection([
   *   { id: 1, status: 'draft', created_at_timestamp: new Date().getTime() }
   * ])
   *
   * // Get the draft posts created less than three months ago
   * let posts = collection.filter({
   *   where: {
   *     status: {
   *       '==': 'draft'
   *     },
   *     created_at_timestamp: {
   *       '>=': (new Date().getTime() - (1000 \* 60 \* 60 \* 24 \* 30 \* 3)) // 3 months ago
   *     }
   *   }
   * })
   * console.log(posts)
   *
   * // Use a custom filter function
   * posts = collection.filter(function (post) {
   *   return post.id % 2 === 0
   * })
   *
   * @method Collection#filter
   * @param {(Object|Function)} [queryOrFn={}] Selection query or filter
   * function.
   * @param {Object} [thisArg] Context to which to bind `queryOrFn` if
   * `queryOrFn` is a function.
   * @returns {Array} The result.
   * @see query
   * @since 3.0.0
   */
  filter: function filter(query, thisArg) {
    return this.query().filter(query, thisArg).run();
  },


  /**
   * Iterate over all records.
   *
   * @example
   * collection.forEach(function (record) {
   *   // do something
   * })
   *
   * @method Collection#forEach
   * @since 3.0.0
   * @param {Function} forEachFn Iteration function.
   * @param {*} [thisArg] Context to which to bind `forEachFn`.
   * @returns {Array} The result.
   */
  forEach: function forEach(cb, thisArg) {
    this.index.visitAll(cb, thisArg);
  },


  /**
   * Get the record with the given id.
   *
   * @method Collection#get
   * @since 3.0.0
   * @param {(string|number)} id The primary key of the record to get.
   * @returns {(Object|Record)} The record with the given id.
   */
  get: function get(id) {
    var instances = id === undefined ? [] : this.query().get(id).run();
    return instances.length ? instances[0] : undefined;
  },


  /**
   * Find the record or records that match the provided keyLists.
   *
   * Shortcut for `collection.query().getAll(keyList1, keyList2, ...).run()`
   *
   * @example
   * // Get the posts where "status" is "draft" or "inReview"
   * const posts = collection.getAll('draft', 'inReview', { index: 'status' })
   *
   * @example
   * // Same as above
   * const posts = collection.getAll(['draft'], ['inReview'], { index: 'status' })
   *
   * @method Collection#getAll
   * @since 3.0.0
   * @param {...Array} [keyList] Provide one or more keyLists, and all
   * records matching each keyList will be retrieved. If no keyLists are
   * provided, all records will be returned.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @returns {Array} The result.
   */
  getAll: function getAll() {
    var _query;

    return (_query = this.query()).getAll.apply(_query, arguments).run();
  },


  /**
   * Return the index with the given name. If no name is provided, return the
   * main index. Throws an error if the specified index does not exist.
   *
   * @method Collection#getIndex
   * @since 3.0.0
   * @param {string} [name] The name of the index to retrieve.
   */
  getIndex: function getIndex(name) {
    var index = name ? this.indexes[name] : this.index;
    if (!index) {
      throw utils.err(DOMAIN$1 + '#getIndex', name)(404, 'index');
    }
    return index;
  },


  /**
   * Limit the result.
   *
   * Shortcut for `collection.query().limit(maximumNumber).run()`
   *
   * @example
   * const posts = collection.limit(10)
   *
   * @method Collection#limit
   * @since 3.0.0
   * @param {number} num The maximum number of records to keep in the result.
   * @returns {Array} The result.
   */
  limit: function limit(num) {
    return this.query().limit(num).run();
  },


  /**
   * Apply a mapping function to all records.
   *
   * @example
   * const names = collection.map(function (user) {
   *   return user.name
   * })
   *
   * @method Collection#map
   * @since 3.0.0
   * @param {Function} mapFn Mapping function.
   * @param {*} [thisArg] Context to which to bind `mapFn`.
   * @returns {Array} The result of the mapping.
   */
  map: function map(cb, thisArg) {
    var data = [];
    this.index.visitAll(function (value) {
      data.push(cb.call(thisArg, value));
    });
    return data;
  },


  /**
   * Return the result of calling the specified function on each record in this
   * collection's main index.
   *
   * @method Collection#mapCall
   * @since 3.0.0
   * @param {string} funcName Name of function to call
   * @parama {...*} [args] Remaining arguments to be passed to the function.
   * @returns {Array} The result.
   */
  mapCall: function mapCall(funcName) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var data = [];
    this.index.visitAll(function (record) {
      data.push(record[funcName].apply(record, args));
    });
    return data;
  },


  /**
   * Return all "unsaved" (not uniquely identifiable) records in this colleciton.
   *
   * @method Collection#prune
   * @param {Object} [opts] Configuration options, passed to {@link Collection#removeAll}.
   * @since 3.0.0
   * @returns {Array} The removed records, if any.
   */
  prune: function prune(opts) {
    return this.removeAll(this.unsaved(), opts);
  },


  /**
   * Create a new query to be executed against the contents of the collection.
   * The result will be all or a subset of the contents of the collection.
   *
   * @example
   * // Grab page 2 of users between ages 18 and 30
   * collection.query()
   *   .between(18, 30, { index: 'age' }) // between ages 18 and 30
   *   .skip(10) // second page
   *   .limit(10) // page size
   *   .run()
   *
   * @method Collection#query
   * @since 3.0.0
   * @returns {Query} New query object.
   */
  query: function query() {
    var Ctor = this.queryClass;
    return new Ctor(this);
  },


  /**
   * Return the primary key of the given, or if no record is provided, return the
   * name of the field that holds the primary key of records in this Collection.
   *
   * @method Collection#recordId
   * @since 3.0.0
   * @param {(Object|Record)} [record] The record whose primary key is to be
   * returned.
   * @returns {(string|number)} Primary key or name of field that holds primary
   * key.
   */
  recordId: function recordId(record) {
    if (record) {
      return utils.get(record, this.recordId());
    }
    return this.mapper ? this.mapper.idAttribute : this.idAttribute;
  },


  /**
   * Reduce the data in the collection to a single value and return the result.
   *
   * @example
   * const totalVotes = collection.reduce(function (prev, record) {
   *   return prev + record.upVotes + record.downVotes
   * }, 0)
   *
   * @method Collection#reduce
   * @since 3.0.0
   * @param {Function} cb Reduction callback.
   * @param {*} initialValue Initial value of the reduction.
   * @returns {*} The result.
   */
  reduce: function reduce(cb, initialValue) {
    var data = this.getAll();
    return data.reduce(cb, initialValue);
  },


  /**
   * Remove the record with the given id from this Collection.
   *
   * @method Collection#remove
   * @since 3.0.0
   * @param {(string|number|object|Record)} idOrRecord The primary key of the
   * record to be removed, or a reference to the record that is to be removed.
   * @param {Object} [opts] Configuration options.
   * @returns {Object|Record} The removed record, if any.
   */
  remove: function remove(idOrRecord, opts) {
    // Default values for arguments
    opts || (opts = {});
    this.beforeRemove(idOrRecord, opts);
    var record = utils.isSorN(idOrRecord) ? this.get(idOrRecord) : idOrRecord;

    // The record is in the collection, remove it
    if (utils.isObject(record)) {
      record = this.index.removeRecord(record);
      if (record) {
        utils.forOwn(this.indexes, function (index, name) {
          index.removeRecord(record);
        });
        if (utils.isFunction(record.off)) {
          record.off('all', this._onRecordEvent, this);
          if (!opts.silent) {
            this.emit('remove', record);
          }
        }
      }
    }
    return this.afterRemove(idOrRecord, opts, record) || record;
  },


  /**
   * Remove from this collection the given records or the records selected by
   * the given "query".
   *
   * @method Collection#removeAll
   * @since 3.0.0
   * @param {Object|Object[]|Record[]} [queryOrRecords={}] Records to be removed or selection query. See {@link query}.
   * @param {Object} [queryOrRecords.where] See {@link query.where}.
   * @param {number} [queryOrRecords.offset] See {@link query.offset}.
   * @param {number} [queryOrRecords.limit] See {@link query.limit}.
   * @param {string|Array[]} [queryOrRecords.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options.
   * @returns {(Object[]|Record[])} The removed records, if any.
   */
  removeAll: function removeAll(queryOrRecords, opts) {
    var _this3 = this;

    // Default values for arguments
    opts || (opts = {});
    this.beforeRemoveAll(queryOrRecords, opts);
    var records = utils.isArray(queryOrRecords) ? queryOrRecords.slice() : this.filter(queryOrRecords);

    // Remove each selected record from the collection
    var optsCopy = utils.plainCopy(opts);
    optsCopy.silent = true;
    records = records.map(function (record) {
      return _this3.remove(record, optsCopy);
    }).filter(function (record) {
      return record;
    });
    if (!opts.silent) {
      this.emit('remove', records);
    }
    return this.afterRemoveAll(queryOrRecords, opts, records) || records;
  },


  /**
   * Skip a number of results.
   *
   * Shortcut for `collection.query().skip(numberToSkip).run()`
   *
   * @example
   * const posts = collection.skip(10)
   *
   * @method Collection#skip
   * @since 3.0.0
   * @param {number} num The number of records to skip.
   * @returns {Array} The result.
   */
  skip: function skip(num) {
    return this.query().skip(num).run();
  },


  /**
   * Return the plain JSON representation of all items in this collection.
   * Assumes records in this collection have a toJSON method.
   *
   * @method Collection#toJSON
   * @since 3.0.0
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Array of relation names or relation fields
   * to include in the representation.
   * @returns {Array} The records.
   */
  toJSON: function toJSON(opts) {
    return this.mapCall('toJSON', opts);
  },


  /**
   * Return all "unsaved" (not uniquely identifiable) records in this colleciton.
   *
   * @method Collection#unsaved
   * @since 3.0.0
   * @returns {Array} The unsaved records, if any.
   */
  unsaved: function unsaved(opts) {
    return this.index.get();
  },


  /**
   * Update a record's position in a single index of this collection. See
   * {@link Collection#updateIndexes} to update a record's position in all
   * indexes at once.
   *
   * @method Collection#updateIndex
   * @since 3.0.0
   * @param {Object} record The record to update.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] The index in which to update the record's
   * position. If you don't specify an index then the record will be updated
   * in the main index.
   */
  updateIndex: function updateIndex(record, opts) {
    opts || (opts = {});
    this.getIndex(opts.index).updateRecord(record);
  },


  /**
   * Updates all indexes in this collection for the provided record. Has no
   * effect if the record is not in the collection.
   *
   * @method Collection#updateIndexes
   * @since 3.0.0
   * @param {Object} record TODO
   */
  updateIndexes: function updateIndexes(record) {
    this.index.updateRecord(record);
    utils.forOwn(this.indexes, function (index, name) {
      index.updateRecord(record);
    });
  }
});

/**
 * Fired when a record changes. Only works for records that have tracked changes.
 * See {@link Collection~changeListener} on how to listen for this event.
 *
 * @event Collection#change
 * @see Collection~changeListener
 */

/**
 * Callback signature for the {@link Collection#event:change} event.
 *
 * @example
 * function onChange (record, changes) {
 *   // do something
 * }
 * collection.on('change', onChange)
 *
 * @callback Collection~changeListener
 * @param {Record} The Record that changed.
 * @param {Object} The changes.
 * @see Collection#event:change
 * @since 3.0.0
 */

/**
 * Fired when one or more records are added to the Collection. See
 * {@link Collection~addListener} on how to listen for this event.
 *
 * @event Collection#add
 * @see Collection~addListener
 * @see Collection#event:add
 * @see Collection#add
 */

/**
 * Callback signature for the {@link Collection#event:add} event.
 *
 * @example
 * function onAdd (recordOrRecords) {
 *   // do something
 * }
 * collection.on('add', onAdd)
 *
 * @callback Collection~addListener
 * @param {Record|Record[]} The Record or Records that were added.
 * @see Collection#event:add
 * @see Collection#add
 * @since 3.0.0
 */

/**
 * Fired when one or more records are removed from the Collection. See
 * {@link Collection~removeListener} for how to listen for this event.
 *
 * @event Collection#remove
 * @see Collection~removeListener
 * @see Collection#event:remove
 * @see Collection#remove
 * @see Collection#removeAll
 */

/**
 * Callback signature for the {@link Collection#event:remove} event.
 *
 * @example
 * function onRemove (recordsOrRecords) {
 *   // do something
 * }
 * collection.on('remove', onRemove)
 *
 * @callback Collection~removeListener
 * @param {Record|Record[]} Record or Records that were removed.
 * @see Collection#event:remove
 * @see Collection#remove
 * @see Collection#removeAll
 * @since 3.0.0
 */

/**
 * Create a subclass of this Collection:
 * @example <caption>Collection.extend</caption>
 * // Normally you would do: import {Collection} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Collection} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomCollectionClass extends Collection {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customCollection = new CustomCollectionClass()
 * console.log(customCollection.foo())
 * console.log(CustomCollectionClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherCollectionClass = Collection.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherCollection = new OtherCollectionClass()
 * console.log(otherCollection.foo())
 * console.log(OtherCollectionClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherCollectionClass () {
 *   Collection.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Collection.extend({
 *   constructor: AnotherCollectionClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherCollection = new AnotherCollectionClass()
 * console.log(anotherCollection.created_at)
 * console.log(anotherCollection.foo())
 * console.log(AnotherCollectionClass.beep())
 *
 * @method Collection.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Collection class.
 * @since 3.0.0
 */

var DOMAIN$7 = 'Schema';

/**
 * A function map for each of the seven primitive JSON types defined by the core specification.
 * Each function will check a given value and return true or false if the value is an instance of that type.
 * ```
 *   types.integer(1) // returns true
 *   types.string({}) // returns false
 * ```
 * http://json-schema.org/latest/json-schema-core.html#anchor8
 * @name Schema.types
 * @type {object}
 */
var types = {
  array: utils.isArray,
  boolean: utils.isBoolean,
  integer: utils.isInteger,
  'null': utils.isNull,
  number: utils.isNumber,
  object: utils.isObject,
  string: utils.isString

  /**
   * @ignore
   */
};var segmentToString = function segmentToString(segment, prev) {
  var str = '';
  if (segment) {
    if (utils.isNumber(segment)) {
      str += '[' + segment + ']';
    } else if (prev) {
      str += '.' + segment;
    } else {
      str += '' + segment;
    }
  }
  return str;
};

/**
 * @ignore
 */
var makePath = function makePath(opts) {
  opts || (opts = {});
  var path = '';
  var segments = opts.path || [];
  segments.forEach(function (segment) {
    path += segmentToString(segment, path);
  });
  path += segmentToString(opts.prop, path);
  return path;
};

/**
 * @ignore
 */
var makeError = function makeError(actual, expected, opts) {
  return {
    expected: expected,
    actual: '' + actual,
    path: makePath(opts)
  };
};

/**
 * @ignore
 */
var addError = function addError(actual, expected, opts, errors) {
  errors.push(makeError(actual, expected, opts));
};

/**
 * @ignore
 */
var maxLengthCommon = function maxLengthCommon(keyword, value, schema, opts) {
  var max = schema[keyword];
  if (value.length > max) {
    return makeError(value.length, 'length no more than ' + max, opts);
  }
};

/**
 * @ignore
 */
var minLengthCommon = function minLengthCommon(keyword, value, schema, opts) {
  var min = schema[keyword];
  if (value.length < min) {
    return makeError(value.length, 'length no less than ' + min, opts);
  }
};

/**
 * A map of all object member validation functions for each keyword defined in the JSON Schema.
 * @name Schema.validationKeywords
 * @type {object}
 */
var validationKeywords = {
  /**
   * Validates the provided value against all schemas defined in the Schemas `allOf` keyword.
   * The instance is valid against if and only if it is valid against all the schemas declared in the Schema's value.
   *
   * The value of this keyword MUST be an array. This array MUST have at least one element.
   * Each element of this array MUST be a valid JSON Schema.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor82
   *
   * @name Schema.validationKeywords.allOf
   * @method
   * @param {*} value Value to be validated.
   * @param {object} schema Schema containing the `allOf` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  allOf: function allOf(value, schema, opts) {
    var allErrors = [];
    schema.allOf.forEach(function (_schema) {
      allErrors = allErrors.concat(_validate(value, _schema, opts) || []);
    });
    return allErrors.length ? allErrors : undefined;
  },


  /**
   * Validates the provided value against all schemas defined in the Schemas `anyOf` keyword.
   * The instance is valid against this keyword if and only if it is valid against
   * at least one of the schemas in this keyword's value.
   *
   * The value of this keyword MUST be an array. This array MUST have at least one element.
   * Each element of this array MUST be an object, and each object MUST be a valid JSON Schema.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor85
   *
   * @name Schema.validationKeywords.anyOf
   * @method
   * @param {*} value Value to be validated.
   * @param {object} schema Schema containing the `anyOf` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  anyOf: function anyOf(value, schema, opts) {
    var validated = false;
    var allErrors = [];
    schema.anyOf.forEach(function (_schema) {
      var errors = _validate(value, _schema, opts);
      if (errors) {
        allErrors = allErrors.concat(errors);
      } else {
        validated = true;
      }
    });
    return validated ? undefined : allErrors;
  },


  /**
   * http://json-schema.org/latest/json-schema-validation.html#anchor70
   *
   * @name Schema.validationKeywords.dependencies
   * @method
   * @param {*} value TODO
   * @param {object} schema TODO
   * @param {object} opts TODO
   */
  dependencies: function dependencies(value, schema, opts) {
    // TODO
  },


  /**
   * Validates the provided value against an array of possible values defined by the Schema's `enum` keyword
   * Validation succeeds if the value is deeply equal to one of the values in the array.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor76
   *
   * @name Schema.validationKeywords.enum
   * @method
   * @param {*} value Value to validate
   * @param {object} schema Schema containing the `enum` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  enum: function _enum(value, schema, opts) {
    var possibleValues = schema['enum'];
    if (utils.findIndex(possibleValues, function (item) {
      return utils.deepEqual(item, value);
    }) === -1) {
      return makeError(value, 'one of (' + possibleValues.join(', ') + ')', opts);
    }
  },


  /**
   * Validates each of the provided array values against a schema or an array of schemas defined by the Schema's `items` keyword
   * see http://json-schema.org/latest/json-schema-validation.html#anchor37 for validation rules.
   *
   * @name Schema.validationKeywords.items
   * @method
   * @param {*} value Array to be validated.
   * @param {object} schema Schema containing the items keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  items: function items(value, schema, opts) {
    opts || (opts = {});
    // TODO: additionalItems
    var items = schema.items;
    var errors = [];
    var checkingTuple = utils.isArray(items);
    var length = value.length;
    for (var prop = 0; prop < length; prop++) {
      if (checkingTuple) {
        // Validating a tuple, instead of just checking each item against the
        // same schema
        items = schema.items[prop];
      }
      opts.prop = prop;
      errors = errors.concat(_validate(value[prop], items, opts) || []);
    }
    return errors.length ? errors : undefined;
  },


  /**
   * Validates the provided number against a maximum value defined by the Schema's `maximum` keyword
   * Validation succeeds if the value is a number, and is less than, or equal to, the value of this keyword.
   * http://json-schema.org/latest/json-schema-validation.html#anchor17
   *
   * @name Schema.validationKeywords.maximum
   * @method
   * @param {*} value Number to validate against the keyword.
   * @param {object} schema Schema containing the `maximum` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maximum: function maximum(value, schema, opts) {
    // Must be a number
    var maximum = schema.maximum;
    // Must be a boolean
    // Depends on maximum
    // default: false
    var exclusiveMaximum = schema.exclusiveMaximum;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === (typeof maximum === 'undefined' ? 'undefined' : _typeof(maximum)) && !(exclusiveMaximum ? maximum > value : maximum >= value)) {
      return exclusiveMaximum ? makeError(value, 'no more than nor equal to ' + maximum, opts) : makeError(value, 'no more than ' + maximum, opts);
    }
  },


  /**
   * Validates the length of the provided array against a maximum value defined by the Schema's `maxItems` keyword.
   * Validation succeeds if the length of the array is less than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor42
   *
   * @name Schema.validationKeywords.maxItems
   * @method
   * @param {*} value Array to be validated.
   * @param {object} schema Schema containing the `maxItems` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maxItems: function maxItems(value, schema, opts) {
    if (utils.isArray(value)) {
      return maxLengthCommon('maxItems', value, schema, opts);
    }
  },


  /**
   * Validates the length of the provided string against a maximum value defined in the Schema's `maxLength` keyword.
   * Validation succeeds if the length of the string is less than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor26
   *
   * @name Schema.validationKeywords.maxLength
   * @method
   * @param {*} value String to be validated.
   * @param {object} schema Schema containing the `maxLength` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maxLength: function maxLength(value, schema, opts) {
    return maxLengthCommon('maxLength', value, schema, opts);
  },


  /**
   * Validates the count of the provided object's properties against a maximum value defined in the Schema's `maxProperties` keyword.
   * Validation succeeds if the object's property count is less than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor54
   *
   * @name Schema.validationKeywords.maxProperties
   * @method
   * @param {*} value Object to be validated.
   * @param {object} schema Schema containing the `maxProperties` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maxProperties: function maxProperties(value, schema, opts) {
    // validate only objects
    if (!utils.isObject(value)) return;
    var maxProperties = schema.maxProperties;
    var length = Object.keys(value).length;
    if (length > maxProperties) {
      return makeError(length, 'no more than ' + maxProperties + ' properties', opts);
    }
  },


  /**
   * Validates the provided value against a minimum value defined by the Schema's `minimum` keyword
   * Validation succeeds if the value is a number and is greater than, or equal to, the value of this keyword.
   * http://json-schema.org/latest/json-schema-validation.html#anchor21
   *
   * @name Schema.validationKeywords.minimum
   * @method
   * @param {*} value Number to validate against the keyword.
   * @param {object} schema Schema containing the `minimum` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minimum: function minimum(value, schema, opts) {
    // Must be a number
    var minimum = schema.minimum;
    // Must be a boolean
    // Depends on minimum
    // default: false
    var exclusiveMinimum = schema.exclusiveMinimum;
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === (typeof minimum === 'undefined' ? 'undefined' : _typeof(minimum)) && !(exclusiveMinimum ? value > minimum : value >= minimum)) {
      return exclusiveMinimum ? makeError(value, 'no less than nor equal to ' + minimum, opts) : makeError(value, 'no less than ' + minimum, opts);
    }
  },


  /**
   * Validates the length of the provided array against a minimum value defined by the Schema's `minItems` keyword.
   * Validation succeeds if the length of the array is greater than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor45
   *
   * @name Schema.validationKeywords.minItems
   * @method
   * @param {*} value Array to be validated.
   * @param {object} schema Schema containing the `minItems` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minItems: function minItems(value, schema, opts) {
    if (utils.isArray(value)) {
      return minLengthCommon('minItems', value, schema, opts);
    }
  },


  /**
   * Validates the length of the provided string against a minimum value defined in the Schema's `minLength` keyword.
   * Validation succeeds if the length of the string is greater than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor29
   *
   * @name Schema.validationKeywords.minLength
   * @method
   * @param {*} value String to be validated.
   * @param {object} schema Schema containing the `minLength` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minLength: function minLength(value, schema, opts) {
    return minLengthCommon('minLength', value, schema, opts);
  },


  /**
   * Validates the count of the provided object's properties against a minimum value defined in the Schema's `minProperties` keyword.
   * Validation succeeds if the object's property count is greater than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor57
   *
   * @name Schema.validationKeywords.minProperties
   * @method
   * @param {*} value Object to be validated.
   * @param {object} schema Schema containing the `minProperties` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minProperties: function minProperties(value, schema, opts) {
    // validate only objects
    if (!utils.isObject(value)) return;
    var minProperties = schema.minProperties;
    var length = Object.keys(value).length;
    if (length < minProperties) {
      return makeError(length, 'no more than ' + minProperties + ' properties', opts);
    }
  },


  /**
   * Validates the provided number is a multiple of the number defined in the Schema's `multipleOf` keyword.
   * Validation succeeds if the number can be divided equally into the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor14
   *
   * @name Schema.validationKeywords.multipleOf
   * @method
   * @param {*} value Number to be validated.
   * @param {object} schema Schema containing the `multipleOf` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  multipleOf: function multipleOf(value, schema, opts) {
    var multipleOf = schema.multipleOf;
    if (utils.isNumber(value)) {
      if (value / multipleOf % 1 !== 0) {
        return makeError(value, 'multipleOf ' + multipleOf, opts);
      }
    }
  },


  /**
   * Validates the provided value is not valid with any of the schemas defined in the Schema's `not` keyword.
   * An instance is valid against this keyword if and only if it is NOT valid against the schemas in this keyword's value.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor91
   * @name Schema.validationKeywords.not
   * @method
   * @param {*} value to be checked.
   * @param {object} schema Schema containing the not keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  not: function not(value, schema, opts) {
    if (!_validate(value, schema.not, opts)) {
      // TODO: better messaging
      return makeError('succeeded', 'should have failed', opts);
    }
  },


  /**
   * Validates the provided value is valid with one and only one of the schemas defined in the Schema's `oneOf` keyword.
   * An instance is valid against this keyword if and only if it is valid against a single schemas in this keyword's value.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor88
   * @name Schema.validationKeywords.oneOf
   * @method
   * @param {*} value to be checked.
   * @param {object} schema Schema containing the `oneOf` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  oneOf: function oneOf(value, schema, opts) {
    var validated = false;
    var allErrors = [];
    schema.oneOf.forEach(function (_schema) {
      var errors = _validate(value, _schema, opts);
      if (errors) {
        allErrors = allErrors.concat(errors);
      } else if (validated) {
        allErrors = [makeError('valid against more than one', 'valid against only one', opts)];
        validated = false;
        return false;
      } else {
        validated = true;
      }
    });
    return validated ? undefined : allErrors;
  },


  /**
   * Validates the provided string matches a pattern defined in the Schema's `pattern` keyword.
   * Validation succeeds if the string is a match of the regex value of this keyword.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor33
   * @name Schema.validationKeywords.pattern
   * @method
   * @param {*} value String to be validated.
   * @param {object} schema Schema containing the `pattern` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  pattern: function pattern(value, schema, opts) {
    var pattern = schema.pattern;
    if (utils.isString(value) && !value.match(pattern)) {
      return makeError(value, pattern, opts);
    }
  },


  /**
   * Validates the provided object's properties against a map of values defined in the Schema's `properties` keyword.
   * Validation succeeds if the object's property are valid with each of the schema's in the provided map.
   * Validation also depends on the additionalProperties and or patternProperties.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor64 for more info.
   *
   * @name Schema.validationKeywords.properties
   * @method
   * @param {*} value Object to be validated.
   * @param {object} schema Schema containing the `properties` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  properties: function properties(value, schema, opts) {
    opts || (opts = {});

    if (utils.isArray(value)) {
      return;
    }

    // Can be a boolean or an object
    // Technically the default is an "empty schema", but here "true" is
    // functionally the same
    var additionalProperties = schema.additionalProperties === undefined ? true : schema.additionalProperties;
    var validated = [];
    // "p": The property set from "properties".
    // Default is an object
    var properties = schema.properties || {};
    // "pp": The property set from "patternProperties".
    // Default is an object
    var patternProperties = schema.patternProperties || {};
    var errors = [];

    utils.forOwn(properties, function (_schema, prop) {
      opts.prop = prop;
      errors = errors.concat(_validate(value[prop], _schema, opts) || []);
      validated.push(prop);
    });

    var toValidate = utils.omit(value, validated);
    utils.forOwn(patternProperties, function (_schema, pattern) {
      utils.forOwn(toValidate, function (undef, prop) {
        if (prop.match(pattern)) {
          opts.prop = prop;
          errors = errors.concat(_validate(value[prop], _schema, opts) || []);
          validated.push(prop);
        }
      });
    });
    var keys = Object.keys(utils.omit(value, validated));
    // If "s" is not empty, validation fails
    if (additionalProperties === false) {
      if (keys.length) {
        var origProp = opts.prop;
        opts.prop = '';
        addError('extra fields: ' + keys.join(', '), 'no extra fields', opts, errors);
        opts.prop = origProp;
      }
    } else if (utils.isObject(additionalProperties)) {
      // Otherwise, validate according to provided schema
      keys.forEach(function (prop) {
        opts.prop = prop;
        errors = errors.concat(_validate(value[prop], additionalProperties, opts) || []);
      });
    }
    return errors.length ? errors : undefined;
  },


  /**
   * Validates the provided object's has all properties listed in the Schema's `properties` keyword array.
   * Validation succeeds if the object contains all properties provided in the array value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor61
   *
   * @name Schema.validationKeywords.required
   * @method
   * @param {*} value Object to be validated.
   * @param {object} schema Schema containing the `required` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  required: function required(value, schema, opts) {
    opts || (opts = {});
    var required = schema.required;
    var errors = [];
    if (!opts.existingOnly) {
      required.forEach(function (prop) {
        if (utils.get(value, prop) === undefined) {
          var prevProp = opts.prop;
          opts.prop = prop;
          addError(undefined, 'a value', opts, errors);
          opts.prop = prevProp;
        }
      });
    }
    return errors.length ? errors : undefined;
  },


  /**
   * Validates the provided value's type is equal to the type, or array of types, defined in the Schema's `type` keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor79
   *
   * @name Schema.validationKeywords.type
   * @method
   * @param {*} value Value to be validated.
   * @param {object} schema Schema containing the `type` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  type: function type(value, schema, opts) {
    var type = schema.type;
    var validType = void 0;
    // Can be one of several types
    if (utils.isString(type)) {
      type = [type];
    }
    // Try to match the value against an expected type
    type.forEach(function (_type) {
      // TODO: throw an error if type is not defined
      if (types[_type](value, schema, opts)) {
        // Matched a type
        validType = _type;
        return false;
      }
    });
    // Value did not match any expected type
    if (!validType) {
      return makeError(value !== undefined && value !== null ? typeof value === 'undefined' ? 'undefined' : _typeof(value) : '' + value, 'one of (' + type.join(', ') + ')', opts);
    }
    // Run keyword validators for matched type
    // http://json-schema.org/latest/json-schema-validation.html#anchor12
    var validator = typeGroupValidators[validType];
    if (validator) {
      return validator(value, schema, opts);
    }
  },


  /**
   * Validates the provided array values are unique.
   * Validation succeeds if the items in the array are unique, but only if the value of this keyword is true
   * see http://json-schema.org/latest/json-schema-validation.html#anchor49
   *
   * @name Schema.validationKeywords.uniqueItems
   * @method
   * @param {*} value Array to be validated.
   * @param {object} schema Schema containing the `uniqueItems` keyword.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  uniqueItems: function uniqueItems(value, schema, opts) {
    if (value && value.length && schema.uniqueItems) {
      var length = value.length;
      var item = void 0,
          i = void 0,
          j = void 0;
      // Check n - 1 items
      for (i = length - 1; i > 0; i--) {
        item = value[i];
        // Only compare against unchecked items
        for (j = i - 1; j >= 0; j--) {
          // Found a duplicate
          if (utils.deepEqual(item, value[j])) {
            return makeError(item, 'no duplicates', opts);
          }
        }
      }
    }
  }
};

/**
 * @ignore
 */
var runOps = function runOps(ops, value, schema, opts) {
  var errors = [];
  ops.forEach(function (op) {
    if (schema[op] !== undefined) {
      errors = errors.concat(validationKeywords[op](value, schema, opts) || []);
    }
  });
  return errors.length ? errors : undefined;
};

/**
 * Validation keywords validated for any type:
 *
 * - `enum`
 * - `type`
 * - `allOf`
 * - `anyOf`
 * - `oneOf`
 * - `not`
 *
 * @name Schema.ANY_OPS
 * @type {string[]}
 */
var ANY_OPS = ['enum', 'type', 'allOf', 'anyOf', 'oneOf', 'not'];

/**
 * Validation keywords validated for array types:
 *
 * - `items`
 * - `maxItems`
 * - `minItems`
 * - `uniqueItems`
 *
 * @name Schema.ARRAY_OPS
 * @type {string[]}
 */
var ARRAY_OPS = ['items', 'maxItems', 'minItems', 'uniqueItems'];

/**
 * Validation keywords validated for numeric (number and integer) types:
 *
 * - `multipleOf`
 * - `maximum`
 * - `minimum`
 *
 * @name Schema.NUMERIC_OPS
 * @type {string[]}
 */
var NUMERIC_OPS = ['multipleOf', 'maximum', 'minimum'];

/**
 * Validation keywords validated for object types:
 *
 * - `maxProperties`
 * - `minProperties`
 * - `required`
 * - `properties`
 * - `dependencies`
 *
 * @name Schema.OBJECT_OPS
 * @type {string[]}
 */
var OBJECT_OPS = ['maxProperties', 'minProperties', 'required', 'properties', 'dependencies'];

/**
 * Validation keywords validated for string types:
 *
 * - `maxLength`
 * - `minLength`
 * - `pattern`
 *
 * @name Schema.STRING_OPS
 * @type {string[]}
 */
var STRING_OPS = ['maxLength', 'minLength', 'pattern'];

/**
 * http://json-schema.org/latest/json-schema-validation.html#anchor75
 * @ignore
 */
var validateAny = function validateAny(value, schema, opts) {
  return runOps(ANY_OPS, value, schema, opts);
};

/**
 * Validates the provided value against a given Schema according to the http://json-schema.org/ v4 specification.
 *
 * @name Schema.validate
 * @method
 * @param {*} value Value to be validated.
 * @param {object} schema Valid Schema according to the http://json-schema.org/ v4 specification.
 * @param {object} [opts] Configuration options.
 * @returns {(array|undefined)} Array of errors or `undefined` if valid.
 */
var _validate = function _validate(value, schema, opts) {
  var errors = [];
  opts || (opts = {});
  opts.ctx || (opts.ctx = { value: value, schema: schema });
  var shouldPop = void 0;
  var prevProp = opts.prop;
  if (schema === undefined) {
    return;
  }
  if (!utils.isObject(schema)) {
    throw utils.err(DOMAIN$7 + '#validate')(500, 'Invalid schema at path: "' + opts.path + '"');
  }
  if (opts.path === undefined) {
    opts.path = [];
  }
  // Track our location as we recurse
  if (opts.prop !== undefined) {
    shouldPop = true;
    opts.path.push(opts.prop);
    opts.prop = undefined;
  }
  // Validate against parent schema
  if (schema['extends']) {
    // opts.path = path
    // opts.prop = prop
    if (utils.isFunction(schema['extends'].validate)) {
      errors = errors.concat(schema['extends'].validate(value, opts) || []);
    } else {
      errors = errors.concat(_validate(value, schema['extends'], opts) || []);
    }
  }
  if (value === undefined) {
    // Check if property is required
    if (schema.required === true && !opts.existingOnly) {
      addError(value, 'a value', opts, errors);
    }
    if (shouldPop) {
      opts.path.pop();
      opts.prop = prevProp;
    }
    return errors.length ? errors : undefined;
  }

  errors = errors.concat(validateAny(value, schema, opts) || []);
  if (shouldPop) {
    opts.path.pop();
    opts.prop = prevProp;
  }
  return errors.length ? errors : undefined;
};

// These strings are cached for optimal performance of the change detection
// boolean - Whether a Record is changing in the current execution frame
var changingPath = 'changing';
// string[] - Properties that have changed in the current execution frame
var changedPath = 'changed';
// Object[] - History of change records
var changeHistoryPath = 'history';
// boolean - Whether a Record is currently being instantiated
var creatingPath$1 = 'creating';
// number - The setTimeout change event id of a Record, if any
var eventIdPath = 'eventId';
// boolean - Whether to skip validation for a Record's currently changing property
var noValidatePath$2 = 'noValidate';
// boolean - Whether to preserve Change History for a Record
var keepChangeHistoryPath$1 = 'keepChangeHistory';
// boolean - Whether to skip change notification for a Record's currently
// changing property
var silentPath = 'silent';
var validationFailureMsg = 'validation failed';

/**
 * A map of validation functions grouped by type.
 *
 * @name Schema.typeGroupValidators
 * @type {object}
 */
var typeGroupValidators = {
  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an array.
   * The validation keywords for the type `array` are:
   *```
   * ['items', 'maxItems', 'minItems', 'uniqueItems']
   *```
   * see http://json-schema.org/latest/json-schema-validation.html#anchor25
   *
   * @name Schema.typeGroupValidators.array
   * @method
   * @param {*} value Array to be validated.
   * @param {object} schema Schema containing at least one array keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  array: function array(value, schema, opts) {
    return runOps(ARRAY_OPS, value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an integer.
   * The validation keywords for the type `integer` are:
   *```
   * ['multipleOf', 'maximum', 'minimum']
   *```
   * @name Schema.typeGroupValidators.integer
   * @method
   * @param {*} value Number to be validated.
   * @param {Object} schema Schema containing at least one `integer` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  integer: function integer(value, schema, opts) {
    // Additional validations for numerics are the same
    return typeGroupValidators.numeric(value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an number.
   * The validation keywords for the type `number` are:
   *```
   * ['multipleOf', 'maximum', 'minimum']
   *```
   * @name Schema.typeGroupValidators.number
   * @method
   * @param {*} value Number to be validated.
   * @param {Object} schema Schema containing at least one `number` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  number: function number(value, schema, opts) {
    // Additional validations for numerics are the same
    return typeGroupValidators.numeric(value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of a number or integer.
   * The validation keywords for the type `numeric` are:
   *```
   * ['multipleOf', 'maximum', 'minimum']
   *```
   * See http://json-schema.org/latest/json-schema-validation.html#anchor13.
   *
   * @name Schema.typeGroupValidators.numeric
   * @method
   * @param {*} value Number to be validated.
   * @param {Object} schema Schema containing at least one `numeric` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  numeric: function numeric(value, schema, opts) {
    return runOps(NUMERIC_OPS, value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an object.
   * The validation keywords for the type `object` are:
   *```
   * ['maxProperties', 'minProperties', 'required', 'properties', 'dependencies']
   *```
   * See http://json-schema.org/latest/json-schema-validation.html#anchor53.
   *
   * @name Schema.typeGroupValidators.object
   * @method
   * @param {*} value Object to be validated.
   * @param {Object} schema Schema containing at least one `object` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  object: function object(value, schema, opts) {
    return runOps(OBJECT_OPS, value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an string.
   * The validation keywords for the type `string` are:
   *```
   * ['maxLength', 'minLength', 'pattern']
   *```
   * See http://json-schema.org/latest/json-schema-validation.html#anchor25.
   *
   * @name Schema.typeGroupValidators.string
   * @method
   * @param {*} value String to be validated.
   * @param {Object} schema Schema containing at least one `string` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  string: function string(value, schema, opts) {
    return runOps(STRING_OPS, value, schema, opts);
  }

  /**
   * js-data's Schema class.
   *
   * @example <caption>Schema#constructor</caption>
   * // Normally you would do:  import {Schema} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Schema} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const PostSchema = new Schema({
   *   type: 'object',
   *   properties: {
   *     title: { type: 'string' }
   *   }
   * })
   * PostSchema.validate({ title: 1234 })
   *
   * @class Schema
   * @extends Component
   * @param {object} definition Schema definition according to json-schema.org
   */
};function Schema(definition) {
  var _this = this;

  definition || (definition = {});
  // TODO: schema validation
  utils.fillIn(this, definition);

  if (this.type === 'object') {
    this.properties = this.properties || {};
    utils.forOwn(this.properties, function (_definition, prop) {
      if (!(_definition instanceof Schema)) {
        _this.properties[prop] = new Schema(_definition);
      }
    });
  } else if (this.type === 'array' && this.items && !(this.items instanceof Schema)) {
    this.items = new Schema(this.items);
  }
  if (this.extends && !(this.extends instanceof Schema)) {
    this.extends = new Schema(this.extends);
  }
  ['allOf', 'anyOf', 'oneOf'].forEach(function (validationKeyword) {
    if (_this[validationKeyword]) {
      _this[validationKeyword].forEach(function (_definition, i) {
        if (!(_definition instanceof Schema)) {
          _this[validationKeyword][i] = new Schema(_definition);
        }
      });
    }
  });
}

var Schema$1 = Component$1.extend({
  constructor: Schema,

  /**
   * This adds ES5 getters/setters to the target based on the "properties" in
   * this Schema, which makes possible change tracking and validation on
   * property assignment.
   *
   * @name Schema#apply
   * @method
   * @param {object} target The prototype to which to apply this schema.
   */
  apply: function apply(target, opts) {
    var _this2 = this;

    opts || (opts = {});
    opts.getter || (opts.getter = '_get');
    opts.setter || (opts.setter = '_set');
    opts.unsetter || (opts.unsetter = '_unset');
    opts.track || (opts.track = this.track);
    var properties = this.properties || {};
    utils.forOwn(properties, function (schema, prop) {
      Object.defineProperty(target, prop, _this2.makeDescriptor(prop, schema, opts));
    });
  },


  /**
   * Apply default values to the target object for missing values.
   *
   * @name Schema#applyDefaults
   * @method
   * @param {object} target The target to which to apply values for missing values.
   */
  applyDefaults: function applyDefaults(target) {
    if (!target) {
      return;
    }
    var properties = this.properties || {};
    var hasSet = utils.isFunction(target.set) || utils.isFunction(target._set);
    utils.forOwn(properties, function (schema, prop) {
      if (schema.hasOwnProperty('default') && utils.get(target, prop) === undefined) {
        if (hasSet) {
          target.set(prop, utils.plainCopy(schema['default']), { silent: true });
        } else {
          utils.set(target, prop, utils.plainCopy(schema['default']));
        }
      }
      if (schema.type === 'object' && schema.properties) {
        if (hasSet) {
          var orig = target._get('noValidate');
          target._set('noValidate', true);
          utils.set(target, prop, utils.get(target, prop) || {}, { silent: true });
          target._set('noValidate', orig);
        } else {
          utils.set(target, prop, utils.get(target, prop) || {});
        }
        schema.applyDefaults(utils.get(target, prop));
      }
    });
  },


  /**
   * Assemble a property descriptor for tracking and validating changes to
   * a property according to the given schema. This method is called when
   * {@link Mapper#applySchema} is set to `true`.
   *
   * @name Schema#makeDescriptor
   * @method
   * @param {string} prop The property name.
   * @param {(Schema|object)} schema The schema for the property.
   * @param {object} [opts] Optional configuration.
   * @param {function} [opts.getter] Custom getter function.
   * @param {function} [opts.setter] Custom setter function.
   * @param {function} [opts.track] Whether to track changes.
   * @returns {object} A property descriptor for the given schema.
   */
  makeDescriptor: function makeDescriptor(prop, schema, opts) {
    var descriptor = {
      // Better to allow configurability, but at the user's own risk
      configurable: true,
      // These properties are enumerable by default, but regardless of their
      // enumerability, they won't be "own" properties of individual records
      enumerable: schema.enumerable === undefined ? true : !!schema.enumerable
      // Cache a few strings for optimal performance
    };var keyPath = 'props.' + prop;
    var previousPath = 'previous.' + prop;
    var getter = opts.getter;
    var setter = opts.setter;
    var unsetter = opts.unsetter;
    var track = utils.isBoolean(opts.track) ? opts.track : schema.track;

    descriptor.get = function () {
      return this._get(keyPath);
    };

    if (utils.isFunction(schema.get)) {
      var originalGet = descriptor.get;
      descriptor.get = function () {
        return schema.get.call(this, originalGet);
      };
    }

    descriptor.set = function (value) {
      var _this3 = this;

      // These are accessed a lot
      var _get = this[getter];
      var _set = this[setter];
      var _unset = this[unsetter];
      // Optionally check that the new value passes validation
      if (!_get(noValidatePath$2)) {
        var errors = schema.validate(value, { path: [prop] });
        if (errors) {
          // Immediately throw an error, preventing the record from getting into
          // an invalid state
          var error = new Error(validationFailureMsg);
          error.errors = errors;
          throw error;
        }
      }
      // TODO: Make it so tracking can be turned on for all properties instead of
      // only per-property
      if (track && !_get(creatingPath$1)) {
        // previous is versioned on database commit
        // props are versioned on set()
        var previous = _get(previousPath);
        var current = _get(keyPath);
        var changing = _get(changingPath);
        var changed = _get(changedPath);

        if (!changing) {
          // Track properties that are changing in the current event loop
          changed = [];
        }

        // Add changing properties to this array once at most
        var index = changed.indexOf(prop);
        if (current !== value && index === -1) {
          changed.push(prop);
        }
        if (previous === value) {
          if (index >= 0) {
            changed.splice(index, 1);
          }
        }
        // No changes in current event loop
        if (!changed.length) {
          changing = false;
          _unset(changingPath);
          _unset(changedPath);
          // Cancel pending change event
          if (_get(eventIdPath)) {
            clearTimeout(_get(eventIdPath));
            _unset(eventIdPath);
          }
        }
        // Changes detected in current event loop
        if (!changing && changed.length) {
          _set(changedPath, changed);
          _set(changingPath, true);
          // Saving the timeout id allows us to batch all changes in the same
          // event loop into a single "change"
          // TODO: Optimize
          _set(eventIdPath, setTimeout(function () {
            // Previous event loop where changes were gathered has ended, so
            // notify any listeners of those changes and prepare for any new
            // changes
            _unset(changedPath);
            _unset(eventIdPath);
            _unset(changingPath);
            // TODO: Optimize
            if (!_get(silentPath)) {
              var i = void 0;
              for (i = 0; i < changed.length; i++) {
                _this3.emit('change:' + changed[i], _this3, utils.get(_this3, changed[i]));
              }

              var changes = utils.diffObjects(defineProperty({}, prop, value), defineProperty({}, prop, current));

              if (_get(keepChangeHistoryPath$1)) {
                var changeRecord = utils.plainCopy(changes);
                changeRecord.timestamp = new Date().getTime();
                var changeHistory = _get(changeHistoryPath);
                !changeHistory && _set(changeHistoryPath, changeHistory = []);
                changeHistory.push(changeRecord);
              }
              _this3.emit('change', _this3, changes);
            }
            _unset(silentPath);
          }, 0));
        }
      }
      _set(keyPath, value);
      return value;
    };

    if (utils.isFunction(schema.set)) {
      var originalSet = descriptor.set;
      descriptor.set = function (value) {
        return schema.set.call(this, value, originalSet);
      };
    }

    return descriptor;
  },


  /**
   * Create a copy of the given value that contains only the properties defined
   * in this schema.
   *
   * @name Schema#pick
   * @method
   * @param {*} value The value to copy.
   * @returns {*} The copy.
   */
  pick: function pick(value) {
    var _this4 = this;

    if (value === undefined) {
      return;
    }
    if (this.type === 'object') {
      var copy = {};
      var properties = this.properties;
      if (properties) {
        utils.forOwn(properties, function (_definition, prop) {
          copy[prop] = _definition.pick(value[prop]);
        });
      }
      if (this.extends) {
        utils.fillIn(copy, this.extends.pick(value));
      }
      // Conditionally copy properties not defined in "properties"
      if (this.additionalProperties) {
        for (var key in value) {
          if (!properties[key]) {
            copy[key] = utils.plainCopy(value[key]);
          }
        }
      }
      return copy;
    } else if (this.type === 'array') {
      return value.map(function (item) {
        var _copy = _this4.items ? _this4.items.pick(item) : {};
        if (_this4.extends) {
          utils.fillIn(_copy, _this4.extends.pick(item));
        }
        return _copy;
      });
    }
    return utils.plainCopy(value);
  },


  /**
   * Validate the provided value against this schema.
   *
   * @name Schema#validate
   * @method
   * @param {*} value Value to validate.
   * @param {object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  validate: function validate(value, opts) {
    return _validate(value, this, opts);
  }
}, {
  ANY_OPS: ANY_OPS,
  ARRAY_OPS: ARRAY_OPS,
  NUMERIC_OPS: NUMERIC_OPS,
  OBJECT_OPS: OBJECT_OPS,
  STRING_OPS: STRING_OPS,
  typeGroupValidators: typeGroupValidators,
  types: types,
  validate: _validate,
  validationKeywords: validationKeywords
});

/**
 * Create a subclass of this Schema:
 * @example <caption>Schema.extend</caption>
 * // Normally you would do: import {Schema} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Schema} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomSchemaClass extends Schema {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customSchema = new CustomSchemaClass()
 * console.log(customSchema.foo())
 * console.log(CustomSchemaClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherSchemaClass = Schema.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherSchema = new OtherSchemaClass()
 * console.log(otherSchema.foo())
 * console.log(OtherSchemaClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherSchemaClass () {
 *   Schema.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Schema.extend({
 *   constructor: AnotherSchemaClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherSchema = new AnotherSchemaClass()
 * console.log(anotherSchema.created_at)
 * console.log(anotherSchema.foo())
 * console.log(AnotherSchemaClass.beep())
 *
 * @method Schema.extend
 * @param {object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Schema class.
 * @since 3.0.0
 */

var DOMAIN$6 = 'Mapper';
var applyDefaultsHooks = ['beforeCreate', 'beforeCreateMany'];
var validatingHooks = ['beforeCreate', 'beforeCreateMany', 'beforeUpdate', 'beforeUpdateAll', 'beforeUpdateMany'];
var makeNotify = function makeNotify(num) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var opts = args[args.length - num];
    var op = opts.op;
    this.dbg.apply(this, [op].concat(args));

    if (applyDefaultsHooks.indexOf(op) !== -1 && opts.applyDefaults !== false) {
      var schema = this.getSchema();
      if (schema && schema.applyDefaults) {
        var toProcess = args[0];
        if (!utils.isArray(toProcess)) {
          toProcess = [toProcess];
        }
        toProcess.forEach(function (record) {
          schema.applyDefaults(record);
        });
      }
    }

    // Automatic validation
    if (validatingHooks.indexOf(op) !== -1 && !opts.noValidate) {
      // Save current value of option
      var originalExistingOnly = opts.existingOnly;

      // For updates, ignore required fields if they aren't present
      if (op.indexOf('beforeUpdate') === 0 && opts.existingOnly === undefined) {
        opts.existingOnly = true;
      }
      var errors = this.validate(args[op === 'beforeUpdate' ? 1 : 0], utils.pick(opts, ['existingOnly']));

      // Restore option
      opts.existingOnly = originalExistingOnly;

      // Abort lifecycle due to validation errors
      if (errors) {
        var err = new Error('validation failed');
        err.errors = errors;
        return utils.reject(err);
      }
    }

    // Emit lifecycle event
    if (opts.notify || opts.notify === undefined && this.notify) {
      setTimeout(function () {
        _this.emit.apply(_this, [op].concat(args));
      });
    }
  };
};

// These are the default implementations of all of the lifecycle hooks
var notify = makeNotify(1);
var notify2 = makeNotify(2);

// This object provides meta information used by Mapper#crud to actually
// execute each lifecycle method
var LIFECYCLE_METHODS = {
  count: {
    defaults: [{}, {}],
    skip: true,
    types: []
  },
  destroy: {
    defaults: [{}, {}],
    skip: true,
    types: []
  },
  destroyAll: {
    defaults: [{}, {}],
    skip: true,
    types: []
  },
  find: {
    defaults: [undefined, {}],
    types: []
  },
  findAll: {
    defaults: [{}, {}],
    types: []
  },
  sum: {
    defaults: [undefined, {}, {}],
    skip: true,
    types: []
  },
  update: {
    adapterArgs: function adapterArgs(mapper, id, props, opts) {
      return [id, mapper.toJSON(props, opts), opts];
    },

    beforeAssign: 1,
    defaults: [undefined, {}, {}],
    types: []
  },
  updateAll: {
    adapterArgs: function adapterArgs(mapper, props, query, opts) {
      return [mapper.toJSON(props, opts), query, opts];
    },

    beforeAssign: 0,
    defaults: [{}, {}, {}],
    types: []
  },
  updateMany: {
    adapterArgs: function adapterArgs(mapper, records, opts) {
      return [records.map(function (record) {
        return mapper.toJSON(record, opts);
      }), opts];
    },

    beforeAssign: 0,
    defaults: [[], {}],
    types: []
  }
};

var MAPPER_DEFAULTS = {
  /**
   * Hash of registered adapters. Don't modify directly. Use
   * {@link Mapper#registerAdapter} instead.
   *
   * @default {}
   * @name Mapper#_adapters
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  _adapters: {},

  /**
   * Whether {@link Mapper#beforeCreate} and {@link Mapper#beforeCreateMany}
   * should automatically receive default values according to the Mapper's schema.
   *
   * @default true
   * @name Mapper#applyDefaults
   * @since 3.0.0
   * @type {boolean}
   */
  applyDefaults: true,

  /**
   * Whether to augment {@link Mapper#recordClass} with ES5 getters and setters
   * according to the properties defined in {@link Mapper#schema}. This makes
   * possible validation and change tracking on individual properties
   * when using the dot (e.g. `user.name = "Bob"`) operator to modify a
   * property, and is `true` by default.
   *
   * @default true
   * @name Mapper#applySchema
   * @since 3.0.0
   * @type {boolean}
   */
  applySchema: true,

  /**
   * The name of the registered adapter that this Mapper should used by default.
   *
   * @default "http"
   * @name Mapper#defaultAdapter
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   * @type {string}
   */
  defaultAdapter: 'http',

  /**
   * The field used as the unique identifier on records handled by this Mapper.
   *
   * @default id
   * @name Mapper#idAttribute
   * @since 3.0.0
   * @type {string}
   */
  idAttribute: 'id',

  /**
   * Whether records created from this mapper keep changeHistory on property changes.
   *
   * @default true
   * @name Mapper#keepChangeHistory
   * @since 3.0.0
   * @type {boolean}
   */
  keepChangeHistory: true,

  /**
   * Whether this Mapper should emit operational events.
   *
   * @default true
   * @name Mapper#notify
   * @since 3.0.0
   * @type {boolean}
   */
  notify: true,

  /**
   * Whether to skip validation when the Record instances are created.
   *
   * @default false
   * @name Mapper#noValidate
   * @since 3.0.0
   * @type {boolean}
   */
  noValidate: false,

  /**
   * Whether {@link Mapper#create}, {@link Mapper#createMany},
   * {@link Mapper#update}, {@link Mapper#updateAll}, {@link Mapper#updateMany},
   * {@link Mapper#find}, {@link Mapper#findAll}, {@link Mapper#destroy},
   * {@link Mapper#destroyAll}, {@link Mapper#count}, and {@link Mapper#sum}
   * should return a raw result object that contains both the instance data
   * returned by the adapter _and_ metadata about the operation.
   *
   * The default is to NOT return the result object, and instead return just the
   * instance data.
   *
   * @default false
   * @name Mapper#raw
   * @since 3.0.0
   * @type {boolean}
   */
  raw: false,

  /**
   * Whether records created from this mapper automatically validate their properties
   * when their properties are modified.
   *
   * @default true
   * @name Mapper#validateOnSet
   * @since 3.0.0
   * @type {boolean}
   */
  validateOnSet: true

  /**
   * The core of JSData's [ORM/ODM][orm] implementation. Given a minimum amout of
   * meta information about a resource, a Mapper can perform generic CRUD
   * operations against that resource. Apart from its configuration, a Mapper is
   * stateless. The particulars of various persistence layers have been abstracted
   * into adapters, which a Mapper uses to perform its operations.
   *
   * The term "Mapper" comes from the [Data Mapper Pattern][pattern] described in
   * Martin Fowler's [Patterns of Enterprise Application Architecture][book]. A
   * Data Mapper moves data between [in-memory object instances][record] and a
   * relational or document-based database. JSData's Mapper can work with any
   * persistence layer you can write an adapter for.
   *
   * _("Model" is a heavily overloaded term and is avoided in this documentation
   * to prevent confusion.)_
   *
   * [orm]: https://en.wikipedia.org/wiki/Object-relational_mapping
   *
   * @example
   * [pattern]: https://en.wikipedia.org/wiki/Data_mapper_pattern
   * [book]: http://martinfowler.com/books/eaa.html
   * [record]: Record.html
   * // Import and instantiate
   * import {Mapper} from 'js-data'
   * const UserMapper = new Mapper({ name: 'user' })
   *
   * @example
   * // Define a Mapper using the Container component
   * import {Container} from 'js-data'
   * const store = new Container()
   * store.defineMapper('user')
   *
   * @class Mapper
   * @extends Component
   * @param {Object} opts Configuration options.
   * @param {boolean} [opts.applySchema=true] See {@link Mapper#applySchema}.
   * @param {boolean} [opts.debug=false] See {@link Component#debug}.
   * @param {string} [opts.defaultAdapter=http] See {@link Mapper#defaultAdapter}.
   * @param {string} [opts.idAttribute=id] See {@link Mapper#idAttribute}.
   * @param {Object} [opts.methods] See {@link Mapper#methods}.
   * @param {string} opts.name See {@link Mapper#name}.
   * @param {boolean} [opts.notify] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw=false] See {@link Mapper#raw}.
   * @param {Function|boolean} [opts.recordClass] See {@link Mapper#recordClass}.
   * @param {Object|Schema} [opts.schema] See {@link Mapper#schema}.
   * @returns {Mapper} A new {@link Mapper} instance.
   * @see http://www.js-data.io/v3.0/docs/components-of-jsdata#mapper
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#mapper","Components of JSData: Mapper"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/modeling-your-data","Modeling your data"]
   */
};function Mapper(opts) {
  utils.classCallCheck(this, Mapper);
  Component$1.call(this);
  opts || (opts = {});

  // Prepare certain properties to be non-enumerable
  Object.defineProperties(this, {
    _adapters: {
      value: undefined,
      writable: true
    },

    /**
     * The {@link Container} that holds this Mapper. __Do not modify.__
     *
     * @name Mapper#lifecycleMethods
     * @since 3.0.0
     * @type {Object}
     */
    datastore: {
      value: undefined,
      writable: true
    },

    /**
     * The meta information describing this Mapper's available lifecycle
     * methods. __Do not modify.__
     *
     * @name Mapper#lifecycleMethods
     * @since 3.0.0
     * @type {Object}
     */
    lifecycleMethods: {
      value: LIFECYCLE_METHODS
    },

    /**
     * Set to `false` to force the Mapper to work with POJO objects only.
     *
     * @example
     * // Use POJOs only.
     * import {Mapper, Record} from 'js-data'
     * const UserMapper = new Mapper({ recordClass: false })
     * UserMapper.recordClass // false
     * const user = UserMapper#createRecord()
     * user instanceof Record // false
     *
     * @example
     * // Set to a custom class to have records wrapped in your custom class.
     * import {Mapper, Record} from 'js-data'
     *  // Custom class
     * class User {
     *   constructor (props = {}) {
     *     for (var key in props) {
     *       if (props.hasOwnProperty(key)) {
     *         this[key] = props[key]
     *       }
     *     }
     *   }
     * }
     * const UserMapper = new Mapper({ recordClass: User })
     * UserMapper.recordClass // function User() {}
     * const user = UserMapper#createRecord()
     * user instanceof Record // false
     * user instanceof User // true
     *
     *
     * @example
     * // Extend the {@link Record} class.
     * import {Mapper, Record} from 'js-data'
     *  // Custom class
     * class User extends Record {
     *   constructor () {
     *     super(props)
     *   }
     * }
     * const UserMapper = new Mapper({ recordClass: User })
     * UserMapper.recordClass // function User() {}
     * const user = UserMapper#createRecord()
     * user instanceof Record // true
     * user instanceof User // true
     *
     * @name Mapper#recordClass
     * @default {@link Record}
     * @see Record
     * @since 3.0.0
     */
    recordClass: {
      value: undefined,
      writable: true
    },

    /**
     * This Mapper's {@link Schema}.
     *
     * @example <caption>Mapper#schema</caption>
     * // Normally you would do: import {Mapper} from 'js-data'
     * const JSData = require('js-data@3.0.0-rc.4')
     * const {Mapper} = JSData
     * console.log('Using JSData v' + JSData.version.full)
     *
     * const UserMapper = new Mapper({
     *   name: 'user',
     *   schema: {
     *     properties: {
     *       id: { type: 'number' },
     *       first: { type: 'string', track: true },
     *       last: { type: 'string', track: true },
     *       role: { type: 'string', track: true, required: true },
     *       age: { type: 'integer', track: true },
     *       is_active: { type: 'number' }
     *     }
     *   }
     * })
     * const user = UserMapper.createRecord({
     *   id: 1,
     *   name: 'John',
     *   role: 'admin'
     * })
     * user.on('change', function (user, changes) {
     *   console.log(changes)
     * })
     * user.on('change:role', function (user, value) {
     *   console.log('change:role - ' + value)
     * })
     * user.role = 'owner'
     *
     * @name Mapper#schema
     * @see Schema
     * @since 3.0.0
     * @type {Schema}
     */
    schema: {
      value: undefined,
      writable: true
    }
  });

  // Apply user-provided configuration
  utils.fillIn(this, opts);
  // Fill in any missing options with the defaults
  utils.fillIn(this, utils.copy(MAPPER_DEFAULTS));

  /**
   * The name for this Mapper. This is the minimum amount of meta information
   * required for a Mapper to be able to execute CRUD operations for a
   * Resource.
   *
   * @name Mapper#name
   * @since 3.0.0
   * @type {string}
   */
  if (!this.name) {
    throw utils.err('new ' + DOMAIN$6, 'opts.name')(400, 'string', this.name);
  }

  // Setup schema, with an empty default schema if necessary
  if (this.schema) {
    this.schema.type || (this.schema.type = 'object');
    if (!(this.schema instanceof Schema$1)) {
      this.schema = new Schema$1(this.schema || { type: 'object' });
    }
  }

  // Create a subclass of Record that's tied to this Mapper
  if (this.recordClass === undefined) {
    var superClass = Record$1;
    this.recordClass = superClass.extend({
      constructor: function Record() {
        var subClass = function Record(props, opts) {
          utils.classCallCheck(this, subClass);
          superClass.call(this, props, opts);
        };
        return subClass;
      }()
    });
  }

  if (this.recordClass) {
    this.recordClass.mapper = this;

    /**
     * Functions that should be added to the prototype of {@link Mapper#recordClass}.
     *
     * @name Mapper#methods
     * @since 3.0.0
     * @type {Object}
     */
    if (utils.isObject(this.methods)) {
      utils.addHiddenPropsToTarget(this.recordClass.prototype, this.methods);
    }

    // We can only apply the schema to the prototype of this.recordClass if the
    // class extends Record
    if (Record$1.prototype.isPrototypeOf(Object.create(this.recordClass.prototype)) && this.schema && this.schema.apply && this.applySchema) {
      this.schema.apply(this.recordClass.prototype);
    }
  }
}

var Mapper$1 = Component$1.extend({
  constructor: Mapper,

  /**
   * Mapper lifecycle hook called by {@link Mapper#count}. If this method
   * returns a promise then {@link Mapper#count} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterCount
   * @param {Object} query The `query` argument passed to {@link Mapper#count}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterCount: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#create}. If this method
   * returns a promise then {@link Mapper#create} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterCreate
   * @param {Object} props The `props` argument passed to {@link Mapper#create}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterCreate: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
   * returns a promise then {@link Mapper#createMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterCreateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterCreateMany: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
   * returns a promise then {@link Mapper#destroy} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterDestroy
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterDestroy: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
   * returns a promise then {@link Mapper#destroyAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterDestroyAll
   * @param {*} data The `data` returned by the adapter.
   * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterDestroyAll: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#find}. If this method
   * returns a promise then {@link Mapper#find} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterFind
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterFind: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
   * returns a promise then {@link Mapper#findAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterFindAll
   * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterFindAll: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
   * returns a promise then {@link Mapper#sum} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterSum
   * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterSum: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#update}. If this method
   * returns a promise then {@link Mapper#update} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterUpdate
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
   * @param {props} props The `props` argument passed to {@link Mapper#update}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterUpdate: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
   * returns a promise then {@link Mapper#updateAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterUpdateAll
   * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
   * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterUpdateAll: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
   * returns a promise then {@link Mapper#updateMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterUpdateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterUpdateMany: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#create}. If this method
   * returns a promise then {@link Mapper#create} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeCreate
   * @param {Object} props The `props` argument passed to {@link Mapper#create}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
   * @since 3.0.0
   */
  beforeCreate: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
   * returns a promise then {@link Mapper#createMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeCreateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
   * @since 3.0.0
   */
  beforeCreateMany: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#count}. If this method
   * returns a promise then {@link Mapper#count} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeCount
   * @param {Object} query The `query` argument passed to {@link Mapper#count}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
   * @since 3.0.0
   */
  beforeCount: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
   * returns a promise then {@link Mapper#destroy} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeDestroy
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
   * @since 3.0.0
   */
  beforeDestroy: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
   * returns a promise then {@link Mapper#destroyAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeDestroyAll
   * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
   * @since 3.0.0
   */
  beforeDestroyAll: notify,

  /**
   * Mappers lifecycle hook called by {@link Mapper#find}. If this method
   * returns a promise then {@link Mapper#find} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeFind
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
   * @since 3.0.0
   */
  beforeFind: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
   * returns a promise then {@link Mapper#findAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeFindAll
   * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
   * @since 3.0.0
   */
  beforeFindAll: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
   * returns a promise then {@link Mapper#sum} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeSum
   * @param {string} field The `field` argument passed to {@link Mapper#sum}.
   * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
   * @since 3.0.0
   */
  beforeSum: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#update}. If this method
   * returns a promise then {@link Mapper#update} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeUpdate
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
   * @param {props} props The `props` argument passed to {@link Mapper#update}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
   * @since 3.0.0
   */
  beforeUpdate: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
   * returns a promise then {@link Mapper#updateAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeUpdateAll
   * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
   * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
   * @since 3.0.0
   */
  beforeUpdateAll: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
   * returns a promise then {@link Mapper#updateMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeUpdateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
   * @since 3.0.0
   */
  beforeUpdateMany: notify,

  /**
   * This method is called at the end of most lifecycle methods. It does the
   * following:
   *
   * 1. If `opts.raw` is `true`, add this Mapper's configuration to the `opts`
   * argument as metadata for the operation.
   * 2. Wrap the result data appropriately using {@link Mapper#wrap}, which
   * calls {@link Mapper#createRecord}.
   *
   * @method Mapper#_end
   * @private
   * @since 3.0.0
   */
  _end: function _end(result, opts, skip) {
    if (opts.raw) {
      utils._(result, opts);
    }
    if (skip) {
      return result;
    }
    var _data = opts.raw ? result.data : result;
    if (_data && utils.isFunction(this.wrap)) {
      _data = this.wrap(_data, opts);
      if (opts.raw) {
        result.data = _data;
      } else {
        result = _data;
      }
    }
    return result;
  },


  /**
   * Define a belongsTo relationship. Only useful if you're managing your
   * Mappers manually and not using a Container or DataStore component.
   *
   * @example
   * PostMapper.belongsTo(UserMapper, {
   *   // post.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // user records will be attached to post records at "post.user"
   *   localField: 'user'
   * })
   *
   * CommentMapper.belongsTo(UserMapper, {
   *   // comment.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // user records will be attached to comment records at "comment.user"
   *   localField: 'user'
   * })
   * CommentMapper.belongsTo(PostMapper, {
   *   // comment.post_id points to post.id
   *   foreignKey: 'post_id'
   *   // post records will be attached to comment records at "comment.post"
   *   localField: 'post'
   * })
   *
   * @method Mapper#belongsTo
   * @see http://www.js-data.io/v3.0/docs/relations
   * @since 3.0.0
   */
  belongsTo: function belongsTo$$1(relatedMapper, opts) {
    return belongsTo(relatedMapper, opts)(this);
  },


  /**
   * Select records according to the `query` argument and return the count.
   *
   * {@link Mapper#beforeCount} will be called before calling the adapter.
   * {@link Mapper#afterCount} will be called after calling the adapter.
   *
   * @example
   * // Get the number of published blog posts
   * PostMapper.count({ status: 'published' }).then((numPublished) => {
   *   console.log(numPublished) // e.g. 45
   * })
   *
   * @method Mapper#count
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `count` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the count of the selected records.
   * @since 3.0.0
   */
  count: function count(query, opts) {
    return this.crud('count', query, opts);
  },


  /**
   * Fired during {@link Mapper#create}. See
   * {@link Mapper~beforeCreateListener} for how to listen for this event.
   *
   * @event Mapper#beforeCreate
   * @see Mapper~beforeCreateListener
   * @see Mapper#create
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeCreate} event.
   *
   * @example
   * function onBeforeCreate (props, opts) {
   *   // do something
   * }
   * store.on('beforeCreate', onBeforeCreate)
   *
   * @callback Mapper~beforeCreateListener
   * @param {Object} props The `props` argument passed to {@link Mapper#beforeCreate}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#beforeCreate}.
   * @see Mapper#event:beforeCreate
   * @see Mapper#create
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#create}. See
   * {@link Mapper~afterCreateListener} for how to listen for this event.
   *
   * @event Mapper#afterCreate
   * @see Mapper~afterCreateListener
   * @see Mapper#create
   */
  /**
   * Callback signature for the {@link Mapper#event:afterCreate} event.
   *
   * @example
   * function onAfterCreate (props, opts, result) {
   *   // do something
   * }
   * store.on('afterCreate', onAfterCreate)
   *
   * @callback Mapper~afterCreateListener
   * @param {Object} props The `props` argument passed to {@link Mapper#afterCreate}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#afterCreate}.
   * @param {Object} result The `result` argument passed to {@link Mapper#afterCreate}.
   * @see Mapper#event:afterCreate
   * @see Mapper#create
   * @since 3.0.0
   */
  /**
   * Create and save a new the record using the provided `props`.
   *
   * {@link Mapper#beforeCreate} will be called before calling the adapter.
   * {@link Mapper#afterCreate} will be called after calling the adapter.
   *
   * @example
   * // Create and save a new blog post
   * PostMapper.create({
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }).then((post) => {
   *   console.log(post) // { id: 1234, status: 'draft', ... }
   * })
   *
   * @fires Mapper#beforeCreate
   * @fires Mapper#afterCreate
   * @method Mapper#create
   * @param {Object} props The properties for the new record.
   * @param {Object} [opts] Configuration options. Refer to the `create` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.noValidate={@link Mapper#noValidate}] See {@link Mapper#noValidate}.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to create in a cascading
   * create if `props` contains nested relations. NOT performed in a
   * transaction. Each nested create will result in another {@link Mapper#create}
   * or {@link Mapper#createMany} call.
   * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
   * of the payload. Normally relations are not sent.
   * @returns {Promise} Resolves with the created record.
   * @since 3.0.0
   */
  create: function create(props, opts) {
    var _this2 = this;

    // Default values for arguments
    props || (props = {});
    opts || (opts = {});
    var originalRecord = props;
    var parentRelationMap = {};
    var adapterResponse = {};

    // Fill in "opts" with the Mapper's configuration
    utils._(opts, this);
    opts.adapter = this.getAdapterName(opts);

    opts.op = 'beforeCreate';
    return this._runHook(opts.op, props, opts).then(function (props) {
      opts.with || (opts.with = []);
      return _this2._createParentRecordIfRequired(props, opts);
    }).then(function (relationMap) {
      parentRelationMap = relationMap;
    }).then(function () {
      opts.op = 'create';
      return _this2._invokeAdapterMethod(opts.op, props, opts);
    }).then(function (result) {
      adapterResponse = result;
    }).then(function () {
      var createdProps = opts.raw ? adapterResponse.data : adapterResponse;

      return _this2._createOrAssignChildRecordIfRequired(createdProps, {
        opts: opts,
        parentRelationMap: parentRelationMap,
        originalProps: props
      });
    }).then(function (createdProps) {
      return _this2._commitChanges(originalRecord, createdProps);
    }).then(function (record) {
      if (opts.raw) {
        adapterResponse.data = record;
      } else {
        adapterResponse = record;
      }
      var result = _this2._end(adapterResponse, opts);
      opts.op = 'afterCreate';
      return _this2._runHook(opts.op, props, opts, result);
    });
  },
  _commitChanges: function _commitChanges(recordOrRecords, newValues) {
    var _this3 = this;

    if (utils.isArray(recordOrRecords)) {
      return recordOrRecords.map(function (record, i) {
        return _this3._commitChanges(record, newValues[i]);
      });
    }

    utils.set(recordOrRecords, newValues, { silent: true });

    if (utils.isFunction(recordOrRecords.commit)) {
      recordOrRecords.commit();
    }

    return recordOrRecords;
  },


  /**
   * Use {@link Mapper#createRecord} instead.
   * @deprecated
   * @method Mapper#createInstance
   * @param {Object|Array} props See {@link Mapper#createRecord}.
   * @param {Object} [opts] See {@link Mapper#createRecord}.
   * @returns {Object|Array} See {@link Mapper#createRecord}.
   * @see Mapper#createRecord
   * @since 3.0.0
   */
  createInstance: function createInstance(props, opts) {
    return this.createRecord(props, opts);
  },


  /**
   * Creates parent record for relation types like BelongsTo or HasMany with localKeys
   * in order to satisfy foreignKey dependency (so called child records).
   * @param {Object} props See {@link Mapper#create}.
   * @param {Object} opts See {@link Mapper#create}.
   * @returns {Object} cached parent records map
   * @see Mapper#create
   * @since 3.0.0
   */
  _createParentRecordIfRequired: function _createParentRecordIfRequired(props, opts) {
    var tasks = [];
    var relations = [];

    utils.forEachRelation(this, opts, function (def, optsCopy) {
      if (!def.isRequiresParentId() || !def.getLocalField(props)) {
        return;
      }

      optsCopy.raw = false;
      relations.push(def);
      tasks.push(def.createParentRecord(props, optsCopy));
    });

    return utils.Promise.all(tasks).then(function (records) {
      return relations.reduce(function (map, relation, index) {
        relation.setLocalField(map, records[index]);
        return map;
      }, {});
    });
  },


  /**
   * Creates child record for relation types like HasOne or HasMany with foreignKey
   * in order to satisfy foreignKey dependency (so called parent records).
   * @param {Object} props See {@link Mapper#create}.
   * @param {Object} context contains collected information.
   * @param {Object} context.opts See {@link Mapper#create}.
   * @param {Object} context.parentRelationMap contains parent records map
   * @param {Object} context.originalProps contains data passed into {@link Mapper#create} method
   * @return {Promise} updated props
   * @see Mapper#create
   * @since 3.0.0
   */
  _createOrAssignChildRecordIfRequired: function _createOrAssignChildRecordIfRequired(props, context) {
    var tasks = [];

    utils.forEachRelation(this, context.opts, function (def, optsCopy) {
      var relationData = def.getLocalField(context.originalProps);

      if (!relationData) {
        return;
      }

      optsCopy.raw = false;
      // Create hasMany and hasOne after the main create because we needed
      // a generated id to attach to these items
      if (def.isRequiresChildId()) {
        tasks.push(def.createChildRecord(props, relationData, optsCopy));
      } else if (def.isRequiresParentId()) {
        var parent = def.getLocalField(context.parentRelationMap);

        if (parent) {
          def.setLocalField(props, parent);
        }
      }
    });

    return utils.Promise.all(tasks).then(function () {
      return props;
    });
  },


  /**
   * Fired during {@link Mapper#createMany}. See
   * {@link Mapper~beforeCreateManyListener} for how to listen for this event.
   *
   * @event Mapper#beforeCreateMany
   * @see Mapper~beforeCreateManyListener
   * @see Mapper#createMany
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeCreateMany} event.
   *
   * @example
   * function onBeforeCreateMany (records, opts) {
   *   // do something
   * }
   * store.on('beforeCreateMany', onBeforeCreateMany)
   *
   * @callback Mapper~beforeCreateManyListener
   * @param {Object} records The `records` argument received by {@link Mapper#beforeCreateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeCreateMany}.
   * @see Mapper#event:beforeCreateMany
   * @see Mapper#createMany
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#createMany}. See
   * {@link Mapper~afterCreateManyListener} for how to listen for this event.
   *
   * @event Mapper#afterCreateMany
   * @see Mapper~afterCreateManyListener
   * @see Mapper#createMany
   */
  /**
   * Callback signature for the {@link Mapper#event:afterCreateMany} event.
   *
   * @example
   * function onAfterCreateMany (records, opts, result) {
   *   // do something
   * }
   * store.on('afterCreateMany', onAfterCreateMany)
   *
   * @callback Mapper~afterCreateManyListener
   * @param {Object} records The `records` argument received by {@link Mapper#afterCreateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterCreateMany}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterCreateMany}.
   * @see Mapper#event:afterCreateMany
   * @see Mapper#createMany
   * @since 3.0.0
   */
  /**
   * Given an array of records, batch create them via an adapter.
   *
   * {@link Mapper#beforeCreateMany} will be called before calling the adapter.
   * {@link Mapper#afterCreateMany} will be called after calling the adapter.
   *
   * @example
   * // Create and save several new blog posts
   * PostMapper.createMany([{
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }, {
   *   title: 'Reading data',
   *   status: 'draft'
   * }]).then((posts) => {
   *   console.log(posts[0]) // { id: 1234, status: 'draft', ... }
   *   console.log(posts[1]) // { id: 1235, status: 'draft', ... }
   * })
   *
   * @fires Mapper#beforeCreate
   * @fires Mapper#afterCreate
   * @method Mapper#createMany
   * @param {Record[]} records Array of records to be created in one batch.
   * @param {Object} [opts] Configuration options. Refer to the `createMany`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.noValidate={@link Mapper#noValidate}] See {@link Mapper#noValidate}.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to create in a cascading
   * create if `records` contains nested relations. NOT performed in a
   * transaction. Each nested create will result in another {@link Mapper#createMany}
   * call.
   * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
   * of the payload. Normally relations are not sent.
   * @returns {Promise} Resolves with the created records.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  createMany: function createMany(records, opts) {
    var _this4 = this;

    // Default values for arguments
    records || (records = []);
    opts || (opts = {});
    var originalRecords = records;
    var adapterResponse = void 0;

    // Fill in "opts" with the Mapper's configuration
    utils._(opts, this);
    opts.adapter = this.getAdapterName(opts);

    // beforeCreateMany lifecycle hook
    opts.op = 'beforeCreateMany';
    return this._runHook(opts.op, records, opts).then(function (records) {
      // Deep pre-create belongsTo relations
      var belongsToRelationData = {};
      opts.with || (opts.with = []);
      var tasks = [];
      utils.forEachRelation(_this4, opts, function (def, optsCopy) {
        var relationData = records.map(function (record) {
          return def.getLocalField(record);
        }).filter(Boolean);
        if (def.type === belongsToType && relationData.length === records.length) {
          // Create belongsTo relation first because we need a generated id to
          // attach to the child
          optsCopy.raw = false;
          tasks.push(def.createLinked(relationData, optsCopy).then(function (relatedRecords) {
            records.forEach(function (record, i) {
              return def.setForeignKey(record, relatedRecords[i]);
            });
          }).then(function (relatedRecords) {
            def.setLocalField(belongsToRelationData, relatedRecords);
          }));
        }
      });
      return utils.Promise.all(tasks).then(function () {
        opts.op = 'createMany';
        return _this4._invokeAdapterMethod(opts.op, records, opts);
      }).then(function (result) {
        adapterResponse = result;
      }).then(function () {
        var createdRecordsData = opts.raw ? adapterResponse.data : adapterResponse;

        // Deep post-create hasOne relations
        tasks = [];
        utils.forEachRelation(_this4, opts, function (def, optsCopy) {
          var relationData = records.map(function (record) {
            return def.getLocalField(record);
          }).filter(Boolean);
          if (relationData.length !== records.length) {
            return;
          }

          optsCopy.raw = false;
          var belongsToData = def.getLocalField(belongsToRelationData);
          var task = void 0;
          // Create hasMany and hasOne after the main create because we needed
          // a generated id to attach to these items
          if (def.type === hasManyType) {
            // Not supported
            _this4.log('warn', 'deep createMany of hasMany type not supported!');
          } else if (def.type === hasOneType) {
            createdRecordsData.forEach(function (createdRecordData, i) {
              def.setForeignKey(createdRecordData, relationData[i]);
            });
            task = def.getRelation().createMany(relationData, optsCopy).then(function (relatedData) {
              createdRecordsData.forEach(function (createdRecordData, i) {
                def.setLocalField(createdRecordData, relatedData[i]);
              });
            });
          } else if (def.type === belongsToType && belongsToData && belongsToData.length === createdRecordsData.length) {
            createdRecordsData.forEach(function (createdRecordData, i) {
              def.setLocalField(createdRecordData, belongsToData[i]);
            });
          }
          if (task) {
            tasks.push(task);
          }
        });
        return utils.Promise.all(tasks).then(function () {
          return _this4._commitChanges(originalRecords, createdRecordsData);
        });
      });
    }).then(function (records) {
      if (opts.raw) {
        adapterResponse.data = records;
      } else {
        adapterResponse = records;
      }
      var result = _this4._end(adapterResponse, opts);
      opts.op = 'afterCreateMany';
      return _this4._runHook(opts.op, records, opts, result);
    });
  },


  /**
   * Create an unsaved, uncached instance of this Mapper's
   * {@link Mapper#recordClass}.
   *
   * Returns `props` if `props` is already an instance of
   * {@link Mapper#recordClass}.
   *
   * __Note:__ This method does __not__ interact with any adapter, and does
   * __not__ save any data. It only creates new objects in memory.
   *
   * @example
   * // Create empty unsaved record instance
   * const post = PostMapper.createRecord()
   *
   * @example
   * // Create an unsaved record instance with inital properties
   * const post = PostMapper.createRecord({
   *   title: 'Modeling your data',
   *   status: 'draft'
   * })
   *
   * @example
   * // Create a record instance that corresponds to a saved record
   * const post = PostMapper.createRecord({
   *   // JSData thinks this record has been saved if it has a primary key
   *   id: 1234,
   *   title: 'Modeling your data',
   *   status: 'draft'
   * })
   *
   * @example
   * // Create record instances from an array
   * const posts = PostMapper.createRecord([{
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }, {
   *   title: 'Reading data',
   *   status: 'draft'
   * }])
   *
   * @example
   * // Records are validated by default
   * import {Mapper} from 'js-data'
   * const PostMapper = new Mapper({
   *   name: 'post',
   *   schema: { properties: { title: { type: 'string' } } }
   * })
   * try {
   *   const post = PostMapper.createRecord({
   *     title: 1234,
   *   })
   * } catch (err) {
   *   console.log(err.errors) // [{ expected: 'one of (string)', actual: 'number', path: 'title' }]
   * }
   *
   * @example
   * // Skip validation
   * import {Mapper} from 'js-data'
   * const PostMapper = new Mapper({
   *   name: 'post',
   *   schema: { properties: { title: { type: 'string' } } }
   * })
   * const post = PostMapper.createRecord({
   *   title: 1234,
   * }, { noValidate: true })
   * console.log(post.isValid()) // false
   *
   * @method Mapper#createRecord
   * @param {Object|Object[]} props The properties for the Record instance or an
   * array of property objects for the Record instances.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.noValidate={@link Mapper#noValidate}] See {@link Mapper#noValidate}.
   * @returns {Record|Record[]} The Record instance or Record instances.
   * @since 3.0.0
   */
  createRecord: function createRecord(props, opts) {
    var _this5 = this;

    props || (props = {});
    if (utils.isArray(props)) {
      return props.map(function (_props) {
        return _this5.createRecord(_props, opts);
      });
    }
    if (!utils.isObject(props)) {
      throw utils.err(DOMAIN$6 + '#createRecord', 'props')(400, 'array or object', props);
    }

    if (this.relationList) {
      this.relationList.forEach(function (def) {
        def.ensureLinkedDataHasProperType(props, opts);
      });
    }
    var RecordCtor = this.recordClass;

    return !RecordCtor || props instanceof RecordCtor ? props : new RecordCtor(props, opts);
  },


  /**
   * Lifecycle invocation method. You probably won't call this method directly.
   *
   * @method Mapper#crud
   * @param {string} method Name of the lifecycle method to invoke.
   * @param {...*} args Arguments to pass to the lifecycle method.
   * @returns {Promise}
   * @since 3.0.0
   */
  crud: function crud(method) {
    var _this6 = this;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var config = this.lifecycleMethods[method];
    if (!config) {
      throw utils.err(DOMAIN$6 + '#crud', method)(404, 'method');
    }

    var upper = '' + method.charAt(0).toUpperCase() + method.substr(1);
    var before = 'before' + upper;
    var after = 'after' + upper;

    var op = void 0,
        adapter = void 0;

    // Default values for arguments
    config.defaults.forEach(function (value, i) {
      if (args[i] === undefined) {
        args[i] = utils.copy(value);
      }
    });

    var opts = args[args.length - 1];

    // Fill in "opts" with the Mapper's configuration
    utils._(opts, this);
    adapter = opts.adapter = this.getAdapterName(opts);

    // before lifecycle hook
    op = opts.op = before;
    return utils.resolve(this[op].apply(this, toConsumableArray(args))).then(function (_value) {
      var _getAdapter;

      if (args[config.beforeAssign] !== undefined) {
        // Allow for re-assignment from lifecycle hook
        args[config.beforeAssign] = _value === undefined ? args[config.beforeAssign] : _value;
      }
      // Now delegate to the adapter
      op = opts.op = method;
      args = config.adapterArgs ? config.adapterArgs.apply(config, [_this6].concat(toConsumableArray(args))) : args;
      _this6.dbg.apply(_this6, [op].concat(toConsumableArray(args)));
      return utils.resolve((_getAdapter = _this6.getAdapter(adapter))[op].apply(_getAdapter, [_this6].concat(toConsumableArray(args))));
    }).then(function (result) {
      result = _this6._end(result, opts, !!config.skip);
      args.push(result);
      // after lifecycle hook
      op = opts.op = after;
      return utils.resolve(_this6[op].apply(_this6, toConsumableArray(args))).then(function (_result) {
        // Allow for re-assignment from lifecycle hook
        return _result === undefined ? result : _result;
      });
    });
  },


  /**
   * Fired during {@link Mapper#destroy}. See
   * {@link Mapper~beforeDestroyListener} for how to listen for this event.
   *
   * @event Mapper#beforeDestroy
   * @see Mapper~beforeDestroyListener
   * @see Mapper#destroy
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeDestroy} event.
   *
   * @example
   * function onBeforeDestroy (id, opts) {
   *   // do something
   * }
   * store.on('beforeDestroy', onBeforeDestroy)
   *
   * @callback Mapper~beforeDestroyListener
   * @param {string|number} id The `id` argument passed to {@link Mapper#beforeDestroy}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#beforeDestroy}.
   * @see Mapper#event:beforeDestroy
   * @see Mapper#destroy
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#destroy}. See
   * {@link Mapper~afterDestroyListener} for how to listen for this event.
   *
   * @event Mapper#afterDestroy
   * @see Mapper~afterDestroyListener
   * @see Mapper#destroy
   */
  /**
   * Callback signature for the {@link Mapper#event:afterDestroy} event.
   *
   * @example
   * function onAfterDestroy (id, opts, result) {
   *   // do something
   * }
   * store.on('afterDestroy', onAfterDestroy)
   *
   * @callback Mapper~afterDestroyListener
   * @param {string|number} id The `id` argument passed to {@link Mapper#afterDestroy}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#afterDestroy}.
   * @param {Object} result The `result` argument passed to {@link Mapper#afterDestroy}.
   * @see Mapper#event:afterDestroy
   * @see Mapper#destroy
   * @since 3.0.0
   */
  /**
   * Using an adapter, destroy the record with the given primary key.
   *
   * {@link Mapper#beforeDestroy} will be called before destroying the record.
   * {@link Mapper#afterDestroy} will be called after destroying the record.
   *
   * @example
   * // Destroy a specific blog post
   * PostMapper.destroy(1234).then(() => {
   *   // Blog post #1234 has been destroyed
   * })
   *
   * @example
   * // Get full response
   * PostMapper.destroy(1234, { raw: true }).then((result) => {
   *   console.log(result.deleted) e.g. 1
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @fires Mapper#beforeDestroy
   * @fires Mapper#afterDestroy
   * @method Mapper#destroy
   * @param {(string|number)} id The primary key of the record to destroy.
   * @param {Object} [opts] Configuration options. Refer to the `destroy` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves when the record has been destroyed. Resolves
   * even if no record was found to be destroyed.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  destroy: function destroy(id, opts) {
    return this.crud('destroy', id, opts);
  },


  /**
   * Fired during {@link Mapper#destroyAll}. See
   * {@link Mapper~beforeDestroyAllListener} for how to listen for this event.
   *
   * @event Mapper#beforeDestroyAll
   * @see Mapper~beforeDestroyAllListener
   * @see Mapper#destroyAll
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeDestroyAll} event.
   *
   * @example
   * function onBeforeDestroyAll (query, opts) {
   *   // do something
   * }
   * store.on('beforeDestroyAll', onBeforeDestroyAll)
   *
   * @callback Mapper~beforeDestroyAllListener
   * @param {Object} query The `query` argument passed to {@link Mapper#beforeDestroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#beforeDestroyAll}.
   * @see Mapper#event:beforeDestroyAll
   * @see Mapper#destroyAll
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#destroyAll}. See
   * {@link Mapper~afterDestroyAllListener} for how to listen for this event.
   *
   * @event Mapper#afterDestroyAll
   * @see Mapper~afterDestroyAllListener
   * @see Mapper#destroyAll
   */
  /**
   * Callback signature for the {@link Mapper#event:afterDestroyAll} event.
   *
   * @example
   * function onAfterDestroyAll (query, opts, result) {
   *   // do something
   * }
   * store.on('afterDestroyAll', onAfterDestroyAll)
   *
   * @callback Mapper~afterDestroyAllListener
   * @param {Object} query The `query` argument passed to {@link Mapper#afterDestroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#afterDestroyAll}.
   * @param {Object} result The `result` argument passed to {@link Mapper#afterDestroyAll}.
   * @see Mapper#event:afterDestroyAll
   * @see Mapper#destroyAll
   * @since 3.0.0
   */
  /**
   * Destroy the records selected by `query` via an adapter. If no `query` is
   * provided then all records will be destroyed.
   *
   * {@link Mapper#beforeDestroyAll} will be called before destroying the records.
   * {@link Mapper#afterDestroyAll} will be called after destroying the records.
   *
   * @example
   * // Destroy all blog posts
   * PostMapper.destroyAll().then(() => {
   *   // All blog posts have been destroyed
   * })
   *
   * @example
   * // Destroy all "draft" blog posts
   * PostMapper.destroyAll({ status: 'draft' }).then(() => {
   *   // All "draft" blog posts have been destroyed
   * })
   *
   * @example
   * // Get full response
   * const query = null
   * const options = { raw: true }
   * PostMapper.destroyAll(query, options).then((result) => {
   *   console.log(result.deleted) e.g. 14
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @fires Mapper#beforeDestroyAll
   * @fires Mapper#afterDestroyAll
   * @method Mapper#destroyAll
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `destroyAll`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves when the records have been destroyed. Resolves
   * even if no records were found to be destroyed.
   * @see query
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  destroyAll: function destroyAll(query, opts) {
    return this.crud('destroyAll', query, opts);
  },


  /**
   * Fired during {@link Mapper#find}. See
   * {@link Mapper~beforeFindListener} for how to listen for this event.
   *
   * @event Mapper#beforeFind
   * @see Mapper~beforeFindListener
   * @see Mapper#find
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeFind} event.
   *
   * @example
   * function onBeforeFind (id, opts) {
   *   // do something
   * }
   * store.on('beforeFind', onBeforeFind)
   *
   * @callback Mapper~beforeFindListener
   * @param {string|number} id The `id` argument passed to {@link Mapper#beforeFind}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#beforeFind}.
   * @see Mapper#event:beforeFind
   * @see Mapper#find
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#find}. See
   * {@link Mapper~afterFindListener} for how to listen for this event.
   *
   * @event Mapper#afterFind
   * @see Mapper~afterFindListener
   * @see Mapper#find
   */
  /**
   * Callback signature for the {@link Mapper#event:afterFind} event.
   *
   * @example
   * function onAfterFind (id, opts, result) {
   *   // do something
   * }
   * store.on('afterFind', onAfterFind)
   *
   * @callback Mapper~afterFindListener
   * @param {string|number} id The `id` argument passed to {@link Mapper#afterFind}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#afterFind}.
   * @param {Object} result The `result` argument passed to {@link Mapper#afterFind}.
   * @see Mapper#event:afterFind
   * @see Mapper#find
   * @since 3.0.0
   */
  /**
   * Retrieve via an adapter the record with the given primary key.
   *
   * {@link Mapper#beforeFind} will be called before calling the adapter.
   * {@link Mapper#afterFind} will be called after calling the adapter.
   *
   * @example
   * PostMapper.find(1).then((post) => {
   *   console.log(post) // { id: 1, ...}
   * })
   *
   * @example
   * // Get full response
   * PostMapper.find(1, { raw: true }).then((result) => {
   *   console.log(result.data) // { id: 1, ...}
   *   console.log(result.found) // 1
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @fires Mapper#beforeFind
   * @fires Mapper#afterFind
   * @method Mapper#find
   * @param {(string|number)} id The primary key of the record to retrieve.
   * @param {Object} [opts] Configuration options. Refer to the `find` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to eager load in the request.
   * @returns {Promise} Resolves with the found record. Resolves with
   * `undefined` if no record was found.
   * @see http://www.js-data.io/v3.0/docs/reading-data
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/reading-data","Reading data"]
   */
  find: function find(id, opts) {
    return this.crud('find', id, opts);
  },


  /**
   * Fired during {@link Mapper#findAll}. See
   * {@link Mapper~beforeFindAllListener} for how to listen for this event.
   *
   * @event Mapper#beforeFindAll
   * @see Mapper~beforeFindAllListener
   * @see Mapper#findAll
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeFindAll} event.
   *
   * @example
   * function onBeforeFindAll (query, opts) {
   *   // do something
   * }
   * store.on('beforeFindAll', onBeforeFindAll)
   *
   * @callback Mapper~beforeFindAllListener
   * @param {Object} query The `query` argument passed to {@link Mapper#beforeFindAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#beforeFindAll}.
   * @see Mapper#event:beforeFindAll
   * @see Mapper#findAll
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#findAll}. See
   * {@link Mapper~afterFindAllListener} for how to listen for this event.
   *
   * @event Mapper#afterFindAll
   * @see Mapper~afterFindAllListener
   * @see Mapper#findAll
   */
  /**
   * Callback signature for the {@link Mapper#event:afterFindAll} event.
   *
   * @example
   * function onAfterFindAll (query, opts, result) {
   *   // do something
   * }
   * store.on('afterFindAll', onAfterFindAll)
   *
   * @callback Mapper~afterFindAllListener
   * @param {Object} query The `query` argument passed to {@link Mapper#afterFindAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#afterFindAll}.
   * @param {Object} result The `result` argument passed to {@link Mapper#afterFindAll}.
   * @see Mapper#event:afterFindAll
   * @see Mapper#findAll
   * @since 3.0.0
   */
  /**
   * Using the `query` argument, select records to retrieve via an adapter.
   *
   * {@link Mapper#beforeFindAll} will be called before calling the adapter.
   * {@link Mapper#afterFindAll} will be called after calling the adapter.
   *
   * @example
   * // Find all "published" blog posts
   * PostMapper.findAll({ status: 'published' }).then((posts) => {
   *   console.log(posts) // [{ id: 1, status: 'published', ...}, ...]
   * })
   *
   * @example
   * // Get full response
   * PostMapper.findAll({ status: 'published' }, { raw: true }).then((result) => {
   *   console.log(result.data) // [{ id: 1, status: 'published', ...}, ...]
   *   console.log(result.found) // e.g. 13
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @fires Mapper#beforeFindAll
   * @fires Mapper#afterFindAll
   * @method Mapper#findAll
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `findAll` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to eager load in the request.
   * @returns {Promise} Resolves with the found records, if any.
   * @see query
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/reading-data","Reading data"]
   */
  findAll: function findAll(query, opts) {
    return this.crud('findAll', query, opts);
  },


  /**
   * Return the registered adapter with the given name or the default adapter if
   * no name is provided.
   *
   * @method Mapper#getAdapter
   * @param {string} [name] The name of the adapter to retrieve.
   * @returns {Adapter} The adapter.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  getAdapter: function getAdapter(name) {
    this.dbg('getAdapter', 'name:', name);
    var adapter = this.getAdapterName(name);
    if (!adapter) {
      throw utils.err(DOMAIN$6 + '#getAdapter', 'name')(400, 'string', name);
    }
    return this.getAdapters()[adapter];
  },


  /**
   * Return the name of a registered adapter based on the given name or options,
   * or the name of the default adapter if no name provided.
   *
   * @method Mapper#getAdapterName
   * @param {(Object|string)} [opts] The name of an adapter or options, if any.
   * @returns {string} The name of the adapter.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  getAdapterName: function getAdapterName(opts) {
    opts || (opts = {});
    if (utils.isString(opts)) {
      opts = { adapter: opts };
    }
    return opts.adapter || opts.defaultAdapter;
  },


  /**
   * Get the object of registered adapters for this Mapper.
   *
   * @method Mapper#getAdapters
   * @returns {Object} {@link Mapper#_adapters}
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  getAdapters: function getAdapters() {
    return this._adapters;
  },


  /**
   * Returns this Mapper's {@link Schema}.
   *
   * @method Mapper#getSchema
   * @returns {Schema} This Mapper's {@link Schema}.
   * @see Mapper#schema
   * @since 3.0.0
   */
  getSchema: function getSchema() {
    return this.schema;
  },


  /**
   * Defines a hasMany relationship. Only useful if you're managing your
   * Mappers manually and not using a Container or DataStore component.
   *
   * @example
   * UserMapper.hasMany(PostMapper, {
   *   // post.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // post records will be attached to user records at "user.posts"
   *   localField: 'posts'
   * })
   *
   * @method Mapper#hasMany
   * @see http://www.js-data.io/v3.0/docs/relations
   * @since 3.0.0
   */
  hasMany: function hasMany$$1(relatedMapper, opts) {
    return hasMany(relatedMapper, opts)(this);
  },


  /**
   * Defines a hasOne relationship. Only useful if you're managing your Mappers
   * manually and not using a {@link Container} or {@link DataStore} component.
   *
   * @example
   * UserMapper.hasOne(ProfileMapper, {
   *   // profile.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // profile records will be attached to user records at "user.profile"
   *   localField: 'profile'
   * })
   *
   * @method Mapper#hasOne
   * @see http://www.js-data.io/v3.0/docs/relations
   * @since 3.0.0
   */
  hasOne: function hasOne$$1(relatedMapper, opts) {
    return hasOne(relatedMapper, opts)(this);
  },


  /**
   * Return whether `record` is an instance of this Mapper's recordClass.
   *
   * @example
   * const post = PostMapper.createRecord()
   *
   * console.log(PostMapper.is(post)) // true
   * // Equivalent to what's above
   * console.log(post instanceof PostMapper.recordClass) // true
   *
   * @method Mapper#is
   * @param {Object|Record} record The record to check.
   * @returns {boolean} Whether `record` is an instance of this Mapper's
   * {@link Mapper#recordClass}.
   * @since 3.0.0
   */
  is: function is(record) {
    var recordClass = this.recordClass;
    return recordClass ? record instanceof recordClass : false;
  },


  /**
   * Register an adapter on this Mapper under the given name.
   *
   * @method Mapper#registerAdapter
   * @param {string} name The name of the adapter to register.
   * @param {Adapter} adapter The adapter to register.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.default=false] Whether to make the adapter the
   * default adapter for this Mapper.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  registerAdapter: function registerAdapter(name, adapter, opts) {
    opts || (opts = {});
    this.getAdapters()[name] = adapter;
    // Optionally make it the default adapter for the target.
    if (opts === true || opts.default) {
      this.defaultAdapter = name;
    }
  },
  _runHook: function _runHook(hookName) {
    for (var _len3 = arguments.length, hookArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      hookArgs[_key3 - 1] = arguments[_key3];
    }

    var defaultValueIndex = hookName.indexOf('after') === 0 ? hookArgs.length - 1 : 0;

    return utils.resolve(this[hookName].apply(this, hookArgs)).then(function (overridenResult) {
      return overridenResult === undefined ? hookArgs[defaultValueIndex] : overridenResult;
    });
  },
  _invokeAdapterMethod: function _invokeAdapterMethod(method, propsOrRecords, opts) {
    var _this7 = this;

    var conversionOptions = { with: opts.pass || [] };
    var object = void 0;

    this.dbg(opts.op, propsOrRecords, opts);

    if (utils.isArray(propsOrRecords)) {
      object = propsOrRecords.map(function (record) {
        return _this7.toJSON(record, conversionOptions);
      });
    } else {
      object = this.toJSON(propsOrRecords, conversionOptions);
    }

    return this.getAdapter(opts.adapter)[method](this, object, opts);
  },


  /**
   * Select records according to the `query` argument, and aggregate the sum
   * value of the property specified by `field`.
   *
   * {@link Mapper#beforeSum} will be called before calling the adapter.
   * {@link Mapper#afterSum} will be called after calling the adapter.
   *
   * @example
   * PurchaseOrderMapper.sum('amount', { status: 'paid' }).then((amountPaid) => {
   *   console.log(amountPaid) // e.g. 451125.34
   * })
   *
   * @method Mapper#sum
   * @param {string} field The field to sum.
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `sum` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the aggregated sum.
   * @since 3.0.0
   */
  sum: function sum(field, query, opts) {
    return this.crud('sum', field, query, opts);
  },


  /**
   * Return a plain object representation of the given record. Relations can
   * be optionally be included. Non-schema properties can be excluded.
   *
   * @example
   * import { Mapper, Schema } from 'js-data'
   * const PersonMapper = new Mapper({
   *   name: 'person',
   *   schema: {
   *     properties: {
   *       name: { type: 'string' },
   *       id: { type: 'string' }
   *     }
   *   }
   * })
   * const person = PersonMapper.createRecord({ id: 1, name: 'John', foo: 'bar' })
   * // "foo" is stripped by toJSON()
   * console.log(PersonMapper.toJSON(person)) // {"id":1,"name":"John"}
   *
   * const PersonRelaxedMapper = new Mapper({
   *   name: 'personRelaxed',
   *   schema: {
   *     properties: {
   *       name: { type: 'string' },
   *       id: { type: 'string' }
   *     },
   *     additionalProperties: true
   *   }
   * })
   * const person2 = PersonRelaxedMapper.createRecord({ id: 1, name: 'John', foo: 'bar' })
   * // "foo" is not stripped by toJSON
   * console.log(PersonRelaxedMapper.toJSON(person2)) // {"id":1,"name":"John","foo":"bar"}
   *
   * @method Mapper#toJSON
   * @param {Record|Record[]} records Record or records from which to create a
   * POJO representation.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Array of relation names or relation fields
   * to include in the POJO representation.
   * @param {boolean} [opts.withAll] Whether to simply include all relations in
   * the representation. Overrides `opts.with`.
   * @returns {Object|Object[]} POJO representation of the record or records.
   * @since 3.0.0
   */
  toJSON: function toJSON(records, opts) {
    var _this8 = this;

    var record = void 0;
    opts || (opts = {});
    if (utils.isArray(records)) {
      return records.map(function (record) {
        return _this8.toJSON(record, opts);
      });
    } else {
      record = records;
    }
    var relationFields = (this ? this.relationFields : []) || [];
    var json = {};

    // Copy properties defined in the schema
    if (this && this.schema) {
      json = this.schema.pick(record);
    } else {
      for (var key in record) {
        if (relationFields.indexOf(key) === -1) {
          json[key] = utils.plainCopy(record[key]);
        }
      }
    }

    // The user wants to include relations in the resulting plain object representation
    if (this && opts.withAll) {
      opts.with = relationFields.slice();
    }
    if (this && opts.with) {
      if (utils.isString(opts.with)) {
        opts.with = [opts.with];
      }
      utils.forEachRelation(this, opts, function (def, optsCopy) {
        var relationData = def.getLocalField(record);
        if (relationData) {
          // The actual recursion
          if (utils.isArray(relationData)) {
            def.setLocalField(json, relationData.map(function (item) {
              return def.getRelation().toJSON(item, optsCopy);
            }));
          } else {
            def.setLocalField(json, def.getRelation().toJSON(relationData, optsCopy));
          }
        }
      });
    }
    return json;
  },


  /**
   * Fired during {@link Mapper#update}. See
   * {@link Mapper~beforeUpdateListener} for how to listen for this event.
   *
   * @event Mapper#beforeUpdate
   * @see Mapper~beforeUpdateListener
   * @see Mapper#update
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeUpdate} event.
   *
   * @example
   * function onBeforeUpdate (id, props, opts) {
   *   // do something
   * }
   * store.on('beforeUpdate', onBeforeUpdate)
   *
   * @callback Mapper~beforeUpdateListener
   * @param {string|number} id The `id` argument passed to {@link Mapper#beforeUpdate}.
   * @param {Object} props The `props` argument passed to {@link Mapper#beforeUpdate}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#beforeUpdate}.
   * @see Mapper#event:beforeUpdate
   * @see Mapper#update
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#update}. See
   * {@link Mapper~afterUpdateListener} for how to listen for this event.
   *
   * @event Mapper#afterUpdate
   * @see Mapper~afterUpdateListener
   * @see Mapper#update
   */
  /**
   * Callback signature for the {@link Mapper#event:afterUpdate} event.
   *
   * @example
   * function onAfterUpdate (id, props, opts, result) {
   *   // do something
   * }
   * store.on('afterUpdate', onAfterUpdate)
   *
   * @callback Mapper~afterUpdateListener
   * @param {string|number} id The `id` argument passed to {@link Mapper#afterUpdate}.
   * @param {Object} props The `props` argument passed to {@link Mapper#afterUpdate}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#afterUpdate}.
   * @param {Object} result The `result` argument passed to {@link Mapper#afterUpdate}.
   * @see Mapper#event:afterUpdate
   * @see Mapper#update
   * @since 3.0.0
   */
  /**
   * Using an adapter, update the record with the primary key specified by the
   * `id` argument.
   *
   * {@link Mapper#beforeUpdate} will be called before updating the record.
   * {@link Mapper#afterUpdate} will be called after updating the record.
   *
   * @example
   * // Update a specific post
   * PostMapper.update(1234, {
   *   status: 'published',
   *   published_at: new Date()
   * }).then((post) => {
   *   console.log(post) // { id: 1234, status: 'published', ... }
   * })
   *
   * @fires Mapper#beforeUpdate
   * @fires Mapper#afterUpdate
   * @method Mapper#update
   * @param {(string|number)} id The primary key of the record to update.
   * @param {Object} props The update to apply to the record.
   * @param {Object} [opts] Configuration options. Refer to the `update` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.noValidate={@link Mapper#noValidate}] See {@link Mapper#noValidate}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * transaction.
   * @returns {Promise} Resolves with the updated record. Rejects if the record
   * could not be found.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  update: function update(id, props, opts) {
    return this.crud('update', id, props, opts);
  },


  /**
   * Fired during {@link Mapper#updateAll}. See
   * {@link Mapper~beforeUpdateAllListener} for how to listen for this event.
   *
   * @event Mapper#beforeUpdateAll
   * @see Mapper~beforeUpdateAllListener
   * @see Mapper#updateAll
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeUpdateAll} event.
   *
   * @example
   * function onBeforeUpdateAll (props, query, opts) {
   *   // do something
   * }
   * store.on('beforeUpdateAll', onBeforeUpdateAll)
   *
   * @callback Mapper~beforeUpdateAllListener
   * @param {Object} props The `props` argument received by {@link Mapper#beforeUpdateAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#beforeUpdateAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdateAll}.
   * @see Mapper#event:beforeUpdateAll
   * @see Mapper#updateAll
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#updateAll}. See
   * {@link Mapper~afterUpdateAllListener} for how to listen for this event.
   *
   * @event Mapper#afterUpdateAll
   * @see Mapper~afterUpdateAllListener
   * @see Mapper#updateAll
   */
  /**
   * Callback signature for the {@link Mapper#event:afterUpdateAll} event.
   *
   * @example
   * function onAfterUpdateAll (props, query, opts, result) {
   *   // do something
   * }
   * store.on('afterUpdateAll', onAfterUpdateAll)
   *
   * @callback Mapper~afterUpdateAllListener
   * @param {Object} props The `props` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterUpdateAll}.
   * @see Mapper#event:afterUpdateAll
   * @see Mapper#updateAll
   * @since 3.0.0
   */
  /**
   * Using the `query` argument, perform the a single updated to the selected
   * records.
   *
   * {@link Mapper#beforeUpdateAll} will be called before making the update.
   * {@link Mapper#afterUpdateAll} will be called after making the update.
   *
   * @example
   * // Turn all of John's blog posts into drafts.
   * const update = { status: draft: published_at: null }
   * const query = { userId: 1234 }
   * PostMapper.updateAll(update, query).then((posts) => {
   *   console.log(posts) // [...]
   * })
   *
   * @fires Mapper#beforeUpdateAll
   * @fires Mapper#afterUpdateAll
   * @method Mapper#updateAll
   * @param {Object} props Update to apply to selected records.
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `updateAll`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.noValidate={@link Mapper#noValidate}] See {@link Mapper#noValidate}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the update records, if any.
   * @see query
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  updateAll: function updateAll(props, query, opts) {
    return this.crud('updateAll', props, query, opts);
  },


  /**
   * Fired during {@link Mapper#updateMany}. See
   * {@link Mapper~beforeUpdateManyListener} for how to listen for this event.
   *
   * @event Mapper#beforeUpdateMany
   * @see Mapper~beforeUpdateManyListener
   * @see Mapper#updateMany
   */
  /**
   * Callback signature for the {@link Mapper#event:beforeUpdateMany} event.
   *
   * @example
   * function onBeforeUpdateMany (records, opts) {
   *   // do something
   * }
   * store.on('beforeUpdateMany', onBeforeUpdateMany)
   *
   * @callback Mapper~beforeUpdateManyListener
   * @param {Object} records The `records` argument received by {@link Mapper#beforeUpdateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdateMany}.
   * @see Mapper#event:beforeUpdateMany
   * @see Mapper#updateMany
   * @since 3.0.0
   */
  /**
   * Fired during {@link Mapper#updateMany}. See
   * {@link Mapper~afterUpdateManyListener} for how to listen for this event.
   *
   * @event Mapper#afterUpdateMany
   * @see Mapper~afterUpdateManyListener
   * @see Mapper#updateMany
   */
  /**
   * Callback signature for the {@link Mapper#event:afterUpdateMany} event.
   *
   * @example
   * function onAfterUpdateMany (records, opts, result) {
   *   // do something
   * }
   * store.on('afterUpdateMany', onAfterUpdateMany)
   *
   * @callback Mapper~afterUpdateManyListener
   * @param {Object} records The `records` argument received by {@link Mapper#afterUpdateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdateMany}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterUpdateMany}.
   * @see Mapper#event:afterUpdateMany
   * @see Mapper#updateMany
   * @since 3.0.0
   */
  /**
   * Given an array of updates, perform each of the updates via an adapter. Each
   * "update" is a hash of properties with which to update an record. Each
   * update must contain the primary key of the record to be updated.
   *
   * {@link Mapper#beforeUpdateMany} will be called before making the update.
   * {@link Mapper#afterUpdateMany} will be called after making the update.
   *
   * @example
   * PostMapper.updateMany([
   *   { id: 1234, status: 'draft' },
   *   { id: 2468, status: 'published', published_at: new Date() }
   * ]).then((posts) => {
   *   console.log(posts) // [...]
   * })
   *
   * @fires Mapper#beforeUpdateMany
   * @fires Mapper#afterUpdateMany
   * @method Mapper#updateMany
   * @param {Record[]} records Array up record updates.
   * @param {Object} [opts] Configuration options. Refer to the `updateMany`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.noValidate={@link Mapper#noValidate}] See {@link Mapper#noValidate}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the updated records. Rejects if any of the
   * records could be found.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  updateMany: function updateMany(records, opts) {
    return this.crud('updateMany', records, opts);
  },


  /**
   * Validate the given record or records according to this Mapper's
   * {@link Schema}. If there are no validation errors then the return value
   * will be `undefined`.
   *
   * @example
   * import {Mapper, Schema} from 'js-data'
   * const PersonSchema = new Schema({
   *   properties: {
   *     name: { type: 'string' },
   *     id: { type: 'string' }
   *   }
   * })
   * const PersonMapper = new Mapper({
   *   name: 'person',
   *   schema: PersonSchema
   * })
   * let errors = PersonMapper.validate({ name: 'John' })
   * console.log(errors) // undefined
   * errors = PersonMapper.validate({ name: 123 })
   * console.log(errors) // [{ expected: 'one of (string)', actual: 'number', path: 'name' }]
   *
   * @method Mapper#validate
   * @param {Object|Object[]} record The record or records to validate.
   * @param {Object} [opts] Configuration options. Passed to
   * {@link Schema#validate}.
   * @returns {Object[]} Array of errors or `undefined` if no errors.
   * @since 3.0.0
   */
  validate: function validate(record, opts) {
    opts || (opts = {});
    var schema = this.getSchema();
    if (!schema) {
      return;
    }
    var _opts = utils.pick(opts, ['existingOnly']);
    if (utils.isArray(record)) {
      var errors = record.map(function (_record) {
        return schema.validate(_record, utils.pick(_opts, ['existingOnly']));
      });

      return errors.some(Boolean) ? errors : undefined;
    }
    return schema.validate(record, _opts);
  },


  /**
   * Method used to wrap data returned by an adapter with this Mapper's
   * {@link Mapper#recordClass}. This method is used by all of a Mapper's CRUD
   * methods. The provided implementation of this method assumes that the `data`
   * passed to it is a record or records that need to be wrapped with
   * {@link Mapper#createRecord}. Override with care.
   *
   * Provided implementation of {@link Mapper#wrap}:
   *
   * ```
   * function (data, opts) {
   *   return this.createRecord(data, opts)
   * }
   * ```
   *
   * @example
   * const PostMapper = new Mapper({
   *   name: 'post',
   *   // Override to customize behavior
   *   wrap (data, opts) {
   *     const originalWrap = this.constructor.prototype.wrap
   *     // Let's say "GET /post" doesn't return JSON quite like JSData expects,
   *     // but the actual post records are nested under a "posts" field. So,
   *     // we override Mapper#wrap to handle this special case.
   *     if (opts.op === 'findAll') {
   *       return originalWrap.call(this, data.posts, opts)
   *     }
   *     // Otherwise perform original behavior
   *     return originalWrap.call(this, data, opts)
   *   }
   * })
   *
   * @method Mapper#wrap
   * @param {Object|Object[]} data The record or records to be wrapped.
   * @param {Object} [opts] Configuration options. Passed to {@link Mapper#createRecord}.
   * @returns {Record|Record[]} The wrapped record or records.
   * @since 3.0.0
   */
  wrap: function wrap(data, opts) {
    return this.createRecord(data, opts);
  },


  /**
   * @ignore
   */
  defineRelations: function defineRelations() {
    var _this9 = this;

    // Setup the mapper's relations, including generating Mapper#relationList
    // and Mapper#relationFields
    utils.forOwn(this.relations, function (group, type) {
      utils.forOwn(group, function (relations, _name) {
        if (utils.isObject(relations)) {
          relations = [relations];
        }
        relations.forEach(function (def) {
          var relatedMapper = _this9.datastore.getMapperByName(_name) || _name;
          def.getRelation = function () {
            return _this9.datastore.getMapper(_name);
          };

          if (typeof Relation[type] !== 'function') {
            throw utils.err(DOMAIN$6, 'defineRelations')(400, 'relation type (hasOne, hasMany, etc)', type, true);
          }

          _this9[type](relatedMapper, def);
        });
      });
    });
  }
});

/**
 * Create a subclass of this Mapper:
 *
 * @example <caption>Mapper.extend</caption>
 * // Normally you would do: import {Mapper} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Mapper} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomMapperClass extends Mapper {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customMapper = new CustomMapperClass()
 * console.log(customMapper.foo())
 * console.log(CustomMapperClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherMapperClass = Mapper.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherMapper = new OtherMapperClass()
 * console.log(otherMapper.foo())
 * console.log(OtherMapperClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherMapperClass () {
 *   Mapper.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Mapper.extend({
 *   constructor: AnotherMapperClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherMapper = new AnotherMapperClass()
 * console.log(anotherMapper.created_at)
 * console.log(anotherMapper.foo())
 * console.log(AnotherMapperClass.beep())
 *
 * @method Mapper.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Mapper class.
 * @since 3.0.0
 */

var DOMAIN$5 = 'Container';

var proxiedMapperMethods = [
/**
 * Wrapper for {@link Mapper#count}.
 *
 * @example
 * // Get the number of published blog posts
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.count('post', { status: 'published' }).then((numPublished) => {
 *   console.log(numPublished) // e.g. 45
 * })
 *
 * @method Container#count
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} [query] See {@link Mapper#count}.
 * @param {Object} [opts] See {@link Mapper#count}.
 * @returns {Promise} See {@link Mapper#count}.
 * @see Mapper#count
 * @since 3.0.0
 */
'count',

/**
 * Fired during {@link Container#create}. See
 * {@link Container~beforeCreateListener} for how to listen for this event.
 *
 * @event Container#beforeCreate
 * @see Container~beforeCreateListener
 * @see Container#create
 */
/**
 * Callback signature for the {@link Container#event:beforeCreate} event.
 *
 * @example
 * function onBeforeCreate (mapperName, props, opts) {
 *   // do something
 * }
 * store.on('beforeCreate', onBeforeCreate)
 *
 * @callback Container~beforeCreateListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeCreate}.
 * @param {Object} props The `props` argument received by {@link Mapper#beforeCreate}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeCreate}.
 * @see Container#event:beforeCreate
 * @see Container#create
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#create}. See
 * {@link Container~afterCreateListener} for how to listen for this event.
 *
 * @event Container#afterCreate
 * @see Container~afterCreateListener
 * @see Container#create
 */
/**
 * Callback signature for the {@link Container#event:afterCreate} event.
 *
 * @example
 * function onAfterCreate (mapperName, props, opts, result) {
 *   // do something
 * }
 * store.on('afterCreate', onAfterCreate)
 *
 * @callback Container~afterCreateListener
 * @param {string} name The `name` argument received by {@link Mapper#afterCreate}.
 * @param {Object} props The `props` argument received by {@link Mapper#afterCreate}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterCreate}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterCreate}.
 * @see Container#event:afterCreate
 * @see Container#create
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#create}.
 *
 * @example
 * // Create and save a new blog post
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.create('post', {
 *   title: 'Modeling your data',
 *   status: 'draft'
 * }).then((post) => {
 *   console.log(post) // { id: 1234, status: 'draft', ... }
 * })
 *
 * @fires Container#beforeCreate
 * @fires Container#afterCreate
 * @method Container#create
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} props See {@link Mapper#create}.
 * @param {Object} [opts] See {@link Mapper#create}.
 * @returns {Promise} See {@link Mapper#create}.
 * @see Mapper#create
 * @since 3.0.0
 */
'create',

/**
 * Fired during {@link Container#createMany}. See
 * {@link Container~beforeCreateManyListener} for how to listen for this event.
 *
 * @event Container#beforeCreateMany
 * @see Container~beforeCreateManyListener
 * @see Container#createMany
 */
/**
 * Callback signature for the {@link Container#event:beforeCreateMany} event.
 *
 * @example
 * function onBeforeCreateMany (mapperName, records, opts) {
 *   // do something
 * }
 * store.on('beforeCreateMany', onBeforeCreateMany)
 *
 * @callback Container~beforeCreateManyListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeCreateMany}.
 * @param {Object} records The `records` argument received by {@link Mapper#beforeCreateMany}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeCreateMany}.
 * @see Container#event:beforeCreateMany
 * @see Container#createMany
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#createMany}. See
 * {@link Container~afterCreateManyListener} for how to listen for this event.
 *
 * @event Container#afterCreateMany
 * @see Container~afterCreateManyListener
 * @see Container#createMany
 */
/**
 * Callback signature for the {@link Container#event:afterCreateMany} event.
 *
 * @example
 * function onAfterCreateMany (mapperName, records, opts, result) {
 *   // do something
 * }
 * store.on('afterCreateMany', onAfterCreateMany)
 *
 * @callback Container~afterCreateManyListener
 * @param {string} name The `name` argument received by {@link Mapper#afterCreateMany}.
 * @param {Object} records The `records` argument received by {@link Mapper#afterCreateMany}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterCreateMany}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterCreateMany}.
 * @see Container#event:afterCreateMany
 * @see Container#createMany
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#createMany}.
 *
 * @example
 * // Create and save several new blog posts
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.createMany('post', [{
 *   title: 'Modeling your data',
 *   status: 'draft'
 * }, {
 *   title: 'Reading data',
 *   status: 'draft'
 * }]).then((posts) => {
 *   console.log(posts[0]) // { id: 1234, status: 'draft', ... }
 *   console.log(posts[1]) // { id: 1235, status: 'draft', ... }
 * })
 *
 * @fires Container#beforeCreateMany
 * @fires Container#afterCreateMany
 * @method Container#createMany
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Record[]} records See {@link Mapper#createMany}.
 * @param {Object} [opts] See {@link Mapper#createMany}.
 * @returns {Promise} See {@link Mapper#createMany}.
 * @see Mapper#createMany
 * @since 3.0.0
 */
'createMany',

/**
 * Wrapper for {@link Mapper#createRecord}.
 *
 * __Note:__ This method does __not__ interact with any adapter, and does
 * __not__ save any data. It only creates new objects in memory.
 *
 * @example
 * // Create empty unsaved record instance
 * import {Container} from 'js-data'
 * const store = new Container()
 * store.defineMapper('post')
 * const post = PostMapper.createRecord()
 *
 * @method Container#createRecord
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object|Object[]} props See {@link Mapper#createRecord}.
 * @param {Object} [opts] See {@link Mapper#createRecord}.
 * @returns {Promise} See {@link Mapper#createRecord}.
 * @see Mapper#createRecord
 * @since 3.0.0
 */
'createRecord',

/**
 * Fired during {@link Container#destroy}. See
 * {@link Container~beforeDestroyListener} for how to listen for this event.
 *
 * @event Container#beforeDestroy
 * @see Container~beforeDestroyListener
 * @see Container#destroy
 */
/**
 * Callback signature for the {@link Container#event:beforeDestroy} event.
 *
 * @example
 * function onBeforeDestroy (mapperName, id, opts) {
 *   // do something
 * }
 * store.on('beforeDestroy', onBeforeDestroy)
 *
 * @callback Container~beforeDestroyListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeDestroy}.
 * @param {string|number} id The `id` argument received by {@link Mapper#beforeDestroy}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeDestroy}.
 * @see Container#event:beforeDestroy
 * @see Container#destroy
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#destroy}. See
 * {@link Container~afterDestroyListener} for how to listen for this event.
 *
 * @event Container#afterDestroy
 * @see Container~afterDestroyListener
 * @see Container#destroy
 */
/**
 * Callback signature for the {@link Container#event:afterDestroy} event.
 *
 * @example
 * function onAfterDestroy (mapperName, id, opts, result) {
 *   // do something
 * }
 * store.on('afterDestroy', onAfterDestroy)
 *
 * @callback Container~afterDestroyListener
 * @param {string} name The `name` argument received by {@link Mapper#afterDestroy}.
 * @param {string|number} id The `id` argument received by {@link Mapper#afterDestroy}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterDestroy}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterDestroy}.
 * @see Container#event:afterDestroy
 * @see Container#destroy
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#destroy}.
 *
 * @example
 * // Destroy a specific blog post
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.destroy('post', 1234).then(() => {
 *   // Blog post #1234 has been destroyed
 * })
 *
 * @fires Container#beforeDestroy
 * @fires Container#afterDestroy
 * @method Container#destroy
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Mapper#destroy}.
 * @param {Object} [opts] See {@link Mapper#destroy}.
 * @returns {Promise} See {@link Mapper#destroy}.
 * @see Mapper#destroy
 * @since 3.0.0
 */
'destroy',

/**
 * Fired during {@link Container#destroyAll}. See
 * {@link Container~beforeDestroyAllListener} for how to listen for this event.
 *
 * @event Container#beforeDestroyAll
 * @see Container~beforeDestroyAllListener
 * @see Container#destroyAll
 */
/**
 * Callback signature for the {@link Container#event:beforeDestroyAll} event.
 *
 * @example
 * function onBeforeDestroyAll (mapperName, query, opts) {
 *   // do something
 * }
 * store.on('beforeDestroyAll', onBeforeDestroyAll)
 *
 * @callback Container~beforeDestroyAllListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeDestroyAll}.
 * @param {Object} query The `query` argument received by {@link Mapper#beforeDestroyAll}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeDestroyAll}.
 * @see Container#event:beforeDestroyAll
 * @see Container#destroyAll
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#destroyAll}. See
 * {@link Container~afterDestroyAllListener} for how to listen for this event.
 *
 * @event Container#afterDestroyAll
 * @see Container~afterDestroyAllListener
 * @see Container#destroyAll
 */
/**
 * Callback signature for the {@link Container#event:afterDestroyAll} event.
 *
 * @example
 * function onAfterDestroyAll (mapperName, query, opts, result) {
 *   // do something
 * }
 * store.on('afterDestroyAll', onAfterDestroyAll)
 *
 * @callback Container~afterDestroyAllListener
 * @param {string} name The `name` argument received by {@link Mapper#afterDestroyAll}.
 * @param {Object} query The `query` argument received by {@link Mapper#afterDestroyAll}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterDestroyAll}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterDestroyAll}.
 * @see Container#event:afterDestroyAll
 * @see Container#destroyAll
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#destroyAll}.
 *
 * @example
 * // Destroy all "draft" blog posts
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.destroyAll('post', { status: 'draft' }).then(() => {
 *   // All "draft" blog posts have been destroyed
 * })
 *
 * @fires Container#beforeDestroyAll
 * @fires Container#afterDestroyAll
 * @method Container#destroyAll
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} [query] See {@link Mapper#destroyAll}.
 * @param {Object} [opts] See {@link Mapper#destroyAll}.
 * @returns {Promise} See {@link Mapper#destroyAll}.
 * @see Mapper#destroyAll
 * @since 3.0.0
 */
'destroyAll',

/**
 * Fired during {@link Container#find}. See
 * {@link Container~beforeFindListener} for how to listen for this event.
 *
 * @event Container#beforeFind
 * @see Container~beforeFindListener
 * @see Container#find
 */
/**
 * Callback signature for the {@link Container#event:beforeFind} event.
 *
 * @example
 * function onBeforeFind (mapperName, id, opts) {
 *   // do something
 * }
 * store.on('beforeFind', onBeforeFind)
 *
 * @callback Container~beforeFindListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeFind}.
 * @param {string|number} id The `id` argument received by {@link Mapper#beforeFind}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeFind}.
 * @see Container#event:beforeFind
 * @see Container#find
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#find}. See
 * {@link Container~afterFindListener} for how to listen for this event.
 *
 * @event Container#afterFind
 * @see Container~afterFindListener
 * @see Container#find
 */
/**
 * Callback signature for the {@link Container#event:afterFind} event.
 *
 * @example
 * function onAfterFind (mapperName, id, opts, result) {
 *   // do something
 * }
 * store.on('afterFind', onAfterFind)
 *
 * @callback Container~afterFindListener
 * @param {string} name The `name` argument received by {@link Mapper#afterFind}.
 * @param {string|number} id The `id` argument received by {@link Mapper#afterFind}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterFind}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterFind}.
 * @see Container#event:afterFind
 * @see Container#find
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#find}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.find('post', 1).then((post) => {
 *   console.log(post) // { id: 1, ...}
 * })
 *
 * @fires Container#beforeFind
 * @fires Container#afterFind
 * @method Container#find
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Mapper#find}.
 * @param {Object} [opts] See {@link Mapper#find}.
 * @returns {Promise} See {@link Mapper#find}.
 * @see Mapper#find
 * @since 3.0.0
 */
'find',

/**
 * Fired during {@link Container#findAll}. See
 * {@link Container~beforeFindAllListener} for how to listen for this event.
 *
 * @event Container#beforeFindAll
 * @see Container~beforeFindAllListener
 * @see Container#findAll
 */
/**
 * Callback signature for the {@link Container#event:beforeFindAll} event.
 *
 * @example
 * function onBeforeFindAll (mapperName, query, opts) {
 *   // do something
 * }
 * store.on('beforeFindAll', onBeforeFindAll)
 *
 * @callback Container~beforeFindAllListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeFindAll}.
 * @param {Object} query The `query` argument received by {@link Mapper#beforeFindAll}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeFindAll}.
 * @see Container#event:beforeFindAll
 * @see Container#findAll
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#findAll}. See
 * {@link Container~afterFindAllListener} for how to listen for this event.
 *
 * @event Container#afterFindAll
 * @see Container~afterFindAllListener
 * @see Container#findAll
 */
/**
 * Callback signature for the {@link Container#event:afterFindAll} event.
 *
 * @example
 * function onAfterFindAll (mapperName, query, opts, result) {
 *   // do something
 * }
 * store.on('afterFindAll', onAfterFindAll)
 *
 * @callback Container~afterFindAllListener
 * @param {string} name The `name` argument received by {@link Mapper#afterFindAll}.
 * @param {Object} query The `query` argument received by {@link Mapper#afterFindAll}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterFindAll}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterFindAll}.
 * @see Container#event:afterFindAll
 * @see Container#findAll
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#createRecord}.
 *
 * @example
 * // Find all "published" blog posts
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.findAll('post', { status: 'published' }).then((posts) => {
 *   console.log(posts) // [{ id: 1, ...}, ...]
 * })
 *
 * @fires Container#beforeFindAll
 * @fires Container#afterFindAll
 * @method Container#findAll
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} [query] See {@link Mapper#findAll}.
 * @param {Object} [opts] See {@link Mapper#findAll}.
 * @returns {Promise} See {@link Mapper#findAll}.
 * @see Mapper#findAll
 * @since 3.0.0
 */
'findAll',

/**
 * Wrapper for {@link Mapper#getSchema}.
 *
 * @method Container#getSchema
 * @param {string} name Name of the {@link Mapper} to target.
 * @returns {Schema} See {@link Mapper#getSchema}.
 * @see Mapper#getSchema
 * @since 3.0.0
 */
'getSchema',

/**
 * Wrapper for {@link Mapper#is}.
 *
 * @example
 * import {Container} from 'js-data'
 * const store = new Container()
 * store.defineMapper('post')
 * const post = store.createRecord()
 *
 * console.log(store.is('post', post)) // true
 * // Equivalent to what's above
 * console.log(post instanceof store.getMapper('post').recordClass) // true
 *
 * @method Container#is
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object|Record} record See {@link Mapper#is}.
 * @returns {boolean} See {@link Mapper#is}.
 * @see Mapper#is
 * @since 3.0.0
 */
'is',

/**
 * Wrapper for {@link Mapper#sum}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('purchase_order')
 *
 * store.sum('purchase_order', 'amount', { status: 'paid' }).then((amountPaid) => {
 *   console.log(amountPaid) // e.g. 451125.34
 * })
 *
 * @method Container#sum
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {string} field See {@link Mapper#sum}.
 * @param {Object} [query] See {@link Mapper#sum}.
 * @param {Object} [opts] See {@link Mapper#sum}.
 * @returns {Promise} See {@link Mapper#sum}.
 * @see Mapper#sum
 * @since 3.0.0
 */
'sum',

/**
 * Wrapper for {@link Mapper#toJSON}.
 *
 * @example
 * import { Container } from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('person', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' },
 *       id: { type: 'string' }
 *     }
 *   }
 * })
 * const person = store.createRecord('person', { id: 1, name: 'John', foo: 'bar' })
 * // "foo" is stripped by toJSON()
 * console.log(store.toJSON('person', person)) // {"id":1,"name":"John"}
 *
 * store.defineMapper('personRelaxed', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' },
 *       id: { type: 'string' }
 *     },
 *     additionalProperties: true
 *   }
 * })
 * const person2 = store.createRecord('personRelaxed', { id: 1, name: 'John', foo: 'bar' })
 * // "foo" is not stripped by toJSON
 * console.log(store.toJSON('personRelaxed', person2)) // {"id":1,"name":"John","foo":"bar"}
 *
 * @method Container#toJSON
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Record|Record[]} records See {@link Mapper#toJSON}.
 * @param {Object} [opts] See {@link Mapper#toJSON}.
 * @returns {Object|Object[]} See {@link Mapper#toJSON}.
 * @see Mapper#toJSON
 * @since 3.0.0
 */
'toJSON',

/**
 * Fired during {@link Container#update}. See
 * {@link Container~beforeUpdateListener} for how to listen for this event.
 *
 * @event Container#beforeUpdate
 * @see Container~beforeUpdateListener
 * @see Container#update
 */
/**
 * Callback signature for the {@link Container#event:beforeUpdate} event.
 *
 * @example
 * function onBeforeUpdate (mapperName, id, props, opts) {
 *   // do something
 * }
 * store.on('beforeUpdate', onBeforeUpdate)
 *
 * @callback Container~beforeUpdateListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeUpdate}.
 * @param {string|number} id The `id` argument received by {@link Mapper#beforeUpdate}.
 * @param {Object} props The `props` argument received by {@link Mapper#beforeUpdate}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdate}.
 * @see Container#event:beforeUpdate
 * @see Container#update
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#update}. See
 * {@link Container~afterUpdateListener} for how to listen for this event.
 *
 * @event Container#afterUpdate
 * @see Container~afterUpdateListener
 * @see Container#update
 */
/**
 * Callback signature for the {@link Container#event:afterUpdate} event.
 *
 * @example
 * function onAfterUpdate (mapperName, id, props, opts, result) {
 *   // do something
 * }
 * store.on('afterUpdate', onAfterUpdate)
 *
 * @callback Container~afterUpdateListener
 * @param {string} name The `name` argument received by {@link Mapper#afterUpdate}.
 * @param {string|number} id The `id` argument received by {@link Mapper#afterUpdate}.
 * @param {Object} props The `props` argument received by {@link Mapper#afterUpdate}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdate}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterUpdate}.
 * @see Container#event:afterUpdate
 * @see Container#update
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#update}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.update('post', 1234, {
 *   status: 'published',
 *   published_at: new Date()
 * }).then((post) => {
 *   console.log(post) // { id: 1234, status: 'published', ... }
 * })
 *
 * @fires Container#beforeUpdate
 * @fires Container#afterUpdate
 * @method Container#update
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Mapper#update}.
 * @param {Object} record See {@link Mapper#update}.
 * @param {Object} [opts] See {@link Mapper#update}.
 * @returns {Promise} See {@link Mapper#update}.
 * @see Mapper#update
 * @since 3.0.0
 * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
 */
'update',

/**
 * Fired during {@link Container#updateAll}. See
 * {@link Container~beforeUpdateAllListener} for how to listen for this event.
 *
 * @event Container#beforeUpdateAll
 * @see Container~beforeUpdateAllListener
 * @see Container#updateAll
 */
/**
 * Callback signature for the {@link Container#event:beforeUpdateAll} event.
 *
 * @example
 * function onBeforeUpdateAll (mapperName, props, query, opts) {
 *   // do something
 * }
 * store.on('beforeUpdateAll', onBeforeUpdateAll)
 *
 * @callback Container~beforeUpdateAllListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeUpdateAll}.
 * @param {Object} props The `props` argument received by {@link Mapper#beforeUpdateAll}.
 * @param {Object} query The `query` argument received by {@link Mapper#beforeUpdateAll}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdateAll}.
 * @see Container#event:beforeUpdateAll
 * @see Container#updateAll
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#updateAll}. See
 * {@link Container~afterUpdateAllListener} for how to listen for this event.
 *
 * @event Container#afterUpdateAll
 * @see Container~afterUpdateAllListener
 * @see Container#updateAll
 */
/**
 * Callback signature for the {@link Container#event:afterUpdateAll} event.
 *
 * @example
 * function onAfterUpdateAll (mapperName, props, query, opts, result) {
 *   // do something
 * }
 * store.on('afterUpdateAll', onAfterUpdateAll)
 *
 * @callback Container~afterUpdateAllListener
 * @param {string} name The `name` argument received by {@link Mapper#afterUpdateAll}.
 * @param {Object} props The `props` argument received by {@link Mapper#afterUpdateAll}.
 * @param {Object} query The `query` argument received by {@link Mapper#afterUpdateAll}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdateAll}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterUpdateAll}.
 * @see Container#event:afterUpdateAll
 * @see Container#updateAll
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#updateAll}.
 *
 * @example
 * // Turn all of John's blog posts into drafts.
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * const update = { status: draft: published_at: null }
 * const query = { userId: 1234 }
 * store.updateAll('post', update, query).then((posts) => {
 *   console.log(posts) // [...]
 * })
 *
 * @fires Container#beforeUpdateAll
 * @fires Container#afterUpdateAll
 * @method Container#updateAll
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} update See {@link Mapper#updateAll}.
 * @param {Object} [query] See {@link Mapper#updateAll}.
 * @param {Object} [opts] See {@link Mapper#updateAll}.
 * @returns {Promise} See {@link Mapper#updateAll}.
 * @see Mapper#updateAll
 * @since 3.0.0
 */
'updateAll',

/**
 * Fired during {@link Container#updateMany}. See
 * {@link Container~beforeUpdateManyListener} for how to listen for this event.
 *
 * @event Container#beforeUpdateMany
 * @see Container~beforeUpdateManyListener
 * @see Container#updateMany
 */
/**
 * Callback signature for the {@link Container#event:beforeUpdateMany} event.
 *
 * @example
 * function onBeforeUpdateMany (mapperName, records, opts) {
 *   // do something
 * }
 * store.on('beforeUpdateMany', onBeforeUpdateMany)
 *
 * @callback Container~beforeUpdateManyListener
 * @param {string} name The `name` argument received by {@link Mapper#beforeUpdateMany}.
 * @param {Object} records The `records` argument received by {@link Mapper#beforeUpdateMany}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdateMany}.
 * @see Container#event:beforeUpdateMany
 * @see Container#updateMany
 * @since 3.0.0
 */
/**
 * Fired during {@link Container#updateMany}. See
 * {@link Container~afterUpdateManyListener} for how to listen for this event.
 *
 * @event Container#afterUpdateMany
 * @see Container~afterUpdateManyListener
 * @see Container#updateMany
 */
/**
 * Callback signature for the {@link Container#event:afterUpdateMany} event.
 *
 * @example
 * function onAfterUpdateMany (mapperName, records, opts, result) {
 *   // do something
 * }
 * store.on('afterUpdateMany', onAfterUpdateMany)
 *
 * @callback Container~afterUpdateManyListener
 * @param {string} name The `name` argument received by {@link Mapper#afterUpdateMany}.
 * @param {Object} records The `records` argument received by {@link Mapper#afterUpdateMany}.
 * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdateMany}.
 * @param {Object} result The `result` argument received by {@link Mapper#afterUpdateMany}.
 * @see Container#event:afterUpdateMany
 * @see Container#updateMany
 * @since 3.0.0
 */
/**
 * Wrapper for {@link Mapper#updateMany}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.updateMany('post', [
 *   { id: 1234, status: 'draft' },
 *   { id: 2468, status: 'published', published_at: new Date() }
 * ]).then((posts) => {
 *   console.log(posts) // [...]
 * })
 *
 * @fires Container#beforeUpdateMany
 * @fires Container#afterUpdateMany
 * @method Container#updateMany
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(Object[]|Record[])} records See {@link Mapper#updateMany}.
 * @param {Object} [opts] See {@link Mapper#updateMany}.
 * @returns {Promise} See {@link Mapper#updateMany}.
 * @see Mapper#updateMany
 * @since 3.0.0
 */
'updateMany',

/**
 * Wrapper for {@link Mapper#validate}.
 *
 * @example
 * import {Container} from 'js-data'
 * const store = new Container()
 * store.defineMapper('post', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' },
 *       id: { type: 'string' }
 *     }
 *   }
 * })
 * let errors = store.validate('post', { name: 'John' })
 * console.log(errors) // undefined
 * errors = store.validate('post', { name: 123 })
 * console.log(errors) // [{ expected: 'one of (string)', actual: 'number', path: 'name' }]
 *
 * @method Container#validate
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(Object[]|Record[])} records See {@link Mapper#validate}.
 * @param {Object} [opts] See {@link Mapper#validate}.
 * @returns {Promise} See {@link Mapper#validate}.
 * @see Mapper#validate
 * @since 3.0.0
 */
'validate'];

/**
 * The `Container` class is a place to define and store {@link Mapper} instances.
 *
 * `Container` makes it easy to manage your Mappers. Without a container, you
 * need to manage Mappers yourself, including resolving circular dependencies
 * among relations. All Mappers in a container share the same adapters, so you
 * don't have to register adapters for every single Mapper.
 *
 * @example <caption>Container#constructor</caption>
 * // import {Container} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Container} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new Container()
 *
 * @class Container
 * @extends Component
 * @param {Object} [opts] Configuration options.
 * @param {boolean} [opts.debug=false] See {@link Component#debug}.
 * @param {Constructor} [opts.mapperClass] See {@link Container#mapperClass}.
 * @param {Object} [opts.mapperDefaults] See {@link Container#mapperDefaults}.
 * @since 3.0.0
 */
function Container(opts) {
  utils.classCallCheck(this, Container);
  Component$1.call(this);
  opts || (opts = {});

  Object.defineProperties(this, {
    /**
     * The adapters registered with this Container, which are also shared by all
     * Mappers in this Container.
     *
     * @name Container#_adapters
     * @see Container#registerAdapter
     * @since 3.0.0
     * @type {Object}
     */
    _adapters: {
      value: {}
    },

    /**
     * The the mappers in this container
     *
     * @name Container#_mappers
     * @see Mapper
     * @since 3.0.0
     * @type {Object}
     */
    _mappers: {
      value: {}
    },

    /**
     * Constructor function to use in {@link Container#defineMapper} to create new
     * {@link Mapper} instances. {@link Container#mapperClass} should extend
     * {@link Mapper}. By default {@link Mapper} is used to instantiate Mappers.
     *
     * @example <caption>Container#mapperClass</caption>
     * // import {Container, Mapper} from 'js-data'
     * const JSData = require('js-data@3.0.0-rc.4')
     * const {Container} = JSData
     * console.log('Using JSData v' + JSData.version.full)
     *
     * class MyMapperClass extends Mapper {
     *   foo () { return 'bar' }
     * }
     * const store = new Container({
     *   mapperClass: MyMapperClass
     * })
     * store.defineMapper('user')
     * console.log(store.getMapper('user').foo())
     *
     * @name Container#mapperClass
     * @see Mapper
     * @since 3.0.0
     * @type {Constructor}
     */
    mapperClass: {
      value: undefined,
      writable: true
    }
  });

  // Apply options provided by the user
  utils.fillIn(this, opts);

  /**
   * Defaults options to pass to {@link Container#mapperClass} when creating a
   * new {@link Mapper}.
   *
   * @example <caption>Container#mapperDefaults</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container({
   *   mapperDefaults: {
   *     idAttribute: '_id'
   *   }
   * })
   * store.defineMapper('user')
   * console.log(store.getMapper('user').idAttribute)
   *
   * @default {}
   * @name Container#mapperDefaults
   * @since 3.0.0
   * @type {Object}
   */
  this.mapperDefaults = this.mapperDefaults || {};

  // Use the Mapper class if the user didn't provide a mapperClass
  this.mapperClass || (this.mapperClass = Mapper$1);
}

var props = {
  constructor: Container,

  /**
   * Register a new event listener on this Container.
   *
   * Proxy for {@link Component#on}. If an event was emitted by a {@link Mapper}
   * in the Container, then the name of the {@link Mapper} will be prepended to
   * the arugments passed to the listener.
   *
   * @example <caption>Container#on</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container()
   * store.on('foo', function (...args) { console.log(args.join(':')) })
   * store.defineMapper('user')
   * store.emit('foo', 'arg1', 'arg2')
   * store.getMapper('user').emit('foo', 'arg1', 'arg2')
   *
   * @method Container#on
   * @param {string} event Name of event to subsribe to.
   * @param {Function} listener Listener function to handle the event.
   * @param {*} [ctx] Optional content in which to invoke the listener.
   * @since 3.0.0
   */

  /**
   * Used to bind to events emitted by mappers in this container.
   *
   * @method Container#_onMapperEvent
   * @param {string} name Name of the mapper that emitted the event.
   * @param {...*} [args] Args See {@link Mapper#emit}.
   * @private
   * @since 3.0.0
   */
  _onMapperEvent: function _onMapperEvent(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var type = args.shift();
    this.emit.apply(this, [type, name].concat(args));
  },


  /**
   * Return a container scoped to a particular mapper.
   *
   * @example <caption>Container#as</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container()
   * const UserMapper = store.defineMapper('user')
   * const UserStore = store.as('user')
   *
   * const user1 = store.createRecord('user', { name: 'John' })
   * const user2 = UserStore.createRecord({ name: 'John' })
   * const user3 = UserMapper.createRecord({ name: 'John' })
   * console.log(user1 === user2)
   * console.log(user2 === user3)
   * console.log(user1 === user3)
   *
   * @method Container#as
   * @param {string} name Name of the {@link Mapper}.
   * @returns {Object} A container scoped to a particular mapper.
   * @since 3.0.0
   */
  as: function as(name) {
    var props = {};
    var original = this;
    proxiedMapperMethods.forEach(function (method) {
      props[method] = {
        writable: true,
        value: function value() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return original[method].apply(original, [name].concat(args));
        }
      };
    });
    props.getMapper = {
      writable: true,
      value: function value() {
        return original.getMapper(name);
      }
    };
    return Object.create(this, props);
  },


  /**
   * Create a new mapper and register it in this container.
   *
   * @example <caption>Container#defineMapper</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container({
   *   mapperDefaults: { foo: 'bar' }
   * })
   * // Container#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = store.defineMapper('user')
   * console.log(UserMapper === store.getMapper('user'))
   * console.log(UserMapper === store.as('user').getMapper())
   * console.log(UserMapper.foo)
   *
   * @method Container#defineMapper
   * @param {string} name Name under which to register the new {@link Mapper}.
   * {@link Mapper#name} will be set to this value.
   * @param {Object} [opts] Configuration options. Passed to
   * {@link Container#mapperClass} when creating the new {@link Mapper}.
   * @returns {Mapper} The newly created instance of {@link Mapper}.
   * @see Container#as
   * @since 3.0.0
   */
  defineMapper: function defineMapper(name, opts) {
    var _this = this;

    // For backwards compatibility with defineResource
    if (utils.isObject(name)) {
      opts = name;
      name = opts.name;
    }
    if (!utils.isString(name)) {
      throw utils.err(DOMAIN$5 + '#defineMapper', 'name')(400, 'string', name);
    }

    // Default values for arguments
    opts || (opts = {});
    // Set Mapper#name
    opts.name = name;
    opts.relations || (opts.relations = {});

    // Check if the user is overriding the datastore's default mapperClass
    var mapperClass = opts.mapperClass || this.mapperClass;
    delete opts.mapperClass;

    // Apply the datastore's defaults to the options going into the mapper
    utils.fillIn(opts, this.mapperDefaults);

    // Instantiate a mapper
    var mapper = this._mappers[name] = new mapperClass(opts); // eslint-disable-line
    mapper.relations || (mapper.relations = {});
    // Make sure the mapper's name is set
    mapper.name = name;
    // All mappers in this datastore will share adapters
    mapper._adapters = this.getAdapters();

    mapper.datastore = this;

    mapper.on('all', function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this._onMapperEvent.apply(_this, [name].concat(args));
    });
    mapper.defineRelations();

    return mapper;
  },
  defineResource: function defineResource(name, opts) {
    console.warn('DEPRECATED: defineResource is deprecated, use defineMapper instead');
    return this.defineMapper(name, opts);
  },


  /**
   * Return the registered adapter with the given name or the default adapter if
   * no name is provided.
   *
   * @method Container#getAdapter
   * @param {string} [name] The name of the adapter to retrieve.
   * @returns {Adapter} The adapter.
   * @since 3.0.0
   */
  getAdapter: function getAdapter(name) {
    var adapter = this.getAdapterName(name);
    if (!adapter) {
      throw utils.err(DOMAIN$5 + '#getAdapter', 'name')(400, 'string', name);
    }
    return this.getAdapters()[adapter];
  },


  /**
   * Return the name of a registered adapter based on the given name or options,
   * or the name of the default adapter if no name provided.
   *
   * @method Container#getAdapterName
   * @param {(Object|string)} [opts] The name of an adapter or options, if any.
   * @returns {string} The name of the adapter.
   * @since 3.0.0
   */
  getAdapterName: function getAdapterName(opts) {
    opts || (opts = {});
    if (utils.isString(opts)) {
      opts = { adapter: opts };
    }
    return opts.adapter || this.mapperDefaults.defaultAdapter;
  },


  /**
   * Return the registered adapters of this container.
   *
   * @method Container#getAdapters
   * @returns {Adapter}
   * @since 3.0.0
   */
  getAdapters: function getAdapters() {
    return this._adapters;
  },


  /**
   * Return the mapper registered under the specified name.
   *
   * @example <caption>Container#getMapper</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container()
   * // Container#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = store.defineMapper('user')
   * console.log(UserMapper === store.getMapper('user'))
   * console.log(UserMapper === store.as('user').getMapper())
   * store.getMapper('profile') // throws Error, there is no mapper with name "profile"
   *
   * @method Container#getMapper
   * @param {string} name {@link Mapper#name}.
   * @returns {Mapper}
   * @since 3.0.0
   */
  getMapper: function getMapper(name) {
    var mapper = this.getMapperByName(name);
    if (!mapper) {
      throw utils.err(DOMAIN$5 + '#getMapper', name)(404, 'mapper');
    }
    return mapper;
  },


  /**
   * Return the mapper registered under the specified name.
   * Doesn't throw error if mapper doesn't exist.
   *
   * @example <caption>Container#getMapperByName</caption>
   * // import {Container} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {Container} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new Container()
   * // Container#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = store.defineMapper('user')
   * console.log(UserMapper === store.getMapper('user'))
   * console.log(UserMapper === store.as('user').getMapper())
   * console.log(store.getMapper('profile')) // Does NOT throw an error
   *
   * @method Container#getMapperByName
   * @param {string} name {@link Mapper#name}.
   * @returns {Mapper}
   * @since 3.0.0
   */
  getMapperByName: function getMapperByName(name) {
    return this._mappers[name];
  },


  /**
   * Register an adapter on this container under the given name. Adapters
   * registered on a container are shared by all mappers in the container.
   *
   * @example
   * import {Container} from 'js-data'
   * import {RethinkDBAdapter} from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   *
   * @method Container#registerAdapter
   * @param {string} name The name of the adapter to register.
   * @param {Adapter} adapter The adapter to register.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.default=false] Whether to make the adapter the
   * default adapter for all Mappers in this container.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  registerAdapter: function registerAdapter(name, adapter, opts) {
    opts || (opts = {});
    this.getAdapters()[name] = adapter;
    // Optionally make it the default adapter for the target.
    if (opts === true || opts.default) {
      this.mapperDefaults.defaultAdapter = name;
      utils.forOwn(this._mappers, function (mapper) {
        mapper.defaultAdapter = name;
      });
    }
  }
};

proxiedMapperMethods.forEach(function (method) {
  props[method] = function (name) {
    var _getMapper;

    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return (_getMapper = this.getMapper(name))[method].apply(_getMapper, args);
  };
});

Component$1.extend(props);

/**
 * Create a subclass of this Container:
 * @example <caption>Container.extend</caption>
 * // Normally you would do: import {Container} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {Container} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomContainerClass extends Container {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customContainer = new CustomContainerClass()
 * console.log(customContainer.foo())
 * console.log(CustomContainerClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherContainerClass = Container.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherContainer = new OtherContainerClass()
 * console.log(otherContainer.foo())
 * console.log(OtherContainerClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherContainerClass () {
 *   Container.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Container.extend({
 *   constructor: AnotherContainerClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherContainer = new AnotherContainerClass()
 * console.log(anotherContainer.created_at)
 * console.log(anotherContainer.foo())
 * console.log(AnotherContainerClass.beep())
 *
 * @method Container.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Container class.
 * @since 3.0.0
 */

var DOMAIN$8 = 'SimpleStore';
var proxiedCollectionMethods = [
/**
 * Wrapper for {@link Collection#add}.
 *
 * @example <caption>SimpleStore#add</caption>
 * // Normally you would do: import {SimpleStore} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {SimpleStore} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new SimpleStore()
 * store.defineMapper('book')
 *
 * // Add one book to the in-memory store:
 * store.add('book', { id: 1, title: 'Respect your Data' })
 * // Add multiple books to the in-memory store:
 * store.add('book', [
 *   { id: 2, title: 'Easy data recipes' },
 *   { id: 3, title: 'Active Record 101' }
 * ])
 *
 * @fires SimpleStore#add
 * @method SimpleStore#add
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {(Object|Object[]|Record|Record[])} data See {@link Collection#add}.
 * @param {Object} [opts] Configuration options. See {@link Collection#add}.
 * @returns {(Object|Object[]|Record|Record[])} See {@link Collection#add}.
 * @see Collection#add
 * @see Collection#add
 * @since 3.0.0
 */
'add',

/**
 * Wrapper for {@link Collection#between}.
 *
 * @example
 * // Get all users ages 18 to 30
 * const users = store.between('user', 18, 30, { index: 'age' })
 *
 * @example
 * // Same as above
 * const users = store.between('user', [18], [30], { index: 'age' })
 *
 * @method SimpleStore#between
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {Array} leftKeys See {@link Collection#between}.
 * @param {Array} rightKeys See {@link Collection#between}.
 * @param {Object} [opts] Configuration options. See {@link Collection#between}.
 * @returns {Object[]|Record[]} See {@link Collection#between}.
 * @see Collection#between
 * @see Collection#between
 * @since 3.0.0
 */
'between',

/**
 * Wrapper for {@link Collection#createIndex}.
 *
 * @example
 * // Index users by age
 * store.createIndex('user', 'age')
 *
 * @example
 * // Index users by status and role
 * store.createIndex('user', 'statusAndRole', ['status', 'role'])
 *
 * @method SimpleStore#createIndex
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {string} name See {@link Collection#createIndex}.
 * @param {string[]} [fieldList] See {@link Collection#createIndex}.
 * @see Collection#createIndex
 * @see Collection#createIndex
 * @since 3.0.0
 */
'createIndex',

/**
 * Wrapper for {@link Collection#filter}.
 *
 * @example <caption>SimpleStore#filter</caption>
 * // import {SimpleStore} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {SimpleStore} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new SimpleStore()
 * store.defineMapper('post')
 * store.add('post', [
 *   { id: 1, status: 'draft', created_at_timestamp: new Date().getTime() }
 * ])
 *
 * // Get the draft posts created less than three months ago
 * let posts = store.filter('post', {
 *   where: {
 *     status: {
 *       '==': 'draft'
 *     },
 *     created_at_timestamp: {
 *       '>=': (new Date().getTime() - (1000 \* 60 \* 60 \* 24 \* 30 \* 3)) // 3 months ago
 *     }
 *   }
 * })
 * console.log(posts)
 *
 * // Use a custom filter function
 * posts = store.filter('post', function (post) { return post.id % 2 === 0 })
 *
 * @method SimpleStore#filter
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {(Object|Function)} [queryOrFn={}] See {@link Collection#filter}.
 * @param {Object} [thisArg] See {@link Collection#filter}.
 * @returns {Array} See {@link Collection#filter}.
 * @see Collection#filter
 * @see Collection#filter
 * @since 3.0.0
 */
'filter',

/**
 * Wrapper for {@link Collection#get}.
 *
 * @example <caption>SimpleStore#get</caption>
 * // import {SimpleStore} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {SimpleStore} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * const store = new SimpleStore()
 * store.defineMapper('post')
 * store.add('post', [
 *   { id: 1, status: 'draft', created_at_timestamp: new Date().getTime() }
 * ])
 *
 * console.log(store.get('post', 1)) // {...}
 * console.log(store.get('post', 2)) // undefined
 *
 * @method SimpleStore#get
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Collection#get}.
 * @returns {(Object|Record)} See {@link Collection#get}.
 * @see Collection#get
 * @see Collection#get
 * @since 3.0.0
 */
'get',

/**
 * Wrapper for {@link Collection#getAll}.
 *
 * @example
 * // Get the posts where "status" is "draft" or "inReview"
 * const posts = store.getAll('post', 'draft', 'inReview', { index: 'status' })
 *
 * @example
 * // Same as above
 * const posts = store.getAll('post', ['draft'], ['inReview'], { index: 'status' })
 *
 * @method SimpleStore#getAll
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {...Array} [keyList] See {@link Collection#getAll}.
 * @param {Object} [opts] See {@link Collection#getAll}.
 * @returns {Array} See {@link Collection#getAll}.
 * @see Collection#getAll
 * @see Collection#getAll
 * @since 3.0.0
 */
'getAll',

/**
 * Wrapper for {@link Collection#prune}.
 *
 * @method SimpleStore#prune
 * @param {Object} [opts] See {@link Collection#prune}.
 * @returns {Array} See {@link Collection#prune}.
 * @see Collection#prune
 * @see Collection#prune
 * @since 3.0.0
 */
'prune',

/**
 * Wrapper for {@link Collection#query}.
 *
 * @example
 * // Grab page 2 of users between ages 18 and 30
 * store.query('user')
 *   .between(18, 30, { index: 'age' }) // between ages 18 and 30
 *   .skip(10) // second page
 *   .limit(10) // page size
 *   .run()
 *
 * @method SimpleStore#query
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @returns {Query} See {@link Collection#query}.
 * @see Collection#query
 * @see Collection#query
 * @since 3.0.0
 */
'query',

/**
 * Wrapper for {@link Collection#toJSON}.
 *
 * @example
 * store.defineMapper('post', {
 *   schema: {
 *     properties: {
 *       id: { type: 'number' },
 *       title: { type: 'string' }
 *     }
 *   }
 * })
 * store.add('post', [
 *   { id: 1, status: 'published', title: 'Respect your Data' },
 *   { id: 2, status: 'draft', title: 'Connecting to a data source' }
 * ])
 * console.log(store.toJSON('post'))
 * const draftsJSON = store.query('post')
 *   .filter({ status: 'draft' })
 *   .mapCall('toJSON')
 *   .run()
 *
 * @method SimpleStore#toJSON
 * @param {(string|number)} name Name of the {@link Mapper} to target.
 * @param {Object} [opts] See {@link Collection#toJSON}.
 * @returns {Array} See {@link Collection#toJSON}.
 * @see Collection#toJSON
 * @see Collection#toJSON
 * @since 3.0.0
 */
'toJSON',

/**
 * Wrapper for {@link Collection#unsaved}.
 *
 * @method SimpleStore#unsaved
 * @returns {Array} See {@link Collection#unsaved}.
 * @see Collection#unsaved
 * @see Collection#unsaved
 * @since 3.0.0
 */
'unsaved'];
var ownMethodsForScoping = ['addToCache', 'cachedFind', 'cachedFindAll', 'cacheFind', 'cacheFindAll', 'hashQuery'];

var cachedFn = function cachedFn(name, hashOrId, opts) {
  var cached = this._completedQueries[name][hashOrId];
  if (utils.isFunction(cached)) {
    return cached(name, hashOrId, opts);
  }
  return cached;
};

var SIMPLESTORE_DEFAULTS = {
  /**
   * Whether to use the pending query if a `find` request for the specified
   * record is currently underway. Can be set to `true`, `false`, or to a
   * function that returns `true` or `false`.
   *
   * @default true
   * @name SimpleStore#usePendingFind
   * @since 3.0.0
   * @type {boolean|Function}
   */
  usePendingFind: true,

  /**
   * Whether to use the pending query if a `findAll` request for the given query
   * is currently underway. Can be set to `true`, `false`, or to a function that
   * returns `true` or `false`.
   *
   * @default true
   * @name SimpleStore#usePendingFindAll
   * @since 3.0.0
   * @type {boolean|Function}
   */
  usePendingFindAll: true

  /**
   * The `SimpleStore` class is an extension of {@link Container}. Not only does
   * `SimpleStore` manage mappers, but also collections. `SimpleStore` implements the
   * asynchronous {@link Mapper} methods, such as {@link Mapper#find} and
   * {@link Mapper#create}. If you use the asynchronous `SimpleStore` methods
   * instead of calling them directly on the mappers, then the results of the
   * method calls will be inserted into the store's collections. You can think of
   * a `SimpleStore` as an [Identity Map](https://en.wikipedia.org/wiki/Identity_map_pattern)
   * for the [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)
   * (the Mappers).
   *
   * ```javascript
   * import {SimpleStore} from 'js-data'
   * ```
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import HttpAdapter from 'js-data-http'
   * const store = new SimpleStore()
   *
   * // SimpleStore#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = store.defineMapper('user')
   *
   * // SimpleStore#as returns the store scoped to a particular Mapper.
   * const UserStore = store.as('user')
   *
   * // Call "find" on "UserMapper" (Stateless ORM)
   * UserMapper.find(1).then((user) => {
   *   // retrieved a "user" record via the http adapter, but that's it
   *
   *   // Call "find" on "store" targeting "user" (Stateful SimpleStore)
   *   return store.find('user', 1) // same as "UserStore.find(1)"
   * }).then((user) => {
   *   // not only was a "user" record retrieved, but it was added to the
   *   // store's "user" collection
   *   const cachedUser = store.getCollection('user').get(1)
   *   console.log(user === cachedUser) // true
   * })
   *
   * @class SimpleStore
   * @extends Container
   * @param {Object} [opts] Configuration options. See {@link Container}.
   * @param {boolean} [opts.collectionClass={@link Collection}] See {@link SimpleStore#collectionClass}.
   * @param {boolean} [opts.debug=false] See {@link Component#debug}.
   * @param {boolean|Function} [opts.usePendingFind=true] See {@link SimpleStore#usePendingFind}.
   * @param {boolean|Function} [opts.usePendingFindAll=true] See {@link SimpleStore#usePendingFindAll}.
   * @returns {SimpleStore}
   * @see Container
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#SimpleStore","Components of JSData: SimpleStore"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/working-with-the-SimpleStore","Working with the SimpleStore"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/jsdata-and-the-browser","Notes on using JSData in the Browser"]
   */
};function SimpleStore(opts) {
  utils.classCallCheck(this, SimpleStore);

  opts || (opts = {});
  // Fill in any missing options with the defaults
  utils.fillIn(opts, SIMPLESTORE_DEFAULTS);
  Container.call(this, opts);

  this.collectionClass = this.collectionClass || Collection$1;
  this._collections = {};
  this._pendingQueries = {};
  this._completedQueries = {};
}

var props$2 = {
  constructor: SimpleStore,

  /**
   * Internal method used to handle Mapper responses.
   *
   * @method SimpleStore#_end
   * @private
   * @param {string} name Name of the {@link Collection} to which to
   * add the data.
   * @param {Object} result The result from a Mapper.
   * @param {Object} [opts] Configuration options.
   * @returns {(Object|Array)} Result.
   */
  _end: function _end(name, result, opts) {
    var data = opts.raw ? result.data : result;
    if (data && utils.isFunction(this.addToCache)) {
      data = this.addToCache(name, data, opts);
      if (opts.raw) {
        result.data = data;
      } else {
        result = data;
      }
    }
    return result;
  },


  /**
   * Register a new event listener on this SimpleStore.
   *
   * Proxy for {@link Container#on}. If an event was emitted by a Mapper or
   * Collection in the SimpleStore, then the name of the Mapper or Collection will
   * be prepended to the arugments passed to the provided event handler.
   *
   * @example
   * // Listen for all "afterCreate" events in a SimpleStore
   * store.on('afterCreate', (mapperName, props, opts, result) => {
   *   console.log(mapperName) // "post"
   *   console.log(props.id) // undefined
   *   console.log(result.id) // 1234
   * })
   * store.create('post', { title: 'Modeling your data' }).then((post) => {
   *   console.log(post.id) // 1234
   * })
   *
   * @example
   * // Listen for the "add" event on a collection
   * store.on('add', (mapperName, records) => {
   *   console.log(records) // [...]
   * })
   *
   * @example
   * // Listen for "change" events on a record
   * store.on('change', (mapperName, record, changes) => {
   *   console.log(changes) // { changed: { title: 'Modeling your data' } }
   * })
   * post.title = 'Modeling your data'
   *
   * @method SimpleStore#on
   * @param {string} event Name of event to subsribe to.
   * @param {Function} listener Listener function to handle the event.
   * @param {*} [ctx] Optional content in which to invoke the listener.
   */

  /**
   * Used to bind to events emitted by collections in this store.
   *
   * @method SimpleStore#_onCollectionEvent
   * @private
   * @param {string} name Name of the collection that emitted the event.
   * @param {...*} [args] Args passed to {@link Collection#emit}.
   */
  _onCollectionEvent: function _onCollectionEvent(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var type = args.shift();
    this.emit.apply(this, [type, name].concat(args));
  },


  /**
   * This method takes the data received from {@link SimpleStore#find},
   * {@link SimpleStore#findAll}, {@link SimpleStore#update}, etc., and adds the
   * data to the store. _You don't need to call this method directly._
   *
   * If you're using the http adapter and your response data is in an unexpected
   * format, you may need to override this method so the right data gets added
   * to the store.
   *
   * @example
   * const store = new SimpleStore({
   *   addToCache (mapperName, data, opts) {
   *     // Let's say for a particular Resource, response data is in a weird format
   *     if (name === 'comment') {
   *       // Re-assign the variable to add the correct records into the stores
   *       data = data.items
   *     }
   *     // Now perform default behavior
   *     return SimpleStore.prototype.addToCache.call(this, mapperName, data, opts)
   *   }
   * })
   *
   * @example
   * // Extend using ES2015 class syntax.
   * class MyStore extends SimpleStore {
   *   addToCache (mapperName, data, opts) {
   *     // Let's say for a particular Resource, response data is in a weird format
   *     if (name === 'comment') {
   *       // Re-assign the variable to add the correct records into the stores
   *       data = data.items
   *     }
   *     // Now perform default behavior
   *     return super.addToCache(mapperName, data, opts)
   *   }
   * }
   * const store = new MyStore()
   *
   * @method SimpleStore#addToCache
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {*} data Data from which data should be selected for add.
   * @param {Object} [opts] Configuration options.
   */
  addToCache: function addToCache(name, data, opts) {
    return this.getCollection(name).add(data, opts);
  },


  /**
   * Return the store scoped to a particular mapper/collection pair.
   *
   * @example <caption>SimpleStore.as</caption>
   * // Normally you would do: import {SimpleStore} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {SimpleStore} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new SimpleStore()
   * const UserMapper = store.defineMapper('user')
   * const UserStore = store.as('user')
   *
   * const user1 = store.createRecord('user', { name: 'John' })
   * const user2 = UserStore.createRecord({ name: 'John' })
   * const user3 = UserMapper.createRecord({ name: 'John' })
   * console.log(user1 === user2)
   * console.log(user2 === user3)
   * console.log(user1 === user3)
   *
   * @method SimpleStore#as
   * @param {string} name Name of the {@link Mapper}.
   * @returns {Object} The store, scoped to a particular Mapper/Collection pair.
   * @since 3.0.0
   */
  as: function as(name) {
    var props = {};
    var original = this;
    var methods = ownMethodsForScoping.concat(proxiedMapperMethods).concat(proxiedCollectionMethods);

    methods.forEach(function (method) {
      props[method] = {
        writable: true,
        value: function value() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return original[method].apply(original, [name].concat(args));
        }
      };
    });
    props.getMapper = {
      writable: true,
      value: function value() {
        return original.getMapper(name);
      }
    };
    props.getCollection = {
      writable: true,
      value: function value() {
        return original.getCollection(name);
      }
    };
    return Object.create(this, props);
  },


  /**
   * Retrieve a cached `find` result, if any. This method is called during
   * {@link SimpleStore#find} to determine if {@link Mapper#find} needs to be
   * called. If this method returns `undefined` then {@link Mapper#find} will
   * be called. Otherwise {@link SimpleStore#find} will immediately resolve with
   * the return value of this method.
   *
   * When using {@link SimpleStore} in the browser, you can override this method
   * to implement your own cache-busting strategy.
   *
   * @example
   * const store = new SimpleStore({
   *   cachedFind (mapperName, id, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return undefined to trigger a Mapper#find call
   *       return
   *     }
   *     // Otherwise perform default behavior
   *     return SimpleStore.prototype.cachedFind.call(this, mapperName, id, opts)
   *   }
   * })
   *
   * @example
   * // Extend using ES2015 class syntax.
   * class MyStore extends SimpleStore {
   *   cachedFind (mapperName, id, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return undefined to trigger a Mapper#find call
   *       return
   *     }
   *     // Otherwise perform default behavior
   *     return super.cachedFind(mapperName, id, opts)
   *   }
   * }
   * const store = new MyStore()
   *
   * @method SimpleStore#cachedFind
   * @param {string} name The `name` argument passed to {@link SimpleStore#find}.
   * @param {(string|number)} id The `id` argument passed to {@link SimpleStore#find}.
   * @param {Object} opts The `opts` argument passed to {@link SimpleStore#find}.
   * @since 3.0.0
   */
  cachedFind: cachedFn,

  /**
   * Retrieve a cached `findAll` result, if any. This method is called during
   * {@link SimpleStore#findAll} to determine if {@link Mapper#findAll} needs to be
   * called. If this method returns `undefined` then {@link Mapper#findAll} will
   * be called. Otherwise {@link SimpleStore#findAll} will immediately resolve with
   * the return value of this method.
   *
   * When using {@link SimpleStore} in the browser, you can override this method
   * to implement your own cache-busting strategy.
   *
   * @example
   * const store = new SimpleStore({
   *   cachedFindAll (mapperName, hash, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return undefined to trigger a Mapper#findAll call
   *       return undefined
   *     }
   *     // Otherwise perform default behavior
   *     return SimpleStore.prototype.cachedFindAll.call(this, mapperName, hash, opts)
   *   }
   * })
   *
   * @example
   * // Extend using ES2015 class syntax.
   * class MyStore extends SimpleStore {
   *   cachedFindAll (mapperName, hash, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return undefined to trigger a Mapper#findAll call
   *       return undefined
   *     }
   *     // Otherwise perform default behavior
   *     return super.cachedFindAll(mapperName, hash, opts)
   *   }
   * }
   * const store = new MyStore()
   *
   * @method SimpleStore#cachedFindAll
   * @param {string} name The `name` argument passed to {@link SimpleStore#findAll}.
   * @param {string} hash The result of calling {@link SimpleStore#hashQuery} on
   * the `query` argument passed to {@link SimpleStore#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link SimpleStore#findAll}.
   * @since 3.0.0
   */
  cachedFindAll: cachedFn,

  /**
   * Mark a {@link Mapper#find} result as cached by adding an entry to
   * {@link SimpleStore#_completedQueries}. By default, once a `find` entry is
   * added it means subsequent calls to the same Resource with the same `id`
   * argument will immediately resolve with the result of calling
   * {@link SimpleStore#get} instead of delegating to {@link Mapper#find}.
   *
   * As part of implementing your own caching strategy, you may choose to
   * override this method.
   *
   * @example
   * const store = new SimpleStore({
   *   cacheFind (mapperName, data, id, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return without saving an entry to SimpleStore#_completedQueries
   *       return
   *     }
   *     // Otherwise perform default behavior
   *     return SimpleStore.prototype.cacheFind.call(this, mapperName, data, id, opts)
   *   }
   * })
   *
   * @example
   * // Extend using ES2015 class syntax.
   * class MyStore extends SimpleStore {
   *   cacheFind (mapperName, data, id, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return without saving an entry to SimpleStore#_completedQueries
   *       return
   *     }
   *     // Otherwise perform default behavior
   *     return super.cacheFind(mapperName, data, id, opts)
   *   }
   * }
   * const store = new MyStore()
   *
   * @method SimpleStore#cacheFind
   * @param {string} name The `name` argument passed to {@link SimpleStore#find}.
   * @param {*} data The result to cache.
   * @param {(string|number)} id The `id` argument passed to {@link SimpleStore#find}.
   * @param {Object} opts The `opts` argument passed to {@link SimpleStore#find}.
   * @since 3.0.0
   */
  cacheFind: function cacheFind(name, data, id, opts) {
    var _this = this;

    this._completedQueries[name][id] = function (name, id, opts) {
      return _this.get(name, id);
    };
  },


  /**
   * Mark a {@link Mapper#findAll} result as cached by adding an entry to
   * {@link SimpleStore#_completedQueries}. By default, once a `findAll` entry is
   * added it means subsequent calls to the same Resource with the same `query`
   * argument will immediately resolve with the result of calling
   * {@link SimpleStore#filter} instead of delegating to {@link Mapper#findAll}.
   *
   * As part of implementing your own caching strategy, you may choose to
   * override this method.
   *
   * @example
   * const store = new SimpleStore({
   *   cachedFindAll (mapperName, data, hash, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return without saving an entry to SimpleStore#_completedQueries
   *       return
   *     }
   *     // Otherwise perform default behavior.
   *     return SimpleStore.prototype.cachedFindAll.call(this, mapperName, data, hash, opts)
   *   }
   * })
   *
   * @example
   * // Extend using ES2015 class syntax.
   * class MyStore extends SimpleStore {
   *   cachedFindAll (mapperName, data, hash, opts) {
   *     // Let's say for a particular Resource, we always want to pull fresh from the server
   *     if (mapperName === 'schedule') {
   *       // Return without saving an entry to SimpleStore#_completedQueries
   *       return
   *     }
   *     // Otherwise perform default behavior.
   *     return super.cachedFindAll(mapperName, data, hash, opts)
   *   }
   * }
   * const store = new MyStore()
   *
   * @method SimpleStore#cacheFindAll
   * @param {string} name The `name` argument passed to {@link SimpleStore#findAll}.
   * @param {*} data The result to cache.
   * @param {string} hash The result of calling {@link SimpleStore#hashQuery} on
   * the `query` argument passed to {@link SimpleStore#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link SimpleStore#findAll}.
   * @since 3.0.0
   */
  cacheFindAll: function cacheFindAll(name, data, hash, opts) {
    var _this2 = this;

    this._completedQueries[name][hash] = function (name, hash, opts) {
      return _this2.filter(name, utils.fromJson(hash));
    };
  },


  /**
   * Remove __all__ records from the in-memory store and reset
   * {@link SimpleStore#_completedQueries}.
   *
   * @method SimpleStore#clear
   * @returns {Object} Object containing all records that were in the store.
   * @see SimpleStore#remove
   * @see SimpleStore#removeAll
   * @since 3.0.0
   */
  clear: function clear() {
    var _this3 = this;

    var removed = {};
    utils.forOwn(this._collections, function (collection, name) {
      removed[name] = collection.removeAll();
      _this3._completedQueries[name] = {};
    });
    return removed;
  },


  /**
   * Fired during {@link SimpleStore#create}. See
   * {@link SimpleStore~beforeCreateListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeCreate
   * @see SimpleStore~beforeCreateListener
   * @see SimpleStore#create
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeCreate} event.
   *
   * @example
   * function onBeforeCreate (mapperName, props, opts) {
   *   // do something
   * }
   * store.on('beforeCreate', onBeforeCreate)
   *
   * @callback SimpleStore~beforeCreateListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeCreate}.
   * @param {Object} props The `props` argument received by {@link Mapper#beforeCreate}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeCreate}.
   * @see SimpleStore#event:beforeCreate
   * @see SimpleStore#create
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#create}. See
   * {@link SimpleStore~afterCreateListener} for how to listen for this event.
   *
   * @event SimpleStore#afterCreate
   * @see SimpleStore~afterCreateListener
   * @see SimpleStore#create
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterCreate} event.
   *
   * @example
   * function onAfterCreate (mapperName, props, opts, result) {
   *   // do something
   * }
   * store.on('afterCreate', onAfterCreate)
   *
   * @callback SimpleStore~afterCreateListener
   * @param {string} name The `name` argument received by {@link Mapper#afterCreate}.
   * @param {Object} props The `props` argument received by {@link Mapper#afterCreate}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterCreate}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterCreate}.
   * @see SimpleStore#event:afterCreate
   * @see SimpleStore#create
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#create}. Adds the created record to the store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('book')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   POST /book {"author_id":1234,...}
   * store.create('book', {
   *   author_id: 1234,
   *   edition: 'First Edition',
   *   title: 'Respect your Data'
   * }).then((book) => {
   *   console.log(book.id) // 120392
   *   console.log(book.title) // "Respect your Data"
   * })
   *
   * @fires SimpleStore#beforeCreate
   * @fires SimpleStore#afterCreate
   * @fires SimpleStore#add
   * @method SimpleStore#create
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} record Passed to {@link Mapper#create}.
   * @param {Object} [opts] Passed to {@link Mapper#create}. See
   * {@link Mapper#create} for more configuration options.
   * @returns {Promise} Resolves with the result of the create.
   * @since 3.0.0
   */
  create: function create(name, record, opts) {
    var _this4 = this;

    opts || (opts = {});
    return Container.prototype.create.call(this, name, record, opts).then(function (result) {
      return _this4._end(name, result, opts);
    });
  },


  /**
   * Fired during {@link SimpleStore#createMany}. See
   * {@link SimpleStore~beforeCreateManyListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeCreateMany
   * @see SimpleStore~beforeCreateManyListener
   * @see SimpleStore#createMany
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeCreateMany} event.
   *
   * @example
   * function onBeforeCreateMany (mapperName, records, opts) {
   *   // do something
   * }
   * store.on('beforeCreateMany', onBeforeCreateMany)
   *
   * @callback SimpleStore~beforeCreateManyListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeCreateMany}.
   * @param {Object} records The `records` argument received by {@link Mapper#beforeCreateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeCreateMany}.
   * @see SimpleStore#event:beforeCreateMany
   * @see SimpleStore#createMany
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#createMany}. See
   * {@link SimpleStore~afterCreateManyListener} for how to listen for this event.
   *
   * @event SimpleStore#afterCreateMany
   * @see SimpleStore~afterCreateManyListener
   * @see SimpleStore#createMany
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterCreateMany} event.
   *
   * @example
   * function onAfterCreateMany (mapperName, records, opts, result) {
   *   // do something
   * }
   * store.on('afterCreateMany', onAfterCreateMany)
   *
   * @callback SimpleStore~afterCreateManyListener
   * @param {string} name The `name` argument received by {@link Mapper#afterCreateMany}.
   * @param {Object} records The `records` argument received by {@link Mapper#afterCreateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterCreateMany}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterCreateMany}.
   * @see SimpleStore#event:afterCreateMany
   * @see SimpleStore#createMany
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#createMany}. Adds the created records to the
   * store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('book')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   POST /book [{"author_id":1234,...},{...}]
   * store.createMany('book', [{
   *   author_id: 1234,
   *   edition: 'First Edition',
   *   title: 'Respect your Data'
   * }, {
   *   author_id: 1234,
   *   edition: 'Second Edition',
   *   title: 'Respect your Data'
   * }]).then((books) => {
   *   console.log(books[0].id) // 142394
   *   console.log(books[0].title) // "Respect your Data"
   * })
   *
   * @fires SimpleStore#beforeCreateMany
   * @fires SimpleStore#afterCreateMany
   * @fires SimpleStore#add
   * @method SimpleStore#createMany
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Array} records Passed to {@link Mapper#createMany}.
   * @param {Object} [opts] Passed to {@link Mapper#createMany}. See
   * {@link Mapper#createMany} for more configuration options.
   * @returns {Promise} Resolves with the result of the create.
   * @since 3.0.0
   */
  createMany: function createMany(name, records, opts) {
    var _this5 = this;

    opts || (opts = {});
    return Container.prototype.createMany.call(this, name, records, opts).then(function (result) {
      return _this5._end(name, result, opts);
    });
  },
  defineMapper: function defineMapper(name, opts) {
    var self = this;
    var mapper = Container.prototype.defineMapper.call(self, name, opts);
    self._pendingQueries[name] = {};
    self._completedQueries[name] = {};
    mapper.relationList || Object.defineProperty(mapper, 'relationList', { value: [] });

    var collectionOpts = {
      // Make sure the collection has somewhere to store "added" timestamps
      _added: {},
      // Give the collection a reference to this SimpleStore
      datastore: self,
      // The mapper tied to the collection
      mapper: mapper
    };

    if (opts && 'onConflict' in opts) {
      collectionOpts.onConflict = opts.onConflict;
    }

    // The SimpleStore uses a subclass of Collection that is "SimpleStore-aware"
    var collection = self._collections[name] = new self.collectionClass(null, collectionOpts); // eslint-disable-line

    var schema = mapper.schema || {};
    var properties = schema.properties || {};
    // TODO: Make it possible index nested properties?
    utils.forOwn(properties, function (opts, prop) {
      if (opts.indexed) {
        collection.createIndex(prop);
      }
    });

    // Create a secondary index on the "added" timestamps of records in the
    // collection
    collection.createIndex('addedTimestamps', ['$'], {
      fieldGetter: function fieldGetter(obj) {
        return collection._added[collection.recordId(obj)];
      }
    });

    collection.on('all', function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      self._onCollectionEvent.apply(self, [name].concat(args));
    });

    return mapper;
  },


  /**
   * Fired during {@link SimpleStore#destroy}. See
   * {@link SimpleStore~beforeDestroyListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeDestroy
   * @see SimpleStore~beforeDestroyListener
   * @see SimpleStore#destroy
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeDestroy} event.
   *
   * @example
   * function onBeforeDestroy (mapperName, id, opts) {
   *   // do something
   * }
   * store.on('beforeDestroy', onBeforeDestroy)
   *
   * @callback SimpleStore~beforeDestroyListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeDestroy}.
   * @param {string|number} id The `id` argument received by {@link Mapper#beforeDestroy}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeDestroy}.
   * @see SimpleStore#event:beforeDestroy
   * @see SimpleStore#destroy
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#destroy}. See
   * {@link SimpleStore~afterDestroyListener} for how to listen for this event.
   *
   * @event SimpleStore#afterDestroy
   * @see SimpleStore~afterDestroyListener
   * @see SimpleStore#destroy
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterDestroy} event.
   *
   * @example
   * function onAfterDestroy (mapperName, id, opts, result) {
   *   // do something
   * }
   * store.on('afterDestroy', onAfterDestroy)
   *
   * @callback SimpleStore~afterDestroyListener
   * @param {string} name The `name` argument received by {@link Mapper#afterDestroy}.
   * @param {string|number} id The `id` argument received by {@link Mapper#afterDestroy}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterDestroy}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterDestroy}.
   * @see SimpleStore#event:afterDestroy
   * @see SimpleStore#destroy
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#destroy}. Removes any destroyed record from the
   * in-memory store. Clears out any {@link SimpleStore#_completedQueries} entries
   * associated with the provided `id`.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('book')
   *
   * store.add('book', { id: 1234, title: 'Data Management is Hard' })
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   DELETE /book/1234
   * store.destroy('book', 1234).then(() => {
   *   // The book record is no longer in the in-memory store
   *   console.log(store.get('book', 1234)) // undefined
   *
   *   return store.find('book', 1234)
   * }).then((book) {
   *   // The book was deleted from the database too
   *   console.log(book) // undefined
   * })
   *
   * @fires SimpleStore#beforeDestroy
   * @fires SimpleStore#afterDestroy
   * @fires SimpleStore#remove
   * @method SimpleStore#destroy
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id Passed to {@link Mapper#destroy}.
   * @param {Object} [opts] Passed to {@link Mapper#destroy}. See
   * {@link Mapper#destroy} for more configuration options.
   * @returns {Promise} Resolves when the destroy operation completes.
   * @since 3.0.0
   */
  destroy: function destroy(name, id, opts) {
    var _this6 = this;

    opts || (opts = {});
    return Container.prototype.destroy.call(this, name, id, opts).then(function (result) {
      var record = _this6.getCollection(name).remove(id, opts);

      if (opts.raw) {
        result.data = record;
      } else {
        result = record;
      }
      delete _this6._pendingQueries[name][id];
      delete _this6._completedQueries[name][id];
      return result;
    });
  },


  /**
   * Fired during {@link SimpleStore#destroyAll}. See
   * {@link SimpleStore~beforeDestroyAllListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeDestroyAll
   * @see SimpleStore~beforeDestroyAllListener
   * @see SimpleStore#destroyAll
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeDestroyAll} event.
   *
   * @example
   * function onBeforeDestroyAll (mapperName, query, opts) {
   *   // do something
   * }
   * store.on('beforeDestroyAll', onBeforeDestroyAll)
   *
   * @callback SimpleStore~beforeDestroyAllListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeDestroyAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#beforeDestroyAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeDestroyAll}.
   * @see SimpleStore#event:beforeDestroyAll
   * @see SimpleStore#destroyAll
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#destroyAll}. See
   * {@link SimpleStore~afterDestroyAllListener} for how to listen for this event.
   *
   * @event SimpleStore#afterDestroyAll
   * @see SimpleStore~afterDestroyAllListener
   * @see SimpleStore#destroyAll
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterDestroyAll} event.
   *
   * @example
   * function onAfterDestroyAll (mapperName, query, opts, result) {
   *   // do something
   * }
   * store.on('afterDestroyAll', onAfterDestroyAll)
   *
   * @callback SimpleStore~afterDestroyAllListener
   * @param {string} name The `name` argument received by {@link Mapper#afterDestroyAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#afterDestroyAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterDestroyAll}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterDestroyAll}.
   * @see SimpleStore#event:afterDestroyAll
   * @see SimpleStore#destroyAll
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#destroyAll}. Removes any destroyed records from
   * the in-memory store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('book')
   *
   * store.add('book', { id: 1234, title: 'Data Management is Hard' })
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   DELETE /book/1234
   * store.destroy('book', 1234).then(() => {
   *   // The book record is gone from the in-memory store
   *   console.log(store.get('book', 1234)) // undefined
   *   return store.find('book', 1234)
   * }).then((book) {
   *   // The book was deleted from the database too
   *   console.log(book) // undefined
   * })
   *
   * @fires SimpleStore#beforeDestroyAll
   * @fires SimpleStore#afterDestroyAll
   * @fires SimpleStore#remove
   * @method SimpleStore#destroyAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] Passed to {@link Mapper#destroyAll}.
   * @param {Object} [opts] Passed to {@link Mapper#destroyAll}. See
   * {@link Mapper#destroyAll} for more configuration options.
   * @returns {Promise} Resolves when the delete completes.
   * @since 3.0.0
   */
  destroyAll: function destroyAll(name, query, opts) {
    var _this7 = this;

    opts || (opts = {});
    return Container.prototype.destroyAll.call(this, name, query, opts).then(function (result) {
      var records = _this7.getCollection(name).removeAll(query, opts);

      if (opts.raw) {
        result.data = records;
      } else {
        result = records;
      }
      var hash = _this7.hashQuery(name, query, opts);
      delete _this7._pendingQueries[name][hash];
      delete _this7._completedQueries[name][hash];
      return result;
    });
  },
  eject: function eject(name, id, opts) {
    console.warn('DEPRECATED: "eject" is deprecated, use "remove" instead');
    return this.remove(name, id, opts);
  },
  ejectAll: function ejectAll(name, query, opts) {
    console.warn('DEPRECATED: "ejectAll" is deprecated, use "removeAll" instead');
    return this.removeAll(name, query, opts);
  },


  /**
   * Fired during {@link SimpleStore#find}. See
   * {@link SimpleStore~beforeFindListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeFind
   * @see SimpleStore~beforeFindListener
   * @see SimpleStore#find
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeFind} event.
   *
   * @example
   * function onBeforeFind (mapperName, id, opts) {
   *   // do something
   * }
   * store.on('beforeFind', onBeforeFind)
   *
   * @callback SimpleStore~beforeFindListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeFind}.
   * @param {string|number} id The `id` argument received by {@link Mapper#beforeFind}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeFind}.
   * @see SimpleStore#event:beforeFind
   * @see SimpleStore#find
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#find}. See
   * {@link SimpleStore~afterFindListener} for how to listen for this event.
   *
   * @event SimpleStore#afterFind
   * @see SimpleStore~afterFindListener
   * @see SimpleStore#find
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterFind} event.
   *
   * @example
   * function onAfterFind (mapperName, id, opts, result) {
   *   // do something
   * }
   * store.on('afterFind', onAfterFind)
   *
   * @callback SimpleStore~afterFindListener
   * @param {string} name The `name` argument received by {@link Mapper#afterFind}.
   * @param {string|number} id The `id` argument received by {@link Mapper#afterFind}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterFind}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterFind}.
   * @see SimpleStore#event:afterFind
   * @see SimpleStore#find
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#find}. Adds any found record to the store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('book')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   GET /book/1234
   * store.find('book', 1234).then((book) => {
   *   // The book record is now in the in-memory store
   *   console.log(store.get('book', 1234) === book) // true
   * })
   *
   * @fires SimpleStore#beforeFind
   * @fires SimpleStore#afterFind
   * @fires SimpleStore#add
   * @method SimpleStore#find
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id Passed to {@link Mapper#find}.
   * @param {Object} [opts] Passed to {@link Mapper#find}.
   * @param {boolean} [opts.force] Bypass cacheFind
   * @param {boolean|Function} [opts.usePendingFind] See {@link SimpleStore#usePendingFind}
   * @returns {Promise} Resolves with the result, if any.
   * @since 3.0.0
   */
  find: function find(name, id, opts) {
    var _this8 = this;

    opts || (opts = {});
    var mapper = this.getMapper(name);
    var pendingQuery = this._pendingQueries[name][id];
    var usePendingFind = opts.usePendingFind === undefined ? this.usePendingFind : opts.usePendingFind;
    utils._(opts, mapper);

    if (pendingQuery && (utils.isFunction(usePendingFind) ? usePendingFind.call(this, name, id, opts) : usePendingFind)) {
      return pendingQuery;
    }
    var item = this.cachedFind(name, id, opts);

    if (opts.force || !item) {
      var promise = this._pendingQueries[name][id] = Container.prototype.find.call(this, name, id, opts);
      return promise.then(function (result) {
        delete _this8._pendingQueries[name][id];
        result = _this8._end(name, result, opts);
        _this8.cacheFind(name, result, id, opts);
        return result;
      }, function (err) {
        delete _this8._pendingQueries[name][id];
        return utils.reject(err);
      });
    }

    return utils.resolve(item);
  },


  /**
   * Fired during {@link SimpleStore#findAll}. See
   * {@link SimpleStore~beforeFindAllListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeFindAll
   * @see SimpleStore~beforeFindAllListener
   * @see SimpleStore#findAll
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeFindAll} event.
   *
   * @example
   * function onBeforeFindAll (mapperName, query, opts) {
   *   // do something
   * }
   * store.on('beforeFindAll', onBeforeFindAll)
   *
   * @callback SimpleStore~beforeFindAllListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeFindAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#beforeFindAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeFindAll}.
   * @see SimpleStore#event:beforeFindAll
   * @see SimpleStore#findAll
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#findAll}. See
   * {@link SimpleStore~afterFindAllListener} for how to listen for this event.
   *
   * @event SimpleStore#afterFindAll
   * @see SimpleStore~afterFindAllListener
   * @see SimpleStore#findAll
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterFindAll} event.
   *
   * @example
   * function onAfterFindAll (mapperName, query, opts, result) {
   *   // do something
   * }
   * store.on('afterFindAll', onAfterFindAll)
   *
   * @callback SimpleStore~afterFindAllListener
   * @param {string} name The `name` argument received by {@link Mapper#afterFindAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#afterFindAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterFindAll}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterFindAll}.
   * @see SimpleStore#event:afterFindAll
   * @see SimpleStore#findAll
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#findAll}. Adds any found records to the store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('movie')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   GET /movie?rating=PG
   * store.find('movie', { rating: 'PG' }).then((movies) => {
   *   // The movie records are now in the in-memory store
   *   console.log(store.filter('movie'))
   * })
   *
   * @fires SimpleStore#beforeFindAll
   * @fires SimpleStore#afterFindAll
   * @fires SimpleStore#add
   * @method SimpleStore#findAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] Passed to {@link Mapper.findAll}.
   * @param {Object} [opts] Passed to {@link Mapper.findAll}.
   * @param {boolean} [opts.force] Bypass cacheFindAll
   * @param {boolean|Function} [opts.usePendingFindAll] See {@link SimpleStore#usePendingFindAll}
   * @returns {Promise} Resolves with the result, if any.
   * @since 3.0.0
   */
  findAll: function findAll(name, query, opts) {
    var _this9 = this;

    opts || (opts = {});
    var mapper = this.getMapper(name);
    var hash = this.hashQuery(name, query, opts);
    var pendingQuery = this._pendingQueries[name][hash];
    var usePendingFindAll = opts.usePendingFindAll === undefined ? this.usePendingFindAll : opts.usePendingFindAll;
    utils._(opts, mapper);

    if (pendingQuery && (utils.isFunction(usePendingFindAll) ? usePendingFindAll.call(this, name, query, opts) : usePendingFindAll)) {
      return pendingQuery;
    }

    var items = this.cachedFindAll(name, hash, opts);

    if (opts.force || !items) {
      var promise = this._pendingQueries[name][hash] = Container.prototype.findAll.call(this, name, query, opts);
      return promise.then(function (result) {
        delete _this9._pendingQueries[name][hash];
        result = _this9._end(name, result, opts);
        _this9.cacheFindAll(name, result, hash, opts);
        return result;
      }, function (err) {
        delete _this9._pendingQueries[name][hash];
        return utils.reject(err);
      });
    }

    return utils.resolve(items);
  },


  /**
   * Return the {@link Collection} with the given name, if for some
   * reason you need a direct reference to the collection.
   *
   * @method SimpleStore#getCollection
   * @param {string} name Name of the {@link Collection} to retrieve.
   * @returns {Collection}
   * @since 3.0.0
   * @throws {Error} Thrown if the specified {@link Collection} does not
   * exist.
   */
  getCollection: function getCollection(name) {
    var collection = this._collections[name];
    if (!collection) {
      throw utils.err(DOMAIN$8 + '#getCollection', name)(404, 'collection');
    }
    return collection;
  },


  /**
   * Hashing function used to cache {@link SimpleStore#find} and
   * {@link SimpleStore#findAll} requests. This method simply JSONifies the
   * `query` argument passed to {@link SimpleStore#find} or
   * {@link SimpleStore#findAll}.
   *
   * Override this method for custom hashing behavior.
   * @method SimpleStore#hashQuery
   * @param {string} name The `name` argument passed to {@link SimpleStore#find}
   * or {@link SimpleStore#findAll}.
   * @param {Object} query The `query` argument passed to {@link SimpleStore#find}
   * or {@link SimpleStore#findAll}.
   * @returns {string} The JSONified `query`.
   * @since 3.0.0
   */
  hashQuery: function hashQuery(name, query, opts) {
    return utils.toJson(query || {});
  },
  inject: function inject(name, records, opts) {
    console.warn('DEPRECATED: "inject" is deprecated, use "add" instead');
    return this.add(name, records, opts);
  },


  /**
   * Wrapper for {@link Collection#remove}. Removes the specified
   * {@link Record} from the store.
   *
   * @example <caption>SimpleStore#remove</caption>
   * // Normally you would do: import {SimpleStore} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {SimpleStore} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new SimpleStore()
   * store.defineMapper('book')
   * console.log(store.getAll('book').length)
   * store.add('book', { id: 1234 })
   * console.log(store.getAll('book').length)
   * store.remove('book', 1234)
   * console.log(store.getAll('book').length)
   *
   * @fires SimpleStore#remove
   * @method SimpleStore#remove
   * @param {string} name The name of the {@link Collection} to target.
   * @param {string|number} id The primary key of the {@link Record} to remove.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Relations of the {@link Record} to also
   * remove from the store.
   * @returns {Record} The removed {@link Record}, if any.
   * @see Collection#add
   * @see Collection#add
   * @since 3.0.0
   */
  remove: function remove(name, id, opts) {
    var record = this.getCollection(name).remove(id, opts);
    if (record) {
      this.removeRelated(name, [record], opts);
    }
    return record;
  },


  /**
   * Wrapper for {@link Collection#removeAll}. Removes the selected
   * {@link Record}s from the store.
   *
   * @example <caption>SimpleStore#removeAll</caption>
   * // Normally you would do: import {SimpleStore} from 'js-data'
   * const JSData = require('js-data@3.0.0-rc.4')
   * const {SimpleStore} = JSData
   * console.log('Using JSData v' + JSData.version.full)
   *
   * const store = new SimpleStore()
   * store.defineMapper('movie')
   * console.log(store.getAll('movie').length)
   * store.add('movie', [{ id: 3, rating: 'R' }, { id: 4, rating: 'PG-13' })
   * console.log(store.getAll('movie').length)
   * store.removeAll('movie', { rating: 'R' })
   * console.log(store.getAll('movie').length)
   *
   * @fires SimpleStore#remove
   * @method SimpleStore#removeAll
   * @param {string} name The name of the {@link Collection} to target.
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Relations of the {@link Record} to also
   * remove from the store.
   * @returns {Record} The removed {@link Record}s, if any.
   * @see Collection#add
   * @see Collection#add
   * @since 3.0.0
   */
  removeAll: function removeAll(name, query, opts) {
    if (!query || !Object.keys(query).length) {
      this._completedQueries[name] = {};
    } else {
      this._completedQueries[name][this.hashQuery(name, query, opts)] = undefined;
    }
    var records = this.getCollection(name).removeAll(query, opts);
    if (records.length) {
      this.removeRelated(name, records, opts);
    }
    return records;
  },


  /**
   * Remove from the store {@link Record}s that are related to the provided
   * {@link Record}(s).
   *
   * @fires SimpleStore#remove
   * @method SimpleStore#removeRelated
   * @param {string} name The name of the {@link Collection} to target.
   * @param {Record|Record[]} records {@link Record}s whose relations are to be
   * removed.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Relations of the {@link Record}(s) to remove
   * from the store.
   * @since 3.0.0
   */
  removeRelated: function removeRelated(name, records, opts) {
    var _this10 = this;

    if (!utils.isArray(records)) {
      records = [records];
    }
    utils.forEachRelation(this.getMapper(name), opts, function (def, optsCopy) {
      records.forEach(function (record) {
        var relatedData = void 0;
        var query = void 0;
        if (def.foreignKey && (def.type === hasOneType || def.type === hasManyType)) {
          query = defineProperty({}, def.foreignKey, def.getForeignKey(record));
        } else if (def.type === hasManyType && def.localKeys) {
          query = {
            where: defineProperty({}, def.getRelation().idAttribute, {
              'in': utils.get(record, def.localKeys)
            })
          };
        } else if (def.type === hasManyType && def.foreignKeys) {
          query = {
            where: defineProperty({}, def.foreignKeys, {
              'contains': def.getForeignKey(record)
            })
          };
        } else if (def.type === belongsToType) {
          relatedData = _this10.remove(def.relation, def.getForeignKey(record), optsCopy);
        }
        if (query) {
          relatedData = _this10.removeAll(def.relation, query, optsCopy);
        }
        if (relatedData) {
          if (utils.isArray(relatedData) && !relatedData.length) {
            return;
          }
          if (def.type === hasOneType) {
            relatedData = relatedData[0];
          }
          def.setLocalField(record, relatedData);
        }
      });
    });
  },


  /**
   * Fired during {@link SimpleStore#update}. See
   * {@link SimpleStore~beforeUpdateListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeUpdate
   * @see SimpleStore~beforeUpdateListener
   * @see SimpleStore#update
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeUpdate} event.
   *
   * @example
   * function onBeforeUpdate (mapperName, id, props, opts) {
   *   // do something
   * }
   * store.on('beforeUpdate', onBeforeUpdate)
   *
   * @callback SimpleStore~beforeUpdateListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeUpdate}.
   * @param {string|number} id The `id` argument received by {@link Mapper#beforeUpdate}.
   * @param {Object} props The `props` argument received by {@link Mapper#beforeUpdate}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdate}.
   * @see SimpleStore#event:beforeUpdate
   * @see SimpleStore#update
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#update}. See
   * {@link SimpleStore~afterUpdateListener} for how to listen for this event.
   *
   * @event SimpleStore#afterUpdate
   * @see SimpleStore~afterUpdateListener
   * @see SimpleStore#update
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterUpdate} event.
   *
   * @example
   * function onAfterUpdate (mapperName, id, props, opts, result) {
   *   // do something
   * }
   * store.on('afterUpdate', onAfterUpdate)
   *
   * @callback SimpleStore~afterUpdateListener
   * @param {string} name The `name` argument received by {@link Mapper#afterUpdate}.
   * @param {string|number} id The `id` argument received by {@link Mapper#afterUpdate}.
   * @param {Object} props The `props` argument received by {@link Mapper#afterUpdate}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdate}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterUpdate}.
   * @see SimpleStore#event:afterUpdate
   * @see SimpleStore#update
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#update}. Adds the updated {@link Record} to the
   * store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('post')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   PUT /post/1234 {"status":"published"}
   * store.update('post', 1, { status: 'published' }).then((post) => {
   *   // The post record has also been updated in the in-memory store
   *   console.log(store.get('post', 1234))
   * })
   *
   * @fires SimpleStore#beforeUpdate
   * @fires SimpleStore#afterUpdate
   * @fires SimpleStore#add
   * @method SimpleStore#update
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id Passed to {@link Mapper#update}.
   * @param {Object} record Passed to {@link Mapper#update}.
   * @param {Object} [opts] Passed to {@link Mapper#update}. See
   * {@link Mapper#update} for more configuration options.
   * @returns {Promise} Resolves with the result of the update.
   * @since 3.0.0
   */
  update: function update(name, id, record, opts) {
    var _this11 = this;

    opts || (opts = {});
    return Container.prototype.update.call(this, name, id, record, opts).then(function (result) {
      return _this11._end(name, result, opts);
    });
  },


  /**
   * Fired during {@link SimpleStore#updateAll}. See
   * {@link SimpleStore~beforeUpdateAllListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeUpdateAll
   * @see SimpleStore~beforeUpdateAllListener
   * @see SimpleStore#updateAll
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeUpdateAll} event.
   *
   * @example
   * function onBeforeUpdateAll (mapperName, props, query, opts) {
   *   // do something
   * }
   * store.on('beforeUpdateAll', onBeforeUpdateAll)
   *
   * @callback SimpleStore~beforeUpdateAllListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeUpdateAll}.
   * @param {Object} props The `props` argument received by {@link Mapper#beforeUpdateAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#beforeUpdateAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdateAll}.
   * @see SimpleStore#event:beforeUpdateAll
   * @see SimpleStore#updateAll
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#updateAll}. See
   * {@link SimpleStore~afterUpdateAllListener} for how to listen for this event.
   *
   * @event SimpleStore#afterUpdateAll
   * @see SimpleStore~afterUpdateAllListener
   * @see SimpleStore#updateAll
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterUpdateAll} event.
   *
   * @example
   * function onAfterUpdateAll (mapperName, props, query, opts, result) {
   *   // do something
   * }
   * store.on('afterUpdateAll', onAfterUpdateAll)
   *
   * @callback SimpleStore~afterUpdateAllListener
   * @param {string} name The `name` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} props The `props` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} query The `query` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdateAll}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterUpdateAll}.
   * @see SimpleStore#event:afterUpdateAll
   * @see SimpleStore#updateAll
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#updateAll}. Adds the updated {@link Record}s to
   * the store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('post')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   PUT /post?author_id=1234 {"status":"published"}
   * store.updateAll('post', { author_id: 1234 }, { status: 'published' }).then((posts) => {
   *   // The post records have also been updated in the in-memory store
   *   console.log(store.filter('posts', { author_id: 1234 }))
   * })
   *
   * @fires SimpleStore#beforeUpdateAll
   * @fires SimpleStore#afterUpdateAll
   * @fires SimpleStore#add
   * @method SimpleStore#updateAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} props Passed to {@link Mapper#updateAll}.
   * @param {Object} [query] Passed to {@link Mapper#updateAll}.
   * @param {Object} [opts] Passed to {@link Mapper#updateAll}. See
   * {@link Mapper#updateAll} for more configuration options.
   * @returns {Promise} Resolves with the result of the update.
   * @since 3.0.0
   */
  updateAll: function updateAll(name, props, query, opts) {
    var _this12 = this;

    opts || (opts = {});
    return Container.prototype.updateAll.call(this, name, props, query, opts).then(function (result) {
      return _this12._end(name, result, opts);
    });
  },


  /**
   * Fired during {@link SimpleStore#updateMany}. See
   * {@link SimpleStore~beforeUpdateManyListener} for how to listen for this event.
   *
   * @event SimpleStore#beforeUpdateMany
   * @see SimpleStore~beforeUpdateManyListener
   * @see SimpleStore#updateMany
   */
  /**
   * Callback signature for the {@link SimpleStore#event:beforeUpdateMany} event.
   *
   * @example
   * function onBeforeUpdateMany (mapperName, records, opts) {
   *   // do something
   * }
   * store.on('beforeUpdateMany', onBeforeUpdateMany)
   *
   * @callback SimpleStore~beforeUpdateManyListener
   * @param {string} name The `name` argument received by {@link Mapper#beforeUpdateMany}.
   * @param {Object} records The `records` argument received by {@link Mapper#beforeUpdateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#beforeUpdateMany}.
   * @see SimpleStore#event:beforeUpdateMany
   * @see SimpleStore#updateMany
   * @since 3.0.0
   */
  /**
   * Fired during {@link SimpleStore#updateMany}. See
   * {@link SimpleStore~afterUpdateManyListener} for how to listen for this event.
   *
   * @event SimpleStore#afterUpdateMany
   * @see SimpleStore~afterUpdateManyListener
   * @see SimpleStore#updateMany
   */
  /**
   * Callback signature for the {@link SimpleStore#event:afterUpdateMany} event.
   *
   * @example
   * function onAfterUpdateMany (mapperName, records, opts, result) {
   *   // do something
   * }
   * store.on('afterUpdateMany', onAfterUpdateMany)
   *
   * @callback SimpleStore~afterUpdateManyListener
   * @param {string} name The `name` argument received by {@link Mapper#afterUpdateMany}.
   * @param {Object} records The `records` argument received by {@link Mapper#afterUpdateMany}.
   * @param {Object} opts The `opts` argument received by {@link Mapper#afterUpdateMany}.
   * @param {Object} result The `result` argument received by {@link Mapper#afterUpdateMany}.
   * @see SimpleStore#event:afterUpdateMany
   * @see SimpleStore#updateMany
   * @since 3.0.0
   */
  /**
   * Wrapper for {@link Mapper#updateMany}. Adds the updated {@link Record}s to
   * the store.
   *
   * @example
   * import {SimpleStore} from 'js-data'
   * import {HttpAdapter} from 'js-data-http'
   *
   * const store = new SimpleStore()
   * store.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * store.defineMapper('post')
   *
   * // Since this example uses the http adapter, we'll get something like:
   * //
   * //   PUT /post [{"id":3,status":"published"},{"id":4,status":"published"}]
   * store.updateMany('post', [
   *   { id: 3, status: 'published' },
   *   { id: 4, status: 'published' }
   * ]).then((posts) => {
   *   // The post records have also been updated in the in-memory store
   *   console.log(store.getAll('post', 3, 4))
   * })
   *
   * @fires SimpleStore#beforeUpdateMany
   * @fires SimpleStore#afterUpdateMany
   * @fires SimpleStore#add
   * @method SimpleStore#updateMany
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(Object[]|Record[])} records Passed to {@link Mapper#updateMany}.
   * @param {Object} [opts] Passed to {@link Mapper#updateMany}. See
   * {@link Mapper#updateMany} for more configuration options.
   * @returns {Promise} Resolves with the result of the update.
   * @since 3.0.0
   */
  updateMany: function updateMany(name, records, opts) {
    var _this13 = this;

    opts || (opts = {});
    return Container.prototype.updateMany.call(this, name, records, opts).then(function (result) {
      return _this13._end(name, result, opts);
    });
  }
};

proxiedCollectionMethods.forEach(function (method) {
  props$2[method] = function (name) {
    var _getCollection;

    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return (_getCollection = this.getCollection(name))[method].apply(_getCollection, args);
  };
});

var SimpleStore$1 = Container.extend(props$2);

/**
 * Fired when a record changes. Only works for records that have tracked fields.
 * See {@link SimpleStore~changeListener} on how to listen for this event.
 *
 * @event SimpleStore#change
 * @see SimpleStore~changeListener
 */

/**
 * Callback signature for the {@link SimpleStore#event:change} event.
 *
 * @example
 * function onChange (mapperName, record, changes) {
 *   // do something
 * }
 * store.on('change', onChange)
 *
 * @callback SimpleStore~changeListener
 * @param {string} name The name of the associated {@link Mapper}.
 * @param {Record} record The Record that changed.
 * @param {Object} changes The changes.
 * @see SimpleStore#event:change
 * @since 3.0.0
 */

/**
 * Fired when one or more records are added to the in-memory store. See
 * {@link SimpleStore~addListener} on how to listen for this event.
 *
 * @event SimpleStore#add
 * @see SimpleStore~addListener
 * @see SimpleStore#event:add
 * @see SimpleStore#add
 * @see SimpleStore#create
 * @see SimpleStore#createMany
 * @see SimpleStore#find
 * @see SimpleStore#findAll
 * @see SimpleStore#update
 * @see SimpleStore#updateAll
 * @see SimpleStore#updateMany
 */

/**
 * Callback signature for the {@link SimpleStore#event:add} event.
 *
 * @example
 * function onAdd (mapperName, recordOrRecords) {
 *   // do something
 * }
 * store.on('add', onAdd)
 *
 * @callback SimpleStore~addListener
 * @param {string} name The name of the associated {@link Mapper}.
 * @param {Record|Record[]} The Record or Records that were added.
 * @see SimpleStore#event:add
 * @see SimpleStore#add
 * @see SimpleStore#create
 * @see SimpleStore#createMany
 * @see SimpleStore#find
 * @see SimpleStore#findAll
 * @see SimpleStore#update
 * @see SimpleStore#updateAll
 * @see SimpleStore#updateMany
 * @since 3.0.0
 */

/**
 * Fired when one or more records are removed from the in-memory store. See
 * {@link SimpleStore~removeListener} for how to listen for this event.
 *
 * @event SimpleStore#remove
 * @see SimpleStore~removeListener
 * @see SimpleStore#event:remove
 * @see SimpleStore#clear
 * @see SimpleStore#destroy
 * @see SimpleStore#destroyAll
 * @see SimpleStore#remove
 * @see SimpleStore#removeAll
 */

/**
 * Callback signature for the {@link SimpleStore#event:remove} event.
 *
 * @example
 * function onRemove (mapperName, recordsOrRecords) {
 *   // do something
 * }
 * store.on('remove', onRemove)
 *
 * @callback SimpleStore~removeListener
 * @param {string} name The name of the associated {@link Mapper}.
 * @param {Record|Record[]} Record or Records that were removed.
 * @see SimpleStore#event:remove
 * @see SimpleStore#clear
 * @see SimpleStore#destroy
 * @see SimpleStore#destroyAll
 * @see SimpleStore#remove
 * @see SimpleStore#removeAll
 * @since 3.0.0
 */

/**
 * Create a subclass of this SimpleStore:
 * @example <caption>SimpleStore.extend</caption>
 * // Normally you would do: import {SimpleStore} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {SimpleStore} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomSimpleStoreClass extends SimpleStore {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customSimpleStore = new CustomSimpleStoreClass()
 * console.log(customSimpleStore.foo())
 * console.log(CustomSimpleStoreClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherSimpleStoreClass = SimpleStore.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherSimpleStore = new OtherSimpleStoreClass()
 * console.log(otherSimpleStore.foo())
 * console.log(OtherSimpleStoreClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherSimpleStoreClass () {
 *   SimpleStore.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * SimpleStore.extend({
 *   constructor: AnotherSimpleStoreClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherSimpleStore = new AnotherSimpleStoreClass()
 * console.log(anotherSimpleStore.created_at)
 * console.log(anotherSimpleStore.foo())
 * console.log(AnotherSimpleStoreClass.beep())
 *
 * @method SimpleStore.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this SimpleStore class.
 * @since 3.0.0
 */

var DOMAIN$9 = 'LinkedCollection';

/**
 * Extends {@link Collection}. Used by a {@link DataStore} to implement an
 * Identity Map.
 *
 * ```javascript
 * import {LinkedCollection} from 'js-data'
 * ```
 *
 * @class LinkedCollection
 * @extends Collection
 * @param {Array} [records] Initial set of records to insert into the
 * collection. See {@link Collection}.
 * @param {Object} [opts] Configuration options. See {@link Collection}.
 * @returns {Mapper}
 */
function LinkedCollection(records, opts) {
  utils.classCallCheck(this, LinkedCollection);
  // Make sure this collection has somewhere to store "added" timestamps
  Object.defineProperties(this, {
    _added: {
      value: {}
    },
    datastore: {
      writable: true,
      value: undefined
    }
  });

  Collection$1.call(this, records, opts);

  // Make sure this collection has a reference to a datastore
  if (!this.datastore) {
    throw utils.err('new ' + DOMAIN$9, 'opts.datastore')(400, 'DataStore', this.datastore);
  }
}

var LinkedCollection$1 = Collection$1.extend({
  constructor: LinkedCollection,

  _addMeta: function _addMeta(record, timestamp) {
    // Track when this record was added
    this._added[this.recordId(record)] = timestamp;

    if (utils.isFunction(record._set)) {
      record._set('$', timestamp);
    }
  },
  _clearMeta: function _clearMeta(record) {
    delete this._added[this.recordId(record)];
    if (utils.isFunction(record._set)) {
      record._set('$'); // unset
    }
  },
  _onRecordEvent: function _onRecordEvent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    Collection$1.prototype._onRecordEvent.apply(this, args);
    var event = args[0];
    // This is a very brute force method
    // Lots of room for optimization
    if (utils.isString(event) && event.indexOf('change') === 0) {
      this.updateIndexes(args[1]);
    }
  },
  add: function add(records, opts) {
    var _this = this;

    var mapper = this.mapper;
    var timestamp = new Date().getTime();
    var singular = utils.isObject(records) && !utils.isArray(records);

    if (singular) {
      records = [records];
    }
    records = Collection$1.prototype.add.call(this, records, opts);

    if (mapper.relationList.length && records.length) {
      // Check the currently visited record for relations that need to be
      // inserted into their respective collections.
      mapper.relationList.forEach(function (def) {
        def.addLinkedRecords(records);
      });
    }

    records.forEach(function (record) {
      return _this._addMeta(record, timestamp);
    });

    return singular ? records[0] : records;
  },
  remove: function remove(idOrRecord, opts) {
    var mapper = this.mapper;
    var record = Collection$1.prototype.remove.call(this, idOrRecord, opts);
    if (record) {
      this._clearMeta(record);
    }

    if (mapper.relationList.length && record) {
      mapper.relationList.forEach(function (def) {
        def.removeLinkedRecords(mapper, [record]);
      });
    }

    return record;
  },
  removeAll: function removeAll(query, opts) {
    var mapper = this.mapper;
    var records = Collection$1.prototype.removeAll.call(this, query, opts);
    records.forEach(this._clearMeta, this);

    if (mapper.relationList.length && records.length) {
      mapper.relationList.forEach(function (def) {
        def.removeLinkedRecords(mapper, records);
      });
    }

    return records;
  }
});

/**
 * Create a subclass of this LinkedCollection:
 *
 * @example <caption>LinkedCollection.extend</caption>
 * // Normally you would do: import {LinkedCollection} from 'js-data'
 * const JSData = require('js-data@3.0.0-rc.4')
 * const {LinkedCollection} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomLinkedCollectionClass extends LinkedCollection {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customLinkedCollection = new CustomLinkedCollectionClass()
 * console.log(customLinkedCollection.foo())
 * console.log(CustomLinkedCollectionClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherLinkedCollectionClass = LinkedCollection.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherLinkedCollection = new OtherLinkedCollectionClass()
 * console.log(otherLinkedCollection.foo())
 * console.log(OtherLinkedCollectionClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherLinkedCollectionClass () {
 *   LinkedCollection.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * LinkedCollection.extend({
 *   constructor: AnotherLinkedCollectionClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherLinkedCollection = new AnotherLinkedCollectionClass()
 * console.log(anotherLinkedCollection.created_at)
 * console.log(anotherLinkedCollection.foo())
 * console.log(AnotherLinkedCollectionClass.beep())
 *
 * @method LinkedCollection.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this LinkedCollection class.
 * @since 3.0.0
 */

var DATASTORE_DEFAULTS = {
  /**
   * Whether in-memory relations should be unlinked from records after they are
   * destroyed.
   *
   * @default true
   * @name DataStore#unlinkOnDestroy
   * @since 3.0.0
   * @type {boolean}
   */
  unlinkOnDestroy: true

  /**
   * The `DataStore` class is an extension of {@link SimpleStore}. Not only does
   * `DataStore` manage mappers and store data in collections, it uses the
   * {@link LinkedCollection} class to link related records together in memory.
   *
   * ```javascript
   * import {DataStore} from 'js-data'
   * ```
   *
   * @example
   * import {DataStore} from 'js-data'
   * import HttpAdapter from 'js-data-http'
   * const store = new DataStore()
   *
   * // DataStore#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = store.defineMapper('user')
   *
   * // DataStore#as returns the store scoped to a particular Mapper.
   * const UserStore = store.as('user')
   *
   * // Call "find" on "UserMapper" (Stateless ORM)
   * UserMapper.find(1).then((user) => {
   *   // retrieved a "user" record via the http adapter, but that's it
   *
   *   // Call "find" on "store" targeting "user" (Stateful DataStore)
   *   return store.find('user', 1) // same as "UserStore.find(1)"
   * }).then((user) => {
   *   // not only was a "user" record retrieved, but it was added to the
   *   // store's "user" collection
   *   const cachedUser = store.getCollection('user').get(1)
   *   console.log(user === cachedUser) // true
   * })
   *
   * @class DataStore
   * @extends SimpleStore
   * @param {Object} [opts] Configuration options. See {@link SimpleStore}.
   * @param {boolean} [opts.collectionClass={@link LinkedCollection}] See {@link DataStore#collectionClass}.
   * @param {boolean} [opts.debug=false] See {@link Component#debug}.
   * @param {boolean} [opts.unlinkOnDestroy=true] See {@link DataStore#unlinkOnDestroy}.
   * @param {boolean|Function} [opts.usePendingFind=true] See {@link DataStore#usePendingFind}.
   * @param {boolean|Function} [opts.usePendingFindAll=true] See {@link DataStore#usePendingFindAll}.
   * @returns {DataStore}
   * @see SimpleStore
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#datastore","Components of JSData: DataStore"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/working-with-the-datastore","Working with the DataStore"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/jsdata-and-the-browser","Notes on using JSData in the Browser"]
   */
};function DataStore(opts) {
  utils.classCallCheck(this, DataStore);

  opts || (opts = {});
  // Fill in any missing options with the defaults
  utils.fillIn(opts, DATASTORE_DEFAULTS);
  opts.collectionClass || (opts.collectionClass = LinkedCollection$1);
  SimpleStore$1.call(this, opts);
}

var props$1 = {
  constructor: DataStore,

  defineMapper: function defineMapper(name, opts) {
    // Complexity of this method is beyond simply using => functions to bind context
    var self = this;
    var mapper = SimpleStore$1.prototype.defineMapper.call(self, name, opts);
    var idAttribute = mapper.idAttribute;
    var collection = this.getCollection(name);

    mapper.relationList.forEach(function (def) {
      var relation = def.relation;
      var localField = def.localField;
      var path = 'links.' + localField;
      var foreignKey = def.foreignKey;
      var type = def.type;
      var updateOpts = { index: foreignKey };
      var descriptor = void 0;

      var getter = function getter() {
        return this._get(path);
      };

      if (type === belongsToType) {
        if (!collection.indexes[foreignKey]) {
          collection.createIndex(foreignKey);
        }

        descriptor = {
          get: getter,
          // e.g. profile.user = someUser
          // or comment.post = somePost
          set: function set(record) {
            // e.g. const otherUser = profile.user
            var currentParent = this._get(path);
            // e.g. profile.user === someUser
            if (record === currentParent) {
              return currentParent;
            }
            var id = utils.get(this, idAttribute);
            var inverseDef = def.getInverse(mapper);

            // e.g. profile.user !== someUser
            // or comment.post !== somePost
            if (currentParent && inverseDef) {
              this.removeInverseRelation(currentParent, id, inverseDef, idAttribute);
            }
            if (record) {
              // e.g. profile.user = someUser
              var relatedIdAttribute = def.getRelation().idAttribute;
              var relatedId = utils.get(record, relatedIdAttribute);

              // Prefer store record
              if (relatedId !== undefined && this._get('$')) {
                record = self.get(relation, relatedId) || record;
              }

              // Set locals
              // e.g. profile.user = someUser
              // or comment.post = somePost
              safeSetLink(this, localField, record);
              safeSetProp(this, foreignKey, relatedId);
              collection.updateIndex(this, updateOpts);

              if (inverseDef) {
                this.setupInverseRelation(record, id, inverseDef, idAttribute);
              }
            } else {
              // Unset in-memory link only
              // e.g. profile.user = undefined
              // or comment.post = undefined
              safeSetLink(this, localField, undefined);
            }
            return record;
          }
        };

        var foreignKeyDescriptor = Object.getOwnPropertyDescriptor(mapper.recordClass.prototype, foreignKey);
        if (!foreignKeyDescriptor) {
          foreignKeyDescriptor = {
            enumerable: true
          };
        }
        var originalGet = foreignKeyDescriptor.get;
        foreignKeyDescriptor.get = function () {
          if (originalGet) {
            return originalGet.call(this);
          }
          return this._get('props.' + foreignKey);
        };
        var originalSet = foreignKeyDescriptor.set;
        foreignKeyDescriptor.set = function (value) {
          var _this = this;

          if (originalSet) {
            originalSet.call(this, value);
          }
          var currentParent = utils.get(this, localField);
          var id = utils.get(this, idAttribute);
          var inverseDef = def.getInverse(mapper);
          var currentParentId = currentParent ? utils.get(currentParent, def.getRelation().idAttribute) : undefined;

          if (currentParent && currentParentId !== undefined && currentParentId !== value) {
            if (inverseDef.type === hasOneType) {
              safeSetLink(currentParent, inverseDef.localField, undefined);
            } else if (inverseDef.type === hasManyType) {
              var children = utils.get(currentParent, inverseDef.localField);
              if (id === undefined) {
                utils.remove(children, function (child) {
                  return child === _this;
                });
              } else {
                utils.remove(children, function (child) {
                  return child === _this || id === utils.get(child, idAttribute);
                });
              }
            }
          }

          safeSetProp(this, foreignKey, value);
          collection.updateIndex(this, updateOpts);

          if (value === undefined || value === null) {
            if (currentParentId !== undefined) {
              // Unset locals
              utils.set(this, localField, undefined);
            }
          } else if (this._get('$')) {
            var storeRecord = self.get(relation, value);
            if (storeRecord) {
              utils.set(this, localField, storeRecord);
            }
          }
        };
        Object.defineProperty(mapper.recordClass.prototype, foreignKey, foreignKeyDescriptor);
      } else if (type === hasManyType) {
        var localKeys = def.localKeys;
        var foreignKeys = def.foreignKeys;

        // TODO: Handle case when belongsTo relation isn't ever defined
        if (self._collections[relation] && foreignKey && !self.getCollection(relation).indexes[foreignKey]) {
          self.getCollection(relation).createIndex(foreignKey);
        }

        descriptor = {
          get: function get() {
            var current = getter.call(this);
            if (!current) {
              this._set(path, []);
            }
            return getter.call(this);
          },

          // e.g. post.comments = someComments
          // or user.groups = someGroups
          // or group.users = someUsers
          set: function set(records) {
            var _this2 = this;

            if (records && !utils.isArray(records)) {
              records = [records];
            }
            var id = utils.get(this, idAttribute);
            var relatedIdAttribute = def.getRelation().idAttribute;
            var inverseDef = def.getInverse(mapper);
            var inverseLocalField = inverseDef.localField;
            var current = this._get(path) || [];
            var toLink = [];
            var toLinkIds = {};

            if (records) {
              records.forEach(function (record) {
                // e.g. comment.id
                var relatedId = utils.get(record, relatedIdAttribute);
                var currentParent = utils.get(record, inverseLocalField);
                if (currentParent && currentParent !== _this2) {
                  var currentChildrenOfParent = utils.get(currentParent, localField);
                  // e.g. somePost.comments.remove(comment)
                  if (relatedId === undefined) {
                    utils.remove(currentChildrenOfParent, function (child) {
                      return child === record;
                    });
                  } else {
                    utils.remove(currentChildrenOfParent, function (child) {
                      return child === record || relatedId === utils.get(child, relatedIdAttribute);
                    });
                  }
                }
                if (relatedId !== undefined) {
                  if (_this2._get('$')) {
                    // Prefer store record
                    record = self.get(relation, relatedId) || record;
                  }
                  // e.g. toLinkIds[comment.id] = comment
                  toLinkIds[relatedId] = record;
                }
                toLink.push(record);
              });
            }

            // e.g. post.comments = someComments
            if (foreignKey) {
              current.forEach(function (record) {
                // e.g. comment.id
                var relatedId = utils.get(record, relatedIdAttribute);
                if (relatedId === undefined && toLink.indexOf(record) === -1 || relatedId !== undefined && !(relatedId in toLinkIds)) {
                  // Update (unset) inverse relation
                  if (records) {
                    // e.g. comment.post_id = undefined
                    safeSetProp(record, foreignKey, undefined);
                    // e.g. CommentCollection.updateIndex(comment, { index: 'post_id' })
                    self.getCollection(relation).updateIndex(record, updateOpts);
                  }
                  // e.g. comment.post = undefined
                  safeSetLink(record, inverseLocalField, undefined);
                }
              });
              toLink.forEach(function (record) {
                // Update (set) inverse relation
                // e.g. comment.post_id = post.id
                safeSetProp(record, foreignKey, id);
                // e.g. CommentCollection.updateIndex(comment, { index: 'post_id' })
                self.getCollection(relation).updateIndex(record, updateOpts);
                // e.g. comment.post = post
                safeSetLink(record, inverseLocalField, _this2);
              });
            } else if (localKeys) {
              // Update locals
              // e.g. group.users = someUsers
              // Update (set) inverse relation
              var ids = toLink.map(function (child) {
                return utils.get(child, relatedIdAttribute);
              }).filter(function (id) {
                return id !== undefined;
              });
              // e.g. group.user_ids = [1,2,3,...]
              utils.set(this, localKeys, ids);
              // Update (unset) inverse relation
              if (inverseDef.foreignKeys) {
                current.forEach(function (child) {
                  var relatedId = utils.get(child, relatedIdAttribute);
                  if (relatedId === undefined && toLink.indexOf(child) === -1 || relatedId !== undefined && !(relatedId in toLinkIds)) {
                    // Update inverse relation
                    // safeSetLink(child, inverseLocalField, undefined)
                    var parents = utils.get(child, inverseLocalField) || [];
                    // e.g. someUser.groups.remove(group)
                    if (id === undefined) {
                      utils.remove(parents, function (parent) {
                        return parent === _this2;
                      });
                    } else {
                      utils.remove(parents, function (parent) {
                        return parent === _this2 || id === utils.get(parent, idAttribute);
                      });
                    }
                  }
                });
                toLink.forEach(function (child) {
                  // Update (set) inverse relation
                  var parents = utils.get(child, inverseLocalField);
                  // e.g. someUser.groups.push(group)
                  if (id === undefined) {
                    utils.noDupeAdd(parents, _this2, function (parent) {
                      return parent === _this2;
                    });
                  } else {
                    utils.noDupeAdd(parents, _this2, function (parent) {
                      return parent === _this2 || id === utils.get(parent, idAttribute);
                    });
                  }
                });
              }
            } else if (foreignKeys) {
              // e.g. user.groups = someGroups
              // Update (unset) inverse relation
              current.forEach(function (parent) {
                var ids = utils.get(parent, foreignKeys) || [];
                // e.g. someGroup.user_ids.remove(user.id)
                utils.remove(ids, function (_key) {
                  return id === _key;
                });
                var children = utils.get(parent, inverseLocalField);
                // e.g. someGroup.users.remove(user)
                if (id === undefined) {
                  utils.remove(children, function (child) {
                    return child === _this2;
                  });
                } else {
                  utils.remove(children, function (child) {
                    return child === _this2 || id === utils.get(child, idAttribute);
                  });
                }
              });
              // Update (set) inverse relation
              toLink.forEach(function (parent) {
                var ids = utils.get(parent, foreignKeys) || [];
                utils.noDupeAdd(ids, id, function (_key) {
                  return id === _key;
                });
                var children = utils.get(parent, inverseLocalField);
                if (id === undefined) {
                  utils.noDupeAdd(children, _this2, function (child) {
                    return child === _this2;
                  });
                } else {
                  utils.noDupeAdd(children, _this2, function (child) {
                    return child === _this2 || id === utils.get(child, idAttribute);
                  });
                }
              });
            }

            this._set(path, toLink);
            return toLink;
          }
        };
      } else if (type === hasOneType) {
        // TODO: Handle case when belongsTo relation isn't ever defined
        if (self._collections[relation] && foreignKey && !self.getCollection(relation).indexes[foreignKey]) {
          self.getCollection(relation).createIndex(foreignKey);
        }
        descriptor = {
          get: getter,
          // e.g. user.profile = someProfile
          set: function set(record) {
            var current = this._get(path);
            if (record === current) {
              return current;
            }
            var inverseLocalField = def.getInverse(mapper).localField;
            // Update (unset) inverse relation
            if (current) {
              safeSetProp(current, foreignKey, undefined);
              self.getCollection(relation).updateIndex(current, updateOpts);
              safeSetLink(current, inverseLocalField, undefined);
            }
            if (record) {
              var relatedId = utils.get(record, def.getRelation().idAttribute);
              // Prefer store record
              if (relatedId !== undefined) {
                record = self.get(relation, relatedId) || record;
              }

              // Set locals
              safeSetLink(this, localField, record);

              // Update (set) inverse relation
              safeSetProp(record, foreignKey, utils.get(this, idAttribute));
              self.getCollection(relation).updateIndex(record, updateOpts);
              safeSetLink(record, inverseLocalField, this);
            } else {
              // Unset locals
              safeSetLink(this, localField, undefined);
            }
            return record;
          }
        };
      }

      if (descriptor) {
        descriptor.enumerable = def.enumerable === undefined ? false : def.enumerable;
        if (def.get) {
          var origGet = descriptor.get;
          descriptor.get = function () {
            var _this3 = this;

            return def.get(def, this, function () {
              for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return origGet.apply(_this3, args);
            });
          };
        }
        if (def.set) {
          var origSet = descriptor.set;
          descriptor.set = function (related) {
            var _this4 = this;

            return def.set(def, this, related, function (value) {
              return origSet.call(_this4, value === undefined ? related : value);
            });
          };
        }
        Object.defineProperty(mapper.recordClass.prototype, localField, descriptor);
      }
    });

    return mapper;
  },
  destroy: function destroy(name, id, opts) {
    var _this5 = this;

    opts || (opts = {});
    return SimpleStore$1.prototype.destroy.call(this, name, id, opts).then(function (result) {
      var record = void 0;
      if (opts.raw) {
        record = result.data;
      } else {
        record = result;
      }

      if (record && _this5.unlinkOnDestroy) {
        var _opts = utils.plainCopy(opts);
        _opts.withAll = true;
        utils.forEachRelation(_this5.getMapper(name), _opts, function (def) {
          utils.set(record, def.localField, undefined);
        });
      }
      return result;
    });
  },
  destroyAll: function destroyAll(name, query, opts) {
    var _this6 = this;

    opts || (opts = {});
    return SimpleStore$1.prototype.destroyAll.call(this, name, query, opts).then(function (result) {
      var records = void 0;
      if (opts.raw) {
        records = result.data;
      } else {
        records = result;
      }

      if (records && records.length && _this6.unlinkOnDestroy) {
        var _opts = utils.plainCopy(opts);
        _opts.withAll = true;
        utils.forEachRelation(_this6.getMapper(name), _opts, function (def) {
          records.forEach(function (record) {
            utils.set(record, def.localField, undefined);
          });
        });
      }
      return result;
    });
  }
};

var DataStore$1 = SimpleStore$1.extend(props$1);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var q = createCommonjsModule(function (module, exports) {
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if ('object' === "object" && 'object' === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof undefined === "function" && undefined.amd) {
        undefined(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                err.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + err.message);
                deferred.reject(err);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});
});

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal || freeSelf || Function('return this')();

var _root = root$1;

var root = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root.Date.now();
};

var now_1 = now$1;

var root$2 = _root;

/** Built-in value references. */
var Symbol$2 = root$2.Symbol;

var _Symbol = Symbol$2;

var Symbol$3 = _Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol;
var getRawTag = _getRawTag;
var objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag;
var isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var isObject$3 = isObject_1;
var isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$3(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$3(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject$1 = isObject_1;
var now = now_1;
var toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty$1 = function (obj, key, value) {
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

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
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













var toConsumableArray$1 = function (arr) {
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
  return debounce_1(function (propertyName) {
    var _this = this;

    var skipLazy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var asyncData = this.$options.asyncData;
    if (asyncData) {
      var _ret = function () {
        var names = Object.keys(asyncData).filter(function (s) {
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var prop = _step.value;

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
                cancelTimeout(_this['_' + prop + 'Timer']);
                _this['_' + prop + 'Timer'] = setTimeout(function () {
                  _this._asyncReload.cancel();
                }, timeout);
              }
            };
            var cancelTimer = function cancelTimer() {
              if (_this['_' + prop + 'Timer']) {
                cancelTimeout(_this['_' + prop + 'Timer']);
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

          for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret2 = _loop();

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

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof$1(_ret)) === "object") return _ret.v;
    }
  }, 50).bind(thisArg);
};

var AsyncDataMixin = {
  created: function created() {
    this._asyncReload = createAsyncReload(this);
  },
  mounted: function mounted() {
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
      var names = Object.keys(asyncData).filter(function (s) {
        return !isOptionName(s);
      });
      var dataObj = {
        asyncLoading: true,
        asyncError: false,
        asyncAll: q.all(names.map(function (name) {
          return asyncData[name];
        })),
        asyncAny: q.any(names.map(function (name) {
          return asyncData[name];
        }))
      };
      names.forEach(function (name) {
        dataObj[name] = asyncData[name + 'Default'];
        dataObj[name + 'Promise'] = asyncData[name];
        dataObj[name + 'Loading'] = !asyncData[name + 'Lazy'];
      });
      var errorNames = names.map(function (s) {
        return s + 'Error';
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
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply$2(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$2;

var baseGetTag$2 = _baseGetTag;
var isObject$5 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$5(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$2(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$2;

var root$3 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$3['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$1;

var isFunction$1 = isFunction_1;
var isMasked = _isMasked;
var isObject$4 = isObject_1;
var toSource = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto$3 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$4(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative;
var getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$1;

var getNative = _getNative;

var defineProperty$3 = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$3;

var defineProperty$2 = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$2(object, key, value) {
  if (key == '__proto__' && defineProperty$2) {
    defineProperty$2(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$2;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$1;

var baseAssignValue$1 = _baseAssignValue;
var eq = eq_1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$1.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$1(object, key, value);
  }
}

var _assignValue = assignValue$1;

var assignValue = _assignValue;
var baseAssignValue = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$1(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject$1;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity$1(value) {
  return value;
}

var identity_1 = identity$1;

var apply$3 = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$1(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply$3(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant$1(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$1;

var constant = constant_1;
var defineProperty$4 = _defineProperty;
var identity$2 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty$4 ? identity$2 : function(func, string) {
  return defineProperty$4(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800;
var HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString;
var shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var identity = identity_1;
var overRest = _overRest;
var setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$2(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest$2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$1(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength$1;

var isFunction$4 = isFunction_1;
var isLength = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$1(value) {
  return value != null && isLength(value.length) && !isFunction$4(value);
}

var isArrayLike_1 = isArrayLike$1;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$1(value, length) {
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$1;

var eq$2 = eq_1;
var isArrayLike = isArrayLike_1;
var isIndex = _isIndex;
var isObject$6 = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject$6(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq$2(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$1;

var baseRest$1 = _baseRest;
var isIterateeCall = _isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner$1(assigner) {
  return baseRest$1(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner$1;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

var baseGetTag$3 = _baseGetTag;
var isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$3(value) && baseGetTag$3(value) == argsTag;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments;
var isObjectLike$2 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$2(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments$1;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

var isArray_1 = isArray$1;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
var root = _root,
    stubFalse = stubFalse_1;

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
});

var baseGetTag$4 = _baseGetTag;
var isLength$2 = isLength_1;
var isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$4(value) &&
    isLength$2(value.length) && !!typedArrayTags[baseGetTag$4(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$1;

var _nodeUtil = createCommonjsModule(function (module, exports) {
var freeGlobal = _freeGlobal;

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

var baseIsTypedArray = _baseIsTypedArray;
var baseUnary = _baseUnary;
var nodeUtil = _nodeUtil;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$1;

var baseTimes = _baseTimes;
var isArguments = isArguments_1;
var isArray = isArray_1;
var isBuffer = isBuffer_1;
var isIndex$2 = _isIndex;
var isTypedArray = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$2(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$1(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$7;

  return value === proto;
}

var _isPrototype = isPrototype$1;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn$1;

var isObject$7 = isObject_1;
var isPrototype = _isPrototype;
var nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$7(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn$1;

var arrayLikeKeys = _arrayLikeKeys;
var baseKeysIn = _baseKeysIn;
var isArrayLike$2 = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$2(object) {
  return isArrayLike$2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

var keysIn_1 = keysIn$2;

var copyObject = _copyObject;
var createAssigner = _createAssigner;
var keysIn$1 = keysIn_1;

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith$1 = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn$1(source), object, customizer);
});

var assignInWith_1 = assignInWith$1;

var eq$3 = eq_1;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn$1(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq$3(objValue, objectProto$8[key]) && !hasOwnProperty$6.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

var _customDefaultsAssignIn = customDefaultsAssignIn$1;

var apply$1 = _apply;
var assignInWith = assignInWith_1;
var baseRest = _baseRest;
var customDefaultsAssignIn = _customDefaultsAssignIn;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults$1 = baseRest(function(args) {
  args.push(undefined, customDefaultsAssignIn);
  return apply$1(assignInWith, undefined, args);
});

var defaults_1 = defaults$1;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex$1(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex$1;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN$1(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN$1;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf$1(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf$1;

var baseFindIndex = _baseFindIndex;
var baseIsNaN = _baseIsNaN;
var strictIndexOf = _strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf$1(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf$1;

var baseGetTag$5 = _baseGetTag;
var isArray$2 = isArray_1;
var isObjectLike$5 = isObjectLike_1;

/** `Object#toString` result references. */
var stringTag$1 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString$2(value) {
  return typeof value == 'string' ||
    (!isArray$2(value) && isObjectLike$5(value) && baseGetTag$5(value) == stringTag$1);
}

var isString_1 = isString$2;

var toNumber$2 = toNumber_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;
var MAX_INTEGER$1 = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite$1(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber$2(value);
  if (value === INFINITY$1 || value === -INFINITY$1) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER$1;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite$1;

var toFinite = toFinite_1;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger$2(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

var toInteger_1 = toInteger$2;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$1;

var arrayMap = _arrayMap;

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues$1(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

var _baseValues = baseValues$1;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$1;

var overArg = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype$2 = _isPrototype;
var nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var arrayLikeKeys$2 = _arrayLikeKeys;
var baseKeys = _baseKeys;
var isArrayLike$4 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$1(object) {
  return isArrayLike$4(object) ? arrayLikeKeys$2(object) : baseKeys(object);
}

var keys_1 = keys$1;

var baseValues = _baseValues;
var keys = keys_1;

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values$1(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

var values_1 = values$1;

var baseIndexOf = _baseIndexOf;
var isArrayLike$3 = isArrayLike_1;
var isString$1 = isString_1;
var toInteger$1 = toInteger_1;
var values = values_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$2 = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike$3(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger$1(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax$2(length + fromIndex, 0);
  }
  return isString$1(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

var includes_1 = includes;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty$1(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty$1;

var isArray$4 = isArray_1;
var isSymbol$2 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$2(value, object) {
  if (isArray$4(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$2(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey$2;

var getNative$2 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$1 = getNative$2(Object, 'create');

var _nativeCreate = nativeCreate$1;

var nativeCreate = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$3 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$11.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$3 ? (data[key] !== undefined) : hasOwnProperty$9.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate$4 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate$4 && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear;
var hashDelete = _hashDelete;
var hashGet = _hashGet;
var hashHas = _hashHas;
var hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

var eq$4 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$4(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$1;

var assocIndexOf = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$3 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$3(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf$4 = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf$4(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear;
var listCacheDelete = _listCacheDelete;
var listCacheGet = _listCacheGet;
var listCacheHas = _listCacheHas;
var listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear;
ListCache$1.prototype['delete'] = listCacheDelete;
ListCache$1.prototype.get = listCacheGet;
ListCache$1.prototype.has = listCacheHas;
ListCache$1.prototype.set = listCacheSet;

var _ListCache = ListCache$1;

var getNative$3 = _getNative;
var root$4 = _root;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative$3(root$4, 'Map');

var _Map = Map$1;

var Hash = _Hash;
var ListCache = _ListCache;
var Map = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$1;

var getMapData = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$3 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$3(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData$4 = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData$4(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear;
var mapCacheDelete = _mapCacheDelete;
var mapCacheGet = _mapCacheGet;
var mapCacheHas = _mapCacheHas;
var mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var MapCache = _MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache;

var memoize_1 = memoize$1;

var memoize = memoize_1;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

var memoizeCapped = _memoizeCapped;

/** Used to match property names within property paths. */
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath$1;

var Symbol$4 = _Symbol;
var arrayMap$2 = _arrayMap;
var isArray$5 = isArray_1;
var isSymbol$3 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$4 ? Symbol$4.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$5(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap$2(value, baseToString$1) + '';
  }
  if (isSymbol$3(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

var _baseToString = baseToString$1;

var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

var toString_1 = toString$1;

var isArray$3 = isArray_1;
var isKey$1 = _isKey;
var stringToPath = _stringToPath;
var toString = toString_1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$1(value, object) {
  if (isArray$3(value)) {
    return value;
  }
  return isKey$1(value, object) ? [value] : stringToPath(toString(value));
}

var _castPath = castPath$1;

var isSymbol$4 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$3 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$2(value) {
  if (typeof value == 'string' || isSymbol$4(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$3) ? '-0' : result;
}

var _toKey = toKey$2;

var castPath = _castPath;
var toKey$1 = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$1(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey$1(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet$1;

var baseGet = _baseGet;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep$1(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep$1;

var baseProperty = _baseProperty;
var basePropertyDeep = _basePropertyDeep;
var isKey = _isKey;
var toKey = _toKey;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

var property_1$1 = property;

var arrayMap$3 = _arrayMap;

/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the key-value pairs.
 */
function baseToPairs$1(object, props) {
  return arrayMap$3(props, function(key) {
    return [key, object[key]];
  });
}

var _baseToPairs = baseToPairs$1;

var getNative$4 = _getNative;
var root$5 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$4(root$5, 'DataView');

var _DataView = DataView$1;

var getNative$5 = _getNative;
var root$6 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$5(root$6, 'Promise');

var _Promise = Promise$2;

var getNative$6 = _getNative;
var root$7 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$6(root$7, 'Set');

var _Set = Set$1;

var getNative$7 = _getNative;
var root$8 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative$7(root$8, 'WeakMap');

var _WeakMap = WeakMap$1;

var DataView = _DataView;
var Map$2 = _Map;
var Promise$1 = _Promise;
var Set = _Set;
var WeakMap = _WeakMap;
var baseGetTag$6 = _baseGetTag;
var toSource$2 = _toSource;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$1 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource$2(DataView);
var mapCtorString = toSource$2(Map$2);
var promiseCtorString = toSource$2(Promise$1);
var setCtorString = toSource$2(Set);
var weakMapCtorString = toSource$2(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$1 = baseGetTag$6;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$2 && getTag$1(new Map$2) != mapTag$2) ||
    (Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag$1(new Set) != setTag$2) ||
    (WeakMap && getTag$1(new WeakMap) != weakMapTag$1)) {
  getTag$1 = function(value) {
    var result = baseGetTag$6(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource$2(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray$1(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray$1;

/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
function setToPairs$1(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = [value, value];
  });
  return result;
}

var _setToPairs = setToPairs$1;

var baseToPairs = _baseToPairs;
var getTag = _getTag;
var mapToArray = _mapToArray;
var setToPairs = _setToPairs;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';
var setTag$1 = '[object Set]';

/**
 * Creates a `_.toPairs` or `_.toPairsIn` function.
 *
 * @private
 * @param {Function} keysFunc The function to get the keys of a given object.
 * @returns {Function} Returns the new pairs function.
 */
function createToPairs$1(keysFunc) {
  return function(object) {
    var tag = getTag(object);
    if (tag == mapTag$1) {
      return mapToArray(object);
    }
    if (tag == setTag$1) {
      return setToPairs(object);
    }
    return baseToPairs(object, keysFunc(object));
  };
}

var _createToPairs = createToPairs$1;

var createToPairs = _createToPairs;
var keys$2 = keys_1;

/**
 * Creates an array of own enumerable string keyed-value pairs for `object`
 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
 * entries are returned.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias entries
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
var toPairs = createToPairs(keys$2);

var toPairs_1 = toPairs;

var entries = toPairs_1;

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

var baseKeys$2 = _baseKeys;
var getTag$2 = _getTag;
var isArguments$2 = isArguments_1;
var isArray$6 = isArray_1;
var isArrayLike$5 = isArrayLike_1;
var isBuffer$1 = isBuffer_1;
var isPrototype$3 = _isPrototype;
var isTypedArray$2 = isTypedArray_1;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]';
var setTag$3 = '[object Set]';

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$12.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike$5(value) &&
      (isArray$6(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer$1(value) || isTypedArray$2(value) || isArguments$2(value))) {
    return !value.length;
  }
  var tag = getTag$2(value);
  if (tag == mapTag$3 || tag == setTag$3) {
    return !value.size;
  }
  if (isPrototype$3(value)) {
    return !baseKeys$2(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$10.call(value, key)) {
      return false;
    }
  }
  return true;
}

var isEmpty_1 = isEmpty;

var registerExternalEvents = (function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var handlers = options.handlers || {};
  var eventEmmitter = options.eventEmmitter;
  if (!eventEmmitter && isEmpty_1(handlers)) {
    return;
  } else if (!eventEmmitter) {
    console.error('[@citygro/vdata] missing event source!');
  } else {
    entries(handlers).forEach(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          event = _ref2[0],
          handler = _ref2[1];

      eventEmmitter.on(event, handler.bind(Vue));
    });
  }
});

var baseGet$2 = _baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$2(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet$2(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$2;

var registerSchemas = function ($store) {
  var modelMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isEmpty_1(modelMap)) {
    console.error('[@citygro/vdata] you have not defined any models!');
  }
  entries(modelMap).forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        modelName = _ref2[0],
        schema = _ref2[1];

    var model = _extends({}, schema);
    if (!get_1(model, 'options.idAttribute')) {
      model.options = _extends({}, model.options || {}, { idAttribute: 'id' });
    }
    $store.defineMapper(model.name || modelName, model.options);
  });
};

var getVdata = property_1$1('$options.vdata');

var hasVdata = function hasVdata(o) {
  return getVdata(o) !== undefined;
};

// late binding
var _Vue;

/**
 * VData plugin
 */
var vdata = {
  createConfig: function createConfig(fn) {
    return function (V) {
      var options = fn(V);
      return defaults_1(options || {}, {
        events: ['add', 'change', 'remove']
      });
    };
  },
  install: function install(Vue, optionsCreator) {
    _Vue = Vue;
    console.log(_Vue);
    utils.Promise = q;
    var store = new DataStore$1();
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
    var options = optionsCreator(Vue);
    Object.defineProperty(store, 'vdataOptions', {
      get: function get() {
        return options;
      }
    });
    registerSchemas(store, options.models);
    registerAdapters(store, options.adapters);
    registerExternalEvents(Vue, options.externalEvents);
    console.log('[@citygro/vdata] store ready!', store);
    Vue.mixin(AsyncDataMixin);
    Vue.mixin({
      methods: {
        $vdata: function $vdata() {
          if (hasVdata(this)) {
            this._vdataHandler('change');
          }
        }
      },
      beforeCreate: function beforeCreate() {
        if (hasVdata(this)) {
          var self = this;
          this._vdataHandler = debounce_1(function () {
            var event = arguments[0];
            if (includes_1(options.events, event)) {
              console.log('[@citygro/vdata<' + self._uid + '>] running for ' + event);
              self.$options.vdata.apply(self, [store].concat(Array.prototype.slice.call(arguments)));
            }
          }.bind(self), 25);
          store.on('all', self._vdataHandler);
          console.log('[@citygro/vdata<' + self._uid + '>]: ready. listening on', options.events);
        }
      },
      created: function created() {
        this.$vdata();
      },
      beforeDestroy: function beforeDestroy() {
        if (hasVdata(this)) {
          store.off('all', this._vdataHandler);
        }
      }
    });
  }
};

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice$1(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var _baseSlice = baseSlice$1;

var baseSlice = _baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

var _castSlice = castSlice$1;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f';
var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange = '\\u20d0-\\u20ff';
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$1(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode$1;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray$1(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f';
var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray$1;

var asciiToArray = _asciiToArray;
var hasUnicode$2 = _hasUnicode;
var unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
  return hasUnicode$2(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

var _stringToArray = stringToArray$1;

var castSlice = _castSlice;
var hasUnicode = _hasUnicode;
var stringToArray = _stringToArray;
var toString$3 = toString_1;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst$1(methodName) {
  return function(string) {
    string = toString$3(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

var _createCaseFirst = createCaseFirst$1;

var createCaseFirst = _createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst$1 = createCaseFirst('toUpperCase');

var upperFirst_1 = upperFirst$1;

var toString$2 = toString_1;
var upperFirst = upperFirst_1;

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize$1(string) {
  return upperFirst(toString$2(string).toLowerCase());
}

var capitalize_1 = capitalize$1;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

var _arrayReduce = arrayReduce$1;

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf$1(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

var _basePropertyOf = basePropertyOf$1;

var basePropertyOf = _basePropertyOf;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter$1 = basePropertyOf(deburredLetters);

var _deburrLetter = deburrLetter$1;

var deburrLetter = _deburrLetter;
var toString$4 = toString_1;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$2 = '\\u0300-\\u036f';
var reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$2 = '\\u20d0-\\u20ff';
var rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;

/** Used to compose unicode capture groups. */
var rsCombo$1 = '[' + rsComboRange$2 + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr$1(string) {
  string = toString$4(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

var deburr_1 = deburr$1;

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords$1(string) {
  return string.match(reAsciiWord) || [];
}

var _asciiWords = asciiWords$1;

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord$1(string) {
  return reHasUnicodeWord.test(string);
}

var _hasUnicodeWord = hasUnicodeWord$1;

/** Used to compose unicode character classes. */
var rsAstralRange$2 = '\\ud800-\\udfff';
var rsComboMarksRange$3 = '\\u0300-\\u036f';
var reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$3 = '\\u20d0-\\u20ff';
var rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsDingbatRange = '\\u2700-\\u27bf';
var rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
var rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
var rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
var rsPunctuationRange = '\\u2000-\\u206f';
var rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
var rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
var rsVarRange$2 = '\\ufe0e\\ufe0f';
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos$1 = "['\u2019]";
var rsBreak = '[' + rsBreakRange + ']';
var rsCombo$2 = '[' + rsComboRange$3 + ']';
var rsDigits = '\\d+';
var rsDingbat = '[' + rsDingbatRange + ']';
var rsLower = '[' + rsLowerRange + ']';
var rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
var rsFitz$1 = '\\ud83c[\\udffb-\\udfff]';
var rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')';
var rsNonAstral$1 = '[^' + rsAstralRange$2 + ']';
var rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsUpper = '[' + rsUpperRange + ']';
var rsZWJ$2 = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')';
var rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')';
var rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?';
var rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?';
var reOptMod$1 = rsModifier$1 + '?';
var rsOptVar$1 = '[' + rsVarRange$2 + ']?';
var rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*';
var rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)';
var rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)';
var rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1;
var rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords$1(string) {
  return string.match(reUnicodeWord) || [];
}

var _unicodeWords = unicodeWords$1;

var asciiWords = _asciiWords;
var hasUnicodeWord = _hasUnicodeWord;
var toString$5 = toString_1;
var unicodeWords = _unicodeWords;

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words$1(string, pattern, guard) {
  string = toString$5(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

var words_1 = words$1;

var arrayReduce = _arrayReduce;
var deburr = deburr_1;
var words = words_1;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder$1(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

var _createCompounder = createCompounder$1;

var capitalize = capitalize_1;
var createCompounder = _createCompounder;

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

var camelCase_1 = camelCase;

var baseSlice$2 = _baseSlice;

/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.tail([1, 2, 3]);
 * // => [2, 3]
 */
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice$2(array, 1, length) : [];
}

var tail_1 = tail;

/**
 * convert snake_case or camelCase strings to CapCase
 *
 * @param {String} s
 */
var capWords = (function (s) {
  var camel = camelCase_1(s);
  return [camel.charAt(0).toUpperCase()].contact(tail_1(camel)).join('');
});

var _mapping = createCommonjsModule(function (module, exports) {
/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to track methods with placeholder support */
exports.placeholder = {
  'bind': true,
  'bindKey': true,
  'curry': true,
  'curryRight': true,
  'partial': true,
  'partialRight': true
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};
});

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
var placeholder = {};

var mapping = _mapping;
var fallbackHolder = placeholder;

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert$1(util, name, func, options) {
  var setPlaceholder,
      isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      placeholder$$1 = isLib ? func : fallbackHolder,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isFunction': util.isFunction,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isFunction = helpers.isFunction,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert$1(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null) {
        nested[path[index]] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert$1(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    if (mapping.placeholder[realName]) {
      setPlaceholder = true;
      result.placeholder = func.placeholder = placeholder$$1;
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  if (setPlaceholder) {
    _.placeholder = placeholder$$1;
  }
  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

var _baseConvert = baseConvert$1;

var WeakMap$2 = _WeakMap;

/** Used to store function metadata. */
var metaMap$1 = WeakMap$2 && new WeakMap$2;

var _metaMap = metaMap$1;

var identity$3 = identity_1;
var metaMap = _metaMap;

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData$1 = !metaMap ? identity$3 : function(func, data) {
  metaMap.set(func, data);
  return func;
};

var _baseSetData = baseSetData$1;

var isObject$9 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$9(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate$1;

var baseCreate = _baseCreate;
var isObject$8 = isObject_1;

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor$1(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject$8(result) ? result : thisBinding;
  };
}

var _createCtor = createCtor$1;

var createCtor = _createCtor;
var root$9 = _root;

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$1 = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind$1(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG$1,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root$9 && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

var _createBind = createBind$1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$4 = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs$1(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax$4(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

var _composeArgs = composeArgs$1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$5 = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight$1(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax$5(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

var _composeArgsRight = composeArgsRight$1;

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders$1(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

var _countHolders = countHolders$1;

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash$1() {
  // No operation performed.
}

var _baseLodash = baseLodash$1;

var baseCreate$2 = _baseCreate;
var baseLodash = _baseLodash;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper$1(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper$1.prototype = baseCreate$2(baseLodash.prototype);
LazyWrapper$1.prototype.constructor = LazyWrapper$1;

var _LazyWrapper = LazyWrapper$1;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop$1() {
  // No operation performed.
}

var noop_1 = noop$1;

var metaMap$2 = _metaMap;
var noop = noop_1;

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData$3 = !metaMap$2 ? noop : function(func) {
  return metaMap$2.get(func);
};

var _getData = getData$3;

/** Used to lookup unminified function names. */
var realNames$1 = {};

var _realNames = realNames$1;

var realNames = _realNames;

/** Used for built-in method references. */
var objectProto$13 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$13.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName$1(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty$11.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

var _getFuncName = getFuncName$1;

var baseCreate$3 = _baseCreate;
var baseLodash$3 = _baseLodash;

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper$1(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper$1.prototype = baseCreate$3(baseLodash$3.prototype);
LodashWrapper$1.prototype.constructor = LodashWrapper$1;

var _LodashWrapper = LodashWrapper$1;

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray$1(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$1;

var LazyWrapper$3 = _LazyWrapper;
var LodashWrapper$2 = _LodashWrapper;
var copyArray = _copyArray;

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone$1(wrapper) {
  if (wrapper instanceof LazyWrapper$3) {
    return wrapper.clone();
  }
  var result = new LodashWrapper$2(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

var _wrapperClone = wrapperClone$1;

var LazyWrapper$2 = _LazyWrapper;
var LodashWrapper = _LodashWrapper;
var baseLodash$2 = _baseLodash;
var isArray$7 = isArray_1;
var isObjectLike$6 = isObjectLike_1;
var wrapperClone = _wrapperClone;

/** Used for built-in method references. */
var objectProto$14 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$12 = objectProto$14.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash$1(value) {
  if (isObjectLike$6(value) && !isArray$7(value) && !(value instanceof LazyWrapper$2)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty$12.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash$1.prototype = baseLodash$2.prototype;
lodash$1.prototype.constructor = lodash$1;

var wrapperLodash = lodash$1;

var LazyWrapper = _LazyWrapper;
var getData$2 = _getData;
var getFuncName = _getFuncName;
var lodash = wrapperLodash;

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable$1(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData$2(other);
  return !!data && func === data[0];
}

var _isLaziable = isLaziable$1;

var baseSetData$2 = _baseSetData;
var shortOut$2 = _shortOut;

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData$2 = shortOut$2(baseSetData$2);

var _setData = setData$2;

/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/;
var reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails$1(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

var _getWrapDetails = getWrapDetails$1;

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails$1(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

var _insertWrapDetails = insertWrapDetails$1;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach$1;

var baseIndexOf$2 = _baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes$1(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf$2(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes$1;

var arrayEach = _arrayEach;
var arrayIncludes = _arrayIncludes;

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$4 = 1;
var WRAP_BIND_KEY_FLAG$3 = 2;
var WRAP_CURRY_FLAG$3 = 8;
var WRAP_CURRY_RIGHT_FLAG$2 = 16;
var WRAP_PARTIAL_FLAG$2 = 32;
var WRAP_PARTIAL_RIGHT_FLAG$2 = 64;
var WRAP_ARY_FLAG$2 = 128;
var WRAP_REARG_FLAG = 256;
var WRAP_FLIP_FLAG$1 = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG$2],
  ['bind', WRAP_BIND_FLAG$4],
  ['bindKey', WRAP_BIND_KEY_FLAG$3],
  ['curry', WRAP_CURRY_FLAG$3],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG$2],
  ['flip', WRAP_FLIP_FLAG$1],
  ['partial', WRAP_PARTIAL_FLAG$2],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG$2],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails$1(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

var _updateWrapDetails = updateWrapDetails$1;

var getWrapDetails = _getWrapDetails;
var insertWrapDetails = _insertWrapDetails;
var setToString$2 = _setToString;
var updateWrapDetails = _updateWrapDetails;

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString$2(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString$2(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

var _setWrapToString = setWrapToString$2;

var isLaziable = _isLaziable;
var setData$1 = _setData;
var setWrapToString$1 = _setWrapToString;

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$3 = 1;
var WRAP_BIND_KEY_FLAG$2 = 2;
var WRAP_CURRY_BOUND_FLAG = 4;
var WRAP_CURRY_FLAG$2 = 8;
var WRAP_PARTIAL_FLAG$1 = 32;
var WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry$2(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG$2,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG$3 | WRAP_BIND_KEY_FLAG$2);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData$1(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString$1(result, func, bitmask);
}

var _createRecurry = createRecurry$2;

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder$2(func) {
  var object = func;
  return object.placeholder;
}

var _getHolder = getHolder$2;

var copyArray$2 = _copyArray;
var isIndex$3 = _isIndex;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin$1 = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder$1(array, indexes) {
  var arrLength = array.length,
      length = nativeMin$1(indexes.length, arrLength),
      oldArray = copyArray$2(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex$3(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

var _reorder = reorder$1;

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders$2(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

var _replaceHolders = replaceHolders$2;

var composeArgs = _composeArgs;
var composeArgsRight = _composeArgsRight;
var countHolders = _countHolders;
var createCtor$3 = _createCtor;
var createRecurry$1 = _createRecurry;
var getHolder$1 = _getHolder;
var reorder = _reorder;
var replaceHolders$1 = _replaceHolders;
var root$11 = _root;

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$2 = 1;
var WRAP_BIND_KEY_FLAG$1 = 2;
var WRAP_CURRY_FLAG$1 = 8;
var WRAP_CURRY_RIGHT_FLAG$1 = 16;
var WRAP_ARY_FLAG$1 = 128;
var WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid$2(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG$1,
      isBind = bitmask & WRAP_BIND_FLAG$2,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG$1,
      isCurried = bitmask & (WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG$1),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor$3(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder$1(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders$1(args, placeholder);
      return createRecurry$1(
        func, bitmask, createHybrid$2, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root$11 && this instanceof wrapper) {
      fn = Ctor || createCtor$3(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

var _createHybrid = createHybrid$2;

var apply$4 = _apply;
var createCtor$2 = _createCtor;
var createHybrid$1 = _createHybrid;
var createRecurry = _createRecurry;
var getHolder = _getHolder;
var replaceHolders = _replaceHolders;
var root$10 = _root;

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry$1(func, bitmask, arity) {
  var Ctor = createCtor$2(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid$1, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root$10 && this instanceof wrapper) ? Ctor : func;
    return apply$4(fn, this, args);
  }
  return wrapper;
}

var _createCurry = createCurry$1;

var apply$5 = _apply;
var createCtor$4 = _createCtor;
var root$12 = _root;

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$5 = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial$1(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$5,
      Ctor = createCtor$4(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root$12 && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply$5(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

var _createPartial = createPartial$1;

var composeArgs$2 = _composeArgs;
var composeArgsRight$2 = _composeArgsRight;
var replaceHolders$3 = _replaceHolders;

/** Used as the internal argument placeholder. */
var PLACEHOLDER$1 = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$6 = 1;
var WRAP_BIND_KEY_FLAG$4 = 2;
var WRAP_CURRY_BOUND_FLAG$1 = 4;
var WRAP_CURRY_FLAG$4 = 8;
var WRAP_ARY_FLAG$3 = 128;
var WRAP_REARG_FLAG$1 = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin$2 = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData$1(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG$6 | WRAP_BIND_KEY_FLAG$4 | WRAP_ARY_FLAG$3);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG$3) && (bitmask == WRAP_CURRY_FLAG$4)) ||
    ((srcBitmask == WRAP_ARY_FLAG$3) && (bitmask == WRAP_REARG_FLAG$1) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG$3 | WRAP_REARG_FLAG$1)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG$4));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG$6) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG$6 ? 0 : WRAP_CURRY_BOUND_FLAG$1;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs$2(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders$3(data[3], PLACEHOLDER$1) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight$2(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders$3(data[5], PLACEHOLDER$1) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG$3) {
    data[8] = data[8] == null ? source[8] : nativeMin$2(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

var _mergeData = mergeData$1;

var baseSetData = _baseSetData;
var createBind = _createBind;
var createCurry = _createCurry;
var createHybrid = _createHybrid;
var createPartial = _createPartial;
var getData$1 = _getData;
var mergeData = _mergeData;
var setData = _setData;
var setWrapToString = _setWrapToString;
var toInteger$3 = toInteger_1;

/** Error message constants. */
var FUNC_ERROR_TEXT$2 = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;
var WRAP_BIND_KEY_FLAG = 2;
var WRAP_CURRY_FLAG = 8;
var WRAP_CURRY_RIGHT_FLAG = 16;
var WRAP_PARTIAL_FLAG = 32;
var WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$3 = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap$1(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax$3(toInteger$3(ary), 0);
  arity = arity === undefined ? arity : toInteger$3(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData$1(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax$3(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

var _createWrap = createWrap$1;

var createWrap = _createWrap;

/** Used to compose bitmasks for function metadata. */
var WRAP_ARY_FLAG = 128;

/**
 * Creates a function that invokes `func`, with up to `n` arguments,
 * ignoring any additional arguments.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new capped function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = (func && n == null) ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}

var ary_1 = ary;

var copyObject$2 = _copyObject;
var keys$3 = keys_1;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject$2(source, keys$3(source), object);
}

var _baseAssign = baseAssign;

var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3;
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

var ListCache$4 = _ListCache;
var Map$3 = _Map;
var MapCache$2 = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$4) {
    var pairs = data.__data__;
    if (!Map$3 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache$2 = _ListCache;
var stackClear = _stackClear;
var stackDelete = _stackDelete;
var stackGet = _stackGet;
var stackHas = _stackHas;
var stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$1(entries) {
  var data = this.__data__ = new ListCache$2(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$1.prototype.clear = stackClear;
Stack$1.prototype['delete'] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;

var _Stack = Stack$1;

var copyObject$3 = _copyObject;
var keysIn$3 = keysIn_1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn$1(object, source) {
  return object && copyObject$3(source, keysIn$3(source), object);
}

var _baseAssignIn = baseAssignIn$1;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
var root = _root;

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter$1;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray$1() {
  return [];
}

var stubArray_1 = stubArray$1;

var arrayFilter = _arrayFilter;
var stubArray = stubArray_1;

/** Used for built-in method references. */
var objectProto$15 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$15.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$1 = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols$1;

var copyObject$4 = _copyObject;
var getSymbols = _getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols$1(source, object) {
  return copyObject$4(source, getSymbols(source), object);
}

var _copySymbols = copySymbols$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush$1(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$1;

var overArg$2 = _overArg;

/** Built-in value references. */
var getPrototype$1 = overArg$2(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$1;

var arrayPush = _arrayPush;
var getPrototype = _getPrototype;
var getSymbols$2 = _getSymbols;
var stubArray$2 = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn$1 = !nativeGetSymbols$1 ? stubArray$2 : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$2(object));
    object = getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn$1;

var copyObject$5 = _copyObject;
var getSymbolsIn = _getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn$1(source, object) {
  return copyObject$5(source, getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn$1;

var arrayPush$2 = _arrayPush;
var isArray$9 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$9(object) ? result : arrayPush$2(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$1;

var baseGetAllKeys = _baseGetAllKeys;
var getSymbols$3 = _getSymbols;
var keys$5 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys(object, keys$5, getSymbols$3);
}

var _getAllKeys = getAllKeys$1;

var baseGetAllKeys$2 = _baseGetAllKeys;
var getSymbolsIn$2 = _getSymbolsIn;
var keysIn$4 = keysIn_1;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn$1(object) {
  return baseGetAllKeys$2(object, keysIn$4, getSymbolsIn$2);
}

var _getAllKeysIn = getAllKeysIn$1;

/** Used for built-in method references. */
var objectProto$16 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$13 = objectProto$16.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray$1(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$13.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray$1;

var root$13 = _root;

/** Built-in value references. */
var Uint8Array$1 = root$13.Uint8Array;

var _Uint8Array = Uint8Array$1;

var Uint8Array = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$1(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer$1;

var cloneArrayBuffer$2 = _cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView$1;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry$1(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

var _addMapEntry = addMapEntry$1;

var addMapEntry = _addMapEntry;
var arrayReduce$2 = _arrayReduce;
var mapToArray$2 = _mapToArray;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap$1(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray$2(map), CLONE_DEEP_FLAG$1) : mapToArray$2(map);
  return arrayReduce$2(array, addMapEntry, new map.constructor);
}

var _cloneMap = cloneMap$1;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp$1;

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry$1(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

var _addSetEntry = addSetEntry$1;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray$1(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray$1;

var addSetEntry = _addSetEntry;
var arrayReduce$3 = _arrayReduce;
var setToArray = _setToArray;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$2 = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet$1(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG$2) : setToArray(set);
  return arrayReduce$3(array, addSetEntry, new set.constructor);
}

var _cloneSet = cloneSet$1;

var Symbol$5 = _Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$5 ? Symbol$5.prototype : undefined;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol$1;

var cloneArrayBuffer$3 = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$3(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray$1;

var cloneArrayBuffer = _cloneArrayBuffer;
var cloneDataView = _cloneDataView;
var cloneMap = _cloneMap;
var cloneRegExp = _cloneRegExp;
var cloneSet = _cloneSet;
var cloneSymbol = _cloneSymbol;
var cloneTypedArray = _cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var mapTag$5 = '[object Map]';
var numberTag$2 = '[object Number]';
var regexpTag$2 = '[object RegExp]';
var setTag$5 = '[object Set]';
var stringTag$3 = '[object String]';
var symbolTag$2 = '[object Symbol]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag$1(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);

    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);

    case dataViewTag$3:
      return cloneDataView(object, isDeep);

    case float32Tag$2: case float64Tag$2:
    case int8Tag$2: case int16Tag$2: case int32Tag$2:
    case uint8Tag$2: case uint8ClampedTag$2: case uint16Tag$2: case uint32Tag$2:
      return cloneTypedArray(object, isDeep);

    case mapTag$5:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag$2:
    case stringTag$3:
      return new Ctor(object);

    case regexpTag$2:
      return cloneRegExp(object);

    case setTag$5:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag$2:
      return cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag$1;

var baseCreate$4 = _baseCreate;
var getPrototype$2 = _getPrototype;
var isPrototype$4 = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$1(object) {
  return (typeof object.constructor == 'function' && !isPrototype$4(object))
    ? baseCreate$4(getPrototype$2(object))
    : {};
}

var _initCloneObject = initCloneObject$1;

var Stack = _Stack;
var arrayEach$2 = _arrayEach;
var assignValue$2 = _assignValue;
var baseAssign$1 = _baseAssign;
var baseAssignIn = _baseAssignIn;
var cloneBuffer = _cloneBuffer;
var copyArray$3 = _copyArray;
var copySymbols = _copySymbols;
var copySymbolsIn = _copySymbolsIn;
var getAllKeys = _getAllKeys;
var getAllKeysIn = _getAllKeysIn;
var getTag$3 = _getTag;
var initCloneArray = _initCloneArray;
var initCloneByTag = _initCloneByTag;
var initCloneObject = _initCloneObject;
var isArray$8 = isArray_1;
var isBuffer$2 = isBuffer_1;
var isObject$10 = isObject_1;
var keys$4 = keys_1;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$2 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var mapTag$4 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$2 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$4 = '[object Set]';
var stringTag$2 = '[object String]';
var symbolTag$1 = '[object Symbol]';
var weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$2 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$2] =
cloneableTags[boolTag$1] = cloneableTags[dateTag$1] =
cloneableTags[float32Tag$1] = cloneableTags[float64Tag$1] =
cloneableTags[int8Tag$1] = cloneableTags[int16Tag$1] =
cloneableTags[int32Tag$1] = cloneableTags[mapTag$4] =
cloneableTags[numberTag$1] = cloneableTags[objectTag$2] =
cloneableTags[regexpTag$1] = cloneableTags[setTag$4] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] =
cloneableTags[uint8Tag$1] = cloneableTags[uint8ClampedTag$1] =
cloneableTags[uint16Tag$1] = cloneableTags[uint32Tag$1] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
cloneableTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject$10(value)) {
    return value;
  }
  var isArr = isArray$8(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray$3(value, result);
    }
  } else {
    var tag = getTag$3(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer$2(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$2 || tag == argsTag$2 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign$1(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone$1, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys$4);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach$2(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue$2(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone$1;

var baseClone = _baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

var clone_1 = clone;

var createWrap$2 = _createWrap;

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG$5 = 8;

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap$2(func, WRAP_CURRY_FLAG$5, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// Assign default placeholders.
curry.placeholder = {};

var curry_1 = curry;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd$1;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas$1(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas$1;

var MapCache$3 = _MapCache;
var setCacheAdd = _setCacheAdd;
var setCacheHas = _setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache$1(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache$3;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;

var _SetCache = SetCache$1;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome$1;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas$1(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas$1;

var SetCache = _SetCache;
var arraySome = _arraySome;
var cacheHas = _cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays$1(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$1) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays$1;

var Symbol$6 = _Symbol;
var Uint8Array$2 = _Uint8Array;
var eq$5 = eq_1;
var equalArrays$2 = _equalArrays;
var mapToArray$3 = _mapToArray;
var setToArray$2 = _setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag$3 = '[object Boolean]';
var dateTag$3 = '[object Date]';
var errorTag$2 = '[object Error]';
var mapTag$6 = '[object Map]';
var numberTag$3 = '[object Number]';
var regexpTag$3 = '[object RegExp]';
var setTag$6 = '[object Set]';
var stringTag$4 = '[object String]';
var symbolTag$3 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]';
var dataViewTag$4 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol$6 ? Symbol$6.prototype : undefined;
var symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$4:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$3:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
        return false;
      }
      return true;

    case boolTag$3:
    case dateTag$3:
    case numberTag$3:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq$5(+object, +other);

    case errorTag$2:
      return object.name == other.name && object.message == other.message;

    case regexpTag$3:
    case stringTag$4:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$6:
      var convert = mapToArray$3;

    case setTag$6:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3;
      convert || (convert = setToArray$2);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays$2(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$3:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag$1;

var getAllKeys$2 = _getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1;

/** Used for built-in method references. */
var objectProto$18 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$15 = objectProto$18.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4,
      objProps = getAllKeys$2(object),
      objLength = objProps.length,
      othProps = getAllKeys$2(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$15.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects$1;

var Stack$3 = _Stack;
var equalArrays = _equalArrays;
var equalByTag = _equalByTag;
var equalObjects = _equalObjects;
var getTag$4 = _getTag;
var isArray$11 = isArray_1;
var isBuffer$3 = isBuffer_1;
var isTypedArray$3 = isTypedArray_1;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';
var arrayTag$2 = '[object Array]';
var objectTag$3 = '[object Object]';

/** Used for built-in method references. */
var objectProto$17 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$14 = objectProto$17.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$11(object),
      othIsArr = isArray$11(other),
      objTag = objIsArr ? arrayTag$2 : getTag$4(object),
      othTag = othIsArr ? arrayTag$2 : getTag$4(other);

  objTag = objTag == argsTag$3 ? objectTag$3 : objTag;
  othTag = othTag == argsTag$3 ? objectTag$3 : othTag;

  var objIsObj = objTag == objectTag$3,
      othIsObj = othTag == objectTag$3,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer$3(object)) {
    if (!isBuffer$3(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$3);
    return (objIsArr || isTypedArray$3(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$1)) {
    var objIsWrapped = objIsObj && hasOwnProperty$14.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$14.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack$3);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$3);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep$1;

var baseIsEqualDeep = _baseIsEqualDeep;
var isObjectLike$7 = isObjectLike_1;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual$1(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike$7(value) && !isObjectLike$7(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$1, stack);
}

var _baseIsEqual = baseIsEqual$1;

var Stack$2 = _Stack;
var baseIsEqual = _baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch$1(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack$2;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch$1;

var isObject$11 = isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable$1(value) {
  return value === value && !isObject$11(value);
}

var _isStrictComparable = isStrictComparable$1;

var isStrictComparable = _isStrictComparable;
var keys$6 = keys_1;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData$1(object) {
  var result = keys$6(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData$1;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable$1(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable$1;

var baseIsMatch = _baseIsMatch;
var getMatchData = _getMatchData;
var matchesStrictComparable = _matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches$1;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn$1;

var castPath$2 = _castPath;
var isArguments$3 = isArguments_1;
var isArray$12 = isArray_1;
var isIndex$4 = _isIndex;
var isLength$3 = isLength_1;
var toKey$4 = _toKey;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath$1(object, path, hasFunc) {
  path = castPath$2(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey$4(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength$3(length) && isIndex$4(key, length) &&
    (isArray$12(object) || isArguments$3(object));
}

var _hasPath = hasPath$1;

var baseHasIn = _baseHasIn;
var hasPath = _hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

var hasIn_1 = hasIn$1;

var baseIsEqual$2 = _baseIsEqual;
var get$4 = get_1;
var hasIn = hasIn_1;
var isKey$3 = _isKey;
var isStrictComparable$2 = _isStrictComparable;
var matchesStrictComparable$2 = _matchesStrictComparable;
var toKey$3 = _toKey;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$3(path) && isStrictComparable$2(srcValue)) {
    return matchesStrictComparable$2(toKey$3(path), srcValue);
  }
  return function(object) {
    var objValue = get$4(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual$2(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty$1;

var baseMatches = _baseMatches;
var baseMatchesProperty = _baseMatchesProperty;
var identity$4 = identity_1;
var isArray$10 = isArray_1;
var property$2 = property_1$1;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee$1(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity$4;
  }
  if (typeof value == 'object') {
    return isArray$10(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property$2(value);
}

var _baseIteratee = baseIteratee$1;

var baseClone$2 = _baseClone;
var baseIteratee = _baseIteratee;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$3 = 1;

/**
 * Creates a function that invokes `func` with the arguments of the created
 * function. If `func` is a property name, the created function returns the
 * property value for a given element. If `func` is an array or object, the
 * created function returns `true` for elements that contain the equivalent
 * source properties, otherwise it returns `false`.
 *
 * @static
 * @since 4.0.0
 * @memberOf _
 * @category Util
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
 * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, _.iteratee(['user', 'fred']));
 * // => [{ 'user': 'fred', 'age': 40 }]
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, _.iteratee('user'));
 * // => ['barney', 'fred']
 *
 * // Create custom iteratee shorthands.
 * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
 *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
 *     return func.test(string);
 *   };
 * });
 *
 * _.filter(['abc', 'def'], /ef/);
 * // => ['def']
 */
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone$2(func, CLONE_DEEP_FLAG$3));
}

var iteratee_1 = iteratee;

var Symbol$7 = _Symbol;
var isArguments$4 = isArguments_1;
var isArray$13 = isArray_1;

/** Built-in value references. */
var spreadableSymbol = Symbol$7 ? Symbol$7.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable$1(value) {
  return isArray$13(value) || isArguments$4(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable$1;

var arrayPush$3 = _arrayPush;
var isFlattenable = _isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush$3(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten$1;

var baseFlatten = _baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

var flatten_1 = flatten$1;

var flatten = flatten_1;
var overRest$2 = _overRest;
var setToString$3 = _setToString;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest$1(func) {
  return setToString$3(overRest$2(func, undefined, flatten), func + '');
}

var _flatRest = flatRest$1;

var createWrap$3 = _createWrap;
var flatRest = _flatRest;

/** Used to compose bitmasks for function metadata. */
var WRAP_REARG_FLAG$2 = 256;

/**
 * Creates a function that invokes `func` with arguments arranged according
 * to the specified `indexes` where the argument value at the first index is
 * provided as the first argument, the argument value at the second index is
 * provided as the second argument, and so on.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to rearrange arguments for.
 * @param {...(number|number[])} indexes The arranged argument indexes.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var rearged = _.rearg(function(a, b, c) {
 *   return [a, b, c];
 * }, [2, 0, 1]);
 *
 * rearged('b', 'c', 'a')
 * // => ['a', 'b', 'c']
 */
var rearg = flatRest(function(func, indexes) {
  return createWrap$3(func, WRAP_REARG_FLAG$2, undefined, undefined, undefined, indexes);
});

var rearg_1 = rearg;

var arrayMap$4 = _arrayMap;
var copyArray$4 = _copyArray;
var isArray$14 = isArray_1;
var isSymbol$5 = isSymbol_1;
var stringToPath$2 = _stringToPath;
var toKey$5 = _toKey;
var toString$6 = toString_1;

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray$14(value)) {
    return arrayMap$4(value, toKey$5);
  }
  return isSymbol$5(value) ? [value] : copyArray$4(stringToPath$2(toString$6(value)));
}

var toPath_1 = toPath;

var _util = {
  'ary': ary_1,
  'assign': _baseAssign,
  'clone': clone_1,
  'curry': curry_1,
  'forEach': _arrayEach,
  'isArray': isArray_1,
  'isFunction': isFunction_1,
  'iteratee': iteratee_1,
  'keys': _baseKeys,
  'rearg': rearg_1,
  'toInteger': toInteger_1,
  'toPath': toPath_1
};

var baseConvert = _baseConvert;
var util = _util;

/**
 * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
 * version with conversion `options` applied. If `name` is an object its methods
 * will be converted.
 *
 * @param {string} name The name of the function to wrap.
 * @param {Function} [func] The function to wrap.
 * @param {Object} [options] The options object. See `baseConvert` for more details.
 * @returns {Function|Object} Returns the converted function or object.
 */
function convert$1(name, func, options) {
  return baseConvert(util, name, func, options);
}

var convert_1 = convert$1;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor$1;

var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$1 = createBaseFor();

var _baseFor = baseFor$1;

var baseFor = _baseFor;
var keys$7 = keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys$7);
}

var _baseForOwn = baseForOwn$1;

var isArrayLike$6 = isArrayLike_1;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$6(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach$1;

var baseForOwn = _baseForOwn;
var createBaseEach = _createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach$1 = createBaseEach(baseForOwn);

var _baseEach = baseEach$1;

var identity$5 = identity_1;

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction$1(value) {
  return typeof value == 'function' ? value : identity$5;
}

var _castFunction = castFunction$1;

var arrayEach$3 = _arrayEach;
var baseEach = _baseEach;
var castFunction = _castFunction;
var isArray$15 = isArray_1;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach$3(collection, iteratee) {
  var func = isArray$15(collection) ? arrayEach$3 : baseEach;
  return func(collection, castFunction(iteratee));
}

var forEach_1 = forEach$3;

var convert = convert_1;
var func = convert('forEach', forEach_1);

func.placeholder = placeholder;
var forEach$1 = func;

var each = forEach$1;

var _falseOptions = {
  'cap': false,
  'curry': false,
  'fixed': false,
  'immutable': false,
  'rearg': false
};

var convert$2 = convert_1;
var func$1 = convert$2('toPairs', toPairs_1, _falseOptions);

func$1.placeholder = placeholder;
var toPairs$1 = func$1;

var entries$2 = toPairs$1;

var convert$3 = convert_1;
var func$2 = convert$3('flatten', flatten_1, _falseOptions);

func$2.placeholder = placeholder;

var LodashWrapper$3 = _LodashWrapper;
var flatRest$2 = _flatRest;
var getData$4 = _getData;
var getFuncName$2 = _getFuncName;
var isArray$16 = isArray_1;
var isLaziable$2 = _isLaziable;

/** Error message constants. */
var FUNC_ERROR_TEXT$3 = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG$6 = 8;
var WRAP_PARTIAL_FLAG$3 = 32;
var WRAP_ARY_FLAG$4 = 128;
var WRAP_REARG_FLAG$3 = 256;

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow$1(fromRight) {
  return flatRest$2(function(funcs) {
    var length = funcs.length,
        index = length,
        prereq = LodashWrapper$3.prototype.thru;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      var func = funcs[index];
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT$3);
      }
      if (prereq && !wrapper && getFuncName$2(func) == 'wrapper') {
        var wrapper = new LodashWrapper$3([], true);
      }
    }
    index = wrapper ? index : length;
    while (++index < length) {
      func = funcs[index];

      var funcName = getFuncName$2(func),
          data = funcName == 'wrapper' ? getData$4(func) : undefined;

      if (data && isLaziable$2(data[0]) &&
            data[1] == (WRAP_ARY_FLAG$4 | WRAP_CURRY_FLAG$6 | WRAP_PARTIAL_FLAG$3 | WRAP_REARG_FLAG$3) &&
            !data[4].length && data[9] == 1
          ) {
        wrapper = wrapper[getFuncName$2(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = (func.length == 1 && isLaziable$2(func))
          ? wrapper[funcName]()
          : wrapper.thru(func);
      }
    }
    return function() {
      var args = arguments,
          value = args[0];

      if (wrapper && args.length == 1 && isArray$16(value)) {
        return wrapper.plant(value).value();
      }
      var index = 0,
          result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

var _createFlow = createFlow$1;

var createFlow = _createFlow;

/**
 * Creates a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see _.flowRight
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow([_.add, square]);
 * addSquare(1, 2);
 * // => 9
 */
var flow$2 = createFlow();

var flow_1 = flow$2;

var convert$4 = convert_1;
var func$3 = convert$4('flow', flow_1);

func$3.placeholder = placeholder;
var flow = func$3;

var isRecord = (function (o) {
  // needs more accurate heuristics, but this is a decent (naive) test
  return isFunction_1(o.hasChanges);
});

var applyKV = function applyKV(record, values) {
  var set$$1 = flow(entries$2, each(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    record[key] = value;
  }));
  set$$1(values);
  return record;
};

var format = function format(name) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (prefix === '') {
    return camelCase_1(name);
  } else {
    return '' + camelCase_1(prefix) + capWords(name);
  }
};

/**
 * create a dataflow mixin for a given value prop.
 *
 * a 'value' dataflow implements the `v-model` interface.
 *
 * custom dataflows follow a pattern: methods are prefixed with the `valueProp`
 * name and `update:${valueProp}` is emitted.
 *
 * TODO syntax sugar <https://github.com/vuejs/vue/issues/4946>
 * TODO ensure that all of these methods correctly trigger change tracking in js-data
 *
 * @param {string} valueProp - bind dataflow to this prop
 */
var createSyncMixin = (function (valueProp) {
  var _methods;

  var event = valueProp === 'value' ? 'input' : 'update:' + valueProp;
  var prefix = valueProp === 'value' ? '' : valueProp;
  return {
    methods: (_methods = {}, defineProperty$1(_methods, format('forwardInput', prefix), function (e) {
      this.$emit(event, e);
    }), defineProperty$1(_methods, format('handleChange', prefix), function (value) {
      if (isRecord(this[valueProp])) {
        var record = this.$store.createRecord('flow_pages', this[valueProp]);
        this.$emit(event, applyKV(record, value));
      } else {
        this.$emit(event, _extends({}, this[valueProp], value));
      }
    }), defineProperty$1(_methods, format('handleKeyChange', prefix), function (key, value) {
      this.handleChange(defineProperty$1({}, key, _extends({}, this[valueProp][key], value)));
    }), defineProperty$1(_methods, format('handleArrayKeyChange', prefix), function (i, key, value) {
      var arr = [].concat(toConsumableArray$1(this[valueProp][key]));
      arr[i] = _extends({}, arr[i], value);
      this.handleChange(defineProperty$1({}, key, arr));
    }), defineProperty$1(_methods, format('handleArrayChange', prefix), function (i, value) {
      var arr = [].concat(toConsumableArray$1(this[valueProp]));
      arr[i] = _extends({}, arr[i], value);
      this.$emit(event, arr);
    }), defineProperty$1(_methods, format('pushToArray', prefix), function (value) {
      var arr = [].concat(toConsumableArray$1(this[valueProp]));
      arr.push(value);
      this.$emit(event, arr);
    }), defineProperty$1(_methods, format('pushToArrayKey', prefix), function (key, value) {
      var arr = [].concat(toConsumableArray$1(this[valueProp][key]));
      arr.push(value);
      this.handleChange(defineProperty$1({}, key, arr));
    }), defineProperty$1(_methods, format('removeFromArray', prefix), function (i) {
      var value = [].concat(toConsumableArray$1(this[valueProp]));
      value.splice(i, 1);
      this.$emit(event, value);
    }), defineProperty$1(_methods, format('removeFromArrayKey', prefix), function (i, key) {
      var arr = [].concat(toConsumableArray$1(this[valueProp][key]));
      arr.splice(i, 1);
      this.handleChange(defineProperty$1({}, key, arr));
    }), _methods)
  };
});

var DataFlowMixin = createSyncMixin('value');

exports.vdata = vdata;
exports.createSyncMixin = createSyncMixin;
exports.DataFlowMixin = DataFlowMixin;
