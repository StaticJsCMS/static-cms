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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsIi4uLy4uL2otcmVnZXhwL3NyYy90aGVSZWdFeHAudHMiLCIuLi8uLi9qLXJlZ2V4cC9zcmMvbmV3UmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2NsZWFyUmVnRXhwLnRzIiwiLi4vLi4vai1yZWdleHAvc3JjL2dyb3VwaWZ5LnRzIiwiLi4vLi4vai1vcmRlcmlmeS9zcmMvZXhwb3J0LnRzIiwidHlwZXMvbm9uLWF0b20udHMiLCJ0eXBlcy9UYWJsZS50cyIsIml0ZXJhdG9yLnRzIiwicmVnZXhwcy50cyIsIm9wdGlvbnMudHMiLCJqLWxleGVyLnRzIiwidHlwZXMvYXRvbS50cyIsInR5cGVzL0FycmF5LnRzIiwidHlwZXMvRGF0ZXRpbWUudHMiLCJ0eXBlcy9TdHJpbmcudHMiLCJ0eXBlcy9JbnRlZ2VyLnRzIiwidHlwZXMvRmxvYXQudHMiLCJwYXJzZS9vbi10aGUtc3BvdC50cyIsInR5cGVzL2NvbW1lbnQudHMiLCJwYXJzZS9sZXZlbC1sb29wLnRzIiwic3RyaW5naWZ5L3N0cmluZy50cyIsInN0cmluZ2lmeS9mbG9hdC50cyIsInN0cmluZ2lmeS9zZWN0aW9uLnRzIiwic3RyaW5naWZ5L2RvY3VtZW50LnRzIiwic3RyaW5naWZ5Ly50cyIsInBhcnNlLy50cyIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCcxLjM4LjAnOyIsImltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgZXhlYyBmcm9tICcuUmVnRXhwLnByb3RvdHlwZS5leGVjJztcblxuZXhwb3J0IHZhciBUZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYmluZFxuXHQ/IC8qI19fUFVSRV9fKi9iaW5kLmJpbmQodGVzdCAgICAgICApICAgICAgIFxuXHQ6IGZ1bmN0aW9uIChyZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuXHRcdH07XG5cdH07XG5cbmV4cG9ydCB2YXIgRXhlYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGJpbmRcblx0PyAvKiNfX1BVUkVfXyovYmluZC5iaW5kKGV4ZWMgICAgICAgKSAgICAgICBcblx0OiBmdW5jdGlvbiAocmUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGV4ZWMuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG5mdW5jdGlvbiBfX1BVUkVfXyAocmUgICAgICAgICkgICAgICAgICB7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dmFyIHNvdXJjZSA9IHRlc3Quc291cmNlID0gZXhlYy5zb3VyY2UgPSByZS5zb3VyY2U7XG5cdHRlc3QudW5pY29kZSA9IGV4ZWMudW5pY29kZSA9IHJlLnVuaWNvZGU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9IHJlLmlnbm9yZUNhc2U7XG5cdHRlc3QubXVsdGlsaW5lID0gZXhlYy5tdWx0aWxpbmUgPSBzb3VyY2UuaW5kZXhPZignXicpPDAgJiYgc291cmNlLmluZGV4T2YoJyQnKTwwID8gbnVsbCA6IHJlLm11bHRpbGluZTtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IHNvdXJjZS5pbmRleE9mKCcuJyk8MCA/IG51bGwgOiByZS5kb3RBbGw7XG5cdHJldHVybiByZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRoZVJlZ0V4cCAocmUgICAgICAgICkgICAgICAgICB7IHJldHVybiAvKiNfX1BVUkVfXyovX19QVVJFX18ocmUpOyB9O1xuXG4gICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICBcbiAgIiwiaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcbmltcG9ydCBmcmVlemUgZnJvbSAnLk9iamVjdC5mcmVlemU/JztcbmltcG9ydCBiaW5kIGZyb20gJy5GdW5jdGlvbi5wcm90b3R5cGUuYmluZD8nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLlByb3h5Pyc7XG5cbmltcG9ydCB7IFRlc3QsIEV4ZWMgfSBmcm9tICcuL3RoZVJlZ0V4cCc7XG5cbnZhciBOVCA9IC9bXFxuXFx0XSsvZztcbnZhciBFU0NBUEUgPSAvXFxcXC4vZztcbmZ1bmN0aW9uIGdyYXZlQWNjZW50UmVwbGFjZXIgKCQkICAgICAgICApIHsgcmV0dXJuICQkPT09J1xcXFxgJyA/ICdgJyA6ICQkOyB9XG5cbnZhciBpbmNsdWRlcyA9ICcnLmluY2x1ZGVzICAgICAgIFxuXHQ/IGZ1bmN0aW9uICh0aGF0ICAgICAgICAsIHNlYXJjaFN0cmluZyAgICAgICAgKSB7IHJldHVybiB0aGF0LmluY2x1ZGVzKHNlYXJjaFN0cmluZyk7IH1cblx0OiBmdW5jdGlvbiAodGhhdCAgICAgICAgLCBzZWFyY2hTdHJpbmcgICAgICAgICkgeyByZXR1cm4gdGhhdC5pbmRleE9mKHNlYXJjaFN0cmluZyk+LTE7IH07XG5cbmZ1bmN0aW9uIFJFICggICAgICAgICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0dmFyIFUgPSB0aGlzLlU7XG5cdHZhciBJID0gdGhpcy5JO1xuXHR2YXIgTSA9IHRoaXMuTTtcblx0dmFyIFMgPSB0aGlzLlM7XG5cdHZhciByYXcgPSB0ZW1wbGF0ZS5yYXc7XG5cdHZhciBzb3VyY2UgPSByYXdbMF0gLnJlcGxhY2UoTlQsICcnKTtcblx0dmFyIGluZGV4ID0gMTtcblx0dmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0dmFyIHZhbHVlICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyApIHsgc291cmNlICs9IHZhbHVlOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgdmFsdWVfc291cmNlID0gdmFsdWUuc291cmNlO1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWVfc291cmNlIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcignc291cmNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUudW5pY29kZT09PVUgKSB7IHRocm93IFN5bnRheEVycm9yKCd1bmljb2RlJyk7IH1cblx0XHRcdGlmICggdmFsdWUuaWdub3JlQ2FzZT09PUkgKSB7IHRocm93IFN5bnRheEVycm9yKCdpZ25vcmVDYXNlJyk7IH1cblx0XHRcdGlmICggdmFsdWUubXVsdGlsaW5lPT09TSAmJiAoIGluY2x1ZGVzKHZhbHVlX3NvdXJjZSwgJ14nKSB8fCBpbmNsdWRlcyh2YWx1ZV9zb3VyY2UsICckJykgKSApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ211bHRpbGluZScpOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmRvdEFsbD09PVMgJiYgaW5jbHVkZXModmFsdWVfc291cmNlLCAnLicpICkgeyB0aHJvdyBTeW50YXhFcnJvcignZG90QWxsJyk7IH1cblx0XHRcdHNvdXJjZSArPSB2YWx1ZV9zb3VyY2U7XG5cdFx0fVxuXHRcdHNvdXJjZSArPSByYXdbaW5kZXgrK10gLnJlcGxhY2UoTlQsICcnKTtcblx0fVxuXHR2YXIgcmUgICAgICAgICA9IFJlZ0V4cChVID8gc291cmNlID0gc291cmNlLnJlcGxhY2UoRVNDQVBFLCBncmF2ZUFjY2VudFJlcGxhY2VyKSA6IHNvdXJjZSwgdGhpcy5mbGFncyk7XG5cdHZhciB0ZXN0ID0gcmUudGVzdCA9IFRlc3QocmUpO1xuXHR2YXIgZXhlYyA9IHJlLmV4ZWMgPSBFeGVjKHJlKTtcblx0dGVzdC5zb3VyY2UgPSBleGVjLnNvdXJjZSA9IHNvdXJjZTtcblx0dGVzdC51bmljb2RlID0gZXhlYy51bmljb2RlID0gIVU7XG5cdHRlc3QuaWdub3JlQ2FzZSA9IGV4ZWMuaWdub3JlQ2FzZSA9ICFJO1xuXHR0ZXN0Lm11bHRpbGluZSA9IGV4ZWMubXVsdGlsaW5lID0gaW5jbHVkZXMoc291cmNlLCAnXicpIHx8IGluY2x1ZGVzKHNvdXJjZSwgJyQnKSA/ICFNIDogbnVsbDtcblx0dGVzdC5kb3RBbGwgPSBleGVjLmRvdEFsbCA9IGluY2x1ZGVzKHNvdXJjZSwgJy4nKSA/ICFTIDogbnVsbDtcblx0cmV0dXJuIHJlO1xufVxuXG52YXIgUkVfYmluZCA9IGJpbmQgJiYgLyojX19QVVJFX18qL2JpbmQuYmluZChSRSAgICAgICApO1xuXG5mdW5jdGlvbiBDb250ZXh0IChmbGFncyAgICAgICAgKSAgICAgICAgICB7XG5cdHJldHVybiB7XG5cdFx0VTogIWluY2x1ZGVzKGZsYWdzLCAndScpLFxuXHRcdEk6ICFpbmNsdWRlcyhmbGFncywgJ2knKSxcblx0XHRNOiAhaW5jbHVkZXMoZmxhZ3MsICdtJyksXG5cdFx0UzogIWluY2x1ZGVzKGZsYWdzLCAncycpLFxuXHRcdGZsYWdzOiBmbGFnc1xuXHR9O1xufVxuXG52YXIgQ09OVEVYVCAgICAgICAgICA9IC8qI19fUFVSRV9fKi9Db250ZXh0KCcnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJveHlcblx0PyAvKiNfX1BVUkVfXyovbmV3IFByb3h5KFJFLCB7XG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChSRSwgdGhpc0FyZywgYXJncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7IHJldHVybiBhcHBseShSRSwgQ09OVEVYVCwgYXJncyk7IH1cblx0XHQsXG5cdFx0Z2V0OiBmdW5jdGlvbiAoUkUsIGZsYWdzICAgICAgICApIHsgcmV0dXJuIFJFX2JpbmQoQ29udGV4dChmbGFncykpOyB9XG5cdFx0LFxuXHRcdGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdCxcblx0XHRwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH1cblx0fSlcblx0OiAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdFJFLmFwcGx5ID0gUkUuYXBwbHk7XG5cdFx0dmFyIG5ld1JlZ0V4cCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KENPTlRFWFQsIGFyZ3VtZW50cyAgICAgICApOyB9ICAgICAgIDtcblx0XHR2YXIgZCA9IDE7XG5cdFx0dmFyIGcgPSBkKjI7XG5cdFx0dmFyIGkgPSBnKjI7XG5cdFx0dmFyIG0gPSBpKjI7XG5cdFx0dmFyIHMgPSBpKjI7XG5cdFx0dmFyIHUgPSBzKjI7XG5cdFx0dmFyIHkgPSB1KjI7XG5cdFx0dmFyIGZsYWdzID0geSoyIC0gMTtcblx0XHR3aGlsZSAoIGZsYWdzLS0gKSB7XG5cdFx0XHQoIGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0XHRcdG5ld1JlZ0V4cFtjb250ZXh0LmZsYWdzXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFJFLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyAgICAgICApOyB9O1xuXHRcdFx0fSApKENvbnRleHQoXG5cdFx0XHRcdCggZmxhZ3MgJiBkID8gJycgOiAnZCcgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBnID8gJycgOiAnZycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBpID8gJycgOiAnaScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBtID8gJycgOiAnbScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiBzID8gJycgOiAncycgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB1ID8gJycgOiAndScgKVxuXHRcdFx0XHQrXG5cdFx0XHRcdCggZmxhZ3MgJiB5ID8gJycgOiAneScgKVxuXHRcdFx0KSk7XG5cdFx0fVxuXHRcdHJldHVybiBmcmVlemUgPyBmcmVlemUobmV3UmVnRXhwKSA6IG5ld1JlZ0V4cDtcblx0fSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgIFxuXHQgICAgICAgICAgXG5cdCAgICAgICAgICBcblx0ICAgICAgICAgICAgIFxuICAgIiwiaW1wb3J0IFJlZ0V4cCBmcm9tICcuUmVnRXhwJztcblxudmFyIGNsZWFyUmVnRXhwID0gJyRfJyBpbiBSZWdFeHBcblx0PyAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXHRcdHZhciBSRUdFWFAgPSAvXi87XG5cdFx0UkVHRVhQLnRlc3QgPSBSRUdFWFAudGVzdDtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY2xlYXJSZWdFeHAgICAgICAgICAgICAgICAgKHZhbHVlICAgICkgICAgICAgICAgICAgICAge1xuXHRcdFx0UkVHRVhQLnRlc3QoJycpO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH0oKVxuXHQ6IGZ1bmN0aW9uIGNsZWFyUmVnRXhwICAgICAgICAgICAgICAgICh2YWx1ZSAgICApICAgICAgICAgICAgICAgIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsZWFyUmVnRXhwOyIsImltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgTkVFRF9UT19FU0NBUEVfSU5fUkVHRVhQID0gL15bJCgpKitcXC0uP1tcXFxcXFxdXnt8XS87XG52YXIgU1VSUk9HQVRFX1BBSVIgPSAvXltcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIEdST1VQID0gLyojX19QVVJFX18qL2NyZWF0ZShOVUxMKSAgICAgICAgIDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JvdXBpZnkgKGJyYW5jaGVzICAgICAgICAgICAgICAgICAgICwgdUZsYWcgICAgICAgICAgLCBub0VzY2FwZSAgICAgICAgICApICAgICAgICAge1xuXHR2YXIgZ3JvdXAgPSBjcmVhdGUoTlVMTCkgICAgICAgICA7XG5cdHZhciBhcHBlbmRCcmFuY2ggPSB1RmxhZyA/IGFwcGVuZFBvaW50QnJhbmNoIDogYXBwZW5kQ29kZUJyYW5jaDtcblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gYnJhbmNoZXMubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyBhcHBlbmRCcmFuY2goZ3JvdXAsIGJyYW5jaGVzW2luZGV4XSApOyB9XG5cdHJldHVybiBzb3VyY2lmeShncm91cCwgIW5vRXNjYXBlKTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFBvaW50QnJhbmNoIChncm91cCAgICAgICAsIGJyYW5jaCAgICAgICAgKSAgICAgICB7XG5cdGlmICggYnJhbmNoICkge1xuXHRcdHZhciBjaGFyYWN0ZXIgICAgICAgICA9IFNVUlJPR0FURV9QQUlSLnRlc3QoYnJhbmNoKSA/IGJyYW5jaC5zbGljZSgwLCAyKSA6IGJyYW5jaC5jaGFyQXQoMCk7XG5cdFx0YXBwZW5kUG9pbnRCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKGNoYXJhY3Rlci5sZW5ndGgpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ29kZUJyYW5jaCAoZ3JvdXAgICAgICAgLCBicmFuY2ggICAgICAgICkgICAgICAge1xuXHRpZiAoIGJyYW5jaCApIHtcblx0XHR2YXIgY2hhcmFjdGVyICAgICAgICAgPSBicmFuY2guY2hhckF0KDApO1xuXHRcdGFwcGVuZENvZGVCcmFuY2goZ3JvdXBbY2hhcmFjdGVyXSB8fCAoIGdyb3VwW2NoYXJhY3Rlcl0gPSBjcmVhdGUoTlVMTCkgICAgICAgICAgKSwgYnJhbmNoLnNsaWNlKDEpKTtcblx0fVxuXHRlbHNlIHsgZ3JvdXBbJyddID0gR1JPVVA7IH1cbn1cblxuZnVuY3Rpb24gc291cmNpZnkgKGdyb3VwICAgICAgICwgbmVlZEVzY2FwZSAgICAgICAgICkgICAgICAgICB7XG5cdHZhciBicmFuY2hlcyAgICAgICAgICAgPSBbXTtcblx0dmFyIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2ggICAgICAgICAgID0gW107XG5cdHZhciBub0VtcHR5QnJhbmNoICAgICAgICAgID0gdHJ1ZTtcblx0Zm9yICggdmFyIGNoYXJhY3RlciBpbiBncm91cCApIHtcblx0XHRpZiAoIGNoYXJhY3RlciApIHtcblx0XHRcdHZhciBzdWJfYnJhbmNoZXMgICAgICAgICA9IHNvdXJjaWZ5KGdyb3VwW2NoYXJhY3Rlcl0gLCBuZWVkRXNjYXBlKTtcblx0XHRcdGlmICggbmVlZEVzY2FwZSAmJiBORUVEX1RPX0VTQ0FQRV9JTl9SRUdFWFAudGVzdChjaGFyYWN0ZXIpICkgeyBjaGFyYWN0ZXIgPSAnXFxcXCcgKyBjaGFyYWN0ZXI7IH1cblx0XHRcdHN1Yl9icmFuY2hlcyA/IGJyYW5jaGVzLnB1c2goY2hhcmFjdGVyICsgc3ViX2JyYW5jaGVzKSA6IHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gucHVzaChjaGFyYWN0ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHsgbm9FbXB0eUJyYW5jaCA9IGZhbHNlOyB9XG5cdH1cblx0c2luZ2xlQ2hhcmFjdGVyc0JyYW5jaC5sZW5ndGggJiYgYnJhbmNoZXMudW5zaGlmdChzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoLmxlbmd0aD09PTEgPyBzaW5nbGVDaGFyYWN0ZXJzQnJhbmNoWzBdICA6ICdbJyArIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2guam9pbignJykgKyAnXScpO1xuXHRyZXR1cm4gYnJhbmNoZXMubGVuZ3RoPT09MFxuXHRcdD8gJydcblx0XHQ6ICggYnJhbmNoZXMubGVuZ3RoPT09MSAmJiAoIHNpbmdsZUNoYXJhY3RlcnNCcmFuY2gubGVuZ3RoIHx8IG5vRW1wdHlCcmFuY2ggKVxuXHRcdFx0PyBicmFuY2hlc1swXVxuXHRcdFx0OiAnKD86JyArIGJyYW5jaGVzLmpvaW4oJ3wnKSArICcpJ1xuXHRcdClcblx0XHQrICggbm9FbXB0eUJyYW5jaCA/ICcnIDogJz8nICk7XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IFByb3h5IGZyb20gJy5Qcm94eSc7XG5pbXBvcnQgT2JqZWN0X2Fzc2lnbiBmcm9tICcuT2JqZWN0LmFzc2lnbic7XG5pbXBvcnQgT2JqZWN0X2NyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IE9iamVjdF9kZWZpbmVQcm9wZXJ0eSBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBPYmplY3RfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcbmltcG9ydCBPYmplY3RfZGVmaW5lUHJvcGVydGllcyBmcm9tICcuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMnO1xuaW1wb3J0IE9iamVjdF9mcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBPYmplY3RfZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBoYXNPd24gZnJvbSAnLk9iamVjdC5oYXNPd24/PSc7XG5pbXBvcnQgUmVmbGVjdF9hcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseSc7XG5pbXBvcnQgUmVmbGVjdF9jb25zdHJ1Y3QgZnJvbSAnLlJlZmxlY3QuY29uc3RydWN0JztcbmltcG9ydCBSZWZsZWN0X2RlZmluZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlZmluZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5IGZyb20gJy5SZWZsZWN0LmRlbGV0ZVByb3BlcnR5JztcbmltcG9ydCBSZWZsZWN0X293bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cyc7XG5pbXBvcnQgdW5kZWZpbmVkIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IE5VTEwgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxuaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbmNvbnN0IEtlZXBlciA9ICAgICAoKSAgICAgID0+IFtdO1xuXG5jb25zdCBuZXdXZWFrTWFwID0gKCkgPT4ge1xuXHRjb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXA7XG5cdHdlYWtNYXAuaGFzID0gd2Vha01hcC5oYXM7XG5cdHdlYWtNYXAuZ2V0ID0gd2Vha01hcC5nZXQ7XG5cdHdlYWtNYXAuc2V0ID0gd2Vha01hcC5zZXQ7XG5cdHJldHVybiB3ZWFrTWFwO1xufTtcbmNvbnN0IHRhcmdldDJrZWVwZXIgPSAvKiNfX1BVUkVfXyovbmV3V2Vha01hcCgpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgcHJveHkydGFyZ2V0ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuY29uc3QgdGFyZ2V0MnByb3h5ID0gLyojX19QVVJFX18qL25ld1dlYWtNYXAoKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcblxuY29uc3QgRXh0ZXJuYWxEZXNjcmlwdG9yID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzb3VyY2UgICApICAgID0+IHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgO1xuXHRpZiAoIGhhc093bihzb3VyY2UsICdlbnVtZXJhYmxlJykgKSB7IHRhcmdldC5lbnVtZXJhYmxlID0gc291cmNlLmVudW1lcmFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnY29uZmlndXJhYmxlJykgKSB7IHRhcmdldC5jb25maWd1cmFibGUgPSBzb3VyY2UuY29uZmlndXJhYmxlOyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3ZhbHVlJykgKSB7IHRhcmdldC52YWx1ZSA9IHNvdXJjZS52YWx1ZTsgfVxuXHRpZiAoIGhhc093bihzb3VyY2UsICd3cml0YWJsZScpICkgeyB0YXJnZXQud3JpdGFibGUgPSBzb3VyY2Uud3JpdGFibGU7IH1cblx0aWYgKCBoYXNPd24oc291cmNlLCAnZ2V0JykgKSB7IHRhcmdldC5nZXQgPSBzb3VyY2UuZ2V0OyB9XG5cdGlmICggaGFzT3duKHNvdXJjZSwgJ3NldCcpICkgeyB0YXJnZXQuc2V0ID0gc291cmNlLnNldDsgfVxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgaGFuZGxlcnMgICAgICAgICAgICAgICAgICAgICAgID0gLyojX19QVVJFX18qL09iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShOVUxMKSwge1xuXHRkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICAgICAgICh0YXJnZXQgICAgICAgICAgICAgICAgICAgLCBrZXkgICAsIGRlc2NyaXB0b3IgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgPT4ge1xuXHRcdGlmICggaGFzT3duKHRhcmdldCwga2V5KSApIHtcblx0XHRcdHJldHVybiBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKTtcblx0XHR9XG5cdFx0aWYgKCBSZWZsZWN0X2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIGRlc2NyaXB0b3IpKSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0a2VlcGVyW2tlZXBlci5sZW5ndGhdID0ga2V5O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0ZGVsZXRlUHJvcGVydHk6ICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICwga2V5ICAgKSAgICAgICAgICA9PiB7XG5cdFx0aWYgKCBSZWZsZWN0X2RlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSApIHtcblx0XHRcdGNvbnN0IGtlZXBlciA9IHRhcmdldDJrZWVwZXIuZ2V0KHRhcmdldCkgO1xuXHRcdFx0Y29uc3QgaW5kZXggPSBrZWVwZXIuaW5kZXhPZihrZXkpO1xuXHRcdFx0aW5kZXg8MCB8fCAtLWtlZXBlci5jb3B5V2l0aGluKGluZGV4LCBpbmRleCArIDEpLmxlbmd0aDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdG93bktleXM6ICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgKSA9PiB0YXJnZXQya2VlcGVyLmdldCh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICxcblx0Y29uc3RydWN0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICwgYXJncyAgICwgbmV3VGFyZ2V0ICAgICApICAgID0+IG9yZGVyaWZ5KFJlZmxlY3RfY29uc3RydWN0KHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSksXG5cdGFwcGx5OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aGlzQXJnICAgLCBhcmdzICAgKSAgICA9PiBvcmRlcmlmeShSZWZsZWN0X2FwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykpLFxufSk7XG5cbmNvbnN0IG5ld1Byb3h5ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCAgICwga2VlcGVyICAgICAgICAgICApICAgID0+IHtcblx0dGFyZ2V0MmtlZXBlci5zZXQodGFyZ2V0LCBrZWVwZXIpO1xuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eSAgICh0YXJnZXQsIGhhbmRsZXJzKTtcblx0cHJveHkydGFyZ2V0LnNldChwcm94eSwgdGFyZ2V0KTtcblx0cmV0dXJuIHByb3h5O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzT3JkZXJlZCA9IChvYmplY3QgICAgICAgICkgICAgICAgICAgPT4gcHJveHkydGFyZ2V0LmhhcyhvYmplY3QpO1xuZXhwb3J0IGNvbnN0IGlzID0gKG9iamVjdDEgICAgICAgICwgb2JqZWN0MiAgICAgICAgKSAgICAgICAgICA9PiBPYmplY3RfaXMoXG5cdHByb3h5MnRhcmdldC5nZXQob2JqZWN0MSkgfHwgb2JqZWN0MSxcblx0cHJveHkydGFyZ2V0LmdldChvYmplY3QyKSB8fCBvYmplY3QyLFxuKTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyaWZ5ID0gICAgICAgICAgICAgICAgICAgIChvYmplY3QgICApICAgID0+IHtcblx0aWYgKCBwcm94eTJ0YXJnZXQuaGFzKG9iamVjdCkgKSB7IHJldHVybiBvYmplY3Q7IH1cblx0bGV0IHByb3h5ID0gdGFyZ2V0MnByb3h5LmdldChvYmplY3QpICAgICAgICAgICAgICAgICA7XG5cdGlmICggcHJveHkgKSB7IHJldHVybiBwcm94eTsgfVxuXHRwcm94eSA9IG5ld1Byb3h5KG9iamVjdCwgT2JqZWN0X2Fzc2lnbihLZWVwZXIgICAgICAgICAgKCksIFJlZmxlY3Rfb3duS2V5cyhvYmplY3QpKSk7XG5cdHRhcmdldDJwcm94eS5zZXQob2JqZWN0LCBwcm94eSk7XG5cdHJldHVybiBwcm94eTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCB7IGNyZWF0ZSB9ID0ge1xuXHRjcmVhdGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3RvICAgICAgICAgICwgLi4uZGVzY3JpcHRvck1hcHMgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuXHRcdGNvbnN0IGtlZXBlciA9IEtlZXBlciAgICAgICAgICAgKCk7XG5cdFx0aWYgKCBkZXNjcmlwdG9yTWFwcy5sZW5ndGggKSB7XG5cdFx0XHRjb25zdCBkZXNjcmlwdG9yTWFwICAgICA9IE9iamVjdF9hc3NpZ24obmV3UHJveHkoT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICwga2VlcGVyKSwgLi4uZGVzY3JpcHRvck1hcHMpO1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtlZXBlcjtcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZWVwZXJbaW5kZXgrK10gO1xuXHRcdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdQcm94eShPYmplY3RfY3JlYXRlKHByb3RvLCBkZXNjcmlwdG9yTWFwKSAgICAgICAsIGtlZXBlciAgICAgICApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bykgICAgICAgLCBrZWVwZXIgICAgICAgKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCB7IGRlZmluZVByb3BlcnRpZXMgfSA9IHtcblx0ZGVmaW5lUHJvcGVydGllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICwgZGVzY3JpcHRvck1hcCAgICAsIC4uLmRlc2NyaXB0b3JNYXBzICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCBrZWVwZXIgPSBLZWVwZXIgICAgICAgICAgICgpO1xuXHRcdGRlc2NyaXB0b3JNYXAgPSBPYmplY3RfYXNzaWduKG5ld1Byb3h5KE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAsIGtlZXBlciksIGRlc2NyaXB0b3JNYXAsIC4uLmRlc2NyaXB0b3JNYXBzKTtcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0d2hpbGUgKCBpbmRleCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0IGtleSA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBFeHRlcm5hbERlc2NyaXB0b3IoZGVzY3JpcHRvck1hcFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdF9kZWZpbmVQcm9wZXJ0aWVzKG9yZGVyaWZ5KG9iamVjdCksIGRlc2NyaXB0b3JNYXApO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSAgICAgICAgICAgICAgICAgICAgKG9iamVjdCAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgZGVzY3JpcHRvck1hcCA9IE9iamVjdF9jcmVhdGUoTlVMTCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGNvbnN0IGtlZXBlciA9IE9iamVjdF9hc3NpZ24oS2VlcGVyICAgICAgICAgICgpLCBSZWZsZWN0X293bktleXMob2JqZWN0KSk7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZWVwZXI7XG5cdGxldCBpbmRleCA9IDA7XG5cdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2VlcGVyW2luZGV4KytdIDtcblx0XHRkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfYXNzaWduKE9iamVjdF9jcmVhdGUoTlVMTCksIE9iamVjdF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpICk7XG5cdH1cblx0cmV0dXJuIG5ld1Byb3h5KGRlc2NyaXB0b3JNYXAsIGtlZXBlcik7XG59O1xuXG5leHBvcnQgY29uc3QgTnVsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHRocm93Q29uc3RydWN0aW5nICgpICAgICAgICB7IHRocm93IFR5cGVFcnJvcihgU3VwZXIgY29uc3RydWN0b3IgTnVsbCBjYW5ub3QgYmUgaW52b2tlZCB3aXRoICduZXcnYCk7IH1cblx0ZnVuY3Rpb24gdGhyb3dBcHBseWluZyAoKSAgICAgICAgeyB0aHJvdyBUeXBlRXJyb3IoYFN1cGVyIGNvbnN0cnVjdG9yIE51bGwgY2Fubm90IGJlIGludm9rZWQgd2l0aG91dCAnbmV3J2ApOyB9XG5cdGNvbnN0IE51bGxpZnkgPSAoY29uc3RydWN0b3IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuXHRcdGRlbGV0ZSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cdFx0T2JqZWN0X2ZyZWV6ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0fTtcblx0ZnVuY3Rpb24gTnVsbCAoICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHJldHVybiBuZXcudGFyZ2V0XG5cdFx0XHQ/IG5ldy50YXJnZXQ9PT1OdWxsXG5cdFx0XHRcdD8gLyojX19QVVJFX18qL3Rocm93Q29uc3RydWN0aW5nKClcblx0XHRcdFx0OiAvKiNfX1BVUkVfXyovbmV3UHJveHkodGhpcywgS2VlcGVyICAgICAoKSlcblx0XHRcdDogdHlwZW9mIGNvbnN0cnVjdG9yPT09J2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IC8qI19fUFVSRV9fKi9OdWxsaWZ5KGNvbnN0cnVjdG9yKVxuXHRcdFx0XHQ6IC8qI19fUFVSRV9fKi90aHJvd0FwcGx5aW5nKCk7XG5cdH1cblx0Ly9AdHMtaWdub3JlXG5cdE51bGwucHJvdG90eXBlID0gbnVsbDtcblx0T2JqZWN0X2RlZmluZVByb3BlcnR5KE51bGwsICduYW1lJywgT2JqZWN0X2Fzc2lnbihPYmplY3RfY3JlYXRlKE5VTEwpLCB7IHZhbHVlOiAnJywgY29uZmlndXJhYmxlOiBmYWxzZSB9KSk7XG5cdC8vZGVsZXRlIE51bGwubGVuZ3RoO1xuXHRPYmplY3RfZnJlZXplKE51bGwpO1xuXHRyZXR1cm4gTnVsbDtcbn0oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IERFRkFVTFQgPSAvKiNfX1BVUkVfXyovT2JqZWN0X2Fzc2lnbihjbGFzcyBleHRlbmRzIG51bGwgeyB3cml0YWJsZSAoKSB7fSBlbnVtZXJhYmxlICgpIHt9IGNvbmZpZ3VyYWJsZSAoKSB7fSB9LnByb3RvdHlwZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7XG5cdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdHdyaXRhYmxlOiB0cnVlLFxuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRjb25maWd1cmFibGU6IHRydWUsXG59KTtcbmV4cG9ydCBjb25zdCBmcm9tRW50cmllcyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW50cmllcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcm90byAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IHRhcmdldCA9IE9iamVjdF9mcm9tRW50cmllcyhlbnRyaWVzKTtcblx0Y29uc3Qga2VlcGVyICAgICAgICAgICAgPSBPYmplY3RfYXNzaWduKEtlZXBlciAgICgpLCBSZWZsZWN0X293bktleXModGFyZ2V0KSk7XG5cdGlmICggcHJvdG89PT11bmRlZmluZWQgKSB7IHJldHVybiBuZXdQcm94eSh0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRpZiAoIHByb3RvPT09bnVsbCApIHsgcmV0dXJuIG5ld1Byb3h5KE9iamVjdF9hc3NpZ24oT2JqZWN0X2NyZWF0ZShwcm90byksIHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTsgfVxuXHRjb25zdCBkZXNjcmlwdG9yTWFwID0gT2JqZWN0X2NyZWF0ZShOVUxMKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2VlcGVyO1xuXHRsZXQgaW5kZXggPSAwO1xuXHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICA9IGtlZXBlcltpbmRleCsrXSA7XG5cdFx0KCBkZXNjcmlwdG9yTWFwW2tleV0gPSBPYmplY3RfY3JlYXRlKERFRkFVTFQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWUgPSB0YXJnZXRba2V5XTtcblx0fVxuXHRyZXR1cm4gbmV3UHJveHkoT2JqZWN0X2NyZWF0ZShwcm90bywgZGVzY3JpcHRvck1hcCkgICAgICAgICAgICAgICAgICAgICAgICwga2VlcGVyKTtcbn07XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0JztcbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9EZWZhdWx0KHtcblx0dmVyc2lvbixcblx0aXNPcmRlcmVkLFxuXHRpcyxcblx0b3JkZXJpZnksXG5cdGNyZWF0ZSxcblx0ZGVmaW5lUHJvcGVydGllcyxcblx0TnVsbCxcblx0ZnJvbUVudHJpZXMsXG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMsXG59KTtcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgV2Vha1NldCBmcm9tICcuV2Vha1NldCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuV2Vha01hcCc7XG5pbXBvcnQgc2V0X2hhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBzZXRfYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IHNldF9kZWwgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSc7XG5pbXBvcnQgbWFwX2hhcyBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBtYXBfZ2V0IGZyb20gJy5XZWFrTWFwLnByb3RvdHlwZS5nZXQnO1xuaW1wb3J0IG1hcF9zZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgbWFwX2RlbCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmNvbnN0IElOTElORVMgPSBuZXcgV2Vha01hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgU0VDVElPTlMgPSBuZXcgV2Vha1NldCAgICAgICAgICAgICAgICAoKTtcblxuY29uc3QgZGVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX2RlbC5iaW5kKElOTElORVMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgZGVTZWN0aW9uID0gLyojX19QVVJFX18qL3NldF9kZWwuYmluZChTRUNUSU9OUykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IGlzSW5saW5lID0gLyojX19QVVJFX18qL21hcF9oYXMuYmluZChJTkxJTkVTKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IG9mSW5saW5lID0gLyojX19QVVJFX18qL21hcF9nZXQuYmluZChJTkxJTkVTKSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiA7XG5leHBvcnQgY29uc3QgYmVJbmxpbmUgPSAvKiNfX1BVUkVfXyovbWFwX3NldC5iaW5kKElOTElORVMpICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIDtcbmV4cG9ydCBjb25zdCBpbmxpbmUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICwgbW9kZSAgICAgICAgICAgICAgICAsIGxvb3BpbmcgICAgICAgICApICAgID0+IHtcblx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRpZiAoIGxvb3BpbmcgKSB7IG1vZGUgPSAzOyB9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIG1vZGU9PT11bmRlZmluZWQgKSB7IG1vZGUgPSAzOyB9XG5cdFx0XHRlbHNlIGlmICggbW9kZSE9PTAgJiYgbW9kZSE9PTEgJiYgbW9kZSE9PTIgJiYgbW9kZSE9PTMgKSB7XG5cdFx0XHRcdHRocm93IHR5cGVvZiBtb2RlPT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAke21vZGV9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHttb2RlPT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgbW9kZX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVJbmxpbmUodmFsdWUsIG1vZGUpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGJlSW5saW5lKHZhbHVlLCB0cnVlKTtcblx0XHRkZVNlY3Rpb24odmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lVGFibGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgICApICAgID0+IHtcblx0YmVJbmxpbmUodmFsdWUsIGZhbHNlKTtcblx0ZGVTZWN0aW9uKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aWxpbmVBcnJheSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlICAgKSAgICA9PiB7XG5cdGRlSW5saW5lKHZhbHVlKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfaGFzLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGJlU2VjdGlvbiA9IC8qI19fUFVSRV9fKi9zZXRfYWRkLmJpbmQoU0VDVElPTlMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbmV4cG9ydCBjb25zdCBTZWN0aW9uID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhYmxlICAgKSAgICA9PiB7XG5cdGlmICggaXNBcnJheSh0YWJsZSkgKSB7IHRocm93IFR5cGVFcnJvcihgYXJyYXkgY2FuIG5vdCBiZSBzZWN0aW9uLCBtYXliZSB5b3Ugd2FudCB0byB1c2UgaXQgb24gdGhlIHRhYmxlcyBpbiBpdGApOyB9XG5cdGJlU2VjdGlvbih0YWJsZSk7XG5cdGRlSW5saW5lKHRhYmxlKTtcblx0cmV0dXJuIHRhYmxlO1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBXZWFrU2V0IGZyb20gJy5XZWFrU2V0JztcbmltcG9ydCBoYXMgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmhhcyc7XG5pbXBvcnQgYWRkIGZyb20gJy5XZWFrU2V0LnByb3RvdHlwZS5hZGQnO1xuaW1wb3J0IGRlbCBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgTnVsbCBhcyBvcmRlcmlmeV9OdWxsIH0gZnJvbSAnQGx0ZC9qLW9yZGVyaWZ5JztcblxuaW1wb3J0IHsgYmVJbmxpbmUsIGJlU2VjdGlvbiB9IGZyb20gJy4vbm9uLWF0b20nO1xuXG5leHBvcnQgeyBpc0lubGluZSB9IGZyb20gJy4vbm9uLWF0b20nO1xuZXhwb3J0IGNvbnN0IElOTElORSA9IHRydWU7XG5cbmNvbnN0IHRhYmxlcyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgdGFibGVzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZCh0YWJsZXMpO1xuZXhwb3J0IGNvbnN0IGlzVGFibGUgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQodGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IGltcGxpY2l0VGFibGVzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBpbXBsaWNpdFRhYmxlc19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoaW1wbGljaXRUYWJsZXMpO1xuY29uc3QgaW1wbGljaXRUYWJsZXNfZGVsID0gLyojX19QVVJFX18qL2RlbC5iaW5kKGltcGxpY2l0VGFibGVzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGNvbnN0IGRpcmVjdGx5SWZOb3QgPSAodGFibGUgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggaW1wbGljaXRUYWJsZXNfZGVsKHRhYmxlKSApIHtcblx0XHRiZVNlY3Rpb24odGFibGUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgRElSRUNUTFkgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUTFkgPSBmYWxzZTtcblxuY29uc3QgcGFpcnMgPSBuZXcgV2Vha1NldCAgICAgICAoKTtcbmNvbnN0IHBhaXJzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChwYWlycyk7XG5leHBvcnQgY29uc3QgZnJvbVBhaXIgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQocGFpcnMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgY29uc3QgUEFJUiA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBQbGFpblRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBOdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgT3JkZXJlZFRhYmxlID0gLyojX19QVVJFX18qL051bGwoY2xhc3MgVGFibGUgZXh0ZW5kcyBvcmRlcmlmeV9OdWxsICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoaXNEaXJlY3QgICAgICAgICAgLCBpc0lubGluZSRmcm9tUGFpciAgICAgICAgICApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRhYmxlc19hZGQodGhpcyk7XG5cdFx0aXNEaXJlY3Rcblx0XHRcdD8gaXNJbmxpbmUkZnJvbVBhaXIgPyBiZUlubGluZSh0aGlzLCB0cnVlKSA6IGJlU2VjdGlvbih0aGlzKVxuXHRcdFx0OiAoIGlzSW5saW5lJGZyb21QYWlyID8gcGFpcnNfYWRkIDogaW1wbGljaXRUYWJsZXNfYWRkICkodGhpcyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuXG4vL2ltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuY29uc3QgTk9ORSAgICAgICAgICAgICAgICAgICAgPSBbXTtcbmxldCBzb3VyY2VQYXRoICAgICAgICAgPSAnJztcbmxldCBzb3VyY2VMaW5lcyAgICAgICAgICAgICAgICAgICAgPSBOT05FO1xubGV0IGxhc3RMaW5lSW5kZXggICAgICAgICA9IC0xO1xuZXhwb3J0IGxldCBsaW5lSW5kZXggICAgICAgICA9IC0xO1xuXG5leHBvcnQgY29uc3QgdGhyb3dzID0gKGVycm9yICAgICAgICkgICAgICAgID0+IHtcblx0Ly9pZiAoIHNvdXJjZUxpbmVzIT09Tk9ORSApIHsgZG9uZSgpOyBvcHRpb25zLmNsZWFyKCk7IH1cblx0dGhyb3cgZXJyb3I7XG59O1xuXG5jb25zdCBFT0wgPSAvXFxyP1xcbi87XG5leHBvcnQgY29uc3QgdG9kbyA9IChzb3VyY2UgICAgICAgICwgcGF0aCAgICAgICAgKSAgICAgICA9PiB7XG5cdGlmICggdHlwZW9mIHBhdGghPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKHsgcGF0aCB9KWApOyB9XG5cdHNvdXJjZVBhdGggPSBwYXRoO1xuXHRzb3VyY2VMaW5lcyA9IHNvdXJjZS5zcGxpdChFT0wpO1xuXHRsYXN0TGluZUluZGV4ID0gc291cmNlTGluZXMubGVuZ3RoIC0gMTtcblx0bGluZUluZGV4ID0gLTE7XG59O1xuXG5leHBvcnQgY29uc3QgbmV4dCA9ICgpICAgICAgICAgPT4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblxuZXhwb3J0IGNvbnN0IHJlc3QgPSAoKSAgICAgICAgICA9PiBsaW5lSW5kZXghPT1sYXN0TGluZUluZGV4O1xuXG5leHBvcnQgY2xhc3MgbWFyayB7XG5cdCAgICAgICAgICAgICAgICAgbGluZUluZGV4ID0gbGluZUluZGV4O1xuXHQgICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHQgICAgICAgICAgICAgICAgIHJlc3RDb2x1bW4gICAgICAgIDtcblx0Y29uc3RydWN0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCByZXN0Q29sdW1uICAgICAgICApIHtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMucmVzdENvbHVtbiA9IHJlc3RDb2x1bW47XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0bXVzdCAoICAgICAgICAgICkgICAgICAgICB7XG5cdFx0bGluZUluZGV4PT09bGFzdExpbmVJbmRleCAmJiB0aHJvd3MoU3ludGF4RXJyb3IoYCR7dGhpcy50eXBlfSBpcyBub3QgY2xvc2UgdW50aWwgdGhlIGVuZCBvZiB0aGUgZmlsZWAgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0XHRyZXR1cm4gc291cmNlTGluZXNbKytsaW5lSW5kZXhdIDtcblx0fVxuXHRub3dyYXAgKCAgICAgICAgICAgIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgICB7XG5cdFx0dGhyb3cgdGhyb3dzKEVycm9yKGBUT01MLnBhcnNlKCR7YXJnc01vZGUgPyBgJHthcmdzTW9kZX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pIG11c3QgYmUgcGFzc2VkLCB3aGlsZSB0aGUgc291cmNlIGluY2x1ZGluZyBtdWx0aS1saW5lIHN0cmluZ2AgKyB3aGVyZSgnLCB3aGljaCBzdGFydGVkIGZyb20gJywgdGhpcy5saW5lSW5kZXgsIHNvdXJjZUxpbmVzW3RoaXMubGluZUluZGV4XSAubGVuZ3RoIC0gdGhpcy5yZXN0Q29sdW1uICsgMSkpKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHdoZXJlID0gKHByZSAgICAgICAgLCByb3dJbmRleCAgICAgICAgID0gbGluZUluZGV4LCBjb2x1bW5OdW1iZXIgICAgICAgICA9IDApICAgICAgICAgPT4gc291cmNlTGluZXM9PT1OT05FID8gJycgOlxuXHRzb3VyY2VQYXRoXG5cdFx0PyBgXFxuICAgIGF0ICgke3NvdXJjZVBhdGh9OiR7cm93SW5kZXggKyAxfToke2NvbHVtbk51bWJlcn0pYFxuXHRcdDogYCR7cHJlfWxpbmUgJHtyb3dJbmRleCArIDF9OiAke3NvdXJjZUxpbmVzW3Jvd0luZGV4XX1gO1xuXG5leHBvcnQgY29uc3QgZG9uZSA9ICgpICAgICAgID0+IHtcblx0c291cmNlUGF0aCA9ICcnO1xuXHRzb3VyY2VMaW5lcyA9IE5PTkU7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuXG4vKiBuZXN0ZWQgKHJlYWRhYmxlKSAqL1xuXG5jb25zdCBXaGl0ZXNwYWNlID0gL1sgXFx0XS87XG5cbmV4cG9ydCBjb25zdCBQUkVfV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdF4ke1doaXRlc3BhY2V9K2AudmFsdWVPZigpO1xuXG5leHBvcnQgY29uc3QgeyBleGVjOiBWQUxVRV9SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0KFxuXHRcdCg/OlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkIFxcZCk/XG5cdFx0W1xcd1xcLSsuOl0rXG5cdClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKVxuXHQkYC52YWx1ZU9mKCk7XG5cbmV4cG9ydCBjb25zdCB7IGV4ZWM6IExJVEVSQUxfU1RSSU5HX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0JyhbXiddKiknXG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilgLnZhbHVlT2YoKTtcblxuY29uc3QgeyBleGVjOiBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnMgICAgICAgICAgIGBcblx0XlxuXHQoLio/KVxuXHQnJycoJ3swLDJ9KVxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopYC52YWx1ZU9mKCk7XG5jb25zdCB7IGV4ZWM6IE1VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfMCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgICAgICBgXG5cdF5cblx0KC4qPylcblx0JycnKClcblx0JHtXaGl0ZXNwYWNlfSpcblx0KC4qKWAudmFsdWVPZigpO1xuZXhwb3J0XG5sZXQgX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cbmV4cG9ydCBjb25zdCBTWU1fV0hJVEVTUEFDRSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAuc2Bcblx0XlxuXHQuXG5cdCR7V2hpdGVzcGFjZX0qYC52YWx1ZU9mKCk7XG5cblxuZXhwb3J0IGNvbnN0IFRhZyA9IC9bXlxceDAwLVxceDFGXCIjJygpPD5bXFxcXFxcXWB7fVxceDdGXSsvO1xuXG5jb25zdCB7IGV4ZWM6IEtFWV9WQUxVRV9QQUlSX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgIGBcblx0XlxuXHQke1doaXRlc3BhY2V9KlxuXHQ9XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCg/OlxuXHRcdDwoJHtUYWd9KT5cblx0XHQke1doaXRlc3BhY2V9KlxuXHQpP1xuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IHsgZXhlYzogX1ZBTFVFX1BBSVJfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cC5zICAgICAgIGBcblx0XlxuXHQ8KCR7VGFnfSk+XG5cdCR7V2hpdGVzcGFjZX0qXG5cdCguKilcblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IGV4ZWM6IFRBR19SRVNUX2V4ZWMgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHAucyAgICAgICBgXG5cdF5cblx0PCgke1RhZ30pPlxuXHQke1doaXRlc3BhY2V9KlxuXHQoLiopXG5cdCRgLnZhbHVlT2YoKTtcblxuLyogb3B0aW1pemVkIChhdm9pZCBvdmVyZmxvdyBvciBsb3N0KSAqL1xuXG5jb25zdCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJdK3xcXFxcLj98XCIoPyFcIlwiKVwiPy9zeSk7XG5leHBvcnQgY29uc3QgTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aCA9IChfICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSAvKk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HLmxhc3RJbmRleCA9ICovMDtcblx0d2hpbGUgKCBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy50ZXN0KF8pICkgeyBsYXN0SW5kZXggPSBNVUxUSV9MSU5FX0JBU0lDX1NUUklORy5sYXN0SW5kZXg7IH1cblx0cmV0dXJuIGxhc3RJbmRleDtcbn07XG5cbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZztcbmNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX18gPSAvW15cXFxcXFx4MDAtXFx4MDlcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18W1xcdCBdKlxcbltcXHRcXG4gXSp8dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkvZzsvLy8gVGFiXG5jb25zdCBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfREVMX19fX19fID0gL1teXFxcXFxceDAwLVxceDA5XFx4MEItXFx4MUZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXxbXFx0IF0qXFxuW1xcdFxcbiBdKnx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS9nOy8vLyBUYWIgXFw8d3M+bmV3bGluZVxuY29uc3QgRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSCA9IC9bXlxcXFxcXHgwMC1cXHgwOVxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfFtcXHQgXSpcXG5bXFx0XFxuIF0qfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL2c7Ly8vIG5vdCBcXDx3cz5uZXdsaW5lXG5sZXQgX19FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVIgPSBFU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfVEFCX19fX19fO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0ID0gKF8gICAgICAgICkgICAgICAgICAgPT4gIV8ucmVwbGFjZShfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiwgJycpOy8vLyBvcD9cblxuY29uc3QgQkFTSUNfU1RSSU5HX1RBQl9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXFx4N0ZdK3xcXFxcKD86W2J0bmZyXCJcXFxcXXx1W1xcZEEtRmEtZl17NH18VVtcXGRBLUZhLWZdezh9KS95KTtcbmNvbnN0IEJBU0lDX1NUUklOR19fX19fX19fX18gPSB0aGVSZWdFeHAoL1teXFxcXFwiXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9fX19fXyA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXF18dVtcXGRBLUZhLWZdezR9fFVbXFxkQS1GYS1mXXs4fSkveSk7Ly8vIFRhYlxuY29uc3QgQkFTSUNfU1RSSU5HX0RFTF9TTEFTSCA9IHRoZVJlZ0V4cCgvW15cXFxcXCJcXHgwMC1cXHgwOFxceDBCLVxceDFGXSt8XFxcXCg/OltidG5mclwiXFxcXC9dfHVbXFxkQS1GYS1mXXs0fXxVW1xcZEEtRmEtZl17OH0pL3kpOy8vLyBUYWJcbmxldCBfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfU0xBU0g7XG5leHBvcnQgY29uc3QgQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCA9IChsaW5lICAgICAgICApICAgICAgICAgPT4ge1xuXHRsZXQgbGFzdEluZGV4ICAgICAgICAgPSBfX0JBU0lDX1NUUklORy5sYXN0SW5kZXggPSAxO1xuXHR3aGlsZSAoIF9fQkFTSUNfU1RSSU5HLnRlc3QobGluZSkgKSB7IGxhc3RJbmRleCA9IF9fQkFTSUNfU1RSSU5HLmxhc3RJbmRleDsgfVxuXHRsYXN0SW5kZXghPT1saW5lLmxlbmd0aCAmJiBsaW5lW2xhc3RJbmRleF09PT0nXCInIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhc2ljIHN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdHJldHVybiBsYXN0SW5kZXg7XG59O1xuXG5leHBvcnRcbmNvbnN0IHsgdGVzdDogSVNfRE9UX0tFWSB9ID0gdGhlUmVnRXhwKC9eWyBcXHRdKlxcLi8pO1xuZXhwb3J0XG5jb25zdCBET1RfS0VZID0gL15bIFxcdF0qXFwuWyBcXHRdKi87XG5jb25zdCB7IGV4ZWM6IEJBUkVfS0VZX1NUUklDVCB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKy8pO1xuY29uc3QgeyBleGVjOiBCQVJFX0tFWV9GUkVFIH0gPSB0aGVSZWdFeHAoL15bXiBcXHQjPVtcXF0nXCIuXSsoPzpbIFxcdF0rW14gXFx0Iz1bXFxdJ1wiLl0rKSovKTtcbmV4cG9ydFxubGV0IF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5jb25zdCB7IGV4ZWM6IExJVEVSQUxfS0VZX19fXyB9ID0gdGhlUmVnRXhwKC9eJ1teJ1xceDAwLVxceDA4XFx4MEItXFx4MUZcXHg3Rl0qJy8pO1xuY29uc3QgeyBleGVjOiBMSVRFUkFMX0tFWV9ERUwgfSA9IHRoZVJlZ0V4cCgvXidbXidcXHgwMC1cXHgwOFxceDBCLVxceDFGXSonLyk7XG5leHBvcnRcbmxldCBfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5sZXQgc3VwcG9ydEFycmF5T2ZUYWJsZXMgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgVEFCTEVfREVGSU5JVElPTl9leGVjX2dyb3VwcyA9IChsaW5lUmVzdCAgICAgICAgLCBwYXJzZUtleXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgYXNBcnJheUl0ZW0gICAgICAgICAgPSBsaW5lUmVzdFsxXT09PSdbJztcblx0aWYgKCBhc0FycmF5SXRlbSApIHtcblx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEFycmF5IG9mIFRhYmxlcyBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC4yYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgyKTtcblx0fVxuXHRlbHNlIHsgbGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZSgxKTsgfVxuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UoUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXkgfSA9IHsgbGluZVJlc3QgfSA9IHBhcnNlS2V5cyhsaW5lUmVzdCk7XG5cdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShQUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSddJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFRhYmxlIGhlYWRlciBpcyBub3QgY2xvc2VkYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGlzIGZvdW5kIGF0ICcpKSk7XG5cdCggbGluZVJlc3QubGVuZ3RoPjEgPyBsaW5lUmVzdFsxXT09PSddJz09PWFzQXJyYXlJdGVtIDogIWFzQXJyYXlJdGVtICkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBTcXVhcmUgYnJhY2tldHMgb2YgVGFibGUgZGVmaW5pdGlvbiBzdGF0ZW1lbnQgbm90IG1hdGNoYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShhc0FycmF5SXRlbSA/IDIgOiAxKS5yZXBsYWNlKFBSRV9XSElURVNQQUNFLCAnJyk7XG5cdGxldCB0YWcgICAgICAgIDtcblx0aWYgKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXT09PSc8JyApIHsgKCB7IDE6IHRhZywgMjogbGluZVJlc3QgfSA9IFRBR19SRVNUX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIHRhZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSkgKTsgfVxuXHRlbHNlIHsgdGFnID0gJyc7IH1cblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEtFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzID0gKHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBsaW5lUmVzdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRjb25zdCB7IDE6IHRhZyA9ICcnIH0gPSB7IDI6IGxpbmVSZXN0IH0gPSBLRVlfVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEtleXMgbXVzdCBlcXVhbCBzb21ldGhpbmdgICsgaXRlcmF0b3Iud2hlcmUoJywgYnV0IG1pc3NpbmcgYXQgJykpKTtcblx0dGFnIHx8IGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdIT09JyMnIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgVmFsdWUgY2FuIG5vdCBiZSBtaXNzaW5nIGFmdGVyIGV1cWFsIHNpZ25gICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCB0YWcsIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCB7IHRlc3Q6IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXS8pO1xuY29uc3QgeyB0ZXN0OiBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUwgfSA9IHRoZVJlZ0V4cCgvW1xceDAwLVxceDA4XFx4MEItXFx4MUZdLyk7XG5leHBvcnRcbmxldCBfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX19fXztcblxuZXhwb3J0IGNvbnN0IHN3aXRjaFJlZ0V4cCA9IChzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgKSAgICAgICA9PiB7XG5cdHN3aXRjaCAoIHNwZWNpZmljYXRpb25WZXJzaW9uICkge1xuXHRcdGNhc2UgMS4wOlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzBfMV8yO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9UQUJfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19UQUJfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNTpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfX19fO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9fX187XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9fX19fX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19fX19fX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuNDpcblx0XHRcdF9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjID0gTVVMVElfTElORV9MSVRFUkFMX1NUUklOR18wO1xuXHRcdFx0X19MSVRFUkFMX0tFWV9leGVjID0gTElURVJBTF9LRVlfREVMO1xuXHRcdFx0X19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QgPSBDT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX1RBQl9ERUw7XG5cdFx0XHRfX0VTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUiA9IEVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl9ERUxfX19fX187XG5cdFx0XHRfX0JBU0lDX1NUUklORyA9IEJBU0lDX1NUUklOR19ERUxfX19fX187XG5cdFx0XHRfX0JBUkVfS0VZX2V4ZWMgPSBCQVJFX0tFWV9TVFJJQ1Q7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0X19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMgPSBNVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HXzA7XG5cdFx0XHRfX0xJVEVSQUxfS0VZX2V4ZWMgPSBMSVRFUkFMX0tFWV9ERUw7XG5cdFx0XHRfX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCA9IENPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfVEFCX0RFTDtcblx0XHRcdF9fRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSID0gRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFTSUNfU1RSSU5HID0gQkFTSUNfU1RSSU5HX0RFTF9TTEFTSDtcblx0XHRcdF9fQkFSRV9LRVlfZXhlYyA9IEJBUkVfS0VZX0ZSRUU7XG5cdFx0XHRzdXBwb3J0QXJyYXlPZlRhYmxlcyA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBOVU0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHQoPzpcblx0XHQwXG5cdFx0KD86XG5cdFx0XHRiWzAxXVtfMDFdKlxuXHRcdHxcblx0XHRcdG9bMC03XVtfMC03XSpcblx0XHR8XG5cdFx0XHR4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qXG5cdFx0fFxuXHRcdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdFx0KVxuXHR8XG5cdFx0WzEtOV1bX1xcZF0qXG5cdFx0KD86XFwuXFxkW19cXGRdKik/KD86W0VlXS0/XFxkW19cXGRdKik/XG5cdHxcblx0XHRpbmZcblx0fFxuXHRcdG5hblxuXHQpXG5gLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfQU1BWklORyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0Xig/OlxuXHRcdC0/JHtOVU19XG5cdFx0KD86LSR7TlVNfSkqXG5cdHxcblx0XHR0cnVlXG5cdHxcblx0XHRmYWxzZVxuXHQpJFxuYC52YWx1ZU9mKCk7XG5jb25zdCB7IHRlc3Q6IEJBRF9EWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmV4cG9ydCBjb25zdCBpc0FtYXppbmcgPSAoa2V5cyAgICAgICAgKSAgICAgICAgICA9PiBJU19BTUFaSU5HKGtleXMpICYmICFCQURfRFhPQihrZXlzKTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IEJpZ0ludCBmcm9tICcuQmlnSW50Pyc7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLldlYWtNYXAnO1xuaW1wb3J0IGdldCBmcm9tICcuV2Vha01hcC5wcm90b3R5cGUuZ2V0JztcbmltcG9ydCBzZXQgZnJvbSAnLldlYWtNYXAucHJvdG90eXBlLnNldCc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlJztcbmltcG9ydCBpc1NhZmVJbnRlZ2VyIGZyb20gJy5OdW1iZXIuaXNTYWZlSW50ZWdlcic7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNQcm90b3R5cGVPZiBmcm9tICcuT2JqZWN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mJztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTlVMTCBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBncm91cGlmeSB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgeyBQbGFpblRhYmxlLCBPcmRlcmVkVGFibGUgfSBmcm9tICcuL3R5cGVzL1RhYmxlJztcbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuL3JlZ2V4cHMnO1xuXG5leHBvcnQgbGV0IG11c3RTY2FsYXIgICAgICAgICAgPSB0cnVlO1xuXG5leHBvcnQgbGV0IEFSR1NfTU9ERSAgICAgICAgICAgICAgICAgID0gJyc7XG5cbi8qIG9wdGlvbnMgKi9cblxuZXhwb3J0IGxldCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAgICAgICAgID0gbnVsbDtcbmV4cG9ydCBsZXQgdXNpbmdCaWdJbnQgICAgICAgICAgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgSW50ZWdlck1pbk51bWJlciAgICAgICAgID0gMDtcbmV4cG9ydCBsZXQgSW50ZWdlck1heE51bWJlciAgICAgICAgID0gMDtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgXG4gIFxuY29uc3QgQU5ZICAgICAgID0ge1xuXHR0ZXN0OiAoKSA9PiB0cnVlLFxufTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiBcbmV4cG9ydCBjb25zdCBLZXlzID0gY2xhc3MgS2V5c1JlZ0V4cCBleHRlbmRzIFJlZ0V4cCAgICAgICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRjb25zdHJ1Y3RvciAoa2V5cyAgICAgICAgICAgICAgICAgICApIHtcblx0XHRzdXBlcihgXiR7Z3JvdXBpZnkoa2V5cyl9JGApO1xuXHRcdGxldCBtYXhMZW5ndGggPSAtMTtcblx0XHRmb3IgKCBsZXQgaW5kZXggPSBrZXlzLmxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGtleXNbLS1pbmRleF0gO1xuXHRcdFx0aWYgKCBsZW5ndGg+bWF4TGVuZ3RoICkgeyBtYXhMZW5ndGggPSBsZW5ndGg7IH1cblx0XHR9XG5cdFx0dGhpcy5sYXN0SW5kZXggPSBtYXhMZW5ndGgrMTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQgICAgICAgICB0ZXN0ICggICAgICAgICAgICAgICAgICBrZXkgICAgICAgICkgICAgICAgICAge1xuXHRcdHJldHVybiBrZXkubGVuZ3RoPHRoaXMubGFzdEluZGV4ICYmIHN1cGVyLnRlc3Qoa2V5KTtcblx0fVxufTtcbmNvbnN0IGlzS2V5cyA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoLyojX19QVVJFX18qL2ZyZWV6ZShLZXlzLnByb3RvdHlwZSkpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5leHBvcnQgbGV0IEtFWVMgICAgICAgPSBBTlk7XG5leHBvcnQgbGV0IHByZXNlcnZlTGl0ZXJhbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgemVyb0RhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBpbmxpbmVUYWJsZSAgICAgICAgIDtcbmV4cG9ydCBsZXQgbW9yZURhdGV0aW1lICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhbGxvd0VtcHR5S2V5ICAgICAgICAgO1xuLy9leHBvcnQgY29uc3QgeG9iIDpib29sZWFuID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc0Vycm9yICAgICAgICAgO1xuZXhwb3J0IGxldCBzRmxvYXQgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5leHBvcnQgbGV0IFRhYmxlICAgICAgICAgICAgICAgICAgO1xuZXhwb3J0IGxldCBhbGxvd0xvbmdlciAgICAgICAgIDtcbmV4cG9ydCBsZXQgZW5hYmxlTnVsbCAgICAgICAgIDtcbmV4cG9ydCBsZXQgYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSAgICAgICAgIDtcbmV4cG9ydCBsZXQgcHJlc2VydmVDb21tZW50ICAgICAgICAgO1xuZXhwb3J0IGxldCBkaXNhYmxlRGlnaXQgICAgICAgICA7XG5jb25zdCBhcnJheVR5cGVzID0gbmV3IFdlYWtNYXAgICAgICAgICAgICgpO1xuY29uc3QgYXJyYXlUeXBlc19nZXQgPSAvKiNfX1BVUkVfXyovZ2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuY29uc3QgYXJyYXlUeXBlc19zZXQgPSAvKiNfX1BVUkVfXyovc2V0LmJpbmQoYXJyYXlUeXBlcykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuY29uc3QgQXMgPSAoKSAgICAgPT4ge1xuXHRjb25zdCBhcyA9IChhcnJheSAgICAgICApICAgICAgICA9PiB7XG5cdFx0Y29uc3QgZ290ID0gYXJyYXlUeXBlc19nZXQoYXJyYXkpO1xuXHRcdGdvdFxuXHRcdFx0PyBnb3Q9PT1hcyB8fCBpdGVyYXRvci50aHJvd3MoVHlwZUVycm9yKGBUeXBlcyBpbiBBcnJheSBtdXN0IGJlIHNhbWVgICsgaXRlcmF0b3Iud2hlcmUoJy4gQ2hlY2sgJykpKVxuXHRcdFx0OiBhcnJheVR5cGVzX3NldChhcnJheSwgYXMpO1xuXHRcdHJldHVybiBhcnJheTtcblx0fTtcblx0cmV0dXJuIGFzO1xufTtcbmNvbnN0IEFTX1RZUEVEID0ge1xuXHRhc051bGxzOiBBcygpLFxuXHRhc1N0cmluZ3M6IEFzKCksXG5cdGFzVGFibGVzOiBBcygpLFxuXHRhc0FycmF5czogQXMoKSxcblx0YXNCb29sZWFuczogQXMoKSxcblx0YXNGbG9hdHM6IEFzKCksXG5cdGFzSW50ZWdlcnM6IEFzKCksXG5cdGFzT2Zmc2V0RGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZVRpbWVzOiBBcygpLFxuXHRhc0xvY2FsRGF0ZXM6IEFzKCksXG5cdGFzTG9jYWxUaW1lczogQXMoKSxcbn07XG5jb25zdCBhc01peGVkICAgICA9IChhcnJheSAgICAgICApICAgICAgICA9PiBhcnJheTtcbmV4cG9ydCBsZXRcblx0YXNOdWxscyAgICAsXG5cdGFzU3RyaW5ncyAgICAsXG5cdGFzVGFibGVzICAgICxcblx0YXNBcnJheXMgICAgLFxuXHRhc0Jvb2xlYW5zICAgICxcblx0YXNGbG9hdHMgICAgLFxuXHRhc0ludGVnZXJzICAgICxcblx0YXNPZmZzZXREYXRlVGltZXMgICAgLFxuXHRhc0xvY2FsRGF0ZVRpbWVzICAgICxcblx0YXNMb2NhbERhdGVzICAgICxcblx0YXNMb2NhbFRpbWVzICAgIDtcblxuICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5sZXQgcHJvY2Vzc29yICAgICAgICAgICAgID0gbnVsbDtcbmxldCBlYWNoICAgICAgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIFxuY29uc3QgY29sbGVjdF9vbiA9ICh0YWcgICAgICAgICwgYXJyYXkgICAgICAgICAgICAgICwgdGFibGUgICAgICAgICAgICAgICwga2V5ICAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IF9lYWNoID0gY3JlYXRlKE5VTEwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0X2VhY2guX2xpbmtlZCA9IGVhY2g7XG5cdF9lYWNoLnRhZyA9IHRhZztcblx0aWYgKCB0YWJsZSApIHtcblx0XHRfZWFjaC50YWJsZSA9IHRhYmxlO1xuXHRcdF9lYWNoLmtleSA9IGtleSA7XG5cdH1cblx0aWYgKCBhcnJheSApIHtcblx0XHRfZWFjaC5hcnJheSA9IGFycmF5O1xuXHRcdF9lYWNoLmluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXHR9XG5cdGVhY2ggPSBfZWFjaDtcbn07XG5jb25zdCBjb2xsZWN0X29mZiA9ICgpICAgICAgICA9PiB7IHRocm93IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgeE9wdGlvbnMudGFnIGlzIG5vdCBlbmFibGVkLCBidXQgZm91bmQgdGFnIHN5bnRheGAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH07XG5leHBvcnQgbGV0IGNvbGxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gY29sbGVjdF9vZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjb25zdCBQcm9jZXNzID0gKCkgICAgICAgICAgPT4ge1xuXHRpZiAoIGVhY2ggKSB7XG5cdFx0Y29uc3QgX3Byb2Nlc3NvciA9IHByb2Nlc3NvciA7XG5cdFx0bGV0IF9lYWNoICAgICAgICAgICAgICA9IGVhY2g7XG5cdFx0ZWFjaCA9IG51bGw7XG5cdFx0cmV0dXJuICgpICAgICAgID0+IHtcblx0XHRcdGNvbnN0IHByb2Nlc3NvciA9IF9wcm9jZXNzb3I7XG5cdFx0XHRsZXQgZWFjaCAgICAgICAgICAgICAgPSBfZWFjaCA7XG5cdFx0XHRfZWFjaCA9IG51bGw7XG5cdFx0XHRkbyB7IHByb2Nlc3NvcihlYWNoKTsgfVxuXHRcdFx0d2hpbGUgKCBlYWNoID0gZWFjaC5fbGlua2VkICk7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qIHVzZSAmIGNsZWFyICovXG5cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpICAgICAgID0+IHtcblx0S0VZUyA9IEFOWTtcblx0dXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IHByb2Nlc3NvciA9IGVhY2ggPSBudWxsO1xuXHR6ZXJvRGF0ZXRpbWUgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2UgPSAoc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgLCBrZXlzICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAsIGFyZ3NNb2RlICAgICAgICAgICAgICAgICApICAgICAgID0+IHtcblx0XG5cdEFSR1NfTU9ERSA9IGFyZ3NNb2RlO1xuXHRcblx0bGV0IG1peGVkICAgICAgICAgO1xuXHRzd2l0Y2ggKCBzcGVjaWZpY2F0aW9uVmVyc2lvbiApIHtcblx0XHRjYXNlIDEuMDpcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdHplcm9EYXRldGltZSA9IGRpc2FsbG93RW1wdHlLZXkgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC41OlxuXHRcdFx0bXVzdFNjYWxhciA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjQ6XG5cdFx0XHRtdXN0U2NhbGFyID0gZGlzYWxsb3dFbXB0eUtleSA9IGlubGluZVRhYmxlID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDAuMzpcblx0XHRcdG11c3RTY2FsYXIgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG1peGVkID0gemVyb0RhdGV0aW1lID0gbW9yZURhdGV0aW1lID0gc0Zsb2F0ID0gaW5saW5lVGFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMC4yOlxuXHRcdFx0emVyb0RhdGV0aW1lID0gZGlzYWxsb3dFbXB0eUtleSA9IHRydWU7XG5cdFx0XHRtdXN0U2NhbGFyID0gbWl4ZWQgPSBtb3JlRGF0ZXRpbWUgPSBzRmxvYXQgPSBpbmxpbmVUYWJsZSA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAwLjE6XG5cdFx0XHR6ZXJvRGF0ZXRpbWUgPSBkaXNhbGxvd0VtcHR5S2V5ID0gdHJ1ZTtcblx0XHRcdG11c3RTY2FsYXIgPSBtaXhlZCA9IG1vcmVEYXRldGltZSA9IHNGbG9hdCA9IGlubGluZVRhYmxlID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5wYXJzZSgsc3BlY2lmaWNhdGlvblZlcnNpb24pYCk7XG5cdH1cblx0cmVnZXhwcy5zd2l0Y2hSZWdFeHAoc3BlY2lmaWNhdGlvblZlcnNpb24pO1xuXHRcblx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J3N0cmluZycgKSB7IHVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXI7IH1cblx0ZWxzZSBpZiAoIG11bHRpbGluZVN0cmluZ0pvaW5lcj09PXVuZGVmaW5lZCApIHsgdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyA9IG51bGw7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX1tdWx0aWxpbmVTdHJpbmdKb2luZXJgIDogYCx7IGpvaW5lciB9YH0pYCk7IH1cblx0XG5cdGlmICggdXNlQmlnSW50PT09dW5kZWZpbmVkIHx8IHVzZUJpZ0ludD09PXRydWUgKSB7IHVzaW5nQmlnSW50ID0gdHJ1ZTsgfVxuXHRlbHNlIGlmICggdXNlQmlnSW50PT09ZmFsc2UgKSB7IHVzaW5nQmlnSW50ID0gZmFsc2U7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2YgdXNlQmlnSW50IT09J251bWJlcicgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sdXNlQmlnSW50YCA6IGAseyBiaWdpbnQgfWB9KWApOyB9XG5cdFx0aWYgKCAhaXNTYWZlSW50ZWdlcih1c2VCaWdJbnQpICkgeyB0aHJvdyBSYW5nZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSx1c2VCaWdJbnRgIDogYCx7IGJpZ2ludCB9YH0pYCk7IH1cblx0XHR1c2luZ0JpZ0ludCA9IG51bGw7XG5cdFx0dXNlQmlnSW50Pj0wXG5cdFx0XHQ/IEludGVnZXJNaW5OdW1iZXIgPSAtKCBJbnRlZ2VyTWF4TnVtYmVyID0gdXNlQmlnSW50IClcblx0XHRcdDogSW50ZWdlck1heE51bWJlciA9IC0oIEludGVnZXJNaW5OdW1iZXIgPSB1c2VCaWdJbnQgKSAtIDE7XG5cdH1cblx0aWYgKCAhQmlnSW50ICYmIHVzaW5nQmlnSW50IT09ZmFsc2UgKSB7IHRocm93IEVycm9yKGBDYW4ndCB3b3JrIHdpdGhvdXQgVE9NTC5wYXJzZSgke0FSR1NfTU9ERSA/IGAke0FSR1NfTU9ERX0sdXNlQmlnSW50YCA6IGAseyBiaWdpbnQgfWB9KSBiZWluZyBzZXQgdG8gZmFsc2UsIGJlY2F1c2UgdGhlIGhvc3QgZG9lc24ndCBoYXZlIEJpZ0ludCBzdXBwb3J0YCk7IH1cblx0XG5cdGlmICgga2V5cz09bnVsbCApIHsgS0VZUyA9IEFOWTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoICFpc0tleXMoa2V5cykgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZSgseyBrZXlzIH0pYCk7IH1cblx0XHRLRVlTID0ga2V5cztcblx0fVxuXHRcblx0aWYgKCB4T3B0aW9ucz09bnVsbCApIHtcblx0XHRUYWJsZSA9IFBsYWluVGFibGU7XG5cdFx0c0Vycm9yID0gYWxsb3dMb25nZXIgPSBlbmFibGVOdWxsID0gYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSA9IGZhbHNlO1xuXHRcdGNvbGxlY3QgPSBjb2xsZWN0X29mZjtcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHhPcHRpb25zIT09J29iamVjdCcgKSB7XG5cdFx0dGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSwseE9wdGlvbnNgIDogYCx7IHggfWB9KWApO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnN0IHsgb3JkZXIsIGxvbmdlciwgZXhhY3QsIG51bGw6IF9udWxsLCBtdWx0aSwgY29tbWVudCwgc3RyaW5nLCBsaXRlcmFsLCB0YWcsIC4uLnVua25vd24gfSA9IHhPcHRpb25zO1xuXHRcdGNvbnN0IHVua25vd25OYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXModW5rbm93bik7XG5cdFx0aWYgKCB1bmtub3duTmFtZXMubGVuZ3RoICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx7ICR7dW5rbm93bk5hbWVzLmpvaW4oJywgJyl9IH1gIDogYCx7IHg6IHsgJHt1bmtub3duTmFtZXMuam9pbignLCAnKX0gfSB9YH0pYCk7IH1cblx0XHRUYWJsZSA9IG9yZGVyID8gT3JkZXJlZFRhYmxlIDogUGxhaW5UYWJsZTtcblx0XHRhbGxvd0xvbmdlciA9ICFsb25nZXI7XG5cdFx0c0Vycm9yID0gISFleGFjdDtcblx0XHRlbmFibGVOdWxsID0gISFfbnVsbDtcblx0XHRhbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hID0gISFtdWx0aTtcblx0XHRwcmVzZXJ2ZUNvbW1lbnQgPSAhIWNvbW1lbnQ7XG5cdFx0ZGlzYWJsZURpZ2l0ID0gISFzdHJpbmc7XG5cdFx0cHJlc2VydmVMaXRlcmFsID0gISFsaXRlcmFsO1xuXHRcdGlmICggdGFnICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdGFnIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnBhcnNlKCR7QVJHU19NT0RFID8gYCR7QVJHU19NT0RFfSwseyB0YWcgfWAgOiBgLHsgeDogeyB0YWcgfSB9YH0pYCk7IH1cblx0XHRcdGlmICggIW1peGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2UoJHtBUkdTX01PREUgPyBgJHtBUkdTX01PREV9LCx4T3B0aW9uc2AgOiBgLHsgeCB9YH0pIHhPcHRpb25zLnRhZyBuZWVkcyBhdCBsZWFzdCBUT01MIDEuMCB0byBzdXBwb3J0IG1peGVkIHR5cGUgYXJyYXlgKTsgfVxuXHRcdFx0cHJvY2Vzc29yID0gdGFnO1xuXHRcdFx0Y29sbGVjdCA9IGNvbGxlY3Rfb247XG5cdFx0fVxuXHRcdGVsc2UgeyBjb2xsZWN0ID0gY29sbGVjdF9vZmY7IH1cblx0fVxuXHRcblx0bWl4ZWRcblx0XHQ/IGFzTnVsbHMgPSBhc1N0cmluZ3MgPSBhc1RhYmxlcyA9IGFzQXJyYXlzID0gYXNCb29sZWFucyA9IGFzRmxvYXRzID0gYXNJbnRlZ2VycyA9IGFzT2Zmc2V0RGF0ZVRpbWVzID0gYXNMb2NhbERhdGVUaW1lcyA9IGFzTG9jYWxEYXRlcyA9IGFzTG9jYWxUaW1lcyA9IGFzTWl4ZWRcblx0XHQ6ICggeyBhc051bGxzLCBhc1N0cmluZ3MsIGFzVGFibGVzLCBhc0FycmF5cywgYXNCb29sZWFucywgYXNGbG9hdHMsIGFzSW50ZWdlcnMsIGFzT2Zmc2V0RGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZVRpbWVzLCBhc0xvY2FsRGF0ZXMsIGFzTG9jYWxUaW1lcyB9ID0gQVNfVFlQRUQgKTtcblx0XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5cbmNvbnN0IHByZXZpb3VzICAgICAgICAgICAgICAgID0gU3ltYm9sKCdwcmV2aW91cycpICAgICAgIDtcblxuICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuICBcblxuZXhwb3J0IGNvbnN0IHggPSAgICAgKHJvb3RTdGFjayAgICAgICkgICAgPT4ge1xuXHRsZXQgc3RhY2sgICAgICAgID0gcm9vdFN0YWNrO1xuXHRsZXQgcmVzdWx0ID0gc3RhY2submV4dCgpO1xuXHRpZiAoICFyZXN1bHQuZG9uZSApIHtcblx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0cmVzdWx0ID0gKCBzdGFjayA9IHJlc3VsdC52YWx1ZSApLm5leHQoKTtcblx0XHRmb3IgKCA7IDsgKSB7XG5cdFx0XHRpZiAoIHJlc3VsdC5kb25lICkge1xuXHRcdFx0XHRpZiAoIHN0YWNrPT09cm9vdFN0YWNrICkgeyBicmVhazsgfVxuXHRcdFx0XHRzdGFjayA9IHN0YWNrW3ByZXZpb3VzXSA7XG5cdFx0XHRcdHJlc3VsdCA9IHN0YWNrLm5leHQocmVzdWx0LnZhbHVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQudmFsdWVbcHJldmlvdXNdID0gc3RhY2s7XG5cdFx0XHRcdHJlc3VsdCA9ICggc3RhY2sgPSByZXN1bHQudmFsdWUgKS5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQudmFsdWU7XG59O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0IFxuXHQgICBcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgIFxuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBPYmplY3QgZnJvbSAnLk9iamVjdCc7XG5cbmV4cG9ydCBjb25zdCBfbGl0ZXJhbCAgICAgICAgICAgICAgICA9IFN5bWJvbCgnX2xpdGVyYWwnKSAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBMaXRlcmFsT2JqZWN0ID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxpdGVyYWwgICAgICAgICAsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcblx0Y29uc3Qgb2JqZWN0ID0gT2JqZWN0KHZhbHVlKSAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0b2JqZWN0W19saXRlcmFsXSA9IGxpdGVyYWw7XG5cdHJldHVybiBvYmplY3Q7XG59O1xuIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5cbmNvbnN0IGFycmF5cyA9IG5ldyBXZWFrU2V0ICAgICAgICgpO1xuY29uc3QgYXJyYXlzX2FkZCA9IC8qI19fUFVSRV9fKi9hZGQuYmluZChhcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSAvKiNfX1BVUkVfXyovaGFzLmJpbmQoYXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmV4cG9ydCBjb25zdCBPRl9UQUJMRVMgPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBTVEFUSUNBTExZID0gdHJ1ZTtcbmNvbnN0IHN0YXRpY2FsQXJyYXlzID0gbmV3IFdlYWtTZXQgICAgICAgKCk7XG5jb25zdCBzdGF0aWNhbEFycmF5c19hZGQgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQoc3RhdGljYWxBcnJheXMpO1xuZXhwb3J0IGNvbnN0IGlzU3RhdGljID0gLyojX19QVVJFX18qL2hhcy5iaW5kKHN0YXRpY2FsQXJyYXlzKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXG5leHBvcnQgY29uc3QgbmV3QXJyYXkgPSAoaXNTdGF0aWMgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IGFycmF5ICAgICAgICA9IFtdO1xuXHRhcnJheXNfYWRkKGFycmF5KTtcblx0aXNTdGF0aWMgJiYgc3RhdGljYWxBcnJheXNfYWRkKGFycmF5KTtcblx0cmV0dXJuIGFycmF5O1xufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgIFxuIFxuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgTmF0aXZlRGF0ZSBmcm9tICcuRGF0ZSc7XG5pbXBvcnQgcGFyc2UgZnJvbSAnLkRhdGUucGFyc2UnO1xuaW1wb3J0IGZsb29yIGZyb20gJy5NYXRoLmZsb29yJztcbmltcG9ydCBvd25LZXlzIGZyb20gJy5SZWZsZWN0Lm93bktleXMnO1xuLy8vaW1wb3J0IGlzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZSc7XG5pbXBvcnQgcHJldmVudEV4dGVuc2lvbnMgZnJvbSAnLk9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcbmltcG9ydCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyc7XG5pbXBvcnQgU3ltYm9sIGZyb20gJy5TeW1ib2wnO1xuaW1wb3J0IGRlZmluZVByb3BlcnRpZXMgZnJvbSAnLm51bGwuZGVmaW5lUHJvcGVydGllcyc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5cbmNvbnN0IGZwYyA9ICAgICAgICAgICAgICAgICAgICAgIChjICAgKSAgICA9PiB7XG5cdGZyZWV6ZShmcmVlemUoYykucHJvdG90eXBlKTtcblx0cmV0dXJuIGM7XG59O1xuXG5jb25zdCBfMjlfID0gLyg/OjBbMS05XXwxXFxkfDJcXGQpLztcbmNvbnN0IF8zMF8gPSAvKD86MFsxLTldfFsxMl1cXGR8MzApLztcbmNvbnN0IF8zMV8gPSAvKD86MFsxLTldfFsxMl1cXGR8M1swMV0pLztcbmNvbnN0IF8yM18gPSAvKD86WzAxXVxcZHwyWzAtM10pLztcbmNvbnN0IF81OV8gPSAvWzAtNV1cXGQvO1xuXG5jb25zdCBZTUQgPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHRcXGRcXGRcXGRcXGQtXG5cdCg/OlxuXHRcdDBcblx0XHQoPzpcblx0XHRcdFsxMzU3OF0tJHtfMzFffVxuXHRcdFx0fFxuXHRcdFx0WzQ2OV0tJHtfMzBffVxuXHRcdFx0fFxuXHRcdFx0Mi0ke18yOV99XG5cdFx0KVxuXHRcdHxcblx0XHQxXG5cdFx0KD86XG5cdFx0XHRbMDJdLSR7XzMxX31cblx0XHRcdHxcblx0XHRcdDEtJHtfMzBffVxuXHRcdClcblx0KVxuYC52YWx1ZU9mKCk7XG5cbmNvbnN0IEhNUyA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXG5cdCR7XzIzX306JHtfNTlffToke181OV99XG5gLnZhbHVlT2YoKTtcblxuZXhwb3J0IGNvbnN0IE9GRlNFVCQgPSAvKD86W1p6XXxbKy1dXFxkXFxkOlxcZFxcZCkkLztcblxuY29uc3QgeyBleGVjOiBaX2V4ZWMgfSA9IHRoZVJlZ0V4cCAgICAgICAgICAgKC8oKFsrLV0pXFxkXFxkKTooXFxkXFxkKSQvKTtcblxuY29uc3QgeyBleGVjOiBPRkZTRVRfREFURVRJTUVfZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCg/OlxcLlxcZHsxLDN9KFxcZCo/KTAqKT9cblx0KD86W1p6XXxbKy1dJHtfMjNffToke181OV99KVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgZXhlYzogT0ZGU0VUX0RBVEVUSU1FX1pFUk9fZXhlYyB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke1lNRH1cblx0W1R0IF1cblx0JHtITVN9XG5cdCgpXG5cdFtael1cblx0JGAudmFsdWVPZigpO1xuXG5jb25zdCB7IHRlc3Q6IElTX0xPQ0FMX0RBVEVUSU1FIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHRbVHQgXVxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgeyB0ZXN0OiBJU19MT0NBTF9EQVRFIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7WU1EfVxuXHQkYC52YWx1ZU9mKCk7XG5cbmNvbnN0IHsgdGVzdDogSVNfTE9DQUxfVElNRSB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBcblx0XlxuXHQke0hNU31cblx0KD86XFwuXFxkKyk/XG5cdCRgLnZhbHVlT2YoKTtcblxuY29uc3QgVCA9IC9bIHRdLztcbmNvbnN0IERFTElNSVRFUl9ET1QgPSAvWy1UOi5dL2c7XG5jb25zdCBET1RfWkVSTyA9IC9cXC4/MCskLztcbmNvbnN0IFpFUk8gPSAvXFwuKFxcZCo/KTArJC87XG5jb25zdCB6ZXJvUmVwbGFjZXIgPSAobWF0Y2ggICAgICAgICwgcDEgICAgICAgICkgPT4gcDE7XG5cbmNvbnN0IERhdGV0aW1lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBEYXRldGltZSA9IGZ1bmN0aW9uICggICAgICAgICAgICApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsvL2V4cHJlc3Npb24/IDp1bmRlZmluZWQsIGxpdGVyYWw/IDp1bmRlZmluZWQsIGRvdFZhbHVlPyA6dW5kZWZpbmVkXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC5zZXRUaW1lKClcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID4gLmdldFRpbWUoKSA6IERhdGUucGFyc2UoJ1QnKVxuXHQvLyBbU3ltYm9sLnRvUHJpbWl0aXZlXSgnbnVtYmVyJykgPiAudmFsdWVPZigpXG5cdC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+IC50b0lTT1N0cmluZygpXG5cdGNvbnN0IGRlc2NyaXB0b3JzID0gTnVsbChudWxsKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuXHR7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IE51bGwobnVsbCk7XG5cdFx0Zm9yICggY29uc3Qga2V5IG9mIG93bktleXMoTmF0aXZlRGF0ZS5wcm90b3R5cGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgKSB7XG5cdFx0XHRrZXk9PT0nY29uc3RydWN0b3InIHx8XG5cdFx0XHRrZXk9PT0ndG9KU09OJyB8fFxuXHRcdFx0KCBkZXNjcmlwdG9yc1trZXldID0gZGVzY3JpcHRvciApO1xuXHRcdH1cblx0fVxuXHREYXRldGltZS5wcm90b3R5cGUgPSBwcmV2ZW50RXh0ZW5zaW9ucyhjcmVhdGUoTmF0aXZlRGF0ZS5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKSk7XG5cdHJldHVybiBmcmVlemUoRGF0ZXRpbWUpO1xufSApKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbmNvbnN0IFZhbHVlID0gKElTT1N0cmluZyAgICAgICAgKSAgICAgICAgPT4gSVNPU3RyaW5nLnJlcGxhY2UoWkVSTywgemVyb1JlcGxhY2VyKS5yZXBsYWNlKERFTElNSVRFUl9ET1QsICcnKTtcblxuY29uc3QgZCA9IC8uL2dzO1xuY29uc3QgZDJ1ID0gKGQgICAgICAgICkgPT4gJ1xcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDknW2QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA7XG5jb25zdCBWYWx1ZU9GRlNFVCA9ICh0aW1lICAgICAgICAsIG1vcmUgICAgICAgICkgICAgICAgID0+IHRpbWU8MFxuXHQ/ICggJycgKyAoIHRpbWUgKyA2MjE2NzMwNTU0MDAwMCApICkucmVwbGFjZShkLCBkMnUpLnBhZFN0YXJ0KDE0LCAnXFx1MjAwMCcpICsgbW9yZS5yZXBsYWNlKGQsIGQydSkgKyB0aW1lXG5cdDogbW9yZVxuXHRcdD8gKCB0aW1lICsgJy4nICkucGFkU3RhcnQoMTYsICcwJykgKyBtb3JlXG5cdFx0OiAoICcnICsgdGltZSApLnBhZFN0YXJ0KDE1LCAnMCcpO1xuXG5jb25zdCB2YWxpZGF0ZUxlYXAgPSAobGl0ZXJhbCAgICAgICAgKSAgICAgICAgICA9PiB7XG5cdGlmICggbGl0ZXJhbC5zdGFydHNXaXRoKCcwMi0yOScsIDUpICkge1xuXHRcdGNvbnN0IHllYXIgICAgICAgICA9ICtsaXRlcmFsLnNsaWNlKDAsIDQpO1xuXHRcdHJldHVybiAoXG5cdFx0XHR5ZWFyICYgMGIxMSA/IGZhbHNlIDpcblx0XHRcdFx0eWVhciUxMDAgPyB0cnVlIDpcblx0XHRcdFx0XHR5ZWFyJTQwMCA/IGZhbHNlIDpcblx0XHRcdFx0XHRcdHllYXIlMzIwMCA/IHRydWUgOlxuXHRcdFx0XHRcdFx0XHRmYWxzZVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59O1xuY29uc3QgeyB0ZXN0OiBWQUxJREFURV9MRUFQIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwLnNgXi4uLi4uKD86MDYuMzB8MTIuMzEpLjIzOjU5OjU5YC52YWx1ZU9mKCk7XG5cbmNvbnN0IERBVEUgICAgICAgICAgICAgPSAvKiNfX1BVUkVfXyovZGVmaW5lUHJvcGVydGllcyhuZXcgTmF0aXZlRGF0ZSgwKSwgLyojX19QVVJFX18qL2dldE93blByb3BlcnR5RGVzY3JpcHRvcnMoTmF0aXZlRGF0ZS5wcm90b3R5cGUpKTtcblxuY29uc3QgT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdPZmZzZXREYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV92YWx1ZSAgICAgICAgICAgICAgICA9IFN5bWJvbCgnT2Zmc2V0RGF0ZVRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBPZmZzZXREYXRlVGltZV91c2UgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICQgICAgICAgICA9IDApID0+IHtcblx0REFURS5zZXRUaW1lKCt0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSArICQpO1xuXHRyZXR1cm4gREFURTtcbn07XG4vKmNvbnN0IE9mZnNldERhdGVUaW1lX2dldCA9ICh0aGF0IDpJbnN0YW5jZVR5cGU8dHlwZW9mIE9mZnNldERhdGVUaW1lPiwgc3RhcnQgOm51bWJlciwgZW5kIDpudW1iZXIpID0+ICt0aGF0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2Uoc3RhcnQsIGVuZCk7XG5jb25zdCBPZmZzZXREYXRlVGltZV9zZXQgPSAodGhhdCA6SW5zdGFuY2VUeXBlPHR5cGVvZiBPZmZzZXREYXRlVGltZT4sIHN0YXJ0IDpudW1iZXIsIGVuZCA6bnVtYmVyLCB2YWx1ZSA6bnVtYmVyLCByZXNlcnZlTW9yZSA6Ym9vbGVhbikgPT4ge1xuXHRpZiAoIGVuZCApIHtcblx0XHRjb25zdCBzdHJpbmcgPSAnJyArIHZhbHVlO1xuXHRcdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0XHRpZiAoIHN0cmluZy5sZW5ndGg+c2l6ZSApIHsgdGhyb3cgUmFuZ2VFcnJvcigpOyB9Ly8vXG5cdFx0dGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIHN0YXJ0KSArIHN0cmluZy5wYWRTdGFydChzaXplLCAnMCcpICsgdGhhdFtPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZCk7XG5cdH1cblx0Y29uc3QgdGltZSA9IHBhcnNlKHRoYXRbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdHJldHVybiB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXSA9IFZhbHVlT0ZGU0VUKHRpbWUsIHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLmluY2x1ZGVzKCctJylcblx0XHQ/IHRoYXRbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdLnNsaWNlKDE0LCB0aGF0W09mZnNldERhdGVUaW1lX3ZhbHVlXS5pbmRleE9mKCctJywgMTQpKVxuXHRcdDogdGhhdFtPZmZzZXREYXRlVGltZV92YWx1ZV0uc2xpY2UoMTUpXG5cdCk7Ly8vdGltZVxufTsqLy8vXG5leHBvcnQgY29uc3QgT2Zmc2V0RGF0ZVRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIE9mZnNldERhdGVUaW1lIGV4dGVuZHMgRGF0ZXRpbWUge1xuXHRcblx0W09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W09mZnNldERhdGVUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ09mZnNldERhdGVUaW1lJyAgICAgICAgIDsgfVxuXHRcblx0ICAgICAgICAgdmFsdWVPZiAoICAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0dmFsaWRhdGVMZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBPZmZzZXQgRGF0ZS1UaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHdpdGg2MCA9IGxpdGVyYWwuc3RhcnRzV2l0aCgnNjAnLCAxNyk7XG5cdFx0bGV0IHdpdGhvdXQ2MCA9IHdpdGg2MCA/IGxpdGVyYWwuc2xpY2UoMCwgMTcpICsgJzU5JyArIGxpdGVyYWwuc2xpY2UoMTkpIDogbGl0ZXJhbDtcblx0XHRjb25zdCB7IDE6IG1vcmUgPSAnJyB9ID0gKCBvcHRpb25zLnplcm9EYXRldGltZSA/IE9GRlNFVF9EQVRFVElNRV9aRVJPX2V4ZWMod2l0aG91dDYwKSA6IE9GRlNFVF9EQVRFVElNRV9leGVjKHdpdGhvdXQ2MCkgKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgT2Zmc2V0IERhdGUtVGltZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB0aW1lID0gcGFyc2Uod2l0aG91dDYwID0gd2l0aG91dDYwLnJlcGxhY2UoVCwgJ1QnKS5yZXBsYWNlKCd6JywgJ1onKSk7XG5cdFx0aWYgKCB3aXRoNjAgKSB7XG5cdFx0XHREQVRFLnNldFRpbWUodGltZSk7XG5cdFx0XHRWQUxJREFURV9MRUFQKERBVEUudG9JU09TdHJpbmcoKSkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIE9mZnNldCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0gd2l0aG91dDYwO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodGltZSwgbW9yZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldFVUQ0Z1bGxZZWFyICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENGdWxsWWVhcigpOyB9XG5cdC8vL2dldCB5ZWFyICgpIDpGdWxsWWVhciB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgMCwgNCk7IH1cblx0Ly8vc2V0IHllYXIgKHZhbHVlIDpGdWxsWWVhcikgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgMCwgNCwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01vbnRoICggICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX3VzZSh0aGlzKS5nZXRVVENNb250aCgpOyB9XG5cdC8vL2dldCBtb250aCAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV9nZXQodGhpcywgNSwgNyk7IH1cblx0Ly8vc2V0IG1vbnRoICh2YWx1ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgNSwgNywgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ0RhdGUgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF0ZSgpOyB9XG5cdC8vL2dldCBkYXkgKCkgOkRhdGUgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHQvLy9zZXQgZGF5ICh2YWx1ZSA6RGF0ZSkgeyBPZmZzZXREYXRlVGltZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlLCB0cnVlKTsgfVxuXHRcblx0Z2V0VVRDSG91cnMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ0hvdXJzKCk7IH1cblx0Ly8vZ2V0IGhvdXIgKCkgOkhvdXJzIHsgcmV0dXJuIE9mZnNldERhdGVUaW1lX2dldCh0aGlzLCAxMSwgMTMpOyB9XG5cdC8vL3NldCBob3VyICh2YWx1ZSA6SG91cnMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDTWludXRlcygpOyB9XG5cdC8vL2dldCBtaW51dGUgKCkgOk1pbnV0ZXMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0Ly8vc2V0IG1pbnV0ZSAodmFsdWUgOk1pbnV0ZXMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE0LCAxNiwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ1NlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDU2Vjb25kcygpOyB9XG5cdC8vL2dldCBzZWNvbmQgKCkgOlNlY29uZHMgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfZ2V0KHRoaXMsIDE3LCAxOSk7IH1cblx0Ly8vc2V0IHNlY29uZCAodmFsdWUgOlNlY29uZHMpIHsgT2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDE3LCAxOSwgdmFsdWUsIHRydWUpOyB9XG5cdGdldFVUQ01pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gT2Zmc2V0RGF0ZVRpbWVfdXNlKHRoaXMpLmdldFVUQ01pbGxpc2Vjb25kcygpOyB9Ly8vXG5cdC8vL2dldCBtaWxsaXNlY29uZCAoKSA6TWlsbGlzZWNvbmRzIHsgcmV0dXJuIHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdJTEwMDA7IH0vLy9cblx0LypzZXQgbWlsbGlzZWNvbmQgKHZhbHVlIDpNaWxsaXNlY29uZHMpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgMTkpICsgKCB2YWx1ZSA/ICggJy4nICsgKCAnJyArIHZhbHVlICkucGFkU3RhcnQoMywgJzAnKSApLnJlcGxhY2UoRE9UX1pFUk8sICcnKSA6ICcnICkgKyB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UodGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLnNlYXJjaChPRkZTRVQkKSk7XG5cdFx0T2Zmc2V0RGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDAsIDAsIGZhbHNlKTtcblx0fSovLy9cblx0Ly8vZ2V0IG1pY3Jvc2Vjb25kICgpIDpNaWxsaXNlY29uZHNcblx0Ly8vc2V0IG1pY3Jvc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHQvLy9nZXQgbmFub3NlY29uZCAoKSA6TWlsbGlzZWNvbmRzXG5cdC8vL3NldCBuYW5vc2Vjb25kICh2YWx1ZSA6TWlsbGlzZWNvbmRzKVxuXHRcblx0Z2V0VVRDRGF5ICggICAgICAgICAgICAgICAgICAgICkgICAgICB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcykuZ2V0VVRDRGF5KCk7IH1cblx0Ly8vZ2V0IGRheU9mV2VlayAoKSB7IHJldHVybiBPZmZzZXREYXRlVGltZV91c2UodGhpcywgdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKS5nZXRVVENEYXkoKSB8fCA3OyB9XG5cdGdldFRpbWV6b25lT2Zmc2V0ICggICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgIHtcblx0XHRjb25zdCB6ID0gWl9leGVjKHRoaXNbT2Zmc2V0RGF0ZVRpbWVfSVNPU3RyaW5nXSk7XG5cdFx0cmV0dXJuIHogPyArelsxXSo2MCArICsoIHpbMl0gKyB6WzNdICkgOiAwO1xuXHR9XG5cdC8vL2dldCBvZmZzZXQgKCkgeyByZXR1cm4gdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAnWicgOiB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoLTYpOyB9XG5cdC8qc2V0IG9mZnNldCAodmFsdWUpIHtcblx0XHR0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10uc2xpY2UoMCwgdGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddLmVuZHNXaXRoKCdaJykgPyAtMSA6IC02KSArIHZhbHVlO1xuXHRcdE9mZnNldERhdGVUaW1lX3NldCh0aGlzLCAwLCAwLCAwLCB0cnVlKTtcblx0fSovLy9cblx0Z2V0VGltZSAoICAgICAgICAgICAgICAgICAgICApICAgICAgIHsgcmV0dXJuIGZsb29yKCt0aGlzW09mZnNldERhdGVUaW1lX3ZhbHVlXSk7IH0vLy9cblx0LypzZXRUaW1lICh0aGlzIDpPZmZzZXREYXRlVGltZSwgdmFsdWUgOlRpbWUpIDp2b2lkIHtcblx0XHR2YWx1ZSA9IERBVEUuc2V0VGltZSh2YWx1ZSk7XG5cdFx0Y29uc3QgeiA9IFpfZXhlYyh0aGlzW09mZnNldERhdGVUaW1lX0lTT1N0cmluZ10pO1xuXHRcdERBVEUuc2V0VGltZSh2YWx1ZSArICggeiA/ICt6WzFdKjYwICsgKyggelsyXSArIHpbM10gKSA6IDAgKSo2MDAwMCk7XG5cdFx0dGhpc1tPZmZzZXREYXRlVGltZV9JU09TdHJpbmddID0geiA/IERBVEUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAtMSkgKyB6WzBdIDogREFURS50b0lTT1N0cmluZygpO1xuXHRcdHRoaXNbT2Zmc2V0RGF0ZVRpbWVfdmFsdWVdID0gVmFsdWVPRkZTRVQodmFsdWUsICcnKTtcblx0XHQvLy9yZXR1cm4gdmFsdWU7XG5cdH0qL1xuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVUaW1lX0lTT1N0cmluZyAgICAgICAgICAgICAgICA9IFN5bWJvbCgnTG9jYWxEYXRlVGltZV9JU09TdHJpbmcnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVUaW1lX3ZhbHVlJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlVGltZV9nZXQgPSAodGhhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZShzdGFydCwgZW5kKTtcbmNvbnN0IExvY2FsRGF0ZVRpbWVfc2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0dGhhdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gPSB0aGF0W0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKGVuZClcblx0KTtcbn07XG5leHBvcnQgY29uc3QgTG9jYWxEYXRlVGltZSA9IC8qI19fUFVSRV9fKi9mcGMoY2xhc3MgTG9jYWxEYXRlVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVUaW1lX0lTT1N0cmluZ10gICAgICAgIDtcblx0W0xvY2FsRGF0ZVRpbWVfdmFsdWVdICAgICAgIDtcblx0XG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSAoKSB7IHJldHVybiAnTG9jYWxEYXRlVGltZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiB0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdOyB9XG5cdHRvSVNPU3RyaW5nICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddOyB9XG5cdFxuXHRjb25zdHJ1Y3RvciAobGl0ZXJhbCAgICAgICAgKSB7XG5cdFx0SVNfTE9DQUxfREFURVRJTUUobGl0ZXJhbCkgJiYgdmFsaWRhdGVMZWFwKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBEYXRlLVRpbWUgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IGxpdGVyYWwucmVwbGFjZShULCAnVCcpXG5cdFx0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRcblx0Z2V0RnVsbFllYXIgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICB7IHJldHVybiBMb2NhbERhdGVUaW1lX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDAsIDQsIHZhbHVlKTsgfVxuXHRnZXRNb250aCAoICAgICAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDUsIDcpIC0gMTsgfVxuXHRzZXRNb250aCAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgICAgICkgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgOCwgMTApOyB9XG5cdHNldERhdGUgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDgsIDEwLCB2YWx1ZSk7IH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICAgICAgKSAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTEsIDEzKTsgfVxuXHRzZXRIb3VycyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgKSAgICAgICB7IExvY2FsRGF0ZVRpbWVfc2V0KHRoaXMsIDExLCAxMywgdmFsdWUpOyB9XG5cdGdldE1pbnV0ZXMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZVRpbWVfZ2V0KHRoaXMsIDE0LCAxNik7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlVGltZV9zZXQodGhpcywgMTQsIDE2LCB2YWx1ZSk7IH1cblx0Z2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlVGltZV9nZXQodGhpcywgMTcsIDE5KTsgfVxuXHRzZXRTZWNvbmRzICggICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbERhdGVUaW1lX3NldCh0aGlzLCAxNywgMTksIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgeyByZXR1cm4gK3RoaXNbTG9jYWxEYXRlVGltZV92YWx1ZV0uc2xpY2UoMTQsIDE3KS5wYWRFbmQoMywgJzAnKTsgfS8vL1xuXHRzZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICAgICAgICApICAgICAgIHtcblx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsRGF0ZVRpbWVfSVNPU3RyaW5nXSA9IHRoaXNbTG9jYWxEYXRlVGltZV9JU09TdHJpbmddLnNsaWNlKDAsIDE5KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbERhdGVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxEYXRlX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbERhdGVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbERhdGVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxEYXRlX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsRGF0ZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsRGF0ZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbERhdGVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoc2l6ZSwgJzAnKSArIHRoYXRbTG9jYWxEYXRlX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbERhdGUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsRGF0ZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbERhdGVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxEYXRlX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ0xvY2FsRGF0ZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxEYXRlX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9EQVRFKGxpdGVyYWwpICYmIHZhbGlkYXRlTGVhcChsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgTG9jYWwgRGF0ZSAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTG9jYWxEYXRlX3ZhbHVlXSA9IFZhbHVlKFxuXHRcdFx0dGhpc1tMb2NhbERhdGVfSVNPU3RyaW5nXSA9IGxpdGVyYWxcblx0XHQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdFxuXHRnZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgKSAgICAgICAgICAgeyByZXR1cm4gTG9jYWxEYXRlX2dldCh0aGlzLCAwLCA0KTsgfVxuXHRzZXRGdWxsWWVhciAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICApICAgICAgIHsgTG9jYWxEYXRlX3NldCh0aGlzLCAwLCA0LCB2YWx1ZSk7IH1cblx0Z2V0TW9udGggKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIExvY2FsRGF0ZV9nZXQodGhpcywgNSwgNykgLSAxOyB9XG5cdHNldE1vbnRoICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbERhdGVfc2V0KHRoaXMsIDUsIDcsIHZhbHVlICsgMSk7IH1cblx0Z2V0RGF0ZSAoICAgICAgICAgICAgICAgKSAgICAgICB7IHJldHVybiBMb2NhbERhdGVfZ2V0KHRoaXMsIDgsIDEwKTsgfVxuXHRzZXREYXRlICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgKSAgICAgICB7IExvY2FsRGF0ZV9zZXQodGhpcywgOCwgMTAsIHZhbHVlKTsgfVxuXHRcbn0pO1xuXG5jb25zdCBMb2NhbFRpbWVfSVNPU3RyaW5nICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfSVNPU3RyaW5nJykgICAgICAgO1xuY29uc3QgTG9jYWxUaW1lX3ZhbHVlICAgICAgICAgICAgICAgID0gU3ltYm9sKCdMb2NhbFRpbWVfdmFsdWUnKSAgICAgICA7XG5jb25zdCBMb2NhbFRpbWVfZ2V0ID0gKHRoYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgc3RhcnQgICAgICAgICwgZW5kICAgICAgICApID0+ICt0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddLnNsaWNlKHN0YXJ0LCBlbmQpO1xuY29uc3QgTG9jYWxUaW1lX3NldCA9ICh0aGF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0ICAgICAgICAsIGVuZCAgICAgICAgLCB2YWx1ZSAgICAgICAgKSAgICAgICA9PiB7XG5cdGNvbnN0IHN0cmluZyA9ICcnICsgdmFsdWU7XG5cdGNvbnN0IHNpemUgPSBlbmQgLSBzdGFydDtcblx0aWYgKCBzdHJpbmcubGVuZ3RoPnNpemUgKSB7IHRocm93IFJhbmdlRXJyb3IoKTsgfS8vL1xuXHR0aGF0W0xvY2FsVGltZV92YWx1ZV0gPSBWYWx1ZShcblx0XHR0aGF0W0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhhdFtMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCBzdGFydCkgKyBzdHJpbmcucGFkU3RhcnQoMiwgJzAnKSArIHRoYXRbTG9jYWxUaW1lX0lTT1N0cmluZ10uc2xpY2UoZW5kKVxuXHQpO1xufTtcbmV4cG9ydCBjb25zdCBMb2NhbFRpbWUgPSAvKiNfX1BVUkVfXyovZnBjKGNsYXNzIExvY2FsVGltZSBleHRlbmRzIERhdGV0aW1lIHtcblx0XG5cdFtMb2NhbFRpbWVfSVNPU3RyaW5nXSAgICAgICAgO1xuXHRbTG9jYWxUaW1lX3ZhbHVlXSAgICAgICA7XG5cdFxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ0xvY2FsVGltZScgICAgICAgICA7IH1cblx0XG5cdCAgICAgICAgIHZhbHVlT2YgKCAgICAgICAgICAgICAgICkgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX3ZhbHVlXTsgfVxuXHR0b0lTT1N0cmluZyAoICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIHRoaXNbTG9jYWxUaW1lX0lTT1N0cmluZ107IH1cblx0XG5cdGNvbnN0cnVjdG9yIChsaXRlcmFsICAgICAgICApIHtcblx0XHRJU19MT0NBTF9USU1FKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBMb2NhbCBUaW1lICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gbGl0ZXJhbFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdGdldEhvdXJzICggICAgICAgICAgICAgICApICAgICAgICB7IHJldHVybiBMb2NhbFRpbWVfZ2V0KHRoaXMsIDAsIDIpOyB9XG5cdHNldEhvdXJzICggICAgICAgICAgICAgICAgIHZhbHVlICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDAsIDIsIHZhbHVlKTsgfVxuXHRnZXRNaW51dGVzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgMywgNSk7IH1cblx0c2V0TWludXRlcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDMsIDUsIHZhbHVlKTsgfVxuXHRnZXRTZWNvbmRzICggICAgICAgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIExvY2FsVGltZV9nZXQodGhpcywgNiwgOCk7IH1cblx0c2V0U2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICkgICAgICAgeyBMb2NhbFRpbWVfc2V0KHRoaXMsIDYsIDgsIHZhbHVlKTsgfVxuXHRnZXRNaWxsaXNlY29uZHMgKCAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICB7IHJldHVybiArdGhpc1tMb2NhbFRpbWVfdmFsdWVdLnNsaWNlKDYsIDkpLnBhZEVuZCgzLCAnMCcpOyB9Ly8vXG5cdHNldE1pbGxpc2Vjb25kcyAoICAgICAgICAgICAgICAgICB2YWx1ZSAgICAgICAgICAgICAgKSAgICAgICB7XG5cdFx0dGhpc1tMb2NhbFRpbWVfdmFsdWVdID0gVmFsdWUoXG5cdFx0XHR0aGlzW0xvY2FsVGltZV9JU09TdHJpbmddID0gdGhpc1tMb2NhbFRpbWVfSVNPU3RyaW5nXS5zbGljZSgwLCA4KSArICggdmFsdWUgPyAoICcuJyArICggJycgKyB2YWx1ZSApLnBhZFN0YXJ0KDMsICcwJykgKS5yZXBsYWNlKERPVF9aRVJPLCAnJykgOiAnJyApXG5cdFx0KTtcblx0fVxuXHRcbn0pO1xuIiwiaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IHBhcnNlSW50IGZyb20gJy5wYXJzZUludCc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tQ29kZVBvaW50IGZyb20gJy5TdHJpbmcuZnJvbUNvZGVQb2ludCc7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbmNvbnN0IEVTQ0FQRURfSU5fU0lOR0xFX0xJTkUgPSAvW15cXFxcXSt8XFxcXCg/OltcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcbmNvbnN0IEVTQ0FQRURfSU5fTVVMVElfTElORSA9IC9bXlxcblxcXFxdK3xcXG58XFxcXCg/OltcXHQgXSpcXG5bXFx0XFxuIF0qfFtcXFxcXCJidG5mci9dfHUuezR9fFUuezh9KS9ncztcblxuZXhwb3J0IGNvbnN0IEJhc2ljU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9TSU5HTEVfTElORSkgO1xuXHRjb25zdCB7IGxlbmd0aCB9ID0gcGFydHM7XG5cdGxldCBpbmRleCA9IDA7XG5cdGRvIHtcblx0XHRjb25zdCBwYXJ0ID0gcGFydHNbaW5kZXhdIDtcblx0XHRpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlsaW5lQmFzaWNTdHJpbmcgPSAobGl0ZXJhbCAgICAgICAgLCB1c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICAgICAgICAsIG4gICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwgKSB7IHJldHVybiAnJzsgfVxuXHRjb25zdCBwYXJ0cyA9IGxpdGVyYWwubWF0Y2goRVNDQVBFRF9JTl9NVUxUSV9MSU5FKSA7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBwYXJ0cztcblx0bGV0IGluZGV4ID0gMDtcblx0ZG8ge1xuXHRcdGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF0gO1xuXHRcdGlmICggcGFydD09PSdcXG4nICkge1xuXHRcdFx0KytuO1xuXHRcdFx0cGFydHNbaW5kZXhdID0gdXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZztcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIHBhcnRbMF09PT0nXFxcXCcgKSB7XG5cdFx0XHRzd2l0Y2ggKCBwYXJ0WzFdICkge1xuXHRcdFx0XHRjYXNlICdcXG4nOlxuXHRcdFx0XHRjYXNlICcgJzpcblx0XHRcdFx0Y2FzZSAnXFx0Jzpcblx0XHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPSBwYXJ0LmluZGV4T2YoJ1xcbicsIGkpICsgMTsgKSB7ICsrbjsgfVxuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9ICcnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdcXFxcJzogcGFydHNbaW5kZXhdID0gJ1xcXFwnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnXCInOiBwYXJ0c1tpbmRleF0gPSAnXCInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnYic6IHBhcnRzW2luZGV4XSA9ICdcXGInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndCc6IHBhcnRzW2luZGV4XSA9ICdcXHQnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnbic6IHBhcnRzW2luZGV4XSA9ICdcXG4nOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnZic6IHBhcnRzW2luZGV4XSA9ICdcXGYnOyBicmVhaztcblx0XHRcdFx0Y2FzZSAncic6IHBhcnRzW2luZGV4XSA9ICdcXHInOyBicmVhaztcblx0XHRcdFx0Y2FzZSAndSc6XG5cdFx0XHRcdFx0Y29uc3QgY2hhckNvZGUgICAgICAgICA9IHBhcnNlSW50KHBhcnQuc2xpY2UoMiksIDE2KTtcblx0XHRcdFx0XHRvcHRpb25zLm11c3RTY2FsYXIgJiYgMHhEN0ZGPGNoYXJDb2RlICYmIGNoYXJDb2RlPDB4RTAwMFxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ1UnOlxuXHRcdFx0XHRcdGNvbnN0IGNvZGVQb2ludCAgICAgICAgID0gcGFyc2VJbnQocGFydC5zbGljZSgyKSwgMTYpO1xuXHRcdFx0XHRcdCggb3B0aW9ucy5tdXN0U2NhbGFyICYmIDB4RDdGRjxjb2RlUG9pbnQgJiYgY29kZVBvaW50PDB4RTAwMCB8fCAweDEwRkZGRjxjb2RlUG9pbnQgKVxuXHRcdFx0XHRcdCYmIGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnZhbGlkIFVuaWNvZGUgU2NhbGFyICR7cGFydH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnLCBpdGVyYXRvci5saW5lSW5kZXggKyBuKSkpO1xuXHRcdFx0XHRcdHBhcnRzW2luZGV4XSA9IGZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnLyc6IHBhcnRzW2luZGV4XSA9ICcvJzsgYnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHdoaWxlICggKytpbmRleCE9PWxlbmd0aCApO1xuXHRyZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuIiwiaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgQmlnSW50IGZyb20gJy5CaWdJbnQ/JztcbmltcG9ydCBwYXJzZUludCBmcm9tICcucGFyc2VJbnQnO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcblxuaW1wb3J0IHsgbmV3UmVnRXhwLCB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuZXhwb3J0IGNvbnN0IElOVEVHRVJfRCA9IC9bLStdPyg/OjB8WzEtOV1bX1xcZF0qKS87XG5leHBvcnQgY29uc3QgeyB0ZXN0OiBCQURfRCB9ID0gLyojX19QVVJFX18qL25ld1JlZ0V4cGBfKD8hXFxkKWAudmFsdWVPZigpO1xuY29uc3QgeyB0ZXN0OiBJU19EX0lOVEVHRVIgfSA9IC8qI19fUFVSRV9fKi9uZXdSZWdFeHBgXiR7SU5URUdFUl9EfSRgLnZhbHVlT2YoKTtcbmNvbnN0IHsgdGVzdDogSVNfWE9CX0lOVEVHRVIgfSA9IHRoZVJlZ0V4cCgvXjAoPzp4W1xcZEEtRmEtZl1bX1xcZEEtRmEtZl0qfG9bMC03XVtfMC03XSp8YlswMV1bXzAxXSopJC8pO1xuY29uc3QgeyB0ZXN0OiBCQURfWE9CIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYF8oPyFbXFxkQS1GYS1mXSlgLnZhbHVlT2YoKTtcbmNvbnN0IFVOREVSU0NPUkVTID0gL18vZztcbmNvbnN0IFVOREVSU0NPUkVTX1NJR04gPSAvX3xeWy0rXS9nO1xuXG5jb25zdCBJU19JTlRFR0VSID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICAgPT4gKCBJU19EX0lOVEVHRVIobGl0ZXJhbCkgfHwgLypvcHRpb25zLnhvYiAmJiAqL0lTX1hPQl9JTlRFR0VSKGxpdGVyYWwpICkgJiYgIUJBRF9YT0IobGl0ZXJhbCk7XG5cbmNvbnN0IE1JTiAgICAgICAgID0gQmlnSW50ICYmIC0vKiNfX1BVUkVfXyovQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKTsvLyAtKDJuKiooNjRuLTFuKSkgfHwgLU1BWC0xblxuY29uc3QgTUFYICAgICAgICAgPSBCaWdJbnQgJiYgLyojX19QVVJFX18qL0JpZ0ludCgnMHg3RkZGRkZGRkZGRkZGRkZGJyk7Ly8gMm4qKig2NG4tMW4pLTFuIHx8IC1NSU4tMW5cblxuY29uc3QgQmlnSW50SW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgPT4ge1xuXHRJU19JTlRFR0VSKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW52YWxpZCBJbnRlZ2VyICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRjb25zdCBiaWdJbnQgICAgICAgICA9IGxpdGVyYWxbMF09PT0nLSdcblx0XHQ/IC1CaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSlcblx0XHQ6IEJpZ0ludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVNfU0lHTiwgJycpKTtcblx0b3B0aW9ucy5hbGxvd0xvbmdlciB8fCBNSU48PWJpZ0ludCAmJiBiaWdJbnQ8PU1BWCB8fCBpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgSW50ZWdlciBleHBlY3QgNjQgYml0IHJhbmdlICgtOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwOCB0byA5LDIyMywzNzIsMDM2LDg1NCw3NzUsODA3KSwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBiaWdJbnQ7XG59O1xuXG5jb25zdCBOdW1iZXJJbnRlZ2VyID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdElTX0lOVEVHRVIobGl0ZXJhbCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEludGVnZXIgJHtsaXRlcmFsfWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdGNvbnN0IG51bWJlciA9IHBhcnNlSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFUywgJycpKTtcblx0aXNTYWZlSW50ZWdlcihudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBJbnRlZ2VyIGRpZCBub3QgdXNlIEJpdEludCBtdXN0IGZpdCBOdW1iZXIuaXNTYWZlSW50ZWdlciwgbm90IGluY2x1ZGVzICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBtZWV0IGF0ICcpKSk7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZWdlciA9IChsaXRlcmFsICAgICAgICApICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT10cnVlICkgeyByZXR1cm4gQmlnSW50SW50ZWdlcihsaXRlcmFsKTsgfVxuXHRpZiAoIG9wdGlvbnMudXNpbmdCaWdJbnQ9PT1mYWxzZSApIHsgcmV0dXJuIE51bWJlckludGVnZXIobGl0ZXJhbCk7IH1cblx0SVNfSU5URUdFUihsaXRlcmFsKSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEludmFsaWQgSW50ZWdlciAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Y29uc3QgbnVtYmVyICAgICAgICAgPSBwYXJzZUludChsaXRlcmFsLnJlcGxhY2UoVU5ERVJTQ09SRVMsICcnKSk7XG5cdGlmICggb3B0aW9ucy5JbnRlZ2VyTWluTnVtYmVyPD1udW1iZXIgJiYgbnVtYmVyPD1vcHRpb25zLkludGVnZXJNYXhOdW1iZXIgKSB7IHJldHVybiBudW1iZXI7IH1cblx0Y29uc3QgYmlnSW50ICAgICAgICAgPSBsaXRlcmFsWzBdPT09Jy0nXG5cdFx0PyAtQmlnSW50KGxpdGVyYWwucmVwbGFjZShVTkRFUlNDT1JFU19TSUdOLCAnJykpXG5cdFx0OiBCaWdJbnQobGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTX1NJR04sICcnKSk7XG5cdG9wdGlvbnMuYWxsb3dMb25nZXIgfHwgTUlOPD1iaWdJbnQgJiYgYmlnSW50PD1NQVggfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEludGVnZXIgZXhwZWN0IDY0IGJpdCByYW5nZSAoLTksMjIzLDM3MiwwMzYsODU0LDc3NSw4MDggdG8gOSwyMjMsMzcyLDAzNiw4NTQsNzc1LDgwNyksIG5vdCBpbmNsdWRlcyAke2xpdGVyYWx9YCArIGl0ZXJhdG9yLndoZXJlKCcgbWVldCBhdCAnKSkpO1xuXHRyZXR1cm4gYmlnSW50O1xufTtcbiIsImltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IFJhbmdlRXJyb3IgZnJvbSAnLlJhbmdlRXJyb3InO1xuaW1wb3J0IGlzRmluaXRlIGZyb20gJy5pc0Zpbml0ZSc7XG5pbXBvcnQgSW5maW5pdHkgZnJvbSAnLkluZmluaXR5JztcbmltcG9ydCBOYU4gZnJvbSAnLk5hTic7XG5cbmltcG9ydCB7IG5ld1JlZ0V4cCwgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5pbXBvcnQgeyBJTlRFR0VSX0QsIEJBRF9EIH0gZnJvbSAnLi9JbnRlZ2VyJztcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0ICogYXMgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuY29uc3QgX05hTiA9IC1OYU47XG5jb25zdCBfSW5maW5pdHkgPSAtSW5maW5pdHk7XG5jb25zdCB7IHRlc3Q6IElTX0ZMT0FUIH0gPSAvKiNfX1BVUkVfXyovbmV3UmVnRXhwYFxuXHReXG5cdCR7SU5URUdFUl9EfVxuXHQoPzpcblx0XHRcXC5cXGRbX1xcZF0qXG5cdFx0KD86W2VFXVstK10/XFxkW19cXGRdKik/XG5cdHxcblx0XHRbZUVdWy0rXT9cXGRbX1xcZF0qXG5cdClcblx0JGAudmFsdWVPZigpO1xuY29uc3QgVU5ERVJTQ09SRVMgPSAvXy9nO1xuY29uc3QgeyB0ZXN0OiBJU19aRVJPIH0gPSB0aGVSZWdFeHAoL15bLStdPzAoPzpcXC4wKyk/KD86W2VFXVstK10/MCspPyQvKTtcbmNvbnN0IHsgZXhlYzogTk9STUFMSVpFRCB9ID0gdGhlUmVnRXhwICAgKC9eWy0wXT8oXFxkKikoPzpcXC4oXFxkKykpPyg/OmVcXCs/KC0/XFxkKykpPyQvKTtcbmNvbnN0IHsgZXhlYzogT1JJR0lOQUwgfSA9IHRoZVJlZ0V4cCAgICgvXlstK10/MD8oXFxkKikoPzpcXC4oXFxkKj8pMCopPyg/OltlRV1cXCs/KC0/XFxkKykpPyQvKTtcblxuZXhwb3J0IGNvbnN0IEZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIUlTX0ZMT0FUKGxpdGVyYWwpIHx8IEJBRF9EKGxpdGVyYWwpICkge1xuXHRcdGlmICggb3B0aW9ucy5zRmxvYXQgKSB7XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0naW5mJyB8fCBsaXRlcmFsPT09JytpbmYnICkgeyByZXR1cm4gSW5maW5pdHk7IH1cblx0XHRcdGlmICggbGl0ZXJhbD09PSctaW5mJyApIHsgcmV0dXJuIF9JbmZpbml0eTsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09J25hbicgfHwgbGl0ZXJhbD09PScrbmFuJyApIHsgcmV0dXJuIE5hTjsgfVxuXHRcdFx0aWYgKCBsaXRlcmFsPT09Jy1uYW4nICkgeyByZXR1cm4gX05hTjsgfVxuXHRcdH1cblx0XHRlbHNlIGlmICggIW9wdGlvbnMuc0Vycm9yICkge1xuXHRcdFx0aWYgKCBsaXRlcmFsPT09J2luZicgfHwgbGl0ZXJhbD09PScraW5mJyApIHsgcmV0dXJuIEluZmluaXR5OyB9XG5cdFx0XHRpZiAoIGxpdGVyYWw9PT0nLWluZicgKSB7IHJldHVybiBfSW5maW5pdHk7IH1cblx0XHR9XG5cdFx0dGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbnZhbGlkIEZsb2F0ICR7bGl0ZXJhbH1gICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHR9XG5cdGNvbnN0IHdpdGhvdXRVbmRlcnNjb3JlcyAgICAgICAgID0gbGl0ZXJhbC5yZXBsYWNlKFVOREVSU0NPUkVTLCAnJyk7XG5cdGNvbnN0IG51bWJlciAgICAgICAgID0gK3dpdGhvdXRVbmRlcnNjb3Jlcztcblx0aWYgKCBvcHRpb25zLnNFcnJvciApIHtcblx0XHRpc0Zpbml0ZShudW1iZXIpIHx8IGl0ZXJhdG9yLnRocm93cyhSYW5nZUVycm9yKGBGbG9hdCAke2xpdGVyYWx9IGhhcyBiZWVuIGFzIGJpZyBhcyBpbmZgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdG51bWJlciB8fCBJU19aRVJPKHdpdGhvdXRVbmRlcnNjb3JlcykgfHwgaXRlcmF0b3IudGhyb3dzKFJhbmdlRXJyb3IoYEZsb2F0ICR7bGl0ZXJhbH0gaGFzIGJlZW4gYXMgbGl0dGxlIGFzICR7bGl0ZXJhbFswXT09PSctJyA/ICctJyA6ICcnfTBgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHsgMTogbm9ybWFsaXplZF9pbnRlZ2VyLCAyOiBub3JtYWxpemVkX2ZyYWN0aW9uYWwgPSAnJywgMzogbm9ybWFsaXplZF9leHBvbmVudCA9ICcnIH0gPSBOT1JNQUxJWkVEKG51bWJlciAgICAgICApIDtcblx0XHRjb25zdCB7IDE6IG9yaWdpbmFsX2ludGVnZXIsIDI6IG9yaWdpbmFsX2ZyYWN0aW9uYWwgPSAnJywgMzogb3JpZ2luYWxfZXhwb25lbnQgPSAnJyB9ID0gT1JJR0lOQUwod2l0aG91dFVuZGVyc2NvcmVzKSA7XG5cdFx0b3JpZ2luYWxfaW50ZWdlciArIG9yaWdpbmFsX2ZyYWN0aW9uYWw9PT1ub3JtYWxpemVkX2ludGVnZXIgKyBub3JtYWxpemVkX2ZyYWN0aW9uYWxcblx0XHQmJlxuXHRcdG9yaWdpbmFsX2V4cG9uZW50ICAgICAgICAtIG9yaWdpbmFsX2ZyYWN0aW9uYWwubGVuZ3RoPT09bm9ybWFsaXplZF9leHBvbmVudCAgICAgICAgLSBub3JtYWxpemVkX2ZyYWN0aW9uYWwubGVuZ3RoXG5cdFx0fHxcblx0XHRpdGVyYXRvci50aHJvd3MoUmFuZ2VFcnJvcihgRmxvYXQgJHtsaXRlcmFsfSBoYXMgbG9zdCBpdHMgZXhhY3QgYW5kIGJlZW4gJHtudW1iZXJ9YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0fVxuXHRyZXR1cm4gbnVtYmVyO1xufTtcbiIsImltcG9ydCBFcnJvciBmcm9tICcuRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5cbmltcG9ydCAqIGFzIGl0ZXJhdG9yIGZyb20gJy4uL2l0ZXJhdG9yJztcbmltcG9ydCAqIGFzIHJlZ2V4cHMgZnJvbSAnLi4vcmVnZXhwcyc7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBuZXdBcnJheSwgT0ZfVEFCTEVTLCBpc0FycmF5LCBpc1N0YXRpYyB9IGZyb20gJy4uL3R5cGVzL0FycmF5JztcbmltcG9ydCB7IERJUkVDVExZLCBJTVBMSUNJVExZLCBQQUlSLCBpc1RhYmxlLCBpc0lubGluZSwgZGlyZWN0bHlJZk5vdCwgZnJvbVBhaXIgfSBmcm9tICcuLi90eXBlcy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcsIE11bHRpbGluZUJhc2ljU3RyaW5nIH0gZnJvbSAnLi4vdHlwZXMvU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgICAgICApICAgICAgICA9PiB7XG5cdGNvbnN0IHsgbGVuZ3RoIH0gPSBrZXlzO1xuXHRsZXQgaW5kZXggICAgICAgICA9IDA7XG5cdHdoaWxlICggaW5kZXg8bGVuZ3RoICkge1xuXHRcdGNvbnN0IGtleSAgICAgICAgID0ga2V5c1tpbmRleCsrXSA7XG5cdFx0aWYgKCBrZXkgaW4gdGFibGUgKSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV07XG5cdFx0XHRpZiAoIGlzVGFibGUodGFibGUpICkge1xuXHRcdFx0XHRpc0lubGluZSh0YWJsZSkgJiYgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIElubGluZSBUYWJsZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggaXNBcnJheSh0YWJsZSkgKSB7XG5cdFx0XHRcdGlzU3RhdGljKHRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhcHBlbmQgdmFsdWUgdG8gU3RhdGljIEFycmF5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0dGFibGUgPSB0YWJsZVsoIHRhYmxlICAgICAgICAgICkubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGhyb3cgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gZGVmaW5lIFRhYmxlIHVuZGVyIG5vbi1UYWJsZSB2YWx1ZWAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YWJsZSA9IHRhYmxlW2tleV0gPSBuZXcgb3B0aW9ucy5UYWJsZShJTVBMSUNJVExZKTtcblx0XHRcdHdoaWxlICggaW5kZXg8bGVuZ3RoICkgeyB0YWJsZSA9IHRhYmxlW2tleXNbaW5kZXgrK10gXSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFkpOyB9XG5cdFx0XHRyZXR1cm4gdGFibGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YWJsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBlbmRUYWJsZSA9ICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGFzQXJyYXlJdGVtICAgICAgICAgLCB0YWcgICAgICAgICkgICAgICAgID0+IHtcblx0bGV0IGxhc3RUYWJsZSAgICAgICA7XG5cdGlmICggYXNBcnJheUl0ZW0gKSB7XG5cdFx0bGV0IGFycmF5T2ZUYWJsZXMgICAgICAgICAgICAgIDtcblx0XHRpZiAoIGZpbmFsS2V5IGluIHRhYmxlICkgeyBpc0FycmF5KGFycmF5T2ZUYWJsZXMgPSB0YWJsZVtmaW5hbEtleV0pICYmICFpc1N0YXRpYyhhcnJheU9mVGFibGVzKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBwdXNoIFRhYmxlIHRvIG5vbi1BcnJheU9mVGFibGVzIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTsgfVxuXHRcdGVsc2UgeyBhcnJheU9mVGFibGVzID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoT0ZfVEFCTEVTKTsgfVxuXHRcdHRhZyAmJiBvcHRpb25zLmNvbGxlY3QodGFnLCBhcnJheU9mVGFibGVzLCB0YWJsZSwgZmluYWxLZXkpO1xuXHRcdGFycmF5T2ZUYWJsZXNbYXJyYXlPZlRhYmxlcy5sZW5ndGhdID0gbGFzdFRhYmxlID0gbmV3IG9wdGlvbnMuVGFibGUoRElSRUNUTFkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGlmICggZmluYWxLZXkgaW4gdGFibGUgKSB7XG5cdFx0XHRsYXN0VGFibGUgPSB0YWJsZVtmaW5hbEtleV07XG5cdFx0XHRmcm9tUGFpcihsYXN0VGFibGUpICYmIGl0ZXJhdG9yLnRocm93cyhFcnJvcihgQSB0YWJsZSBkZWZpbmVkIGltcGxpY2l0bHkgdmlhIGtleS92YWx1ZSBwYWlyIGNhbiBub3QgYmUgYWNjZXNzZWQgdG8gdmlhIFtdYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRkaXJlY3RseUlmTm90KGxhc3RUYWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBEdXBsaWNhdGUgVGFibGUgZGVmaW5pdGlvbmAgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdFx0fVxuXHRcdGVsc2UgeyB0YWJsZVtmaW5hbEtleV0gPSBsYXN0VGFibGUgPSBuZXcgb3B0aW9ucy5UYWJsZShESVJFQ1RMWSk7IH1cblx0XHR0YWcgJiYgb3B0aW9ucy5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0fVxuXHRyZXR1cm4gbGFzdFRhYmxlO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbmxpbmVUYWJsZSA9ICh0YWJsZSAgICAgICAsIGtleXMgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRjb25zdCB7IGxlbmd0aCB9ID0ga2V5cztcblx0bGV0IGluZGV4ICAgICAgICAgPSAwO1xuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApIHtcblx0XHRjb25zdCBrZXkgICAgICAgICA9IGtleXNbaW5kZXgrK10gO1xuXHRcdGlmICgga2V5IGluIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSB0YWJsZVtrZXldO1xuXHRcdFx0aXNUYWJsZSh0YWJsZSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBUcnlpbmcgdG8gYXNzaWduIHByb3BlcnR5IHRocm91Z2ggbm9uLVRhYmxlIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGlzSW5saW5lKHRhYmxlKSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYFRyeWluZyB0byBhc3NpZ24gcHJvcGVydHkgdGhyb3VnaCBzdGF0aWMgSW5saW5lIFRhYmxlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGZyb21QYWlyKHRhYmxlKSB8fCBpdGVyYXRvci50aHJvd3MoRXJyb3IoYEEgdGFibGUgZGVmaW5lZCBpbXBsaWNpdGx5IHZpYSBbXSBjYW4gbm90IGJlIGFjY2Vzc2VkIHRvIHZpYSBrZXkvdmFsdWUgcGFpcmAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRhYmxlID0gdGFibGVba2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKElNUExJQ0lUTFksIFBBSVIpO1xuXHRcdFx0d2hpbGUgKCBpbmRleDxsZW5ndGggKSB7IHRhYmxlID0gdGFibGVba2V5c1tpbmRleCsrXSBdID0gbmV3IG9wdGlvbnMuVGFibGUoSU1QTElDSVRMWSwgUEFJUik7IH1cblx0XHRcdHJldHVybiB0YWJsZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhYmxlO1xufTtcblxuY29uc3QgY2hlY2tMaXRlcmFsU3RyaW5nID0gKGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdHJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGl0ZXJhbCkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gYSBMaXRlcmFsIFN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCB3YXMgZm91bmQgYXQgJykpKTtcblx0cmV0dXJuIGxpdGVyYWw7XG59O1xuXG5leHBvcnQgY29uc3QgYXNzaWduTGl0ZXJhbFN0cmluZyA9ICggKHRhYmxlICAgICAgICwgZmluYWxLZXkgICAgICAgICwgbGl0ZXJhbCAgICAgICAgKSAgICAgICAgID0+IHtcblx0aWYgKCAhbGl0ZXJhbC5zdGFydHNXaXRoKGAnJydgKSApIHtcblx0XHRjb25zdCAkID0gcmVnZXhwcy5MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGxpdGVyYWwgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCB2YWx1ZS5sZW5ndGggKyAyKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuICRbMl07XG5cdH1cblx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGl0ZXJhbC5zbGljZSgzKSk7XG5cdGlmICggJCApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgdmFsdWUubGVuZ3RoICsgNiksIHZhbHVlKSA6IHZhbHVlO1xuXHRcdHJldHVybiAkWzNdO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ011bHRpLWxpbmUgTGl0ZXJhbCBTdHJpbmcnLCBsaXRlcmFsLmxlbmd0aCk7XG5cdGNvbnN0IGxlYWRpbmdOZXdsaW5lID0gISggbGl0ZXJhbCA9IGxpdGVyYWwuc2xpY2UoMykgKTtcblx0aWYgKCBsZWFkaW5nTmV3bGluZSApIHtcblx0XHRsaXRlcmFsID0gc3RhcnQubXVzdCgpO1xuXHRcdGNvbnN0ICQgPSByZWdleHBzLl9fTVVMVElfTElORV9MSVRFUkFMX1NUUklOR19leGVjKGxpdGVyYWwpO1xuXHRcdGlmICggJCApIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gY2hlY2tMaXRlcmFsU3RyaW5nKCRbMV0pICsgJFsyXTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChbIGAnJydgLCBsaXRlcmFsLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCArIDMpIF0sIHZhbHVlKSA6IHZhbHVlO1xuXHRcdFx0cmV0dXJuICRbM107XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZz09PW51bGwgJiYgc3RhcnQubm93cmFwKG9wdGlvbnMuQVJHU19NT0RFKTtcblx0Zm9yICggY29uc3QgbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyBjaGVja0xpdGVyYWxTdHJpbmcobGl0ZXJhbCkgXTsgOyApIHtcblx0XHRjb25zdCBsaW5lICAgICAgICAgPSBzdGFydC5tdXN0KCk7XG5cdFx0Y29uc3QgJCA9IHJlZ2V4cHMuX19NVUxUSV9MSU5FX0xJVEVSQUxfU1RSSU5HX2V4ZWMobGluZSk7XG5cdFx0aWYgKCAkICkge1xuXHRcdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGNoZWNrTGl0ZXJhbFN0cmluZygkWzFdKSArICRbMl07XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGxpbmVzLmpvaW4ob3B0aW9ucy51c2VXaGF0VG9Kb2luTXVsdGlsaW5lU3RyaW5nICk7XG5cdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVMaXRlcmFsICkge1xuXHRcdFx0XHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBgJycnYDtcblx0XHRcdFx0bGVhZGluZ05ld2xpbmUgPyBsaW5lcy51bnNoaWZ0KGAnJydgKSA6IGxpbmVzWzBdID0gYCcnJyR7bGl0ZXJhbH1gO1xuXHRcdFx0XHR0YWJsZVtmaW5hbEtleV0gPSBMaXRlcmFsT2JqZWN0KGxpbmVzLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgdGFibGVbZmluYWxLZXldID0gdmFsdWU7IH1cblx0XHRcdHJldHVybiAkWzNdO1xuXHRcdH1cblx0XHRsaW5lc1tsaW5lcy5sZW5ndGhdID0gY2hlY2tMaXRlcmFsU3RyaW5nKGxpbmUpO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQmFzaWNTdHJpbmcgPSAoICh0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpdGVyYWwgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggIWxpdGVyYWwuc3RhcnRzV2l0aCgnXCJcIlwiJykgKSB7XG5cdFx0Y29uc3QgaW5kZXggPSByZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgobGl0ZXJhbCk7XG5cdFx0Y29uc3QgdmFsdWUgPSBCYXNpY1N0cmluZyhsaXRlcmFsLnNsaWNlKDEsIGluZGV4KSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuc2xpY2UoMCwgaW5kZXggKyAxKSwgdmFsdWUpIDogdmFsdWU7XG5cdFx0cmV0dXJuIGxpdGVyYWwuc2xpY2UoaW5kZXggKyAxKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRsZXQgbGVuZ3RoID0gMyArIHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaXRlcmFsLnNsaWNlKDMpKTtcblx0aWYgKCBsaXRlcmFsLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRjb25zdCAkID0gbGl0ZXJhbC5zbGljZSgzLCBsZW5ndGgpO1xuXHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGNvbnN0IHZhbHVlID0gQmFzaWNTdHJpbmcoJCkgKyAoIGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCBsZW5ndGggKz0gMykgPyBsaXRlcmFsLnN0YXJ0c1dpdGgoJ1wiJywgKytsZW5ndGgpID8gKCArK2xlbmd0aCwgJ1wiXCInICkgOiAnXCInIDogJycgKTtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbC5zbGljZSgwLCBsZW5ndGgpLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRyZXR1cm4gbGl0ZXJhbC5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGNvbnN0IHN0YXJ0ID0gbmV3IGl0ZXJhdG9yLm1hcmsoJ011bHRpLWxpbmUgQmFzaWMgU3RyaW5nJywgbGVuZ3RoKTtcblx0Y29uc3Qgc2tpcHBlZCAgICAgICAgPSAoIGxpdGVyYWwgPSBsaXRlcmFsLnNsaWNlKDMpICkgPyAwIDogMTtcblx0aWYgKCBza2lwcGVkICkge1xuXHRcdGxpdGVyYWwgPSBzdGFydC5tdXN0KCk7XG5cdFx0bGV0IGxlbmd0aCA9IHJlZ2V4cHMuTVVMVElfTElORV9CQVNJQ19TVFJJTkdfZXhlY18wX2xlbmd0aChsaXRlcmFsKTtcblx0XHRpZiAoIGxpdGVyYWwubGVuZ3RoIT09bGVuZ3RoICkge1xuXHRcdFx0Y29uc3QgJCA9IGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKTtcblx0XHRcdHJlZ2V4cHMuRVNDQVBFRF9FWENMVURFX0NPTlRST0xfQ0hBUkFDVEVSX3Rlc3QoJCkgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBNdWx0aWxpbmVCYXNpY1N0cmluZygkLCBvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmcgLCBza2lwcGVkKSArICggbGl0ZXJhbC5zdGFydHNXaXRoKCdcIicsIGxlbmd0aCArPSAzKSA/IGxpdGVyYWwuc3RhcnRzV2l0aCgnXCInLCArK2xlbmd0aCkgPyAoICsrbGVuZ3RoLCAnXCJcIicgKSA6ICdcIicgOiAnJyApO1xuXHRcdFx0dGFibGVbZmluYWxLZXldID0gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KFsgJ1wiXCJcIicsIGxpdGVyYWwuc2xpY2UoMCwgbGVuZ3RoKSBdLCB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdHJldHVybiBsaXRlcmFsLnNsaWNlKGxlbmd0aCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHR9XG5cdG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZz09PW51bGwgJiYgc3RhcnQubm93cmFwKG9wdGlvbnMuQVJHU19NT0RFKTtcblx0cmVnZXhwcy5FU0NBUEVEX0VYQ0xVREVfQ09OVFJPTF9DSEFSQUNURVJfdGVzdChsaXRlcmFsICsgJ1xcbicpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0Zm9yICggY29uc3QgbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgID0gWyBsaXRlcmFsIF07IDsgKSB7XG5cdFx0Y29uc3QgbGluZSAgICAgICAgID0gc3RhcnQubXVzdCgpO1xuXHRcdGxldCBsZW5ndGggPSByZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgobGluZSk7XG5cdFx0aWYgKCBsaW5lLmxlbmd0aCE9PWxlbmd0aCApIHtcblx0XHRcdGNvbnN0ICQgPSBsaW5lLnNsaWNlKDAsIGxlbmd0aCk7XG5cdFx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KCQpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIG11bHRpLWxpbmUgYmFzaWMgc3RyaW5nYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gTXVsdGlsaW5lQmFzaWNTdHJpbmcobGluZXMuam9pbignXFxuJykgKyAnXFxuJyArICQsIG9wdGlvbnMudXNlV2hhdFRvSm9pbk11bHRpbGluZVN0cmluZyAsIHNraXBwZWQpICsgKCBsaW5lLnN0YXJ0c1dpdGgoJ1wiJywgbGVuZ3RoICs9IDMpID8gbGluZS5zdGFydHNXaXRoKCdcIicsICsrbGVuZ3RoKSA/ICggKytsZW5ndGgsICdcIlwiJyApIDogJ1wiJyA6ICcnICk7XG5cdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVMaXRlcmFsICkge1xuXHRcdFx0XHRza2lwcGVkID8gbGluZXMudW5zaGlmdCgnXCJcIlwiJykgOiBsaW5lc1swXSA9IGBcIlwiXCIke2xpdGVyYWx9YDtcblx0XHRcdFx0bGluZXNbbGluZXMubGVuZ3RoXSA9IGAkeyR9XCJcIlwiYDtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gTGl0ZXJhbE9iamVjdChsaW5lcywgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHZhbHVlOyB9XG5cdFx0XHRyZXR1cm4gbGluZS5zbGljZShsZW5ndGgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdH1cblx0XHRyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0KGxpbmUgKyAnXFxuJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBCYWQgbXVsdGktbGluZSBiYXNpYyBzdHJpbmdgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdGxpbmVzW2xpbmVzLmxlbmd0aF0gPSBsaW5lO1xuXHR9XG59ICkgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLlN5bWJvbCc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5jb25zdCBLRVlTID0gLyojX19QVVJFX18qL051bGwgICAgICAgIChudWxsKTtcbmV4cG9ydCBjb25zdCBjb21tZW50Rm9yID0gKGtleSAgICAgICAgKSAgICAgICAgID0+IEtFWVNba2V5XSB8fCAoIEtFWVNba2V5XSA9IFN5bWJvbChrZXkpICk7XG5leHBvcnQgY29uc3QgY29tbWVudEZvclRoaXMgICAgICAgICAgICAgICAgPSBTeW1ib2woJ3RoaXMnKSAgICAgICA7XG5cbmNvbnN0IHsgdGVzdDogaW5jbHVkZXNOZXdsaW5lIH0gPSB0aGVSZWdFeHAoL1xccj9cXG4vZyk7XG5leHBvcnQgY29uc3QgZ2V0Q09NTUVOVCA9ICh0YWJsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlDb21tZW50ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIGtleUNvbW1lbnQgaW4gdGFibGUgKSB7XG5cdFx0Y29uc3QgY29tbWVudCA9IHRhYmxlW2tleUNvbW1lbnRdO1xuXHRcdGlmICggdHlwZW9mIGNvbW1lbnQhPT0nc3RyaW5nJyApIHsgdGhyb3cgVHlwZUVycm9yKGB0aGUgdmFsdWUgb2YgY29tbWVudCBtdXN0IGJlIGEgc3RyaW5nLCB3aGlsZSBcIiR7Y29tbWVudD09PW51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29tbWVudH1cIiB0eXBlIGlzIGZvdW5kYCk7IH1cblx0XHRpZiAoIGluY2x1ZGVzTmV3bGluZShjb21tZW50KSApIHsgdGhyb3cgU3ludGF4RXJyb3IoYHRoZSB2YWx1ZSBvZiBjb21tZW50IG11c3QgYmUgYSBzdHJpbmcgYW5kIGNhbiBub3QgaW5jbHVkZSBuZXdsaW5lYCk7IH1cblx0XHRyZXR1cm4gYCAjJHtjb21tZW50fWA7Ly8vXG5cdH1cblx0cmV0dXJuICcnO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDb21tZW50ID0gICAgICAgICAgICAgICAgICAgICh0YWJsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGtleSAgICkgICAgICAgICAgICAgICAgICAgICA9PiBrZXkgaW4gS0VZUyA/IGdldENPTU1FTlQodGFibGUsIEtFWVNba2V5XSApIDogJyc7XG4iLCJpbXBvcnQgRXJyb3IgZnJvbSAnLkVycm9yJztcbmltcG9ydCBTeW50YXhFcnJvciBmcm9tICcuU3ludGF4RXJyb3InO1xuaW1wb3J0IHVuZGVmaW5lZCBmcm9tICcudW5kZWZpbmVkJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy8gZXh0ZXJuYWxcblxuaW1wb3J0ICogYXMgaXRlcmF0b3IgZnJvbSAnLi4vaXRlcmF0b3InO1xuaW1wb3J0IHsgTGl0ZXJhbE9iamVjdCB9IGZyb20gJy4uL3R5cGVzL2F0b20nO1xuaW1wb3J0IHsgSU5MSU5FLCBESVJFQ1RMWSB9IGZyb20gJy4uL3R5cGVzL1RhYmxlJztcbmltcG9ydCB7IG5ld0FycmF5LCBTVEFUSUNBTExZIH0gZnJvbSAnLi4vdHlwZXMvQXJyYXknO1xuaW1wb3J0IHsgT2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLCBPRkZTRVQkIH0gZnJvbSAnLi4vdHlwZXMvRGF0ZXRpbWUnO1xuaW1wb3J0IHsgQmFzaWNTdHJpbmcgfSBmcm9tICcuLi90eXBlcy9TdHJpbmcnO1xuaW1wb3J0IHsgSW50ZWdlciB9IGZyb20gJy4uL3R5cGVzL0ludGVnZXInO1xuaW1wb3J0IHsgRmxvYXQgfSBmcm9tICcuLi90eXBlcy9GbG9hdCc7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcbmltcG9ydCB7IGFwcGVuZFRhYmxlLCBwcmVwYXJlVGFibGUsIHByZXBhcmVJbmxpbmVUYWJsZSwgYXNzaWduTGl0ZXJhbFN0cmluZywgYXNzaWduQmFzaWNTdHJpbmcgfSBmcm9tICcuL29uLXRoZS1zcG90JztcblxuaW1wb3J0IHsgY29tbWVudEZvciwgY29tbWVudEZvclRoaXMgfSBmcm9tICcuLi90eXBlcy9jb21tZW50JztcbmltcG9ydCB7IGJlSW5saW5lIH0gZnJvbSAnLi4vdHlwZXMvbm9uLWF0b20nO1xuXG5jb25zdCB7IHRlc3Q6IElTX09GRlNFVCQgfSA9IHRoZVJlZ0V4cChPRkZTRVQkKTtcbmNvbnN0IHsgdGVzdDogSVNfRU1QVFkgfSA9IHRoZVJlZ0V4cCgvXlxcW1tcXHQgXSpdLyk7XG5cbmNvbnN0IHBhcnNlS2V5cyA9IChyZXN0ICAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGxpbmVSZXN0ICAgICAgICAgPSByZXN0O1xuXHRjb25zdCBsZWFkaW5nS2V5cyAgICAgICAgICAgPSBbXTtcblx0bGV0IGxhc3RJbmRleCAgICAgICAgID0gLTE7XG5cdGZvciAoIDsgOyApIHtcblx0XHRsaW5lUmVzdCB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEVtcHR5IGJhcmUga2V5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J1wiJyApIHtcblx0XHRcdGNvbnN0IGluZGV4ICAgICAgICAgPSByZWdleHBzLkJBU0lDX1NUUklOR19leGVjXzFfZW5kSW5kZXgobGluZVJlc3QpO1xuXHRcdFx0b3B0aW9ucy5LRVlTLnRlc3QobGVhZGluZ0tleXNbKytsYXN0SW5kZXhdID0gQmFzaWNTdHJpbmcobGluZVJlc3Quc2xpY2UoMSwgaW5kZXgpKSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBLZXkgbm90IGFsbG93ZWRgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShpbmRleCArIDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnN0IGlzUXVvdGVkID0gbGluZVJlc3RbMF09PT0nXFwnJztcblx0XHRcdGNvbnN0IGtleSAgICAgICAgID0gKCAoIGlzUXVvdGVkID8gcmVnZXhwcy5fX0xJVEVSQUxfS0VZX2V4ZWMgOiByZWdleHBzLl9fQkFSRV9LRVlfZXhlYyApKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCAke2lzUXVvdGVkID8gJ2xpdGVyYWwgc3RyaW5nJyA6ICdiYXJlJ30ga2V5YCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKSApWzBdO1xuXHRcdFx0bGluZVJlc3QgPSBsaW5lUmVzdC5zbGljZShrZXkubGVuZ3RoKTtcblx0XHRcdG9wdGlvbnMuS0VZUy50ZXN0KGxlYWRpbmdLZXlzWysrbGFzdEluZGV4XSA9IGlzUXVvdGVkID8ga2V5LnNsaWNlKDEsIC0xKSA6IGtleSkgfHwgaXRlcmF0b3IudGhyb3dzKEVycm9yKGBLZXkgbm90IGFsbG93ZWRgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdH1cblx0XHRpZiAoIHJlZ2V4cHMuSVNfRE9UX0tFWShsaW5lUmVzdCkgKSB7IGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLkRPVF9LRVksICcnKTsgfVxuXHRcdGVsc2UgeyBicmVhazsgfVxuXHR9XG5cdGlmICggb3B0aW9ucy5kaXNhYmxlRGlnaXQgKSB7XG5cdFx0Y29uc3Qga2V5cyA9IHJlc3Quc2xpY2UoMCwgLWxpbmVSZXN0Lmxlbmd0aCk7XG5cdFx0KCByZWdleHBzLmlzQW1hemluZyhrZXlzKSB8fCBvcHRpb25zLmVuYWJsZU51bGwgJiYga2V5cz09PSdudWxsJyApICYmIGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGJhcmUga2V5IGRpc2FibGVkIGJ5IHhPcHRpb25zLnN0cmluZ2AgKyBpdGVyYXRvci53aGVyZSgnIGF0ICcpKSk7XG5cdH1cblx0aWYgKCBvcHRpb25zLmRpc2FsbG93RW1wdHlLZXkgKSB7XG5cdFx0bGV0IGluZGV4ICAgICAgICAgPSBsYXN0SW5kZXg7XG5cdFx0ZG8geyBsZWFkaW5nS2V5c1tpbmRleF0gIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgRW1wdHkga2V5IGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTsgfVxuXHRcdHdoaWxlICggaW5kZXgtLSApO1xuXHR9XG5cdGNvbnN0IGZpbmFsS2V5ICAgICAgICAgPSBsZWFkaW5nS2V5c1tsYXN0SW5kZXhdIDtcblx0bGVhZGluZ0tleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuXHRyZXR1cm4geyBsZWFkaW5nS2V5cywgZmluYWxLZXksIGxpbmVSZXN0IH07XG59O1xuXG5jb25zdCBwdXNoID0gKGxhc3RBcnJheSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0aWYgKCBsaW5lUmVzdFswXT09PSc8JyApIHtcblx0XHRjb25zdCB7IDE6IHRhZyB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5fVkFMVUVfUEFJUl9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCB0YWcgYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRvcHRpb25zLmNvbGxlY3QodGFnLCBsYXN0QXJyYXksIG51bGwpO1xuXHRcdHN3aXRjaCAoIGxpbmVSZXN0ICYmIGxpbmVSZXN0WzBdICkge1xuXHRcdFx0Y2FzZSAnLCc6XG5cdFx0XHRjYXNlICddJzpcblx0XHRcdGNhc2UgJyc6XG5cdFx0XHRjYXNlICcjJzpcblx0XHRcdFx0bGFzdEFycmF5W2xhc3RBcnJheS5sZW5ndGhdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRyZXR1cm4gbGluZVJlc3Q7XG5cdFx0fVxuXHR9XG5cdHN3aXRjaCAoIGxpbmVSZXN0WzBdICkge1xuXHRcdGNhc2UgJ1xcJyc6XG5cdFx0XHRyZXR1cm4gYXNzaWduTGl0ZXJhbFN0cmluZyhvcHRpb25zLmFzU3RyaW5ncyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKG9wdGlvbnMuYXNTdHJpbmdzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0XHRjYXNlICd7Jzpcblx0XHRcdG9wdGlvbnMuaW5saW5lVGFibGUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNGAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdFx0cmV0dXJuIGVxdWFsSW5saW5lVGFibGUob3B0aW9ucy5hc1RhYmxlcyhsYXN0QXJyYXkpLCBsYXN0QXJyYXkubGVuZ3RoLCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnWyc6XG5cdFx0XHRyZXR1cm4gZXF1YWxTdGF0aWNBcnJheShvcHRpb25zLmFzQXJyYXlzKGxhc3RBcnJheSksIGxhc3RBcnJheS5sZW5ndGgsIGxpbmVSZXN0KTtcblx0fVxuXHRjb25zdCB7IDE6IGxpdGVyYWwgfSA9IHsgMjogbGluZVJlc3QgfSA9IHJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjKGxpbmVSZXN0KSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYEJhZCBhdG9tIHZhbHVlYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCBsaXRlcmFsPT09J3RydWUnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyBvcHRpb25zLmFzQm9vbGVhbnMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IGZhbHNlOyB9XG5cdGVsc2UgaWYgKCBvcHRpb25zLmVuYWJsZU51bGwgJiYgbGl0ZXJhbD09PSdudWxsJyApIHsgb3B0aW9ucy5hc051bGxzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBudWxsOyB9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluY2x1ZGVzKCc6JykgKSB7XG5cdFx0aWYgKCBsaXRlcmFsLmluY2x1ZGVzKCctJykgKSB7XG5cdFx0XHRpZiAoIElTX09GRlNFVCQobGl0ZXJhbCkgKSB7XG5cdFx0XHRcdG9wdGlvbnMuYXNPZmZzZXREYXRlVGltZXMobGFzdEFycmF5KVtsYXN0QXJyYXkubGVuZ3RoXSA9IG5ldyBPZmZzZXREYXRlVGltZShsaXRlcmFsKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUtVGltZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRcdG9wdGlvbnMuYXNMb2NhbERhdGVUaW1lcyhsYXN0QXJyYXkpW2xhc3RBcnJheS5sZW5ndGhdID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdG9wdGlvbnMuYXNMb2NhbFRpbWVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxUaW1lKGxpdGVyYWwpO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmICggbGl0ZXJhbC5pbmRleE9mKCctJykhPT1saXRlcmFsLmxhc3RJbmRleE9mKCctJykgJiYgbGl0ZXJhbFswXSE9PSctJyApIHtcblx0XHRvcHRpb25zLm1vcmVEYXRldGltZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYExvY2FsIERhdGUgaXMgbm90IGFsbG93ZWQgYmVmb3JlIFRPTUwgdjAuNWAgKyBpdGVyYXRvci53aGVyZSgnLCB3aGljaCBhdCAnKSkpO1xuXHRcdG9wdGlvbnMuYXNMb2NhbERhdGVzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBuZXcgTG9jYWxEYXRlKGxpdGVyYWwpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpdGVyYWwuaW5jbHVkZXMoJy4nKSB8fCBsaXRlcmFsLmluY2x1ZGVzKCduJykgfHwgKCBsaXRlcmFsLmluY2x1ZGVzKCdlJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnRScpICkgJiYgIWxpdGVyYWwuc3RhcnRzV2l0aCgnMHgnKVxuXHRcdFx0PyBvcHRpb25zLmFzRmxvYXRzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgRmxvYXQobGl0ZXJhbCkpIDogRmxvYXQobGl0ZXJhbClcblx0XHRcdDogb3B0aW9ucy5hc0ludGVnZXJzKGxhc3RBcnJheSlbbGFzdEFycmF5Lmxlbmd0aF0gPSBvcHRpb25zLnByZXNlcnZlTGl0ZXJhbCA/IExpdGVyYWxPYmplY3QobGl0ZXJhbCwgSW50ZWdlcihsaXRlcmFsKSkgOiBJbnRlZ2VyKGxpdGVyYWwpXG5cdFx0O1xuXHR9XG5cdHJldHVybiBsaW5lUmVzdDtcbn07XG5cbmNvbnN0IGVxdWFsU3RhdGljQXJyYXkgPSBmdW5jdGlvbiAqICggICAgICAgICAgICB0YWJsZSAgICAgICAsIGZpbmFsS2V5ICAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgIHtcblx0Y29uc3Qgc3RhdGljQXJyYXkgICAgICAgID0gdGFibGVbZmluYWxLZXldID0gbmV3QXJyYXkoU1RBVElDQUxMWSk7XG5cdGlmICggSVNfRU1QVFkobGluZVJlc3QpICkge1xuXHRcdGJlSW5saW5lKHN0YXRpY0FycmF5LCBsaW5lUmVzdFsxXT09PSddJyA/IDAgOiAzKTtcblx0XHRyZXR1cm4gbGluZVJlc3Quc2xpY2UobGluZVJlc3QuaW5kZXhPZignXScpKS5yZXBsYWNlKHJlZ2V4cHMuU1lNX1dISVRFU1BBQ0UsICcnKTtcblx0fVxuXHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdTdGF0aWMgQXJyYXknLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRsZXQgaW5saW5lICAgICAgICAgICAgICAgPSBsaW5lUmVzdC5zdGFydHNXaXRoKCdbICcpIHx8IGxpbmVSZXN0LnN0YXJ0c1dpdGgoJ1tcXHQnKSA/IDMgOiAwO1xuXHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHR3aGlsZSAoICFsaW5lUmVzdCB8fCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHR9XG5cdGlmICggbGluZVJlc3RbMF09PT0nXScgKSB7XG5cdFx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0XHRyZXR1cm4gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdH1cblx0Zm9yICggOyA7ICkge1xuXHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBwdXNoKHN0YXRpY0FycmF5LCBsaW5lUmVzdCk7XG5cdFx0bGluZVJlc3QgPSB0eXBlb2YgcmVzdD09PSdzdHJpbmcnID8gcmVzdCA6IHlpZWxkIHJlc3Q7XG5cdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRpbmxpbmUgPSBudWxsO1xuXHRcdFx0bGluZVJlc3QgPSBzdGFydC5tdXN0KCkucmVwbGFjZShyZWdleHBzLlBSRV9XSElURVNQQUNFLCAnJyk7XG5cdFx0fVxuXHRcdGlmICggbGluZVJlc3RbMF09PT0nLCcgKSB7XG5cdFx0XHRsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IG51bGw7XG5cdFx0XHRcdGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PSddJyApIHsgYnJlYWs7IH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J10nICkgeyBicmVhazsgfVxuXHRcdFx0dGhyb3cgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBVbmV4cGVjdCBjaGFyYWN0ZXIgaW4gc3RhdGljIGFycmF5IGl0ZW0gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggaXMgZm91bmQgYXQgJykpKTtcblx0XHR9XG5cdH1cblx0aW5saW5lPT09bnVsbCB8fCBiZUlubGluZShzdGF0aWNBcnJheSwgaW5saW5lKTtcblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG5jb25zdCBlcXVhbElubGluZVRhYmxlID0gZnVuY3Rpb24gKiAoICAgICAgICAgICAgdGFibGUgICAgICAgLCBmaW5hbEtleSAgICAgICAgLCBsaW5lUmVzdCAgICAgICAgKSAgICB7XG5cdGNvbnN0IGlubGluZVRhYmxlICAgICAgICA9IHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBvcHRpb25zLlRhYmxlKERJUkVDVExZLCBJTkxJTkUpO1xuXHRpZiAoIG9wdGlvbnMuYWxsb3dJbmxpbmVUYWJsZU11bHRpbGluZUFuZFRyYWlsaW5nQ29tbWFFdmVuTm9Db21tYSApIHtcblx0XHRjb25zdCBzdGFydCA9IG5ldyBpdGVyYXRvci5tYXJrKCdJbmxpbmUgVGFibGUnLCBsaW5lUmVzdC5sZW5ndGgpO1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJyk7XG5cdFx0bGV0IGlubGluZSA9IHRydWU7XG5cdFx0Zm9yICggOyA7ICkge1xuXHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5lUmVzdCA9IHN0YXJ0Lm11c3QoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRcdH1cblx0XHRcdGlmICggbGluZVJlc3RbMF09PT0nfScgKSB7IGJyZWFrOyB9XG5cdFx0XHRjb25zdCBmb3JDb21tZW50ICAgICAgICAgICAgID0gRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpO1xuXHRcdFx0Y29uc3QgcmVzdCAgICAgICAgICAgICA9IGFzc2lnbihmb3JDb21tZW50KTtcblx0XHRcdGxpbmVSZXN0ID0gdHlwZW9mIHJlc3Q9PT0nc3RyaW5nJyA/IHJlc3QgOiB5aWVsZCByZXN0O1xuXHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdFswXT09PScjJyApIHtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbnMucHJlc2VydmVDb21tZW50ICkgeyBmb3JDb21tZW50LnRhYmxlW2NvbW1lbnRGb3IoZm9yQ29tbWVudC5maW5hbEtleSldID0gbGluZVJlc3Quc2xpY2UoMSk7IH1cblx0XHRcdFx0XHRpbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdFx0d2hpbGUgKCAhbGluZVJlc3QgfHwgbGluZVJlc3RbMF09PT0nIycgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRkbyB7IGxpbmVSZXN0ID0gc3RhcnQubXVzdCgpLnJlcGxhY2UocmVnZXhwcy5QUkVfV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0XHRcdHdoaWxlICggIWxpbmVSZXN0IHx8IGxpbmVSZXN0WzBdPT09JyMnICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkgeyBsaW5lUmVzdCA9IGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpOyB9XG5cdFx0fVxuXHRcdGlubGluZSB8fCBiZUlubGluZShpbmxpbmVUYWJsZSwgZmFsc2UpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0aWYgKCBsaW5lUmVzdFswXSE9PSd9JyApIHtcblx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0bGluZVJlc3RbMF09PT0nIycgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdGNvbnN0IHJlc3QgICAgICAgICAgICAgPSBhc3NpZ24oRm9yQ29tbWVudChpbmxpbmVUYWJsZSwgbGluZVJlc3QpKTtcblx0XHRcdFx0bGluZVJlc3QgPSAoIHR5cGVvZiByZXN0PT09J3N0cmluZycgPyByZXN0IDogeWllbGQgcmVzdCApIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgSW5saW5lIFRhYmxlIGlzIGludGVuZGVkIHRvIGFwcGVhciBvbiBhIHNpbmdsZSBsaW5lYCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGJyb2tlbiBhdCAnKSkpO1xuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09J30nICkgeyBicmVhazsgfVxuXHRcdFx0XHRpZiAoIGxpbmVSZXN0WzBdPT09JywnICkge1xuXHRcdFx0XHRcdGxpbmVSZXN0ID0gbGluZVJlc3QucmVwbGFjZShyZWdleHBzLlNZTV9XSElURVNQQUNFLCAnJykgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBJbmxpbmUgVGFibGUgaXMgaW50ZW5kZWQgdG8gYXBwZWFyIG9uIGEgc2luZ2xlIGxpbmVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYnJva2VuIGF0ICcpKSk7XG5cdFx0XHRcdFx0bGluZVJlc3RbMF09PT0nfScgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBUaGUgbGFzdCBwcm9wZXJ0eSBvZiBhbiBJbmxpbmUgVGFibGUgY2FuIG5vdCBoYXZlIGEgdHJhaWxpbmcgY29tbWFgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0LnJlcGxhY2UocmVnZXhwcy5TWU1fV0hJVEVTUEFDRSwgJycpO1xufSAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5jb25zdCBGb3JDb21tZW50ID0gKGxhc3RJbmxpbmVUYWJsZSAgICAgICAsIGxpbmVSZXN0ICAgICAgICApICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgeyBsZWFkaW5nS2V5cywgZmluYWxLZXksIHRhZyB9ID0geyBsaW5lUmVzdCB9ID0gcmVnZXhwcy5LRVlfVkFMVUVfUEFJUl9leGVjX2dyb3VwcyhwYXJzZUtleXMobGluZVJlc3QpKTtcblx0cmV0dXJuIHsgdGFibGU6IHByZXBhcmVJbmxpbmVUYWJsZShsYXN0SW5saW5lVGFibGUsIGxlYWRpbmdLZXlzKSwgZmluYWxLZXksIHRhZywgbGluZVJlc3QgfTtcbn07XG5jb25zdCBhc3NpZ24gPSAoeyBmaW5hbEtleSwgdGFnLCBsaW5lUmVzdCwgdGFibGUgfSAgICAgICAgICAgICkgICAgICAgICAgICAgPT4ge1xuXHRmaW5hbEtleSBpbiB0YWJsZSAmJiBpdGVyYXRvci50aHJvd3MoRXJyb3IoYER1cGxpY2F0ZSBwcm9wZXJ0eSBkZWZpbml0aW9uYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0aWYgKCB0YWcgKSB7XG5cdFx0b3B0aW9ucy5jb2xsZWN0KHRhZywgbnVsbCwgdGFibGUsIGZpbmFsS2V5KTtcblx0XHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRcdGNhc2UgJywnOlxuXHRcdFx0Y2FzZSAnfSc6XG5cdFx0XHRjYXNlICcnOlxuXHRcdFx0Y2FzZSAnIyc6XG5cdFx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIGxpbmVSZXN0O1xuXHRcdH1cblx0fVxuXHRzd2l0Y2ggKCBsaW5lUmVzdCAmJiBsaW5lUmVzdFswXSApIHtcblx0XHRjYXNlICdcXCcnOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkxpdGVyYWxTdHJpbmcodGFibGUsIGZpbmFsS2V5LCBsaW5lUmVzdCk7XG5cdFx0Y2FzZSAnXCInOlxuXHRcdFx0cmV0dXJuIGFzc2lnbkJhc2ljU3RyaW5nKHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHRcdGNhc2UgJ3snOlxuXHRcdFx0b3B0aW9ucy5pbmxpbmVUYWJsZSB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYElubGluZSBUYWJsZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC40YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0XHRyZXR1cm4gZXF1YWxJbmxpbmVUYWJsZSh0YWJsZSwgZmluYWxLZXksIGxpbmVSZXN0KTtcblx0XHRjYXNlICdbJzpcblx0XHRcdHJldHVybiBlcXVhbFN0YXRpY0FycmF5KHRhYmxlLCBmaW5hbEtleSwgbGluZVJlc3QpO1xuXHR9XG5cdGNvbnN0IHsgMTogbGl0ZXJhbCB9ID0geyAyOiBsaW5lUmVzdCB9ID0gcmVnZXhwcy5WQUxVRV9SRVNUX2V4ZWMobGluZVJlc3QpIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgQmFkIGF0b20gdmFsdWVgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRpZiAoIGxpdGVyYWw9PT0ndHJ1ZScgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IHRydWU7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWw9PT0nZmFsc2UnICkgeyB0YWJsZVtmaW5hbEtleV0gPSBmYWxzZTsgfVxuXHRlbHNlIGlmICggb3B0aW9ucy5lbmFibGVOdWxsICYmIGxpdGVyYWw9PT0nbnVsbCcgKSB7IHRhYmxlW2ZpbmFsS2V5XSA9IG51bGw7IH1cblx0ZWxzZSBpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJzonKSApIHtcblx0XHRpZiAoIGxpdGVyYWwuaW5jbHVkZXMoJy0nKSApIHtcblx0XHRcdGlmICggSVNfT0ZGU0VUJChsaXRlcmFsKSApIHtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IE9mZnNldERhdGVUaW1lKGxpdGVyYWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZS1UaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZVRpbWUobGl0ZXJhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0b3B0aW9ucy5tb3JlRGF0ZXRpbWUgfHwgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBMb2NhbCBUaW1lIGlzIG5vdCBhbGxvd2VkIGJlZm9yZSBUT01MIHYwLjVgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggYXQgJykpKTtcblx0XHRcdHRhYmxlW2ZpbmFsS2V5XSA9IG5ldyBMb2NhbFRpbWUobGl0ZXJhbCk7XG5cdFx0fVxuXHR9XG5cdGVsc2UgaWYgKCBsaXRlcmFsLmluZGV4T2YoJy0nKSE9PWxpdGVyYWwubGFzdEluZGV4T2YoJy0nKSAmJiBsaXRlcmFsWzBdIT09Jy0nICkge1xuXHRcdG9wdGlvbnMubW9yZURhdGV0aW1lIHx8IGl0ZXJhdG9yLnRocm93cyhTeW50YXhFcnJvcihgTG9jYWwgRGF0ZSBpcyBub3QgYWxsb3dlZCBiZWZvcmUgVE9NTCB2MC41YCArIGl0ZXJhdG9yLndoZXJlKCcsIHdoaWNoIGF0ICcpKSk7XG5cdFx0dGFibGVbZmluYWxLZXldID0gbmV3IExvY2FsRGF0ZShsaXRlcmFsKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0YWJsZVtmaW5hbEtleV0gPSBsaXRlcmFsLmluY2x1ZGVzKCcuJykgfHwgbGl0ZXJhbC5pbmNsdWRlcygnbicpIHx8ICggbGl0ZXJhbC5pbmNsdWRlcygnZScpIHx8IGxpdGVyYWwuaW5jbHVkZXMoJ0UnKSApICYmICFsaXRlcmFsLnN0YXJ0c1dpdGgoJzB4Jylcblx0XHRcdD8gb3B0aW9ucy5wcmVzZXJ2ZUxpdGVyYWwgPyBMaXRlcmFsT2JqZWN0KGxpdGVyYWwsIEZsb2F0KGxpdGVyYWwpKSA6IEZsb2F0KGxpdGVyYWwpXG5cdFx0XHQ6IG9wdGlvbnMucHJlc2VydmVMaXRlcmFsID8gTGl0ZXJhbE9iamVjdChsaXRlcmFsLCBJbnRlZ2VyKGxpdGVyYWwpKSA6IEludGVnZXIobGl0ZXJhbClcblx0XHQ7XG5cdH1cblx0cmV0dXJuIGxpbmVSZXN0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgICAgICAgID0+IHtcblx0Y29uc3Qgcm9vdFRhYmxlICAgICAgICA9IG5ldyBvcHRpb25zLlRhYmxlO1xuXHRsZXQgbGFzdFNlY3Rpb25UYWJsZSAgICAgICAgPSByb290VGFibGU7XG5cdHdoaWxlICggaXRlcmF0b3IucmVzdCgpICkge1xuXHRcdGNvbnN0IGxpbmUgICAgICAgICA9IGl0ZXJhdG9yLm5leHQoKS5yZXBsYWNlKHJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UsICcnKTtcblx0XHRpZiAoIGxpbmUgKSB7XG5cdFx0XHRpZiAoIGxpbmVbMF09PT0nWycgKSB7XG5cdFx0XHRcdGNvbnN0IHsgbGVhZGluZ0tleXMsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnLCBsaW5lUmVzdCB9ID0gcmVnZXhwcy5UQUJMRV9ERUZJTklUSU9OX2V4ZWNfZ3JvdXBzKGxpbmUsIHBhcnNlS2V5cyk7XG5cdFx0XHRcdGNvbnN0IHRhYmxlICAgICAgICA9IHByZXBhcmVUYWJsZShyb290VGFibGUsIGxlYWRpbmdLZXlzKTtcblx0XHRcdFx0aWYgKCBsaW5lUmVzdCApIHtcblx0XHRcdFx0XHRsaW5lUmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIgdGFibGUgaGVhZGVyYCArIGl0ZXJhdG9yLndoZXJlKCcgYXQgJykpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0U2VjdGlvblRhYmxlID0gYXBwZW5kVGFibGUodGFibGUsIGZpbmFsS2V5LCBhc0FycmF5SXRlbSwgdGFnKTtcblx0XHRcdFx0b3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgJiYgbGluZVJlc3QgJiYgKCBsYXN0U2VjdGlvblRhYmxlW2NvbW1lbnRGb3JUaGlzXSA9IGFzQXJyYXlJdGVtID8gbGluZVJlc3Quc2xpY2UoMSkgOiB0YWJsZVtjb21tZW50Rm9yKGZpbmFsS2V5KV0gPSBsaW5lUmVzdC5zbGljZSgxKSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGxpbmVbMF09PT0nIycgKSB7XG5cdFx0XHRcdHJlZ2V4cHMuX19DT05UUk9MX0NIQVJBQ1RFUl9FWENMVURFX3Rlc3QobGluZSkgJiYgaXRlcmF0b3IudGhyb3dzKFN5bnRheEVycm9yKGBDb250cm9sIGNoYXJhY3RlcnMgb3RoZXIgdGhhbiBUYWIgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gY29tbWVudHNgICsgaXRlcmF0b3Iud2hlcmUoJywgd2hpY2ggd2FzIGZvdW5kIGF0ICcpKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29uc3QgZm9yQ29tbWVudCAgICAgICAgICAgICA9IEZvckNvbW1lbnQobGFzdFNlY3Rpb25UYWJsZSwgbGluZSk7XG5cdFx0XHRcdGxldCByZXN0ICAgICAgICAgICAgID0gYXNzaWduKGZvckNvbW1lbnQpO1xuXHRcdFx0XHR0eXBlb2YgcmVzdD09PSdzdHJpbmcnIHx8ICggcmVzdCA9IHggICAgICAgIChyZXN0KSApO1xuXHRcdFx0XHRpZiAoIHJlc3QgKSB7XG5cdFx0XHRcdFx0cmVzdFswXT09PScjJyB8fCBpdGVyYXRvci50aHJvd3MoU3ludGF4RXJyb3IoYFVuZXhwZWN0IGNoYXJhY2h0b3IgYWZ0ZXIga2V5L3ZhbHVlIHBhaXJgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdFx0XHRcdGlmICggb3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQgKSB7IGZvckNvbW1lbnQudGFibGVbY29tbWVudEZvcihmb3JDb21tZW50LmZpbmFsS2V5KV0gPSByZXN0LnNsaWNlKDEpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEFycmF5IGZyb20gJy5BcnJheSc7XG5pbXBvcnQgZnJvbUNoYXJDb2RlIGZyb20gJy5TdHJpbmcuZnJvbUNoYXJDb2RlJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICcuT2JqZWN0LmZyb21FbnRyaWVzJztcbmltcG9ydCBOdWxsIGZyb20gJy5udWxsJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IEVTQ0FQRUQgPSAvKiNfX1BVUkVfXyovTnVsbCAgICAgICAgKHtcblx0Li4uLyojX19QVVJFX18qL2Zyb21FbnRyaWVzKC8qI19fUFVSRV9fKi9bIC4uLkFycmF5KDB4MjApIF0ubWFwKChfLCBjaGFyQ29kZSkgPT4gWyBmcm9tQ2hhckNvZGUoY2hhckNvZGUpLCAnXFxcXHUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoNCwgJzAnKSBdKSksXG5cdCdcXGInOiAnXFxcXGInLFxuXHQnXFx0JzogJ1xcXFx0Jyxcblx0J1xcbic6ICdcXFxcbicsXG5cdCdcXGYnOiAnXFxcXGYnLFxuXHQnXFxyJzogJ1xcXFxyJyxcblx0J1wiJzogJ1xcXFxcIicsXG5cdCdcIlwiXCInOiAnXCJcIlxcXFxcIicsXG5cdCdcXFxcJzogJ1xcXFxcXFxcJyxcblx0J1xceDdGJzogJ1xcXFx1MDA3RicsXG59KTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX0JBU0lDIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGJ1xceDdGXS8pO1xuY29uc3QgQllfRVNDQVBFID0gL1teXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlwiXFxcXFxceDdGXSt8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9FU0NBUEUgfSA9IHRoZVJlZ0V4cCgvXltcXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdLyk7XG5leHBvcnQgY29uc3Qgc2luZ2xlbGluZVN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIE5FRURfQkFTSUModmFsdWUpICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYCcke3ZhbHVlfSdgO1xufTtcbmV4cG9ydCBjb25zdCBzaW5nbGVsaW5lQmFzaWNTdHJpbmcgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgPT4ge1xuXHRpZiAoIHZhbHVlICkge1xuXHRcdGNvbnN0IHBhcnRzID0gdmFsdWUubWF0Y2goQllfRVNDQVBFKSA7XG5cdFx0bGV0IGluZGV4ID0gcGFydHMubGVuZ3RoO1xuXHRcdGRvIHsgaWYgKCBORUVEX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdHJldHVybiBgXCIke3BhcnRzLmpvaW4oJycpfVwiYDtcblx0fVxuXHRyZXR1cm4gYFwiXCJgO1xufTtcblxuY29uc3QgeyB0ZXN0OiBORUVEX01VTFRJTElORV9CQVNJQyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxceDdGXXwnJycvKTtcbmV4cG9ydCBjb25zdCB7IHRlc3Q6IG11bHRpbGluZU5lZWRCYXNpYyB9ID0gdGhlUmVnRXhwKC9bXFx4MDAtXFx4MDhcXHgwQi1cXHgxRlxceDdGXXwnJycvKTtcbmNvbnN0IHsgdGVzdDogUkVBTF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL1tcXHgwMC1cXHgwOFxceDBBLVxceDFGXFxcXFxceDdGXXxcIlwiXCIvKTtcbmNvbnN0IEJZX01VTFRJTElORV9FU0NBUEUgPSAvW15cXHgwMC1cXHgwOFxceDBBLVxceDFGXCJcXFxcXFx4N0ZdK3xcIlwiXCJ8Li9ncztcbmNvbnN0IHsgdGVzdDogTkVFRF9NVUxUSUxJTkVfRVNDQVBFIH0gPSB0aGVSZWdFeHAoL14oPzpbXFx4MDAtXFx4MDhcXHgwQS1cXHgxRlxcXFxcXHg3Rl18XCJcIlwiKS8pO1xuY29uc3QgZXNjYXBlX211bHRpbGluZSA9IChsaW5lcyAgICAgICAgICAsIGxpbmVJbmRleCAgICAgICAgKSA9PiB7XG5cdGNvbnN0IGxpbmUgPSBsaW5lc1tsaW5lSW5kZXhdIDtcblx0aWYgKCBSRUFMX01VTFRJTElORV9FU0NBUEUobGluZSkgKSB7XG5cdFx0Y29uc3QgcGFydHMgPSBsaW5lLm1hdGNoKEJZX01VTFRJTElORV9FU0NBUEUpIDtcblx0XHRsZXQgaW5kZXggPSBwYXJ0cy5sZW5ndGg7XG5cdFx0ZG8geyBpZiAoIE5FRURfTVVMVElMSU5FX0VTQ0FQRShwYXJ0c1stLWluZGV4XSApICkgeyBwYXJ0c1tpbmRleF0gPSBFU0NBUEVEW3BhcnRzW2luZGV4XSBdIDsgfSB9XG5cdFx0d2hpbGUgKCBpbmRleCApO1xuXHRcdGxpbmVzW2xpbmVJbmRleF0gPSBwYXJ0cy5qb2luKCcnKTtcblx0fVxufTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNvbnN0IExpbmVzID0gKGxpbmVzICAgICAgICAgICAgICAgICAgICkgICAgICAgID0+ICggbGluZXMgPSBbICcnLCAuLi5saW5lcyBdICAgICAgICAgICkubGVuZ3RoPT09MSA/IFsgJycsICcnIF0gOiBsaW5lcyAgICAgICAgIDtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZVN0cmluZyA9IChsaW5lcyAgICAgICApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0Y29uc3QgbGFzdEluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0bGV0IGluZGV4ID0gbGFzdEluZGV4O1xuXHRkbyB7IGlmICggTkVFRF9NVUxUSUxJTkVfQkFTSUMobGluZXNbaW5kZXhdICkgKSB7IGJyZWFrOyB9IH1cblx0d2hpbGUgKCAtLWluZGV4ICk7XG5cdGlmICggaW5kZXggKSB7XG5cdFx0aW5kZXggPSBsYXN0SW5kZXg7XG5cdFx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRcdGxpbmVzW2luZGV4XSArPSBsaW5lc1swXSA9ICdcIlwiXCInO1xuXHRcdHdoaWxlICggLS1pbmRleCApIHsgZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpOyB9XG5cdH1cblx0ZWxzZXsgbGluZXNbbGFzdEluZGV4XSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnOyB9XG5cdHJldHVybiBsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUJhc2ljU3RyaW5nID0gKGxpbmVzICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0+IHtcblx0bGV0IGluZGV4ID0gbGluZXMubGVuZ3RoIC0gMTtcblx0ZXNjYXBlX211bHRpbGluZShsaW5lcywgaW5kZXgpO1xuXHRsaW5lc1tpbmRleF0gKz0gbGluZXNbMF0gPSAnXCJcIlwiJztcblx0d2hpbGUgKCAtLWluZGV4ICkgeyBlc2NhcGVfbXVsdGlsaW5lKGxpbmVzLCBpbmRleCk7IH1cblx0cmV0dXJuIGxpbmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xufTtcblxuZXhwb3J0IGNvbnN0IG11bHRpbGluZUxpdGVyYWxTdHJpbmcgPSAobGluZXMgICAgICAgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPT4ge1xuXHRsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSArPSBsaW5lc1swXSA9ICdcXCdcXCdcXCcnO1xuXHRyZXR1cm4gbGluZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG59O1xuIiwiaW1wb3J0IEZsb2F0NjRBcnJheSBmcm9tICcuRmxvYXQ2NEFycmF5JztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy5VaW50OEFycmF5JztcbmltcG9ydCBJbmZpbml0eSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IE5hTiBmcm9tICcuTmFOJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcblxuaW1wb3J0IHsgdGhlUmVnRXhwIH0gZnJvbSAnQGx0ZC9qLXJlZ2V4cCc7XG5cbmNvbnN0IF9JbmZpbml0eSA9IC1JbmZpbml0eTtcblxuY29uc3QgeyB0ZXN0OiBJTlRFR0VSX0xJS0UgfSA9IHRoZVJlZ0V4cCgvXi0/XFxkKyQvKTtcbmNvbnN0IGVuc3VyZUZsb2F0ID0gKGxpdGVyYWwgICAgICAgICkgPT4gSU5URUdFUl9MSUtFKGxpdGVyYWwpID8gbGl0ZXJhbCArICcuMCcgOiBsaXRlcmFsO1xuXG5jb25zdCBmbG9hdDY0QXJyYXkgPSBuZXcgRmxvYXQ2NEFycmF5KFsgTmFOIF0pO1xuY29uc3QgdWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGZsb2F0NjRBcnJheS5idWZmZXIpO1xuY29uc3QgTmFOXzcgPSB1aW50OEFycmF5WzddIDtcblxuZXhwb3J0IGNvbnN0IGZsb2F0ID0gTmFOXzc9PT1uZXcgVWludDhBcnJheShuZXcgRmxvYXQ2NEFycmF5KFsgLU5hTiBdKS5idWZmZXIpWzddIFxuXHQ/ICh2YWx1ZSAgICAgICAgKSA9PiB2YWx1ZVxuXHRcdD8gdmFsdWU9PT1JbmZpbml0eSA/ICdpbmYnIDogdmFsdWU9PT1fSW5maW5pdHkgPyAnLWluZicgOiBlbnN1cmVGbG9hdCgnJyArIHZhbHVlKVxuXHRcdDogdmFsdWU9PT12YWx1ZSA/IGlzKHZhbHVlLCAwKSA/ICcwLjAnIDogJy0wLjAnIDogJ25hbidcblx0OiAodmFsdWUgICAgICAgICkgPT4gdmFsdWVcblx0XHQ/IHZhbHVlPT09SW5maW5pdHkgPyAnaW5mJyA6IHZhbHVlPT09X0luZmluaXR5ID8gJy1pbmYnIDogZW5zdXJlRmxvYXQoJycgKyB2YWx1ZSlcblx0XHQ6IHZhbHVlPT09dmFsdWUgPyBpcyh2YWx1ZSwgMCkgPyAnMC4wJyA6ICctMC4wJyA6ICggZmxvYXQ2NEFycmF5WzBdID0gdmFsdWUsIHVpbnQ4QXJyYXlbN10gKT09PU5hTl83ID8gJ25hbicgOiAnLW5hbic7XG4iLCJpbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuU3ltYm9sJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IERBVEUgZnJvbSAnLkRhdGUucHJvdG90eXBlJztcbmltcG9ydCBpc1Byb3RvdHlwZU9mIGZyb20gJy5PYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YnO1xuaW1wb3J0IGdldE93blByb3BlcnR5TmFtZXMgZnJvbSAnLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzJztcbmltcG9ydCBpcyBmcm9tICcuT2JqZWN0LmlzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLmNsYXNzLmlzU3RyaW5nJztcbmltcG9ydCBpc051bWJlciBmcm9tICcuY2xhc3MuaXNOdW1iZXInO1xuaW1wb3J0IGlzQmlnSW50IGZyb20gJy5jbGFzcy5pc0JpZ0ludCc7XG5pbXBvcnQgaXNCb29sZWFuIGZyb20gJy5jbGFzcy5pc0Jvb2xlYW4nO1xuXG5pbXBvcnQgeyB0aGVSZWdFeHAgfSBmcm9tICdAbHRkL2otcmVnZXhwJztcblxuaW1wb3J0ICogYXMgcmVnZXhwcyBmcm9tICcuLi9yZWdleHBzJztcblxuaW1wb3J0IHsgY29tbWVudEZvclRoaXMsIGdldENPTU1FTlQsIGdldENvbW1lbnQgfSBmcm9tICcuLi90eXBlcy9jb21tZW50JztcbmltcG9ydCB7IHNpbmdsZWxpbmVTdHJpbmcgfSBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgeyBmbG9hdCB9IGZyb20gJy4vZmxvYXQnO1xuaW1wb3J0IHsgaXNTZWN0aW9uLCBvZklubGluZSB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IF9saXRlcmFsIH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5cbmNvbnN0IGlzRGF0ZSA9IC8qI19fUFVSRV9fKi9pc1Byb3RvdHlwZU9mLmJpbmQoREFURSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cbmNvbnN0IHsgdGVzdDogQkFSRSB9ID0gdGhlUmVnRXhwKC9eW1xcdy1dKyQvKTtcbmNvbnN0ICRLZXkkID0gKGtleSAgICAgICAgKSAgICAgICAgID0+IEJBUkUoa2V5KSA/IGtleSA6IHNpbmdsZWxpbmVTdHJpbmcoa2V5KTtcblxuY29uc3QgRklSU1QgPSAvW14uXSsvO1xuY29uc3QgbGl0ZXJhbFN0cmluZyA9ICh2YWx1ZSAgICAgICAgKSAgICAgICAgICAgICAgICA9PiBgJyR7dmFsdWV9J2A7XG5jb25zdCAkS2V5cyA9IChrZXlzICAgICAgICApICAgICAgICAgPT4gcmVnZXhwcy5pc0FtYXppbmcoa2V5cykgPyBrZXlzLnJlcGxhY2UoRklSU1QsIGxpdGVyYWxTdHJpbmcpIDoga2V5cz09PSdudWxsJyA/IGAnbnVsbCdgIDoga2V5cztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVE9NTFNlY3Rpb24gZXh0ZW5kcyBBcnJheSAgICAgICAgIHtcblx0XG5cdCAgICAgICAgICAgICAgICAgZG9jdW1lbnQgICAgICAgICAgICAgIDtcblx0XG5cdGNvbnN0cnVjdG9yIChkb2N1bWVudCAgICAgICAgICAgICAgKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0XG5cdFtTeW1ib2wudG9QcmltaXRpdmVdICgpIHsgcmV0dXJuIHRoaXMuam9pbih0aGlzLmRvY3VtZW50Lm5ld2xpbmUpOyB9XG5cdFxuXHRhcHBlbmROZXdsaW5lICgpIHsgdGhpc1t0aGlzLmxlbmd0aF0gPSAnJzsgfVxuXHQgICAgICAgIHNldCBhcHBlbmRMaW5lIChzb3VyY2UgICAgICAgICkgeyB0aGlzW3RoaXMubGVuZ3RoXSA9IHNvdXJjZTsgfVxuXHQgICAgICAgIHNldCBhcHBlbmRJbmxpbmUgKHNvdXJjZSAgICAgICAgKSB7IHRoaXNbdGhpcy5sZW5ndGggLSAxXSArPSBzb3VyY2U7IH0gICBcblx0ICAgICAgICBzZXQgYXBwZW5kSW5saW5lSWYgKHNvdXJjZSAgICAgICAgKSB7IHNvdXJjZSAmJiAoIHRoaXNbdGhpcy5sZW5ndGggLSAxXSArPSBzb3VyY2UgKTsgfS8vL1xuXHRcblx0KiBhc3NpZ25CbG9jayAgICAgICAgICAgICAgICAgICAgICAgICAgIChkb2N1bWVudEtleXNfICAgICAgICAgICAgICAgICAgICwgc2VjdGlvbktleXNfICAgICAgICAgICAgICAgICAgLCB0YWJsZSAgICwgdGFibGVLZXlzICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAge1xuXHRcdGNvbnN0IHsgZG9jdW1lbnQgfSA9IHRoaXM7XG5cdFx0Y29uc3QgeyBuZXdsaW5lVW5kZXJIZWFkZXIsIG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyIH0gPSBkb2N1bWVudDtcblx0XHRjb25zdCBuZXdsaW5lQWZ0ZXJEb3R0ZWQgPSBzZWN0aW9uS2V5c18gPyBkb2N1bWVudC5uZXdsaW5lVW5kZXJQYWlyQnV0RG90dGVkIDogZmFsc2U7XG5cdFx0Y29uc3QgbmV3bGluZUFmdGVyUGFpciA9IHNlY3Rpb25LZXlzXyA/IGRvY3VtZW50Lm5ld2xpbmVVbmRlckRvdHRlZCA6IGRvY3VtZW50Lm5ld2xpbmVVbmRlclBhaXI7XG5cdFx0Zm9yICggY29uc3QgdGFibGVLZXkgb2YgdGFibGVLZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gdGFibGVbdGFibGVLZXldIDtcblx0XHRcdGNvbnN0ICRrZXkkID0gJEtleSQodGFibGVLZXkpO1xuXHRcdFx0Y29uc3QgZG9jdW1lbnRLZXlzID0gZG9jdW1lbnRLZXlzXyArICRrZXkkO1xuXHRcdFx0aWYgKCBpc0FycmF5KHZhbHVlKSApIHtcblx0XHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IHZhbHVlO1xuXHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRsZXQgZmlyc3RJdGVtID0gdmFsdWVbMF07XG5cdFx0XHRcdFx0aWYgKCBpc1NlY3Rpb24oZmlyc3RJdGVtKSApIHtcblx0XHRcdFx0XHRcdGNvbnN0IHRhYmxlSGVhZGVyID0gYFtbJHtkb2N1bWVudEtleXN9XV1gICAgICAgICAgO1xuXHRcdFx0XHRcdFx0Y29uc3QgZG9jdW1lbnRLZXlzXyA9IGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICA7XG5cdFx0XHRcdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0bGV0IHRhYmxlICAgICAgICAgICAgICAgICA9IGZpcnN0SXRlbTtcblx0XHRcdFx0XHRcdGZvciAoIDsgOyApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmFwcGVuZFNlY3Rpb24oKTtcblx0XHRcdFx0XHRcdFx0c2VjdGlvblswXSA9IHRhYmxlSGVhZGVyICsgZ2V0Q09NTUVOVCh0YWJsZSwgY29tbWVudEZvclRoaXMpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIG5ld2xpbmVVbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRcdFx0XHRzZWN0aW9uWzFdID0gJyc7XG5cdFx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXNfLCBgYCwgdGFibGUsIGdldE93blByb3BlcnR5TmFtZXModGFibGUpKTtcblx0XHRcdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoICsraW5kZXg9PT1sZW5ndGggKSB7IGJyZWFrOyB9XG5cdFx0XHRcdFx0XHRcdHRhYmxlID0gKCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgIClbaW5kZXhdIDtcblx0XHRcdFx0XHRcdFx0aWYgKCAhaXNTZWN0aW9uKHRhYmxlKSApIHsgdGhyb3cgVHlwZUVycm9yKGB0aGUgZmlyc3QgdGFibGUgaXRlbSBtYXJrZWQgYnkgU2VjdGlvbigpIG1lYW5zIHRoZSBwYXJlbnQgYXJyYXkgaXMgYW4gYXJyYXkgb2YgdGFibGVzLCB3aGljaCBjYW4gbm90IGluY2x1ZGUgb3RoZXIgdHlwZXMgb3IgdGFibGUgbm90IG1hcmtlZCBieSBTZWN0aW9uKCkgYW55IG1vcmUgaW4gdGhlIHJlc3QgaXRlbXNgKTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgeyBsZXQgaW5kZXggPSAxOyB3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkgeyBpZiAoIGlzU2VjdGlvbih2YWx1ZVtpbmRleCsrXSApICkgeyB0aHJvdyBUeXBlRXJyb3IoYGlmIGFuIGFycmF5IGlzIG5vdCBhcnJheSBvZiB0YWJsZXMsIGl0IGNhbiBub3QgaW5jbHVkZSBhbnkgdGFibGUgdGhhdCBtYXJrZWQgYnkgU2VjdGlvbigpYCk7IH0gfSB9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGlzU2VjdGlvbih2YWx1ZSkgKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmFwcGVuZFNlY3Rpb24oKTtcblx0XHRcdFx0XHRzZWN0aW9uWzBdID0gYFske2RvY3VtZW50S2V5c31dJHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LnByZWZlckNvbW1lbnRGb3JUaGlzXG5cdFx0XHRcdFx0XHRcdD8gZ2V0Q09NTUVOVCh2YWx1ZSwgY29tbWVudEZvclRoaXMpIHx8IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KVxuXHRcdFx0XHRcdFx0XHQ6IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KSB8fCBnZXRDT01NRU5UKHZhbHVlLCBjb21tZW50Rm9yVGhpcylcblx0XHRcdFx0XHR9YDtcblx0XHRcdFx0XHRpZiAoIG5ld2xpbmVVbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRcdHNlY3Rpb25bMV0gPSAnJztcblx0XHRcdFx0XHRcdHlpZWxkIHNlY3Rpb24uYXNzaWduQmxvY2soZG9jdW1lbnRLZXlzICsgJy4nICAgICAgICAgICAgICAgICwgYGAsIHZhbHVlLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKSk7XG5cdFx0XHRcdFx0XHRuZXdsaW5lVW5kZXJTZWN0aW9uQnV0UGFpciAmJiBzZWN0aW9uLmxlbmd0aCE9PTIgJiYgc2VjdGlvbi5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0eWllbGQgc2VjdGlvbi5hc3NpZ25CbG9jayhkb2N1bWVudEtleXMgKyAnLicgICAgICAgICAgICAgICAgLCBgYCwgdmFsdWUsIGdldE93blByb3BlcnR5TmFtZXModmFsdWUpKTtcblx0XHRcdFx0XHRcdG5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24uYXBwZW5kTmV3bGluZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgc2VjdGlvbktleXMgPSBzZWN0aW9uS2V5c18gKyAka2V5JDtcblx0XHRcdHRoaXMuYXBwZW5kTGluZSA9ICRLZXlzKHNlY3Rpb25LZXlzKSArICcgPSAnO1xuXHRcdFx0Y29uc3QgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgPSB0aGlzLnZhbHVlKCcnLCB2YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICkge1xuXHRcdFx0XHQtLXRoaXMubGVuZ3RoO1xuXHRcdFx0XHR5aWVsZCB0aGlzLmFzc2lnbkJsb2NrKGRvY3VtZW50S2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHNlY3Rpb25LZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUpO1xuXHRcdFx0XHRuZXdsaW5lQWZ0ZXJEb3R0ZWQgJiYgdGhpcy5hcHBlbmROZXdsaW5lKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmVJZiA9IGdldENvbW1lbnQodGFibGUsIHRhYmxlS2V5KTtcblx0XHRcdFx0bmV3bGluZUFmdGVyUGFpciAmJiB0aGlzLmFwcGVuZE5ld2xpbmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdCAgICAgICAgdmFsdWUgKGluZGVudCAgICAgICAgLCB2YWx1ZSAgICAgICAgICAgICAgICAsIHJldHVyblZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlICAgICAgICAgKSAgICAgICAgICAgICAgICAgIHtcblx0XHRzd2l0Y2ggKCB0eXBlb2YgdmFsdWUgKSB7XG5cdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRpZiAoIHZhbHVlPT09bnVsbCApIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMuZG9jdW1lbnQubnVsbERpc2FibGVkICkgeyB0aHJvdyBUeXBlRXJyb3IoYHRvbWwgY2FuIG5vdCBzdHJpbmdpZnkgXCJudWxsXCIgdHlwZSB2YWx1ZSB3aXRob3V0IHRydXRoeSBvcHRpb25zLnhOdWxsYCk7IH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZElubGluZSA9ICdudWxsJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBpbmxpbmVNb2RlID0gb2ZJbmxpbmUodmFsdWUpO1xuXHRcdFx0XHRpZiAoIGlzQXJyYXkodmFsdWUpICkge1xuXHRcdFx0XHRcdGlmICggaW5saW5lTW9kZT09PXVuZGVmaW5lZCApIHsgdGhpcy5zdGF0aWNBcnJheShpbmRlbnQsIHZhbHVlKTsgfVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyAkc2luZ2xlbGluZUFycmF5ID0gaW5saW5lTW9kZSB9ID0gdGhpcy5kb2N1bWVudDtcblx0XHRcdFx0XHRcdHRoaXMuc2luZ2xlbGluZUFycmF5KGluZGVudCwgdmFsdWUsICRzaW5nbGVsaW5lQXJyYXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGlubGluZU1vZGUhPT11bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0aW5saW5lTW9kZSB8fCB0aGlzLmRvY3VtZW50Lm11bHRpbGluZVRhYmxlRGlzYWJsZWRcblx0XHRcdFx0XHRcdD8gdGhpcy5pbmxpbmVUYWJsZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgKVxuXHRcdFx0XHRcdFx0OiB0aGlzLm11bHRpbGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAsIHRoaXMuZG9jdW1lbnQubXVsdGlsaW5lVGFibGVDb21tYSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc0RhdGUodmFsdWUpICkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdUJywgdGhpcy5kb2N1bWVudC5UKS5yZXBsYWNlKCdaJywgdGhpcy5kb2N1bWVudC5aKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIF9saXRlcmFsIGluIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnN0IGxpdGVyYWwgPSAoIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApW19saXRlcmFsXTtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBsaXRlcmFsPT09J3N0cmluZycgKSB7IHRoaXMuYXBwZW5kSW5saW5lID0gbGl0ZXJhbDsgfVxuXHRcdFx0XHRcdGVsc2UgaWYgKCBpc0FycmF5KGxpdGVyYWwpICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBsZW5ndGggfSA9IGxpdGVyYWw7XG5cdFx0XHRcdFx0XHRpZiAoIGxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBsaXRlcmFsWzBdO1xuXHRcdFx0XHRcdFx0XHRsZXQgaW5kZXggPSAxO1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGluZGV4IT09bGVuZ3RoICkgeyB0aGlzLmFwcGVuZExpbmUgPSBsaXRlcmFsW2luZGV4KytdIDsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgbGl0ZXJhbCB2YWx1ZSBpcyBicm9rZW5gKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBsaXRlcmFsIHZhbHVlIGlzIGJyb2tlbmApOyB9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBpc1N0cmluZyh2YWx1ZSkgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkgcmVmdXNlIHRvIGhhbmRsZSBbb2JqZWN0IFN0cmluZ11gKTsgfVxuXHRcdFx0XHRpZiAoIGlzTnVtYmVyKHZhbHVlKSApIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSByZWZ1c2UgdG8gaGFuZGxlIFtvYmplY3QgTnVtYmVyXWApOyB9XG5cdFx0XHRcdGlmICggaXNCaWdJbnQodmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCaWdJbnRdYCk7IH1cblx0XHRcdFx0aWYgKCBpc0Jvb2xlYW4odmFsdWUpICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5IHJlZnVzZSB0byBoYW5kbGUgW29iamVjdCBCb29sZWFuXWApOyB9XG5cdFx0XHRcdGlmICggcmV0dXJuVmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdFx0Y29uc3Qga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXModmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHRcdGlmICgga2V5cy5sZW5ndGggKSB7IHJldHVybiBrZXlzOyB9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAneyB9Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmlubGluZVRhYmxlKGluZGVudCwgdmFsdWUgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYmlnaW50Jzpcblx0XHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnJyArIHZhbHVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdGhpcy5kb2N1bWVudC5hc0ludGVnZXIodmFsdWUpID8gaXModmFsdWUsIC0wKSA/ICctMCcgOiAnJyArIHZhbHVlIDogZmxvYXQodmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gc2luZ2xlbGluZVN0cmluZyh2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gdmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IFR5cGVFcnJvcihgdG9tbCBjYW4gbm90IHN0cmluZ2lmeSBcIiR7dHlwZW9mIHZhbHVlfVwiIHR5cGUgdmFsdWVgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0XG5cdCAgICAgICAgc2luZ2xlbGluZUFycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgLCBpbmxpbmVNb2RlICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3QgeyBsZW5ndGggfSA9IHN0YXRpY0FycmF5O1xuXHRcdGlmICggbGVuZ3RoICkge1xuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMTAgPyAnWyAnIDogJ1snO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5WzBdICwgZmFsc2UpO1xuXHRcdFx0bGV0IGluZGV4ID0gMTtcblx0XHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywgJztcblx0XHRcdFx0dGhpcy52YWx1ZShpbmRlbnQsIHN0YXRpY0FycmF5W2luZGV4KytdICwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMTAgPyAnIF0nIDogJ10nO1xuXHRcdH1cblx0XHRlbHNlIHsgdGhpcy5hcHBlbmRJbmxpbmUgPSBpbmxpbmVNb2RlJjBiMDEgPyAnWyBdJyA6ICdbXSc7IH1cblx0fVxuXHQgICAgICAgIHN0YXRpY0FycmF5IChpbmRlbnQgICAgICAgICwgc3RhdGljQXJyYXkgICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0dGhpcy5hcHBlbmRJbmxpbmUgPSAnWyc7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGNvbnN0IHsgbGVuZ3RoIH0gPSBzdGF0aWNBcnJheTtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlICggaW5kZXghPT1sZW5ndGggKSB7XG5cdFx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnRfO1xuXHRcdFx0dGhpcy52YWx1ZShpbmRlbnRfLCBzdGF0aWNBcnJheVtpbmRleCsrXSAsIGZhbHNlKTtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJywnO1xuXHRcdH1cblx0XHR0aGlzLmFwcGVuZExpbmUgPSBpbmRlbnQgKyAnXSc7XG5cdH1cblx0XG5cdCAgICAgICAgaW5saW5lVGFibGUgKGluZGVudCAgICAgICAgLCBpbmxpbmVUYWJsZSAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRjb25zdCBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhpbmxpbmVUYWJsZSk7XG5cdFx0aWYgKCBrZXlzLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgJztcblx0XHRcdHRoaXMuYXNzaWduSW5saW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBrZXlzKTtcblx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLTIpICsgJyB9Jztcblx0XHR9XG5cdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJ3sgfSc7IH1cblx0fVxuXHQgICAgICAgIG11bHRpbGluZVRhYmxlIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAgICAgICAgICAgICAgICAgICAgLCBjb21tYSAgICAgICAgICAgICAgICAgICAgICkge1xuXHRcdHRoaXMuYXBwZW5kSW5saW5lID0gJ3snO1xuXHRcdHRoaXMuYXNzaWduTXVsdGlsaW5lKGluZGVudCwgaW5saW5lVGFibGUsIGBgLCBnZXRPd25Qcm9wZXJ0eU5hbWVzKGlubGluZVRhYmxlKSwgY29tbWEpO1xuXHRcdHRoaXMuYXBwZW5kTGluZSA9IGluZGVudCArICd9Jztcblx0fVxuXHQgICAgICAgIGFzc2lnbklubGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcblx0XHRmb3IgKCBjb25zdCBrZXkgb2Yga2V5cyApIHtcblx0XHRcdGNvbnN0IHZhbHVlICAgICAgICAgICAgICAgICA9IGlubGluZVRhYmxlW2tleV0gO1xuXHRcdFx0Y29uc3Qga2V5cyA9IGtleXNfICsgJEtleSQoa2V5KTtcblx0XHRcdGNvbnN0IGJlZm9yZV92YWx1ZSA9IHRoaXMuYXBwZW5kSW5saW5lID0gJEtleXMoa2V5cykgKyAnID0gJztcblx0XHRcdGNvbnN0IHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlID0gdGhpcy52YWx1ZShpbmRlbnQsIHZhbHVlLCB0cnVlKTtcblx0XHRcdGlmICggdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUgKSB7XG5cdFx0XHRcdHRoaXNbdGhpcy5sZW5ndGggLSAxXSA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXSAuc2xpY2UoMCwgLWJlZm9yZV92YWx1ZS5sZW5ndGgpO1xuXHRcdFx0XHR0aGlzLmFzc2lnbklubGluZShpbmRlbnQsIHZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgLCBrZXlzICsgJy4nICAgICAgICAgICAgICAgICwgdmFsdWVLZXlzSWZWYWx1ZUlzRG90dGVkVGFibGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7IHRoaXMuYXBwZW5kSW5saW5lID0gJywgJzsgfVxuXHRcdH1cblx0fVxuXHQgICAgICAgIGFzc2lnbk11bHRpbGluZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRlbnQgICAgICAgICwgaW5saW5lVGFibGUgICAsIGtleXNfICAgICAgICAgICAgICAgICAgICwga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbW1hICAgICAgICAgICAgICAgICAgICAgKSB7XG5cdFx0Y29uc3QgaW5kZW50XyA9IGluZGVudCArIHRoaXMuZG9jdW1lbnQuaW5kZW50O1xuXHRcdGZvciAoIGNvbnN0IGtleSBvZiBrZXlzICkge1xuXHRcdFx0Y29uc3QgdmFsdWUgICAgICAgICAgICAgICAgID0gaW5saW5lVGFibGVba2V5XSA7XG5cdFx0XHRjb25zdCBrZXlzID0ga2V5c18gKyAkS2V5JChrZXkpO1xuXHRcdFx0dGhpcy5hcHBlbmRMaW5lID0gaW5kZW50XyArICRLZXlzKGtleXMpICsgJyA9ICc7XG5cdFx0XHRjb25zdCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSA9IHRoaXMudmFsdWUoaW5kZW50XywgdmFsdWUsIHRydWUpO1xuXHRcdFx0aWYgKCB2YWx1ZUtleXNJZlZhbHVlSXNEb3R0ZWRUYWJsZSApIHtcblx0XHRcdFx0LS10aGlzLmxlbmd0aDtcblx0XHRcdFx0dGhpcy5hc3NpZ25NdWx0aWxpbmUoaW5kZW50LCB2YWx1ZSAgICAgICAgICAgICAgICAgICAgICAgICwga2V5cyArICcuJyAgICAgICAgICAgICAgICAsIHZhbHVlS2V5c0lmVmFsdWVJc0RvdHRlZFRhYmxlLCBjb21tYSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Y29tbWFcblx0XHRcdFx0XHQ/IHRoaXMuYXBwZW5kSW5saW5lID0gJywnICsgZ2V0Q29tbWVudChpbmxpbmVUYWJsZSwga2V5KVxuXHRcdFx0XHRcdDogdGhpcy5hcHBlbmRJbmxpbmVJZiA9IGdldENvbW1lbnQoaW5saW5lVGFibGUsIGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgUmFuZ2VFcnJvciBmcm9tICcuUmFuZ2VFcnJvcic7XG5pbXBvcnQgU3ludGF4RXJyb3IgZnJvbSAnLlN5bnRheEVycm9yJztcbmltcG9ydCBBcnJheSBmcm9tICcuQXJyYXknO1xuaW1wb3J0IGlzU2FmZUludGVnZXIgZnJvbSAnLk51bWJlci5pc1NhZmVJbnRlZ2VyJztcbmltcG9ydCBNQVhfU0FGRV9JTlRFR0VSIGZyb20gJy5OdW1iZXIuTUFYX1NBRkVfSU5URUdFUic7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgVE9NTFNlY3Rpb24gZnJvbSAnLi9zZWN0aW9uJztcblxuY29uc3QgbmFtZTJjb2RlID0gLyojX19QVVJFX18qL051bGwoe1xuXHRkb2N1bWVudDogMCxcblx0c2VjdGlvbjogMSxcblx0aGVhZGVyOiAyLFxuXHRwYWlyczogMyxcblx0cGFpcjogNCxcbn0gICAgICAgICApO1xuXG5jb25zdCB7IHRlc3Q6IElTX0lOREVOVCB9ID0gdGhlUmVnRXhwKC9eW1xcdCBdKiQvKTtcblxuY29uc3QgcmV0dXJuX2ZhbHNlID0gKCkgPT4gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRPTUxEb2N1bWVudCBleHRlbmRzIEFycmF5ICAgICAgICAgICAgICB7XG5cdFxuXHQgICAgICAgICBnZXQgWydjb25zdHJ1Y3RvciddICgpIHsgcmV0dXJuIEFycmF5OyB9XG5cdFxuXHQwID0gbmV3IFRPTUxTZWN0aW9uKHRoaXMpO1xuXHRcblx0ICAgICAgICAgYXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSByZXR1cm5fZmFsc2U7XG5cdCAgICAgICAgIG5ld2xpbmUgICAgICAgICAgICAgICAgICAgICA9ICcnO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJTZWN0aW9uICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJIZWFkZXIgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBuZXdsaW5lVW5kZXJQYWlyICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgIG5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgICAgICAgICAgPSBmYWxzZTtcblx0ICAgICAgICAgbmV3bGluZVVuZGVyRG90dGVkICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgIGluZGVudCAgICAgICAgID0gJ1xcdCc7XG5cdCAgICAgICAgIFQgICAgICAgICAgICAgICAgICA9ICdUJztcblx0ICAgICAgICAgWiAgICAgICAgICAgID0gJ1onO1xuXHQgICAgICAgICBudWxsRGlzYWJsZWQgICAgICAgICAgPSB0cnVlO1xuXHQgICAgICAgICBtdWx0aWxpbmVUYWJsZURpc2FibGVkICAgICAgICAgID0gdHJ1ZTtcblx0ICAgICAgICAgbXVsdGlsaW5lVGFibGVDb21tYSAgICAgICAgICA7XG5cdCAgICAgICAgIHByZWZlckNvbW1lbnRGb3JUaGlzICAgICAgICAgID0gZmFsc2U7XG5cdCAgICAgICAgICRzaW5nbGVsaW5lQXJyYXkgICAgICAgICAgICAgICAgO1xuXHRcblx0Y29uc3RydWN0b3IgKG9wdGlvbnMgICAgICAgICAgICAgICAgICApIHtcblx0XHRcblx0XHRzdXBlcigpO1xuXHRcdFxuXHRcdGlmICggb3B0aW9ucz09bnVsbCApIHsgcmV0dXJuIHRoaXM7IH1cblx0XHRcblx0XHRjb25zdCB7IGludGVnZXIgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBpbnRlZ2VyPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggaW50ZWdlcj09PU1BWF9TQUZFX0lOVEVHRVIgKSB7IHRoaXMuYXNJbnRlZ2VyID0gaXNTYWZlSW50ZWdlcjsgfVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW50ZWdlcj09PSdudW1iZXInICkge1xuXHRcdFx0aWYgKCAhaXNTYWZlSW50ZWdlcihpbnRlZ2VyKSApIHsgdGhyb3cgUmFuZ2VFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgYSBzYWZlIGludGVnZXJgKTsgfVxuXHRcdFx0Y29uc3QgbWF4ID0gaW50ZWdlcj49MCA/IGludGVnZXIgOiAtaW50ZWdlciAtIDE7XG5cdFx0XHRjb25zdCBtaW4gPSBpbnRlZ2VyPj0wID8gLWludGVnZXIgOiBpbnRlZ2VyO1xuXHRcdFx0dGhpcy5hc0ludGVnZXIgPSAobnVtYmVyICAgICAgICApID0+IGlzU2FmZUludGVnZXIobnVtYmVyKSAmJiBtaW48PW51bWJlciAmJiBudW1iZXI8PW1heDtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbnRlZ2VyfSkgY2FuIG9ubHkgYmUgbnVtYmVyYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IG5ld2xpbmUgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBuZXdsaW5lPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggbmV3bGluZT09PSdcXG4nIHx8IG5ld2xpbmU9PT0nXFxyXFxuJyApIHsgdGhpcy5uZXdsaW5lID0gbmV3bGluZTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhyb3cgdHlwZW9mIG5ld2xpbmU9PT0nc3RyaW5nJ1xuXHRcdFx0XHQ/IFN5bnRheEVycm9yKGBUT01MLnN0cmluZ2lmeSgse25ld2xpbmV9KSBjYW4gb25seSBiZSB2YWxpZCBUT01MIG5ld2xpbmVgKVxuXHRcdFx0XHQ6IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtuZXdsaW5lfSkgY2FuIG9ubHkgYmUgc3RyaW5nYCk7XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IHsgcHJlZmVyQ29tbWVudEZvciB9ID0gb3B0aW9ucztcblx0XHRpZiAoIHByZWZlckNvbW1lbnRGb3I9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBwcmVmZXJDb21tZW50Rm9yPT09J3RoaXMnIHx8IHByZWZlckNvbW1lbnRGb3I9PT0na2V5JyApIHsgdGhpcy5wcmVmZXJDb21tZW50Rm9yVGhpcyA9IHByZWZlckNvbW1lbnRGb3I9PT0ndGhpcyc7IH1cblx0XHRlbHNlIHsgdGhyb3cgVHlwZUVycm9yKGBUT01MLnN0cmluZ2lmeSgse3ByZWZlckNvbW1lbnRGb3IpIGNhbiBvbmx5IGJlICdrZXknIG9yICd0aGlzJ2ApOyB9XG5cdFx0XG5cdFx0Y29uc3QgeyBbb3B0aW9ucy5uZXdsaW5lQXJvdW5kIHx8ICdoZWFkZXInXTogYXJvdW5kID0gbmFtZTJjb2RlLmhlYWRlciB9ID0gbmFtZTJjb2RlO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbiA9IGFyb3VuZD4wO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyU2VjdGlvbkJ1dFBhaXIgPSBhcm91bmQ9PT0xIHx8IGFyb3VuZD09PTI7XG5cdFx0dGhpcy5uZXdsaW5lVW5kZXJIZWFkZXIgPSBhcm91bmQ+MTtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXIgPSBhcm91bmQ+Mjtcblx0XHR0aGlzLm5ld2xpbmVVbmRlclBhaXJCdXREb3R0ZWQgPSBhcm91bmQ9PT0zO1xuXHRcdHRoaXMubmV3bGluZVVuZGVyRG90dGVkID0gYXJvdW5kPjM7XG5cdFx0XG5cdFx0Y29uc3QgeyBpbmRlbnQgfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBpbmRlbnQ9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW5kZW50PT09J3N0cmluZycgKSB7XG5cdFx0XHRpZiAoICFJU19JTkRFTlQoaW5kZW50KSApIHsgdGhyb3cgU3ludGF4RXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50fSkgY2FuIG9ubHkgaW5jbHVkZSBUYWIgb3IgU3BhY2VgKTsgfVxuXHRcdFx0dGhpcy5pbmRlbnQgPSBpbmRlbnQ7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCB0eXBlb2YgaW5kZW50PT09J251bWJlcicgKSB7XG5cdFx0XHRpZiAoICFpc1NhZmVJbnRlZ2VyKGluZGVudCkgKSB7IHRocm93IFJhbmdlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7aW5kZW50OiR7aW5kZW50fX0pIGlzIG91dCBvZiByYW5nZWApOyB9XG5cdFx0XHR0aGlzLmluZGVudCA9ICcgJy5yZXBlYXQoaW5kZW50KTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtpbmRlbnR9KSBjYW4gbm90IGJlIFwiJHt0eXBlb2YgaW5kZW50fVwiIHR5cGVgKTsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgVCB9ID0gb3B0aW9ucztcblx0XHRpZiAoIFQ9PT11bmRlZmluZWQgKSB7fVxuXHRcdGVsc2UgaWYgKCBUPT09JyAnIHx8IFQ9PT0ndCcgfHwgVD09PSdUJyApIHsgdGhpcy5UID0gVDsgfVxuXHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwuc3RyaW5naWZ5KCx7VH0pIGNhbiBvbmx5IGJlIFwiVFwiIG9yIFwiIFwiIG9yIFwidFwiYCk7IH1cblx0XHRcblx0XHRjb25zdCB7IFogfSA9IG9wdGlvbnM7XG5cdFx0aWYgKCBaPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggWj09PSd6JyB8fCBaPT09J1onICkgeyB0aGlzLlogPSBaOyB9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHtafSkgY2FuIG9ubHkgYmUgXCJaXCIgb3IgXCJ6XCJgKTsgfVxuXHRcdFxuXHRcdGlmICggb3B0aW9ucy54TnVsbCApIHsgdGhpcy5udWxsRGlzYWJsZWQgPSBmYWxzZTsgfVxuXHRcdFxuXHRcdGNvbnN0IHsgeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlIH0gPSBvcHRpb25zO1xuXHRcdGlmICggeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09dW5kZWZpbmVkICkge31cblx0XHRlbHNlIGlmICggeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09JycgfHwgeEJlZm9yZU5ld2xpbmVJbk11bHRpbGluZVRhYmxlPT09JywnICkge1xuXHRcdFx0dGhpcy5tdWx0aWxpbmVUYWJsZURpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLm11bHRpbGluZVRhYmxlQ29tbWEgPSAhIXhCZWZvcmVOZXdsaW5lSW5NdWx0aWxpbmVUYWJsZTtcblx0XHR9XG5cdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5zdHJpbmdpZnkoLHt4QmVmb3JlTmV3bGluZUluTXVsdGlsaW5lVGFibGV9KSBjYW4gb25seSBiZSBcIlwiIG9yIFwiLFwiYCk7IH1cblx0XHRcblx0XHRjb25zdCAkc2luZ2xlbGluZUFycmF5ID0gb3B0aW9ucy5mb3JjZUlubGluZUFycmF5U3BhY2luZztcblx0XHRzd2l0Y2ggKCAkc2luZ2xlbGluZUFycmF5ICkge1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHR0aGlzLiRzaW5nbGVsaW5lQXJyYXkgPSAkc2luZ2xlbGluZUFycmF5O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IHR5cGVvZiAkc2luZ2xlbGluZUFycmF5PT09J251bWJlcidcblx0XHRcdFx0XHQ/IFJhbmdlRXJyb3IoYGFycmF5IGlubGluZSBtb2RlIG11c3QgYmUgMCB8IDEgfCAyIHwgMywgbm90IGluY2x1ZGluZyAkeyRzaW5nbGVsaW5lQXJyYXl9YClcblx0XHRcdFx0XHQ6IFR5cGVFcnJvcihgYXJyYXkgaW5saW5lIG1vZGUgbXVzdCBiZSBcIm51bWJlclwiIHR5cGUsIG5vdCBpbmNsdWRpbmcgJHskc2luZ2xlbGluZUFycmF5PT09bnVsbCA/ICdcIm51bGxcIicgOiB0eXBlb2YgJHNpbmdsZWxpbmVBcnJheX1gKTtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHRoaXM7XG5cdFx0XG5cdH1cblx0XG5cdGFwcGVuZFNlY3Rpb24gKCkgeyByZXR1cm4gdGhpc1t0aGlzLmxlbmd0aF0gPSBuZXcgVE9NTFNlY3Rpb24odGhpcyk7IH1cblx0XG59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IFdlYWtTZXQgZnJvbSAnLldlYWtTZXQnO1xuaW1wb3J0IGhhcyBmcm9tICcuV2Vha1NldC5wcm90b3R5cGUuaGFzJztcbmltcG9ydCBhZGQgZnJvbSAnLldlYWtTZXQucHJvdG90eXBlLmFkZCc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlOYW1lcyBmcm9tICcuT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMnO1xuaW1wb3J0IGZyZWV6ZSBmcm9tICcuT2JqZWN0LmZyZWV6ZSc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuQXJyYXkuaXNBcnJheSc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5cbmltcG9ydCB7IHggfSBmcm9tICcuLi9qLWxleGVyJzsvLy8gZXh0ZXJuYWxcblxuaW1wb3J0IFRPTUxEb2N1bWVudCBmcm9tICcuL2RvY3VtZW50JztcbmNvbnN0IGxpbmVzRnJvbVN0cmluZ2lmeSA9IG5ldyBXZWFrU2V0ICAgICAgICAgICAgICAgICAgICgpO1xuY29uc3QgYmVMaW5lc0Zyb21TdHJpbmdpZnkgPSAvKiNfX1BVUkVfXyovYWRkLmJpbmQobGluZXNGcm9tU3RyaW5naWZ5KTtcbmV4cG9ydCBjb25zdCBpc0xpbmVzRnJvbVN0cmluZ2lmeSA9IC8qI19fUFVSRV9fKi9oYXMuYmluZChsaW5lc0Zyb21TdHJpbmdpZnkpO1xuZXhwb3J0IGRlZmF1bHQgKHJvb3RUYWJsZSAgICAgICAgICAgICAgICAsIG9wdGlvbnMgICAgICAgICAgICAgICAgICApICAgICAgICAgICAgICAgICAgICA9PiB7XG5cdGNvbnN0IGRvY3VtZW50ID0gbmV3IFRPTUxEb2N1bWVudChvcHRpb25zKTtcblx0Y29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50WzBdO1xuXHRzZWN0aW9uWzBdID0gJyc7XG5cdHggICAgICAoc2VjdGlvbi5hc3NpZ25CbG9jayhgYCwgYGAsIHJvb3RUYWJsZSwgZ2V0T3duUHJvcGVydHlOYW1lcyhyb290VGFibGUpKSk7XG5cdGRvY3VtZW50Lm5ld2xpbmVVbmRlclNlY3Rpb25CdXRQYWlyICYmIHNlY3Rpb24ubGVuZ3RoIT09MSAmJiBzZWN0aW9uLmFwcGVuZE5ld2xpbmUoKTtcblx0ZG9jdW1lbnQubmV3bGluZVVuZGVyU2VjdGlvbiB8fCBkb2N1bWVudFtkb2N1bWVudC5sZW5ndGggLSAxXSAuYXBwZW5kTmV3bGluZSgpO1xuXHRpZiAoIGRvY3VtZW50Lm5ld2xpbmUgKSB7IHJldHVybiBkb2N1bWVudC5qb2luKGRvY3VtZW50Lm5ld2xpbmUpOyB9XG5cdGNvbnN0IGxpbmVzID0gZG9jdW1lbnQuZmxhdCgpO1xuXHRiZUxpbmVzRnJvbVN0cmluZ2lmeShsaW5lcyk7XG5cdHJldHVybiBsaW5lcztcbn07XG5cbmV4cG9ydCB7IGlubGluZSwgU2VjdGlvbiB9IGZyb20gJy4uL3R5cGVzL25vbi1hdG9tJztcbmV4cG9ydCB7IF9saXRlcmFsIH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBMaXRlcmFsT2JqZWN0IH0gZnJvbSAnLi4vdHlwZXMvYXRvbSc7XG5pbXBvcnQgeyBtdWx0aWxpbmVUYWJsZSwgbXVsdGlsaW5lQXJyYXkgfSBmcm9tICcuLi90eXBlcy9ub24tYXRvbSc7XG5pbXBvcnQgeyBzaW5nbGVsaW5lQmFzaWNTdHJpbmcsIExpbmVzLCBtdWx0aWxpbmVTdHJpbmcsIG11bHRpbGluZUJhc2ljU3RyaW5nLCBtdWx0aWxpbmVMaXRlcmFsU3RyaW5nLCBtdWx0aWxpbmVOZWVkQmFzaWMgfSBmcm9tICcuL3N0cmluZyc7XG5leHBvcnQgY29uc3QgbXVsdGlsaW5lID0gLyojX19QVVJFX18qLyggKCkgPT4ge1xuXHRjb25zdCBtdWx0aWxpbmUgPSAodmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0cmluZyAgICAgICAgICkgPT5cblx0XHR0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyA/IExpdGVyYWxPYmplY3QoKCBtdWx0aWxpbmVOZWVkQmFzaWModmFsdWUpID8gbXVsdGlsaW5lQmFzaWNTdHJpbmcgOiBtdWx0aWxpbmVMaXRlcmFsU3RyaW5nICkoKCAnXFxuJyArIHZhbHVlICkuc3BsaXQoJ1xcbicpICAgICAgICAgKSwgdmFsdWUpIDpcblx0XHRcdGlzQXJyYXkodmFsdWUpID8gTGl0ZXJhbE9iamVjdChtdWx0aWxpbmVTdHJpbmcoTGluZXModmFsdWUpKSwgdHlwZW9mIHN0cmluZz09PSdzdHJpbmcnID8gc3RyaW5nIDogTnVsbChudWxsKSkgOlxuXHRcdFx0XHRtdWx0aWxpbmVUYWJsZSh2YWx1ZSk7XG5cdG11bHRpbGluZS5iYXNpYyA9IChsaW5lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHN0cmluZyAgICAgICAgICkgPT5cblx0XHR0eXBlb2YgbGluZXM9PT0nc3RyaW5nJ1xuXHRcdFx0PyBMaXRlcmFsT2JqZWN0KG11bHRpbGluZUJhc2ljU3RyaW5nKCggJ1xcbicgKyBsaW5lcyApLnNwbGl0KCdcXG4nKSAgICAgICAgICksIGxpbmVzKVxuXHRcdFx0OiBMaXRlcmFsT2JqZWN0KG11bHRpbGluZUJhc2ljU3RyaW5nKExpbmVzKGxpbmVzKSksIHR5cGVvZiBzdHJpbmc9PT0nc3RyaW5nJyA/IHN0cmluZyA6IE51bGwobnVsbCkpXG5cdDtcblx0bXVsdGlsaW5lLmFycmF5ID0gbXVsdGlsaW5lQXJyYXk7XG5cdGZyZWV6ZShtdWx0aWxpbmUpO1xuXHRyZXR1cm4gbXVsdGlsaW5lO1xufSApKCk7XG5leHBvcnQgY29uc3QgYmFzaWMgPSAodmFsdWUgICAgICAgICkgPT4gTGl0ZXJhbE9iamVjdChzaW5nbGVsaW5lQmFzaWNTdHJpbmcodmFsdWUpLCB2YWx1ZSk7XG5leHBvcnQgY29uc3QgbGl0ZXJhbCA9IChsaXRlcmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLi4uY2hhcnMgICAgICAgICAgKSA9PiB7XG5cdGlmICggdHlwZW9mIGxpdGVyYWw9PT0nc3RyaW5nJyApIHtcblx0XHRpZiAoIGNoYXJzLmxlbmd0aD09PTEgKSB7XG5cdFx0XHRyZXR1cm4gTGl0ZXJhbE9iamVjdChsaXRlcmFsLmluY2x1ZGVzKCdcXG4nKSA/IGxpdGVyYWwuc3BsaXQoJ1xcbicpICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbGl0ZXJhbCwgY2hhcnNbMF0gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0bGV0IGluZGV4ID0gY2hhcnMubGVuZ3RoO1xuXHRcdGlmICggaW5kZXggKSB7XG5cdFx0XHRjb25zdCB7IHJhdyB9ID0gbGl0ZXJhbDtcblx0XHRcdGxpdGVyYWwgPSByYXdbaW5kZXhdIDtcblx0XHRcdHdoaWxlICggaW5kZXggKSB7IGNoYXJzWy0taW5kZXhdICs9IHJhd1tpbmRleF0gOyB9XG5cdFx0XHRsaXRlcmFsID0gY2hhcnMuam9pbignJykgKyBsaXRlcmFsO1xuXHRcdH1cblx0XHRlbHNlIHsgbGl0ZXJhbCA9IGxpdGVyYWwucmF3WzBdIDsgfVxuXHR9XG5cdHJldHVybiBMaXRlcmFsT2JqZWN0KGxpdGVyYWwuaW5jbHVkZXMoJ1xcbicpID8gbGl0ZXJhbC5zcGxpdCgnXFxuJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsaXRlcmFsLCBOdWxsKG51bGwpKTtcbn07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiaW1wb3J0IEVycm9yIGZyb20gJy5FcnJvcic7XG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IGlzVmlldyBmcm9tICcuQXJyYXlCdWZmZXIuaXNWaWV3JztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5JztcbmltcG9ydCBhc3NpZ24gZnJvbSAnLk9iamVjdC5hc3NpZ24nO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5JztcbmltcG9ydCB1bmRlZmluZWQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgTnVsbCBmcm9tICcubnVsbCc7XG5pbXBvcnQgaXNBcnJheUJ1ZmZlciBmcm9tICcuY2xhc3MuaXNBcnJheUJ1ZmZlcic7XG5pbXBvcnQgVGV4dERlY29kZXIgZnJvbSAnLlRleHREZWNvZGVyJztcblxuaW1wb3J0IHsgY2xlYXJSZWdFeHAsIHRoZVJlZ0V4cCB9IGZyb20gJ0BsdGQvai1yZWdleHAnO1xuXG5pbXBvcnQgKiBhcyBpdGVyYXRvciBmcm9tICcuLi9pdGVyYXRvcic7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuaW1wb3J0IFJvb3QgZnJvbSAnLi9sZXZlbC1sb29wJztcbmltcG9ydCB7IGlzTGluZXNGcm9tU3RyaW5naWZ5IH0gZnJvbSAnLi4vc3RyaW5naWZ5Lyc7XG5cbmNvbnN0IHRleHREZWNvZGVyID0gLyojX19QVVJFX18qL25ldyBUZXh0RGVjb2RlcigndXRmLTgnLCBOdWxsKHsgZmF0YWw6IHRydWUsIGlnbm9yZUJPTTogZmFsc2UgfSkpO1xuY29uc3QgYmluYXJ5MnN0cmluZyA9IChhcnJheUJ1ZmZlckxpa2UgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICA9PiB7XG5cdGlmICggaXNWaWV3KGFycmF5QnVmZmVyTGlrZSkgPyBhcnJheUJ1ZmZlckxpa2UubGVuZ3RoIT09YXJyYXlCdWZmZXJMaWtlLmJ5dGVMZW5ndGggOiAhaXNBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlckxpa2UpICkgeyB0aHJvdyBUeXBlRXJyb3IoYG9ubHkgVWludDhBcnJheSBvciBBcnJheUJ1ZmZlciBpcyBhY2NlcHRhYmxlYCk7IH1cblx0dHJ5IHsgcmV0dXJuIHRleHREZWNvZGVyLmRlY29kZShhcnJheUJ1ZmZlckxpa2UpOyB9XG5cdGNhdGNoIHsgdGhyb3cgRXJyb3IoYEEgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmtub3duIGNvZGUgcG9pbnQuYCk7IH1cbn07XG5jb25zdCBpc0JpbmFyeUxpa2UgPSAodmFsdWUgICAgICAgICkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9PiAnYnl0ZUxlbmd0aCcgaW4gdmFsdWU7Ly8vXG5cbmNvbnN0IHsgdGVzdDogaW5jbHVkZXNOb25TY2FsYXIgfSA9IHRoZVJlZ0V4cCgvW1xcdUQ4MDAtXFx1REZGRl0vdSk7XG5jb25zdCBhc3NlcnRGdWxTY2FsYXIgPSAoc3RyaW5nICAgICAgICApICAgICAgID0+IHtcblx0aWYgKCBjbGVhclJlZ0V4cChpbmNsdWRlc05vblNjYWxhcihzdHJpbmcpKSApIHsgdGhyb3cgRXJyb3IoYEEgVE9NTCBkb2MgbXVzdCBiZSBhIChmdWwtc2NhbGFyKSB2YWxpZCBVVEYtOCBmaWxlLCB3aXRob3V0IGFueSB1bmNvdXBsZWQgVUNTLTQgY2hhcmFjdGVyIGNvZGUuYCk7IH1cbn07XG5cbmxldCBob2xkaW5nICAgICAgICAgID0gZmFsc2U7XG5cbmNvbnN0IHBhcnNlID0gKHNvdXJjZSAgICAgICAgLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgYmlnaW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBhcmdzTW9kZSAgICAgICAgICAgICAgICAgKSAgICAgICAgPT4ge1xuXHRsZXQgc291cmNlUGF0aCAgICAgICAgID0gJyc7XG5cdGlmICggdHlwZW9mIHNvdXJjZT09PSdvYmplY3QnICYmIHNvdXJjZSApIHtcblx0XHRpZiAoIGlzQXJyYXkoc291cmNlKSApIHsgdGhyb3cgVHlwZUVycm9yKGlzTGluZXNGcm9tU3RyaW5naWZ5KHNvdXJjZSkgPyBgVE9NTC5wYXJzZShhcnJheSBmcm9tIFRPTUwuc3RyaW5naWZ5KCx7bmV3bGluZT99KSlgIDogYFRPTUwucGFyc2UoYXJyYXkpYCk7IH1cblx0XHRlbHNlIGlmICggaXNCaW5hcnlMaWtlKHNvdXJjZSkgKSB7IHNvdXJjZSA9IGJpbmFyeTJzdHJpbmcoc291cmNlKTsgfVxuXHRcdGVsc2Uge1xuXHRcdFx0c291cmNlUGF0aCA9IHNvdXJjZS5wYXRoO1xuXHRcdFx0aWYgKCB0eXBlb2Ygc291cmNlUGF0aCE9PSdzdHJpbmcnICkgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLnBhdGgpYCk7IH1cblx0XHRcdGNvbnN0IHsgZGF0YSwgcmVxdWlyZTogcmVxID0gdHlwZW9mIHJlcXVpcmU9PT0nZnVuY3Rpb24nID8gcmVxdWlyZSA6IHVuZGVmaW5lZCB9ID0gc291cmNlO1xuXHRcdFx0aWYgKCByZXEgKSB7XG5cdFx0XHRcdGNvbnN0IHsgcmVzb2x2ZSB9ID0gcmVxO1xuXHRcdFx0XHRpZiAoIHJlc29sdmUhPW51bGwgKSB7XG5cdFx0XHRcdFx0Y29uc3QgeyBwYXRocyB9ID0gcmVzb2x2ZTtcblx0XHRcdFx0XHRpZiAoIHBhdGhzIT1udWxsICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmV0ID0gYXBwbHkocGF0aHMsIHJlc29sdmUsIFsgJycgXSk7XG5cdFx0XHRcdFx0XHRpZiAoIHJldCE9bnVsbCApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsID0gcmV0WzBdO1xuXHRcdFx0XHRcdFx0XHRpZiAoIHZhbCE9bnVsbCApIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBkaXJuYW1lXyA9IHZhbC5yZXBsYWNlKC9ub2RlX21vZHVsZXMkLywgJycpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggZGlybmFtZV8gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzb3VyY2VQYXRoID0gKCByZXEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKCdwYXRoJykucmVzb2x2ZShkaXJuYW1lXywgc291cmNlUGF0aCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBzb3VyY2VQYXRoIT09J3N0cmluZycgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucmVxdWlyZSgncGF0aCcpLnJlc29sdmUpYCk7IH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBkYXRhPT09dW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSAoIHJlcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSgnZnMnKS5yZWFkRmlsZVN5bmMoc291cmNlUGF0aCk7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNCaW5hcnlMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdFx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UucmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMpYCk7IH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nc3RyaW5nJyApIHsgYXNzZXJ0RnVsU2NhbGFyKHNvdXJjZSA9IGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNCaW5hcnlMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLmRhdGEpYCk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoIGRhdGE9PT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UuZGF0YXxzb3VyY2UucmVxdWlyZSlgKTsgfVxuXHRcdFx0XHRlbHNlIGlmICggdHlwZW9mIGRhdGE9PT0nc3RyaW5nJyApIHsgYXNzZXJ0RnVsU2NhbGFyKHNvdXJjZSA9IGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKCB0eXBlb2YgZGF0YT09PSdvYmplY3QnICYmIGRhdGEgJiYgaXNCaW5hcnlMaWtlKGRhdGEpICkgeyBzb3VyY2UgPSBiaW5hcnkyc3RyaW5nKGRhdGEpOyB9XG5cdFx0XHRcdGVsc2UgeyB0aHJvdyBUeXBlRXJyb3IoYFRPTUwucGFyc2Uoc291cmNlLmRhdGEpYCk7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBzb3VyY2U9PT0nc3RyaW5nJyApIHsgYXNzZXJ0RnVsU2NhbGFyKHNvdXJjZSk7IH1cblx0ZWxzZSB7IHRocm93IFR5cGVFcnJvcihgVE9NTC5wYXJzZShzb3VyY2UpYCk7IH1cblx0bGV0IGpvaW5lciAgICAgICAgICAgICAgICAgICAgO1xuXHRsZXQga2V5cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0aWYgKCB0eXBlb2YgbXVsdGlsaW5lU3RyaW5nSm9pbmVyPT09J29iamVjdCcgJiYgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICkge1xuXHRcdGlmICggYmlnaW50IT09dW5kZWZpbmVkIHx8IHghPT11bmRlZmluZWQgKSB7IHRocm93IFR5cGVFcnJvcihgb3B0aW9ucyBtb2RlID8gYXJncyBtb2RlYCk7IH1cblx0XHRqb2luZXIgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIuam9pbmVyO1xuXHRcdGJpZ2ludCA9IG11bHRpbGluZVN0cmluZ0pvaW5lci5iaWdpbnQ7XG5cdFx0a2V5cyA9IG11bHRpbGluZVN0cmluZ0pvaW5lci5rZXlzO1xuXHRcdHggPSBtdWx0aWxpbmVTdHJpbmdKb2luZXIueDtcblx0XHRhcmdzTW9kZSA9ICcnO1xuXHR9XG5cdGVsc2UgeyBqb2luZXIgPSBtdWx0aWxpbmVTdHJpbmdKb2luZXI7IH1cblx0bGV0IHJvb3RUYWJsZSAgICAgICA7XG5cdGxldCBwcm9jZXNzICAgICAgICAgICAgICAgICA7XG5cdGlmICggaG9sZGluZyApIHsgdGhyb3cgRXJyb3IoYHBhcnNpbmcgZHVyaW5nIHBhcnNpbmcuYCk7IH1cblx0aG9sZGluZyA9IHRydWU7XG5cdHRyeSB7XG5cdFx0b3B0aW9ucy51c2Uoc3BlY2lmaWNhdGlvblZlcnNpb24sIGpvaW5lciwgYmlnaW50LCBrZXlzLCB4LCBhcmdzTW9kZSk7XG5cdFx0aXRlcmF0b3IudG9kbyhzb3VyY2UsIHNvdXJjZVBhdGgpO1xuXHRcdHNvdXJjZSAmJiBzb3VyY2VbMF09PT0nXFx1RkVGRicgJiYgaXRlcmF0b3IudGhyb3dzKFR5cGVFcnJvcihgVE9NTCBjb250ZW50IChzdHJpbmcpIHNob3VsZCBub3Qgc3RhcnQgd2l0aCBCT00gKFUrRkVGRilgICsgaXRlcmF0b3Iud2hlcmUoJyBhdCAnKSkpO1xuXHRcdHJvb3RUYWJsZSA9IFJvb3QoKTtcblx0XHRwcm9jZXNzID0gb3B0aW9ucy5Qcm9jZXNzKCk7XG5cdH1cblx0ZmluYWxseSB7XG5cdFx0aXRlcmF0b3IuZG9uZSgpOy8vY2xlYXJXZWFrU2V0cygpO1xuXHRcdG9wdGlvbnMuY2xlYXIoKTtcblx0XHRob2xkaW5nID0gZmFsc2U7XG5cdFx0Y2xlYXJSZWdFeHAoKTtcblx0fVxuXHRwcm9jZXNzICYmIHByb2Nlc3MoKTtcblx0cmV0dXJuIHJvb3RUYWJsZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IC8qI19fUFVSRV9fKi9hc3NpZ24oXG5cdChzb3VyY2UgICAgICAgICwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+XG5cdFx0dHlwZW9mIHNwZWNpZmljYXRpb25WZXJzaW9uPT09J251bWJlcidcblx0XHRcdD8gcGFyc2Uoc291cmNlLCBzcGVjaWZpY2F0aW9uVmVyc2lvbiwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCwnKVxuXHRcdFx0OiBwYXJzZShzb3VyY2UsIDEuMCwgc3BlY2lmaWNhdGlvblZlcnNpb24gICAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAgLCAnLCcpXG5cdCxcblx0e1xuXHRcdCcxLjAnOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDEuMDogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAxLjAsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjU6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC41LCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC40OiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuNCwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHRcdDAuMzogKHNvdXJjZSAgICAgICAgLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIgICAgICAgICAsIHVzZUJpZ0ludCAgICAgICAgICAgICAgICAgICAsIHhPcHRpb25zICAgICAgICAgICAgICAgICAgICkgPT4gcGFyc2Uoc291cmNlLCAwLjMsIG11bHRpbGluZVN0cmluZ0pvaW5lciwgdXNlQmlnSW50LCB4T3B0aW9ucywgJywnKSxcblx0XHQwLjI6IChzb3VyY2UgICAgICAgICwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyICAgICAgICAgLCB1c2VCaWdJbnQgICAgICAgICAgICAgICAgICAgLCB4T3B0aW9ucyAgICAgICAgICAgICAgICAgICApID0+IHBhcnNlKHNvdXJjZSwgMC4yLCBtdWx0aWxpbmVTdHJpbmdKb2luZXIsIHVzZUJpZ0ludCwgeE9wdGlvbnMsICcsJyksXG5cdFx0MC4xOiAoc291cmNlICAgICAgICAsIG11bHRpbGluZVN0cmluZ0pvaW5lciAgICAgICAgICwgdXNlQmlnSW50ICAgICAgICAgICAgICAgICAgICwgeE9wdGlvbnMgICAgICAgICAgICAgICAgICAgKSA9PiBwYXJzZShzb3VyY2UsIDAuMSwgbXVsdGlsaW5lU3RyaW5nSm9pbmVyLCB1c2VCaWdJbnQsIHhPcHRpb25zLCAnLCcpLFxuXHR9XG4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHQgXG5cdCAgXG4gIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuIiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuXG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBwYXJzZSBmcm9tICcuL3BhcnNlLyc7XG5pbXBvcnQgc3RyaW5naWZ5LCB7IFNlY3Rpb24sIGlubGluZSwgbXVsdGlsaW5lLCBiYXNpYywgbGl0ZXJhbCB9IGZyb20gJy4vc3RyaW5naWZ5Lyc7XG5pbXBvcnQgeyBPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUgfSBmcm9tICcuL3R5cGVzL0RhdGV0aW1lJztcbmltcG9ydCB7IGlzSW5saW5lLCBpc1NlY3Rpb24gfSBmcm9tICcuL3R5cGVzL25vbi1hdG9tJztcbmltcG9ydCB7IGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzIH0gZnJvbSAnLi90eXBlcy9jb21tZW50JztcblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQnO1xuZXhwb3J0IGRlZmF1bHQgLyojX19QVVJFX18qL0RlZmF1bHQoe1xuXHR2ZXJzaW9uLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxuXHRTZWN0aW9uLCBpbmxpbmUsIG11bHRpbGluZSwgYmFzaWMsIGxpdGVyYWwsIGNvbW1lbnRGb3IsIGNvbW1lbnRGb3JUaGlzLFxuXHRPZmZzZXREYXRlVGltZSwgTG9jYWxEYXRlVGltZSwgTG9jYWxEYXRlLCBMb2NhbFRpbWUsXG5cdGlzSW5saW5lLCBpc1NlY3Rpb24sXG5cdEtleXMsXG59KTtcblxuZXhwb3J0IHtcblx0dmVyc2lvbixcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcblx0U2VjdGlvbiwgaW5saW5lLCBtdWx0aWxpbmUsIGJhc2ljLCBsaXRlcmFsLCBjb21tZW50Rm9yLCBjb21tZW50Rm9yVGhpcyxcblx0T2Zmc2V0RGF0ZVRpbWUsIExvY2FsRGF0ZVRpbWUsIExvY2FsRGF0ZSwgTG9jYWxUaW1lLFxuXHRpc0lubGluZSwgaXNTZWN0aW9uLFxuXHRLZXlzLFxufTtcbiJdLCJuYW1lcyI6WyJUeXBlRXJyb3IiLCJTeW50YXhFcnJvciIsIlJlZ0V4cCIsIlByb3h5IiwiYXBwbHkiLCJjcmVhdGUiLCJXZWFrTWFwIiwiT2JqZWN0X2Fzc2lnbiIsIk9iamVjdF9jcmVhdGUiLCJSZWZsZWN0X2FwcGx5IiwiUmVmbGVjdF9vd25LZXlzIiwiT2JqZWN0X2ZyZWV6ZSIsIldlYWtTZXQiLCJzZXRfZGVsIiwibWFwX2dldCIsIm1hcF9zZXQiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiUmFuZ2VFcnJvciIsInNldF9oYXMiLCJzZXRfYWRkIiwiTnVsbCIsIm9yZGVyaWZ5X051bGwiLCJFcnJvciIsIml0ZXJhdG9yLnRocm93cyIsIml0ZXJhdG9yLndoZXJlIiwiS0VZUyIsInJlZ2V4cHMuc3dpdGNoUmVnRXhwIiwiQmlnSW50IiwiU3ltYm9sIiwiT2JqZWN0IiwiREFURSIsIm9wdGlvbnMuemVyb0RhdGV0aW1lIiwicGFyc2UiLCJwYXJzZUludCIsIm9wdGlvbnMubXVzdFNjYWxhciIsIml0ZXJhdG9yLmxpbmVJbmRleCIsIlVOREVSU0NPUkVTIiwib3B0aW9ucy5hbGxvd0xvbmdlciIsIm9wdGlvbnMudXNpbmdCaWdJbnQiLCJvcHRpb25zLkludGVnZXJNaW5OdW1iZXIiLCJvcHRpb25zLkludGVnZXJNYXhOdW1iZXIiLCJOYU4iLCJfSW5maW5pdHkiLCJvcHRpb25zLnNGbG9hdCIsIm9wdGlvbnMuc0Vycm9yIiwiaXNGaW5pdGUiLCJvcHRpb25zLlRhYmxlIiwib3B0aW9ucy5jb2xsZWN0IiwicmVnZXhwcy5fX0NPTlRST0xfQ0hBUkFDVEVSX0VYQ0xVREVfdGVzdCIsInJlZ2V4cHMuTElURVJBTF9TVFJJTkdfZXhlYyIsIm9wdGlvbnMucHJlc2VydmVMaXRlcmFsIiwicmVnZXhwcy5fX01VTFRJX0xJTkVfTElURVJBTF9TVFJJTkdfZXhlYyIsIml0ZXJhdG9yLm1hcmsiLCJvcHRpb25zLnVzZVdoYXRUb0pvaW5NdWx0aWxpbmVTdHJpbmciLCJvcHRpb25zLkFSR1NfTU9ERSIsInJlZ2V4cHMuQkFTSUNfU1RSSU5HX2V4ZWNfMV9lbmRJbmRleCIsInJlZ2V4cHMuUFJFX1dISVRFU1BBQ0UiLCJyZWdleHBzLk1VTFRJX0xJTkVfQkFTSUNfU1RSSU5HX2V4ZWNfMF9sZW5ndGgiLCJyZWdleHBzLkVTQ0FQRURfRVhDTFVERV9DT05UUk9MX0NIQVJBQ1RFUl90ZXN0Iiwib3B0aW9ucy5LRVlTIiwicmVnZXhwcy5fX0xJVEVSQUxfS0VZX2V4ZWMiLCJyZWdleHBzLl9fQkFSRV9LRVlfZXhlYyIsInJlZ2V4cHMuSVNfRE9UX0tFWSIsInJlZ2V4cHMuRE9UX0tFWSIsIm9wdGlvbnMuZGlzYWJsZURpZ2l0IiwicmVnZXhwcy5pc0FtYXppbmciLCJvcHRpb25zLmVuYWJsZU51bGwiLCJvcHRpb25zLmRpc2FsbG93RW1wdHlLZXkiLCJyZWdleHBzLl9WQUxVRV9QQUlSX2V4ZWMiLCJvcHRpb25zLmFzU3RyaW5ncyIsIm9wdGlvbnMuaW5saW5lVGFibGUiLCJvcHRpb25zLmFzVGFibGVzIiwib3B0aW9ucy5hc0FycmF5cyIsInJlZ2V4cHMuVkFMVUVfUkVTVF9leGVjIiwib3B0aW9ucy5hc0Jvb2xlYW5zIiwib3B0aW9ucy5hc051bGxzIiwib3B0aW9ucy5hc09mZnNldERhdGVUaW1lcyIsIm9wdGlvbnMubW9yZURhdGV0aW1lIiwib3B0aW9ucy5hc0xvY2FsRGF0ZVRpbWVzIiwib3B0aW9ucy5hc0xvY2FsVGltZXMiLCJvcHRpb25zLmFzTG9jYWxEYXRlcyIsIm9wdGlvbnMuYXNGbG9hdHMiLCJvcHRpb25zLmFzSW50ZWdlcnMiLCJyZWdleHBzLlNZTV9XSElURVNQQUNFIiwib3B0aW9ucy5hbGxvd0lubGluZVRhYmxlTXVsdGlsaW5lQW5kVHJhaWxpbmdDb21tYUV2ZW5Ob0NvbW1hIiwib3B0aW9ucy5wcmVzZXJ2ZUNvbW1lbnQiLCJyZWdleHBzLktFWV9WQUxVRV9QQUlSX2V4ZWNfZ3JvdXBzIiwiaXRlcmF0b3IucmVzdCIsIml0ZXJhdG9yLm5leHQiLCJyZWdleHBzLlRBQkxFX0RFRklOSVRJT05fZXhlY19ncm91cHMiLCJBcnJheSIsIkZsb2F0NjRBcnJheSIsIlVpbnQ4QXJyYXkiLCJUZXh0RGVjb2RlciIsImNsZWFyUmVnRXhwIiwib3B0aW9ucy51c2UiLCJpdGVyYXRvci50b2RvIiwib3B0aW9ucy5Qcm9jZXNzIiwiaXRlcmF0b3IuZG9uZSIsIm9wdGlvbnMuY2xlYXIiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSWYsSUFBSSxJQUFJLDZDQUE2QyxJQUFJO0FBQ2hFLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUTtBQUN0QyxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRTtBQUMzQixH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QUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQy9CLENBQUMsUUFBUSxLQUFLLEdBQUcsTUFBTSxHQUFHO0FBQzFCLEVBQUUsSUFBSSxLQUFLO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLEVBQUUsS0FBSyxPQUFPLEtBQUssR0FBRyxRQUFRLEdBQUcsRUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLEVBQUU7QUFDckQsT0FBTztBQUNQLEdBQUcsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNuQyxHQUFHLEtBQUssT0FBTyxZQUFZLEdBQUcsUUFBUSxHQUFHLEVBQUUsTUFBTUEsV0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdkUsR0FBRyxLQUFLLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTUMsYUFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7QUFDN0QsR0FBRyxLQUFLLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTUEsYUFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU7QUFDbkUsR0FBRyxLQUFLLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTUEsYUFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7QUFDbkksR0FBRyxLQUFLLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNQSxh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
