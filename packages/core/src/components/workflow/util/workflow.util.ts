/* eslint-disable import/prefer-default-export */
import type { Entry } from '@staticcms/core/interface';

export function getEntryId(entry: Entry) {
  return `${entry.collection}|${entry.slug}`;
}
