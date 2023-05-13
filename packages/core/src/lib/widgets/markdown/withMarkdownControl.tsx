import React, { useCallback, useMemo, useState } from 'react';

import Field from '@staticcms/core/components/common/field/Field';
import useDebounce from '../../lib/hooks/useDebounce';
import useMarkdownToSlate from './plate/hooks/useMarkdownToSlate';
import PlateEditor from './plate/PlateEditor';
import serializeMarkdown from './plate/serialization/serializeMarkdown';

import type { MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { MdValue } from './plate/plateTypes';

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
    } = controlProps;

    const [internalRawValue, setInternalValue] = useState(value ?? '');
    const internalValue = useMemo(
      () => (duplicate ? value ?? '' : internalRawValue),
      [internalRawValue, duplicate, value],
    );
    const [hasFocus, setHasFocus] = useState(false);
    const debouncedFocus = useDebounce(hasFocus, 150);

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

    const handleLabelClick = useCallback(() => {
      // editorRef.current?.getInstance().focus();
    }, []);

    const [slateValue, loaded] = useMarkdownToSlate(internalValue, { useMdx });

    return useMemo(
      () => (
        <Field
          label={label}
          errors={errors}
          forSingleList={forSingleList}
          hint={field.hint}
          noHightlight
          disabled={disabled}
        >
          {loaded ? (
            <PlateEditor
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
          ) : null}
        </Field>
      ),
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
        label,
        loaded,
        slateValue,
      ],
    );
  };

  return MarkdownControl;
};

export default withMarkdownControl;
