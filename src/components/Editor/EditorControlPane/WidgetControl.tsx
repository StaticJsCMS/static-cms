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
  EntryMeta,
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
  validateMetaField: EditorControlProps['validateMetaField'],
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

  if ('meta' in field && field.meta) {
    const response = validateMetaField(field, validValue as string | undefined, t);
    if (response?.error) {
      errors.push(response.error);
    }
  }

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
      validateMetaField,
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
  validateMetaField: EditorControlProps['validateMetaField'],
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
            validateMetaField,
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
            validateMetaField,
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
  classNameWrapper: string;
  classNameWidget: string;
  classNameWidgetActive: string;
  controlComponent: React.ComponentType<CmsWidgetControlProps<ValueOrNestedValue>>;
  validator: Widget<ValueOrNestedValue>['validator'];
  entry: Entry;
  collection: Collection;
  config: CmsConfig;
  field: CmsField;
  uniqueFieldId: string;
  value: ValueOrNestedValue;
  mediaPaths: Record<string, string | string[]>;
  metadata: EntryMeta;
  onChange: (newValue: ValueOrNestedValue, newMetadata?: EntryMeta) => void;
  onValidate: (errors: FieldError[]) => void;
  onOpenMediaLibrary: EditorControlProps['openMediaLibrary'];
  onClearMediaControl: EditorControlProps['clearMediaControl'];
  onRemoveMediaControl: EditorControlProps['removeMediaControl'];
  onRemoveInsertedMedia: EditorControlProps['removeInsertedMedia'];
  onPersistMedia: EditorControlProps['persistMedia'];
  onAddAsset: EditorControlProps['addAsset'];
  getAsset: GetAssetFunction;
  hasActiveStyle: boolean;
  setActiveStyle: () => void;
  setInactiveStyle: () => void;
  resolveWidget: typeof registryResolveWidget;
  widget: Widget<ValueOrNestedValue>;
  getEditorComponents: () => Record<string, EditorComponentOptions>;
  query: EditorControlProps['query'];
  loadEntry: EditorControlProps['loadEntry'];
  queryHits: Entry[];
  clearSearch: EditorControlProps['clearSearch'];
  clearFieldErrors: EditorControlProps['clearFieldErrors'];
  isFetching: boolean;
  fieldsErrors: FieldsErrors;
  onValidateObject: (uniqueFieldId: string, errors: FieldError[]) => void;
  isEditorComponent: boolean;
  isNewEditorComponent: boolean;
  parentIds: string[];
  validateMetaField: EditorControlProps['validateMetaField'];
  isDisabled: boolean;
  isFieldDuplicate: EditorControlProps['isFieldDuplicate'];
  isFieldHidden: EditorControlProps['isFieldHidden'];
  locale: string | undefined;
}

const WidgetControl = ({
  controlComponent,
  entry,
  collection,
  config,
  field,
  value,
  mediaPaths,
  metadata,
  onChange,
  onValidateObject,
  onOpenMediaLibrary,
  onRemoveMediaControl,
  onPersistMedia,
  onClearMediaControl,
  onAddAsset,
  onRemoveInsertedMedia,
  getAsset,
  classNameWrapper,
  classNameWidget,
  classNameWidgetActive,
  setActiveStyle,
  hasActiveStyle,
  uniqueFieldId,
  widget,
  query,
  queryHits,
  clearSearch,
  clearFieldErrors,
  isFetching,
  loadEntry,
  fieldsErrors,
  isEditorComponent,
  isNewEditorComponent,
  parentIds,
  t,
  isDisabled,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  validateMetaField,
  validator,
  onValidate,
}: TranslatedProps<WidgetProps>) => {
  // shouldComponentUpdate(nextProps) {
  //   /**
  //    * Allow widgets to provide their own `shouldComponentUpdate` method.
  //    */
  //   if (this.wrappedControlShouldComponentUpdate) {
  //     return this.wrappedControlShouldComponentUpdate(nextProps);
  //   }
  //   return (
  //     this.props.value !== nextProps.value ||
  //     this.props.classNameWrapper !== nextProps.classNameWrapper ||
  //     this.props.hasActiveStyle !== nextProps.hasActiveStyle
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
    (field: CmsField, newValue: ValueOrNestedValue, newMetadata?: EntryMeta) => {
      const newObjectValue = getObjectValue(value as Record<string, ValueOrNestedValue>);
      newObjectValue[field.name] = newValue;
      return onChange(newObjectValue, newMetadata && { [field.name]: newMetadata });
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
        validateMetaField,
        onValidate,
        t,
      );
    },
    [field, getValidValue, onValidate, parentIds, t, validateMetaField, validator],
  );

  const setInactiveStyle = useCallback(() => {
    setInactiveStyle();
    if ('pattern' in field && !isEmpty(getValidValue())) {
      handleValidate(value);
    }
  }, [field, getValidValue, handleValidate, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(controlComponent as ComponentType<CmsWidgetControlProps<any>>, {
    entry,
    collection,
    config,
    field,
    mediaPaths,
    metadata,
    onOpenMediaLibrary,
    onClearMediaControl,
    onRemoveMediaControl,
    onPersistMedia,
    onAddAsset,
    onRemoveInsertedMedia,
    getAsset,
    forID: uniqueFieldId,
    validate: handleValidate,
    classNameWrapper,
    classNameWidget,
    classNameWidgetActive,
    setActiveStyle,
    setInactiveStyle,
    hasActiveStyle,
    query,
    queryHits,
    clearSearch,
    clearFieldErrors,
    isFetching,
    loadEntry,
    isEditorComponent,
    isNewEditorComponent,
    fieldsErrors,
    parentIds,
    t,
    isDisabled,
    isFieldDuplicate,
    isFieldHidden,
    locale,
    onChange,
    onChangeObject,
    onValidateObject,
    value: value as ValueOrNestedValue,
  });
};

export default WidgetControl;
