Smoke Signals
=============

Really, really lightweight event emitting for Node and the browser.

(though Node already has [event emitting built in][1] so I don't know why you'd
use this there. This is directly inspired by Node's and doesn't even have all of
the functionality that Node's event emitter has.)

This library has three goals:

1. Make it easy and intuitive to listen for and initiate events on an object.
2. Be really small. Right now the minified version comes in at 571 bytes (345
   bytes gzipped).
3. Not pollute the global namespace or the objects it modifies with a bunch of
   crap. I define crap as anything that is not the API.

There are many other [wonderful libraries that do similar things][2], but none of them
worked exactly how I wanted them to work or met all the goals above.

Installing
----------

With npm:

    npm install smokesignals

By hand, just download `smokesignals.js` or `smokesignals.min.js` and put your
choice in a place you can access from your webpage.

Loading
-------

With Node:

    var smokesignals = require('smokesignals');

In the browser include the smokesignals script:

    <script src="smokesignals.js"></script>

Using
-----

Make any object an event emitter:

    var jack = {};
    smokesignals.convert(jack);

Or if you prefer constructors:

    function Person() {
      smokesignals.convert(this);
    }
    var jack = new Person();

Now you can listen for events:

    function listener(name) {
        window.alert('hello ' + name + '!');
    }
    jack.on('say hello', listener);

And emit events:

    jack.emit('say hello', 'jill');

And remove a listener:

    jack.off('say hello', listener);

Or if you only want to listen for an event once:

    jack.once('another event', function() {
        window.alert("I'll only be called once!");
    });
    jack.emit('another event');

Or remove all listeners for an event:

    jack.off('say hello');

Or if you want to remove ALL listeners:

    // just reconvert the object...
    smokesignals.convert(jack);

That's it! One global object (`smokesignals`) and when used it adds 4 methods to
your objects (`on`, `once`, `off` and `emit`).

By the way, all methods are chainable:

    var jack = smokesignals.convert({})
      .on('event one', function() { ... })
      .on('event two', function() { ... })
      .emit('event one')
      .once('event three', function() { ... })
      .off ('event one')
      ;

[![Build Status](https://secure.travis-ci.org/bentomas/smokesignals.png?branch=master)](http://travis-ci.org/bentomas/smokesignals)

[1]: http://nodejs.org/docs/latest/api/events.html
[2]: http://microjs.com/#events
