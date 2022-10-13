import { css as coreCss, Global } from '@emotion/react';
import styled from '@emotion/styled';
import partial from 'lodash/partial';
import uniqueId from 'lodash/uniqueId';
import React, { useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import gfm from 'remark-gfm';

import { clearFieldErrors, tryLoadEntry } from '../../../actions/entries';
import { addAsset, getAsset } from '../../../actions/media';
import {
  clearMediaControl,
  openMediaLibrary,
  persistMedia,
  removeInsertedMedia,
  removeMediaControl
} from '../../../actions/mediaLibrary';
import { clearSearch, query } from '../../../actions/search';
import { transientOptions } from '../../../lib';
import { getEditorComponents, resolveWidget } from '../../../lib/registry';
import { getFieldLabel } from '../../../lib/util/field.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { borders, colors, lengths, transitions } from '../../../ui';
import WidgetControl from './WidgetControl';

import type { ComponentType } from 'react';
import type { t } from 'react-polyglot';
import type { ConnectedProps } from 'react-redux';
import type {
  CmsField,
  Collection,
  Entry,
  FieldError,
  FieldsErrors,
  GetAssetFunction,
  TranslatedProps,
  ValueOrNestedValue,
  Widget
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
    margin-top: 16px;
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
    margin-bottom: 0;
    padding: 3px 0;
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
  parentIds = [],
  persistMedia,
  query,
  queryHits,
  removeInsertedMedia,
  removeMediaControl,
  t,
  value,
}: TranslatedProps<EditorControlProps>) => {
  const uniqueFieldId = useMemo(() => uniqueId(`${field.name}-field-`), [field.name]);

  const widgetName = field.widget;
  const widget = resolveWidget(widgetName) as Widget<ValueOrNestedValue>;
  const fieldHint = field.hint;
  const onValidateObject = onValidate;
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
      (path: string, field?: CmsField) => {
        return getAsset(collection, entry, path, field);
      },
    [getAsset],
  );

  const cmsConfig = useMemo(() => config.config, [config.config]);
  if (!collection || !entry || !cmsConfig) {
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
          config={cmsConfig}
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
          onChange={(newValue: ValueOrNestedValue) => onChange(field, newValue)}
          onClearMediaControl={clearMediaControl}
          onOpenMediaLibrary={openMediaLibrary}
          onPersistMedia={persistMedia}
          onRemoveInsertedMedia={removeInsertedMedia}
          onRemoveMediaControl={removeMediaControl}
          onValidate={onValidate && partial(onValidate, uniqueFieldId)}
          onValidateObject={onValidateObject}
          parentIds={parentIds}
          query={query}
          queryHits={queryHits[uniqueFieldId] || []}
          resolveWidget={resolveWidget}
          t={t}
          uniqueFieldId={uniqueFieldId}
          validator={widget.validator}
          value={value}
          widget={widget}
        />
        {fieldHint && (
          <ControlHint $error={hasErrors}>
            <ReactMarkdown
              remarkPlugins={[gfm]}
              allowedElements={['a', 'strong', 'em', 'del']}
              unwrapDisallowed={true}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  );
};

interface EditorControlOwnProps {
  value: ValueOrNestedValue;
  field: CmsField;
  fieldsErrors: FieldsErrors;
  onChange: (field: CmsField, newValue: ValueOrNestedValue) => void;
  onValidate: (uniqueFieldId: string, errors: FieldError[]) => void;
  className?: string;
  isEditorComponent?: boolean;
  isNewEditorComponent?: boolean;
  parentIds?: string[];
  isDisabled?: boolean;
  isHidden?: boolean;
  isFieldDuplicate?: (field: CmsField) => boolean;
  isFieldHidden?: (field: CmsField) => boolean;
  locale?: string;
  clearFieldErrors: EditorControlPaneProps['clearFieldErrors'];
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
    queryHits: state.search.queryHits,
    config: state.config,
    entry,
    collection,
    isLoadingAsset,
    loadEntry
  };
}

const mapDispatchToProps = {
  openMediaLibrary,
  clearMediaControl,
  removeMediaControl,
  removeInsertedMedia,
  persistMedia,
  addAsset,
  query,
  clearSearch,
  clearFieldErrors,
  getAsset,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorControlProps = ConnectedProps<typeof connector>;

export default connector(translate()(EditorControl) as ComponentType<EditorControlProps>);
