import isEqual from 'lodash/isEqual';
import { dirname } from 'path';

import { DRAFT_MEDIA_FILES } from '@staticcms/core/constants/mediaLibrary';
import {
  I18N_FIELD_DUPLICATE,
  I18N_FIELD_TRANSLATE,
  duplicateDefaultI18nFields,
  hasI18n,
} from '../i18n';
import { joinUrlPath } from '../urlHelper';
import { isNotNullish } from './null.util';
import { isNotEmpty } from './string.util';

import type { CollectionWithDefaults, EntryData, Field, ObjectValue } from '@staticcms/core';
import type { BaseField, Collection, Entry } from '@staticcms/core/interface';

export function applyDefaultsToDraftData(
  fields: Field[],
  skipField: (field: Field) => boolean = () => false,
  initialValue?: ObjectValue | null,
) {
  const emptyDraftData = fields.reduce(
    (acc, item) => {
      const name = item.name;

      if (skipField(item) || isNotNullish(acc[name])) {
        return acc;
      }

      const subfields = 'fields' in item && item.fields;
      const list = item.widget === 'list';
      const defaultValue = (('default' in item ? item.default : null) ?? null) as EntryData;

      function isEmptyDefaultValue(val: EntryData | EntryData[]) {
        return [[{}], {}].some(e => isEqual(val, e));
      }

      if (subfields) {
        if (list && Array.isArray(defaultValue)) {
          acc[name] = defaultValue;
        } else {
          const asList = Array.isArray(subfields) ? subfields : [subfields];

          const subDefaultValue = list
            ? [applyDefaultsToDraftData(asList, skipField)]
            : applyDefaultsToDraftData(asList, skipField);

          if (!isEmptyDefaultValue(subDefaultValue)) {
            acc[name] = subDefaultValue;
          }
        }
        return acc;
      }

      if (defaultValue !== null) {
        acc[name] = defaultValue;
      }

      return acc;
    },
    (initialValue ?? {}) as ObjectValue,
  );

  return emptyDraftData;
}

export function createEmptyDraftData(fields: Field[], skipField?: (field: Field) => boolean) {
  return applyDefaultsToDraftData(fields, skipField);
}

export function createEmptyDraftI18nData(collection: CollectionWithDefaults, dataFields: Field[]) {
  if (!hasI18n(collection)) {
    return {};
  }

  function skipField(field: Field) {
    return field.i18n !== I18N_FIELD_DUPLICATE && field.i18n !== I18N_FIELD_TRANSLATE;
  }

  const i18nData = createEmptyDraftData(dataFields, skipField);
  return duplicateDefaultI18nFields(collection, i18nData);
}

export function createEntryMediaPath<EF extends BaseField>(
  entry: Entry | null | undefined,
  collection: Collection<EF> | null | undefined,
  folder: string,
) {
  const entryPath = entry?.path;
  return isNotEmpty(entryPath)
    ? joinUrlPath(dirname(entryPath), folder)
    : joinUrlPath(
        collection && 'folder' in collection ? collection.folder : '',
        DRAFT_MEDIA_FILES,
        folder,
      );
}
