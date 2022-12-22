export as namespace TOML;
export = exports;

declare namespace exports {
  export const version: '1.36.0';

  export const parse: {
    (
      this: void,
      source: Source,
      specificationVersion: 1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1,
      multilineStringJoiner?: string,
      useBigInt?: boolean | number,
      xOptions?: XOptions,
    ): Table;
    (
      this: void,
      source: Source,
      multilineStringJoiner?: string,
      useBigInt?: boolean | number,
      xOptions?: XOptions,
    ): Table;
    (
      this: void,
      source: Source,
      options?: {
        readonly joiner?: string;
        readonly bigint?: boolean | number;
        readonly x?: XOptions;
      },
    ): Table;
  } & {
    readonly [SpecificationVersion in 1.0 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1]: {
      (
        this: void,
        source: Source,
        multilineStringJoiner?: string,
        useBigInt?: boolean | number,
        xOptions?: XOptions,
      ): Table;
      (
        this: void,
        source: Source,
        options?: {
          readonly joiner?: string;
          readonly bigint?: boolean | number;
          readonly x?: XOptions;
        },
      ): Table;
    };
  };

  export function stringify(
    this: void,
    rootTable: ReadonlyTable,
    options?: {
      readonly integer?: number;
      readonly newline?: '\n' | '\r\n';
      readonly newlineAround?: 'document' | 'section' | 'header' | 'pairs' | 'pair';
      readonly indent?: string | number;
      readonly T?: 'T' | 't' | ' ';
      readonly Z?: 'Z' | 'z';
      readonly xNull?: boolean;
      readonly xBeforeNewlineInMultilineTable?: ',' | '';
      readonly forceInlineArraySpacing?: 0 | 1 | 2 | 3;
    },
  ): string;

  export function isSection(this: void, table: ReadonlyTable): boolean;
  export function isInline(this: void, value: ReadonlyTable | ReadonlyArray): boolean;

  export function Section<T extends ReadonlyTable>(this: void, table: T): T;
  export function inline<T extends ReadonlyArray>(
    this: void,
    value: T,
    inlineMode?: 0 | 1 | 2 | 3,
  ): T;
  export function inline<T extends ReadonlyTable>(this: void, value: T): T;
  export const multiline: {
    readonly array: {
      <T extends ReadonlyArray>(this: void, array: T): T;
    };
    <T extends ReadonlyTable>(this: void, table: T): T;
    (this: void, value: string): {
      [_literal]: [`"""`, ...string[], `${string}"""`] | [`'''`, ...string[], `${string}'''`];
    } & object &
      String;
    (this: void, lines: readonly string[]): {
      [_literal]: [`"""`, ...string[], `${string}"""`] | [`'''`, ...string[], `${string}'''`];
    } & object;
    (this: void, lines: readonly string[], value: string): {
      [_literal]: [`"""`, ...string[], `${string}"""`] | [`'''`, ...string[], `${string}'''`];
    } & object &
      String;
    readonly basic: {
      (this: void, value: string): { [_literal]: [`"""`, ...string[], `${string}"""`] } & object &
        String;
      (this: void, lines: readonly string[]): {
        [_literal]: [`"""`, ...string[], `${string}"""`];
      } & object;
      (this: void, lines: readonly string[], value: string): {
        [_literal]: [`"""`, ...string[], `${string}"""`];
      } & object &
        String;
    };
  };
  export function basic(this: void, value: string): { [_literal]: `"${string}"` } & object & String;
  export function literal(
    this: void,
    literal: string,
  ): { [_literal]: string | [string, ...string[]] } & object;
  export function literal(
    this: void,
    literal: string,
    value: string,
  ): { [_literal]: string | [string, ...string[]] } & object & String;
  export function literal(
    this: void,
    literal: string,
    value: number,
  ): { [_literal]: string | [string, ...string[]] } & object & Number;
  export function literal(
    this: void,
    literal: string,
    value: bigint,
  ): { [_literal]: string | [string, ...string[]] } & object & BigInt;
  export function literal(
    this: void,
    literal: TemplateStringsArray,
    ...chars: string[]
  ): { [_literal]: string | [string, ...string[]] } & object;

  export function commentFor(this: void, key: string): symbol;
  export const commentForThis: unique symbol;

  export { OffsetDateTime, LocalDateTime, LocalDate, LocalTime, Keys };

  export { exports as default };
}

declare class OffsetDateTime {
  readonly toJSON: Date['toJSON'];

