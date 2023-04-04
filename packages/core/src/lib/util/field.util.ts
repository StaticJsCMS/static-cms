import get from 'lodash/get';

import { getLocaleDataPath } from '../i18n';
import { keyToPathArray } from '../widgets/stringTemplate';

import type {
  BaseField,
  Collection,
  Entry,
  Field,
  ValueOrNestedValue,
} from '@staticcms/core/interface';
import type { t } from 'react-polyglot';

export function selectField<EF extends BaseField>(collection: Collection<EF>, key: string) {
  const array = keyToPathArray(key);
  let name: string | undefined;
  let field: Field<EF> | undefined;

  if ('fields' in collection) {
    let fields = collection.fields ?? [];
    while ((name = array.shift()) && fields) {
      field = fields.find(f => f.name === name);
      if (field) {
        if ('fields' in field) {
          fields = field?.fields ?? [];
        } else if ('types' in field) {
          fields = field?.types ?? [];
        }
      }
    }
  }

  return field;
}

export function getFieldLabel(field: Field, t: t) {
  return `${field.label ?? field.name} ${`${
    field.required === false ? ` (${t('editor.editorControl.field.optional')})` : ''
  }`}`;
}

function findField(field: Field | undefined, path: string[]): Field | null {
  if (!field) {
    return null;
  }

  if (path.length === 0) {
    return field;
  }

  if (!('fields' in field && field.fields)) {
    return null;
  }

  const name = path.slice(0, 1)[0];
  const rest = path.slice(1);

  return findField(
    field.fields.find(f => f.name === name),
    rest,
  );
}

export function getField(field: Field | Field[], path: string): Field | null {
  return findField(
    Array.isArray(field)
      ? {
          widget: 'object',
          name: 'root',
          fields: field,
        }
      : field,
    path.split('.'),
  );
}

export function getFieldValue(
  field: Field,
  entry: Entry,
  isTranslatable: boolean,
  locale: string | undefined,
): ValueOrNestedValue {
  if (isTranslatable && locale) {
    const dataPath = getLocaleDataPath(locale);
    return get(entry, [...dataPath, field.name]);
  }

  return entry.data?.[field.name];
}
