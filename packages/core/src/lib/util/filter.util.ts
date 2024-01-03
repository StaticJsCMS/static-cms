import get from 'lodash/get';
import { parse } from 'path';

import { isNullish } from './null.util';

import type { Entry, FieldFilterRule, FilterRule, ValueOrNestedValue } from '@staticcms/core';

function valueToString(value: ValueOrNestedValue) {
  if (Array.isArray(value) || (typeof value === 'object' && !(value instanceof Date))) {
    return JSON.stringify(value);
  }

  if (isNullish(value)) {
    return '';
  }

  return String(value);
}

export function entryMatchesFieldRule(
  entry: Entry,
  filterRule: FieldFilterRule,
  listItemPath: string | undefined,
): boolean {
  const searchInArray = /\.\*$/.test(filterRule.field);

  let field = filterRule.field;
  if (searchInArray) {
    field = field.replace(/\.\*$/, '');
  }

  const fieldValue = get(entry.data, listItemPath ? `${listItemPath}.${field}` : field);
  if ('pattern' in filterRule) {
    if (Array.isArray(fieldValue) && searchInArray) {
      return Boolean(
        fieldValue.find(v => {
          return new RegExp(filterRule.pattern).test(valueToString(v));
        }),
      );
    }

    return new RegExp(filterRule.pattern).test(valueToString(fieldValue));
  }

  if (Array.isArray(fieldValue) && searchInArray) {
    if (Array.isArray(filterRule.value)) {
      if (filterRule.matchAll) {
        return Boolean(
          filterRule.value.every(ruleValue =>
            fieldValue.find(v => valueToString(v) === valueToString(ruleValue)),
          ),
        );
      }

      return Boolean(
        fieldValue.find(v =>
          Boolean(
            (filterRule.value as string[]).find(
              filterRuleValue => valueToString(filterRuleValue) === valueToString(v),
            ),
          ),
        ),
      );
    }

    return Boolean(fieldValue.find(v => valueToString(v) === valueToString(filterRule.value)));
  }

  if (Array.isArray(filterRule.value)) {
    if (filterRule.matchAll) {
      return Boolean(
        filterRule.value.every(ruleValue => valueToString(fieldValue) === valueToString(ruleValue)),
      );
    }

    return Boolean(filterRule.value.find(v => valueToString(v) === valueToString(fieldValue)));
  }

  return valueToString(fieldValue) === valueToString(filterRule.value);
}

function entryMatchesRule(entry: Entry, filterRule: FilterRule, listItemPath: string | undefined) {
  if ('field' in filterRule) {
    return entryMatchesFieldRule(entry, filterRule, listItemPath);
  }

  return new RegExp(filterRule.pattern).test(parse(entry.path).base);
}

export default function filterEntries(
  entries: Entry[],
  filterRule: FilterRule | FilterRule[],
  listItemPath: string | undefined,
) {
  return entries.filter(entry => {
    if (Array.isArray(filterRule)) {
      return filterRule.every(r => entryMatchesRule(entry, r, listItemPath));
    }

    return entryMatchesRule(entry, filterRule, listItemPath);
  });
}
