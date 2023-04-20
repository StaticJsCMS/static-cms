import React, { Fragment, isValidElement } from 'react';

import { resolveWidget } from '@staticcms/core/lib/registry';
import { selectField } from '@staticcms/core/lib/util/field.util';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { getTypedFieldForValue } from '@staticcms/list/typedListHelpers';
import PreviewHOC from './PreviewHOC';

import type {
  Collection,
  Config,
  Entry,
  EntryData,
  Field,
  InferredField,
  ListField,
  RenderedField,
  ValueOrNestedValue,
  WidgetPreviewComponent,
} from '@staticcms/core/interface';
import type { ReactFragment, ReactNode } from 'react';

/**
 * Returns the widget component for a named field, and makes recursive calls
 * to retrieve components for nested and deeply nested fields, which occur in
 * object and list type fields. Used internally to retrieve widgets, and also
 * exposed for use in custom preview templates.
 */
export default function getWidgetFor(
  config: Config,
  collection: Collection,
  name: string,
  fields: Field[],
  entry: Entry,
  theme: 'dark' | 'light',
  inferredFields: Record<string, InferredField>,
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
  let fieldWithWidgets = field as RenderedField;

  if ('fields' in field && field.fields) {
    fieldWithWidgets = {
      ...fieldWithWidgets,
      renderedFields: getNestedWidgets(
        config,
        collection,
        fields,
        entry,
        theme,
        inferredFields,
        field.fields,
        value as EntryData | EntryData[],
      ),
    };
  } else if ('types' in field && field.types) {
    fieldWithWidgets = {
      ...fieldWithWidgets,
      renderedFields: getTypedNestedWidgets(
        config,
        collection,
        field,
        entry,
        theme,
        inferredFields,
        value as EntryData[],
      ),
    };
  }

  const labelledWidgets = ['string', 'text', 'number'];
  const inferredField = Object.entries(inferredFields)
    .filter(([key]) => {
      const fieldToMatch = selectField(collection, key);
      return fieldToMatch === fieldWithWidgets;
    })
    .map(([, value]) => value)[0];

  let renderedValue: ValueOrNestedValue | ReactNode = value;
  if (inferredField) {
    renderedValue = inferredField.defaultPreview(isNullish(value) ? '' : String(value));
  } else if (
    value &&
    fieldWithWidgets.widget &&
    labelledWidgets.indexOf(fieldWithWidgets.widget) !== -1 &&
    value.toString().length < 50
  ) {
    renderedValue = (
      <div key={field.name}>
        <>
          <strong
            className="
              text-slate-500
              dark:text-slate-400
            "
          >
            {field.label ?? field.name}:
          </strong>
          {value}
        </>
      </div>
    );
  }

  return renderedValue
    ? getWidget(config, fieldWithWidgets, collection, renderedValue, entry, theme, idx)
    : null;
}

/**
 * Retrieves widgets for nested fields (children of object/list fields)
 */
function getNestedWidgets(
  config: Config,
  collection: Collection,
  fields: Field[],
  entry: Entry,
  theme: 'dark' | 'light',
  inferredFields: Record<string, InferredField>,
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
        theme,
        inferredFields,
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
    theme,
    inferredFields,
    widgetFields,
    values,
  );
}

/**
 * Retrieves widgets for nested fields (children of object/list fields)
 */
function getTypedNestedWidgets(
  config: Config,
  collection: Collection,
  field: ListField,
  entry: Entry,
  theme: 'dark' | 'light',
  inferredFields: Record<string, InferredField>,
  values: EntryData[],
) {
  return values
    ?.flatMap((value, index) => {
      const [_, itemType] = getTypedFieldForValue(field, value ?? {}, index);
      if (!itemType) {
        return null;
      }

      return widgetsForNestedFields(
        config,
        collection,
        itemType.fields,
        entry,
        theme,
        inferredFields,
        itemType.fields,
        value,
        index,
      );
    })
    .filter(Boolean);
}

/**
 * Use getWidgetFor as a mapping function for recursive widget retrieval
 */
function widgetsForNestedFields(
  config: Config,
  collection: Collection,
  fields: Field[],
  entry: Entry,
  theme: 'dark' | 'light',
  inferredFields: Record<string, InferredField>,
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
        theme,
        inferredFields,
        widgetFields,
        values,
        idx,
      ),
    )
    .filter(widget => Boolean(widget)) as JSX.Element[];
}

function getWidget(
  config: Config,
  field: RenderedField<Field>,
  collection: Collection,
  value: ValueOrNestedValue | ReactNode,
  entry: Entry,
  theme: 'dark' | 'light',
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
      theme={theme}
    />
  );
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
