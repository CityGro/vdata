'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var each = _interopDefault(require('lodash/fp/each'));
var equals = _interopDefault(require('lodash/fp/equals'));

var vdeux = function (store) {
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
                var newQS = _this.$options.query(store);
                if (!equals(newQS)(_this.$qs)) {
                  _this.$qs = _this.$options.query(store);
                  _this.$forceUpdate();
                  each(function (child) {
                    return setTimeout(function () {
                      return child.$forceUpdate();
                    }, 0);
                  })(_this.$children);
                }
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

module.exports = vdeux;
