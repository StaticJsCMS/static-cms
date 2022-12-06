import { styled } from '@mui/material/styles';
import React, { Fragment, isValidElement, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { ScrollSyncPane } from 'react-scroll-sync';

import { getAsset as getAssetAction } from '@staticcms/core/actions/media';
import { ErrorBoundary } from '@staticcms/core/components/UI';
import { lengths } from '@staticcms/core/components/UI/styles';
import { getPreviewStyles, getPreviewTemplate, resolveWidget } from '@staticcms/core/lib/registry';
import { selectTemplateName, useInferedFields } from '@staticcms/core/lib/util/collection.util';
import { selectField } from '@staticcms/core/lib/util/field.util';
import { selectIsLoadingAsset } from '@staticcms/core/reducers/medias';
import { getTypedFieldForValue } from '@staticcms/list/typedListHelpers';
import EditorPreview from './EditorPreview';
import EditorPreviewContent from './EditorPreviewContent';
import PreviewHOC from './PreviewHOC';

import type { InferredField } from '@staticcms/core/constants/fieldInference';
import type {
  Collection,
  Config,
  Entry,
  EntryData,
  Field,
  GetAssetFunction,
  ListField,
  ObjectValue,
  RenderedField,
  TemplatePreviewProps,
  TranslatedProps,
  ValueOrNestedValue,
  WidgetPreviewComponent,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ComponentType, ReactFragment, ReactNode } from 'react';
import type { ConnectedProps } from 'react-redux';

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
    return value.type === Fragment;
  }

  return value === Fragment;
}

function getWidget(
  config: Config,
  field: RenderedField<Field>,
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

  if (field.widget === 'hidden' || !widget.preview) {
    return null;
  }

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
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        field.name in value &&
        !isJsxElement(value) &&
        !isReactFragment(value)
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
      const cmsConfig = config.config;
      if (!cmsConfig) {
        return {
          data: null,
          widgets: {},
        };
      }

      const field = fields.find(f => f.name === name);
      if (!field || !('fields' in field)) {
        return {
          data: null,
          widgets: {},
        };
      }

      const value = entry.data?.[field.name];
      const nestedFields = field && 'fields' in field ? field.fields ?? [] : [];

      if (field.widget === 'list' || Array.isArray(value)) {
        let finalValue: ObjectValue[];
        if (!value || typeof value !== 'object') {
          finalValue = [];
        } else if (!Array.isArray(value)) {
          finalValue = [value];
        } else {
          finalValue = value as ObjectValue[];
        }

        return finalValue
          .filter((val: unknown) => typeof val === 'object')
          .map((val: ObjectValue) => {
            const widgets = nestedFields.reduce((acc, field, index) => {
              acc[field.name] = (
                <div key={index}>
                  {getWidgetFor(
                    cmsConfig,
                    collection,
                    field.name,
                    fields,
                    entry,
                    inferedFields,
                    handleGetAsset,
                    nestedFields,
                    val,
                    index,
                  )}
                </div>
              );
              return acc;
            }, {} as Record<string, ReactNode>);
            return { data: val, widgets };
          });
      }

      if (typeof value !== 'object') {
        return {
          data: {},
          widgets: {},
        };
      }

      return {
        data: value,
        widgets: nestedFields.reduce((acc, field, index) => {
          acc[field.name] = (
            <div key={index}>
              {getWidgetFor(
                cmsConfig,
                collection,
                field.name,
                fields,
                entry,
                inferedFields,
                handleGetAsset,
                nestedFields,
                value,
                index,
              )}
            </div>
          );
          return acc;
        }, {} as Record<string, ReactNode>),
      };
    },
    [collection, config.config, entry, fields, handleGetAsset, inferedFields],
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
        <head>
          <base target="_blank"/>
        </head>
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
