!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.vdata = e() : t.vdata = e();
}(this, function() {
    /******/
    return function(t) {
        /******/
        /******/
        // The require function
        /******/
        function e(r) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (n[r]) /******/
            return n[r].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var i = n[r] = {
                /******/
                i: r,
                /******/
                l: !1,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var n = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // identity function for calling harmony imports with the correct context
        /******/
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return e.m = t, e.c = n, e.i = function(t) {
            return t;
        }, e.d = function(t, n, r) {
            /******/
            e.o(t, n) || /******/
            Object.defineProperty(t, n, {
                /******/
                configurable: !1,
                /******/
                enumerable: !0,
                /******/
                get: r
            });
        }, e.n = function(t) {
            /******/
            var n = t && t.__esModule ? /******/
            function() {
                return t.default;
            } : /******/
            function() {
                return t;
            };
            /******/
            /******/
            return e.d(n, "a", n), n;
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, e.p = "", e(e.s = 388);
    }([ /* 0 */
    /***/
    function(t, e) {
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
        var n = Array.isArray;
        t.exports = n;
    }, /* 1 */
    /***/
    function(t, e) {
        var n = t.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = n);
    }, /* 2 */
    /***/
    function(t, e, n) {
        var r = n(68)("wks"), i = n(44), o = n(5).Symbol, a = "function" == typeof o;
        (t.exports = function(t) {
            return r[t] || (r[t] = a && o[t] || (a ? o : i)("Symbol." + t));
        }).store = r;
    }, /* 3 */
    /***/
    function(t, e, n) {
        var r = n(140), i = "object" == typeof self && self && self.Object === Object && self, o = r || i || Function("return this")();
        t.exports = o;
    }, /* 4 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e);
        };
    }, /* 5 */
    /***/
    function(t, e) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n);
    }, /* 6 */
    /***/
    function(t, e, n) {
        var r = n(7), i = n(100), o = n(71), a = Object.defineProperty;
        e.f = n(8) ? Object.defineProperty : function(t, e, n) {
            if (r(t), e = o(e, !0), r(n), i) try {
                return a(t, e, n);
            } catch (t) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (t[e] = n.value), t;
        };
    }, /* 7 */
    /***/
    function(t, e, n) {
        var r = n(29);
        t.exports = function(t) {
            if (!r(t)) throw TypeError(t + " is not an object!");
            return t;
        };
    }, /* 8 */
    /***/
    function(t, e, n) {
        // Thank's IE8 for his funny defineProperty
        t.exports = !n(17)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 9 */
    /***/
    function(t, e, n) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var r = n(101), i = n(63);
        t.exports = function(t) {
            return r(i(t));
        };
    }, /* 10 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t) {
            return null != t && "object" == typeof t;
        };
    }, /* 11 */
    /***/
    function(t, e, n) {
        var r = n(118), i = n(84), o = n(23);
        t.exports = /**
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
        function(t) {
            return o(t) ? r(t) : i(t);
        };
    }, /* 12 */
    /***/
    function(t, e, n) {
        var r = n(5), i = n(1), o = n(28), a = n(14), u = "prototype", c = function(t, e, n) {
            var s, f, l, p = t & c.F, d = t & c.G, h = t & c.S, v = t & c.P, y = t & c.B, g = t & c.W, m = d ? i : i[e] || (i[e] = {}), x = m[u], b = d ? r : h ? r[e] : (r[e] || {})[u];
            d && (n = e);
            for (s in n) // contains in native
            (f = !p && b && void 0 !== b[s]) && s in m || (// export native or passed
            l = f ? b[s] : n[s], // prevent global pollution for namespaces
            m[s] = d && "function" != typeof b[s] ? n[s] : y && f ? o(l, r) : g && b[s] == l ? function(t) {
                var e = function(e, n, r) {
                    if (this instanceof t) {
                        switch (arguments.length) {
                          case 0:
                            return new t();

                          case 1:
                            return new t(e);

                          case 2:
                            return new t(e, n);
                        }
                        return new t(e, n, r);
                    }
                    return t.apply(this, arguments);
                };
                return e[u] = t[u], e;
            }(l) : v && "function" == typeof l ? o(Function.call, l) : l, // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
            v && ((m.virtual || (m.virtual = {}))[s] = l, // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            t & c.R && x && !x[s] && a(x, s, l)));
        };
        // type bitmap
        c.F = 1, // forced
        c.G = 2, // global
        c.S = 4, // static
        c.P = 8, // proto
        c.B = 16, // bind
        c.W = 32, // wrap
        c.U = 64, // safe
        c.R = 128, // real proto method for `library` 
        t.exports = c;
    }, /* 13 */
    /***/
    function(t, e) {
        var n = {}.hasOwnProperty;
        t.exports = function(t, e) {
            return n.call(t, e);
        };
    }, /* 14 */
    /***/
    function(t, e, n) {
        var r = n(6), i = n(31);
        t.exports = n(8) ? function(t, e, n) {
            return r.f(t, e, i(1, n));
        } : function(t, e, n) {
            return t[e] = n, t;
        };
    }, /* 15 */
    /***/
    function(t, e, n) {
        var r = n(80), i = n(81);
        t.exports = /**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
        function(t, e, n, o) {
            var a = !n;
            n || (n = {});
            for (var u = -1, c = e.length; ++u < c; ) {
                var s = e[u], f = o ? o(n[s], t[s], s, n, t) : void 0;
                void 0 === f && (f = t[s]), a ? i(n, s, f) : r(n, s, f);
            }
            return n;
        };
    }, /* 16 */
    /***/
    function(t, e, n) {
        var r = n(249), i = n(288);
        t.exports = /**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
        function(t, e) {
            var n = i(t, e);
            return r(n) ? n : void 0;
        };
    }, /* 17 */
    /***/
    function(t, e) {
        t.exports = function(t) {
            try {
                return !!t();
            } catch (t) {
                return !0;
            }
        };
    }, /* 18 */
    /***/
    function(t, e) {
        t.exports = {};
    }, /* 19 */
    /***/
    function(t, e, n) {
        var r = n(3).Symbol;
        t.exports = r;
    }, /* 20 */
    /***/
    function(t, e, n) {
        var r = n(19), i = n(287), o = n(319), a = "[object Null]", u = "[object Undefined]", c = r ? r.toStringTag : void 0;
        t.exports = /**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
        function(t) {
            return null == t ? void 0 === t ? u : a : c && c in Object(t) ? i(t) : o(t);
        };
    }, /* 21 */
    /***/
    function(t, e) {
        t.exports = /**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
        function(t, e) {
            var n = -1, r = t.length;
            for (e || (e = Array(r)); ++n < r; ) e[n] = t[n];
            return e;
        };
    }, /* 22 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t, e) {
            return t === e || t != t && e != e;
        };
    }, /* 23 */
    /***/
    function(t, e, n) {
        var r = n(25), i = n(97);
        t.exports = /**
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
        function(t) {
            return null != t && i(t.length) && !r(t);
        };
    }, /* 24 */
    /***/
    function(t, e, n) {
        /* WEBPACK VAR INJECTION */
        (function(t) {
            var r = n(3), i = n(369), o = "object" == typeof e && e && !e.nodeType && e, a = o && "object" == typeof t && t && !t.nodeType && t, u = a && a.exports === o ? r.Buffer : void 0, c = (u ? u.isBuffer : void 0) || i;
            t.exports = c;
        }).call(e, n(98)(t));
    }, /* 25 */
    /***/
    function(t, e, n) {
        var r = n(20), i = n(4), o = "[object AsyncFunction]", a = "[object Function]", u = "[object GeneratorFunction]", c = "[object Proxy]";
        t.exports = /**
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
        function(t) {
            if (!i(t)) return !1;
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 9 which returns 'object' for typed arrays and other constructors.
            var e = r(t);
            return e == a || e == u || e == o || e == c;
        };
    }, /* 26 */
    /***/
    function(t, e, n) {
        var r = n(260);
        t.exports = /**
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
        function(t) {
            return null == t ? "" : r(t);
        };
    }, /* 27 */
    /***/
    function(t, e) {
        var n = {}.toString;
        t.exports = function(t) {
            return n.call(t).slice(8, -1);
        };
    }, /* 28 */
    /***/
    function(t, e, n) {
        // optional / simple context binding
        var r = n(61);
        t.exports = function(t, e, n) {
            if (r(t), void 0 === e) return t;
            switch (n) {
              case 1:
                return function(n) {
                    return t.call(e, n);
                };

              case 2:
                return function(n, r) {
                    return t.call(e, n, r);
                };

              case 3:
                return function(n, r, i) {
                    return t.call(e, n, r, i);
                };
            }
            return function() {
                return t.apply(e, arguments);
            };
        };
    }, /* 29 */
    /***/
    function(t, e) {
        t.exports = function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t;
        };
    }, /* 30 */
    /***/
    function(t, e, n) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var r = n(110), i = n(65);
        t.exports = Object.keys || function(t) {
            return r(t, i);
        };
    }, /* 31 */
    /***/
    function(t, e) {
        t.exports = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            };
        };
    }, /* 32 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(209)(!0);
        // 21.1.3.27 String.prototype[@@iterator]()
        n(104)(String, "String", function(t) {
            this._t = String(t), // target
            this._i = 0;
        }, function() {
            var t, e = this._t, n = this._i;
            return n >= e.length ? {
                value: void 0,
                done: !0
            } : (t = r(e, n), this._i += t.length, {
                value: t,
                done: !1
            });
        });
    }, /* 33 */
    /***/
    function(t, e, n) {
        var r = n(4), i = Object.create, o = function() {
            function t() {}
            return function(e) {
                if (!r(e)) return {};
                if (i) return i(e);
                t.prototype = e;
                var n = new t();
                return t.prototype = void 0, n;
            };
        }();
        t.exports = o;
    }, /* 34 */
    /***/
    function(t, e) {
        /** Used for built-in method references. */
        var n = Object.prototype;
        t.exports = /**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
        function(t) {
            var e = t && t.constructor;
            return t === ("function" == typeof e && e.prototype || n);
        };
    }, /* 35 */
    /***/
    function(t, e, n) {
        var r = n(37), i = 1 / 0;
        t.exports = /**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
        function(t) {
            if ("string" == typeof t || r(t)) return t;
            var e = t + "";
            return "0" == e && 1 / t == -i ? "-0" : e;
        };
    }, /* 36 */
    /***/
    function(t, e, n) {
        var r = n(245), i = n(10), o = Object.prototype, a = o.hasOwnProperty, u = o.propertyIsEnumerable, c = r(function() {
            return arguments;
        }()) ? r : function(t) {
            return i(t) && a.call(t, "callee") && !u.call(t, "callee");
        };
        t.exports = c;
    }, /* 37 */
    /***/
    function(t, e, n) {
        var r = n(20), i = n(10), o = "[object Symbol]";
        t.exports = /**
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
        function(t) {
            return "symbol" == typeof t || i(t) && r(t) == o;
        };
    }, /* 38 */
    /***/
    function(t, e, n) {
        var r = n(250), i = n(261), o = n(318), a = o && o.isTypedArray, u = a ? i(a) : r;
        t.exports = u;
    }, /* 39 */
    /***/
    function(t, e, n) {
        var r = n(118), i = n(251), o = n(23);
        t.exports = /**
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
        function(t) {
            return o(t) ? r(t, !0) : i(t);
        };
    }, /* 40 */
    /***/
    function(t, e) {
        t.exports = !0;
    }, /* 41 */
    /***/
    function(t, e) {
        e.f = {}.propertyIsEnumerable;
    }, /* 42 */
    /***/
    function(t, e, n) {
        var r = n(6).f, i = n(13), o = n(2)("toStringTag");
        t.exports = function(t, e, n) {
            t && !i(t = n ? t : t.prototype, o) && r(t, o, {
                configurable: !0,
                value: e
            });
        };
    }, /* 43 */
    /***/
    function(t, e, n) {
        // 7.1.13 ToObject(argument)
        var r = n(63);
        t.exports = function(t) {
            return Object(r(t));
        };
    }, /* 44 */
    /***/
    function(t, e) {
        var n = 0, r = Math.random();
        t.exports = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36));
        };
    }, /* 45 */
    /***/
    function(t, e, n) {
        n(214);
        for (var r = n(5), i = n(14), o = n(18), a = n(2)("toStringTag"), u = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], c = 0; c < 5; c++) {
            var s = u[c], f = r[s], l = f && f.prototype;
            l && !l[a] && i(l, a, s), o[s] = o.Array;
        }
    }, /* 46 */
    /***/
    function(t, e, n) {
        /**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
        function r(t) {
            var e = -1, n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n; ) {
                var r = t[e];
                this.set(r[0], r[1]);
            }
        }
        var i = n(304), o = n(305), a = n(306), u = n(307), c = n(308);
        // Add methods to `ListCache`.
        r.prototype.clear = i, r.prototype.delete = o, r.prototype.get = a, r.prototype.has = u, 
        r.prototype.set = c, t.exports = r;
    }, /* 47 */
    /***/
    function(t, e, n) {
        /**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
        function r(t) {
            var e = this.__data__ = new i(t);
            this.size = e.size;
        }
        var i = n(46), o = n(325), a = n(326), u = n(327), c = n(328), s = n(329);
        // Add methods to `Stack`.
        r.prototype.clear = o, r.prototype.delete = a, r.prototype.get = u, r.prototype.has = c, 
        r.prototype.set = s, t.exports = r;
    }, /* 48 */
    /***/
    function(t, e) {
        t.exports = /**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
        function(t, e, n) {
            switch (n.length) {
              case 0:
                return t.call(e);

              case 1:
                return t.call(e, n[0]);

              case 2:
                return t.call(e, n[0], n[1]);

              case 3:
                return t.call(e, n[0], n[1], n[2]);
            }
            return t.apply(e, n);
        };
    }, /* 49 */
    /***/
    function(t, e) {
        t.exports = /**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
        function(t, e) {
            for (var n = -1, r = null == t ? 0 : t.length; ++n < r && !1 !== e(t[n], n, t); ) ;
            return t;
        };
    }, /* 50 */
    /***/
    function(t, e) {
        t.exports = /**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
        function(t, e) {
            for (var n = -1, r = null == t ? 0 : t.length, i = Array(r); ++n < r; ) i[n] = e(t[n], n, t);
            return i;
        };
    }, /* 51 */
    /***/
    function(t, e) {
        t.exports = /**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
        function(t, e) {
            for (var n = -1, r = e.length, i = t.length; ++n < r; ) t[i + n] = e[n];
            return t;
        };
    }, /* 52 */
    /***/
    function(t, e, n) {
        var r = n(22);
        t.exports = /**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
        function(t, e) {
            for (var n = t.length; n--; ) if (r(t[n][0], e)) return n;
            return -1;
        };
    }, /* 53 */
    /***/
    function(t, e, n) {
        var r = n(33), i = n(4);
        t.exports = /**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
        function(t) {
            return function() {
                // Use a `switch` statement to work with class constructors. See
                // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
                // for more details.
                var e = arguments;
                switch (e.length) {
                  case 0:
                    return new t();

                  case 1:
                    return new t(e[0]);

                  case 2:
                    return new t(e[0], e[1]);

                  case 3:
                    return new t(e[0], e[1], e[2]);

                  case 4:
                    return new t(e[0], e[1], e[2], e[3]);

                  case 5:
                    return new t(e[0], e[1], e[2], e[3], e[4]);

                  case 6:
                    return new t(e[0], e[1], e[2], e[3], e[4], e[5]);

                  case 7:
                    return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
                }
                var n = r(t.prototype), o = t.apply(n, e);
                // Mimic the constructor's `return` behavior.
                // See https://es5.github.io/#x13.2.2 for more details.
                return i(o) ? o : n;
            };
        };
    }, /* 54 */
    /***/
    function(t, e, n) {
        var r = n(302);
        t.exports = /**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
        function(t, e) {
            var n = t.__data__;
            return r(e) ? n["string" == typeof e ? "string" : "hash"] : n.map;
        };
    }, /* 55 */
    /***/
    function(t, e, n) {
        var r = n(151)(Object.getPrototypeOf, Object);
        t.exports = r;
    }, /* 56 */
    /***/
    function(t, e, n) {
        var r = n(229), i = n(77), o = n(231), a = n(232), u = n(116), c = n(20), s = n(158), f = "[object Promise]", l = "[object WeakMap]", p = "[object DataView]", d = s(r), h = s(i), v = s(o), y = s(a), g = s(u), m = c;
        // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
        (r && m(new r(new ArrayBuffer(1))) != p || i && "[object Map]" != m(new i()) || o && m(o.resolve()) != f || a && "[object Set]" != m(new a()) || u && m(new u()) != l) && (m = function(t) {
            var e = c(t), n = "[object Object]" == e ? t.constructor : void 0, r = n ? s(n) : "";
            if (r) switch (r) {
              case d:
                return p;

              case h:
                return "[object Map]";

              case v:
                return f;

              case y:
                return "[object Set]";

              case g:
                return l;
            }
            return e;
        }), t.exports = m;
    }, /* 57 */
    /***/
    function(t, e) {
        /** Used as references for various `Number` constants. */
        var n = 9007199254740991, r = /^(?:0|[1-9]\d*)$/;
        t.exports = /**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
        function(t, e) {
            return !!(e = null == e ? n : e) && ("number" == typeof t || r.test(t)) && t > -1 && t % 1 == 0 && t < e;
        };
    }, /* 58 */
    /***/
    function(t, e, n) {
        var r = n(16)(Object, "create");
        t.exports = r;
    }, /* 59 */
    /***/
    function(t, e) {
        /**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
        t.exports = {};
    }, /* 60 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t) {
            return t;
        };
    }, /* 61 */
    /***/
    function(t, e) {
        t.exports = function(t) {
            if ("function" != typeof t) throw TypeError(t + " is not a function!");
            return t;
        };
    }, /* 62 */
    /***/
    function(t, e, n) {
        // getting tag from 19.1.3.6 Object.prototype.toString()
        var r = n(27), i = n(2)("toStringTag"), o = "Arguments" == r(function() {
            return arguments;
        }());
        t.exports = function(t) {
            var e, n, a;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function(t, e) {
                try {
                    return t[e];
                } catch (t) {}
            }(e = Object(t), i)) ? n : o ? r(e) : "Object" == (a = r(e)) && "function" == typeof e.callee ? "Arguments" : a;
        };
    }, /* 63 */
    /***/
    function(t, e) {
        // 7.2.1 RequireObjectCoercible(argument)
        t.exports = function(t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t;
        };
    }, /* 64 */
    /***/
    function(t, e, n) {
        var r = n(29), i = n(5).document, o = r(i) && r(i.createElement);
        t.exports = function(t) {
            return o ? i.createElement(t) : {};
        };
    }, /* 65 */
    /***/
    function(t, e) {
        // IE 8- don't enum bug keys
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, /* 66 */
    /***/
    function(t, e) {
        e.f = Object.getOwnPropertySymbols;
    }, /* 67 */
    /***/
    function(t, e, n) {
        var r = n(68)("keys"), i = n(44);
        t.exports = function(t) {
            return r[t] || (r[t] = i(t));
        };
    }, /* 68 */
    /***/
    function(t, e, n) {
        var r = n(5), i = "__core-js_shared__", o = r[i] || (r[i] = {});
        t.exports = function(t) {
            return o[t] || (o[t] = {});
        };
    }, /* 69 */
    /***/
    function(t, e) {
        // 7.1.4 ToInteger
        var n = Math.ceil, r = Math.floor;
        t.exports = function(t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t);
        };
    }, /* 70 */
    /***/
    function(t, e, n) {
        // 7.1.15 ToLength
        var r = n(69), i = Math.min;
        t.exports = function(t) {
            return t > 0 ? i(r(t), 9007199254740991) : 0;
        };
    }, /* 71 */
    /***/
    function(t, e, n) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var r = n(29);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        t.exports = function(t, e) {
            if (!r(t)) return t;
            var n, i;
            if (e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;
            if ("function" == typeof (n = t.valueOf) && !r(i = n.call(t))) return i;
            if (!e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;
            throw TypeError("Can't convert object to primitive value");
        };
    }, /* 72 */
    /***/
    function(t, e, n) {
        var r = n(5), i = n(1), o = n(40), a = n(73), u = n(6).f;
        t.exports = function(t) {
            var e = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
            "_" == t.charAt(0) || t in e || u(e, t, {
                value: a.f(t)
            });
        };
    }, /* 73 */
    /***/
    function(t, e, n) {
        e.f = n(2);
    }, /* 74 */
    /***/
    function(t, e, n) {
        var r = n(62), i = n(2)("iterator"), o = n(18);
        t.exports = n(1).getIteratorMethod = function(t) {
            if (void 0 != t) return t[i] || t["@@iterator"] || o[r(t)];
        };
    }, /* 75 */
    /***/
    function(t, e, n) {
        /**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
        function r(t) {
            this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, 
            this.__iteratees__ = [], this.__takeCount__ = a, this.__views__ = [];
        }
        var i = n(33), o = n(85), a = 4294967295;
        (// Ensure `LazyWrapper` is an instance of `baseLodash`.
        r.prototype = i(o.prototype)).constructor = r, t.exports = r;
    }, /* 76 */
    /***/
    function(t, e, n) {
        /**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
        function r(t, e) {
            this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, 
            this.__values__ = void 0;
        }
        var i = n(33), o = n(85);
        (r.prototype = i(o.prototype)).constructor = r, t.exports = r;
    }, /* 77 */
    /***/
    function(t, e, n) {
        var r = n(16)(n(3), "Map");
        t.exports = r;
    }, /* 78 */
    /***/
    function(t, e, n) {
        /**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
        function r(t) {
            var e = -1, n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n; ) {
                var r = t[e];
                this.set(r[0], r[1]);
            }
        }
        var i = n(309), o = n(310), a = n(311), u = n(312), c = n(313);
        // Add methods to `MapCache`.
        r.prototype.clear = i, r.prototype.delete = o, r.prototype.get = a, r.prototype.has = u, 
        r.prototype.set = c, t.exports = r;
    }, /* 79 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t, e, n, r) {
            var i = -1, o = null == t ? 0 : t.length;
            for (r && o && (n = t[++i]); ++i < o; ) n = e(n, t[i], i, t);
            return n;
        };
    }, /* 80 */
    /***/
    function(t, e, n) {
        var r = n(81), i = n(22), o = Object.prototype.hasOwnProperty;
        t.exports = /**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
        function(t, e, n) {
            var a = t[e];
            o.call(t, e) && i(a, n) && (void 0 !== n || e in t) || r(t, e, n);
        };
    }, /* 81 */
    /***/
    function(t, e, n) {
        var r = n(137);
        t.exports = /**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
        function(t, e, n) {
            "__proto__" == e && r ? r(t, e, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0
            }) : t[e] = n;
        };
    }, /* 82 */
    /***/
    function(t, e, n) {
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
        function r(t, e, n, F, S, P) {
            var M, L = e & O, T = e & A, N = e & j;
            if (n && (M = S ? n(t, F, S, P) : n(t)), void 0 !== M) return M;
            if (!_(t)) return t;
            var D = x(t);
            if (D) {
                if (M = y(t), !L) return f(t, M);
            } else {
                var K = v(t), W = K == k || K == I;
                if (b(t)) return s(t, L);
                if (K == R || K == E || W && !S) {
                    if (M = T || W ? {} : m(t), !L) return T ? p(t, c(M, t)) : l(t, u(M, t));
                } else {
                    if (!C[K]) return S ? t : {};
                    M = g(t, K, r, L);
                }
            }
            // Check for circular references and return its corresponding clone.
            P || (P = new i());
            var B = P.get(t);
            if (B) return B;
            P.set(t, M);
            var $ = N ? T ? h : d : T ? keysIn : w, q = D ? void 0 : $(t);
            return o(q || t, function(i, o) {
                q && (i = t[o = i]), // Recursively populate clone (susceptible to call stack limits).
                a(M, o, r(i, e, n, o, t, P));
            }), M;
        }
        var i = n(47), o = n(49), a = n(80), u = n(120), c = n(240), s = n(131), f = n(21), l = n(269), p = n(270), d = n(141), h = n(285), v = n(56), y = n(297), g = n(298), m = n(146), x = n(0), b = n(24), _ = n(4), w = n(11), O = 1, A = 2, j = 4, E = "[object Arguments]", k = "[object Function]", I = "[object GeneratorFunction]", R = "[object Object]", C = {};
        C[E] = C["[object Array]"] = C["[object ArrayBuffer]"] = C["[object DataView]"] = C["[object Boolean]"] = C["[object Date]"] = C["[object Float32Array]"] = C["[object Float64Array]"] = C["[object Int8Array]"] = C["[object Int16Array]"] = C["[object Int32Array]"] = C["[object Map]"] = C["[object Number]"] = C[R] = C["[object RegExp]"] = C["[object Set]"] = C["[object String]"] = C["[object Symbol]"] = C["[object Uint8Array]"] = C["[object Uint8ClampedArray]"] = C["[object Uint16Array]"] = C["[object Uint32Array]"] = !0, 
        C["[object Error]"] = C[k] = C["[object WeakMap]"] = !1, t.exports = r;
    }, /* 83 */
    /***/
    function(t, e, n) {
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
        function r(t, e, n, a, u) {
            return t === e || (null == t || null == e || !o(t) && !o(e) ? t != t && e != e : i(t, e, n, a, r, u));
        }
        var i = n(246), o = n(10);
        t.exports = r;
    }, /* 84 */
    /***/
    function(t, e, n) {
        var r = n(34), i = n(316), o = Object.prototype.hasOwnProperty;
        t.exports = /**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
        function(t) {
            if (!r(t)) return i(t);
            var e = [];
            for (var n in Object(t)) o.call(t, n) && "constructor" != n && e.push(n);
            return e;
        };
    }, /* 85 */
    /***/
    function(t, e) {
        t.exports = /**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
        function() {};
    }, /* 86 */
    /***/
    function(t, e, n) {
        var r = n(60), i = n(152), o = n(95);
        t.exports = /**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
        function(t, e) {
            return o(i(t, e, r), t + "");
        };
    }, /* 87 */
    /***/
    function(t, e, n) {
        var r = n(115);
        t.exports = /**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
        function(t) {
            var e = new t.constructor(t.byteLength);
            return new r(e).set(new r(t)), e;
        };
    }, /* 88 */
    /***/
    function(t, e, n) {
        var r = n(86), i = n(301);
        t.exports = /**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
        function(t) {
            return r(function(e, n) {
                var r = -1, o = n.length, a = o > 1 ? n[o - 1] : void 0, u = o > 2 ? n[2] : void 0;
                for (a = t.length > 3 && "function" == typeof a ? (o--, a) : void 0, u && i(n[0], n[1], u) && (a = o < 3 ? void 0 : a, 
                o = 1), e = Object(e); ++r < o; ) {
                    var c = n[r];
                    c && t(e, c, r, a);
                }
                return e;
            });
        };
    }, /* 89 */
    /***/
    function(t, e, n) {
        var r = n(127), i = n(274), o = n(277), a = n(135), u = n(279), c = n(90), s = n(315), f = n(153), l = n(155), p = n(162), d = "Expected a function", h = 1, v = 2, y = 8, g = 16, m = 32, x = 64, b = Math.max;
        t.exports = /**
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
        function(t, e, n, _, w, O, A, j) {
            var E = e & v;
            if (!E && "function" != typeof t) throw new TypeError(d);
            var k = _ ? _.length : 0;
            if (k || (e &= ~(m | x), _ = w = void 0), A = void 0 === A ? A : b(p(A), 0), j = void 0 === j ? j : p(j), 
            k -= w ? w.length : 0, e & x) {
                var I = _, R = w;
                _ = w = void 0;
            }
            var C = E ? void 0 : c(t), F = [ t, e, n, _, w, I, R, O, A, j ];
            if (C && s(F, C), t = F[0], e = F[1], n = F[2], _ = F[3], w = F[4], !(j = F[9] = void 0 === F[9] ? E ? 0 : t.length : b(F[9] - k, 0)) && e & (y | g) && (e &= ~(y | g)), 
            e && e != h) S = e == y || e == g ? o(t, e, j) : e != m && e != (h | m) || w.length ? a.apply(void 0, F) : u(t, e, n, _); else var S = i(t, e, n);
            return l((C ? r : f)(S, F), t, e);
        };
    }, /* 90 */
    /***/
    function(t, e, n) {
        var r = n(150), i = n(366), o = r ? function(t) {
            return r.get(t);
        } : i;
        t.exports = o;
    }, /* 91 */
    /***/
    function(t, e, n) {
        var r = n(117), i = n(161), o = Object.prototype.propertyIsEnumerable, a = Object.getOwnPropertySymbols, u = a ? function(t) {
            return null == t ? [] : (t = Object(t), r(a(t), function(e) {
                return o.call(t, e);
            }));
        } : i;
        t.exports = u;
    }, /* 92 */
    /***/
    function(t, e, n) {
        var r = n(0), i = n(37), o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, a = /^\w*$/;
        t.exports = /**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
        function(t, e) {
            if (r(t)) return !1;
            var n = typeof t;
            return !("number" != n && "symbol" != n && "boolean" != n && null != t && !i(t)) || a.test(t) || !o.test(t) || null != e && t in Object(e);
        };
    }, /* 93 */
    /***/
    function(t, e) {
        t.exports = /**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
        function(t) {
            var e = -1, n = Array(t.size);
            return t.forEach(function(t, r) {
                n[++e] = [ r, t ];
            }), n;
        };
    }, /* 94 */
    /***/
    function(t, e) {
        /** Used as the internal argument placeholder. */
        var n = "__lodash_placeholder__";
        t.exports = /**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
        function(t, e) {
            for (var r = -1, i = t.length, o = 0, a = []; ++r < i; ) {
                var u = t[r];
                u !== e && u !== n || (t[r] = n, a[o++] = r);
            }
            return a;
        };
    }, /* 95 */
    /***/
    function(t, e, n) {
        var r = n(258), i = n(156)(r);
        t.exports = i;
    }, /* 96 */
    /***/
    function(t, e, n) {
        var r = n(351), i = n(353);
        t.exports = /**
 * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
 * version with conversion `options` applied. If `name` is an object its methods
 * will be converted.
 *
 * @param {string} name The name of the function to wrap.
 * @param {Function} [func] The function to wrap.
 * @param {Object} [options] The options object. See `baseConvert` for more details.
 * @returns {Function|Object} Returns the converted function or object.
 */
        function(t, e, n) {
            return r(i, t, e, n);
        };
    }, /* 97 */
    /***/
    function(t, e) {
        /** Used as references for various `Number` constants. */
        var n = 9007199254740991;
        t.exports = /**
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
        function(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= n;
        };
    }, /* 98 */
    /***/
    function(t, e) {
        t.exports = function(t) {
            // module.parent = undefined by default
            return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), 
            Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function() {
                    return t.l;
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function() {
                    return t.i;
                }
            }), t.webpackPolyfill = 1), t;
        };
    }, /* 99 */
    /***/
    function(t, e, n) {
        t.exports = n(5).document && document.documentElement;
    }, /* 100 */
    /***/
    function(t, e, n) {
        t.exports = !n(8) && !n(17)(function() {
            return 7 != Object.defineProperty(n(64)("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 101 */
    /***/
    function(t, e, n) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var r = n(27);
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == r(t) ? t.split("") : Object(t);
        };
    }, /* 102 */
    /***/
    function(t, e, n) {
        // check on default Array iterator
        var r = n(18), i = n(2)("iterator"), o = Array.prototype;
        t.exports = function(t) {
            return void 0 !== t && (r.Array === t || o[i] === t);
        };
    }, /* 103 */
    /***/
    function(t, e, n) {
        // call something on iterator step with safe closing on error
        var r = n(7);
        t.exports = function(t, e, n, i) {
            try {
                return i ? e(r(n)[0], n[1]) : e(n);
            } catch (e) {
                var o = t.return;
                throw void 0 !== o && r(o.call(t)), e;
            }
        };
    }, /* 104 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(40), i = n(12), o = n(112), a = n(14), u = n(13), c = n(18), s = n(198), f = n(42), l = n(109), p = n(2)("iterator"), d = !([].keys && "next" in [].keys()), h = function() {
            return this;
        };
        t.exports = function(t, e, n, v, y, g, m) {
            s(n, e, v);
            var x, b, _, w = function(t) {
                if (!d && t in E) return E[t];
                switch (t) {
                  case "keys":
                  case "values":
                    return function() {
                        return new n(this, t);
                    };
                }
                return function() {
                    return new n(this, t);
                };
            }, O = e + " Iterator", A = "values" == y, j = !1, E = t.prototype, k = E[p] || E["@@iterator"] || y && E[y], I = k || w(y), R = y ? A ? w("entries") : I : void 0, C = "Array" == e ? E.entries || k : k;
            if (// Fix native
            C && (_ = l(C.call(new t()))) !== Object.prototype && (// Set @@toStringTag to native iterators
            f(_, O, !0), // fix for some old engines
            r || u(_, p) || a(_, p, h)), // fix Array#{values, @@iterator}.name in V8 / FF
            A && k && "values" !== k.name && (j = !0, I = function() {
                return k.call(this);
            }), // Define iterator
            r && !m || !d && !j && E[p] || a(E, p, I), // Plug for library
            c[e] = I, c[O] = h, y) if (x = {
                values: A ? I : w("values"),
                keys: g ? I : w("keys"),
                entries: R
            }, m) for (b in x) b in E || o(E, b, x[b]); else i(i.P + i.F * (d || j), e, x);
            return x;
        };
    }, /* 105 */
    /***/
    function(t, e, n) {
        var r = n(2)("iterator"), i = !1;
        try {
            var o = [ 7 ][r]();
            o.return = function() {
                i = !0;
            }, Array.from(o, function() {
                throw 2;
            });
        } catch (t) {}
        t.exports = function(t, e) {
            if (!e && !i) return !1;
            var n = !1;
            try {
                var o = [ 7 ], a = o[r]();
                a.next = function() {
                    return {
                        done: n = !0
                    };
                }, o[r] = function() {
                    return a;
                }, t(o);
            } catch (t) {}
            return n;
        };
    }, /* 106 */
    /***/
    function(t, e, n) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var r = n(7), i = n(204), o = n(65), a = n(67)("IE_PROTO"), u = function() {}, c = function() {
            // Thrash, waste and sodomy: IE GC bug
            var t, e = n(64)("iframe"), r = o.length;
            for (e.style.display = "none", n(99).appendChild(e), e.src = "javascript:", (// eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), 
            t.close(), c = t.F; r--; ) delete c.prototype[o[r]];
            return c();
        };
        t.exports = Object.create || function(t, e) {
            var n;
            // add "__proto__" for Object.getPrototypeOf polyfill
            return null !== t ? (u.prototype = r(t), n = new u(), u.prototype = null, n[a] = t) : n = c(), 
            void 0 === e ? n : i(n, e);
        };
    }, /* 107 */
    /***/
    function(t, e, n) {
        var r = n(41), i = n(31), o = n(9), a = n(71), u = n(13), c = n(100), s = Object.getOwnPropertyDescriptor;
        e.f = n(8) ? s : function(t, e) {
            if (t = o(t), e = a(e, !0), c) try {
                return s(t, e);
            } catch (t) {}
            if (u(t, e)) return i(!r.f.call(t, e), t[e]);
        };
    }, /* 108 */
    /***/
    function(t, e, n) {
        // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
        var r = n(110), i = n(65).concat("length", "prototype");
        e.f = Object.getOwnPropertyNames || function(t) {
            return r(t, i);
        };
    }, /* 109 */
    /***/
    function(t, e, n) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var r = n(13), i = n(43), o = n(67)("IE_PROTO"), a = Object.prototype;
        t.exports = Object.getPrototypeOf || function(t) {
            return t = i(t), r(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;
        };
    }, /* 110 */
    /***/
    function(t, e, n) {
        var r = n(13), i = n(9), o = n(192)(!1), a = n(67)("IE_PROTO");
        t.exports = function(t, e) {
            var n, u = i(t), c = 0, s = [];
            for (n in u) n != a && r(u, n) && s.push(n);
            // Don't enum bug & hidden keys
            for (;e.length > c; ) r(u, n = e[c++]) && (~o(s, n) || s.push(n));
            return s;
        };
    }, /* 111 */
    /***/
    function(t, e, n) {
        // most Object methods by ES6 should accept primitives
        var r = n(12), i = n(1), o = n(17);
        t.exports = function(t, e) {
            var n = (i.Object || {})[t] || Object[t], a = {};
            a[t] = e(n), r(r.S + r.F * o(function() {
                n(1);
            }), "Object", a);
        };
    }, /* 112 */
    /***/
    function(t, e, n) {
        t.exports = n(14);
    }, /* 113 */
    /***/
    function(t, e, n) {
        var r, i, o, a = n(28), u = n(196), c = n(99), s = n(64), f = n(5), l = f.process, p = f.setImmediate, d = f.clearImmediate, h = f.MessageChannel, v = 0, y = {}, g = "onreadystatechange", m = function() {
            var t = +this;
            if (y.hasOwnProperty(t)) {
                var e = y[t];
                delete y[t], e();
            }
        }, x = function(t) {
            m.call(t.data);
        };
        // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
        p && d || (p = function(t) {
            for (var e = [], n = 1; arguments.length > n; ) e.push(arguments[n++]);
            return y[++v] = function() {
                u("function" == typeof t ? t : Function(t), e);
            }, r(v), v;
        }, d = function(t) {
            delete y[t];
        }, // Node.js 0.8-
        "process" == n(27)(l) ? r = function(t) {
            l.nextTick(a(m, t, 1));
        } : h ? (o = (i = new h()).port2, i.port1.onmessage = x, r = a(o.postMessage, o, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (r = function(t) {
            f.postMessage(t + "", "*");
        }, f.addEventListener("message", x, !1)) : r = g in s("script") ? function(t) {
            c.appendChild(s("script"))[g] = function() {
                c.removeChild(this), m.call(t);
            };
        } : function(t) {
            setTimeout(a(m, t, 1), 0);
        }), t.exports = {
            set: p,
            clear: d
        };
    }, /* 114 */
    /***/
    function(t, e) {}, /* 115 */
    /***/
    function(t, e, n) {
        var r = n(3).Uint8Array;
        t.exports = r;
    }, /* 116 */
    /***/
    function(t, e, n) {
        var r = n(16)(n(3), "WeakMap");
        t.exports = r;
    }, /* 117 */
    /***/
    function(t, e) {
        t.exports = /**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
        function(t, e) {
            for (var n = -1, r = null == t ? 0 : t.length, i = 0, o = []; ++n < r; ) {
                var a = t[n];
                e(a, n, t) && (o[i++] = a);
            }
            return o;
        };
    }, /* 118 */
    /***/
    function(t, e, n) {
        var r = n(129), i = n(36), o = n(0), a = n(24), u = n(57), c = n(38), s = Object.prototype.hasOwnProperty;
        t.exports = /**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
        function(t, e) {
            var n = o(t), f = !n && i(t), l = !n && !f && a(t), p = !n && !f && !l && c(t), d = n || f || l || p, h = d ? r(t.length, String) : [], v = h.length;
            for (var y in t) !e && !s.call(t, y) || d && (// Safari 9 has enumerable `arguments.length` in strict mode.
            "length" == y || // Node.js 0.10 has enumerable non-index properties on buffers.
            l && ("offset" == y || "parent" == y) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            p && ("buffer" == y || "byteLength" == y || "byteOffset" == y) || // Skip index properties.
            u(y, v)) || h.push(y);
            return h;
        };
    }, /* 119 */
    /***/
    function(t, e, n) {
        var r = n(81), i = n(22);
        t.exports = /**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
        function(t, e, n) {
            (void 0 === n || i(t[e], n)) && (void 0 !== n || e in t) || r(t, e, n);
        };
    }, /* 120 */
    /***/
    function(t, e, n) {
        var r = n(15), i = n(11);
        t.exports = /**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
        function(t, e) {
            return t && r(e, i(e), t);
        };
    }, /* 121 */
    /***/
    function(t, e, n) {
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
        function r(t, e, n, a, u) {
            var c = -1, s = t.length;
            for (n || (n = o), u || (u = []); ++c < s; ) {
                var f = t[c];
                e > 0 && n(f) ? e > 1 ? // Recursively flatten arrays (susceptible to call stack limits).
                r(f, e - 1, n, a, u) : i(u, f) : a || (u[u.length] = f);
            }
            return u;
        }
        var i = n(51), o = n(300);
        t.exports = r;
    }, /* 122 */
    /***/
    function(t, e, n) {
        var r = n(273)();
        t.exports = r;
    }, /* 123 */
    /***/
    function(t, e, n) {
        var r = n(130), i = n(35);
        t.exports = /**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
        function(t, e) {
            for (var n = 0, o = (e = r(e, t)).length; null != t && n < o; ) t = t[i(e[n++])];
            return n && n == o ? t : void 0;
        };
    }, /* 124 */
    /***/
    function(t, e, n) {
        var r = n(51), i = n(0);
        t.exports = /**
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
        function(t, e, n) {
            var o = e(t);
            return i(t) ? o : r(o, n(t));
        };
    }, /* 125 */
    /***/
    function(t, e, n) {
        var r = n(252), i = n(253), o = n(60), a = n(0), u = n(367);
        t.exports = /**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
        function(t) {
            // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
            // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
            // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
            // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
            return "function" == typeof t ? t : null == t ? o : "object" == typeof t ? a(t) ? i(t[0], t[1]) : r(t) : u(t);
        };
    }, /* 126 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
        function(t) {
            return function(e) {
                return null == e ? void 0 : e[t];
            };
        };
    }, /* 127 */
    /***/
    function(t, e, n) {
        var r = n(60), i = n(150), o = i ? function(t, e) {
            return i.set(t, e), t;
        } : r;
        t.exports = o;
    }, /* 128 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
        function(t, e, n) {
            var r = -1, i = t.length;
            e < 0 && (e = -e > i ? 0 : i + e), (n = n > i ? i : n) < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, 
            e >>>= 0;
            for (var o = Array(i); ++r < i; ) o[r] = t[r + e];
            return o;
        };
    }, /* 129 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
        function(t, e) {
            for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
            return r;
        };
    }, /* 130 */
    /***/
    function(t, e, n) {
        var r = n(0), i = n(92), o = n(157), a = n(26);
        t.exports = /**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
        function(t, e) {
            return r(t) ? t : i(t, e) ? [ t ] : o(a(t));
        };
    }, /* 131 */
    /***/
    function(t, e, n) {
        /* WEBPACK VAR INJECTION */
        (function(t) {
            var r = n(3), i = "object" == typeof e && e && !e.nodeType && e, o = i && "object" == typeof t && t && !t.nodeType && t, a = o && o.exports === i ? r.Buffer : void 0, u = a ? a.allocUnsafe : void 0;
            t.exports = /**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
            function(t, e) {
                if (e) return t.slice();
                var n = t.length, r = u ? u(n) : new t.constructor(n);
                return t.copy(r), r;
            };
        }).call(e, n(98)(t));
    }, /* 132 */
    /***/
    function(t, e, n) {
        var r = n(87);
        t.exports = /**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
        function(t, e) {
            var n = e ? r(t.buffer) : t.buffer;
            return new t.constructor(n, t.byteOffset, t.length);
        };
    }, /* 133 */
    /***/
    function(t, e) {
        /* Built-in method references for those with the same name as other `lodash` methods. */
        var n = Math.max;
        t.exports = /**
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
        function(t, e, r, i) {
            for (var o = -1, a = t.length, u = r.length, c = -1, s = e.length, f = n(a - u, 0), l = Array(s + f), p = !i; ++c < s; ) l[c] = e[c];
            for (;++o < u; ) (p || o < a) && (l[r[o]] = t[o]);
            for (;f--; ) l[c++] = t[o++];
            return l;
        };
    }, /* 134 */
    /***/
    function(t, e) {
        /* Built-in method references for those with the same name as other `lodash` methods. */
        var n = Math.max;
        t.exports = /**
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
        function(t, e, r, i) {
            for (var o = -1, a = t.length, u = -1, c = r.length, s = -1, f = e.length, l = n(a - c, 0), p = Array(l + f), d = !i; ++o < l; ) p[o] = t[o];
            for (var h = o; ++s < f; ) p[h + s] = e[s];
            for (;++u < c; ) (d || o < a) && (p[h + r[u]] = t[o++]);
            return p;
        };
    }, /* 135 */
    /***/
    function(t, e, n) {
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
        function r(t, e, n, x, b, _, w, O, A, j) {
            function E() {
                for (var d = arguments.length, h = Array(d), v = d; v--; ) h[v] = arguments[v];
                if (C) var y = s(E), g = a(h, y);
                if (x && (h = i(h, x, b, C)), _ && (h = o(h, _, w, C)), d -= g, C && d < j) {
                    var m = l(h, y);
                    return c(t, e, r, E.placeholder, n, h, m, O, A, j - d);
                }
                var P = I ? n : this, M = R ? P[t] : t;
                return d = h.length, O ? h = f(h, O) : F && d > 1 && h.reverse(), k && A < d && (h.length = A), 
                this && this !== p && this instanceof E && (M = S || u(M)), M.apply(P, h);
            }
            var k = e & g, I = e & d, R = e & h, C = e & (v | y), F = e & m, S = R ? void 0 : u(t);
            return E;
        }
        var i = n(133), o = n(134), a = n(272), u = n(53), c = n(136), s = n(143), f = n(321), l = n(94), p = n(3), d = 1, h = 2, v = 8, y = 16, g = 128, m = 512;
        t.exports = r;
    }, /* 136 */
    /***/
    function(t, e, n) {
        var r = n(147), i = n(153), o = n(155), a = 1, u = 2, c = 4, s = 8, f = 32, l = 64;
        t.exports = /**
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
        function(t, e, n, p, d, h, v, y, g, m) {
            var x = e & s;
            e |= x ? f : l, (e &= ~(x ? l : f)) & c || (e &= ~(a | u));
            var b = [ t, e, d, x ? h : void 0, x ? v : void 0, x ? void 0 : h, x ? void 0 : v, y, g, m ], _ = n.apply(void 0, b);
            return r(t) && i(_, b), _.placeholder = p, o(_, t, e);
        };
    }, /* 137 */
    /***/
    function(t, e, n) {
        var r = n(16), i = function() {
            try {
                var t = r(Object, "defineProperty");
                return t({}, "", {}), t;
            } catch (t) {}
        }();
        t.exports = i;
    }, /* 138 */
    /***/
    function(t, e, n) {
        var r = n(233), i = n(237), o = n(262), a = 1, u = 2;
        t.exports = /**
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
        function(t, e, n, c, s, f) {
            var l = n & a, p = t.length, d = e.length;
            if (p != d && !(l && d > p)) return !1;
            // Assume cyclic values are equal.
            var h = f.get(t);
            if (h && f.get(e)) return h == e;
            var v = -1, y = !0, g = n & u ? new r() : void 0;
            // Ignore non-index properties.
            for (f.set(t, e), f.set(e, t); ++v < p; ) {
                var m = t[v], x = e[v];
                if (c) var b = l ? c(x, m, v, e, t, f) : c(m, x, v, t, e, f);
                if (void 0 !== b) {
                    if (b) continue;
                    y = !1;
                    break;
                }
                // Recursively compare arrays (susceptible to call stack limits).
                if (g) {
                    if (!i(e, function(t, e) {
                        if (!o(g, e) && (m === t || s(m, t, n, c, f))) return g.push(e);
                    })) {
                        y = !1;
                        break;
                    }
                } else if (m !== x && !s(m, x, n, c, f)) {
                    y = !1;
                    break;
                }
            }
            return f.delete(t), f.delete(e), y;
        };
    }, /* 139 */
    /***/
    function(t, e, n) {
        var r = n(349), i = n(152), o = n(95);
        t.exports = /**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
        function(t) {
            return o(i(t, void 0, r), t + "");
        };
    }, /* 140 */
    /***/
    function(t, e, n) {
        /* WEBPACK VAR INJECTION */
        (function(e) {
            /** Detect free variable `global` from Node.js. */
            var n = "object" == typeof e && e && e.Object === Object && e;
            t.exports = n;
        }).call(e, n(387));
    }, /* 141 */
    /***/
    function(t, e, n) {
        var r = n(124), i = n(91), o = n(11);
        t.exports = /**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
        function(t) {
            return r(t, o, i);
        };
    }, /* 142 */
    /***/
    function(t, e, n) {
        var r = n(320), i = Object.prototype.hasOwnProperty;
        t.exports = /**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
        function(t) {
            for (var e = t.name + "", n = r[e], o = i.call(r, e) ? n.length : 0; o--; ) {
                var a = n[o], u = a.func;
                if (null == u || u == t) return a.name;
            }
            return e;
        };
    }, /* 143 */
    /***/
    function(t, e) {
        t.exports = /**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
        function(t) {
            return t.placeholder;
        };
    }, /* 144 */
    /***/
    function(t, e, n) {
        var r = n(51), i = n(55), o = n(91), a = n(161), u = Object.getOwnPropertySymbols ? function(t) {
            for (var e = []; t; ) r(e, o(t)), t = i(t);
            return e;
        } : a;
        t.exports = u;
    }, /* 145 */
    /***/
    function(t, e) {
        /** Used to compose unicode character classes. */
        var n = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
        t.exports = /**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
        function(t) {
            return n.test(t);
        };
    }, /* 146 */
    /***/
    function(t, e, n) {
        var r = n(33), i = n(55), o = n(34);
        t.exports = /**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
        function(t) {
            return "function" != typeof t.constructor || o(t) ? {} : r(i(t));
        };
    }, /* 147 */
    /***/
    function(t, e, n) {
        var r = n(75), i = n(90), o = n(142), a = n(380);
        t.exports = /**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
        function(t) {
            var e = o(t), n = a[e];
            if ("function" != typeof n || !(e in r.prototype)) return !1;
            if (t === n) return !0;
            var u = i(n);
            return !!u && t === u[0];
        };
    }, /* 148 */
    /***/
    function(t, e, n) {
        var r = n(4);
        t.exports = /**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
        function(t) {
            return t == t && !r(t);
        };
    }, /* 149 */
    /***/
    function(t, e) {
        t.exports = /**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
        function(t, e) {
            return function(n) {
                return null != n && n[t] === e && (void 0 !== e || t in Object(n));
            };
        };
    }, /* 150 */
    /***/
    function(t, e, n) {
        var r = n(116), i = r && new r();
        t.exports = i;
    }, /* 151 */
    /***/
    function(t, e) {
        t.exports = /**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
        function(t, e) {
            return function(n) {
                return t(e(n));
            };
        };
    }, /* 152 */
    /***/
    function(t, e, n) {
        var r = n(48), i = Math.max;
        t.exports = /**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
        function(t, e, n) {
            return e = i(void 0 === e ? t.length - 1 : e, 0), function() {
                for (var o = arguments, a = -1, u = i(o.length - e, 0), c = Array(u); ++a < u; ) c[a] = o[e + a];
                a = -1;
                for (var s = Array(e + 1); ++a < e; ) s[a] = o[a];
                return s[e] = n(c), r(t, this, s);
            };
        };
    }, /* 153 */
    /***/
    function(t, e, n) {
        var r = n(127), i = n(156)(r);
        t.exports = i;
    }, /* 154 */
    /***/
    function(t, e) {
        t.exports = /**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
        function(t) {
            var e = -1, n = Array(t.size);
            return t.forEach(function(t) {
                n[++e] = t;
            }), n;
        };
    }, /* 155 */
    /***/
    function(t, e, n) {
        var r = n(289), i = n(299), o = n(95), a = n(334);
        t.exports = /**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
        function(t, e, n) {
            var u = e + "";
            return o(t, i(u, a(r(u), n)));
        };
    }, /* 156 */
    /***/
    function(t, e) {
        /** Used to detect hot functions by number of calls within a span of milliseconds. */
        var n = 800, r = 16, i = Date.now;
        t.exports = /**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
        function(t) {
            var e = 0, o = 0;
            return function() {
                var a = i(), u = r - (a - o);
                if (o = a, u > 0) {
                    if (++e >= n) return arguments[0];
                } else e = 0;
                return t.apply(void 0, arguments);
            };
        };
    }, /* 157 */
    /***/
    function(t, e, n) {
        var r = /^\./, i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, o = /\\(\\)?/g, a = n(314)(function(t) {
            var e = [];
            return r.test(t) && e.push(""), t.replace(i, function(t, n, r, i) {
                e.push(r ? i.replace(o, "$1") : n || t);
            }), e;
        });
        t.exports = a;
    }, /* 158 */
    /***/
    function(t, e) {
        /** Used for built-in method references. */
        var n = Function.prototype.toString;
        t.exports = /**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
        function(t) {
            if (null != t) {
                try {
                    return n.call(t);
                } catch (t) {}
                try {
                    return t + "";
                } catch (t) {}
            }
            return "";
        };
    }, /* 159 */
    /***/
    function(t, e, n) {
        var r = n(123);
        t.exports = /**
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
        function(t, e, n) {
            var i = null == t ? void 0 : r(t, e);
            return void 0 === i ? n : i;
        };
    }, /* 160 */
    /***/
    function(t, e, n) {
        var r = n(23), i = n(10);
        t.exports = /**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
        function(t) {
            return i(t) && r(t);
        };
    }, /* 161 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function() {
            return [];
        };
    }, /* 162 */
    /***/
    function(t, e, n) {
        var r = n(371);
        t.exports = /**
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
        function(t) {
            var e = r(t), n = e % 1;
            return e == e ? n ? e - n : e : 0;
        };
    }, /* 163 */
    /***/
    function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t) {
            return t && "object" === (void 0 === t ? "undefined" : (0, d.default)(t)) && "default" in t ? t.default : t;
        }
        var o = r(n(177)), a = r(n(165)), u = r(n(167)), c = r(n(166)), s = (r(n(172)), 
        r(n(171)), r(n(169))), f = r(n(170)), l = r(n(173)), p = r(n(168)), d = r(n(176));
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var h = i(n(354)), v = i(n(339)), y = i(n(342)), g = i(n(225)), m = i(n(159)), x = i(n(365)), b = i(n(360)), _ = i(n(4)), w = i(n(376)), O = i(n(370)), A = i(n(383)), j = i(n(355)), E = i(n(337)), k = i(n(359)), I = i(n(25)), R = i(n(11)), C = i(n(356)), F = i(n(347)), S = i(n(0)), P = i(n(348)), M = n(224), L = i(n(343)), T = i(n(363)), N = h(p.default, JSON.parse), D = function(t) {
            return function() {
                var e = t.apply(this, arguments);
                return new l.default(function(t, n) {
                    function r(i, o) {
                        try {
                            var a = e[i](o), u = a.value;
                        } catch (t) {
                            return void n(t);
                        }
                        if (!a.done) return l.default.resolve(u).then(function(t) {
                            r("next", t);
                        }, function(t) {
                            r("throw", t);
                        });
                        t(u);
                    }
                    return r("next");
                });
            };
        }, K = function(t, e, n) {
            return e in t ? (0, f.default)(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }, W = s.default || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
        }, B = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if ((0, u.default)(Object(t))) return function(t, e) {
                    var n = [], r = !0, i = !1, o = void 0;
                    try {
                        for (var a, u = (0, c.default)(t); !(r = (a = u.next()).done) && (n.push(a.value), 
                        !e || n.length !== e); r = !0) ;
                    } catch (t) {
                        i = !0, o = t;
                    } finally {
                        try {
                            !r && u.return && u.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), $ = function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
            return (0, a.default)(t);
        }, q = {
            create: function(t) {
                return new function(t) {
                    (0, s.default)(this, N(W({}, t.toJSON(), W({}, t))));
                }(t);
            }
        }, z = function(t, e) {
            return g(t) !== g(e);
        }, U = function() {
            var t = arguments[0];
            return x.apply(void 0, [ N(t) ].concat($(O(arguments).map(function(e) {
                /**
 * @param {object} base
 * @param {object} object
 * @return {object} diff
 */
                return function(t, e) {
                    function n(t, e) {
                        return w(t, function(t, r, i) {
                            b(r, e[i]) || (t[i] = _(r) && _(e[i]) ? n(r, e[i]) : r);
                        });
                    }
                    return n(e, t);
                }(t, e);
            }))));
        }, J = function(t) {
            return t.then(function(t) {
                return [ null, t ];
            }).catch(function(t) {
                return [ t, void 0 ];
            });
        }, Q = function(t) {
            var e, n, r = t.collectionName, i = t.localPropertyName || v(r).slice(0, -1), a = t.idPropertyName || "id", u = t.templateName || i + "Template", c = t.template || {}, s = t.recordPrimaryKey || "_id", f = i + "RecordId", l = i + "HasChanges", p = i + "Save", d = i + "Loading", h = t.idType || String, g = t.requestOptions || {}, b = i + "RequestOptions", _ = i + "Capture", w = function(t, e, n) {
                var r = t[e];
                return delete t[e], void 0 === r ? n : r;
            }(g, "capture", !1), O = i + "RequestOptionsOverride";
            if (!r) throw new Error("[@citygro/vdata#createMixinForItemById] options.collectionName is required");
            return t.idPropertyName || console.warn("[@citygro/vdata#createMixinForItemById]", "options.idPropertyName will default to `${localPropertyName}Id` in future versions of vdata"), 
            {
                props: (e = {}, K(e, a, {
                    type: h,
                    default: null
                }), K(e, u, {
                    type: Object,
                    default: function() {
                        return y(c);
                    }
                }), K(e, O, {
                    type: Object,
                    default: function() {
                        return {};
                    }
                }), e),
                data: function() {
                    var t, e = (t = {}, K(t, i, null), K(t, b, x({}, y(g), this[O])), t);
                    return (w || this[O].capture) && (e[_] = null), e;
                },
                vdata: function(t) {
                    var e = this[f]();
                    this[d] || null === e || t.collectionName !== r || (w || this[O].capture ? this[i] = U(this[_], this.$store.get(r, e) || {}, this[i]) : this[i] = this.$store.get(r, e) || null);
                },
                asyncData: K({}, i, function() {
                    var t = this;
                    /*#__PURE__*/
                    return D(o.default.mark(function e() {
                        var n, i, a, c, s, l, p, d;
                        return o.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (n = g.force || t[O].force, i = w || t[O].capture, n && i && console.warn("[@citygro/vdata#createMixinForItemById]", "`requestOptions.capture = true` implies `requestOptions.force = true`, setting both options is not necessary"), 
                                a = n || i, c = t[f](), s = void 0, l = void 0, null === c) {
                                    e.next = 17;
                                    break;
                                }
                                if (a || (l = t.$store.get(r, c)), l) {
                                    e.next = 15;
                                    break;
                                }
                                return e.next = 11, J(t.$store.find(r, c, t[b]));

                              case 11:
                                p = e.sent, d = B(p, 2), s = d[0], l = d[1];

                              case 15:
                                e.next = 18;
                                break;

                              case 17:
                                l = t.$store.createRecord(r, t[u]);

                              case 18:
                                return s && (console.error(s), l = null), i && !t[_] && (t[_] = y(l)), e.abrupt("return", l);

                              case 21:
                              case "end":
                                return e.stop();
                            }
                        }, e, t);
                    }))();
                }),
                watch: K({}, a, function() {
                    w || this.$asyncReload(i);
                }),
                computed: K({}, l, function() {
                    var t = this[i];
                    return this[w] ? z(this[_], t) : this.$store.hasChanges(r, this[f](), t);
                }),
                methods: (n = {}, K(n, f, function() {
                    var t = this[a] || m(this, i + "." + s, null);
                    return this.$store.isValidId(t) ? t : null;
                }), K(n, p, function() {
                    var t = this;
                    /*#__PURE__*/
                    return D(o.default.mark(function e() {
                        var n, u, c, l, p, d;
                        return o.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return n = t[f](), u = w ? U(t[_], n ? t.$store.get(r, n) : {}, t[i]) : t[i], e.next = 4, 
                                J(t.$store.save(r, u));

                              case 4:
                                if (c = e.sent, l = B(c, 2), p = l[0], d = l[1], !p) {
                                    e.next = 10;
                                    break;
                                }
                                throw p;

                              case 10:
                                return d && (t[i] = d, t.$emit("update:" + a, d[s])), e.abrupt("return", t[i]);

                              case 12:
                              case "end":
                                return e.stop();
                            }
                        }, e, t);
                    }))();
                }), n)
            };
        }, V = function t() {
            var e = [];
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(n) {
                n.mixins && n.mixins.length && (e = [].concat($(e), $(t(n.mixins)))), e.push(n);
            }), e;
        }, H = function(t, e) {
            var n = y(m(t, "$options." + e, {})), r = m(t, "$options.mixins", []);
            return V(r).filter(function(t) {
                return t[e];
            }).forEach(function(t) {
                n = E(n, t[e]);
            }), k(n) ? null : n;
        }, G = [ "Default", "Lazy" ], Y = function(t) {
            return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : G).find(function(e) {
                return t.endsWith(e);
            });
        }, Z = {
            created: function() {
                this._asyncReload = function(t) {
                    return function(t) {
                        var e = this, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = H(this, "asyncData");
                        if (r) {
                            var i = [], o = R(r).filter(function(t) {
                                return !Y(t);
                            }).filter(function(e) {
                                return void 0 === t || e === t;
                            }).filter(function(t) {
                                return !1 === n || !r[t + "Lazy"];
                            });
                            if (void 0 !== t && 0 === o.length) throw new Error('asyncData cannot find "' + t, this);
                            return o.forEach(function(t) {
                                // helpers
                                var n = function(n) {
                                    e[t + "Error"] = n, n ? (console.error("[@citygro/vdata<" + e._uid + ">]", n), e.asyncError = !0) : e.asyncError = !!o.find(function(t) {
                                        return e[t + "Error"];
                                    });
                                }, a = function(n) {
                                    e[t + "Loading"] = n, e.asyncLoading = !!n || !!o.find(function(t) {
                                        return e[t + "Loading"];
                                    });
                                }, u = function() {
                                    e["_" + t + "Timer"] && clearTimeout(e["_" + t + "Timer"]);
                                };
                                a(!0), n(void 0);
                                var c = r[t + "Timeout"] || -1;
                                if (c > 0 && (clearTimeout(e["_" + t + "Timer"]), e["_" + t + "Timer"] = setTimeout(function() {
                                    e._asyncReload.cancel();
                                }, c)), "function" != typeof r[t]) console.error("asyncData." + t + " must be funtion. actual: " + r[t], e); else {
                                    var s = r[t].apply(e).then(function(n) {
                                        return e[t] = n, e[t + "Promise"] = s, a(!1), u(), n;
                                    }).catch(function(t) {
                                        n(t), a(!1), u();
                                    });
                                    i.push(s);
                                }
                            }), l.default.all(i).then(h(C(o), j));
                        }
                        return l.default.resolve({});
                    }.bind(t);
                }(this), this.$asyncReload(void 0, !0);
            },
            methods: {
                $asyncReload: function(t) {
                    return I(this._asyncReload) ? this._asyncReload.apply(this, arguments).then(function(e) {
                        return t ? e[t] : e;
                    }) : (console.info("[@citygro/vdata<" + this._uid + ">] vm.asyncReload is not available until the component is created!"), 
                    l.default.resolve(null));
                }
            },
            data: function() {
                var t = this, e = H(this, "asyncData");
                if (e) {
                    var n = R(e).filter(function(t) {
                        return !Y(t);
                    }), r = n.map(function(t) {
                        return t + "Error";
                    }), i = {
                        asyncLoading: !0,
                        asyncError: !1,
                        asyncAll: l.default.all(n.map(function(t) {
                            return e[t];
                        })),
                        asyncAny: A(n.map(function(t) {
                            return e[t];
                        }))
                    };
                    return n.forEach(function(n) {
                        var r = e[n + "Default"];
                        i[n] = I(r) ? r.apply(t) : r, i[n + "Promise"] = null, i[n + "Loading"] = !e[n + "Lazy"];
                    }), r.forEach(function(t) {
                        i[t] = void 0;
                    }), i;
                }
                return {};
            }
        }, X = {}, tt = function(t) {
            var e = new M.DataStore(), n = function(t, e) {
                !function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    k(e) && console.error("[@citygro/vdata] you have not defined any models!"), P(e).forEach(function(e) {
                        var n = B(e, 2), r = n[0], i = n[1];
                        return t.defineMapper(r, i);
                    });
                }(t, e.models), function(t, e) {
                    var n = P(e);
                    n.forEach(function(e) {
                        var r = B(e, 2), i = r[0], o = r[1];
                        1 === n.length ? t.registerAdapter(i, o.adapter, o.options || {
                            default: !0
                        }) : t.registerAdapter(i, o.adapter, o.options || {});
                    });
                }(t, e.adapters), this.models = e.models;
            };
            /**
     * @param {string} id
     */
            /**
     * @param {string} collection
     * @param {string} id
     * @param {object} data
     */
            /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
            /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
            /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
            /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     * @async
     */
            /**
     * @param {string} collection
     * @param {object} data
     * @param {object} options
     */
            /**
     * @param {string} collection
     * @param {string} id
     * @param {object} options
     */
            /**
     * @param {string} collection
     * @param {object} query
     * @param {object} options
     */
            /**
     * @param {string} collection
     * @param {object} data
     * @deprecated
     * @async
     */
            /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
            /**
     * @param {string} collection
     * @param {object} [query]
     * @param {object} [options]
     * @async
     */
            /**
     * @param {string} collection
     * @param {object} data
     */
            /**
     * @param {string} collection
     * @param {string} id
     */
            /**
     * @param {string} collection
     * @param {string[]} [keys]
     */
            /**
     *
     */
            /**
     * @param {string} event
     * @param {function} handler
     */
            /**
     * @param {string} event
     * @param {function} handler
     */
            return n.prototype.isValidId = function(t) {
                return null !== t && void 0 !== t && "" !== t;
            }, n.prototype.hasChanges = function(t, e, n) {
                if (this.isValidId(e)) {
                    var r = this.get(t, e);
                    return z(r, n);
                }
                return !0;
            }, n.prototype.commit = function(t, n, r) {
                return e.createRecord(t, n).commit(r);
            }, n.prototype.destroy = function(t, n, r) {
                return e.createRecord(t, n).destroy(r);
            }, n.prototype.revert = function(t, n, r) {
                return e.createRecord(t, n).revert(r);
            }, n.prototype.save = function(t, n, r) {
                var i = this.models[t].idAttribute;
                if (this.isValidId(n[i])) {
                    return e.createRecord(t, n).save(r).then(q.create).catch(function(t) {
                        throw t;
                    });
                }
                return e.create(t, n, r).then(q.create).catch(function(t) {
                    throw t;
                });
            }, n.prototype.add = function(t, n, r) {
                e.add(t, n, r);
            }, n.prototype.remove = function(t, n, r) {
                e.remove(t, n, r);
            }, n.prototype.removeAll = function(t, n, r) {
                e.removeAll(t, n, r);
            }, n.prototype.create = function(t, n, r) {
                return e.create(t, n, r).then(q.create);
            }, n.prototype.find = function(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return this.isValidId(n) ? e.find(t, n, r).then(function(t) {
                    return void 0 === t || !0 === r.raw ? t : q.create(t);
                }) : l.default.resolve();
            }, n.prototype.findAll = function(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = e.findAll(t, n, r);
                return !0 === r.raw ? i : i.then(function(t) {
                    return t.map(q.create);
                });
            }, n.prototype.createRecord = function(t, n) {
                var r = e.createRecord(t, n);
                return q.create(r);
            }, n.prototype.get = function(t, n) {
                var r = e.get(t, n);
                if (r) return q.create(r);
            }, n.prototype.getAll = function(t, n) {
                var r = this;
                return S(n) ? n.length ? n.map(function(e) {
                    return r.get(t, e);
                }) : [] : e.getAll(t).map(q.create);
            }, n.prototype.clear = function() {
                e.clear();
            }, n.prototype.on = function(t, n) {
                e.on(t, n);
            }, n.prototype.off = function(t, n) {
                e.off(t, n);
            }, new n(e, t);
        }, et = function(t) {
            return !!m(t, "$options.vdata");
        }, nt = {
            createConfig: function(t) {
                return function(e) {
                    var n = t(e);
                    return F(n || {}, {
                        events: [ "add", "change", "remove", "afterDestroy", "vm-created" ]
                    });
                };
            },
            install: function(t, e) {
                e = I(e) ? e(t) : e;
                var n = tt(e);
                Object.defineProperty(t, "$store", {
                    get: function() {
                        return n;
                    }
                }), Object.defineProperty(t.prototype, "$store", {
                    get: function() {
                        return n;
                    }
                }), console.log("[@citygro/vdata] $store ready!", n), t.mixin({
                    methods: {
                        $vdata: function() {
                            et(this) && this._vdataHandler.run(function() {
                                var t = {
                                    event: arguments[0],
                                    collectionName: arguments[1]
                                };
                                switch (t.event) {
                                  case "add":
                                    // name, data, opts
                                    t.data = arguments[2], t.opts = arguments[3];
                                    break;

                                  case "change":
                                    t.record = arguments[2], t.changes = arguments[3];
                                    break;

                                  case "remove":
                                    t.record = arguments[2];
                                    break;

                                  case "afterCreate":
                                    // props, opts, result
                                    t.props = arguments[2], t.opts = arguments[3], t.result = arguments[4];
                                    break;

                                  case "beforeDestroy":
                                  case "beforeFind":
                                    // id, opts
                                    t.id = arguments[2], t.opts = arguments[3];
                                    break;

                                  case "afterDestroy":
                                  case "afterFind":
                                    // id, opts, result
                                    t.id = arguments[2], t.opts = arguments[3], t.result = arguments[4];
                                    break;

                                  case "afterDestroyAll":
                                    // data, query, opts, result
                                    t.data = arguments[2], t.query = arguments[3], t.opts = arguments[4], t.result = arguments[5];
                                    break;

                                  case "afterFindAll":
                                    // query, opts, result
                                    t.query = arguments[2], t.opts = arguments[3], t.result = arguments[4];
                                    break;

                                  case "afterUpdate":
                                    // id, props, opts, result
                                    t.id = arguments[2], t.props = arguments[3], t.opts = arguments[4], t.result = arguments[5];
                                    break;

                                  case "beforeUpdate":
                                    // id, props, opts
                                    t.id = arguments[2], t.props = arguments[3], t.opts = arguments[4];
                                    break;

                                  case "beforeUpdateAll":
                                    // props, query, opts
                                    t.props = arguments[2], t.query = arguments[3], t.opts = arguments[4];
                                    break;

                                  case "afterUpdateAll":
                                    // props, query, opts, result
                                    t.props = arguments[2], t.query = arguments[3], t.opts = arguments[4], t.result = arguments[5];
                                    break;

                                  case "afterUpdateMany":
                                  case "afterCreateMany":
                                    // records, opts, result
                                    t.records = arguments[2], t.opts = arguments[3], t.result = arguments[4];
                                    break;

                                  case "beforeCreateMany":
                                  case "beforeUpdateMany":
                                    // records, opts
                                    t.records = arguments[2], t.opts = arguments[3];
                                    break;

                                  case "beforeCreate":
                                  case "beforeDestroyAll":
                                  case "beforeFindAll":
                                    // query, opts
                                    t.query = arguments[2], t.opts = arguments[3];
                                }
                                return t;
                            }.apply(void 0, arguments));
                        }
                    },
                    beforeCreate: function() {
                        et(this) && (this._vdataHandler = function(t, e) {
                            return X[t._uid] = V(t.$options.mixins).filter(function(t) {
                                return !!t.vdata;
                            }).map(function(t) {
                                return t.vdata;
                            }), t.$options.vdata && X[t._uid].push(t.$options.vdata), {
                                run: function(n) {
                                    ((function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1];
                                        return t.indexOf(e) >= 0;
                                    })(e, n.event) || "$vdata-call" === n.event) && X[t._uid].forEach(function(e) {
                                        setTimeout(function() {
                                            return e.apply(t, [ n ]);
                                        }, 0);
                                    });
                                },
                                destroy: function() {
                                    delete X[t._uid];
                                }
                            };
                        }(this, e.events));
                    },
                    created: function() {
                        this.$vdata("vm-created"), this.$store.on("all", this.$vdata);
                    },
                    beforeDestroy: function() {
                        et(this) && (n.off("all", this.$vdata), this._vdataHandler.destroy());
                    }
                }), t.mixin(Z);
            }
        }, rt = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return "" === e ? v(t) : "" + v(e) + function(t) {
                var e = v(t), n = L([], e.charAt(0).toUpperCase(), O(e));
                return T(n, "");
            }(t);
        }, it = function(t) {
            var e = t.value, n = t.diff;
            return W({}, e, n);
        }, ot = function(t) {
            var e = t.value, n = t.key, r = t.diff, i = it({
                value: e[n],
                diff: r
            });
            return it({
                value: e,
                diff: K({}, n, i)
            });
        }, at = function(t) {
            var e = t.value, n = void 0 === e ? [] : e, r = t.index, i = t.diff, o = [].concat($(n));
            return o[r] = W({}, o[r] || {}, i), o;
        }, ut = function(t) {
            var e = t.value, n = void 0 === e ? {} : e, r = t.index, i = t.key, o = t.diff, a = at({
                value: n[i] || [],
                index: r,
                diff: o
            });
            return it({
                value: n,
                diff: K({}, i, a)
            });
        }, ct = function(t) {
            var e = t.value, n = void 0 === e ? [] : e, r = t.diff, i = [].concat($(n));
            return i.push(r), i;
        }, st = function(t) {
            var e = t.value, n = void 0 === e ? {} : e, r = t.key, i = t.diff, o = [].concat($(n[r] || []));
            return o.push(i), it({
                value: n,
                diff: K({}, r, o)
            });
        }, ft = function(t) {
            var e = t.value, n = void 0 === e ? [] : e, r = t.index, i = [].concat($(n));
            return i.splice(r, 1), i;
        }, lt = function(t) {
            var e = t.value, n = void 0 === e ? {} : e, r = t.index, i = t.key, o = ft({
                value: n[i],
                index: r
            });
            return it({
                value: n,
                diff: K({}, i, o)
            });
        }, pt = function(t) {
            var e, n = "value" === t ? "input" : "update:" + t, r = "value" === t ? "" : t;
            return {
                methods: (e = {}, K(e, rt("forwardInput", r), function(t) {
                    this.$emit(n, t);
                }), K(e, rt("handleChange", r), function(e) {
                    this.$emit(n, it({
                        value: this[t],
                        diff: e
                    }));
                }), K(e, rt("handleKeyChange", r), function(e, r) {
                    this.$emit(n, ot({
                        value: this[t],
                        key: e,
                        diff: r
                    }));
                }), K(e, rt("handleArrayKeyChange", r), function(e, r, i) {
                    this.$emit(n, ut({
                        value: this[t],
                        index: e,
                        key: r,
                        diff: i
                    }));
                }), K(e, rt("handleArrayChange", r), function(e, r) {
                    this.$emit(n, at({
                        value: this[t],
                        index: e,
                        diff: r
                    }));
                }), K(e, rt("pushToArray", r), function(e) {
                    this.$emit(n, ct({
                        value: this[t],
                        diff: e
                    }));
                }), K(e, rt("pushToArrayKey", r), function(e, r) {
                    this.$emit(n, st({
                        value: this[t],
                        key: e,
                        diff: r
                    }));
                }), K(e, rt("removeFromArray", r), function(e) {
                    this.$emit(n, ft({
                        value: this[t],
                        index: e
                    }));
                }), K(e, rt("removeFromArrayKey", r), function(e, r) {
                    this.$emit(n, lt({
                        value: this[t],
                        index: e,
                        key: r
                    }));
                }), e)
            };
        }, dt = pt("value");
        e.DataFlowMixin = dt, e.Record = q, e.createIndex = function(t, e) {
            var n = {};
            return t.forEach(function(t) {
                n[t[e]] = t;
            }), n;
        }, e.createMixinForItemById = Q, e.createMixinForItemByResourceAndId = function(t) {
            return console.warn("[@citygro/vdata] rename createMixinForItemByResourceAndId -> createMixinForItemById", '"createMixinForItemByResourceAndId" is DEPRECATED and will be removed in a future release'), 
            Q(t);
        }, e.createMixinForListByResource = function(t) {
            var e = t.collectionName, n = t.localPropertyName || v(e), r = n + "Force", i = t.queryOptions || {}, a = t.requestOptions;
            return {
                data: function() {
                    var t;
                    return t = {}, K(t, n, []), K(t, r, !1), t;
                },
                vdata: function(t) {
                    this.asyncLoading || t.collectionName !== e || (this[n] = this.$store.getAll(e) || []);
                },
                asyncData: K({}, n, function() {
                    var t = this;
                    /*#__PURE__*/
                    return D(o.default.mark(function n() {
                        var u, c, s, f;
                        return o.default.wrap(function(n) {
                            for (;;) switch (n.prev = n.next) {
                              case 0:
                                return n.next = 2, J(t.$store.findAll(e, i, W({}, a, {
                                    force: t[r]
                                })));

                              case 2:
                                return u = n.sent, c = B(u, 2), s = c[0], f = c[1], s && (console.error(s), f = []), 
                                n.abrupt("return", f);

                              case 8:
                              case "end":
                                return n.stop();
                            }
                        }, n, t);
                    }))();
                })
            };
        }, e.to = J, e.vdata = nt, e.handleChange = it, e.handleKeyChange = ot, e.handleArrayChange = at, 
        e.handleArrayKeyChange = ut, e.pushToArray = ct, e.pushToArrayKey = st, e.removeFromArray = ft, 
        e.removeFromArrayKey = lt, e.createDataFlowMixin = pt;
    }, /* 164 */
    /***/
    function(t, e, n) {
        "use strict";
        const r = n(223), i = n(178);
        class o extends Error {
            constructor(t) {
                // Even though strings are iterable, we don't allow them to prevent subtle user mistakes
                if (!t[Symbol.iterator] || "string" == typeof t) throw new TypeError(`Expected input to be iterable, got ${typeof t}`);
                let e = (t = Array.from(t).map(t => t instanceof Error ? t : new Error(t))).map(t => (t => t.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, ""))(i(t.stack))).join("\n");
                super(e = "\n" + r(e, 4)), this.name = this.constructor.name, Object.defineProperty(this, "_errors", {
                    value: t
                });
            }
            * [Symbol.iterator]() {
                for (const t of this._errors) yield t;
            }
        }
        t.exports = o;
    }, /* 165 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(179),
            __esModule: !0
        };
    }, /* 166 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(180),
            __esModule: !0
        };
    }, /* 167 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(181),
            __esModule: !0
        };
    }, /* 168 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(182),
            __esModule: !0
        };
    }, /* 169 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(183),
            __esModule: !0
        };
    }, /* 170 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(184),
            __esModule: !0
        };
    }, /* 171 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(185),
            __esModule: !0
        };
    }, /* 172 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(186),
            __esModule: !0
        };
    }, /* 173 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(187),
            __esModule: !0
        };
    }, /* 174 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(188),
            __esModule: !0
        };
    }, /* 175 */
    /***/
    function(t, e, n) {
        t.exports = {
            default: n(189),
            __esModule: !0
        };
    }, /* 176 */
    /***/
    function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        e.__esModule = !0;
        var i = r(n(175)), o = r(n(174)), a = "function" == typeof o.default && "symbol" == typeof i.default ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof o.default && t.constructor === o.default && t !== o.default.prototype ? "symbol" : typeof t;
        };
        e.default = "function" == typeof o.default && "symbol" === a(i.default) ? function(t) {
            return void 0 === t ? "undefined" : a(t);
        } : function(t) {
            return t && "function" == typeof o.default && t.constructor === o.default && t !== o.default.prototype ? "symbol" : void 0 === t ? "undefined" : a(t);
        };
    }, /* 177 */
    /***/
    function(t, e, n) {
        t.exports = n(385);
    }, /* 178 */
    /***/
    function(t, e, n) {
        "use strict";
        const r = /\s+at.*(?:\(|\s)(.*)\)?/, i = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/babel-polyfill\/.*)?\w+)\.js:\d+:\d+)|native)/, o = n(382).homedir();
        t.exports = ((t, e) => (e = Object.assign({
            pretty: !1
        }, e), t.replace(/\\/g, "/").split("\n").filter(t => {
            const e = t.match(r);
            if (null === e || !e[1]) return !0;
            const n = e[1];
            // Electron
            // Electron
            return !n.includes(".app/Contents/Resources/electron.asar") && !n.includes(".app/Contents/Resources/default_app.asar") && !i.test(n);
        }).filter(t => "" !== t.trim()).map(t => e.pretty ? t.replace(r, (t, e) => t.replace(e, e.replace(o, "~"))) : t).join("\n")));
    }, /* 179 */
    /***/
    function(t, e, n) {
        n(32), n(213), t.exports = n(1).Array.from;
    }, /* 180 */
    /***/
    function(t, e, n) {
        n(45), n(32), t.exports = n(211);
    }, /* 181 */
    /***/
    function(t, e, n) {
        n(45), n(32), t.exports = n(212);
    }, /* 182 */
    /***/
    function(t, e, n) {
        var r = n(1), i = r.JSON || (r.JSON = {
            stringify: JSON.stringify
        });
        t.exports = function(t) {
            // eslint-disable-line no-unused-vars
            return i.stringify.apply(i, arguments);
        };
    }, /* 183 */
    /***/
    function(t, e, n) {
        n(215), t.exports = n(1).Object.assign;
    }, /* 184 */
    /***/
    function(t, e, n) {
        n(216);
        var r = n(1).Object;
        t.exports = function(t, e, n) {
            return r.defineProperty(t, e, n);
        };
    }, /* 185 */
    /***/
    function(t, e, n) {
        n(217);
        var r = n(1).Object;
        t.exports = function(t, e) {
            return r.getOwnPropertyDescriptor(t, e);
        };
    }, /* 186 */
    /***/
    function(t, e, n) {
        n(218), t.exports = n(1).Object.getPrototypeOf;
    }, /* 187 */
    /***/
    function(t, e, n) {
        n(114), n(32), n(45), n(219), t.exports = n(1).Promise;
    }, /* 188 */
    /***/
    function(t, e, n) {
        n(220), n(114), n(221), n(222), t.exports = n(1).Symbol;
    }, /* 189 */
    /***/
    function(t, e, n) {
        n(32), n(45), t.exports = n(73).f("iterator");
    }, /* 190 */
    /***/
    function(t, e) {
        t.exports = function() {};
    }, /* 191 */
    /***/
    function(t, e) {
        t.exports = function(t, e, n, r) {
            if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");
            return t;
        };
    }, /* 192 */
    /***/
    function(t, e, n) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var r = n(9), i = n(70), o = n(210);
        t.exports = function(t) {
            return function(e, n, a) {
                var u, c = r(e), s = i(c.length), f = o(a, s);
                // Array#includes uses SameValueZero equality algorithm
                if (t && n != n) {
                    for (;s > f; ) if ((u = c[f++]) != u) return !0;
                } else for (;s > f; f++) if ((t || f in c) && c[f] === n) return t || f || 0;
                return !t && -1;
            };
        };
    }, /* 193 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(6), i = n(31);
        t.exports = function(t, e, n) {
            e in t ? r.f(t, e, i(0, n)) : t[e] = n;
        };
    }, /* 194 */
    /***/
    function(t, e, n) {
        // all enumerable object keys, includes symbols
        var r = n(30), i = n(66), o = n(41);
        t.exports = function(t) {
            var e = r(t), n = i.f;
            if (n) for (var a, u = n(t), c = o.f, s = 0; u.length > s; ) c.call(t, a = u[s++]) && e.push(a);
            return e;
        };
    }, /* 195 */
    /***/
    function(t, e, n) {
        var r = n(28), i = n(103), o = n(102), a = n(7), u = n(70), c = n(74), s = {}, f = {};
        (e = t.exports = function(t, e, n, l, p) {
            var d, h, v, y, g = p ? function() {
                return t;
            } : c(t), m = r(n, l, e ? 2 : 1), x = 0;
            if ("function" != typeof g) throw TypeError(t + " is not iterable!");
            // fast case for arrays with default iterator
            if (o(g)) {
                for (d = u(t.length); d > x; x++) if ((y = e ? m(a(h = t[x])[0], h[1]) : m(t[x])) === s || y === f) return y;
            } else for (v = g.call(t); !(h = v.next()).done; ) if ((y = i(v, m, h.value, e)) === s || y === f) return y;
        }).BREAK = s, e.RETURN = f;
    }, /* 196 */
    /***/
    function(t, e) {
        // fast apply, http://jsperf.lnkit.com/fast-apply/5
        t.exports = function(t, e, n) {
            var r = void 0 === n;
            switch (e.length) {
              case 0:
                return r ? t() : t.call(n);

              case 1:
                return r ? t(e[0]) : t.call(n, e[0]);

              case 2:
                return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);

              case 3:
                return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);

              case 4:
                return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);
            }
            return t.apply(n, e);
        };
    }, /* 197 */
    /***/
    function(t, e, n) {
        // 7.2.2 IsArray(argument)
        var r = n(27);
        t.exports = Array.isArray || function(t) {
            return "Array" == r(t);
        };
    }, /* 198 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(106), i = n(31), o = n(42), a = {};
        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        n(14)(a, n(2)("iterator"), function() {
            return this;
        }), t.exports = function(t, e, n) {
            t.prototype = r(a, {
                next: i(1, n)
            }), o(t, e + " Iterator");
        };
    }, /* 199 */
    /***/
    function(t, e) {
        t.exports = function(t, e) {
            return {
                value: e,
                done: !!t
            };
        };
    }, /* 200 */
    /***/
    function(t, e, n) {
        var r = n(30), i = n(9);
        t.exports = function(t, e) {
            for (var n, o = i(t), a = r(o), u = a.length, c = 0; u > c; ) if (o[n = a[c++]] === e) return n;
        };
    }, /* 201 */
    /***/
    function(t, e, n) {
        var r = n(44)("meta"), i = n(29), o = n(13), a = n(6).f, u = 0, c = Object.isExtensible || function() {
            return !0;
        }, s = !n(17)(function() {
            return c(Object.preventExtensions({}));
        }), f = function(t) {
            a(t, r, {
                value: {
                    i: "O" + ++u,
                    // object ID
                    w: {}
                }
            });
        }, l = t.exports = {
            KEY: r,
            NEED: !1,
            fastKey: function(t, e) {
                // return primitive with prefix
                if (!i(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                if (!o(t, r)) {
                    // can't set metadata to uncaught frozen object
                    if (!c(t)) return "F";
                    // not necessary to add metadata
                    if (!e) return "E";
                    // add missing metadata
                    f(t);
                }
                return t[r].i;
            },
            getWeak: function(t, e) {
                if (!o(t, r)) {
                    // can't set metadata to uncaught frozen object
                    if (!c(t)) return !0;
                    // not necessary to add metadata
                    if (!e) return !1;
                    // add missing metadata
                    f(t);
                }
                return t[r].w;
            },
            onFreeze: function(t) {
                return s && l.NEED && c(t) && !o(t, r) && f(t), t;
            }
        };
    }, /* 202 */
    /***/
    function(t, e, n) {
        var r = n(5), i = n(113).set, o = r.MutationObserver || r.WebKitMutationObserver, a = r.process, u = r.Promise, c = "process" == n(27)(a);
        t.exports = function() {
            var t, e, n, s = function() {
                var r, i;
                for (c && (r = a.domain) && r.exit(); t; ) {
                    i = t.fn, t = t.next;
                    try {
                        i();
                    } catch (r) {
                        throw t ? n() : e = void 0, r;
                    }
                }
                e = void 0, r && r.enter();
            };
            // Node.js
            if (c) n = function() {
                a.nextTick(s);
            }; else if (o) {
                var f = !0, l = document.createTextNode("");
                new o(s).observe(l, {
                    characterData: !0
                }), // eslint-disable-line no-new
                n = function() {
                    l.data = f = !f;
                };
            } else if (u && u.resolve) {
                var p = u.resolve();
                n = function() {
                    p.then(s);
                };
            } else n = function() {
                // strange IE + webpack dev server bug - use .call(global)
                i.call(r, s);
            };
            return function(r) {
                var i = {
                    fn: r,
                    next: void 0
                };
                e && (e.next = i), t || (t = i, n()), e = i;
            };
        };
    }, /* 203 */
    /***/
    function(t, e, n) {
        "use strict";
        // 19.1.2.1 Object.assign(target, source, ...)
        var r = n(30), i = n(66), o = n(41), a = n(43), u = n(101), c = Object.assign;
        // should work with symbols and should have deterministic property order (V8 bug)
        t.exports = !c || n(17)(function() {
            var t = {}, e = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
            return t[n] = 7, r.split("").forEach(function(t) {
                e[t] = t;
            }), 7 != c({}, t)[n] || Object.keys(c({}, e)).join("") != r;
        }) ? function(t, e) {
            for (// eslint-disable-line no-unused-vars
            var n = a(t), c = arguments.length, s = 1, f = i.f, l = o.f; c > s; ) for (var p, d = u(arguments[s++]), h = f ? r(d).concat(f(d)) : r(d), v = h.length, y = 0; v > y; ) l.call(d, p = h[y++]) && (n[p] = d[p]);
            return n;
        } : c;
    }, /* 204 */
    /***/
    function(t, e, n) {
        var r = n(6), i = n(7), o = n(30);
        t.exports = n(8) ? Object.defineProperties : function(t, e) {
            i(t);
            for (var n, a = o(e), u = a.length, c = 0; u > c; ) r.f(t, n = a[c++], e[n]);
            return t;
        };
    }, /* 205 */
    /***/
    function(t, e, n) {
        // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
        var r = n(9), i = n(108).f, o = {}.toString, a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        t.exports.f = function(t) {
            return a && "[object Window]" == o.call(t) ? function(t) {
                try {
                    return i(t);
                } catch (t) {
                    return a.slice();
                }
            }(t) : i(r(t));
        };
    }, /* 206 */
    /***/
    function(t, e, n) {
        var r = n(14);
        t.exports = function(t, e, n) {
            for (var i in e) n && t[i] ? t[i] = e[i] : r(t, i, e[i]);
            return t;
        };
    }, /* 207 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(5), i = n(1), o = n(6), a = n(8), u = n(2)("species");
        t.exports = function(t) {
            var e = "function" == typeof i[t] ? i[t] : r[t];
            a && e && !e[u] && o.f(e, u, {
                configurable: !0,
                get: function() {
                    return this;
                }
            });
        };
    }, /* 208 */
    /***/
    function(t, e, n) {
        // 7.3.20 SpeciesConstructor(O, defaultConstructor)
        var r = n(7), i = n(61), o = n(2)("species");
        t.exports = function(t, e) {
            var n, a = r(t).constructor;
            return void 0 === a || void 0 == (n = r(a)[o]) ? e : i(n);
        };
    }, /* 209 */
    /***/
    function(t, e, n) {
        var r = n(69), i = n(63);
        // true  -> String#at
        // false -> String#codePointAt
        t.exports = function(t) {
            return function(e, n) {
                var o, a, u = String(i(e)), c = r(n), s = u.length;
                return c < 0 || c >= s ? t ? "" : void 0 : (o = u.charCodeAt(c)) < 55296 || o > 56319 || c + 1 === s || (a = u.charCodeAt(c + 1)) < 56320 || a > 57343 ? t ? u.charAt(c) : o : t ? u.slice(c, c + 2) : a - 56320 + (o - 55296 << 10) + 65536;
            };
        };
    }, /* 210 */
    /***/
    function(t, e, n) {
        var r = n(69), i = Math.max, o = Math.min;
        t.exports = function(t, e) {
            return (t = r(t)) < 0 ? i(t + e, 0) : o(t, e);
        };
    }, /* 211 */
    /***/
    function(t, e, n) {
        var r = n(7), i = n(74);
        t.exports = n(1).getIterator = function(t) {
            var e = i(t);
            if ("function" != typeof e) throw TypeError(t + " is not iterable!");
            return r(e.call(t));
        };
    }, /* 212 */
    /***/
    function(t, e, n) {
        var r = n(62), i = n(2)("iterator"), o = n(18);
        t.exports = n(1).isIterable = function(t) {
            var e = Object(t);
            return void 0 !== e[i] || "@@iterator" in e || o.hasOwnProperty(r(e));
        };
    }, /* 213 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(28), i = n(12), o = n(43), a = n(103), u = n(102), c = n(70), s = n(193), f = n(74);
        i(i.S + i.F * !n(105)(function(t) {
            Array.from(t);
        }), "Array", {
            // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
            from: function(t) {
                var e, n, i, l, p = o(t), d = "function" == typeof this ? this : Array, h = arguments.length, v = h > 1 ? arguments[1] : void 0, y = void 0 !== v, g = 0, m = f(p);
                // if object isn't iterable or it's array with default iterator - use simple case
                if (y && (v = r(v, h > 2 ? arguments[2] : void 0, 2)), void 0 == m || d == Array && u(m)) for (n = new d(e = c(p.length)); e > g; g++) s(n, g, y ? v(p[g], g) : p[g]); else for (l = m.call(p), 
                n = new d(); !(i = l.next()).done; g++) s(n, g, y ? a(l, v, [ i.value, g ], !0) : i.value);
                return n.length = g, n;
            }
        });
    }, /* 214 */
    /***/
    function(t, e, n) {
        "use strict";
        var r = n(190), i = n(199), o = n(18), a = n(9);
        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        t.exports = n(104)(Array, "Array", function(t, e) {
            this._t = a(t), // target
            this._i = 0, // next index
            this._k = e;
        }, function() {
            var t = this._t, e = this._k, n = this._i++;
            return !t || n >= t.length ? (this._t = void 0, i(1)) : "keys" == e ? i(0, n) : "values" == e ? i(0, t[n]) : i(0, [ n, t[n] ]);
        }, "values"), // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        o.Arguments = o.Array, r("keys"), r("values"), r("entries");
    }, /* 215 */
    /***/
    function(t, e, n) {
        // 19.1.3.1 Object.assign(target, source)
        var r = n(12);
        r(r.S + r.F, "Object", {
            assign: n(203)
        });
    }, /* 216 */
    /***/
    function(t, e, n) {
        var r = n(12);
        // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
        r(r.S + r.F * !n(8), "Object", {
            defineProperty: n(6).f
        });
    }, /* 217 */
    /***/
    function(t, e, n) {
        // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
        var r = n(9), i = n(107).f;
        n(111)("getOwnPropertyDescriptor", function() {
            return function(t, e) {
                return i(r(t), e);
            };
        });
    }, /* 218 */
    /***/
    function(t, e, n) {
        // 19.1.2.9 Object.getPrototypeOf(O)
        var r = n(43), i = n(109);
        n(111)("getPrototypeOf", function() {
            return function(t) {
                return i(r(t));
            };
        });
    }, /* 219 */
    /***/
    function(t, e, n) {
        "use strict";
        var r, i, o, a = n(40), u = n(5), c = n(28), s = n(62), f = n(12), l = n(29), p = n(61), d = n(191), h = n(195), v = n(208), y = n(113).set, g = n(202)(), m = "Promise", x = u.TypeError, b = u.process, _ = u[m], w = "process" == s(b = u.process), O = function() {}, A = !!function() {
            try {
                // correct subclassing with @@species support
                var t = _.resolve(1), e = (t.constructor = {})[n(2)("species")] = function(t) {
                    t(O, O);
                };
                // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
                return (w || "function" == typeof PromiseRejectionEvent) && t.then(O) instanceof e;
            } catch (t) {}
        }(), j = function(t, e) {
            // with library wrapper special case
            return t === e || t === _ && e === o;
        }, E = function(t) {
            var e;
            return !(!l(t) || "function" != typeof (e = t.then)) && e;
        }, k = function(t) {
            return j(_, t) ? new I(t) : new i(t);
        }, I = i = function(t) {
            var e, n;
            this.promise = new t(function(t, r) {
                if (void 0 !== e || void 0 !== n) throw x("Bad Promise constructor");
                e = t, n = r;
            }), this.resolve = p(e), this.reject = p(n);
        }, R = function(t) {
            try {
                t();
            } catch (t) {
                return {
                    error: t
                };
            }
        }, C = function(t, e) {
            if (!t._n) {
                t._n = !0;
                var n = t._c;
                g(function() {
                    for (var r = t._v, i = 1 == t._s, o = 0, a = function(e) {
                        var n, o, a = i ? e.ok : e.fail, u = e.resolve, c = e.reject, s = e.domain;
                        try {
                            a ? (i || (2 == t._h && P(t), t._h = 1), !0 === a ? n = r : (s && s.enter(), n = a(r), 
                            s && s.exit()), n === e.promise ? c(x("Promise-chain cycle")) : (o = E(n)) ? o.call(n, u, c) : u(n)) : c(r);
                        } catch (t) {
                            c(t);
                        }
                    }; n.length > o; ) a(n[o++]);
                    // variable length - can't use forEach
                    t._c = [], t._n = !1, e && !t._h && F(t);
                });
            }
        }, F = function(t) {
            y.call(u, function() {
                var e, n, r, i = t._v;
                if (S(t) && (e = R(function() {
                    w ? b.emit("unhandledRejection", i, t) : (n = u.onunhandledrejection) ? n({
                        promise: t,
                        reason: i
                    }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", i);
                }), // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
                t._h = w || S(t) ? 2 : 1), t._a = void 0, e) throw e.error;
            });
        }, S = function(t) {
            if (1 == t._h) return !1;
            for (var e, n = t._a || t._c, r = 0; n.length > r; ) if ((e = n[r++]).fail || !S(e.promise)) return !1;
            return !0;
        }, P = function(t) {
            y.call(u, function() {
                var e;
                w ? b.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({
                    promise: t,
                    reason: t._v
                });
            });
        }, M = function(t) {
            var e = this;
            e._d || (e._d = !0, // unwrap
            (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), C(e, !0));
        }, L = function(t) {
            var e, n = this;
            if (!n._d) {
                n._d = !0, n = n._w || n;
                // unwrap
                try {
                    if (n === t) throw x("Promise can't be resolved itself");
                    (e = E(t)) ? g(function() {
                        var r = {
                            _w: n,
                            _d: !1
                        };
                        // wrap
                        try {
                            e.call(t, c(L, r, 1), c(M, r, 1));
                        } catch (t) {
                            M.call(r, t);
                        }
                    }) : (n._v = t, n._s = 1, C(n, !1));
                } catch (t) {
                    M.call({
                        _w: n,
                        _d: !1
                    }, t);
                }
            }
        };
        // constructor polyfill
        A || (// 25.4.3.1 Promise(executor)
        _ = function(t) {
            d(this, _, m, "_h"), p(t), r.call(this);
            try {
                t(c(L, this, 1), c(M, this, 1));
            } catch (t) {
                M.call(this, t);
            }
        }, (r = function(t) {
            this._c = [], // <- awaiting reactions
            this._a = void 0, // <- checked in isUnhandled reactions
            this._s = 0, // <- state
            this._d = !1, // <- done
            this._v = void 0, // <- value
            this._h = 0, // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
            this._n = !1;
        }).prototype = n(206)(_.prototype, {
            // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
            then: function(t, e) {
                var n = k(v(this, _));
                return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, 
                n.domain = w ? b.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && C(this, !1), 
                n.promise;
            },
            // 25.4.5.1 Promise.prototype.catch(onRejected)
            catch: function(t) {
                return this.then(void 0, t);
            }
        }), I = function() {
            var t = new r();
            this.promise = t, this.resolve = c(L, t, 1), this.reject = c(M, t, 1);
        }), f(f.G + f.W + f.F * !A, {
            Promise: _
        }), n(42)(_, m), n(207)(m), o = n(1)[m], // statics
        f(f.S + f.F * !A, m, {
            // 25.4.4.5 Promise.reject(r)
            reject: function(t) {
                var e = k(this);
                return (0, e.reject)(t), e.promise;
            }
        }), f(f.S + f.F * (a || !A), m, {
            // 25.4.4.6 Promise.resolve(x)
            resolve: function(t) {
                // instanceof instead of internal slot check because we should fix it without replacement native Promise core
                if (t instanceof _ && j(t.constructor, this)) return t;
                var e = k(this);
                return (0, e.resolve)(t), e.promise;
            }
        }), f(f.S + f.F * !(A && n(105)(function(t) {
            _.all(t).catch(O);
        })), m, {
            // 25.4.4.1 Promise.all(iterable)
            all: function(t) {
                var e = this, n = k(e), r = n.resolve, i = n.reject, o = R(function() {
                    var n = [], o = 0, a = 1;
                    h(t, !1, function(t) {
                        var u = o++, c = !1;
                        n.push(void 0), a++, e.resolve(t).then(function(t) {
                            c || (c = !0, n[u] = t, --a || r(n));
                        }, i);
                    }), --a || r(n);
                });
                return o && i(o.error), n.promise;
            },
            // 25.4.4.4 Promise.race(iterable)
            race: function(t) {
                var e = this, n = k(e), r = n.reject, i = R(function() {
                    h(t, !1, function(t) {
                        e.resolve(t).then(n.resolve, r);
                    });
                });
                return i && r(i.error), n.promise;
            }
        });
    }, /* 220 */
    /***/
    function(t, e, n) {
        "use strict";
        // ECMAScript 6 symbols shim
        var r = n(5), i = n(13), o = n(8), a = n(12), u = n(112), c = n(201).KEY, s = n(17), f = n(68), l = n(42), p = n(44), d = n(2), h = n(73), v = n(72), y = n(200), g = n(194), m = n(197), x = n(7), b = n(9), _ = n(71), w = n(31), O = n(106), A = n(205), j = n(107), E = n(6), k = n(30), I = j.f, R = E.f, C = A.f, F = r.Symbol, S = r.JSON, P = S && S.stringify, M = "prototype", L = d("_hidden"), T = d("toPrimitive"), N = {}.propertyIsEnumerable, D = f("symbol-registry"), K = f("symbols"), W = f("op-symbols"), B = Object[M], $ = "function" == typeof F, q = r.QObject, z = !q || !q[M] || !q[M].findChild, U = o && s(function() {
            return 7 != O(R({}, "a", {
                get: function() {
                    return R(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(t, e, n) {
            var r = I(B, e);
            r && delete B[e], R(t, e, n), r && t !== B && R(B, e, r);
        } : R, J = function(t) {
            var e = K[t] = O(F[M]);
            return e._k = t, e;
        }, Q = $ && "symbol" == typeof F.iterator ? function(t) {
            return "symbol" == typeof t;
        } : function(t) {
            return t instanceof F;
        }, V = function(t, e, n) {
            return t === B && V(W, e, n), x(t), e = _(e, !0), x(n), i(K, e) ? (n.enumerable ? (i(t, L) && t[L][e] && (t[L][e] = !1), 
            n = O(n, {
                enumerable: w(0, !1)
            })) : (i(t, L) || R(t, L, w(1, {})), t[L][e] = !0), U(t, e, n)) : R(t, e, n);
        }, H = function(t, e) {
            x(t);
            for (var n, r = g(e = b(e)), i = 0, o = r.length; o > i; ) V(t, n = r[i++], e[n]);
            return t;
        }, G = function(t) {
            var e = N.call(this, t = _(t, !0));
            return !(this === B && i(K, t) && !i(W, t)) && (!(e || !i(this, t) || !i(K, t) || i(this, L) && this[L][t]) || e);
        }, Y = function(t, e) {
            if (t = b(t), e = _(e, !0), t !== B || !i(K, e) || i(W, e)) {
                var n = I(t, e);
                return !n || !i(K, e) || i(t, L) && t[L][e] || (n.enumerable = !0), n;
            }
        }, Z = function(t) {
            for (var e, n = C(b(t)), r = [], o = 0; n.length > o; ) i(K, e = n[o++]) || e == L || e == c || r.push(e);
            return r;
        }, X = function(t) {
            for (var e, n = t === B, r = C(n ? W : b(t)), o = [], a = 0; r.length > a; ) !i(K, e = r[a++]) || n && !i(B, e) || o.push(K[e]);
            return o;
        };
        // 19.4.1.1 Symbol([description])
        $ || (u((F = function() {
            if (this instanceof F) throw TypeError("Symbol is not a constructor!");
            var t = p(arguments.length > 0 ? arguments[0] : void 0), e = function(n) {
                this === B && e.call(W, n), i(this, L) && i(this[L], t) && (this[L][t] = !1), U(this, t, w(1, n));
            };
            return o && z && U(B, t, {
                configurable: !0,
                set: e
            }), J(t);
        })[M], "toString", function() {
            return this._k;
        }), j.f = Y, E.f = V, n(108).f = A.f = Z, n(41).f = G, n(66).f = X, o && !n(40) && u(B, "propertyIsEnumerable", G, !0), 
        h.f = function(t) {
            return J(d(t));
        }), a(a.G + a.W + a.F * !$, {
            Symbol: F
        });
        for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et; ) d(tt[et++]);
        for (var tt = k(d.store), et = 0; tt.length > et; ) v(tt[et++]);
        a(a.S + a.F * !$, "Symbol", {
            // 19.4.2.1 Symbol.for(key)
            for: function(t) {
                return i(D, t += "") ? D[t] : D[t] = F(t);
            },
            // 19.4.2.5 Symbol.keyFor(sym)
            keyFor: function(t) {
                if (Q(t)) return y(D, t);
                throw TypeError(t + " is not a symbol!");
            },
            useSetter: function() {
                z = !0;
            },
            useSimple: function() {
                z = !1;
            }
        }), a(a.S + a.F * !$, "Object", {
            // 19.1.2.2 Object.create(O [, Properties])
            create: function(t, e) {
                return void 0 === e ? O(t) : H(O(t), e);
            },
            // 19.1.2.4 Object.defineProperty(O, P, Attributes)
            defineProperty: V,
            // 19.1.2.3 Object.defineProperties(O, Properties)
            defineProperties: H,
            // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
            getOwnPropertyDescriptor: Y,
            // 19.1.2.7 Object.getOwnPropertyNames(O)
            getOwnPropertyNames: Z,
            // 19.1.2.8 Object.getOwnPropertySymbols(O)
            getOwnPropertySymbols: X
        }), // 24.3.2 JSON.stringify(value [, replacer [, space]])
        S && a(a.S + a.F * (!$ || s(function() {
            var t = F();
            // MS Edge converts symbol values to JSON as {}
            // WebKit converts symbol values to JSON as null
            // V8 throws on boxed symbols
            return "[null]" != P([ t ]) || "{}" != P({
                a: t
            }) || "{}" != P(Object(t));
        })), "JSON", {
            stringify: function(t) {
                if (void 0 !== t && !Q(t)) {
                    for (// IE8 returns string on undefined
                    var e, n, r = [ t ], i = 1; arguments.length > i; ) r.push(arguments[i++]);
                    return "function" == typeof (e = r[1]) && (n = e), !n && m(e) || (e = function(t, e) {
                        if (n && (e = n.call(this, t, e)), !Q(e)) return e;
                    }), r[1] = e, P.apply(S, r);
                }
            }
        }), // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
        F[M][T] || n(14)(F[M], T, F[M].valueOf), // 19.4.3.5 Symbol.prototype[@@toStringTag]
        l(F, "Symbol"), // 20.2.1.9 Math[@@toStringTag]
        l(Math, "Math", !0), // 24.3.3 JSON[@@toStringTag]
        l(r.JSON, "JSON", !0);
    }, /* 221 */
    /***/
    function(t, e, n) {
        n(72)("asyncIterator");
    }, /* 222 */
    /***/
    function(t, e, n) {
        n(72)("observable");
    }, /* 223 */
    /***/
    function(t, e, n) {
        "use strict";
        t.exports = ((t, e, n) => {
            // Support older versions: use the third parameter as options.indent
            // TODO: Remove the workaround in the next major version
            const r = "object" == typeof n ? Object.assign({
                indent: " "
            }, n) : {
                indent: n || " "
            };
            if (e = void 0 === e ? 1 : e, "string" != typeof t) throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
            if ("number" != typeof e) throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
            if ("string" != typeof r.indent) throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
            if (0 === e) return t;
            const i = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
            return t.replace(i, r.indent.repeat(e));
        });
    }, /* 224 */
    /***/
    function(t, e, n) {
        /*!
* js-data
* @version 3.0.1 - Homepage <http://www.js-data.io/>
* @author js-data project authors
* @copyright (c) 2014-2016 js-data project authors
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview js-data is a framework-agnostic, datastore-agnostic ORM/ODM for Node.js and the Browser.
*/
        !function(t, n) {
            n(e);
        }(0, function(t) {
            "use strict";
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
            function e() {
                var t = {};
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
                        value: function(e) {
                            return E.get(t, e);
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
                        value: function(e, n) {
                            return E.set(t, e, n);
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
                        value: function(e) {
                            return E.unset(t, e);
                        }
                    }
                });
            }
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
            function n(t) {
                e.call(this), t || (t = {}), /**
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
                this.debug = !!t.hasOwnProperty("debug") && !!t.debug, /**
   * Event listeners attached to this Component. __Do not modify.__ Use
   * {@link Component#on} and {@link Component#off} instead.
   *
   * @name Component#_listeners
   * @private
   * @instance
   * @since 3.0.0
   * @type {Object}
   */
                Object.defineProperty(this, "_listeners", {
                    value: {},
                    writable: !0
                });
            }
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
            function r(t) {
                E.classCallCheck(this, r), /**
   * The {@link Collection} on which this query operates.
   *
   * @name Query#collection
   * @since 3.0.0
   * @type {Collection}
   */
                this.collection = t, /**
   * The current data result of this query.
   *
   * @name Query#data
   * @since 3.0.0
   * @type {Array}
   */
                this.data = null;
            }
            function i(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                E.classCallCheck(this, i), e.type = this.constructor.TYPE_NAME, this.validateOptions(t, e), 
                "object" === (void 0 === t ? "undefined" : m(t)) && Object.defineProperty(this, "relatedMapper", {
                    value: t
                }), Object.defineProperty(this, "inverse", {
                    writable: !0
                }), E.fillIn(this, e);
            }
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
            function o(t, n) {
                E.classCallCheck(this, o), e.call(this), t || (t = {}), n || (n = {});
                var r = this._set, i = this.constructor.mapper;
                r(q, !0), r(z, !!n.noValidate), r(U, void 0 === n.keepChangeHistory ? !i || i.keepChangeHistory : n.keepChangeHistory);
                // Set the idAttribute value first, if it exists.
                var a = i ? E.get(t, i.idAttribute) : void 0;
                void 0 !== a && E.set(this, i.idAttribute, a), E.fillIn(this, t), r(q, !1), void 0 !== n.validateOnSet ? r(z, !n.validateOnSet) : i && void 0 !== i.validateOnSet ? r(z, !i.validateOnSet) : r(z, !1), 
                r(J, i ? i.toJSON(t) : E.plainCopy(t));
            }
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
            function a(t, e, n) {
                // Short-circuit comparison if a and b are strictly equal
                // This is absolutely necessary for indexed objects that
                // don't have the idAttribute field
                // Short-circuit comparison if a and b are strictly equal
                // This is absolutely necessary for indexed objects that
                // don't have the idAttribute field
                return t === e ? 0 : (n && (t = n(t), e = n(e)), null === t && null === e || void 0 === t && void 0 === e ? -1 : null === t || void 0 === t ? -1 : null === e || void 0 === e ? 1 : t < e ? -1 : t > e ? 1 : 0);
            }
            function u(t, e, n) {
                return t.splice(e, 0, n), t;
            }
            function c(t, e) {
                return t.splice(e, 1), t;
            }
            function s(t, e, n) {
                for (var r = 0, i = t.length, o = void 0, u = void 0; r < i; ) {
                    if (u = (r + i) / 2 | 0, 0 === (o = a(e, t[u], n))) return {
                        found: !0,
                        index: u
                    };
                    o < 0 ? i = u : r = u + 1;
                }
                return {
                    found: !1,
                    index: i
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
            function f(t, e) {
                if (E.classCallCheck(this, f), t || (t = []), !E.isArray(t)) throw new Error("fieldList must be an array.");
                e || (e = {}), this.fieldList = t, this.fieldGetter = e.fieldGetter, this.hashCode = e.hashCode, 
                this.isIndex = !0, this.keys = [], this.values = [];
            }
            function l(t, e) {
                E.classCallCheck(this, l), R.call(this, e), t && !E.isArray(t) && (e = t, t = []), 
                E.isString(e) && (e = {
                    idAttribute: e
                }), // Default values for arguments
                t || (t = []), e || (e = {}), Object.defineProperties(this, {
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
                        value: void 0,
                        writable: !0
                    },
                    // Query class used by this collection
                    queryClass: {
                        value: void 0,
                        writable: !0
                    }
                }), // Apply user-provided configuration
                E.fillIn(this, e), // Fill in any missing options with the defaults
                E.fillIn(this, E.copy(G)), this.queryClass || (this.queryClass = L);
                var n = this.recordId();
                Object.defineProperties(this, {
                    /**
     * The main index, which uses @{link Collection#recordId} as the key.
     *
     * @name Collection#index
     * @type {Index}
     */
                    index: {
                        value: new f([ n ], {
                            hashCode: function(t) {
                                return E.get(t, n);
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
                }), // Insert initial data into the collection
                (E.isObject(t) || E.isArray(t) && t.length) && this.add(t);
            }
            function p(t) {
                var e = this;
                t || (t = {}), // TODO: schema validation
                E.fillIn(this, t), "object" === this.type ? (this.properties = this.properties || {}, 
                E.forOwn(this.properties, function(t, n) {
                    t instanceof p || (e.properties[n] = new p(t));
                })) : "array" !== this.type || !this.items || this.items instanceof p || (this.items = new p(this.items)), 
                !this.extends || this.extends instanceof p || (this.extends = new p(this.extends)), 
                [ "allOf", "anyOf", "oneOf" ].forEach(function(t) {
                    e[t] && e[t].forEach(function(n, r) {
                        n instanceof p || (e[t][r] = new p(n));
                    });
                });
            }
            function d(t) {
                /**
   * The name for this Mapper. This is the minimum amount of meta information
   * required for a Mapper to be able to execute CRUD operations for a
   * Resource.
   *
   * @name Mapper#name
   * @since 3.0.0
   * @type {string}
   */
                if (E.classCallCheck(this, d), R.call(this), t || (t = {}), // Prepare certain properties to be non-enumerable
                Object.defineProperties(this, {
                    _adapters: {
                        value: void 0,
                        writable: !0
                    },
                    /**
     * The {@link Container} that holds this Mapper. __Do not modify.__
     *
     * @name Mapper#lifecycleMethods
     * @since 3.0.0
     * @type {Object}
     */
                    datastore: {
                        value: void 0,
                        writable: !0
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
                        value: wt
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
                        value: void 0,
                        writable: !0
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
                        value: void 0,
                        writable: !0
                    }
                }), // Apply user-provided configuration
                E.fillIn(this, t), // Fill in any missing options with the defaults
                E.fillIn(this, E.copy(Ot)), !this.name) throw E.err("new " + yt, "opts.name")(400, "string", this.name);
                // Create a subclass of Record that's tied to this Mapper
                if (// Setup schema, with an empty default schema if necessary
                this.schema && (this.schema.type || (this.schema.type = "object"), this.schema instanceof vt || (this.schema = new vt(this.schema || {
                    type: "object"
                }))), void 0 === this.recordClass) {
                    var e = Q;
                    this.recordClass = e.extend({
                        constructor: function() {
                            var t = function(n, r) {
                                E.classCallCheck(this, t), e.call(this, n, r);
                            };
                            return t;
                        }()
                    });
                }
                this.recordClass && (this.recordClass.mapper = this, /**
     * Functions that should be added to the prototype of {@link Mapper#recordClass}.
     *
     * @name Mapper#methods
     * @since 3.0.0
     * @type {Object}
     */
                E.isObject(this.methods) && E.addHiddenPropsToTarget(this.recordClass.prototype, this.methods), 
                // We can only apply the schema to the prototype of this.recordClass if the
                // class extends Record
                Q.prototype.isPrototypeOf(Object.create(this.recordClass.prototype)) && this.schema && this.schema.apply && this.applySchema && this.schema.apply(this.recordClass.prototype));
            }
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
            function h(t) {
                E.classCallCheck(this, h), R.call(this), t || (t = {}), Object.defineProperties(this, {
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
                        value: void 0,
                        writable: !0
                    }
                }), // Apply options provided by the user
                E.fillIn(this, t), /**
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
                this.mapperDefaults = this.mapperDefaults || {}, // Use the Mapper class if the user didn't provide a mapperClass
                this.mapperClass || (this.mapperClass = At);
            }
            function v(t) {
                E.classCallCheck(this, v), t || (t = {}), // Fill in any missing options with the defaults
                E.fillIn(t, Ct), h.call(this, t), this.collectionClass = this.collectionClass || Y, 
                this._collections = {}, this._pendingQueries = {}, this._completedQueries = {};
            }
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
            function y(t, e) {
                // Make sure this collection has a reference to a datastore
                if (E.classCallCheck(this, y), // Make sure this collection has somewhere to store "added" timestamps
                Object.defineProperties(this, {
                    _added: {
                        value: {}
                    },
                    datastore: {
                        writable: !0,
                        value: void 0
                    }
                }), Y.call(this, t, e), !this.datastore) throw E.err("new " + Pt, "opts.datastore")(400, "DataStore", this.datastore);
            }
            function g(t) {
                E.classCallCheck(this, g), t || (t = {}), // Fill in any missing options with the defaults
                E.fillIn(t, Lt), t.collectionClass || (t.collectionClass = Mt), St.call(this, t);
            }
            var m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            }, x = function(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t;
            }, b = function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                    return n;
                }
                return Array.from(t);
            }, _ = Object.prototype.toString, w = /^(.+)\.(.+)$/, O = {
                "400": function() {
                    return "expected: " + arguments[0] + ", found: " + (arguments[2] ? arguments[1] : m(arguments[1]));
                },
                "404": function() {
                    return arguments[0] + " not found";
                }
            }, A = function(t) {
                return _.call(t);
            }, j = function(t) {
                return !!t && "object" === (void 0 === t ? "undefined" : m(t)) && t.constructor === Object;
            }, E = {
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
                _: function(t, e) {
                    E.forOwn(e, function(e, n) {
                        n && void 0 === t[n] && !E.isFunction(e) && 0 !== n.indexOf("_") && (t[n] = e);
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
                _forRelation: function(t, e, n, r) {
                    var i = e.relation, o = null, a = void 0;
                    if (t || (t = {}), t.with || (t.with = []), (a = E._getIndex(t.with, i)) >= 0 ? o = i : (a = E._getIndex(t.with, e.localField)) >= 0 && (o = e.localField), 
                    t.withAll) n.call(r, e, {}); else if (o) {
                        var u = {};
                        E.fillIn(u, e.getRelation()), E.fillIn(u, t), u.with = t.with.slice(), u._activeWith = u.with.splice(a, 1)[0], 
                        u.with.forEach(function(t, e) {
                            t && 0 === t.indexOf(o) && t.length >= o.length && "." === t[o.length] ? u.with[e] = t.substr(o.length + 1) : u.with[e] = "";
                        }), n.call(r, e, u);
                    }
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
                _getIndex: function(t, e) {
                    var n = -1;
                    return t.forEach(function(t, r) {
                        return t === e ? (n = r, !1) : E.isObject(t) && t.relation === e ? (n = r, !1) : void 0;
                    }), n;
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
                addHiddenPropsToTarget: function(t, e) {
                    var n = {};
                    Object.keys(e).forEach(function(t) {
                        var r = Object.getOwnPropertyDescriptor(e, t);
                        r.enumerable = !1, n[t] = r;
                    }), Object.defineProperties(t, n);
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
                areDifferent: function(t, e, n) {
                    n || (n = {});
                    var r = E.diffObjects(t, e, n);
                    return Object.keys(r.added).length + Object.keys(r.removed).length + Object.keys(r.changed).length > 0;
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
                classCallCheck: function(t, e) {
                    if (!(t instanceof e)) throw E.err("" + e.name)(500, "Cannot call a class as a function");
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
                copy: function(t, e, n, r, i, o) {
                    if (e) {
                        if (t === e) throw E.err("utils.copy")(500, "Cannot copy! Source and destination are identical.");
                        if (n = n || [], r = r || [], E.isObject(t)) {
                            var a = n.indexOf(t);
                            if (-1 !== a) return r[a];
                            n.push(t), r.push(e);
                        }
                        var u = void 0;
                        if (E.isArray(t)) {
                            var c = void 0;
                            for (e.length = 0, c = 0; c < t.length; c++) u = E.copy(t[c], null, n, r, i, o), 
                            E.isObject(t[c]) && (n.push(t[c]), r.push(u)), e.push(u);
                        } else {
                            E.isArray(e) ? e.length = 0 : E.forOwn(e, function(t, n) {
                                delete e[n];
                            });
                            for (var s in t) if (t.hasOwnProperty(s)) {
                                if (E.isBlacklisted(s, i)) continue;
                                u = E.copy(t[s], null, n, r, i, o), E.isObject(t[s]) && (n.push(t[s]), r.push(u)), 
                                e[s] = u;
                            }
                        }
                    } else e = t, t && (E.isArray(t) ? e = E.copy(t, [], n, r, i, o) : E.isDate(t) ? e = new Date(t.getTime()) : E.isRegExp(t) ? (e = new RegExp(t.source, t.toString().match(/[^/]*$/)[0])).lastIndex = t.lastIndex : E.isObject(t) && (e = o ? E.copy(t, {}, n, r, i, o) : E.copy(t, Object.create(Object.getPrototypeOf(t)), n, r, i, o)));
                    return e;
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
                deepFillIn: function(t, e) {
                    return e && E.forOwn(e, function(e, n) {
                        var r = t[n];
                        j(e) && j(r) ? E.deepFillIn(r, e) : t.hasOwnProperty(n) && void 0 !== t[n] || (t[n] = e);
                    }), t;
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
                deepMixIn: function(t, e) {
                    if (e) for (var n in e) {
                        var r = e[n], i = t[n];
                        j(r) && j(i) ? E.deepMixIn(i, r) : t[n] = r;
                    }
                    return t;
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
                diffObjects: function(t, e, n) {
                    n || (n = {});
                    var r = n.equalsFn, i = n.ignore, o = {
                        added: {},
                        changed: {},
                        removed: {}
                    };
                    E.isFunction(r) || (r = E.deepEqual);
                    var a = Object.keys(t).filter(function(t) {
                        return !E.isBlacklisted(t, i);
                    }), u = Object.keys(e).filter(function(t) {
                        return !E.isBlacklisted(t, i);
                    });
                    // Check for properties that were added or changed
                    // Check for properties that were removed
                    return a.forEach(function(n) {
                        var i = e[n], a = t[n];
                        r(i, a) || (void 0 === i ? o.added[n] = a : o.changed[n] = a);
                    }), u.forEach(function(n) {
                        var r = e[n];
                        void 0 === t[n] && void 0 !== r && (o.removed[n] = void 0);
                    }), o;
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
                equal: function(t, e) {
                    return t == e;
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
                err: function(t, e) {
                    return function(n) {
                        var r = "[" + t + ":" + e + "] ", i = O[n].apply(null, Array.prototype.slice.call(arguments, 1));
                        return i = "" + r + i + "\nhttp://www.js-data.io/v3.0/docs/errors#" + n, new Error(i);
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
                eventify: function(t, e, n) {
                    t = t || this;
                    var r = {};
                    e || n || (e = function() {
                        return r;
                    }, n = function(t) {
                        r = t;
                    }), Object.defineProperties(t, {
                        emit: {
                            value: function() {
                                for (var t = e.call(this) || {}, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                                var o = r.shift(), a = t[o] || [], u = void 0;
                                for (u = 0; u < a.length; u++) a[u].f.apply(a[u].c, r);
                                for (a = t.all || [], r.unshift(o), u = 0; u < a.length; u++) a[u].f.apply(a[u].c, r);
                            }
                        },
                        off: {
                            value: function(t, r) {
                                var i = e.call(this)[t];
                                if (i) if (r) {
                                    for (var o = 0; o < i.length; o++) if (i[o].f === r) {
                                        i.splice(o, 1);
                                        break;
                                    }
                                } else i.splice(0, i.length); else n.call(this, {});
                            }
                        },
                        on: {
                            value: function(t, r, i) {
                                e.call(this) || n.call(this, {});
                                var o = e.call(this);
                                o[t] = o[t] || [], o[t].push({
                                    c: i,
                                    f: r
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
                extend: function(t, e) {
                    var n = this, r = void 0;
                    t || (t = {}), e || (e = {}), t.hasOwnProperty("constructor") ? (r = t.constructor, 
                    delete t.constructor) : r = function() {
                        E.classCallCheck(this, r);
                        for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
                        n.apply(this, e);
                    }, // Setup inheritance of instance members
                    r.prototype = Object.create(n && n.prototype, {
                        constructor: {
                            configurable: !0,
                            enumerable: !1,
                            value: r,
                            writable: !0
                        }
                    });
                    var i = Object;
                    // Setup inheritance of static members
                    return i.setPrototypeOf ? i.setPrototypeOf(r, n) : e.strictEs6Class ? r.__proto__ = n : E.forOwn(n, function(t, e) {
                        r[e] = t;
                    }), r.hasOwnProperty("__super__") || Object.defineProperty(r, "__super__", {
                        configurable: !0,
                        value: n
                    }), E.addHiddenPropsToTarget(r.prototype, t), E.fillIn(r, e), r;
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
                fillIn: function(t, e) {
                    E.forOwn(e, function(e, n) {
                        t.hasOwnProperty(n) && void 0 !== t[n] || (t[n] = e);
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
                findIndex: function(t, e) {
                    var n = -1;
                    return t ? (t.forEach(function(t, r) {
                        if (e(t)) return n = r, !1;
                    }), n) : n;
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
                forEachRelation: function(t, e, n, r) {
                    var i = t.relationList || [];
                    i.length && i.forEach(function(t) {
                        E._forRelation(e, t, n, r);
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
                forOwn: function(t, e, n) {
                    var r = Object.keys(t), i = r.length, o = void 0;
                    for (o = 0; o < i && !1 !== e.call(n, t[r[o]], r[o], t); o++) ;
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
                fromJson: function(t) {
                    return E.isString(t) ? JSON.parse(t) : t;
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
                get: function(t, e) {
                    if (e) {
                        for (var n = e.split("."), r = n.pop(); e = n.shift(); ) if (null == (// eslint-disable-line
                        t = t[e])) // eslint-disable-line
                        return;
                        return t[r];
                    }
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
                getSuper: function(t, e) {
                    var n = e ? t : t.constructor;
                    return n.hasOwnProperty("__super__") ? n.__super__ : Object.getPrototypeOf(n) || n.__proto__;
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
                intersection: function(t, e) {
                    if (!t || !e) return [];
                    var n = [], r = void 0, i = void 0, o = t.length;
                    for (i = 0; i < o; i++) r = t[i], -1 === n.indexOf(r) && -1 !== e.indexOf(r) && n.push(r);
                    return n;
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
                isBlacklisted: function(t, e) {
                    if (!e || !e.length) return !1;
                    for (var n = void 0, r = 0; r < e.length; r++) if ("[object RegExp]" === A(e[r]) && e[r].test(t) || e[r] === t) return !!(n = t);
                    return !!n;
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
                isBoolean: function(t) {
                    return "[object Boolean]" === A(t);
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
                isDate: function(t) {
                    return t && "object" === (void 0 === t ? "undefined" : m(t)) && "[object Date]" === A(t);
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
                isFunction: function(t) {
                    return "function" == typeof t || t && "[object Function]" === A(t);
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
                isInteger: function(t) {
                    return "[object Number]" === A(t) && t == function(t) {
                        if (!t) return 0;
                        if ((// Coerce to number
                        t = +t) == 1 / 0 || t === -1 / 0) return 1.7976931348623157e308 * (t < 0 ? -1 : 1);
                        var e = t % 1;
                        return t == t ? e ? t - e : t : 0;
                    }(t);
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
                isNull: function(t) {
                    return null === t;
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
                isNumber: function(t) {
                    var e = void 0 === t ? "undefined" : m(t);
                    return "number" === e || t && "object" === e && "[object Number]" === A(t);
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
                isObject: function(t) {
                    return "[object Object]" === A(t);
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
                isRegExp: function(t) {
                    return "[object RegExp]" === A(t);
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
                isSorN: function(t) {
                    return E.isString(t) || E.isNumber(t);
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
                isString: function(t) {
                    return "string" == typeof t || t && "object" === (void 0 === t ? "undefined" : m(t)) && "[object String]" === A(t);
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
                isUndefined: function(t) {
                    return void 0 === t;
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
                logify: function(t) {
                    E.addHiddenPropsToTarget(t, {
                        dbg: function() {
                            if (E.isFunction(this.log)) {
                                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                                this.log.apply(this, [ "debug" ].concat(e));
                            }
                        },
                        log: function(t) {
                            for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                            if (t && !n.length && (n.push(t), t = "debug"), "debug" !== t || this.debug) {
                                var i = t.toUpperCase() + ": (" + (this.name || this.constructor.name) + ")";
                                if (E.isFunction(console[t])) {
                                    var o;
                                    (o = console)[t].apply(o, [ i ].concat(n));
                                } else {
                                    var a;
                                    (a = console).log.apply(a, [ i ].concat(n));
                                }
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
                noDupeAdd: function(t, e, n) {
                    if (t) {
                        this.findIndex(t, n) < 0 && t.push(e);
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
                omit: function(t, e) {
                    var n = {};
                    return E.forOwn(t, function(t, r) {
                        -1 === e.indexOf(r) && (n[r] = t);
                    }), n;
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
                pick: function(t, e) {
                    return e.reduce(function(e, n) {
                        return e[n] = t[n], e;
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
                plainCopy: function(t) {
                    return E.copy(t, void 0, void 0, void 0, void 0, !0);
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
                reject: function(t) {
                    return E.Promise.reject(t);
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
                remove: function(t, e) {
                    if (t && t.length) {
                        var n = this.findIndex(t, e);
                        n >= 0 && t.splice(n, 1);
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
                resolve: function(t) {
                    return E.Promise.resolve(t);
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
                set: function(t, e, n) {
                    if (E.isObject(e)) E.forOwn(e, function(e, n) {
                        E.set(t, n, e);
                    }); else {
                        var r = w.exec(e);
                        r ? (function(t, e) {
                            if (!e) return t;
                            return e.split(".").forEach(function(e) {
                                t[e] || (t[e] = {}), t = t[e];
                            }), t;
                        }(t, r[1]))[r[2]] = n : t[e] = n;
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
                deepEqual: function(t, e) {
                    if (t === e) return !0;
                    var n = !0;
                    if (E.isArray(t) && E.isArray(e)) {
                        if (t.length !== e.length) return !1;
                        for (var r = t.length; r--; ) if (!E.deepEqual(t[r], e[r])) // Exit loop early
                        return !1;
                    } else {
                        if (!E.isObject(t) || !E.isObject(e)) return !1;
                        E.forOwn(t, function(t, r) {
                            if (!(n = E.deepEqual(t, e[r]))) // Exit loop early
                            return !1;
                        }), n && E.forOwn(e, function(e, r) {
                            if (!(n = E.deepEqual(e, t[r]))) // Exit loop early
                            return !1;
                        });
                    }
                    return n;
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
                unset: function(t, e) {
                    for (var n = e.split("."), r = n.pop(); e = n.shift(); ) if (null == (// eslint-disable-line
                    t = t[e])) // eslint-disable-line
                    return;
                    t[r] = void 0;
                }
            }, k = function(t, e, n) {
                t && t._set ? t._set("props." + e, n) : E.set(t, e, n);
            }, I = function(t, e, n) {
                t && t._set ? t._set("links." + e, n) : E.set(t, e, n);
            };
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
            e.extend = E.extend;
            var R = e.extend({
                constructor: n
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
            n.extend = E.extend, /**
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
            E.logify(n.prototype), /**
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
            E.eventify(n.prototype, function() {
                return this._listeners;
            }, function(t) {
                this._listeners = t;
            });
            var C = "Index inaccessible after first operation", F = {
                limit: "",
                offset: "",
                orderBy: "",
                skip: "",
                sort: "",
                where: ""
            }, S = /([.*+?^=!:${}()|[\]/\\])/g, P = /%/g, M = /_/g, L = R.extend({
                constructor: r,
                _applyWhereFromObject: function(t) {
                    var e = [], n = [], r = [];
                    return E.forOwn(t, function(t, i) {
                        E.isObject(t) || (t = {
                            "==": t
                        }), E.forOwn(t, function(t, o) {
                            e.push(i), n.push(o), r.push(t);
                        });
                    }), {
                        fields: e,
                        ops: n,
                        predicates: r
                    };
                },
                _applyWhereFromArray: function(t) {
                    var e = this, n = [];
                    return t.forEach(function(r, i) {
                        if (!E.isString(r)) {
                            var o = t[i - 1], a = (E.isArray(r) ? e._applyWhereFromArray : e._applyWhereFromObject).call(e, r);
                            "or" === o && (a.isOr = !0), n.push(a);
                        }
                    }), n.isArray = !0, n;
                },
                _testObjectGroup: function(t, e, n, r) {
                    var i = void 0, o = n.fields, a = n.ops, u = n.predicates, c = a.length;
                    for (i = 0; i < c; i++) {
                        var s = a[i], f = "|" === s.charAt(0);
                        s = f ? s.substr(1) : s;
                        var l = this.evaluate(E.get(r, o[i]), s, u[i]);
                        void 0 !== l && (t = e ? l : f ? t || l : t && l), e = !1;
                    }
                    return {
                        keep: t,
                        first: e
                    };
                },
                _testArrayGroup: function(t, e, n, r) {
                    var i = void 0, o = n.length;
                    for (i = 0; i < o; i++) {
                        var a = n[i], u = (a.isArray ? this._testArrayGroup : this._testObjectGroup).call(this, !0, !0, a, r);
                        t = n[i - 1] ? a.isOr ? t || u.keep : t && u.keep : u.keep, e = u.first;
                    }
                    return {
                        keep: t,
                        first: e
                    };
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
                between: function(t, e, n) {
                    if (n || (n = {}), this.data) throw E.err("Query#between")(500, "Cannot access index");
                    return this.data = this.collection.getIndex(n.index).between(t, e, n), this;
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
                compare: function(t, e, n, r) {
                    var i = t[e], o = E.get(n, i[0]), a = E.get(r, i[0]);
                    if (o && E.isString(o) && (o = o.toUpperCase()), a && E.isString(a) && (a = a.toUpperCase()), 
                    void 0 === n && (n = null), void 0 === r && (r = null), "DESC" === i[1].toUpperCase()) {
                        var u = a;
                        a = o, o = u;
                    }
                    return o < a ? -1 : o > a ? 1 : e < t.length - 1 ? this.compare(t, e + 1, n, r) : 0;
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
                evaluate: function(t, e, n) {
                    var r = this.constructor.ops;
                    return r[e] ? r[e](t, n) : 0 === e.indexOf("like") ? null !== this.like(n, e.substr(4)).exec(t) : 0 === e.indexOf("notLike") ? null === this.like(n, e.substr(7)).exec(t) : void 0;
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
                filter: function(t, e) {
                    var n = this;
                    if (/**
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
                    t || (t = {}), this.getData(), E.isObject(t)) {
                        var r = {};
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
                        (E.isObject(t.where) || E.isArray(t.where)) && (r = t.where), E.forOwn(t, function(t, e) {
                            e in F || e in r || (r[e] = {
                                "==": t
                            });
                        });
                        var i = void 0;
                        // Apply filter for each field
                        E.isObject(r) && 0 !== Object.keys(r).length ? i = this._applyWhereFromArray([ r ]) : E.isArray(r) && (i = this._applyWhereFromArray(r)), 
                        i && (this.data = this.data.filter(function(t, e) {
                            return n._testArrayGroup(!0, !0, i, t).keep;
                        }));
                        // Sort
                        var o = t.orderBy || t.sort;
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
                        if (E.isString(o) && (o = [ [ o, "ASC" ] ]), E.isArray(o) || (o = null), o) {
                            o.forEach(function(t, e) {
                                E.isString(t) && (o[e] = [ t, "ASC" ]);
                            }), this.data.sort(function(t, e) {
                                return n.compare(o, 0, t, e);
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
                        E.isNumber(t.skip) ? this.skip(t.skip) : E.isNumber(t.offset) && this.skip(t.offset), 
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
                        E.isNumber(t.limit) && this.limit(t.limit);
                    } else E.isFunction(t) && (this.data = this.data.filter(t, e));
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
                forEach: function(t, e) {
                    return this.getData().forEach(t, e), this;
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
                get: function(t, e) {
                    if (t || (t = []), e || (e = {}), this.data) throw E.err("Query#get")(500, C);
                    return t && !E.isArray(t) && (t = [ t ]), t.length ? (this.data = this.collection.getIndex(e.index).get(t), 
                    this) : (this.getData(), this);
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
                getAll: function() {
                    var t = this, e = {};
                    if (this.data) throw E.err("Query#getAll")(500, C);
                    for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                    if (!r.length || 1 === r.length && E.isObject(r[0])) return this.getData(), this;
                    r.length && E.isObject(r[r.length - 1]) && (e = r[r.length - 1], r.pop());
                    var o = this.collection.getIndex(e.index);
                    return this.data = [], r.forEach(function(e) {
                        t.data = t.data.concat(o.get(e));
                    }), this;
                },
                /**
   * Return the current data result of this query.
   *
   * @method Query#getData
   * @returns {Array} The data in this query.
   * @since 3.0.0
   */
                getData: function() {
                    return this.data || (this.data = this.collection.index.getAll()), this.data;
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
                like: function(t, e) {
                    return new RegExp("^" + function(t) {
                        return t.replace(S, "\\$1");
                    }(t).replace(P, ".*").replace(M, ".") + "$", e);
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
                limit: function(t) {
                    if (!E.isNumber(t)) throw E.err("Query#limit", "num")(400, "number", t);
                    var e = this.getData();
                    return this.data = e.slice(0, Math.min(e.length, t)), this;
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
                map: function(t, e) {
                    return this.data = this.getData().map(t, e), this;
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
                mapCall: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    return this.data = this.getData().map(function(e) {
                        return e[t].apply(e, n);
                    }), this;
                },
                /**
   * Complete the execution of the query and return the resulting data.
   *
   * @method Query#run
   * @returns {Array} The result of executing this query.
   * @since 3.0.0
   */
                run: function() {
                    var t = this.data;
                    return this.data = null, t;
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
                skip: function(t) {
                    if (!E.isNumber(t)) throw E.err("Query#skip", "num")(400, "number", t);
                    var e = this.getData();
                    return t < e.length ? this.data = e.slice(t) : this.data = [], this;
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
                    "=": function(t, e) {
                        return t == e;
                    },
                    "==": function(t, e) {
                        return t == e;
                    },
                    "===": function(t, e) {
                        return t === e;
                    },
                    "!=": function(t, e) {
                        return t != e;
                    },
                    "!==": function(t, e) {
                        return t !== e;
                    },
                    ">": function(t, e) {
                        return t > e;
                    },
                    ">=": function(t, e) {
                        return t >= e;
                    },
                    "<": function(t, e) {
                        return t < e;
                    },
                    "<=": function(t, e) {
                        return t <= e;
                    },
                    isectEmpty: function(t, e) {
                        return !E.intersection(t || [], e || []).length;
                    },
                    isectNotEmpty: function(t, e) {
                        return E.intersection(t || [], e || []).length;
                    },
                    in: function(t, e) {
                        return -1 !== e.indexOf(t);
                    },
                    notIn: function(t, e) {
                        return -1 === e.indexOf(t);
                    },
                    contains: function(t, e) {
                        return -1 !== (t || []).indexOf(e);
                    },
                    notContains: function(t, e) {
                        return -1 === (t || []).indexOf(e);
                    }
                }
            }), T = "belongsTo", N = "hasMany", D = "hasOne";
            i.extend = E.extend, E.addHiddenPropsToTarget(i.prototype, {
                get canAutoAddLinks() {
                    return void 0 === this.add || !!this.add;
                },
                get relatedCollection() {
                    return this.mapper.datastore.getCollection(this.relation);
                },
                validateOptions: function(t, e) {
                    var n = "new Relation", r = e.localField;
                    if (!r) throw E.err(n, "opts.localField")(400, "string", r);
                    var i = e.foreignKey = e.foreignKey || e.localKey;
                    if (!i && (e.type === T || e.type === D)) throw E.err(n, "opts.foreignKey")(400, "string", i);
                    if (E.isString(t)) {
                        if (e.relation = t, !E.isFunction(e.getRelation)) throw E.err(n, "opts.getRelation")(400, "function", e.getRelation);
                    } else {
                        if (!t) throw E.err(n, "related")(400, "Mapper or string", t);
                        e.relation = t.name;
                    }
                },
                assignTo: function(t) {
                    this.name = t.name, Object.defineProperty(this, "mapper", {
                        value: t
                    }), t.relationList || Object.defineProperty(t, "relationList", {
                        value: []
                    }), t.relationFields || Object.defineProperty(t, "relationFields", {
                        value: []
                    }), t.relationList.push(this), t.relationFields.push(this.localField);
                },
                canFindLinkFor: function() {
                    return !(!this.foreignKey && !this.localKey);
                },
                getRelation: function() {
                    return this.relatedMapper;
                },
                getForeignKey: function(t) {
                    return E.get(t, this.mapper.idAttribute);
                },
                setForeignKey: function(t, e) {
                    t && e && this._setForeignKey(t, e);
                },
                _setForeignKey: function(t, e) {
                    var n = this, r = this.mapper.idAttribute;
                    E.isArray(e) || (e = [ e ]), e.forEach(function(e) {
                        E.set(e, n.foreignKey, E.get(t, r));
                    });
                },
                getLocalField: function(t) {
                    return E.get(t, this.localField);
                },
                setLocalField: function(t, e) {
                    return E.set(t, this.localField, e);
                },
                getInverse: function(t) {
                    return this.inverse || this.findInverseRelation(t), this.inverse;
                },
                findInverseRelation: function(t) {
                    var e = this;
                    this.getRelation().relationList.forEach(function(n) {
                        if (n.getRelation() === t && e.isInversedTo(n) && e !== n) return e.inverse = n, 
                        !0;
                    });
                },
                isInversedTo: function(t) {
                    return !t.foreignKey || t.foreignKey === this.foreignKey;
                },
                addLinkedRecords: function(t) {
                    var e = this, n = this.mapper.datastore;
                    t.forEach(function(t) {
                        var r = e.getLocalField(t);
                        E.isFunction(e.add) ? r = e.add(n, e, t) : r && (r = e.linkRecord(t, r));
                        (!r || E.isArray(r) && !r.length) && e.canFindLinkFor(t) && (r = e.findExistingLinksFor(t)), 
                        r && e.setLocalField(t, r);
                    });
                },
                removeLinkedRecords: function(t, e) {
                    var n = this.localField;
                    e.forEach(function(t) {
                        E.set(t, n, void 0);
                    });
                },
                linkRecord: function(t, e) {
                    var n = E.get(e, this.mapper.idAttribute);
                    if (void 0 === n) {
                        -1 === this.relatedCollection.unsaved().indexOf(e) && this.canAutoAddLinks && (e = this.relatedCollection.add(e));
                    } else e !== this.relatedCollection.get(n) && (this.setForeignKey(t, e), this.canAutoAddLinks && (e = this.relatedCollection.add(e)));
                    return e;
                },
                // e.g. user hasMany post via "foreignKey", so find all posts of user
                findExistingLinksByForeignKey: function(t) {
                    if (void 0 !== t && null !== t) return this.relatedCollection.filter(x({}, this.foreignKey, t));
                },
                ensureLinkedDataHasProperType: function(t, e) {
                    var n = this.getRelation(), r = this.getLocalField(t);
                    (!E.isArray(r) || r.length && !n.is(r[0])) && r && !n.is(r) && E.set(t, this.localField, n.createRecord(r, e));
                },
                isRequiresParentId: function() {
                    return !1;
                },
                isRequiresChildId: function() {
                    return !1;
                },
                createChildRecord: function(t, e, n) {
                    var r = this;
                    return this.setForeignKey(t, e), this.createLinked(e, n).then(function(e) {
                        r.setLocalField(t, e);
                    });
                },
                createLinked: function(t, e) {
                    var n = E.isArray(t) ? "createMany" : "create";
                    return this.getRelation()[n](t, e);
                }
            });
            [ i.extend({
                getForeignKey: function(t) {
                    return E.get(t, this.foreignKey);
                },
                _setForeignKey: function(t, e) {
                    E.set(t, this.foreignKey, E.get(e, this.getRelation().idAttribute));
                },
                findExistingLinksFor: function(t) {
                    // console.log('\tBelongsTo#findExistingLinksFor', record)
                    if (t) {
                        var e = E.get(t, this.foreignKey);
                        return void 0 !== e && null !== e ? this.relatedCollection.get(e) : void 0;
                    }
                },
                isRequiresParentId: function() {
                    return !0;
                },
                createParentRecord: function(t, e) {
                    var n = this, r = this.getLocalField(t);
                    return this.createLinked(r, e).then(function(e) {
                        n.setForeignKey(t, e);
                    });
                },
                createChildRecord: function() {
                    throw new Error('"BelongsTo" relation does not support child creation as it cannot have children.');
                }
            }, {
                TYPE_NAME: "belongsTo"
            }), i.extend({
                validateOptions: function(t, e) {
                    i.prototype.validateOptions.call(this, t, e);
                    var n = e.localKeys, r = e.foreignKeys, o = e.foreignKey;
                    if (!o && !n && !r) throw E.err("new Relation", "opts.<foreignKey|localKeys|foreignKeys>")(400, "string", o);
                },
                canFindLinkFor: function(t) {
                    return !!(this.foreignKey || this.foreignKeys || this.localKeys && E.get(t, this.localKeys));
                },
                linkRecord: function(t, e) {
                    var n = this, r = this.relatedCollection, i = this.canAutoAddLinks, o = this.foreignKey, a = this.relatedCollection.unsaved();
                    return e.map(function(e) {
                        var u = r.recordId(e);
                        // TODO: slow, could be optimized? But user loses hook
                        return (void 0 === u && -1 === a.indexOf(e) || e !== r.get(u)) && (o && n.setForeignKey(t, e), 
                        i && (e = r.add(e))), e;
                    });
                },
                findExistingLinksFor: function(t) {
                    var e = E.get(t, this.mapper.idAttribute), n = this.localKeys ? E.get(t, this.localKeys) : null, r = void 0;
                    if (void 0 !== e && this.foreignKey ? r = this.findExistingLinksByForeignKey(e) : this.localKeys && n ? r = this.findExistingLinksByLocalKeys(n) : void 0 !== e && this.foreignKeys && (r = this.findExistingLinksByForeignKeys(e)), 
                    r && r.length) return r;
                },
                // e.g. user hasMany group via "foreignKeys", so find all users of a group
                findExistingLinksByLocalKeys: function(t) {
                    return this.relatedCollection.filter({
                        where: x({}, this.mapper.idAttribute, {
                            in: t
                        })
                    });
                },
                // e.g. group hasMany user via "localKeys", so find all groups that own a user
                findExistingLinksByForeignKeys: function(t) {
                    return this.relatedCollection.filter({
                        where: x({}, this.foreignKeys, {
                            contains: t
                        })
                    });
                },
                isRequiresParentId: function() {
                    return !!this.localKeys && this.localKeys.length > 0;
                },
                isRequiresChildId: function() {
                    return !!this.foreignKey;
                },
                createParentRecord: function(t, e) {
                    var n = this, r = this.getLocalField(t), i = this.getRelation().idAttribute;
                    return this.createLinked(r, e).then(function(e) {
                        E.set(t, n.localKeys, e.map(function(t) {
                            return E.get(t, i);
                        }));
                    });
                },
                createLinked: function(t, e) {
                    return this.getRelation().createMany(t, e);
                }
            }, {
                TYPE_NAME: "hasMany"
            }), i.extend({
                findExistingLinksFor: function(t, e) {
                    var n = E.get(e, t.idAttribute), r = this.findExistingLinksByForeignKey(n);
                    if (r && r.length) return r[0];
                },
                isRequiresChildId: function() {
                    return !0;
                }
            }, {
                TYPE_NAME: "hasOne"
            }) ].forEach(function(t) {
                i[t.TYPE_NAME] = function(e, n) {
                    return new t(e, n);
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
            var K = function(t, e) {
                return function(n) {
                    i.belongsTo(t, e).assignTo(n);
                };
            }, W = function(t, e) {
                return function(n) {
                    i.hasMany(t, e).assignTo(n);
                };
            }, B = function(t, e) {
                return function(n) {
                    i.hasOne(t, e).assignTo(n);
                };
            }, $ = function(t, e) {
                var n = t.datastore;
                return n && n[e] ? function() {
                    for (var r = arguments.length, i = Array(r), o = 0; o < r; o++) i[o] = arguments[o];
                    return n[e].apply(n, [ t.name ].concat(i));
                } : t[e].bind(t);
            }, q = "creating", z = "noValidate", U = "keepChangeHistory", J = "previous", Q = R.extend({
                constructor: o,
                /**
   * Returns the {@link Mapper} paired with this record's class, if any.
   *
   * @method Record#_mapper
   * @returns {Mapper} The {@link Mapper} paired with this record's class, if any.
   * @since 3.0.0
   */
                _mapper: function() {
                    var t = this.constructor.mapper;
                    if (!t) throw E.err("Record#_mapper", "")(404, "mapper");
                    return t;
                },
                /**
   * Lifecycle hook.
   *
   * @method Record#afterLoadRelations
   * @param {string[]} relations The `relations` argument passed to {@link Record#loadRelations}.
   * @param {Object} opts The `opts` argument passed to {@link Record#loadRelations}.
   * @since 3.0.0
   */
                afterLoadRelations: function() {},
                /**
   * Lifecycle hook.
   *
   * @method Record#beforeLoadRelations
   * @param {string[]} relations The `relations` argument passed to {@link Record#loadRelations}.
   * @param {Object} opts The `opts` argument passed to {@link Record#loadRelations}.
   * @since 3.0.0
   */
                beforeLoadRelations: function() {},
                /**
   * Return the change history of this record since it was instantiated or
   * {@link Record#commit} was called.
   *
   * @method Record#changeHistory
   * @since 3.0.0
   */
                changeHistory: function() {
                    return (this._get("history") || []).slice();
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
                changes: function(t) {
                    return t || (t = {}), E.diffObjects("function" == typeof this.toJSON ? this.toJSON(t) : this, this._get("previous"), t);
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
                commit: function(t) {
                    this._set("changed"), // unset
                    this._set("history", []), // clear history
                    this._set("previous", this.toJSON(t));
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
                destroy: function(t) {
                    t || (t = {});
                    var e = this._mapper();
                    return $(e, "destroy")(E.get(this, e.idAttribute), t);
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
                get: function(t) {
                    return E.get(this, t);
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
                hasChanges: function(t) {
                    return !!(this._get("changed") || []).length || E.areDifferent("function" == typeof this.toJSON ? this.toJSON(t) : this, this._get("previous"), t);
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
                isNew: function(t) {
                    return void 0 === E.get(this, this._mapper().idAttribute);
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
                isValid: function(t) {
                    return !this._mapper().validate(this, t);
                },
                removeInverseRelation: function(t, e, n, r) {
                    var i = this;
                    if (n.type === D) I(t, n.localField, void 0); else if (n.type === N) {
                        // e.g. remove comment from otherPost.comments
                        var o = E.get(t, n.localField);
                        void 0 === e ? E.remove(o, function(t) {
                            return t === i;
                        }) : E.remove(o, function(t) {
                            return t === i || e === E.get(t, r);
                        });
                    }
                },
                setupInverseRelation: function(t, e, n, r) {
                    var i = this;
                    // Update (set) inverse relation
                    if (n.type === D) // e.g. someUser.profile = profile
                    I(t, n.localField, this); else if (n.type === N) {
                        // e.g. add comment to somePost.comments
                        var o = E.get(t, n.localField);
                        void 0 === e ? E.noDupeAdd(o, this, function(t) {
                            return t === i;
                        }) : E.noDupeAdd(o, this, function(t) {
                            return t === i || e === E.get(t, r);
                        });
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
                loadRelations: function(t, e) {
                    var n = this, r = void 0, i = this._mapper();
                    // Default values for arguments
                    // Fill in "opts" with the Model's configuration
                    // beforeLoadRelations lifecycle hook
                    return t || (t = []), E.isString(t) && (t = [ t ]), e || (e = {}), e.with = t, E._(e, i), 
                    e.adapter = i.getAdapterName(e), r = e.op = "beforeLoadRelations", E.resolve(this[r](t, e)).then(function() {
                        // Now delegate to the adapter
                        r = e.op = "loadRelations", i.dbg(r, n, t, e);
                        var o = [], a = void 0;
                        return E.forEachRelation(i, e, function(t, r) {
                            var u = t.getRelation();
                            if (r.raw = !1, E.isFunction(t.load)) a = t.load(i, t, n, e); else if ("hasMany" === t.type || "hasOne" === t.type) t.foreignKey ? a = $(u, "findAll")(x({}, t.foreignKey, E.get(n, i.idAttribute)), r).then(function(e) {
                                return "hasOne" === t.type ? e.length ? e[0] : void 0 : e;
                            }) : t.localKeys ? a = $(u, "findAll")({
                                where: x({}, u.idAttribute, {
                                    in: E.get(n, t.localKeys)
                                })
                            }) : t.foreignKeys && (a = $(u, "findAll")({
                                where: x({}, t.foreignKeys, {
                                    contains: E.get(n, i.idAttribute)
                                })
                            }, e)); else if ("belongsTo" === t.type) {
                                var c = E.get(n, t.foreignKey);
                                E.isSorN(c) && (a = $(u, "find")(c, r));
                            }
                            a && (a = a.then(function(e) {
                                t.setLocalField(n, e);
                            }), o.push(a));
                        }), Promise.all(o);
                    }).then(function() {
                        // afterLoadRelations lifecycle hook
                        return r = e.op = "afterLoadRelations", E.resolve(n[r](t, e)).then(function() {
                            return n;
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
                previous: function(t) {
                    return t ? this._get("previous." + t) : this._get("previous");
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
                revert: function(t) {
                    var e = this, n = this._get("previous");
                    t || (t = {}), t.preserve || (t.preserve = []), E.forOwn(this, function(r, i) {
                        i !== e._mapper().idAttribute && !n.hasOwnProperty(i) && e.hasOwnProperty(i) && -1 === t.preserve.indexOf(i) && delete e[i];
                    }), E.forOwn(n, function(n, r) {
                        -1 === t.preserve.indexOf(r) && (e[r] = n);
                    }), this.commit();
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
                save: function(t) {
                    var e = this;
                    t || (t = {});
                    var n = this._mapper(), r = E.get(this, n.idAttribute), i = this, o = function(n) {
                        var r = t.raw ? n.data : n;
                        return r && (E.deepMixIn(e, r), e.commit()), n;
                    };
                    if (void 0 === r) return $(n, "create")(i, t).then(o);
                    if (t.changesOnly) {
                        var a = this.changes(t);
                        i = {}, E.fillIn(i, a.added), E.fillIn(i, a.changed);
                    }
                    return $(n, "update")(r, i, t).then(o);
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
                set: function(t, e, n) {
                    E.isObject(t) && (n = e), n || (n = {}), n.silent && this._set("silent", !0), E.set(this, t, e), 
                    this._get("eventId") || this._set("silent");
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
                toJSON: function(t) {
                    var e = this.constructor.mapper;
                    if (e) return e.toJSON(this, t);
                    var n = {};
                    return E.forOwn(this, function(t, e) {
                        n[e] = E.plainCopy(t);
                    }), n;
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
                unset: function(t, e) {
                    this.set(t, void 0, e);
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
                validate: function(t) {
                    return this._mapper().validate(this, t);
                }
            }, {
                creatingPath: q,
                noValidatePath: z,
                keepChangeHistoryPath: U,
                previousPath: J
            });
            /**
 * Allow records to emit events.
 *
 * An record's registered listeners are stored in the record's private data.
 */
            E.eventify(o.prototype, function() {
                return this._get("events");
            }, function(t) {
                this._set("events", t);
            }), E.addHiddenPropsToTarget(f.prototype, {
                set: function(t, e) {
                    E.isArray(t) || (t = [ t ]);
                    var n = t.shift() || void 0, r = s(this.keys, n);
                    if (0 === t.length) if (r.found) {
                        var i = s(this.values[r.index], e, this.hashCode);
                        i.found || u(this.values[r.index], i.index, e);
                    } else u(this.keys, r.index, n), u(this.values, r.index, [ e ]); else if (r.found) this.values[r.index].set(t, e); else {
                        u(this.keys, r.index, n);
                        var o = new f([], {
                            hashCode: this.hashCode
                        });
                        o.set(t, e), u(this.values, r.index, o);
                    }
                },
                get: function(t) {
                    E.isArray(t) || (t = [ t ]);
                    var e = t.shift() || void 0, n = s(this.keys, e);
                    return 0 === t.length ? n.found ? this.values[n.index].isIndex ? this.values[n.index].getAll() : this.values[n.index].slice() : [] : n.found ? this.values[n.index].get(t) : [];
                },
                getAll: function(t) {
                    t || (t = {});
                    var e = [], n = this.values;
                    if ("desc" === t.order) for (var r = n.length - 1; r >= 0; r--) {
                        var i = n[r];
                        e = i.isIndex ? e.concat(i.getAll(t)) : e.concat(i);
                    } else for (var o = 0; o < n.length; o++) {
                        var a = n[o];
                        e = a.isIndex ? e.concat(a.getAll(t)) : e.concat(a);
                    }
                    return e;
                },
                visitAll: function(t, e) {
                    this.values.forEach(function(n) {
                        n.isIndex ? n.visitAll(t, e) : n.forEach(t, e);
                    });
                },
                between: function(t, e, n) {
                    n || (n = {}), E.isArray(t) || (t = [ t ]), E.isArray(e) || (e = [ e ]), E.fillIn(n, {
                        leftInclusive: !0,
                        rightInclusive: !1,
                        limit: void 0,
                        offset: 0
                    });
                    var r = this._between(t, e, n);
                    return n.limit ? r.slice(n.offset, n.limit + n.offset) : r.slice(n.offset);
                },
                _between: function(t, e, n) {
                    var r = [], i = t.shift(), o = e.shift(), a = void 0;
                    if (a = void 0 !== i ? s(this.keys, i) : {
                        found: !1,
                        index: 0
                    }, 0 === t.length) {
                        a.found && !1 === n.leftInclusive && (a.index += 1);
                        for (var u = a.index; u < this.keys.length; u += 1) {
                            if (void 0 !== o) if (n.rightInclusive) {
                                if (this.keys[u] > o) break;
                            } else if (this.keys[u] >= o) break;
                            if (r = this.values[u].isIndex ? r.concat(this.values[u].getAll()) : r.concat(this.values[u]), 
                            n.limit && r.length >= n.limit + n.offset) break;
                        }
                    } else for (var c = a.index; c < this.keys.length; c += 1) {
                        var f = this.keys[c];
                        if (f > o) break;
                        if (r = this.values[c].isIndex ? f === i ? r.concat(this.values[c]._between(E.copy(t), e.map(function() {}), n)) : f === o ? r.concat(this.values[c]._between(t.map(function() {}), E.copy(e), n)) : r.concat(this.values[c].getAll()) : r.concat(this.values[c]), 
                        n.limit && r.length >= n.limit + n.offset) break;
                    }
                    return n.limit ? r.slice(0, n.limit + n.offset) : r;
                },
                peek: function() {
                    return this.values.length ? this.values[0].isIndex ? this.values[0].peek() : this.values[0] : [];
                },
                clear: function() {
                    this.keys = [], this.values = [];
                },
                insertRecord: function(t) {
                    var e = this.fieldList.map(function(e) {
                        return E.isFunction(e) ? e(t) || void 0 : t[e] || void 0;
                    });
                    this.set(e, t);
                },
                removeRecord: function(t) {
                    var e = this, n = void 0, r = void 0 !== this.hashCode(t);
                    return this.values.forEach(function(i, o) {
                        if (i.isIndex) {
                            if (i.removeRecord(t)) return 0 === i.keys.length && (c(e.keys, o), c(e.values, o)), 
                            n = !0, !1;
                        } else {
                            var a = {};
                            if (void 0 !== e.keys[o] && r) r && (a = s(i, t, e.hashCode)); else for (var u = i.length - 1; u >= 0; u--) if (i[u] === t) {
                                a = {
                                    found: !0,
                                    index: u
                                };
                                break;
                            }
                            if (a.found) return c(i, a.index), 0 === i.length && (c(e.keys, o), c(e.values, o)), 
                            n = !0, !1;
                        }
                    }), n ? t : void 0;
                },
                updateRecord: function(t) {
                    void 0 !== this.removeRecord(t) && this.insertRecord(t);
                }
            });
            var V = Q.noValidatePath, H = "Collection", G = {
                /**
   * Whether to call {@link Record#commit} on records that are added to the
   * collection and already exist in the collection.
   *
   * @name Collection#commitOnMerge
   * @type {boolean}
   * @default true
   */
                commitOnMerge: !0,
                /**
   * Whether record events should bubble up and be emitted by the collection.
   *
   * @name Collection#emitRecordEvents
   * @type {boolean}
   * @default true
   */
                emitRecordEvents: !0,
                /**
   * Field to be used as the unique identifier for records in this collection.
   * Defaults to `"id"` unless {@link Collection#mapper} is set, in which case
   * this will default to {@link Mapper#idAttribute}.
   *
   * @name Collection#idAttribute
   * @type {string}
   * @default "id"
   */
                idAttribute: "id",
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
                onConflict: "merge"
            }, Y = R.extend({
                constructor: l,
                /**
   * Used to bind to events emitted by records in this Collection.
   *
   * @method Collection#_onRecordEvent
   * @since 3.0.0
   * @private
   * @param {...*} [arg] Args passed to {@link Collection#emit}.
   */
                _onRecordEvent: function() {
                    this.emitRecordEvents && this.emit.apply(this, arguments);
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
                add: function(t, e) {
                    var n = this;
                    // Default values for arguments
                    e || (e = {}), // Fill in "opts" with the Collection's configuration
                    E._(e, this), t = this.beforeAdd(t, e) || t;
                    // Track whether just one record or an array of records is being inserted
                    var r = !1, i = this.recordId();
                    if (!E.isArray(t)) {
                        if (!E.isObject(t)) throw E.err(H + "#add", "records")(400, "object or array", t);
                        t = [ t ], r = !0;
                    }
                    // Map the provided records to existing records.
                    // New records will be inserted. If any records map to existing records,
                    // they will be merged into the existing records according to the onConflict
                    // option.
                    t = t.map(function(t) {
                        var r = n.recordId(t), o = void 0 === r ? r : n.get(r);
                        // If the currently visited record is just a reference to an existing
                        // record, then there is nothing to be done. Exit early.
                        if (t === o) return o;
                        if (o) {
                            // Here, the currently visited record corresponds to a record already
                            // in the collection, so we need to merge them
                            var a = e.onConflict || n.onConflict;
                            if ("merge" !== a && "replace" !== a && "skip" !== a) throw E.err(H + "#add", "opts.onConflict")(400, "one of (merge, replace, skip)", a, !0);
                            var u = o._get(V);
                            e.noValidate && // Disable validation
                            o._set(V, !0), "merge" === a ? E.deepMixIn(o, t) : "replace" === a && (E.forOwn(o, function(e, n) {
                                n !== i && void 0 === t[n] && (o[n] = void 0);
                            }), o.set(t)), // else if(onConflict === 'skip'){ do nothing }
                            e.noValidate && // Restore previous `noValidate` value
                            o._set(V, u), t = o, e.commitOnMerge && E.isFunction(t.commit) && t.commit(), // Update all indexes in the collection
                            n.updateIndexes(t);
                        } else // Here, the currently visted record does not correspond to any record
                        // in the collection, so (optionally) instantiate this record and insert
                        // it into the collection
                        t = n.mapper ? n.mapper.createRecord(t, e) : t, n.index.insertRecord(t), E.forOwn(n.indexes, function(e, n) {
                            e.insertRecord(t);
                        }), t && E.isFunction(t.on) && t.on("all", n._onRecordEvent, n);
                        return t;
                    });
                    // Finally, return the inserted data
                    var o = r ? t[0] : t;
                    return e.silent || this.emit("add", o), this.afterAdd(t, e, o) || o;
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
                afterAdd: function() {},
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
                afterRemove: function() {},
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
                afterRemoveAll: function() {},
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
                beforeAdd: function() {},
                /**
   * Lifecycle hook called by {@link Collection#remove}.
   *
   * @method Collection#beforeRemove
   * @since 3.0.0
   * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
   */
                beforeRemove: function() {},
                /**
   * Lifecycle hook called by {@link Collection#removeAll}.
   *
   * @method Collection#beforeRemoveAll
   * @since 3.0.0
   * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
   */
                beforeRemoveAll: function() {},
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
                between: function(t, e, n) {
                    return this.query().between(t, e, n).run();
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
                createIndex: function(t, e, n) {
                    var r = this;
                    E.isString(t) && void 0 === e && (e = [ t ]), n || (n = {}), n.hashCode || (n.hashCode = function(t) {
                        return r.recordId(t);
                    });
                    var i = this.indexes[t] = new f(e, n);
                    this.index.visitAll(i.insertRecord, i);
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
                filter: function(t, e) {
                    return this.query().filter(t, e).run();
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
                forEach: function(t, e) {
                    this.index.visitAll(t, e);
                },
                /**
   * Get the record with the given id.
   *
   * @method Collection#get
   * @since 3.0.0
   * @param {(string|number)} id The primary key of the record to get.
   * @returns {(Object|Record)} The record with the given id.
   */
                get: function(t) {
                    var e = void 0 === t ? [] : this.query().get(t).run();
                    return e.length ? e[0] : void 0;
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
                getAll: function() {
                    var t;
                    return (t = this.query()).getAll.apply(t, arguments).run();
                },
                /**
   * Return the index with the given name. If no name is provided, return the
   * main index. Throws an error if the specified index does not exist.
   *
   * @method Collection#getIndex
   * @since 3.0.0
   * @param {string} [name] The name of the index to retrieve.
   */
                getIndex: function(t) {
                    var e = t ? this.indexes[t] : this.index;
                    if (!e) throw E.err(H + "#getIndex", t)(404, "index");
                    return e;
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
                limit: function(t) {
                    return this.query().limit(t).run();
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
                map: function(t, e) {
                    var n = [];
                    return this.index.visitAll(function(r) {
                        n.push(t.call(e, r));
                    }), n;
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
                mapCall: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    var i = [];
                    return this.index.visitAll(function(e) {
                        i.push(e[t].apply(e, n));
                    }), i;
                },
                /**
   * Return all "unsaved" (not uniquely identifiable) records in this colleciton.
   *
   * @method Collection#prune
   * @param {Object} [opts] Configuration options, passed to {@link Collection#removeAll}.
   * @since 3.0.0
   * @returns {Array} The removed records, if any.
   */
                prune: function(t) {
                    return this.removeAll(this.unsaved(), t);
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
                query: function() {
                    return new (0, this.queryClass)(this);
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
                recordId: function(t) {
                    return t ? E.get(t, this.recordId()) : this.mapper ? this.mapper.idAttribute : this.idAttribute;
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
                reduce: function(t, e) {
                    return this.getAll().reduce(t, e);
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
                remove: function(t, e) {
                    // Default values for arguments
                    e || (e = {}), this.beforeRemove(t, e);
                    var n = E.isSorN(t) ? this.get(t) : t;
                    // The record is in the collection, remove it
                    return E.isObject(n) && (n = this.index.removeRecord(n)) && (E.forOwn(this.indexes, function(t, e) {
                        t.removeRecord(n);
                    }), E.isFunction(n.off) && (n.off("all", this._onRecordEvent, this), e.silent || this.emit("remove", n))), 
                    this.afterRemove(t, e, n) || n;
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
                removeAll: function(t, e) {
                    var n = this;
                    // Default values for arguments
                    e || (e = {}), this.beforeRemoveAll(t, e);
                    var r = E.isArray(t) ? t.slice() : this.filter(t), i = E.plainCopy(e);
                    return i.silent = !0, r = r.map(function(t) {
                        return n.remove(t, i);
                    }).filter(function(t) {
                        return t;
                    }), e.silent || this.emit("remove", r), this.afterRemoveAll(t, e, r) || r;
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
                skip: function(t) {
                    return this.query().skip(t).run();
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
                toJSON: function(t) {
                    return this.mapCall("toJSON", t);
                },
                /**
   * Return all "unsaved" (not uniquely identifiable) records in this colleciton.
   *
   * @method Collection#unsaved
   * @since 3.0.0
   * @returns {Array} The unsaved records, if any.
   */
                unsaved: function(t) {
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
                updateIndex: function(t, e) {
                    e || (e = {}), this.getIndex(e.index).updateRecord(t);
                },
                /**
   * Updates all indexes in this collection for the provided record. Has no
   * effect if the record is not in the collection.
   *
   * @method Collection#updateIndexes
   * @since 3.0.0
   * @param {Object} record TODO
   */
                updateIndexes: function(t) {
                    this.index.updateRecord(t), E.forOwn(this.indexes, function(e, n) {
                        e.updateRecord(t);
                    });
                }
            }), Z = {
                array: E.isArray,
                boolean: E.isBoolean,
                integer: E.isInteger,
                null: E.isNull,
                number: E.isNumber,
                object: E.isObject,
                string: E.isString
            }, X = function(t, e) {
                var n = "";
                return t && (E.isNumber(t) ? n += "[" + t + "]" : n += e ? "." + t : "" + t), n;
            }, tt = function(t, e, n) {
                return {
                    expected: e,
                    actual: "" + t,
                    path: function(t) {
                        t || (t = {});
                        var e = "";
                        return (t.path || []).forEach(function(t) {
                            e += X(t, e);
                        }), e += X(t.prop, e);
                    }(n)
                };
            }, et = function(t, e, n, r) {
                r.push(tt(t, e, n));
            }, nt = function(t, e, n, r) {
                var i = n[t];
                if (e.length > i) return tt(e.length, "length no more than " + i, r);
            }, rt = function(t, e, n, r) {
                var i = n[t];
                if (e.length < i) return tt(e.length, "length no less than " + i, r);
            }, it = {
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
                allOf: function(t, e, n) {
                    var r = [];
                    return e.allOf.forEach(function(e) {
                        r = r.concat(lt(t, e, n) || []);
                    }), r.length ? r : void 0;
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
                anyOf: function(t, e, n) {
                    var r = !1, i = [];
                    return e.anyOf.forEach(function(e) {
                        var o = lt(t, e, n);
                        o ? i = i.concat(o) : r = !0;
                    }), r ? void 0 : i;
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
                dependencies: function(t, e, n) {},
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
                enum: function(t, e, n) {
                    var r = e.enum;
                    if (-1 === E.findIndex(r, function(e) {
                        return E.deepEqual(e, t);
                    })) return tt(t, "one of (" + r.join(", ") + ")", n);
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
                items: function(t, e, n) {
                    n || (n = {});
                    for (var r = e.items, i = [], o = E.isArray(r), a = t.length, u = 0; u < a; u++) o && (// Validating a tuple, instead of just checking each item against the
                    // same schema
                    r = e.items[u]), n.prop = u, i = i.concat(lt(t[u], r, n) || []);
                    return i.length ? i : void 0;
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
                maximum: function(t, e, n) {
                    // Must be a number
                    var r = e.maximum, i = e.exclusiveMaximum;
                    if ((void 0 === t ? "undefined" : m(t)) === (void 0 === r ? "undefined" : m(r)) && !(i ? r > t : r >= t)) return i ? tt(t, "no more than nor equal to " + r, n) : tt(t, "no more than " + r, n);
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
                maxItems: function(t, e, n) {
                    if (E.isArray(t)) return nt("maxItems", t, e, n);
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
                maxLength: function(t, e, n) {
                    return nt("maxLength", t, e, n);
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
                maxProperties: function(t, e, n) {
                    // validate only objects
                    if (E.isObject(t)) {
                        var r = e.maxProperties, i = Object.keys(t).length;
                        return i > r ? tt(i, "no more than " + r + " properties", n) : void 0;
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
                minimum: function(t, e, n) {
                    // Must be a number
                    var r = e.minimum, i = e.exclusiveMinimum;
                    if ((void 0 === t ? "undefined" : m(t)) === (void 0 === r ? "undefined" : m(r)) && !(i ? t > r : t >= r)) return i ? tt(t, "no less than nor equal to " + r, n) : tt(t, "no less than " + r, n);
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
                minItems: function(t, e, n) {
                    if (E.isArray(t)) return rt("minItems", t, e, n);
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
                minLength: function(t, e, n) {
                    return rt("minLength", t, e, n);
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
                minProperties: function(t, e, n) {
                    // validate only objects
                    if (E.isObject(t)) {
                        var r = e.minProperties, i = Object.keys(t).length;
                        return i < r ? tt(i, "no more than " + r + " properties", n) : void 0;
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
                multipleOf: function(t, e, n) {
                    var r = e.multipleOf;
                    if (E.isNumber(t) && t / r % 1 != 0) return tt(t, "multipleOf " + r, n);
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
                not: function(t, e, n) {
                    if (!lt(t, e.not, n)) // TODO: better messaging
                    return tt("succeeded", "should have failed", n);
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
                oneOf: function(t, e, n) {
                    var r = !1, i = [];
                    return e.oneOf.forEach(function(e) {
                        var o = lt(t, e, n);
                        if (o) i = i.concat(o); else {
                            if (r) return i = [ tt("valid against more than one", "valid against only one", n) ], 
                            r = !1, !1;
                            r = !0;
                        }
                    }), r ? void 0 : i;
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
                pattern: function(t, e, n) {
                    var r = e.pattern;
                    if (E.isString(t) && !t.match(r)) return tt(t, r, n);
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
                properties: function(t, e, n) {
                    if (n || (n = {}), !E.isArray(t)) {
                        // Can be a boolean or an object
                        // Technically the default is an "empty schema", but here "true" is
                        // functionally the same
                        var r = void 0 === e.additionalProperties || e.additionalProperties, i = [], o = e.properties || {}, a = e.patternProperties || {}, u = [];
                        E.forOwn(o, function(e, r) {
                            n.prop = r, u = u.concat(lt(t[r], e, n) || []), i.push(r);
                        });
                        var c = E.omit(t, i);
                        E.forOwn(a, function(e, r) {
                            E.forOwn(c, function(o, a) {
                                a.match(r) && (n.prop = a, u = u.concat(lt(t[a], e, n) || []), i.push(a));
                            });
                        });
                        var s = Object.keys(E.omit(t, i));
                        // If "s" is not empty, validation fails
                        if (!1 === r) {
                            if (s.length) {
                                var f = n.prop;
                                n.prop = "", et("extra fields: " + s.join(", "), "no extra fields", n, u), n.prop = f;
                            }
                        } else E.isObject(r) && // Otherwise, validate according to provided schema
                        s.forEach(function(e) {
                            n.prop = e, u = u.concat(lt(t[e], r, n) || []);
                        });
                        return u.length ? u : void 0;
                    }
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
                required: function(t, e, n) {
                    n || (n = {});
                    var r = e.required, i = [];
                    return n.existingOnly || r.forEach(function(e) {
                        if (void 0 === E.get(t, e)) {
                            var r = n.prop;
                            n.prop = e, et(void 0, "a value", n, i), n.prop = r;
                        }
                    }), i.length ? i : void 0;
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
                type: function(t, e, n) {
                    var r = e.type, i = void 0;
                    // Value did not match any expected type
                    if (// Can be one of several types
                    E.isString(r) && (r = [ r ]), // Try to match the value against an expected type
                    r.forEach(function(r) {
                        // TODO: throw an error if type is not defined
                        if (Z[r](t, e, n)) // Matched a type
                        return i = r, !1;
                    }), !i) return tt(void 0 !== t && null !== t ? void 0 === t ? "undefined" : m(t) : "" + t, "one of (" + r.join(", ") + ")", n);
                    // Run keyword validators for matched type
                    // http://json-schema.org/latest/json-schema-validation.html#anchor12
                    var o = ht[i];
                    return o ? o(t, e, n) : void 0;
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
                uniqueItems: function(t, e, n) {
                    if (t && t.length && e.uniqueItems) {
                        var r = void 0, i = void 0, o = void 0;
                        // Check n - 1 items
                        for (i = t.length - 1; i > 0; i--) // Only compare against unchecked items
                        for (r = t[i], o = i - 1; o >= 0; o--) // Found a duplicate
                        if (E.deepEqual(r, t[o])) return tt(r, "no duplicates", n);
                    }
                }
            }, ot = function(t, e, n, r) {
                var i = [];
                return t.forEach(function(t) {
                    void 0 !== n[t] && (i = i.concat(it[t](e, n, r) || []));
                }), i.length ? i : void 0;
            }, at = [ "enum", "type", "allOf", "anyOf", "oneOf", "not" ], ut = [ "items", "maxItems", "minItems", "uniqueItems" ], ct = [ "multipleOf", "maximum", "minimum" ], st = [ "maxProperties", "minProperties", "required", "properties", "dependencies" ], ft = [ "maxLength", "minLength", "pattern" ], lt = function t(e, n, r) {
                var i = [];
                r || (r = {}), r.ctx || (r.ctx = {
                    value: e,
                    schema: n
                });
                var o = void 0, a = r.prop;
                if (void 0 !== n) {
                    if (!E.isObject(n)) throw E.err("Schema#validate")(500, 'Invalid schema at path: "' + r.path + '"');
                    // Track our location as we recurse
                    // Validate against parent schema
                    // opts.path = path
                    // opts.prop = prop
                    // Check if property is required
                    return void 0 === r.path && (r.path = []), void 0 !== r.prop && (o = !0, r.path.push(r.prop), 
                    r.prop = void 0), n.extends && (i = E.isFunction(n.extends.validate) ? i.concat(n.extends.validate(e, r) || []) : i.concat(t(e, n.extends, r) || [])), 
                    void 0 === e ? (!0 !== n.required || r.existingOnly || et(e, "a value", r, i), o && (r.path.pop(), 
                    r.prop = a), i.length ? i : void 0) : (i = i.concat(function(t, e, n) {
                        return ot(at, t, e, n);
                    }(e, n, r) || []), o && (r.path.pop(), r.prop = a), i.length ? i : void 0);
                }
            }, pt = "changing", dt = "eventId", ht = {
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
                array: function(t, e, n) {
                    return ot(ut, t, e, n);
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
                integer: function(t, e, n) {
                    // Additional validations for numerics are the same
                    return ht.numeric(t, e, n);
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
                number: function(t, e, n) {
                    // Additional validations for numerics are the same
                    return ht.numeric(t, e, n);
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
                numeric: function(t, e, n) {
                    return ot(ct, t, e, n);
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
                object: function(t, e, n) {
                    return ot(st, t, e, n);
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
                string: function(t, e, n) {
                    return ot(ft, t, e, n);
                }
            }, vt = R.extend({
                constructor: p,
                /**
   * This adds ES5 getters/setters to the target based on the "properties" in
   * this Schema, which makes possible change tracking and validation on
   * property assignment.
   *
   * @name Schema#apply
   * @method
   * @param {object} target The prototype to which to apply this schema.
   */
                apply: function(t, e) {
                    var n = this;
                    e || (e = {}), e.getter || (e.getter = "_get"), e.setter || (e.setter = "_set"), 
                    e.unsetter || (e.unsetter = "_unset"), e.track || (e.track = this.track);
                    var r = this.properties || {};
                    E.forOwn(r, function(r, i) {
                        Object.defineProperty(t, i, n.makeDescriptor(i, r, e));
                    });
                },
                /**
   * Apply default values to the target object for missing values.
   *
   * @name Schema#applyDefaults
   * @method
   * @param {object} target The target to which to apply values for missing values.
   */
                applyDefaults: function(t) {
                    if (t) {
                        var e = this.properties || {}, n = E.isFunction(t.set) || E.isFunction(t._set);
                        E.forOwn(e, function(e, r) {
                            if (e.hasOwnProperty("default") && void 0 === E.get(t, r) && (n ? t.set(r, E.plainCopy(e.default), {
                                silent: !0
                            }) : E.set(t, r, E.plainCopy(e.default))), "object" === e.type && e.properties) {
                                if (n) {
                                    var i = t._get("noValidate");
                                    t._set("noValidate", !0), E.set(t, r, E.get(t, r) || {}, {
                                        silent: !0
                                    }), t._set("noValidate", i);
                                } else E.set(t, r, E.get(t, r) || {});
                                e.applyDefaults(E.get(t, r));
                            }
                        });
                    }
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
                makeDescriptor: function(t, e, n) {
                    var r = {
                        // Better to allow configurability, but at the user's own risk
                        configurable: !0,
                        // These properties are enumerable by default, but regardless of their
                        // enumerability, they won't be "own" properties of individual records
                        enumerable: void 0 === e.enumerable || !!e.enumerable
                    }, i = "props." + t, o = "previous." + t, a = n.getter, u = n.setter, c = n.unsetter, s = E.isBoolean(n.track) ? n.track : e.track;
                    if (r.get = function() {
                        return this._get(i);
                    }, E.isFunction(e.get)) {
                        var f = r.get;
                        r.get = function() {
                            return e.get.call(this, f);
                        };
                    }
                    if (r.set = function(n) {
                        var r = this, f = this[a], l = this[u], p = this[c];
                        // Optionally check that the new value passes validation
                        if (!f("noValidate")) {
                            var d = e.validate(n, {
                                path: [ t ]
                            });
                            if (d) {
                                // Immediately throw an error, preventing the record from getting into
                                // an invalid state
                                var h = new Error("validation failed");
                                throw h.errors = d, h;
                            }
                        }
                        // TODO: Make it so tracking can be turned on for all properties instead of
                        // only per-property
                        if (s && !f("creating")) {
                            // previous is versioned on database commit
                            // props are versioned on set()
                            var v = f(o), y = f(i), g = f(pt), m = f("changed");
                            g || (// Track properties that are changing in the current event loop
                            m = []);
                            // Add changing properties to this array once at most
                            var b = m.indexOf(t);
                            y !== n && -1 === b && m.push(t), v === n && b >= 0 && m.splice(b, 1), // No changes in current event loop
                            m.length || (g = !1, p(pt), p("changed"), // Cancel pending change event
                            f(dt) && (clearTimeout(f(dt)), p(dt))), // Changes detected in current event loop
                            !g && m.length && (l("changed", m), l(pt, !0), // Saving the timeout id allows us to batch all changes in the same
                            // event loop into a single "change"
                            // TODO: Optimize
                            l(dt, setTimeout(function() {
                                // TODO: Optimize
                                if (// Previous event loop where changes were gathered has ended, so
                                // notify any listeners of those changes and prepare for any new
                                // changes
                                p("changed"), p(dt), p(pt), !f("silent")) {
                                    var e = void 0;
                                    for (e = 0; e < m.length; e++) r.emit("change:" + m[e], r, E.get(r, m[e]));
                                    var i = E.diffObjects(x({}, t, n), x({}, t, y));
                                    if (f("keepChangeHistory")) {
                                        var o = E.plainCopy(i);
                                        o.timestamp = new Date().getTime();
                                        var a = f("history");
                                        !a && l("history", a = []), a.push(o);
                                    }
                                    r.emit("change", r, i);
                                }
                                p("silent");
                            }, 0)));
                        }
                        return l(i, n), n;
                    }, E.isFunction(e.set)) {
                        var l = r.set;
                        r.set = function(t) {
                            return e.set.call(this, t, l);
                        };
                    }
                    return r;
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
                pick: function(t) {
                    var e = this;
                    if (void 0 !== t) {
                        if ("object" === this.type) {
                            var n = {}, r = this.properties;
                            // Conditionally copy properties not defined in "properties"
                            if (r && E.forOwn(r, function(e, r) {
                                n[r] = e.pick(t[r]);
                            }), this.extends && E.fillIn(n, this.extends.pick(t)), this.additionalProperties) for (var i in t) r[i] || (n[i] = E.plainCopy(t[i]));
                            return n;
                        }
                        return "array" === this.type ? t.map(function(t) {
                            var n = e.items ? e.items.pick(t) : {};
                            return e.extends && E.fillIn(n, e.extends.pick(t)), n;
                        }) : E.plainCopy(t);
                    }
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
                validate: function(t, e) {
                    return lt(t, this, e);
                }
            }, {
                ANY_OPS: at,
                ARRAY_OPS: ut,
                NUMERIC_OPS: ct,
                OBJECT_OPS: st,
                STRING_OPS: ft,
                typeGroupValidators: ht,
                types: Z,
                validate: lt,
                validationKeywords: it
            }), yt = "Mapper", gt = [ "beforeCreate", "beforeCreateMany" ], mt = [ "beforeCreate", "beforeCreateMany", "beforeUpdate", "beforeUpdateAll", "beforeUpdateMany" ], xt = function(t) {
                return function() {
                    for (var e = this, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                    var o = r[r.length - t], a = o.op;
                    if (this.dbg.apply(this, [ a ].concat(r)), -1 !== gt.indexOf(a) && !1 !== o.applyDefaults) {
                        var u = this.getSchema();
                        if (u && u.applyDefaults) {
                            var c = r[0];
                            E.isArray(c) || (c = [ c ]), c.forEach(function(t) {
                                u.applyDefaults(t);
                            });
                        }
                    }
                    // Automatic validation
                    if (-1 !== mt.indexOf(a) && !o.noValidate) {
                        // Save current value of option
                        var s = o.existingOnly;
                        // For updates, ignore required fields if they aren't present
                        0 === a.indexOf("beforeUpdate") && void 0 === o.existingOnly && (o.existingOnly = !0);
                        var f = this.validate(r["beforeUpdate" === a ? 1 : 0], E.pick(o, [ "existingOnly" ]));
                        // Abort lifecycle due to validation errors
                        if (// Restore option
                        o.existingOnly = s, f) {
                            var l = new Error("validation failed");
                            return l.errors = f, E.reject(l);
                        }
                    }
                    // Emit lifecycle event
                    (o.notify || void 0 === o.notify && this.notify) && setTimeout(function() {
                        e.emit.apply(e, [ a ].concat(r));
                    });
                };
            }, bt = xt(1), _t = xt(2), wt = {
                count: {
                    defaults: [ {}, {} ],
                    skip: !0,
                    types: []
                },
                destroy: {
                    defaults: [ {}, {} ],
                    skip: !0,
                    types: []
                },
                destroyAll: {
                    defaults: [ {}, {} ],
                    skip: !0,
                    types: []
                },
                find: {
                    defaults: [ void 0, {} ],
                    types: []
                },
                findAll: {
                    defaults: [ {}, {} ],
                    types: []
                },
                sum: {
                    defaults: [ void 0, {}, {} ],
                    skip: !0,
                    types: []
                },
                update: {
                    adapterArgs: function(t, e, n, r) {
                        return [ e, t.toJSON(n, r), r ];
                    },
                    beforeAssign: 1,
                    defaults: [ void 0, {}, {} ],
                    types: []
                },
                updateAll: {
                    adapterArgs: function(t, e, n, r) {
                        return [ t.toJSON(e, r), n, r ];
                    },
                    beforeAssign: 0,
                    defaults: [ {}, {}, {} ],
                    types: []
                },
                updateMany: {
                    adapterArgs: function(t, e, n) {
                        return [ e.map(function(e) {
                            return t.toJSON(e, n);
                        }), n ];
                    },
                    beforeAssign: 0,
                    defaults: [ [], {} ],
                    types: []
                }
            }, Ot = {
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
                applyDefaults: !0,
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
                applySchema: !0,
                /**
   * The name of the registered adapter that this Mapper should used by default.
   *
   * @default "http"
   * @name Mapper#defaultAdapter
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   * @type {string}
   */
                defaultAdapter: "http",
                /**
   * The field used as the unique identifier on records handled by this Mapper.
   *
   * @default id
   * @name Mapper#idAttribute
   * @since 3.0.0
   * @type {string}
   */
                idAttribute: "id",
                /**
   * Whether records created from this mapper keep changeHistory on property changes.
   *
   * @default true
   * @name Mapper#keepChangeHistory
   * @since 3.0.0
   * @type {boolean}
   */
                keepChangeHistory: !0,
                /**
   * Whether this Mapper should emit operational events.
   *
   * @default true
   * @name Mapper#notify
   * @since 3.0.0
   * @type {boolean}
   */
                notify: !0,
                /**
   * Whether to skip validation when the Record instances are created.
   *
   * @default false
   * @name Mapper#noValidate
   * @since 3.0.0
   * @type {boolean}
   */
                noValidate: !1,
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
                raw: !1,
                /**
   * Whether records created from this mapper automatically validate their properties
   * when their properties are modified.
   *
   * @default true
   * @name Mapper#validateOnSet
   * @since 3.0.0
   * @type {boolean}
   */
                validateOnSet: !0
            }, At = R.extend({
                constructor: d,
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
                afterCount: _t,
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
                afterCreate: _t,
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
                afterCreateMany: _t,
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
                afterDestroy: _t,
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
                afterDestroyAll: _t,
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
                afterFind: _t,
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
                afterFindAll: _t,
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
                afterSum: _t,
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
                afterUpdate: _t,
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
                afterUpdateAll: _t,
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
                afterUpdateMany: _t,
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
                beforeCreate: bt,
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
                beforeCreateMany: bt,
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
                beforeCount: bt,
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
                beforeDestroy: bt,
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
                beforeDestroyAll: bt,
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
                beforeFind: bt,
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
                beforeFindAll: bt,
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
                beforeSum: bt,
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
                beforeUpdate: bt,
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
                beforeUpdateAll: bt,
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
                beforeUpdateMany: bt,
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
                _end: function(t, e, n) {
                    if (e.raw && E._(t, e), n) return t;
                    var r = e.raw ? t.data : t;
                    return r && E.isFunction(this.wrap) && (r = this.wrap(r, e), e.raw ? t.data = r : t = r), 
                    t;
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
                belongsTo: function(t, e) {
                    return K(t, e)(this);
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
                count: function(t, e) {
                    return this.crud("count", t, e);
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
                create: function(t, e) {
                    var n = this;
                    // Default values for arguments
                    t || (t = {}), e || (e = {});
                    var r = t, i = {}, o = {};
                    // Fill in "opts" with the Mapper's configuration
                    return E._(e, this), e.adapter = this.getAdapterName(e), e.op = "beforeCreate", 
                    this._runHook(e.op, t, e).then(function(t) {
                        return e.with || (e.with = []), n._createParentRecordIfRequired(t, e);
                    }).then(function(t) {
                        i = t;
                    }).then(function() {
                        return e.op = "create", n._invokeAdapterMethod(e.op, t, e);
                    }).then(function(t) {
                        o = t;
                    }).then(function() {
                        var r = e.raw ? o.data : o;
                        return n._createOrAssignChildRecordIfRequired(r, {
                            opts: e,
                            parentRelationMap: i,
                            originalProps: t
                        });
                    }).then(function(t) {
                        return n._commitChanges(r, t);
                    }).then(function(r) {
                        e.raw ? o.data = r : o = r;
                        var i = n._end(o, e);
                        return e.op = "afterCreate", n._runHook(e.op, t, e, i);
                    });
                },
                _commitChanges: function(t, e) {
                    var n = this;
                    return E.isArray(t) ? t.map(function(t, r) {
                        return n._commitChanges(t, e[r]);
                    }) : (E.set(t, e, {
                        silent: !0
                    }), E.isFunction(t.commit) && t.commit(), t);
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
                createInstance: function(t, e) {
                    return this.createRecord(t, e);
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
                _createParentRecordIfRequired: function(t, e) {
                    var n = [], r = [];
                    return E.forEachRelation(this, e, function(e, i) {
                        e.isRequiresParentId() && e.getLocalField(t) && (i.raw = !1, r.push(e), n.push(e.createParentRecord(t, i)));
                    }), E.Promise.all(n).then(function(t) {
                        return r.reduce(function(e, n, r) {
                            return n.setLocalField(e, t[r]), e;
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
                _createOrAssignChildRecordIfRequired: function(t, e) {
                    var n = [];
                    return E.forEachRelation(this, e.opts, function(r, i) {
                        var o = r.getLocalField(e.originalProps);
                        if (o) // Create hasMany and hasOne after the main create because we needed
                        // a generated id to attach to these items
                        if (i.raw = !1, r.isRequiresChildId()) n.push(r.createChildRecord(t, o, i)); else if (r.isRequiresParentId()) {
                            var a = r.getLocalField(e.parentRelationMap);
                            a && r.setLocalField(t, a);
                        }
                    }), E.Promise.all(n).then(function() {
                        return t;
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
                createMany: function(t, e) {
                    var n = this;
                    // Default values for arguments
                    t || (t = []), e || (e = {});
                    var r = t, i = void 0;
                    // Fill in "opts" with the Mapper's configuration
                    // beforeCreateMany lifecycle hook
                    return E._(e, this), e.adapter = this.getAdapterName(e), e.op = "beforeCreateMany", 
                    this._runHook(e.op, t, e).then(function(t) {
                        // Deep pre-create belongsTo relations
                        var o = {};
                        e.with || (e.with = []);
                        var a = [];
                        return E.forEachRelation(n, e, function(e, n) {
                            var r = t.map(function(t) {
                                return e.getLocalField(t);
                            }).filter(Boolean);
                            e.type === T && r.length === t.length && (// Create belongsTo relation first because we need a generated id to
                            // attach to the child
                            n.raw = !1, a.push(e.createLinked(r, n).then(function(n) {
                                t.forEach(function(t, r) {
                                    return e.setForeignKey(t, n[r]);
                                });
                            }).then(function(t) {
                                e.setLocalField(o, t);
                            })));
                        }), E.Promise.all(a).then(function() {
                            return e.op = "createMany", n._invokeAdapterMethod(e.op, t, e);
                        }).then(function(t) {
                            i = t;
                        }).then(function() {
                            var u = e.raw ? i.data : i;
                            // Deep post-create hasOne relations
                            return a = [], E.forEachRelation(n, e, function(e, r) {
                                var i = t.map(function(t) {
                                    return e.getLocalField(t);
                                }).filter(Boolean);
                                if (i.length === t.length) {
                                    r.raw = !1;
                                    var c = e.getLocalField(o), s = void 0;
                                    // Create hasMany and hasOne after the main create because we needed
                                    // a generated id to attach to these items
                                    e.type === N ? // Not supported
                                    n.log("warn", "deep createMany of hasMany type not supported!") : e.type === D ? (u.forEach(function(t, n) {
                                        e.setForeignKey(t, i[n]);
                                    }), s = e.getRelation().createMany(i, r).then(function(t) {
                                        u.forEach(function(n, r) {
                                            e.setLocalField(n, t[r]);
                                        });
                                    })) : e.type === T && c && c.length === u.length && u.forEach(function(t, n) {
                                        e.setLocalField(t, c[n]);
                                    }), s && a.push(s);
                                }
                            }), E.Promise.all(a).then(function() {
                                return n._commitChanges(r, u);
                            });
                        });
                    }).then(function(t) {
                        e.raw ? i.data = t : i = t;
                        var r = n._end(i, e);
                        return e.op = "afterCreateMany", n._runHook(e.op, t, e, r);
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
                createRecord: function(t, e) {
                    var n = this;
                    if (t || (t = {}), E.isArray(t)) return t.map(function(t) {
                        return n.createRecord(t, e);
                    });
                    if (!E.isObject(t)) throw E.err(yt + "#createRecord", "props")(400, "array or object", t);
                    this.relationList && this.relationList.forEach(function(n) {
                        n.ensureLinkedDataHasProperType(t, e);
                    });
                    var r = this.recordClass;
                    return !r || t instanceof r ? t : new r(t, e);
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
                crud: function(t) {
                    for (var e = this, n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                    var o = this.lifecycleMethods[t];
                    if (!o) throw E.err(yt + "#crud", t)(404, "method");
                    var a = "" + t.charAt(0).toUpperCase() + t.substr(1), u = "before" + a, c = "after" + a, s = void 0, f = void 0;
                    // Default values for arguments
                    o.defaults.forEach(function(t, e) {
                        void 0 === r[e] && (r[e] = E.copy(t));
                    });
                    var l = r[r.length - 1];
                    // Fill in "opts" with the Mapper's configuration
                    // before lifecycle hook
                    return E._(l, this), f = l.adapter = this.getAdapterName(l), s = l.op = u, E.resolve(this[s].apply(this, b(r))).then(function(n) {
                        var i;
                        // Allow for re-assignment from lifecycle hook
                        // Now delegate to the adapter
                        return void 0 !== r[o.beforeAssign] && (r[o.beforeAssign] = void 0 === n ? r[o.beforeAssign] : n), 
                        s = l.op = t, r = o.adapterArgs ? o.adapterArgs.apply(o, [ e ].concat(b(r))) : r, 
                        e.dbg.apply(e, [ s ].concat(b(r))), E.resolve((i = e.getAdapter(f))[s].apply(i, [ e ].concat(b(r))));
                    }).then(function(t) {
                        // after lifecycle hook
                        return t = e._end(t, l, !!o.skip), r.push(t), s = l.op = c, E.resolve(e[s].apply(e, b(r))).then(function(e) {
                            // Allow for re-assignment from lifecycle hook
                            return void 0 === e ? t : e;
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
                destroy: function(t, e) {
                    return this.crud("destroy", t, e);
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
                destroyAll: function(t, e) {
                    return this.crud("destroyAll", t, e);
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
                find: function(t, e) {
                    return this.crud("find", t, e);
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
                findAll: function(t, e) {
                    return this.crud("findAll", t, e);
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
                getAdapter: function(t) {
                    this.dbg("getAdapter", "name:", t);
                    var e = this.getAdapterName(t);
                    if (!e) throw E.err(yt + "#getAdapter", "name")(400, "string", t);
                    return this.getAdapters()[e];
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
                getAdapterName: function(t) {
                    return t || (t = {}), E.isString(t) && (t = {
                        adapter: t
                    }), t.adapter || t.defaultAdapter;
                },
                /**
   * Get the object of registered adapters for this Mapper.
   *
   * @method Mapper#getAdapters
   * @returns {Object} {@link Mapper#_adapters}
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
                getAdapters: function() {
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
                getSchema: function() {
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
                hasMany: function(t, e) {
                    return W(t, e)(this);
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
                hasOne: function(t, e) {
                    return B(t, e)(this);
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
                is: function(t) {
                    var e = this.recordClass;
                    return !!e && t instanceof e;
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
                registerAdapter: function(t, e, n) {
                    n || (n = {}), this.getAdapters()[t] = e, // Optionally make it the default adapter for the target.
                    (!0 === n || n.default) && (this.defaultAdapter = t);
                },
                _runHook: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    var i = 0 === t.indexOf("after") ? n.length - 1 : 0;
                    return E.resolve(this[t].apply(this, n)).then(function(t) {
                        return void 0 === t ? n[i] : t;
                    });
                },
                _invokeAdapterMethod: function(t, e, n) {
                    var r = this, i = {
                        with: n.pass || []
                    }, o = void 0;
                    return this.dbg(n.op, e, n), o = E.isArray(e) ? e.map(function(t) {
                        return r.toJSON(t, i);
                    }) : this.toJSON(e, i), this.getAdapter(n.adapter)[t](this, o, n);
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
                sum: function(t, e, n) {
                    return this.crud("sum", t, e, n);
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
                toJSON: function(t, e) {
                    var n = this, r = void 0;
                    if (e || (e = {}), E.isArray(t)) return t.map(function(t) {
                        return n.toJSON(t, e);
                    });
                    r = t;
                    var i = (this ? this.relationFields : []) || [], o = {};
                    // Copy properties defined in the schema
                    if (this && this.schema) o = this.schema.pick(r); else for (var a in r) -1 === i.indexOf(a) && (o[a] = E.plainCopy(r[a]));
                    // The user wants to include relations in the resulting plain object representation
                    return this && e.withAll && (e.with = i.slice()), this && e.with && (E.isString(e.with) && (e.with = [ e.with ]), 
                    E.forEachRelation(this, e, function(t, e) {
                        var n = t.getLocalField(r);
                        n && (// The actual recursion
                        E.isArray(n) ? t.setLocalField(o, n.map(function(n) {
                            return t.getRelation().toJSON(n, e);
                        })) : t.setLocalField(o, t.getRelation().toJSON(n, e)));
                    })), o;
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
                update: function(t, e, n) {
                    return this.crud("update", t, e, n);
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
                updateAll: function(t, e, n) {
                    return this.crud("updateAll", t, e, n);
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
                updateMany: function(t, e) {
                    return this.crud("updateMany", t, e);
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
                validate: function(t, e) {
                    e || (e = {});
                    var n = this.getSchema();
                    if (n) {
                        var r = E.pick(e, [ "existingOnly" ]);
                        if (E.isArray(t)) {
                            var i = t.map(function(t) {
                                return n.validate(t, E.pick(r, [ "existingOnly" ]));
                            });
                            return i.some(Boolean) ? i : void 0;
                        }
                        return n.validate(t, r);
                    }
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
                wrap: function(t, e) {
                    return this.createRecord(t, e);
                },
                /**
   * @ignore
   */
                defineRelations: function() {
                    var t = this;
                    // Setup the mapper's relations, including generating Mapper#relationList
                    // and Mapper#relationFields
                    E.forOwn(this.relations, function(e, n) {
                        E.forOwn(e, function(e, r) {
                            E.isObject(e) && (e = [ e ]), e.forEach(function(e) {
                                var o = t.datastore.getMapperByName(r) || r;
                                if (e.getRelation = function() {
                                    return t.datastore.getMapper(r);
                                }, "function" != typeof i[n]) throw E.err(yt, "defineRelations")(400, "relation type (hasOne, hasMany, etc)", n, !0);
                                t[n](o, e);
                            });
                        });
                    });
                }
            }), jt = [ /**
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
            "count", /**
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
            "create", /**
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
            "createMany", /**
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
            "createRecord", /**
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
            "destroy", /**
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
            "destroyAll", /**
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
            "find", /**
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
            "findAll", /**
 * Wrapper for {@link Mapper#getSchema}.
 *
 * @method Container#getSchema
 * @param {string} name Name of the {@link Mapper} to target.
 * @returns {Schema} See {@link Mapper#getSchema}.
 * @see Mapper#getSchema
 * @since 3.0.0
 */
            "getSchema", /**
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
            "is", /**
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
            "sum", /**
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
            "toJSON", /**
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
            "update", /**
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
            "updateAll", /**
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
            "updateMany", /**
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
            "validate" ], Et = {
                constructor: h,
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
                _onMapperEvent: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    var i = n.shift();
                    this.emit.apply(this, [ i, t ].concat(n));
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
                as: function(t) {
                    var e = {}, n = this;
                    return jt.forEach(function(r) {
                        e[r] = {
                            writable: !0,
                            value: function() {
                                for (var e = arguments.length, i = Array(e), o = 0; o < e; o++) i[o] = arguments[o];
                                return n[r].apply(n, [ t ].concat(i));
                            }
                        };
                    }), e.getMapper = {
                        writable: !0,
                        value: function() {
                            return n.getMapper(t);
                        }
                    }, Object.create(this, e);
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
                defineMapper: function(t, e) {
                    var n = this;
                    if (// For backwards compatibility with defineResource
                    E.isObject(t) && (t = (e = t).name), !E.isString(t)) throw E.err("Container#defineMapper", "name")(400, "string", t);
                    // Default values for arguments
                    e || (e = {}), // Set Mapper#name
                    e.name = t, e.relations || (e.relations = {});
                    // Check if the user is overriding the datastore's default mapperClass
                    var r = e.mapperClass || this.mapperClass;
                    delete e.mapperClass, // Apply the datastore's defaults to the options going into the mapper
                    E.fillIn(e, this.mapperDefaults);
                    // Instantiate a mapper
                    var i = this._mappers[t] = new r(e);
                    // eslint-disable-line
                    // Make sure the mapper's name is set
                    // All mappers in this datastore will share adapters
                    return i.relations || (i.relations = {}), i.name = t, i._adapters = this.getAdapters(), 
                    i.datastore = this, i.on("all", function() {
                        for (var e = arguments.length, r = Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                        return n._onMapperEvent.apply(n, [ t ].concat(r));
                    }), i.defineRelations(), i;
                },
                defineResource: function(t, e) {
                    return console.warn("DEPRECATED: defineResource is deprecated, use defineMapper instead"), 
                    this.defineMapper(t, e);
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
                getAdapter: function(t) {
                    var e = this.getAdapterName(t);
                    if (!e) throw E.err("Container#getAdapter", "name")(400, "string", t);
                    return this.getAdapters()[e];
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
                getAdapterName: function(t) {
                    return t || (t = {}), E.isString(t) && (t = {
                        adapter: t
                    }), t.adapter || this.mapperDefaults.defaultAdapter;
                },
                /**
   * Return the registered adapters of this container.
   *
   * @method Container#getAdapters
   * @returns {Adapter}
   * @since 3.0.0
   */
                getAdapters: function() {
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
                getMapper: function(t) {
                    var e = this.getMapperByName(t);
                    if (!e) throw E.err("Container#getMapper", t)(404, "mapper");
                    return e;
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
                getMapperByName: function(t) {
                    return this._mappers[t];
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
                registerAdapter: function(t, e, n) {
                    n || (n = {}), this.getAdapters()[t] = e, // Optionally make it the default adapter for the target.
                    (!0 === n || n.default) && (this.mapperDefaults.defaultAdapter = t, E.forOwn(this._mappers, function(e) {
                        e.defaultAdapter = t;
                    }));
                }
            };
            jt.forEach(function(t) {
                Et[t] = function(e) {
                    for (var n, r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                    return (n = this.getMapper(e))[t].apply(n, i);
                };
            }), R.extend(Et);
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
            var kt = [ /**
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
            "add", /**
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
            "between", /**
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
            "createIndex", /**
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
            "filter", /**
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
            "get", /**
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
            "getAll", /**
 * Wrapper for {@link Collection#prune}.
 *
 * @method SimpleStore#prune
 * @param {Object} [opts] See {@link Collection#prune}.
 * @returns {Array} See {@link Collection#prune}.
 * @see Collection#prune
 * @see Collection#prune
 * @since 3.0.0
 */
            "prune", /**
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
            "query", /**
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
            "toJSON", /**
 * Wrapper for {@link Collection#unsaved}.
 *
 * @method SimpleStore#unsaved
 * @returns {Array} See {@link Collection#unsaved}.
 * @see Collection#unsaved
 * @see Collection#unsaved
 * @since 3.0.0
 */
            "unsaved" ], It = [ "addToCache", "cachedFind", "cachedFindAll", "cacheFind", "cacheFindAll", "hashQuery" ], Rt = function(t, e, n) {
                var r = this._completedQueries[t][e];
                return E.isFunction(r) ? r(t, e, n) : r;
            }, Ct = {
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
                usePendingFind: !0,
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
                usePendingFindAll: !0
            }, Ft = {
                constructor: v,
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
                _end: function(t, e, n) {
                    var r = n.raw ? e.data : e;
                    return r && E.isFunction(this.addToCache) && (r = this.addToCache(t, r, n), n.raw ? e.data = r : e = r), 
                    e;
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
                _onCollectionEvent: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    var i = n.shift();
                    this.emit.apply(this, [ i, t ].concat(n));
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
                addToCache: function(t, e, n) {
                    return this.getCollection(t).add(e, n);
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
                as: function(t) {
                    var e = {}, n = this;
                    return It.concat(jt).concat(kt).forEach(function(r) {
                        e[r] = {
                            writable: !0,
                            value: function() {
                                for (var e = arguments.length, i = Array(e), o = 0; o < e; o++) i[o] = arguments[o];
                                return n[r].apply(n, [ t ].concat(i));
                            }
                        };
                    }), e.getMapper = {
                        writable: !0,
                        value: function() {
                            return n.getMapper(t);
                        }
                    }, e.getCollection = {
                        writable: !0,
                        value: function() {
                            return n.getCollection(t);
                        }
                    }, Object.create(this, e);
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
                cachedFind: Rt,
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
                cachedFindAll: Rt,
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
                cacheFind: function(t, e, n, r) {
                    var i = this;
                    this._completedQueries[t][n] = function(t, e, n) {
                        return i.get(t, e);
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
                cacheFindAll: function(t, e, n, r) {
                    var i = this;
                    this._completedQueries[t][n] = function(t, e, n) {
                        return i.filter(t, E.fromJson(e));
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
                clear: function() {
                    var t = this, e = {};
                    return E.forOwn(this._collections, function(n, r) {
                        e[r] = n.removeAll(), t._completedQueries[r] = {};
                    }), e;
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
                create: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), h.prototype.create.call(this, t, e, n).then(function(e) {
                        return r._end(t, e, n);
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
                createMany: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), h.prototype.createMany.call(this, t, e, n).then(function(e) {
                        return r._end(t, e, n);
                    });
                },
                defineMapper: function(t, e) {
                    var n = this, r = h.prototype.defineMapper.call(n, t, e);
                    n._pendingQueries[t] = {}, n._completedQueries[t] = {}, r.relationList || Object.defineProperty(r, "relationList", {
                        value: []
                    });
                    var i = {
                        // Make sure the collection has somewhere to store "added" timestamps
                        _added: {},
                        // Give the collection a reference to this SimpleStore
                        datastore: n,
                        // The mapper tied to the collection
                        mapper: r
                    };
                    e && "onConflict" in e && (i.onConflict = e.onConflict);
                    // The SimpleStore uses a subclass of Collection that is "SimpleStore-aware"
                    var o = n._collections[t] = new n.collectionClass(null, i), a = (r.schema || {}).properties || {};
                    // TODO: Make it possible index nested properties?
                    // Create a secondary index on the "added" timestamps of records in the
                    // collection
                    return E.forOwn(a, function(t, e) {
                        t.indexed && o.createIndex(e);
                    }), o.createIndex("addedTimestamps", [ "$" ], {
                        fieldGetter: function(t) {
                            return o._added[o.recordId(t)];
                        }
                    }), o.on("all", function() {
                        for (var e = arguments.length, r = Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                        n._onCollectionEvent.apply(n, [ t ].concat(r));
                    }), r;
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
                destroy: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), h.prototype.destroy.call(this, t, e, n).then(function(i) {
                        var o = r.getCollection(t).remove(e, n);
                        return n.raw ? i.data = o : i = o, delete r._pendingQueries[t][e], delete r._completedQueries[t][e], 
                        i;
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
                destroyAll: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), h.prototype.destroyAll.call(this, t, e, n).then(function(i) {
                        var o = r.getCollection(t).removeAll(e, n);
                        n.raw ? i.data = o : i = o;
                        var a = r.hashQuery(t, e, n);
                        return delete r._pendingQueries[t][a], delete r._completedQueries[t][a], i;
                    });
                },
                eject: function(t, e, n) {
                    return console.warn('DEPRECATED: "eject" is deprecated, use "remove" instead'), 
                    this.remove(t, e, n);
                },
                ejectAll: function(t, e, n) {
                    return console.warn('DEPRECATED: "ejectAll" is deprecated, use "removeAll" instead'), 
                    this.removeAll(t, e, n);
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
                find: function(t, e, n) {
                    var r = this;
                    n || (n = {});
                    var i = this.getMapper(t), o = this._pendingQueries[t][e], a = void 0 === n.usePendingFind ? this.usePendingFind : n.usePendingFind;
                    if (E._(n, i), o && (E.isFunction(a) ? a.call(this, t, e, n) : a)) return o;
                    var u = this.cachedFind(t, e, n);
                    if (n.force || !u) {
                        return (this._pendingQueries[t][e] = h.prototype.find.call(this, t, e, n)).then(function(i) {
                            return delete r._pendingQueries[t][e], i = r._end(t, i, n), r.cacheFind(t, i, e, n), 
                            i;
                        }, function(n) {
                            return delete r._pendingQueries[t][e], E.reject(n);
                        });
                    }
                    return E.resolve(u);
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
                findAll: function(t, e, n) {
                    var r = this;
                    n || (n = {});
                    var i = this.getMapper(t), o = this.hashQuery(t, e, n), a = this._pendingQueries[t][o], u = void 0 === n.usePendingFindAll ? this.usePendingFindAll : n.usePendingFindAll;
                    if (E._(n, i), a && (E.isFunction(u) ? u.call(this, t, e, n) : u)) return a;
                    var c = this.cachedFindAll(t, o, n);
                    if (n.force || !c) {
                        return (this._pendingQueries[t][o] = h.prototype.findAll.call(this, t, e, n)).then(function(e) {
                            return delete r._pendingQueries[t][o], e = r._end(t, e, n), r.cacheFindAll(t, e, o, n), 
                            e;
                        }, function(e) {
                            return delete r._pendingQueries[t][o], E.reject(e);
                        });
                    }
                    return E.resolve(c);
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
                getCollection: function(t) {
                    var e = this._collections[t];
                    if (!e) throw E.err("SimpleStore#getCollection", t)(404, "collection");
                    return e;
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
                hashQuery: function(t, e, n) {
                    return E.toJson(e || {});
                },
                inject: function(t, e, n) {
                    return console.warn('DEPRECATED: "inject" is deprecated, use "add" instead'), this.add(t, e, n);
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
                remove: function(t, e, n) {
                    var r = this.getCollection(t).remove(e, n);
                    return r && this.removeRelated(t, [ r ], n), r;
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
                removeAll: function(t, e, n) {
                    e && Object.keys(e).length ? this._completedQueries[t][this.hashQuery(t, e, n)] = void 0 : this._completedQueries[t] = {};
                    var r = this.getCollection(t).removeAll(e, n);
                    return r.length && this.removeRelated(t, r, n), r;
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
                removeRelated: function(t, e, n) {
                    var r = this;
                    E.isArray(e) || (e = [ e ]), E.forEachRelation(this.getMapper(t), n, function(t, n) {
                        e.forEach(function(e) {
                            var i = void 0, o = void 0;
                            if (!t.foreignKey || t.type !== D && t.type !== N ? t.type === N && t.localKeys ? o = {
                                where: x({}, t.getRelation().idAttribute, {
                                    in: E.get(e, t.localKeys)
                                })
                            } : t.type === N && t.foreignKeys ? o = {
                                where: x({}, t.foreignKeys, {
                                    contains: t.getForeignKey(e)
                                })
                            } : t.type === T && (i = r.remove(t.relation, t.getForeignKey(e), n)) : o = x({}, t.foreignKey, t.getForeignKey(e)), 
                            o && (i = r.removeAll(t.relation, o, n)), i) {
                                if (E.isArray(i) && !i.length) return;
                                t.type === D && (i = i[0]), t.setLocalField(e, i);
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
                update: function(t, e, n, r) {
                    var i = this;
                    return r || (r = {}), h.prototype.update.call(this, t, e, n, r).then(function(e) {
                        return i._end(t, e, r);
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
                updateAll: function(t, e, n, r) {
                    var i = this;
                    return r || (r = {}), h.prototype.updateAll.call(this, t, e, n, r).then(function(e) {
                        return i._end(t, e, r);
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
                updateMany: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), h.prototype.updateMany.call(this, t, e, n).then(function(e) {
                        return r._end(t, e, n);
                    });
                }
            };
            kt.forEach(function(t) {
                Ft[t] = function(e) {
                    for (var n, r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                    return (n = this.getCollection(e))[t].apply(n, i);
                };
            });
            var St = h.extend(Ft), Pt = "LinkedCollection", Mt = Y.extend({
                constructor: y,
                _addMeta: function(t, e) {
                    // Track when this record was added
                    this._added[this.recordId(t)] = e, E.isFunction(t._set) && t._set("$", e);
                },
                _clearMeta: function(t) {
                    delete this._added[this.recordId(t)], E.isFunction(t._set) && t._set("$");
                },
                _onRecordEvent: function() {
                    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    Y.prototype._onRecordEvent.apply(this, e);
                    var r = e[0];
                    // This is a very brute force method
                    // Lots of room for optimization
                    E.isString(r) && 0 === r.indexOf("change") && this.updateIndexes(e[1]);
                },
                add: function(t, e) {
                    var n = this, r = this.mapper, i = new Date().getTime(), o = E.isObject(t) && !E.isArray(t);
                    // Check the currently visited record for relations that need to be
                    // inserted into their respective collections.
                    return o && (t = [ t ]), t = Y.prototype.add.call(this, t, e), r.relationList.length && t.length && r.relationList.forEach(function(e) {
                        e.addLinkedRecords(t);
                    }), t.forEach(function(t) {
                        return n._addMeta(t, i);
                    }), o ? t[0] : t;
                },
                remove: function(t, e) {
                    var n = this.mapper, r = Y.prototype.remove.call(this, t, e);
                    return r && this._clearMeta(r), n.relationList.length && r && n.relationList.forEach(function(t) {
                        t.removeLinkedRecords(n, [ r ]);
                    }), r;
                },
                removeAll: function(t, e) {
                    var n = this.mapper, r = Y.prototype.removeAll.call(this, t, e);
                    return r.forEach(this._clearMeta, this), n.relationList.length && r.length && n.relationList.forEach(function(t) {
                        t.removeLinkedRecords(n, r);
                    }), r;
                }
            }), Lt = {
                /**
   * Whether in-memory relations should be unlinked from records after they are
   * destroyed.
   *
   * @default true
   * @name DataStore#unlinkOnDestroy
   * @since 3.0.0
   * @type {boolean}
   */
                unlinkOnDestroy: !0
            }, Tt = {
                constructor: g,
                defineMapper: function(t, e) {
                    // Complexity of this method is beyond simply using => functions to bind context
                    var n = this, r = St.prototype.defineMapper.call(n, t, e), i = r.idAttribute, o = this.getCollection(t);
                    return r.relationList.forEach(function(t) {
                        var e = t.relation, a = t.localField, u = "links." + a, c = t.foreignKey, s = t.type, f = {
                            index: c
                        }, l = void 0, p = function() {
                            return this._get(u);
                        };
                        if (s === T) {
                            o.indexes[c] || o.createIndex(c), l = {
                                get: p,
                                // e.g. profile.user = someUser
                                // or comment.post = somePost
                                set: function(s) {
                                    // e.g. const otherUser = profile.user
                                    var l = this._get(u);
                                    // e.g. profile.user === someUser
                                    if (s === l) return l;
                                    var p = E.get(this, i), d = t.getInverse(r);
                                    if (// e.g. profile.user !== someUser
                                    // or comment.post !== somePost
                                    l && d && this.removeInverseRelation(l, p, d, i), s) {
                                        // e.g. profile.user = someUser
                                        var h = t.getRelation().idAttribute, v = E.get(s, h);
                                        // Prefer store record
                                        void 0 !== v && this._get("$") && (s = n.get(e, v) || s), // Set locals
                                        // e.g. profile.user = someUser
                                        // or comment.post = somePost
                                        I(this, a, s), k(this, c, v), o.updateIndex(this, f), d && this.setupInverseRelation(s, p, d, i);
                                    } else // Unset in-memory link only
                                    // e.g. profile.user = undefined
                                    // or comment.post = undefined
                                    I(this, a, void 0);
                                    return s;
                                }
                            };
                            var d = Object.getOwnPropertyDescriptor(r.recordClass.prototype, c);
                            d || (d = {
                                enumerable: !0
                            });
                            var h = d.get;
                            d.get = function() {
                                return h ? h.call(this) : this._get("props." + c);
                            };
                            var v = d.set;
                            d.set = function(u) {
                                var s = this;
                                v && v.call(this, u);
                                var l = E.get(this, a), p = E.get(this, i), d = t.getInverse(r), h = l ? E.get(l, t.getRelation().idAttribute) : void 0;
                                if (l && void 0 !== h && h !== u) if (d.type === D) I(l, d.localField, void 0); else if (d.type === N) {
                                    var y = E.get(l, d.localField);
                                    void 0 === p ? E.remove(y, function(t) {
                                        return t === s;
                                    }) : E.remove(y, function(t) {
                                        return t === s || p === E.get(t, i);
                                    });
                                }
                                if (k(this, c, u), o.updateIndex(this, f), void 0 === u || null === u) void 0 !== h && // Unset locals
                                E.set(this, a, void 0); else if (this._get("$")) {
                                    var g = n.get(e, u);
                                    g && E.set(this, a, g);
                                }
                            }, Object.defineProperty(r.recordClass.prototype, c, d);
                        } else if (s === N) {
                            var y = t.localKeys, g = t.foreignKeys;
                            // TODO: Handle case when belongsTo relation isn't ever defined
                            n._collections[e] && c && !n.getCollection(e).indexes[c] && n.getCollection(e).createIndex(c), 
                            l = {
                                get: function() {
                                    return p.call(this) || this._set(u, []), p.call(this);
                                },
                                // e.g. post.comments = someComments
                                // or user.groups = someGroups
                                // or group.users = someUsers
                                set: function(o) {
                                    var s = this;
                                    o && !E.isArray(o) && (o = [ o ]);
                                    var l = E.get(this, i), p = t.getRelation().idAttribute, d = t.getInverse(r), h = d.localField, v = this._get(u) || [], m = [], x = {};
                                    // e.g. post.comments = someComments
                                    if (o && o.forEach(function(t) {
                                        // e.g. comment.id
                                        var r = E.get(t, p), i = E.get(t, h);
                                        if (i && i !== s) {
                                            var o = E.get(i, a);
                                            // e.g. somePost.comments.remove(comment)
                                            void 0 === r ? E.remove(o, function(e) {
                                                return e === t;
                                            }) : E.remove(o, function(e) {
                                                return e === t || r === E.get(e, p);
                                            });
                                        }
                                        void 0 !== r && (s._get("$") && (// Prefer store record
                                        t = n.get(e, r) || t), // e.g. toLinkIds[comment.id] = comment
                                        x[r] = t), m.push(t);
                                    }), c) v.forEach(function(t) {
                                        // e.g. comment.id
                                        var r = E.get(t, p);
                                        (void 0 === r && -1 === m.indexOf(t) || void 0 !== r && !(r in x)) && (// Update (unset) inverse relation
                                        o && (// e.g. comment.post_id = undefined
                                        k(t, c, void 0), // e.g. CommentCollection.updateIndex(comment, { index: 'post_id' })
                                        n.getCollection(e).updateIndex(t, f)), // e.g. comment.post = undefined
                                        I(t, h, void 0));
                                    }), m.forEach(function(t) {
                                        // Update (set) inverse relation
                                        // e.g. comment.post_id = post.id
                                        k(t, c, l), // e.g. CommentCollection.updateIndex(comment, { index: 'post_id' })
                                        n.getCollection(e).updateIndex(t, f), // e.g. comment.post = post
                                        I(t, h, s);
                                    }); else if (y) {
                                        // Update locals
                                        // e.g. group.users = someUsers
                                        // Update (set) inverse relation
                                        var b = m.map(function(t) {
                                            return E.get(t, p);
                                        }).filter(function(t) {
                                            return void 0 !== t;
                                        });
                                        // e.g. group.user_ids = [1,2,3,...]
                                        E.set(this, y, b), // Update (unset) inverse relation
                                        d.foreignKeys && (v.forEach(function(t) {
                                            var e = E.get(t, p);
                                            if (void 0 === e && -1 === m.indexOf(t) || void 0 !== e && !(e in x)) {
                                                // Update inverse relation
                                                // safeSetLink(child, inverseLocalField, undefined)
                                                var n = E.get(t, h) || [];
                                                // e.g. someUser.groups.remove(group)
                                                void 0 === l ? E.remove(n, function(t) {
                                                    return t === s;
                                                }) : E.remove(n, function(t) {
                                                    return t === s || l === E.get(t, i);
                                                });
                                            }
                                        }), m.forEach(function(t) {
                                            // Update (set) inverse relation
                                            var e = E.get(t, h);
                                            // e.g. someUser.groups.push(group)
                                            void 0 === l ? E.noDupeAdd(e, s, function(t) {
                                                return t === s;
                                            }) : E.noDupeAdd(e, s, function(t) {
                                                return t === s || l === E.get(t, i);
                                            });
                                        }));
                                    } else g && (// e.g. user.groups = someGroups
                                    // Update (unset) inverse relation
                                    v.forEach(function(t) {
                                        var e = E.get(t, g) || [];
                                        // e.g. someGroup.user_ids.remove(user.id)
                                        E.remove(e, function(t) {
                                            return l === t;
                                        });
                                        var n = E.get(t, h);
                                        // e.g. someGroup.users.remove(user)
                                        void 0 === l ? E.remove(n, function(t) {
                                            return t === s;
                                        }) : E.remove(n, function(t) {
                                            return t === s || l === E.get(t, i);
                                        });
                                    }), // Update (set) inverse relation
                                    m.forEach(function(t) {
                                        var e = E.get(t, g) || [];
                                        E.noDupeAdd(e, l, function(t) {
                                            return l === t;
                                        });
                                        var n = E.get(t, h);
                                        void 0 === l ? E.noDupeAdd(n, s, function(t) {
                                            return t === s;
                                        }) : E.noDupeAdd(n, s, function(t) {
                                            return t === s || l === E.get(t, i);
                                        });
                                    }));
                                    return this._set(u, m), m;
                                }
                            };
                        } else s === D && (// TODO: Handle case when belongsTo relation isn't ever defined
                        n._collections[e] && c && !n.getCollection(e).indexes[c] && n.getCollection(e).createIndex(c), 
                        l = {
                            get: p,
                            // e.g. user.profile = someProfile
                            set: function(o) {
                                var s = this._get(u);
                                if (o === s) return s;
                                var l = t.getInverse(r).localField;
                                if (// Update (unset) inverse relation
                                s && (k(s, c, void 0), n.getCollection(e).updateIndex(s, f), I(s, l, void 0)), o) {
                                    var p = E.get(o, t.getRelation().idAttribute);
                                    // Prefer store record
                                    void 0 !== p && (o = n.get(e, p) || o), // Set locals
                                    I(this, a, o), // Update (set) inverse relation
                                    k(o, c, E.get(this, i)), n.getCollection(e).updateIndex(o, f), I(o, l, this);
                                } else // Unset locals
                                I(this, a, void 0);
                                return o;
                            }
                        });
                        if (l) {
                            if (l.enumerable = void 0 !== t.enumerable && t.enumerable, t.get) {
                                var m = l.get;
                                l.get = function() {
                                    var e = this;
                                    return t.get(t, this, function() {
                                        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                                        return m.apply(e, n);
                                    });
                                };
                            }
                            if (t.set) {
                                var x = l.set;
                                l.set = function(e) {
                                    var n = this;
                                    return t.set(t, this, e, function(t) {
                                        return x.call(n, void 0 === t ? e : t);
                                    });
                                };
                            }
                            Object.defineProperty(r.recordClass.prototype, a, l);
                        }
                    }), r;
                },
                destroy: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), St.prototype.destroy.call(this, t, e, n).then(function(e) {
                        var i = void 0;
                        if ((i = n.raw ? e.data : e) && r.unlinkOnDestroy) {
                            var o = E.plainCopy(n);
                            o.withAll = !0, E.forEachRelation(r.getMapper(t), o, function(t) {
                                E.set(i, t.localField, void 0);
                            });
                        }
                        return e;
                    });
                },
                destroyAll: function(t, e, n) {
                    var r = this;
                    return n || (n = {}), St.prototype.destroyAll.call(this, t, e, n).then(function(e) {
                        var i = void 0;
                        if ((i = n.raw ? e.data : e) && i.length && r.unlinkOnDestroy) {
                            var o = E.plainCopy(n);
                            o.withAll = !0, E.forEachRelation(r.getMapper(t), o, function(t) {
                                i.forEach(function(e) {
                                    E.set(e, t.localField, void 0);
                                });
                            });
                        }
                        return e;
                    });
                }
            }, Nt = St.extend(Tt);
            t.version = {
                full: "3.0.1",
                major: 3,
                minor: 0,
                patch: 1
            }, t.Collection = Y, t.Component = R, t.Container = h, t.DataStore = Nt, t.Index = f, 
            t.LinkedCollection = Mt, t.Mapper = At, t.Query = L, t.Record = Q, t.Schema = vt, 
            t.Settable = e, t.SimpleStore = St, t.utils = E, t.belongsTo = K, t.hasMany = W, 
            t.hasOne = B, t.belongsToType = T, t.hasManyType = N, t.hasOneType = D, Object.defineProperty(t, "__esModule", {
                value: !0
            });
        });
    }, /* 225 */
    /***/
    function(t, e, n) {
        var r = "undefined" != typeof JSON ? JSON : n(226);
        t.exports = function(t, e) {
            e || (e = {}), "function" == typeof e && (e = {
                cmp: e
            });
            var n = e.space || "";
            "number" == typeof n && (n = Array(n + 1).join(" "));
            var a = "boolean" == typeof e.cycles && e.cycles, u = e.replacer || function(t, e) {
                return e;
            }, c = e.cmp && function(t) {
                return function(e) {
                    return function(n, r) {
                        var i = {
                            key: n,
                            value: e[n]
                        }, o = {
                            key: r,
                            value: e[r]
                        };
                        return t(i, o);
                    };
                };
            }(e.cmp), s = [];
            return function t(e, f, l, p) {
                var d = n ? "\n" + new Array(p + 1).join(n) : "", h = n ? ": " : ":";
                if (l && l.toJSON && "function" == typeof l.toJSON && (l = l.toJSON()), void 0 !== (l = u.call(e, f, l))) {
                    if ("object" != typeof l || null === l) return r.stringify(l);
                    if (i(l)) {
                        for (var v = [], y = 0; y < l.length; y++) {
                            var g = t(l, y, l[y], p + 1) || r.stringify(null);
                            v.push(d + n + g);
                        }
                        return "[" + v.join(",") + d + "]";
                    }
                    if (-1 !== s.indexOf(l)) {
                        if (a) return r.stringify("__cycle__");
                        throw new TypeError("Converting circular structure to JSON");
                    }
                    s.push(l);
                    for (var m = o(l).sort(c && c(l)), v = [], y = 0; y < m.length; y++) {
                        var x = t(l, f = m[y], l[f], p + 1);
                        if (x) {
                            var b = r.stringify(f) + h + x;
                            v.push(d + n + b);
                        }
                    }
                    return s.splice(s.indexOf(l), 1), "{" + v.join(",") + d + "}";
                }
            }({
                "": t
            }, "", t, 0);
        };
        var i = Array.isArray || function(t) {
            return "[object Array]" === {}.toString.call(t);
        }, o = Object.keys || function(t) {
            var e = Object.prototype.hasOwnProperty || function() {
                return !0;
            }, n = [];
            for (var r in t) e.call(t, r) && n.push(r);
            return n;
        };
    }, /* 226 */
    /***/
    function(t, e, n) {
        e.parse = n(227), e.stringify = n(228);
    }, /* 227 */
    /***/
    function(t, e) {
        var n, // The index of the current character
        r, i, o, // The current character
        a = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t"
        }, u = function(t) {
            // Call error when something is wrong.
            throw {
                name: "SyntaxError",
                message: t,
                at: n,
                text: i
            };
        }, c = function(t) {
            // If a c parameter is provided, verify that it matches the current character.
            // Get the next character. When there are no more characters,
            // return the empty string.
            return t && t !== r && u("Expected '" + t + "' instead of '" + r + "'"), r = i.charAt(n), 
            n += 1, r;
        }, s = function() {
            // Parse a number value.
            var t, e = "";
            for ("-" === r && (e = "-", c("-")); r >= "0" && r <= "9"; ) e += r, c();
            if ("." === r) for (e += "."; c() && r >= "0" && r <= "9"; ) e += r;
            if ("e" === r || "E" === r) for (e += r, c(), "-" !== r && "+" !== r || (e += r, 
            c()); r >= "0" && r <= "9"; ) e += r, c();
            if (t = +e, isFinite(t)) return t;
            u("Bad number");
        }, f = function() {
            // Parse a string value.
            var t, e, n, i = "";
            // When parsing for string values, we must look for " and \ characters.
            if ('"' === r) for (;c(); ) {
                if ('"' === r) return c(), i;
                if ("\\" === r) if (c(), "u" === r) {
                    for (n = 0, e = 0; e < 4 && (t = parseInt(c(), 16), isFinite(t)); e += 1) n = 16 * n + t;
                    i += String.fromCharCode(n);
                } else {
                    if ("string" != typeof a[r]) break;
                    i += a[r];
                } else i += r;
            }
            u("Bad string");
        }, l = function() {
            // Skip whitespace.
            for (;r && r <= " "; ) c();
        };
        o = function() {
            switch (// Parse a JSON value. It could be an object, an array, a string, a number,
            // or a word.
            l(), r) {
              case "{":
                return function() {
                    // Parse an object value.
                    var t, e = {};
                    if ("{" === r) {
                        if (c("{"), l(), "}" === r) return c("}"), e;
                        for (;r; ) {
                            if (t = f(), l(), c(":"), Object.hasOwnProperty.call(e, t) && u('Duplicate key "' + t + '"'), 
                            e[t] = o(), l(), "}" === r) return c("}"), e;
                            c(","), l();
                        }
                    }
                    u("Bad object");
                }();

              case "[":
                return function() {
                    // Parse an array value.
                    var t = [];
                    if ("[" === r) {
                        if (c("["), l(), "]" === r) return c("]"), t;
                        for (;r; ) {
                            if (t.push(o()), l(), "]" === r) return c("]"), t;
                            c(","), l();
                        }
                    }
                    u("Bad array");
                }();

              case '"':
                return f();

              case "-":
                return s();

              default:
                return r >= "0" && r <= "9" ? s() : function() {
                    // true, false, or null.
                    switch (r) {
                      case "t":
                        return c("t"), c("r"), c("u"), c("e"), !0;

                      case "f":
                        return c("f"), c("a"), c("l"), c("s"), c("e"), !1;

                      case "n":
                        return c("n"), c("u"), c("l"), c("l"), null;
                    }
                    u("Unexpected '" + r + "'");
                }();
            }
        }, // Return the json_parse function. It will have access to all of the above
        // functions and variables.
        t.exports = function(t, e) {
            var a;
            // If there is a reviver function, we recursively walk the new structure,
            // passing each name/value pair to the reviver function for possible
            // transformation, starting with a temporary root object that holds the result
            // in an empty key. If there is not a reviver function, we simply return the
            // result.
            return i = t, n = 0, r = " ", a = o(), l(), r && u("Syntax error"), "function" == typeof e ? function t(n, r) {
                var i, o, a = n[r];
                if (a && "object" == typeof a) for (i in a) Object.prototype.hasOwnProperty.call(a, i) && (void 0 !== (o = t(a, i)) ? a[i] = o : delete a[i]);
                return e.call(n, r, a);
            }({
                "": a
            }, "") : a;
        };
    }, /* 228 */
    /***/
    function(t, e) {
        function n(t) {
            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.
            return u.lastIndex = 0, u.test(t) ? '"' + t.replace(u, function(t) {
                var e = c[t];
                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + t + '"';
        }
        function r(t, e) {
            // Produce a string from holder[key].
            var u, // The loop counter.
            c, // The member key.
            s, // The member value.
            f, l, p = i, d = e[t];
            // What happens next depends on the value's type.
            switch (// If the value has a toJSON method, call it to obtain a replacement value.
            d && "object" == typeof d && "function" == typeof d.toJSON && (d = d.toJSON(t)), 
            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.
            "function" == typeof a && (d = a.call(e, t, d)), typeof d) {
              case "string":
                return n(d);

              case "number":
                // JSON numbers must be finite. Encode non-finite numbers as null.
                return isFinite(d) ? String(d) : "null";

              case "boolean":
              case "null":
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.
                return String(d);

              case "object":
                if (!d) return "null";
                // Array.isArray
                if (i += o, l = [], "[object Array]" === Object.prototype.toString.apply(d)) {
                    for (f = d.length, u = 0; u < f; u += 1) l[u] = r(u, d) || "null";
                    // Join all of the elements together, separated with commas, and
                    // wrap them in brackets.
                    return s = 0 === l.length ? "[]" : i ? "[\n" + i + l.join(",\n" + i) + "\n" + p + "]" : "[" + l.join(",") + "]", 
                    i = p, s;
                }
                // If the replacer is an array, use it to select the members to be
                // stringified.
                if (a && "object" == typeof a) for (f = a.length, u = 0; u < f; u += 1) "string" == typeof (c = a[u]) && (s = r(c, d)) && l.push(n(c) + (i ? ": " : ":") + s); else // Otherwise, iterate through all of the keys in the object.
                for (c in d) Object.prototype.hasOwnProperty.call(d, c) && (s = r(c, d)) && l.push(n(c) + (i ? ": " : ":") + s);
                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.
                return s = 0 === l.length ? "{}" : i ? "{\n" + i + l.join(",\n" + i) + "\n" + p + "}" : "{" + l.join(",") + "}", 
                i = p, s;
            }
        }
        var i, o, a, u = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c = {
            // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        t.exports = function(t, e, n) {
            var u;
            // If the space parameter is a number, make an indent string containing that
            // many spaces.
            if (i = "", o = "", "number" == typeof n) for (u = 0; u < n; u += 1) o += " "; else "string" == typeof n && (o = n);
            if (// If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.
            a = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.
            return r("", {
                "": t
            });
        };
    }, /* 229 */
    /***/
    function(t, e, n) {
        var r = n(16)(n(3), "DataView");
        t.exports = r;
    }, /* 230 */
    /***/
    function(t, e, n) {
        /**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
        function r(t) {
            var e = -1, n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n; ) {
                var r = t[e];
                this.set(r[0], r[1]);
            }
        }
        var i = n(292), o = n(293), a = n(294), u = n(295), c = n(296);
        // Add methods to `Hash`.
        r.prototype.clear = i, r.prototype.delete = o, r.prototype.get = a, r.prototype.has = u, 
        r.prototype.set = c, t.exports = r;
    }, /* 231 */
    /***/
    function(t, e, n) {
        var r = n(16)(n(3), "Promise");
        t.exports = r;
    }, /* 232 */
    /***/
    function(t, e, n) {
        var r = n(16)(n(3), "Set");
        t.exports = r;
    }, /* 233 */
    /***/
    function(t, e, n) {
        /**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
        function r(t) {
            var e = -1, n = null == t ? 0 : t.length;
            for (this.__data__ = new i(); ++e < n; ) this.add(t[e]);
        }
        var i = n(78), o = n(322), a = n(323);
        // Add methods to `SetCache`.
        r.prototype.add = r.prototype.push = o, r.prototype.has = a, t.exports = r;
    }, /* 234 */
    /***/
    function(t, e) {
        t.exports = /**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
        function(t, e) {
            // Don't return `map.set` because it's not chainable in IE 11.
            return t.set(e[0], e[1]), t;
        };
    }, /* 235 */
    /***/
    function(t, e) {
        t.exports = /**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
        function(t, e) {
            // Don't return `set.add` because it's not chainable in IE 11.
            return t.add(e), t;
        };
    }, /* 236 */
    /***/
    function(t, e, n) {
        var r = n(244);
        t.exports = /**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
        function(t, e) {
            return !!(null == t ? 0 : t.length) && r(t, e, 0) > -1;
        };
    }, /* 237 */
    /***/
    function(t, e) {
        t.exports = /**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
        function(t, e) {
            for (var n = -1, r = null == t ? 0 : t.length; ++n < r; ) if (e(t[n], n, t)) return !0;
            return !1;
        };
    }, /* 238 */
    /***/
    function(t, e) {
        t.exports = /**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
        function(t) {
            return t.split("");
        };
    }, /* 239 */
    /***/
    function(t, e) {
        /** Used to match words composed of alphanumeric characters. */
        var n = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        t.exports = /**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
        function(t) {
            return t.match(n) || [];
        };
    }, /* 240 */
    /***/
    function(t, e, n) {
        var r = n(15), i = n(39);
        t.exports = /**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
        function(t, e) {
            return t && r(e, i(e), t);
        };
    }, /* 241 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t, e, n, r) {
            for (var i = t.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; ) if (e(t[o], o, t)) return o;
            return -1;
        };
    }, /* 242 */
    /***/
    function(t, e, n) {
        var r = n(122), i = n(11);
        t.exports = /**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
        function(t, e) {
            return t && r(t, e, i);
        };
    }, /* 243 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
        function(t, e) {
            return null != t && e in Object(t);
        };
    }, /* 244 */
    /***/
    function(t, e, n) {
        var r = n(241), i = n(248), o = n(330);
        t.exports = /**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
        function(t, e, n) {
            return e == e ? o(t, e, n) : r(t, i, n);
        };
    }, /* 245 */
    /***/
    function(t, e, n) {
        var r = n(20), i = n(10), o = "[object Arguments]";
        t.exports = /**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
        function(t) {
            return i(t) && r(t) == o;
        };
    }, /* 246 */
    /***/
    function(t, e, n) {
        var r = n(47), i = n(138), o = n(283), a = n(284), u = n(56), c = n(0), s = n(24), f = n(38), l = 1, p = "[object Arguments]", d = "[object Array]", h = "[object Object]", v = Object.prototype.hasOwnProperty;
        t.exports = /**
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
        function(t, e, n, y, g, m) {
            var x = c(t), b = c(e), _ = x ? d : u(t), w = b ? d : u(e), O = (_ = _ == p ? h : _) == h, A = (w = w == p ? h : w) == h, j = _ == w;
            if (j && s(t)) {
                if (!s(e)) return !1;
                x = !0, O = !1;
            }
            if (j && !O) return m || (m = new r()), x || f(t) ? i(t, e, n, y, g, m) : o(t, e, _, n, y, g, m);
            if (!(n & l)) {
                var E = O && v.call(t, "__wrapped__"), k = A && v.call(e, "__wrapped__");
                if (E || k) {
                    var I = E ? t.value() : t, R = k ? e.value() : e;
                    return m || (m = new r()), g(I, R, n, y, m);
                }
            }
            return !!j && (m || (m = new r()), a(t, e, n, y, g, m));
        };
    }, /* 247 */
    /***/
    function(t, e, n) {
        var r = n(47), i = n(83), o = 1, a = 2;
        t.exports = /**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
        function(t, e, n, u) {
            var c = n.length, s = c, f = !u;
            if (null == t) return !s;
            for (t = Object(t); c--; ) {
                var l = n[c];
                if (f && l[2] ? l[1] !== t[l[0]] : !(l[0] in t)) return !1;
            }
            for (;++c < s; ) {
                var p = (l = n[c])[0], d = t[p], h = l[1];
                if (f && l[2]) {
                    if (void 0 === d && !(p in t)) return !1;
                } else {
                    var v = new r();
                    if (u) var y = u(d, h, p, t, e, v);
                    if (!(void 0 === y ? i(h, d, o | a, u, v) : y)) return !1;
                }
            }
            return !0;
        };
    }, /* 248 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
        function(t) {
            return t != t;
        };
    }, /* 249 */
    /***/
    function(t, e, n) {
        var r = n(25), i = n(303), o = n(4), a = n(158), u = /^\[object .+?Constructor\]$/, c = Function.prototype, s = Object.prototype, f = c.toString, l = s.hasOwnProperty, p = RegExp("^" + f.call(l).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        t.exports = /**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
        function(t) {
            return !(!o(t) || i(t)) && (r(t) ? p : u).test(a(t));
        };
    }, /* 250 */
    /***/
    function(t, e, n) {
        var r = n(20), i = n(97), o = n(10), a = {};
        a["[object Float32Array]"] = a["[object Float64Array]"] = a["[object Int8Array]"] = a["[object Int16Array]"] = a["[object Int32Array]"] = a["[object Uint8Array]"] = a["[object Uint8ClampedArray]"] = a["[object Uint16Array]"] = a["[object Uint32Array]"] = !0, 
        a["[object Arguments]"] = a["[object Array]"] = a["[object ArrayBuffer]"] = a["[object Boolean]"] = a["[object DataView]"] = a["[object Date]"] = a["[object Error]"] = a["[object Function]"] = a["[object Map]"] = a["[object Number]"] = a["[object Object]"] = a["[object RegExp]"] = a["[object Set]"] = a["[object String]"] = a["[object WeakMap]"] = !1, 
        t.exports = /**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
        function(t) {
            return o(t) && i(t.length) && !!a[r(t)];
        };
    }, /* 251 */
    /***/
    function(t, e, n) {
        var r = n(4), i = n(34), o = n(317), a = Object.prototype.hasOwnProperty;
        t.exports = /**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
        function(t) {
            if (!r(t)) return o(t);
            var e = i(t), n = [];
            for (var u in t) ("constructor" != u || !e && a.call(t, u)) && n.push(u);
            return n;
        };
    }, /* 252 */
    /***/
    function(t, e, n) {
        var r = n(247), i = n(286), o = n(149);
        t.exports = /**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
        function(t) {
            var e = i(t);
            return 1 == e.length && e[0][2] ? o(e[0][0], e[0][1]) : function(n) {
                return n === t || r(n, t, e);
            };
        };
    }, /* 253 */
    /***/
    function(t, e, n) {
        var r = n(83), i = n(159), o = n(358), a = n(92), u = n(148), c = n(149), s = n(35), f = 1, l = 2;
        t.exports = /**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
        function(t, e) {
            return a(t) && u(e) ? c(s(t), e) : function(n) {
                var a = i(n, t);
                return void 0 === a && a === e ? o(n, t) : r(e, a, f | l);
            };
        };
    }, /* 254 */
    /***/
    function(t, e, n) {
        /**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
        function r(t, e, n, f, l) {
            t !== e && a(e, function(a, s) {
                if (c(a)) l || (l = new i()), u(t, e, s, n, r, f, l); else {
                    var p = f ? f(t[s], a, s + "", t, e, l) : void 0;
                    void 0 === p && (p = a), o(t, s, p);
                }
            }, s);
        }
        var i = n(47), o = n(119), a = n(122), u = n(255), c = n(4), s = n(39);
        t.exports = r;
    }, /* 255 */
    /***/
    function(t, e, n) {
        var r = n(119), i = n(131), o = n(132), a = n(21), u = n(146), c = n(36), s = n(0), f = n(160), l = n(24), p = n(25), d = n(4), h = n(361), v = n(38), y = n(375);
        t.exports = /**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
        function(t, e, n, g, m, x, b) {
            var _ = t[n], w = e[n], O = b.get(w);
            if (O) r(t, n, O); else {
                var A = x ? x(_, w, n + "", t, e, b) : void 0, j = void 0 === A;
                if (j) {
                    var E = s(w), k = !E && l(w), I = !E && !k && v(w);
                    A = w, E || k || I ? s(_) ? A = _ : f(_) ? A = a(_) : k ? (j = !1, A = i(w, !0)) : I ? (j = !1, 
                    A = o(w, !0)) : A = [] : h(w) || c(w) ? (A = _, c(_) ? A = y(_) : (!d(_) || g && p(_)) && (A = u(w))) : j = !1;
                }
                j && (// Recursively merge objects and arrays (susceptible to call stack limits).
                b.set(w, A), m(A, w, g, x, b), b.delete(w)), r(t, n, A);
            }
        };
    }, /* 256 */
    /***/
    function(t, e, n) {
        var r = n(123);
        t.exports = /**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
        function(t) {
            return function(e) {
                return r(e, t);
            };
        };
    }, /* 257 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
        function(t) {
            return function(e) {
                return null == t ? void 0 : t[e];
            };
        };
    }, /* 258 */
    /***/
    function(t, e, n) {
        var r = n(344), i = n(137), o = n(60), a = i ? function(t, e) {
            return i(t, "toString", {
                configurable: !0,
                enumerable: !1,
                value: r(e),
                writable: !0
            });
        } : o;
        t.exports = a;
    }, /* 259 */
    /***/
    function(t, e, n) {
        var r = n(50);
        t.exports = /**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the key-value pairs.
 */
        function(t, e) {
            return r(e, function(e) {
                return [ e, t[e] ];
            });
        };
    }, /* 260 */
    /***/
    function(t, e, n) {
        /**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
        function r(t) {
            // Exit early for strings to avoid a performance hit in some environments.
            if ("string" == typeof t) return t;
            if (a(t)) // Recursively convert values (susceptible to call stack limits).
            return o(t, r) + "";
            if (u(t)) return f ? f.call(t) : "";
            var e = t + "";
            return "0" == e && 1 / t == -c ? "-0" : e;
        }
        var i = n(19), o = n(50), a = n(0), u = n(37), c = 1 / 0, s = i ? i.prototype : void 0, f = s ? s.toString : void 0;
        t.exports = r;
    }, /* 261 */
    /***/
    function(t, e) {
        t.exports = /**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
        function(t) {
            return function(e) {
                return t(e);
            };
        };
    }, /* 262 */
    /***/
    function(t, e) {
        t.exports = /**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
        function(t, e) {
            return t.has(e);
        };
    }, /* 263 */
    /***/
    function(t, e, n) {
        var r = n(128);
        t.exports = /**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
        function(t, e, n) {
            var i = t.length;
            return n = void 0 === n ? i : n, !e && n >= i ? t : r(t, e, n);
        };
    }, /* 264 */
    /***/
    function(t, e, n) {
        var r = n(87);
        t.exports = /**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
        function(t, e) {
            var n = e ? r(t.buffer) : t.buffer;
            return new t.constructor(n, t.byteOffset, t.byteLength);
        };
    }, /* 265 */
    /***/
    function(t, e, n) {
        var r = n(234), i = n(79), o = n(93), a = 1;
        t.exports = /**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
        function(t, e, n) {
            var u = e ? n(o(t), a) : o(t);
            return i(u, r, new t.constructor());
        };
    }, /* 266 */
    /***/
    function(t, e) {
        /** Used to match `RegExp` flags from their coerced string values. */
        var n = /\w*$/;
        t.exports = /**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
        function(t) {
            var e = new t.constructor(t.source, n.exec(t));
            return e.lastIndex = t.lastIndex, e;
        };
    }, /* 267 */
    /***/
    function(t, e, n) {
        var r = n(235), i = n(79), o = n(154), a = 1;
        t.exports = /**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
        function(t, e, n) {
            var u = e ? n(o(t), a) : o(t);
            return i(u, r, new t.constructor());
        };
    }, /* 268 */
    /***/
    function(t, e, n) {
        var r = n(19), i = r ? r.prototype : void 0, o = i ? i.valueOf : void 0;
        t.exports = /**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
        function(t) {
            return o ? Object(o.call(t)) : {};
        };
    }, /* 269 */
    /***/
    function(t, e, n) {
        var r = n(15), i = n(91);
        t.exports = /**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
        function(t, e) {
            return r(t, i(t), e);
        };
    }, /* 270 */
    /***/
    function(t, e, n) {
        var r = n(15), i = n(144);
        t.exports = /**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
        function(t, e) {
            return r(t, i(t), e);
        };
    }, /* 271 */
    /***/
    function(t, e, n) {
        var r = n(3)["__core-js_shared__"];
        t.exports = r;
    }, /* 272 */
    /***/
    function(t, e) {
        t.exports = /**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
        function(t, e) {
            for (var n = t.length, r = 0; n--; ) t[n] === e && ++r;
            return r;
        };
    }, /* 273 */
    /***/
    function(t, e) {
        t.exports = /**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
        function(t) {
            return function(e, n, r) {
                for (var i = -1, o = Object(e), a = r(e), u = a.length; u--; ) {
                    var c = a[t ? u : ++i];
                    if (!1 === n(o[c], c, o)) break;
                }
                return e;
            };
        };
    }, /* 274 */
    /***/
    function(t, e, n) {
        var r = n(53), i = n(3), o = 1;
        t.exports = /**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
        function(t, e, n) {
            function a() {
                return (this && this !== i && this instanceof a ? c : t).apply(u ? n : this, arguments);
            }
            var u = e & o, c = r(t);
            return a;
        };
    }, /* 275 */
    /***/
    function(t, e, n) {
        var r = n(263), i = n(145), o = n(331), a = n(26);
        t.exports = /**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
        function(t) {
            return function(e) {
                e = a(e);
                var n = i(e) ? o(e) : void 0, u = n ? n[0] : e.charAt(0), c = n ? r(n, 1).join("") : e.slice(1);
                return u[t]() + c;
            };
        };
    }, /* 276 */
    /***/
    function(t, e, n) {
        var r = n(79), i = n(346), o = n(379), a = RegExp("['’]", "g");
        t.exports = /**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
        function(t) {
            return function(e) {
                return r(o(i(e).replace(a, "")), t, "");
            };
        };
    }, /* 277 */
    /***/
    function(t, e, n) {
        var r = n(48), i = n(53), o = n(135), a = n(136), u = n(143), c = n(94), s = n(3);
        t.exports = /**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
        function(t, e, n) {
            function f() {
                for (var i = arguments.length, p = Array(i), d = i, h = u(f); d--; ) p[d] = arguments[d];
                var v = i < 3 && p[0] !== h && p[i - 1] !== h ? [] : c(p, h);
                return (i -= v.length) < n ? a(t, e, o, f.placeholder, void 0, p, v, void 0, void 0, n - i) : r(this && this !== s && this instanceof f ? l : t, this, p);
            }
            var l = i(t);
            return f;
        };
    }, /* 278 */
    /***/
    function(t, e, n) {
        var r = n(76), i = n(139), o = n(90), a = n(142), u = n(0), c = n(147), s = "Expected a function", f = 8, l = 32, p = 128, d = 256;
        t.exports = /**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
        function(t) {
            return i(function(e) {
                var n = e.length, i = n, h = r.prototype.thru;
                for (t && e.reverse(); i--; ) {
                    var v = e[i];
                    if ("function" != typeof v) throw new TypeError(s);
                    if (h && !y && "wrapper" == a(v)) var y = new r([], !0);
                }
                for (i = y ? i : n; ++i < n; ) {
                    v = e[i];
                    var g = a(v), m = "wrapper" == g ? o(v) : void 0;
                    y = m && c(m[0]) && m[1] == (p | f | l | d) && !m[4].length && 1 == m[9] ? y[a(m[0])].apply(y, m[3]) : 1 == v.length && c(v) ? y[g]() : y.thru(v);
                }
                return function() {
                    var t = arguments, r = t[0];
                    if (y && 1 == t.length && u(r)) return y.plant(r).value();
                    for (var i = 0, o = n ? e[i].apply(this, t) : r; ++i < n; ) o = e[i].call(this, o);
                    return o;
                };
            });
        };
    }, /* 279 */
    /***/
    function(t, e, n) {
        var r = n(48), i = n(53), o = n(3), a = 1;
        t.exports = /**
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
        function(t, e, n, u) {
            function c() {
                for (var e = -1, i = arguments.length, a = -1, l = u.length, p = Array(l + i), d = this && this !== o && this instanceof c ? f : t; ++a < l; ) p[a] = u[a];
                for (;i--; ) p[a++] = arguments[++e];
                return r(d, s ? n : this, p);
            }
            var s = e & a, f = i(t);
            return c;
        };
    }, /* 280 */
    /***/
    function(t, e, n) {
        var r = n(259), i = n(56), o = n(93), a = n(324), u = "[object Map]", c = "[object Set]";
        t.exports = /**
 * Creates a `_.toPairs` or `_.toPairsIn` function.
 *
 * @private
 * @param {Function} keysFunc The function to get the keys of a given object.
 * @returns {Function} Returns the new pairs function.
 */
        function(t) {
            return function(e) {
                var n = i(e);
                return n == u ? o(e) : n == c ? a(e) : r(e, t(e));
            };
        };
    }, /* 281 */
    /***/
    function(t, e, n) {
        var r = n(22), i = Object.prototype, o = i.hasOwnProperty;
        t.exports = /**
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
        function(t, e, n, a) {
            return void 0 === t || r(t, i[n]) && !o.call(a, n) ? e : t;
        };
    }, /* 282 */
    /***/
    function(t, e, n) {
        var r = n(257)({
            // Latin-1 Supplement block.
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ã": "A",
            "Ä": "A",
            "Å": "A",
            "à": "a",
            "á": "a",
            "â": "a",
            "ã": "a",
            "ä": "a",
            "å": "a",
            "Ç": "C",
            "ç": "c",
            "Ð": "D",
            "ð": "d",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ë": "E",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ë": "e",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ï": "I",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ï": "i",
            "Ñ": "N",
            "ñ": "n",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Õ": "O",
            "Ö": "O",
            "Ø": "O",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "õ": "o",
            "ö": "o",
            "ø": "o",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ü": "U",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ü": "u",
            "Ý": "Y",
            "ý": "y",
            "ÿ": "y",
            "Æ": "Ae",
            "æ": "ae",
            "Þ": "Th",
            "þ": "th",
            "ß": "ss",
            // Latin Extended-A block.
            "Ā": "A",
            "Ă": "A",
            "Ą": "A",
            "ā": "a",
            "ă": "a",
            "ą": "a",
            "Ć": "C",
            "Ĉ": "C",
            "Ċ": "C",
            "Č": "C",
            "ć": "c",
            "ĉ": "c",
            "ċ": "c",
            "č": "c",
            "Ď": "D",
            "Đ": "D",
            "ď": "d",
            "đ": "d",
            "Ē": "E",
            "Ĕ": "E",
            "Ė": "E",
            "Ę": "E",
            "Ě": "E",
            "ē": "e",
            "ĕ": "e",
            "ė": "e",
            "ę": "e",
            "ě": "e",
            "Ĝ": "G",
            "Ğ": "G",
            "Ġ": "G",
            "Ģ": "G",
            "ĝ": "g",
            "ğ": "g",
            "ġ": "g",
            "ģ": "g",
            "Ĥ": "H",
            "Ħ": "H",
            "ĥ": "h",
            "ħ": "h",
            "Ĩ": "I",
            "Ī": "I",
            "Ĭ": "I",
            "Į": "I",
            "İ": "I",
            "ĩ": "i",
            "ī": "i",
            "ĭ": "i",
            "į": "i",
            "ı": "i",
            "Ĵ": "J",
            "ĵ": "j",
            "Ķ": "K",
            "ķ": "k",
            "ĸ": "k",
            "Ĺ": "L",
            "Ļ": "L",
            "Ľ": "L",
            "Ŀ": "L",
            "Ł": "L",
            "ĺ": "l",
            "ļ": "l",
            "ľ": "l",
            "ŀ": "l",
            "ł": "l",
            "Ń": "N",
            "Ņ": "N",
            "Ň": "N",
            "Ŋ": "N",
            "ń": "n",
            "ņ": "n",
            "ň": "n",
            "ŋ": "n",
            "Ō": "O",
            "Ŏ": "O",
            "Ő": "O",
            "ō": "o",
            "ŏ": "o",
            "ő": "o",
            "Ŕ": "R",
            "Ŗ": "R",
            "Ř": "R",
            "ŕ": "r",
            "ŗ": "r",
            "ř": "r",
            "Ś": "S",
            "Ŝ": "S",
            "Ş": "S",
            "Š": "S",
            "ś": "s",
            "ŝ": "s",
            "ş": "s",
            "š": "s",
            "Ţ": "T",
            "Ť": "T",
            "Ŧ": "T",
            "ţ": "t",
            "ť": "t",
            "ŧ": "t",
            "Ũ": "U",
            "Ū": "U",
            "Ŭ": "U",
            "Ů": "U",
            "Ű": "U",
            "Ų": "U",
            "ũ": "u",
            "ū": "u",
            "ŭ": "u",
            "ů": "u",
            "ű": "u",
            "ų": "u",
            "Ŵ": "W",
            "ŵ": "w",
            "Ŷ": "Y",
            "ŷ": "y",
            "Ÿ": "Y",
            "Ź": "Z",
            "Ż": "Z",
            "Ž": "Z",
            "ź": "z",
            "ż": "z",
            "ž": "z",
            "Ĳ": "IJ",
            "ĳ": "ij",
            "Œ": "Oe",
            "œ": "oe",
            "ŉ": "'n",
            "ſ": "s"
        });
        t.exports = r;
    }, /* 283 */
    /***/
    function(t, e, n) {
        var r = n(19), i = n(115), o = n(22), a = n(138), u = n(93), c = n(154), s = 1, f = 2, l = "[object Boolean]", p = "[object Date]", d = "[object Error]", h = "[object Map]", v = "[object Number]", y = "[object RegExp]", g = "[object Set]", m = "[object String]", x = "[object Symbol]", b = "[object ArrayBuffer]", _ = "[object DataView]", w = r ? r.prototype : void 0, O = w ? w.valueOf : void 0;
        t.exports = /**
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
        function(t, e, n, r, w, A, j) {
            switch (n) {
              case _:
                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                t = t.buffer, e = e.buffer;

              case b:
                return !(t.byteLength != e.byteLength || !A(new i(t), new i(e)));

              case l:
              case p:
              case v:
                // Coerce booleans to `1` or `0` and dates to milliseconds.
                // Invalid dates are coerced to `NaN`.
                return o(+t, +e);

              case d:
                return t.name == e.name && t.message == e.message;

              case y:
              case m:
                // Coerce regexes to strings and treat strings, primitives and objects,
                // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
                // for more details.
                return t == e + "";

              case h:
                var E = u;

              case g:
                var k = r & s;
                if (E || (E = c), t.size != e.size && !k) return !1;
                // Assume cyclic values are equal.
                var I = j.get(t);
                if (I) return I == e;
                r |= f, // Recursively compare objects (susceptible to call stack limits).
                j.set(t, e);
                var R = a(E(t), E(e), r, w, A, j);
                return j.delete(t), R;

              case x:
                if (O) return O.call(t) == O.call(e);
            }
            return !1;
        };
    }, /* 284 */
    /***/
    function(t, e, n) {
        var r = n(141), i = 1, o = Object.prototype.hasOwnProperty;
        t.exports = /**
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
        function(t, e, n, a, u, c) {
            var s = n & i, f = r(t), l = f.length;
            if (l != r(e).length && !s) return !1;
            for (var p = l; p--; ) {
                var d = f[p];
                if (!(s ? d in e : o.call(e, d))) return !1;
            }
            // Assume cyclic values are equal.
            var h = c.get(t);
            if (h && c.get(e)) return h == e;
            var v = !0;
            c.set(t, e), c.set(e, t);
            for (var y = s; ++p < l; ) {
                var g = t[d = f[p]], m = e[d];
                if (a) var x = s ? a(m, g, d, e, t, c) : a(g, m, d, t, e, c);
                // Recursively compare objects (susceptible to call stack limits).
                if (!(void 0 === x ? g === m || u(g, m, n, a, c) : x)) {
                    v = !1;
                    break;
                }
                y || (y = "constructor" == d);
            }
            if (v && !y) {
                var b = t.constructor, _ = e.constructor;
                // Non `Object` object instances with different constructors are not equal.
                b != _ && "constructor" in t && "constructor" in e && !("function" == typeof b && b instanceof b && "function" == typeof _ && _ instanceof _) && (v = !1);
            }
            return c.delete(t), c.delete(e), v;
        };
    }, /* 285 */
    /***/
    function(t, e, n) {
        var r = n(124), i = n(144), o = n(39);
        t.exports = /**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
        function(t) {
            return r(t, o, i);
        };
    }, /* 286 */
    /***/
    function(t, e, n) {
        var r = n(148), i = n(11);
        t.exports = /**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
        function(t) {
            for (var e = i(t), n = e.length; n--; ) {
                var o = e[n], a = t[o];
                e[n] = [ o, a, r(a) ];
            }
            return e;
        };
    }, /* 287 */
    /***/
    function(t, e, n) {
        var r = n(19), i = Object.prototype, o = i.hasOwnProperty, a = i.toString, u = r ? r.toStringTag : void 0;
        t.exports = /**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
        function(t) {
            var e = o.call(t, u), n = t[u];
            try {
                t[u] = void 0;
                var r = !0;
            } catch (t) {}
            var i = a.call(t);
            return r && (e ? t[u] = n : delete t[u]), i;
        };
    }, /* 288 */
    /***/
    function(t, e) {
        t.exports = /**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
        function(t, e) {
            return null == t ? void 0 : t[e];
        };
    }, /* 289 */
    /***/
    function(t, e) {
        /** Used to match wrap detail comments. */
        var n = /\{\n\/\* \[wrapped with (.+)\] \*/, r = /,? & /;
        t.exports = /**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
        function(t) {
            var e = t.match(n);
            return e ? e[1].split(r) : [];
        };
    }, /* 290 */
    /***/
    function(t, e, n) {
        var r = n(130), i = n(36), o = n(0), a = n(57), u = n(97), c = n(35);
        t.exports = /**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
        function(t, e, n) {
            for (var s = -1, f = (e = r(e, t)).length, l = !1; ++s < f; ) {
                var p = c(e[s]);
                if (!(l = null != t && n(t, p))) break;
                t = t[p];
            }
            return l || ++s != f ? l : !!(f = null == t ? 0 : t.length) && u(f) && a(p, f) && (o(t) || i(t));
        };
    }, /* 291 */
    /***/
    function(t, e) {
        /** Used to detect strings that need a more robust regexp to match words. */
        var n = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        t.exports = /**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
        function(t) {
            return n.test(t);
        };
    }, /* 292 */
    /***/
    function(t, e, n) {
        var r = n(58);
        t.exports = /**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
        function() {
            this.__data__ = r ? r(null) : {}, this.size = 0;
        };
    }, /* 293 */
    /***/
    function(t, e) {
        t.exports = /**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
        function(t) {
            var e = this.has(t) && delete this.__data__[t];
            return this.size -= e ? 1 : 0, e;
        };
    }, /* 294 */
    /***/
    function(t, e, n) {
        var r = n(58), i = "__lodash_hash_undefined__", o = Object.prototype.hasOwnProperty;
        t.exports = /**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
        function(t) {
            var e = this.__data__;
            if (r) {
                var n = e[t];
                return n === i ? void 0 : n;
            }
            return o.call(e, t) ? e[t] : void 0;
        };
    }, /* 295 */
    /***/
    function(t, e, n) {
        var r = n(58), i = Object.prototype.hasOwnProperty;
        t.exports = /**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
        function(t) {
            var e = this.__data__;
            return r ? void 0 !== e[t] : i.call(e, t);
        };
    }, /* 296 */
    /***/
    function(t, e, n) {
        var r = n(58), i = "__lodash_hash_undefined__";
        t.exports = /**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
        function(t, e) {
            var n = this.__data__;
            return this.size += this.has(t) ? 0 : 1, n[t] = r && void 0 === e ? i : e, this;
        };
    }, /* 297 */
    /***/
    function(t, e) {
        /** Used for built-in method references. */
        var n = Object.prototype.hasOwnProperty;
        t.exports = /**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
        function(t) {
            var e = t.length, r = t.constructor(e);
            // Add properties assigned by `RegExp#exec`.
            return e && "string" == typeof t[0] && n.call(t, "index") && (r.index = t.index, 
            r.input = t.input), r;
        };
    }, /* 298 */
    /***/
    function(t, e, n) {
        var r = n(87), i = n(264), o = n(265), a = n(266), u = n(267), c = n(268), s = n(132), f = "[object Boolean]", l = "[object Date]", p = "[object Map]", d = "[object Number]", h = "[object RegExp]", v = "[object Set]", y = "[object String]", g = "[object Symbol]", m = "[object ArrayBuffer]", x = "[object DataView]", b = "[object Float32Array]", _ = "[object Float64Array]", w = "[object Int8Array]", O = "[object Int16Array]", A = "[object Int32Array]", j = "[object Uint8Array]", E = "[object Uint8ClampedArray]", k = "[object Uint16Array]", I = "[object Uint32Array]";
        t.exports = /**
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
        function(t, e, n, R) {
            var C = t.constructor;
            switch (e) {
              case m:
                return r(t);

              case f:
              case l:
                return new C(+t);

              case x:
                return i(t, R);

              case b:
              case _:
              case w:
              case O:
              case A:
              case j:
              case E:
              case k:
              case I:
                return s(t, R);

              case p:
                return o(t, R, n);

              case d:
              case y:
                return new C(t);

              case h:
                return a(t);

              case v:
                return u(t, R, n);

              case g:
                return c(t);
            }
        };
    }, /* 299 */
    /***/
    function(t, e) {
        /** Used to match wrap detail comments. */
        var n = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
        t.exports = /**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
        function(t, e) {
            var r = e.length;
            if (!r) return t;
            var i = r - 1;
            return e[i] = (r > 1 ? "& " : "") + e[i], e = e.join(r > 2 ? ", " : " "), t.replace(n, "{\n/* [wrapped with " + e + "] */\n");
        };
    }, /* 300 */
    /***/
    function(t, e, n) {
        var r = n(19), i = n(36), o = n(0), a = r ? r.isConcatSpreadable : void 0;
        t.exports = /**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
        function(t) {
            return o(t) || i(t) || !!(a && t && t[a]);
        };
    }, /* 301 */
    /***/
    function(t, e, n) {
        var r = n(22), i = n(23), o = n(57), a = n(4);
        t.exports = /**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
        function(t, e, n) {
            if (!a(n)) return !1;
            var u = typeof e;
            return !!("number" == u ? i(n) && o(e, n.length) : "string" == u && e in n) && r(n[e], t);
        };
    }, /* 302 */
    /***/
    function(t, e) {
        t.exports = /**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
        function(t) {
            var e = typeof t;
            return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t;
        };
    }, /* 303 */
    /***/
    function(t, e, n) {
        var r = n(271), i = function() {
            var t = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
            return t ? "Symbol(src)_1." + t : "";
        }();
        t.exports = /**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
        function(t) {
            return !!i && i in t;
        };
    }, /* 304 */
    /***/
    function(t, e) {
        t.exports = /**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
        function() {
            this.__data__ = [], this.size = 0;
        };
    }, /* 305 */
    /***/
    function(t, e, n) {
        var r = n(52), i = Array.prototype.splice;
        t.exports = /**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
        function(t) {
            var e = this.__data__, n = r(e, t);
            return !(n < 0 || (n == e.length - 1 ? e.pop() : i.call(e, n, 1), --this.size, 0));
        };
    }, /* 306 */
    /***/
    function(t, e, n) {
        var r = n(52);
        t.exports = /**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
        function(t) {
            var e = this.__data__, n = r(e, t);
            return n < 0 ? void 0 : e[n][1];
        };
    }, /* 307 */
    /***/
    function(t, e, n) {
        var r = n(52);
        t.exports = /**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
        function(t) {
            return r(this.__data__, t) > -1;
        };
    }, /* 308 */
    /***/
    function(t, e, n) {
        var r = n(52);
        t.exports = /**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
        function(t, e) {
            var n = this.__data__, i = r(n, t);
            return i < 0 ? (++this.size, n.push([ t, e ])) : n[i][1] = e, this;
        };
    }, /* 309 */
    /***/
    function(t, e, n) {
        var r = n(230), i = n(46), o = n(77);
        t.exports = /**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
        function() {
            this.size = 0, this.__data__ = {
                hash: new r(),
                map: new (o || i)(),
                string: new r()
            };
        };
    }, /* 310 */
    /***/
    function(t, e, n) {
        var r = n(54);
        t.exports = /**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
        function(t) {
            var e = r(this, t).delete(t);
            return this.size -= e ? 1 : 0, e;
        };
    }, /* 311 */
    /***/
    function(t, e, n) {
        var r = n(54);
        t.exports = /**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
        function(t) {
            return r(this, t).get(t);
        };
    }, /* 312 */
    /***/
    function(t, e, n) {
        var r = n(54);
        t.exports = /**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
        function(t) {
            return r(this, t).has(t);
        };
    }, /* 313 */
    /***/
    function(t, e, n) {
        var r = n(54);
        t.exports = /**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
        function(t, e) {
            var n = r(this, t), i = n.size;
            return n.set(t, e), this.size += n.size == i ? 0 : 1, this;
        };
    }, /* 314 */
    /***/
    function(t, e, n) {
        var r = n(364), i = 500;
        t.exports = /**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
        function(t) {
            var e = r(t, function(t) {
                return n.size === i && n.clear(), t;
            }), n = e.cache;
            return e;
        };
    }, /* 315 */
    /***/
    function(t, e, n) {
        var r = n(133), i = n(134), o = n(94), a = "__lodash_placeholder__", u = 1, c = 2, s = 4, f = 8, l = 128, p = 256, d = Math.min;
        t.exports = /**
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
        function(t, e) {
            var n = t[1], h = e[1], v = n | h, y = v < (u | c | l), g = h == l && n == f || h == l && n == p && t[7].length <= e[8] || h == (l | p) && e[7].length <= e[8] && n == f;
            // Exit early if metadata can't be merged.
            if (!y && !g) return t;
            // Use source `thisArg` if available.
            h & u && (t[2] = e[2], // Set when currying a bound function.
            v |= n & u ? 0 : s);
            // Compose partial arguments.
            var m = e[3];
            if (m) {
                var x = t[3];
                t[3] = x ? r(x, m, e[4]) : m, t[4] = x ? o(t[3], a) : e[4];
            }
            // Compose partial right arguments.
            // Use source `argPos` if available.
            // Use source `ary` if it's smaller.
            // Use source `arity` if one is not provided.
            // Use source `func` and merge bitmasks.
            return (m = e[5]) && (x = t[5], t[5] = x ? i(x, m, e[6]) : m, t[6] = x ? o(t[5], a) : e[6]), 
            (m = e[7]) && (t[7] = m), h & l && (t[8] = null == t[8] ? e[8] : d(t[8], e[8])), 
            null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = v, t;
        };
    }, /* 316 */
    /***/
    function(t, e, n) {
        var r = n(151)(Object.keys, Object);
        t.exports = r;
    }, /* 317 */
    /***/
    function(t, e) {
        t.exports = /**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
        function(t) {
            var e = [];
            if (null != t) for (var n in Object(t)) e.push(n);
            return e;
        };
    }, /* 318 */
    /***/
    function(t, e, n) {
        /* WEBPACK VAR INJECTION */
        (function(t) {
            var r = n(140), i = "object" == typeof e && e && !e.nodeType && e, o = i && "object" == typeof t && t && !t.nodeType && t, a = o && o.exports === i && r.process, u = function() {
                try {
                    return a && a.binding && a.binding("util");
                } catch (t) {}
            }();
            t.exports = u;
        }).call(e, n(98)(t));
    }, /* 319 */
    /***/
    function(t, e) {
        /** Used for built-in method references. */
        var n = Object.prototype.toString;
        t.exports = /**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
        function(t) {
            return n.call(t);
        };
    }, /* 320 */
    /***/
    function(t, e) {
        t.exports = {};
    }, /* 321 */
    /***/
    function(t, e, n) {
        var r = n(21), i = n(57), o = Math.min;
        t.exports = /**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
        function(t, e) {
            for (var n = t.length, a = o(e.length, n), u = r(t); a--; ) {
                var c = e[a];
                t[a] = i(c, n) ? u[c] : void 0;
            }
            return t;
        };
    }, /* 322 */
    /***/
    function(t, e) {
        /** Used to stand-in for `undefined` hash values. */
        var n = "__lodash_hash_undefined__";
        t.exports = /**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
        function(t) {
            return this.__data__.set(t, n), this;
        };
    }, /* 323 */
    /***/
    function(t, e) {
        t.exports = /**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
        function(t) {
            return this.__data__.has(t);
        };
    }, /* 324 */
    /***/
    function(t, e) {
        t.exports = /**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
        function(t) {
            var e = -1, n = Array(t.size);
            return t.forEach(function(t) {
                n[++e] = [ t, t ];
            }), n;
        };
    }, /* 325 */
    /***/
    function(t, e, n) {
        var r = n(46);
        t.exports = /**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
        function() {
            this.__data__ = new r(), this.size = 0;
        };
    }, /* 326 */
    /***/
    function(t, e) {
        t.exports = /**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
        function(t) {
            var e = this.__data__, n = e.delete(t);
            return this.size = e.size, n;
        };
    }, /* 327 */
    /***/
    function(t, e) {
        t.exports = /**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
        function(t) {
            return this.__data__.get(t);
        };
    }, /* 328 */
    /***/
    function(t, e) {
        t.exports = /**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
        function(t) {
            return this.__data__.has(t);
        };
    }, /* 329 */
    /***/
    function(t, e, n) {
        var r = n(46), i = n(77), o = n(78), a = 200;
        t.exports = /**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
        function(t, e) {
            var n = this.__data__;
            if (n instanceof r) {
                var u = n.__data__;
                if (!i || u.length < a - 1) return u.push([ t, e ]), this.size = ++n.size, this;
                n = this.__data__ = new o(u);
            }
            return n.set(t, e), this.size = n.size, this;
        };
    }, /* 330 */
    /***/
    function(t, e) {
        t.exports = /**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
        function(t, e, n) {
            for (var r = n - 1, i = t.length; ++r < i; ) if (t[r] === e) return r;
            return -1;
        };
    }, /* 331 */
    /***/
    function(t, e, n) {
        var r = n(238), i = n(145), o = n(332);
        t.exports = /**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
        function(t) {
            return i(t) ? o(t) : r(t);
        };
    }, /* 332 */
    /***/
    function(t, e) {
        /** Used to compose unicode character classes. */
        var n = "[\\ud800-\\udfff]", r = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", i = "\\ud83c[\\udffb-\\udfff]", o = "[^\\ud800-\\udfff]", a = "(?:\\ud83c[\\udde6-\\uddff]){2}", u = "[\\ud800-\\udbff][\\udc00-\\udfff]", c = "(?:" + r + "|" + i + ")" + "?", s = "[\\ufe0e\\ufe0f]?", f = s + c + ("(?:\\u200d(?:" + [ o, a, u ].join("|") + ")" + s + c + ")*"), l = "(?:" + [ o + r + "?", r, a, u, n ].join("|") + ")", p = RegExp(i + "(?=" + i + ")|" + l + f, "g");
        t.exports = /**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
        function(t) {
            return t.match(p) || [];
        };
    }, /* 333 */
    /***/
    function(t, e) {
        /** Used to compose unicode character classes. */
        var n = "a-z\\xdf-\\xf6\\xf8-\\xff", r = "A-Z\\xc0-\\xd6\\xd8-\\xde", i = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", o = "[" + i + "]", a = "\\d+", u = "[\\u2700-\\u27bf]", c = "[" + n + "]", s = "[^\\ud800-\\udfff" + i + a + "\\u2700-\\u27bf" + n + r + "]", f = "(?:\\ud83c[\\udde6-\\uddff]){2}", l = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "[" + r + "]", d = "(?:" + c + "|" + s + ")", h = "(?:" + p + "|" + s + ")", v = "(?:['’](?:d|ll|m|re|s|t|ve))?", y = "(?:['’](?:D|LL|M|RE|S|T|VE))?", g = "(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?", m = "[\\ufe0e\\ufe0f]?", x = m + g + ("(?:\\u200d(?:" + [ "[^\\ud800-\\udfff]", f, l ].join("|") + ")" + m + g + ")*"), b = "(?:" + [ u, f, l ].join("|") + ")" + x, _ = RegExp([ p + "?" + c + "+" + v + "(?=" + [ o, p, "$" ].join("|") + ")", h + "+" + y + "(?=" + [ o, p + d, "$" ].join("|") + ")", p + "?" + d + "+" + v, p + "+" + y, "\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)", "\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)", a, b ].join("|"), "g");
        t.exports = /**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
        function(t) {
            return t.match(_) || [];
        };
    }, /* 334 */
    /***/
    function(t, e, n) {
        var r = n(49), i = n(236), o = [ [ "ary", 128 ], [ "bind", 1 ], [ "bindKey", 2 ], [ "curry", 8 ], [ "curryRight", 16 ], [ "flip", 512 ], [ "partial", 32 ], [ "partialRight", 64 ], [ "rearg", 256 ] ];
        t.exports = /**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
        function(t, e) {
            return r(o, function(n) {
                var r = "_." + n[0];
                e & n[1] && !i(t, r) && t.push(r);
            }), t.sort();
        };
    }, /* 335 */
    /***/
    function(t, e, n) {
        var r = n(75), i = n(76), o = n(21);
        t.exports = /**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
        function(t) {
            if (t instanceof r) return t.clone();
            var e = new i(t.__wrapped__, t.__chain__);
            return e.__actions__ = o(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, 
            e;
        };
    }, /* 336 */
    /***/
    function(t, e, n) {
        var r = n(89), i = 128;
        t.exports = /**
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
        function(t, e, n) {
            return e = n ? void 0 : e, e = t && null == e ? t.length : e, r(t, i, void 0, void 0, void 0, void 0, e);
        };
    }, /* 337 */
    /***/
    function(t, e, n) {
        var r = n(80), i = n(15), o = n(88), a = n(23), u = n(34), c = n(11), s = Object.prototype.hasOwnProperty, f = o(function(t, e) {
            if (u(e) || a(e)) i(e, c(e), t); else for (var n in e) s.call(e, n) && r(t, n, e[n]);
        });
        t.exports = f;
    }, /* 338 */
    /***/
    function(t, e, n) {
        var r = n(15), i = n(88), o = n(39), a = i(function(t, e, n, i) {
            r(e, o(e), t, i);
        });
        t.exports = a;
    }, /* 339 */
    /***/
    function(t, e, n) {
        var r = n(340), i = n(276)(function(t, e, n) {
            return e = e.toLowerCase(), t + (n ? r(e) : e);
        });
        t.exports = i;
    }, /* 340 */
    /***/
    function(t, e, n) {
        var r = n(26), i = n(378);
        t.exports = /**
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
        function(t) {
            return i(r(t).toLowerCase());
        };
    }, /* 341 */
    /***/
    function(t, e, n) {
        var r = n(82), i = 4;
        t.exports = /**
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
        function(t) {
            return r(t, i);
        };
    }, /* 342 */
    /***/
    function(t, e, n) {
        var r = n(82), i = 1, o = 4;
        t.exports = /**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
        function(t) {
            return r(t, i | o);
        };
    }, /* 343 */
    /***/
    function(t, e, n) {
        var r = n(51), i = n(121), o = n(21), a = n(0);
        t.exports = /**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 * @example
 *
 * var array = [1];
 * var other = _.concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 */
        function() {
            var t = arguments.length;
            if (!t) return [];
            for (var e = Array(t - 1), n = arguments[0], u = t; u--; ) e[u - 1] = arguments[u];
            return r(a(n) ? o(n) : [ n ], i(e, 1));
        };
    }, /* 344 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function(t) {
            return function() {
                return t;
            };
        };
    }, /* 345 */
    /***/
    function(t, e, n) {
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
        function r(t, e, n) {
            var a = i(t, o, void 0, void 0, void 0, void 0, void 0, e = n ? void 0 : e);
            return a.placeholder = r.placeholder, a;
        }
        var i = n(89), o = 8;
        // Assign default placeholders.
        r.placeholder = {}, t.exports = r;
    }, /* 346 */
    /***/
    function(t, e, n) {
        var r = n(282), i = n(26), o = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, a = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g");
        t.exports = /**
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
        function(t) {
            return (t = i(t)) && t.replace(o, r).replace(a, "");
        };
    }, /* 347 */
    /***/
    function(t, e, n) {
        var r = n(48), i = n(338), o = n(86), a = n(281), u = o(function(t) {
            return t.push(void 0, a), r(i, void 0, t);
        });
        t.exports = u;
    }, /* 348 */
    /***/
    function(t, e, n) {
        t.exports = n(373);
    }, /* 349 */
    /***/
    function(t, e, n) {
        var r = n(121);
        t.exports = /**
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
        function(t) {
            return (null == t ? 0 : t.length) ? r(t, 1) : [];
        };
    }, /* 350 */
    /***/
    function(t, e, n) {
        var r = n(278)();
        t.exports = r;
    }, /* 351 */
    /***/
    function(t, e, n) {
        /**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
        function r(t, e) {
            return 2 == e ? function(e, n) {
                return t(e, n);
            } : function(e) {
                return t(e);
            };
        }
        /**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
        function i(t) {
            for (var e = t ? t.length : 0, n = Array(e); e--; ) n[e] = t[e];
            return n;
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
        function o(t, e) {
            return function() {
                var n = arguments.length;
                if (n) {
                    for (var r = Array(n); n--; ) r[n] = arguments[n];
                    var i = r[0] = e.apply(void 0, r);
                    return t.apply(void 0, r), i;
                }
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
        function a(t, e, n, f) {
            /*--------------------------------------------------------------------------*/
            /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
            function l(t, e) {
                if (_.cap) {
                    var n = u.iterateeRearg[t];
                    if (n) /**
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
                    return function(t, e) {
                        return y(t, function(t) {
                            var n = e.length;
                            /**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
                            return function(t, e) {
                                return 2 == e ? function(e, n) {
                                    return t.apply(void 0, arguments);
                                } : function(e) {
                                    return t.apply(void 0, arguments);
                                };
                            }(T(r(t, n), e), n);
                        });
                    }(e, n);
                    var i = !x && u.iterateeAry[t];
                    if (i) /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
                    return function(t, e) {
                        return y(t, function(t) {
                            return "function" == typeof t ? r(t, e) : t;
                        });
                    }(e, i);
                }
                return e;
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
            function p(t, e, n) {
                if (_.fixed && (O || !u.skipFixed[t])) {
                    var r = u.methodSpread[t], i = r && r.start;
                    /**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
                    return void 0 === i ? I(e, n) : function(t, e) {
                        return function() {
                            for (var n = arguments.length, r = n - 1, i = Array(n); n--; ) i[n] = arguments[n];
                            var o = i[e], a = i.slice(0, e);
                            return o && s.apply(a, o), e != r && s.apply(a, i.slice(e + 1)), t.apply(this, a);
                        };
                    }(e, i);
                }
                return e;
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
            function d(t, e, n) {
                return _.rearg && n > 1 && (A || !u.skipRearg[t]) ? T(e, u.methodRearg[t] || u.aryRearg[n]) : e;
            }
            /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
            function h(t, e) {
                for (var n = -1, r = (e = D(e)).length, i = r - 1, o = C(Object(t)), a = o; null != a && ++n < r; ) {
                    var u = e[n], c = a[u];
                    null != c && (a[e[n]] = C(n == i ? c : Object(c))), a = a[u];
                }
                return o;
            }
            /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
            function v(t, e) {
                var n = u.aliasToReal[t] || t, r = u.remap[n] || n, i = f;
                return function(t) {
                    var o = x ? E : k, u = x ? E[r] : e, c = R(R({}, i), t);
                    return a(o, n, u, c);
                };
            }
            /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
            function y(t, e) {
                return function() {
                    var n = arguments.length;
                    if (!n) return t();
                    for (var r = Array(n); n--; ) r[n] = arguments[n];
                    var i = _.rearg ? 0 : n - 1;
                    return r[i] = e(r[i]), t.apply(void 0, r);
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
            function g(t, e) {
                var n, r = u.aliasToReal[t] || t, a = e, c = W[r];
                /**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
                return c ? a = c(e) : _.immutable && (u.mutate.array[r] ? a = o(e, i) : u.mutate.object[r] ? a = o(e, function(t) {
                    return function(e) {
                        return t({}, e);
                    };
                }(e)) : u.mutate.set[r] && (a = o(e, h))), S(K, function(t) {
                    return S(u.aryMethod[t], function(e) {
                        if (r == e) {
                            var i = u.methodSpread[r], o = i && i.afterRearg;
                            /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
                            return n = o ? p(r, d(r, a, t), t) : d(r, p(r, a, t), t), n = l(r, n), n = function(t, e, n) {
                                return w || _.curry && n > 1 ? F(e, n) : e;
                            }(0, n, t), !1;
                        }
                    }), !n;
                }), n || (n = a), n == e && (n = w ? F(n, 1) : function() {
                    return e.apply(this, arguments);
                }), n.convert = v(r, e), u.placeholder[r] && (m = !0, n.placeholder = e.placeholder = j), 
                n;
            }
            var m, x = "function" == typeof e, b = e === Object(e);
            if (b && (f = n, n = e, e = void 0), null == n) throw new TypeError();
            f || (f = {});
            var _ = {
                cap: !("cap" in f) || f.cap,
                curry: !("curry" in f) || f.curry,
                fixed: !("fixed" in f) || f.fixed,
                immutable: !("immutable" in f) || f.immutable,
                rearg: !("rearg" in f) || f.rearg
            }, w = "curry" in f && f.curry, O = "fixed" in f && f.fixed, A = "rearg" in f && f.rearg, j = x ? n : c, E = x ? n.runInContext() : void 0, k = x ? n : {
                ary: t.ary,
                assign: t.assign,
                clone: t.clone,
                curry: t.curry,
                forEach: t.forEach,
                isArray: t.isArray,
                isFunction: t.isFunction,
                iteratee: t.iteratee,
                keys: t.keys,
                rearg: t.rearg,
                toInteger: t.toInteger,
                toPath: t.toPath
            }, I = k.ary, R = k.assign, C = k.clone, F = k.curry, S = k.forEach, P = k.isArray, M = k.isFunction, L = k.keys, T = k.rearg, N = k.toInteger, D = k.toPath, K = L(u.aryMethod), W = {
                castArray: function(t) {
                    return function() {
                        var e = arguments[0];
                        return P(e) ? t(i(e)) : t.apply(void 0, arguments);
                    };
                },
                iteratee: function(t) {
                    return function() {
                        var e = arguments[0], n = arguments[1], i = t(e, n), o = i.length;
                        return _.cap && "number" == typeof n ? (n = n > 2 ? n - 2 : 1, o && o <= n ? i : r(i, n)) : i;
                    };
                },
                mixin: function(t) {
                    return function(e) {
                        var n = this;
                        if (!M(n)) return t(n, Object(e));
                        var r = [];
                        return S(L(e), function(t) {
                            M(e[t]) && r.push([ t, n.prototype[t] ]);
                        }), t(n, Object(e)), S(r, function(t) {
                            var e = t[1];
                            M(e) ? n.prototype[t[0]] = e : delete n.prototype[t[0]];
                        }), n;
                    };
                },
                nthArg: function(t) {
                    return function(e) {
                        var n = e < 0 ? 1 : N(e) + 1;
                        return F(t(e), n);
                    };
                },
                rearg: function(t) {
                    return function(e, n) {
                        var r = n ? n.length : 0;
                        return F(t(e, n), r);
                    };
                },
                runInContext: function(e) {
                    return function(n) {
                        return a(t, e(n), f);
                    };
                }
            };
            /*--------------------------------------------------------------------------*/
            if (!b) return g(e, n);
            var B = n, $ = [];
            // Convert remaining methods.
            // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
            /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
            // Assign aliases.
            return S(K, function(t) {
                S(u.aryMethod[t], function(t) {
                    var e = B[u.remap[t] || t];
                    e && $.push([ t, g(t, e) ]);
                });
            }), S(L(B), function(t) {
                var e = B[t];
                if ("function" == typeof e) {
                    for (var n = $.length; n--; ) if ($[n][0] == t) return;
                    e.convert = v(t, e), $.push([ t, e ]);
                }
            }), S($, function(t) {
                B[t[0]] = t[1];
            }), B.convert = function(t) {
                return B.runInContext.convert(t)(void 0);
            }, m && (B.placeholder = j), S(L(B), function(t) {
                S(u.realToAlias[t] || [], function(e) {
                    B[e] = B[t];
                });
            }), B;
        }
        var u = n(352), c = n(59), s = Array.prototype.push;
        t.exports = a;
    }, /* 352 */
    /***/
    function(t, e) {
        /** Used to map aliases to their real names. */
        e.aliasToReal = {
            // Lodash aliases.
            each: "forEach",
            eachRight: "forEachRight",
            entries: "toPairs",
            entriesIn: "toPairsIn",
            extend: "assignIn",
            extendAll: "assignInAll",
            extendAllWith: "assignInAllWith",
            extendWith: "assignInWith",
            first: "head",
            // Methods that are curried variants of others.
            conforms: "conformsTo",
            matches: "isMatch",
            property: "get",
            // Ramda aliases.
            __: "placeholder",
            F: "stubFalse",
            T: "stubTrue",
            all: "every",
            allPass: "overEvery",
            always: "constant",
            any: "some",
            anyPass: "overSome",
            apply: "spread",
            assoc: "set",
            assocPath: "set",
            complement: "negate",
            compose: "flowRight",
            contains: "includes",
            dissoc: "unset",
            dissocPath: "unset",
            dropLast: "dropRight",
            dropLastWhile: "dropRightWhile",
            equals: "isEqual",
            identical: "eq",
            indexBy: "keyBy",
            init: "initial",
            invertObj: "invert",
            juxt: "over",
            omitAll: "omit",
            nAry: "ary",
            path: "get",
            pathEq: "matchesProperty",
            pathOr: "getOr",
            paths: "at",
            pickAll: "pick",
            pipe: "flow",
            pluck: "map",
            prop: "get",
            propEq: "matchesProperty",
            propOr: "getOr",
            props: "at",
            symmetricDifference: "xor",
            symmetricDifferenceBy: "xorBy",
            symmetricDifferenceWith: "xorWith",
            takeLast: "takeRight",
            takeLastWhile: "takeRightWhile",
            unapply: "rest",
            unnest: "flatten",
            useWith: "overArgs",
            where: "conformsTo",
            whereEq: "isMatch",
            zipObj: "zipObject"
        }, /** Used to map ary to method names. */
        e.aryMethod = {
            "1": [ "assignAll", "assignInAll", "attempt", "castArray", "ceil", "create", "curry", "curryRight", "defaultsAll", "defaultsDeepAll", "floor", "flow", "flowRight", "fromPairs", "invert", "iteratee", "memoize", "method", "mergeAll", "methodOf", "mixin", "nthArg", "over", "overEvery", "overSome", "rest", "reverse", "round", "runInContext", "spread", "template", "trim", "trimEnd", "trimStart", "uniqueId", "words", "zipAll" ],
            "2": [ "add", "after", "ary", "assign", "assignAllWith", "assignIn", "assignInAllWith", "at", "before", "bind", "bindAll", "bindKey", "chunk", "cloneDeepWith", "cloneWith", "concat", "conformsTo", "countBy", "curryN", "curryRightN", "debounce", "defaults", "defaultsDeep", "defaultTo", "delay", "difference", "divide", "drop", "dropRight", "dropRightWhile", "dropWhile", "endsWith", "eq", "every", "filter", "find", "findIndex", "findKey", "findLast", "findLastIndex", "findLastKey", "flatMap", "flatMapDeep", "flattenDepth", "forEach", "forEachRight", "forIn", "forInRight", "forOwn", "forOwnRight", "get", "groupBy", "gt", "gte", "has", "hasIn", "includes", "indexOf", "intersection", "invertBy", "invoke", "invokeMap", "isEqual", "isMatch", "join", "keyBy", "lastIndexOf", "lt", "lte", "map", "mapKeys", "mapValues", "matchesProperty", "maxBy", "meanBy", "merge", "mergeAllWith", "minBy", "multiply", "nth", "omit", "omitBy", "overArgs", "pad", "padEnd", "padStart", "parseInt", "partial", "partialRight", "partition", "pick", "pickBy", "propertyOf", "pull", "pullAll", "pullAt", "random", "range", "rangeRight", "rearg", "reject", "remove", "repeat", "restFrom", "result", "sampleSize", "some", "sortBy", "sortedIndex", "sortedIndexOf", "sortedLastIndex", "sortedLastIndexOf", "sortedUniqBy", "split", "spreadFrom", "startsWith", "subtract", "sumBy", "take", "takeRight", "takeRightWhile", "takeWhile", "tap", "throttle", "thru", "times", "trimChars", "trimCharsEnd", "trimCharsStart", "truncate", "union", "uniqBy", "uniqWith", "unset", "unzipWith", "without", "wrap", "xor", "zip", "zipObject", "zipObjectDeep" ],
            "3": [ "assignInWith", "assignWith", "clamp", "differenceBy", "differenceWith", "findFrom", "findIndexFrom", "findLastFrom", "findLastIndexFrom", "getOr", "includesFrom", "indexOfFrom", "inRange", "intersectionBy", "intersectionWith", "invokeArgs", "invokeArgsMap", "isEqualWith", "isMatchWith", "flatMapDepth", "lastIndexOfFrom", "mergeWith", "orderBy", "padChars", "padCharsEnd", "padCharsStart", "pullAllBy", "pullAllWith", "rangeStep", "rangeStepRight", "reduce", "reduceRight", "replace", "set", "slice", "sortedIndexBy", "sortedLastIndexBy", "transform", "unionBy", "unionWith", "update", "xorBy", "xorWith", "zipWith" ],
            "4": [ "fill", "setWith", "updateWith" ]
        }, /** Used to map ary to rearg configs. */
        e.aryRearg = {
            "2": [ 1, 0 ],
            "3": [ 2, 0, 1 ],
            "4": [ 3, 2, 0, 1 ]
        }, /** Used to map method names to their iteratee ary. */
        e.iterateeAry = {
            dropRightWhile: 1,
            dropWhile: 1,
            every: 1,
            filter: 1,
            find: 1,
            findFrom: 1,
            findIndex: 1,
            findIndexFrom: 1,
            findKey: 1,
            findLast: 1,
            findLastFrom: 1,
            findLastIndex: 1,
            findLastIndexFrom: 1,
            findLastKey: 1,
            flatMap: 1,
            flatMapDeep: 1,
            flatMapDepth: 1,
            forEach: 1,
            forEachRight: 1,
            forIn: 1,
            forInRight: 1,
            forOwn: 1,
            forOwnRight: 1,
            map: 1,
            mapKeys: 1,
            mapValues: 1,
            partition: 1,
            reduce: 2,
            reduceRight: 2,
            reject: 1,
            remove: 1,
            some: 1,
            takeRightWhile: 1,
            takeWhile: 1,
            times: 1,
            transform: 2
        }, /** Used to map method names to iteratee rearg configs. */
        e.iterateeRearg = {
            mapKeys: [ 1 ],
            reduceRight: [ 1, 0 ]
        }, /** Used to map method names to rearg configs. */
        e.methodRearg = {
            assignInAllWith: [ 1, 0 ],
            assignInWith: [ 1, 2, 0 ],
            assignAllWith: [ 1, 0 ],
            assignWith: [ 1, 2, 0 ],
            differenceBy: [ 1, 2, 0 ],
            differenceWith: [ 1, 2, 0 ],
            getOr: [ 2, 1, 0 ],
            intersectionBy: [ 1, 2, 0 ],
            intersectionWith: [ 1, 2, 0 ],
            isEqualWith: [ 1, 2, 0 ],
            isMatchWith: [ 2, 1, 0 ],
            mergeAllWith: [ 1, 0 ],
            mergeWith: [ 1, 2, 0 ],
            padChars: [ 2, 1, 0 ],
            padCharsEnd: [ 2, 1, 0 ],
            padCharsStart: [ 2, 1, 0 ],
            pullAllBy: [ 2, 1, 0 ],
            pullAllWith: [ 2, 1, 0 ],
            rangeStep: [ 1, 2, 0 ],
            rangeStepRight: [ 1, 2, 0 ],
            setWith: [ 3, 1, 2, 0 ],
            sortedIndexBy: [ 2, 1, 0 ],
            sortedLastIndexBy: [ 2, 1, 0 ],
            unionBy: [ 1, 2, 0 ],
            unionWith: [ 1, 2, 0 ],
            updateWith: [ 3, 1, 2, 0 ],
            xorBy: [ 1, 2, 0 ],
            xorWith: [ 1, 2, 0 ],
            zipWith: [ 1, 2, 0 ]
        }, /** Used to map method names to spread configs. */
        e.methodSpread = {
            assignAll: {
                start: 0
            },
            assignAllWith: {
                start: 0
            },
            assignInAll: {
                start: 0
            },
            assignInAllWith: {
                start: 0
            },
            defaultsAll: {
                start: 0
            },
            defaultsDeepAll: {
                start: 0
            },
            invokeArgs: {
                start: 2
            },
            invokeArgsMap: {
                start: 2
            },
            mergeAll: {
                start: 0
            },
            mergeAllWith: {
                start: 0
            },
            partial: {
                start: 1
            },
            partialRight: {
                start: 1
            },
            without: {
                start: 1
            },
            zipAll: {
                start: 0
            }
        }, /** Used to identify methods which mutate arrays or objects. */
        e.mutate = {
            array: {
                fill: !0,
                pull: !0,
                pullAll: !0,
                pullAllBy: !0,
                pullAllWith: !0,
                pullAt: !0,
                remove: !0,
                reverse: !0
            },
            object: {
                assign: !0,
                assignAll: !0,
                assignAllWith: !0,
                assignIn: !0,
                assignInAll: !0,
                assignInAllWith: !0,
                assignInWith: !0,
                assignWith: !0,
                defaults: !0,
                defaultsAll: !0,
                defaultsDeep: !0,
                defaultsDeepAll: !0,
                merge: !0,
                mergeAll: !0,
                mergeAllWith: !0,
                mergeWith: !0
            },
            set: {
                set: !0,
                setWith: !0,
                unset: !0,
                update: !0,
                updateWith: !0
            }
        }, /** Used to track methods with placeholder support */
        e.placeholder = {
            bind: !0,
            bindKey: !0,
            curry: !0,
            curryRight: !0,
            partial: !0,
            partialRight: !0
        }, /** Used to map real names to their aliases. */
        e.realToAlias = function() {
            var t = Object.prototype.hasOwnProperty, n = e.aliasToReal, r = {};
            for (var i in n) {
                var o = n[i];
                t.call(r, o) ? r[o].push(i) : r[o] = [ i ];
            }
            return r;
        }(), /** Used to map method names to other names. */
        e.remap = {
            assignAll: "assign",
            assignAllWith: "assignWith",
            assignInAll: "assignIn",
            assignInAllWith: "assignInWith",
            curryN: "curry",
            curryRightN: "curryRight",
            defaultsAll: "defaults",
            defaultsDeepAll: "defaultsDeep",
            findFrom: "find",
            findIndexFrom: "findIndex",
            findLastFrom: "findLast",
            findLastIndexFrom: "findLastIndex",
            getOr: "get",
            includesFrom: "includes",
            indexOfFrom: "indexOf",
            invokeArgs: "invoke",
            invokeArgsMap: "invokeMap",
            lastIndexOfFrom: "lastIndexOf",
            mergeAll: "merge",
            mergeAllWith: "mergeWith",
            padChars: "pad",
            padCharsEnd: "padEnd",
            padCharsStart: "padStart",
            propertyOf: "get",
            rangeStep: "range",
            rangeStepRight: "rangeRight",
            restFrom: "rest",
            spreadFrom: "spread",
            trimChars: "trim",
            trimCharsEnd: "trimEnd",
            trimCharsStart: "trimStart",
            zipAll: "zip"
        }, /** Used to track methods that skip fixing their arity. */
        e.skipFixed = {
            castArray: !0,
            flow: !0,
            flowRight: !0,
            iteratee: !0,
            mixin: !0,
            rearg: !0,
            runInContext: !0
        }, /** Used to track methods that skip rearranging arguments. */
        e.skipRearg = {
            add: !0,
            assign: !0,
            assignIn: !0,
            bind: !0,
            bindKey: !0,
            concat: !0,
            difference: !0,
            divide: !0,
            eq: !0,
            gt: !0,
            gte: !0,
            isEqual: !0,
            lt: !0,
            lte: !0,
            matchesProperty: !0,
            merge: !0,
            multiply: !0,
            overArgs: !0,
            partial: !0,
            partialRight: !0,
            propertyOf: !0,
            random: !0,
            range: !0,
            rangeRight: !0,
            subtract: !0,
            zip: !0,
            zipObject: !0,
            zipObjectDeep: !0
        };
    }, /* 353 */
    /***/
    function(t, e, n) {
        t.exports = {
            ary: n(336),
            assign: n(120),
            clone: n(341),
            curry: n(345),
            forEach: n(49),
            isArray: n(0),
            isFunction: n(25),
            iteratee: n(362),
            keys: n(84),
            rearg: n(368),
            toInteger: n(162),
            toPath: n(374)
        };
    }, /* 354 */
    /***/
    function(t, e, n) {
        var r = n(96)("flow", n(350));
        r.placeholder = n(59), t.exports = r;
    }, /* 355 */
    /***/
    function(t, e, n) {
        var r = n(96)("fromPairs", n(357));
        r.placeholder = n(59), t.exports = r;
    }, /* 356 */
    /***/
    function(t, e, n) {
        var r = n(96)("zip", n(381));
        r.placeholder = n(59), t.exports = r;
    }, /* 357 */
    /***/
    function(t, e) {
        t.exports = /**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
        function(t) {
            for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n; ) {
                var i = t[e];
                r[i[0]] = i[1];
            }
            return r;
        };
    }, /* 358 */
    /***/
    function(t, e, n) {
        var r = n(243), i = n(290);
        t.exports = /**
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
        function(t, e) {
            return null != t && i(t, e, r);
        };
    }, /* 359 */
    /***/
    function(t, e, n) {
        var r = n(84), i = n(56), o = n(36), a = n(0), u = n(23), c = n(24), s = n(34), f = n(38), l = "[object Map]", p = "[object Set]", d = Object.prototype.hasOwnProperty;
        t.exports = /**
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
        function(t) {
            if (null == t) return !0;
            if (u(t) && (a(t) || "string" == typeof t || "function" == typeof t.splice || c(t) || f(t) || o(t))) return !t.length;
            var e = i(t);
            if (e == l || e == p) return !t.size;
            if (s(t)) return !r(t).length;
            for (var n in t) if (d.call(t, n)) return !1;
            return !0;
        };
    }, /* 360 */
    /***/
    function(t, e, n) {
        var r = n(83);
        t.exports = /**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
        function(t, e) {
            return r(t, e);
        };
    }, /* 361 */
    /***/
    function(t, e, n) {
        var r = n(20), i = n(55), o = n(10), a = "[object Object]", u = Function.prototype, c = Object.prototype, s = u.toString, f = c.hasOwnProperty, l = s.call(Object);
        t.exports = /**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
        function(t) {
            if (!o(t) || r(t) != a) return !1;
            var e = i(t);
            if (null === e) return !0;
            var n = f.call(e, "constructor") && e.constructor;
            return "function" == typeof n && n instanceof n && s.call(n) == l;
        };
    }, /* 362 */
    /***/
    function(t, e, n) {
        var r = n(82), i = n(125), o = 1;
        t.exports = /**
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
        function(t) {
            return i("function" == typeof t ? t : r(t, o));
        };
    }, /* 363 */
    /***/
    function(t, e) {
        /** Used for built-in method references. */
        var n = Array.prototype.join;
        t.exports = /**
 * Converts all elements in `array` into a string separated by `separator`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to convert.
 * @param {string} [separator=','] The element separator.
 * @returns {string} Returns the joined string.
 * @example
 *
 * _.join(['a', 'b', 'c'], '~');
 * // => 'a~b~c'
 */
        function(t, e) {
            return null == t ? "" : n.call(t, e);
        };
    }, /* 364 */
    /***/
    function(t, e, n) {
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
        function r(t, e) {
            if ("function" != typeof t || null != e && "function" != typeof e) throw new TypeError(o);
            var n = function() {
                var r = arguments, i = e ? e.apply(this, r) : r[0], o = n.cache;
                if (o.has(i)) return o.get(i);
                var a = t.apply(this, r);
                return n.cache = o.set(i, a) || o, a;
            };
            return n.cache = new (r.Cache || i)(), n;
        }
        var i = n(78), o = "Expected a function";
        // Expose `MapCache`.
        r.Cache = i, t.exports = r;
    }, /* 365 */
    /***/
    function(t, e, n) {
        var r = n(254), i = n(88)(function(t, e, n) {
            r(t, e, n);
        });
        t.exports = i;
    }, /* 366 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function() {};
    }, /* 367 */
    /***/
    function(t, e, n) {
        var r = n(126), i = n(256), o = n(92), a = n(35);
        t.exports = /**
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
        function(t) {
            return o(t) ? r(a(t)) : i(t);
        };
    }, /* 368 */
    /***/
    function(t, e, n) {
        var r = n(89), i = n(139)(function(t, e) {
            return r(t, 256, void 0, void 0, void 0, e);
        });
        t.exports = i;
    }, /* 369 */
    /***/
    function(t, e) {
        t.exports = /**
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
        function() {
            return !1;
        };
    }, /* 370 */
    /***/
    function(t, e, n) {
        var r = n(128);
        t.exports = /**
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
        function(t) {
            var e = null == t ? 0 : t.length;
            return e ? r(t, 1, e) : [];
        };
    }, /* 371 */
    /***/
    function(t, e, n) {
        var r = n(372), i = 1 / 0, o = 1.7976931348623157e308;
        t.exports = /**
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
        function(t) {
            if (!t) return 0 === t ? t : 0;
            if ((t = r(t)) === i || t === -i) return (t < 0 ? -1 : 1) * o;
            return t == t ? t : 0;
        };
    }, /* 372 */
    /***/
    function(t, e, n) {
        var r = n(4), i = n(37), o = NaN, a = /^\s+|\s+$/g, u = /^[-+]0x[0-9a-f]+$/i, c = /^0b[01]+$/i, s = /^0o[0-7]+$/i, f = parseInt;
        t.exports = /**
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
        function(t) {
            if ("number" == typeof t) return t;
            if (i(t)) return o;
            if (r(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = r(e) ? e + "" : e;
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(a, "");
            var n = c.test(t);
            return n || s.test(t) ? f(t.slice(2), n ? 2 : 8) : u.test(t) ? o : +t;
        };
    }, /* 373 */
    /***/
    function(t, e, n) {
        var r = n(280)(n(11));
        t.exports = r;
    }, /* 374 */
    /***/
    function(t, e, n) {
        var r = n(50), i = n(21), o = n(0), a = n(37), u = n(157), c = n(35), s = n(26);
        t.exports = /**
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
        function(t) {
            return o(t) ? r(t, c) : a(t) ? [ t ] : i(u(s(t)));
        };
    }, /* 375 */
    /***/
    function(t, e, n) {
        var r = n(15), i = n(39);
        t.exports = /**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
        function(t) {
            return r(t, i(t));
        };
    }, /* 376 */
    /***/
    function(t, e, n) {
        var r = n(49), i = n(33), o = n(242), a = n(125), u = n(55), c = n(0), s = n(24), f = n(25), l = n(4), p = n(38);
        t.exports = /**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 *
 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
        function(t, e, n) {
            var d = c(t), h = d || s(t) || p(t);
            if (e = a(e, 4), null == n) {
                var v = t && t.constructor;
                n = h ? d ? new v() : [] : l(t) && f(v) ? i(u(t)) : {};
            }
            return (h ? r : o)(t, function(t, r, i) {
                return e(n, t, r, i);
            }), n;
        };
    }, /* 377 */
    /***/
    function(t, e, n) {
        var r = n(117), i = n(50), o = n(126), a = n(129), u = n(160), c = Math.max;
        t.exports = /**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @memberOf _
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * _.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
        function(t) {
            if (!t || !t.length) return [];
            var e = 0;
            return t = r(t, function(t) {
                if (u(t)) return e = c(t.length, e), !0;
            }), a(e, function(e) {
                return i(t, o(e));
            });
        };
    }, /* 378 */
    /***/
    function(t, e, n) {
        var r = n(275)("toUpperCase");
        t.exports = r;
    }, /* 379 */
    /***/
    function(t, e, n) {
        var r = n(239), i = n(291), o = n(26), a = n(333);
        t.exports = /**
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
        function(t, e, n) {
            return t = o(t), void 0 === (e = n ? void 0 : e) ? i(t) ? a(t) : r(t) : t.match(e) || [];
        };
    }, /* 380 */
    /***/
    function(t, e, n) {
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
        function r(t) {
            if (c(t) && !u(t) && !(t instanceof i)) {
                if (t instanceof o) return t;
                if (f.call(t, "__wrapped__")) return s(t);
            }
            return new o(t);
        }
        var i = n(75), o = n(76), a = n(85), u = n(0), c = n(10), s = n(335), f = Object.prototype.hasOwnProperty;
        (// Ensure wrappers are instances of `baseLodash`.
        r.prototype = a.prototype).constructor = r, t.exports = r;
    }, /* 381 */
    /***/
    function(t, e, n) {
        var r = n(86)(n(377));
        t.exports = r;
    }, /* 382 */
    /***/
    function(t, e) {
        e.endianness = function() {
            return "LE";
        }, e.hostname = function() {
            return "undefined" != typeof location ? location.hostname : "";
        }, e.loadavg = function() {
            return [];
        }, e.uptime = function() {
            return 0;
        }, e.freemem = function() {
            return Number.MAX_VALUE;
        }, e.totalmem = function() {
            return Number.MAX_VALUE;
        }, e.cpus = function() {
            return [];
        }, e.type = function() {
            return "Browser";
        }, e.release = function() {
            return "undefined" != typeof navigator ? navigator.appVersion : "";
        }, e.networkInterfaces = e.getNetworkInterfaces = function() {
            return {};
        }, e.arch = function() {
            return "javascript";
        }, e.platform = function() {
            return "browser";
        }, e.tmpdir = e.tmpDir = function() {
            return "/tmp";
        }, e.EOL = "\n";
    }, /* 383 */
    /***/
    function(t, e, n) {
        "use strict";
        const r = n(384);
        t.exports = ((t, e) => r(t, Object.assign({}, e, {
            count: 1
        })).then(t => t[0])), t.exports.AggregateError = r.AggregateError;
    }, /* 384 */
    /***/
    function(t, e, n) {
        "use strict";
        const r = n(164);
        t.exports = ((t, e) => new Promise((n, i) => {
            if (e = Object.assign({}, e), !Number.isFinite(e.count)) throw new TypeError(`Expected a finite number, got ${typeof e.count}`);
            const o = [], a = [];
            let u = 0, c = 1 - e.count, s = 1 - e.count, f = !1;
            const l = t => {
                f || ("function" != typeof e.filter || e.filter(t) ? (o.push(t), 0 == --e.count && (f = !0, 
                n(o))) : 0 == --s && (f = !0, i(new RangeError("Not enough values pass the `filter` option"))));
            }, p = t => {
                f || (a.push(t), 0 == --c && (f = !0, i(new r(a))));
            };
            for (const e of t) c++, s++, u++, Promise.resolve(e).then(l, p);
            if (e.count > u) throw new RangeError(`Expected input to contain at least ${e.count} items, but contains ${u} items`);
        })), t.exports.AggregateError = r;
    }, /* 385 */
    /***/
    function(t, e, n) {
        // This method of obtaining a reference to the global object needs to be
        // kept identical to the way it is obtained in runtime.js
        var r = function() {
            return this;
        }() || Function("return this")(), i = r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime") >= 0, o = i && r.regeneratorRuntime;
        if (// Force reevalutation of runtime.js.
        r.regeneratorRuntime = void 0, t.exports = n(386), i) // Restore the original runtime.
        r.regeneratorRuntime = o; else // Remove the global property added by runtime.js.
        try {
            delete r.regeneratorRuntime;
        } catch (t) {
            r.regeneratorRuntime = void 0;
        }
    }, /* 386 */
    /***/
    function(t, e) {
        /**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */
        !function(e) {
            "use strict";
            function n(t, e, n, o) {
                // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
                var a = e && e.prototype instanceof i ? e : i, u = Object.create(a.prototype), c = new p(o || []);
                // The ._invoke method unifies the implementations of the .next,
                // .throw, and .return methods.
                return u._invoke = function(t, e, n) {
                    var i = A;
                    return function(o, a) {
                        if (i === E) throw new Error("Generator is already running");
                        if (i === k) {
                            if ("throw" === o) throw a;
                            // Be forgiving, per 25.3.3.3.3 of the spec:
                            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                            return h();
                        }
                        for (n.method = o, n.arg = a; ;) {
                            var u = n.delegate;
                            if (u) {
                                var c = s(u, n);
                                if (c) {
                                    if (c === I) continue;
                                    return c;
                                }
                            }
                            if ("next" === n.method) // Setting context._sent for legacy support of Babel's
                            // function.sent implementation.
                            n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                if (i === A) throw i = k, n.arg;
                                n.dispatchException(n.arg);
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            i = E;
                            var f = r(t, e, n);
                            if ("normal" === f.type) {
                                if (// If an exception is thrown from innerFn, we leave state ===
                                // GenStateExecuting and loop back for another invocation.
                                i = n.done ? k : j, f.arg === I) continue;
                                return {
                                    value: f.arg,
                                    done: n.done
                                };
                            }
                            "throw" === f.type && (i = k, // Dispatch the exception by looping back around to the
                            // context.dispatchException(context.arg) call above.
                            n.method = "throw", n.arg = f.arg);
                        }
                    };
                }(t, n, c), u;
            }
            // Try/catch helper to minimize deoptimizations. Returns a completion
            // record like context.tryEntries[i].completion. This interface could
            // have been (and was previously) designed to take a closure to be
            // invoked without arguments, but in all the cases we care about we
            // already have an existing method we want to call, so there's no need
            // to create a new function object. We can even get away with assuming
            // the method takes exactly one argument, since that happens to be true
            // in every case, so we don't have to touch the arguments object. The
            // only additional allocation required is the completion record, which
            // has a stable shape and so hopefully should be cheap to allocate.
            function r(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    };
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    };
                }
            }
            // Dummy constructor functions that we use as the .constructor and
            // .constructor.prototype properties for functions that return Generator
            // objects. For full spec compliance, you may wish to configure your
            // minifier not to mangle the names of these two functions.
            function i() {}
            function o() {}
            function a() {}
            // Helper for defining the .next, .throw, and .return methods of the
            // Iterator interface in terms of a single ._invoke method.
            function u(t) {
                [ "next", "throw", "return" ].forEach(function(e) {
                    t[e] = function(t) {
                        return this._invoke(e, t);
                    };
                });
            }
            function c(t) {
                function e(n, i, o, a) {
                    var u = r(t[n], t, i);
                    if ("throw" !== u.type) {
                        var c = u.arg, s = c.value;
                        return s && "object" == typeof s && g.call(s, "__await") ? Promise.resolve(s.__await).then(function(t) {
                            e("next", t, o, a);
                        }, function(t) {
                            e("throw", t, o, a);
                        }) : Promise.resolve(s).then(function(t) {
                            // When a yielded Promise is resolved, its final value becomes
                            // the .value of the Promise<{value,done}> result for the
                            // current iteration. If the Promise is rejected, however, the
                            // result for this iteration will be rejected with the same
                            // reason. Note that rejections of yielded Promises are not
                            // thrown back into the generator function, as is the case
                            // when an awaited Promise is rejected. This difference in
                            // behavior between yield and await is important, because it
                            // allows the consumer to decide what to do with the yielded
                            // rejection (swallow it and continue, manually .throw it back
                            // into the generator, abandon iteration, whatever). With
                            // await, by contrast, there is no opportunity to examine the
                            // rejection reason outside the generator function, so the
                            // only option is to throw it from the await expression, and
                            // let the generator function handle the exception.
                            c.value = t, o(c);
                        }, a);
                    }
                    a(u.arg);
                }
                var n;
                // Define the unified helper method that is used to implement .next,
                // .throw, and .return (see defineIteratorMethods).
                this._invoke = function(t, r) {
                    function i() {
                        return new Promise(function(n, i) {
                            e(t, r, n, i);
                        });
                    }
                    // If enqueue has been called before, then we want to wait until
                    // all previous Promises have been resolved before calling invoke,
                    // so that results are always delivered in the correct order. If
                    // enqueue has not been called before, then it is important to
                    // call invoke immediately, without waiting on a callback to fire,
                    // so that the async generator function has the opportunity to do
                    // any necessary setup in a predictable way. This predictability
                    // is why the Promise constructor synchronously invokes its
                    // executor callback, and why async functions synchronously
                    // execute code before the first await. Since we implement simple
                    // async functions in terms of async generators, it is especially
                    // important to get this right, even though it requires care.
                    // Avoid propagating failures to Promises returned by later
                    // invocations of the iterator.
                    return n = n ? n.then(i, i) : i();
                };
            }
            // Call delegate.iterator[context.method](context.arg) and handle the
            // result, either by returning a { value, done } result from the
            // delegate iterator, or by modifying context.method and context.arg,
            // setting context.delegate to null, and returning the ContinueSentinel.
            function s(t, e) {
                var n = t.iterator[e.method];
                if (n === v) {
                    if (// A .throw or .return when the delegate iterator has no .throw
                    // method always terminates the yield* loop.
                    e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (// If the delegate iterator has a return method, give it a
                        // chance to clean up.
                        e.method = "return", e.arg = v, s(t, e), "throw" === e.method)) // If maybeInvokeDelegate(context) changed context.method from
                        // "return" to "throw", let that override the TypeError below.
                        return I;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
                    }
                    return I;
                }
                var i = r(n, t.iterator, e.arg);
                if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, 
                I;
                var o = i.arg;
                // Assign the result of the finished delegate to the temporary
                // variable specified by delegate.resultName (see delegateYield).
                // Resume execution at the desired location (see delegateYield).
                // If context.method was "throw" but the delegate handled the
                // exception, let the outer generator proceed normally. If
                // context.method was "next", forget context.arg since it has been
                // "consumed" by the delegate iterator. If context.method was
                // "return", allow the original .return call to continue in the
                // outer generator.
                // The delegate iterator is finished, so forget it and continue with
                // the outer generator.
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", 
                e.arg = v), e.delegate = null, I) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), 
                e.delegate = null, I);
            }
            function f(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
                this.tryEntries.push(e);
            }
            function l(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e;
            }
            function p(t) {
                // The root entry object (effectively a try statement without a catch
                // or a finally block) gives us a place to store values thrown from
                // locations where there is no enclosing try statement.
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], t.forEach(f, this), this.reset(!0);
            }
            function d(t) {
                if (t) {
                    var e = t[x];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var n = -1, r = function e() {
                            for (;++n < t.length; ) if (g.call(t, n)) return e.value = t[n], e.done = !1, e;
                            return e.value = v, e.done = !0, e;
                        };
                        return r.next = r;
                    }
                }
                // Return an iterator with no values.
                return {
                    next: h
                };
            }
            function h() {
                return {
                    value: v,
                    done: !0
                };
            }
            var v, y = Object.prototype, g = y.hasOwnProperty, m = "function" == typeof Symbol ? Symbol : {}, x = m.iterator || "@@iterator", b = m.asyncIterator || "@@asyncIterator", _ = m.toStringTag || "@@toStringTag", w = "object" == typeof t, O = e.regeneratorRuntime;
            if (O) w && (// If regeneratorRuntime is defined globally and we're in a module,
            // make the exports object identical to regeneratorRuntime.
            t.exports = O); else {
                (// Define the runtime globally (as expected by generated code) as either
                // module.exports (if we're in a module) or a new, empty object.
                O = e.regeneratorRuntime = w ? t.exports : {}).wrap = n;
                var A = "suspendedStart", j = "suspendedYield", E = "executing", k = "completed", I = {}, R = {};
                R[x] = function() {
                    return this;
                };
                var C = Object.getPrototypeOf, F = C && C(C(d([])));
                F && F !== y && g.call(F, x) && (// This environment has a native %IteratorPrototype%; use it instead
                // of the polyfill.
                R = F);
                var S = a.prototype = i.prototype = Object.create(R);
                o.prototype = S.constructor = a, a.constructor = o, a[_] = o.displayName = "GeneratorFunction", 
                O.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    // For the native GeneratorFunction constructor, the best we can
                    // do is to check its .name property.
                    return !!e && (e === o || "GeneratorFunction" === (e.displayName || e.name));
                }, O.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, a) : (t.__proto__ = a, _ in t || (t[_] = "GeneratorFunction")), 
                    t.prototype = Object.create(S), t;
                }, // Within the body of any async function, `await x` is transformed to
                // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
                // `hasOwn.call(value, "__await")` to determine if the yielded value is
                // meant to be awaited.
                O.awrap = function(t) {
                    return {
                        __await: t
                    };
                }, u(c.prototype), c.prototype[b] = function() {
                    return this;
                }, O.AsyncIterator = c, // Note that simple async functions are implemented on top of
                // AsyncIterator objects; they just return a Promise for the value of
                // the final result produced by the iterator.
                O.async = function(t, e, r, i) {
                    var o = new c(n(t, e, r, i));
                    return O.isGeneratorFunction(e) ? o : o.next().then(function(t) {
                        return t.done ? t.value : o.next();
                    });
                }, // Define Generator.prototype.{next,throw,return} in terms of the
                // unified ._invoke helper method.
                u(S), S[_] = "Generator", // A Generator should always return itself as the iterator object when the
                // @@iterator function is called on it. Some browsers' implementations of the
                // iterator prototype chain incorrectly implement this, causing the Generator
                // object to not be returned from this call. This ensures that doesn't happen.
                // See https://github.com/facebook/regenerator/issues/274 for more details.
                S[x] = function() {
                    return this;
                }, S.toString = function() {
                    return "[object Generator]";
                }, O.keys = function(t) {
                    var e = [];
                    for (var n in t) e.push(n);
                    // Rather than returning an object with a next method, we keep
                    // things simple and return the next function itself.
                    return e.reverse(), function n() {
                        for (;e.length; ) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n;
                        }
                        // To avoid creating an additional object, we just hang the .value
                        // and .done properties off the next function object itself. This
                        // also ensures that the minifier will not anonymize the function.
                        return n.done = !0, n;
                    };
                }, O.values = d, p.prototype = {
                    constructor: p,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, // Resetting context._sent for legacy support of Babel's
                        // function.sent implementation.
                        this.sent = this._sent = v, this.done = !1, this.delegate = null, this.method = "next", 
                        this.arg = v, this.tryEntries.forEach(l), !t) for (var e in this) // Not sure about the optimal order of these conditions:
                        "t" === e.charAt(0) && g.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = v);
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                    },
                    dispatchException: function(t) {
                        function e(e, r) {
                            // If the dispatched exception was caught by a catch block,
                            // then let that catch block handle the exception normally.
                            return o.type = "throw", o.arg = t, n.next = e, r && (n.method = "next", n.arg = v), 
                            !!r;
                        }
                        if (this.done) throw t;
                        for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                            var i = this.tryEntries[r], o = i.completion;
                            if ("root" === i.tryLoc) // Exception thrown outside of any try block that could handle
                            // it, so set the completion value of the entire function to
                            // throw the exception.
                            return e("end");
                            if (i.tryLoc <= this.prev) {
                                var a = g.call(i, "catchLoc"), u = g.call(i, "finallyLoc");
                                if (a && u) {
                                    if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                    if (this.prev < i.finallyLoc) return e(i.finallyLoc);
                                } else if (a) {
                                    if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                } else {
                                    if (!u) throw new Error("try statement without catch or finally");
                                    if (this.prev < i.finallyLoc) return e(i.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && g.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var i = r;
                                break;
                            }
                        }
                        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (// Ignore the finally entry if control is not jumping to a
                        // location outside the try/catch block.
                        i = null);
                        var o = i ? i.completion : {};
                        return o.type = t, o.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, 
                        I) : this.complete(o);
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                        this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                        I;
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), l(n), I;
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc === t) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var i = r.arg;
                                    l(n);
                                }
                                return i;
                            }
                        }
                        // The context.catch method must only be called with a location
                        // argument that corresponds to a known catch block.
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(t, e, n) {
                        // Deliberately forget the last sent value so that we don't
                        // accidentally pass it on to the delegate.
                        return this.delegate = {
                            iterator: d(t),
                            resultName: e,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = v), I;
                    }
                };
            }
        }(// In sloppy mode, unbound `this` refers to the global object, fallback to
        // Function constructor if we're in global strict mode. That is sadly a form
        // of indirect eval which violates Content Security Policy.
        function() {
            return this;
        }() || Function("return this")());
    }, /* 387 */
    /***/
    function(t, e) {
        var n;
        // This works in non-strict mode
        n = function() {
            return this;
        }();
        try {
            // This works if eval is allowed (see CSP)
            n = n || Function("return this")() || (0, eval)("this");
        } catch (t) {
            // This works if the window reference is available
            "object" == typeof window && (n = window);
        }
        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}
        t.exports = n;
    }, /* 388 */
    /***/
    function(t, e, n) {
        t.exports = n(163);
    } ]);
});