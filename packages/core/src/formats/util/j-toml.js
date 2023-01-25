/*!@preserve@license
 * 模块名称：j-toml
 * 模块功能：龙腾道为汤小明语写的实现。从属于“简计划”。
   　　　　　An implementation of TOML written by LongTengDao. Belong to "Plan J".
 * 模块版本：1.38.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-toml/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-toml/
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.TOML = factory()));
})(this, function () {
  'use strict';

  const version = '1.38.0';

  const SyntaxError$1 = SyntaxError;

  const RangeError$1 = RangeError;

  const TypeError$1 = TypeError;

  const Error$1 = { if: Error }.if;

  const undefined$1 = void null;

  const BigInt$1 = typeof BigInt === 'undefined' ? undefined$1 : BigInt;

  const RegExp$1 = RegExp;

  const WeakMap$1 = WeakMap;

  const get = WeakMap.prototype.get;

  const set = WeakMap.prototype.set;

  const create$1 = Object.create;

  const isSafeInteger = Number.isSafeInteger;

  const getOwnPropertyNames = Object.getOwnPropertyNames;

  const freeze = Object.freeze;

  const isPrototypeOf = Object.prototype.isPrototypeOf;

  const NULL =
    /* j-globals: null.prototype (internal) */
    Object.seal ? /*#__PURE__*/ Object.preventExtensions(Object.create(null)) : null;
    /* j-globals: null.prototype (internal) */

  const bind = Function.prototype.bind;

  const test = RegExp.prototype.test;

  const exec = RegExp.prototype.exec;

  const apply$1 = Reflect.apply;

  const Proxy$1 = Proxy;

  const toStringTag = typeof Symbol === 'undefined' ? undefined$1 : Symbol.toStringTag;

  const Object_defineProperty = Object.defineProperty;

  const assign$1 = Object.assign;

  const Object$1 = Object;

  const floor = Math.floor;

  const isArray$1 = Array.isArray;

  const Infinity = 1 / 0;

  const fromCharCode = String.fromCharCode;

  const Array$1 = Array;

  const hasOwnProperty = Object.prototype.hasOwnProperty;

  const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

  const apply = Function.prototype.apply;

  var isEnum = /*#__PURE__*/ propertyIsEnumerable.call.bind(propertyIsEnumerable);
  var hasOwn =
    /* j-globals: Object.hasOwn (polyfill) */
    Object$1.hasOwn ||
    /*#__PURE__*/ (function () {
      return hasOwnProperty.bind
        ? hasOwnProperty.call.bind(hasOwnProperty)
        : function hasOwn(object, key) {
            return hasOwnProperty.call(object, key);
          };
    })();
    /* j-globals: Object.hasOwn (polyfill) */

  var create = Object$1.create;
  function Descriptor(source) {
    var target = create(NULL);
    if (hasOwn(source, 'value')) {
      target.value = source.value;
    }
    if (hasOwn(source, 'writable')) {
      target.writable = source.writable;
    }
    if (hasOwn(source, 'get')) {
      target.get = source.get;
    }
    if (hasOwn(source, 'set')) {
      target.set = source.set;
    }
    if (hasOwn(source, 'enumerable')) {
      target.enumerable = source.enumerable;
    }
    if (hasOwn(source, 'configurable')) {
      target.configurable = source.configurable;
    }
    return target;
  }

  const Default =
    /* j-globals: default (internal) */
    function Default(exports, addOnOrigin) {
      if (!addOnOrigin && typeof exports !== 'function') {
        addOnOrigin = exports;
        exports = create$1(NULL);
      }
      if (assign$1) {
        assign$1(exports, addOnOrigin);
      } else {
        for (var key in addOnOrigin) {
          if (hasOwn(addOnOrigin, key)) {
            exports[key] = addOnOrigin[key];
          }
        }
      }
      exports.default = exports;
      if (typeof exports === 'function') {
        exports.prototype && freeze(exports.prototype);
      } else if (toStringTag) {
        var descriptor = create$1(NULL);
        descriptor.value = 'Module';
        Object_defineProperty(exports, toStringTag, descriptor);
      }
      return freeze(exports);
    };
    /* j-globals: default (internal) */

  /*!@preserve@license
     * 模块名称：j-regexp
     * 模块功能：可读性更好的正则表达式创建方式。从属于“简计划”。
       　　　　　More readable way for creating RegExp. Belong to "Plan J".
     * 模块版本：8.2.0
     * 许可条款：LGPL-3.0
     * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
     * 问题反馈：https://GitHub.com/LongTengDao/j-regexp/issues
     * 项目主页：https://GitHub.com/LongTengDao/j-regexp/
     */

  var Test = bind
    ? /*#__PURE__*/ bind.bind(test)
    : function (re) {
        return function (string) {
          return test.call(re, string);
        };
      };

  var Exec = bind
    ? /*#__PURE__*/ bind.bind(exec)
    : function (re) {
        return function (string) {
          return exec.call(re, string);
        };
      };

  function __PURE__(re) {
    var test = (re.test = Test(re));
    var exec = (re.exec = Exec(re));
    var source = (test.source = exec.source = re.source);
    test.unicode = exec.unicode = re.unicode;
    test.ignoreCase = exec.ignoreCase = re.ignoreCase;
    test.multiline = exec.multiline =
      source.indexOf('^') < 0 && source.indexOf('$') < 0 ? null : re.multiline;
    test.dotAll = exec.dotAll = source.indexOf('.') < 0 ? null : re.dotAll;
    return re;
  }
  function theRegExp(re) {
    return /*#__PURE__*/ __PURE__(re);
  }

  var NT = /[\n\t]+/g;
  var ESCAPE = /\\./g;
  function graveAccentReplacer($$) {
    return $$ === '\\`' ? '`' : $$;
  }

  var includes = ''.includes
    ? function (that, searchString) {
        return that.includes(searchString);
      }
    : function (that, searchString) {
        return that.indexOf(searchString) > -1;
      };

  function RE(template) {
    var U = this.U;
    var I = this.I;
    var M = this.M;
    var S = this.S;
    var raw = template.raw;
    var source = raw[0].replace(NT, '');
    var index = 1;
    var length = arguments.length;
    while (index !== length) {
      var value = arguments[index];
      if (typeof value === 'string') {
        source += value;
      } else {
        var value_source = value.source;
        if (typeof value_source !== 'string') {
          throw TypeError$1('source');
        }
        if (value.unicode === U) {
          throw SyntaxError$1('unicode');
        }
        if (value.ignoreCase === I) {
          throw SyntaxError$1('ignoreCase');
        }
        if (value.multiline === M && (includes(value_source, '^') || includes(value_source, '$'))) {
          throw SyntaxError$1('multiline');
        }
        if (value.dotAll === S && includes(value_source, '.')) {
          throw SyntaxError$1('dotAll');
        }
        source += value_source;
      }
      source += raw[index++].replace(NT, '');
    }
    var re = RegExp$1(
      U ? (source = source.replace(ESCAPE, graveAccentReplacer)) : source,
      this.flags,
    );
    var test = (re.test = Test(re));
    var exec = (re.exec = Exec(re));
    test.source = exec.source = source;
    test.unicode = exec.unicode = !U;
    test.ignoreCase = exec.ignoreCase = !I;
    test.multiline = exec.multiline = includes(source, '^') || includes(source, '$') ? !M : null;
    test.dotAll = exec.dotAll = includes(source, '.') ? !S : null;
    return re;
  }

  var RE_bind = bind && /*#__PURE__*/ bind.bind(RE);

  function Context(flags) {
    return {
      U: !includes(flags, 'u'),
      I: !includes(flags, 'i'),
      M: !includes(flags, 'm'),
      S: !includes(flags, 's'),
      flags: flags,
    };
  }

  var CONTEXT = /*#__PURE__*/ Context('');

  var newRegExp = Proxy$1
    ? /*#__PURE__*/ new Proxy$1(RE, {
        apply: function (RE, thisArg, args) {
          return apply$1(RE, CONTEXT, args);
        },
        get: function (RE, flags) {
          return RE_bind(Context(flags));
        },
        defineProperty: function () {
          return false;
        },
        preventExtensions: function () {
          return false;
        },
      })
    : /*#__PURE__*/ (function () {
        RE.apply = RE.apply;
        var newRegExp = function () {
          return RE.apply(CONTEXT, arguments);
        };
        var d = 1;
        var g = d * 2;
        var i = g * 2;
        var m = i * 2;
        var s = i * 2;
        var u = s * 2;
        var y = u * 2;
        var flags = y * 2 - 1;
        while (flags--) {
          (function (context) {
            newRegExp[context.flags] = function () {
              return RE.apply(context, arguments);
            };
          })(
            Context(
              (flags & d ? '' : 'd') +
                (flags & g ? '' : 'g') +
                (flags & i ? '' : 'i') +
                (flags & m ? '' : 'm') +
                (flags & s ? '' : 's') +
                (flags & u ? '' : 'u') +
                (flags & y ? '' : 'y'),
            ),
          );
        }
        return freeze ? freeze(newRegExp) : newRegExp;
      })();

  var clearRegExp =
    '$_' in RegExp$1
      ? /*#__PURE__*/ (function () {
          var REGEXP = /^/;
          REGEXP.test = REGEXP.test;
          return function clearRegExp(value) {
            REGEXP.test('');
            return value;
          };
        })()
      : function clearRegExp(value) {
          return value;
        };

  var clearRegExp$1 = clearRegExp;

  var NEED_TO_ESCAPE_IN_REGEXP = /^[$()*+\-.?[\\\]^{|]/;
  var SURROGATE_PAIR = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/;
  var GROUP = /*#__PURE__*/ create$1(NULL);

  function groupify(branches, uFlag, noEscape) {
    var group = create$1(NULL);
    var appendBranch = uFlag ? appendPointBranch : appendCodeBranch;
    for (var length = branches.length, index = 0; index < length; ++index) {
      appendBranch(group, branches[index]);
    }
    return sourcify(group, !noEscape);
  }
  function appendPointBranch(group, branch) {
    if (branch) {
      var character = SURROGATE_PAIR.test(branch) ? branch.slice(0, 2) : branch.charAt(0);
      appendPointBranch(
        group[character] || (group[character] = create$1(NULL)),
        branch.slice(character.length),
      );
    } else {
      group[''] = GROUP;
    }
  }

  function appendCodeBranch(group, branch) {
    if (branch) {
      var character = branch.charAt(0);
      appendCodeBranch(group[character] || (group[character] = create$1(NULL)), branch.slice(1));
    } else {
      group[''] = GROUP;
    }
  }

  function sourcify(group, needEscape) {
    var branches = [];
    var singleCharactersBranch = [];
    var noEmptyBranch = true;
    for (var character in group) {
      if (character) {
        var sub_branches = sourcify(group[character], needEscape);
        if (needEscape && NEED_TO_ESCAPE_IN_REGEXP.test(character)) {
          character = '\\' + character;
        }
        sub_branches
          ? branches.push(character + sub_branches)
          : singleCharactersBranch.push(character);
      } else {
        noEmptyBranch = false;
      }
    }
    singleCharactersBranch.length &&
      branches.unshift(
        singleCharactersBranch.length === 1
          ? singleCharactersBranch[0]
          : '[' + singleCharactersBranch.join('') + ']',
      );
    return branches.length === 0
      ? ''
      : (branches.length === 1 && (singleCharactersBranch.length || noEmptyBranch)
          ? branches[0]
          : '(?:' + branches.join('|') + ')') + (noEmptyBranch ? '' : '?');
  }

  /*¡ j-regexp */

  const WeakSet$1 = WeakSet;

  const has = WeakSet.prototype.has;

  const add = WeakSet.prototype.add;

  const del = WeakSet.prototype['delete'];

  const keys = Object.keys;

  const getOwnPropertySymbols = Object.getOwnPropertySymbols;

  const Null$1 =
    /* j-globals: null (internal) */
    /*#__PURE__*/ (function () {
      var assign =
        Object.assign ||
        function assign(target, source) {
          var keys$1, index, key;
          for (keys$1 = keys(source), index = 0; index < keys$1.length; ++index) {
            key = keys$1[index];
            target[key] = source[key];
          }
          if (getOwnPropertySymbols) {
            for (
              keys$1 = getOwnPropertySymbols(source), index = 0;
              index < keys$1.length;
              ++index
            ) {
              key = keys$1[index];
              if (isEnum(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
      function Nullify(constructor) {
        delete constructor.prototype.constructor;
        freeze(constructor.prototype);
        return constructor;
      }
      function Null(origin) {
        return origin === undefined$1
          ? this
          : typeof origin === 'function'
          ? /*#__PURE__*/ Nullify(origin)
          : /*#__PURE__*/ assign(/*#__PURE__*/ create(NULL), origin);
      }
      delete Null.name;
      //try { delete Null.length; } catch (error) {}
      Null.prototype = null;
      freeze(Null);
      return Null;
    })();
    /* j-globals: null (internal) */

  const is = Object.is;

  const Object_defineProperties = Object.defineProperties;

  const fromEntries = Object.fromEntries;

  const Reflect_construct = Reflect.construct;

  const Reflect_defineProperty = Reflect.defineProperty;

  const Reflect_deleteProperty = Reflect.deleteProperty;

  const ownKeys = Reflect.ownKeys;

  /*!@preserve@license
     * 模块名称：j-orderify
     * 模块功能：返回一个能保证给定对象的属性按此后添加顺序排列的 proxy，即使键名是 symbol，或整数 string。从属于“简计划”。
       　　　　　Return a proxy for given object, which can guarantee own keys are in setting order, even if the key name is symbol or int string. Belong to "Plan J".
     * 模块版本：7.0.1
     * 许可条款：LGPL-3.0
     * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
     * 问题反馈：https://GitHub.com/LongTengDao/j-orderify/issues
     * 项目主页：https://GitHub.com/LongTengDao/j-orderify/
     */

  const Keeper = () => [];

  const newWeakMap = () => {
    const weakMap = new WeakMap$1();
    weakMap.has = weakMap.has;
    weakMap.get = weakMap.get;
    weakMap.set = weakMap.set;
    return weakMap;
  };
  const target2keeper = /*#__PURE__*/ newWeakMap();

  const proxy2target = /*#__PURE__*/ newWeakMap();

  const target2proxy = /*#__PURE__*/ newWeakMap();

  const handlers = /*#__PURE__*/ assign$1(create$1(NULL), {
    defineProperty: (target, key, descriptor) => {
      if (hasOwn(target, key)) {
        return Reflect_defineProperty(target, key, assign$1(create$1(NULL), descriptor));
      }
      if (Reflect_defineProperty(target, key, assign$1(create$1(NULL), descriptor))) {
        const keeper = target2keeper.get(target);
        keeper[keeper.length] = key;
        return true;
      }
      return false;
    },
    deleteProperty: (target, key) => {
      if (Reflect_deleteProperty(target, key)) {
        const keeper = target2keeper.get(target);
        const index = keeper.indexOf(key);
        index < 0 || --keeper.copyWithin(index, index + 1).length;
        return true;
      }
      return false;
    },
    ownKeys: target => target2keeper.get(target),
    construct: (target, args, newTarget) => orderify(Reflect_construct(target, args, newTarget)),
    apply: (target, thisArg, args) => orderify(apply$1(target, thisArg, args)),
  });

  const newProxy = (target, keeper) => {
    target2keeper.set(target, keeper);
    const proxy = new Proxy$1(target, handlers);
    proxy2target.set(proxy, target);
    return proxy;
  };

  const orderify = object => {
    if (proxy2target.has(object)) {
      return object;
    }
    let proxy = target2proxy.get(object);
    if (proxy) {
      return proxy;
    }
    proxy = newProxy(object, assign$1(Keeper(), ownKeys(object)));
    target2proxy.set(object, proxy);
    return proxy;
  };

  const Null = /*#__PURE__*/ (function () {
    function throwConstructing() {
      throw TypeError$1(`Super constructor Null cannot be invoked with 'new'`);
    }
    function throwApplying() {
      throw TypeError$1(`Super constructor Null cannot be invoked without 'new'`);
    }
    const Nullify = constructor => {
      delete constructor.prototype.constructor;
      freeze(constructor.prototype);
      return constructor;
    };
    function Null(constructor) {
      return new.target
        ? new.target === Null
          ? /*#__PURE__*/ throwConstructing()
          : /*#__PURE__*/ newProxy(this, Keeper())
        : typeof constructor === 'function'
        ? /*#__PURE__*/ Nullify(constructor)
        : /*#__PURE__*/ throwApplying();
    }
    //@ts-ignore
    Null.prototype = null;
    Object_defineProperty(
      Null,
      'name',
      assign$1(create$1(NULL), { value: '', configurable: false }),
    );
    //delete Null.length;
    freeze(Null);
    return Null;
  })();

  /*¡ j-orderify */

  const map_has = WeakMap.prototype.has;

  const map_del = WeakMap.prototype['delete'];

  const INLINES = new WeakMap$1();
  const SECTIONS = new WeakSet$1();

  const deInline = /*#__PURE__*/ map_del.bind(INLINES);
  const deSection = /*#__PURE__*/ del.bind(SECTIONS);

  const isInline = /*#__PURE__*/ map_has.bind(INLINES);
  const ofInline = /*#__PURE__*/ get.bind(INLINES);

  const beInline = /*#__PURE__*/ set.bind(INLINES);

  const inline = (value, mode, looping) => {
    if (isArray$1(value)) {
      if (looping) {
        mode = 3;
      } else {
        if (mode === undefined$1) {
          mode = 3;
        } else if (mode !== 0 && mode !== 1 && mode !== 2 && mode !== 3) {
          throw typeof mode === 'number'
            ? RangeError$1(`array inline mode must be 0 | 1 | 2 | 3, not including ${mode}`)
            : TypeError$1(
                `array inline mode must be "number" type, not including ${
                  mode === null ? '"null"' : typeof mode
                }`,
              );
        }
      }
      beInline(value, mode);
    } else {
      beInline(value, true);
      deSection(value);
    }
    return value;
  };
  const multilineTable = value => {
    beInline(value, false);
    deSection(value);
    return value;
  };
  const multilineArray = value => {
    deInline(value);
    return value;
  };

  const isSection = /*#__PURE__*/ has.bind(SECTIONS);
  const beSection = /*#__PURE__*/ add.bind(SECTIONS);
  const Section = table => {
    if (isArray$1(table)) {
      throw TypeError$1(`array can not be section, maybe you want to use it on the tables in it`);
    }
    beSection(table);
    deInline(table);
    return table;
  };

  const INLINE = true;

  const tables = new WeakSet$1();
  const tables_add = /*#__PURE__*/ add.bind(tables);
  const isTable = /*#__PURE__*/ has.bind(tables);

  const implicitTables = new WeakSet$1();
  const implicitTables_add = /*#__PURE__*/ add.bind(implicitTables);
  const implicitTables_del = /*#__PURE__*/ del.bind(implicitTables);
  const directlyIfNot = table => {
    if (implicitTables_del(table)) {
      beSection(table);
      return true;
    }
    return false;
  };
  const DIRECTLY = true;
  const IMPLICITLY = false;

  const pairs = new WeakSet$1();
  const pairs_add = /*#__PURE__*/ add.bind(pairs);
  const fromPair = /*#__PURE__*/ has.bind(pairs);
  const PAIR = true;

  const PlainTable = /*#__PURE__*/ Null$1(
    class Table extends Null$1 {
      constructor(isDirect, isInline$fromPair) {
        super();
        tables_add(this);
        isDirect
          ? isInline$fromPair
            ? beInline(this, true)
            : beSection(this)
          : (isInline$fromPair ? pairs_add : implicitTables_add)(this);
        return this;
      }
    },
  );

  const OrderedTable = /*#__PURE__*/ Null$1(
    class Table extends Null {
      constructor(isDirect, isInline$fromPair) {
        super();
        tables_add(this);
        isDirect
          ? isInline$fromPair
            ? beInline(this, true)
            : beSection(this)
          : (isInline$fromPair ? pairs_add : implicitTables_add)(this);
        return this;
      }
    },
  );

  //import * as options from './options';

  const NONE = [];
  let sourcePath = '';
  let sourceLines = NONE;
  let lastLineIndex = -1;
  let lineIndex = -1;

  const throws = error => {
    //if ( sourceLines!==NONE ) { done(); options.clear(); }
    throw error;
  };

  const EOL = /\r?\n/;
  const todo = (source, path) => {
    if (typeof path !== 'string') {
      throw TypeError$1(`TOML.parse({ path })`);
    }
    sourcePath = path;
    sourceLines = source.split(EOL);
    lastLineIndex = sourceLines.length - 1;
    lineIndex = -1;
  };

  const next = () => sourceLines[++lineIndex];

  const rest = () => lineIndex !== lastLineIndex;

  class mark {
    lineIndex = lineIndex;
    type;
    restColumn;
    constructor(type, restColumn) {
      this.type = type;
      this.restColumn = restColumn;
      return this;
    }
    must() {
      lineIndex === lastLineIndex &&
        throws(
          SyntaxError$1(
            `${this.type} is not close until the end of the file` +
              where(
                ', which started from ',
                this.lineIndex,
                sourceLines[this.lineIndex].length - this.restColumn + 1,
              ),
          ),
        );
      return sourceLines[++lineIndex];
    }
    nowrap(argsMode) {
      throw throws(
        Error$1(
          `TOML.parse(${
            argsMode ? `${argsMode}multilineStringJoiner` : `,{ joiner }`
          }) must be passed, while the source including multi-line string` +
            where(
              ', which started from ',
              this.lineIndex,
              sourceLines[this.lineIndex].length - this.restColumn + 1,
            ),
        ),
      );
    }
  }
  const where = (pre, rowIndex = lineIndex, columnNumber = 0) =>
    sourceLines === NONE
      ? ''
      : sourcePath
      ? `\n    at (${sourcePath}:${rowIndex + 1}:${columnNumber})`
      : `${pre}line ${rowIndex + 1}: ${sourceLines[rowIndex]}`;

  const done = () => {
    sourcePath = '';
    sourceLines = NONE;
  };

  /* nested (readable) */

  const Whitespace = /[ \t]/;

  const PRE_WHITESPACE = /*#__PURE__*/ newRegExp`
      ^${Whitespace}+`.valueOf();

  const { exec: VALUE_REST_exec } = /*#__PURE__*/ newRegExp.s`
      ^
      (
        (?:\d\d\d\d-\d\d-\d\d \d)?
        [\w\-+.:]+
      )
      ${Whitespace}*
      (.*)
      $`.valueOf();

  const { exec: LITERAL_STRING_exec } = /*#__PURE__*/ newRegExp.s`
      ^
      '([^']*)'
      ${Whitespace}*
      (.*)`.valueOf();

  const { exec: MULTI_LINE_LITERAL_STRING_0_1_2 } = /*#__PURE__*/ newRegExp.s`
      ^
      (.*?)
      '''('{0,2})
      ${Whitespace}*
      (.*)`.valueOf();
  const { exec: MULTI_LINE_LITERAL_STRING_0 } = /*#__PURE__*/ newRegExp.s`
      ^
      (.*?)
      '''()
      ${Whitespace}*
      (.*)`.valueOf();
  let __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;

  const SYM_WHITESPACE = /*#__PURE__*/ newRegExp.s`
      ^
      .
      ${Whitespace}*`.valueOf();

  const Tag = /[^\x00-\x1F"#'()<>[\\\]`{}\x7F]+/;

  const { exec: KEY_VALUE_PAIR_exec } = /*#__PURE__*/ newRegExp.s`
      ^
      ${Whitespace}*
      =
      ${Whitespace}*
      (?:
        <(${Tag})>
        ${Whitespace}*
      )?
      (.*)
      $`.valueOf();

  const { exec: _VALUE_PAIR_exec } = /*#__PURE__*/ newRegExp.s`
      ^
      <(${Tag})>
      ${Whitespace}*
      (.*)
      $`.valueOf();

  const { exec: TAG_REST_exec } = /*#__PURE__*/ newRegExp.s`
      ^
      <(${Tag})>
      ${Whitespace}*
      (.*)
      $`.valueOf();

  /* optimized (avoid overflow or lost) */

  const MULTI_LINE_BASIC_STRING = theRegExp(/[^\\"]+|\\.?|"(?!"")"?/sy);
  const MULTI_LINE_BASIC_STRING_exec_0_length = _ => {
    let lastIndex = /*MULTI_LINE_BASIC_STRING.lastIndex = */ 0;
    while (MULTI_LINE_BASIC_STRING.test(_)) {
      lastIndex = MULTI_LINE_BASIC_STRING.lastIndex;
    }
    return lastIndex;
  };

  const ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______ =
    /[^\\\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g;
  const ESCAPED_EXCLUDE_CONTROL_CHARACTER__________ =
    /[^\\\x00-\x09\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g; /// Tab
  const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______ =
    /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g; /// Tab \<ws>newline
  const ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH =
    /[^\\\x00-\x09\x0B-\x1F]+|\\(?:[btnfr"\\/]|[\t ]*\n[\t\n ]*|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/g; /// not \<ws>newline
  let __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
  const ESCAPED_EXCLUDE_CONTROL_CHARACTER_test = _ =>
    !_.replace(__ESCAPED_EXCLUDE_CONTROL_CHARACTER, ''); /// op?

  const BASIC_STRING_TAB______ = theRegExp(
    /[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y,
  );
  const BASIC_STRING__________ = theRegExp(
    /[^\\"\x00-\x08\x0B-\x1F\x7F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y,
  ); /// Tab
  const BASIC_STRING_DEL______ = theRegExp(
    /[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y,
  ); /// Tab
  const BASIC_STRING_DEL_SLASH = theRegExp(
    /[^\\"\x00-\x08\x0B-\x1F]+|\\(?:[btnfr"\\/]|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/y,
  ); /// Tab
  let __BASIC_STRING = BASIC_STRING_DEL_SLASH;
  const BASIC_STRING_exec_1_endIndex = line => {
    let lastIndex = (__BASIC_STRING.lastIndex = 1);
    while (__BASIC_STRING.test(line)) {
      lastIndex = __BASIC_STRING.lastIndex;
    }
    (lastIndex !== line.length && line[lastIndex] === '"') ||
      throws(SyntaxError$1(`Bad basic string` + where(' at ')));
    return lastIndex;
  };

  const { test: IS_DOT_KEY } = theRegExp(/^[ \t]*\./);
  const DOT_KEY = /^[ \t]*\.[ \t]*/;
  const { exec: BARE_KEY_STRICT } = theRegExp(/^[\w-]+/);
  const { exec: BARE_KEY_FREE } = theRegExp(/^[^ \t#=[\]'".]+(?:[ \t]+[^ \t#=[\]'".]+)*/);
  let __BARE_KEY_exec = BARE_KEY_FREE;
  const { exec: LITERAL_KEY____ } = theRegExp(/^'[^'\x00-\x08\x0B-\x1F\x7F]*'/);
  const { exec: LITERAL_KEY_DEL } = theRegExp(/^'[^'\x00-\x08\x0B-\x1F]*'/);
  let __LITERAL_KEY_exec = LITERAL_KEY_DEL;
  let supportArrayOfTables = true;

  const TABLE_DEFINITION_exec_groups = (lineRest, parseKeys) => {
    const asArrayItem = lineRest[1] === '[';
    if (asArrayItem) {
      supportArrayOfTables ||
        throws(
          SyntaxError$1(`Array of Tables is not allowed before TOML v0.2` + where(', which at ')),
        );
      lineRest = lineRest.slice(2);
    } else {
      lineRest = lineRest.slice(1);
    }
    lineRest = lineRest.replace(PRE_WHITESPACE, '');
    const { leadingKeys, finalKey } = ({ lineRest } = parseKeys(lineRest));
    lineRest = lineRest.replace(PRE_WHITESPACE, '');
    (lineRest && lineRest[0] === ']') ||
      throws(SyntaxError$1(`Table header is not closed` + where(', which is found at ')));
    (lineRest.length > 1 ? (lineRest[1] === ']') === asArrayItem : !asArrayItem) ||
      throws(
        SyntaxError$1(`Square brackets of Table definition statement not match` + where(' at ')),
      );
    lineRest = lineRest.slice(asArrayItem ? 2 : 1).replace(PRE_WHITESPACE, '');
    let tag;
    if (lineRest && lineRest[0] === '<') {
      ({ 1: tag, 2: lineRest } =
        TAG_REST_exec(lineRest) || throws(SyntaxError$1(`Bad tag` + where(' at '))));
    } else {
      tag = '';
    }
    return { leadingKeys, finalKey, asArrayItem, tag, lineRest };
  };

  const KEY_VALUE_PAIR_exec_groups = ({ leadingKeys, finalKey, lineRest }) => {
    const { 1: tag = '' } = ({ 2: lineRest } =
      KEY_VALUE_PAIR_exec(lineRest) ||
      throws(SyntaxError$1(`Keys must equal something` + where(', but missing at '))));
    tag ||
      (lineRest && lineRest[0] !== '#') ||
      throws(
        SyntaxError$1(`Value can not be missing after euqal sign` + where(', which is found at ')),
      );
    return { leadingKeys, finalKey, tag, lineRest };
  };

  const { test: CONTROL_CHARACTER_EXCLUDE_TAB____ } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]/);
  const { test: CONTROL_CHARACTER_EXCLUDE_TAB_DEL } = theRegExp(/[\x00-\x08\x0B-\x1F]/);
  let __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;

  const switchRegExp = specificationVersion => {
    switch (specificationVersion) {
      case 1.0:
        __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0_1_2;
        __LITERAL_KEY_exec = LITERAL_KEY____;
        __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
        __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_TAB______;
        __BASIC_STRING = BASIC_STRING_TAB______;
        __BARE_KEY_exec = BARE_KEY_STRICT;
        supportArrayOfTables = true;
        break;
      case 0.5:
        __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
        __LITERAL_KEY_exec = LITERAL_KEY____;
        __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB____;
        __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER__________;
        __BASIC_STRING = BASIC_STRING__________;
        __BARE_KEY_exec = BARE_KEY_STRICT;
        supportArrayOfTables = true;
        break;
      case 0.4:
        __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
        __LITERAL_KEY_exec = LITERAL_KEY_DEL;
        __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
        __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL______;
        __BASIC_STRING = BASIC_STRING_DEL______;
        __BARE_KEY_exec = BARE_KEY_STRICT;
        supportArrayOfTables = true;
        break;
      default:
        __MULTI_LINE_LITERAL_STRING_exec = MULTI_LINE_LITERAL_STRING_0;
        __LITERAL_KEY_exec = LITERAL_KEY_DEL;
        __CONTROL_CHARACTER_EXCLUDE_test = CONTROL_CHARACTER_EXCLUDE_TAB_DEL;
        __ESCAPED_EXCLUDE_CONTROL_CHARACTER = ESCAPED_EXCLUDE_CONTROL_CHARACTER_DEL_SLASH;
        __BASIC_STRING = BASIC_STRING_DEL_SLASH;
        __BARE_KEY_exec = BARE_KEY_FREE;
        supportArrayOfTables = false;
    }
  };

  const NUM = /*#__PURE__*/ newRegExp`
      (?:
        0
        (?:
          b[01][_01]*
        |
          o[0-7][_0-7]*
        |
          x[\dA-Fa-f][_\dA-Fa-f]*
        |
          (?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
        )
      |
        [1-9][_\d]*
        (?:\.\d[_\d]*)?(?:[Ee]-?\d[_\d]*)?
      |
        inf
      |
        nan
      )
    `.valueOf();
  const { test: IS_AMAZING } = /*#__PURE__*/ newRegExp`
      ^(?:
        -?${NUM}
        (?:-${NUM})*
      |
        true
      |
        false
      )$
    `.valueOf();
  const { test: BAD_DXOB } = /*#__PURE__*/ newRegExp`_(?![\dA-Fa-f])`.valueOf();
  const isAmazing = keys => IS_AMAZING(keys) && !BAD_DXOB(keys);

  let mustScalar = true;

  let ARGS_MODE = '';

  /* options */

  let useWhatToJoinMultilineString = null;
  let usingBigInt = true;
  let IntegerMinNumber = 0;
  let IntegerMaxNumber = 0;

  const ANY = {
    test: () => true,
  };

  const Keys = class KeysRegExp extends RegExp$1 {
    constructor(keys) {
      super(`^${groupify(keys)}$`);
      let maxLength = -1;
      for (let index = keys.length; index; ) {
        const { length } = keys[--index];
        if (length > maxLength) {
          maxLength = length;
        }
      }
      this.lastIndex = maxLength + 1;
      return this;
    }
    test(key) {
      return key.length < this.lastIndex && super.test(key);
    }
  };
  const isKeys = /*#__PURE__*/ isPrototypeOf.bind(/*#__PURE__*/ freeze(Keys.prototype));
  let KEYS$1 = ANY;
  let preserveLiteral;
  let zeroDatetime;
  let inlineTable;
  let moreDatetime;
  let disallowEmptyKey;
  //export const xob :boolean = true;
  let sError;
  let sFloat;

  let Table;
  let allowLonger;
  let enableNull;
  let allowInlineTableMultilineAndTrailingCommaEvenNoComma;
  let preserveComment;
  let disableDigit;
  const arrayTypes = new WeakMap$1();
  const arrayTypes_get = /*#__PURE__*/ get.bind(arrayTypes);
  const arrayTypes_set = /*#__PURE__*/ set.bind(arrayTypes);

  const As = () => {
    const as = array => {
      const got = arrayTypes_get(array);
      got
        ? got === as || throws(TypeError$1(`Types in Array must be same` + where('. Check ')))
        : arrayTypes_set(array, as);
      return array;
    };
    return as;
  };
  const AS_TYPED = {
    asNulls: As(),
    asStrings: As(),
    asTables: As(),
    asArrays: As(),
    asBooleans: As(),
    asFloats: As(),
    asIntegers: As(),
    asOffsetDateTimes: As(),
    asLocalDateTimes: As(),
    asLocalDates: As(),
    asLocalTimes: As(),
  };
  const asMixed = array => array;
  let asNulls,
    asStrings,
    asTables,
    asArrays,
    asBooleans,
    asFloats,
    asIntegers,
    asOffsetDateTimes,
    asLocalDateTimes,
    asLocalDates,
    asLocalTimes;

  let processor = null;
  let each = null;

  const collect_on = (tag, array, table, key) => {
    const _each = create$1(NULL);
    _each._linked = each;
    _each.tag = tag;
    if (table) {
      _each.table = table;
      _each.key = key;
    }
    if (array) {
      _each.array = array;
      _each.index = array.length;
    }
    each = _each;
  };
  const collect_off = () => {
    throw throws(
      SyntaxError$1(`xOptions.tag is not enabled, but found tag syntax` + where(' at ')),
    );
  };
  let collect = collect_off;

  const Process = () => {
    if (each) {
      const _processor = processor;
      let _each = each;
      each = null;
      return () => {
        const processor = _processor;
        let each = _each;
        _each = null;
        do {
          processor(each);
        } while ((each = each._linked));
      };
    }
    return null;
  };

  /* use & clear */

  const clear = () => {
    KEYS$1 = ANY;
    useWhatToJoinMultilineString = processor = each = null;
    zeroDatetime = false;
  };

  const use = (
    specificationVersion,
    multilineStringJoiner,
    useBigInt,
    keys,
    xOptions,
    argsMode,
  ) => {
    ARGS_MODE = argsMode;

    let mixed;
    switch (specificationVersion) {
      case 1.0:
        mustScalar = mixed = moreDatetime = sFloat = inlineTable = true;
        zeroDatetime = disallowEmptyKey = false;
        break;
      case 0.5:
        mustScalar = moreDatetime = sFloat = inlineTable = true;
        mixed = zeroDatetime = disallowEmptyKey = false;
        break;
      case 0.4:
        mustScalar = disallowEmptyKey = inlineTable = true;
        mixed = zeroDatetime = moreDatetime = sFloat = false;
        break;
      case 0.3:
        mustScalar = disallowEmptyKey = true;
        mixed = zeroDatetime = moreDatetime = sFloat = inlineTable = false;
        break;
      case 0.2:
        zeroDatetime = disallowEmptyKey = true;
        mustScalar = mixed = moreDatetime = sFloat = inlineTable = false;
        break;
      case 0.1:
        zeroDatetime = disallowEmptyKey = true;
        mustScalar = mixed = moreDatetime = sFloat = inlineTable = false;
        break;
      default:
        throw RangeError$1(`TOML.parse(,specificationVersion)`);
    }
    switchRegExp(specificationVersion);

    if (typeof multilineStringJoiner === 'string') {
      useWhatToJoinMultilineString = multilineStringJoiner;
    } else if (multilineStringJoiner === undefined$1) {
      useWhatToJoinMultilineString = null;
    } else {
      throw TypeError$1(
        `TOML.parse(${ARGS_MODE ? `${ARGS_MODE}multilineStringJoiner` : `,{ joiner }`})`,
      );
    }

    if (useBigInt === undefined$1 || useBigInt === true) {
      usingBigInt = true;
    } else if (useBigInt === false) {
      usingBigInt = false;
    } else {
      if (typeof useBigInt !== 'number') {
        throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`})`);
      }
      if (!isSafeInteger(useBigInt)) {
        throw RangeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`})`);
      }
      usingBigInt = null;
      useBigInt >= 0
        ? (IntegerMinNumber = -(IntegerMaxNumber = useBigInt))
        : (IntegerMaxNumber = -(IntegerMinNumber = useBigInt) - 1);
    }
    if (!BigInt$1 && usingBigInt !== false) {
      throw Error$1(
        `Can't work without TOML.parse(${
          ARGS_MODE ? `${ARGS_MODE},useBigInt` : `,{ bigint }`
        }) being set to false, because the host doesn't have BigInt support`,
      );
    }

    if (keys == null) {
      KEYS$1 = ANY;
    } else {
      if (!isKeys(keys)) {
        throw TypeError$1(`TOML.parse(,{ keys })`);
      }
      KEYS$1 = keys;
    }

    if (xOptions == null) {
      Table = PlainTable;
      sError =
        allowLonger =
        enableNull =
        allowInlineTableMultilineAndTrailingCommaEvenNoComma =
          false;
      collect = collect_off;
    } else if (typeof xOptions !== 'object') {
      throw TypeError$1(`TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,xOptions` : `,{ x }`})`);
    } else {
      const {
        order,
        longer,
        exact,
        null: _null,
        multi,
        comment,
        string,
        literal,
        tag,
        ...unknown
      } = xOptions;
      const unknownNames = getOwnPropertyNames(unknown);
      if (unknownNames.length) {
        throw TypeError$1(
          `TOML.parse(${
            ARGS_MODE
              ? `${ARGS_MODE},,{ ${unknownNames.join(', ')} }`
              : `,{ x: { ${unknownNames.join(', ')} } }`
          })`,
        );
      }
      Table = order ? OrderedTable : PlainTable;
      allowLonger = !longer;
      sError = !!exact;
      enableNull = !!_null;
      allowInlineTableMultilineAndTrailingCommaEvenNoComma = !!multi;
      preserveComment = !!comment;
      disableDigit = !!string;
      preserveLiteral = !!literal;
      if (tag) {
        if (typeof tag !== 'function') {
          throw TypeError$1(
            `TOML.parse(${ARGS_MODE ? `${ARGS_MODE},,{ tag }` : `,{ x: { tag } }`})`,
          );
        }
        if (!mixed) {
          throw TypeError$1(
            `TOML.parse(${
              ARGS_MODE ? `${ARGS_MODE},,xOptions` : `,{ x }`
            }) xOptions.tag needs at least TOML 1.0 to support mixed type array`,
          );
        }
        processor = tag;
        collect = collect_on;
      } else {
        collect = collect_off;
      }
    }

    mixed
      ? (asNulls =
          asStrings =
          asTables =
          asArrays =
          asBooleans =
          asFloats =
          asIntegers =
          asOffsetDateTimes =
          asLocalDateTimes =
          asLocalDates =
          asLocalTimes =
            asMixed)
      : ({
          asNulls,
          asStrings,
          asTables,
          asArrays,
          asBooleans,
          asFloats,
          asIntegers,
          asOffsetDateTimes,
          asLocalDateTimes,
          asLocalDates,
          asLocalTimes,
        } = AS_TYPED);
  };

  const isView = ArrayBuffer.isView;

  const isArrayBuffer =
    /* j-globals: class.isArrayBuffer (internal) */
    /*#__PURE__*/ (function () {
      if (typeof ArrayBuffer === 'function') {
        var byteLength_apply = apply.bind(
          Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get,
        );
        return function isArrayBuffer(value) {
          try {
            byteLength_apply(value);
          } catch (error) {
            return false;
          }
          return true;
        };
      }
      return function isArrayBuffer() {
        return false;
      };
    })();
    /* j-globals: class.isArrayBuffer (internal) */

  const TextDecoder$1 = TextDecoder;

  const Symbol$1 = Symbol;

  const previous = Symbol$1('previous');

  const x = rootStack => {
    let stack = rootStack;
    let result = stack.next();
    if (!result.done) {
      result.value[previous] = stack;
      result = (stack = result.value).next();
      for (;;) {
        if (result.done) {
          if (stack === rootStack) {
            break;
          }
          stack = stack[previous];
          result = stack.next(result.value);
        } else {
          result.value[previous] = stack;
          result = (stack = result.value).next();
        }
      }
    }
    return result.value;
  };

  const _literal = Symbol$1('_literal');

  const LiteralObject = (literal, value) => {
    const object = Object$1(value);
    object[_literal] = literal;
    return object;
  };

  const arrays = new WeakSet$1();
  const arrays_add = /*#__PURE__*/ add.bind(arrays);
  const isArray = /*#__PURE__*/ has.bind(arrays);

  const OF_TABLES = false;
  const STATICALLY = true;
  const staticalArrays = new WeakSet$1();
  const staticalArrays_add = /*#__PURE__*/ add.bind(staticalArrays);
  const isStatic = /*#__PURE__*/ has.bind(staticalArrays);

  const newArray = isStatic => {
    const array = [];
    arrays_add(array);
    isStatic && staticalArrays_add(array);
    return array;
  };

  const NativeDate = Date;

  const parse$2 = Date.parse;

  const preventExtensions = Object.preventExtensions;

  const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

  const defineProperties =
    /* j-globals: null.defineProperties (internal) */
    function defineProperties(object, descriptorMap) {
      var created = create$1(NULL);
      var names = keys(descriptorMap);
      for (var length = names.length, index = 0; index < length; ++index) {
        var name = names[index];
        created[name] = Descriptor(descriptorMap[name]);
      }
      if (getOwnPropertySymbols) {
        var symbols = getOwnPropertySymbols(descriptorMap);
        for (length = symbols.length, index = 0; index < length; ++index) {
          var symbol = symbols[index];
          if (isEnum(descriptorMap, symbol)) {
            created[symbol] = Descriptor(descriptorMap[symbol]);
          }
        }
      }
      return Object_defineProperties(object, created);
    };
    /* j-globals: null.defineProperties (internal) */

  const fpc = c => {
    freeze(freeze(c).prototype);
    return c;
  };

  const _29_ = /(?:0[1-9]|1\d|2\d)/;
  const _30_ = /(?:0[1-9]|[12]\d|30)/;
  const _31_ = /(?:0[1-9]|[12]\d|3[01])/;
  const _23_ = /(?:[01]\d|2[0-3])/;
  const _59_ = /[0-5]\d/;

  const YMD = /*#__PURE__*/ newRegExp`
      \d\d\d\d-
      (?:
        0
        (?:
          [13578]-${_31_}
          |
          [469]-${_30_}
          |
          2-${_29_}
        )
        |
        1
        (?:
          [02]-${_31_}
          |
          1-${_30_}
        )
      )
    `.valueOf();

  const HMS = /*#__PURE__*/ newRegExp`
      ${_23_}:${_59_}:${_59_}
    `.valueOf();

  const OFFSET$ = /(?:[Zz]|[+-]\d\d:\d\d)$/;

  const { exec: Z_exec } = theRegExp(/(([+-])\d\d):(\d\d)$/);

  const { exec: OFFSET_DATETIME_exec } = /*#__PURE__*/ newRegExp`
      ^
      ${YMD}
      [Tt ]
      ${HMS}
      (?:\.\d{1,3}(\d*?)0*)?
      (?:[Zz]|[+-]${_23_}:${_59_})
      $`.valueOf();

  const { exec: OFFSET_DATETIME_ZERO_exec } = /*#__PURE__*/ newRegExp`
      ^
      ${YMD}
      [Tt ]
      ${HMS}
      ()
      [Zz]
      $`.valueOf();

  const { test: IS_LOCAL_DATETIME } = /*#__PURE__*/ newRegExp`
      ^
      ${YMD}
      [Tt ]
      ${HMS}
      (?:\.\d+)?
      $`.valueOf();

  const { test: IS_LOCAL_DATE } = /*#__PURE__*/ newRegExp`
      ^
      ${YMD}
      $`.valueOf();

  const { test: IS_LOCAL_TIME } = /*#__PURE__*/ newRegExp`
      ^
      ${HMS}
      (?:\.\d+)?
      $`.valueOf();

  const T = /[ t]/;
  const DELIMITER_DOT = /[-T:.]/g;
  const DOT_ZERO = /\.?0+$/;
  const ZERO = /\.(\d*?)0+$/;
  const zeroReplacer = (match, p1) => p1;

  const Datetime = /*#__PURE__*/ (() => {
    const Datetime = function () {
      return this;
    }; //expression? :undefined, literal? :undefined, dotValue? :undefined
    //                                > .setTime()
    //                                > .getTime() : Date.parse('T')
    // [Symbol.toPrimitive]('number') > .valueOf()
    //                                > .toISOString()
    const descriptors = Null$1(null);
    {
      const descriptor = Null$1(null);
      for (const key of ownKeys(NativeDate.prototype)) {
        key === 'constructor' || key === 'toJSON' || (descriptors[key] = descriptor);
      }
    }
    Datetime.prototype = preventExtensions(create$1(NativeDate.prototype, descriptors));
    return freeze(Datetime);
  })();

  const Value = ISOString => ISOString.replace(ZERO, zeroReplacer).replace(DELIMITER_DOT, '');

  const d = /./gs;
  const d2u = d => '\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009'[d];
  const ValueOFFSET = (time, more) =>
    time < 0
      ? ('' + (time + 62167305540000)).replace(d, d2u).padStart(14, '\u2000') +
        more.replace(d, d2u) +
        time
      : more
      ? (time + '.').padStart(16, '0') + more
      : ('' + time).padStart(15, '0');

  const validateLeap = literal => {
    if (literal.startsWith('02-29', 5)) {
      const year = +literal.slice(0, 4);
      return year & 0b11
        ? false
        : year % 100
        ? true
        : year % 400
        ? false
        : year % 3200
        ? true
        : false;
    }
    return true;
  };
  const { test: VALIDATE_LEAP } =
    /*#__PURE__*/ newRegExp.s`^.....(?:06.30|12.31).23:59:59`.valueOf();

  const DATE$1 = /*#__PURE__*/ defineProperties(
    new NativeDate(0),
    /*#__PURE__*/ getOwnPropertyDescriptors(NativeDate.prototype),
  );

  const OffsetDateTime_ISOString = Symbol$1('OffsetDateTime_ISOString');
  const OffsetDateTime_value = Symbol$1('OffsetDateTime_value');
  const OffsetDateTime_use = (that, $ = 0) => {
    DATE$1.setTime(+that[OffsetDateTime_value] + $);
    return DATE$1;
  };
  /*const OffsetDateTime_get = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number) => +that[OffsetDateTime_ISOString].slice(start, end);
    const OffsetDateTime_set = (that :InstanceType<typeof OffsetDateTime>, start :number, end :number, value :number, reserveMore :boolean) => {
      if ( end ) {
        const string = '' + value;
        const size = end - start;
        if ( string.length>size ) { throw RangeError(); }///
        that[OffsetDateTime_ISOString] = that[OffsetDateTime_ISOString].slice(0, start) + string.padStart(size, '0') + that[OffsetDateTime_ISOString].slice(end);
      }
      const time = parse(that[OffsetDateTime_ISOString]);
      return that[OffsetDateTime_value] = ValueOFFSET(time, that[OffsetDateTime_value].includes('-')
        ? that[OffsetDateTime_value].slice(14, that[OffsetDateTime_value].indexOf('-', 14))
        : that[OffsetDateTime_value].slice(15)
      );///time
    };*/ //
  const OffsetDateTime = /*#__PURE__*/ fpc(
    class OffsetDateTime extends Datetime {
      [OffsetDateTime_ISOString];
      [OffsetDateTime_value];

      get [Symbol$1.toStringTag]() {
        return 'OffsetDateTime';
      }

      valueOf() {
        return this[OffsetDateTime_value];
      }
      toISOString() {
        return this[OffsetDateTime_ISOString];
      }

      constructor(literal) {
        validateLeap(literal) ||
          throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
        const with60 = literal.startsWith('60', 17);
        let without60 = with60 ? literal.slice(0, 17) + '59' + literal.slice(19) : literal;
        const { 1: more = '' } =
          (zeroDatetime ? OFFSET_DATETIME_ZERO_exec(without60) : OFFSET_DATETIME_exec(without60)) ||
          throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
        const time = parse$2((without60 = without60.replace(T, 'T').replace('z', 'Z')));
        if (with60) {
          DATE$1.setTime(time);
          VALIDATE_LEAP(DATE$1.toISOString()) ||
            throws(SyntaxError$1(`Invalid Offset Date-Time ${literal}` + where(' at ')));
        }
        super();
        this[OffsetDateTime_ISOString] = without60;
        this[OffsetDateTime_value] = ValueOFFSET(time, more);
        return this;
      }

      getUTCFullYear() {
        return OffsetDateTime_use(this).getUTCFullYear();
      }
      ///get year () :FullYear { return OffsetDateTime_get(this, 0, 4); }
      ///set year (value :FullYear) { OffsetDateTime_set(this, 0, 4, value, true); }
      getUTCMonth() {
        return OffsetDateTime_use(this).getUTCMonth();
      }
      ///get month () { return OffsetDateTime_get(this, 5, 7); }
      ///set month (value) { OffsetDateTime_set(this, 5, 7, value, true); }
      getUTCDate() {
        return OffsetDateTime_use(this).getUTCDate();
      }
      ///get day () :Date { return OffsetDateTime_get(this, 8, 10); }
      ///set day (value :Date) { OffsetDateTime_set(this, 8, 10, value, true); }

      getUTCHours() {
        return OffsetDateTime_use(this).getUTCHours();
      }
      ///get hour () :Hours { return OffsetDateTime_get(this, 11, 13); }
      ///set hour (value :Hours) { OffsetDateTime_set(this, 11, 13, value, true); }
      getUTCMinutes() {
        return OffsetDateTime_use(this).getUTCMinutes();
      }
      ///get minute () :Minutes { return OffsetDateTime_get(this, 14, 16); }
      ///set minute (value :Minutes) { OffsetDateTime_set(this, 14, 16, value, true); }
      getUTCSeconds() {
        return OffsetDateTime_use(this).getUTCSeconds();
      }
      ///get second () :Seconds { return OffsetDateTime_get(this, 17, 19); }
      ///set second (value :Seconds) { OffsetDateTime_set(this, 17, 19, value, true); }
      getUTCMilliseconds() {
        return OffsetDateTime_use(this).getUTCMilliseconds();
      } ///
      ///get millisecond () :Milliseconds { return this[OffsetDateTime_value]%1000; }///
      /*set millisecond (value :Milliseconds) {
        this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, 19) + ( value ? ( '.' + ( '' + value ).padStart(3, '0') ).replace(DOT_ZERO, '') : '' ) + this[OffsetDateTime_ISOString].slice(this[OffsetDateTime_ISOString].search(OFFSET$));
        OffsetDateTime_set(this, 0, 0, 0, false);
      }*/ //
      ///get microsecond () :Milliseconds
      ///set microsecond (value :Milliseconds)
      ///get nanosecond () :Milliseconds
      ///set nanosecond (value :Milliseconds)

      getUTCDay() {
        return OffsetDateTime_use(this).getUTCDay();
      }
      ///get dayOfWeek () { return OffsetDateTime_use(this, this.getTimezoneOffset()*60000).getUTCDay() || 7; }
      getTimezoneOffset() {
        const z = Z_exec(this[OffsetDateTime_ISOString]);
        return z ? +z[1] * 60 + +(z[2] + z[3]) : 0;
      }
      ///get offset () { return this[OffsetDateTime_ISOString].endsWith('Z') ? 'Z' : this[OffsetDateTime_ISOString].slice(-6); }
      /*set offset (value) {
        this[OffsetDateTime_ISOString] = this[OffsetDateTime_ISOString].slice(0, this[OffsetDateTime_ISOString].endsWith('Z') ? -1 : -6) + value;
        OffsetDateTime_set(this, 0, 0, 0, true);
      }*/ //
      getTime() {
        return floor(+this[OffsetDateTime_value]);
      } ///
      /*setTime (this :OffsetDateTime, value :Time) :void {
        value = DATE.setTime(value);
        const z = Z_exec(this[OffsetDateTime_ISOString]);
        DATE.setTime(value + ( z ? +z[1]*60 + +( z[2] + z[3] ) : 0 )*60000);
        this[OffsetDateTime_ISOString] = z ? DATE.toISOString().slice(0, -1) + z[0] : DATE.toISOString();
        this[OffsetDateTime_value] = ValueOFFSET(value, '');
        ///return value;
      }*/
    },
  );

  const LocalDateTime_ISOString = Symbol$1('LocalDateTime_ISOString');
  const LocalDateTime_value = Symbol$1('LocalDateTime_value');
  const LocalDateTime_get = (that, start, end) => +that[LocalDateTime_ISOString].slice(start, end);
  const LocalDateTime_set = (that, start, end, value) => {
    const string = '' + value;
    const size = end - start;
    if (string.length > size) {
      throw RangeError$1();
    } ///
    that[LocalDateTime_value] = Value(
      (that[LocalDateTime_ISOString] =
        that[LocalDateTime_ISOString].slice(0, start) +
        string.padStart(size, '0') +
        that[LocalDateTime_ISOString].slice(end)),
    );
  };
  const LocalDateTime = /*#__PURE__*/ fpc(
    class LocalDateTime extends Datetime {
      [LocalDateTime_ISOString];
      [LocalDateTime_value];

      get [Symbol$1.toStringTag]() {
        return 'LocalDateTime';
      }

      valueOf() {
        return this[LocalDateTime_value];
      }
      toISOString() {
        return this[LocalDateTime_ISOString];
      }

      constructor(literal) {
        (IS_LOCAL_DATETIME(literal) && validateLeap(literal)) ||
          throws(SyntaxError$1(`Invalid Local Date-Time ${literal}` + where(' at ')));
        super();
        this[LocalDateTime_value] = Value(
          (this[LocalDateTime_ISOString] = literal.replace(T, 'T')),
        );
        return this;
      }

      getFullYear() {
        return LocalDateTime_get(this, 0, 4);
      }
      setFullYear(value) {
        LocalDateTime_set(this, 0, 4, value);
      }
      getMonth() {
        return LocalDateTime_get(this, 5, 7) - 1;
      }
      setMonth(value) {
        LocalDateTime_set(this, 5, 7, value + 1);
      }
      getDate() {
        return LocalDateTime_get(this, 8, 10);
      }
      setDate(value) {
        LocalDateTime_set(this, 8, 10, value);
      }

      getHours() {
        return LocalDateTime_get(this, 11, 13);
      }
      setHours(value) {
        LocalDateTime_set(this, 11, 13, value);
      }
      getMinutes() {
        return LocalDateTime_get(this, 14, 16);
      }
      setMinutes(value) {
        LocalDateTime_set(this, 14, 16, value);
      }
      getSeconds() {
        return LocalDateTime_get(this, 17, 19);
      }
      setSeconds(value) {
        LocalDateTime_set(this, 17, 19, value);
      }
      getMilliseconds() {
        return +this[LocalDateTime_value].slice(14, 17).padEnd(3, '0');
      } ///
      setMilliseconds(value) {
        this[LocalDateTime_value] = Value(
          (this[LocalDateTime_ISOString] =
            this[LocalDateTime_ISOString].slice(0, 19) +
            (value ? ('.' + ('' + value).padStart(3, '0')).replace(DOT_ZERO, '') : '')),
        );
      }
    },
  );

  const LocalDate_ISOString = Symbol$1('LocalDate_ISOString');
  const LocalDate_value = Symbol$1('LocalDate_value');
  const LocalDate_get = (that, start, end) => +that[LocalDate_ISOString].slice(start, end);
  const LocalDate_set = (that, start, end, value) => {
    const string = '' + value;
    const size = end - start;
    if (string.length > size) {
      throw RangeError$1();
    } ///
    that[LocalDate_value] = Value(
      (that[LocalDate_ISOString] =
        that[LocalDate_ISOString].slice(0, start) +
        string.padStart(size, '0') +
        that[LocalDate_ISOString].slice(end)),
    );
  };
  const LocalDate = /*#__PURE__*/ fpc(
    class LocalDate extends Datetime {
      [LocalDate_ISOString];
      [LocalDate_value];

      get [Symbol$1.toStringTag]() {
        return 'LocalDate';
      }

      valueOf() {
        return this[LocalDate_value];
      }
      toISOString() {
        return this[LocalDate_ISOString];
      }

      constructor(literal) {
        (IS_LOCAL_DATE(literal) && validateLeap(literal)) ||
          throws(SyntaxError$1(`Invalid Local Date ${literal}` + where(' at ')));
        super();
        this[LocalDate_value] = Value((this[LocalDate_ISOString] = literal));
        return this;
      }

      getFullYear() {
        return LocalDate_get(this, 0, 4);
      }
      setFullYear(value) {
        LocalDate_set(this, 0, 4, value);
      }
      getMonth() {
        return LocalDate_get(this, 5, 7) - 1;
      }
      setMonth(value) {
        LocalDate_set(this, 5, 7, value + 1);
      }
      getDate() {
        return LocalDate_get(this, 8, 10);
      }
      setDate(value) {
        LocalDate_set(this, 8, 10, value);
      }
    },
  );

  const LocalTime_ISOString = Symbol$1('LocalTime_ISOString');
  const LocalTime_value = Symbol$1('LocalTime_value');
  const LocalTime_get = (that, start, end) => +that[LocalTime_ISOString].slice(start, end);
  const LocalTime_set = (that, start, end, value) => {
    const string = '' + value;
    const size = end - start;
    if (string.length > size) {
      throw RangeError$1();
    } ///
    that[LocalTime_value] = Value(
      (that[LocalTime_ISOString] =
        that[LocalTime_ISOString].slice(0, start) +
        string.padStart(2, '0') +
        that[LocalTime_ISOString].slice(end)),
    );
  };
  const LocalTime = /*#__PURE__*/ fpc(
    class LocalTime extends Datetime {
      [LocalTime_ISOString];
      [LocalTime_value];

      get [Symbol$1.toStringTag]() {
        return 'LocalTime';
      }

      valueOf() {
        return this[LocalTime_value];
      }
      toISOString() {
        return this[LocalTime_ISOString];
      }

      constructor(literal) {
        IS_LOCAL_TIME(literal) ||
          throws(SyntaxError$1(`Invalid Local Time ${literal}` + where(' at ')));
        super();
        this[LocalTime_value] = Value((this[LocalTime_ISOString] = literal));
        return this;
      }

      getHours() {
        return LocalTime_get(this, 0, 2);
      }
      setHours(value) {
        LocalTime_set(this, 0, 2, value);
      }
      getMinutes() {
        return LocalTime_get(this, 3, 5);
      }
      setMinutes(value) {
        LocalTime_set(this, 3, 5, value);
      }
      getSeconds() {
        return LocalTime_get(this, 6, 8);
      }
      setSeconds(value) {
        LocalTime_set(this, 6, 8, value);
      }
      getMilliseconds() {
        return +this[LocalTime_value].slice(6, 9).padEnd(3, '0');
      } ///
      setMilliseconds(value) {
        this[LocalTime_value] = Value(
          (this[LocalTime_ISOString] =
            this[LocalTime_ISOString].slice(0, 8) +
            (value ? ('.' + ('' + value).padStart(3, '0')).replace(DOT_ZERO, '') : '')),
        );
      }
    },
  );

  const parseInt$1 = parseInt;

  const fromCodePoint = String.fromCodePoint;

  const ESCAPED_IN_SINGLE_LINE = /[^\\]+|\\(?:[\\"btnfr/]|u.{4}|U.{8})/gs;
  const ESCAPED_IN_MULTI_LINE = /[^\n\\]+|\n|\\(?:[\t ]*\n[\t\n ]*|[\\"btnfr/]|u.{4}|U.{8})/gs;

  const BasicString = literal => {
    if (!literal) {
      return '';
    }
    const parts = literal.match(ESCAPED_IN_SINGLE_LINE);
    const { length } = parts;
    let index = 0;
    do {
      const part = parts[index];
      if (part[0] === '\\') {
        switch (part[1]) {
          case '\\':
            parts[index] = '\\';
            break;
          case '"':
            parts[index] = '"';
            break;
          case 'b':
            parts[index] = '\b';
            break;
          case 't':
            parts[index] = '\t';
            break;
          case 'n':
            parts[index] = '\n';
            break;
          case 'f':
            parts[index] = '\f';
            break;
          case 'r':
            parts[index] = '\r';
            break;
          case 'u':
            const charCode = parseInt$1(part.slice(2), 16);
            mustScalar &&
              0xd7ff < charCode &&
              charCode < 0xe000 &&
              throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ')));
            parts[index] = fromCharCode(charCode);
            break;
          case 'U':
            const codePoint = parseInt$1(part.slice(2), 16);
            ((mustScalar && 0xd7ff < codePoint && codePoint < 0xe000) || 0x10ffff < codePoint) &&
              throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ')));
            parts[index] = fromCodePoint(codePoint);
            break;
          case '/':
            parts[index] = '/';
            break;
        }
      }
    } while (++index !== length);
    return parts.join('');
  };

  const MultilineBasicString = (literal, useWhatToJoinMultilineString, n) => {
    if (!literal) {
      return '';
    }
    const parts = literal.match(ESCAPED_IN_MULTI_LINE);
    const { length } = parts;
    let index = 0;
    do {
      const part = parts[index];
      if (part === '\n') {
        ++n;
        parts[index] = useWhatToJoinMultilineString;
      } else if (part[0] === '\\') {
        switch (part[1]) {
          case '\n':
          case ' ':
          case '\t':
            for (let i = 0; (i = part.indexOf('\n', i) + 1); ) {
              ++n;
            }
            parts[index] = '';
            break;
          case '\\':
            parts[index] = '\\';
            break;
          case '"':
            parts[index] = '"';
            break;
          case 'b':
            parts[index] = '\b';
            break;
          case 't':
            parts[index] = '\t';
            break;
          case 'n':
            parts[index] = '\n';
            break;
          case 'f':
            parts[index] = '\f';
            break;
          case 'r':
            parts[index] = '\r';
            break;
          case 'u':
            const charCode = parseInt$1(part.slice(2), 16);
            mustScalar &&
              0xd7ff < charCode &&
              charCode < 0xe000 &&
              throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
            parts[index] = fromCharCode(charCode);
            break;
          case 'U':
            const codePoint = parseInt$1(part.slice(2), 16);
            ((mustScalar && 0xd7ff < codePoint && codePoint < 0xe000) || 0x10ffff < codePoint) &&
              throws(RangeError$1(`Invalid Unicode Scalar ${part}` + where(' at ', lineIndex + n)));
            parts[index] = fromCodePoint(codePoint);
            break;
          case '/':
            parts[index] = '/';
            break;
        }
      }
    } while (++index !== length);
    return parts.join('');
  };

  const INTEGER_D = /[-+]?(?:0|[1-9][_\d]*)/;
  const { test: BAD_D } = /*#__PURE__*/ newRegExp`_(?!\d)`.valueOf();
  const { test: IS_D_INTEGER } = /*#__PURE__*/ newRegExp`^${INTEGER_D}$`.valueOf();
  const { test: IS_XOB_INTEGER } = theRegExp(
    /^0(?:x[\dA-Fa-f][_\dA-Fa-f]*|o[0-7][_0-7]*|b[01][_01]*)$/,
  );
  const { test: BAD_XOB } = /*#__PURE__*/ newRegExp`_(?![\dA-Fa-f])`.valueOf();
  const UNDERSCORES$1 = /_/g;
  const UNDERSCORES_SIGN = /_|^[-+]/g;

  const IS_INTEGER = literal =>
    (IS_D_INTEGER(literal) || /*options.xob && */ IS_XOB_INTEGER(literal)) && !BAD_XOB(literal);

  const MIN = BigInt$1 && -(/*#__PURE__*/ BigInt$1('0x8000000000000000')); // -(2n**(64n-1n)) || -MAX-1n
  const MAX = BigInt$1 && /*#__PURE__*/ BigInt$1('0x7FFFFFFFFFFFFFFF'); // 2n**(64n-1n)-1n || -MIN-1n

  const BigIntInteger = literal => {
    IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
    const bigInt =
      literal[0] === '-'
        ? -BigInt$1(literal.replace(UNDERSCORES_SIGN, ''))
        : BigInt$1(literal.replace(UNDERSCORES_SIGN, ''));
    allowLonger ||
      (MIN <= bigInt && bigInt <= MAX) ||
      throws(
        RangeError$1(
          `Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` +
            where(' meet at '),
        ),
      );
    return bigInt;
  };

  const NumberInteger = literal => {
    IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
    const number = parseInt$1(literal.replace(UNDERSCORES$1, ''));
    isSafeInteger(number) ||
      throws(
        RangeError$1(
          `Integer did not use BitInt must fit Number.isSafeInteger, not includes ${literal}` +
            where(' meet at '),
        ),
      );
    return number;
  };

  const Integer = literal => {
    if (usingBigInt === true) {
      return BigIntInteger(literal);
    }
    if (usingBigInt === false) {
      return NumberInteger(literal);
    }
    IS_INTEGER(literal) || throws(SyntaxError$1(`Invalid Integer ${literal}` + where(' at ')));
    const number = parseInt$1(literal.replace(UNDERSCORES$1, ''));
    if (IntegerMinNumber <= number && number <= IntegerMaxNumber) {
      return number;
    }
    const bigInt =
      literal[0] === '-'
        ? -BigInt$1(literal.replace(UNDERSCORES_SIGN, ''))
        : BigInt$1(literal.replace(UNDERSCORES_SIGN, ''));
    allowLonger ||
      (MIN <= bigInt && bigInt <= MAX) ||
      throws(
        RangeError$1(
          `Integer expect 64 bit range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807), not includes ${literal}` +
            where(' meet at '),
        ),
      );
    return bigInt;
  };

  const isFinite$1 = isFinite;

  const NaN$1 = 0 / 0;

  const _NaN = -NaN$1;
  const _Infinity$1 = -Infinity;
  const { test: IS_FLOAT } = /*#__PURE__*/ newRegExp`
      ^
      ${INTEGER_D}
      (?:
        \.\d[_\d]*
        (?:[eE][-+]?\d[_\d]*)?
      |
        [eE][-+]?\d[_\d]*
      )
      $`.valueOf();
  const UNDERSCORES = /_/g;
  const { test: IS_ZERO } = theRegExp(/^[-+]?0(?:\.0+)?(?:[eE][-+]?0+)?$/);
  const { exec: NORMALIZED } = theRegExp(/^[-0]?(\d*)(?:\.(\d+))?(?:e\+?(-?\d+))?$/);
  const { exec: ORIGINAL } = theRegExp(/^[-+]?0?(\d*)(?:\.(\d*?)0*)?(?:[eE]\+?(-?\d+))?$/);

  const Float = literal => {
    if (!IS_FLOAT(literal) || BAD_D(literal)) {
      if (sFloat) {
        if (literal === 'inf' || literal === '+inf') {
          return Infinity;
        }
        if (literal === '-inf') {
          return _Infinity$1;
        }
        if (literal === 'nan' || literal === '+nan') {
          return NaN$1;
        }
        if (literal === '-nan') {
          return _NaN;
        }
      } else if (!sError) {
        if (literal === 'inf' || literal === '+inf') {
          return Infinity;
        }
        if (literal === '-inf') {
          return _Infinity$1;
        }
      }
      throw throws(SyntaxError$1(`Invalid Float ${literal}` + where(' at ')));
    }
    const withoutUnderscores = literal.replace(UNDERSCORES, '');
    const number = +withoutUnderscores;
    if (sError) {
      isFinite$1(number) ||
        throws(RangeError$1(`Float ${literal} has been as big as inf` + where(' at ')));
      number ||
        IS_ZERO(withoutUnderscores) ||
        throws(
          RangeError$1(
            `Float ${literal} has been as little as ${literal[0] === '-' ? '-' : ''}0` +
              where(' at '),
          ),
        );
      const {
        1: normalized_integer,
        2: normalized_fractional = '',
        3: normalized_exponent = '',
      } = NORMALIZED(number);
      const {
        1: original_integer,
        2: original_fractional = '',
        3: original_exponent = '',
      } = ORIGINAL(withoutUnderscores);
      (original_integer + original_fractional === normalized_integer + normalized_fractional &&
        original_exponent - original_fractional.length ===
          normalized_exponent - normalized_fractional.length) ||
        throws(
          RangeError$1(`Float ${literal} has lost its exact and been ${number}` + where(' at ')),
        );
    }
    return number;
  };

  const prepareTable = (table, keys) => {
    const { length } = keys;
    let index = 0;
    while (index < length) {
      const key = keys[index++];
      if (key in table) {
        table = table[key];
        if (isTable(table)) {
          isInline(table) &&
            throws(Error$1(`Trying to define Table under Inline Table` + where(' at ')));
        } else if (isArray(table)) {
          isStatic(table) &&
            throws(Error$1(`Trying to append value to Static Array` + where(' at ')));
          table = table[table.length - 1];
        } else {
          throw throws(Error$1(`Trying to define Table under non-Table value` + where(' at ')));
        }
      } else {
        table = table[key] = new Table(IMPLICITLY);
        while (index < length) {
          table = table[keys[index++]] = new Table(IMPLICITLY);
        }
        return table;
      }
    }
    return table;
  };

  const appendTable = (table, finalKey, asArrayItem, tag) => {
    let lastTable;
    if (asArrayItem) {
      let arrayOfTables;
      if (finalKey in table) {
        (isArray((arrayOfTables = table[finalKey])) && !isStatic(arrayOfTables)) ||
          throws(Error$1(`Trying to push Table to non-ArrayOfTables value` + where(' at ')));
      } else {
        arrayOfTables = table[finalKey] = newArray(OF_TABLES);
      }
      tag && collect(tag, arrayOfTables, table, finalKey);
      arrayOfTables[arrayOfTables.length] = lastTable = new Table(DIRECTLY);
    } else {
      if (finalKey in table) {
        lastTable = table[finalKey];
        fromPair(lastTable) &&
          throws(
            Error$1(
              `A table defined implicitly via key/value pair can not be accessed to via []` +
                where(', which at '),
            ),
          );
        directlyIfNot(lastTable) || throws(Error$1(`Duplicate Table definition` + where(' at ')));
      } else {
        table[finalKey] = lastTable = new Table(DIRECTLY);
      }
      tag && collect(tag, null, table, finalKey);
    }
    return lastTable;
  };

  const prepareInlineTable = (table, keys) => {
    const { length } = keys;
    let index = 0;
    while (index < length) {
      const key = keys[index++];
      if (key in table) {
        table = table[key];
        isTable(table) ||
          throws(Error$1(`Trying to assign property through non-Table value` + where(' at ')));
        isInline(table) &&
          throws(Error$1(`Trying to assign property through static Inline Table` + where(' at ')));
        fromPair(table) ||
          throws(
            Error$1(
              `A table defined implicitly via [] can not be accessed to via key/value pair` +
                where(', which at '),
            ),
          );
      } else {
        table = table[key] = new Table(IMPLICITLY, PAIR);
        while (index < length) {
          table = table[keys[index++]] = new Table(IMPLICITLY, PAIR);
        }
        return table;
      }
    }
    return table;
  };

  const checkLiteralString = literal => {
    __CONTROL_CHARACTER_EXCLUDE_test(literal) &&
      throws(
        SyntaxError$1(
          `Control characters other than Tab are not permitted in a Literal String` +
            where(', which was found at '),
        ),
      );
    return literal;
  };

  const assignLiteralString = (table, finalKey, literal) => {
    if (!literal.startsWith(`'''`)) {
      const $ =
        LITERAL_STRING_exec(literal) || throws(SyntaxError$1(`Bad literal string` + where(' at ')));
      const value = checkLiteralString($[1]);
      table[finalKey] = preserveLiteral
        ? LiteralObject(literal.slice(0, value.length + 2), value)
        : value;
      return $[2];
    }
    const $ = __MULTI_LINE_LITERAL_STRING_exec(literal.slice(3));
    if ($) {
      const value = checkLiteralString($[1]) + $[2];
      table[finalKey] = preserveLiteral
        ? LiteralObject(literal.slice(0, value.length + 6), value)
        : value;
      return $[3];
    }
    const start = new mark('Multi-line Literal String', literal.length);
    const leadingNewline = !(literal = literal.slice(3));
    if (leadingNewline) {
      literal = start.must();
      const $ = __MULTI_LINE_LITERAL_STRING_exec(literal);
      if ($) {
        const value = checkLiteralString($[1]) + $[2];
        table[finalKey] = preserveLiteral
          ? LiteralObject([`'''`, literal.slice(0, value.length + 3)], value)
          : value;
        return $[3];
      }
    }
    useWhatToJoinMultilineString === null && start.nowrap(ARGS_MODE);
    for (const lines = [checkLiteralString(literal)]; ; ) {
      const line = start.must();
      const $ = __MULTI_LINE_LITERAL_STRING_exec(line);
      if ($) {
        lines[lines.length] = checkLiteralString($[1]) + $[2];
        const value = lines.join(useWhatToJoinMultilineString);
        if (preserveLiteral) {
          lines[lines.length - 1] += `'''`;
          leadingNewline ? lines.unshift(`'''`) : (lines[0] = `'''${literal}`);
          table[finalKey] = LiteralObject(lines, value);
        } else {
          table[finalKey] = value;
        }
        return $[3];
      }
      lines[lines.length] = checkLiteralString(line);
    }
  };

  const assignBasicString = (table, finalKey, literal) => {
    if (!literal.startsWith('"""')) {
      const index = BASIC_STRING_exec_1_endIndex(literal);
      const value = BasicString(literal.slice(1, index));
      table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, index + 1), value) : value;
      return literal.slice(index + 1).replace(PRE_WHITESPACE, '');
    }
    let length = 3 + MULTI_LINE_BASIC_STRING_exec_0_length(literal.slice(3));
    if (literal.length !== length) {
      const $ = literal.slice(3, length);
      ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) ||
        throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
      const value =
        BasicString($) +
        (literal.startsWith('"', (length += 3))
          ? literal.startsWith('"', ++length)
            ? (++length, '""')
            : '"'
          : '');
      table[finalKey] = preserveLiteral ? LiteralObject(literal.slice(0, length), value) : value;
      return literal.slice(length).replace(PRE_WHITESPACE, '');
    }
    const start = new mark('Multi-line Basic String', length);
    const skipped = (literal = literal.slice(3)) ? 0 : 1;
    if (skipped) {
      literal = start.must();
      let length = MULTI_LINE_BASIC_STRING_exec_0_length(literal);
      if (literal.length !== length) {
        const $ = literal.slice(0, length);
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) ||
          throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
        const value =
          MultilineBasicString($, useWhatToJoinMultilineString, skipped) +
          (literal.startsWith('"', (length += 3))
            ? literal.startsWith('"', ++length)
              ? (++length, '""')
              : '"'
            : '');
        table[finalKey] = preserveLiteral
          ? LiteralObject(['"""', literal.slice(0, length)], value)
          : value;
        return literal.slice(length).replace(PRE_WHITESPACE, '');
      }
    }
    useWhatToJoinMultilineString === null && start.nowrap(ARGS_MODE);
    ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(literal + '\n') ||
      throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
    for (const lines = [literal]; ; ) {
      const line = start.must();
      let length = MULTI_LINE_BASIC_STRING_exec_0_length(line);
      if (line.length !== length) {
        const $ = line.slice(0, length);
        ESCAPED_EXCLUDE_CONTROL_CHARACTER_test($) ||
          throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
        const value =
          MultilineBasicString(lines.join('\n') + '\n' + $, useWhatToJoinMultilineString, skipped) +
          (line.startsWith('"', (length += 3))
            ? line.startsWith('"', ++length)
              ? (++length, '""')
              : '"'
            : '');
        if (preserveLiteral) {
          skipped ? lines.unshift('"""') : (lines[0] = `"""${literal}`);
          lines[lines.length] = `${$}"""`;
          table[finalKey] = LiteralObject(lines, value);
        } else {
          table[finalKey] = value;
        }
        return line.slice(length).replace(PRE_WHITESPACE, '');
      }
      ESCAPED_EXCLUDE_CONTROL_CHARACTER_test(line + '\n') ||
        throws(SyntaxError$1(`Bad multi-line basic string` + where(' at ')));
      lines[lines.length] = line;
    }
  };

  const KEYS = /*#__PURE__*/ Null$1(null);
  const commentFor = key => KEYS[key] || (KEYS[key] = Symbol$1(key));
  const commentForThis = Symbol$1('this');

  const { test: includesNewline } = theRegExp(/\r?\n/g);
  const getCOMMENT = (table, keyComment) => {
    if (keyComment in table) {
      const comment = table[keyComment];
      if (typeof comment !== 'string') {
        throw TypeError$1(
          `the value of comment must be a string, while "${
            comment === null ? 'null' : typeof comment
          }" type is found`,
        );
      }
      if (includesNewline(comment)) {
        throw SyntaxError$1(`the value of comment must be a string and can not include newline`);
      }
      return ` #${comment}`; ///
    }
    return '';
  };
  const getComment = (table, key) => (key in KEYS ? getCOMMENT(table, KEYS[key]) : '');

  const { test: IS_OFFSET$ } = theRegExp(OFFSET$);
  const { test: IS_EMPTY } = theRegExp(/^\[[\t ]*]/);

  const parseKeys = rest => {
    let lineRest = rest;
    const leadingKeys = [];
    let lastIndex = -1;
    for (;;) {
      lineRest || throws(SyntaxError$1(`Empty bare key` + where(' at ')));
      if (lineRest[0] === '"') {
        const index = BASIC_STRING_exec_1_endIndex(lineRest);
        KEYS$1.test((leadingKeys[++lastIndex] = BasicString(lineRest.slice(1, index)))) ||
          throws(Error$1(`Key not allowed` + where(' at ')));
        lineRest = lineRest.slice(index + 1);
      } else {
        const isQuoted = lineRest[0] === "'";
        const key = ((isQuoted ? __LITERAL_KEY_exec : __BARE_KEY_exec)(lineRest) ||
          throws(
            SyntaxError$1(`Bad ${isQuoted ? 'literal string' : 'bare'} key` + where(' at ')),
          ))[0];
        lineRest = lineRest.slice(key.length);
        KEYS$1.test((leadingKeys[++lastIndex] = isQuoted ? key.slice(1, -1) : key)) ||
          throws(Error$1(`Key not allowed` + where(' at ')));
      }
      if (IS_DOT_KEY(lineRest)) {
        lineRest = lineRest.replace(DOT_KEY, '');
      } else {
        break;
      }
    }
    if (disableDigit) {
      const keys = rest.slice(0, -lineRest.length);
      (isAmazing(keys) || (enableNull && keys === 'null')) &&
        throws(SyntaxError$1(`Bad bare key disabled by xOptions.string` + where(' at ')));
    }
    if (disallowEmptyKey) {
      let index = lastIndex;
      do {
        leadingKeys[index] ||
          throws(SyntaxError$1(`Empty key is not allowed before TOML v0.5` + where(', which at ')));
      } while (index--);
    }
    const finalKey = leadingKeys[lastIndex];
    leadingKeys.length = lastIndex;
    return { leadingKeys, finalKey, lineRest };
  };

  const push = (lastArray, lineRest) => {
    if (lineRest[0] === '<') {
      const { 1: tag } = ({ 2: lineRest } =
        _VALUE_PAIR_exec(lineRest) || throws(SyntaxError$1(`Bad tag ` + where(' at '))));
      collect(tag, lastArray, null);
      switch (lineRest && lineRest[0]) {
        case ',':
        case ']':
        case '':
        case '#':
          lastArray[lastArray.length] = undefined$1;
          return lineRest;
      }
    }
    switch (lineRest[0]) {
      case "'":
        return assignLiteralString(asStrings(lastArray), lastArray.length, lineRest);
      case '"':
        return assignBasicString(asStrings(lastArray), lastArray.length, lineRest);
      case '{':
        inlineTable ||
          throws(
            SyntaxError$1(`Inline Table is not allowed before TOML v0.4` + where(', which at ')),
          );
        return equalInlineTable(asTables(lastArray), lastArray.length, lineRest);
      case '[':
        return equalStaticArray(asArrays(lastArray), lastArray.length, lineRest);
    }
    const { 1: literal } = ({ 2: lineRest } =
      VALUE_REST_exec(lineRest) || throws(SyntaxError$1(`Bad atom value` + where(' at '))));
    if (literal === 'true') {
      asBooleans(lastArray)[lastArray.length] = true;
    } else if (literal === 'false') {
      asBooleans(lastArray)[lastArray.length] = false;
    } else if (enableNull && literal === 'null') {
      asNulls(lastArray)[lastArray.length] = null;
    } else if (literal.includes(':')) {
      if (literal.includes('-')) {
        if (IS_OFFSET$(literal)) {
          asOffsetDateTimes(lastArray)[lastArray.length] = new OffsetDateTime(literal);
        } else {
          moreDatetime ||
            throws(
              SyntaxError$1(
                `Local Date-Time is not allowed before TOML v0.5` + where(', which at '),
              ),
            );
          asLocalDateTimes(lastArray)[lastArray.length] = new LocalDateTime(literal);
        }
      } else {
        moreDatetime ||
          throws(
            SyntaxError$1(`Local Time is not allowed before TOML v0.5` + where(', which at ')),
          );
        asLocalTimes(lastArray)[lastArray.length] = new LocalTime(literal);
      }
    } else if (literal.indexOf('-') !== literal.lastIndexOf('-') && literal[0] !== '-') {
      moreDatetime ||
        throws(SyntaxError$1(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
      asLocalDates(lastArray)[lastArray.length] = new LocalDate(literal);
    } else {
      literal.includes('.') ||
      literal.includes('n') ||
      ((literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x'))
        ? (asFloats(lastArray)[lastArray.length] = preserveLiteral
            ? LiteralObject(literal, Float(literal))
            : Float(literal))
        : (asIntegers(lastArray)[lastArray.length] = preserveLiteral
            ? LiteralObject(literal, Integer(literal))
            : Integer(literal));
    }
    return lineRest;
  };

  const equalStaticArray = function* (table, finalKey, lineRest) {
    const staticArray = (table[finalKey] = newArray(STATICALLY));
    if (IS_EMPTY(lineRest)) {
      beInline(staticArray, lineRest[1] === ']' ? 0 : 3);
      return lineRest.slice(lineRest.indexOf(']')).replace(SYM_WHITESPACE, '');
    }
    const start = new mark('Static Array', lineRest.length);
    let inline = lineRest.startsWith('[ ') || lineRest.startsWith('[\t') ? 3 : 0;
    lineRest = lineRest.replace(SYM_WHITESPACE, '');
    while (!lineRest || lineRest[0] === '#') {
      inline = null;
      lineRest = start.must().replace(PRE_WHITESPACE, '');
    }
    if (lineRest[0] === ']') {
      inline === null || beInline(staticArray, inline);
      return lineRest.replace(SYM_WHITESPACE, '');
    }
    for (;;) {
      const rest = push(staticArray, lineRest);
      lineRest = typeof rest === 'string' ? rest : yield rest;
      while (!lineRest || lineRest[0] === '#') {
        inline = null;
        lineRest = start.must().replace(PRE_WHITESPACE, '');
      }
      if (lineRest[0] === ',') {
        lineRest = lineRest.replace(SYM_WHITESPACE, '');
        while (!lineRest || lineRest[0] === '#') {
          inline = null;
          lineRest = start.must().replace(PRE_WHITESPACE, '');
        }
        if (lineRest[0] === ']') {
          break;
        }
      } else {
        if (lineRest[0] === ']') {
          break;
        }
        throw throws(
          SyntaxError$1(
            `Unexpect character in static array item value` + where(', which is found at '),
          ),
        );
      }
    }
    inline === null || beInline(staticArray, inline);
    return lineRest.replace(SYM_WHITESPACE, '');
  };

  const equalInlineTable = function* (table, finalKey, lineRest) {
    const inlineTable = (table[finalKey] = new Table(DIRECTLY, INLINE));
    if (allowInlineTableMultilineAndTrailingCommaEvenNoComma) {
      const start = new mark('Inline Table', lineRest.length);
      lineRest = lineRest.replace(SYM_WHITESPACE, '');
      let inline = true;
      for (;;) {
        while (!lineRest || lineRest[0] === '#') {
          inline = false;
          lineRest = start.must().replace(PRE_WHITESPACE, '');
        }
        if (lineRest[0] === '}') {
          break;
        }
        const forComment = ForComment(inlineTable, lineRest);
        const rest = assign(forComment);
        lineRest = typeof rest === 'string' ? rest : yield rest;
        if (lineRest) {
          if (lineRest[0] === '#') {
            if (preserveComment) {
              forComment.table[commentFor(forComment.finalKey)] = lineRest.slice(1);
            }
            inline = false;
            do {
              lineRest = start.must().replace(PRE_WHITESPACE, '');
            } while (!lineRest || lineRest[0] === '#');
          }
        } else {
          inline = false;
          do {
            lineRest = start.must().replace(PRE_WHITESPACE, '');
          } while (!lineRest || lineRest[0] === '#');
        }
        if (lineRest[0] === ',') {
          lineRest = lineRest.replace(SYM_WHITESPACE, '');
        }
      }
      inline || beInline(inlineTable, false);
    } else {
      lineRest =
        lineRest.replace(SYM_WHITESPACE, '') ||
        throws(
          SyntaxError$1(
            `Inline Table is intended to appear on a single line` + where(', which broken at '),
          ),
        );
      if (lineRest[0] !== '}') {
        for (;;) {
          lineRest[0] === '#' &&
            throws(
              SyntaxError$1(
                `Inline Table is intended to appear on a single line` + where(', which broken at '),
              ),
            );
          const rest = assign(ForComment(inlineTable, lineRest));
          lineRest =
            (typeof rest === 'string' ? rest : yield rest) ||
            throws(
              SyntaxError$1(
                `Inline Table is intended to appear on a single line` + where(', which broken at '),
              ),
            );
          if (lineRest[0] === '}') {
            break;
          }
          if (lineRest[0] === ',') {
            lineRest =
              lineRest.replace(SYM_WHITESPACE, '') ||
              throws(
                SyntaxError$1(
                  `Inline Table is intended to appear on a single line` +
                    where(', which broken at '),
                ),
              );
            lineRest[0] === '}' &&
              throws(
                SyntaxError$1(
                  `The last property of an Inline Table can not have a trailing comma` +
                    where(', which was found at '),
                ),
              );
          }
        }
      }
    }
    return lineRest.replace(SYM_WHITESPACE, '');
  };

  const ForComment = (lastInlineTable, lineRest) => {
    const { leadingKeys, finalKey, tag } = ({ lineRest } = KEY_VALUE_PAIR_exec_groups(
      parseKeys(lineRest),
    ));
    return { table: prepareInlineTable(lastInlineTable, leadingKeys), finalKey, tag, lineRest };
  };
  const assign = ({ finalKey, tag, lineRest, table }) => {
    finalKey in table && throws(Error$1(`Duplicate property definition` + where(' at ')));
    if (tag) {
      collect(tag, null, table, finalKey);
      switch (lineRest && lineRest[0]) {
        case ',':
        case '}':
        case '':
        case '#':
          table[finalKey] = undefined$1;
          return lineRest;
      }
    }
    switch (lineRest && lineRest[0]) {
      case "'":
        return assignLiteralString(table, finalKey, lineRest);
      case '"':
        return assignBasicString(table, finalKey, lineRest);
      case '{':
        inlineTable ||
          throws(
            SyntaxError$1(`Inline Table is not allowed before TOML v0.4` + where(', which at ')),
          );
        return equalInlineTable(table, finalKey, lineRest);
      case '[':
        return equalStaticArray(table, finalKey, lineRest);
    }
    const { 1: literal } = ({ 2: lineRest } =
      VALUE_REST_exec(lineRest) || throws(SyntaxError$1(`Bad atom value` + where(' at '))));
    if (literal === 'true') {
      table[finalKey] = true;
    } else if (literal === 'false') {
      table[finalKey] = false;
    } else if (enableNull && literal === 'null') {
      table[finalKey] = null;
    } else if (literal.includes(':')) {
      if (literal.includes('-')) {
        if (IS_OFFSET$(literal)) {
          table[finalKey] = new OffsetDateTime(literal);
        } else {
          moreDatetime ||
            throws(
              SyntaxError$1(
                `Local Date-Time is not allowed before TOML v0.5` + where(', which at '),
              ),
            );
          table[finalKey] = new LocalDateTime(literal);
        }
      } else {
        moreDatetime ||
          throws(
            SyntaxError$1(`Local Time is not allowed before TOML v0.5` + where(', which at ')),
          );
        table[finalKey] = new LocalTime(literal);
      }
    } else if (literal.indexOf('-') !== literal.lastIndexOf('-') && literal[0] !== '-') {
      moreDatetime ||
        throws(SyntaxError$1(`Local Date is not allowed before TOML v0.5` + where(', which at ')));
      table[finalKey] = new LocalDate(literal);
    } else {
      table[finalKey] =
        literal.includes('.') ||
        literal.includes('n') ||
        ((literal.includes('e') || literal.includes('E')) && !literal.startsWith('0x'))
          ? preserveLiteral
            ? LiteralObject(literal, Float(literal))
            : Float(literal)
          : preserveLiteral
          ? LiteralObject(literal, Integer(literal))
          : Integer(literal);
    }
    return lineRest;
  };

  const Root = () => {
    const rootTable = new Table();
    let lastSectionTable = rootTable;
    while (rest()) {
      const line = next().replace(PRE_WHITESPACE, '');
      if (line) {
        if (line[0] === '[') {
          const { leadingKeys, finalKey, asArrayItem, tag, lineRest } =
            TABLE_DEFINITION_exec_groups(line, parseKeys);
          const table = prepareTable(rootTable, leadingKeys);
          if (lineRest) {
            lineRest[0] === '#' ||
              throws(SyntaxError$1(`Unexpect charachtor after table header` + where(' at ')));
          }
          lastSectionTable = appendTable(table, finalKey, asArrayItem, tag);
          preserveComment &&
            lineRest &&
            (lastSectionTable[commentForThis] = asArrayItem
              ? lineRest.slice(1)
              : (table[commentFor(finalKey)] = lineRest.slice(1)));
        } else if (line[0] === '#') {
          __CONTROL_CHARACTER_EXCLUDE_test(line) &&
            throws(
              SyntaxError$1(
                `Control characters other than Tab are not permitted in comments` +
                  where(', which was found at '),
              ),
            );
        } else {
          const forComment = ForComment(lastSectionTable, line);
          let rest = assign(forComment);
          typeof rest === 'string' || (rest = x(rest));
          if (rest) {
            rest[0] === '#' ||
              throws(SyntaxError$1(`Unexpect charachtor after key/value pair` + where(' at ')));
            if (preserveComment) {
              forComment.table[commentFor(forComment.finalKey)] = rest.slice(1);
            }
          }
        }
      }
    }
    return rootTable;
  };

  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

  const DATE = Date.prototype;

  const valueOf$2 = String.prototype.valueOf;

  const isString =
    /* j-globals: class.isString (internal) */
    /*#__PURE__*/ (function () {
      if (apply.bind) {
        var valueOf_apply = apply.bind(valueOf$2);
        return function isString(value) {
          try {
            valueOf_apply(value);
          } catch (error) {
            return false;
          }
          return true;
        };
      }
      return function isString(value) {
        try {
          valueOf$2.apply(value);
        } catch (error) {
          return false;
        }
        return true;
      };
    })();
    /* j-globals: class.isString (internal) */

  const valueOf$1 = Number.prototype.valueOf;

  const isNumber =
    /* j-globals: class.isNumber (internal) */
    /*#__PURE__*/ (function () {
      if (apply.bind) {
        var valueOf_apply = apply.bind(valueOf$1);
        return function isNumber(value) {
          try {
            valueOf_apply(value);
          } catch (error) {
            return false;
          }
          return true;
        };
      }
      return function isNumber(value) {
        try {
          valueOf$1.apply(value);
        } catch (error) {
          return false;
        }
        return true;
      };
    })();
    /* j-globals: class.isNumber (internal) */

  const isBigInt =
    /* j-globals: class.isBigInt (internal) */
    /*#__PURE__*/ (function () {
      if (typeof BigInt === 'function') {
        var valueOf_apply = apply.bind(BigInt.prototype.valueOf);
        return function isBigInt(value) {
          try {
            valueOf_apply(value);
          } catch (error) {
            return false;
          }
          return true;
        };
      }
      return function isBigInt() {
        return false;
      };
    })();
    /* j-globals: class.isBigInt (internal) */

  const valueOf = BigInt.prototype.valueOf;

  const isBoolean =
    /* j-globals: class.isBoolean (internal) */
    /*#__PURE__*/ (function () {
      if (apply.bind) {
        var valueOf_apply = apply.bind(valueOf);
        return function isBoolean(value) {
          try {
            valueOf_apply(value);
          } catch (error) {
            return false;
          }
          return true;
        };
      }
      return function isBoolean(value) {
        try {
          valueOf.apply(value);
        } catch (error) {
          return false;
        }
        return true;
      };
    })();
    /* j-globals: class.isBoolean (internal) */

  const ESCAPED = /*#__PURE__*/ Null$1({
    .../*#__PURE__*/ fromEntries(
      /*#__PURE__*/ [...Array$1(0x20)].map((_, charCode) => [
        fromCharCode(charCode),
        '\\u' + charCode.toString(16).toUpperCase().padStart(4, '0'),
      ]),
    ),
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '"""': '""\\"',
    '\\': '\\\\',
    '\x7F': '\\u007F',
  });

  const { test: NEED_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F'\x7F]/);
  const BY_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|./gs;
  const { test: NEED_ESCAPE } = theRegExp(/^[\x00-\x08\x0A-\x1F"\\\x7F]/);
  const singlelineString = value => {
    if (NEED_BASIC(value)) {
      const parts = value.match(BY_ESCAPE);
      let index = parts.length;
      do {
        if (NEED_ESCAPE(parts[--index])) {
          parts[index] = ESCAPED[parts[index]];
        }
      } while (index);
      return `"${parts.join('')}"`;
    }
    return `'${value}'`;
  };
  const singlelineBasicString = value => {
    if (value) {
      const parts = value.match(BY_ESCAPE);
      let index = parts.length;
      do {
        if (NEED_ESCAPE(parts[--index])) {
          parts[index] = ESCAPED[parts[index]];
        }
      } while (index);
      return `"${parts.join('')}"`;
    }
    return `""`;
  };

  const { test: NEED_MULTILINE_BASIC } = theRegExp(/[\x00-\x08\x0A-\x1F\x7F]|'''/);
  const { test: multilineNeedBasic } = theRegExp(/[\x00-\x08\x0B-\x1F\x7F]|'''/);
  const { test: REAL_MULTILINE_ESCAPE } = theRegExp(/[\x00-\x08\x0A-\x1F\\\x7F]|"""/);
  const BY_MULTILINE_ESCAPE = /[^\x00-\x08\x0A-\x1F"\\\x7F]+|"""|./gs;
  const { test: NEED_MULTILINE_ESCAPE } = theRegExp(/^(?:[\x00-\x08\x0A-\x1F\\\x7F]|""")/);
  const escape_multiline = (lines, lineIndex) => {
    const line = lines[lineIndex];
    if (REAL_MULTILINE_ESCAPE(line)) {
      const parts = line.match(BY_MULTILINE_ESCAPE);
      let index = parts.length;
      do {
        if (NEED_MULTILINE_ESCAPE(parts[--index])) {
          parts[index] = ESCAPED[parts[index]];
        }
      } while (index);
      lines[lineIndex] = parts.join('');
    }
  };

  const Lines = lines => ((lines = ['', ...lines]).length === 1 ? ['', ''] : lines);

  const multilineString = lines => {
    const lastIndex = lines.length - 1;
    let index = lastIndex;
    do {
      if (NEED_MULTILINE_BASIC(lines[index])) {
        break;
      }
    } while (--index);
    if (index) {
      index = lastIndex;
      escape_multiline(lines, index);
      lines[index] += lines[0] = '"""';
      while (--index) {
        escape_multiline(lines, index);
      }
    } else {
      lines[lastIndex] += lines[0] = "'''";
    }
    return lines;
  };

  const multilineBasicString = lines => {
    let index = lines.length - 1;
    escape_multiline(lines, index);
    lines[index] += lines[0] = '"""';
    while (--index) {
      escape_multiline(lines, index);
    }
    return lines;
  };

  const multilineLiteralString = lines => {
    lines[lines.length - 1] += lines[0] = "'''";
    return lines;
  };

  const Float64Array$1 = Float64Array;

  const Uint8Array$1 = Uint8Array;

  const _Infinity = -Infinity;

  const { test: INTEGER_LIKE } = theRegExp(/^-?\d+$/);
  const ensureFloat = literal => (INTEGER_LIKE(literal) ? literal + '.0' : literal);

  const float64Array = new Float64Array$1([NaN$1]);
  const uint8Array = new Uint8Array$1(float64Array.buffer);
  const NaN_7 = uint8Array[7];

  const float =
    NaN_7 === new Uint8Array$1(new Float64Array$1([-NaN$1]).buffer)[7]
      ? value =>
          value
            ? value === Infinity
              ? 'inf'
              : value === _Infinity
              ? '-inf'
              : ensureFloat('' + value)
            : value === value
            ? is(value, 0)
              ? '0.0'
              : '-0.0'
            : 'nan'
      : value =>
          value
            ? value === Infinity
              ? 'inf'
              : value === _Infinity
              ? '-inf'
              : ensureFloat('' + value)
            : value === value
            ? is(value, 0)
              ? '0.0'
              : '-0.0'
            : ((float64Array[0] = value), uint8Array[7]) === NaN_7
            ? 'nan'
            : '-nan';

  const isDate = /*#__PURE__*/ isPrototypeOf.bind(DATE);

  const { test: BARE } = theRegExp(/^[\w-]+$/);
  const $Key$ = key => (BARE(key) ? key : singlelineString(key));

  const FIRST = /[^.]+/;
  const literalString = value => `'${value}'`;
  const $Keys = keys =>
    isAmazing(keys) ? keys.replace(FIRST, literalString) : keys === 'null' ? `'null'` : keys;

  class TOMLSection extends Array$1 {
    document;

    constructor(document) {
      super();
      this.document = document;
      return this;
    }

    [Symbol$1.toPrimitive]() {
      return this.join(this.document.newline);
    }

    appendNewline() {
      this[this.length] = '';
    }
    set appendLine(source) {
      this[this.length] = source;
    }
    set appendInline(source) {
      this[this.length - 1] += source;
    }
    set appendInlineIf(source) {
      source && (this[this.length - 1] += source);
    } ///

    *assignBlock(documentKeys_, sectionKeys_, table, tableKeys) {
      const { document } = this;
      const { newlineUnderHeader, newlineUnderSectionButPair } = document;
      const newlineAfterDotted = sectionKeys_ ? document.newlineUnderPairButDotted : false;
      const newlineAfterPair = sectionKeys_
        ? document.newlineUnderDotted
        : document.newlineUnderPair;
      for (const tableKey of tableKeys) {
        const value = table[tableKey];
        const $key$ = $Key$(tableKey);
        const documentKeys = documentKeys_ + $key$;
        if (isArray$1(value)) {
          const { length } = value;
          if (length) {
            let firstItem = value[0];
            if (isSection(firstItem)) {
              const tableHeader = `[[${documentKeys}]]`;
              const documentKeys_ = documentKeys + '.';
              let index = 0;
              let table = firstItem;
              for (;;) {
                const section = document.appendSection();
                section[0] = tableHeader + getCOMMENT(table, commentForThis);
                if (newlineUnderHeader) {
                  section[1] = '';
                  yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
                  newlineUnderSectionButPair && section.length !== 2 && section.appendNewline();
                } else {
                  yield section.assignBlock(documentKeys_, ``, table, getOwnPropertyNames(table));
                  newlineUnderSectionButPair && section.appendNewline();
                }
                if (++index === length) {
                  break;
                }
                table = value[index];
                if (!isSection(table)) {
                  throw TypeError$1(
                    `the first table item marked by Section() means the parent array is an array of tables, which can not include other types or table not marked by Section() any more in the rest items`,
                  );
                }
              }
              continue;
            } else {
              let index = 1;
              while (index !== length) {
                if (isSection(value[index++])) {
                  throw TypeError$1(
                    `if an array is not array of tables, it can not include any table that marked by Section()`,
                  );
                }
              }
            }
          }
        } else {
          if (isSection(value)) {
            const section = document.appendSection();
            section[0] = `[${documentKeys}]${
              document.preferCommentForThis
                ? getCOMMENT(value, commentForThis) || getComment(table, tableKey)
                : getComment(table, tableKey) || getCOMMENT(value, commentForThis)
            }`;
            if (newlineUnderHeader) {
              section[1] = '';
              yield section.assignBlock(documentKeys + '.', ``, value, getOwnPropertyNames(value));
              newlineUnderSectionButPair && section.length !== 2 && section.appendNewline();
            } else {
              yield section.assignBlock(documentKeys + '.', ``, value, getOwnPropertyNames(value));
              newlineUnderSectionButPair && section.appendNewline();
            }
            continue;
          }
        }
        const sectionKeys = sectionKeys_ + $key$;
        this.appendLine = $Keys(sectionKeys) + ' = ';
        const valueKeysIfValueIsDottedTable = this.value('', value, true);
        if (valueKeysIfValueIsDottedTable) {
          --this.length;
          yield this.assignBlock(
            documentKeys + '.',
            sectionKeys + '.',
            value,
            valueKeysIfValueIsDottedTable,
          );
          newlineAfterDotted && this.appendNewline();
        } else {
          this.appendInlineIf = getComment(table, tableKey);
          newlineAfterPair && this.appendNewline();
        }
      }
    }

    value(indent, value, returnValueKeysIfValueIsDottedTable) {
      switch (typeof value) {
        case 'object':
          if (value === null) {
            if (this.document.nullDisabled) {
              throw TypeError$1(
                `toml can not stringify "null" type value without truthy options.xNull`,
              );
            }
            this.appendInline = 'null';
            break;
          }
          const inlineMode = ofInline(value);
          if (isArray$1(value)) {
            if (inlineMode === undefined$1) {
              this.staticArray(indent, value);
            } else {
              const { $singlelineArray = inlineMode } = this.document;
              this.singlelineArray(indent, value, $singlelineArray);
            }
            break;
          }
          if (inlineMode !== undefined$1) {
            inlineMode || this.document.multilineTableDisabled
              ? this.inlineTable(indent, value)
              : this.multilineTable(indent, value, this.document.multilineTableComma);
            break;
          }
          if (isDate(value)) {
            this.appendInline = value
              .toISOString()
              .replace('T', this.document.T)
              .replace('Z', this.document.Z);
            break;
          }
          if (_literal in value) {
            const literal = value[_literal];
            if (typeof literal === 'string') {
              this.appendInline = literal;
            } else if (isArray$1(literal)) {
              const { length } = literal;
              if (length) {
                this.appendInline = literal[0];
                let index = 1;
                while (index !== length) {
                  this.appendLine = literal[index++];
                }
              } else {
                throw TypeError$1(`literal value is broken`);
              }
            } else {
              throw TypeError$1(`literal value is broken`);
            }
            break;
          }
          if (isString(value)) {
            throw TypeError$1(`TOML.stringify refuse to handle [object String]`);
          }
          if (isNumber(value)) {
            throw TypeError$1(`TOML.stringify refuse to handle [object Number]`);
          }
          if (isBigInt(value)) {
            throw TypeError$1(`TOML.stringify refuse to handle [object BigInt]`);
          }
          if (isBoolean(value)) {
            throw TypeError$1(`TOML.stringify refuse to handle [object Boolean]`);
          }
          if (returnValueKeysIfValueIsDottedTable) {
            const keys = getOwnPropertyNames(value);
            if (keys.length) {
              return keys;
            }
            this.appendInline = '{ }';
          } else {
            this.inlineTable(indent, value);
          }
          break;
        case 'bigint':
          this.appendInline = '' + value;
          break;
        case 'number':
          this.appendInline = this.document.asInteger(value)
            ? is(value, -0)
              ? '-0'
              : '' + value
            : float(value);
          break;
        case 'string':
          this.appendInline = singlelineString(value);
          break;
        case 'boolean':
          this.appendInline = value ? 'true' : 'false';
          break;
        default:
          throw TypeError$1(`toml can not stringify "${typeof value}" type value`);
      }
      return null;
    }

    singlelineArray(indent, staticArray, inlineMode) {
      const { length } = staticArray;
      if (length) {
        this.appendInline = inlineMode & 0b10 ? '[ ' : '[';
        this.value(indent, staticArray[0], false);
        let index = 1;
        while (index !== length) {
          this.appendInline = ', ';
          this.value(indent, staticArray[index++], false);
        }
        this.appendInline = inlineMode & 0b10 ? ' ]' : ']';
      } else {
        this.appendInline = inlineMode & 0b01 ? '[ ]' : '[]';
      }
    }
    staticArray(indent, staticArray) {
      this.appendInline = '[';
      const indent_ = indent + this.document.indent;
      const { length } = staticArray;
      let index = 0;
      while (index !== length) {
        this.appendLine = indent_;
        this.value(indent_, staticArray[index++], false);
        this.appendInline = ',';
      }
      this.appendLine = indent + ']';
    }

    inlineTable(indent, inlineTable) {
      const keys = getOwnPropertyNames(inlineTable);
      if (keys.length) {
        this.appendInline = '{ ';
        this.assignInline(indent, inlineTable, ``, keys);
        this[this.length - 1] = this[this.length - 1].slice(0, -2) + ' }';
      } else {
        this.appendInline = '{ }';
      }
    }
    multilineTable(indent, inlineTable, comma) {
      this.appendInline = '{';
      this.assignMultiline(indent, inlineTable, ``, getOwnPropertyNames(inlineTable), comma);
      this.appendLine = indent + '}';
    }
    assignInline(indent, inlineTable, keys_, keys) {
      for (const key of keys) {
        const value = inlineTable[key];
        const keys = keys_ + $Key$(key);
        const before_value = (this.appendInline = $Keys(keys) + ' = ');
        const valueKeysIfValueIsDottedTable = this.value(indent, value, true);
        if (valueKeysIfValueIsDottedTable) {
          this[this.length - 1] = this[this.length - 1].slice(0, -before_value.length);
          this.assignInline(indent, value, keys + '.', valueKeysIfValueIsDottedTable);
        } else {
          this.appendInline = ', ';
        }
      }
    }
    assignMultiline(indent, inlineTable, keys_, keys, comma) {
      const indent_ = indent + this.document.indent;
      for (const key of keys) {
        const value = inlineTable[key];
        const keys = keys_ + $Key$(key);
        this.appendLine = indent_ + $Keys(keys) + ' = ';
        const valueKeysIfValueIsDottedTable = this.value(indent_, value, true);
        if (valueKeysIfValueIsDottedTable) {
          --this.length;
          this.assignMultiline(indent, value, keys + '.', valueKeysIfValueIsDottedTable, comma);
        } else {
          comma
            ? (this.appendInline = ',' + getComment(inlineTable, key))
            : (this.appendInlineIf = getComment(inlineTable, key));
        }
      }
    }
  }

  const name2code = /*#__PURE__*/ Null$1({
    document: 0,
    section: 1,
    header: 2,
    pairs: 3,
    pair: 4,
  });

  const { test: IS_INDENT } = theRegExp(/^[\t ]*$/);

  const return_false = () => false;

  class TOMLDocument extends Array$1 {
    get ['constructor']() {
      return Array$1;
    }

    0 = new TOMLSection(this);

    asInteger = return_false;
    newline = '';
    newlineUnderSection = true;
    newlineUnderSectionButPair = true;
    newlineUnderHeader = true;
    newlineUnderPair = false;
    newlineUnderPairButDotted = false;
    newlineUnderDotted = false;
    indent = '\t';
    T = 'T';
    Z = 'Z';
    nullDisabled = true;
    multilineTableDisabled = true;
    multilineTableComma;
    preferCommentForThis = false;
    $singlelineArray;

    constructor(options) {
      super();

      if (options == null) {
        return this;
      }

      const { integer } = options;
      if (integer === undefined);
      else if (integer === MAX_SAFE_INTEGER) {
        this.asInteger = isSafeInteger;
      } else if (typeof integer === 'number') {
        if (!isSafeInteger(integer)) {
          throw RangeError$1(`TOML.stringify(,{integer}) can only be a safe integer`);
        }
        const max = integer >= 0 ? integer : -integer - 1;
        const min = integer >= 0 ? -integer : integer;
        this.asInteger = number => isSafeInteger(number) && min <= number && number <= max;
      } else {
        throw TypeError$1(`TOML.stringify(,{integer}) can only be number`);
      }

      const { newline } = options;
      if (newline === undefined);
      else if (newline === '\n' || newline === '\r\n') {
        this.newline = newline;
      } else {
        throw typeof newline === 'string'
          ? SyntaxError$1(`TOML.stringify(,{newline}) can only be valid TOML newline`)
          : TypeError$1(`TOML.stringify(,{newline}) can only be string`);
      }

      const { preferCommentFor } = options;
      if (preferCommentFor === undefined);
      else if (preferCommentFor === 'this' || preferCommentFor === 'key') {
        this.preferCommentForThis = preferCommentFor === 'this';
      } else {
        throw TypeError$1(`TOML.stringify(,{preferCommentFor) can only be 'key' or 'this'`);
      }

      const { [options.newlineAround || 'header']: around = name2code.header } = name2code;
      this.newlineUnderSection = around > 0;
      this.newlineUnderSectionButPair = around === 1 || around === 2;
      this.newlineUnderHeader = around > 1;
      this.newlineUnderPair = around > 2;
      this.newlineUnderPairButDotted = around === 3;
      this.newlineUnderDotted = around > 3;

      const { indent } = options;
      if (indent === undefined);
      else if (typeof indent === 'string') {
        if (!IS_INDENT(indent)) {
          throw SyntaxError$1(`TOML.stringify(,{indent}) can only include Tab or Space`);
        }
        this.indent = indent;
      } else if (typeof indent === 'number') {
        if (!isSafeInteger(indent)) {
          throw RangeError$1(`TOML.stringify(,{indent:${indent}}) is out of range`);
        }
        this.indent = ' '.repeat(indent);
      } else {
        throw TypeError$1(`TOML.stringify(,{indent}) can not be "${typeof indent}" type`);
      }

      const { T } = options;
      if (T === undefined);
      else if (T === ' ' || T === 't' || T === 'T') {
        this.T = T;
      } else {
        throw TypeError$1(`TOML.stringify(,{T}) can only be "T" or " " or "t"`);
      }

      const { Z } = options;
      if (Z === undefined);
      else if (Z === 'z' || Z === 'Z') {
        this.Z = Z;
      } else {
        throw TypeError$1(`TOML.stringify(,{Z}) can only be "Z" or "z"`);
      }

      if (options.xNull) {
        this.nullDisabled = false;
      }

      const { xBeforeNewlineInMultilineTable } = options;
      if (xBeforeNewlineInMultilineTable === undefined);
      else if (xBeforeNewlineInMultilineTable === '' || xBeforeNewlineInMultilineTable === ',') {
        this.multilineTableDisabled = false;
        this.multilineTableComma = !!xBeforeNewlineInMultilineTable;
      } else {
        throw TypeError$1(
          `TOML.stringify(,{xBeforeNewlineInMultilineTable}) can only be "" or ","`,
        );
      }

      const $singlelineArray = options.forceInlineArraySpacing;
      switch ($singlelineArray) {
        case undefined:
          break;
        case 0:
        case 1:
        case 2:
        case 3:
          this.$singlelineArray = $singlelineArray;
          break;
        default:
          throw typeof $singlelineArray === 'number'
            ? RangeError$1(
                `array inline mode must be 0 | 1 | 2 | 3, not including ${$singlelineArray}`,
              )
            : TypeError$1(
                `array inline mode must be "number" type, not including ${
                  $singlelineArray === null ? '"null"' : typeof $singlelineArray
                }`,
              );
      }

      return this;
    }

    appendSection() {
      return (this[this.length] = new TOMLSection(this));
    }
  }

  const linesFromStringify = new WeakSet$1();
  const beLinesFromStringify = /*#__PURE__*/ add.bind(linesFromStringify);
  const isLinesFromStringify = /*#__PURE__*/ has.bind(linesFromStringify);
  const stringify = (rootTable, options) => {
    const document = new TOMLDocument(options);
    const section = document[0];
    section[0] = '';
    x(section.assignBlock(``, ``, rootTable, getOwnPropertyNames(rootTable)));
    document.newlineUnderSectionButPair && section.length !== 1 && section.appendNewline();
    document.newlineUnderSection || document[document.length - 1].appendNewline();
    if (document.newline) {
      return document.join(document.newline);
    }
    const lines = document.flat();
    beLinesFromStringify(lines);
    return lines;
  };
  const multiline = /*#__PURE__*/ (() => {
    const multiline = (value, string) =>
      typeof value === 'string'
        ? LiteralObject(
            (multilineNeedBasic(value) ? multilineBasicString : multilineLiteralString)(
              ('\n' + value).split('\n'),
            ),
            value,
          )
        : isArray$1(value)
        ? LiteralObject(
            multilineString(Lines(value)),
            typeof string === 'string' ? string : Null$1(null),
          )
        : multilineTable(value);
    multiline.basic = (lines, string) =>
      typeof lines === 'string'
        ? LiteralObject(multilineBasicString(('\n' + lines).split('\n')), lines)
        : LiteralObject(
            multilineBasicString(Lines(lines)),
            typeof string === 'string' ? string : Null$1(null),
          );
    multiline.array = multilineArray;
    freeze(multiline);
    return multiline;
  })();
  const basic = value => LiteralObject(singlelineBasicString(value), value);
  const literal = (literal, ...chars) => {
    if (typeof literal === 'string') {
      if (chars.length === 1) {
        return LiteralObject(literal.includes('\n') ? literal.split('\n') : literal, chars[0]);
      }
    } else {
      let index = chars.length;
      if (index) {
        const { raw } = literal;
        literal = raw[index];
        while (index) {
          chars[--index] += raw[index];
        }
        literal = chars.join('') + literal;
      } else {
        literal = literal.raw[0];
      }
    }
    return LiteralObject(literal.includes('\n') ? literal.split('\n') : literal, Null$1(null));
  };

  const textDecoder = /*#__PURE__*/ new TextDecoder$1(
    'utf-8',
    Null$1({ fatal: true, ignoreBOM: false }),
  );
  const binary2string = arrayBufferLike => {
    if (
      isView(arrayBufferLike)
        ? arrayBufferLike.length !== arrayBufferLike.byteLength
        : !isArrayBuffer(arrayBufferLike)
    ) {
      throw TypeError$1(`only Uint8Array or ArrayBuffer is acceptable`);
    }
    try {
      return textDecoder.decode(arrayBufferLike);
    } catch {
      throw Error$1(
        `A TOML doc must be a (ful-scalar) valid UTF-8 file, without any unknown code point.`,
      );
    }
  };
  const isBinaryLike = value => 'byteLength' in value; ///

  const { test: includesNonScalar } = theRegExp(/[\uD800-\uDFFF]/u);
  const assertFulScalar = string => {
    if (clearRegExp$1(includesNonScalar(string))) {
      throw Error$1(
        `A TOML doc must be a (ful-scalar) valid UTF-8 file, without any uncoupled UCS-4 character code.`,
      );
    }
  };

  let holding = false;

  const parse = (source, specificationVersion, multilineStringJoiner, bigint, x, argsMode) => {
    let sourcePath = '';
    if (typeof source === 'object' && source) {
      if (isArray$1(source)) {
        throw TypeError$1(
          isLinesFromStringify(source)
            ? `TOML.parse(array from TOML.stringify(,{newline?}))`
            : `TOML.parse(array)`,
        );
      } else if (isBinaryLike(source)) {
        source = binary2string(source);
      } else {
        sourcePath = source.path;
        if (typeof sourcePath !== 'string') {
          throw TypeError$1(`TOML.parse(source.path)`);
        }
        const { data, require: req = typeof require === 'function' ? require : undefined$1 } =
          source;
        if (req) {
          const { resolve } = req;
          if (resolve != null) {
            const { paths } = resolve;
            if (paths != null) {
              const ret = apply$1(paths, resolve, ['']);
              if (ret != null) {
                const val = ret[0];
                if (val != null) {
                  const dirname_ = val.replace(/node_modules$/, '');
                  if (dirname_) {
                    sourcePath = req('path').resolve(dirname_, sourcePath);
                    if (typeof sourcePath !== 'string') {
                      throw TypeError$1(`TOML.parse(source.require('path').resolve)`);
                    }
                  }
                }
              }
            }
          }
          if (data === undefined$1) {
            const data = req('fs').readFileSync(sourcePath);
            if (typeof data === 'object' && data && isBinaryLike(data)) {
              source = binary2string(data);
            } else {
              throw TypeError$1(`TOML.parse(source.require('fs').readFileSync)`);
            }
          } else if (typeof data === 'string') {
            assertFulScalar((source = data));
          } else if (typeof data === 'object' && data && isBinaryLike(data)) {
            source = binary2string(data);
          } else {
            throw TypeError$1(`TOML.parse(source.data)`);
          }
        } else {
          if (data === undefined$1) {
            throw TypeError$1(`TOML.parse(source.data|source.require)`);
          } else if (typeof data === 'string') {
            assertFulScalar((source = data));
          } else if (typeof data === 'object' && data && isBinaryLike(data)) {
            source = binary2string(data);
          } else {
            throw TypeError$1(`TOML.parse(source.data)`);
          }
        }
      }
    } else if (typeof source === 'string') {
      assertFulScalar(source);
    } else {
      throw TypeError$1(`TOML.parse(source)`);
    }
    let joiner;
    let keys;
    if (typeof multilineStringJoiner === 'object' && multilineStringJoiner) {
      if (bigint !== undefined$1 || x !== undefined$1) {
        throw TypeError$1(`options mode ? args mode`);
      }
      joiner = multilineStringJoiner.joiner;
      bigint = multilineStringJoiner.bigint;
      keys = multilineStringJoiner.keys;
      x = multilineStringJoiner.x;
      argsMode = '';
    } else {
      joiner = multilineStringJoiner;
    }
    let rootTable;
    let process;
    if (holding) {
      throw Error$1(`parsing during parsing.`);
    }
    holding = true;
    try {
      use(specificationVersion, joiner, bigint, keys, x, argsMode);
      todo(source, sourcePath);
      source &&
        source[0] === '\uFEFF' &&
        throws(
          TypeError$1(`TOML content (string) should not start with BOM (U+FEFF)` + where(' at ')),
        );
      rootTable = Root();
      process = Process();
    } finally {
      done(); //clearWeakSets();
      clear();
      holding = false;
      clearRegExp$1();
    }
    process && process();
    return rootTable;
  };

  const parse$1 = /*#__PURE__*/ assign$1(
    (source, specificationVersion, multilineStringJoiner, useBigInt, xOptions) =>
      typeof specificationVersion === 'number'
        ? parse(source, specificationVersion, multilineStringJoiner, useBigInt, xOptions, ',,')
        : parse(source, 1.0, specificationVersion, multilineStringJoiner, useBigInt, ','),
    {
      '1.0': (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions, ','),
      1.0: (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 1.0, multilineStringJoiner, useBigInt, xOptions, ','),
      0.5: (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 0.5, multilineStringJoiner, useBigInt, xOptions, ','),
      0.4: (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 0.4, multilineStringJoiner, useBigInt, xOptions, ','),
      0.3: (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 0.3, multilineStringJoiner, useBigInt, xOptions, ','),
      0.2: (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 0.2, multilineStringJoiner, useBigInt, xOptions, ','),
      0.1: (source, multilineStringJoiner, useBigInt, xOptions) =>
        parse(source, 0.1, multilineStringJoiner, useBigInt, xOptions, ','),
    },
  );

  const _export = /*#__PURE__*/ Default({
    version,
    parse: parse$1,
    stringify,
    Section,
    inline,
    multiline,
    basic,
    literal,
    commentFor,
    commentForThis,
    OffsetDateTime,
    LocalDateTime,
    LocalDate,
    LocalTime,
    isInline,
    isSection,
    Keys,
  });

  return _export;
});
