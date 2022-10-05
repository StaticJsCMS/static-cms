import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import get from 'lodash/get';

import { buttons, colors, Dropdown, DropdownItem, StyledDropdownButton, text } from '../../../ui';
import EditorControl from './EditorControl';
import {
  getI18nInfo,
  getLocaleDataPath,
  hasI18n,
  isFieldDuplicate,
  isFieldHidden,
  isFieldTranslatable,
} from '../../../lib/i18n';
import {
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

const LocaleButton = styled(StyledDropdownButton)`
  ${buttons.button};
  ${buttons.medium};
  color: ${colors.controlLabel};
  background: ${colors.textFieldBorder};
  height: 100%;

  &:after {
    top: 11px;
  }
`;

const LocaleButtonWrapper = styled.div`
  display: flex;
`;

const LocaleRowWrapper = styled.div`
  display: flex;
`;

const StyledDropdown = styled(Dropdown)`
  width: max-content;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
`;

function LocaleDropdown({ locales, dropdownText, onLocaleChange }) {
  return (
    <StyledDropdown
      renderButton={() => {
        return (
          <LocaleButtonWrapper>
            <LocaleButton>{dropdownText}</LocaleButton>
          </LocaleButtonWrapper>
        );
      }}
    >
      {locales.map(l => (
        <DropdownItem
          css={css`
            ${text.fieldLabel}
          `}
          key={l}
          label={l}
          onClick={() => onLocaleChange(l)}
        />
      ))}
    </StyledDropdown>
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
  t,
}: TranslatedProps<ControlPaneProps>) => {
  const [locale, setLocale] = useState<string | undefined>();

  if (!collection || !fields) {
    return null;
  }

  if (!entry || entry.partial === true) {
    return null;
  }

  const { locales, defaultLocale } = getI18nInfo(collection) ?? {};
  const i18n = locales && {
    currentLocale: locale,
    locales,
    defaultLocale,
  };

  return (
    <ControlPaneContainer>
      {locales && (
        <LocaleRowWrapper>
          <LocaleDropdown
            locales={locales}
            dropdownText={t('editor.editorControlPane.i18n.writingInLocale', {
              locale: locale.toUpperCase(),
            })}
            onLocaleChange={this.handleLocaleChange}
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

//   handleLocaleChange = val => {
//     this.setState({ selectedLocale: val });
//     this.props.onLocaleChange(val);
//   };

//   copyFromOtherLocale =
//     ({ targetLocale }) =>
//     async sourceLocale => {
//       if (
//         !(await confirm({
//           title: 'editor.editorControlPane.i18n.copyFromLocaleConfirmTitle',
//           body: {
//             key: 'editor.editorControlPane.i18n.copyFromLocaleConfirmBody',
//             options: { locale: sourceLocale.toUpperCase() },
//           },
//         }))
//       ) {
//         return;
//       }
//       const { entry, collection } = this.props;
//       const { locales, defaultLocale } = getI18nInfo(collection);

//       const locale = this.state.selectedLocale;
//       const i18n = locales && {
//         currentLocale: locale,
//         locales,
//         defaultLocale,
//       };

//       this.props.fields.forEach(field => {
//         if (isFieldTranslatable(field, targetLocale, sourceLocale)) {
//           const copyValue = getFieldValue({
//             field,
//             entry,
//             locale: sourceLocale,
//             isTranslatable: sourceLocale !== defaultLocale,
//           });
//           this.props.onChange(field, copyValue, undefined, i18n);
//         }
//       });
//     };

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
