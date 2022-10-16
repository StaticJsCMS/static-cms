import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { ChromePicker } from 'react-color';
import validateColor from 'validate-color';

import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { zIndex } from '../../components/UI/styles';
import { transientOptions } from '../../lib';

import type { ChangeEvent, MouseEvent } from 'react';
import type { ColorResult } from 'react-color';
import type { FieldColor, WidgetControlProps } from '../../interface';

const StyledColorControlWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface StyledColorControlContentProps {
  $collapsed: boolean;
}

const StyledColorControlContent = styled(
  'div',
  transientOptions,
)<StyledColorControlContentProps>(
  ({ $collapsed }) => `
    display: flex;
    ${
      $collapsed
        ? `
          visibility: hidden;
          height: 0;
          width: 0;
        `
        : `
          padding: 16px;
        `
    }
  `,
);

// color swatch background with checkerboard to display behind transparent colors
const ColorSwatchBackground = styled.div`
  position: absolute;
  z-index: ${zIndex.zIndex1};
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==');
  height: 38px;
  width: 48px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
`;

interface ColorSwatchProps {
  $background: string;
  $color: string;
}

const ColorSwatch = styled(
  'div',
  transientOptions,
)<ColorSwatchProps>(
  ({ $background, $color }) => `
    position: absolute;
    z-index: ${zIndex.zIndex2};
    background: ${$background};
    cursor: pointer;
    height: 38px;
    width: 48px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
    border: 2px solid rgb(223, 223, 227);
    text-align: center;
    font-size: 27px;
    line-height: 1;
    padding-top: 4px;
    user-select: none;
    color: ${$color};
  `,
);

const ColorPickerContainer = styled.div`
  position: absolute;
  z-index: ${zIndex.zIndex1000};
  margin-top: 48px;
  margin-left: 12px;
`;

// fullscreen div to close color picker when clicking outside of picker
const ClickOutsideDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ColorControl = ({
  path,
  field,
  onChange,
  value,
  t,
}: WidgetControlProps<string, FieldColor>) => {
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
      onChange(path, field, '');
    },
    [field, onChange, path],
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
      onChange(path, field, formattedColor);
    },
    [field, onChange, path],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      onChange(path, field, event.target.value);
    },
    [field, onChange, path],
  );

  const allowInput = field.allowInput ?? false;

  // clear button is not displayed if allowInput: true
  const showClearButton = !allowInput && internalValue;

  return (
    <StyledColorControlWrapper>
      <ObjectWidgetTopBar
        key="file-control-top-bar"
        collapsed={collapsed}
        onCollapseToggle={handleCollapseToggle}
        heading={field.label ?? field.name}
        t={t}
      />
      <StyledColorControlContent $collapsed={collapsed}>
        <ColorSwatchBackground />
        <ColorSwatch
          key="color-swatch"
          $background={validateColor(internalValue) ? internalValue : '#fff'}
          $color={validateColor(internalValue) ? 'rgba(255, 255, 255, 0)' : 'rgb(223, 223, 227)'}
          onClick={handleClick}
        >
          ?
        </ColorSwatch>
        {showColorPicker && (
          <ColorPickerContainer key="color-swatch-wrapper">
            <ClickOutsideDiv key="click-outside" onClick={handleClose} />
            <ChromePicker
              key="color-picker"
              color={internalValue}
              onChange={handlePickerChange}
              disableAlpha={!(field.enableAlpha ?? false)}
            />
          </ColorPickerContainer>
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
          // make readonly and open color picker on click if set to allowInput: false
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
      </StyledColorControlContent>
      <Outline />
    </StyledColorControlWrapper>
  );
};

export default ColorControl;
