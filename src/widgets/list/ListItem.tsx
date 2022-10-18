import { styled } from '@mui/material/styles';
import partial from 'lodash/partial';
import React, { useCallback, useMemo, useState } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import ListItemTopBar from '../../components/UI/ListItemTopBar';
import Outline from '../../components/UI/Outline';
import { colors, lengths } from '../../components/UI/styles';
import { transientOptions } from '../../lib';
import { getFieldLabel } from '../../lib/util/field.util';
import { addFileTemplateFields, compileStringTemplate } from '../../lib/widgets/stringTemplate';
import ObjectControl from '../object/ObjectControl';
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
  WidgetControlProps
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

interface ListItemProps extends WidgetControlProps<ObjectValue, ListField> {
  valueType: ListValueType;
  index: number;
  handleRemove: (index: number, event: MouseEvent) => void;
}

const ListItem = ({
  index,
  clearFieldErrors,
  clearSearch,
  collection,
  config,
  entry,
  field,
  fieldsErrors,
  getAsset,
  isDisabled,
  isEditorComponent,
  isFetching,
  isFieldDuplicate,
  isFieldHidden,
  isNewEditorComponent,
  loadEntry,
  locale,
  mediaPaths,
  addAsset,
  onChange,
  clearMediaControl,
  openMediaLibrary,
  persistMedia,
  removeInsertedMedia,
  removeMediaControl,
  path,
  query,
  t,
  valueType,
  handleRemove,
  value,
}: ListItemProps) => {
  const [objectLabel, objectField] = useMemo((): [string, ListField | ObjectField] => {
    const base = field.label ?? field.name;
    if (!value) {
      return [base, field];
    }

    switch (valueType) {
      case ListValueType.MIXED: {
        if (!validateItem(field, value)) {
          return [base, field];
        }

        const itemType = getTypedFieldForValue(field, value);
        if (!itemType) {
          return [base, field];
        }

        const label = itemType.label ?? itemType.name;
        // each type can have its own summary, but default to the list summary if exists
        const summary = ('summary' in itemType && itemType.summary) ?? field.summary;
        const labelReturn = summary
          ? `${label} - ${handleSummary(summary, entry, label, value)}`
          : label;
        return [labelReturn, itemType];
      }
      case ListValueType.SINGLE: {
        const singleField = field.field;
        if (!singleField) {
          return [base, field];
        }

        const label = singleField.label ?? singleField.name;
        const summary = field.summary;
        const data = { [singleField.name]: value };
        const labelReturn = summary
          ? `${label} - ${handleSummary(summary, entry, label, data)}`
          : label;
        return [labelReturn, field];
      }
      case ListValueType.MULTIPLE: {
        if (!validateItem(field, value)) {
          return [base, field];
        }
        const multiFields = field.fields;
        const labelField = multiFields && multiFields[0];
        if (!labelField) {
          return [base, field];
        }

        const labelFieldValue = value[labelField.name];

        const summary = field.summary;
        const labelReturn = summary
          ? handleSummary(summary, entry, String(labelFieldValue), value)
          : labelFieldValue;
        return [(labelReturn || `No ${labelField.name}`).toString(), field];
      }
    }
  }, [entry, field, value, valueType]);

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapseToggle = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setCollapsed(!collapsed);
    },
    [collapsed],
  );

  const errors = useMemo(() => fieldsErrors[path], [fieldsErrors, path]);
  const hasError = useMemo(() => errors?.length > 0, [errors?.length]);
  const isVariableTypesList = valueType === ListValueType.MIXED;
  let itemField: Field | undefined = field;
  if (isVariableTypesList) {
    itemField = getTypedFieldForValue(field, value);
  }

  const fieldLabel = useMemo(() => getFieldLabel(field, t), [field, t]);

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
            <ObjectControl
              key="object-control"
              clearFieldErrors={clearFieldErrors}
              clearSearch={clearSearch}
              collection={collection}
              config={config}
              data-testid={`object-control-${index}`}
              entry={entry}
              field={objectField}
              fieldsErrors={fieldsErrors}
              forList
              getAsset={getAsset}
              hasError={hasError}
              isDisabled={isDisabled}
              isEditorComponent={isEditorComponent}
              isFetching={isFetching}
              isFieldDuplicate={isFieldDuplicate}
              isFieldHidden={isFieldHidden}
              isNewEditorComponent={isNewEditorComponent}
              label={fieldLabel}
              loadEntry={loadEntry}
              locale={locale}
              mediaPaths={mediaPaths}
              addAsset={addAsset}
              onChange={onChange}
              clearMediaControl={clearMediaControl}
              openMediaLibrary={openMediaLibrary}
              persistMedia={persistMedia}
              removeInsertedMedia={removeInsertedMedia}
              removeMediaControl={removeMediaControl}
              path={`${path}.${index}`}
              query={query}
              t={t}
              value={value}
            />
          </StyledObjectFieldWrapper>
        )}
        <Outline key="outline" />
      </>
    </SortableStyledListItem>
  );
};

export default ListItem;
