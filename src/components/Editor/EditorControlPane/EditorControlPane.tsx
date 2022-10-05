import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import get from 'lodash/get';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { buttons, colors, text } from '../../../ui';
import EditorControl from './EditorControl';
import {
  getI18nInfo,
  getLocaleDataPath,
  hasI18n,
  isFieldDuplicate,
  isFieldHidden,
  isFieldTranslatable,
} from '../../../lib/i18n';
import confirm from '../../../components/UI/Confirm';

import type {
  CmsField,
  Collection,
  Entry,
  EntryMeta,
  FieldsErrors,
  TranslatedProps,
  ValueOrNestedValue,
} from '../../../interface';

const ControlPaneContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 16px;
  font-size: 16px;
`;

const LocaleButtonWrapper = styled.div`
  display: flex;
`;

const LocaleRowWrapper = styled.div`
  display: flex;
`;

interface LocaleDropdownProps {
  locales: string[];
  dropdownText: string;
  onLocaleChange: (locale: string) => void;
}

function LocaleDropdown({ locales, dropdownText, onLocaleChange }: LocaleDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
}

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

interface ControlPaneProps {
  collection: Collection;
  entry: Entry;
  fields: CmsField[];
  fieldsMetaData: Record<string, EntryMeta>;
  fieldsErrors: FieldsErrors;
  onChange: () => void;
  onValidate: () => void;
  locale?: string;
}

const ControlPane = ({
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
}: TranslatedProps<ControlPaneProps>) => {
  const [selectedLocale, setSelectedLocale] = useState<string | undefined>(locale);

  const { locales, defaultLocale } = getI18nInfo(collection) ?? {};
  const i18n = locales && {
    currentLocale: locale,
    locales,
    defaultLocale,
  };

  const handleLocaleChange = useCallback(
    (val: string) => {
      setSelectedLocale(val);
      onLocaleChange(val);
    },
    [onLocaleChange],
  );

  const copyFromOtherLocale = useCallback(
    ({ targetLocale }: { targetLocale: string }) =>
      async (sourceLocale: string) => {
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
        const { locales, defaultLocale } = getI18nInfo(collection);

        const locale = this.state.selectedLocale;
        const i18n = locales && {
          currentLocale: locale,
          locales,
          defaultLocale,
        };

        fields.forEach(field => {
          if (isFieldTranslatable(field, targetLocale, sourceLocale)) {
            const copyValue = getFieldValue(
              field,
              entry,
              sourceLocale !== defaultLocale,
              sourceLocale,
            );
            onChange(field, copyValue, undefined, i18n);
          }
        });
      },
    [],
  );

  if (!collection || !fields) {
    return null;
  }

  if (!entry || entry.partial === true) {
    return null;
  }

  return (
    <ControlPaneContainer>
      {locales && (
        <LocaleRowWrapper>
          <LocaleDropdown
            locales={locales}
            dropdownText={t('editor.editorControlPane.i18n.writingInLocale', {
              locale: locale?.toUpperCase(),
            })}
            onLocaleChange={handleLocaleChange}
          />
          <LocaleDropdown
            locales={locales.filter(l => l !== locale)}
            dropdownText={t('editor.editorControlPane.i18n.copyFromLocale')}
            onLocaleChange={this.copyFromOtherLocale({ targetLocale: locale, t })}
          />
        </LocaleRowWrapper>
      )}
      {fields
        .filter(f => f.widget !== 'hidden')
        .map((field, i) => {
          const isTranslatable = isFieldTranslatable(field, locale, defaultLocale);
          const isDuplicate = isFieldDuplicate(field, locale, defaultLocale);
          const isHidden = isFieldHidden(field, locale, defaultLocale);
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
              processControlRef={this.controlRef.bind(this)}
              controlRef={this.controlRef}
              entry={entry}
              collection={collection}
              isDisabled={isDuplicate}
              isHidden={isHidden}
              isFieldDuplicate={field => isFieldDuplicate(field, locale, defaultLocale)}
              isFieldHidden={field => isFieldHidden(field, locale, defaultLocale)}
              locale={locale}
            />
          );
        })}
    </ControlPaneContainer>
  );
};

// export default class ControlPane extends React.Component {
//   state = {
//     selectedLocale: this.props.locale,
//   };

//   componentValidate = {};

//   controlRef(field, wrappedControl) {
//     if (!wrappedControl) return;
//     const name = field.name;

//     this.componentValidate[name] =
//       wrappedControl.innerWrappedControl?.validate || wrappedControl.validate;
//   }

//   validate = async () => {
//     this.props.fields.forEach(field => {
//       if (field.widget === 'hidden') return;
//       this.componentValidate[field.name]();
//     });
//   };

//   switchToDefaultLocale = () => {
//     if (hasI18n(this.props.collection)) {
//       const { defaultLocale } = getI18nInfo(this.props.collection);
//       return new Promise(resolve => this.setState({ selectedLocale: defaultLocale }, resolve));
//     } else {
//       return Promise.resolve();
//     }
//   };
// }
