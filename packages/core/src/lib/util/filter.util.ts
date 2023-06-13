import { parse } from 'path';

import type { Entry, FieldFilterRule, FilterRule } from '@staticcms/core/interface';

export function entryMatchesFieldRule(entry: Entry, filterRule: FieldFilterRule): boolean {
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
        return Boolean(
          filterRule.value.every(ruleValue =>
            fieldValue.find(v => String(v) === String(ruleValue)),
          ),
        );
      }

      return Boolean(
        fieldValue.find(v =>
          Boolean(
            (filterRule.value as string[]).find(
              filterRuleValue => String(filterRuleValue) === String(v),
            ),
          ),
        ),
      );
    }

    return Boolean(fieldValue.find(v => String(v) === String(filterRule.value)));
  }

  if (Array.isArray(filterRule.value)) {
    if (filterRule.matchAll) {
      return Boolean(filterRule.value.every(ruleValue => String(fieldValue) === String(ruleValue)));
    }

    return Boolean(filterRule.value.find(v => String(v) === String(fieldValue)));
  }

  return String(fieldValue) === String(filterRule.value);
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
