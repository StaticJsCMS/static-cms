import { styled } from '@mui/material/styles';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  changeDraftField as changeDraftFieldAction,
  changeDraftFieldValidation as changeDraftFieldValidationAction,
  clearFieldErrors as clearFieldErrorsAction,
  tryLoadEntry,
} from '../../../actions/entries';
import { getAsset as getAssetAction } from '../../../actions/media';
import {
  clearMediaControl as clearMediaControlAction,
  openMediaLibrary as openMediaLibraryAction,
  removeInsertedMedia as removeInsertedMediaAction,
  removeMediaControl as removeMediaControlAction,
} from '../../../actions/mediaLibrary';
import { clearSearch as clearSearchAction, query as queryAction } from '../../../actions/search';
import { borders, colors, lengths, transitions } from '../../../components/UI/styles';
import { transientOptions } from '../../../lib';
import { resolveWidget } from '../../../lib/registry';
import { getFieldLabel } from '../../../lib/util/field.util';
import { validate } from '../../../lib/util/validation.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type {
  Collection,
  Entry,
  Field,
  FieldsErrors,
  GetAssetFunction,
  I18nSettings,
  TranslatedProps,
  ValueOrNestedValue,
  Widget,
} from '../../../interface';
import type { RootState } from '../../../store';
import type { EditorControlPaneProps } from './EditorControlPane';

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

export const ControlHint = styled(
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
  clearFieldErrors,
  clearMediaControl,
  clearSearch,
  collection,
  config: configState,
  entry,
  field,
  fieldsErrors,
  submitted,
  getAsset,
  isDisabled,
  isEditorComponent,
  isFetching,
  isFieldDuplicate,
  isFieldHidden,
  isHidden = false,
  isNewEditorComponent,
  loadEntry,
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

  const handleGetAsset = useCallback(
    (collection: Collection, entry: Entry): GetAssetFunction =>
      (path: string, field?: Field) => {
        return getAsset(collection, entry, path, field);
      },
    [getAsset],
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
          clearFieldErrors,
          clearSearch,
          collection,
          config,
          entry,
          field,
          fieldsErrors,
          submitted,
          getAsset: handleGetAsset(collection, entry),
          isDisabled: isDisabled ?? false,
          isEditorComponent: isEditorComponent ?? false,
          isFetching,
          isFieldDuplicate,
          isFieldHidden,
          isNewEditorComponent: isNewEditorComponent ?? false,
          label: getFieldLabel(field, t),
          loadEntry,
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
        {fieldHint && <ControlHint $error={hasErrors}>{fieldHint}</ControlHint>}
        {hasErrors ? (
          <ControlErrorsList>
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
  clearFieldErrors: EditorControlPaneProps['clearFieldErrors'];
  field: Field;
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  isDisabled?: boolean;
  isEditorComponent?: boolean;
  isFieldDuplicate?: (field: Field) => boolean;
  isFieldHidden?: (field: Field) => boolean;
  isHidden?: boolean;
  isNewEditorComponent?: boolean;
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

  async function loadEntry(collectionName: string, slug: string) {
    const targetCollection = collections[collectionName];
    if (targetCollection) {
      const loadedEntry = await tryLoadEntry(state, targetCollection, slug);
      return loadedEntry;
    } else {
      throw new Error(`Can't find collection '${collectionName}'`);
    }
  }

  return {
    ...ownProps,
    mediaPaths: state.mediaLibrary.controlMedia,
    isFetching: state.search.isFetching,
    config: state.config,
    entry,
    collection,
    isLoadingAsset,
    loadEntry,
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
  clearSearch: clearSearchAction,
  clearFieldErrors: clearFieldErrorsAction,
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorControlProps = ConnectedProps<typeof connector>;

export default connector(translate()(EditorControl) as ComponentType<EditorControlProps>);
