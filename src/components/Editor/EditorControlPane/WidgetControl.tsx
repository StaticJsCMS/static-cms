import React from 'react';

import type {
  Collection,
  Config,
  EditorComponentOptions,
  Entry,
  Field,
  FieldsErrors,
  GetAssetFunction,
  TranslatedProps,
  ValueOrNestedValue,
  Widget,
} from '../../../interface';
import type { resolveWidget as registryResolveWidget } from '../../../lib/registry';
import type { EditorControlProps } from './EditorControl';
import type { EditorControlPaneProps } from './EditorControlPane';

export interface WidgetProps {
  clearFieldErrors: EditorControlPaneProps['clearFieldErrors'];
  clearSearch: EditorControlProps['clearSearch'];
  collection: Collection;
  config: Config;
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
  widget: Widget<ValueOrNestedValue>;
}

const WidgetControl = ({
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
  widget,
}: TranslatedProps<WidgetProps>) => {
  return React.createElement(widget.control, {
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
    widget,
  });
};

export default WidgetControl;
