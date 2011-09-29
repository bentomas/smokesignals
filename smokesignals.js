!function (name, definition){
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else this[name] = definition()
}('smokesignals', function() {
  return {
    makeEmitter: function makeEmitter(obj) {
      var listeners = {};

      obj.on = function(eventName, handler) {
        if (!listeners[eventName]) listeners[eventName] = [];

        listeners[eventName].push(handler);
      }

      obj.once = function(eventName, handler) {
        var self = this;
        function f() {
          self.off(eventName, f);
          return handler.apply(this, arguments);
        }
        f.handler = handler;

        self.on(eventName, f);
      }

      obj.off = function(eventName, handler) {
        if (!listeners[eventName]) return;

        var list = listeners[eventName];
        for (var i = 0; i < listeners[eventName]; i++) {
          if (list[i] === handler
              || (list[i].handler && list[i].handler === handler)) {
            list.splice(i,1);
            i--;
          }
        }
        if (l.length == 0) {
          delete listeners[eventName];
        }
      }

      obj.trigger = function() {
        var eventName = arguments[0];
        if (!listeners[eventName]) {
          return;
        }
        for(var i = 0; i < listeners[eventName].length; i++) {
          listeners[eventName][i].apply(null, Array.prototype.slice.call(arguments, 1));
        }
      }

      /*
      obj.clear = function(eventName) {
        delete listeners[eventName];
      }

      obj.listeners = function(eventName) {
        return typeof eventName !== 'undefined' ? listeners[eventName] : listeners;
      }
      */
    }
  }
});
