import { styled } from '@mui/material/styles';
import partial from 'lodash/partial';
import React, { useCallback, useMemo, useState } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import ListItemTopBar from '../../components/UI/ListItemTopBar';
import Outline from '../../components/UI/Outline';
import { colors, lengths } from '../../components/UI/styles';
import { transientOptions } from '../../lib';
import { addFileTemplateFields, compileStringTemplate } from '../../lib/widgets/stringTemplate';
import { ListValueType } from './ListControl';
import { getErrorMessageForTypedFieldAndValue, getTypedFieldForValue } from './typedListHelpers';

import type { MouseEvent } from 'react';
import type {
  Entry,
  EntryData,
  Field,
  ListField,
  ObjectField,
  ObjectValue,
  WidgetControlProps,
} from '../../interface';

const StyledListItem = styled('div')`
  position: relative;
`;

const SortableStyledListItem = SortableElement<{ children: JSX.Element }>(StyledListItem);

const StyledListItemTopBar = styled(ListItemTopBar)`
  background-color: ${colors.textFieldBorder};
`;

interface NestedObjectLabelProps {
  $collapsed: boolean;
  $error: boolean;
}

const NestedObjectLabel = styled(
  'div',
  transientOptions,
)<NestedObjectLabelProps>(
  ({ $collapsed, $error }) => `
    display: flex;
    border-top: 0;
    color: ${$error ? colors.errorText : 'inherit'};
    background-color: ${colors.textFieldBorder};
    padding: 6px 13px;
    border-radius: 0 0 ${lengths.borderRadius} ${lengths.borderRadius};
    ${
      $collapsed
        ? `
        visibility: hidden;
        height: 0;
        width: 0;
        `
        : ''
    }
  `,
);

interface StyledObjectFieldWrapperProps {
  $collapsed: boolean;
}

const StyledObjectFieldWrapper = styled(
  'div',
  transientOptions,
)<StyledObjectFieldWrapperProps>(
  ({ $collapsed }) => `
    display: flex;
    flex-direction: column;
    gap: 16px;
    ${
      $collapsed
        ? `
        visibility: hidden;
        height: 0;
        width: 0;
        `
        : ''
    }
  `,
);

function handleSummary(summary: string, entry: Entry, label: string, item: ObjectValue) {
  const labeledItem: EntryData = {
    ...item,
    fields: {
      label,
    },
  };
  const data = addFileTemplateFields(entry.path, labeledItem);
  return compileStringTemplate(summary, null, '', data);
}

function validateItem(field: ListField, item: ObjectValue) {
  if (!(typeof item === 'object')) {
    console.warn(
      `'${field.name}' field item value value should be an object but is a '${typeof item}'`,
    );
    return false;
  }

  return true;
}

interface ListItemProps
  extends Pick<
    WidgetControlProps<ObjectValue, ListField>,
    | 'clearFieldErrors'
    | 'entry'
    | 'field'
    | 'fieldsErrors'
    | 'isFieldDuplicate'
    | 'isFieldHidden'
    | 'locale'
    | 'path'
    | 'value'
    | 'i18n'
  > {
  valueType: ListValueType;
  index: number;
  handleRemove: (index: number, event: MouseEvent) => void;
}

const ListItem = ({
  index,
  clearFieldErrors,
  entry,
  field,
  fieldsErrors,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  path,
  valueType,
  handleRemove,
  value,
  i18n,
}: ListItemProps) => {
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
          return [base, field];
        }

        const itemType = getTypedFieldForValue(field, objectValue);
        if (!itemType) {
          return [base, field];
        }

        const label = itemType.label ?? itemType.name;
        // each type can have its own summary, but default to the list summary if exists
        const summary = ('summary' in itemType && itemType.summary) ?? field.summary;
        const labelReturn = summary
          ? `${label} - ${handleSummary(summary, entry, label, objectValue)}`
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

        const labelFieldValue = objectValue[labelField.name];

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

  const isVariableTypesList = valueType === ListValueType.MIXED;
  let itemField: Field | undefined = field;
  if (isVariableTypesList) {
    itemField = getTypedFieldForValue(field, value);
  }

  const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
  const isHidden = isFieldHidden && isFieldHidden(field);

  return (
    <SortableStyledListItem key="sortable-list-item" index={index}>
      <>
        <StyledListItemTopBar
          key="list-item-top-bar"
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          onRemove={partial(handleRemove, index)}
          dragHandleHOC={SortableHandle}
          data-testid={`styled-list-item-top-bar-${index}`}
          title={objectLabel}
          isVariableTypesList={isVariableTypesList}
        />
        {!itemField ? (
          <NestedObjectLabel key="type-field-error-message" $collapsed={collapsed} $error={true}>
            {getErrorMessageForTypedFieldAndValue(field, value)}
          </NestedObjectLabel>
        ) : (
          <StyledObjectFieldWrapper $collapsed={collapsed}>
            <EditorControl
              key={index}
              field={objectField}
              value={value}
              clearFieldErrors={clearFieldErrors}
              fieldsErrors={fieldsErrors}
              parentPath={path}
              isDisabled={isDuplicate}
              isHidden={isHidden}
              isFieldDuplicate={isFieldDuplicate}
              isFieldHidden={isFieldHidden}
              locale={locale}
              i18n={i18n}
              forList
            />
          </StyledObjectFieldWrapper>
        )}
        <Outline key="outline" />
      </>
    </SortableStyledListItem>
  );
};

export default ListItem;
