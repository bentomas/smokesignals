var assert = require('assert');
var smokesignals = require('./smokesignals.min');

var emitter = {};
assert.strictEqual(emitter, smokesignals.convert(emitter));

// triggering one event listener
var event1count = 0;
var event1handler = function() { event1count++; };
assert.strictEqual(emitter, emitter.on('event1', event1handler));

assert.strictEqual(emitter, emitter.trigger('event1'));
assert.equal(event1count, 1);

assert.strictEqual(emitter, emitter.trigger('event1'));
assert.equal(event1count, 2);

assert.strictEqual(emitter, emitter.off('event1', event1handler));
assert.strictEqual(emitter, emitter.trigger('event1'));
assert.equal(event1count, 2);

// triggering three event listeners
var event2count1 = 0;
var event2count2 = 0;
var event2count3 = 0;
var event2handler1 = function() { event2count1++; };
var event2handler2 = function() { event2count2++; };
var event2handler3 = function() { event2count3++; };
assert.strictEqual(emitter, emitter.on('event2', event2handler1));
assert.strictEqual(emitter, emitter.on('event2', event2handler2));
assert.strictEqual(emitter, emitter.on('event2', event2handler3));

assert.strictEqual(emitter, emitter.trigger('event2'));
assert.equal(event2count1, 1);
assert.equal(event2count2, 1);
assert.equal(event2count3, 1);

assert.strictEqual(emitter, emitter.trigger('event2'));
assert.equal(event2count1, 2);
assert.equal(event2count2, 2);
assert.equal(event2count3, 2);

assert.strictEqual(emitter, emitter.off('event2', event2handler1));
assert.strictEqual(emitter, emitter.trigger('event2'));
assert.equal(event2count1, 2);
assert.equal(event2count2, 3);
assert.equal(event2count3, 3);

assert.strictEqual(emitter, emitter.off('event2', event2handler3));
assert.strictEqual(emitter, emitter.trigger('event2'));
assert.equal(event2count1, 2);
assert.equal(event2count2, 4);
assert.equal(event2count3, 3);

assert.strictEqual(emitter, emitter.off('event2', event2handler2));
assert.strictEqual(emitter, emitter.trigger('event2'));
assert.equal(event2count1, 2);
assert.equal(event2count2, 4);
assert.equal(event2count3, 3);

// triggering one event listener and passing args to it
var event3count = 0;
var event3handler = function(arg1) { assert.equal(arg1, 'one'); event3count++; };
assert.strictEqual(emitter, emitter.on('event3', event3handler));

assert.strictEqual(emitter, emitter.trigger('event3', 'one'));
assert.equal(event3count, 1);

// listener expects an arg, so throws an error if you don't send one
assert.throws(function() {
  assert.strictEqual(emitter, emitter.trigger('event3'));
},'AssertionError: "undefined" == "one"');

// once function
var event4count = 0;
var event4handler = function() { event4count++; };
assert.strictEqual(emitter, emitter.once('event4', event4handler));

assert.strictEqual(emitter, emitter.trigger('event4'));
assert.equal(event4count, 1);

assert.strictEqual(emitter, emitter.trigger('event4'));
assert.equal(event4count, 1);

// removing all listeners
var event5count1 = 0;
var event5count2 = 0;
var event5count3 = 0;
var event5handler1 = function() { event5count1++; };
var event5handler2 = function() { event5count2++; };
var event5handler3 = function() { event5count3++; };
assert.strictEqual(emitter, emitter.on('event5', event5handler1));
assert.strictEqual(emitter, emitter.on('event5', event5handler2));
assert.strictEqual(emitter, emitter.on('event5', event5handler3));

assert.strictEqual(emitter, emitter.trigger('event5'));
assert.equal(event5count1, 1);
assert.equal(event5count2, 1);
assert.equal(event5count3, 1);

assert.strictEqual(emitter, emitter.off('event2'));
assert.strictEqual(emitter, emitter.trigger('event2'));
assert.equal(event5count1, 1);
assert.equal(event5count2, 1);
assert.equal(event5count3, 1);
