import deepmerge from 'deepmerge';
import * as fuzzy from 'fuzzy';

import type { Entry, ObjectValue, ValueOrNestedValue } from '@staticcms/core';

function filter(
  value: ValueOrNestedValue,
  remainingPath: string[],
  searchTerm: string,
): ValueOrNestedValue {
  if (Array.isArray(value)) {
    const [nextPath, ...rest] = remainingPath;
    if (nextPath !== '*') {
      return value;
    }

    if (rest.length === 1) {
      const validOptions = value.filter(e => {
        if (!e || Array.isArray(e) || typeof e !== 'object' || e instanceof Date) {
          return false;
        }

        return true;
      }) as ObjectValue[];

      return validOptions.length > 0
        ? fuzzy
            .filter(searchTerm, validOptions, {
              extract: input => {
                return String(input[rest[0]]);
              },
            })
            .sort(sortByScore)
            .map(f => f.original)
        : [];
    }

    return value.map(childValue => {
      return filter(childValue, rest, searchTerm);
    });
  }

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const newValue = { ...value };

    const [nextPath, ...rest] = remainingPath;

    const childValue = newValue[nextPath];
    if (
      childValue &&
      (Array.isArray(childValue) ||
        (typeof childValue === 'object' && !(childValue instanceof Date)))
    ) {
      newValue[nextPath] = filter(childValue, rest, searchTerm);
    }

    return newValue;
  }

  return value;
}

export function fileSearch(
  entry: Entry | undefined,
  searchFields: string[],
  searchTerm: string,
): Entry[] {
  if (!entry) {
    return [];
  }

  return [
    {
      ...entry,
      data: searchFields.reduce(
        (acc, searchField) =>
          deepmerge(acc, filter(entry.data, searchField.split('.'), searchTerm) as ObjectValue),
        {},
      ),
    },
  ];
}

export function sortByScore<T>(a: fuzzy.FilterResult<T>, b: fuzzy.FilterResult<T>) {
  if (a.score > b.score) {
    return -1;
  }

  if (a.score < b.score) {
    return 1;
  }

  return 0;
}
