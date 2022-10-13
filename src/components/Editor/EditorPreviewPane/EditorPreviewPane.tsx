import styled from '@emotion/styled';
import React, { isValidElement, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import { getAsset } from '../../../actions/media';
import { INFERABLE_FIELDS } from '../../../constants/fieldInference';
import { getPreviewTemplate, getRemarkPlugins, resolveWidget } from '../../../lib/registry';
import { selectInferedField, selectTemplateName } from '../../../lib/util/collection.util';
import { selectField } from '../../../lib/util/field.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { lengths } from '../../../ui';
import { ErrorBoundary } from '../../UI';
import EditorPreview from './EditorPreview';
import EditorPreviewContent from './EditorPreviewContent';
import PreviewHOC from './PreviewHOC';

import type { ReactFragment, ReactNode } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { InferredField } from '../../../constants/fieldInference';
import type {
  CmsField,
  CmsTemplatePreviewProps,
  Collection,
  Entry,
  EntryData,
  GetAssetFunction,
} from '../../../interface';
import type { RootState } from '../../../store';

const PreviewPaneFrame = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
  overflow: auto;
`;

/**
 * Returns the widget component for a named field, and makes recursive calls
 * to retrieve components for nested and deeply nested fields, which occur in
 * object and list type fields. Used internally to retrieve widgets, and also
 * exposed for use in custom preview templates.
 */
function getWidgetFor(
  collection: Collection,
  name: string,
  fields: CmsField[],
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  widgetFields: CmsField[] = fields,
  values: EntryData = entry.data,
): ReactNode {
  // We retrieve the field by name so that this function can also be used in
  // custom preview templates, where the field object can't be passed in.
  const field = widgetFields && widgetFields.find(f => f.name === name);
  if (!field) {
    return null;
  }

  const value = values?.[field.name];
  let fieldWithWidgets: Omit<CmsField, 'fields' | 'field'> & {
    fields?: ReactNode[];
    field?: ReactNode;
  } = Object.entries(field).reduce((acc, [key, fieldValue]) => {
    if (!['fields', 'fields'].includes(key)) {
      acc[key] = fieldValue;
    }
    return acc;
  }, {} as Record<string, unknown>) as Omit<CmsField, 'fields' | 'field'>;

  if ('fields' in field && field.fields) {
    fieldWithWidgets = {
      ...fieldWithWidgets,
      fields: getNestedWidgets(
        collection,
        fields,
        entry,
        inferedFields,
        getAsset,
        field.fields,
        value as EntryData | EntryData[],
      ),
    };
  } else if ('field' in field && field.field) {
    fieldWithWidgets = {
      ...fieldWithWidgets,
      field: getSingleNested(
        entry,
        getAsset,
        field.field,
        value as EntryData | EntryData[],
      ),
    };
  }

  const labelledWidgets = ['string', 'text', 'number'];
  const inferedField = Object.entries(inferedFields)
    .filter(([key]) => {
      const fieldToMatch = selectField(collection, key);
      return fieldToMatch === fieldWithWidgets;
    })
    .map(([, value]) => value)[0];

  let renderedValue: ReactNode;
  if (inferedField) {
    renderedValue = inferedField.defaultPreview(String(value));
  } else if (
    value &&
    fieldWithWidgets.widget &&
    labelledWidgets.indexOf(fieldWithWidgets.widget) !== -1 &&
    value.toString().length < 50
  ) {
    renderedValue = (
      <div>
        <>
          <strong>{field.label ?? field.name}:</strong> {value}
        </>
      </div>
    );
  }

  return renderedValue ? getWidget(field, renderedValue, entry, getAsset) : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isJsxElement(value: any): value is JSX.Element {
  return isValidElement(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isReactFragment(value: any): value is ReactFragment {
  if (value.type) {
    return value.type === React.Fragment;
  }

  return value === React.Fragment;
}

function getWidget(
  field: CmsField,
  value: EntryData | ReactNode,
  entry: Entry,
  getAsset: GetAssetFunction,
  idx: number | null = null,
) {
  if (!field.widget) {
    return null;
  }

  const widget = resolveWidget(field.widget);
  const key = idx ? field.name + '_' + idx : field.name;

  /**
   * Use an HOC to provide conditional updates for all previews.
   */
  return !widget.preview ? null : (
    <PreviewHOC
      previewComponent={widget.preview}
      key={key}
      field={field}
      getAsset={getAsset}
      value={
        value &&
        !widget.allowMapValue &&
        typeof value === 'object' &&
        !isJsxElement(value) &&
        !isReactFragment(value)
          ? (value as Record<string, unknown>)[field.name]
          : value
      }
      entry={entry}
      resolveWidget={resolveWidget}
      getRemarkPlugins={getRemarkPlugins}
    />
  );
}

/**
 * Use getWidgetFor as a mapping function for recursive widget retrieval
 */
function widgetsForNestedFields(
  collection: Collection,
  fields: CmsField[],
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  widgetFields: CmsField[],
  values: EntryData,
) {
  return widgetFields
    .map(field =>
      getWidgetFor(
        collection,
        field.name,
        fields,
        entry,
        inferedFields,
        getAsset,
        widgetFields,
        values,
      ),
    )
    .filter(widget => Boolean(widget)) as JSX.Element[];
}

/**
 * Retrieves widgets for nested fields (children of object/list fields)
 */
function getNestedWidgets(
  collection: Collection,
  fields: CmsField[],
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  widgetFields: CmsField[],
  values: EntryData | EntryData[],
) {
  // Fields nested within a list field will be paired with a List of value Maps.
  if (Array.isArray(values)) {
    return values.flatMap(value =>
      widgetsForNestedFields(
        collection,
        fields,
        entry,
        inferedFields,
        getAsset,
        widgetFields,
        value,
      ),
    );
  }

  // Fields nested within an object field will be paired with a single Record of values.
  return widgetsForNestedFields(
    collection,
    fields,
    entry,
    inferedFields,
    getAsset,
    widgetFields,
    values,
  );
}

function getSingleNested(
  entry: Entry,
  getAsset: GetAssetFunction,
  widgetField: CmsField,
  values: EntryData | EntryData[],
): ReactNode {
  if (Array.isArray(values)) {
    return values.map((value, idx) => getWidget(widgetField, value, entry, getAsset, idx));
  }
  return getWidget(widgetField, values, entry, getAsset);
}

const PreviewPane = (props: EditorPreviewPaneProps) => {
  const { entry, collection, config, fields, getAsset } = props;

  const inferedFields = useMemo(() => {
    const titleField = selectInferedField(collection, 'title');
    const shortTitleField = selectInferedField(collection, 'shortTitle');
    const authorField = selectInferedField(collection, 'author');

    const iFields: Record<string, InferredField> = {};
    if (titleField) {
      iFields[titleField] = INFERABLE_FIELDS.title;
    }
    if (shortTitleField) {
      iFields[shortTitleField] = INFERABLE_FIELDS.shortTitle;
    }
    if (authorField) {
      iFields[authorField] = INFERABLE_FIELDS.author;
    }
    return iFields;
  }, [collection]);

  const handleGetAsset = useCallback(
    (path: string, field?: CmsField) => {
      return getAsset(collection, entry, path, field);
    },
    [collection, entry, getAsset],
  );

  /**
   * This function exists entirely to expose nested widgets for object and list
   * fields to custom preview templates.
   *
   * TODO: see if getWidgetFor can now provide this functionality for preview templates
   */
  const widgetsFor = useCallback(
    (name: string) => {
      const field = fields.find(f => f.name === name);
      if (!field) {
        return {
          data: null,
          widgets: {},
        };
      }

      const nestedFields = field && 'fields' in field ? field.fields ?? [] : [];
      const value = entry.data?.[field.name] as EntryData | EntryData[];

      if (Array.isArray(value)) {
        return value.map(val => {
          const widgets = nestedFields.reduce((acc, field, index) => {
            acc[field.name] = <div key={index}>{getWidget(field, val, entry, handleGetAsset)}</div>;
            return acc;
          }, {} as Record<string, ReactNode>);
          return { data: val, widgets };
        });
      }

      return {
        data: value,
        widgets: nestedFields.reduce((acc, field, index) => {
          acc[field.name] = <div key={index}>{getWidget(field, value, entry, handleGetAsset)}</div>;
          return acc;
        }, {} as Record<string, ReactNode>),
      };
    },
    [entry, fields, handleGetAsset],
  );

  const widgetFor = useCallback(
    (name: string) => {
      return getWidgetFor(collection, name, fields, entry, inferedFields, handleGetAsset);
    },
    [collection, entry, fields, handleGetAsset, inferedFields],
  );

  if (!entry || !entry.data) {
    return null;
  }

  const previewComponent =
    getPreviewTemplate(selectTemplateName(collection, entry.slug)) ?? EditorPreview;

  const previewProps: CmsTemplatePreviewProps = {
    ...props,
    getAsset: handleGetAsset,
    widgetFor,
    widgetsFor,
  };

  if (!collection) {
    <PreviewPaneFrame id="preview-pane" />;
  }

  return (
    <ErrorBoundary config={config}>
      <PreviewPaneFrame id="preview-pane">
        <EditorPreviewContent
          {...{ previewComponent, previewProps: { ...previewProps, document, window } }}
        />
      </PreviewPaneFrame>
    </ErrorBoundary>
  );
};

export interface EditorPreviewPaneOwnProps {
  collection: Collection;
  fields: CmsField[];
  entry: Entry;
}

function mapStateToProps(state: RootState, ownProps: EditorPreviewPaneOwnProps) {
  const isLoadingAsset = selectIsLoadingAsset(state.medias);
  return { ...ownProps, isLoadingAsset, config: state.config };
}

const mapDispatchToProps = {
  getAsset,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorPreviewPaneProps = ConnectedProps<typeof connector>;

export default connector(PreviewPane);
