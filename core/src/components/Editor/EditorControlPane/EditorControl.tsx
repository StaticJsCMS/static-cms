import { styled } from '@mui/material/styles';
import { isEqual } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import React, { createElement, useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  changeDraftField as changeDraftFieldAction,
  changeDraftFieldValidation,
} from '@staticcms/core/actions/entries';
import { getAsset as getAssetAction } from '@staticcms/core/actions/media';
import {
  clearMediaControl as clearMediaControlAction,
  openMediaLibrary as openMediaLibraryAction,
  removeInsertedMedia as removeInsertedMediaAction,
  removeMediaControl as removeMediaControlAction,
} from '@staticcms/core/actions/mediaLibrary';
import { query as queryAction } from '@staticcms/core/actions/search';
import { borders, colors, lengths, transitions } from '@staticcms/core/components/UI/styles';
import { transientOptions } from '@staticcms/core/lib';
import useMemoCompare from '@staticcms/core/lib/hooks/useMemoCompare';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { resolveWidget } from '@staticcms/core/lib/registry';
import { getFieldLabel } from '@staticcms/core/lib/util/field.util';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { validate } from '@staticcms/core/lib/util/validation.util';
import { selectFieldErrors } from '@staticcms/core/reducers/entryDraft';
import { selectIsLoadingAsset } from '@staticcms/core/reducers/medias';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';

import type {
  Field,
  FieldsErrors,
  GetAssetFunction,
  I18nSettings,
  TranslatedProps,
  UnknownField,
  ValueOrNestedValue,
  Widget,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';

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
  const dispatch = useAppDispatch();

  const id = useUUID();

  const widgetName = field.widget;
  const widget = resolveWidget(widgetName) as Widget<ValueOrNestedValue>;
  const fieldHint = field.hint;

  const path = useMemo(
    () => (parentPath.length > 0 ? `${parentPath}.${field.name}` : field.name),
    [field.name, parentPath],
  );

  const [dirty, setDirty] = useState(!isEmpty(value));

  const fieldErrorsSelector = useMemo(() => selectFieldErrors(path), [path]);
  const errors = useAppSelector(fieldErrorsSelector);

  const hasErrors = (submitted || dirty) && Boolean(errors.length);

  const handleGetAsset: GetAssetFunction = useMemo(
    () => (path: string, field?: Field) => {
      return getAsset(collection, entry, path, field);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection],
  );

  useEffect(() => {
    if (!dirty && !submitted) {
      return;
    }

    const validateValue = async () => {
      const errors = await validate(field, value, widget, t);
      dispatch(changeDraftFieldValidation(path, errors));
    };

    validateValue();
  }, [dispatch, field, path, t, value, widget, dirty, submitted]);

  const handleChangeDraftField = useCallback(
    (value: ValueOrNestedValue) => {
      setDirty(true);
      changeDraftField({ path, field, value, i18n });
    },
    [changeDraftField, field, i18n, path],
  );

  const config = useMemo(() => configState.config, [configState.config]);

  const finalValue = useMemoCompare(value, isEqual);

  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (isNotNullish(finalValue)) {
      return;
    }

    if ('default' in field && isNotNullish(!field.default)) {
      if (widget.getDefaultValue) {
        handleChangeDraftField(
          widget.getDefaultValue(field.default, field as unknown as UnknownField),
        );
      } else {
        handleChangeDraftField(field.default);
      }
      setVersion(version => version + 1);
      return;
    }

    if (widget.getDefaultValue) {
      handleChangeDraftField(widget.getDefaultValue(null, field as unknown as UnknownField));
      setVersion(version => version + 1);
    }
  }, [field, finalValue, handleChangeDraftField, widget]);

  return useMemo(() => {
    if (!collection || !entry || !config) {
      return null;
    }

    return (
      <ControlContainer $isHidden={isHidden}>
        <>
          {createElement(widget.control, {
            key: `${id}-${version}`,
            collection,
            config,
            entry,
            field: field as UnknownField,
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
            value: finalValue,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collection,
    config,
    path,
    errors,
    isHidden,
    widget.control,
    field,
    submitted,
    handleGetAsset,
    isDisabled,
    t,
    locale,
    mediaPaths,
    handleChangeDraftField,
    clearMediaControl,
    openMediaLibrary,
    removeInsertedMedia,
    removeMediaControl,
    query,
    finalValue,
    forList,
    i18n,
    hasErrors,
    fieldHint,
  ]);
};

interface EditorControlOwnProps {
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
