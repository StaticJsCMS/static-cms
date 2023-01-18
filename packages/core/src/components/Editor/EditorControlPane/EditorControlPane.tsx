import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import get from 'lodash/get';
import React, { useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { changeDraftField as changeDraftFieldAction } from '@staticcms/core/actions/entries';
import {
  getI18nInfo,
  getLocaleDataPath,
  hasI18n,
  isFieldDuplicate,
  isFieldHidden,
  isFieldTranslatable,
} from '@staticcms/core/lib/i18n';
import EditorControl from './EditorControl';

import type { ButtonProps } from '@mui/material/Button';
import type {
  Collection,
  Entry,
  Field,
  FieldsErrors,
  I18nSettings,
  TranslatedProps,
  ValueOrNestedValue,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { MouseEvent } from 'react';
import type { ConnectedProps } from 'react-redux';

const ControlPaneContainer = styled('div')`
  max-width: 1000px;
  width: 100%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LocaleRowWrapper = styled('div')`
  display: flex;
  gap: 8px;
`;

interface LocaleDropdownProps {
  locales: string[];
  dropdownText: string;
  color: ButtonProps['color'];
  onLocaleChange: (locale: string) => void;
}

const LocaleDropdown = ({ locales, dropdownText, color, onLocaleChange }: LocaleDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLocaleChange = useCallback(
    (locale: string) => {
      onLocaleChange(locale);
      handleClose();
    },
    [handleClose, onLocaleChange],
  );

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
        color={color}
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
          <MenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            sx={{ minWidth: '80px' }}
          >
            {locale}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

function getFieldValue(
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

const EditorControlPane = ({
  collection,
  entry,
  fields,
  fieldsErrors,
  submitted,
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
            color="primary"
            onLocaleChange={onLocaleChange}
          />
        </LocaleRowWrapper>
      ) : null}
      {fields.map(field => {
        const isTranslatable = isFieldTranslatable(field, locale, i18n?.defaultLocale);
        const isDuplicate = isFieldDuplicate(field, locale, i18n?.defaultLocale);
        const isHidden = isFieldHidden(field, locale, i18n?.defaultLocale);
        const key = i18n ? `field-${locale}_${field.name}` : `field-${field.name}`;

        return (
          <EditorControl
            key={key}
            field={field}
            value={getFieldValue(field, entry, isTranslatable, locale)}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            isDisabled={isDuplicate}
            isHidden={isHidden}
            isFieldDuplicate={field => isFieldDuplicate(field, locale, i18n?.defaultLocale)}
            isFieldHidden={field => isFieldHidden(field, locale, i18n?.defaultLocale)}
            locale={locale}
            parentPath=""
            i18n={i18n}
          />
        );
      })}
    </ControlPaneContainer>
  );
};

export interface EditorControlPaneOwnProps {
  collection: Collection;
  entry: Entry;
  fields: Field[];
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  locale?: string;
  onLocaleChange: (locale: string) => void;
}

function mapStateToProps(_state: RootState, ownProps: EditorControlPaneOwnProps) {
  return {
    ...ownProps,
  };
}

const mapDispatchToProps = {
  changeDraftField: changeDraftFieldAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorControlPaneProps = ConnectedProps<typeof connector>;

export default connector(EditorControlPane);
