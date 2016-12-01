'use strict';

var vdeux = function (store) {
  return {
    install: function install(Vue) {
      Object.defineProperty(Vue.prototype, '$state', {
        get: function get() {
          return store.getState();
        }
      });
      Object.defineProperty(Vue.prototype, '$dispatch', {
        get: function get() {
          return store.dispatch;
        }
      });
    }
  };
};

module.exports = vdeux;
