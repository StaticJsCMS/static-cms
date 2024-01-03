/* eslint-disable import/prefer-default-export */
import type { Entry } from '@staticcms/core';

export function getEntryId(entry: Entry) {
  return `${entry.collection}|${entry.slug}`;
}
