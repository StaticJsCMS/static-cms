import toml from '@iarna/toml';
import moment from 'moment';
import tomlify from 'tomlify-j0.4';

import AssetProxy from '../valueObjects/AssetProxy';
import { sortKeys } from './helpers';
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
    return toml.parse(content);
  }

  toFile(data: object, sortedKeys: string[] = []): string {
    return tomlify.toToml(data as object, { replace: outputReplacer, sort: sortKeys(sortedKeys) });
  }
}

export default new TomlFormatter();
