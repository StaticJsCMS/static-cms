import React, { Component, useCallback } from 'react';

import { getRemarkPlugins } from '../../../lib/registry';
import ValidationErrorTypes from '../../../constants/validationErrorTypes';

import type {
  CmsConfig,
  CmsField,
  CmsWidgetControlProps,
  Collection,
  EditorComponentOptions,
  Entry,
  EntryMeta,
  FieldsErrors,
  GetAssetFunction,
  RegisteredWidget,
  ValueOrNestedValue,
} from '../../../interface';
import type { EditorControlProps } from './EditorControl';
import type { resolveWidget as registryResolveWidget } from '../../../lib/registry';

function isEmpty(value: ValueOrNestedValue) {
  return (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

export interface WidgetProps {
  classNameWrapper: string;
  classNameWidget: string;
  classNameWidgetActive: string;
  controlComponent: React.ComponentType<CmsWidgetControlProps<unknown>>;
  validator: unknown;
  entry: Entry;
  collection: Collection;
  config: CmsConfig;
  field: CmsField;
  uniqueFieldId: string;
  value: ValueOrNestedValue;
  mediaPaths: Record<string, string | string[]>;
  metadata: EntryMeta;
  onChange: (newValue: ValueOrNestedValue, newMetadata: EntryMeta) => void;
  onValidate: (errors: FieldsErrors[]) => void;
  openMediaLibrary: EditorControlProps['openMediaLibrary'];
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
  widget: RegisteredWidget;
  getEditorComponents: () => Record<string, EditorComponentOptions>;
  editorControl: unknown;
  query: EditorControlProps['query'];
  loadEntry: EditorControlProps['loadEntry'];
  queryHits: Entry[];
  clearSearch: EditorControlProps['clearSearch'];
  clearFieldErrors: EditorControlProps['clearFieldErrors'];
  isFetching: boolean;
  fieldsErrors: FieldsErrors;
  onValidateObject: (uniqueFieldId: string, errors: FieldsErrors[]) => void;
  isEditorComponent: boolean;
  isNewEditorComponent: boolean;
  parentIds: string[];
  validateMetaField: EditorControlProps['validateMetaField'];
  isDisabled: boolean;
  isFieldDuplicate: EditorControlProps['isFieldDuplicate'];
  isFieldHidden: EditorControlProps['isFieldHidden'];
  locale: string | undefined;
}

const Widget = ({
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
  classNameLabel,
  classNameLabelActive,
  setActiveStyle,
  hasActiveStyle,
  editorControl,
  uniqueFieldId,
  resolveWidget,
  widget,
  getEditorComponents,
  query,
  queryHits,
  clearSearch,
  clearFieldErrors,
  isFetching,
  loadEntry,
  fieldsErrors,
  controlRef,
  isEditorComponent,
  isNewEditorComponent,
  parentIds,
  t,
  isDisabled,
  isFieldDuplicate,
  isFieldHidden,
  locale,
}: WidgetProps) => {
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

  const getValidateValue = useCallback(() => {
    let value = this.innerWrappedControl?.getValidateValue?.() || value;
    // Convert list input widget value to string for validation test
    List.isList(value) && (value = value.join(','));
    return value;
  }, []);

  validate = (skipWrapped = false) => {
    const value = this.getValidateValue();
    const field = this.props.field;
    const errors = [];
    const validations = [this.validatePresence, this.validatePattern];
    if (field.meta) {
      validations.push(this.props.validateMetaField);
    }
    validations.forEach(func => {
      const response = func(field, value, this.props.t);
      if (response.error) errors.push(response.error);
    });
    if (skipWrapped) {
      if (skipWrapped.error) errors.push(skipWrapped.error);
    } else {
      const wrappedError = this.validateWrappedControl(field);
      if (wrappedError.error) errors.push(wrappedError.error);
    }

    this.props.onValidate(errors);
  };

  validatePresence = (field, value) => {
    const { t, parentIds } = this.props;
    const isRequired = field.get('required', true);
    if (isRequired && isEmpty(value)) {
      const error = {
        type: ValidationErrorTypes.PRESENCE,
        parentIds,
        message: t('editor.editorControlPane.widget.required', {
          fieldLabel: field.get('label', field.name),
        }),
      };

      return { error };
    }
    return { error: false };
  };

  validatePattern = (field, value) => {
    const { t, parentIds } = this.props;
    const pattern = field.get('pattern', false);

    if (isEmpty(value)) {
      return { error: false };
    }

    if (pattern && !RegExp(pattern.first()).test(value)) {
      const error = {
        type: ValidationErrorTypes.PATTERN,
        parentIds,
        message: t('editor.editorControlPane.widget.regexPattern', {
          fieldLabel: field.get('label', field.name),
          pattern: pattern.last(),
        }),
      };

      return { error };
    }

    return { error: false };
  };

  validateWrappedControl = field => {
    const { t, parentIds, validator, value } = this.props;
    const response = validator?.({ value, field, t });
    if (response !== undefined) {
      if (typeof response === 'boolean') {
        return { error: !response };
      } else if (Object.prototype.hasOwnProperty.call(response, 'error')) {
        return response;
      } else if (response instanceof Promise) {
        response.then(
          () => {
            this.validate({ error: false });
          },
          err => {
            const error = {
              type: ValidationErrorTypes.CUSTOM,
              message: `${field.get('label', field.name)} - ${err}.`,
            };

            this.validate({ error });
          },
        );

        const error = {
          type: ValidationErrorTypes.CUSTOM,
          parentIds,
          message: t('editor.editorControlPane.widget.processing', {
            fieldLabel: field.get('label', field.name),
          }),
        };

        return { error };
      }
    }
    return { error: false };
  };

  /**
   * In case the `onChangeObject` function is frozen by a child widget implementation,
   * e.g. when debounced, always get the latest object value instead of using
   * `this.props.value` directly.
   */
  getObjectValue = () => this.props.value || Record();

  /**
   * Change handler for fields that are nested within another field.
   */
  onChangeObject = (field, newValue, newMetadata) => {
    const newObjectValue = this.getObjectValue().set(field.name, newValue);
    return this.props.onChange(
      newObjectValue,
      newMetadata && { [this.props.field.name]: newMetadata },
    );
  };

  const setInactiveStyle = useCallback(() => {
    setInactiveStyle();
    if ('pattern' in field && !isEmpty(getValidateValue())) {
      validate();
    }
  }, []);

  return React.createElement(controlComponent, {
    entry,
    collection,
    config,
    field,
    value,
    mediaPaths,
    metadata,
    onChange,
    onChangeObject: this.onChangeObject,
    onValidateObject,
    onOpenMediaLibrary,
    onClearMediaControl,
    onRemoveMediaControl,
    onPersistMedia,
    onAddAsset,
    onRemoveInsertedMedia,
    getAsset,
    forID: uniqueFieldId,
    ref: this.processInnerControlRef,
    validate: this.validate,
    classNameWrapper,
    classNameWidget,
    classNameWidgetActive,
    classNameLabel,
    classNameLabelActive,
    setActiveStyle,
    setInactiveStyle: () => this.setInactiveStyle(),
    hasActiveStyle,
    editorControl,
    resolveWidget,
    widget,
    getEditorComponents,
    getRemarkPlugins,
    query,
    queryHits,
    clearSearch,
    clearFieldErrors,
    isFetching,
    loadEntry,
    isEditorComponent,
    isNewEditorComponent,
    fieldsErrors,
    controlRef,
    parentIds,
    t,
    isDisabled,
    isFieldDuplicate,
    isFieldHidden,
    locale,
  });
};
