import { styled } from '@mui/material/styles';
import React, { isValidElement, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { ScrollSyncPane } from 'react-scroll-sync';

import { getAsset as getAssetAction } from '../../../actions/media';
import { lengths } from '../../../components/UI/styles';
import { getPreviewStyles, getPreviewTemplate, resolveWidget } from '../../../lib/registry';
import { selectTemplateName, useInferedFields } from '../../../lib/util/collection.util';
import { selectField } from '../../../lib/util/field.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { getTypedFieldForValue } from '../../../widgets/list/typedListHelpers';
import { ErrorBoundary } from '../../UI';
import EditorPreview from './EditorPreview';
import EditorPreviewContent from './EditorPreviewContent';
import PreviewHOC from './PreviewHOC';

import type { ComponentType, ReactFragment, ReactNode } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { InferredField } from '../../../constants/fieldInference';
import type {
  Collection,
  Config,
  Entry,
  EntryData,
  Field,
  GetAssetFunction,
  ListField,
  RenderedField,
  TemplatePreviewProps,
  TranslatedProps,
  ValueOrNestedValue,
  WidgetPreviewComponent,
} from '../../../interface';
import type { RootState } from '../../../store';

const PreviewPaneFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
  overflow: auto;
`;

const FrameGlobalStyles = `
  body {
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  .frame-content {
    padding: 16px;
  }
`;

const PreviewPaneWrapper = styled('div')`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
  overflow: auto;
  padding: 16px;
`;

const StyledPreviewContent = styled('div')`
  width: calc(100% - min(864px, 50%));
  top: 64px;
  right: 0;
  position: absolute;
  height: calc(100vh - 64px);
  overflow: hidden;
`;

/**
 * Returns the widget component for a named field, and makes recursive calls
 * to retrieve components for nested and deeply nested fields, which occur in
 * object and list type fields. Used internally to retrieve widgets, and also
 * exposed for use in custom preview templates.
 */
function getWidgetFor(
  config: Config,
  collection: Collection,
  name: string,
  fields: Field[],
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  widgetFields: Field[] = fields,
  values: EntryData = entry.data,
  idx: number | null = null,
): ReactNode {
  // We retrieve the field by name so that this function can also be used in
  // custom preview templates, where the field object can't be passed in.
  const field = widgetFields && widgetFields.find(f => f.name === name);
  if (!field) {
    return null;
  }

  const value = values?.[field.name];
  let fieldWithWidgets = Object.entries(field).reduce((acc, [key, fieldValue]) => {
    if (!['fields', 'fields'].includes(key)) {
      acc[key] = fieldValue;
    }
    return acc;
  }, {} as Record<string, unknown>) as RenderedField;

  if ('fields' in field && field.fields) {
    fieldWithWidgets = {
      ...fieldWithWidgets,
      fields: getNestedWidgets(
        config,
        collection,
        fields,
        entry,
        inferedFields,
        getAsset,
        field.fields,
        value as EntryData | EntryData[],
      ),
    };
  } else if ('types' in field && field.types) {
    fieldWithWidgets = {
      ...fieldWithWidgets,
      fields: getTypedNestedWidgets(
        config,
        collection,
        field,
        entry,
        inferedFields,
        getAsset,
        value as EntryData[],
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

  let renderedValue: ValueOrNestedValue | ReactNode = value;
  if (inferedField) {
    renderedValue = inferedField.defaultPreview(String(value));
  } else if (
    value &&
    fieldWithWidgets.widget &&
    labelledWidgets.indexOf(fieldWithWidgets.widget) !== -1 &&
    value.toString().length < 50
  ) {
    renderedValue = (
      <div key={field.name}>
        <>
          <strong>{field.label ?? field.name}:</strong> {value}
        </>
      </div>
    );
  }
  return renderedValue
    ? getWidget(config, fieldWithWidgets, collection, renderedValue, entry, getAsset, idx)
    : null;
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
  config: Config,
  field: RenderedField,
  collection: Collection,
  value: ValueOrNestedValue | ReactNode,
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
      previewComponent={widget.preview as WidgetPreviewComponent}
      key={key}
      field={field as RenderedField}
      getAsset={getAsset}
      config={config}
      collection={collection}
      value={
        value && typeof value === 'object' && !isJsxElement(value) && !isReactFragment(value)
          ? (value as Record<string, unknown>)[field.name]
          : value
      }
      entry={entry}
    />
  );
}

/**
 * Use getWidgetFor as a mapping function for recursive widget retrieval
 */
function widgetsForNestedFields(
  config: Config,
  collection: Collection,
  fields: Field[],
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  widgetFields: Field[],
  values: EntryData,
  idx: number | null = null,
) {
  return widgetFields
    .map(field =>
      getWidgetFor(
        config,
        collection,
        field.name,
        fields,
        entry,
        inferedFields,
        getAsset,
        widgetFields,
        values,
        idx,
      ),
    )
    .filter(widget => Boolean(widget)) as JSX.Element[];
}

/**
 * Retrieves widgets for nested fields (children of object/list fields)
 */
function getTypedNestedWidgets(
  config: Config,
  collection: Collection,
  field: ListField,
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  values: EntryData[],
) {
  return values
    ?.flatMap((value, index) => {
      const itemType = getTypedFieldForValue(field, value ?? {}, index);
      if (!itemType) {
        return null;
      }

      return widgetsForNestedFields(
        config,
        collection,
        itemType.fields,
        entry,
        inferedFields,
        getAsset,
        itemType.fields,
        value,
        index,
      );
    })
    .filter(Boolean);
}

/**
 * Retrieves widgets for nested fields (children of object/list fields)
 */
function getNestedWidgets(
  config: Config,
  collection: Collection,
  fields: Field[],
  entry: Entry,
  inferedFields: Record<string, InferredField>,
  getAsset: GetAssetFunction,
  widgetFields: Field[],
  values: EntryData | EntryData[],
) {
  // Fields nested within a list field will be paired with a List of value Maps.
  if (Array.isArray(values)) {
    return values.flatMap(value =>
      widgetsForNestedFields(
        config,
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
    config,
    collection,
    fields,
    entry,
    inferedFields,
    getAsset,
    widgetFields,
    values,
  );
}

const PreviewPane = (props: TranslatedProps<EditorPreviewPaneProps>) => {
  const { entry, collection, config, fields, previewInFrame, getAsset, t } = props;

  const inferedFields = useInferedFields(collection);

  const handleGetAsset = useCallback(
    (path: string, field?: Field) => {
      return getAsset(collection, entry, path, field);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection],
  );

  const widgetFor = useCallback(
    (name: string) => {
      if (!config.config) {
        return null;
      }
      return getWidgetFor(
        config.config,
        collection,
        name,
        fields,
        entry,
        inferedFields,
        handleGetAsset,
      );
    },
    [collection, config, entry, fields, handleGetAsset, inferedFields],
  );

  /**
   * This function exists entirely to expose nested widgets for object and list
   * fields to custom preview templates.
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
            acc[field.name] = <div key={index}>{widgetFor(field.name)}</div>;
            return acc;
          }, {} as Record<string, ReactNode>);
          return { data: val, widgets };
        });
      }

      return {
        data: value,
        widgets: nestedFields.reduce((acc, field, index) => {
          acc[field.name] = <div key={index}>{widgetFor(field.name)}</div>;
          return acc;
        }, {} as Record<string, ReactNode>),
      };
    },
    [entry.data, fields, widgetFor],
  );

  const previewStyles = useMemo(
    () => [
      ...getPreviewStyles().map((style, i) => {
        if (style.raw) {
          return <style key={i}>{style.value}</style>;
        }
        return <link key={i} href={style.value} type="text/css" rel="stylesheet" />;
      }),
      <style key="global">{FrameGlobalStyles}</style>,
    ],
    [],
  );

  const previewComponent = useMemo(
    () => getPreviewTemplate(selectTemplateName(collection, entry.slug)) ?? EditorPreview,
    [collection, entry.slug],
  );

  const initialFrameContent = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head><base target="_blank"/></head>
        <body><div></div></body>
      </html>
    `,
    [],
  );

  const element = useMemo(() => document.getElementById('cms-root'), []);

  const previewProps = useMemo(
    () =>
      ({
        ...props,
        getAsset: handleGetAsset,
        widgetFor,
        widgetsFor,
      } as Omit<TemplatePreviewProps, 'document' | 'window'>),
    [handleGetAsset, props, widgetFor, widgetsFor],
  );

  return useMemo(() => {
    if (!element) {
      return null;
    }

    return ReactDOM.createPortal(
      <StyledPreviewContent className="preview-content">
        {!entry || !entry.data ? null : (
          <ErrorBoundary config={config}>
            {previewInFrame ? (
              <PreviewPaneFrame
                key="preview-frame"
                id="preview-pane"
                head={previewStyles}
                initialContent={initialFrameContent}
              >
                {!collection ? (
                  t('collection.notFound')
                ) : (
                  <FrameContextConsumer>
                    {({ document, window }) => {
                      return (
                        <ScrollSyncPane
                          key="preview-frame-scroll-sync"
                          attachTo={
                            (document?.scrollingElement ?? undefined) as HTMLElement | undefined
                          }
                        >
                          <EditorPreviewContent
                            key="preview-frame-content"
                            previewComponent={previewComponent}
                            previewProps={{ ...previewProps, document, window }}
                          />
                        </ScrollSyncPane>
                      );
                    }}
                  </FrameContextConsumer>
                )}
              </PreviewPaneFrame>
            ) : (
              <ScrollSyncPane key="preview-wrapper-scroll-sync">
                <PreviewPaneWrapper key="preview-wrapper" id="preview-pane">
                  {!collection ? (
                    t('collection.notFound')
                  ) : (
                    <>
                      {previewStyles}
                      <EditorPreviewContent
                        key="preview-wrapper-content"
                        previewComponent={previewComponent}
                        previewProps={{ ...previewProps, document, window }}
                      />
                    </>
                  )}
                </PreviewPaneWrapper>
              </ScrollSyncPane>
            )}
          </ErrorBoundary>
        )}
      </StyledPreviewContent>,
      element,
      'preview-content',
    );
  }, [
    collection,
    config,
    element,
    entry,
    initialFrameContent,
    previewComponent,
    previewInFrame,
    previewProps,
    previewStyles,
    t,
  ]);
};

export interface EditorPreviewPaneOwnProps {
  collection: Collection;
  fields: Field[];
  entry: Entry;
  previewInFrame: boolean;
}

function mapStateToProps(state: RootState, ownProps: EditorPreviewPaneOwnProps) {
  const isLoadingAsset = selectIsLoadingAsset(state.medias);
  return { ...ownProps, isLoadingAsset, config: state.config };
}

const mapDispatchToProps = {
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorPreviewPaneProps = ConnectedProps<typeof connector>;

export default connector(translate()(PreviewPane) as ComponentType<EditorPreviewPaneProps>);