  readonly toISOString: (
    this: Readonly<OffsetDateTime>,
  ) => `${number}-${number}-${number}T${number}:${number}:${number}${'' | `.${number}`}${
    | 'Z'
    | `${'+' | '-'}${number}:${number}`}`;
  readonly valueOf: (this: Readonly<OffsetDateTime>) => `${number}${'' | `.${number}`}`;

  private [OffsetDateTime_ISOString]: string;
  private [OffsetDateTime_value]: string;

  constructor(
    literal: `${number}-${number}-${number}${'T' | 't' | ' '}${number}:${number}:${number}${
      | ''
      | `.${number}`}${'Z' | 'z' | `${'+' | '-'}${number}:${number}`}`,
  );

  readonly getUTCFullYear: (this: Readonly<OffsetDateTime>) => _1_10000;
  readonly getUTCMonth: (this: Readonly<OffsetDateTime>) => _0_11;
  readonly getUTCDate: (this: Readonly<OffsetDateTime>) => _1_31;

  readonly getUTCHours: (this: Readonly<OffsetDateTime>) => _0_23;
  readonly getUTCMinutes: (this: Readonly<OffsetDateTime>) => _0_59;
  readonly getUTCSeconds: (this: Readonly<OffsetDateTime>) => _0_59;
  readonly getUTCMilliseconds: (this: Readonly<OffsetDateTime>) => _0_999;

  readonly getUTCDay: (this: Readonly<OffsetDateTime>) => _0_6;
  readonly getTimezoneOffset: (this: Readonly<OffsetDateTime>) => _1439_1439;
  readonly getTime: (this: Readonly<OffsetDateTime>) => number;
}
declare class LocalDateTime {
  readonly toJSON: Date['toJSON'];

  readonly toISOString: (
    this: Readonly<LocalDateTime>,
  ) => `${number}-${number}-${number}T${number}:${number}:${number}${'' | `.${number}`}`;
  readonly valueOf: (this: Readonly<LocalDateTime>) => `${number}`;

  private [LocalDateTime_ISOString]: string;
  private [LocalDateTime_value]: string;

  constructor(
    literal: `${number}-${number}-${number}${'T' | 't' | ' '}${number}:${number}:${number}${
      | ''
      | `.${number}`}`,
  );

  readonly getFullYear: (this: Readonly<LocalDateTime>) => _0_9999;
  readonly setFullYear: (this: LocalDateTime, year: _0_9999) => void;
  readonly getMonth: (this: Readonly<LocalDateTime>) => _0_11;
  readonly setMonth: (this: LocalDateTime, month: _0_11) => void;
  readonly getDate: (this: Readonly<LocalDateTime>) => _1_31;
  readonly setDate: (this: LocalDateTime, date: _1_31) => void;

  readonly getHours: (this: Readonly<LocalDateTime>) => _0_23;
  readonly setHours: (this: LocalDateTime, hours: _0_23) => void;
  readonly getMinutes: (this: Readonly<LocalDateTime>) => _0_59;
  readonly setMinutes: (this: LocalDateTime, min: _0_59) => void;
  readonly getSeconds: (this: Readonly<LocalDateTime>) => _0_59;
  readonly setSeconds: (this: LocalDateTime, sec: _0_59) => void;
  readonly getMilliseconds: (this: Readonly<LocalDateTime>) => _0_999;
  readonly setMilliseconds: (this: LocalDateTime, ms: _0_999) => void;
}
declare class LocalDate {
  readonly toJSON: Date['toJSON'];

  readonly toISOString: (this: Readonly<LocalDate>) => `${number}-${number}-${number}`;
  readonly valueOf: (this: Readonly<LocalDate>) => `${number}`;

  private [LocalDate_ISOString]: string;
  private [LocalDate_value]: string;

  constructor(literal: `${number}-${number}-${number}`);

  readonly getFullYear: (this: Readonly<LocalDate>) => _0_9999;
  readonly setFullYear: (this: LocalDate, year: _0_9999) => void;
  readonly getMonth: (this: Readonly<LocalDate>) => _0_11;
  readonly setMonth: (this: LocalDate, month: _0_11) => void;
  readonly getDate: (this: Readonly<LocalDate>) => _1_31;
  readonly setDate: (this: LocalDate, date: _1_31) => void;
}
declare class LocalTime {
  readonly toJSON: Date['toJSON'];

  readonly toISOString: (
    this: Readonly<LocalTime>,
  ) => `${number}:${number}:${number}${'' | `.${number}`}`;
  readonly valueOf: (this: Readonly<LocalTime>) => `${number}`;

