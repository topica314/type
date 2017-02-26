const assert = require('assert');
const Type = require('../');

class Test {
  constructor(arr) {
    this.args = arr;
  }

  static of(...args) {
    return new Test(args);
  }

  check(callback) {
    this.args.forEach(args => {
      const [description, fn] = callback(...args);
      it(description, fn);
    });
  }
}

describe('Type', () => {
  it('Type is not a constructor', () => {
    assert.throws(() => {
      const type = new Type();
    });
  });

  describe('#name', () => {
    function* range (begin, end) {
      for (let i = begin; i < end; ++i) {
        yield i;
      }
    }
    Test.of(
      [null, 'null', 'null'],
      [undefined, 'undefined', 'undefined'],
      [12.43, 'number', 'Number'],
      ['abc', 'string', 'String'],
      [false, 'boolean', 'Boolean'],
      [new Date(), 'date', 'Date'],
      [() => 2, 'function', 'Function'],
      [{}, 'object', 'Object'],
      [[], 'array', 'Array'],
      [Promise.resolve(), 'promise', 'Promise'],
      [/xyz/, 'regexp', 'RegExp'],
      [Symbol(), 'symbol', 'Symbol'],
      [Array(5).keys(), 'array iterator', 'Array Iterator'],
      [range(1, 5), 'generator', 'Generator']
    ).check((arg, expect, detail) => [
      `${detail} should return "${expect}"`,
      () => {
        assert.strictEqual(Type.name(arg), expect);
      }
    ]);
  });

  describe('#isString', () => {
    Test.of(
      [null, false, 'null'],
      [undefined, false, 'undefined'],
      [12.43, false, 'Number'],
      ['abc', true, 'String'],
      [false, false, 'Boolean'],
      [new Date(), false, 'Date'],
      [() => 2, false, 'Function'],
      [{}, false, '{}'],
      [[], false, '[]'],
      [Promise.resolve(), false, 'Promise'],
      [/xyz/, false, 'RegExp'],
      [Symbol(), false, 'Symbol']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isString(arg), expect);
      }
    ]);
  });
  describe('#isObject', () => {
    Test.of(
      [null, false, 'null'],
      [undefined, false, 'undefined'],
      [12.43, false, 'Number'],
      ['abc', false, 'String'],
      [false, false, 'Boolean'],
      [new Date(), false, 'Date'],
      [() => 2, false, 'Function'],
      [{}, true, '{}'],
      [[], false, '[]'],
      [Promise.resolve(), false, 'Promise'],
      [/xyz/, false, 'RegExp'],
      [Symbol(), false, 'Symbol']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isObject(arg), expect);
      }
    ]);
  });
  describe('#isNumber', () => {
    Test.of(
      [null, false, 'null'],
      [[1, 2, 3], false, 'Array'],
      [12.43, true, 'Number']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isNumber(arg), expect);
      }
    ]);
  });
  describe('#isArray', () => {
    Test.of(
      [null, false, 'null'],
      [[1, 2, 3], true, 'Array'],
      [12.43, false, 'Number']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isArray(arg), expect);
      }
    ]);
  });
  describe('#isFunction', () => {
    Test.of(
      [null, false, 'null'],
      [[1, 2, 3], false, 'Array'],
      [12.43, false, 'Number'],
      [x => -x, true, 'Function']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isFunction(arg), expect);
      }
    ]);
  });
  describe('#isBoolean', () => {
    Test.of(
      [null, false, 'null'],
      [[1, 2, 3], false, 'Array'],
      [false, true, 'Boolean']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isBoolean(arg), expect);
      }
    ]);
  });
  describe('#isDate', () => {
    Test.of(
      [null, false, 'null'],
      [[1, 2, 3], false, 'Array'],
      [new Date(), true, 'Date']
    ).check((arg, expect, detail) => [
      `${detail} should return ${expect}`,
      () => {
        assert.strictEqual(Type.isDate(arg), expect);
      }
    ]);
  });
  it('#isNull');
  it('#isUndefined');
  it('#isRegExp');
  it('#isPromise');
  it('#isSymbol');
  it('#isGenerator');
  it('#isError');

  describe('#is', () => {
    Test.of(
      ['null', null, true, 'null'],
      ['undefined', undefined, true, 'undefined'],
      ['number|string', 12.43, true, 'Number'],
      ['object|array', 'abc', false, 'String']
    ).check((name, x, expect, detail) => [
      `${detail} in ${name} should return ${expect}`,
      () => {
        assert.strictEqual(Type.is(name, x), expect);
      }
    ]);
  });
  it('#isIterable');
  it('#isInteger');
  it('#isDecimal');
  it('#isNatural');
  it('#isPositiveInteger');
  it('#isFinite');

});
