class Type {
  constructor() {
    throw new TypeError('Type is not a constructor');
  }

  static name(x) {
    const toStr = Object.prototype.toString.call(x);
    const str = toStr.match(/\[object\s(.+)\]/);
    return str[1].toLowerCase();
  }

  static is(name, x) {
    const typeName = Type.name(x);
    if (name === 'string') {
      return typeName === name;
    }

    const checkTypes = (input => {
      if (Type.isString(name)) {
        return input.split('|');
      }
      return Array.from(input);
    })(name).map(str => str.toLowerCase());

    for (const checkType of checkTypes) {
      if (checkType === 'array' && Type.isArray(x)) {
        return true;
      } else if (checkType === typeName) {
        return true;
      }
    }
    return false;
  }

  static isArray(x) {
    return Array.isArray(x);
  }

  static isBoolean(x) {
    return Type.is('boolean', x);
  }

  static isString(x) {
    return Type.is('string', x);
  }

  static isNumber(x) {
    return Type.is('number', x);
  }

  static isFunction(x) {
    return Type.is('function', x);
  }

  static isObject(x) {
    return Type.is('object', x);
  }

  static isDate(x) {
    return Type.is('date', x);
  }

}

module.exports = Type;
