(function (definition,undef) {
  undef+='';
  typeof module != undef ?  module.exports = definition() :
    typeof define != undef ? define(definition) :
      this['smokesignals'] = definition()
})(function() {
  return {
    convert: function(obj) {
      var listeners = {};

      obj.on = function(eventName, handler) {
        (listeners[eventName] || (listeners[eventName] = [])).push(handler);
        return obj;
      }

      obj.once = function(eventName, handler) {
        function wrappedHandler() {
          return handler.apply(obj.off(eventName, wrappedHandler), arguments);
        }
        wrappedHandler.h = handler;

        return obj.on(eventName, wrappedHandler);
      }

      obj.off = function(eventName, handler) {
        for (var list = listeners[eventName], i = 0; handler && list && list[i]; i++) {
          if (list[i] == handler || list[i].h == handler) {
            list.splice(i--,1);
          }
        }
        if (!i) {
          delete listeners[eventName];
        }
        return obj;
      }

      obj.trigger = function(eventName) {
        for(var list = listeners[eventName], i = 0;list && list[i];) {
          list[i++].apply(obj, list.slice.call(arguments, 1));
        }
        return obj;
      }

      return obj;
    }
  }
});
