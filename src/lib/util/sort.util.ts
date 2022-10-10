import { COMMIT_AUTHOR, COMMIT_DATE } from '../../constants/commitProps';
import { selectField } from './field.util';

import type { Collection } from '../../interface';

export function selectSortDataPath(collection: Collection, key: string) {
  if (key === COMMIT_DATE) {
    return 'updatedOn';
  } else if (key === COMMIT_AUTHOR && !selectField(collection, key)) {
    return 'author';
  } else {
    return `data.${key}`;
  }
}
