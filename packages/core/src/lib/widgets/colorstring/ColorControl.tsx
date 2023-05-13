import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import validateColor from 'validate-color';

import IconButton from '@staticcms/core/components/common/button/IconButton';
import Field from '@staticcms/core/components/common/field/Field';
import TextField from '@staticcms/core/components/common/text-field/TextField';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ColorField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC, MouseEvent, MouseEventHandler } from 'react';
import type { ColorResult } from 'react-color';

const ColorControl: FC<WidgetControlProps<string, ColorField>> = ({
  field,
  duplicate,
  onChange,
  value,
  errors,
  label,
  forSingleList,
  disabled,
}) => {
  const swatchRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [internalRawValue, setInternalValue] = useState(value ?? '');
  const internalValue = useMemo(
    () => (duplicate ? value ?? '' : internalRawValue),
    [internalRawValue, duplicate, value],
  );

  // show/hide color picker
  const handleClick: MouseEventHandler = useCallback(event => {
    event.stopPropagation();
    setShowColorPicker(oldShowColorPicker => !oldShowColorPicker);
  }, []);

  const handleClear = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setInternalValue('');
      onChange('');
    },
    [onChange],
  );

  const handleClose = useCallback(() => {
    setShowColorPicker(false);
  }, []);

  const handlePickerChange = useCallback(
    (color: ColorResult) => {
      const formattedColor =
        (color.rgb?.a ?? 1) < 1
          ? `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
          : color.hex;
      setInternalValue(formattedColor);
      onChange(formattedColor);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

  const allowInput = field.allow_input ?? false;

  // clear button is not displayed if allow_input: true
  const showClearButton = !allowInput && internalValue;

  return (
    <Field
      inputRef={allowInput ? ref : swatchRef}
      label={label}
      errors={errors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor={allowInput ? 'text' : 'pointer'}
      disabled={disabled}
      disableClick={showColorPicker}
    >
      <div
        className={classNames(
          `
            flex
            items-center
            pt-2
            px-3
          `,
          disabled ? 'cursor-default' : allowInput ? 'cursor-text' : 'cursor-pointer',
        )}
      >
        <div>
          <div
            ref={swatchRef}
            key="color-swatch"
            data-testid="color-swatch"
            onClick={!disabled ? handleClick : undefined}
            style={{
              background: validateColor(internalValue) ? internalValue : '#fff',
              color: validateColor(internalValue) ? 'rgba(255, 255, 255, 0)' : 'rgb(150, 150, 150)',
            }}
            className={classNames(
              `
                w-8
                h-8
                flex
                items-center
                justify-center
              `,
              disabled ? 'cursor-default' : 'cursor-pointer',
            )}
          >
            ?
          </div>
        </div>
        {showColorPicker && (
          <div
            key="color-swatch-wrapper"
            className="
              absolute
              bottom-0
            "
          >
            <div
              key="click-outside"
              onClick={handleClose}
              className="
                fixed
                inset-0
                z-10
              "
            />
            <ChromePicker
              key="color-picker"
              color={internalValue}
              onChange={handlePickerChange}
              disableAlpha={!(field.enable_alpha ?? false)}
              className="
                absolute
                z-20
                -top-3
              "
            />
          </div>
        )}
        <TextField
          type="text"
          inputRef={ref}
          key="color-picker-input"
          value={internalValue}
          onChange={handleInputChange}
          // make readonly and open color picker on click if set to allow_input: false
          onClick={!allowInput && !disabled ? handleClick : undefined}
          disabled={disabled}
          readonly={!allowInput}
          cursor={allowInput ? 'text' : 'pointer'}
        />
        {showClearButton ? (
          <IconButton variant="text" onClick={handleClear} disabled={disabled}>
            <CloseIcon className="w-5 h-5" />
          </IconButton>
        ) : null}
      </div>
    </Field>
  );
};

export default ColorControl;
