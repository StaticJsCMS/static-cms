import React, { useMemo } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { getI18nInfo, hasI18n, isFieldTranslatable } from '@staticcms/core/lib/i18n';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { getFieldValue } from '@staticcms/core/lib/util/field.util';
import { getNestedSlug } from '@staticcms/core/lib/util/nested.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import EditorControl from './EditorControl';
import LocaleDropdown from './LocaleDropdown';

import type {
  Collection,
  Entry,
  Field,
  FieldsErrors,
  I18nSettings,
  StringField,
} from '@staticcms/core/interface';
import type { FC } from 'react';

import './EditorControlPane.css';

export const classes = generateClassNames('EditorControlPane', [
  'root',
  'no-border',
  'locale_dropdown_wrapper',
]);

export interface EditorControlPaneProps {
  collection: Collection;
  entry: Entry;
  fields: Field[];
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  locale?: string;
  canChangeLocale?: boolean;
  hideBorder: boolean;
  slug?: string;
  onLocaleChange?: (locale: string) => void;
  allowDefaultLocale?: boolean;
  context?: 'default' | 'i18nSplit';
  listItemPath?: string;
}

const EditorControlPane: FC<EditorControlPaneProps> = ({
  collection,
  entry,
  fields,
  fieldsErrors,
  submitted,
  locale,
  canChangeLocale = false,
  hideBorder,
  slug,
  onLocaleChange,
  allowDefaultLocale = false,
  context = 'default',
  listItemPath,
}) => {
  const t = useTranslate();

  const pathField = useMemo(
    () =>
      ({
        name: 'path',
        label:
          'nested' in collection && collection.nested?.path?.label
            ? collection.nested.path.label
            : 'Path',
        widget: 'string',
        i18n: 'none',
        hint: ``,
      } as StringField),
    [collection],
  );

  const config = useAppSelector(selectConfig);

  const defaultNestedPath = useMemo(
    () => getNestedSlug(collection, entry, slug, config?.slug),
    [collection, config, entry, slug],
  );

  const i18n = useMemo(() => {
    if (hasI18n(collection)) {
      const { locales, default_locale } = getI18nInfo(collection);
      return {
        currentLocale: locale ?? locales?.[0],
        locales,
        defaultLocale: default_locale,
      } as I18nSettings;
    }

    return undefined;
  }, [collection, locale]);

  if (!collection || !fields) {
    return null;
  }

  if (!entry || entry.partial === true) {
    return null;
  }

  return (
    <div className={classNames(classes.root, hideBorder && classes['no-border'])}>
      {i18n?.locales && locale ? (
        <div className={classes.locale_dropdown_wrapper}>
          <LocaleDropdown
            locales={i18n.locales}
            defaultLocale={i18n.defaultLocale}
            dropdownText={t('editor.editorControlPane.i18n.writingInLocale', {
              locale: locale?.toUpperCase(),
            })}
            canChangeLocale={canChangeLocale}
            onLocaleChange={onLocaleChange}
            excludeLocales={
              !allowDefaultLocale && context === 'i18nSplit' ? [i18n.defaultLocale] : []
            }
          />
        </div>
      ) : null}
      {'nested' in collection && collection.nested?.path ? (
        <EditorControl
          key="entry-path"
          field={pathField}
          value={entry.meta?.path ?? defaultNestedPath}
          fieldsErrors={fieldsErrors}
          submitted={submitted}
          locale={locale}
          parentPath=""
          i18n={i18n}
          listItemPath={listItemPath}
          controlled
          isMeta
        />
      ) : null}
      {fields.map(field => {
        const isTranslatable = isFieldTranslatable(field, locale, i18n?.defaultLocale);
        const key = i18n ? `field-${locale}_${field.name}` : `field-${field.name}`;

        return (
          <EditorControl
            key={key}
            field={field}
            value={getFieldValue(field, entry, isTranslatable, locale)}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            locale={locale}
            parentPath=""
            i18n={i18n}
            listItemPath={listItemPath}
          />
        );
      })}
    </div>
  );
};

export default EditorControlPane;
