import { css as coreCss, Global } from '@emotion/react';
import styled from '@emotion/styled';
import uniqueId from 'lodash/uniqueId';
import React, { useCallback, useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import { clearFieldErrors as clearFieldErrorsAction, tryLoadEntry } from '../../../actions/entries';
import { addAsset as addAssetAction, getAsset as getAssetAction } from '../../../actions/media';
import {
  clearMediaControl as clearMediaControlAction,
  openMediaLibrary as openMediaLibraryAction,
  persistMedia as persistMediaAction,
  removeInsertedMedia as removeInsertedMediaAction,
  removeMediaControl as removeMediaControlAction,
} from '../../../actions/mediaLibrary';
import { clearSearch as clearSearchAction, query as queryAction } from '../../../actions/search';
import { borders, colors, lengths, transitions } from '../../../components/UI/styles';
import { transientOptions } from '../../../lib';
import { getEditorComponents, resolveWidget } from '../../../lib/registry';
import { getFieldLabel } from '../../../lib/util/field.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import WidgetControl from './WidgetControl';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type {
  Field,
  Collection,
  Entry,
  FieldError,
  FieldsErrors,
  GetAssetFunction,
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
    ${$isHidden ? styleStrings.hidden : ''};
  `,
);

const ControlErrorsList = styled.ul`
  list-style-type: none;
  font-size: 12px;
  color: ${colors.errorText};
  margin-bottom: 5px;
  text-align: right;
  text-transform: uppercase;
  position: relative;
  font-weight: 600;
  top: 20px;
`;

interface ControlHintProps {
  $error: boolean;
}

export const ControlHint = styled(
  'p',
  transientOptions,
)<ControlHintProps>(
  ({ $error }) => `
    margin: 8px 0;
    padding: 0 8px;
    font-size: 12px;
    color: ${$error ? colors.errorText : colors.controlLabel};
    transition: color ${transitions.main};
  `,
);

const EditorControl = ({
  addAsset,
  className,
  clearFieldErrors,
  clearMediaControl,
  clearSearch,
  collection,
  config,
  entry,
  field,
  fieldsErrors,
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
  onChange,
  onValidate,
  openMediaLibrary,
  parentPath,
  persistMedia,
  query,
  removeInsertedMedia,
  removeMediaControl,
  t,
  value,
}: TranslatedProps<EditorControlProps>) => {
  const uniqueFieldId = useMemo(() => uniqueId(`${field.name}-field-`), [field.name]);

  const widgetName = field.widget;
  const widget = resolveWidget(widgetName) as Widget<ValueOrNestedValue>;
  const fieldHint = field.hint;
  const errors = fieldsErrors && fieldsErrors[uniqueFieldId];

  const childErrors = useMemo(() => {
    if (fieldsErrors && Object.keys(fieldsErrors).length > 0) {
      return Object.values(fieldsErrors).some(arr =>
        arr.some(err => err.parentIds && err.parentIds.includes(uniqueFieldId)),
      );
    }
    return false;
  }, [fieldsErrors, uniqueFieldId]);
  const hasErrors = !!errors || childErrors;

  const handleGetAsset = useCallback(
    (collection: Collection, entry: Entry): GetAssetFunction =>
      (path: string, field?: Field) => {
        return getAsset(collection, entry, path, field);
      },
    [getAsset],
  );

  const path = useMemo(
    () => (parentPath.length > 0 ? `${parentPath}.${field.name}` : field.name),
    [field.name, parentPath],
  );

  const Config = useMemo(() => config.config, [config.config]);
  if (!collection || !entry || !Config) {
    return null;
  }

  return (
    <ControlContainer className={className} $isHidden={isHidden}>
      <>
        {widget.globalStyles && <Global styles={coreCss`${widget.globalStyles}`} />}
        {errors && (
          <ControlErrorsList>
            {errors.map(
              error =>
                error.message &&
                typeof error.message === 'string' && (
                  <li key={error.message.trim().replace(/[^a-z0-9]+/gi, '-')}>{error.message}</li>
                ),
            )}
          </ControlErrorsList>
        )}
        <WidgetControl
          clearFieldErrors={clearFieldErrors}
          clearSearch={clearSearch}
          collection={collection}
          config={Config}
          controlComponent={widget.control}
          entry={entry}
          field={field}
          fieldsErrors={fieldsErrors}
          getAsset={handleGetAsset(collection, entry)}
          getEditorComponents={getEditorComponents}
          isDisabled={isDisabled ?? false}
          isEditorComponent={isEditorComponent ?? false}
          isFetching={isFetching}
          isFieldDuplicate={isFieldDuplicate}
          isFieldHidden={isFieldHidden}
          isNewEditorComponent={isNewEditorComponent ?? false}
          label={getFieldLabel(field, t)}
          loadEntry={loadEntry}
          locale={locale}
          mediaPaths={mediaPaths}
          onAddAsset={addAsset}
          onChange={onChange}
          onClearMediaControl={clearMediaControl}
          onOpenMediaLibrary={openMediaLibrary}
          onPersistMedia={persistMedia}
          onRemoveInsertedMedia={removeInsertedMedia}
          onRemoveMediaControl={removeMediaControl}
          onValidate={onValidate}
          path={path}
          query={query}
          resolveWidget={resolveWidget}
          t={t}
          value={value}
        />
        {fieldHint && <ControlHint $error={hasErrors}>{fieldHint}</ControlHint>}
      </>
    </ControlContainer>
  );
};

interface EditorControlOwnProps {
  className?: string;
  clearFieldErrors: EditorControlPaneProps['clearFieldErrors'];
  field: Field;
  fieldsErrors: FieldsErrors;
  isDisabled?: boolean;
  isEditorComponent?: boolean;
  isFieldDuplicate?: (field: Field) => boolean;
  isFieldHidden?: (field: Field) => boolean;
  isHidden?: boolean;
  isNewEditorComponent?: boolean;
  locale?: string;
  onChange: (path: string, field: Field, newValue: ValueOrNestedValue) => void;
  onValidate: (path: string, errors: FieldError[]) => void;
  parentPath: string;
  value: ValueOrNestedValue;
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
  openMediaLibrary: openMediaLibraryAction,
  clearMediaControl: clearMediaControlAction,
  removeMediaControl: removeMediaControlAction,
  removeInsertedMedia: removeInsertedMediaAction,
  persistMedia: persistMediaAction,
  addAsset: addAssetAction,
  query: queryAction,
  clearSearch: clearSearchAction,
  clearFieldErrors: clearFieldErrorsAction,
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorControlProps = ConnectedProps<typeof connector>;

export default connector(translate()(EditorControl) as ComponentType<EditorControlProps>);
