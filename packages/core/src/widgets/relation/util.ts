import get from 'lodash/get';

import { isNullish } from '@staticcms/core/lib/util/null.util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import {
  addFileTemplateFields,
  compileStringTemplate,
  expandPath,
  extractTemplateVars,
} from '@staticcms/core/lib/widgets/stringTemplate';

import type {
  Entry,
  Field,
  RelationField,
  UnknownField,
  ValueOrNestedValue,
} from '@staticcms/core';
import type { HitOption } from './types';

export function parseNestedFields(
  hit: Entry,
  field: string,
  locale: string | undefined,
  searchCollectionFields: Field<UnknownField>[],
): string {
  const hitData =
    locale != null && hit.i18n != null && hit.i18n[locale] != null
      ? hit.i18n[locale].data
      : hit.data;

  const templateVars = extractTemplateVars(field);
  // return non template fields as is
  if (templateVars.length <= 0) {
    return get(hitData, field) as string;
  }
  const data = addFileTemplateFields(hit.path, hitData);
  return compileStringTemplate(field, null, hit.slug, data, searchCollectionFields);
}

export function parseHitOptions(
  hits: Entry[],
  field: RelationField,
  locale: string | undefined,
  searchCollectionFields: Field<UnknownField>[],
): HitOption[] {
  const valueField = field.value_field;
  const displayField = field.display_fields || [field.value_field];

  return hits.reduce((acc, hit) => {
    const valuesPaths = expandPath({ data: hit.data, path: valueField });
    for (let i = 0; i < valuesPaths.length; i++) {
      const value = parseNestedFields(
        hit,
        valuesPaths[i],
        locale,
        searchCollectionFields,
      ) as string;

      const label = displayField
        .map(key => {
          const displayPaths = expandPath({ data: hit.data, path: key });
          const path = displayPaths[i] ?? displayPaths[0];
          if (isNullish(path) || isEmpty(path)) {
            return value;
          }
          return parseNestedFields(
            hit,
            displayPaths[i] ?? displayPaths[0],
            locale,
            searchCollectionFields,
          );
        })
        .join(' ');

      acc.push({ data: hit.data, value, label });
    }

    return acc;
  }, [] as HitOption[]);
}

export function getSelectedOptions(value: HitOption[] | undefined | null): HitOption[] | null;
export function getSelectedOptions(value: string[] | undefined | null): string[] | null;
export function getSelectedOptions(
  value: ValueOrNestedValue[] | undefined | null,
): ValueOrNestedValue[] | null;
export function getSelectedOptions(value: ValueOrNestedValue[] | HitOption[] | undefined | null) {
  if (!value || !Array.isArray(value)) {
    return null;
  }

  return value;
}

export function getSelectedValue(
  value: string,
  options: HitOption[],
  isMultiple: boolean,
): string | null;
export function getSelectedValue(
  value: string[],
  options: HitOption[],
  isMultiple: boolean,
): string[] | null;
export function getSelectedValue(
  value: string | string[] | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): string | string[] | null;
export function getSelectedValue(
  value: ValueOrNestedValue | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): ValueOrNestedValue | ValueOrNestedValue[] | null;
export function getSelectedValue(
  value: ValueOrNestedValue | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): string | string[] | null {
  if (isMultiple && Array.isArray(value)) {
    const selectedOptions = getSelectedOptions(value);
    if (selectedOptions === null) {
      return null;
    }

    const selected = selectedOptions
      .map(i => options.find(o => o.value === i))
      .filter(Boolean)
      .map(option => (typeof option === 'string' ? option : option?.value)) as string[];

    return selected;
  } else {
    return options.find(option => option.value === value)?.value ?? null;
  }
}
