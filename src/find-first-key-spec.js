var la = require('lazy-ass');
var check = require('check-more-types');

/* global describe, it */
describe('find first key', function () {
  var find = require('./find-first-key');

  it('is a function', function () {
    la(check.fn(find));
  });

  it('finds first key', function () {
    var obj = {
      foo: 'foo-value',
      bar: 'bar-value',
      baz: 'baz-value'
    };
    var search = ['bar', 'baz'];
    var found = find(search, obj);
    la(found === 'bar-value', 'found', found);
  });

  it('finds second key', function () {
    var obj = {
      foo: 'foo-value',
      bar: 'bar-value',
      baz: 'baz-value'
    };
    var search = ['foo-no', 'bar', 'baz'];
    var found = find(search, obj);
    la(found === 'bar-value', 'found', found);
  });

  it('finds nothing', function () {
    var obj = {
      foo: 'foo-value',
      bar: 'bar-value',
      baz: 'baz-value'
    };
    var search = ['foo-no', 'bar-no', 'baz-no'];
    var found = find(search, obj);
    la(typeof found === 'undefined', 'found', found);
  });

  it('finds 0', function () {
    var obj = {
      foo: 'foo-value',
      bar: 0,
      baz: 'baz-value'
    };
    var search = ['foo-no', 'bar', 'baz-no'];
    var found = find(search, obj);
    la(found === 0, 'found', found);
  });
});
