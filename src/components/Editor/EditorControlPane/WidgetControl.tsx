import React, { useCallback } from 'react';

import ValidationErrorTypes from '../../../constants/validationErrorTypes';

import type { ComponentType } from 'react';
import type { t } from 'react-polyglot';
import type {
  CmsConfig,
  CmsField,
  CmsWidgetControlProps,
  Collection,
  EditorComponentOptions,
  Entry,
  FieldError,
  FieldsErrors,
  FieldValidationMethod,
  GetAssetFunction,
  TranslatedProps,
  ValueOrNestedValue,
  Widget,
} from '../../../interface';
import type { resolveWidget as registryResolveWidget } from '../../../lib/registry';
import type { EditorControlProps } from './EditorControl';
import type { EditorControlPaneProps } from './EditorControlPane';

function isEmpty(value: ValueOrNestedValue) {
  return (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

function validatePresence(
  field: CmsField,
  value: ValueOrNestedValue,
  parentIds: string[],
  t: t,
): { error: false | FieldError } {
  const isRequired = field.required ?? true;
  if (isRequired && isEmpty(value)) {
    const error = {
      type: ValidationErrorTypes.PRESENCE,
      parentIds,
      message: t('editor.editorControlPane.widget.required', {
        fieldLabel: field.label ?? field.name,
      }),
    };

    return { error };
  }

  return { error: false };
}

function validatePattern(
  field: CmsField,
  value: ValueOrNestedValue,
  parentIds: string[],
  t: t,
): { error: false | FieldError } {
  const pattern = field.pattern ?? false;

  if (isEmpty(value)) {
    return { error: false };
  }

  if (pattern && typeof value === 'string' && !RegExp(pattern[0]).test(value)) {
    const error = {
      type: ValidationErrorTypes.PATTERN,
      parentIds,
      message: t('editor.editorControlPane.widget.regexPattern', {
        fieldLabel: field.label ?? field.name,
        pattern: pattern[1],
      }),
    };

    return { error };
  }

  return { error: false };
}

function validate(
  field: CmsField,
  parentIds: string[],
  value: ValueOrNestedValue,
  validator: Widget<ValueOrNestedValue>['validator'],
  getValidValue: Widget<ValueOrNestedValue>['getValidValue'],
  onValidate: (errors: FieldError[]) => void,
  t: t,
  skipWrapped: { error: false | FieldError } = { error: false },
) {
  const validValue = getValidValue(value);
  const errors: FieldError[] = [];
  const validations: FieldValidationMethod[] = [validatePresence, validatePattern];
  validations.forEach(func => {
    const response = func(field, validValue, parentIds, t);
    if (response.error) {
      errors.push(response.error);
    }
  });

  if (skipWrapped) {
    if (skipWrapped.error) {
      errors.push(skipWrapped.error);
    }
  } else {
    const wrappedError = validateWrappedControl(
      field,
      parentIds,
      value,
      validator,
      getValidValue,
      onValidate,
      t,
    );
    if (wrappedError.error) {
      errors.push(wrappedError.error);
    }
  }

  onValidate(errors);
}

function validateWrappedControl(
  field: CmsField,
  parentIds: string[],
  value: ValueOrNestedValue,
  validator: Widget<ValueOrNestedValue>['validator'],
  getValidValue: Widget<ValueOrNestedValue>['getValidValue'],
  onValidate: (errors: FieldError[]) => void,
  t: t,
): {
  error: false | FieldError;
} {
  const response = validator({ value, field, t });
  if (response !== undefined) {
    if (typeof response === 'boolean') {
      return { error: response };
    } else if (response instanceof Promise) {
      response.then(
        () => {
          validate(
            field,
            parentIds,
            value,
            validator,
            getValidValue,
            onValidate,
            t,
            {
              error: false,
            },
          );
        },
        err => {
          const error = {
            type: ValidationErrorTypes.CUSTOM,
            message: `${field.label ?? field.name} - ${err}.`,
          };

          validate(
            field,
            parentIds,
            value,
            validator,
            getValidValue,
            onValidate,
            t,
            {
              error,
            },
          );
        },
      );

      const error = {
        type: ValidationErrorTypes.CUSTOM,
        parentIds,
        message: t('editor.editorControlPane.widget.processing', {
          fieldLabel: field.label ?? field.name,
        }),
      };

      return { error };
    }

    return response;
  }
  return { error: false };
}

export interface WidgetProps {
  clearFieldErrors: EditorControlPaneProps['clearFieldErrors'];
  clearSearch: EditorControlProps['clearSearch'];
  collection: Collection;
  config: CmsConfig;
  controlComponent: React.ComponentType<CmsWidgetControlProps<ValueOrNestedValue>>;
  entry: Entry;
  field: CmsField;
  fieldsErrors: FieldsErrors;
  getAsset: GetAssetFunction;
  getEditorComponents: () => Record<string, EditorComponentOptions>;
  isDisabled: boolean;
  isEditorComponent: boolean;
  isFetching: boolean;
  isFieldDuplicate: EditorControlProps['isFieldDuplicate'];
  isFieldHidden: EditorControlProps['isFieldHidden'];
  isNewEditorComponent: boolean;
  label: string;
  loadEntry: EditorControlProps['loadEntry'];
  locale: string | undefined;
  mediaPaths: Record<string, string | string[]>;
  onAddAsset: EditorControlProps['addAsset'];
  onChange: (newValue: ValueOrNestedValue) => void;
  onClearMediaControl: EditorControlProps['clearMediaControl'];
  onOpenMediaLibrary: EditorControlProps['openMediaLibrary'];
  onPersistMedia: EditorControlProps['persistMedia'];
  onRemoveInsertedMedia: EditorControlProps['removeInsertedMedia'];
  onRemoveMediaControl: EditorControlProps['removeMediaControl'];
  onValidate: (errors: FieldError[]) => void;
  onValidateObject: (uniqueFieldId: string, errors: FieldError[]) => void;
  parentIds: string[];
  query: EditorControlProps['query'];
  queryHits: Entry[];
  resolveWidget: typeof registryResolveWidget;
  uniqueFieldId: string;
  validator: Widget<ValueOrNestedValue>['validator'];
  value: ValueOrNestedValue;
  widget: Widget<ValueOrNestedValue>;
}

const WidgetControl = ({
  clearFieldErrors,
  clearSearch,
  collection,
  config,
  controlComponent,
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
  label,
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
  onValidateObject,
  parentIds,
  query,
  queryHits,
  t,
  uniqueFieldId,
  validator,
  value,
  widget,
}: TranslatedProps<WidgetProps>) => {
  // shouldComponentUpdate(nextProps) {
  //   /**
  //    * Allow widgets to provide their own `shouldComponentUpdate` method.
  //    */
  //   if (this.wrappedControlShouldComponentUpdate) {
  //     return this.wrappedControlShouldComponentUpdate(nextProps);
  //   }
  //   return (
  //     this.props.value !== nextProps.value
  //   );
  // }

  // processInnerControlRef = ref => {
  //   if (!ref) return;

  //   /**
  //    * If the widget is a container that receives state updates from the store,
  //    * we'll need to get the ref of the actual control via the `react-redux`
  //    * `getWrappedInstance` method. Note that connected widgets must pass
  //    * `withRef: true` to `connect` in the options object.
  //    */
  //   this.innerWrappedControl = ref.getWrappedInstance ? ref.getWrappedInstance() : ref;

  //   /**
  //    * Get the `shouldComponentUpdate` method from the wrapped control, and
  //    * provide the control instance is the `this` binding.
  //    */
  //   const { shouldComponentUpdate: scu } = this.innerWrappedControl;
  //   this.wrappedControlShouldComponentUpdate = scu && scu.bind(this.innerWrappedControl);
  // };

  const getValidValue = useCallback(() => {
    return widget.getValidValue(value) ?? value;
  }, [value, widget]);

  /**
   * In case the `onChangeObject` function is frozen by a child widget implementation,
   * e.g. when debounced, always get the latest object value instead of using
   * `this.props.value` directly.
   */
  const getObjectValue = useCallback(
    (objectValue: Record<string, ValueOrNestedValue>) => objectValue || {},
    [],
  );

  /**
   * Change handler for fields that are nested within another field.
   */
  const onChangeObject = useCallback(
    (field: CmsField, newValue: ValueOrNestedValue) => {
      const newObjectValue = getObjectValue(value as Record<string, ValueOrNestedValue>);
      newObjectValue[field.name] = newValue;
      return onChange(newObjectValue);
    },
    [getObjectValue, onChange, value],
  );

  const handleValidate = useCallback(
    (newValue: ValueOrNestedValue) => {
      validate(
        field,
        parentIds,
        newValue,
        validator,
        getValidValue,
        onValidate,
        t,
      );
    },
    [field, getValidValue, onValidate, parentIds, t, validator],
  );

  const handleOnBlur = useCallback(() => {
    if ('pattern' in field && !isEmpty(getValidValue())) {
      handleValidate(value);
    }
  }, [field, getValidValue, handleValidate, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(controlComponent as ComponentType<CmsWidgetControlProps<any>>, {
    clearFieldErrors,
    clearSearch,
    collection,
    config,
    entry,
    field,
    fieldsErrors,
    forID: uniqueFieldId,
    getAsset,
    isDisabled,
    isEditorComponent,
    isFetching,
    isFieldDuplicate,
    isFieldHidden,
    isNewEditorComponent,
    label,
    loadEntry,
    locale,
    mediaPaths,
    onAddAsset,
    onBlur: handleOnBlur,
    onChange,
    onChangeObject,
    onClearMediaControl,
    onOpenMediaLibrary,
    onPersistMedia,
    onRemoveInsertedMedia,
    onRemoveMediaControl,
    onValidateObject,
    parentIds,
    query,
    queryHits,
    t,
    validate: handleValidate,
    value,
  });
};

export default WidgetControl;
