import styled from '@emotion/styled';
import { arrayMoveImmutable } from 'array-move';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo, useState } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'uuid';

import FieldLabel from '../../components/UI/FieldLabel';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { getFieldLabel } from '../../lib/util/field.util';
import ListItem from './ListItem';
import { resolveFieldKeyType, TYPES_KEY } from './typedListHelpers';

import type { MouseEvent } from 'react';
import type { Field, FieldList, ObjectValue, WidgetControlProps } from '../../interface';

const StyledListWrapper = styled('div')`
  position: relative;
`;

const StyledSortableList = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

interface SortableListProps {
  items: ObjectValue[];
  renderItem: (item: ObjectValue, index: number) => JSX.Element;
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, renderItem }: SortableListProps) => {
    return <StyledSortableList>{items.map(renderItem)}</StyledSortableList>;
  },
);

export enum ListValueType {
  SINGLE,
  MULTIPLE,
  MIXED,
}

function getFieldsDefault(
  fields: Field[],
  initialValue: Record<string, ObjectValue> = {},
): Record<string, ObjectValue> {
  return fields.reduce((acc, item) => {
    const subfields = ('field' in item && item.field) || ('fields' in item && item.fields);
    const name = item.name;
    const defaultValue = (('default' in item && item.default) ?? null) as ObjectValue;

    if (Array.isArray(subfields)) {
      const subDefaultValue = getFieldsDefault(subfields);
      if (!isEmpty(subDefaultValue)) {
        acc[name] = subDefaultValue;
      }
      return acc;
    } else if (typeof subfields === 'object') {
      const subDefaultValue = getFieldsDefault([subfields]);
      !isEmpty(subDefaultValue) && (acc[name] = subDefaultValue);
      return acc;
    }

    if (defaultValue !== null) {
      acc[name] = defaultValue;
    }

    return acc;
  }, initialValue);
}

const ListControl = ({
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
  value,
}: WidgetControlProps<ObjectValue[], FieldList>) => {
  const internalValue = useMemo(() => value ?? [], [value]);
  const [listCollapsed, setListCollapsed] = useState(field.collapsed ?? true);
  const [keys, setKeys] = useState(Array.from({ length: internalValue.length }, () => uuid()));

  const valueType = useMemo(() => {
    if ('fields' in field) {
      return ListValueType.MULTIPLE;
    } else if ('field' in field) {
      return ListValueType.SINGLE;
    } else if ('types' in field) {
      return ListValueType.MIXED;
    } else {
      return null;
    }
  }, [field]);

  const handleChange = useCallback(
    (newValue: ObjectValue[]) => {
      onChange(path, field, newValue);
    },
    [field, onChange, path],
  );

  const singleDefault = useCallback(() => {
    return (field.field && 'default' in field.field ? field.field.default : '') as ObjectValue;
  }, [field.field]);

  const multipleDefault = useCallback((fields: Field[]) => {
    return getFieldsDefault(fields);
  }, []);

  const mixedDefault = useCallback(
    (typeKey: string, type: string): Record<string, ObjectValue> => {
      const selectedType = 'types' in field && field.types?.find(f => f.name === type);
      if (!selectedType || (!('fields' in selectedType) && !('field' in selectedType))) {
        return {};
      }

      const fields: Field[] =
        'fields' in selectedType
          ? selectedType.fields ?? []
          : selectedType.field
          ? [selectedType.field]
          : [];

      return getFieldsDefault(fields, { [typeKey]: { type } });
    },
    [field],
  );

  const addItem = useCallback(
    (parsedValue: ObjectValue) => {
      const addToTop = field.add_to_top ?? false;

      const newKeys = [...keys];
      const newValue = [...internalValue];
      if (addToTop) {
        newKeys.unshift(uuid());
        newValue.unshift(parsedValue);
      } else {
        newKeys.push(uuid());
        newValue.push(parsedValue);
      }
      setKeys(newKeys);
      handleChange(newValue);
    },
    [field.add_to_top, handleChange, internalValue, keys],
  );

  const handleAdd = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const parsedValue =
        'fields' in field && field.fields ? multipleDefault(field.fields) : singleDefault();

      addItem(parsedValue);
    },
    [addItem, field, multipleDefault, singleDefault],
  );

  const handleAddType = useCallback(
    (type: string, typeKey: string) => {
      const parsedValue = mixedDefault(typeKey, type);
      addItem(parsedValue);
    },
    [addItem, mixedDefault],
  );

  const handleRemove = useCallback(
    (index: number, event: MouseEvent) => {
      event.preventDefault();

      const newKeys = [...keys];
      const newValue = [...internalValue];

      newKeys.splice(index, 1);
      newValue.splice(index, 1);

      setKeys(newKeys);
      handleChange(newValue);
    },
    [handleChange, internalValue, keys],
  );

  const handleCollapseAllToggle = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setListCollapsed(!listCollapsed);
    },
    [listCollapsed],
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      // Update value
      setKeys(arrayMoveImmutable(keys, oldIndex, newIndex));
      handleChange(arrayMoveImmutable(internalValue, oldIndex, newIndex));
    },
    [handleChange, internalValue, keys],
  );

  const renderItem = useCallback(
    (item: ObjectValue, index: number) => {
      const key = keys[index];
      if (!valueType) {
        return <div />;
      }

      return (
        <ListItem
          index={index}
          key={key}
          valueType={valueType}
          handleRemove={handleRemove}
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
          path={path}
          query={query}
          t={t}
          value={item as Record<string, ObjectValue>}
        />
      );
    },
    [
      clearFieldErrors,
      clearSearch,
      collection,
      config,
      entry,
      field,
      fieldsErrors,
      getAsset,
      handleRemove,
      isDisabled,
      isEditorComponent,
      isFetching,
      isFieldDuplicate,
      isFieldHidden,
      isNewEditorComponent,
      keys,
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
    ],
  );

  if (valueType === null) {
    return null;
  }

  const label = field.label ?? field.name;
  const labelSingular = field.label_singular ? field.label_singular : field.label ?? field.name;
  const listLabel = internalValue.length === 1 ? labelSingular.toLowerCase() : label.toLowerCase();

  return (
    <StyledListWrapper>
      <FieldLabel>{label}</FieldLabel>
      <ObjectWidgetTopBar
        allowAdd={field.allow_add ?? true}
        onAdd={handleAdd}
        types={field[TYPES_KEY] ?? []}
        onAddType={type => handleAddType(type, resolveFieldKeyType(field))}
        heading={`${internalValue.length} ${listLabel}`}
        label={labelSingular.toLowerCase()}
        onCollapseToggle={handleCollapseAllToggle}
        collapsed={listCollapsed}
        t={t}
      />
      {!listCollapsed ? (
        <SortableList
          items={internalValue}
          renderItem={renderItem}
          onSortEnd={onSortEnd}
          useDragHandle
          lockAxis="y"
        />
      ) : null}
      <Outline hasLabel />
    </StyledListWrapper>
  );
};

export default ListControl;
