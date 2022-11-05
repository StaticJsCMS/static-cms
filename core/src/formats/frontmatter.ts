import matter from 'gray-matter';

import YamlFormatter from './YamlFormatter';
import JsonFormatter from './JsonFormatter';
import { FileFormatter } from './FileFormatter';

const Languages = {
  YAML: 'yaml',
  JSON: 'json',
} as const;

type Language = typeof Languages[keyof typeof Languages];

export type Delimiter = string | [string, string];
type Format = { language: Language; delimiters: Delimiter };

const parsers = {
  json: {
    parse: (input: string) => {
      let JSONinput = input.trim();
      // Fix JSON if leading and trailing brackets were trimmed.
      if (JSONinput.slice(0, 1) !== '{') {
        JSONinput = '{' + JSONinput + '}';
      }
      return JsonFormatter.fromFile(JSONinput);
    },
    stringify: (metadata: object) => {
      let JSONoutput = JsonFormatter.toFile(metadata).trim();
      // Trim leading and trailing brackets.
      if (JSONoutput.slice(0, 1) === '{' && JSONoutput.slice(-1) === '}') {
        JSONoutput = JSONoutput.slice(1, -1);
      }
      return JSONoutput;
    },
  },
  yaml: {
    parse: (input: string) => YamlFormatter.fromFile(input),
    stringify: (
      metadata: object,
      opts?: { sortedKeys?: string[]; comments?: Record<string, string> },
    ) => {
      const { sortedKeys, comments } = opts || {};
      return YamlFormatter.toFile(metadata, sortedKeys, comments);
    },
  },
};

function inferFrontmatterFormat(str: string) {
  const lineEnd = str.indexOf('\n');
  const firstLine = str.slice(0, lineEnd !== -1 ? lineEnd : 0).trim();
  if (firstLine.length > 3 && firstLine.slice(0, 3) === '---') {
    return;
  }
  switch (firstLine) {
    case '---':
      return getFormatOpts(Languages.YAML);
    case '{':
      return getFormatOpts(Languages.JSON);
    default:
      console.warn('Unrecognized front-matter format.');
  }
}

export function getFormatOpts(format?: Language, customDelimiter?: Delimiter) {
  if (!format) {
    return undefined;
  }

  const formats: { [key in Language]: Format } = {
    yaml: { language: Languages.YAML, delimiters: '---' },
    json: { language: Languages.JSON, delimiters: ['{', '}'] },
  };

  const { language, delimiters } = formats[format];

  return {
    language,
    delimiters: customDelimiter || delimiters,
  };
}

export class FrontmatterFormatter extends FileFormatter {
  format?: Format;

  constructor(format?: Language, customDelimiter?: Delimiter) {
    super();
    this.format = getFormatOpts(format, customDelimiter);
  }

  fromFile(content: string) {
    const format = this.format || inferFrontmatterFormat(content);
    const result = matter(content, { engines: parsers, ...format });
    // in the absent of a body when serializing an entry we use an empty one
    // when calling `toFile`, so we don't want to add it when parsing.
    return {
      ...result.data,
      ...(result.content.trim() && { body: result.content }),
    };
  }

  toFile(
    data: { body?: string } & Record<string, unknown>,
    sortedKeys?: string[],
    comments?: Record<string, string>,
  ) {
    const { body = '', ...meta } = data;

    // Stringify to YAML if the format was not set
    const format = this.format || getFormatOpts(Languages.YAML);

    // gray-matter always adds a line break at the end which trips our
    // change detection logic
    // https://github.com/jonschlinkert/gray-matter/issues/96
    const trimLastLineBreak = body.slice(-1) !== '\n';
    const file = matter.stringify(body, meta, {
      engines: parsers,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore `sortedKeys` is not recognized by gray-matter, so it gets passed through to the parser
      sortedKeys,
      comments,
      ...format,
    });
    return trimLastLineBreak && file.slice(-1) === '\n' ? file.slice(0, -1) : file;
  }
}

export const FrontmatterInfer = new FrontmatterFormatter();

export function frontmatterYAML(customDelimiter?: Delimiter) {
  return new FrontmatterFormatter(Languages.YAML, customDelimiter);
}

export function frontmatterJSON(customDelimiter?: Delimiter) {
  return new FrontmatterFormatter(Languages.JSON, customDelimiter);
}
