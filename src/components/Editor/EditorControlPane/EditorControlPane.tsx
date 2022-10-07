import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import get from 'lodash/get';
import React, { useCallback, useMemo } from 'react';

import confirm from '../../../components/UI/Confirm';
import {
  getI18nInfo,
  getLocaleDataPath,
  hasI18n,
  isFieldDuplicate,
  isFieldHidden,
  isFieldTranslatable,
} from '../../../lib/i18n';
import EditorControl from './EditorControl';

import type {
  CmsField,
  Collection,
  Entry,
  EntryMeta,
  FieldError,
  FieldsErrors,
  I18nSettings,
  TranslatedProps,
  ValueOrNestedValue,
} from '../../../interface';

const ControlPaneContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 16px;
  font-size: 16px;
`;

const LocaleRowWrapper = styled.div`
  display: flex;
`;

interface LocaleDropdownProps {
  locales: string[];
  dropdownText: string;
  onLocaleChange: (locale: string) => void;
}

const LocaleDropdown = ({ locales, dropdownText, onLocaleChange }: LocaleDropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {dropdownText}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {locales.map(locale => (
          <MenuItem key={locale} onClick={() => onLocaleChange(locale)}>
            {locale}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

function getFieldValue(
  field: CmsField,
  entry: Entry,
  isTranslatable: boolean,
  locale: string | undefined,
): ValueOrNestedValue {
  if ('meta' in field && field.meta) {
    return entry.meta[field.name];
  }

  if (isTranslatable && locale) {
    const dataPath = getLocaleDataPath(locale);
    return get(entry, [...dataPath, field.name]);
  }

  return entry.data[field.name];
}

export interface EditorControlPaneProps {
  collection: Collection;
  entry: Entry;
  fields: CmsField[];
  fieldsMetaData: Record<string, EntryMeta>;
  fieldsErrors: FieldsErrors;
  onChange: (
    field: CmsField,
    value: ValueOrNestedValue,
    metadata: EntryMeta | undefined,
    i18n: I18nSettings | undefined,
  ) => void;
  onValidate: (uniqueFieldId: string, errors: FieldError[]) => void;
  locale?: string;
  onLocaleChange: (locale: string) => void;
}

const EditorControlPane = ({
  collection,
  entry,
  fields,
  fieldsMetaData,
  fieldsErrors,
  onChange,
  onValidate,
  locale,
  onLocaleChange,
  t,
}: TranslatedProps<EditorControlPaneProps>) => {
  const i18n = useMemo(() => {
    if (hasI18n(collection)) {
      const { locales, defaultLocale } = getI18nInfo(collection);
      return {
        currentLocale: locale ?? locales[0],
        locales,
        defaultLocale,
      } as I18nSettings;
    }

    return undefined;
  }, [collection, locale]);

  const copyFromOtherLocale = useCallback(
    ({ targetLocale }: { targetLocale?: string }) =>
      async (sourceLocale: string) => {
        if (!targetLocale) {
          return;
        }

        if (
          !(await confirm({
            title: 'editor.editorControlPane.i18n.copyFromLocaleConfirmTitle',
            body: {
              key: 'editor.editorControlPane.i18n.copyFromLocaleConfirmBody',
              options: { locale: sourceLocale.toUpperCase() },
            },
          }))
        ) {
          return;
        }

        fields.forEach(field => {
          if (isFieldTranslatable(field, targetLocale, sourceLocale)) {
            const copyValue = getFieldValue(
              field,
              entry,
              sourceLocale !== i18n?.defaultLocale,
              sourceLocale,
            );
            onChange(field, copyValue, undefined, i18n);
          }
        });
      },
    [fields, entry, onChange, i18n],
  );

  if (!collection || !fields) {
    return null;
  }

  if (!entry || entry.partial === true) {
    return null;
  }

  return (
    <ControlPaneContainer>
      {i18n?.locales && locale ? (
        <LocaleRowWrapper>
          <LocaleDropdown
            locales={i18n.locales}
            dropdownText={t('editor.editorControlPane.i18n.writingInLocale', {
              locale: locale?.toUpperCase(),
            })}
            onLocaleChange={onLocaleChange}
          />
          <LocaleDropdown
            locales={i18n.locales.filter(l => l !== locale)}
            dropdownText={t('editor.editorControlPane.i18n.copyFromLocale')}
            onLocaleChange={copyFromOtherLocale({ targetLocale: locale })}
          />
        </LocaleRowWrapper>
      ) : null}
      {fields
        .filter(f => f.widget !== 'hidden')
        .map((field, i) => {
          const isTranslatable = isFieldTranslatable(field, locale, i18n?.defaultLocale);
          const isDuplicate = isFieldDuplicate(field, locale, i18n?.defaultLocale);
          const isHidden = isFieldHidden(field, locale, i18n?.defaultLocale);
          const key = i18n ? `${locale}_${i}` : i;

          return (
            <EditorControl
              key={key}
              field={field}
              value={getFieldValue(field, entry, isTranslatable, locale)}
              fieldsMetaData={fieldsMetaData}
              fieldsErrors={fieldsErrors}
              onChange={(field, newValue, newMetadata) => {
                onChange(field, newValue, newMetadata, i18n);
              }}
              onValidate={onValidate}
              isDisabled={isDuplicate}
              isHidden={isHidden}
              isFieldDuplicate={field => isFieldDuplicate(field, locale, i18n?.defaultLocale)}
              isFieldHidden={field => isFieldHidden(field, locale, i18n?.defaultLocale)}
              locale={locale}
            />
          );
        })}
    </ControlPaneContainer>
  );
};

export default EditorControlPane;
