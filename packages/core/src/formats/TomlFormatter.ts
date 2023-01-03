import FileFormatter from './FileFormatter';
import { parse, stringify } from './util/j-toml';

class TomlFormatter extends FileFormatter {
  fromFile(content: string) {
    return parse(content) as object;
  }

  toFile(data: object): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return stringify(data as any, {
      newline: '\n',
    });
  }
}

export default new TomlFormatter();
