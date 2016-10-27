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
