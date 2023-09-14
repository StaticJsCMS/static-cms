import { Input } from '@mui/base/Input';
import React, { forwardRef, useCallback, useLayoutEffect, useState } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ChangeEventHandler, RefObject } from 'react';

import './TextArea.css';

export const classes = generateClassNames('TextArea', ['root', 'input']);

export interface TextAreaProps {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  rootClassName?: string;
  inputClassName?: string;
  'data-testid'?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const MIN_TEXT_AREA_HEIGHT = 80;
const MIN_BOTTOM_PADDING = 12;

function getHeight(rawHeight: string): number {
  return Number(rawHeight.replace('px', ''));
}

const TextArea = forwardRef<HTMLInputElement | null, TextAreaProps>(
  (
    {
      value,
      disabled,
      placeholder,
      rootClassName,
      inputClassName,
      'data-testid': dataTestId,
      onChange,
    },
    ref,
  ) => {
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

      if (newHeight > MIN_TEXT_AREA_HEIGHT - MIN_BOTTOM_PADDING) {
        textarea.style.paddingBottom = `${MIN_BOTTOM_PADDING}px`;
        newHeight += MIN_BOTTOM_PADDING;
      }

      textarea.style.height = `${newHeight}px`;
      setLastAutogrowHeight(newHeight);
    }, [lastAutogrowHeight, ref]);

    useLayoutEffect(() => {
      autoGrow();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Input
        multiline
        minRows={4}
        onInput={autoGrow}
        onChange={onChange}
        value={value}
        disabled={disabled}
        data-testid={dataTestId ?? 'textarea-input'}
        slotProps={{
          root: {
            className: classNames(classes.root, rootClassName),
          },
          input: {
            ref,
            placeholder,
            className: classNames(classes.input, inputClassName),
          },
        }}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
