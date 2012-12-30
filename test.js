var assert = require('assert');

console.log('test do not pollute node globals when requiring');
    var globalKeys = [];
    for (var key in global) {
        globalKeys.push(key);
    }

    var smokesignals = require('./');

    for (var key in global) {
        assert.ok(globalKeys.indexOf(key) > -1);
    }

    // emitter for tests
    var emitter = {};
    assert.strictEqual(emitter, smokesignals.convert(emitter));

console.log('emiting one event listener');
    var event1count = 0;
    var event1handler = function() { event1count++; };
    assert.strictEqual(emitter, emitter.on('event1', event1handler));

    assert.strictEqual(emitter, emitter.emit('event1'));
    assert.equal(event1count, 1);

    assert.strictEqual(emitter, emitter.emit('event1'));
    assert.equal(event1count, 2);

    assert.strictEqual(emitter, emitter.off('event1', event1handler));
    assert.strictEqual(emitter, emitter.emit('event1'));
    assert.equal(event1count, 2);

console.log('emiting three event listeners');
    var event2count1 = 0;
    var event2count2 = 0;
    var event2count3 = 0;
    var event2handler1 = function() { event2count1++; };
    var event2handler2 = function() { event2count2++; };
    var event2handler3 = function() { event2count3++; };
    assert.strictEqual(emitter, emitter.on('event2', event2handler1));
    assert.strictEqual(emitter, emitter.on('event2', event2handler2));
    assert.strictEqual(emitter, emitter.on('event2', event2handler3));

    assert.strictEqual(emitter, emitter.emit('event2'));
    assert.equal(event2count1, 1);
    assert.equal(event2count2, 1);
    assert.equal(event2count3, 1);

    assert.strictEqual(emitter, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 2);
    assert.equal(event2count3, 2);

    assert.strictEqual(emitter, emitter.off('event2', event2handler1));
    assert.strictEqual(emitter, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 3);
    assert.equal(event2count3, 3);

    assert.strictEqual(emitter, emitter.off('event2', event2handler3));
    assert.strictEqual(emitter, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 4);
    assert.equal(event2count3, 3);

    assert.strictEqual(emitter, emitter.off('event2', event2handler2));
    assert.strictEqual(emitter, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 4);
    assert.equal(event2count3, 3);

console.log('emiting one event listener and passing args to it');
    var event3count = 0;
    var event3handler = function(arg1) { assert.equal(arg1, 'one'); event3count++; };
    assert.strictEqual(emitter, emitter.on('event3', event3handler));

    assert.strictEqual(emitter, emitter.emit('event3', 'one'));
    assert.equal(event3count, 1);

    // listener expects an arg, so throws an error if you do not send one
    assert.throws(function() {
    assert.strictEqual(emitter, emitter.emit('event3'));
    },'AssertionError: "undefined" == "one"');

console.log('once function');
    var event4count = 0;
    var event4handler = function() { event4count++; };
    assert.strictEqual(emitter, emitter.once('event4', event4handler));

    assert.strictEqual(emitter, emitter.emit('event4'));
    assert.equal(event4count, 1);

    assert.strictEqual(emitter, emitter.emit('event4'));
    assert.equal(event4count, 1);

console.log('removing all listeners for an event');
    var event5count1 = 0;
    var event5count2 = 0;
    var event5count3 = 0;
    var event5handler1 = function() { event5count1++; };
    var event5handler2 = function() { event5count2++; };
    var event5handler3 = function() { event5count3++; };
    assert.strictEqual(emitter, emitter.on('event5', event5handler1));
    assert.strictEqual(emitter, emitter.on('event5', event5handler2));
    assert.strictEqual(emitter, emitter.on('event5', event5handler3));

    assert.strictEqual(emitter, emitter.emit('event5'));
    assert.equal(event5count1, 1);
    assert.equal(event5count2, 1);
    assert.equal(event5count3, 1);

    assert.strictEqual(emitter, emitter.off('event5'));
    assert.strictEqual(emitter, emitter.emit('event5'));
    assert.equal(event5count1, 1);
    assert.equal(event5count2, 1);
    assert.equal(event5count3, 1);

console.log('resetting');
    var event6count = 0;
    var event7count = 0;
    var event8count = 0;
    var event6handler = function() { event6count++; };
    var event7handler = function() { event7count++; };
    var event8handler = function() { event8count++; };
    assert.strictEqual(emitter, emitter.on('event6', event6handler));
    assert.strictEqual(emitter, emitter.on('event7', event7handler));
    assert.strictEqual(emitter, emitter.on('event8', event8handler));

    assert.strictEqual(emitter, emitter.emit('event6'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 0);
    assert.equal(event8count, 0);

    assert.strictEqual(emitter, emitter.emit('event7'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 1);
    assert.equal(event8count, 0);

    assert.strictEqual(emitter, emitter.emit('event8'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 1);
    assert.equal(event8count, 1);

    assert.strictEqual(emitter, smokesignals.convert(emitter));
    assert.strictEqual(emitter, emitter.emit('event6'));
    assert.strictEqual(emitter, emitter.emit('event7'));
    assert.strictEqual(emitter, emitter.emit('event8'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 1);
    assert.equal(event8count, 1);

console.log('constructor paradigm');
    var event9count = 0;

    function Obj() {
    smokesignals.convert(this);
    }
    var obj = new Obj();

    var event9handler = function() { event9count++; };
    assert.strictEqual(obj, obj.on('event9', event9handler));

    assert.strictEqual(obj, obj.emit('event9'));
    assert.equal(event9count, 1);

    assert.strictEqual(obj, obj.emit('event9'));
    assert.equal(event9count, 2);

    assert.strictEqual(obj, obj.off('event9', event9handler));
    assert.strictEqual(obj, obj.emit('event9'));
    assert.equal(event9count, 2);

console.log('test do not pollute node globals after using');
    for (var key in global) {
        assert.ok(globalKeys.indexOf(key) > -1, key + ' found in global namespace');
    }
