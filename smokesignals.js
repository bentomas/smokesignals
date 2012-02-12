(function (name, definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else this[name] = definition()
})('smokesignals', function() {
  return {
    makeEmitter: function makeEmitter(obj) {
      var listeners = {};

      obj.on = function(eventName, handler) {
        (listeners[eventName] || (listeners[eventName] = [])).push(handler);
        return obj;
      }

      obj.once = function(eventName, handler) {
        function wrappedHandler () {
          obj.off(eventName, wrappedHandler);
          return handler.apply(obj, arguments);
        }
        wrappedHandler.h = handler;

        return obj.on(eventName, wrappedHandler);
      }

      obj.off = function(eventName, handler, list, i) {
        list = listeners[eventName];
        if (list) {
          for (i = 0; i < list.length; i++) {
            if (list[i] === handler
                || (list[i].h && list[i].h === handler)) {
              list.splice(i,1);
              i--;
            }
          }
          if (list.length === 0) {
            delete listeners[eventName];
          }
        }
        return obj;
      }

      obj.trigger = function(eventName) {
        var list = listeners[eventName];
        if (list) {
          for(var i = 0; i < list.length; i++) {
            list[i].apply(obj, Array.prototype.slice.call(arguments, 1));
          }
        }
        return obj;
      }

      return obj;
    }
  }
});
