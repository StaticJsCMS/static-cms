import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { ChromePicker } from 'react-color';

import ObjectWidgetTopBar from '@staticcms/core/components/UI/ObjectWidgetTopBar';
import Outline from '@staticcms/core/components/UI/Outline';

import type { ColorField, WidgetControlProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import type { ColorResult } from 'react-color';

const ColorControl: FC<WidgetControlProps<string, ColorField>> = ({
  field,
  onChange,
  value,
  hasErrors,
  t,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? '');

  // show/hide color picker
  const handleClick = useCallback(() => {
    setShowColorPicker(!showColorPicker);
  }, [showColorPicker]);

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
    <div>
      <ObjectWidgetTopBar
        key="file-control-top-bar"
        collapsed={collapsed}
        onCollapseToggle={handleCollapseToggle}
        heading={field.label ?? field.name}
        hasError={hasErrors}
        t={t}
      />
      <div>
        {/* TODO $collapsed={collapsed} */}
        <div key="color-swatch" onClick={handleClick}>
          {/* TODO $background={validateColor(internalValue) ? internalValue : '#fff'}
        $color={validateColor(internalValue) ? 'rgba(255, 255, 255, 0)' : 'rgb(223, 223, 227)'} */}
          ?
        </div>
        {showColorPicker && (
          <div key="color-swatch-wrapper">
            <div key="click-outside" onClick={handleClose} />
            <ChromePicker
              key="color-picker"
              color={internalValue}
              onChange={handlePickerChange}
              disableAlpha={!(field.enable_alpha ?? false)}
            />
          </div>
        )}
        <TextField
          key="color-picker-input"
          value={internalValue}
          onChange={handleInputChange}
          sx={{
            color: !allowInput ? '#bbb' : undefined,
            '.MuiInputBase-input': {
              paddingLeft: '75px',
            },
          }}
          // make readonly and open color picker on click if set to allow_input: false
          onClick={!allowInput ? handleClick : undefined}
          disabled={!allowInput}
          fullWidth
          InputProps={{
            endAdornment: showClearButton ? (
              <InputAdornment position="start">
                <IconButton onClick={handleClear} aria-label="clear">
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
        />
      </div>
      <Outline hasError={hasErrors} />
    </div>
  );
};

export default ColorControl;
