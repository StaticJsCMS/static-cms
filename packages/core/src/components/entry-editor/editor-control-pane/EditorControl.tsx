import { isEqual } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import React, { createElement, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import {
  changeDraftField as changeDraftFieldAction,
  changeDraftFieldValidation,
  clearDraftFieldChildValidation,
} from '@staticcms/core/actions/entries';
import { query as queryAction } from '@staticcms/core/actions/search';
import useDebouncedCallback from '@staticcms/core/lib/hooks/useDebouncedCallback';
import useMemoCompare from '@staticcms/core/lib/hooks/useMemoCompare';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { isFieldDuplicate, isFieldHidden } from '@staticcms/core/lib/i18n';
import { resolveWidget } from '@staticcms/core/lib/registry';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { fileForEntry } from '@staticcms/core/lib/util/collection.util';
import { getFieldLabel, useHidden } from '@staticcms/core/lib/util/field.util';
import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { validate } from '@staticcms/core/lib/util/validation.util';
import { selectFieldErrors } from '@staticcms/core/reducers/selectors/entryDraft';
import { selectIsLoadingAsset } from '@staticcms/core/reducers/selectors/medias';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';

import type {
  Field,
  FieldsErrors,
  I18nSettings,
  UnknownField,
  ValueOrNestedValue,
  Widget,
} from '@staticcms/core';
import type { RootState } from '@staticcms/core/store';
import type { FC } from 'react';
import type { ConnectedProps } from 'react-redux';

import './EditorControl.css';

export const classes = generateClassNames('EditorControl', ['root', 'hidden']);

const EditorControl: FC<EditorControlProps> = ({
  collection,
  collectionFile,
  config: configState,
  entry,
  field,
  fieldsErrors,
  submitted,
  disabled,
  parentDuplicate = false,
  locale,
  parentPath,
  query,
  value: storageValue,
  forList = false,
  listItemPath,
  forSingleList = false,
  changeDraftField,
  i18n,
  fieldName,
  isMeta = false,
  controlled = false,
}) => {
  const t = useTranslate();

  const dispatch = useAppDispatch();

  const id = useUUID();

  const widgetName = field.widget;
  const widget = resolveWidget(widgetName) as Widget<ValueOrNestedValue, Field>;

  const path = useMemo(
    () =>
      parentPath.length > 0 ? `${parentPath}.${fieldName ?? field.name}` : fieldName ?? field.name,
    [field.name, fieldName, parentPath],
  );

  const finalStorageValue = useMemoCompare(storageValue, isEqual);

  const [internalValue, setInternalValue] = useState(() =>
    widget.converters.deserialize(finalStorageValue, field),
  );

  const [dirty, setDirty] = useState(
    !isEmpty(widget.getValidValue(internalValue, field as UnknownField)),
  );

  const errors = useAppSelector(state => selectFieldErrors(state, path, i18n, isMeta));

  const hasErrors = (submitted || dirty) && Boolean(errors.length);

  const duplicate = useMemo(
    () => parentDuplicate || isFieldDuplicate(field, locale, i18n?.defaultLocale),
    [field, i18n?.defaultLocale, parentDuplicate, locale],
  );
  const i18nDisabled = useMemo(
    () =>
      isFieldHidden(field, locale, i18n?.defaultLocale) ||
      isFieldDuplicate(field, locale, i18n?.defaultLocale),
    [field, i18n?.defaultLocale, locale],
  );
  const hidden = useHidden(field, entry, listItemPath);

  useEffect(() => {
    if (!['list', 'object'].includes(field.widget) && !i18nDisabled) {
      return;
    }

    setInternalValue(finalStorageValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalStorageValue]);

  useEffect(() => {
    if (hidden) {
      dispatch(changeDraftFieldValidation(path, [], i18n, isMeta));
      return;
    }

    if (
      (!dirty && !submitted) ||
      disabled ||
      i18nDisabled ||
      (forList && field.widget === 'object' && field.fields.length === 1) ||
      (i18n?.enforceRequiredNonDefault === false && i18n?.currentLocale !== i18n?.defaultLocale)
    ) {
      return;
    }

    const validateValue = async () => {
      const errors = await validate(field, internalValue, widget, t);
      dispatch(changeDraftFieldValidation(path, errors, i18n, isMeta));
    };

    validateValue();
  }, [
    dirty,
    dispatch,
    field,
    i18n,
    hidden,
    path,
    submitted,
    t,
    internalValue,
    widget,
    disabled,
    isMeta,
    i18nDisabled,
    forList,
    forSingleList,
  ]);

  const clearChildValidation = useCallback(() => {
    dispatch(clearDraftFieldChildValidation(path, i18n, isMeta));
  }, [dispatch, i18n, isMeta, path]);

  const handleChangeDraftField = useCallback(
    async (value: ValueOrNestedValue) => {
      setDirty(
        oldDirty => oldDirty || !isEmpty(widget.getValidValue(value, field as UnknownField)),
      );

      setInternalValue(value);

      changeDraftField({
        path,
        field,
        value: widget.converters.serialize(value, field),
        i18n,
        isMeta,
      });
    },
    [changeDraftField, field, i18n, isMeta, path, widget],
  );

  const handleDebouncedChangeDraftField = useDebouncedCallback(handleChangeDraftField, 250);

  const config = useMemo(() => configState.config, [configState.config]);

  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (isNotNullish(internalValue)) {
      return;
    }

    if ('default' in field && isNotNullish(!field.default)) {
      if (widget.getDefaultValue) {
        handleDebouncedChangeDraftField(
          widget.getDefaultValue(field.default, field as unknown as UnknownField),
        );
      } else {
        handleDebouncedChangeDraftField(field.default);
      }
      setVersion(version => version + 1);
      return;
    }

    if (widget.getDefaultValue) {
      handleDebouncedChangeDraftField(
        widget.getDefaultValue(null, field as unknown as UnknownField),
      );
      setVersion(version => version + 1);
    }
  }, [field, internalValue, handleDebouncedChangeDraftField, widget]);

  return useMemo(() => {
    if (!collection || !entry || !config || field.widget === 'hidden') {
      return null;
    }

    return (
      <div
        className={classNames(classes.root, hidden && classes.hidden)}
        aria-label={widgetName?.concat(' field')}
      >
        {createElement(widget.control, {
          key: `${id}-${version}`,
          collection,
          collectionFile,
          config,
          entry,
          field: field as UnknownField,
          fieldsErrors,
          submitted,
          disabled: disabled || duplicate || controlled || i18nDisabled,
          duplicate,
          label: getFieldLabel(field, t),
          locale,
          onChange: handleDebouncedChangeDraftField,
          clearChildValidation,
          path,
          query,
          t,
          value: internalValue,
          forList,
          listItemPath,
          forSingleList,
          i18n,
          hasErrors,
          errors,
          controlled: controlled || i18nDisabled,
        })}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collection,
    config,
    field,
    hidden,
    widget.control,
    id,
    version,
    fieldsErrors,
    submitted,
    disabled,
    duplicate,
    t,
    locale,
    handleDebouncedChangeDraftField,
    path,
    query,
    internalValue,
    forList,
    listItemPath,
    forSingleList,
    i18n,
    hasErrors,
    errors,
  ]);
};

interface EditorControlOwnProps {
  field: Field;
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  disabled: boolean;
  parentDuplicate?: boolean;
  locale?: string;
  parentPath: string;
  value: ValueOrNestedValue;
  forList?: boolean;
  listItemPath?: string;
  forSingleList?: boolean;
  i18n: I18nSettings | undefined;
  fieldName?: string;
  controlled?: boolean;
  isMeta?: boolean;
}

function mapStateToProps(state: RootState, ownProps: EditorControlOwnProps) {
  const { collections, entryDraft } = state;
  const entry = entryDraft.entry;
  const collection = entryDraft.entry ? collections[entryDraft.entry.collection] : null;
  const collectionFile = fileForEntry(collection, entryDraft.entry?.slug);
  const isLoadingAsset = selectIsLoadingAsset(state);

  return {
    ...ownProps,
    config: state.config,
    entry,
    collection,
    collectionFile,
    isLoadingAsset,
  };
}

const mapDispatchToProps = {
  changeDraftField: changeDraftFieldAction,
  query: queryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorControlProps = ConnectedProps<typeof connector>;

export default connector(EditorControl);
