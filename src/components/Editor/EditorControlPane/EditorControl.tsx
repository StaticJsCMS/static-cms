import { ClassNames, css as coreCss, Global } from '@emotion/react';
import styled from '@emotion/styled';
import partial from 'lodash/partial';
import uniqueId from 'lodash/uniqueId';
import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gfm from 'remark-gfm';

import { clearFieldErrors, tryLoadEntry, validateMetaField } from '../../../actions/entries';
import { addAsset, boundGetAsset } from '../../../actions/media';
import {
  clearMediaControl,
  openMediaLibrary,
  persistMedia,
  removeInsertedMedia,
  removeMediaControl,
} from '../../../actions/mediaLibrary';
import { clearSearch, query } from '../../../actions/search';
import { transientOptions } from '../../../lib';
import { getEditorComponents, resolveWidget } from '../../../lib/registry';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { borders, colors, FieldLabel, lengths, transitions } from '../../../ui';
import Widget from './Widget';

import type { Dispatch } from '@reduxjs/toolkit';
import type { ComponentType } from 'react';
import type { PluggableList } from 'react-markdown';
import type { t, TranslateProps } from 'react-polyglot';
import type { ConnectedProps } from 'react-redux';
import type {
  CmsField,
  Collection,
  Entry,
  EntryMeta,
  FieldsErrors,
  State,
  TranslatedProps,
  ValueOrNestedValue,
} from '../../../interface';

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

const ControlContainer = styled.div`
  margin-top: 16px;
`;

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
  $active: boolean;
}

export const ControlHint = styled(
  'p',
  transientOptions,
)<ControlHintProps>(
  ({ $error, $active }) => `
    margin-bottom: 0;
    padding: 3px 0;
    font-size: 12px;
    color: ${$error ? colors.errorText : $active ? colors.active : colors.controlLabel};
    transition: color ${transitions.main};
  `,
);

interface LabelComponentProps extends TranslateProps {
  field: CmsField;
  isActive: boolean;
  hasErrors: boolean;
  uniqueFieldId: string;
  isFieldOptional: boolean;
}

const LabelComponent = ({
  field,
  isActive,
  hasErrors,
  uniqueFieldId,
  isFieldOptional,
  t,
}: LabelComponentProps) => {
  const label = `${field.label ?? field.name}`;
  const labelComponent = (
    <FieldLabel $isActive={isActive} $hasErrors={hasErrors} htmlFor={uniqueFieldId}>
      {label} {`${isFieldOptional ? ` (${t('editor.editorControl.field.optional')})` : ''}`}
    </FieldLabel>
  );

  return labelComponent;
};

