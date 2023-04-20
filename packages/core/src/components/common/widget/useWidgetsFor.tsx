import React, { useCallback } from 'react';

import { useInferredFields } from '@staticcms/core/lib/util/collection.util';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import getWidgetFor from './widgetFor';

import type {
  Collection,
  Config,
  Entry,
  EntryData,
  Field,
  ObjectValue,
  WidgetFor,
  WidgetsFor,
} from '@staticcms/core/interface';
import type { ReactNode } from 'react';

export default function useWidgetsFor(
  config: Config | undefined,
  collection: Collection,
  fields: Field[],
  entry: Entry,
): {
  widgetFor: WidgetFor;
  widgetsFor: WidgetsFor;
} {
  const inferredFields = useInferredFields(collection);

  const theme = useAppSelector(selectTheme);

  const widgetFor = useCallback(
    (name: string): ReturnType<WidgetFor<EntryData>> => {
      if (!config) {
        return null;
      }
      return getWidgetFor(config, collection, name, fields, entry, theme, inferredFields);
    },
    [collection, config, entry, fields, inferredFields, theme],
  );

  /**
   * This function exists entirely to expose nested widgets for object and list
   * fields to custom preview templates.
   */
  const widgetsFor = useCallback(
    (name: string): ReturnType<WidgetsFor<EntryData>> => {
      if (!config) {
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
        if (!value || typeof value !== 'object' || value instanceof Date) {
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
                    config,
                    collection,
                    field.name,
                    fields,
                    entry,
                    theme,
                    inferredFields,
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

      if (typeof value !== 'object' || value instanceof Date) {
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
                config,
                collection,
                field.name,
                fields,
                entry,
                theme,
                inferredFields,
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
    [collection, config, entry, fields, inferredFields, theme],
  );

  return {
    widgetFor: widgetFor as WidgetFor,
    widgetsFor: widgetsFor as WidgetsFor,
  };
}