  private [LocalTime_ISOString]: string;
  private [LocalTime_value]: string;

  constructor(literal: `${number}:${number}:${number}${'' | `.${number}`}`);

  readonly getHours: (this: Readonly<LocalTime>) => _0_23;
  readonly setHours: (this: LocalTime, hours: _0_23) => void;
  readonly getMinutes: (this: Readonly<LocalTime>) => _0_59;
  readonly setMinutes: (this: LocalTime, min: _0_59) => void;
  readonly getSeconds: (this: Readonly<LocalTime>) => _0_59;
  readonly setSeconds: (this: LocalTime, sec: _0_59) => void;
  readonly getMilliseconds: (this: Readonly<LocalTime>) => _0_999;
  readonly setMilliseconds: (this: LocalTime, ms: _0_999) => void;
}

declare class Keys extends RegExp {
  readonly lastIndex: number;
  constructor(keys: ArrayLike<string>);
  readonly test: (this: Keys, key: string) => boolean;
}

declare const _literal: unique symbol;

type Source =
  | string
  | ArrayBufferLike
  | {
      readonly path: string;
      readonly data?: undefined;
      readonly require:
        | {
            readonly resolve?: { readonly paths?: undefined };
            (this: void, id: 'fs'): {
              readonly readFileSync: (this: void, path: string) => ArrayBufferLike;
            };
          }
        | {
            readonly resolve: { readonly paths: (this: void, request: string) => null | string[] };
            (this: void, id: 'path'): {
              readonly resolve: (this: void, dirname: string, filename: string) => string;
            };
            (this: void, id: 'fs'): {
              readonly readFileSync: (this: void, path: string) => ArrayBufferLike;
            };
          };
    }
  | {
      readonly path: string;
      readonly data: string | ArrayBufferLike;
      readonly require?:
        | {
            readonly resolve?: { readonly paths?: undefined };
          }
        | {
            readonly resolve: { readonly paths: (this: void, request: string) => null | string[] };
            (this: void, id: 'path'): {
              readonly resolve: (this: void, dirname: string, filename: string) => string;
            };
          };
    };

type XOptions = null | {
  readonly keys?: null | Keys;
  readonly order?: boolean;
  readonly exact?: boolean;
  readonly multi?: boolean;
  readonly longer?: boolean;
  readonly string?: boolean;
  readonly comment?: boolean;
  readonly literal?: boolean;
  readonly null?: boolean;
  readonly tag?:
    | null
    | (<
        Table extends object & { [key: string | symbol]: any },
        Key extends string | symbol,
        Array extends any[],
        Index extends number,
        Tag extends string,
      >(
        this: void,
        each:
          | { table: Table; key: Key; tag: Tag }
          | { array: Array; index: Index; tag: Tag }
          | { table: Table; key: Key; array: Array; index: Index; tag: Tag },
      ) => void);
};

type ReadonlyTable = object & { readonly [key: string]: ReadonlyValue };
type ReadonlyArray = readonly ReadonlyValue[];
type ReadonlyValue =
  | ({ readonly [_literal]: string | readonly [string, ...string[]] } & object)
  | null
  | boolean
  | bigint
  | number
  | string
  | ReadonlyDatetime
  | ReadonlyArray
  | ReadonlyTable;
interface ReadonlyDatetime {
  readonly toISOString: (this: this) => string;
}

type Table = object & { [key: string]: Value };
type Array = Value[];
type Value =
  | (object & BigInt & { [_literal]: string })
  | (object & Number & { [_literal]: string })
  | (object & String & { [_literal]: string | [string, ...string[]] })
  | null
  | boolean
  | bigint
  | number
  | string
  | Datetime
  | Array
  | Table;
type Datetime = OffsetDateTime | LocalDateTime | LocalDate | LocalTime;
declare const OffsetDateTime_ISOString: unique symbol;
declare const OffsetDateTime_value: unique symbol;
declare const LocalDateTime_ISOString: unique symbol;
declare const LocalDateTime_value: unique symbol;
declare const LocalDate_ISOString: unique symbol;
declare const LocalDate_value: unique symbol;
declare const LocalTime_ISOString: unique symbol;
declare const LocalTime_value: unique symbol;

type _1439_1439 = -1439 | ({} & number) | 1439;
type _1_10000 = -1 | ({} & number) | 10000;
type _0_9999 = 0 | ({} & number) | 9999;
type _0_999 = 0 | ({} & number) | 999;
type _0_6 = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type _0_11 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type _0_23 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;
type _1_31 =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
type _0_59 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59;
