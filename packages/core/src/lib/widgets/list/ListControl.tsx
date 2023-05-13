import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from '@staticcms/core/components/common/button/Button';
import Menu from '@staticcms/core/components/common/menu/Menu';
import MenuGroup from '@staticcms/core/components/common/menu/MenuGroup';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import useHasChildErrors from '@staticcms/core/lib/hooks/useHasChildErrors';
import classNames from '@staticcms/core/lib/util/classNames.util';
import ListFieldWrapper from './components/ListFieldWrapper';
import ListItem from './components/ListItem';
import { resolveFieldKeyType, TYPES_KEY } from './typedListHelpers';

import type { DragEndEvent } from '@dnd-kit/core';
import type {
  Entry,
  Field,
  FieldsErrors,
  I18nSettings,
  ListField,
  ObjectValue,
  ValueOrNestedValue,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

function arrayMoveImmutable<T>(array: T[], oldIndex: number, newIndex: number): T[] {
  const newArray = [...array];

  newArray.splice(newIndex, 0, newArray.splice(oldIndex, 1)[0]);

  return newArray;
}

interface SortableItemProps {
  id: string;
  item: ValueOrNestedValue;
  index: number;
  valueType: ListValueType;
  handleRemove: (index: number, event: MouseEvent) => void;
  entry: Entry<ObjectValue>;
  field: ListField;
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  disabled: boolean;
  duplicate: boolean;
  hidden: boolean;
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
  disabled,
  duplicate,
  hidden,
  locale,
  path,
  i18n,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (valueType === null) {
    return <div key={id} />;
  }

  return (
    <div
      ref={setNodeRef}
      data-testid={`object-control-${index}`}
      style={style}
      {...(disabled ? {} : attributes)}
      className={classNames(
        `
          first:pt-0
        `,
        field.fields?.length !== 1 && 'pt-1',
      )}
    >
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
        disabled={disabled}
        duplicate={duplicate}
        hidden={hidden}
        locale={locale}
        path={path}
        value={item}
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

function getFieldsDefault(
  fields: Field[],
  initialValue: ValueOrNestedValue = {},
): ValueOrNestedValue {
  if (fields.length === 1) {
    if ('default' in fields[0] && fields[0].default) {
      return fields[0].default;
    }

    switch (fields[0].widget) {
      case 'string':
      case 'text':
        return '';
      case 'boolean':
        return false;
      case 'number':
        return 0;
    }

    return null;
  }

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
  }, initialValue as ObjectValue);
}

const ListControl: FC<WidgetControlProps<ValueOrNestedValue[], ListField>> = ({
  entry,
  field,
  fieldsErrors,
  submitted,
  disabled,
  duplicate,
  hidden,
  locale,
  path,
  value,
  i18n,
  errors,
  forSingleList,
  onChange,
  t,
}) => {
  const internalValue = useMemo(() => value ?? [], [value]);
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
    (typeKey: string, type: string): ValueOrNestedValue => {
      const selectedType = 'types' in field && field.types?.find(f => f.name === type);
      if (!selectedType) {
        return {};
      }

      return getFieldsDefault(selectedType.fields ?? [], { [typeKey]: type });
    },
    [field],
  );

  const addItem = useCallback(
    (parsedValue: ValueOrNestedValue) => {
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
      onChange(newValue as string[] | ObjectValue[]);
    },
    [field.add_to_top, onChange, internalValue, keys],
  );

  const handleAdd = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const parsedValue = multipleDefault(field.fields ?? []);
      addItem(parsedValue);
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
      onChange(newValue as string[] | ObjectValue[]);
    },
    [onChange, internalValue, keys],
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
      onChange(
        arrayMoveImmutable<ValueOrNestedValue>(internalValue, oldIndex, newIndex) as
          | string[]
          | ObjectValue[],
      );
    },
    [onChange, internalValue, keys],
  );

  const hasChildErrors = useHasChildErrors(path, fieldsErrors, i18n, false);

  if (valueType === null) {
    return null;
  }

  const label = field.label ?? field.name;
  const labelSingular = field.label_singular ? field.label_singular : field.label ?? field.name;
  const listLabel = internalValue.length === 1 ? labelSingular : label;

  const types = field[TYPES_KEY];

  return (
    <div key="list-widget">
      <ListFieldWrapper
        key="list-control-wrapper"
        field={field}
        openLabel={label}
        closedLabel={listLabel}
        errors={errors}
        hasChildErrors={hasChildErrors}
        hint={field.hint}
        forSingleList={forSingleList}
        disabled={disabled}
      >
        {internalValue.length > 0 ? (
          <DndContext key="dnd-context" id="dnd-context" onDragEnd={handleDragEnd}>
            <SortableContext items={keys}>
              <div data-testid="list-widget-children">
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
                      entry={entry}
                      field={field}
                      fieldsErrors={fieldsErrors}
                      submitted={submitted}
                      disabled={disabled}
                      duplicate={duplicate}
                      hidden={hidden}
                      locale={locale}
                      path={path}
                      value={item as Record<string, ObjectValue>}
                      i18n={i18n}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        ) : null}
        {field.allow_add !== false ? (
          <div className="py-3 px-4 w-full">
            {types && types.length ? (
              <Menu
                label={t('editor.editorWidgets.list.addType', { item: label })}
                variant="outlined"
                className="w-full z-20"
                data-testid="list-type-add"
                disabled={disabled}
              >
                <MenuGroup>
                  {types.map((type, idx) =>
                    type ? (
                      <MenuItemButton
                        key={idx}
                        onClick={() => handleAddType(type.name, resolveFieldKeyType(field))}
                        data-testid={`list-type-add-item-${type.name}`}
                      >
                        {type.label ?? type.name}
                      </MenuItemButton>
                    ) : null,
                  )}
                </MenuGroup>
              </Menu>
            ) : (
              <Button
                variant="outlined"
                onClick={handleAdd}
                className="w-full"
                data-testid="list-add"
                disabled={disabled}
              >
                {t('editor.editorWidgets.list.add', { item: labelSingular })}
              </Button>
            )}
          </div>
        ) : null}
      </ListFieldWrapper>
    </div>
  );
};

export default ListControl;
