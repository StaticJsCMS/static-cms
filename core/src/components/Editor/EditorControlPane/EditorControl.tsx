import { styled } from '@mui/material/styles';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  changeDraftField as changeDraftFieldAction,
  changeDraftFieldValidation as changeDraftFieldValidationAction,
} from '../../../actions/entries';
import { getAsset as getAssetAction } from '../../../actions/media';
import {
  clearMediaControl as clearMediaControlAction,
  openMediaLibrary as openMediaLibraryAction,
  removeInsertedMedia as removeInsertedMediaAction,
  removeMediaControl as removeMediaControlAction,
} from '../../../actions/mediaLibrary';
import { query as queryAction } from '../../../actions/search';
import { borders, colors, lengths, transitions } from '../../../components/UI/styles';
import { transientOptions } from '../../../lib';
import { resolveWidget } from '../../../lib/registry';
import { getFieldLabel } from '../../../lib/util/field.util';
import { validate } from '../../../lib/util/validation.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type {
  Field,
  FieldsErrors,
  GetAssetFunction,
  I18nSettings,
  TranslatedProps,
  ValueOrNestedValue,
  Widget,
} from '../../../interface';
import type { RootState } from '../../../store';

/**
 * This is a necessary bridge as we are still passing classnames to widgets
 * for styling. Once that changes we can stop storing raw style strings like
 * this.
 */
const styleStrings = {
  widget: `
    display: block;
    width: 100%;
    padding: ${lengths.inputPadding};
    margin: 0;
    border: ${borders.textField};
    border-radius: ${lengths.borderRadius};
    border-top-left-radius: 0;
    outline: 0;
    box-shadow: none;
    background-color: ${colors.inputBackground};
    color: #444a57;
    transition: border-color ${transitions.main};
    position: relative;
    font-size: 15px;
    line-height: 1.5;

    select& {
      text-indent: 14px;
      height: 58px;
    }
  `,
  widgetActive: `
    border-color: ${colors.active};
  `,
  widgetError: `
    border-color: ${colors.errorText};
  `,
  disabled: `
    pointer-events: none;
    opacity: 0.5;
    background: #ccc;
  `,
  hidden: `
    visibility: hidden;
  `,
};

interface ControlContainerProps {
  $isHidden: boolean;
}

const ControlContainer = styled(
  'div',
  transientOptions,
)<ControlContainerProps>(
  ({ $isHidden }) => `
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    width: 100%;
    ${$isHidden ? styleStrings.hidden : ''};
  `,
);

const ControlErrorsList = styled('ul')`
  list-style-type: none;
  font-size: 12px;
  color: ${colors.errorText};
  position: relative;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 4px 8px;
`;

interface ControlHintProps {
  $error: boolean;
}

const ControlHint = styled(
  'p',
  transientOptions,
)<ControlHintProps>(
  ({ $error }) => `
    margin: 0;
    margin-left: 8px;
    padding: 0;
    font-size: 12px;
    color: ${$error ? colors.errorText : colors.controlLabel};
    transition: color ${transitions.main};
  `,
);

const EditorControl = ({
  className,
  clearMediaControl,
  collection,
  config: configState,
  entry,
  field,
  fieldsErrors,
  submitted,
  getAsset,
  isDisabled,
  isFieldDuplicate,
  isFieldHidden,
  isHidden = false,
  locale,
  mediaPaths,
  changeDraftFieldValidation,
  openMediaLibrary,
  parentPath,
  query,
  removeInsertedMedia,
  removeMediaControl,
  t,
  value,
  forList = false,
  changeDraftField,
  i18n,
}: TranslatedProps<EditorControlProps>) => {
  const widgetName = field.widget;
  const widget = resolveWidget(widgetName) as Widget<ValueOrNestedValue>;
  const fieldHint = field.hint;

  const path = useMemo(
    () => (parentPath.length > 0 ? `${parentPath}.${field.name}` : field.name),
    [field.name, parentPath],
  );

  const [dirty, setDirty] = useState(!isEmpty(value));
  const errors = useMemo(() => fieldsErrors[path] ?? [], [fieldsErrors, path]);
  const hasErrors = (submitted || dirty) && Boolean(errors.length);

  const handleGetAsset: GetAssetFunction = useMemo(
    () => (path: string, field?: Field) => {
      return getAsset(collection, entry, path, field);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection],
  );

  useEffect(() => {
    const validateValue = async () => {
      await validate(path, field, value, widget, changeDraftFieldValidation, t);
    };

    validateValue();
  }, [field, value, changeDraftFieldValidation, path, t, widget, dirty]);

  const handleChangeDraftField = useCallback(
    (value: ValueOrNestedValue) => {
      setDirty(true);
      changeDraftField({ path, field, value, entry, i18n });
    },
    [changeDraftField, entry, field, i18n, path],
  );

  const config = useMemo(() => configState.config, [configState.config]);
  if (!collection || !entry || !config) {
    return null;
  }

  return (
    <ControlContainer className={className} $isHidden={isHidden}>
      <>
        {React.createElement(widget.control, {
          key: `field_${path}`,
          collection,
          config,
          entry,
          field,
          fieldsErrors,
          submitted,
          getAsset: handleGetAsset,
          isDisabled: isDisabled ?? false,
          isFieldDuplicate,
          isFieldHidden,
          label: getFieldLabel(field, t),
          locale,
          mediaPaths,
          onChange: handleChangeDraftField,
          clearMediaControl,
          openMediaLibrary,
          removeInsertedMedia,
          removeMediaControl,
          path,
          query,
          t,
          value,
          forList,
          i18n,
          hasErrors,
        })}
        {fieldHint ? (
          <ControlHint key="hint" $error={hasErrors}>
            {fieldHint}
          </ControlHint>
        ) : null}
        {hasErrors ? (
          <ControlErrorsList key="errors">
            {errors.map(error => {
              return (
                error.message &&
                typeof error.message === 'string' && (
                  <li key={error.message.trim().replace(/[^a-z0-9]+/gi, '-')}>{error.message}</li>
                )
              );
            })}
          </ControlErrorsList>
        ) : null}
      </>
    </ControlContainer>
  );
};

interface EditorControlOwnProps {
  className?: string;
  field: Field;
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  isDisabled?: boolean;
  isFieldDuplicate?: (field: Field) => boolean;
  isFieldHidden?: (field: Field) => boolean;
  isHidden?: boolean;
  locale?: string;
  parentPath: string;
  value: ValueOrNestedValue;
  forList?: boolean;
  i18n: I18nSettings | undefined;
}

function mapStateToProps(state: RootState, ownProps: EditorControlOwnProps) {
  const { collections, entryDraft } = state;
  const entry = entryDraft.entry;
  const collection = entryDraft.entry ? collections[entryDraft.entry.collection] : null;
  const isLoadingAsset = selectIsLoadingAsset(state.medias);

  return {
    ...ownProps,
    mediaPaths: state.mediaLibrary.controlMedia,
    config: state.config,
    entry,
    collection,
    isLoadingAsset,
  };
}

const mapDispatchToProps = {
  changeDraftField: changeDraftFieldAction,
  changeDraftFieldValidation: changeDraftFieldValidationAction,
  openMediaLibrary: openMediaLibraryAction,
  clearMediaControl: clearMediaControlAction,
  removeMediaControl: removeMediaControlAction,
  removeInsertedMedia: removeInsertedMediaAction,
  query: queryAction,
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorControlProps = ConnectedProps<typeof connector>;

export default connector(translate()(EditorControl) as ComponentType<EditorControlProps>);
