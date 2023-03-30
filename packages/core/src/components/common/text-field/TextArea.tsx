import InputUnstyled from '@mui/base/InputUnstyled';
import React, { forwardRef, useCallback, useState } from 'react';

import type { ChangeEventHandler, RefObject } from 'react';

export interface TextAreaProps {
  value: string;
  disabled?: boolean;
  'data-testid'?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const MIN_TEXT_AREA_HEIGHT = 80;
const MIN_BOTTOM_PADDING = 12;

function getHeight(rawHeight: string): number {
  return Number(rawHeight.replace('px', ''));
}

const TextArea = forwardRef<HTMLInputElement | null, TextAreaProps>(
  ({ value, disabled, 'data-testid': dataTestId, onChange }, ref) => {
    const [lastAutogrowHeight, setLastAutogrowHeight] = useState(MIN_TEXT_AREA_HEIGHT);

    const autoGrow = useCallback(() => {
      const textarea = (ref as RefObject<HTMLInputElement | null>)?.current;
      if (!textarea) {
        return;
      }

      const currentHeight = getHeight(textarea.style.height);

      textarea.style.height = '5px';

      let newHeight = textarea.scrollHeight;
      if (newHeight < MIN_TEXT_AREA_HEIGHT) {
        newHeight = MIN_TEXT_AREA_HEIGHT;
      }

      if (currentHeight !== lastAutogrowHeight && currentHeight >= newHeight) {
        textarea.style.height = `${currentHeight}px`;
        return;
      }

      textarea.style.height = `${newHeight}px`;
      setLastAutogrowHeight(newHeight);

      if (newHeight > MIN_TEXT_AREA_HEIGHT - MIN_BOTTOM_PADDING) {
        textarea.style.paddingBottom = `${MIN_BOTTOM_PADDING}px`;
      }
    }, [lastAutogrowHeight, ref]);

    return (
      <InputUnstyled
        multiline
        minRows={4}
        onInput={autoGrow}
        onChange={onChange}
        value={value}
        disabled={disabled}
        data-testid={dataTestId ?? 'textarea-input'}
        slotProps={{
          root: {
            className: `
              flex
              w-full
            `,
          },
          input: {
            ref,
            className: `
              w-full
              min-h-[80px]
              px-3
              bg-transparent
              outline-none
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-100
              disabled:text-gray-300
              dark:disabled:text-gray-500
            `,
          },
        }}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
