Smoke Signals
=============

Really, really lightweight event emitting for Node and the browser.

(though Node already has [event emitting built in][1] so I don't know why you'd
use this there. This doesn't even have most of the functionallity that Node's
event emitter has.)

This library has three goals:

1. Make it easy to listen for and initiate events.
2. Be small. Right now the minified version comes in at 544 bytes (181 bytes
   gzipped).
3. Not pollute the global namespace or the objects it modifies with a bunch of
   crap.

Installing
----------

With npm,

    npm install smokesignals

By hand, just download `smokesignals.js` or `smokesignals.min.js` and put your
choice in a place you can access from your Node scripts or your webpage.

Loading
-------

With Node,

    var smokesignals = require('smokesignals');

In the browser include the smokesignals script,

    <script src="smokesignals.js"></script>

Using
-----

Make any object an event emitter:

    var john = {};
    smokesignals.convert(john);

Or if you prefer constructors:

    function Person() {
      smokesignals.convert(this);
    }
    var john = new Person();

Now you can listen for events:

    function myListener(msg) {
        window.alert(msg);
    }
    john.on('event name', myListener);

And trigger events:

    // alerts "hello world!"
    john.trigger('event name', 'hello world!');

And remove a listener:

    john.off('event name', myListener);

Or remove all listeners for an event:

    john.off('event name');

Or if you only want to listen for an event once,

    john.once('another event', function() {
        window.alert("I'll only be called once!");
    });
    john.trigger('another event');

That's it! One global object (`smokesignals`) and when used it adds 4 methods to
your objects (`on`, `once`, `off` and `trigger`).

All methods are of couse chainable,

    john
      .on('event name', function() { ... })
      .on('event two', function() { ... })
      .trigger('event name')
      .once('event three', function() { ... })
      .off ('event three')
      ;

[1]: http://nodejs.org/docs/latest/api/events.html
