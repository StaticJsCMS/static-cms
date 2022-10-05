import React, { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { lengths } from '../../../ui';
import {
  resolveWidget,
  getPreviewTemplate,
  getPreviewStyles,
  getRemarkPlugins,
} from '../../../lib/registry';
import { ErrorBoundary } from '../../UI';
import { selectTemplateName, selectInferedField, selectField } from '../../../reducers/collections';
import { boundGetAsset } from '../../../actions/media';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { INFERABLE_FIELDS } from '../../../constants/fieldInference';
import EditorPreviewContent from './EditorPreviewContent';
import PreviewHOC from './PreviewHOC';
import EditorPreview from './EditorPreview';

import type { ConnectedProps } from 'react-redux';
import type { CmsField, Collection, Entry, GetAssetFunction, State } from '../../../interface';
import type { Dispatch } from '@reduxjs/toolkit';
import type { InferredField } from '../../../constants/fieldInference';

const PreviewPaneFrame = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
  overflow: auto;
`;

const PreviewPane = ({
  entry,
  collection,
  config,
  fields,
  fieldsMetaData,
}: EditorPreviewPaneProps) => {
  // getWidget = (field, value, metadata, props, idx = null) => {
  //   const { getAsset, entry } = props;
  //   const widget = resolveWidget(field.widget);
  //   const key = idx ? field.name + '_' + idx : field.name;
  //   const valueIsInMap = value && !widget.allowMapValue && Record.isMap(value);

  //   /**
  //    * Use an HOC to provide conditional updates for all previews.
  //    */
  //   return !widget.preview ? null : (
  //     <PreviewHOC
  //       previewComponent={widget.preview}
  //       key={key}
  //       field={field}
  //       getAsset={getAsset}
  //       value={valueIsInMap ? value.get(field.name) : value}
  //       entry={entry}
  //       fieldsMetaData={metadata}
  //       resolveWidget={resolveWidget}
  //       getRemarkPlugins={getRemarkPlugins}
  //     />
  //   );
  // };

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

  /**
   * Returns the widget component for a named field, and makes recursive calls
   * to retrieve components for nested and deeply nested fields, which occur in
   * object and list type fields. Used internally to retrieve widgets, and also
   * exposed for use in custom preview templates.
   */
  const widgetFor = useCallback(
    (
      name: string,
      widgetFields: CmsField[] = fields,
      values: Record<string, unknown> = entry.data,
      widgetFieldsMetaData: Record<string, unknown>[] = fieldsMetaData,
    ) => {
      // We retrieve the field by name so that this function can also be used in
      // custom preview templates, where the field object can't be passed in.
      let field = widgetFields && widgetFields.find(f => f.name === name);
      if (!field) {
        return null;
      }

      let value = values[field.name];
      if ('meta' in field) {
        value = entry.meta[field.name];
      }
      const nestedFields = field.fields;
      const singleField = field.field;
      const metadata = widgetFieldsMetaData && (widgetFieldsMetaData[field.name] ?? {});

      if (nestedFields) {
        field = field.set('fields', this.getNestedWidgets(nestedFields, value, metadata));
      }

      if (singleField) {
        field = field.set('field', this.getSingleNested(singleField, value, metadata));
      }

      const labelledWidgets = ['string', 'text', 'number'];
      const inferedField = Object.entries(this.inferedFields)
        .filter(([key]) => {
          const fieldToMatch = selectField(this.props.collection, key);
          return fieldToMatch === field;
        })
        .map(([, value]) => value)[0];

      if (inferedField) {
        value = inferedField.defaultPreview(value);
      } else if (
        value &&
        labelledWidgets.indexOf(field.widget) !== -1 &&
        value.toString().length < 50
      ) {
        value = (
          <div>
            <strong>{field.get('label', field.name)}:</strong> {value}
          </div>
        );
      }

      return value ? this.getWidget(field, value, metadata, this.props) : null;
    },
    [],
  );

  // /**
  //  * Retrieves widgets for nested fields (children of object/list fields)
  //  */
  // getNestedWidgets = (fields, values, fieldsMetaData) => {
  //   // Fields nested within a list field will be paired with a List of value Maps.
  //   if (List.isList(values)) {
  //     return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
  //   }
  //   // Fields nested within an object field will be paired with a single Record of values.
  //   return this.widgetsForNestedFields(fields, values, fieldsMetaData);
  // };

  // getSingleNested = (field, values, fieldsMetaData) => {
  //   if (List.isList(values)) {
  //     return values.map((value, idx) =>
  //       this.getWidget(field, value, fieldsMetaData.get(field.name), this.props, idx),
  //     );
  //   }
  //   return this.getWidget(field, values, fieldsMetaData.get(field.name), this.props);
  // };

  // /**
  //  * Use widgetFor as a mapping function for recursive widget retrieval
  //  */
  // widgetsForNestedFields = (fields, values, fieldsMetaData) => {
  //   return fields.map(field => this.widgetFor(field.name, fields, values, fieldsMetaData));
  // };

  // /**
  //  * This function exists entirely to expose nested widgets for object and list
  //  * fields to custom preview templates.
  //  *
  //  * TODO: see if widgetFor can now provide this functionality for preview templates
  //  */
  // widgetsFor = name => {
  //   const { fields, entry, fieldsMetaData } = this.props;
  //   const field = fields.find(f => f.name === name);
  //   const nestedFields = field && field.fields;
  //   const value = entry.getIn(['data', field.name]);
  //   const metadata = fieldsMetaData.get(field.name, Record());

  //   if (List.isList(value)) {
  //     return value.map(val => {
  //       const widgets =
  //         nestedFields &&
  //         Record(
  //           nestedFields.map((f, i) => [
  //             f.name,
  //             <div key={i}>{this.getWidget(f, val, metadata.get(f.name), this.props)}</div>,
  //           ]),
  //         );
  //       return Record({ data: val, widgets });
  //     });
  //   }

  //   return Record({
  //     data: value,
  //     widgets:
  //       nestedFields &&
  //       Record(
  //         nestedFields.map(f => [
  //           f.name,
  //           this.getWidget(f, value, metadata.get(f.name), this.props),
  //         ]),
  //       ),
  //   });
  // };

  if (!entry || !entry.data) {
    return null;
  }

  const previewComponent =
    getPreviewTemplate(selectTemplateName(collection, entry.slug)) || EditorPreview;

  const previewProps = {
    ...this.props,
    widgetFor: this.widgetFor,
    widgetsFor: this.widgetsFor,
  };

  const styleEls = getPreviewStyles().map((style, i) => {
    if (style.raw) {
      return <style key={i}>{style.value}</style>;
    }
    return <link key={i} href={style.value} type="text/css" rel="stylesheet" />;
  });

  if (!collection) {
    <PreviewPaneFrame id="preview-pane" head={styleEls} />;
  }

  const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;

  return (
    <ErrorBoundary config={config}>
      <PreviewPaneFrame id="preview-pane" head={styleEls} initialContent={initialContent}>
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
  fieldsMetaData: Record<string, unknown>[];
  getAsset: GetAssetFunction;
}

function mapStateToProps(state: State) {
  const isLoadingAsset = selectIsLoadingAsset(state.medias);
  return { isLoadingAsset, config: state.config };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    boundGetAsset: (collection: Collection, entry: Entry) =>
      boundGetAsset(dispatch, collection, entry),
  };
}

function mergeProps(
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: EditorPreviewPaneOwnProps,
) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    getAsset: dispatchProps.boundGetAsset(ownProps.collection, ownProps.entry),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);
export type EditorPreviewPaneProps = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PreviewPane);