const EditorControl = ({
  value,
  entry,
  collection,
  config,
  field,
  fieldsMetaData,
  fieldsErrors,
  mediaPaths,
  boundGetAsset,
  onChange,
  openMediaLibrary,
  clearMediaControl,
  removeMediaControl,
  addAsset,
  removeInsertedMedia,
  persistMedia,
  onValidate,
  query,
  queryHits,
  isFetching,
  clearSearch,
  clearFieldErrors,
  loadEntry,
  className,
  isSelected,
  isEditorComponent,
  isNewEditorComponent,
  parentIds = [],
  t,
  validateMetaField,
  isDisabled,
  isHidden,
  isFieldDuplicate,
  isFieldHidden,
  locale,
}: TranslatedProps<EditorControlProps>) => {
  const uniqueFieldId = useMemo(() => uniqueId(`${field.name}-field-`), [field.name]);
  const [styleActive, setActiveStyle] = useState(false);

  const widgetName = field.widget;
  const widget = resolveWidget(widgetName);
  const fieldName = field.name;
  const fieldHint = field.hint;
  const isFieldOptional = field.required === false;
  const onValidateObject = onValidate;
  const metadata = fieldsMetaData && fieldsMetaData[fieldName];
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

  return (
    <ClassNames>
      {({ css, cx }) => (
        <ControlContainer
          className={className}
          css={css`
            ${isHidden && styleStrings.hidden};
          `}
        >
          <>
            {widget.globalStyles && <Global styles={coreCss`${widget.globalStyles}`} />}
            {errors && (
              <ControlErrorsList>
                {errors.map(
                  error =>
                    error.message &&
                    typeof error.message === 'string' && (
                      <li key={error.message.trim().replace(/[^a-z0-9]+/gi, '-')}>
                        {error.message}
                      </li>
                    ),
                )}
              </ControlErrorsList>
            )}
            <LabelComponent
              field={field}
              isActive={isSelected || styleActive}
              hasErrors={hasErrors}
              uniqueFieldId={uniqueFieldId}
              isFieldOptional={isFieldOptional}
              t={t}
            />
            <Widget
              classNameWrapper={cx(
                css`
                  ${styleStrings.widget};
                `,
                {
                  [css`
                    ${styleStrings.widgetActive};
                  `]: isSelected || styleActive,
                },
                {
                  [css`
                    ${styleStrings.widgetError};
                  `]: hasErrors,
                },
                {
                  [css`
                    ${styleStrings.disabled}
                  `]: isDisabled,
                },
              )}
              classNameWidget={css`
                ${styleStrings.widget};
              `}
              classNameWidgetActive={css`
                ${styleStrings.widgetActive};
              `}
              controlComponent={widget.control}
              validator={widget.validator}
              entry={entry}
              collection={collection}
              config={config}
              field={field}
              uniqueFieldId={uniqueFieldId}
              value={value}
              mediaPaths={mediaPaths}
              metadata={metadata}
              onChange={(newValue: ValueOrNestedValue, newMetadata: EntryMeta) =>
                onChange(field, newValue, newMetadata)
              }
              onValidate={onValidate && partial(onValidate, uniqueFieldId)}
              onOpenMediaLibrary={openMediaLibrary}
              onClearMediaControl={clearMediaControl}
              onRemoveMediaControl={removeMediaControl}
              onRemoveInsertedMedia={removeInsertedMedia}
              onPersistMedia={persistMedia}
              onAddAsset={addAsset}
              getAsset={boundGetAsset}
              hasActiveStyle={isSelected || styleActive}
              setActiveStyle={() => setActiveStyle(true)}
              setInactiveStyle={() => setActiveStyle(false)}
              resolveWidget={resolveWidget}
              widget={widget}
              getEditorComponents={getEditorComponents}
              editorControl={ConnectedEditorControl}
              query={query}
              loadEntry={loadEntry}
              queryHits={queryHits[uniqueFieldId] || []}
              clearSearch={clearSearch}
              clearFieldErrors={clearFieldErrors}
              isFetching={isFetching}
              fieldsErrors={fieldsErrors}
              onValidateObject={onValidateObject}
              isEditorComponent={isEditorComponent}
              isNewEditorComponent={isNewEditorComponent}
              parentIds={parentIds}
              t={t}
              validateMetaField={validateMetaField}
              isDisabled={isDisabled}
              isFieldDuplicate={isFieldDuplicate}
              isFieldHidden={isFieldHidden}
              locale={locale}
            />
            {fieldHint && (
              <ControlHint $active={isSelected || styleActive} $error={hasErrors}>
                <ReactMarkdown
                  remarkPlugins={[gfm] as PluggableList}
                  allowedElements={['a', 'strong', 'em', 'del']}
                  unwrapDisallowed={true}
                  components={{
                    // eslint-disable-next-line no-unused-vars
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit' }}
                      />
                    ),
                  }}
                >
                  {fieldHint}
                </ReactMarkdown>
              </ControlHint>
            )}
          </>
        </ControlContainer>
      )}
    </ClassNames>
  );
};

function mapStateToProps(state: State) {
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
    mediaPaths: state.mediaLibrary.controlMedia,
    isFetching: state.search.isFetching,
    queryHits: state.search.queryHits,
    config: state.config,
    entry,
    collection,
    isLoadingAsset,
    loadEntry,
    validateMetaField: (field: CmsField, value: string | undefined, t: t) =>
      collection && validateMetaField(state, collection, field, value, t),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const creators = bindActionCreators(
    {
      openMediaLibrary,
      clearMediaControl,
      removeMediaControl,
      removeInsertedMedia,
      persistMedia,
      addAsset,
      query,
      clearSearch,
      clearFieldErrors,
    },
    dispatch,
  );
  return {
    ...creators,
    boundGetAsset: (collection?: Collection | null, entry?: Entry) =>
      collection && entry && boundGetAsset(dispatch, collection, entry),
  };
}

interface EditorControlOwnProps {
  value: ValueOrNestedValue;
  field: CmsField;
  fieldsMetaData: Record<string, EntryMeta>;
  fieldsErrors: FieldsErrors;
  onChange: (field: CmsField, newValue: ValueOrNestedValue, newMetadata: EntryMeta) => void;
  onValidate: (uniqueFieldId: string) => void;
  className?: string;
  isSelected?: boolean;
  isEditorComponent?: boolean;
  isNewEditorComponent?: boolean;
  parentIds?: string[];
  isDisabled?: boolean;
  isHidden?: boolean;
  isFieldDuplicate?: boolean;
  isFieldHidden?: boolean;
  locale?: string;
}

function mergeProps(
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: EditorControlOwnProps,
) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    boundGetAsset: dispatchProps.boundGetAsset(stateProps.collection, stateProps.entry),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);
export type EditorControlProps = ConnectedProps<typeof connector>;

const ConnectedEditorControl = connector(
  translate()(EditorControl) as ComponentType<EditorControlProps>,
);

export default ConnectedEditorControl;
