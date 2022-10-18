import { styled } from '@mui/material/styles';
import { arrayMoveImmutable } from 'array-move';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo, useState } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'uuid';

import FieldLabel from '../../components/UI/FieldLabel';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import transientOptions from '../../lib/util/transientOptions';
import ListItem from './ListItem';
import { resolveFieldKeyType, TYPES_KEY } from './typedListHelpers';

import type { MouseEvent } from 'react';
import type { Field, ListField, ObjectValue, WidgetControlProps } from '../../interface';

const StyledListWrapper = styled('div')`
  position: relative;
`;

interface StyledSortableListProps {
  $collapsed: boolean;
}

const StyledSortableList = styled(
  'div',
  transientOptions,
)<StyledSortableListProps>(
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
        : `
          padding: 16px;
        `
    }
  `,
);

interface SortableListProps {
  items: ObjectValue[];
  collapsed: boolean;
  renderItem: (item: ObjectValue, index: number) => JSX.Element;
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, collapsed, renderItem }: SortableListProps) => {
    return <StyledSortableList $collapsed={collapsed}>{items.map(renderItem)}</StyledSortableList>;
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
  entry,
  field,
  fieldsErrors,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  onChange,
  path,
  t,
  value,
  i18n,
}: WidgetControlProps<ObjectValue[], ListField>) => {
  const internalValue = useMemo(() => value ?? [], [value]);
  const [collapsed, setCollapsed] = useState(field.collapsed ?? true);
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

  const singleDefault = useCallback(() => {
    return (field.field && 'default' in field.field ? field.field.default : '') as ObjectValue;
  }, [field.field]);

  const multipleDefault = useCallback((fields: Field[]) => {
    return getFieldsDefault(fields);
  }, []);

  const mixedDefault = useCallback(
    (typeKey: string, type: string): Record<string, ObjectValue> => {
      const selectedType = 'types' in field && field.types?.find(f => f.name === type);
      if (!selectedType) {
        return {};
      }

      return getFieldsDefault(selectedType.fields ?? [], { [typeKey]: { type } });
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
      onChange(newValue);
      setCollapsed(false);
    },
    [field.add_to_top, onChange, internalValue, keys],
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
      onChange(newValue);
    },
    [onChange, internalValue, keys],
  );

  const handleCollapseAllToggle = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setCollapsed(!collapsed);
    },
    [collapsed],
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      // Update value
      setKeys(arrayMoveImmutable(keys, oldIndex, newIndex));
      onChange(arrayMoveImmutable(internalValue, oldIndex, newIndex));
    },
    [onChange, internalValue, keys],
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
          data-testid={`object-control-${index}`}
          entry={entry}
          field={field}
          fieldsErrors={fieldsErrors}
          isFieldDuplicate={isFieldDuplicate}
          isFieldHidden={isFieldHidden}
          locale={locale}
          path={path}
          value={item as Record<string, ObjectValue>}
          i18n={i18n}
        />
      );
    },
    [
      keys,
      valueType,
      handleRemove,
      clearFieldErrors,
      entry,
      field,
      fieldsErrors,
      isFieldDuplicate,
      isFieldHidden,
      locale,
      path,
      i18n,
    ],
  );

  const hasChildErrors = useMemo(
    () =>
      Object.keys(fieldsErrors).some(key => {
        if (key.startsWith(path)) {
          return fieldsErrors[key].length > 0;
        }

        return false;
      }),
    [fieldsErrors, path],
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
        collapsed={collapsed}
        t={t}
      />
      {internalValue.length > 0 ? (
        <SortableList
          collapsed={collapsed}
          items={internalValue}
          renderItem={renderItem}
          onSortEnd={onSortEnd}
          useDragHandle
          lockAxis="y"
        />
      ) : null}
      <Outline hasLabel hasError={hasChildErrors} />
    </StyledListWrapper>
  );
};

export default ListControl;
