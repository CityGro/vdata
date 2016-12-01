'use strict';

var vdeux = {
  install: function install(Vue) {
    Object.defineProperty(Vue.prototype, '$state', {
      get: function get() {
        return this.$options.store.getState();
      }
    });
    Object.defineProperty(Vue.prototype, '$dispatch', {
      get: function get() {
        return this.$options.store.dispatch;
      }
    });
  }
};

module.exports = vdeux;
