import { styled } from '@mui/material/styles';
import partial from 'lodash/partial';
import React, { useCallback, useMemo, useState } from 'react';

import EditorControl from '@staticcms/core/components/Editor/EditorControlPane/EditorControl';
import ListItemTopBar from '@staticcms/core/components/UI/ListItemTopBar';
import Outline from '@staticcms/core/components/UI/Outline';
import { colors } from '@staticcms/core/components/UI/styles';
import { transientOptions } from '@staticcms/core/lib';
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
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

const StyledListItem = styled('div')`
  position: relative;
`;

const StyledListItemTopBar = styled(ListItemTopBar)`
  background-color: ${colors.textFieldBorder};
`;

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
          display: none;
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

        const itemType = getTypedFieldForValue(field, objectValue, index);
        if (!itemType) {
          return [base, childObjectField];
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

  const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
  const isHidden = isFieldHidden && isFieldHidden(field);

  return (
    <StyledListItem key="sortable-list-item">
      <>
        <StyledListItemTopBar
          key="list-item-top-bar"
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          onRemove={partial(handleRemove, index)}
          data-testid={`styled-list-item-top-bar-${id}`}
          title={objectLabel}
          isVariableTypesList={valueType === ListValueType.MIXED}
          listeners={listeners}
        />
        <StyledObjectFieldWrapper $collapsed={collapsed}>
          <EditorControl
            key={`control-${id}`}
            field={objectField}
            value={value}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
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
        <Outline key="outline" />
      </>
    </StyledListItem>
  );
};

export default ListItem;
