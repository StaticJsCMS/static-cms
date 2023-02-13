import partial from 'lodash/partial';
import React, { useCallback, useMemo, useState } from 'react';

import EditorControl from '@staticcms/core/components/editor/EditorControlPane/EditorControl';
import ListItemTopBar from '@staticcms/core/components/UI/ListItemTopBar';
import Outline from '@staticcms/core/components/UI/Outline';
import {
  addFileTemplateFields,
  compileStringTemplate,
} from '@staticcms/core/lib/widgets/stringTemplate';
import { ListValueType } from './ListControl';
import { getTypedFieldForValue } from './typedListHelpers';

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

function handleSummary(summary: string, entry: Entry, label: string, item: ValueOrNestedValue) {
  if (typeof item === 'object' && !Array.isArray(item)) {
    const labeledItem: EntryData = {
      ...item,
      fields: {
        label,
      },
    };
    const data = addFileTemplateFields(entry.path, labeledItem);
    return compileStringTemplate(summary, null, '', data);
  }

  return item;
}

function validateItem(field: ListField, item: ValueOrNestedValue) {
  if (field.fields && field.fields.length === 1) {
    return true;
  }

  if (typeof item !== 'object') {
    console.warn(
      `'${field.name}' field item value value should be an object but is a '${typeof item}'`,
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
    | 'isFieldDuplicate'
    | 'isFieldHidden'
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
  isFieldDuplicate,
  isFieldHidden,
  locale,
  path,
  valueType,
  handleRemove,
  value,
  i18n,
  listeners,
}) => {
  const [objectLabel, objectField] = useMemo((): [string, ListField | ObjectField] => {
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

        const itemType = getTypedFieldForValue(field, mixedObjectValue, index);
        if (!itemType) {
          return [base, childObjectField];
        }

        const label = itemType.label ?? itemType.name;
        // each type can have its own summary, but default to the list summary if exists
        const summary = ('summary' in itemType && itemType.summary) ?? field.summary;
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
          typeof objectValue === 'object' && !Array.isArray(objectValue)
            ? objectValue[labelField.name]
            : objectValue;

        const summary = field.summary;
        const labelReturn = summary
          ? handleSummary(summary, entry, String(labelFieldValue), objectValue)
          : labelFieldValue;
        return [(labelReturn || `No ${labelField.name}`).toString(), childObjectField];
      }
    }
  }, [entry, field, index, value, valueType]);

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapseToggle = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setCollapsed(!collapsed);
    },
    [collapsed],
  );

  const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
  const isHidden = isFieldHidden && isFieldHidden(field);

  const finalValue = useMemo(() => {
    if (field.fields && field.fields.length === 1) {
      return {
        [field.fields[0].name]: value,
      };
    }

    return value;
  }, [field.fields, value]);

  return (
    <div key="sortable-list-item">
      <>
        <ListItemTopBar
          key="list-item-top-bar"
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          onRemove={partial(handleRemove, index)}
          data-testid={`list-item-top-bar-${id}`}
          title={objectLabel}
          isVariableTypesList={valueType === ListValueType.MIXED}
          listeners={listeners}
        />
        <div>
          {/* TODO $collapsed={collapsed} */}
          <EditorControl
            key={`control-${id}`}
            field={objectField}
            value={finalValue}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            parentPath={path}
            isDisabled={isDuplicate}
            isHidden={isHidden}
            isFieldDuplicate={isFieldDuplicate}
            isFieldHidden={isFieldHidden}
            locale={locale}
            i18n={i18n}
            forList={true}
          />
        </div>
        <Outline key="outline" />
      </>
    </div>
  );
};

export default ListItem;
