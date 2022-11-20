import toml from '@ltd/j-toml';
import moment from 'moment';

import AssetProxy from '../valueObjects/AssetProxy';
import { FileFormatter } from './FileFormatter';

function outputReplacer(_key: string, value: unknown) {
  if (moment.isMoment(value)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return value.format(value._f);
  }
  if (value instanceof AssetProxy) {
    return `${value.path}`;
  }
  if (typeof value === 'number' && Number.isInteger(value)) {
    // Return the string representation of integers so tomlify won't render with tenths (".0")
    return value.toString();
  }
  // Return `false` to use default (`undefined` would delete key).
  return false;
}

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
