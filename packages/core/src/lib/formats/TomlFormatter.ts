import { stringify, parse } from 'iarna-toml-esm';

import FileFormatter from './FileFormatter';

class TomlFormatter extends FileFormatter {
  fromFile(content: string) {
    return parse(content) as object;
  }

  toFile(data: object): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return stringify(data as any);
  }
}

export default new TomlFormatter();
