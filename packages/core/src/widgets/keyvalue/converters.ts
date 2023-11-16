import { createEmptyPair } from './util';

import type { FieldStorageConverters, KeyValueField } from '@staticcms/core';
import type { Pair } from './types';

const converters: FieldStorageConverters<Pair[], KeyValueField, Record<string, string>> = {
  deserialize(storageValue) {
    return storageValue
      ? Object.keys(storageValue).map(key => ({
          key,
          value: storageValue[key] ?? '',
        }))
      : [createEmptyPair()];
  },
  serialize(cmsValue) {
    return cmsValue?.reduce(
      (acc, pair) => {
        acc[pair.key] = pair.value;
        return acc;
      },
      {} as Record<string, string>,
    );
  },
};

export default converters;
