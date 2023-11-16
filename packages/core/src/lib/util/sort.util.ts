/* eslint-disable import/prefer-default-export */
import { COMMIT_AUTHOR, COMMIT_DATE } from '@staticcms/core/constants/commitProps';
import { selectField } from './field.util';

import type { CollectionWithDefaults } from '@staticcms/core';

export function selectSortDataPath(collection: CollectionWithDefaults, key: string) {
  if (key === COMMIT_DATE) {
    return 'updatedOn';
  } else if (key === COMMIT_AUTHOR && !selectField(collection, key)) {
    return 'author';
  } else {
    return `data.${key}`;
  }
}
