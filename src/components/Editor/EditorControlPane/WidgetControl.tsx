import React from 'react';

import ValidationErrorTypes from '../../../constants/validationErrorTypes';

import type { ComponentType } from 'react';
import type { t } from 'react-polyglot';
import type {
  Config,
  Field,
  WidgetControlProps,
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
  field: Field,
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
  field: Field,
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
  field: Field,
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
  field: Field,
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
          validate(field, parentIds, value, validator, getValidValue, onValidate, t, {
            error: false,
          });
        },
        err => {
          const error = {
            type: ValidationErrorTypes.CUSTOM,
            message: `${field.label ?? field.name} - ${err}.`,
          };

          validate(field, parentIds, value, validator, getValidValue, onValidate, t, {
            error,
          });
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
  config: Config;
  controlComponent: React.ComponentType<WidgetControlProps<ValueOrNestedValue>>;
  entry: Entry;
  field: Field;
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
  onChange: EditorControlProps['onChange'];
  onClearMediaControl: EditorControlProps['clearMediaControl'];
  onOpenMediaLibrary: EditorControlProps['openMediaLibrary'];
  onPersistMedia: EditorControlProps['persistMedia'];
  onRemoveInsertedMedia: EditorControlProps['removeInsertedMedia'];
  onRemoveMediaControl: EditorControlProps['removeMediaControl'];
  onValidate: EditorControlProps['onValidate'];
  path: string;
  query: EditorControlProps['query'];
  resolveWidget: typeof registryResolveWidget;
  value: ValueOrNestedValue;
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
  path,
  query,
  t,
  value,
}: TranslatedProps<WidgetProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(controlComponent as ComponentType<WidgetControlProps<any>>, {
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
    path,
    query,
    t,
    value,
  });
};

export default WidgetControl;
