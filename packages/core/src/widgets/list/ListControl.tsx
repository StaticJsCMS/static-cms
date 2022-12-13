import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { styled } from '@mui/material/styles';
import { arrayMoveImmutable } from 'array-move';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import FieldLabel from '@staticcms/core/components/UI/FieldLabel';
import ObjectWidgetTopBar from '@staticcms/core/components/UI/ObjectWidgetTopBar';
import Outline from '@staticcms/core/components/UI/Outline';
import transientOptions from '@staticcms/core/lib/util/transientOptions';
import ListItem from './ListItem';
import { resolveFieldKeyType, TYPES_KEY } from './typedListHelpers';

import type { DragEndEvent } from '@dnd-kit/core';
import type {
  Entry,
  Field,
  FieldsErrors,
  I18nSettings,
  ListField,
  ObjectValue,
  UnknownField,
  ValueOrNestedValue,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

const StyledListWrapper = styled('div')`
  position: relative;
  width: 100%;
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
    width: 100%;
    ${
      $collapsed
        ? `
          display: none;
        `
        : `
          padding: 16px;
        `
    }
  `,
);

interface SortableItemProps {
  id: string;
  item: ObjectValue;
  index: number;
  valueType: ListValueType;
  handleRemove: (index: number, event: MouseEvent) => void;
  entry: Entry<ObjectValue>;
  field: ListField;
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  isFieldDuplicate: ((field: Field<UnknownField>) => boolean) | undefined;
  isFieldHidden: ((field: Field<UnknownField>) => boolean) | undefined;
  locale: string | undefined;
  path: string;
  value: Record<string, ObjectValue>;
  i18n: I18nSettings | undefined;
}

const SortableItem: FC<SortableItemProps> = ({
  id,
  item,
  index,
  valueType,
  handleRemove,
  entry,
  field,
  fieldsErrors,
  submitted,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  path,
  i18n,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (valueType === null) {
    return <div key={id} />;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ListItem
        index={index}
        id={id}
        key={`sortable-item-${id}`}
        valueType={valueType}
        handleRemove={handleRemove}
        data-testid={`object-control-${index}`}
        entry={entry}
        field={field}
        fieldsErrors={fieldsErrors}
        submitted={submitted}
        isFieldDuplicate={isFieldDuplicate}
        isFieldHidden={isFieldHidden}
        locale={locale}
        path={path}
        value={item as Record<string, ObjectValue>}
        i18n={i18n}
        listeners={listeners}
      />
    </div>
  );
};

export enum ListValueType {
  MULTIPLE,
  MIXED,
}

function getFieldsDefault(fields: Field[], initialValue: ObjectValue = {}): ObjectValue {
  return fields.reduce((acc, item) => {
    const subfields = 'fields' in item && item.fields;
    const name = item.name;
    const defaultValue: ValueOrNestedValue | null =
      'default' in item && item.default ? item.default : null;

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

const ListControl: FC<WidgetControlProps<ObjectValue[], ListField>> = ({
  entry,
  field,
  fieldsErrors,
  submitted,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  onChange,
  path,
  t,
  value,
  i18n,
  hasErrors,
}) => {
  const internalValue = useMemo(() => value ?? [], [value]);
  const [collapsed, setCollapsed] = useState(field.collapsed ?? true);
  const [keys, setKeys] = useState(Array.from({ length: internalValue.length }, () => uuid()));

  const valueType = useMemo(() => {
    if ('fields' in field) {
      return ListValueType.MULTIPLE;
    } else if ('types' in field) {
      return ListValueType.MIXED;
    } else {
      return null;
    }
  }, [field]);

  const multipleDefault = useCallback((fields: Field[]) => {
    return getFieldsDefault(fields);
  }, []);

  const mixedDefault = useCallback(
    (typeKey: string, type: string): ObjectValue => {
      const selectedType = 'types' in field && field.types?.find(f => f.name === type);
      if (!selectedType) {
        return {};
      }

      return getFieldsDefault(selectedType.fields ?? [], { [typeKey]: type });
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
      addItem('fields' in field && field.fields ? multipleDefault(field.fields) : {});
    },
    [addItem, field, multipleDefault],
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

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = keys.indexOf(active.id as string);
      const newIndex = keys.indexOf(over.id as string);

      // Update value
      setKeys(arrayMoveImmutable(keys, oldIndex, newIndex));
      onChange(arrayMoveImmutable(internalValue, oldIndex, newIndex));
    },
    [onChange, internalValue, keys],
  );

  if (valueType === null) {
    return null;
  }

  const label = field.label ?? field.name;
  const labelSingular = field.label_singular ? field.label_singular : field.label ?? field.name;
  const listLabel = internalValue.length === 1 ? labelSingular.toLowerCase() : label.toLowerCase();

  return (
    <StyledListWrapper key="list-widget">
      <FieldLabel key="label">{label}</FieldLabel>
      <ObjectWidgetTopBar
        key="header"
        allowAdd={field.allow_add ?? true}
        onAdd={handleAdd}
        types={field[TYPES_KEY] ?? []}
        onAddType={type => handleAddType(type, resolveFieldKeyType(field))}
        heading={`${internalValue.length} ${listLabel}`}
        label={labelSingular.toLowerCase()}
        onCollapseToggle={handleCollapseAllToggle}
        collapsed={collapsed}
        hasError={hasErrors}
        t={t}
      />
      {internalValue.length > 0 ? (
        <DndContext key="dnd-context" onDragEnd={handleDragEnd}>
          <SortableContext items={keys}>
            <StyledSortableList $collapsed={collapsed}>
              {internalValue.map((item, index) => {
                const key = keys[index];
                if (!key) {
                  return null;
                }

                return (
                  <SortableItem
                    index={index}
                    key={key}
                    id={key}
                    item={item}
                    valueType={valueType}
                    handleRemove={handleRemove}
                    data-testid={`object-control-${index}`}
                    entry={entry}
                    field={field}
                    fieldsErrors={fieldsErrors}
                    submitted={submitted}
                    isFieldDuplicate={isFieldDuplicate}
                    isFieldHidden={isFieldHidden}
                    locale={locale}
                    path={path}
                    value={item as Record<string, ObjectValue>}
                    i18n={i18n}
                  />
                );
              })}
            </StyledSortableList>
          </SortableContext>
        </DndContext>
      ) : null}
      <Outline key="outline" hasLabel hasError={hasErrors} />
    </StyledListWrapper>
  );
};

export default ListControl;
