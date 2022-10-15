import styled from '@emotion/styled';
import partial from 'lodash/partial';
import React, { useCallback, useMemo, useState } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import FieldLabel from '../../components/UI/FieldLabel';
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
import type { t } from 'react-polyglot';
import type {
  Entry,
  EntryData,
  Field,
  FieldList,
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
    display: ${$collapsed ? 'block' : 'none'};
    border-top: 0;
    color: ${$error ? colors.errorText : 'inherit'};
    background-color: ${colors.textFieldBorder};
    padding: 6px 13px;
    border-radius: 0 0 ${lengths.borderRadius} ${lengths.borderRadius};
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

function validateItem(field: FieldList, item: ObjectValue) {
  if (!(typeof item === 'object')) {
    console.warn(
      `'${field.name}' field item value value should be an object but is a '${typeof item}'`,
    );
    return false;
  }

  return true;
}

interface LabelComponentProps {
  field: FieldList;
  isActive: boolean;
  hasErrors: boolean;
  isFieldOptional: boolean;
  t: t;
}

function LabelComponent({ field, isActive, hasErrors, isFieldOptional, t }: LabelComponentProps) {
  const label = `${field.label ?? field.name}`;
  return (
    <FieldLabel isActive={isActive} hasErrors={hasErrors}>
      {label} {`${isFieldOptional ? ` (${t('editor.editorControl.field.optional')})` : ''}`}
    </FieldLabel>
  );
}

interface ListItemProps extends WidgetControlProps<ObjectValue, FieldList> {
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
  onAddAsset,
  onChange,
  onClearMediaControl,
  onOpenMediaLibrary,
  onPersistMedia,
  onRemoveInsertedMedia,
  onRemoveMediaControl,
  onValidate,
  path,
  query,
  t,
  valueType,
  handleRemove,
  value,
}: ListItemProps) => {
  const objectLabel = useMemo(() => {
    if (!value) {
      return '';
    }

    switch (valueType) {
      case ListValueType.MIXED: {
        if (!validateItem(field, value)) {
          return '';
        }

        const itemType = getTypedFieldForValue(field, value);
        if (!itemType) {
          return '';
        }

        const label = itemType.label ?? itemType.name;
        // each type can have its own summary, but default to the list summary if exists
        const summary = ('summary' in itemType && itemType.summary) ?? field.summary;
        const labelReturn = summary ? handleSummary(summary, entry, label, value) : label;
        return labelReturn;
      }
      case ListValueType.SINGLE: {
        const singleField = field.field;
        if (!singleField) {
          return '';
        }

        const label = singleField.label ?? singleField.name;
        const summary = field.summary;
        const data = { [singleField.name]: value };
        const labelReturn = summary ? handleSummary(summary, entry, label, data) : label;
        return labelReturn;
      }
      case ListValueType.MULTIPLE: {
        if (!validateItem(field, value)) {
          return '';
        }
        const multiFields = field.fields;
        const labelField = multiFields && multiFields[0];
        if (!labelField) {
          return '';
        }

        const fieldValue = value[labelField.name];
        const summary = field.summary;
        const labelReturn = summary
          ? handleSummary(summary, entry, String(fieldValue), fieldValue as ObjectValue)
          : fieldValue;
        return (labelReturn || `No ${labelField.name}`).toString();
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

  return (
    <SortableStyledListItem index={index} key={index}>
      <>
        {isVariableTypesList ? (
          <LabelComponent
            field={field}
            isActive={false}
            hasErrors={hasError}
            isFieldOptional={field.required === false}
            t={t}
          />
        ) : null}
        <StyledListItemTopBar
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          onRemove={partial(handleRemove, index)}
          dragHandleHOC={SortableHandle}
          data-testid={`styled-list-item-top-bar-${index}`}
          title={collapsed ? objectLabel : null}
          isVariableTypesList={isVariableTypesList}
        />
        {!collapsed ? (
          !itemField ? (
            <NestedObjectLabel $collapsed={true} $error={true}>
              {getErrorMessageForTypedFieldAndValue(field, value)}
            </NestedObjectLabel>
          ) : (
            <ObjectControl
              clearFieldErrors={clearFieldErrors}
              clearSearch={clearSearch}
              collection={collection}
              config={config}
              data-testid={`object-control-${index}`}
              entry={entry}
              field={field}
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
              label={getFieldLabel(field, t)}
              loadEntry={loadEntry}
              locale={locale}
              mediaPaths={mediaPaths}
              onAddAsset={onAddAsset}
              onChange={onChange}
              onClearMediaControl={onClearMediaControl}
              onOpenMediaLibrary={onOpenMediaLibrary}
              onPersistMedia={onPersistMedia}
              onRemoveInsertedMedia={onRemoveInsertedMedia}
              onRemoveMediaControl={onRemoveMediaControl}
              onValidate={onValidate}
              path={`${path}.${index}`}
              query={query}
              t={t}
              value={value}
            />
          )
        ) : null}
        <Outline />
      </>
    </SortableStyledListItem>
  );
};

export default ListItem;
