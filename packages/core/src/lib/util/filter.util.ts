import { parse } from 'path';

import type { Entry, FieldFilterRule, FilterRule } from '@staticcms/core/interface';

function entryMatchesFieldRule(entry: Entry, filterRule: FieldFilterRule): boolean {
  const fieldValue = entry.data?.[filterRule.field];
  if ('pattern' in filterRule) {
    if (Array.isArray(fieldValue)) {
      return Boolean(fieldValue.find(v => new RegExp(filterRule.pattern).test(String(v))));
    }

    return new RegExp(filterRule.pattern).test(String(fieldValue));
  }

  if (Array.isArray(fieldValue)) {
    if (Array.isArray(filterRule.value)) {
      if (filterRule.matchAll) {
        return Boolean(filterRule.value.every(ruleValue => fieldValue.includes(ruleValue)));
      }

      return Boolean(fieldValue.find(v => filterRule.value.includes(String(v))));
    }

    return fieldValue.includes(filterRule.value);
  }

  if (Array.isArray(filterRule.value)) {
    if (filterRule.matchAll) {
      return Boolean(filterRule.value.every(ruleValue => fieldValue === ruleValue));
    }

    return filterRule.value.includes(String(fieldValue));
  }

  return fieldValue === filterRule.value;
}

function entryMatchesRule(entry: Entry, filterRule: FilterRule) {
  if ('field' in filterRule) {
    return entryMatchesFieldRule(entry, filterRule);
  }

  return new RegExp(filterRule.pattern).test(parse(entry.path).base);
}

export default function filterEntries(entries: Entry[], filterRule: FilterRule | FilterRule[]) {
  return entries.filter(entry => {
    if (Array.isArray(filterRule)) {
      return filterRule.every(r => entryMatchesRule(entry, r));
    }

    return entryMatchesRule(entry, filterRule);
  });
}
