import toml from '@ltd/j-toml';

import FileFormatter from './FileFormatter';

class TomlFormatter extends FileFormatter {
  fromFile(content: string) {
    return toml.parse(content) as object;
  }

  toFile(data: object): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toml.stringify(data as any, {
      newline: '\n',
    });
  }
}

export default new TomlFormatter();
