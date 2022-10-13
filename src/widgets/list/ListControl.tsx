import { ClassNames, css } from '@emotion/react';
import styled from '@emotion/styled';
import isEmpty from 'lodash/isEmpty';
import partial from 'lodash/partial';
import uniqueId from 'lodash/uniqueId';
import React, { useCallback, useMemo, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import uuid from 'uuid/v4';

import { transientOptions } from '../../lib';
import { getFieldLabel } from '../../lib/util/field.util';
import { stringTemplate } from '../../lib/widgets';
import { colors, FieldLabel, lengths, ListItemTopBar, ObjectWidgetTopBar } from '../../ui';
import ObjectControl from '../object/ObjectControl';
import {
  getErrorMessageForTypedFieldAndValue,
  getTypedFieldForValue,
  resolveFieldKeyType,
  TYPES_KEY,
} from './typedListHelpers';

import type { ChangeEvent, MouseEvent } from 'react';
import type { t } from 'react-polyglot';
import type {
  CmsField,
  CmsFieldList,
  CmsWidgetControlProps,
  Entry,
  EntryData,
  ListValue,
  ValueOrNestedValue,
} from '../../interface';

const ListItem = styled.div();

const SortableListItem = SortableElement<{ children: JSX.Element }>(ListItem);

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

const styleStrings = {
  collapsedObjectControl: `
    display: none;
  `,
  objectWidgetTopBarContainer: `
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
};

const styles = {
  listControlItem: css`
    margin-top: 18px;

    &:last-of-type {
      margin-bottom: 14px;
    }
  `,
  listControlItemCollapsed: css`
    padding-bottom: 0;
  `,
};

interface SortableListProps {
  items: ListValue[];
  renderItem: (item: ListValue, index: number) => JSX.Element;
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, renderItem }: SortableListProps) => {
    return <div>{items.map(renderItem)}</div>;
  },
);

const valueTypes = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  MIXED: 'MIXED',
};

function handleSummary(
  summary: string,
  entry: Entry,
  label: string,
  item: Record<string, ListValue>,
) {
  const labeledItem: EntryData = {
    ...item,
    fields: {
      label,
    },
  };
  const data = stringTemplate.addFileTemplateFields(entry.path, labeledItem);
  return stringTemplate.compileStringTemplate(summary, null, '', data);
}

function validateItem(field: CmsFieldList, item: ListValue) {
  if (!(typeof item === 'object')) {
    console.warn(
      `'${field.name}' field item value value should be an object but is a '${typeof item}'`,
    );
    return false;
  }

  return true;
}

interface LabelComponentProps {
  field: CmsFieldList;
  isActive: boolean;
  hasErrors: boolean;
  uniqueFieldId: string;
  isFieldOptional: boolean;
  t: t;
}

function LabelComponent({
  field,
  isActive,
  hasErrors,
  uniqueFieldId,
  isFieldOptional,
  t,
}: LabelComponentProps) {
  const label = `${field.label ?? field.name}`;
  return (
    <FieldLabel $isActive={isActive} $hasErrors={hasErrors} htmlFor={uniqueFieldId}>
      {label} {`${isFieldOptional ? ` (${t('editor.editorControl.field.optional')})` : ''}`}
    </FieldLabel>
  );
}

function getFieldsDefault(
  fields: CmsField[],
  initialValue: Record<string, ListValue> = {},
): Record<string, ListValue> {
  return fields.reduce((acc, item) => {
    const subfields = ('field' in item && item.field) || ('fields' in item && item.fields);
    const name = item.name;
    const defaultValue = (('default' in item && item.default) ?? null) as ListValue;

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
  parentPath,
  query,
  queryHits,
  t,
  ...otherProps
}: CmsWidgetControlProps<ListValue[], CmsFieldList>) => {
  const initialValue = useMemo(() => otherProps.value ?? [], [otherProps.value]);

  const valueToString = useCallback(
    (value?: ListValue[] | null) => {
      if (!value) {
        return '';
      }

      let stringValue;
      if (Array.isArray(value)) {
        stringValue = value.join(',');
      } else {
        console.warn(
          `Expected List value to be an array but received '${value}' with type of '${typeof value}'. Please check the value provided to the '${
            field.name
          }' field`,
        );
        stringValue = String(value);
      }
      return stringValue.replace(/,([^\s]|$)/g, ', $1');
    },
    [field.name],
  );

  const [value, setValue] = useState(valueToString(initialValue));
  const [listCollapsed, setListCollapsed] = useState(field.collapsed ?? true);
  const [itemsCollapsed, setItemsCollapsed] = useState(
    value ? Array(value.length).fill(listCollapsed) : [],
  );
  const [keys, setKeys] = useState(value ? Array.from({ length: value.length }, () => uuid()) : []);

  // TODO Implement list validation
  // validations = [];
  // processControlRef = ref => {
  //   if (!ref) return;
  //   const {
  //     validate,
  //     props: { validationKey: key },
  //   } = ref;
  //   this.validations.push({ key, validate });
  // };
  //
  // validate = () => {
  //   if (this.getValueType()) {
  //     this.validations.forEach(item => {
  //       item.validate();
  //     });
  //   } else {
  //     this.props.validate();
  //   }
  //   this.props.onValidateObject(this.props.forID, this.validateSize());
  // };
  //
  // validateSize = () => {
  //   const { field, value, t } = this.props;
  //   const min = field.min;
  //   const max = field.max;
  //   const required = field.get('required', true);
  //
  //   if (!required && !value?.size) {
  //     return [];
  //   }
  //
  //   const error = validations.validateMinMax(
  //     t,
  //     field.get('label', field.name),
  //     value,
  //     min,
  //     max,
  //   );
  //
  //   return error ? [error] : [];
  // };

  const getValueType = useCallback(() => {
    if ('fields' in field) {
      return valueTypes.MULTIPLE;
    } else if ('field' in field) {
      return valueTypes.SINGLE;
    } else if ('types' in field) {
      return valueTypes.MIXED;
    } else {
      return null;
    }
  }, [field]);

  const uniqueFieldId = useMemo(() => uniqueId(`${field.name}-field-`), [field.name]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const oldValue = value;
      const newValue = e.target.value.trim();
      const listValue = newValue ? newValue.split(',') : [];
      if (newValue.match(/,$/) && oldValue.match(/, $/)) {
        listValue.pop();
      }

      const parsedValue = valueToString(listValue);
      setValue(parsedValue);
      onChange(listValue.map(val => val.trim()));
    },
    [onChange, value, valueToString],
  );

  // TODO Fix
  // const handleBlur = useCallback(
  //   (e: FocusEvent<HTMLInputElement>) => {
  //     const listValue = e.target.value
  //       .split(',')
  //       .map(el => el.trim())
  //       .filter(el => el);

  //     setValue(valueToString(listValue));
  //   },
  //   [valueToString],
  // );

  const singleDefault = useCallback(() => {
    return (field.field && 'default' in field.field ? field.field.default : '') as ListValue;
  }, [field.field]);

  const multipleDefault = useCallback((fields: CmsField[]) => {
    return getFieldsDefault(fields);
  }, []);

  const mixedDefault = useCallback(
    (typeKey: string, type: string): Record<string, ListValue> => {
      const selectedType = 'types' in field && field.types?.find(f => f.name === type);
      if (!selectedType || (!('fields' in selectedType) && !('field' in selectedType))) {
        return {};
      }

      const fields: CmsField[] =
        'fields' in selectedType
          ? selectedType.fields ?? []
          : selectedType.field
          ? [selectedType.field]
          : [];

      return getFieldsDefault(fields, { [typeKey]: type });
    },
    [field],
  );

  const addItem = useCallback(
    (parsedValue: ListValue) => {
      const addToTop = field.add_to_top ?? false;

      const itemKey = uuid();

      setItemsCollapsed(addToTop ? [false, ...itemsCollapsed] : [...itemsCollapsed, false]);
      setKeys(addToTop ? [itemKey, ...keys] : [...keys, itemKey]);

      const listValue = initialValue;
      if (addToTop) {
        listValue.unshift(parsedValue);
        onChange(listValue);
      } else {
        listValue.push(parsedValue);
        onChange(listValue);
      }
    },
    [field.add_to_top, initialValue, itemsCollapsed, keys, onChange],
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

  // /**
  //  * In case the `onChangeObject` function is frozen by a child widget implementation,
  //  * e.g. when debounced, always get the latest object value instead of using
  //  * `this.props.value` directly.
  //  */
  const getObjectValue = useCallback((idx: number) => initialValue[idx] ?? {}, [initialValue]);

  const handleChangeFor = useCallback(
    (index: number) => {
      return (f: CmsField, newValue: ValueOrNestedValue) => {
        const listFieldObjectWidget = field.field?.widget === 'object';
        const withNameKey =
          getValueType() !== valueTypes.SINGLE ||
          (getValueType() === valueTypes.SINGLE && listFieldObjectWidget);

        const newObjectValue = withNameKey
          ? {
              ...(getObjectValue(index) as Record<string, ListValue>),
              [f.name]: newValue,
            }
          : newValue;

        const newValues = [...initialValue];
        newValues[index] = newObjectValue as ListValue;
        onChange(newValues);
      };
    },
    [field.field?.widget, getObjectValue, getValueType, initialValue, onChange],
  );

  const handleRemove = useCallback(
    (index: number, event: MouseEvent) => {
      event.preventDefault();
      itemsCollapsed.splice(index, 1);

      // TODO clear validations
      // this.validations = [];

      setItemsCollapsed([...itemsCollapsed]);
      setKeys(Array.from({ length: initialValue.length - 1 }, () => uuid()));

      const newValue = [...initialValue];
      newValue.splice(index, 1);

      onChange(newValue);
      clearFieldErrors();
    },
    [clearFieldErrors, initialValue, itemsCollapsed, onChange],
  );

  const handleItemCollapseToggle = useCallback(
    (index: number, event: MouseEvent) => {
      event.preventDefault();
      const newItemsCollapsed = itemsCollapsed.map((collapsed, itemIndex) => {
        if (index === itemIndex) {
          return !collapsed;
        }
        return collapsed;
      });

      setItemsCollapsed(newItemsCollapsed);
    },
    [itemsCollapsed],
  );

  const handleCollapseAllToggle = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const minimizeCollapsedItems = field.minimize_collapsed ?? false;
      const listCollapsedByDefault = field.collapsed ?? true;
      const allItemsCollapsed = itemsCollapsed.every(val => val === true);

      if (minimizeCollapsedItems) {
        let updatedItemsCollapsed = itemsCollapsed;
        // Only allow collapsing all items in this mode but not opening all at once
        if (!listCollapsed || !listCollapsedByDefault) {
          updatedItemsCollapsed = Array(initialValue.length).fill(!listCollapsed);
        }
        setListCollapsed(!listCollapsed);
        setItemsCollapsed(updatedItemsCollapsed);
      } else {
        setItemsCollapsed(Array(initialValue.length).fill(!allItemsCollapsed));
      }
    },
    [field.collapsed, field.minimize_collapsed, initialValue.length, itemsCollapsed, listCollapsed],
  );

  const getObjectLabel = useCallback(
    (item: ListValue): string | undefined => {
      const valueType = getValueType();
      switch (valueType) {
        case valueTypes.MIXED: {
          if (!validateItem(field, item)) {
            return;
          }

          const itemType = getTypedFieldForValue(field, item as Record<string, ListValue>);
          if (!itemType) {
            return;
          }

          const label = itemType.label ?? itemType.name;
          // each type can have its own summary, but default to the list summary if exists
          const summary = ('summary' in itemType && itemType.summary) ?? field.summary;
          const labelReturn = summary
            ? handleSummary(summary, entry, label, item as Record<string, ListValue>)
            : label;
          return labelReturn;
        }
        case valueTypes.SINGLE: {
          const singleField = field.field;
          if (!singleField) {
            return;
          }

          const label = singleField.label ?? singleField.name;
          const summary = field.summary;
          const data = { [singleField.name]: item };
          const labelReturn = summary ? handleSummary(summary, entry, label, data) : label;
          return labelReturn;
        }
        case valueTypes.MULTIPLE: {
          if (!validateItem(field, item)) {
            return;
          }
          const multiFields = field.fields;
          const labelField = multiFields && multiFields[0];
          if (!labelField) {
            return;
          }

          const value = (item as Record<string, ListValue>)[labelField.name];
          const summary = field.summary;
          const labelReturn = summary
            ? handleSummary(summary, entry, value as string, item as Record<string, ListValue>)
            : value;
          return (labelReturn || `No ${labelField.name}`).toString();
        }
      }
      return '';
    },
    [entry, field, getValueType],
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      // Update value
      const item = initialValue[oldIndex];
      const newValue: ListValue[] = [...initialValue];
      newValue.splice(oldIndex, 1);
      newValue.splice(newIndex, 0, item);
      onChange(newValue);

      // Update collapsing
      const collapsed = itemsCollapsed[oldIndex];
      itemsCollapsed.splice(oldIndex, 1);
      const updatedItemsCollapsed = [...itemsCollapsed];
      updatedItemsCollapsed.splice(newIndex, 0, collapsed);

      // Reset item to ensure updated state
      const updatedKeys = keys.map((key, keyIndex) => {
        if (keyIndex === oldIndex || keyIndex === newIndex) {
          return uuid();
        }
        return key;
      });

      setItemsCollapsed(updatedItemsCollapsed);
      setKeys(updatedKeys);

      //clear error fields and remove old validations
      clearFieldErrors();

      // TODO Remove old validations
      // this.validations = this.validations.filter(item => updatedKeys.includes(item.key));
    },
    [clearFieldErrors, initialValue, itemsCollapsed, keys, onChange],
  );

  const hasErrors = useCallback(
    (index: number) => {
      if (!fieldsErrors) {
        return false;
      }

      const errors = Object.values(fieldsErrors);
      if (errors.length == 0) {
        return false;
      }

      return errors.some(arr =>
        arr.some(err => err.parentIds && err.parentIds.includes(keys[index])),
      );
    },
    [fieldsErrors, keys],
  );

  const renderErroneousTypedItem = useCallback(
    (index: number, item: Record<string, ListValue>) => {
      const errorMessage = getErrorMessageForTypedFieldAndValue(field, item);
      const key = `item-${index}`;
      return (
        <SortableListItem
          css={[styles.listControlItem, styles.listControlItemCollapsed]}
          index={index}
          key={key}
        >
          <>
            <StyledListItemTopBar
              onRemove={partial(handleRemove, index)}
              dragHandleHOC={SortableHandle}
            />
            <NestedObjectLabel $collapsed={true} $error={true}>
              {errorMessage}
            </NestedObjectLabel>
          </>
        </SortableListItem>
      );
    },
    [field, handleRemove],
  );

  const handleOnChange = useCallback((index: number) => (value: unknown) => {

  }, []);

  const renderItem = useCallback(
    (item: ListValue, index: number) => {
      const collapsed = itemsCollapsed[index];
      const key = keys[index];
      const hasError = hasErrors(index);
      const isVariableTypesList = getValueType() === valueTypes.MIXED;
      let itemField: CmsField | undefined = field;
      if (isVariableTypesList) {
        itemField = getTypedFieldForValue(field, item as Record<string, ListValue>);
        if (!itemField) {
          return renderErroneousTypedItem(index, item as Record<string, ListValue>);
        }
      }
      return (
        <SortableListItem
          css={[styles.listControlItem, collapsed && styles.listControlItemCollapsed]}
          index={index}
          key={key}
        >
          <>
            {isVariableTypesList ? (
              <LabelComponent
                field={field}
                isActive={false}
                hasErrors={hasError}
                uniqueFieldId={uniqueFieldId}
                isFieldOptional={field.required === false}
                t={t}
              />
            ) : null}
            <StyledListItemTopBar
              collapsed={collapsed}
              onCollapseToggle={partial(handleItemCollapseToggle, index)}
              onRemove={partial(handleRemove, index)}
              dragHandleHOC={SortableHandle}
              data-testid={`styled-list-item-top-bar-${key}`}
              title={collapsed ? getObjectLabel(item) : null}
              isVariableTypesList={isVariableTypesList}
            />
            <NestedObjectLabel $collapsed={collapsed} $error={hasError}>
              {getObjectLabel(item)}
            </NestedObjectLabel>
            <ObjectControl
              clearFieldErrors={clearFieldErrors}
              clearSearch={clearSearch}
              collapsed={collapsed}
              collection={collection}
              config={config}
              data-testid={`object-control-${key}`}
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
              parentPath={[...parentPath, field.name, index]}
              query={query}
              queryHits={queryHits}
              t={t}
              value={item as Record<string, ListValue>}
            />
          </>
        </SortableListItem>
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
      getObjectLabel,
      getValueType,
      handleItemCollapseToggle,
      handleRemove,
      hasErrors,
      isDisabled,
      isEditorComponent,
      isFetching,
      isFieldDuplicate,
      isFieldHidden,
      isNewEditorComponent,
      itemsCollapsed,
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
      parentPath,
      query,
      queryHits,
      renderErroneousTypedItem,
      t,
      uniqueFieldId,
    ],
  );

  const renderListControl = useCallback(() => {
    const items = initialValue;
    const label = field.label ?? field.name;
    const labelSingular = field.label_singular ? field.label_singular : field.label ?? field.name;
    const listLabel = items.length === 1 ? labelSingular.toLowerCase() : label.toLowerCase();
    const minimizeCollapsedItems = field.minimize_collapsed ?? false;
    const allItemsCollapsed = itemsCollapsed.every(val => val === true);
    const selfCollapsed = allItemsCollapsed && (listCollapsed || !minimizeCollapsedItems);

    return (
      <ClassNames>
        {({ cx, css }) => (
          <div
            className={cx(
              css`
                ${styleStrings.objectWidgetTopBarContainer}
              `,
            )}
          >
            <ObjectWidgetTopBar
              allowAdd={field.allow_add ?? true}
              onAdd={handleAdd}
              types={field[TYPES_KEY] ?? []}
              onAddType={type => handleAddType(type, resolveFieldKeyType(field))}
              heading={`${items.length} ${listLabel}`}
              label={labelSingular.toLowerCase()}
              onCollapseToggle={handleCollapseAllToggle}
              collapsed={selfCollapsed}
              t={t}
            />
            {(!selfCollapsed || !minimizeCollapsedItems) && (
              <SortableList
                items={items}
                renderItem={renderItem}
                onSortEnd={onSortEnd}
                useDragHandle
                lockAxis="y"
              />
            )}
          </div>
        )}
      </ClassNames>
    );
  }, [
    field,
    handleAdd,
    handleAddType,
    handleCollapseAllToggle,
    initialValue,
    itemsCollapsed,
    listCollapsed,
    onSortEnd,
    renderItem,
    t,
  ]);

  const renderInput = useCallback(() => {
    return <input type="text" value={value} onChange={handleChange} />;
  }, [handleChange, value]);

  if (getValueType() !== null) {
    return renderListControl();
  } else {
    return renderInput();
  }
};

export default ListControl;
