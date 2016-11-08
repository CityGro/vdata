'use strict';

var vdeux = {
  install: function install(Vue) {
    Object.defineProperty(Vue.prototype, '$state', {
      get: function get() {
        var _this = this;

        var store = this.$root._store;
        var state = store.getState();
        this.$nextTick(function () {
          if (store.getState() !== state) {
            _this.$forceUpdate();
          }
        });
        return state;
      }
    });
    Object.defineProperty(Vue.prototype, '$dispatch', {
      get: function get() {
        return this.$root._store.dispatch;
      }
    });
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var options = this.$options;
        if (options.store) {
          this._store = options.store;
        } else if (options.parent && options.parent._store) {
          this._store = options.parent._store;
        }
      }
    });
  }
};

module.exports = vdeux;
