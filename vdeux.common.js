'use strict';

var vdeux = {
  install: function install(Vue) {
    Object.defineProperty(Vue.prototype, '$state', {
      get: function get() {
        return this.$root._store.getState();
      }
    });
    Object.defineProperty(Vue.prototype, '$dispatch', {
      get: function get() {
        return this.$root._store.dispatch;
      }
    });
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var _this = this;

        var options = this.$options;
        if (options.store) {
          this._store = options.store;
        } else if (options.parent && options.parent._store) {
          this._store = options.parent._store;
        }
        if (this._store) {
          (function () {
            var state = void 0;
            _this._remove_store_change_listener = _this._store.subscribe(function () {
              var previousState = state;
              state = _this._store.getState();
              if (previousState !== state) {
                _this.$forceUpdate();
              }
            });
          })();
        }
      },
      beforeDestroy: function beforeDestroy() {
        this._remove_store_change_listener();
      }
    });
  }
};

module.exports = vdeux;
