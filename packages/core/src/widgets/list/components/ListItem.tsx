import partial from 'lodash/partial';
import React, { useMemo } from 'react';

import EditorControl from '@staticcms/core/components/entry-editor/editor-control-pane/EditorControl';
import useHasChildErrors from '@staticcms/core/lib/hooks/useHasChildErrors';
import {
  addFileTemplateFields,
  compileStringTemplate,
} from '@staticcms/core/lib/widgets/stringTemplate';
import ListItemWrapper from '@staticcms/list/components/ListItemWrapper';
import { ListValueType } from '../ListControl';
import { getTypedFieldForValue } from '../typedListHelpers';

import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type {
  Entry,
  EntryData,
  ListField,
  ObjectField,
  ObjectValue,
  ValueOrNestedValue,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

function handleSummary(
  summary: string,
  entry: Entry,
  label: string,
  item: ValueOrNestedValue,
): string {
  if (typeof item === 'object' && !(item instanceof Date) && !Array.isArray(item)) {
    const labeledItem: EntryData = {
      ...item,
      fields: {
        label,
      },
    };
    const data = addFileTemplateFields(entry.path, labeledItem);
    return compileStringTemplate(summary, null, '', data);
  }

  return String(item);
}

function validateItem(field: ListField, item: ValueOrNestedValue) {
  if (field.fields && field.fields.length === 1) {
    return true;
  }

  if (typeof item !== 'object') {
    console.warn(
      `[StaticCMS] '${
        field.name
      }' field item value value should be an object but is a '${typeof item}'`,
    );
    return false;
  }

  return true;
}

interface ListItemProps
  extends Pick<
    WidgetControlProps<ValueOrNestedValue, ListField>,
    | 'entry'
    | 'field'
    | 'fieldsErrors'
    | 'submitted'
    | 'disabled'
    | 'duplicate'
    | 'hidden'
    | 'locale'
    | 'path'
    | 'value'
    | 'i18n'
  > {
  valueType: ListValueType;
  index: number;
  id: string;
  listeners: SyntheticListenerMap | undefined;
  handleRemove: (index: number, event: MouseEvent) => void;
}

const ListItem: FC<ListItemProps> = ({
  id,
  index,
  entry,
  field,
  fieldsErrors,
  submitted,
  disabled,
  duplicate,
  hidden,
  locale,
  path,
  valueType,
  value,
  i18n,
  listeners,
  handleRemove,
}) => {
  const [summary, objectField] = useMemo((): [string, ListField | ObjectField] => {
    const childObjectField: ObjectField = {
      name: `${index}`,
      label: field.label,
      summary: field.summary,
      widget: 'object',
      fields: [],
    };

    const base = field.label ?? field.name;
    if (valueType === null) {
      return [base, childObjectField];
    }

    const objectValue = value ?? {};

    switch (valueType) {
      case ListValueType.MIXED: {
        if (!validateItem(field, objectValue)) {
          return [base, childObjectField];
        }

        const mixedObjectValue = objectValue as ObjectValue;

        const [itemTypeName, itemType] = getTypedFieldForValue(field, mixedObjectValue, index);
        if (!itemType) {
          return [base, childObjectField];
        }

        const label = itemType.label ?? itemTypeName;
        // each type can have its own summary, but default to the list summary if exists
        const summary =
          'summary' in itemType && itemType.summary ? itemType.summary : field.summary;
        const labelReturn = summary
          ? `${label} - ${handleSummary(summary, entry, label, mixedObjectValue)}`
          : label;

        return [labelReturn, itemType];
      }
      case ListValueType.MULTIPLE: {
        childObjectField.fields = field.fields ?? [];

        if (!validateItem(field, objectValue)) {
          return [base, childObjectField];
        }

        const multiFields = field.fields;
        const labelField = multiFields && multiFields[0];
        if (!labelField) {
          return [base, childObjectField];
        }

        const labelFieldValue =
          typeof objectValue === 'object' &&
          !(objectValue instanceof Date) &&
          !Array.isArray(objectValue)
            ? objectValue[labelField.name]
            : objectValue;

        const summary = field.summary;
        const labelReturn = summary
          ? handleSummary(summary, entry, String(labelFieldValue), objectValue)
          : String(labelFieldValue);

        return [labelReturn, childObjectField];
      }
    }
  }, [entry, field, index, value, valueType]);

  const hasChildErrors = useHasChildErrors(path, fieldsErrors, i18n, false);

  const finalValue = useMemo(() => {
    if (field.fields && field.fields.length === 1) {
      return {
        [field.fields[0].name]: value,
      };
    }

    return value;
  }, [field.fields, value]);

  const isSingleList = useMemo(() => field.fields?.length === 1, [field.fields?.length]);

  return (
    <div key="sortable-list-item">
      <ListItemWrapper
        key="list-item-top-bar"
        collapsed={field.collapsed}
        onRemove={partial(handleRemove, index)}
        data-testid={`list-item-top-bar-${id}`}
        label={field.label_singular ?? field.label ?? field.name}
        summary={summary}
        listeners={listeners}
        hasErrors={hasChildErrors}
        isSingleField={isSingleList}
        disabled={disabled}
      >
        <EditorControl
          key={`control-${id}`}
          field={objectField}
          value={finalValue}
          fieldsErrors={fieldsErrors}
          submitted={submitted}
          parentPath={path}
          disabled={disabled || duplicate}
          parentDuplicate={duplicate}
          parentHidden={hidden}
          locale={locale}
          i18n={i18n}
          forList={true}
          forSingleList={isSingleList}
        />
      </ListItemWrapper>
    </div>
  );
};

export default ListItem;
