import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { ChromePicker } from 'react-color';
import validateColor from 'validate-color';

import { transientOptions } from '../../lib';
import { zIndex } from '../../ui';

import type { ColorResult } from 'react-color';
import type { CmsFieldColor, CmsWidgetControlProps } from '../../interface';

function ClearIcon() {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        fill="rgb(122, 130, 145)"
        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
      ></path>
    </svg>
  );
}

const ClearButton = styled.div`
  position: absolute;
  right: 6px;
  z-index: ${zIndex.zIndex1000};
  padding: 8px;
  margin-top: 11px;
`;

const ClearButtonWrapper = styled.div`
  position: relative;
  width: 100%;
`;

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
  field,
  onChange,
  onBlur,
  ...otherProps
}: CmsWidgetControlProps<string, CmsFieldColor>) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const value = otherProps.value ?? '';

  // show/hide color picker
  const handleClick = useCallback(() => {
    setShowColorPicker(!showColorPicker);
  }, [showColorPicker]);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const handleClose = useCallback(() => {
    setShowColorPicker(false);
  }, []);

  const handleChange = useCallback(
    (color: ColorResult) => {
      const formattedColor =
        (color.rgb?.a ?? 1) < 1
          ? `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
          : color.hex;
      onChange(formattedColor);
    },
    [onChange],
  );

  const allowInput = field.allowInput ?? false;

  // clear button is not displayed if allowInput: true
  const showClearButton = !allowInput && value;

  return (
    <>
      {' '}
      {showClearButton && (
        <ClearButtonWrapper>
          <ClearButton onClick={handleClear}>
            <ClearIcon />
          </ClearButton>
        </ClearButtonWrapper>
      )}
      <ColorSwatchBackground />
      <ColorSwatch
        $background={validateColor(value) ? value : '#fff'}
        $color={validateColor(value) ? 'rgba(255, 255, 255, 0)' : 'rgb(223, 223, 227)'}
        onClick={handleClick}
      >
        ?
      </ColorSwatch>
      {showColorPicker && (
        <ColorPickerContainer>
          <ClickOutsideDiv onClick={handleClose} />
          <ChromePicker
            color={value || ''}
            onChange={handleChange}
            disableAlpha={!(field.enableAlpha ?? false)}
          />
        </ColorPickerContainer>
      )}
      <input
        // text input with padding left for the color swatch
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        style={{
          paddingLeft: '75px',
          paddingRight: '70px',
          color: !allowInput ? '#bbb' : undefined,
        }}
        // make readonly and open color picker on click if set to allowInput: false
        onClick={!allowInput ? handleClick : undefined}
        onBlur={onBlur}
        readOnly={!allowInput}
      />
    </>
  );
};

export default ColorControl;
