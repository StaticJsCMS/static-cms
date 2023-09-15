import React, { useCallback, useMemo, useRef, useState } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import Field from '@staticcms/core/components/common/field/Field';
import TextArea from '@staticcms/core/components/common/text-field/TextArea';
import classNames from '@staticcms/core/lib/util/classNames.util';
import useDebounce from '../../lib/hooks/useDebounce';
import widgetMarkdownClasses from './MarkdownControl.classes';
import PlateEditor from './plate/PlateEditor';
import useMarkdownToSlate from './plate/hooks/useMarkdownToSlate';
import serializeMarkdown from './plate/serialization/serializeMarkdown';

import type { MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC } from 'react';
import type { MdValue } from './plate/plateTypes';

import './MarkdownControl.css';

export interface WithMarkdownControlProps {
  useMdx: boolean;
}

const withMarkdownControl = ({ useMdx }: WithMarkdownControlProps) => {
  const MarkdownControl: FC<WidgetControlProps<string, MarkdownField>> = controlProps => {
    const {
      label,
      value,
      duplicate,
      onChange,
      hasErrors,
      collection,
      entry,
      field,
      errors,
      forSingleList,
      disabled,
      t,
    } = controlProps;

    const [internalRawValue, setInternalValue] = useState(value ?? '');
    const internalValue = useMemo(
      () => (duplicate ? value ?? '' : internalRawValue),
      [internalRawValue, duplicate, value],
    );
    const [hasFocus, setHasFocus] = useState(false);
    const debouncedFocus = useDebounce(hasFocus, 150);

    const [showRaw, setShowRaw] = useState(false);

    const handleOnFocus = useCallback(() => {
      setHasFocus(true);
    }, []);

    const handleOnBlur = useCallback(() => {
      setHasFocus(false);
    }, []);

    const handleOnChange = useCallback(
      (slateValue: MdValue) => {
        const newValue = serializeMarkdown(slateValue, { useMdx });
        if (newValue !== internalValue) {
          setInternalValue(newValue);
          onChange(newValue);
        }
      },
      [internalValue, onChange],
    );

    const handleRawOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        if (rawValue !== internalValue) {
          setInternalValue(rawValue);
          onChange(rawValue);
        }
      },
      [internalValue, onChange],
    );

    const handleLabelClick = useCallback(() => {
      // editorRef.current?.getInstance().focus();
    }, []);

    const handleShowRaw = useCallback(() => {
      if (!field.show_raw) {
        return;
      }

      setShowRaw(true);
    }, [field.show_raw]);

    const handleShowRich = useCallback(() => {
      setShowRaw(false);
    }, []);

    const [slateValue, loaded] = useMarkdownToSlate(internalValue, {
      useMdx,
      mode: showRaw ? 'raw' : 'rich',
    });

    const richEditor = useMemo(
      () =>
        loaded ? (
          <PlateEditor
            key="plate-editor"
            initialValue={slateValue}
            collection={collection}
            entry={entry}
            field={field}
            useMdx={useMdx}
            controlProps={controlProps}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        ) : null,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        collection,
        controlProps,
        debouncedFocus,
        field,
        handleLabelClick,
        handleOnBlur,
        handleOnChange,
        handleOnFocus,
        hasErrors,
        hasFocus,
        loaded,
        slateValue,
        internalValue,
        showRaw,
      ],
    );

    const textAreaRef = useRef<HTMLInputElement>(null);

    return (
      <Field
        label={label}
        errors={errors}
        forSingleList={forSingleList}
        hint={field.hint}
        noHightlight
        disabled={disabled}
        rootClassName={classNames(
          widgetMarkdownClasses.root,
          disabled && widgetMarkdownClasses.disabled,
          field.required !== false && widgetMarkdownClasses.required,
          hasErrors && widgetMarkdownClasses.error,
          forSingleList && widgetMarkdownClasses['for-single-list'],
        )}
      >
        {showRaw ? (
          <TextArea
            key="raw-editor"
            ref={textAreaRef}
            value={internalValue}
            disabled={disabled}
            onChange={handleRawOnChange}
            placeholder={t('editor.editorWidgets.markdown.type')}
            rootClassName={widgetMarkdownClasses['raw-editor']}
          />
        ) : (
          richEditor
        )}
        {field.show_raw ? (
          <div className={widgetMarkdownClasses.controls}>
            <Button
              data-testid="rich-editor"
              size="small"
              color={!showRaw ? 'primary' : 'secondary'}
              variant={!showRaw ? 'contained' : 'outlined'}
              onClick={handleShowRich}
              disabled={disabled}
            >
              {t('editor.editorWidgets.markdown.richText')}
            </Button>
            <Button
              data-testid="rich-editor"
              size="small"
              color={showRaw ? 'primary' : 'secondary'}
              variant={showRaw ? 'contained' : 'outlined'}
              onClick={handleShowRaw}
              disabled={disabled}
            >
              {t('editor.editorWidgets.markdown.markdown')}
            </Button>
          </div>
        ) : null}
      </Field>
    );
  };

  return MarkdownControl;
};

export default withMarkdownControl;
